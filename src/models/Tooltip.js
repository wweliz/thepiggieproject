define(['knockout','ObjectUtils'],function(ko,ObjectUtils){

    function Tooltip(params){

        var tooltip = this;

        tooltip.message = ko.observable(params.message);
        tooltip.visible = ko.observable(false);
        tooltip.id = ko.observable(params.id);

        tooltip.update = function(data,id){
            console.log(data);
            _.each(data,function(value,key){
                tooltip[key](value);
                console.log(key);
                console.log(tooltip[key]());
            });

            if (ObjectUtils.exists(id)){
                $('#'+tooltip.id()).position({my:"center bottom",at:"center top",of:'#'+id});
            }
        }
    }

    return Tooltip;

});