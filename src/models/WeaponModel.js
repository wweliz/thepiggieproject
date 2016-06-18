define(['knockout'],function(ko){

	function WeaponModel(data){
		
		var weapon = this;

		weapon.categoryId = ko.observable(data.categoryId);
		weapon.manufacturerTypeId = ko.observable(data.manufacturerTypeId);
		weapon.name = data.name;	
		weapon.barrel = data.barrel;
		weapon.category = data.category;
		weapon.chamberLength = data.chamberLength;
		weapon.colorFinish = data.colorFinish;
		weapon.commonName = data.commonName;
		weapon.model = data.model;
		weapon.series = data.series;
		weapon.year = data.year;
		weapon.id = data.id;

		weapon.displayText = ko.computed(function(){
			var result = weapon.name;
			if (weapon.series){
				result = weapon.series;
			}
			return result;
		});
	}

	return WeaponModel;

});