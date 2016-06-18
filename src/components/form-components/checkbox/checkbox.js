define(['knockout', 'text!./checkbox.html'], function(ko, templateMarkup) {

  function Checkbox(params) {

    
    var checkbox = this;

    checkbox.data = params.data;
    checkbox.value = params.value;
    checkbox.styleClass = params.data.css || params.data.id;

    console.log(params);

  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  Checkbox.prototype.dispose = function() { };
  
  return { viewModel: Checkbox, template: templateMarkup };

});
