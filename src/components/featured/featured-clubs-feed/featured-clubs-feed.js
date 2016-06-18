define(['knockout', 'underscore', 'text!./featured-clubs-feed.html', 'FeaturedClubRequest','FeaturedClubModel'], function(ko, _, templateMarkup, FeaturedClubRequest, FeaturedClubModel) {

  function FeaturedClubsFeed(params) {

		var featured = this;

		featured.featuredClubs = ko.observableArray([]);

		featured.setArray = function(response) {
			if (!_.isEmpty(response)){
				featured.featuredClubs(ko.utils.arrayMap(response.result,function(club){
					return new FeaturedClubModel(club);
				}));
			}
		};

		featured.onError = function(response) {
			console.log(response);
		};

		FeaturedClubRequest.all({
			data: { clubId: params.club },
			onSuccess: featured.setArray,
			onError: featured.onError
		});

  }
  
  return { viewModel: FeaturedClubsFeed, template: templateMarkup };

});
