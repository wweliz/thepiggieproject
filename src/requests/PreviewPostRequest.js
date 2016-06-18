define(['knockout'],function(ko){

	function PreviewPostRequest(){

		var upr = this;

		// this URL will change once the server allows unauthenticated users to retrieve posts
		var url = $.sc.HB_CONSTANTS.API_ENDPOINT + 'api/v1/hunts';

		upr.get = function(request) {
			return $.ajax({
				type: 'GET',
				url: url + '/' + request.data.id,
				// will not require access token in header
				headers: { 'x-access-token': localStorage.getItem('token') },
				data: request.data,
				success: request.onSuccess,
				error: request.onError,
				dataType:'json'});
		};

		// no need for "all posts" request as an unauthenticated will never have a feed

	}

	return new PreviewPostRequest();

});