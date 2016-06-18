define(['knockout'],function(ko){

	function UserPostRequest(){

		var upr = this;

		var url = $.sc.HB_CONSTANTS.API_ENDPOINT + 'api/v1/hunts';

		upr.all = function(request){
			return $.ajax({
				type:'GET',
				url:url,
				headers: { 'x-access-token': localStorage.getItem('token') },
				data:request.data,
				success: request.onSuccess,
				error:onError,
				dataType:'json'});
		};

		upr.get = function(request){
			return $.ajax({
				type:'GET',
				url:url+"/"+request.data.id,
				headers: { 'x-access-token': localStorage.getItem('token') },
				data:request.data,
				success: request.onSuccess,
				error:request.onError,
				dataType:'json'});
		};

		upr.deletePost = function(request){
			return $.ajax({
				type:'DELETE',
				url:url+"/"+request.data.id,
				headers: { 'x-access-token': localStorage.getItem('token') },
				success: request.onSuccess,
				error:onError,
				dataType:'json'});
		}

		function onError(response){
			console.log(response);
		}
	}

	return new UserPostRequest();

});