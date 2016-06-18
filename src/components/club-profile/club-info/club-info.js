define(['knockout', 'text!./club-info.html'], function(ko, template) {

	function ClubInfo(params) {

		var club = this;

		club.club = params.club;
		club.currentUserIsAdmin = params.currentUserIsAdmin();

		// need to set the coverphoto's onerror src to $parent.backupCoverPhoto
		// club.backupCoverPhoto = 'http://placehold.it/350x150';
		
		club.coverPhoto = ko.observable();
		club.coverViz = ko.observable(true);
		club.dropzoneViz = ko.observable(false);
		club.buttonViz = ko.observable(true);

		club.enableCoverPhotoDZ = function() {
			club.coverViz(false);
			club.dropzoneViz(true);
			club.buttonViz(false);
		};

		club.onSuccess = function(response) {	
			// pass new cover photo into observable
			club.coverPhotoURL(response.result.coverPhoto);

			club.coverViz(true);
			club.dropzoneViz(false);
			club.buttonViz(true);
		};

		club.onError = function(response) {
			console.log(response);
		};

		club.updateCoverPhoto = function(image){
			console.log('update cover photo on server');
			club.onSuccess();

			// ClubRequest.post({
			// 	data: { coverPhoto: image },
			// 	onSuccess: club.onSuccess,
			// 	onError: club.onError
			// })
		};

	}

	return { viewModel: ClubInfo, template: template };

});
