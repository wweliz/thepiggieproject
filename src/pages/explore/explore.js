define(['knockout', 'text!./explore.html','underscore'], function(ko, template,_) {

	function Explore(params) {

		var explore = this;

		//Sets active view on the page
		explore.activeTab = ko.observable(params.route().component);

		explore.postsUrl = ko.observable('#/explore/posts/' + params.route().searchTerm);
		explore.usersUrl = ko.observable('#/explore/users/' + params.route().searchTerm);
		explore.groupsUrl = ko.observable('#/explore/groups/' + params.route().searchTerm);
		explore.searchTerm = ko.observable( params.route().searchTerm );

	}

	return { viewModel: Explore, template: template };

});
