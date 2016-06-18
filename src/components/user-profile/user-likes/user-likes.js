define(['knockout', 'text!./user-likes.html', 'underscore', 'LikeRequest', 'Feed-Post'], function(ko, templateMarkup, _, LikeRequest, FeedModel) {

  function UserLikes(params) {

		var likes = this;

		likes.userId = params.user().id;

		likes.likesArray = ko.observableArray([]);
		likes.feedError = ko.observable(false);
		likes.isCurrentUser = params.isCurrentUser();

		likes.setArray = function(response){
			
			if (!_.isEmpty(response.result)){
				likes.likesArray(ko.utils.arrayMap(response.result,function(like) {
					if(!_.isEmpty(like)){
						return new FeedModel(like);
					}
				}));

				likes.likesArray(_.compact(likes.likesArray()));

  		} else {
  				console.log(response);
				likes.feedError(true);
			}
		};

		likes.onError = function(response) {
			console.log(response);
		};

		LikeRequest.all({
			data:{ userId: likes.userId },
			onSuccess: likes.setArray,
			onError: likes.onError
		});

  }
  
  return { viewModel: UserLikes, template: templateMarkup };

});
