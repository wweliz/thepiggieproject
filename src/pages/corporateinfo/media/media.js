define(['knockout', 'text!./media.html'], function(ko, template) {

  function Media(params) {
  	var media = this;
  	
    media.message = ko.observable('Hello from the media component!');
  }
  
  return { viewModel: Media, template: template };

});
