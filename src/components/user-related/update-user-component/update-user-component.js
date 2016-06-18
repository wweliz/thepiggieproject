define(['knockout', 'text!./update-user-component.html', 'MeRequest', 'dropzone', 'RequiredExtention'], function(ko, templateMarkup, MeRequest, Dropzone) {

	function UpdateUser(params) {

		var update = this;

		var user = params.user;

		update.avatar = ko.observable();
		update.username = ko.observable().extend({ required: "Please enter a username." });
		update.usernameMsg = ko.observable();
		update.firstName = ko.observable().extend({ required: "Please enter your first name." });
		update.lastName = ko.observable().extend({ required: "Please enter your last name." });
		update.email = ko.observable().extend({ required: "Please enter an email address." });
		update.emailMsg = ko.observable();
		update.submitBtn = ko.observable('Update');
		update.cofirmation = ko.observable(false);
		update.updateSuccess = ko.observable(false);
		// set initial visibility
		update.avatarViz = ko.observable(true);
		update.dropzoneViz = ko.observable(false);
		update.enableTextInput = ko.observable(true);

		update.clearUsernameInput = function() {
			update.username('');
			update.usernameMsg('');
		};

		update.populateInputFields = function(response) {

			console.log(response);

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

		update.getUserError = function(response) {
			console.log(response);
			if (response.responseJSON != 'undefined') {
					// username already exists in database
				if (response.responseJSON.message = 'duplicate key value violates unique constraint "users_username_unique"') {
					update.emailMsg('That username is already taken.');
				}
					// email already exists in database
				if (response.responseJSON.message = 'duplicate key value violates unique constraint "users_email_key"') {
					update.emailMsg('That email address is already associated with an account.');
				}
			}
		};

		// fetch existing user info
		MeRequest.get({
			onSuccess: update.populateInputFields,
			onError: update.getUserError
		});

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
						update.usernameMsg('Usernames may only contain letter, numbers, and the underscore character.');
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
			if ( !validateUsername() || !update.firstName() || !update.lastName() || !validateEmailString() ) {
				// not all input fields valid
				return false;
			} else {
				// all input fields valid
				return true;				
			}
		};
	
		update.updateUser = function(){
			update.updateSuccess(false);


			if (validateInputFields() == true ) {
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
					onError: update.getUserError
				});
			}
		};

		update.sendRequestWithImage = function(image){
			update.dropzoneViz(false);
			update.enableFormAccess();
			console.log(image);
			MeRequest.update({
				data:{
					avatar:image
				},
				onSuccess: update.fetchAvatar,
				onError: update.getUserError
			})
		};

		update.updateAvatarImage = function (response){
			// show new avatar image
			update.avatar(response.result.avatar);
		};

		update.enableFormAccess = function(){
			// re-enable input fields
			$('#blur-wrapper').toggleClass('blur');
			update.avatarViz(true);
			update.enableTextInput(true);
		};

		update.fetchAvatar = function(response){
			console.log(response);
			// fetch new avatar photo from server
			MeRequest.get({
				onSuccess: update.updateAvatarImage,
				onError: update.getUserError
			});
		};

		update.updateLocalStorage = function(response){
			localStorage.setItem('user', JSON.stringify(response.result));
			update.submitBtn('Saved!');
			update.cofirmation(true);
			update.updateSuccess(true);
		};

		update.redirectToFeed = function(response){
			window.location.hash = '/#/feed';
		};

		update.dzInstructions = ko.computed(function(){
			var result = "Click the Avatar to change the image.";
			if (update.dropzoneViz()){
				result = "Drag an image into the dropzone, or click the dropzone to browse."
			}

			return result;
		});

		update.successDismiss = function(){
			update.updateSuccess(false);
		}
	}

	return { viewModel: UpdateUser, template: templateMarkup };

});
