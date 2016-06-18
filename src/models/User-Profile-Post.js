define(['knockout','underscore', 'moment', '../helpers/DateTimeHelper'],function(ko, _, moment, DTHelper){

    function Post(data){
        
        var post = this;

        if (_.isUndefined(data)){
            data = {};
        };

        if (_.isEmpty(data.photos)){
            data.photos.push({url: 'http://placehold.it/230x230'});
        }

        post.id = ko.observable(data.id);
        post.created_at = ko.observable(data.created_at);
        post.updated_at = ko.observable(data.updated_at);
        post.userId = ko.observable(data.userId);
        post.dateStart = ko.observable(data.dateStart);
        post.dateEnd = ko.observable(data.dateEnd);
        post.caption = ko.observable(data.caption);
        post.access = ko.observable(data.access);
        post.published = ko.observable(data.published);
        post.typeId = ko.observable(data.typeId);
        post.groupId = ko.observable(data.groupId);
        post.photos = ko.observable(data.photos);
        post.tags = ko.observable(data.tags);
        post.locations = ko.observable(data.locations);
        post.flag = ko.observable(data.flag);
        post.humanFriendlyTime = ko.observable( DTHelper.getTimeElapsed( post.created_at() ) );

   }

    return Post;

});
