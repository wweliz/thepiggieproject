define(['knockout','CountHelper'],function(ko,CountHelper){

        return ko.extenders.prettyCount = function(target,option) {
            //create a writable computed observable to intercept writes to our observable
            var result = ko.pureComputed({
                read: target,  //always return the original observables value
                write: function(newValue) {
                    var current = target();
                    var valueToWrite = CountHelper.prettifyCount(newValue);

                    //only write if it changed
                    if (valueToWrite !== current) {
                        target(valueToWrite);
                    } else {
                        //if the value is the same, but a different value was written, force a notification for the current field
                        if (newValue !== current) {
                            target.notifySubscribers(valueToWrite);
                        }
                    }
                }
            }).extend({ notify: 'always' });

            //initialize with current value
            result(target());

            //return the new computed observable
            return result;
        };

});