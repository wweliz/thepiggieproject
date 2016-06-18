define(['knockout','underscore'],function(ko,_) {

	function FeaturedClubRequest(){

		var user = this;

		var url = $.sc.HB_CONSTANTS.API_ENDPOINT + 'api/v1/featured_users';
		// var url = $.sc.HB_CONSTANTS.API_ENDPOINT + 'api/v1/featured_clubs';

		user.all = function(request) {
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

	return new FeaturedClubRequest();

});