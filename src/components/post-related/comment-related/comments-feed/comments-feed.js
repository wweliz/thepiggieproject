define(['knockout', 'text!./comments-feed.html', 'PostCommentsRequest', 'CommentModel','underscore'], function(ko, templateMarkup, CommRequest, CommentModel,_) {

	function CommentsFeed(params) {

		var cf = this;

		cf.id = params.huntId;

		cf.comments = ko.observableArray([]);
		cf.huntUserId = params.huntUserId;

		cf.getPostComments = function(response){

			var newArray = ko.utils.arrayMap(response.result,function(comment){
				return new CommentModel(comment);
			});

			cf.comments(newArray);

			var diffArray = _.difference(newArray,cf.comments());

			_.each(diffArray,function(newThing){
				var index = 0;
				_.each(cf.comments(),function(comment,i){
					if (new Date(newThing.timestamp) > new Date(comment.timestamp)){
						index++;
					}else{
						cf.comments.splice(index,0,newThing);
						console.log(cf.comments);
					}
				});
			});
		};

		cf.commentsRequest = function(){
			CommRequest.get({
				data: { huntId: cf.id },
				onSuccess: cf.getPostComments
			});	
		};

		cf.commentsRequest();
	}
	
	return { viewModel: CommentsFeed, template: templateMarkup };

});
