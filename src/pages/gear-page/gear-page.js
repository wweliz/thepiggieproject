define(['knockout', 'text!./gear-page.html'], function(ko, templateMarkup) {

	function GearPage(params) {
		this.message = ko.observable('Hello from the gear-page component!');
	}
	
	return { viewModel: GearPage, template: templateMarkup };

});
