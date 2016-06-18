define(['knockout', 'text!./information.html'], function(ko, template) {

  function Info(params) {
    var info = this;

    info.message = ko.observable('Hello from the about component!');
  }

  return { viewModel: Info, template: template };

});
