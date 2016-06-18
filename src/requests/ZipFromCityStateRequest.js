define([],function(){

    function ZipFromCityStateRequest(){

        var request = this;

        request.getLngLatFromCityState = function(params){
            $.ajax({
                url:"http://maps.googleapis.com/maps/api/geocode/json",
                data:params.data,
                success:function(response){
                    if (response.results.length > 0) {
                        var location = response.results[0].geometry.location;
                        var data = {
                            latlng: location.lat + ',' + location.lng,
                            location: location,
                            sensor: false
                        };

                        response.success = params.success;
                        request.getZipFromLongLat(response)
                    }else{
                        console.log('no results');
                    }
                },
                error:log
            });
        };

        request.getZipFromLongLat = function(data){
            $.ajax({
                url: "http://maps.googleapis.com/maps/api/geocode/json",
                data:data,
                success:data.success || log,
                error:log
            });

        };

        function log(response){
            console.log(response);
        }

    }

    return new ZipFromCityStateRequest();

});