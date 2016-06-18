define(['knockout', 'text!./post-selector.html','PostTypeRequest','PostType'], function(ko, templateMarkup, PostTypeRequest,PostType) {

  function PostSelector(params) {

    var ps = this;

    console.log(params.selectedPostType());

    ps.postTypes = ko.observableArray();
    ps.selectedPostType = params.selectedPostType;
    ps.callback = params.callback;

    function setPostTypes(response){
      ps.postTypes(ko.utils.arrayMap(response.result,function(post){
        return new PostType(post);
      }));
      if(!_.isEmpty(ps.selectedPostType())){
        console.log('doing this thing');
         ps.callback(_.findWhere(ps.postTypes(),{"id": ps.selectedPostType().id}));
      }
    }

    ps.unsetSelectedPostType = function(){
      ps.selectedPostType(undefined);
    };

    ps.selectedPostType.subscribe(ps.callback);

    ps.iconHidden = function(postType) {
      return typeof(ps.selectedPostType()) !== 'undefined' && ps.selectedPostType().name != postType.name;
    }

    PostTypeRequest.get({
        onSuccess: setPostTypes,
        data: {withRelated: true}
    });

  }
  
  return { viewModel: PostSelector, template: templateMarkup };

});
