define(['knockout', 'underscore', 'moment', 'DateTimeHelper',],function(ko, _, moment, DTHelper){

	function Notifications(data){

		var notify = this;

		notify.id = data.id;
		notify.timestamp =  DTHelper.getTimeElapsed( data.created_at );
		notify.viewed = ko.computed(function(){
			return data.viewed ? "read" : "unread";
		});

		notify.postImage = null;
		notify.avatar = ko.observable(null);
		notify.sourceUrl = ko.observable(null);


		if (data.huntId){
			notify.hunt = data.hunt;
			notify.huntId = data.huntId;
			if(data.hunt.photos[0]){
				notify.postImage = notify.hunt.photos[0].url;
			}
		}

		notify.message = ko.observable();
		notify.url = ko.observable();

		function setNotificationName(){
			notify.name = "A user";

			if (data.user.firstName){
				notify.name = data.user.firstName;
				if (data.user.lastName){
					notify.name = notify.name + ' ' + data.user.lastName;
				}
			} else if (data.user.username){
				notify.name = data.user.username;
			}

			return notify.name;
		}

		// GROUP OR USER SOURCE
		function setSourceTypeUser(){
			notify.sourceId = data.user.id;
			setNotificationName();
			notify.avatar(data.user.avatar || '/images/placeholder.jpg');
			notify.sourceUrl("profile/"+notify.sourceId);
		}

		function setSourceTypeGroup(){
			notify.sourceId = data.group.id;
			notify.name = data.group.name;
			notify.avatar(data.group.avatar || '/images/placeholder.jpg');
			notify.sourceUrl("club/"+notify.sourceId);
		}

		notify.fromType = data.fromType;
		if (notify.fromType == "user") {
			setSourceTypeUser();
		} else if (notify.fromType == "group") {
			setSourceTypeGroup();
		}

		// TYPE OF NOTIFICATION
		notify.type = data.type;

		function setNoteTypeFollow(){
			notify.message(" is now following you.");
			notify.url("/profile/" + notify.sourceId);
		}

		if (notify.type == "like"){
			notify.message(" liked your post.");
			notify.url('/detailed-post/'+notify.huntId);
		} else if (notify.type == "comment"){
			notify.message(" commented on your post.");
		} else if (notify.type == "follow"){
			setNoteTypeFollow();
		} else if (notify.type == "followRequest"){
			notify.message(" has requested to follow you.");
		} else if (notify.type == 'reset'){
			notify.message("Your Hembow password was reset.")
		}

		

		notify.notifications = ko.observable(notify);


	}

	return Notifications;

});
