define(['knockout', 'text!./club-details.html', 'ClubRequest', 'ClubModel'], function(ko, templateMarkup, ClubRequest, ClubModel) {

	function ClubDetails(params) {

		var club = this;

		club.club = params.club();

	}
	
	return { viewModel: ClubDetails, template: templateMarkup };

});
