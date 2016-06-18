define(['knockout', 'UserGeoHelper', 'text!./update-hunt-post.html'], function(ko, ugh, templateMarkup) {

	function UpdateHuntPost(params) {

		var uhp = this;
		var placesSearchBox = document.getElementById('places-search-box');

		uhp.data = params;

		console.log(params.speciesList());

		uhp.dzInfoPrompt = 'Start by dragging your image into this box, or click to browse files.';
		uhp.dzInfoInstructions = '';

		uhp.autocomplete = new google.maps.places.Autocomplete(placesSearchBox,{types:['geocode']});

		if (uhp.data.getUserLocationOn) {
			ugh.getUserLocation(seedSearchBox);
		}

		google.maps.event.addListener(uhp.autocomplete, 'place_changed', function() {
			var location = placeToLocation(uhp.autocomplete.getPlace());
			uhp.data.location(location);
		});

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
			uhp.data.location(location);
			placesSearchBox.value = location.text;
		}

		function seedDateInput(date) {
			if (date != null) {
				var dateInput = document.getElementById('date-input');
				dateInput.value = date.toLocaleString();
			}
		}

		ko.postbox.subscribe('location-for-input-channel', seedSearchBox);
		ko.postbox.subscribe('date-for-input-channel', seedDateInput);

	}
	
	return { viewModel: UpdateHuntPost, template: templateMarkup };

});
