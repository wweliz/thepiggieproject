define([
	'knockout',
	'text!./edit-existing-post.html',
	'underscore',
	'UserPostRequest',
	'Detailed-Post',
	'UserGeoHelper',
	'DateTimeHelper',
	'ForecastRequest',
	'WeatherDetails',
	'ZipFromCityStateRequest',
	'SimpleWeaponModel',
	'Kill',
	'PostTypeRequest'
], function(
	ko,
	templateMarkup,
	underscore,
	UserPostRequest,
	DetailedPost,
	UserGeoHelper,
	DateTimeHelper,
	ForecastRequest,
	WeatherDetails,
	ZipFromCityStateRequest,
	SimpleWeaponModel,
	Kill,
	PostTypeRequest
) {

	function EditExistingPost(params) {
		
		var edit = this;

		edit.getUserLocationOn = false;
		edit.id = params.route().id;

		edit.b64Image = ko.observable();
		edit.caption = ko.observable('');
        edit.croppedImage = ko.observable();
		edit.errorMsg = ko.observable('You are not authorized to edit that post.');
		edit.errorPageTitle = ko.observable('Hembow | Cannot Edit Post');
		edit.huntDateTime = ko.observable();
		edit.journal = ko.observable('');
		edit.kills = ko.observableArray();
		edit.location = ko.observable({});
		edit.pageTitle = ko.observable('Edit Post');
		edit.post = ko.observable();
		edit.postBtn = ko.observable('UPDATE');
		edit.postClick = ko.observable(false);
		edit.postError = ko.observable(false);
		edit.postImage = ko.observable();
        edit.selectedPostType = ko.observable();
		edit.selectedWeapon = ko.observable(new SimpleWeaponModel({}));
		edit.selectedWeapons = ko.observableArray();
		edit.speciesList = ko.observableArray([]);

		var state = 'update-hunt-post';
		if (params.route().state == 'success') {
			state = 'successful-post';
		}
		edit.state = ko.observable(state);

		edit.tags = ko.observableArray([]);
		edit.typeId = ko.observable();
		edit.userWeapons = ko.observableArray();
		edit.weapons = ko.observableArray([new SimpleWeaponModel({})]);
		edit.weatherDetails = ko.observable();
		edit.weatherDisabled = ko.observable(false);
		edit.weatherRaw = ko.observable();
		edit.postEditing = true;

		edit.kills.subscribe(completeKills);

		fetchPostData();

        function fetchPostData() {
			UserPostRequest.get({
				data:{
					id: edit.id
				},
				onSuccess: function(res) {
					if (res.result.userId === $.sc.currentUserId()) {
						populatePostData(res);
					} else {
						edit.postError(true);
					}
				},
				onError: function(res) {
					edit.errorMsg('There\'s been an error fetching the post.');
					edit.postError(true);
				}
			});
        }

		function populatePostData(data) {

			edit.post(new DetailedPost(data.result));

			edit.pageTitle(edit.post().pageTitle);

			if(edit.post().caption()){
				var caption = edit.post().caption();
				populateCaption(caption);
			}
			
			edit.journal(edit.post().journalEntry());

			edit.weatherDetails(edit.post().weather());
			addKillsFromCritters();

			var postType = data.result.type;
			getSpeciesFromPostType(postType);
			console.log(postType);

			var huntTime = edit.post().huntTimeISO();
			populateHuntTime(huntTime);

			var coordinates = edit.post().coordinates();
			getLocationFromCoordinates(coordinates);

		};

		function populateCaption(caption) {
			var noQuotes = caption.replace(/^"/, '').replace(/"$/, '');
			edit.caption(noQuotes);
		}

		function getSpeciesFromPostType(postType) {
			// postType from the UserPostRequest doesn't give us species
			// so we're adding the species data here
			// this feels wrong

			// PostTypeRequest.get({
			// 	data: {
			// 		withRelated: true
			// 	},
			// 	onSuccess: function(res) {
			// 		console.log(res);
			// 		var postTypes = res.result;
			// 		var postTypeId = postType.id;
			// 		var completePT = postTypes.find(function(e, i, a) {
			// 			return e.id === postTypeId;
			// 		});
			// 		console.log(postType);

			// 		var speciesListRaw = _.findWhere(postTypes, {id: postType.id});

			// 		console.log(speciesListRaw);
					
			// 		_.each(speciesListRaw.species, function(specie){
			// 			edit.speciesList().push(specie);
			// 		});
					


			// 		console.log(edit.speciesList());


			// 		


					
			// 	}


			//});

			edit.selectedPostType(postType);
		}

		function completeKills() {
			_.each(edit.kills(), function(kill) {
				if (!kill.selectedSpecie().subSpecies) {
					completeKill(kill);
				}
			});
		}

		function completeKill(kill) {
			var specie = _.find(edit.selectedPostType.species, function(specie) {
				return specie.id === kill.selectedSpecie().id;
			});

			kill.selectedSpecie(specie);
		}

		function addKillsFromCritters() {
			_.each(edit.post().critters(), function(critter) {
				var killData = {};
				killData.selectedSpecie = critter.specie;
				killData.selectedSubSpecie = critter.subSpecie;

				edit.kills().push(new Kill(killData));
			});
		}

		function populateHuntTime(huntTime) {
			if (huntTime) {
				edit.huntDateTime( DateTimeHelper.formatDate(huntTime) );
			} else {
				edit.huntDateTime( DateTimeHelper.formatDate( new Date() ) );
			}
		}

		function getLocationFromCoordinates(coordinates) {
			if (coordinates) {
				var latLng = {
					lat: coordinates.lat(),
					lng: coordinates.lng()
				}
				UserGeoHelper.useExistingLocation(latLng, seedSearchBox);
			} else {
				// no location data available; use device geolocation
				UserGeoHelper.getUserLocation(seedSearchBox);
			}
		}

		function placeToLocation(place) {
			var location = {};

			if (place.geometry) {
				location.latitude = place.geometry.location.lat().toString();
				location.longitude = place.geometry.location.lng().toString();
			}

			var address = place.address_components;

			_.each(address, function(component) {
				if (_.contains(component.types, 'locality')) {
					location.city = component.long_name;
				}
				if (_.contains(component.types, 'administrative_area_level_1')) {
					location.state = component.long_name;
				}
				if (_.contains(component.types, 'country')) {
					location.country = component.long_name;
				}
				if (_.contains(component.types, 'postal_code')) {
					location.zip = component.long_name;
				}
			});

			location.text = place.formatted_address.replace(', USA', '');

			return location;
		}

		function seedSearchBox(places) {
			// [0] appears to be best match, ie full address
			// [1] appears to be next best, ie city, state
			var location = placeToLocation(places[0]);

			edit.location(location);
		}

		///////////////////////////////////////////////////////////////////////////////////////////////
		// WEATHER DETAILS ////////////////////////////////////////////////////////////////////////////
		///////////////////////////////////////////////////////////////////////////////////////////////

		function getWeatherInfo(){
			var data = {
				latlng: edit.location().latitude + ',' + edit.location().longitude,
				location : edit.location(),
				sensor: false,
				dateTime: edit.huntDateTime()
			};

			// console.log('getWeatherInfo ran');
			// console.log(edit.location());
			// console.log(data);

			ZipFromCityStateRequest.getZipFromLongLat(data);
			data.success = setWeatherDetails;
			ForecastRequest.send(data);
		}

		function setWeatherDetails(response){
			if (response && response.success){
				edit.weatherDetails(new WeatherDetails(response.result));
				edit.weatherRaw(response.result);
			}
		}

		//edit.location.subscribe(getWeatherInfo);
		//edit.huntDateTime.subscribe(getWeatherInfo);

		///////////////////////////////////////////////////////////////////////////////////////////////
		// POST DETAILS -- POST TYPE, SPECIES, SUBSPECIES, QUANTITY ///////////////////////////////////
		///////////////////////////////////////////////////////////////////////////////////////////////
		 //for post selector
		
		edit.setSpeciesList = function(postType){
			
		 	if (typeof postType == 'undefined'){
		 		edit.speciesList([]);
		 		edit.kills([]);
		 		edit.typeId(undefined);
		 	} else {


		 		edit.typeId(postType.id);
		 		if (edit.speciesList() != postType.species) {
		 			console.log(edit.kills());

		 			
		 			_.each(edit.kills,function(kill){
		 				kill.selectedSpecie(postType.species[0]);
		 			});
		 			edit.speciesList(postType.species);
		 		}

		 		if (edit.kills().length == 0){
		 			edit.addAKill();
		 		}
		 	}
		 };

		edit.killsText = ko.computed(function(){
			var result = "";
			edit.kills = edit.kills || ko.observable([]);

			_.each(edit.kills(),function(kill, i){
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

		edit.addAKill = function(){
			var data = {};
			if (edit.kills().length > 0){
				data = {
					selectedSpecie:edit.kills()[0].selectedSpecie(),
					selectedSubSpecie:edit.kills()[0].selectedSubSpecie()
				}
			}

			edit.kills.push(new Kill(data));
		};

		edit.removeAKill = function(data){
			edit.kills.remove(data);
		};

		edit.addNewWeapon = function(weapon){
			console.log('added a weapon');
			console.log(ko.toJS(weapon));
			edit.userWeapons.push(new SimpleWeaponModel(ko.toJS(weapon)));
			edit.selectedWeapons.push(weapon.userWeaponId);
		};

		edit.removeWeapon = function(data){
			edit.weapons.remove(data);

			if (edit.weapons().length == 0){
				edit.weapons.push(new SimpleWeaponModel({}));
			}
		};


		///////////////////////////////////////////////
		// SUBMIT POST
		///////////////////////////////////////////	

		edit.submitPostStatus = function(){
			//Function prevent double posting with multiple clicks of the button. 
			
			edit.postClick(!edit.postClick());

			if (edit.postClick()){
				edit.submitPost();
			} else {
				postError("Your post is being updated.")
			}
		}

		edit.submitPost = function(){
			var errorMessage;

			if (!edit.postImage()){
				errorMessage = "Oops! An image is required.";
			}

			if (errorMessage){
				edit.postError(errorMessage);
			}else {

				edit.postBtn('UPDATING...');

				var critters = [];
				_.each(edit.kills(), function (critter) {
					critters.push({
						quantity: critter.quantity,
						speciesId: critter.specieId,
						subSpecieId: critter.subSpecieId,
						metaData: critter.metaData,
						typeId: edit.typeId()
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

				HuntsRequest.post({
					photos: [ph.postImage()],
					caption: ph.caption(),
					typeId: ph.typeId(),
					weather: ko.toJSON(ph.weatherRaw),
					dateStart: DateTimeHelper.parse(ph.huntDateTime()).toISOString(),
					critters: critters,
					entry: ph.journal(),
					tags: ko.toJSON(ph.tags),
					location: location,
					success: successfulPost,
					error: errorPost
				});
			}
		};

		function successfulPost(response){
			window.location.hash = '/post-a-hunt/success';
		}

		function errorPost(response){
			edit.postClick(false);
			edit.postBtn('POST');
			edit.postError("There was an error submitting your post. Please try again shortly.")
		}

		edit.setImage = function(image){
			edit.postImage(image);
		};

	}
	
	return { viewModel: EditExistingPost, template: templateMarkup };

});

