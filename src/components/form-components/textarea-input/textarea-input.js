define(['knockout', 'text!./textarea-input.html'], function(ko, templateMarkup) {

  function TextareaInput(params) {
    this.message = ko.observable('Hello from the textarea-input component!');
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  TextareaInput.prototype.dispose = function() { };
  
  return { viewModel: TextareaInput, template: templateMarkup };

});
