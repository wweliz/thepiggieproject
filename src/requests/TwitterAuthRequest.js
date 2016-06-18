define(['knockout'],function(ko){

	function TwitterAuthRequest(){

		var tar = this;

		var url = $.sc.HB_CONSTANTS.API_ENDPOINT + 'twitter/oauth';

		tar.send = function(request){
			return $.ajax({
				type:'GET',
				url:url,
				success: request.onSuccess,
				error:onError,
				dataType:'json'});
		};

		function onSuccess(response){
			console.log(response);
		};

		function onError(response){
			console.log(response);
		};

	}

	return new TwitterAuthRequest();

});