define(['knockout', 'underscore', 'text!./resizable-image.html','CanvasToBlob'], function(ko, _, templateMarkup) {

  function ResizableImage(params) {
    var resizableImage = this;
    var TO_RADIANS = Math.PI/180;

    var currentAngle = 0;

    resizableImage.image = params.image;
    resizableImage.realImage = params.realImage;
    resizableImage.postImage = params.postImage;
    resizableImage.outputSize = params.outputSize || {height:600, width:600};

    resizableImage.realImage.subscribe(function(newValue){
      //this code was supposed to zoom the image out on startup. gonna have to find a different way to do this because it's breaking stuff

      if (newValue){
        orig_src.src = resizableImage.realImage();
        resizableImage.image(null);

        var height = (220 / orig_src.width) * orig_src.height;
        var width = 220;

        if (orig_src.height < orig_src.width){
          width = (220 / orig_src.height) * orig_src.width;
          height = 220;
        }

        resize_canvas.getContext('2d').drawImage(orig_src, 0, 0, width, height);
        resizableImage.image(resize_canvas.toDataURL("image/jpeg"));

        resize_canvas.height = height;
        resize_canvas.width = width;

        $container.height(height);
        $container.width(width);

      }
    });

    var overlay = $('.dz-overlay');

    var $container,
        orig_src = new Image(),
        event_state = {},
        min_width = 220,
        min_height = 220,
        max_width = 1000,
        max_height = 1000,
        resize_canvas = document.createElement('canvas');

    orig_src.crossOrigin = "Anonymous";


    resizableImage.init = function () {

      // Create a new image with a copy of the original src
      // When resizing, we will always use this original copy as the base
      $container = $('.dz-resize-container');

      //In startResize() ...
      $(document).on('mousemove touchmove', resizableImage.moving);
      $(document).on('mouseup touchend', resizableImage.endMoving);

      //In endResize()...
      $(document).off('mouseup touchend', resizableImage.endMoving);
      $(document).off('mousemove touchmove', resizableImage.moving);

      //In  startMoving()...
      $(document).on('mousemove touchmove', resizableImage.moving);
      $(document).on('mouseup touchend', resizableImage.endMoving);

      //In endMoving()...
      $(document).off('mouseup touchend', resizableImage.endMoving);
      $(document).off('mousemove touchmove', resizableImage.moving);

    };

    resizableImage.crop = function () {
      var crop_canvas,
          left = overlay.offset().left - $container.offset().left,
          top = overlay.offset().top - $container.offset().top,
          width = overlay.width(),
          height = overlay.height();

      crop_canvas = document.createElement('canvas');
      crop_canvas.width = width;
      crop_canvas.height = height;


      //console.log(left);
      //console.log(top);
      //console.log(width);
      //console.log(height);
      crop_canvas.getContext('2d').drawImage(orig_src, left, top, width, height, 0, 0, width, height);
      //window.open(crop_canvas.toDataURL("image/jpeg"));

      resizableImage.image(crop_canvas.toDataURL("image/jpeg"));
      crop_canvas.toBlob(setPostImage,"image/jpeg", 0.65);

    };

    resizableImage.rotate = function(){
      currentAngle += 90;
      rotateImage(orig_src,resize_canvas.getContext('2d'),0,0,currentAngle);
    };

    function rotateImage(image, context, x, y, angle) {
      //console.log('rotating');
      context.clearRect(0,0,resize_canvas.width,resize_canvas.height);
      context.save();
      context.translate(x, y);
      context.rotate(angle * TO_RADIANS);
      context.drawImage(image, -(image.width/2), -(image.height/2));
      context.restore();

      resizableImage.image(resize_canvas.toDataURL("image/jpeg"));
    };

    function setPostImage(blob){
      resizableImage.postImage(blob);
    }


    resizableImage.manualZoomIn = function(){
      resizableImage.resizeImage(1.1)
    };

    resizableImage.manualZoomOut = function(){
      resizableImage.resizeImage(.9);
    };

    resizableImage.resize = function(data, e){
      if(e.originalEvent.wheelDelta /120 > 0) {
        resizableImage.resizeImage(1.1);
      }
      else{
        resizableImage.resizeImage(.9);
      }
    };

    resizableImage.resizeImage = function (ratio) {
      var height = resize_canvas.height *= ratio;
      var width = resize_canvas.width *= ratio;

      if (width <= min_width) {
        width = min_width;
        height = width / orig_src.width * orig_src.height;
      }else if (width >= max_width){
        width = max_width;
        height = width / orig_src.width * orig_src.height;
      }else if (height <= min_height) {
        height = min_height;
        width = height / orig_src.height * orig_src.width;
      }else if (height >= max_height){
        height = max_height;
        width = height / orig_src.height * orig_src.width;
      }


      resize_canvas.getContext('2d').rotate(90 * Math.PI / 180);
      resize_canvas.getContext('2d').drawImage(orig_src, 0, 0, width, height);
      resizableImage.image(resize_canvas.toDataURL("image/jpeg"));

      resize_canvas.height = height;
      resize_canvas.width = width;

      $container.height(height);
      $container.width(width);

      resizableImage.boundaryCheck();
    };

    resizableImage.startMoving = function (data,e) {
      e.preventDefault();
      e.stopPropagation();
      resizableImage.saveEventState(data, e);
      $(document).on('mousemove', resizableImage.moving);
      $(document).on('mouseup', resizableImage.endMoving);
    };

    resizableImage.endMoving = function (e) {
      e.preventDefault();
      $(document).off('mouseup', resizableImage.endMoving);
      $(document).off('mousemove', resizableImage.moving);
    };

    resizableImage.moving = function (e) {
      var mouse = {};
      e.preventDefault();
      e.stopPropagation();
      mouse.x = (e.clientX || e.pageX) + $(window).scrollLeft();
      mouse.y = (e.clientY || e.pageY) + $(window).scrollTop();
      $container.offset({
        'left': mouse.x - ( event_state.mouse_x - event_state.container_left ),
        'top': mouse.y - ( event_state.mouse_y - event_state.container_top )
      });

      resizableImage.boundaryCheck();
    };

    resizableImage.boundaryCheck = function(){
      if ($container.offset().left > overlay.offset().left){
        $container.offset({left:overlay.offset().left,top:$container.offset().top});
      }

      if ($container.offset().left + $container.width() < overlay.offset().left + overlay.width()){
        $container.offset({left:overlay.offset().left + overlay.width() - $container.width(),top:$container.offset().top});
      }

      if ($container.offset().top > overlay.offset().top){
        $container.offset({left:$container.offset().left,top:overlay.offset().top});
      }

      if ($container.offset().top + $container.height() < overlay.offset().top + overlay.height()){
        $container.offset({left:$container.offset().left,top:overlay.offset().top + overlay.height() - $container.height()});
      }
    };

    resizableImage.saveEventState = function (data, e) {
      // Save the initial event details and container state
      event_state.container_width = $container.width();
      event_state.container_height = $container.height();
      event_state.container_left = $container.offset().left;
      event_state.container_top = $container.offset().top;
      event_state.mouse_x = (e.clientX || e.pageX || e.originalEvent.touches[0].clientX) + $(window).scrollLeft();
      event_state.mouse_y = (e.clientY || e.pageY || e.originalEvent.touches[0].clientY) + $(window).scrollTop();

      // resizableImage is a fix for mobile safari
      // For some reason it does not allow a direct copy of the touches property
      if (typeof e.originalEvent.touches !== 'undefined') {
        event_state.touches = [];
        $.each(e.originalEvent.touches, function (i, ob) {
          event_state.touches[i] = {};
          event_state.touches[i].clientX = 0 + ob.clientX;
          event_state.touches[i].clientY = 0 + ob.clientY;
        });
      }
      event_state.evnt = e;
    };

    resizableImage.clear = function(){
      resizableImage.image(null);
      resizableImage.realImage(null);
    };

    resizableImage.init();

  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  ResizableImage.prototype.dispose = function() { };

  return { viewModel: ResizableImage, template: templateMarkup };

});
