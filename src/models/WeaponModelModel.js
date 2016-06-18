define(['knockout'],function(ko){
	
	function WeaponModelModel(params){

		var model = this;

		model.series = params.series;
		model.model = params.model;
		model.firearmCategoryId = params.firearmCaregoryId;
		model.manufacturerId = params.manufacturerId;
		model.firearmTypeId = params.firearmTypeId;
		model.caliberID = params.caliberId;

	}

	return WeaponModelModel;

});