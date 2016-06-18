define(['knockout','underscore', 'moment', 'DateTimeHelper', 'CountHelper', 'Coordinates', 'googleMapsHandler'],function(ko, _, moment, DTHelper, CountHelper, Coordinates){

	function PreviewPost(data){
		
		var post = this;

		if (_.isUndefined(data)){
				data = {};
		};

		// USER DATA
		post.username = ko.observable(data.user.username);
		post.avatar = ko.observable(data.user.avatar);

		// POST DATA
		post.id = data.id; // post id
		post.caption = ko.observable(data.caption);
		post.journalEntry = ko.observable(data.journal.entry);
		post.photos = ko.observableArray(data.photos);

		// DATE & TIME DATA
		post.created_at = ko.observable(data.created_at); // time posted to server
		post.updated_at = ko.observable(data.updated_at); // time updated on server
		post.humanFriendlyTime = ko.observable( DTHelper.getTimeElapsed(data.created_at) ); // time elapsed since first posted to server
		
		if(data.dateStart != null) {
			// time hunt actually occured is available
			post.dateStart = ko.observable( moment(data.dateStart).format('h:mm a') );
		} else {
			// time hunt occured is not available
 			post.dateStart = ko.observable();
 		};

		if(data.dateEnd != null) {
			post.dateEnd = ko.observable( moment(data.dateEnd).format('h:mm a') );
		} else {
 			post.dateEnd = ko.observable();
 		};

		// LOCATION DATA
		post.city = ko.observable(data.location.city);
		post.state = ko.observable(data.location.state);
		post.coordinates = ko.observable(
			new Coordinates({
				lng:parseFloat(data.location.longitude),
				lat:parseFloat(data.location.latitude)
			})
		);	
		
		// ANIMAL DATA
		post.killCount = ko.observable(data.killCount);
		post.animalType = ko.observable(data.animalType);

		// SOLUNAR DATA
		post.solunar = ko.observable(data.solunar);
		post.temp = ko.observable(data.temp);
		post.moonPhase = ko.observable(data.moonPhase);

		// WEAPON INFORMATION
		// post.weapon = ko.observable(data.weapon);

	}

	return PreviewPost;

});
