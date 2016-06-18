define(['knockout', 'modernizr'],function(ko, modernizr){
	
	function UserGeoHelper(){

		var helper = this;

		var userLocation = new Object();

		helper.getUserLocation = function(successCB){
			// determine device support for geolocation
			if (Modernizr.geolocation) {
				//console.log('This device supports geolocation.');

				// uses the HTML5 geolocation API to find a user's current position
				// in order for this to run, the user must click to allow HB to access their location
				// can take 3-5 seconds to return postion values
				navigator.geolocation.getCurrentPosition(function(position) {
					geoSuccess(position, successCB);
				}, geoError);
			} else {
				//console.log('This device does not support geolocation.');
			}
		}

		helper.useExistingLocation = function(latLng, successCB){
			var req = { location: latLng }
			var geocoder = new google.maps.Geocoder();

			geocoder.geocode(req, successCB);
		}

		helper.reverseGeocode = function(lat, lng, callback) {
			var geocoder = new google.maps.Geocoder();

			var latLng = {};
			latLng.lat = lat;
			latLng.lng = lng;

			var req = { location: latLng }

			geocoder.geocode(req, callback);
		}

		function geoSuccess(position, callback) {
			var lat = position.coords.latitude;
			var lng = position.coords.longitude;

			helper.reverseGeocode(lat, lng, callback);
		}

		function geoError() {
			console.log('Your location could not be determined.');
		}
	
	}

	return new UserGeoHelper();

});
