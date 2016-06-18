define(['knockout', 'text!./home.html', 'facebook', 'HamboneConstants'], function(ko, homeTemplate, FB, HBC) {

	function HomeViewModel(params) {

		FB.init({ appId :  HBC.facebookAppId });

		console.log( HBC.facebookAppId);

		var home = this;

		home.activeTab = ko.observable(params.route().component);

		// get current hash so that we can show/hide buttons and redirect
		var currentHash = window.location.hash;

		if (currentHash != '#/login') {
			$('.login-button').show();
		} else {
			$('.login-button').hide();
		}

		if (currentHash != '#/register') {
			$('.register-button').show();
		} else {
			$('.register-button').hide();
		}

		function setBgDivHeight() {
			var viewportHeight = window.innerHeight
			$('.bg-cover').css('height', viewportHeight );
		}

		// Set div height on original page load
		setBgDivHeight();

		// Reset div height when the window is resized
		$(window).resize(function() {
			setBgDivHeight();
		});

	}

	return { viewModel: HomeViewModel, template: homeTemplate };

});
