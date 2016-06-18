define(['knockout', 'text!./register.html', './reg-fb/reg-fb', 'RegisterWithEmail'], function(ko, template, RegFb, RegisterWithEmail) {

	function register(params) {

		var register = this;

		register.authFb = function(){
			RegFb.authFb();
		}

	}
	
	return { viewModel: register, template: template };

});