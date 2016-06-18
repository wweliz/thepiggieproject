define(['knockout', 'text!./club.html', 'underscore', 'ClubRequest','ClubModel'], function(ko, templateMarkup, _, ClubRequest, ClubModel) {

	function Club(params) {
		
		var club = this;

		club.club = params.club;

		club.isPrivate = ko.observable(params.club.isPrivate());
		club.btnText = ko.observable();
		club.btnAction = ko.observable();
		club.memberCount = ko.observable();
		club.currentUserIsMember = ko.observable(false);

		club.joinGroup = function() {
			console.log('join group');
		};

		club.requestToJoinGroup = function() {
			console.log('request to join group');
		};

		club.leaveGroup = function() {
			console.log('leave group');
		};

		club.setBtnFunctionality = function(response) {
			if (club.currentUserIsMember() == true) {
				// current user is already a member
				club.btnText('Leave Group');
				club.btnAction = club.leaveGroup;
			} else {
				if (params.club.isPrivate() == true) {
					// club is private
					club.btnText('Request to Join');
					club.btnAction = club.requestToJoinGroup;
				} else {
					// club is public
					club.btnText('Join');
					club.btnAction = club.joinGroup;
				}
			}
		};

		club.handleResponse = function(response) {
			club.memberCount(response.result.length);

			// determine whether current user is a member of group
			var userIdinArray = response.result.some(function(entry) {
				return entry.userId == $.sc.currentUserId()
			});	

			club.currentUserIsMember(userIdinArray);
			club.setBtnFunctionality();
		};

		ClubRequest.allMembers({
			data: {
				id: params.club.id
			},
			onSuccess: club.handleResponse
		});

	}

	return { viewModel: Club, template: templateMarkup };

});
