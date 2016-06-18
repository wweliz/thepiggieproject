define(['knockout', 'underscore', 'text!./browse-by-posts.html', 'SearchFieldRequest','Feed-Post'], function(ko, _, templateMarkup, SearchFieldRequest, FeedPost) {

	function BrowseByPosts(params) {

		var browse = this;

		browse.posts = ko.observableArray([]);
		browse.feedError = ko.observable(false);

		browse.setArray = function(response){
			if (!_.isEmpty(response.result)){

				// need to check whether each postInstance has a photo array
				response.result.forEach(function(postInstance) {
					if (postInstance.photos[0]) {
						// if the postInstance has a photo array,
						// send it through the FeedPost model and
						// push that into the user's posts Array
						browse.posts.push( new FeedPost(postInstance) );
					}
				});

			} else {
				browse.feedError(true);
			}
		};

		SearchFieldRequest.returnSearchResults({
			data: {
				term: params.searchTerm(),
				topic: 'hunts'
			},
			onSuccess: browse.setArray
		});

	}

	return { viewModel: BrowseByPosts, template: templateMarkup };

});
