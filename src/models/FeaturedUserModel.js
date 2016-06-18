define(['knockout','underscore', 'CountHelper', 'FeaturedPostModel'],function(ko, _, CountHelper, FeaturedPostModel){

	function FeaturedUserModel(data) {

		// console.log(data);

		var user = this;

		user.featuredUserId = ko.observable(data.id);
		user.id = ko.observable(data.userId);

		user.firstName = ko.observable(data.user.firstName);
		user.lastName = ko.observable(data.user.lastName);
		user.name = ko.computed(function() { return user.firstName() + " " + user.lastName(); } );
		user.userIsPrivate = ko.observable(data.user.private);

		user.avatar = ko.observable(data.user.avatar);
		user.handle = ko.observable('@' + data.user.username);
		user.profileUrl = ko.observable('#/profile/' + data.userId);
		user.followingUrl = ko.observable('#/profile/' + data.userId + '/following');
		user.followerUrl = ko.observable('#/profile/' + data.userId + '/followers');

		// user.homeLocation = ko.observable(data.user.username);
		user.postCount = ko.observable(data.user.hunts.length).extend({prettyCount:null});
		// user.followingCount = ko.observable(data.user.following.length).extend({prettyCount:null});
		// user.followerCount = ko.observable(data.user.followers.length).extend({prettyCount:null});

		user.huntsArray = ko.observable(data.user.hunts);

		// if the user object has attached hunts, pass them through the FeaturedPostModel and
		// map the post into the postsArray observable
		if (data.user.hunts.length > 0) {
			user.postsArray = ko.observableArray([]);

			user.postsArray(ko.utils.arrayMap(data.user.hunts,function(post){
				return new FeaturedPostModel(post);
			}));
		}

	}

	return FeaturedUserModel;

});
