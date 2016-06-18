define(['knockout', 'underscore', 'text!./error-handler.html'], function(ko, _, templateMarkup) {

  function ErrorHandler(params) {
  	var errorHandler = this;

  	//////////////////////////////
  	//
  	// For this component to work properly, the parent page/component need to 
  	// include a callback for clearing the message and resetting the css.
  	//
  	// Load Component like this:
  	// 
  	// <error-handler params="message: alertText, clearMessage: clearAlert, css: alertClass"></error-handler>
  	//
  	//////////////////////////////

  	errorHandler.clearMessage = params.clearMessage;
  	errorHandler.message = params.message || null;
  	errorHandler.css = params.css || ' alert-info';
    
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  ErrorHandler.prototype.dispose = function() { };
  
  return { viewModel: ErrorHandler, template: templateMarkup };

});
