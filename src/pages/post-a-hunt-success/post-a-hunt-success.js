define(['knockout', 
	'text!./post-a-hunt-success.html', 
	],
	
	function(ko, 
		templateMarkup) {

	function PostAHunt(params) {

		var ph = this;

		console.log(params.route().id);

		ph.params = params;

		

	}

	return { viewModel: PostAHunt, template: templateMarkup };

});
