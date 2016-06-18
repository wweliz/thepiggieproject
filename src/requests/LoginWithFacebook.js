define(['knockout'],function(ko){

	function LoginWithFacebook(){

		var login = this;

		var url = $.sc.HB_CONSTANTS.API_ENDPOINT + 'facebook/token';

		login.send = function(request){
			return $.ajax({
				type: 'POST',
				url: url,
				data: request.data,
				success: request.onSuccess,
				error: request.onError,
				dataType: 'json'
			});
		};
	}

	return new LoginWithFacebook();

});