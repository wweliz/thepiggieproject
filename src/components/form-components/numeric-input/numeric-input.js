define(['knockout', 'text!./numeric-input.html','underscore'], function(ko, templateMarkup,_) {

  function NumericInput(params) {

    var input = this;

    
    input.data = params.data;
    input.tooltip = params.tooltip;
    input.value = params.data.value || params.value;

    _.each(input.data.units,function(unit,i){
      input["displayTooltip"+i] = ko.observable(false);
      input["unitValue"+i] = ko.observable("0");

      input["unitValue"+i].subscribe(function(newValue){
        var result = "";
        _.each(input.data.units,function(myUnit,i){
          result += input["unitValue"+i]()+' '+input.data.units[i].name;
        });
        input.value(result);
      });

      input["displayTooltip"+i].subscribe(function(newValue){
        if (newValue == true){
          input.tooltip.update({message:input.data.tooltip,visible:true},unit.id);
        }else{
          input.tooltip.update({visible:false});
        }
      });
    });

  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  NumericInput.prototype.dispose = function() { };
  
  return { viewModel: NumericInput, template: templateMarkup };

});
