define(['knockout'],function(ko){

	function CommentModel(data){

		var comment = this;

		comment.avatar = data.user.avatar || 'http://placehold.it/50x50';
		comment.username = data.user.username;
		comment.userId = data.userId;

		comment.comment = data.comment;
		comment.id = data.id;
		comment.timestamp = data.created_at;

	}

	return CommentModel;

});