define([], function() {

	function ExifDataHelper() {
		var helper = this;

		helper.getGPSData = function(file, callback) {
			helper.getExifData(file, function(exifData) {
				var latRef = exifData.GPSLatitudeRef || 'N';
				var lat = exifData.GPSLatitude;
				var lngRef = exifData.GPSLongitudeRef || 'W';
				var lng = exifData.GPSLongitude;

				if (lat && lng) {
					lat = (lat[0] + lat[1] / 60 + lat[2] / 3600) * (latRef == "N" ? 1 : -1);
					lng = (lng[0] + lng[1] / 60 + lng[2] / 3600) * (lngRef == "W" ? -1 : 1);

					var coords = {};
					coords.lat = lat;
					coords.lng = lng;

					callback(coords);
				}
			});
		};

		helper.getDateTime = function(file, callback) {
			helper.getExifData(file, function(exifData) {
				var string = exifData.DateTime;
				var values = string.match(/\d+/g);
				var date = new Date();

				if (values) {

					date.setYear(values[0]);
					date.setMonth(values[1]-1);
					date.setDate(values[2]);
					date.setHours(values[3]);
					date.setMinutes(values[4]);
					date.setSeconds(values[5]);

					callback(date);

				}
			});
		};

		helper.getOrientation = function(file, callback){
			EXIF.getData(file, function(){
				callback(EXIF.getTag(this,"Orientation"));
			});
		};

		helper.getExifData = function(file, callback) {
			var reader = new FileReader();
			reader.onload = function(e) {
				var exifData = EXIF.readFromBinaryFile(e.target.result);

				if (exifData) {
					callback(exifData);
				}
			}
			reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
		}

	}

	return new ExifDataHelper();

});
