define(['knockout'],function(ko){
	
	function CountHelper(){

		var helper = this;

		var THOUSAND = 1000;
		var MILLION = 1000000;

		helper.prettifyCount = function(count){
			var result = '';

			if ( isLessOneThousand(count) ){
					result = count;
			} else if ( isThousands(count) ){
					var newCount = count / THOUSAND;
					result = newCount.toFixed(1) + ' K';
			} else if ( isThousandsPoint(count) ){
					var newCount = count / THOUSAND;
					result = newCount.toFixed(1) + ' K';
			} else if ( isMillions(count) ){
					var newCount = count / MILLION;
					result = newCount.toFixed(1) + ' M';
			} else if ( isMillionsPoint(count) ){
					var newCount = count / MILLION;
					result = newCount.toFixed(1) + ' M';
			}

			return result;
		}

		function isLessOneThousand(count){
			return count < THOUSAND;
		}

		function isThousands(count){
			return count >= THOUSAND && count < MILLION && count % THOUSAND === 0;
		}

		function isThousandsPoint(count){
			return count > THOUSAND && count < MILLION && count % THOUSAND != 0;
		}

		function isMillions(count){
			return count >= MILLION && count % MILLION === 0;
		}

		function isMillionsPoint(count){
			return count > MILLION && count % MILLION != 0;
		}
	
	}

	return new CountHelper();

});