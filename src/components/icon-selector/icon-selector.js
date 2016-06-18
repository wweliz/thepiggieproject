define(['knockout', 'text!./icon-selector.html'], function(ko, templateMarkup) {

  function IconSelector(params) {
    var selector = this;

    selector.value = params.value;
    selector.options = params.options;

    selector.height = params.height || '40px';
    selector.width = params.width || '40px';

    selector.showModal = params.showModal || false;
    selector.isModal = params.isModal || false;

    selector.optionsVisible = ko.observable(params.optionsVisible || false);

    selector.showOptions = function(){
      selector.turnOffEditables();

      if (selector.showModal) {
        params.optionsVisible = true;
        params.showModal = false;
        params.isModal = true;

	$.sc.modal.show({
	  cname: 'icon-selector',
	  cparams: params
	});
      } else {
	selector.optionsVisible(true);
      }
    };

    selector.turnOffEditables = function() {
      ko.postbox.publish(params.offSwitchChannel, false);
    }

    selector.srcSVG = ko.computed(function(){
      return 'images/svg/'+selector.value() + '.svg';
    });

    selector.srcPNG = ko.computed(function(){
      return  'images/svg/backup/'+selector.value() + '.png';
    });

    selector.value.subscribe(function(newValue){
      selector.optionsVisible(false);

      if (selector.showModal) {
        $('#modal-close').click();
      }
    });

    selector.optionsVisible.subscribeTo(params.offSwitchChannel);
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  IconSelector.prototype.dispose = function() { };
  
  return { viewModel: IconSelector, template: templateMarkup };

});
