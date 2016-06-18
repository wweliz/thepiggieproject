define(['knockout', 'text!./input-weapon.html'], function(ko, templateMarkup) {

	function InputWeapon(params) {

		var iw = this;

		// GUN DATA ///////////////////////////////////////////
		iw.gunMake = ko.observable('gunmake');
		iw.gunModel = ko.observable('gunmodel');
		iw.gunName = ko.computed(function() {
			return iw.gunMake() + ' ' + iw.gunModel();
		});

		iw.gunYear = ko.observable();

		// AMMUNITION DATA ////////////////////////////////////
		iw.ammoMake = ko.observable('ammomake');
		iw.ammoCaliber = ko.observable('ammocaliber');
		iw.ammoDescrip = ko.observable('ammodescrip');

	}
	
	return { viewModel: InputWeapon, template: templateMarkup };

});
