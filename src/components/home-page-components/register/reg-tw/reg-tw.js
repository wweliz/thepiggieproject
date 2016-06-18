define(['knockout', 'text!./reg-tw.html', 'TwitterAuthRequest'], function(ko, template, TwitterAuthRequest) {

  function RegTw(params) {

  	var reg = this;
		
		reg.handleResponse = function(response){
			if (response.success) {
				console.log(response);
				window.open('https://api.twitter.com/oauth/authenticate?oauth_token=' + response.result.oauth_token);				
				// callback();
			}
		};		

		reg.TwitterOauth = function(){
			TwitterAuthRequest.send({
				onSuccess: reg.handleResponse
			})
		};

  }
  
  return { viewModel: RegTw, template: template };

});
