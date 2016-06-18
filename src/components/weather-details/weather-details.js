define(['knockout', 'text!./weather-details.html'], function(ko, templateMarkup) {

  function WeatherDetails(params) {

    var weather = this;

    weather.details = params.details;
    weather.editable = params.editable;
    weather.isDisabled = ko.observable(false);

    if(params.isDisabled){
      weather.isDisabled = params.isDisabled;
    }

   
    weather.offSwitchChannel = weather.editable ? "weather_labels_off" : null;

    weather.celsius = ko.observable(false);

    weather.toggleCelsius = function() {
        if (weather.celsius()) {
            weather.celsius(false);
        } else {
            weather.celsius(true);
        }
    }

    weather.toggleWeather = function() {
      weather.isDisabled(!weather.isDisabled());
      
    }

  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  WeatherDetails.prototype.dispose = function() { };
  
  return { viewModel: WeatherDetails, template: templateMarkup };

});
