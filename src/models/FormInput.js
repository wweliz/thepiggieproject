define(['knockout','UnitModel','JsonToInputHelper'],function(ko,UnitModel,JsonToInputHelper){

    function FormInput(params){

        var input = this;

        input.name = JsonToInputHelper.getComponentName(params.type);
        input.label = params.label;
        input.id = params.id;
        input.key = params.key;
        input.css = params.css;
        input.type = params.type;
        input.conditional = params.conditional;
        input.tooltip = params.tooltip;
        input.units = ko.utils.arrayMap(params.units,function(unit) {
            return new UnitModel(unit);
        });

        input.value = ko.observable(params.value);

    }

    return FormInput;

});
