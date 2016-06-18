define(['knockout'], function(ko) {

    ko.bindingHandlers.heatmap = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var map = ko.utils.unwrapObservable(valueAccessor());

            map.initialize(element);
            //
            //map.onChangedCoord = function(newValue) {
            //    var latLng = new google.maps.LatLng(
            //        ko.utils.unwrapObservable(map.lat),
            //        ko.utils.unwrapObservable(map.lng));
            //    map.googleMap.setCenter(latLng);
            //};
            //
            //map.onMarkerMoved = function(dragEnd) {
            //    var latLng = map.marker.getPosition();
            //    map.lat(latLng.lat());
            //    map.lng(latLng.lng());
            //};
            //
            //map.lat.subscribe(map.onChangedCoord);
            //map.lng.subscribe(map.onChangedCoord);
            //
            //$("#" + element.getAttribute("id")).data("map",map);
        }
    };

});
