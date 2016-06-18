define(['underscore', 'SimpleWeaponModel'],function(_, SimpleWeaponModel){

    function UserWeaponToSimpleWeaponHelper(){

        var helper = this;

        helper.convert = function(userWeapon){
            var params = null;
            if (!_.isEmpty(userWeapon.bow)){
                params = {
                    model : userWeapon.bow.model,
                    series : userWeapon.bow.series,
                    year : userWeapon.year,
                    manufacturer : userWeapon.bow.manufacturer,
                    weaponType : userWeapon.bow.bowTypeId,
                    image : "bow",
                    userWeaponId : userWeapon.id,
                    bowId : userWeapon.bowId
                }
            }else if (!_.isEmpty(userWeapon.firearm)){
                params = {
                    model : userWeapon.firearm.model,
                    series : userWeapon.firearm.series,
                    year : userWeapon.year,
                    manufacturer : userWeapon.firearm.manufacturer,
                    weaponType : userWeapon.firearm.firearmTypeId,
                    image : "firearm",
                    userWeaponId : userWeapon.id,
                    firearmId : userWeapon.firearmId
                }
            }else if (!_.isEmpty(userWeapon.userRig)){
                params = {
                    model : userWeapon.userRig.rod.model,
                    series : userWeapon.userRig.rod.series,
                    year : userWeapon.userRig.rod.year,
                    manufacturer : userWeapon.userRig.rod.manufacturer,
                    weaponType : userWeapon.userRig.rod.reelTypeId,
                    image : "rig",
                    userWeaponId : userWeapon.id,
                    rodId : userWeapon.rodId,
                    reelId : userWeapon.reelId,
                    additionalWeapons : [{
                        model : userWeapon.userRig.reel.model,
                        series : userWeapon.userRig.reel.series,
                        year : userWeapon.userRig.reel.year,
                        manufacturer : userWeapon.userRig.reel.manufacturer,
                        weaponType : userWeapon.userRig.reel.reelTypeId,
                        userWeaponId : userWeapon.id
                    }]
                }
            } else if (!_.isEmpty(userWeapon.custom)){

                params = {
                    model : userWeapon.custom.model,
                    manufacturer : userWeapon.custom.make,
                    manufacturerName : userWeapon.custom.make,
                    year: userWeapon.custom.year,
                    image : "gear",
                    userWeaponId : userWeapon.id,
                    series: 'Custom Weapon'

                }

            }else{
                window.console && console.log('cannot determine weapon type');
                return false;
            }

            return new SimpleWeaponModel(params);
        }


    }

    return new UserWeaponToSimpleWeaponHelper();
});