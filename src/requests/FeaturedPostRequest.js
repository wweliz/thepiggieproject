define(['knockout','underscore'],function(ko,_) {

	function FeaturedPostRequest(){

		var post = this;

		var url = $.sc.HB_CONSTANTS.API_ENDPOINT + 'api/v1/featured_posts';

		post.all = function(request) {
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

	}

	return new FeaturedPostRequest();

});