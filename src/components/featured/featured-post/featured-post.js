define(['knockout', 'text!./featured-post.html'], function(ko, templateMarkup) {

	function FeaturedPost(params) {

		var post = this;

		post.post = params.post;

	}
	
	return { viewModel: FeaturedPost, template: templateMarkup };

});
