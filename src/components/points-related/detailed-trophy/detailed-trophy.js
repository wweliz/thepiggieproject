define(['knockout', 'text!./detailed-trophy.html'], function(ko, templateMarkup) {

	function DetailedTrophy(params) {

		var trophy = this;

		trophy.name = ko.observable('trophy name');
		trophy.iconURL = ko.observable('http://placehold.it/50x50');
		trophy.dateAwarded = ko.observable('March 1');
		trophy.descrip = ko.observable('trophy description');

		trophy.viewAsscPosts = function(){
			console.log('view associated posts');
		};
		
	}
	
	return { viewModel: DetailedTrophy, template: templateMarkup };

});
