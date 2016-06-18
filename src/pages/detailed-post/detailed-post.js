define(['knockout', 'text!./detailed-post.html', 'UserPostRequest', 'LikeRequest', 'Detailed-Post'], function(ko, template, UserPostRequest, LikeRequest, DP) {

	function DetailedPost(params) {

		var post = this;

		post.id = params.route().id;	
		
		post.post = ko.observable();
		post.coordsValid = ko.observable(false);
		post.likesArray = ko.observableArray();
		post.likesCount = ko.observable();		
		post.currentUserLike = ko.observable();
		post.postError = ko.observable(false);
		post.errorPageTitle = ko.observable('Hembow | Deleted Post');
		post.editHuntSlug = 'edit-hunt';

		setCurrentUserLike();
		post.likesArray.subscribe(setCurrentUserLike);	

		post.onError = function(response) {
			post.postError(true);
		};	

		post.onResponse = function(response) {

			// check that response contains latitude and longitude coordinates
			if (response.result.location.latitude && response.result.location.longitude) {
				post.coordsValid(true);
			}

			// send response through detailed post model
			post.post(new DP(response.result));
			post.post().photos.push(response.result.photos);
			post.likesArray(response.result.likes);
			post.likesCount(response.result.likes.length);
		};

		UserPostRequest.get({
			data:{
				id: post.id
			},
			onSuccess: post.onResponse,
			onError: post.onError
		});

		function setCurrentUserLike(){
			var selection = _.find(post.likesArray(),function(like){
				return like.userId == $.sc.currentUserId();
			});

			post.currentUserLike(selection);
		}

		post.incrementLikesUp = function(response) {
			incrementCount = post.likesCount() + 1;
			post.likesCount(incrementCount);
			post.likesArray.push(response.result);
		};

		post.incrementLikesDown = function(response) {
			incrementCount = post.likesCount() - 1;
			post.likesCount(incrementCount);
			
			var likeToRemove = _.find(post.likesArray(),function(like){
				return like.userId == $.sc.currentUserId();
			});

			post.likesArray.remove(likeToRemove);
		};

		post.likePost = function() {
			LikeRequest.createLike({
				data:{
					huntId: post.id,
					userId: $.sc.currentUserId()
				},
				onSuccess: post.incrementLikesUp,
				onError: post.onError
			});
		};

		post.deleteLike = function() {
			if (!_.isNull(post.currentUserLike().id) && !_.isUndefined(post.currentUserLike().id))
			LikeRequest.deleteLike({
				data:{
					id: post.currentUserLike().id
				},
				onSuccess: post.incrementLikesDown,
				onError: post.onError
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

		post.deletePostPrompt = function(){
			$.sc.modal.show({
				cname:"verify-shell",
				cparams: {
					message: 'Are you sure you want to delete this post and all of its related data? This cannot be undone.',
					confirmText: 'Delete Post',
			 		callback: deleteConfirmed
				}
			});
		}

		function deleteConfirmed(){
			UserPostRequest.deletePost({
				data:{
					id: post.id
				},
				onSuccess: deleteSuccess,
				onError: deleteError
			})
		}

		function deleteSuccess(response){
			window.location.hash = '/profile';
		}

		function deleteError(response){
			console.log(response);
		}

		post.showEditPost = function() {
			window.location.hash = '/'
				+ post.editHuntSlug
				+ '/' + post.id;
		}

	}

	return { viewModel: DetailedPost, template: template };

});
