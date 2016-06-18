define(['knockout', 'underscore', 'text!./weapon-user-list.html'], function(ko, _, templateMarkup) {

  function WeaponUserList(params) {
  	var weapons = this;



  	weapons.weapons = params.userWeapons;

  	weapons.alertText = params.alertText;
  	weapons.alertClass = params.alertClass;
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  WeaponUserList.prototype.dispose = function() { };
  
  return { viewModel: WeaponUserList, template: templateMarkup };

});
