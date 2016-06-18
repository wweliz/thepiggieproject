define(['knockout', 'underscore', 'text!./approve-users.html', 'ClubRequest', 'MemberModel', 'FollowersRequest', 'FollowerModel'], function(ko, _, templateMarkup, ClubRequest, MemberModel, FollowersRequest, FollowerModel) {

	function ApproveUsers(params) {

		var approve = this;

		approve.clubId = params.club;

		approve.parseFollowers = ko.observableArray([]);
		approve.followRequests = ko.observableArray([]);
		approve.followerReqVis = ko.observable(false);
		approve.followerBtnText = ko.observable('Collapse');

		approve.parseMembers = ko.observableArray([]);
		approve.memberRequests = ko.observableArray([]);
		approve.memberReqVis = ko.observable(false);
		approve.memberBtnText = ko.observable('Collapse');

		function setFollowerArray(response){
			if (!_.isEmpty(response.result)){
				approve.parseFollowers(ko.utils.arrayMap(response.result,function(user){
					if(user.hasRequested){
						approve.followerReqVis(true);
						approve.followRequests.push(new FollowerModel(user));
					}
				}));
			}
		}

		function setMemberArray(response){
			if (!_.isEmpty(response.result)){
				approve.parseMembers(ko.utils.arrayMap(response.result,function(user){
					// if(user.hasRequested){
						approve.memberReqVis(true);
						approve.memberRequests.push(new MemberModel(user));
					// }
				}));
			}
		}

		approve.expandCollapseFollowers = function(){
			if (approve.followerReqVis() == true) {
				// collapse pending requests
				approve.followerReqVis(false);
				approve.followerBtnText('Expand');
			} else {
				// expand pending requests
				approve.followerReqVis(true);
				approve.followerBtnText('Collapse');
			}
		};		

		approve.expandCollapseMembers = function(){
			if (approve.memberReqVis() == true) {
				// collapse pending requests
				approve.memberReqVis(false);
				approve.memberBtnText('Expand');
			} else {
				// expand pending requests
				approve.memberReqVis(true);
				approve.memberBtnText('Collapse');
			}
		};

		FollowersRequest.followers({
			data: { id: approve.clubId },
			onSuccess: setFollowerArray
		});

		ClubRequest.allMembers({
			data: { id: approve.clubId },
			onSuccess: setMemberArray
		});

	}
	
	return { viewModel: ApproveUsers, template: templateMarkup };

});
