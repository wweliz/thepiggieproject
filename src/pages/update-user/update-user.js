define(['knockout', 'text!./update-user.html', 'MeRequest', 'UsernameUniqueRequest', 'dropzone', 'RequiredExtention'], function(ko, templateMarkup, MeRequest, UsernameUniqueRequest, Dropzone) {

	function UpdateUser(params) {

		var update = this;

		var user = params.user;

		update.avatar = ko.observable();
		update.username = ko.observable().extend({ required: "Please enter a username." });
		update.usernameIsUnique = ko.observable(true);		
		update.usernameMsg = ko.observable();
		update.firstName = ko.observable().extend({ required: "Please enter your first name." });
		update.lastName = ko.observable().extend({ required: "Please enter your last name." });
		update.email = ko.observable().extend({ required: "Please enter an email address." });
		update.emailMsg = ko.observable();
		update.submitBtn = ko.observable('Continue');

		// set initial visibility
		update.avatarViz = ko.observable(true);
		update.dropzoneViz = ko.observable(false);
		update.enableTextInput = ko.observable(true);

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// POPULATE PAGE WITH USER DATA ON INITIAL PAGE LOAD ///////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		update.populateInputFields = function(response) {
			if (response.result.avatar != 'undefined' || 'null') {
				update.avatar(response.result.avatar);
			}

			if (response.result.username != 'undefined' || 'null') {
				update.username(response.result.username);
			}

			if (response.result.firstName != 'undefined' || 'null') {
				update.firstName(response.result.firstName);
			}

			if (response.result.lastName != 'undefined' || 'null') {
				update.lastName(response.result.lastName);
			}

			if (response.result.email != 'undefined' || 'null') {
				update.email(response.result.email);
			}
		};

		update.onPageLoadError = function(response) {
			update.emailMsg('Oh no! Looks like something went wrong. Try refreshing the page.');
			console.log(response);
		};

		// fetch existing user info
		MeRequest.get({
			onSuccess: update.populateInputFields,
			onError: update.onPageLoadError
		});

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// UPDATING THE USER AVATAR ////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		// BLUR AND DISABLE/ENABLE FORM ACCESS /////////////////////////////////////////////////////////////////////////////////
		update.updateAvatar = function() {
			$('#blur-wrapper').toggleClass('blur');
			update.avatarViz(false);
			update.dropzoneViz(true);
			update.enableTextInput(false);
		};

		update.cancelUpdateAvatar = function() {
			$('#blur-wrapper').toggleClass('blur');
			update.avatarViz(true);
			update.dropzoneViz(false);
			update.enableTextInput(true);
		};

		update.setNewAvatar = function(response){
			// show new avatar image
			update.avatar(response.result.avatar);
		};

		update.enableFormAccess = function(response){
			// re-enable input fields
			$('#blur-wrapper').toggleClass('blur');
			update.avatarViz(true);
			update.dropzoneViz(false);
			update.enableTextInput(true);
		};

		update.fetchAvatar = function(response){
			console.log(response);
			// fetch new avatar photo from server
			MeRequest.get({
				data:{ userId: update.userId },
				onSuccess: update.setNewAvatar,
				onError: update.fetchAvatarError
			});
		};

		update.fetchAvatarError = function(response){
			console.log(response);
			update.emailMsg('Oh no! There was an error fetching your avatar from the server.');
		};

		update.updateAvatarError = function(response){
			console.log(response);
			update.emailMsg('Oh no! There was an error updating your avatar.');
		};

		update.sendRequestWithImage = function(image){
			update.enableFormAccess();
			MeRequest.update({
				data:{ avatar: image },
				onSuccess: update.fetchAvatar,
				onError: update.updateAvatarError
			})
		};

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// CLEAR THE USERNAME INPUT ////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		update.clearUsernameInput = function() {
			update.username('');
			update.usernameMsg('');
		};

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// CHECK THAT USERNAME IS UNIQUE ///////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		update.handleUniqueResponse = function(response){
			// usernameIsUnique defaults to true
			currentUsername = JSON.parse(localStorage.getItem('user')).username;

			if (response.result || update.username() == currentUsername) {
				update.usernameIsUnique(true);
			} else {
				update.usernameIsUnique(false);
				update.usernameMsg('That username is already taken.');
			}
		};

		update.handleUniqueError = function(response){
			update.usernameMsg('Oh no! There was an error validating your username.');
			console.log(response);			
		};		

		update.checkUsernameUnique = function(){
			update.usernameMsg('');

			if ( validateUsername() ) {
				UsernameUniqueRequest.isUnique({
					data:{ username: update.username() },
					onSuccess: update.handleUniqueResponse,
					onError: update.handleUniqueError
				})
			}
		};

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// VALIDATE INPUT FIELDS BEFORE CHANGING USER INFO ON THE SERVER ///////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		function validateUsername() {
			var valid = false;

			if (update.username()) {
				filter = /^[\w]{1,15}$/;
				characterFilter = /^[\w]+$/;

				if (filter.test(update.username())) {
					// username passes regex
					valid = true;
				} else {
					// username does not pass regex

					if (update.username().length > 15) {
						update.usernameMsg('Usernames must be 15 characters or less.');
					}

					if (!characterFilter.test(update.username())) {
						update.usernameMsg('Usernames may only contain letter and numbers.');
					}
				}
			} else {
				// no username entered
				update.usernameMsg('Please enter a username.');
			}

			return valid;
		};

		function validateEmailString() {
			var valid = false;

			if (update.email()) {
				// regex to check whether input is valid email address
				// may incorrectly assert that some vaild email are not valid
				filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

				if (filter.test(update.email())) {
					// email passes regex
					valid = true;
				} else {
					// email does not pass regex
					update.emailMsg('Please enter a valid email address.');
				}
			} else {
				// no email entered
				update.emailMsg('Please enter a valid email address.');
			}

			return valid;
		};

		function validateInputFields() {
			if ( !update.firstName() || !update.lastName() || !validateEmailString() ) {
				// not all input fields valid
				return false;
			} else {
				// all input fields valid
				return true;				
			}
		};

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// UPDATING THE USER INFORMATION ///////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		update.redirectToFeed = function(response){
			window.location.hash = '/feed';
		};

		update.updateLocalStorage = function(response){
			localStorage.setItem('user', JSON.stringify(response.result));
			update.redirectToFeed();
		};

		update.updateUserError = function(response) {
			// username already exists in database
			if (JSON.parse(response.responseText).message == 'duplicate key value violates unique constraint "users_username_unique"') {
				update.usernameMsg('That username is already taken.');
			}

			// email already exists in database
			if (JSON.parse(response.responseText).message == 'duplicate key value violates unique constraint "users_email_key"') {
				update.emailMsg('That email address is already associated with an account.');
			}
		};

		update.updateUser = function(){
			if ( update.usernameIsUnique() && validateInputFields() ) {
				update.submitBtn('Updating...')
				MeRequest.update({
					data:{
						avatar: update.avatar(),
						username: update.username(),
						firstName: update.firstName(),
						lastName: update.lastName(),
						email: update.email()
					},
					onSuccess: update.updateLocalStorage,
					onError: update.updateUserError
				});
			}
		};

		update.dzInstructions = ko.computed(function(){
			var result = "Click to set your avatar.";
			if (update.dropzoneViz()){
				result = "Drag an image into the dropzone, or click the dropzone to browse."
			}

			return result;
		});

	}

	return { viewModel: UpdateUser, template: templateMarkup };

});
