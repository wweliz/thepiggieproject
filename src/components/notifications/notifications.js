define(['knockout', 'text!./notifications.html', 'app/router', 'NotificationsRequest'], function(ko, template, router, NotificationsRequest) {

  function Notification(params) {

  	var note = this;

  	note.unread = ko.observable(params.note.viewed());
  	note.deleted = ko.observable(false);

  	note.deleteNotification = function(){
  		console.log(params.note.id);
  		NotificationsRequest.deleteNotification({
  			data:{
  				id: params.note.id
  			},
  			onSuccess: note.deleteSuccess,
  			onError: note.onError
  		});
  	}

  	note.deleteSuccess = function(){
  		note.deleted(true);
  	}

  }
  
  return { viewModel: Notification, template: template };

});