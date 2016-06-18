define(['knockout', 'text!./data-context.html','underscore'], function(ko, template,_) {

	function DataContext(params) {

		var c = this;

		c.activeTab = ko.observable(params.route().component);

	}
	
	return { viewModel: DataContext, template: template };

});
