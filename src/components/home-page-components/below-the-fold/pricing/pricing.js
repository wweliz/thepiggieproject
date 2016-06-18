define(['knockout', 'text!./pricing.html'], function(ko, template) {

  function Pricing(params) {
    
  	var price = this;

    price.message = ko.observable('Hello from the pricing component!');
  }
  
  return { viewModel: Pricing, template: template };

});
