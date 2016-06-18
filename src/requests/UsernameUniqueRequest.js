define(['knockout','HamboneConstants'], function(ko,HB) {

	function UsernameUniqueRequest(){

		var req = this;

		var url = HB.API_ENDPOINT + 'unique';

		req.isUnique = function(request) {
			return $.ajax({
				type: 'GET',
				url: url,
				data: request.data,
				success: request.onSuccess,
				error: request.onError,
				dataType:'json'
			});
		};

	}

	return new UsernameUniqueRequest();

});
