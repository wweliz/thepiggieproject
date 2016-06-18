define(['knockout'],function(ko){

	function HuntsRequest(){

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
				dataType:'json'
			});
		};

		upr.get = function(request){
			console.log(request)
			return $.ajax({
				type:'GET',
				url:url+"/"+request.data.id,
				headers: { 'x-access-token': localStorage.getItem('token') },
				data:request.data,
				success: request.onSuccess,
				error: request.onError,
				dataType:'json'
			});
		};

		upr.deletePost = function(request){
			return $.ajax({
				type:'DELETE',
				url:url+"/"+request.data.id,
				headers: { 'x-access-token': localStorage.getItem('token') },
				success: request.onSuccess,
				error:onError,
				dataType:'json'
			});
		}

		upr.post = function(params){

            var fd = new FormData();

            if (params.photos[0]) {
                fd.append("photos", params.photos[0], 'image.jpg');
            }
            if (params.caption) {
                fd.append("caption", params.caption);
            }
            if (params.typeId) {
                fd.append("typeId", params.typeId);
            }
            if (params.weather) {
                fd.append("weather", params.weather);
            }
            if (params.location) {
                fd.append("location", params.location);
            }
            if (params.critters) {
                fd.append("critters", params.critters);
            }
            if (params.entry) {
                fd.append("entry", params.entry);
            }
            if (params.tags) {
                fd.append("tags", params.tags);
            }
            if (params.dateStart) {
                fd.append("dateStart", params.dateStart);
            }
			if (params.weapon && params.weapon.userWeaponId()){
				fd.append("weaponId", params.weapon.userWeaponId());
			}

            var token = localStorage.getItem('token');
            $.ajax({
                url:url,
                type:'POST',
                success:params.success || log,
                error:params.error || log,
                headers: { 'x-access-token': token },
                contentType: false,
                processData:false,
                data:fd
            });
        };

		function onError(response){
			console.log(response);
		}
	}

	return new HuntsRequest();

});