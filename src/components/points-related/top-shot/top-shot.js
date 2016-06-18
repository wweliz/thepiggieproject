define(['knockout', 'text!./top-shot.html'], function(ko, templateMarkup) {

  function TopShot(params) {
    this.message = ko.observable('Hello from the top-shot component!');
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  TopShot.prototype.dispose = function() { };
  
  return { viewModel: TopShot, template: templateMarkup };

});
