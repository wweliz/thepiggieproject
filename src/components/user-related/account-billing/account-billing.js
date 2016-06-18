define(['knockout', 'text!./account-billing.html'], function(ko, templateMarkup) {

  function AccountBilling(params) {
    this.message = ko.observable('Hello from the account-billing component!');
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  AccountBilling.prototype.dispose = function() { };
  
  return { viewModel: AccountBilling, template: templateMarkup };

});
