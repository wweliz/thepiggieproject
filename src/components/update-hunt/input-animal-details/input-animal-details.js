define(['knockout', 'text!./input-animal-details.html'], function(ko, templateMarkup) {

  function InputAnimalDetails(params) {

  	var ad = this;

 		ad.height = ko.observable();
		ad.length = ko.observable();
		ad.weight = ko.observable();

		ad.storeDetails = function(){
			console.log('Height: ' + ad.height() + ', Length: ' + ad.length() + ', Weight: ' + ad.weight());
		};

  }
  
  return { viewModel: InputAnimalDetails, template: templateMarkup };

});
