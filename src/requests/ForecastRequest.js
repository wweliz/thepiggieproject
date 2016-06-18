define(['config'],function(config){

    function ForecastRequest(){

        var request = this;

        request.send = function(params){
            $.ajax({
                url:"https://kalachi-weather-service.herokuapp.com/weather",
                data:params,
                success:params.success,
                error:log
            });
        };

        function log(response){
            console.log(response);
        }

    }

    return new ForecastRequest();

});
