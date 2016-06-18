define(['knockout', 'text!./img-with-callback.html'], function(ko, templateMarkup) {

  function ImgWithCallback(params) {

    var imgWithCB = this;
    imgWithCB.value = params.value;
    imgWithCB.callback = params.callback;

    imgWithCB.height = params.height || '40px';
    imgWithCB.width = params.width || '40px';

    imgWithCB.srcSVG = ko.computed(function(){
      return 'images/svg/' + imgWithCB.value + '.svg';
    });

    imgWithCB.srcPNG = ko.computed(function(){
      return  'images/svg/backup/' + imgWithCB.value + '.png';
    });

    imgWithCB.click = function(){
      imgWithCB.callback(imgWithCB.value);
    }
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  ImgWithCallback.prototype.dispose = function() { };
  
  return { viewModel: ImgWithCallback, template: templateMarkup };

});
