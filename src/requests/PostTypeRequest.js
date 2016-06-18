define(['knockout'],function(ko){

	function PostTypeRequest(){

		var ptr = this;

		var url = $.sc.HB_CONSTANTS.API_ENDPOINT + 'api/v1/post_types';

		ptr.get = function(request){
			return $.ajax({
				type:'GET',
				url:url,
				headers: { 'x-access-token': localStorage.getItem('token') },
				data: request.data,
				success: request.onSuccess,
				error:onError,
				dataType:'json'});
		};

		function onError(response){
			console.log(response);
		}
	}

	return new PostTypeRequest();

});