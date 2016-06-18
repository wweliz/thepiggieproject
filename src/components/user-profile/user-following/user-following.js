define(['knockout', 'text!./user-following.html', 'underscore', 'FollowersRequest', 'FollowerModel'], function(ko, templateMarkup, _, FollowersRequest, FollowerModel) {

	function UserFollowing(params) {

		var following = this;

		following.userId = params.user().id;
	
		following.feedError = ko.observable(false);
		following.parseFollowing = ko.observableArray([]);
		following.approvedFollowing = ko.observableArray([]);
		following.currentUserId = ko.observable(JSON.parse(localStorage.getItem('user')).id);	

		following.setArray = function(response) {
			if (!_.isEmpty(response.result)){
				following.parseFollowing(ko.utils.arrayMap(response.result,function(user){
					// only users that have approved the follow request will show on the page
					if(user.isFollowing.condition == true && user.isFollowing.status == 'approved'){
						following.approvedFollowing.push(new FollowerModel(user));
					}
				}));

				if (following.approvedFollowing().length < 1) {
					following.feedError(true);
				}
			} else {
				following.feedError(true);
			}
		};

		FollowersRequest.following({
			data: { userId: following.userId },
			onSuccess: following.setArray
		});

	}
	
	return { viewModel: UserFollowing, template: templateMarkup };

});
