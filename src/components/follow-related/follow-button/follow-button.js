define(['knockout', 'text!./follow-button.html', 'FollowersRequest','FollowerModel'], function(ko, templateMarkup, FollowersRequest, FollowerModel) {

	function FollowBtn(params) {

		var followBtn = this;

		// used for generating feed
		followBtn.callback = params.callback;

		getFollowStatus(params.id());

		followBtn.isFollowing = ko.observable();
		followBtn.status = ko.observable();
		followBtn.btnText = ko.observable("Follow");
		followBtn.doFollow = '';
		followBtn.privateUser = params.isPrivate();
		followBtn.css = ko.observable("btn-success");
		if (params.fullName) {
			followBtn.fullName = params.fullName();
		}else{
			followBtn.fullName = '';
		}


		followBtn.checkFollowing = function(){
			if (followBtn.isFollowing()){
				followBtn.btnText("Unfollow");
				followBtn.css("btn-danger")
			}
		};

		followBtn.restoreButton = function(){
			followBtn.css("btn-success");
			setupButton();
		};

		//Get status
		function getFollowStatus(followee){
			FollowersRequest.followingOne({
				data: {
					followee: followee
				},
				onSuccess: setFollowBtn,
				onError: printErr
			});
		}

		//Set Button Status 
		function setFollowBtn(response){
			followBtn.isFollowing(response.result.isFollowing.condition);
			setupButton(response.result.isFollowing.status);
		}

		function setupButton(responseStatus){
			var status = responseStatus || followBtn.status();

			if (followBtn.isFollowing() == true){
				setFollowingConditionTrue(status);
			} else {
				setFollowingConditionFalse();
			}
		}

		function setFollowingConditionTrue(status){
			followBtn.status(status);
			if (followBtn.status() == "pending"){
				followBtn.btnText('Requested');
			} else if(followBtn.status() == "approved"){ 
				followBtn.btnText('Following');
			}
			followBtn.doFollow = unFollow;
		}

		// SETS BUTTON PROPERTIES BASED FOR "FOLLOWING" IF USER NOT FOLLOWING.
		function setFollowingConditionFalse(){
			//TODO: This isn't quite right. The "getFollowers" is not going work on other pages. Need Reciprical datapoint.
			if (followBtn.privateUser == true){
				followBtn.btnText('Request to Follow');
			} else {
				followBtn.btnText('Follow')
			}
			followBtn.doFollow = createFollow;
		}		

		function createFollow(){
			FollowersRequest.post({
				data: {
					followee: params.id()
				},
				onSuccess: onFollowSuccess
			});
		}

		function unFollow(){
			FollowersRequest.delete({
				data: {
				  followee: params.id(),
				  follower: $.sc.currentUserId()
				},
				onSuccess: onUnfollowSuccess
		 	});
		}

		function onFollowSuccess(response){
			
			followBtn.isFollowing(true);
			setFollowingConditionTrue(response.result.status);

			if(followBtn.callback){
				followBtn.callback(1);
			}
		}

		function onUnfollowSuccess(){
			
			followBtn.isFollowing(false	);
			setFollowingConditionFalse();

			if(followBtn.callback){
				followBtn.callback(-1);
			}
		}

		function printErr(response){
			console.log(response);
		}
		
	}

	return { viewModel: FollowBtn, template: templateMarkup };

});
