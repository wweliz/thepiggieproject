define(['knockout', 'text!./tooltip.html'], function(ko, templateMarkup) {

  function Tooltip(params) {

    var tooltip = this;

    tooltip.data = params.data;

  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  Tooltip.prototype.dispose = function() { };
  
  return { viewModel: Tooltip, template: templateMarkup };

});
