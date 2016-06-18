define(['knockout', 'underscore', 'text!./browse.html', 'ExploreRequest','Feed-Post', 'infiniteScroll', 'scroll-loader'], function(ko, _, template, ExploreRequest, FeedPost, infiniteScroll, scrollLoader) {
	function UserPosts(params) {

		var post = this;

		post.drawerContents = ko.observable(); // initially blank; pass HTML markup wrapped with ''
		post.pageTitle = ko.observable('Browse Hembow Post');
		post.posts = ko.observableArray([]);
		post.posts.extend({
			infinitescroll: {}
		});

		post.type = ko.computed(function() {
			
			return params.route().type;
		});

		post.id = ko.computed(function() {
			
			return params.route().speciesId;
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
				post.posts(ko.utils.arrayMap(response.result,function(post){
					return new FeedPost(post);
				}));
			} else {
				post.feedError(true);
			}
		};

		function requestData(){
			var data = {pagesize: 20};
			if (post.type() == 'species'){
				data.species = post.id();
			} else if ( post.type() == 'subspecies'){
				data.subspecies = post.id();
			}

			return data;

		}

		post.fetchPosts = function(response){
			
			ExploreRequest.hunts({
				data: requestData(),
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