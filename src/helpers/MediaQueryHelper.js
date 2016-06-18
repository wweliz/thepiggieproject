define(['knockout','underscore'],function(ko,_){

    function MediaQueryHelper(){

        var helper = this;

        helper.xs = ko.observable(isXS());
        helper.sm = ko.observable(isSM());
        helper.md = ko.observable(isMD());
        helper.lg = ko.observable(isLG());
        helper.xl = ko.observable(isXL());

        function isXS(){
            return true;
        }

        function isSM(){
            return window.matchMedia( "(min-width: 768px)").matches;
        }

        function isMD(){
            return window.matchMedia( "(min-width: 992px)").matches;
        }

        function isLG(){
            return window.matchMedia( "(min-width: 1200px)").matches;
        }

        function isXL(){
            return window.matchMedia( "(min-width: 1500px)").matches;
        }


        function setAll(){
            helper.xs(isXS());
            helper.sm(isSM());
            helper.md(isMD());
            helper.lg(isLG());
            helper.xl(isXL());
        }

        helper.current = ko.computed(function(){
            var result = 'xl';
            if (!helper.xl()){
                if(!helper.lg()){
                    if(!helper.md()){
                        if(!helper.sm()){
                            result = 'xs';
                        }else{
                            result = 'sm';
                        }
                    }else{
                        result = 'md';
                    }
                }else{
                    result = 'lg';
                }
            }
            return result;
        });

        window.onresize = _.throttle(setAll,16);
    }


    return new MediaQueryHelper();

});
