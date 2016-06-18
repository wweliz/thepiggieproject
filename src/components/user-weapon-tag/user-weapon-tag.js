define(['knockout', 'text!./user-weapon-tag.html', 'UserWeaponsRequest'], function(ko, templateMarkup, UserWeaponsRequest) {

  function UserWeaponTag(params) {

    var tag = this;

    tag.weapon = params.weapon;

    tag.selectable = params.selectable;

    tag.toggleSelection = function(){ return null }
    tag.deleteWeapon = params.deleteWeapon || false;



    if (tag.selectable){

      tag.selectedWeapon = params.selectedWeapon;

      tag.toggleSelection = function(){
        if (tag.selectedWeapon() == tag.weapon){
          deselect();
        }else{
          select(tag.weapon);
        }
      };

      function select(data){
        tag.selectedWeapon(data);
      }

      function deselect(){
        tag.selectedWeapon(undefined);
      }

      tag.css = ko.computed(function(){
        var result = "fa-circle-o";
        if (tag.selectedWeapon() == tag.weapon){
          result = "fa-check-circle";
        }
        return result;
      });

      tag.cardCss = ko.computed(function(){
        var result = "col-xs-10 col-xs-push-1 ";
        if (tag.selectedWeapon() == tag.weapon){
          result = "selected col-xs-10 col-xs-push-1 ";
        }
        return result;
      });

    } else {
      tag.cardCss =  ko.computed(function(){ return " well col-sm-6 col-md-4 col-xs-10";});
      tag.css =  ko.computed(function(){ return "";});
    }

    
    //Delete Weapon
    tag.alertText = params.alertText || ko.observable(null);
    tag.alertClass = params.alertClass || ko.observable(null);

    tag.deleteWeaponPrompt = function(weaponId){
      $.sc.modal.show({
          cname:"verify-shell",
          cparams: {
            message: 'Are you sure you want to delete this weapon? It will no longer appear with posts you have assigned it to. This cannot be undone.',
            confirmText: 'Delete Weapon',
            callback: deleteConfirmed
          }
        });
    }

    function deleteConfirmed(weaponId){
      var weaponId = params.weapon.userWeaponId()

      UserWeaponsRequest.delete({
        data:{
          id: weaponId
        },
        onSuccess: deleteSuccess,
        onError: deleteError
      })
    }

    function deleteSuccess(response){

      tag.alertClass(' alert-success');
      tag.alertText('Your weapon has successfully been removed!');
    }

    function deleteError(response){
      tag.alertClass(' alert-danger');
      tag.alertText('There was a problem deleting your Weapon information. Please refresh the page or try again later.');
    }
   

  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  UserWeaponTag.prototype.dispose = function() { };
  
  return { viewModel: UserWeaponTag, template: templateMarkup };

});
