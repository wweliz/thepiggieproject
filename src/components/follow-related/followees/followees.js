define(['knockout', 'text!./followees.html', 'underscore', 'FollowersRequest', 'FollowerModel', 'GetUsersRequest'], function(ko, templateMarkup, _,FollowersRequest, FollowerModel, GetUsersRequest) {

	function Followees(params){

		var follower = this;

		follower.requestName = params.call();
		follower.pageTitle = ko.observable();
		
		follower.reqVis = ko.observable(false);
		follower.pendingReqBtnText = ko.observable('Collapse');
		
		follower.allFollowers = ko.observableArray([]);
		follower.followRequests = ko.observableArray([]);
		follower.parseFollowers = ko.observableArray([]);

		if (follower.requestName == 'getFollowers'){	
			follower.pageTitle = "Followers ";
			
			FollowersRequest.followers({
				data: { userId: params.user },
				onSuccess: setFollows
			});
		}

		if (follower.requestName == 'getFollowing'){
			follower.pageTitle = "Following";
			
			FollowersRequest.following({
				data: { userId: params.user },
				onSuccess: handleResponse
			});
		}

		if (follower.requestName == 'getUsers'){
			follower.pageTitle = "Browse Users";
		
			GetUsersRequest.all({
				// data: {
				// 	filter: 'following',
				// 	userId: params.user
				// },
				onSuccess: onGetUserSuccess
			});
		}

		function setFollows(response){
			follower.parseFollowers(ko.utils.arrayMap(response.result,function(user){
				if(!user.hasRequested){
					follower.allFollowers.push(new FollowerModel(user));
				} else {
					follower.reqVis(true);
					follower.followRequests.push(new FollowerModel(user));
				}
			}));
		}

		function handleResponse(response){
			follower.allFollowers(ko.utils.arrayMap(response.result,function(user){
				return new FollowerModel(user);
			}));
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

	}
	
	return { viewModel: Followees, template: templateMarkup };

});
