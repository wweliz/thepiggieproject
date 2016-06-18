define(['knockout', 
  'text!./create-new-weapon-form.html',
  'WeaponsRequest','UserWeaponsRequest', 
  'ManufacturersRequest','SimpleWeaponModel',
  'SimpleManufacturerModel',
  'underscore',
  'HamboneConstants'
  ], function(ko, 
    templateMarkup,
    WeaponsRequest,
    UserWeaponsRequest,
    ManufacturersRequest,
    SimpleWeaponModel,
    SimpleManufacturerModel,
    _,
    HBC) {

  function CreateNewWeaponForm(params) {

    var form = this;


    if (ko.isObservable(params.selectedWeapon)) {
      form.selectedWeapon = params.selectedWeapon;
    }else{
      form.selectedWeapon = ko.observable(params.selectedWeapon);
    }

    form.removeWeapon = params.removeWeapon;
    form.returnToStart = params.returnToStart;
    form.saveWeapon = params.saveWeapon;
    form.userWeapons = params.userWeapons;
    form.state = params.state;

    form.showAddAlert = params.showAddAlert || null;

    form.weaponTypesArray = HBC.WEAPON_TYPES;

    form.weaponTypes = [
      {id: form.weaponTypesArray[6].manufacturerTypeId, name:'firearms',label:'Firearms',label2: 'Firearm',src:'images/svg/firearm.svg',fallback:'images/svg/backup/firearm.png'},
      {id: form.weaponTypesArray[1].manufacturerTypeId, name:'bows',label:'Bows',label2: 'Bow',src:'images/svg/bow.svg',fallback:'images/svg/backup/bow.png'},
      {id: form.weaponTypesArray[0].manufacturerTypeId, name:'rods',label:'Rigs',label2: 'Rod',src:'images/svg/rig.svg',fallback:'images/svg/backup/rig.png'},
      //This ID was added as it will be needed to query for reel manufacturers, but it shouldn't add another weapontype.
      //{id: form.weaponTypesArray[3].manufacturerTypeId,, name:'reels',label:'Reels',src:'images/svg/rig.svg',fallback:'images/svg/backup/rig.png'},
      {name:'custom',label:'Custom',src:'images/svg/gear.svg',fallback:'images/svg/backup/gear.png'}
    ];

    form.weaponType = ko.observable();
    form.manufacturerList = ko.observableArray();
    form.selectedManufacturer = ko.observable();
    form.weaponIsSelected = ko.observable(false);

    form.allWeapons = ko.observableArray();
    form.availableWeapons = ko.observableArray();

    form.showManuSelect = ko.computed(function(){
      if (form.weaponType() && form.weaponType().name != 'custom' && form.selectedWeapon().isEditMode()){
        return true;
      } else {
        return false;
      }

    });

    form.createNewCustomWeapon = function(){
      form.selectedWeapon().update({weaponType:'custom',isEditMode:true});
      form.weaponIsSelected(true);

    };

    form.weaponType.subscribe(updateWeaponsList);

    form.weaponTypeLabel = ko.computed(function(){
      if (form.weaponType()){
        return form.weaponType().label2;
      }
    });

    form.selectedManufacturer.subscribe(function(newValue){
      var newWeaponsList = _.filter(form.allWeapons(),function(weapon){
        return !newValue || weapon.manufacturer() == newValue.name;
      });

      form.availableWeapons(newWeaponsList);
    });

    form.updateSelectedWeapon = function(data){
      form.selectedWeapon().update(ko.toJS(data));
      form.weaponIsSelected(true);
    };

    form.clearWeapon = function(){
      form.weaponType(undefined);
      form.selectedManufacturer(undefined);
      form.selectedWeapon().update({});
      form.availableWeapons(undefined);
      form.weaponIsSelected(false);
      form.selectedWeapon().isEditMode(true);
    };

    form.deleteThisWeapon = function(){
      form.removeWeapon(form.selectedWeapon());
    };

    function setManufactuers(response){
     
      form.manufacturerList(ko.utils.arrayMap(response.result,function(manufacturer){
        return new SimpleManufacturerModel(manufacturer);
      }));
    }

    function updateWeaponsList(newWeaponType){
      if (newWeaponType && newWeaponType.name){
        newWeaponType = newWeaponType.name;
      }
      if (newWeaponType) {
        if (newWeaponType != 'custom') {
          WeaponsRequest.get({type: newWeaponType, onSuccess: setAvailableWeapons, error: log});
        } else {
          form.createNewCustomWeapon();
        }
      }
    }

    function setAvailableWeapons(response){
      form.allWeapons(ko.utils.arrayMap(response.result,function(weapon){
        weapon.weaponType = form.weaponType().name;
        return new SimpleWeaponModel(weapon);
      }));

      form.availableWeapons(form.allWeapons());

      console.log('manu type ID '+form.weaponType().id)
      ManufacturersRequest.manufacturersByType(
        {
        data:{typeId:form.weaponType().id},
        onSuccess:setManufactuers,
        error:log
      });

      console.log(ko.toJS(form.availableWeapons));
    }

    function log(response){
      console.log(response);
    }

    console.log('about to get new weapon types');

    if (form.selectedWeapon().weaponType()){
      form.weaponType(form.selectedWeapon().weaponType());
      updateWeaponsList(form.selectedWeapon().weaponType());
    }

    form.cancelAddNew = function(){
      form.weaponType(undefined);
      form.selectedManufacturer(undefined);
      form.selectedWeapon().update({});
      form.availableWeapons(undefined);
      form.weaponIsSelected(false);
      form.selectedWeapon().isEditMode(true);
      params.returnToStart();
    }
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  CreateNewWeaponForm.prototype.dispose = function() { };
  
  return { viewModel: CreateNewWeaponForm, template: templateMarkup };

});
