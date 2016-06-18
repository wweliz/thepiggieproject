define(['underscore'],function(_){

    function ObjectUtils(){

        var utils = this;

        utils.exists = function(obj){
            return !_.isUndefined(obj) && !_.isNull(obj);
        };

        utils.setIfExists = function(params,str,obj){
            if (utils.exists(params[str])){
                obj[str] = params[str];
            }
        }

    }

    return new ObjectUtils();


});