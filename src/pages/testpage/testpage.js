define(['knockout', 'text!./testpage.html'], function(ko, templateMarkup) {

	function Testpage(params) {

		var test = this;

	}

	return { viewModel: Testpage, template: templateMarkup };

});
