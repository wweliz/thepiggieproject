define([], function() {

    function InputSanitizerHelper() {
        var helper = this;

        helper.sanitizeIntegers = function(event) {
            if (event.type !== 'keypress') {
                throw 'sanitizeIntegers should be on keypress. on ' + event.type;
            }

            var key = String.fromCharCode(event.charCode || event.keyCode);

            var whitelist = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

            if (whitelist.indexOf(key) === -1) {
                event.preventDefault();
                return false;
            }
        }
    }

    return new InputSanitizerHelper();

});
