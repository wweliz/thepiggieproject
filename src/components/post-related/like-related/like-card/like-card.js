define(['knockout', 'text!./like-card.html', 'LikeRequest', 'LikeModel'], function(ko, templateMarkup, LikeRequest, LikeModel) {

	function LikeCard(params) {

		var like = this;

		like.like = params.like;
		like.likeId = params.like.id();
		like.created_at = params.like.created_at();
		like.userId = params.like.userId();
		like.huntId = params.like.huntId();

	}
	
	return { viewModel: LikeCard, template: templateMarkup };

});
