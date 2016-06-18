define(['knockout', 'text!./trophy.html'], function(ko, template) {

	function Trophy(params) {

		var trophy = this;

		trophy.name = ko.observable('trophy name');
		trophy.iconURL = ko.observable('http://placehold.it/50x10');
		trophy.dateEarned = ko.observable('30Jun2015');
		trophy.isUnlocked = ko.observable(true);

	}
	
	return { viewModel: Trophy, template: template };

});
