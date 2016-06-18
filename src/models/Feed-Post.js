define(['knockout','underscore', 'moment', 'DateTimeHelper', 'PostTitleHelper', 'StateNameHelper'],function(ko, _, moment, DTHelper, PTHelper,StHelper){

	function Post(data){

		var post = this;

		if (_.isUndefined(data)){
			data = {};
		};

		// POST TYPE
		post.typeId = data.type.id;
		post.typeName = data.type.name;
		//post.species = data.subSpecie.specie.name || null;
		//post.subSpecie = data.subSpecie.singularName || null;
		//post.subSpeciePlural = data.subSpecie.pluralName || null;

		post.postTitle = null;

		if (!_.isEmpty(data.critters)){
			post.postTitle = PTHelper.createPostTitle(data.critters);
		}

		// post.postTitle = ko.computed( function() {
		// 	postTitleHelper.createPostTitle(post.post);
		// 	console.log(postTitleHelper.createPostTitle(post.post));
		// });


		// USER DATA
		post.userId = ko.observable(data.userId);
		post.username = '@'+data.user.username;
		post.avatar = ko.observable(data.user.avatar);		
		post.firstName = ko.observable(data.user.firstName);
		post.lastName = ko.observable(data.user.lastName);
		post.name = ko.computed(function(){
			var name = null;
			if(post.firstName() !== null){
				name = post.firstName()+' ';
			}
			if (post.lastName() !== null){
				name = name + post.lastName();
			}
			return name;

		});

		// POST DATA
		post.id = ko.observable(data.id);
		post.caption = ko.observable(data.caption);
		post.journal = ko.observable(data.journal.entry || false);
		post.photos = ko.observableArray(data.photos || []);
		if (post.photos().length == 0 && data.video){
			post.photos.push(data.video.thumbnail);
		}
		post.commentCount = ko.observable(data.comments.length).extend({prettyCount:null});

		post.likesArray = ko.observableArray(data.likes);

		post.likesCount = ko.observable(data.likes.length).extend({prettyCount:null});
		post.access = ko.observable(data.access);
		post.published = ko.observable(data.published);
		post.typeId = ko.observable(data.typeId);
		post.groupId = ko.observable(data.groupId);
		post.tags = ko.observable(data.tags);
		post.flag = ko.observable(data.flag);

		// DATE & TIME DATA
		post.created_at = ko.observable(data.created_at);
		post.updated_at = ko.observable(data.updated_at);
		post.humanFriendlyTime = ko.observable( DTHelper.getTimeElapsed( post.created_at() ) );

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


		post.city = ko.observable();
		post.state = ko.observable();
		post.country = ko.observable();
		post.stateAbbrv = ko.observable();
        post.location = ko.observable(false);
        post.locationLabel = ko.observable();


        post.latitude = parseFloat(data.location.latitude);  // this ensures we get a number, even if it's 0
        post.longitude = parseFloat(data.location.longitude);

        post.location = ko.observable(false);
        if(post.latitude && post.longitude){
        	post.location(true);
        	post.city(data.location.city);
			post.state(data.location.state);
			post.country(data.location.country);
			if (post.state()) {
				post.stateAbbrv(StHelper.convert_state(post.state(), 'abbrev'));
			}

			if ( post.city() ){
				post.locationLabel(post.city());
				if (post.state()){
					post.locationLabel(post.locationLabel()+', '+post.state());
				}
			} else if (post.state()){
				post.locationLabel(post.state()); 
				if (post.country()){
					post.locationLabel(post.locationLabel()+', '+post.country());
				}
			} else if( post.country() ){
				
				post.locationLabel(post.country());
			}

        }

        
        // ANIMAL DATA
		//post.killCount = ko.observable(data.killCount);
		//post.animalType = ko.observable(data.animalType);
		if(data.critters){
			post.critters = ko.observableArray(data.critters);
		}
		// WEAPON INFORMATION
		post.weapon = ko.observable(false);
		if(!_.isEmpty(data.weapon)){
			post.weapon(true);
		}

		post.ribbon = ko.observable(false);

		if (post.weapon() || post.location() || post.journal()){
			post.ribbon(true);
		}
	}

	return Post;

});
