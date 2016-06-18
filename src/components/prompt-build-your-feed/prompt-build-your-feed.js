define(['knockout', 'text!./prompt-build-your-feed.html'], function(ko, templateMarkup) {

  function PromptBuildYourFeed(params) {

		var build = this;

		build.incrementFollowClick = params.incrementFollowClick;

  }
  
  return { viewModel: PromptBuildYourFeed, template: templateMarkup };

});
