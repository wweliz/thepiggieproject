define(['knockout','HamboneConstants'],function(ko,HB){

	function RegisterWithFacebook(){

		var reg = this;

		var url = HB.API_ENDPOINT + 'facebook/token';

		reg.send = function(request){
			return $.ajax({
				type:'POST',
				url: url,
				data: request.data,
				success: request.onSuccess,
				error: request.onError,
				dataType: 'json'
			});
		};

	}

	return new RegisterWithFacebook();

});