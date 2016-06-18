define(['knockout'],function(ko){

	function LikeRequest(){

		var like = this;

		var url = $.sc.HB_CONSTANTS.API_ENDPOINT + 'api/v1/likes';

		like.all = function(request) {
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

		like.createLike = function(request) {
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

		like.deleteLike = function(request) {
			return $.ajax({
				type: 'DELETE',
				url: url,
				headers: { 'x-access-token': localStorage.getItem('token') },
				data: request.data,
				success: request.onSuccess,
				error: request.onError,
				dataType: 'json'
			});
		};

	}

	return new LikeRequest();

});