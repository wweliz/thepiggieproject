define(['knockout', 'text!./need-location.html'], function(ko, templateMarkup) {

  function NeedLocation(params) {

  	var nl = this;

  	nl.yesNo = ko.observable(true);
		nl.enterLocation = ko.observable(false);

		nl.city = ko.observable();
		nl.state = ko.observable();

		nl.showLocEntry = function(){
			nl.yesNo(false);
			nl.enterLocation(true);
		};

  }
  
  return { viewModel: NeedLocation, template: templateMarkup };

});
