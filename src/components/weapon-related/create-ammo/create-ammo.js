define(['knockout', 'text!./create-ammo.html'], function(ko, templateMarkup) {

	function CreateAmmo(params) {

		var ammo = this;

		ammo.make = ko.observable();
		ammo.caliber = ko.observable();
		ammo.type = ko.observable();

		ammo.createAmmo = function(){
			console.log('Make: ' + ammo.make() + ', Caliber: ' + ammo.caliber() + ', Type: ' + ammo.type());
		};

	}
	
	return { viewModel: CreateAmmo, template: templateMarkup };

});
