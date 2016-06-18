define(['knockout', 'underscore', 'text!./cropper.html', 'cropper', 'CanvasToBlob'], function(ko, _, templateMarkup) {

  function Cropper(params) {
  	var crp = this;

    crp.image = params.image;
    crp.postImage = params.postImage;
    crp.croppedImage = params.croppedImage;
    crp.orientation = params.orientation;
    crp.circle = params.circle || false;

    crp.resultSize = params.resultSize || {width:600, height:600};

    var ele = $(".cropper-img-container > img");
    var container = $(".cropper-img-container");
    var ratio = crp.resultSize.width / crp.resultSize.height;

    var orientations = {
      "1": 0,
      "3": 180,
      "6": 90,
      "8": -90
    };

    crp.image.subscribe(function(newImage){
      console.log(newImage);
      if (newImage){
        if (crp.cropper){
          container.width(container.height()*ratio);
          ele.cropper('replace',newImage);
        }else {

          container.height(container.width() / ratio);

          console.log('applying new image to cropper js...');

          ele.cropper('destroy');

          ele.attr("src", newImage);

          crp.cropper = ele.cropper({
            aspectRatio: ratio,
            hightlight: false,
            guides: false,
            strict: true,
            responsive: true,
            movable: true,
            rotatable: true,
            scalable: true,
            zoomable: true,
            mouseWheelZoom: true,
            wheelZoomRatio: .1,
            autoCrop: true,
            autoCropArea: 1,
            cropBoxResizable: false,
            cropBoxMovable: false
          });

          console.log('zooming a bit');

          ele.cropper('zoom', .1);

          var degreesToRotate = orientations[crp.orientation()] || 0;

          ele.cropper('rotate', degreesToRotate);
        }
      }
    });

    crp.crop = function(){
      var canvas = $(".cropper-img-container > img").cropper('getCroppedCanvas',crp.resultSize);
      crp.croppedImage(canvas.toDataURL("image/jpeg"));
      canvas.toBlob(setPostImage,"image/jpeg");
    };

    crp.zoomIn = function(){
      crp.zoom(.1);
    };

    crp.zoomOut = function(){
      crp.zoom(-.1);
    };

    crp.rotate = function(){
      $(".cropper-img-container > img").cropper('rotate',90);
    };

    crp.zoom = function(ratio){
      $(".cropper-img-container > img").cropper('zoom',ratio);
    };

    crp.clear = function(){
      crp.image(null);
      crp.postImage(null);
    };

    function setPostImage(result){
      crp.postImage(result);
    }
    
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  Cropper.prototype.dispose = function() { };
  
  return { viewModel: Cropper, template: templateMarkup };

});
