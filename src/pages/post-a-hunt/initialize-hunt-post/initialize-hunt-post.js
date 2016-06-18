define(['knockout', 'text!./initialize-hunt-post.html'], function(ko,templateMarkup){

	function InitializeHuntPost(params) {

		var ihp = this;

		ihp.data = params;

	}
	
	return { viewModel: InitializeHuntPost, template: templateMarkup };

});
