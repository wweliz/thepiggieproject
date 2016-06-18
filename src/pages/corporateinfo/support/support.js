define(['knockout', 'text!./support.html'], function(ko, template) {

  function Support(params) {
  	var support = this;

    support.message = ko.observable('Hello from the support component!');
  }
  
  return { viewModel: Support, template: template };

});
