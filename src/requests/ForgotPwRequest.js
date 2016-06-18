define(['knockout'],function(ko){

	function PasswordRequest(){

		var pr = this;

		var url = $.sc.HB_CONSTANTS.API_ENDPOINT + 'forgot';

		pr.send = function(request){

			
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

	return new PasswordRequest();

});