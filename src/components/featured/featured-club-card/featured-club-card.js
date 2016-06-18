define(['knockout', 'text!./featured-club-card.html'], function(ko, templateMarkup) {

  function FeaturedClubCard(params) {

		var featured = this;

		featured.club = params.club;

		featured.followClub = function() {
			console.log('follow this club');
		};

  }
  
  return { viewModel: FeaturedClubCard, template: templateMarkup };

});
