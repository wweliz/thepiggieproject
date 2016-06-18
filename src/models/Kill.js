define(['knockout','underscore'],function(ko,_){

    function Kill(params){

        var kill = this;

        kill.selectedSpecie = ko.observable(params.selectedSpecie);
        kill.selectedSubSpecie = ko.observable(params.selectedSubSpecie);
        kill.quantity = ko.observable(1);
        kill.metaData = ko.observable(params.metaData);
        kill.specieId = null;
        kill.subSpecieId = null;
        kill.typeId = null;

        kill.selectedSpecieName = ko.computed(function(){
            var result = "Select a Species...";
            if (_.isObject(kill.selectedSpecie())){
                result = kill.selectedSpecie().name;
            }
            return result;
        });

        kill.selectedSpecie.subscribe(function(value){
            value = value || {};
            kill.specieId =  value.id;
        });

        kill.selectedSubSpecie.subscribe(function(value){
            value = value || {};
            kill.subSpecieId =  value.id;
        });

    }

    return Kill;

});