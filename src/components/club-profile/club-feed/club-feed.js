define(['knockout', 
	'underscore', 
	'text!./club-feed.html', 
	'HuntsRequest',
	'Feed-Post'], 
	function(ko, 
		_, 
		template, 
		HuntsRequest, 
		FeedPost) {

  function ClubPosts(params) {

		var post = this;

		post.clubId = params.club().id;

		// creates an empty array
		post.posts = ko.observableArray([]);
		post.feedError = ko.observable();

		post.setArray = function(response){
			if (!_.isEmpty(response.result)){
				post.posts(ko.utils.arrayMap(response.result,function(post){
					return new FeedPost(post);
				}));
			} else {
				post.feedError("This club currently has no posts available to view.");
			}
		};

		// fetch data for the posts array from the server
		HuntsRequest.all({
				data:{
					clubId: post.clubId,
				},
				onSuccess: post.setArray
		});

  }
  
  return { viewModel: ClubPosts, template: template };

});
