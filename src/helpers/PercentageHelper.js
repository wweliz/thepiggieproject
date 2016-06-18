define(['knockout'],function(ko){
	
	function PercentageHelper(){

		var helper = this;

		var ONEPERCENT = 0.01;

		helper.prettifyPercentDecimal = function(percentDecimal){
			var result = '';

			if (percentDecimal > ONEPERCENT) ){
				result = percentDecimal * 100 + '%';
			} else {
				result = '1%';
			}

			return result;
		}
	
	}

	return new PercentageHelper();

});