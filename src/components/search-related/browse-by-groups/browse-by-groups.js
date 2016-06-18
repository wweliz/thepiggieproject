define(['knockout', 'underscore', 'text!./browse-by-groups.html', 'SearchFieldRequest', 'ClubModel'], function(ko, _, templateMarkup, SearchFieldRequest, ClubModel) {

	function BrowseByGroups(params) {

		var browse = this;

		browse.allClubs = ko.observableArray([]);
		browse.feedError = ko.observable(false);

		browse.setArray = function(response){
			if (!_.isEmpty(response.result)){
				browse.allClubs(ko.utils.arrayMap(response.result,function(club){
					return new ClubModel(club);
				}));
			} else {
				browse.feedError(true);
			}
		};

		SearchFieldRequest.returnSearchResults({
			data: {
				term: params.searchTerm(),
				topic: 'groups'
			},
			onSuccess: browse.setArray
		});
		
	}

	return { viewModel: BrowseByGroups, template: templateMarkup };

});
