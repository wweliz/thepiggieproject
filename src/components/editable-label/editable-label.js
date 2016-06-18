define(['knockout', 'InputSanitizerHelper', 'text!./editable-label.html'], function(ko, ish, templateMarkup) {

  function EditableLabel(params) {
    var label = this;

    label.value = params.value;
    label.text = params.text || params.value;
    label.id = params.id;
    label.min = params.min || null;
    label.max = params.max || null;
    label.type = params.type || 'text';
    label.input = document.getElementById(params.id);
    label.integersOnly = params.integersOnly || false;

    label.value.subscribe(function(newValue){
      if (label.min && newValue < label.min){
        label.value(label.min);
      }

      if(label.max && newValue > label.max) {
        label.value(label.max);
      }
    });

    if (label.input && label.integersOnly) {
      label.input.addEventListener('keypress', ish.sanitizeIntegers);
    }

  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  EditableLabel.prototype.dispose = function() { };
  
  return { viewModel: EditableLabel, template: templateMarkup };

});
