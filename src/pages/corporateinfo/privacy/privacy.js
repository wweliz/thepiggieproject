define(['knockout', 'text!./privacy.html'], function(ko, template) {

  function Privacy(params) {
    var priv = this;

    priv.message = ko.observable('Here is the privacy policy.');
  }

  return { viewModel: Privacy, template: template };

});
