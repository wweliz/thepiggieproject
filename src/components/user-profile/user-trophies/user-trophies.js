define(['knockout', 'underscore', 'text!./user-trophies.html', 'TrophyRequest','TrophyModel'], function(ko, _, templateMarkup, TrophyRequest, TrophyModel) {

	function UserTrophies(params) {

		var trophy = this;

		trophy.userId = params.user().id;

		trophy.trophyArray = ko.observableArray([]);
		trophy.feedError = ko.observable(false);
		trophy.errorMsg = ko.observable();

		trophy.setArray = function(response){
			if (!_.isEmpty(response.result)){
				trophy.trophyArray(ko.utils.arrayMap(response.result,function(trophyInstance) {
					return new TrophyModel(trophyInstance);
				}));
  		} else {
				trophy.feedError(true);
				trophy.errorMsg('This user has not earned any trophies yet.');
			}
		};

		trophy.onError = function(response) {
			trophy.errorMsg('Oh no! There was an error loading your badges.');		
			console.log(response);
		};

		// TrophyRequest.all({
		// 	data:{ userId: trophy.userId },
		// 	onSuccess: trophy.setArray,
		// 	onError: trophy.onError
		// });

	}
	
	return { viewModel: UserTrophies, template: templateMarkup };

});
