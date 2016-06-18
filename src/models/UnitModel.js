define(['ObjectUtils'],function(ObjectUtils){

    function UnitModel(params){

        var unit = this;

        var props = ['name','id','min','max','increment'];

        _.each(props,function(prop){
           ObjectUtils.setIfExists(params,prop,unit);
        });

    }

    return UnitModel;


});