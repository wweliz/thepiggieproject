define(['knockout', 'text!./featured-user-card.html', 'FeaturedPostModel'], function(ko, templateMarkup, FeaturedPostModel) {

	function FeaturedUserCard(params) {

		var featured = this;

		featured.user = params.user;
		featured.incrementFollowClick = params.incrementFollowClick;

	}

	return { viewModel: FeaturedUserCard, template: templateMarkup };

});
