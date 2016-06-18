define(['knockout', 'text!./photo-carousel.html'], function(ko, templateMarkup) {

  function PhotoCarousel(params) {

    var carousel = this;

    carousel.photos = params.photos;

    carousel.showCarousel = ko.computed(function(){
			return carousel.photos().length > 1;
    });

  }

  return { viewModel: PhotoCarousel, template: templateMarkup };

});
