define(['knockout'],function(ko){

	function UserWeaponsRequest(){

		var uwr = this;

		var url = $.sc.HB_CONSTANTS.API_ENDPOINT + 'api/v1/user_weapons';

		uwr.post = function(request){

			var data = request.data || {};
			if (!request.data.firearmId && !request.data.bowId && !request.data.reelId && !request.data.rodId){
				data = {};
				data.custom = JSON.stringify({
					make: request.data.manufacturer,
					model: request.data.model,
					year: request.data.year,
					series: request.data.series
				});

			}else if (request.data.rodId){
				data.reelId = request.data.additionalWeapons[0].reelId;
			}

			return $.ajax({
				type:'POST',
				url: url,
				headers: { 'x-access-token': localStorage.getItem('token') },
				data:data,
				success: request.onSuccess,
				error:onError,
				dataType:'json'});
		};

		uwr.all = function(request){
			return $.ajax({
				type:'GET',
				url: url,
				headers: { 'x-access-token': localStorage.getItem('token') },
				data:request.data,
				success: request.onSuccess,
				error:request.onError,
				dataType:'json'});
		};

		uwr.delete = function(request){
			return $.ajax({
				type:'DELETE',
				url: url+'/'+request.data.id,
				headers: { 'x-access-token': localStorage.getItem('token') },
				data:request.data,
				success: request.onSuccess,
				error:request.onError,
				dataType:'json'
			});
		}

		function onError(response){
			console.log(response);
		}
	}

	return new UserWeaponsRequest();

});