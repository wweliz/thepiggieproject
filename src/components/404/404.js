define(['knockout', 'text!./404.html'], function(ko, templateMarkup) {

	function FourOhFour(params) {
		window.location.hash = '/404';
	}

	return { viewModel: FourOhFour, template: templateMarkup };

});
