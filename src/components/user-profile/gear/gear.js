define(['knockout', 'underscore', 
		'text!./gear.html', 'UserWeaponsRequest', 
		'UserWeaponToSimpleWeaponHelper',
    'SimpleWeaponModel'], 
	function(ko, _, templateMarkup, 
		UserWeaponsRequest, UWTSW,
    SimpleWeaponModel) {

  function Gear(params) {

  	var gear = this;

  	gear.isCurrentUser = params.isCurrentUser;
  	
  	gear.hasWeapons = params.hasWeapons;
  	gear.weapons = ko.observableArray([]);
  	

  	if (params.isCurrentUser()){
  		gear.headerTitle = "Your Weapons and Gear";
  	} else {
  		gear.headerTitle = params.user().name()+"\'s Weapons and Gear";
  	}

    //Setting params
    gear.weapon = ko.observable(),
    gear.finalOptionText = ko.observable('New Weapon'),
    gear.finalOptionCallback = ko.observable(),
    gear.removeWeapon = ko.observable(),
    gear.userWeapons = params.userWeapons,
    gear.state = ko.observable('weapon-user-list'),
    gear.selectedWeapon = ko.observable()

  	//New Weapon 

    gear.createNewWeapon = function(){
      console.log('Click');
      gear.hasWeapons(true);
      gear.selectedWeapon(new SimpleWeaponModel({}));
      gear.state('create-new-weapon-form');
    }

    gear.returnToStart = function(){
      gear.state('weapon-user-list');
    }

  	// Error Handling 

  	gear.alertText = ko.observable();
  	gear.alertClass = ko.observable(' alert-info');

    gear.showAddAlert = function(){
      gear.alertClass(' alert-success');
      gear.alertText('Your Weapon has been successfully added!')
    }

  	function weaponsError(res){
  		gear.alertClass(' alert-danger');
  		gear.alertText('There was a problem retrieving your Weapon information. Please refresh the page or try again later.');
  	}
  	
  	gear.clearAlert = function(){
  		gear.alertClass(' alert-info');
  		gear.alertText(null);
  	}
    
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  Gear.prototype.dispose = function() { };
  
  return { viewModel: Gear, template: templateMarkup };

});
