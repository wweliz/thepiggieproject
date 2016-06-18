define(['knockout', 'underscore', 'text!./browse-by-users.html', 'SearchFieldRequest', 'FollowerModel'], function(ko, _, templateMarkup, SearchFieldRequest, FollowerModel) {

	function BrowseByUsers(params) {

		var browse = this;

		browse.userArray = ko.observableArray([]);
		browse.feedError = ko.observable(false);

		browse.setArray = function(response){
			if (!_.isEmpty(response.result)){
				browse.userArray(ko.utils.arrayMap(response.result,function(user){
					console.log(new FollowerModel(user));
					return new FollowerModel(user);
				}));
			} else {
				browse.feedError(true);
			}
		};

		SearchFieldRequest.returnSearchResults({
			data: {
				term: params.searchTerm(),
				topic: 'users'
			},
			onSuccess: browse.setArray
		});

	}

	return { viewModel: BrowseByUsers, template: templateMarkup };

});
