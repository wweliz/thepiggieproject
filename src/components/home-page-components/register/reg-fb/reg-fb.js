define(['knockout', 'text!./reg-fb.html', 'facebook', 'RegisterWithFacebook'], function(ko, template, FB, RegisterWithFacebook) {

	function RegFb() {

		var reg = this;

		reg.fbAlertMsg = ko.observable(false);

		function onSuccess(response){
			localStorage.setItem('token', response.result.token);
			localStorage.setItem('user', JSON.stringify(response.result.user));
			window.location.hash = '/update-user';
		}

		function onError(response){
			console.log(response);
			reg.fbAlertMsg(true);
		}

		function authHambone(response) {
			// user is logged into FB and has authenticated HB
			RegisterWithFacebook.send({
				data:{ access_token: response.authResponse.accessToken },
				onSuccess: onSuccess,
				onError: onError
			});
		};

		reg.authFb =function(){
			FB.getLoginStatus(function(response) {
				if (response.status === 'connected') {
					authHambone(response);
				} else {
					// checks whether user is not logged in to FB
					// if user is not logged in to FB; opens login window
					// if HB is not authenticated, prompts user to authenticate
					FB.login(function(response) {
						if (response.authResponse){
							authHambone(response);
						}
					});
				}
		 });
		};

	}

	return { viewModel: RegFb, template: template };
	
});
