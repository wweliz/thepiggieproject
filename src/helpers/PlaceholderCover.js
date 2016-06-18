define(['knockout'],function(ko){
	
	function CountHelper(){

		var helper = this;

		helper.randomCover = function(){
			function getRandomInt(min, max) {
			    
			    var coverInt = Math.floor(Math.random() * (max - min + 1)) + min;
			    return coverInt
			}

			return '/images/covers/HEMB_default_banners_'+getRandomInt(1, 4)+'.jpg';
		}	
	}

	return new CountHelper();

});