define(['knockout'],function(ko){

	function FlagRequest(){

		var flag = this;

		var url = $.sc.HB_CONSTANTS.API_ENDPOINT + 'api/v1/flags';

		flag.createFlag = function(request) {
			return $.ajax({
				type: 'POST',
				url: url,
				headers: { 'x-access-token': localStorage.getItem('token') },
				data: request.data,
				success: request.onSuccess,
				error: request.onError,
				dataType: 'json'
			});
		};

	}

	return new FlagRequest();

});