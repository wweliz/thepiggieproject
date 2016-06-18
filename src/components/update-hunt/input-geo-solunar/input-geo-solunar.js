define(['knockout', 'text!./input-geo-solunar.html'], function(ko, templateMarkup) {

	function InputGeoSolunar(params) {

		var igs = this;

		igs.needLocation = ko.observable(false);   // toggle div visiblity
		igs.haveLocation = ko.observable(true);   // toggle div visiblity

		igs.huntDate = ko.observable();       // date of hunt
		igs.huntTime = ko.observable();       // time of hunt/kill

		igs.temp = ko.observable();           // temp at time of kill
		igs.tempHigh = ko.observable();       // daily high temp
		igs.tempLow = ko.observable();        // daily low temp

		igs.moonphase = ko.observable();      // text description
		igs.moonIcon = ko.observable();       // moon icon URL
		igs.timeMoonUp = ko.observable();
		igs.timeMoonDown= ko.observable();

		igs.timeSunUp = ko.observable();
		igs.timeSunDown = ko.observable();

		igs.cloudCover = ko.observable();     // cloud cover at time of kill
		igs.solunarRating = ko.observable();  // range from 1-4 stars

		igs.waterLevel = ko.observable();     // height in feet


		// igs.openLocationModal = function(){
		// 	$.sc.modal.show({
		// 		cname:'need-location',
		// 		cparams:{}
		// 	})
		// };		

		// igs.requestLocationData = function(locationData){
		// 	if (locationData) {   
		// 		// use loc data
		// 	} else {
				// igs.openLocationModal();
				// igs.needLocation(true);
				// igs.haveLocation(false);
		// 	}
		// }

	}
	
	return { viewModel: InputGeoSolunar, template: templateMarkup };

});


