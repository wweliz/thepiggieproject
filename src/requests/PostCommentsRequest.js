define(['knockout'],function(ko){

	function PostCommentsRequest(){

		var pcr = this;

		var url = $.sc.HB_CONSTANTS.API_ENDPOINT + 'api/v1/comments';

		pcr.get = function(request) {
			return $.ajax({
				type: 'GET',
				url: url,
				headers: { 'x-access-token': localStorage.getItem('token') },
				data: request.data,
				success: request.onSuccess,
				error: request.onError,
				dataType: 'json'
			});
		};

		pcr.send = function(request) {
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

		pcr.delete = function(request) {
			return $.ajax({
				type: 'DELETE',
				url: url + '/' + request.data.commentId,
				headers: { 'x-access-token': localStorage.getItem('token') },
				data: request.data,
				success: request.onSuccess,
				error: request.onError,
				dataType: 'json'
			});
		};

	}

	return new PostCommentsRequest();

});