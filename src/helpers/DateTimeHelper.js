define(['knockout','moment', 'underscore'],function(ko,moment,_){
	
	function DateTimeHelper(){

		var helper = this;

		var ONE_MIN = 1;
		var TWO_MIN = 2;
		var ONE_HOUR = 60;
		var TWO_HOURS = 120;
		var ONE_DAY = 1440;
		var TWO_DAYS = 2880;
		var ONE_WEEK = 10080;
		var TWO_WEEKS = 20160;
		var ONE_MONTH = 86400; //Modified to force timestamps to report for 8 weeks
		var TWO_MONTHS = 86400;

		helper.getTimeElapsed = function(startTime,endTime){
			if (_.isUndefined(endTime)){
				endTime = moment( new Date() );
			}

			var currentTime = moment ( endTime );
			var postTime = moment( startTime );
			
			var minutesSince = currentTime.diff(postTime, 'minutes');
			var result = 'Just Now';

			if ( isOneMin(minutesSince) ){
					// result = minutesSince + ' min';
					result = minutesSince + ' Min';
			} else if ( isLessOneHour(minutesSince) ){
					//result = minutesSince + ' min';
					result = minutesSince + ' Min';
			} else if ( isOneHour(minutesSince) ){
					var hoursSince = currentTime.diff(postTime, 'hours')
					//result = hoursSince + ' hour';
					result = hoursSince + ' Hour';
			} else if ( isLessOneDay(minutesSince) ){
					var hoursSince = currentTime.diff(postTime, 'hours')
					//result = hoursSince + ' hours';
					result = hoursSince + ' Hours';
			} else if ( isOneDay(minutesSince) ){
					var daysSince = currentTime.diff(postTime, 'days')
					//result = daysSince + ' day';
					result = daysSince + ' Day';
			} else if ( isLessOneWeek(minutesSince) ){
					var daysSince = currentTime.diff(postTime, 'days')
					//result = daysSince + ' days';
					result = daysSince + ' Days';
			} else if ( isOneWeek(minutesSince) ){
					var weeksSince = currentTime.diff(postTime, 'weeks')
					//result = weeksSince + ' week';
					result = weeksSince + ' Week';
			} else if ( isLessOneMonth(minutesSince) ){
					var weeksSince = currentTime.diff(postTime, 'weeks')
					//result = weeksSince + ' weeks';
					result = weeksSince + ' Weeks';
			} else if ( isOneMonth(minutesSince) ){
					var monthsSince = currentTime.diff(postTime, 'months')
					//result = monthsSince + ' month';
					result = monthsSince + ' Month';
			} else if ( isMultipleMonths(minutesSince) ){
					var monthsSince = currentTime.diff(postTime, 'months')
					//result = monthsSince + ' months';
					result = monthsSince + ' Months';
			}

			return result;
		};

		helper.getEpochTime = function(date){
			var result = null;
			if (_.isDate(date)){
				result = convertDateToEpoch(date);
			}else if (date){
				result = convertDateToEpoch(new Date(date));
			}

			return result;
		};

		helper.formatDate = function(date){
			return moment(date).format("MM/DD/YYYY HH:mm A");
		};

		helper.parse = function(date){
			if (_.isDate(date)){
				return date;
			}
			return moment(date,"MM/DD/YYYY HH:mm A");
		};

		function convertDateToEpoch(date){
			return Math.round(date.getTime() / 1000);
		}

		function isOneMin(minutesSince){
			return minutesSince >= ONE_MIN && minutesSince < TWO_MIN;
		}

		function isLessOneHour(minutesSince){
			return minutesSince >= TWO_MIN && minutesSince < ONE_HOUR;
		}

		function isOneHour(minutesSince){
			return minutesSince >= ONE_HOUR && minutesSince < TWO_HOURS;
		}

		function isLessOneDay(minutesSince){
			return minutesSince >= TWO_HOURS && minutesSince < ONE_DAY;
		}

		function isOneDay(minutesSince){
			return minutesSince >= ONE_DAY && minutesSince < TWO_DAYS;
		}

		function isLessOneWeek(minutesSince){
			return minutesSince >= ONE_DAY && minutesSince < ONE_WEEK;
		}

		function isOneWeek(minutesSince){
			return minutesSince >= ONE_WEEK && minutesSince < TWO_WEEKS;
		}

		function isLessOneMonth(minutesSince){
			return minutesSince >= ONE_WEEK && minutesSince < ONE_MONTH;
		}

		function isOneMonth(minutesSince){
			return minutesSince >= ONE_MONTH && minutesSince < TWO_MONTHS;
		}

		function isMultipleMonths(minutesSince) {
			return minutesSince >= TWO_MONTHS;
		}
	
	}

	return new DateTimeHelper();

});