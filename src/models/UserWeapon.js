define(['knockout'],function(ko){

	function UserWeapon(data){

		var weapon = this;

		weapon.bow = ko.observable(data.bow);
		weapon.bowId = ko.observable(data.bowId);
		weapon.created_at = ko.observable(data.created_at);
		weapon.customId = ko.observable(data.customId);
		weapon.firearm = ko.observable(data.firearm);
		weapon.firearmId = ko.observable(data.firearmId);
		weapon.id = ko.observable(data.id);
		weapon.manufacturedYear = ko.observable(data.manufacturedYear);
		weapon.photo = ko.observable(data.photo);
		weapon.updated_at = ko.observable(data.updated_at);
		weapon.userRigId = ko.observable(data.userRigId);

		// weapon.caliber = ko.observable(data.caliber);
		// weapon.make = ko.observable(data.make);
		// weapon.manufacturer = ko.observable(data.firearm.manufacturer.name);
		// weapon.model = ko.observable(data.firearm.model);
		// weapon.type = ko.observable(data.type);
		// weapon.year = ko.observable(data.users.avatar);

	}

	return UserWeapon;

});
