define(['knockout', 'text!./duck-promo.html','ExploreRequest','Feed-Post'], function(ko, templateMarkup, req, PromoHunt) {

	function PromoCampaign(params) {
		
		var pc = this;
		pc.promoCss = ko.observable("collapsed");
		pc.expandTitle = ko.observable("View");

		
		pc.promoHunt = ko.observableArray([]);
		

		pc.headlineText = ko.observable('See the latest from Duck Season');

		pc.expandCampaign = function () {
			if (pc.promoCss() == "collapsed") {
				pc.promoCss("expanded");
				pc.expandTitle("Hide");
				pc.fetchPosts();

			} else {
				pc.promoCss("collapsed");
				pc.expandTitle("View");
				pc.promoHunt([]);

			}
		};

		pc.setArray = function(response) {
			console.log(response.result);
			pc.promoHunt(ko.utils.arrayMap(response.result,function(post){
				return new PromoHunt(post);
			}));
		}

		pc.fetchPosts = function(){
			req.hunts({
				data:{ 
					species: 'Duck',
					page: 1,
					pagesize: 4
				},
				onSuccess: pc.setArray
			});
		};

		pc.openSeason = function(){
			pc.promoCss("collapsed");
			window.location.hash = '/duck-season';
		}

	}

	return { viewModel: PromoCampaign, template: templateMarkup };

});
