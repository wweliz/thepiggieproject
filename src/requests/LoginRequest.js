define(['knockout'],function(ko){

	function LoginRequest(){

		var lr = this;

		var url = $.sc.HB_CONSTANTS.API_ENDPOINT + 'login';

		lr.send = function(request){
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

	return new LoginRequest();

});