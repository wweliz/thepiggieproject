define(['knockout', 'text!./user-profile.html',
	'underscore', 'UserRequest', 'UserModel',
		'UserWeaponsRequest', 
		'UserWeaponToSimpleWeaponHelper',
    	'SimpleWeaponModel'], 
	function(ko, template,_, GetUserRequest, 
		UserModel, 
		UserWeaponsRequest, UWTSW,
    	SimpleWeaponModel) {

	function Userprofile(params) {

		var profile = this;

		profile.profileTitle = ko.observable('Hembow');

		profile.id = ko.computed(function() {
			return params.route().id || JSON.parse(localStorage.getItem('user')).id;
		});

		profile.isCurrentUser = ko.computed(function() {
			if (profile.id() ==  JSON.parse(localStorage.getItem('user')).id) {
				// use currently logged in user
				return true;
			} else {
				return false;
			}
		});

		profile.user = ko.observable();
		profile.coverPhoto = ko.observable();
		profile.coverPhotoURL = ko.observable(); // built URL to be passed to backgroundImage
		profile.activeTab = ko.observable(params.route().component);
        profile.mapView = ko.observable(!! params.route().mapVis);
		profile.paramsReady = ko.observable(false);
		profile.userWeapons = ko.observableArray([]);
		profile.hasWeapons = ko.observable(false);
		profile.showWeaponsPrompt = ko.observable(false);
		profile.weaponLink = ko.observable();

		profile.getUserData = function(response) {
			profile.user(new UserModel(response.result));
			profile.coverPhoto(response.result.coverPhoto);
			profile.coverPhotoURL( 'url(' + profile.coverPhoto() + ')' );
			profile.weaponLink('#/profile/'+profile.id()+'/gear');
			console.log(profile.weaponLink);
			profile.paramsReady(true);
			if (response.result.firstName){
				profile.profileTitle(response.result.firstName+' '+response.result.lastName+' Profile | Hembow'|| 'User Profile | Hembow');
			} else if(response.result.username) {
				profile.profileTitle(response.result.username+' Profile | Hembow'|| 'User Profile | Hembow');
			}
		};

		profile.onError = function(response) {
			console.log(response);
			if (response.status == 404){
				window.location.hash = '/404';
			}
		};

		GetUserRequest.get({
			data: { id: profile.id() },
			onSuccess: profile.getUserData,
			onError: profile.onError
		});

		UserWeaponsRequest.all({
	  		data: {
	  			userId: profile.id()
	  		},
	  		onSuccess: populateWeapons,
	  		onError: weaponsError
	  	});
	  	
	  	var fakeResponse = []
	  	var fakeResults = []
	  	fakeResponse.push(fakeResponse);

	  	populateWeapons(fakeResponse);

	  	function populateWeapons(response){
	  		if (!_.isEmpty(response.result)){
	  			profile.hasWeapons(true);
	  			profile.userWeapons(ko.utils.arrayMap(response.result,function(weapon){
	  				return new UWTSW.convert(weapon);
	  			}));
	  		} else {
	  			if(profile.isCurrentUser()){
	  				profile.showWeaponsPrompt(true);
	  			}
	  		}
	  	}

	  	function weaponsError(res){
	  		console.log(res);
	  		// profile.alertClass(' alert-danger');
	  		// profile.alertText('There was a problem retrieving your Weapon information. Please refresh the page or try again later.');
	  	}

	}
	
	return { viewModel: Userprofile, template: template };

});
