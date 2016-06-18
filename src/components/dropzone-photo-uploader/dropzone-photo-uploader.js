define(['knockout', 'text!./dropzone-photo-uploader.html', 'dropzone','underscore','exif', 'UserGeoHelper', 'ExifDataHelper'], function(ko, templateMarkup, Dropzone, _, exif, ugh, edh) {

	//id is a String, file is an observable or an object
	function DropzonePhotoUploader(params) {
		var uploader = this;

		uploader.postImage = params.file || ko.observable(null);
		uploader.resultSize = params.resultSize;
		uploader.circle = params.circle || false;
		uploader.height = params.height || null;
		uploader.width = params.width || null;

		uploader.showSpinner = ko.observable(false);
		//console.log(params);
		uploader.intro = params.intro || null;
		uploader.cb = params.cb;
		//console.log(params);
		uploader.id = params.id;
		uploader.image = ko.observable(params.image);
		uploader.originalImage = ko.observable(null);
		uploader.croppedImage = params.croppedImage || ko.observable();
		uploader.orientation = ko.observable();
		uploader.target = '.resize-image';

		var dz = new Dropzone("div#dropzone", {
			url: "/file/post",
			autoProcessQueue: false,
			acceptedFiles: 'image/*',
			uploadMultiple: false,
			addRemoveLinks: false,
			init: function(){
				//console.log('adding listeneers');
				this.on("addedfile",readImage);
			}
		});

		function readImage(file){
			uploader.showSpinner(true);
			edh.getGPSData(file, function(coords) {
				ugh.reverseGeocode(coords.lat, coords.lng, function(places) {
					ko.postbox.publish('location-for-input-channel', places);
				});
			});

			edh.getDateTime(file, function(date) {
				ko.postbox.publish('date-for-input-channel', date);
			});

			getOrientation(file,function(orientation){
				setOrientation(orientation,file);
			});

		}

		function setOrientation(orientation,file){
			uploader.orientation(orientation);
			var fr = new FileReader();
			fr.onload = process.bind(fr,file);
			fr.readAsArrayBuffer(file);
		}

		function getOrientation(file, callback) {
			var reader = new FileReader();
			reader.onload = function(e) {

				var view = new DataView(e.target.result);
				if (view.getUint16(0, false) != 0xFFD8) return callback(-2);
				var length = view.byteLength;
				var offset = 2;
				while (offset < length) {
					var marker = view.getUint16(offset, false);
					offset += 2;
					if (marker == 0xFFE1) {
						var little = view.getUint16(offset += 8, false) == 0x4949;
						offset += view.getUint32(offset + 4, little);
						var tags = view.getUint16(offset, little);
						offset += 2;
						for (var i = 0; i < tags; i++)
							if (view.getUint16(offset + (i * 12), little) == 0x0112)
								return callback(view.getUint16(offset + (i * 12) + 8, little));
					}
					else if ((marker & 0xFF00) != 0xFF00) break;
					else offset += view.getUint16(offset, false);
				}
				return callback(-1);
			};
			reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
		}

		function process(file){
			var dv = new DataView(this.result);
			var offset = 0, recess = 0;
			var pieces = [];
			var i = 0;
			if (dv.getUint16(offset) == 0xffd8){
				offset += 2;
				var app1 = dv.getUint16(offset);
				offset += 2;
				while (offset < dv.byteLength){
					if (app1 == 0xffe1){

						pieces[i] = {recess:recess,offset:offset-2};
						recess = offset + dv.getUint16(offset);
						i++;
					}
					else if (app1 == 0xffda){
						break;
					}
					offset += dv.getUint16(offset);
					var app1 = dv.getUint16(offset);
					offset += 2;
				}
				if (pieces.length > 0){
					var newPieces = [];
					pieces.forEach(function(v){
						newPieces.push(this.result.slice(v.recess, v.offset));
					}, this);
					newPieces.push(this.result.slice(recess));
					var br = new Blob(newPieces, {type: 'image/jpeg'});
					uploader.image(br);
				}else{
					uploader.orientation(null);
					setImage(file);
				}
			}else{
				uploader.orientation(null);
				setImage(file);
			}
		}

		uploader.clear = function(){
			setImage(null);
		};

		function setImage(newImage){
			if (newImage) {
				var fr = new FileReader();
				fr.onload = function () {
					uploader.croppedImage(fr.result);
					uploader.originalImage(fr.result);
				};

				fr.readAsDataURL(newImage);
			}else{
				uploader.postImage(null);
				uploader.image(null);
				uploader.originalImage(null);
				uploader.croppedImage(null);
				dz.removeAllFiles();
			}
		}

		uploader.image.subscribe(setImage);
		uploader.originalImage.subscribe(function(newImage){
			if (newImage == null){
				//console.log('originalImage is null');
				uploader.image(null);
				uploader.croppedImage(null);
				dz.removeAllFiles();
			}
			uploader.showSpinner(false);
		});

		uploader.postImage.subscribe(function(image){
			if (_.isFunction(uploader.cb)){
				uploader.cb(image);
			}
		});

		uploader.showDropzone = ko.computed(function(){
			return uploader.postImage() == null && uploader.originalImage() == null && !uploader.showSpinner();
		});

		uploader.showEditor = ko.computed(function(){
			return uploader.postImage() == null && uploader.originalImage() != null;
		});

		uploader.showChosen = ko.computed(function(){
			return uploader.postImage() != null;
		});
	}
	
	return { viewModel: DropzonePhotoUploader, template: templateMarkup };

});
