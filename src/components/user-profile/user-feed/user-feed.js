define(['knockout', 'underscore', 'text!./user-feed.html', 'UserPostRequest','Feed-Post', 'infiniteScroll', 'scroll-loader'], function(ko, _, template, UserPostRequest, FeedPost, infiniteScroll, scrollLoader) {

	function UserPosts(params) {
	
		var post = this;

		post.userId = params.user().id;
		post.isCurrentUser = params.isCurrentUser;
        post.mapView = params.mapView;

		post.posts = ko.observableArray([]);
		post.feedError = ko.observable(false);

		post.posts.extend({
			infinitescroll: {}
		});

        post.heatmapActive = params.mapView;  // observable
        post.heatmapText = ko.observable("View Heatmap");
        if ( post.heatmapActive() ) {
            post.heatmapText("View Feed");
        }
        post.postsLoaded = ko.observable(false);
        post.delaySetArray = ko.observable(false);

        post.setArray = function(response){
        	post.posts.infinitescroll.viewportWidth(600);
			post.posts.infinitescroll.viewportHeight(1100);
			post.posts.infinitescroll.itemWidth(282);
			post.posts.infinitescroll.itemHeight(405);
			if (post.delaySetArray() == false && !_.isEmpty(response.result)){
				post.feedError(false);
                var tempPosts = [];
				// need to check whether each postInstance has a photo array
				response.result.forEach(function(postInstance) {
					if (postInstance.photos[0]) {
						// if the postInstance has a photo array,
						// send it through the FeedPost model and
						// push that into the user's posts Array
						tempPosts.push(new FeedPost(postInstance));
					}
				});
                post.posts(tempPosts);
                post.postsLoaded(true);
			} else {
				post.feedError(true);
			}
		};

        post.toggleHeatmap = function(data, e) {
            post.heatmapActive(!post.heatmapActive());
            var hash = 'profile/' + post.userId();
            if (post.heatmapActive()){
                hash = hash + '/map';
                post.heatmapText("View Feed");
            } else {
                post.heatmapText("View Heatmap");
            }
            $.router.hasher.changed.active = false; //disable changed signal
            $.router.hasher.setHash(hash); //set hash without dispatching changed signal
            $.router.hasher.changed.active = true; //re-enable signal
            //window.console && console.log('toggled heatmap to: ' + post.heatmapActive());
        }


		UserPostRequest.all({
				data:{
					userId: post.userId
				},
				onSuccess: post.setArray
		});

	}
	
	return { viewModel: UserPosts, template: template };

});
