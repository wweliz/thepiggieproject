define(['knockout', 'text!./create-weapon.html', 'moment','WeaponModel','ManufacturerModel', 'WeaponsRequest', 'ManufacturersRequest', 'UserWeaponsRequest'], function(ko, templateMarkup, moment, WeaponModel, ManufacturerModel, WeaponsRequest, ManufacturersRequest, UserWeaponsRequest) {

	function CreateWeapon(params) {

		var weapon = this;

		weapon.model = ko.observable();

		// populate weapon type dropdown menu //////////////////////////////////////////
		
		var weaponsArray = ko.utils.arrayMap($.sc.HB_CONSTANTS.WEAPON_TYPES,function(weapon){
			return new WeaponModel(weapon);
		});

		weapon.types = ko.observableArray(weaponsArray);
		weapon.selectedType = ko.observable(weapon.types()[0]);

		// populate weapon manufacturer dropdown menu //////////////////////////////////

		weapon.manufacturers = ko.observableArray([]);
		weapon.selectedManufacturer = ko.observable(weapon.manufacturers()[0]);

		weapon.models = ko.observableArray([]);
		weapon.selectedModel = ko.observable(weapon.models()[0]);
		
		weapon.yearSelection = ko.observable('Year');

		var minYear = 1900;
		var maxYear = moment(new Date).format('YYYY');
		var yearArray = [];

		for (var i = maxYear; i >= minYear; --i) {   
			yearArray.push(i);
		}

		weapon.year = ko.observableArray(yearArray);

		weapon.getWeaponModels = function (model){
			console.log(ko.toJS(model));
			return WeaponsRequest.get({
				data:{
					categoryId:weapon.selectedType().categoryId(),
					manufacturerId:model.id()	
				},
				onSuccess:function(response){
					weapon.models(
						ko.utils.arrayMap(
							response.result,function(weapon){
								return new WeaponModel(weapon);
							}
					));
					console.log(response);
					console.log(weapon.models());
				}});
		};

		weapon.createManufacturer = function(manufacturer){
			console.log(manufacturer);
			ko.utils.arrayMap(manufacturer.result.manufacturers, function(manu){
				weapon.manufacturers.push( new ManufacturerModel(manu));
			});
		};

		weapon.getWeaponManufacturers = function (data){
			console.log(data);
			var typeId = data.manufacturerTypeId();

			weapon.manufacturers(
				ko.utils.arrayMap(
					ManufacturersRequest.manufacturersByType({
						data:{
							typeId: typeId,
						},
						onSuccess: weapon.createManufacturer
					})
				)
			);	
		};

		weapon.saveUserWeapon = function(){
			UserWeaponsRequest.post({
				data:{
					userId: $.sc.currentUserId(),
					firearmId: weapon.selectedModel().id
					// manufacturedYear: weapon.year()
				},
				onSuccess:function(response){
					console.log(response);
				}
			})
		};

		weapon.selectedType.subscribe(weapon.getWeaponManufacturers);

		weapon.manufacturers.subscribe(function(newManufacturers){
			weapon.selectedManufacturer(newManufacturers[0]);
		});

		weapon.selectedManufacturer.subscribe(weapon.getWeaponModels);

		weapon.models.subscribe(function(models){
			weapon.selectedModel(models[0]);
		});

	}
	
	return { viewModel: CreateWeapon, template: templateMarkup };

});
