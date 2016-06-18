define(['knockout', 
    'text!./weapon-data-input.html',
    'UserWeaponsRequest',
    'SimpleWeaponModel',
    'HamboneConstants'
    ], function(
      ko, 
      templateMarkup, 
      UserWeaponsRequest, 
      SimpleWeaponModel, 
      HBC
      ) {

  function WeaponDataInput(params) {

    var input = this;

    input.userWeapons = params.userWeapons;
    input.selectedWeapon = params.selectedWeapon;
    console.log(input.selectedWeapon());
    console.log(input.userWeapons);
    input.clearWeapon = params.clearWeapon;
    input.returnToStart = params.returnToStart;
    input.saveWeapon = params.saveWeapon || saveWeapon;
    input.showAddAlert = params.showAddAlert || null;

    input.addReel = function(){
      input.selectedWeapon().isEditMode(false);
      input.selectedWeapon().additionalWeapons.push(new SimpleWeaponModel({weaponType:{id: HBC.WEAPON_TYPES[2].manufacturerTypeId, name:'reels',label:'Reels',label2:'Reel',src:'images/svg/reel.svg',fallback:'images/svg/backup/reel.png'}}));
    };

    function saveWeapon(){
      input.selectedWeapon().isEditMode(false);
      UserWeaponsRequest.post({
        data : ko.toJS(input.selectedWeapon),
        onSuccess : addWeaponToUserWeapons,
        onError : console.log
      });
      if(input.showAddAlert){
        console.log(input.showAddAlert);
        input.showAddAlert();
      }
      input.returnToStart();

    }

    function addWeaponToUserWeapons(response){
      var res = response.result
      console.log(res);

      var newData = buildResponseData(res);  
      var newWeapon = new SimpleWeaponModel( newData );
      input.userWeapons.push(newWeapon);

      updateSelectedWeapon(newData);
    }

    function buildResponseData(res){
      var data = res;
      data.userWeaponId = res.id;

      if (data.bowId){
        data.image = "bow";
        _.extend(data, data.bow);
      }else if(data.firearmId){
        data.image = "firearm";
        _.extend(data, data.firearm);
      }else if(data.userRigId){
        data.image = "rig";
        if(data.userRig.rod){
          _.extend(data, data.userRig.rod);
        }
        if(data.userRig.reel){
          data.additionalWeapons =[];
          data.additionalWeapons.push(data.userRig.reel);           
        }
      }else if (res.customId){
          data.image = "gear";
          _.extend(data, data.custom);
      }

      return data;

    }

    function updateSelectedWeapon(a){
      // @PAT, IS THIS REALLY HOW THIS IS SUPPOSED TO WORK: 
      input.selectedWeapon().model(a.model);
      input.selectedWeapon().series(a.series);
      input.selectedWeapon().year(a.year);
      if(a.manufacturer){
        input.selectedWeapon().manufacturer(a.manufacturer.name);
      }
      input.selectedWeapon().weaponType(a.weaponType);
      input.selectedWeapon().userWeaponId(a.userWeaponId);
      input.selectedWeapon().image(a.image);
      if(!_.isEmpty(a.additionalWeapons)){
        console.log('has additionalWeapons');
        input.selectedWeapon().additionalWeapons(ko.utils.arrayMap(a.additionalWeapons, function(additionalWeapon){
            return new SimpleWeaponModel(additionalWeapon);
        }));
      }
    }

    input.restart = function(){
      input.clearWeapon();
      input.returnToStart();
    }

  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  WeaponDataInput.prototype.dispose = function() { };
  
  return { viewModel: WeaponDataInput, template: templateMarkup };

});
