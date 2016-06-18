define(['knockout', 'text!./turkey-promo.html'], function(ko, templateMarkup) {

	function PromoCampaign(params) {

		var pc = this;
		pc.promoCss = ko.observable("collapsed");
		// pc.bannerHeight = ko.observable(50);
		pc.expandTitle = ko.observable("View");
		// pc.wrapperWidth = ko.observable("100%");
		// pc.hd1Size = ko.observable("2.3em");
		// pc.hd2Size = ko.observable("2.3em");
		// pc.hd3Size = ko.observable("2.3em");

		pc.expandCampaign = function () {
			if (pc.promoCss() == "collapsed") {
				pc.promoCss("expanded");
				pc.expandTitle("Close");
				// pc.bannerHeight(450);
				// 
				// pc.wrapperWidth("1170px");
				// pc.hd1Size("7em");
				// pc.hd2Size("5.5em");				
				// pc.hd3Size("5.5em");
			} else {
				pc.promoCss("collapsed");
				pc.expandTitle("View");
				// pc.bannerHeight(50);
				// 
				// pc.wrapperWidth("100%");
				// pc.hd1Size("2.3em");
				// pc.hd2Size("2.3em");
				// pc.hd3Size("2.3em");
			}
		};

	}

	return { viewModel: PromoCampaign, template: templateMarkup };

});
