define(['knockout', 'text!./club-profile.html', 'ClubRequest', 'ClubModel', 'MemberModel'], function(ko, templateMarkup, ClubRequest, ClubModel, MemberModel) {

	function ClubProfile(params) {

		var club = this;

		club.clubId = params.route().id;

		//Sets active view on the profile page
		club.activeTab = ko.observable(params.route().component);

		club.club = ko.observable();
		club.clubName = ko.observable();
		club.currentUserIsAdmin = ko.observable(false);
		club.clubParamsReady = ko.observable(false);

		club.parseMembers = ko.observableArray([]);
		club.acceptedMembers = ko.observableArray([]);
		club.declinedMembers = ko.observableArray([]);
		club.memberError = ko.observable(false);
		club.currentUserIsMember = ko.observable(false);
		club.memberParamsReady = ko.observable(false);

		club.setClub = function(response) {
			club.clubName('Hembow | ' + response.result.name);
			club.club(new ClubModel(response.result));

			// if the id of the group's creator matches the id of the currently logged in user, set currentUserIsAdmin to true
			if (response.result.creator == JSON.parse(localStorage.getItem('user')).id) {
				club.currentUserIsAdmin(true);
			}

			club.clubParamsReady(true);
		};

		club.setMemberRelationship = function() {
			// determine whether current user is a member of group
			var userIdinArray = club.acceptedMembers().some(function(user) {
				return user.id() == $.sc.currentUserId();
			});

			club.currentUserIsMember(userIdinArray);
			club.memberParamsReady(true);
		};

		club.setMemberArray = function(response) {
			if (!_.isEmpty(response.result)) {
				club.parseMembers(ko.utils.arrayMap(response.result,function(memberInstance){
					if (memberInstance.type == 'member') {
						club.acceptedMembers.push(new MemberModel(memberInstance));
					}
					// if (memberInstance.type == 'declined') {
					// 	club.declinedMembers.push(new MemberModel(memberInstance));
					// }
				}));
			} else {
				club.memberError(true);
			}

			// because the server currently returns members who have declined invitation to join,
			// we need an extra check to ensure that the acceptedMembers array is not empty 
			if (_.isEmpty(club.acceptedMembers())) {
				club.memberError(true);
			}

			club.setMemberRelationship();
		};

		// Fetch data for the club; call does not return club follower or member data
		ClubRequest.get({
			data:{ id: club.clubId },
			onSuccess: club.setClub
		});

		ClubRequest.allMembers({
			data:{ id: club.clubId },
			onSuccess: club.setMemberArray
		});

	}
	
	return { viewModel: ClubProfile, template: templateMarkup };

});
