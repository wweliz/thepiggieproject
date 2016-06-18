define(['knockout', 'text!./forgotpw.html', 'ForgotPwRequest'], function(ko, templateMarkup, ForgotPwRequest) {

	function ForgotPW(params) {

		var fpw = this;

		fpw.email = ko.observable();
		fpw.alertMsg = ko.observable();
		fpw.buttonText = ko.observable('Email Reset Password Link');

		function validateEmailString() {
			// regex to check whether input is valid email address
			// may incorrectly assert that some vaild email are not valid
			filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

			var valid = false;

			if (filter.test(fpw.email())) {
				valid = true;
			}

			return valid;
		};

		fpw.onSuccess = function(response) {
			fpw.buttonText('Email Reset Password Link');
			if (response.message) {
				fpw.alertMsg(response.message);
			} else {
				fpw.alertMsg('A password reset link was sent to your email.');
			}
		}

		fpw.onError = function(response) {
			fpw.buttonText('Email Reset Password Link');
			if (response.responseText) {
				if (JSON.parse(response.responseText).message == 'Email address not found.') {
					fpw.alertMsg(JSON.parse(response.responseText).message);
				} 
			} else {
				console.log(response);
				fpw.alertMsg('An error occured when submitting your request.');
			}
		};

		fpw.submitRequest = function() {
			// clear previous error message
			fpw.alertMsg('');
			fpw.buttonText('Verifying your Account...')

			if (!validateEmailString()) {
				fpw.alertMsg('Please enter a valid email address.');
			} else {
				ForgotPwRequest.send({
					data:{ email: fpw.email() },
					onSuccess: fpw.onSuccess,
					onError: fpw.onError
				});
			}
		};

	}
	
	return { viewModel: ForgotPW, template: templateMarkup };

});
