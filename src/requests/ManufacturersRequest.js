define(['knockout'],function(ko){

	function ManufacturerRequest(){

		var mr = this;

		var url = $.sc.HB_CONSTANTS.API_ENDPOINT + 'api/v1/manufacturers';

		mr.manufacturersByType = function(request){
			return $.ajax({
				type:'GET',
				url:url,
				headers: { 'x-access-token': localStorage.getItem('token') },
				data:request.data,
				success: request.onSuccess,
				error:onError,
				dataType:'json'});
		};

		mr.get = function(request){
			return $.ajax({
				type:'GET',
				url:url+"/"+request.data.id,
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

	return new ManufacturerRequest();

});