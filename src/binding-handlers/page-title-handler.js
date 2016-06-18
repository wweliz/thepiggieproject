define(['knockout'], function(ko) {

	ko.bindingHandlers.pageTitle = {
		update: function(element, valueAccessor) {
			var pageTitle = ko.utils.unwrapObservable(valueAccessor());
			document.title = pageTitle;
		}
	};

	ko.virtualElements.allowedBindings.pageTitle = true;

});
