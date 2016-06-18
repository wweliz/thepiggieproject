define([], function() {


    function WeatherDetailsHelper() {
	var helper = this;

        helper.c2F = function(celsius) {
            var fahrenheit = null;

            if (celsius) {
                fahrenheit = celsius * 1.8 + 32;
            }

            return parseInt(fahrenheit);
        }

        helper.f2C = function(fahrenheit) {
            var celsius = null;

            if (fahrenheit) {
		celsius = (fahrenheit - 32) / 1.8;
            }

            return parseInt(celsius);
        }

        helper.findMoonIcon = function(moonPhaseValue) {
	    var icon = null;

	    if (moonPhaseValue) {
		if (moonPhaseValue >= 0.9375) {
		    icon = 'new_moon';
		} else if (moonPhaseValue >= 0.8125) {
		    icon = 'waning_crescent';
		} else if (moonPhaseValue >= 0.6875) {
		    icon = 'last_quarter';
		} else if (moonPhaseValue >= 0.5625) {
		    icon = 'waning_gibbous';
		} else if (moonPhaseValue >= 0.4375) {
		    icon = 'full_moon';
		} else if (moonPhaseValue >= 0.3125) {
		    icon = 'waxing_gibbous';
		} else if (moonPhaseValue >= 0.1875) {
		    icon = 'first_quarter';
		} else if (moonPhaseValue >= 0.0625) {
		    icon = 'waxing_crescent';
		} else if (moonPhaseValue >= 0) {
		    icon = 'new_moon';
		} else {
		    icon = 'new_moon';
		}
	    }

            return icon;
        }


        helper.formatIconText = function(iconValue) {
            return iconValue.replace(/(\-|\_)/g, ' ').replace(/\b\w/g, function(l) {
                return l.toUpperCase();
            });
        }

        helper.formatPressure = function(pressureVal) {
            var pressure = null;

            if (pressureVal) {
		pressure = pressureVal.toString() + ' atm';
            }

            return pressure;
        }

        helper.prettyPercent = function(decimal) {
            var percent = null;

            if (decimal) {
                percent = Math.round(decimal * 100).toString() + '%';
            }

            return percent;
        }

        helper.makePrettyCelsius = function(number) {
            var pretty = null;

            if (number) {
		pretty = Math.round(number).toString() + '°C';
            }

            return pretty;
        }

        helper.makePrettyFahrenheit = function(number) {
            var pretty = null;

            if (number) {
		pretty = Math.round(number).toString() + '°F';
            }

            return pretty;
        }

    }

    return new WeatherDetailsHelper();

});
