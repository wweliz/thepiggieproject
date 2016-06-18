define(['knockout', 'WeatherDetailsHelper'],function(ko, wdh){

    function WeatherDetails(params){
        var weather  = this;
        weather.cloudCover = ko.observable(params.cloudCover || null);
        weather.dewPoint = ko.observable(params.dewPoint || null);

        weather.feelsLikeF = ko.observable(params.feelsLike ? parseInt(params.feelsLike) : null);

        weather.feelsLikeC = ko.observable(params.feelsLike ? wdh.f2C(params.feelsLike) : null);

        weather.humidity = ko.observable(params.humidity? parseInt(params.humidity * 100) : null);

        weather.latitude = ko.observable(params.latitude || null);
        weather.longitude = ko.observable(params.longitude || null);
        weather.moonPhase = ko.observable(params.moonPhase || null);

        weather.moonIcon = ko.observable(wdh.findMoonIcon(params.moonPhase || null));

        weather.moonOptions = ko.observable(['new_moon', 'waning_crescent', 'last_quarter', 'waning_gibbous', 'full_moon', 'waxing_gibbous', 'first_quarter', 'waxing_crescent']);

        weather.offset = ko.observable(params.offset || null);
        weather.pressure = ko.observable(params.pressure || '-');
        weather.solunarRating = ko.observable(params.solunarRating || null);
        weather.rawSunset = ko.observable(params.rawSunset || null);
        weather.rawSunrise = ko.observable(params.rawSunrise || null);
        weather.sunset = ko.observable(params.sunset || null);
        weather.sunrise = ko.observable(params.sunrise || null);
        //weather.summary = ko.observable(params.summary || null);
        weather.summaryIcon = ko.observable(params.icon || null);

	weather.summaryOptions = ko.observable(['clear-day', 'clear-night', 'rain', 'snow', 'sleet', 'wind', 'fog', 'cloudy', 'partly-cloudy-day', 'partly-cloudy-night']);
        weather.timezone = ko.observable(params.timezone || null);

        weather.temperatureF = ko.observable(params.temperature ? parseInt(params.temperature) : null);

        weather.temperatureC = ko.observable(params.temperature ? wdh.f2C(params.temperature) : null);

        weather.visibility = ko.observable(params.visibility || null);
        weather.windBearing = ko.observable(params.windBearing || null);
        weather.windDirection = ko.observable(params.windDirection || null);
        weather.windSpeed = ko.observable(params.windSpeed || null);


        weather.feelsLikeF2C = ko.computed(function() {
            weather.feelsLikeC(wdh.f2C(weather.feelsLikeF()));
        });
        weather.feelsLikeC2F = ko.computed(function() {
            weather.feelsLikeF(wdh.c2F(weather.feelsLikeC()));
        });
        weather.moonIconName = ko.computed(function() {
            if(weather.moonIcon()){
                return wdh.formatIconText(weather.moonIcon());
            };
        });
        weather.summaryIconName = ko.computed(function(){
            if (weather.summaryIcon()){
                return wdh.formatIconText(weather.summaryIcon());
            }
        });
        weather.temperatureF2C = ko.computed(function() {
            weather.temperatureC(wdh.f2C(weather.temperatureF()));
        });
        weather.temperatureC2F = ko.computed(function() {
            weather.temperatureF(wdh.c2F(weather.temperatureC()));
        });
    }

    return WeatherDetails;
});
