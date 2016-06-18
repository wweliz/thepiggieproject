define(['knockout', 'text!./user-weapons.html', 'UserWeaponsRequest','UserWeapon'], function(ko, template, UserWeaponsRequest, UserWeapon) {

	function UserWeapons(params) {

		var weapon = this;

		weapon.weapons = ko.observableArray([]);
		weapon.feedError = ko.observable(false);

		weapon.setArray = function(response){
			if (!_.isEmpty(response.result)){
				weapon.weapons(ko.utils.arrayMap(response.result,function(weapon){
					return new UserWeapon(weapon);
				}));
  		} else {
				weapon.feedError(true);
			}
		};

		// fetch data for the weapons array from the server
		UserWeaponsRequest.all({
				data:{
					userId: params.user,
				},
				onSuccess: weapon.setArray
		});

	}
	
	return { viewModel: UserWeapons, template: template };

});