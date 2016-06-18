define(['knockout'],function(ko){

	function FollowersRequest(){

		var fr = this;

		var url = $.sc.HB_CONSTANTS.API_ENDPOINT + 'api/v1/follows';
		var followerUrl = $.sc.HB_CONSTANTS.API_ENDPOINT + 'api/v1/follows/followers';
		var followingUrl = $.sc.HB_CONSTANTS.API_ENDPOINT + 'api/v1/follows/following';

		// gets all followers of the current user
		fr.all = function(request) {
			return $.ajax({
				type: 'GET',
				url: url,
				headers: { 'x-access-token': localStorage.getItem('token') },
				data: request.data,
				success: request.onSuccess,
				error: onError,
				dataType: 'json'
			});
		};

		// gets all followers of the current user
		fr.followers = function(request) {
			return $.ajax({
				type: 'GET',
				url: followerUrl,
				headers: { 'x-access-token': localStorage.getItem('token') },
				data: request.data,
				success: request.onSuccess,
				error: onError,
				dataType: 'json'
			});
		};

		// gets all user that user is following
		fr.following = function(request) {
			return $.ajax({
				type: 'GET',
				url: followingUrl,
				headers: { 'x-access-token': localStorage.getItem('token') },
				data: request.data,
				success: request.onSuccess,
				error: onError,
				dataType:'json'
			});
		};

		// gets follow status of a single user, usually from profile view
		fr.followingOne = function(request) {
			return $.ajax({
				type: 'GET',
				url: followingUrl+'/'+request.data.followee,
				headers: { 'x-access-token': localStorage.getItem('token') },
				success: request.onSuccess,
				error: onError,
				dataType:'json'
			});
		};

		// follows a user or group
		fr.post = function(request) {
			return $.ajax({
				type: 'POST',
				url: url,
				headers: { 'x-access-token': localStorage.getItem('token') },
				data: request.data,
				success: request.onSuccess,
				error: onError,
				dataType: 'json'
			});
		};

		// follows a user or group
		fr.delete = function(request) {
			var fd = new FormData();
			fd.append('followee',request.data.followee);

			return $.ajax({
				type: 'DELETE',
				url: url,
				headers: { 'x-access-token': localStorage.getItem('token') },
				data: fd,
				contentType: false,
				processData: false,
				success: request.onSuccess,
				error: request.onError
			});
		};

		//Accepts or Declines follow request
		fr.update = function(request) {
			// var data = {
			// 	followee: request.data.followee,
			// 	accepted: request.data.accepted || null
			// }
			return $.ajax({
				type: 'PUT',
				url: url,
				headers: { 'x-access-token': localStorage.getItem('token') },
				data: request.data,
				success: request.onSuccess,
				error: request.onError
			});
		}

		//	TODO: Update with call params.
		// fr.accept = function(request) {
		// 	return $.ajax({
		// 		type: 'POST',
		// 		url: respondUrl,
		// 		headers: { 'x-access-token': localStorage.getItem('token') },
		// 		data: request.data,
		// 		success: request.onSuccess,
		// 		error: onError,
		// 		dataType: 'json'
		// 	});
		// };

		// fr.decline = function(request) {
		// 	return $.ajax({
		// 		type: 'POST',
		// 		url: respondUrl,
		// 		headers: { 'x-access-token': localStorage.getItem('token') },
		// 		data: request.data,
		// 		success: request.onSuccess,
		// 		error: onError,
		// 		dataType: 'json'
		// 	});
		// };

		function onError(response) {
			console.log(response);
		}

	}

	return new FollowersRequest();

});
