define(['knockout', 'text!./resetpw.html', 'ResetPwRequest'], function(ko, templateMarkup, ResetPwRequest) {

	function ResetPW(params) {

		var rpw = this;

		rpw.password = ko.observable();
		rpw.confPassword = ko.observable();
		rpw.botField = ko.observable();
		rpw.alertMsg = ko.observable();




		rpw.onSuccess = function(response) {
			if (response.message) {
				rpw.alertMsg(response.message);
			} else {
				rpw.alertMsg('Your password has successfully been reset. <a href="#/login">Click here to Login.</a>');
			}
		}

		rpw.onError = function(response) {
			console.log(response);
			rpw.alertMsg('An error occured when submitting your request.');
		};

		rpw.submitRequest = function() {
			// clear previous error message
			rpw.alertMsg('');
			if (!rpw.botField()){
				if (rpw.password() && rpw.confPassword()) {
					if (!matchPasswords(rpw.password(), rpw.confPassword())) {
							rpw.alertMsg('The passwords you entered do not match.');
					} else {
						ResetPwRequest.send({
							data:{ password: rpw.password(), token: params.route().id },
							onSuccess: rpw.onSuccess,
							onError: rpw.onError
						});
					};
				} else {
					rpw.alertMsg('A password field is missing.');
				}
			} else {
				rpw.alertMsg('An error occured when attempting to reset your password. Please try again.');
			}
		};

		function matchPasswords(a,b) {
			var match = false;

			if(a === b) {
				match = true;
			}

			return match;
		};

	}
	
	return { viewModel: ResetPW, template: templateMarkup };

});
