define(['knockout', 'CountHelper'], function(ko, CountHelper) {

	function MemberModel(data){

		// console.log(data);

		var member = this;

		member.id = ko.observable(data.id);

		member.firstName = ko.observable(data.firstName);
		member.lastName = ko.observable(data.lastName);
		
		member.fullName = ko.computed(function(){ 
			if (data.firstName){
				if (data.lastName){
					return data.firstName + ' ' + data.lastName;
				} else {
					return data.firstName;
				}
			} else{
				return data.username;
			}
		});

		member.privateUser = ko.observable(data.private || false);
		member.avatar = ko.observable(data.avatar ||  'https://s3-us-west-2.amazonaws.com/hambone-images/e4eca5a624091a7735f455914dc3067e.png');
		member.cover = ko.observable(data.coverPhoto || 'http://lorempixel.com/300/120/animals/');

		member.handle = ko.observable(data.username);
		member.profileLink = ko.computed( function(){ return ("#/profile/" + data.id) });

		member.rank = data.rank || 'http://placehold.it/25x25';

		member.city = data.city;
		member.state = data.state;
		member.home = ko.observable(data.location || 'Somewhere, USA');

		member.postCount = ko.observable(data.postCount).extend({prettyCount:null});
		member.followerCount = ko.observable(data.members || 0);
		member.followingCount = ko.observable(data.following || 0).extend({prettyCount:null});

	}

	return MemberModel;

});