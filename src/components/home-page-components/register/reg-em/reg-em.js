define(['knockout', 'text!./reg-em.html', 'UsernameUniqueRequest', 'RegisterWithEmail'], function(ko, template, UsernameUniqueRequest, RegisterWithEmail) {

	function RegEm(params) {

		var reg = this;
		
		reg.email = ko.observable();
		reg.username = ko.observable();
		reg.usernameIsUnique = ko.observable(false);		
		reg.password = ko.observable();
		reg.confPassword = ko.observable();
		reg.botField = ko.observable();
		reg.alertMsg = ko.observable();

		reg.handleUniqueResponse = function(response){
			if (response.result) {
				reg.usernameIsUnique(true);
			} else {
				reg.usernameIsUnique(false);
				reg.alertMsg('That username is already taken. Please try again.');
			}
		};	

		reg.handleUniqueError = function(response){
			reg.alertMsg('Oh no! There was an error validating your username. Please try again.');
		};

		reg.checkUsernameUnique = function(){
			clearAlertMsg();
			if (!usernameErrors() && !reg.botField()) {
				UsernameUniqueRequest.isUnique({
					data:{ username: reg.username() },
					onSuccess: reg.handleUniqueResponse,
					onError: reg.handleUniqueError
				});
			} else {
				var errMsg = usernameErrors();
				if (reg.botField()) {
					errMsg = 'Looks like you might be a bot.';
				}
				reg.alertMsg(errMsg);
			}
		};

		reg.handleEmailResponse = function(response){
			localStorage.setItem('token', response.result.token);
			localStorage.setItem('user', JSON.stringify(response.result.user));
			window.location.hash = '/update-user';
		};

		reg.onError = function(response) {
			responseMsg = JSON.parse(response.responseText).message;

			if (responseMsg === 'duplicate key value violates unique constraint "users_email_key"') {
				reg.alertMsg('That email address already has an account associated with it.');
			}
		};

		reg.createAccountEmail = function(){
			if ( reg.usernameIsUnique() && !reg.botField() ) {
				clearAlertMsg();				

				if (!validateEmailString()) {
					reg.alertMsg('Please enter a valid email address.');
				} else if (!matchPasswords(reg.password(), reg.confPassword())) {
					reg.alertMsg('Passwords do not match.');
				} else {
					RegisterWithEmail.send({
						data:{
							username: reg.username(),
							email: reg.email(),
							password: reg.password(),
						},
						onSuccess: reg.handleEmailResponse,
						onError: reg.onError
					})
				}
			}

			if ( reg.botField() ) {
				reg.alertMsg('Looks like you might be a bot.');
			}
		};

		function usernameErrors() {
			var errMsg = null;

			if (reg.username()) {
				filter = /^[\w]{1,15}$/;
				characterFilter = /^[\w]+$/;

				if (!filter.test(reg.username())) {
					if (reg.username().length > 15) {
						errMsg = 'Usernames must be 15 characters or less.';
					}

					if (!characterFilter.test(reg.username())) {
						errMsg = 'Usernames may only contain letter and numbers.';
					}
				}
			} else {
				errMsg = 'Please enter a username.';
			}

			return errMsg;
		};
	
		function matchPasswords(a,b) {
			var match = false;

			if(a === b) {
				match = true;
			}

			return match;
		};

		function validateEmailString() {
			// regex to check whether input is valid email address
			// may incorrectly assert that some vaild email are not valid
			filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

			var valid = false;

			if (filter.test(reg.email())) {
				valid = true;
			}

			return valid;
		};

		function clearAlertMsg() {
			reg.alertMsg('');
		}	
	
	}
	
	return { viewModel: RegEm, template: template };

});
