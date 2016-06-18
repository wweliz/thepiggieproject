define(['knockout', 'text!./us.html', 'moment'], function(ko, template, mo) {

	function Us(params) {
		var us = this;
	    us.activeTab = ko.observable(params.route().component);
	    us.currentYear = mo().format("YYYY");
	}

	return { viewModel: Us, template: template };

});
