define(['knockout', 'text!./login.html', 'facebook', 'LoginRequest','LoginWithFacebook'], function(ko, template, FB, LoginRequest, LoginWithFacebook) {

	function Login(params) {

		console.log('executed login.js');
	
		var login = this;

		login.callback = params.callback;
		login.username = ko.observable();
		login.password = ko.observable();
		login.botField = ko.observable();
		login.alertMsg = ko.observable();

		login.handleLoginSuccess = function(response) {
			localStorage.setItem('token', response.result.token);
			localStorage.setItem('user', JSON.stringify(response.result.user));

			if (login.callback) {
				login.callback();
			} else {
				window.location.hash = '#/feed';
			}
		};

		// login with username and password ///////////////////////////////////////////////////////////
		login.handleUsernameError = function(response) {
			login.alertMsg(response.responseJSON.message);
		};

		login.loginWithUsername = function() {
			if (!login.botField()) {
				LoginRequest.send({
					data:{
						username: login.username(),
						password: login.password(),
					},
					onSuccess: login.handleLoginSuccess,
					onError: login.handleUsernameError
				})
			} else {
				login.alertMsg('Looks like you might be a bot.');
			}
		};

		// login with Facebook ////////////////////////////////////////////////////////////////////////
		login.handleFbError = function(response) {
			console.log(response.responseText);
			login.alertMsg('There was an error logging in with Facebook.');
		};

		login.loginFB = function() {
			FB.getLoginStatus(function(response) {
				if (response.status === 'connected') {
					// send login request to Hambone server
					LoginWithFacebook.send({
						data:{ access_token: response.authResponse.accessToken },
						onSuccess: login.handleLoginSuccess,
						onError: login.handleFbError
					});
				} else {
					// checks whether user is not logged in to FB
					// if user is not logged in to FB; opens login window
					// if HB is not authenticated, prompts user to authenticate
					FB.login(function(response) {
						// send login request to Hambone server
						LoginWithFacebook.send({
							data:{ access_token: response.authResponse.accessToken },
							onSuccess: login.handleLoginSuccess,
							onError: login.handleFbError
						})
					});
				}
			});
		};

		// login with Twitter /////////////////////////////////////////////////////////////////////////
		login.loginTw = function() {
			console.log('login with Twitter');
		};

	}
	
	return { viewModel: Login, template: template };

});