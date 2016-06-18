define(['knockout', 'underscore', 'text!./post-feed.html', 'FeedRequest','Feed-Post', 'infiniteScroll', 'scroll-loader'], function(ko, _, template, FeedRequest, FeedPost, infiniteScroll, scrollLoader) {
	function UserPosts(params) {

		var post = this;

		post.drawerContents = ko.observable(); // initially blank; pass HTML markup wrapped with ''
		post.pageTitle = ko.observable('Hembow');
		post.posts = ko.observableArray([]);
		post.posts.extend({
			infinitescroll: {}
		});

		post.feedError = ko.observable(false);
		post.followClicked = ko.observable(0);
		post.delaySetArray = ko.observable(false);
		post.showRefreshFeed = ko.pureComputed(function() {
			return followClicked >= 2;
		});

		post.setArray = function(response){
			post.posts.infinitescroll.viewportWidth(600);
			post.posts.infinitescroll.viewportHeight(1100);
			post.posts.infinitescroll.itemWidth(282);
			post.posts.infinitescroll.itemHeight(405);
			if (post.delaySetArray() == false && !_.isEmpty(response.result)){
				post.feedError(false);
				post.pageTitle('Hembow');
				post.posts(ko.utils.arrayMap(response.result,function(post){
					return new FeedPost(post);
				}));
			} else {
				post.feedError(true);
				post.pageTitle('Build Your Feed');
			}
		};

		post.fetchPosts = function(response){
			FeedRequest.all({
				data:{ userId: JSON.parse(localStorage.getItem('user')).id },
				onSuccess: post.setArray
			});
		};

		post.incrementFollowClick = function(number) {
			incrementCount = post.followClicked() + number;
			post.followClicked(incrementCount);

			if (post.followClicked() >= 3){
				post.delaySetArray(true);
			}
		};

		post.refreshFeed = function() {
			post.delaySetArray(false);
			post.fetchPosts();
		}

		// fetch initial data for the posts array from the server
		post.fetchPosts();		

	}
	
	return { viewModel: UserPosts, template: template };

});
