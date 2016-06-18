define(['knockout', 'text!./text-input.html'], function(ko, templateMarkup) {

  function TextInput(params) {
    var input = this;

    input.inputId = params.inputId;
    input.name = params.name;
    input.value = params.value;
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  TextInput.prototype.dispose = function() { };
  
  return { viewModel: TextInput, template: templateMarkup };

});
