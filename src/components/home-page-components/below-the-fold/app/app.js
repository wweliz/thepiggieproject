define(['knockout', 'text!./app.html'], function(ko, template) {

  function App(params) {
  	
  	var app = this;

  	app.message = ko.observable('Hello from the app component!');
  }
  
  return { viewModel: App, template: template };

});
