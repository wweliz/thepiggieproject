define(['knockout', 'text!./create-comment.html', 'PostCommentsRequest'], function(ko, template, CommRequest) {

	function CreateComment(params) {

		var cc = this;

		cc.avatar = ko.observable(JSON.parse(localStorage.getItem('user')).avatar);
		cc.comment = ko.observable();
		cc.alertMsg = ko.observable(false);

		cc.onError = function(response) {
			console.log(response);
			cc.alertMsg('There was an error posting your comment.');
		};

		cc.onSuccess = function(response) {
			// comment successfully posted
			if (response.success = true) {

				if (response.message == 'value too long for type character varying(2500)') {
					cc.alertMsg('Comments have a maximum length of 2500 characters.');
					// do not clear comment input field; no need to refresh comments
				} else {
					// clear comment input field
					cc.comment(null);						
					// refresh comments
					params.callback();
				}
				
			} else {
				cc.alertMsg('There was an error posting your comment.');
			}
		};
		
		cc.postComment = function(formElement) {
			console.log(cc.comment());
			// clear previous alert messages
			cc.alertMsg('');
		
			if (cc.comment() != null){
				CommRequest.send({
					data:{
						comment: cc.comment(),
						huntId: params.huntId,
						userId: $.sc.currentUserId()
					},
					onSuccess: cc.onSuccess,
					onError: cc.onError
				});
			} else {
				cc.alertMsg('Please provide a comment.');
			}

		};

	}
	
	return { viewModel: CreateComment, template: template };

});
