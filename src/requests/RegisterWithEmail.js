define(['knockout','HamboneConstants'],function(ko,HB){

	function RegisterWithEmail(){

		var reg = this;

		var url = HB.API_ENDPOINT + 'register';

		reg.send = function(request){
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

	return new RegisterWithEmail();

});