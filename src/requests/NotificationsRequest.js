define(['knockout'],function(ko){

	function NotificationsRequest(){

		var notice = this;

		var url = $.sc.HB_CONSTANTS.API_ENDPOINT + 'api/v1/notifications';

		notice.get = function(request){
			return $.ajax({
				type:'GET',
				url:url,
				headers: { 'x-access-token': localStorage.getItem('token') },
				success: request.onSuccess,
				error:onError,
				dataType:'json'});
		};

		notice.viewed = function(request){
			return $.ajax({
				type:'PUT',
				url:url,
				headers: { 'x-access-token': localStorage.getItem('token') },
				data: request.data,
				success: request.onSuccess,
				error:onError,
				dataType:'json'});
		};

		notice.deleteNotification = function(request){
			console.log(request.data.id);
			return $.ajax({
				type:'DELETE',
				url:url+'/'+request.data.id,
				headers: { 'x-access-token': localStorage.getItem('token') },
				success: request.onSuccess,
				error:onError,
				dataType:'json'});
		};

		notice.deleteAllViewed = function(request){
			return $.ajax({
				type:'DELETE',
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

	return new NotificationsRequest();

});