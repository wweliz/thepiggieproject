define(['knockout', 'text!./weapons-form.html','SimpleWeaponModel'], function(ko, templateMarkup, SimpleWeaponModel) {

  function WeaponsForm(params) {

    var form = this;

    


    form.selectedWeapon = params.selectedWeapon;

    form.weapons = ko.observableArray();
    form.state = ko.observable('weapon-selection-list');

    form.userWeapons = params.userWeapons;

    form.removeWeapon = params.removeWeapon;

    form.createNewWeapon = function(){
      form.selectedWeapon(new SimpleWeaponModel({}));
      form.state('create-new-weapon-form');
    };

    form.returnToStart = function(){
      form.state('weapon-selection-list');
    }

  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  WeaponsForm.prototype.dispose = function() { };
  
  return { viewModel: WeaponsForm, template: templateMarkup };

});
