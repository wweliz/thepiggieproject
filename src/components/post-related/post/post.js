define(['knockout', 'underscore', 'text!./post.html', 'LikeRequest', 'PostTitleHelper'], function(ko, _, templateMarkup, LikeRequest, postTitleHelper) {

	function Post(params) {

		var post = this;

		post.post = params.post;

		post.postTypeClass = ko.observable("post-default");
		post.processingLike = ko.observable(false);

		var postType = 0;
		
		if(post.post.critters){
			if (!_.isEmpty(post.post.critters())){
				var postType = post.post.critters()[0].type.id;
			}
		}

		if (postType == 1){
			post.postTypeClass("post-big-game");
		} else if (postType == 2){
			post.postTypeClass("post-small-game");
		} else if (postType == 3){
			post.postTypeClass("post-upland-bird");
		} else if (postType == 4){
			post.postTypeClass("post-waterfowl");
		} else if (postType == 5){
			post.postTypeClass("post-reptile");
		} else if (postType == 6){
			post.postTypeClass("post-freshwater");
		} else if (postType == 7){
			post.postTypeClass("post-saltwater");
		} else if (postType == 8){
			post.postTypeClass("post-trailcam");
		} else if (postType == 9){
			post.postTypeClass("post-scenic");
		}

    	post.likesArray = ko.observableArray(params.post.likesArray());
		post.likesCount = ko.observable(params.post.likesCount());
		post.currentUserLike = ko.observable();

		// set initial likes
		setCurrentUserLike();
		// watch for changes to likes array
		post.likesArray.subscribe(setCurrentUserLike);

		function setCurrentUserLike(){
			var selection = _.find(post.likesArray(),function(like){
				return like.userId == JSON.parse(localStorage.getItem('user')).id
			});

			post.currentUserLike(selection);
		}

		post.incrementLikesUp = function(response) {
			post.processingLike(false);
			incrementCount = post.likesCount() + 1;
			post.likesCount(incrementCount);
			post.likesArray.push(response.result);
		};

		post.incrementLikesDown = function(response) {
			post.processingLike(false);
			incrementCount = post.likesCount() - 1;
			post.likesCount(incrementCount);
			
			var likeToRemove = _.find(post.likesArray(),function(like){
				return like.userId == $.sc.currentUserId();
			});

			post.likesArray.remove(likeToRemove);
		};

		post.onLikeError = function(response) {
			console.log(response);
		};

		post.likePost = function() {
			post.processingLike(true);
			LikeRequest.createLike({
				data:{
					huntId: params.post.id()
				},
				onSuccess: post.incrementLikesUp,
				onLikeError: post.onLikeError
			});
		};

		post.deleteLike = function() {
			post.processingLike(true);
			if (!_.isNull(post.currentUserLike().id) && !_.isUndefined(post.currentUserLike().id))
			LikeRequest.deleteLike({
				data:{
					id: post.currentUserLike().id
				},
				onSuccess: post.incrementLikesDown,
				onLikeError: post.onLikeError
			});
		};

		post.likeOrUnlike = function(data) {
			if (!_.isUndefined(post.currentUserLike()) && !_.isNull(post.currentUserLike()) && !_.isEmpty(post.currentUserLike())) {
				// user has already liked the post
				post.deleteLike();
			} else {
				// user has not yet liked the post
				post.likePost();
			}
		};

	}
	
	return { viewModel: Post, template: templateMarkup };

});