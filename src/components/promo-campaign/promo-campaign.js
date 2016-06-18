define(['knockout', 'text!./promo-campaign.html'], function(ko, templateMarkup) {

	function PromoCampaign(params) {


		var pc = this;
		pc.promoCss = ko.observable("collapsed");
		pc.expandTitle = ko.observable("View");

		pc.route = params.route
		pc.landing = ko.computed(function(){
			if (pc.route().landing){
				console.log(pc.route().landing);
				return true;
			} else{ 
				return false;}
		})




		pc.expandCampaign = function () {
			if (pc.promoCss() == "collapsed") {
				pc.promoCss("expanded");
				pc.expandTitle("Close");

			} else {
				pc.promoCss("collapsed");
				pc.expandTitle("View");

			}
		};
	}

	return { viewModel: PromoCampaign, template: templateMarkup };

});
