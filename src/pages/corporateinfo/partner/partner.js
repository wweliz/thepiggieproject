define(['knockout', 'text!./partner.html'], function(ko, template) {

  function Partner(params) {
    var ad =this;

    ad.message = ko.observable('Hello from the partner component!');
  }

  return { viewModel: Partner, template: template };

});
