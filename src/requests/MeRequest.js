define(['knockout','underscore', 'HamboneConstants'],function(ko,_,HB){

	function GetUserRequest(){

		var user = this;

		var url = HB.API_ENDPOINT + 'api/v1/me';

		user.get = function(request){
			return $.ajax({
				type: 'GET',
				url: url,
				headers: { 'x-access-token': localStorage.getItem('token') },
				success: request.onSuccess,
				data: request.data,
				error: request.onError,
				dataType: 'json'});
		};

		user.all = function(request){
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

		user.update = function(request){
			var fd = new FormData();

			addIfExists('avatar',request.data.avatar,fd);
			addIfExists('coverPhoto',request.data.coverPhoto,fd);
			addIfExists('username', request.data.username,fd);
			addIfExists('firstName', request.data.firstName,fd);
			addIfExists('lastName', request.data.lastName,fd);
			addIfExists('email',request.data.email,fd);
			addIfExists('private',request.data.private,fd);

			$.ajax({
				type: 'POST',
				url: url,
				headers: { 'x-access-token': localStorage.getItem('token') },
				data: fd,
				contentType: false,
				processData: false,
				success: request.onSuccess,
				error: request.onError
			});
		};

		function addIfExists(name,value,fd){
			if(!_.isUndefined(value) && !_.isNull(value)){
				fd.append(name,value);
			}
		}

	}

	return new GetUserRequest();

});