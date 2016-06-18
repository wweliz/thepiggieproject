define(['knockout', 'text!./icon.html'], function(ko, templateMarkup) {

  function Icon(params) {
    var icon = this;

    icon.value = params.value;
    icon.height = params.height || '40px';
    icon.width = params.width || '40px';

    icon.srcSVG = ko.computed(function(){
      return 'images/svg/'+icon.value() + '.svg';
    });

    icon.srcPNG = ko.computed(function(){
      return  'images/svg/backup/'+icon.value() + '.png';
      //return 'http://lorempixel.com/50/50'
    });

  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  Icon.prototype.dispose = function() { };
  
  return { viewModel: Icon, template: templateMarkup };

});
