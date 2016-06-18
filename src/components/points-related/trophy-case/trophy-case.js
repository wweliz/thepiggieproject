define(['knockout', 'text!./trophy-case.html'], function(ko, templateMarkup) {

  function TrophyCase(params) {
    this.message = ko.observable('Hello from the trophy-case component!');
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  TrophyCase.prototype.dispose = function() { };
  
  return { viewModel: TrophyCase, template: templateMarkup };

});
