define(['knockout', 'underscore', 'text!./featured-posts-feed.html', 'FeaturedPostRequest','Feed-Post'], function(ko, _, templateMarkup, FeaturedPostRequest, FeedPost) {

	function FeaturedPostsFeed(params) {

		var featured = this;
		
		featured.featuredPosts = ko.observableArray([]);

		featured.setArray = function(response) {
			if (!_.isEmpty(response)){
				featured.featuredPosts(ko.utils.arrayMap(response.result,function(post){
					return new FeedPost(post);
				}));
			}
		};

		featured.onError = function(response) {
			console.log(response);
		};

		FeaturedPostRequest.all({
			data: { userId: params.user },
			onSuccess: featured.setArray,
			onError: featured.onError
		});

	}
	
	return { viewModel: FeaturedPostsFeed, template: templateMarkup };

});
