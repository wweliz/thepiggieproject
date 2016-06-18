define(['knockout', 'text!./account-privacy.html'], function(ko, templateMarkup) {

  function AccountPrivacy(params) {
    this.message = ko.observable('Hello from the account-privacy component!');
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  AccountPrivacy.prototype.dispose = function() { };
  
  return { viewModel: AccountPrivacy, template: templateMarkup };

});
