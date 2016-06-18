define(['knockout'],function(ko){

	function Coordinates(params){
		
		var coords = this;

		coords.lat = ko.observable(params.lat);
		coords.lng = ko.observable(params.lng);

	}

	return Coordinates;

});
