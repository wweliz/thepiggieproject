define(['knockout', 'text!./insights-page.html'], function(ko, templateMarkup) {

	function InsightsPage(params) {
		this.message = ko.observable('Hello from the insights-page component!');
	}

	return { viewModel: InsightsPage, template: templateMarkup };

});
