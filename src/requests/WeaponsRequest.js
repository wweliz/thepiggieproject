define(['knockout'],function(ko){

	function WeaponsRequest(){

		var wr = this;

		var url = $.sc.HB_CONSTANTS.API_ENDPOINT + 'api/v1/weapons';

		// requesting all weapon types will return all manufacturers
		// all weapon types are saved as constants in the HamboneConstants.js file

		wr.allWeaponTypes = function(request){
			return $.ajax({
				type:'GET',
				url:url,
				headers: { 'x-access-token': localStorage.getItem('token') },
				data:request.data,
				success: request.onSuccess,
				error:onError,
				dataType:'json'});
		};

		wr.get = function(request){
			console.log(request);	
			return $.ajax({
				type:'GET',
				url:url+'/'+request.type,
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

	return new WeaponsRequest();

});