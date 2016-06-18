define(['ObjectUtils'],function(ObjectUtils){

    function JsonToInputHelper(){
        var helper = this;

        var COMPONENTS = {
            numeric : 'numeric-input',
            text : 'text-input',
            textArea : 'textarea-input',
            dropdown : 'dropdown',
            radio : 'radio-button-group-input',
            checkbox : 'checkbox'
        };

        //gets a component name based on the type returned in the animal form json
        helper.getComponentName = function(type){
            var result = COMPONENTS.text;

            if (ObjectUtils.exists(COMPONENTS[type])) {
                result = COMPONENTS[type];
            }

            return result;
        }


    }

    return new JsonToInputHelper();
});
