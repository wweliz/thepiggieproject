define(['knockout', 'text!./follower.html', 'FollowersRequest','FollowerModel'], function(ko, templateMarkup, FollowersRequest, FollowerModel) {

	function Follower(params) {	

		var follower = this;

		follower.follower = params.follower;
		follower.followBtnText = ko.observable();
		follower.followType = params.followType;
		follower.acceptVis = ko.observable(false);
		follower.status = params.follower.status();
		follower.privateUser = params.follower.privateUser();
		follower.isFollowing = params.follower.isFollowing();
		if(params.callback){
			follower.updatePending = params.callback;
		}

		//Fullname to send to modals for confirmation.
		follower.fullName = params.follower.fullName();

		//Styling for requests.
		follower.topMargin = ko.observable("-60px");
		follower.coverOpac = ko.observable("1");

		//Set up View based on status
		if (follower.isFollowing == true){
			setFollowingConditionTrue();
		} else {
			setFollowingConditionFalse();
		}

		// SETS BUTTON PROPERTIES BASED FOR "FOLLOWING" IF USER IS FOLLOWING.
		function setFollowingConditionTrue (){
			if (follower.status == "pending"){ follower.followBtnText('Requested');
			} else if(follower.status == "approved"){ 
				follower.followBtnText('Following');
			}
			follower.followAction = unFollow;
		}

		// SETS BUTTON PROPERTIES BASED FOR "FOLLOWING" IF USER NOT FOLLOWING.
		function setFollowingConditionFalse(){
			//TODO: This isn't quite right. The "getFollowers" is not going work on other pages. Need Reciprical datapoint.
			if (follower.privateUser == true && follower.followType != "getFollowers"){ follower.followBtnText('Request to Follow');
			} else { follower.followBtnText('Follow')}
			follower.followAction = createFollow;
		}

		function createFollow(){
			FollowersRequest.post({
				data: {
					followee: params.follower.id(),
				},
				onSuccess: onFollowSuccess
			});
		}

		function unFollow(){
			FollowersRequest.message = "Are you sure you want to unfollow "+follower.fullName+"?";
			if (follower.status == "pending"){
				FollowersRequest.message = "Are you sure you want to cancel your request to follow "+follower.fullName+"?";
			}
			follower.followee = params.follower.id(),
			follower.follower = $.sc.currentUserId(),

			$.sc.modal.show({
				cname:"verify-unfollow",
				cparams: {
					message: FollowersRequest.message,
					followee: follower.followee,
					follower: follower.follower,
					func: "deleteFollow",
			 		callback: verifyCallback
				}
			});
		}

		function verifyCallback(){
			onUnfollowSuccess();
		}

		function onFollowSuccess(){
			setFollowingConditionTrue();
		}

		function onUnfollowSuccess(){
			setFollowingConditionFalse();
		}

		function onAcceptSuccess(res){
			follower.topMargin("0px");
			follower.coverOpac("1");
			follower.updatePending(params.follower.followsId, 'accepted', params.follower); //Callback function to update array and remove no-longer-pending user card. 
		}

		function onDeclineSuccess(res){
			console.log(res);
			follower.topMargin("0px");
			follower.coverOpac("1");
			follower.updatePending(params.follower.followsId, 'deleted'); //Callback function to update array and remove no-longer-pending user card. 
		}

		follower.acceptRequest = function(){
			
			FollowersRequest.update({
				data: {
					followee: $.sc.currentUserId(),
					follower: params.follower.id(),
					accepted: true
				},
				onSuccess: onAcceptSuccess,
				onError: onError
			});
		};

		function onError(response) {
			console.log(response);
		}

		follower.declineRequest = function(){

			// This was placed here to call a modal to confirm. Now a straight call. 
			// FollowersRequest.message = "Are you sure you want to decline the request from "+follower.fullName+"?";

			// //TODO: How do we make the call to delete the follow request? 
			// //Currently the call only works one way. 
			// follower.followee = $.sc.currentUserId();
			// follower.follower = params.follower.id();
			
			// $.sc.modal.show({
			// 	cname:"verify-unfollow",
			// 	cparams: {
			// 		message: FollowersRequest.message,
			// 		followee: follower.followee,
			// 		follower: follower.follower,
			// 		callback: onDeclineSuccess
			// 	}
			// });


			FollowersRequest.update({
				data: {
					followee: $.sc.currentUserId(),
					follower: params.follower.id()
				},
				onSuccess: onDeclineSuccess,
				onError: onError
			});
		};

	}

	return { viewModel: Follower, template: templateMarkup };

});
