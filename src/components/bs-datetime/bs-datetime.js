define(['knockout', 'text!./bs-datetime.html','bs-datetime'], function(ko, templateMarkup) {

  function BsDatetime(params) {
    var picker = this;

    picker.dateTime = params.dateTime;


    picker.dateTime.subscribe(function(newTime){
    
    });
    $('#datetimepicker2').datetimepicker({
      language: 'en',
      pick12HourFormat: true,
      pickSeconds:false,
      endDate: new Date(),
      observable:picker.dateTime
    });
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  BsDatetime.prototype.dispose = function() { };
  
  return { viewModel: BsDatetime, template: templateMarkup };

});
