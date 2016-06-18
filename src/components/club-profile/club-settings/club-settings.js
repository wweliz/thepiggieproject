define(['knockout', 'text!./club-settings.html', 'ClubRequest'], function(ko, templateMarkup, ClubRequest) {

	function ClubSettings(params) {

		var settings = this;

		settings.clubId = params.club().id;
		settings.clubName = params.club().clubname;

		// eventually, the "groupType" will be a param of the parent component
		// settings.groupType = params.club().groupType;
		settings.groupType = ko.observable('private');
		settings.groupTypeMsg = ko.computed(function() {
			if ( settings.groupType() == 'open') {
				return 'Any user can follow or join this group.';
			}
			if ( settings.groupType() == 'follow') {
				return 'Any user can follow this group. There is no option for users to join.';
			}
			if ( settings.groupType() == 'request') {
				return 'Any user can follow this group, but users must request to join and be approved before becoming a member.';
			}
			if ( settings.groupType() == 'private') {
				return 'This group is private, and will not appear in search results. All members must be invited by a group admin.';
			}
		});

		settings.alertMsg = ko.observable();

		settings.onUpdateSuccess = function(response) {
			settings.alertMsg('Club privacy successfully updated.');
			console.log(response);
		};

		settings.onError = function(response) {
			settings.alertMsg('There was an error when updating your group type.');
			console.log(response);
		};

		settings.updateClubType = function() {
			settings.alertMsg('');
			console.log(settings.groupType());

			// ClubRequest.post({
			// 	data:{
			// 		name: settings.clubName(),
			// 		private: settings.groupType()
			// 	},
			// 	onSuccess: settings.onUpdateSuccess
			// });
		};

	}
	
	return { viewModel: ClubSettings, template: templateMarkup };

});
