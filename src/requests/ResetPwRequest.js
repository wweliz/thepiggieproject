define(['knockout'],function(ko){

	function PasswordResetRequest(){

		var prr = this;

		var url = $.sc.HB_CONSTANTS.API_ENDPOINT + 'reset/';

		prr.send = function(request){
			return $.ajax({
				type: 'POST',
				url: url+request.data.token,
				data: {password: request.data.password},
				success: request.onSuccess,
				error: request.onError,
				dataType: 'json'
			});
		};

	}

	return new PasswordResetRequest();

});