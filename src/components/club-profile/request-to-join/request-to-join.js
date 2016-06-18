define(['knockout', 'text!./request-to-join.html'], function(ko, templateMarkup) {

  function RequestToJoin(params) {
    this.message = ko.observable('Hello from the request-to-join component!');
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  RequestToJoin.prototype.dispose = function() { };
  
  return { viewModel: RequestToJoin, template: templateMarkup };

});
