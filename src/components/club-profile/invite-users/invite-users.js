define(['knockout', 'text!./invite-users.html', 'ClubRequest'], function(ko, templateMarkup, ClubRequest) {

	function InviteUser(params) {

		var invite = this;

		invite.clubId = params.club;
		invite.usernameInput = ko.observable();
		isSelected: ko.observable(false);
		invite.alertMsg = ko.observable();

		// currently only group admins can invite new users

		// currently logged in user should be prompted with a list of their friends
		// send invitation to selected users	

		invite.clearAlertMsg = function() {
			invite.alertMsg('');
		};

		invite.handleInviteSuccess = function(response) {
			invite.alertMsg('An invitation to join has been sent to ' + invite.usernameInput() + '.');
			invite.usernameInput('');
		};

		invite.onError = function(response) {
			if ( JSON.parse(response.responseText).message == "Cannot read property 'id' of null") {
				invite.alertMsg('That user does not exist.');
			} else {
				console.log(response);
				invite.alertMsg('Oh no! There was an error.');
			}
		};

		invite.inviteUsers = function(){
			invite.alertMsg('');

			if ( !_.isEmpty(invite.usernameInput()) ) {
				ClubRequest.inviteMember({
					data:{
						id: invite.clubId,
						username: invite.usernameInput()
					},
					onSuccess: invite.handleInviteSuccess,
					onError: invite.onError
				});
			} else {
				invite.alertMsg("Oh no! You didn't select any users to invite.");
			}
		};

	}
	
	return { viewModel: InviteUser, template: templateMarkup };

});
