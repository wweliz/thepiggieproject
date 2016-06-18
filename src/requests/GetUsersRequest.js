define(['knockout'],function(ko){

	function GetUsersRequest(){

		var gur = this;

		var url = $.sc.HB_CONSTANTS.API_ENDPOINT + 'api/v1/explore/users';

		gur.all = function(request){
			return $.ajax({
				type: 'GET',
				url: url,
				headers: { 'x-access-token': localStorage.getItem('token') },
				success: request.onSuccess,
				error: onError,
				dataType: 'json'
			});
		};

		function onError(response){
			console.log(response);
		}
	}

	return new GetUsersRequest();

});