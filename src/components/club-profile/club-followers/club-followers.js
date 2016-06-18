define(['knockout', 'underscore', 'text!./club-followers.html', 'FollowersRequest', 'FollowerModel'], function(ko, _, templateMarkup, FollowersRequest, FollowerModel) {

	function ClubFollowers(params) {

		var follower = this;

		follower.clubId = params.club().id;

		follower.feedError = ko.observable(false);
		follower.parseFollowers = ko.observableArray([]);
		follower.approvedFollowers = ko.observableArray([]);

		function setFollows(response){
			if (!_.isEmpty(response.result)){
				follower.parseFollowers(ko.utils.arrayMap(response.result,function(user){
					if(!user.hasRequested){
						follower.approvedFollowers.push(new FollowerModel(user));
					}
				}));
			} else {
				follower.feedError(true);
			}
		}

		FollowersRequest.followers({
			data: { userId: follower.clubId },
			onSuccess: setFollows
		});

	}
	
	return { viewModel: ClubFollowers, template: templateMarkup };

});
