define([
	'knockout', 
	'text!./user-info.html', 
	'MeRequest', 
	'dropzone', 
	'sticky', 
	'PlaceholderCover'], 
	function(
		ko, 
		template, 
		MeRequest, 
		Dropzone, 
		sticky, 
		PlaceholderCover
		) {

	function UserInfo(params) {

		var user = this;

		user.user = params.user();
		user.isCurrentUser = params.isCurrentUser();

		


		user.coverViz = ko.observable(true);
		user.dropzoneViz = ko.observable(false);
		user.buttonViz = ko.observable(true);
		user.spinnerViz = ko.observable(false);

		user.coverPhoto = params.coverPhoto() || ko.observable(PlaceholderCover.randomCover());
		user.coverPhotoURL = params.coverPhotoURL;

		user.enableCoverPhotoDZ = function() {
			user.coverViz(false);
			user.dropzoneViz(true);
			user.buttonViz(false);
		};

		user.onSuccess = function(response) {
			console.log(response);
			user.spinnerViz(false);
			// pass new cover photo into observable
			user.coverPhoto(response.result.coverPhoto);
			user.coverPhotoURL( 'url(' + response.result.coverPhoto + ')' );
			user.coverViz(true);
			user.dropzoneViz(false);
		};

		user.onError = function(response) {
			console.log(response);
		};

		user.updateCoverPhoto = function(image){
			
			user.buttonViz(true);
			user.spinnerViz(true);

			MeRequest.update({
				data:{ coverPhoto:image },
				onSuccess: user.onSuccess,
				onError: user.onError
			})
		};
	}
	
	return { viewModel: UserInfo, template: template };

});