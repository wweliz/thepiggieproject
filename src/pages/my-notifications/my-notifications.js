define(['knockout', 'text!./my-notifications.html', 'Notifications', 'NotificationsRequest'], function(ko, templateMarkup, notifications, notificationReq) {

	function MyNotifications() {

		var note = this;
		
		note.notificationArray = ko.observableArray([]);
		note.noticeCount = ko.observable();
		note.toggleRefreshSVG = ko.observable(false);
		note.deleteText = ko.observable(false);

		note.getNotifications = function(){
			note.toggleRefreshSVG(true);
			notificationReq.get({
				onSuccess: note.setArray
			});
		};



		note.setArray = function(response){
			note.noticeCount(response.result.length);
			note.toggleRefreshSVG(false);
			note.notificationArray(ko.utils.arrayMap(response.result,function(note){
				return new notifications(note);
			}));
			note.markReadOnServer();
		};

		note.getNotifications();
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// SET VIEWED STATUS FOR NOTIFICATIONS ON PAGE //////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		note.filterViewedFromArray = function(array) {
			return array.filter(function(v) {
					return v.viewed != true;
			});
		}

		note.markReadOnServer = function() {
			notificationReq.viewed({
				data: _.pluck(note.filterViewedFromArray(note.notificationArray()), 'id'),
				onSuccess: note.resetFrontEndReadCount
			});
		}

		note.resetFrontEndReadCount = function(response){
			console.log('They are been marked as read.')
		}


		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// CLEAR ALL BUTTON FUNCTIONALITY //////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		note.clearNotifications = function(){
			notificationReq.deleteAllViewed({
				onSuccess: note.clearSuccess
			})
		}

		note.clearSuccess = function(){
			note.getNotifications();
			note.deleteText(true);
		}
	}

	return { viewModel: MyNotifications, template: templateMarkup };

});
