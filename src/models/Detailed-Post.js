define(['knockout','underscore', 'moment', 'DateTimeHelper', 'CountHelper', 'Coordinates', 'PostTitleHelper', 'googleMapsHandler', 'WeatherDetails'],function(ko, _, moment, DTHelper, CountHelper, Coordinates, PTHelper, googleMaps, WeatherDetails){

	function DetailedPost(data){

		var dp = this;

		if (_.isUndefined(data)){
				data = {};
		};

		// USER DATA
		dp.userId = data.user.id;
		dp.firstName = ko.observable(data.user.firstName || null);
		dp.lastName = ko.observable(data.user.lastName || null);
		dp.name = ko.computed(function(){
			var name = null;
			if(dp.firstName() !== null){
				name = dp.firstName()+' ';
			}
			if (dp.lastName() !== null){
				name = name + dp.lastName();
			}
			return name;

		});
		dp.profileLink = "#/profile/"+dp.userId;
		dp.username = "@"+data.user.username;
		dp.avatar = ko.observable(data.user.avatar);

		dp.isCurrentUser = ko.computed(function() {
			if (dp.userId ==  JSON.parse(localStorage.getItem('user')).id) {
				// use currently logged in user
				return true;
			} else {
				return false;
			}
		});

		// POST DATA
		dp.id = data.id; // post id
		dp.caption = ko.observable();

		if (data.caption){
			dp.caption('\"'+data.caption+'\"');
		}
		dp.journalEntry = ko.observable(data.journal.entry);
		dp.journalSnippet = ko.observable(data.journal.snippet);
		
		// POST MEDIA
		dp.photos = ko.observableArray(data.photos);
		//dp.video = ko.observableArray(data.video);

		// POST COMMENTS
		dp.comments = ko.observableArray(data.comments);
    	dp.commentCount = ko.observable(data.comments.length).extend({prettyCount:null});

	    // POST LIKES
	    dp.likesArray = ko.observableArray(data.likes);
		dp.likesCount = ko.observable(data.likes.length).extend({prettyCount:null});

		// TAGGED USERS
   		dp.tagArray = ko.observableArray(data.tags);
   		
		// DATE & TIME DATA
		dp.created_at = ko.observable(data.created_at); // time posted to server
		dp.updated_at = ko.observable(data.updated_at); // time updated on server
		dp.humanFriendlyTime = ko.observable( DTHelper.getTimeElapsed( dp.created_at() ) ); // time elapsed since first posted to server
		
		if(data.dateStart != null) {
			// time hunt actually occured is available
			dp.dateStart = ko.observable( moment(data.dateStart).format('h:mm a') );
			dp.huntTimeISO = ko.observable(data.dateStart);
		} else {
			// time hunt occured is not available
 			dp.dateStart = ko.observable();
 		};

		if(data.dateEnd != null) {
			dp.dateEnd = ko.observable( moment(data.dateEnd).format('h:mm a') );
		} else {
 			dp.dateEnd = ko.observable();
 		};

 		// CRITTER DATA, POST TYPE & POST TITLE
 		if (!_.isEmpty(data.critters)){
 			dp.critters = data.critters;
 		} else {
 			dp.critters = false;
 		}
 		
 		if (data.critters[0] != null){
 			dp.critters = ko.observableArray(data.critters);

 			dp.postType = null;
			dp.postTypeIcon = null;
			dp.postTypeIconBackup = null;
			dp.postNonData = ko.observable(false);

 			if (data.critters[0].type){
				dp.postType = data.critters[0].type.name;

				var filename = data.critters[0].type.name.replace(/\s+/g, '').toLowerCase();

				dp.postTypeIcon = "/images/ico-"+filename+".svg";
				dp.postTypeIconBackup = "/images/ico-"+filename+".png";

				if (data.critters[0].type.id == 9 || data.critters[0].type.id == 8 ) {
					dp.postNonData(true);
				}
			}

			dp.postTitle = PTHelper.createPostTitle(dp.critters());

			if (dp.postTitle){
				dp.pageTitle = dp.postTitle+' - '+dp.id+' - Hembow';
			} else {
				dp.pageTitle = 'Post Details '+dp.id+' - Hembow';
			}				
		} else { 
			dp.postType = false;
			dp.postTitle = "Check out this post by "+data.user.firstName;
			dp.pageTitle = dp.postTitle+' - '+dp.id+' - Hembow';
		};

		// LOCATION DATA
		dp.location = ko.observable(false);
		dp.hasLocation = ko.observable(false);
		dp.city = ko.observable();
		dp.state = ko.observable();

		if(!_.isEmpty(data.location)){
			dp.hasLocation(true);
			dp.city(data.location.city);
			dp.state(data.location.state);
			dp.coordinates = ko.observable(
			new Coordinates({
				lng:parseFloat(data.location.longitude),
				lat:parseFloat(data.location.latitude)
				})
			);
		}
		
		// SOLUNAR DATA
		dp.weather = ko.observable(false); 

		if(!_.isEmpty(data.weather)){

			dp.weather(new WeatherDetails(data.weather));
			
		}

		// WEAPON INFORMATION
		dp.weapon = ko.observable(data.weapon);

		dp.weaponYear = ko.observable(null);
		dp.manufacturer = ko.observable(null);
		dp.series = ko.observable(null);
		dp.weaponDetail = ko.observable();

		function isAthing(a){
			isAthing = false;
			if (a){
				return a+' ';
			}
			else {
				return '';
			}
		}

		if(!_.isEmpty(dp.weapon())){
 			if(!_.isEmpty(dp.weapon().firearm)){
	 				dp.weaponDetail = null
	 				if(data.weapon.year){
	 					dp.weaponDetail = dp.weaponDetail+data.weapon.year;
	 				}
	 				if(data.weapon.firearm.manufacturer){
	 					if(data.weapon.firearm.manufacturer.name){
	 						dp.weaponDetail = dp.weaponDetail+ ' ' + data.weapon.firearm.manufacturer.name;
	 					}
	 				}
	 				if (data.weapon.firearm.series){
	 					dp.weaponDetail = dp.weaponDetail+ ' ' + data.weapon.firearm.series;
	 				}
 			} else if(!_.isEmpty(dp.weapon().bow)){
 			}
		}

		console.log(dp.weapon());
	}

	return DetailedPost;

});
