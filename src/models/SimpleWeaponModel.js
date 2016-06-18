define(['knockout'],function(ko){

    function SimpleWeaponModel(params){

       var weapon = this;

        if (!params) {
            params = {};
        }

        weapon.model = ko.observable(params.model);
        weapon.series = ko.observable(params.series);
        weapon.year = ko.observable(params.year);
        weapon.manufacturer = ko.observable();
        if (params.manufacturer) {
            weapon.manufacturer(params.manufacturer.name || params.manufacturer || null);
        }
        weapon.weaponType = ko.observable(params.weaponType);

        weapon.additionalWeapons = ko.observableArray();

        

        weapon.additionalWeapons(ko.utils.arrayMap(params.additionalWeapons, function(additionalWeapon){
            return new SimpleWeaponModel(additionalWeapon);
        }));

        weapon.userWeaponId = ko.observable(params.userWeaponId || null);

        weapon.firearmId = ko.observable();
        weapon.rodId = ko.observable();
        weapon.reelId = ko.observable();
        weapon.bowId = ko.observable();

        if (params.weaponType == 'firearms' || params.firearmId){
            weapon.firearmId(params.firearmId || params.id);
        }else if (params.weaponType == 'bows' || params.bowId){
            weapon.bowId(params.bowId || params.id);
        }else if (params.weaponType == 'rods' || params.rodId){
            weapon.rodId(params.rodId || params.id);
        }else if (params.weaponType == 'reels' || params.reelId){
            weapon.reelId(params.reelId || params.id);
        }

        weapon.image = ko.observable(params.image);

        weapon.mainImage = ko.computed(function(){
            return "images/svg/"+weapon.image()+".svg";
        });

        weapon.backupImage = ko.computed(function(){
            return "images/svg/backup/"+weapon.image()+".png";
        });

        weapon.shortDisplayText = ko.computed(function(){
            if(!_.isEmpty(weapon.additionalWeapons())){
                
                //if(params.weaponType == 'rods' || params.rodId){
                    return 'Fishing Rig';
                //}
            } else {
                var array = [weapon.year(), $.trim(weapon.manufacturer()), $.trim(weapon.model())];
                return array.join(" ");
            }
        });

        weapon.fullDisplayText = ko.computed(function(){
           
            var array = [$.trim(weapon.manufacturer()), $.trim(weapon.series())];
             
            return array.join(" ");
        });

        weapon.isEditMode = ko.observable(params.isEditMode || true);

        weapon.update = function(data){
            if (data) {
                weapon.model(data.model);
                weapon.series(data.series);
                weapon.year(data.year);
                weapon.manufacturer(data.manufacturer);
                weapon.weaponType(data.weaponType);
                if (data.additionalWeapons) {
                    weapon.additionalWeapons(ko.utils.arrayMap(data.additionalWeapons, function (additionalWeapon) {
                        return new SimpleWeaponModel(additionalWeapon);
                    }));
                }
                weapon.isEditMode(data.isEditMode);

                if (data.weaponType == 'firearms' || data.firearmId){
                    weapon.firearmId(data.firearmId || data.id);
                }else if (data.weaponType == 'bows' || data.bowId){
                    weapon.bowId(data.bowId || data.id);
                }else if (data.weaponType == 'rods' || data.rodId){
                    weapon.rodId(data.rodId || data.id);
                }else if (data.weaponType == 'reels' || data.reelId){
                    weapon.reelId(data.reelId || data.id);
                }
            }
        }
    }

    return SimpleWeaponModel;

});