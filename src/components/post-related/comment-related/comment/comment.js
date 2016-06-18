define(['knockout', 'text!./comment.html', 'PostCommentsRequest', 'FlagRequest', 'moment', 'DateTimeHelper'], function(ko, templateMarkup, CommentsRequest, FlagRequest, moment, DTHelper) {

	function Comment(params) {

		var comm = this;

		comm.comment = params.comment;

		// replace newline (\n) and carriage return (\r) characters with HTML break tags
		comm.commentText = ko.observable( params.comment.comment.replace(/\r?\n/g, '<br>') );
		
		comm.userUrl = '#/profile/' + params.comment.userId;
		comm.prettifyTime = ko.observable( DTHelper.getTimeElapsed( params.comment.timestamp ) );

		comm.isCurrentUser = ko.computed(function() {

			if ( JSON.parse(localStorage.getItem('user')).id == params.comment.userId){
				return true;
			} else { return false; }
		});

		comm.isDeletable = ko.computed(function(){
			if( comm.isCurrentUser() || params.huntUserId === JSON.parse(localStorage.getItem('user')).id ){
				return true;
			} else{
				return false;
			}
		})

		comm.isDeleted = ko.observable(false);
		
		comm.deleteSuccess = function(response) {
			comm.isDeleted(true);
		};

		comm.deleteComment = function() {
			CommentsRequest.delete({
				data: { commentId: params.comment.id },
				onSuccess: comm.deleteSuccess
			});
		};

		comm.flagSuccess = function(response) {
			console.log(response);
		};

		comm.flagComment = function() {	
			FlagRequest.createFlag({
				data: { commentId: params.comment.id },
				onSuccess: comm.flagSuccess
			});
		};

	}

	return { viewModel: Comment, template: templateMarkup };

});
