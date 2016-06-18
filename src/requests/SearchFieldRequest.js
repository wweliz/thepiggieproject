define(['knockout'],function(ko){

	function SearchFieldRequest(){

		var sfr = this;

		var url = $.sc.HB_CONSTANTS.API_ENDPOINT + 'api/v1/search';

		sfr.returnSearchResults = function(request) {
			return $.ajax({
				type: 'GET',
				url: url,
				headers: { 'x-access-token': localStorage.getItem('token') },
				data: request.data,
				success: request.onSuccess,
				error: onError,
				dataType:'json'
			});
		};

		function onError(response) {
			console.log(response);
		}
	}

	return new SearchFieldRequest();

});