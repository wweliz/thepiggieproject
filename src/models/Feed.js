define(['knockout','underscore'],function(ko,_){

    function Feed(data){
        var feed = this;

        if (_.isUndefined(data)){
            data = {};
        };

        initializeArray(data,'posts');
        initializeArray(data,'filters');


        function initializeArray(data,name){
            if (_.isArray(data[name])){
                feed[name] = ko.observableArray(data[name]);
            }else{
                feed[name] = ko.observableArray([]);
            }
        }

    }

    return Feed;

});
