define(['knockout','underscore', 'HamboneConstants'],function(ko,_,HB){

	function GetUserRequest(){

		var user = this;

		var url = HB.API_ENDPOINT + 'api/v1/users';

		user.get = function(request){
			return $.ajax({
				type: 'GET',
				url: url+"/"+request.data.id,
				headers: { 'x-access-token': localStorage.getItem('token') },
				success: request.onSuccess,
				error: request.onError,
				dataType: 'json'
			});
		};

	}

	return new GetUserRequest();

});