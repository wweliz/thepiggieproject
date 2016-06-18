define(['knockout'], function(ko) {

	ko.bindingHandlers.map = {
		init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
			var mapObj = ko.utils.unwrapObservable(valueAccessor());
			var latLng = new google.maps.LatLng(
					ko.utils.unwrapObservable(mapObj.lat),
					ko.utils.unwrapObservable(mapObj.lng));
			var mapOptions = {
						center: latLng,
						zoom: 7,
						disableDefaultUI: true ,	// show/hide person icon, zoom buttons, and map/satellite options
						mapTypeId: google.maps.MapTypeId.ROADMAP
					};
			
			mapObj.googleMap = new google.maps.Map(element, mapOptions);
			
			mapObj.marker = new google.maps.Marker({
					map: mapObj.googleMap,
					position: latLng,	// marker position
					draggable: false		// is pin draggable
			});     
				
			mapObj.onChangedCoord = function(newValue) {
				var latLng = new google.maps.LatLng(
						ko.utils.unwrapObservable(mapObj.lat),
						ko.utils.unwrapObservable(mapObj.lng));
				mapObj.googleMap.setCenter(latLng);                 
			};
					
			mapObj.onMarkerMoved = function(dragEnd) {
				var latLng = mapObj.marker.getPosition();
				mapObj.lat(latLng.lat());
				mapObj.lng(latLng.lng());
			};
				
			mapObj.lat.subscribe(mapObj.onChangedCoord);
			mapObj.lng.subscribe(mapObj.onChangedCoord);  
			
			google.maps.event.addListener(mapObj.marker, 'dragend', mapObj.onMarkerMoved);
			
			$("#" + element.getAttribute("id")).data("mapObj",mapObj);
		}
	};
	
});
