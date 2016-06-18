define(['knockout','underscore', 'CountHelper'],function(ko, _, CountHelper){

	function FeaturedClubModel(data){

		var club = this;

		club.id = ko.observable(data.club.id);
		club.name = ko.observable(data.club.name);
		club.isPrivate = ko.observable(data.club.private);

		club.avatar = ko.observable(data.club.avatar);
		// club.homeLocation = ko.observable(data.club.homeLocation);

		// club.postCount = ko.observable(data.club.postCount).extend({prettyCount:null});
		// club.followingCount = ko.observable(data.club.following).extend({prettyCount:null});
		// club.followerCount = ko.observable(data.club.followers).extend({prettyCount:null});

		club.profileUrl = ko.observable( "#/profile/" + data.club.id);

	}

	return FeaturedClubModel;

});