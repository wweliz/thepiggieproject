define(['knockout', 'CountHelper','PlaceholderCover'],function(ko,CountHelper,PlaceholderCover){

	function FollowerModel(data){

		var follower = this;

		follower.cover = ko.observable(data.coverPhoto || PlaceholderCover.randomCover());
		follower.id = ko.observable(data.id);
		follower.profileLink = ko.computed( function(){ return ("#/profile/" + follower.id()) });
		follower.handle = data.username;
		follower.firstName = ko.observable(data.firstName);
		follower.lastName = ko.observable(data.lastName);
		follower.followsId = data.followsId;
		
		follower.fullName = ko.computed(function(){ 
			if ( follower.firstName() ){
				if (follower.lastName()){
					return follower.firstName() + " " + follower.lastName();
				} else {
					return follower.firstName();
				}
			} else{
				return follower.handle;
			}
		} );
		
		follower.home = ko.observable(data.location || null);

		follower.isFollowing = ko.observable();
		follower.status = ko.observable();

		if (data.isFollowing) {
			follower.isFollowing = ko.observable(data.isFollowing.condition);
			follower.status = ko.observable(data.isFollowing.status || 'noFollow');
		}

		follower.rank = data.rank;
		follower.avatar = ko.observable(data.avatar ||  'https://s3-us-west-2.amazonaws.com/hambone-images/e4eca5a624091a7735f455914dc3067e.png');
		follower.coverPhotoURL = data.coverPhotoURL;
		follower.privateUser = ko.observable(data.private || false);

		//TODO: Change data.requestedFollow to appropriate endpoint when built out on server.
		follower.requestedFollow = ko.observable(data.hasRequested || false);

		follower.city = data.city;
		follower.state = data.state;
	
		follower.postCount = ko.observable(data.hunts || data.huntsCount || 0).extend({prettyCount:null});
		follower.followerCount = ko.observable(data.followers || data.followersCount || 0).extend({prettyCount:null});
		follower.followingCount = ko.observable(data.following || data.followingCount || 0).extend({prettyCount:null});

	}

	return FollowerModel;

});