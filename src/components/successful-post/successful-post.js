define(['knockout', 'text!./successful-post.html','Feed-Post', 'HuntsRequest'], function(ko, templateMarkup,FeedPost, HuntsRequest) {

  function SuccessfulPost(params) {

    var sp = this;

    console.log(params.route().id);

    sp.postId = params.route().id;
    sp.postImage = ko.observable();

    console.log(sp.postId);

    sp.state = params.state;
    
    sp.huntSuccess = function(response){
      console.log(response);
      sp.postImage(response.result.photos[0].url);

    }

    sp.huntError = function(){
      console.log(result);
    }

    
    sp.getHunt = function(){
      HuntsRequest.get({
        data: {
            id: sp.postId
        },
        onSuccess: sp.huntSuccess,
        onError: sp.huntError
      });
    }

    sp.getHunt();

    
    sp.newPost = function(){
      window.location.hash = '/post-a-hunt/create';
     
    }


  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  SuccessfulPost.prototype.dispose = function() { };
  
  return { viewModel: SuccessfulPost, template: templateMarkup };

});
