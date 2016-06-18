define(['knockout', 'text!./about.html'], function(ko, template) {

  function About(params) {

  	var about = this;

		about.message = ko.observable('Hello from the about component!');
  }
  
  return { viewModel: About, template: template };

});
