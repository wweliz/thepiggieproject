define(['knockout', 'underscore', 'text!./user-followers.html', 'FollowersRequest', 'FollowerModel'], function(ko, _, templateMarkup, FollowersRequest, FollowerModel) {

	function UserFollowers(params) {

		var follower = this;

		follower.userId = params.user().id;

		follower.feedError = ko.observable(false);
		follower.parseFollowers = ko.observableArray([]);
		follower.approvedFollowers = ko.observableArray([]);
		follower.followRequests = ko.observableArray([]);
		follower.reqVis = ko.observable(false);
		follower.pendingReqBtnText = ko.observable('Collapse');
		follower.currentUserId = ko.observable(JSON.parse(localStorage.getItem('user')).id);

		follower.currentUserAndPendingRequests = function(){
			var status = false;
			if (params.isCurrentUser() && follower.followRequests().length >= 1) {
				status = true;
			}
			return status;
		}

		function setFollows(response){
			
			if (!_.isEmpty(response.result)){
				follower.parseFollowers(ko.utils.arrayMap(response.result,function(user){
					if(!user.hasRequested){
						follower.approvedFollowers.push(new FollowerModel(user));
					} else {
						follower.reqVis(true);
						follower.followRequests.push(new FollowerModel(user));
					}
				}));
			} else {
				follower.feedError(true);
			}
		}

		follower.expandCollapse = function(){
			if (follower.reqVis() == true) {
				// collapse pending requests
				follower.reqVis(false);
				follower.pendingReqBtnText('Expand');
			} else {
				// expand pending requests
				follower.reqVis(true);
				follower.pendingReqBtnText('Collapse');
			}
		};

		follower.updatePending = function(reqId, actionTaken, user){

			if (follower.followRequests.length > 1) {
				follower.followRequests.remove(function(item) { return item.followsId == reqId }); //Removes usercard from the list of pending requests. 
			} else {
				follower.followRequests.remove(function(item) { return item.followsId == reqId }); //Removes usercard from the list of pending requests. 
			} 

			if (actionTaken == 'accepted') {
				user.requestedFollow(false); // Removes the request panel from the userCard without an additional server call. 
				follower.approvedFollowers.push(user);
			}
		}

		FollowersRequest.followers({
			data: { userId: follower.userId },
			onSuccess: setFollows
		});

	}
	
	return { viewModel: UserFollowers, template: templateMarkup };

});
