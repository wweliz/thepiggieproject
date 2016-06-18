define(['knockout', 'text!./notification-drawer.html'], function(ko, templateMarkup) {

	function NotificationDrawer(params) {

		var nd = this;

		nd.drawerViz = ko.computed(function() {
			var valid = false;

			if (!_.isUndefined( params.drawerContents() )) {
				valid = true;
			}
			return valid;
		});

		nd.drawerContents = ko.computed(function() {
			// initially blank; should be passed HTML markup wrapped with ''
			return params.drawerContents();
		});

		nd.toggleDrawerViz = function(){
			$('.drawer-contents').slideToggle(200);
		};

	}
	
	return { viewModel: NotificationDrawer, template: templateMarkup };

});
