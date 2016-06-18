define([],function(){

    function SubSpecie(params){
        
        var sub = this;

        sub.booneCrockett = params.booneCrockett || false;
        sub.id =  params.id;
        sub.naSuperSlam =  params.naSuperSlam || false;
        sub.pluralName =  params.pluralName;
        sub.popeYoung =  params.popeYoung || false;
        sub.postTypeId =  params.postTypeId;
        sub.singularName =  params.singularName;
        sub.speciesId =  params.speciesId;
        sub.displayText = params.singularName;

    }

    return SubSpecie;

});

