define(['knockout', 'underscore', 'text!./selected-weapon.html'], function(ko, _, templateMarkup) {

  function SelectedWeapon(params) {
  	var selectedWeapon = this;

    selectedWeapon.weapon = params.weapon;

  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  SelectedWeapon.prototype.dispose = function() { };
  
  return { viewModel: SelectedWeapon, template: templateMarkup };

});
