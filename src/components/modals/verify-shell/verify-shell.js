define(['knockout', 'text!./verify-shell.html'], function(ko, templateMarkup) {

  function Verify(params) {

  	var v = this;
  	v.message = params.message;
    v.confirmText = params.confirmText;
    // this.message = ko.observable('Hello from the verifyUnfollow component!');

    v.confirm = function(){
    	params.callback();
    }
	}
  
  return { viewModel: Verify, template: templateMarkup };

});
