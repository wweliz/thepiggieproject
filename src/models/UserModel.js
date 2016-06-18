define(['knockout','underscore'],function(ko, _){

	function UserModel(data){
		
		var user = this;

		if (_.isUndefined(data)){
			data = {};
		}

		user.id = ko.observable(data.id);

		user.firstName = ko.observable(data.firstName);
		user.lastName = ko.observable(data.lastName);
		user.name = ko.computed(function() { return (user.firstName() + " " + user.lastName()); });

		// if a user  has not set their first and last names, substitute their username
		if (!data.firstName && !data.lastName) {
			user.name = ko.observable(data.username);
		}
		user.isPrivate = ko.observable(data.private || null);
		user.avatar = ko.observable(data.avatar);
		user.coverPhoto = ko.observable(data.coverPhoto);
		user.handle = ko.observable(data.username);
		user.email = ko.observable(data.email);
		
		user.role = data.role;
		user.createdAt = ko.observable(data.createdAt);
		user.active = ko.observable(data.active);

		// user counts
		user.postCount = ko.observable(data.followersCount);
		user.followerCount = ko.observable(data.followingCount);
		user.followingCount = ko.observable(data.huntsCount);

		// user URLs
		user.profileUrl = ko.computed(function(){
			return "#/profile/" + user.id();
		});
		user.trophyUrl = ko.computed(function(){
			return "#/profile/" + user.id() + "/trophy-case";
		});
		user.likesUrl = ko.computed(function(){
			return "#/profile/" + user.id() + "/likes";
		});

		user.weaponsUrl = ko.observable( "#/profile/" + user.id() + "/weapons" );
		user.rankUrl = ko.observable( "#/profile/" + user.id() + "/rank" );
		user.clubsUrl = ko.observable( "#/profile/" + user.id() + "/clubs" );
		user.followersUrl = ko.observable( "#/profile/" + user.id() + "/followers" );
		user.followingUrl = ko.observable( "#/profile/" + user.id() + "/following" );
		user.settingsUrl = ko.observable( "#/profile/" + user.id() + "/settings" );
		user.gearUrl = ko.observable( "#/profile/" + user.id() + "/gear" );


		user.update = function(data){
			_.each(data,function(value,key){
				if (ko.isObservable(user[key])){
					user[key](value);
				}
			});
		}

	}

	return UserModel;

});