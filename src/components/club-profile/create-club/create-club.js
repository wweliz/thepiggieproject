define(['knockout', 'underscore', 'text!./create-club.html', 'ClubRequest', 'RequiredExtention'], function(ko, _, templateMarkup, ClubRequest) {

	function CreateClub(params) {

		var club = this;

		club.name = ko.observable().extend({ required: "Please enter a club name." });
		club.groupType = ko.observable('open'); // sets initial group type to 'open'
		club.groupTypeMsg = ko.observable('Any user can follow or join this group.'); // sets initial message to match 'open' group type
		club.description = ko.observable();
		club.tags = ko.observable(); // returns a string
		club.tagArray = ko.observableArray();
		club.alertMsg = ko.observable();

		club.groupType.subscribe(function() {
		// club.groupType.subscribe(function(newValue) {
			if ( club.groupType() == 'open') {
				club.groupTypeMsg('Any user can follow or join this group.');
			}
			if ( club.groupType() == 'follow') {
				club.groupTypeMsg('Any user can follow this group. There is no option for users to join.');
			}
			if ( club.groupType() == 'request') {
				club.groupTypeMsg('Any user can follow this group, but users must request to join and be approved before becoming a member.');
			}
			if ( club.groupType() == 'private') {
				club.groupTypeMsg('This group is private, and will not appear in search results. All members must be invited by a group admin.');
			}
			// console.log(newValue);
		});

		club.onError = function(response) {
			club.alertMsg('There was an error creating your club.');
			console.log(response);
		};

		club.onSuccess = function(response) {
			console.log('move on to invite users component/page');
			// 	window.location.hash = '#/feed';
		};

		club.createClub = function(){
			club.alertMsg('');

			if ( !_.isEmpty( club.tags() ) ) {
				_tagArray = club.tags().split(','); // transforms string into array
				
				_tagArray.forEach(function(element) {
					club.tagArray.push( element.trim() );
				});
			}

			if ( !_.isEmpty(club.name()) && !_.isEmpty(club.groupType()) ) {
				// server uses token of currently logged in user to set admin

				ClubRequest.post({
					data:{
						name: club.name(),
						private: club.groupType()
						// description: club.description(),
						// tags: club.tagArray()
					},
					onSuccess: club.onSuccess
				});
			} else {
				club.alertMsg('Oops! Looks like you are missing some information.')
			}
		};

	}

	return { viewModel: CreateClub, template: templateMarkup };

});
