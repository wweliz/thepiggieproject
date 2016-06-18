define(['knockout', 'underscore', 'text!./featured-users-feed.html', 'FeaturedUserRequest','FeaturedUserModel'], function(ko, _, templateMarkup, FeaturedUserRequest, FeaturedUserModel) {

	function FeaturedUsersFeed(params) {

		var featured = this;

		featured.incrementFollowClick = params.incrementFollowClick;

		featured.featuredUsers = ko.observableArray([]);

		featured.setArray = function(response) {
			//console.log(response.result);
			if (!_.isEmpty(response)){
				featured.featuredUsers(ko.utils.arrayMap(response.result,function(user){
					return new FeaturedUserModel(user);
				}));
			}
		};

		featured.onError = function(response) {
			console.log(response);
		};

		FeaturedUserRequest.all({
			data: { userId: params.user },
			onSuccess: featured.setArray,
			onError: featured.onError
		});

	}

	return { viewModel: FeaturedUsersFeed, template: templateMarkup };

});
