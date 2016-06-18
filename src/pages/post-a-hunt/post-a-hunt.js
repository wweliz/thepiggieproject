define(['knockout', 
	'text!./post-a-hunt.html', 
	'PostTypeRequest', 
	'dropzone', 
	'underscore', 
	'HuntsRequest',
	'ZipFromCityStateRequest',
	'DateTimeHelper',
	'ForecastRequest',
	'WeatherDetails',
	'Kill',
	'SimpleWeaponModel',
	'moment',
	'UserWeaponsRequest', 
	'UserWeaponToSimpleWeaponHelper',
	'CanvasToBlob'],
	
	function(ko, 
		templateMarkup, 
		PostTypeRequest, 
		Dropzone, 
		_, 
		HuntsRequest,
		ZipFromCityStateRequest, 
		DateTimeHelper, 
		ForecastRequest, 
		WeatherDetails, 
		Kill, 
		SimpleWeaponModel,
		moment, 
		UserWeaponsRequest, 
		UserWeaponToSimpleWeaponHelper) {

	function PostAHunt(params) {

		var ph = this;

		ph.getUserLocationOn = true;

		ph.initWrapper = ko.observable(true);
		ph.updateWrapper = ko.observable(false);

		ph.post = ko.observable(false);
 
		var state = 'update-hunt-post';

		if (params.route().state == 'success'){
			state = 'successful-post';
		}

		ph.state = ko.observable(state);
		ph.caption = ko.observable('');

		ph.showUpdateHunt = function(){
			ph.initWrapper(false);
			ph.updateWrapper(true);
			ph.createHuntPost();
		};
		
		ph.postImage = ko.observable(null);
		ph.b64Image = ko.observable();
		ph.croppedImage = ko.observable();
		ph.typeId = ko.observable();
		ph.speciesList = ko.observableArray();
		ph.kills = ko.observableArray();
		ph.huntDateTime = ko.observable(DateTimeHelper.formatDate(new Date()));
		ph.weatherDetails = ko.observable();
		ph.weatherRaw = ko.observable();
		ph.weatherDisabled = ko.observable(false);
		ph.location = ko.observable({});
		ph.journal = ko.observable('');

		ph.selectedPostType = ko.observable();

		ph.selectedWeapon = ko.observable(new SimpleWeaponModel({}));

		ph.tags = ko.observableArray([]);
		ph.userWeapons = ko.observableArray();
		ph.postError = ko.observable();
		ph.postBtn = ko.observable('POST');
		ph.postClick = ko.observable(false);
		ph.postEditing = false;

		ph.response = ko.observable();

		ph.allowAdditionalDetails = ko.computed(function(){
			return ph.postImage() != null && typeof ph.postImage() != 'undefined';
		});


		ph.killsText = ko.computed(function(){
			var result = "";

			_.each(ph.kills(),function(kill, i){
				if (kill.selectedSubSpecie()) {
					var subSpecie = kill.selectedSubSpecie();

					if (i != 0) {
						result += ", ";
					}
					result += kill.quantity();

					if (kill.quantity() == 1) {
						result += " " + subSpecie.displayText;
					} else {
						result += " " + subSpecie.pluralName;
					}
				}
			});

			return result;
		});

		ph.removeWeapon = function(data){
			ph.weapons.remove(data);

			if (ph.weapons().length == 0){
				ph.weapons.push(new SimpleWeaponModel({}));
			}
		};

		ph.submitPostStatus = function(){
			//Function prevent double posting with multiple clicks of the button. 
			
			ph.postClick(!ph.postClick());

			if (ph.postClick()){
				ph.submitPost();
			} else {
				ph.postError("Your post is being submitted.")
			}
		}

		ph.submitPost = function(){
			var errorMessage;

			if (!ph.postImage()){
				var canvas = $(".cropper-img-container > img").cropper('getCroppedCanvas',{width:600, height:600});
				if (_.isFunction(canvas.toBlob)){
					ph.croppedImage(canvas.toDataURL("image/jpeg"));
					canvas.toBlob(ph.postImage,"image/jpeg");
				}else {
					errorMessage = "Oops! An image is required.";
				}
			}

			if (errorMessage){
				ph.postError(errorMessage);
			}else {

				ph.postBtn('POSTING...');

				var critters = [];
				_.each(ph.kills(), function (critter) {
					var metaData = null;
					if(critter.quantity() > 0){
						metaData = critter.metaData;
					}
					critters.push({
						quantity: critter.quantity,
						speciesId: critter.specieId,
						subSpecieId: critter.subSpecieId,
						metaData: metaData,
						typeId: ph.typeId()
					});
				});

				critters = ko.toJSON(critters);

				if (critters == '[]') {
					critters = null;
				}
				var location = JSON.stringify(_.omit(ko.toJS(ph.location()), 'text'));
				if (location == '{}') {
					location = null;
				}

				
				var weatherData = null;

				/* Skips weather information if user selects to disable weather */
				if (!ph.weatherDisabled()) {
					weatherData = ko.toJSON(ph.weatherRaw);
				}

				HuntsRequest.post({
					photos: [ph.postImage()],
					caption: ph.caption(),
					typeId: ph.typeId(),
					weather: weatherData,
					dateStart: DateTimeHelper.parse(ph.huntDateTime()).toISOString(),
					critters: critters,
					weapon: ph.selectedWeapon(),
					entry: ph.journal(),
					tags: ko.toJSON(ph.tags),
					location: location,
					success: successfulPost,
					error: errorPost
				});
			}
		};

		function successfulPost(response){
			ph.response(response);
			window.location.hash = '/post-a-hunt/success/'+response.result.id;

		}

		function errorPost(response){
			ph.postClick(false);
			ph.postBtn('POST');
			ph.postError("There was an error submitting your post. Please try again shortly.")
		}

		ph.setImage = function(image){
			ph.postImage(image);
		};

		ph.setSpeciesList = function(postType){
			console.log(postType);
			if (typeof postType == 'undefined'){
				ph.speciesList([]);
				ph.kills([]);
				ph.typeId(undefined);
			} else {
				ph.typeId(postType.id);
				if (ph.speciesList() != postType.species) {
					_.each(ph.kills,function(kill){
						kill.selectedSpecie(postType.species[0]);
					});
					ph.speciesList(postType.species);
				}

				if (ph.kills().length == 0){
					ph.addAKill();
				}
			}
		};

		ph.addAKill = function(){
			var data = {};
			if (ph.kills().length > 0){
				var mostRecentKill = ph.kills()[ph.kills().length - 1];

				data = {
					selectedSpecie:mostRecentKill.selectedSpecie(),
					selectedSubSpecie:mostRecentKill.selectedSubSpecie()
				}
			}

			ph.kills.push(new Kill(data));
		};

		ph.removeAKill = function(data){
			ph.kills.remove(data);
		};

		function getWeatherInfo(){
			var data = {
				latlng: ph.location().latitude + ',' + ph.location().longitude,
				location : ph.location(),
				sensor: false,
				dateTime:ph.huntDateTime()
			};
			ZipFromCityStateRequest.getZipFromLongLat(data);
			data.success = setWeatherDetails;
			ForecastRequest.send(data);
		}

		function setWeatherDetails(response){
			if (response && response.success){
				ph.weatherDetails(new WeatherDetails(response.result));
				ph.weatherRaw(response.result);
			}
		}

		function setUserWeapons(response){
			 ph.userWeapons(ko.utils.arrayMap(response.result, function(weapon){
			 	return UserWeaponToSimpleWeaponHelper.convert(weapon);
			 }));
			 //console.log(ph.userWeapons());
		}

		ph.location.subscribe(getWeatherInfo);
		ph.huntDateTime.subscribe(getWeatherInfo);

		UserWeaponsRequest.all({
			onSuccess:setUserWeapons
		});

	}

	return { viewModel: PostAHunt, template: templateMarkup };

});
