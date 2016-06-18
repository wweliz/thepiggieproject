define(['knockout', 'text!./user-clubs.html', 'underscore', 'ClubRequest', 'ClubModel'], function(ko, template, _, ClubRequest, ClubModel) {

  function UserClubs(params) {

  	var club = this;

		club.allClubs = ko.observableArray([]);
		club.feedError = ko.observable(false);

		club.setArray = function(response){
			if (!_.isEmpty(response.result)){
				club.allClubs(ko.utils.arrayMap(response.result,function(club){
					return new ClubModel(club);
				}));
  		} else {
				club.feedError(true);
			}
		};

		ClubRequest.allClubs({
			onSuccess: club.setArray
		});

  }
  
  return { viewModel: UserClubs, template: template };

});
