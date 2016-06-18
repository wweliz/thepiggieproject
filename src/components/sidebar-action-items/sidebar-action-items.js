define(['knockout', 'text!./sidebar-action-items.html'], function(ko, templateMarkup) {

	function SidebarActionItems(params) {

		var sidebar = this;

		sidebar.adSpot = "/images/test-campaign/ducks-sidebar.jpg";

	}
	
	return { viewModel: SidebarActionItems, template: templateMarkup };

});
