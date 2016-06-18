define(['knockout', 'text!./terms.html'], function(ko, template) {

  function Terms(params) {
    
    var terms = this;

    terms.message = ko.observable('Hello from the terms component!');
  }
  
  return { viewModel: Terms, template: template };

});
