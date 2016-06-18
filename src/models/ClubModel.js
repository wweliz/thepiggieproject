define(['knockout','underscore'],function(ko,_){

	function ClubModel(data){

		var club = this;

		if (_.isUndefined(data)){
			data = {};
		}

		club.id = data.id;
		club.created_at = data.created_at;
		club.creator = data.creator;

		// club.groupType = ko.observable(data.groupType);
		club.isPrivate = ko.observable(data.isPrivate);
		// club.published = ko.observable(data.published);
		// club.updated_at = ko.observable(data.updated_at);	
		
		club.clubname = ko.observable(data.name);
		club.avatar = ko.observable(data.avatar || 'https://s3-us-west-2.amazonaws.com/hambone-images/97fe8da79c871d41aec9fc73b46c8b9b.png');
		club.coverPhoto = ko.observable(data.coverPhoto || 'http://lorempixel.com/1170/300/animals/');
		// club.city = ko.observable(data.city);
		// club.state = ko.observable(data.state);

		// COUNTS
		club.postCount = ko.observable(data.huntsCount).extend({prettyCount:null});
		club.memberCount = ko.observable(data.membersCount).extend({prettyCount:null});
		club.followerCount = ko.observable(data.followersCount).extend({prettyCount:null});

		// URLs
		club.profileUrl = ko.observable( "#/club/" + club.id );
		club.feedUrl = ko.observable( "#/club/" + club.id );	
		club.settingsUrl = ko.observable( "#/club/" + club.id + "/settings" );
		club.aboutUrl = ko.observable( "#/club/" + club.id + "/about" );
		club.membersUrl = ko.observable( "#/club/" + club.id + "/members" );
		club.followersUrl = ko.observable( "#/club/" + club.id + "/followers" );

		club.update = function(data){
			club.id = data.id;
			club.clubname(data.clubname);
			club.avatar(data.avatar);
			club.coverPhoto(data.coverPhoto);
			club.createdAt(data.createdAt);
			club.city(data.city);
			club.state(data.state);
			club.postCount(data.postCount);
			club.memberCount(data.memberCount);
			club.followerCount(data.followerCount);
		};

	}

	return ClubModel;

});
