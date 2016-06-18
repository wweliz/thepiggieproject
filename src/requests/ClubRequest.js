define(['knockout'],function(ko){

	function ClubRequest(){

		var club = this;

		var url = $.sc.HB_CONSTANTS.API_ENDPOINT + 'api/v1/groups';

		// request or create club ///////////////////////////////////////////////////////////
		club.allClubs = function(request) {
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

		club.get = function(request) {
			return $.ajax({
				type: 'GET',
				url: url + '/' + request.data.id,
				headers: { 'x-access-token': localStorage.getItem('token') },
				data: request.data,
				success: request.onSuccess,
				error: onError,
				dataType: 'json'
			});
		};

		club.post = function(request) {
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

		// request or invite club members ///////////////////////////////////////////////////
		club.allMembers = function(request) {
			return $.ajax({
				type: 'GET',
				url: url + '/' + request.data.id + '/members',
				headers: { 'x-access-token': localStorage.getItem('token') },
				success: request.onSuccess,
				error: request.onError,
				dataType:'json'
			});
		};

		club.inviteMember = function(request) {
			return $.ajax({
				type: 'POST',
				url: url + '/' + request.data.id + '/members',
				headers: { 'x-access-token': localStorage.getItem('token') },
				data: request.data,
				success: request.onSuccess,
				error: request.onError,
				dataType:'json'
			});
		};

		/////////////////////////////////////////////////////////////////////////////////////
		function onError(response){
			console.log(response);
		}
		
	}

	return new ClubRequest();

});