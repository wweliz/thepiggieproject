define(['knockout', 'text!./features.html'], function(ko, template) {

  function Features(params) {

  	var feature = this;

    feature.message = ko.observable('Hello from the features component!');
  }
  
  return { viewModel: Features, template: template };

});
