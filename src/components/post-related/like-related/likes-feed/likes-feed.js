define(['knockout', 'text!./likes-feed.html'], function(ko, templateMarkup) {

  function LikesFeed(params) {
    this.message = ko.observable('Hello from the likes-feed component!');
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  LikesFeed.prototype.dispose = function() { };
  
  return { viewModel: LikesFeed, template: templateMarkup };

});
