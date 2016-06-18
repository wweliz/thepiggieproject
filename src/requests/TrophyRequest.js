define(['knockout'],function(ko){

	function TrophyRequest(){

		var trophy = this;

		var url = $.sc.HB_CONSTANTS.API_ENDPOINT + 'api/v1/trophies';

		trophy.all = function(request){
			return $.ajax({
				type:'GET',
				url: url,
				headers: { 'x-access-token': localStorage.getItem('token') },
				data:request.data,
				success: request.onSuccess,
				error:onError,
				dataType:'json'});
		};

		trophy.get = function(request){
			return $.ajax({
				type:'GET',
				url:url+"/"+request.data.id,
				headers: { 'x-access-token': localStorage.getItem('token') },
				data:request.data,
				success: request.onSuccess,
				error:onError,
				dataType:'json'});
		};

		trophy.post = function(request){
			return $.ajax({
				type:'POST',
				url: url,
				headers: { 'x-access-token': localStorage.getItem('token') },
				data:request.data,
				success: request.onSuccess,
				error:onError,
				dataType:'json'});
		};

		function onError(response){
			console.log(response);
		}
	}

	return new TrophyRequest();

});