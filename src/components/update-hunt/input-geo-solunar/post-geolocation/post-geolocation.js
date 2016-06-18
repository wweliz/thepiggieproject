define(['knockout', 'text!./post-geolocation.html'], function(ko, templateMarkup) {

  function PostGeolocation(params) {

  	var geo = this;

  	//toggle div visiblity
		geo.NeedLocation = ko.observable(false);

  	geo.myLocation = function(){
			if ("geolocation" in navigator) {
				navigator.geolocation.getCurrentPosition(function(position) {
					console.log(position.coords.latitude, position.coords.longitude);
				});
			} else {
				$.sc.modal.show({
					cname:'need-location',
					cparams:{}
				});
			}
		};

		geo.showNeedLocation = function(){
			geo.NeedLocation(true);
		};

		geo.submitLocationData = function(){
			console.log('location submitted');
		};

  }
  
  return { viewModel: PostGeolocation, template: templateMarkup };

});
