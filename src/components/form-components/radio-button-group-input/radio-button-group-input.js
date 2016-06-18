define(['knockout', 'text!./radio-button-group-input.html'], function(ko, templateMarkup) {

  function RadioButtonGroupInput(params) {
    var group = this;

    group.options = params.options || params.data.units;
    group.selection = params.selection || params.data.value;
    group.name = params.name || params.data.name;
    group.label = params.label || params.data.label;
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  RadioButtonGroupInput.prototype.dispose = function() { };
  
  return { viewModel: RadioButtonGroupInput, template: templateMarkup };

});
