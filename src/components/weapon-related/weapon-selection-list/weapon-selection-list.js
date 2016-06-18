define(['knockout', 'text!./weapon-selection-list.html','underscore'], function(ko, templateMarkup,_) {

  function WeaponSelectionList(params) {
    var list = this;

    list.weapons = params.weapons;
    list.selectedWeapon = params.selectedWeapon;
    list.finalOptionText = params.finalOptionText;
    list.finalOptionCallback = params.finalOptionCallback;
    list.userWeapons = params.userWeapons;
    list.noButton = params.noButton;

    list.weaponsFilter = ko.observable();
    list.weaponsForDisplay = ko.observableArray(list.weapons());

    list.weaponsFilter.subscribe(function(newFilter){
      var filteredList = _.filter(list.weapons(),function(weapon){
        return !$.trim(newFilter) || weapon.fullDisplayText().toLowerCase().indexOf(newFilter.toLowerCase()) != -1;
      });

      list.weaponsForDisplay(filteredList);
    });

    list.weapons.subscribe(function(newWeapons){
      list.weaponsFilter(null);
      list.weaponsForDisplay(newWeapons);
    });

  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  WeaponSelectionList.prototype.dispose = function() { };
  
  return { viewModel: WeaponSelectionList, template: templateMarkup };

});
