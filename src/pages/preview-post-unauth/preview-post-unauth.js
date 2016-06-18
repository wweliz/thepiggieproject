define(['knockout', 'text!./preview-post-unauth.html', 'PreviewPostRequest', 'PreviewPostModel'], function(ko, templateMarkup, PreviewPostRequest, PreviewPostModel) {

	function PreviewPostUnauth(params) {

		var post = this;

		post.id = params.route().id;
		
		post.post = ko.observable();
		post.coordsValid = ko.observable(false);
		post.controlVis = ko.observable(true);
		post.componentName = ko.observable('register');
		post.btnText = ko.observable('Log In');

		post.redirectToDtPost = function() {
			window.location.hash = '/detailed-post/' + post.id;
		};

		post.toggleComponent = function() {
			if (post.componentName() == 'register') {
				post.componentName('login');
				post.btnText('Register');
				post.controlVis(false);
			} else if (post.componentName() == 'login') {
				post.componentName('register');
				post.btnText('Log In');
				post.controlVis(true);
			}
		};

		post.onError = function(response) {
			console.log(response);
		};	

		post.onResponse = function(response) {
			// check that response contains latitude and longitude coordinates
			if (response.result.location.latitude && response.result.location.longitude) {
				post.coordsValid(true);
			}

			post.post(new PreviewPostModel(response.result));
		};

		PreviewPostRequest.get({
			data:{
				// id: post.id
				id: 1791
			},
			onSuccess: post.onResponse,
			onError: post.onError
		});

	}
	
	return { viewModel: PreviewPostUnauth, template: templateMarkup };

});
