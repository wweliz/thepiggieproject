define(['knockout', 'text!./heatmap.html','underscore', 'Feed-Post', './MapMarker', 'markerClusterer', 'googleHeatMapHandler', 'googlemaps!'], function(ko, templateMarkup, _, Post, MapMarker) {

    function HeatMap(params) {
        var hm = this;

        hm.params = params;
        hm.posts = params.posts; // observableArray

        // used to trigger rendering of the heatmap component
        // which calls init()
        hm.postsLoaded = params.postsLoaded; // observable boolean

        var mapOptions = {
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.SATELLITE,
            disableDefaultUI: false,
        };

        hm.map = null;
        hm.heatmap = null;
        hm.mapMarkers = [];
        hm.mc = null;

        hm.infowindow = new google.maps.InfoWindow();
        hm.selectedPost = ko.computed(function() {
            //console.log('post id:' + $.sc.mapPostFocus());
            var thePost =  _.find(hm.posts(), function(post) {
                return post.id() == $.sc.mapPostFocus();
            });
            //console.log(thePost);
            return thePost;
        });

        hm.refreshAllPosts = function() {
        };

        hm.initialize = function(element) {
            // don't subscribe to post changes till after the initial posts are loaded.
            hm.posts.subscribe(function(changes) {
                //console.log('posts changed');
                hm.mapPosts();
            }, null, "arrayChange");

            hm.map = new google.maps.Map(element, mapOptions);
            hm.mapPosts();
            google.maps.event.addListener(hm.map, 'zoom_changed', function () {
                var currentZoom = hm.map.getZoom();
                //console.log('zoom: ' + currentZoom);
                if (currentZoom < 10 ) {
                    changeOpacity(0.5 - ( currentZoom / 100.0 ))
                } else {
                    changeOpacity(0.5);
                }
                changeRadius(currentZoom);
            });
        };

        hm.mapPosts = function() {
            hm.bounds = new google.maps.LatLngBounds();
            function locationIsMappable(post) {
                function isInteger(n){
                    return n === Number(n);
                }

                var isMappable = false;
                if ( !(_.isNaN(post.latitude) || _.isNaN(post.longitude)) ) {
                    if (post.longitude != 0 && post.latitude != 0) {
                        isMappable = true;
                    };
                }
                return isMappable;
            }
            function postMatchesExistingPostLocation(post, mm) {
                var latDiff = Math.abs(post.latitude - mm.latitude);
                var lngDiff = Math.abs(post.longitude - mm.longitude);
                if ( lngDiff < 0.002 && latDiff < 0.002 ) {
                    return true;
                } else {
                    return false;
                }
            }

            var mapMarkers = [];

            _.each(hm.posts(), function(post, index) {
                if ( locationIsMappable(post)) {
                    var matchFound = false;
                    _.find(mapMarkers, function (mm) {
                        if (postMatchesExistingPostLocation(post, mm)) {
                            mm.addPost(post);
                            matchFound = true;
                        }
                    });
                    if (!matchFound) {
                        var googleMarker = new google.maps.Marker({
                            position: new google.maps.LatLng(post.latitude, post.longitude),
                            map: hm.map,
                            icon: getImage()
                        });
                        hm.bounds.extend(googleMarker.position);
                        mapMarkers.push(new MapMarker(post, googleMarker));
                    }
                }
            });

            // build the info windows after all posts are grouped, so the caption sare all there.
            _.each(mapMarkers, function(mm, index) {
                createMarkerInfoWindowListener(mm, index);
            });


            hm.mapMarkers = mapMarkers;

            // if the thing is zoomed too close, set it to a saner one and center on the first marker
            google.maps.event.addListenerOnce(hm.map, 'bounds_changed', function(event) {
                if (hm.map.getZoom() < 3 ) {
                    hm.map.setZoom(3);
                    try {
                        hm.map.setCenter(hm.mapMarkers[0].marker.position);
                    } catch (e ){}
                }
            });

            //now fit the map to the newly inclusive bounds
            hm.map.fitBounds(hm.bounds);

            hm.mc = new MarkerClusterer(hm.map, _.pluck(mapMarkers, 'marker'));

            var pointArray = new google.maps.MVCArray(_.pluck(hm.mapMarkers, 'weightedLocation'));
            var initRadius = computeRadius(hm.map.getZoom());
            hm.heatmap = new google.maps.visualization.HeatmapLayer({
                data: pointArray,
                map: hm.map,
                radius: initRadius
            });
        };

        hm.toggleHeatmap = function() {
            hm.heatmap.setMap(hm.heatmap.getMap() ? null : hm.map);
        };
        hm.addSomePosts = function() {
            var post = new Post(generator.getPostObject());
            hm.posts.push(post);
        }

        var createMarkerInfoWindowListener = function(mapMarker, index) {
            google.maps.event.addListener(mapMarker.marker, 'click', (function(theGoogleMarker) {
                return function() {
                    clearMapFocus();
                    hm.infowindow.setContent(mapMarker.buildContentForInfoWindow());
                    hm.infowindow.open(hm.map, theGoogleMarker);
                    if ( mapMarker.postCount() == 1 ) {
                        $.sc.mapPostFocus(mapMarker.baseId());
                    }
                }
            })(mapMarker.marker, index));

            google.maps.event.addListener(hm.infowindow,'closeclick',function(){
                clearMapFocus();
            });
        };

        var clearMapFocus = function() {
            $.sc.mapPostFocus("");
        }


        var getImage = function() {
            return {
                url: '/images/map/target.png',
                size: new google.maps.Size(16, 16),
                // The origin for this image is (0, 0).
                origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at (0, 32).
                anchor: new google.maps.Point(8, 8)
            };
        };

        function changeGradient() {
            var gradient = [
                'rgba(0, 255, 255, 0)',
                'rgba(0, 255, 255, 1)',
                'rgba(0, 191, 255, 1)',
                'rgba(0, 127, 255, 1)',
                'rgba(0, 63, 255, 1)',
                'rgba(0, 0, 255, 1)',
                'rgba(0, 0, 223, 1)',
                'rgba(0, 0, 191, 1)',
                'rgba(0, 0, 159, 1)',
                'rgba(0, 0, 127, 1)',
                'rgba(63, 0, 91, 1)',
                'rgba(127, 0, 63, 1)',
                'rgba(191, 0, 31, 1)',
                'rgba(255, 0, 0, 1)'
            ];
            hm.heatmap.set('gradient', hm.heatmap.get('gradient') ? null : gradient);
        }

        function computeRadius(currentZoom) {
            var newRadius = currentZoom * 8 + 20;
            if ( currentZoom > 9 ) {
                newRadius = 100;
            }
            return newRadius;
        }
        function changeRadius(currentZoom) {
            hm.heatmap.set('radius', computeRadius(currentZoom));
        }

        function changeOpacity(newOpacity) {
            hm.heatmap.set('opacity', newOpacity);
        }

    }

    function FakePostGenerator() {
        var gen = this;

        gen.baseLocations = {
            ar: {
                longitude: "35.201050",
                latitude: "-91.831833"
            },
            nc: {
                longitude: "35.591156",
                latitude: "-77.349243"
            },
            wa: {
                longitude: "46.602071",
                latitude: "-120.505899"
            },
            ak: {
                longitude: "64.837778",
                latitude: "-147.716389"
            },
            wi: {
                longitude: "43.784440",
                latitude: "-88.787868"
            }
        };

        gen.createRegionalLocation = function(state, variance) {
            return gen.randomLocationFromBase(gen.baseLocations[state], variance);
        }
        gen.createRandomLocation = function() {
            var rand = Math.random() * 10;
            if ( rand < 2 ) return gen.randomLocationFromBase(gen.baseLocations.ar, 2.0);
            if ( rand < 4 ) return gen.randomLocationFromBase(gen.baseLocations.nc, 1.5);
            if ( rand < 6 ) return gen.randomLocationFromBase(gen.baseLocations.wa, 2.0);
            if ( rand < 8 ) return gen.randomLocationFromBase(gen.baseLocations.wi, 1.5);
            return gen.randomLocationFromBase(gen.baseLocations.ak, 2.5);
        }

        gen.randomLocationFromBase = function(baseLocation, distanceFactor) {
            var location = {};
            location.longitude = (baseLocation.longitude - distanceFactor ) + (distanceFactor * 2 * Math.random());
            location.latitude = (baseLocation.latitude - distanceFactor ) + (distanceFactor * 2 * Math.random());
            return location;
        };

        gen.fakeSomePosts = function() {
            var fakedPosts = [];
            for (var i = 0; i < hm.posts().length; i++ ) {
                fakedPosts.push(gen.createRandomPost());
            }
            for (var j = 0; j < fakedPosts.length; j++) {
                hm.posts.push(fakedPosts[j]);
            }
        };

        gen.getPostObject = function(id) {
            var tempPost = {
                "id":1791,
                "created_at":"2015-07-17T19:19:28.608Z",
                "updated_at":"2015-07-17T19:19:28.608Z",
                "userId":140,
                "dateStart":"2015-07-17T00:00:00.000Z",
                "dateEnd":null,
                "caption":"Doing the Macarena?",
                "access":null,
                "published":true,
                "typeId":1,
                "groupId":null,
                "subSpecieId":null,
                "search":null,
                "weaponId":null,
                "location":{
                    "id":1678,
                    "longitude":"157.1753352",
                    "latitude":"29.6864383",
                    "city":"Nidamnam",
                    "state":"South Dakota",
                    "zip":"23269",
                    "country":"Tajikistan",
                    "region":null,
                    "huntId":1791,
                    "published":true
                },
                "tags":[

                ],
                "photos":[
                    {
                        "id":1756,
                        "url":"http://i.imgur.com/apkgGZT.jpg",
                        "created_at":"2015-07-17T19:19:28.760Z",
                        "updated_at":"2015-07-17T19:19:28.760Z",
                        "userId":140,
                        "huntId":1791
                    }
                ],
                "flag":{

                },
                "journal":{
                    "id":162,
                    "created_at":"2015-07-17T19:19:28.760Z",
                    "updated_at":"2015-07-17T19:19:28.760Z",
                    "huntId":1791,
                    "entry":"You are a part of the Rebel Alliance and a traitor! Take her away! Remember, a Jedi can feel the Force flowing through him. A tremor in the Force. The last time I felt it was in the presence of my old master. Alderaan? I'm not going to Alderaan. I've got to go home. It's late, I'm in for it as it is. I'm surprised you had the courage to take the responsibility yourself. Still, she's got a lot of spirit. I don't know, what do you think? I don't know what you're talking about. I am a member of the Imperial Senate on a diplomatic mission to Alderaan-- Red Five standing by. Alderaan? I'm not going to Alderaan. I've got to go home. It's late, I'm in for it as it is. I have traced the Rebel spies to her. Now she is my only link to finding their secret base. Kid, I've flown from one side of this galaxy to the other. I've seen a lot of strange stuff, but I've never seen anything to make me believe there's one all-powerful Force controlling everything. There's no mystical energy field that controls my destiny. It's all a lot of simple tricks and nonsense. In my experience, there is no such thing as luck. Your eyes can deceive you. Don't trust them. A tremor in the Force. The last time I felt it was in the presence of my old master. I'm surprised you had the courage to take the responsibility yourself. Kid, I've flown from one side of this galaxy to the other. I've seen a lot of strange stuff, but I've never seen anything to make me believe there's one all-powerful Force controlling everything. There's no mystical energy field that controls my destiny. It's all a lot of simple tricks and nonsense. But with the blast shield down, I can't even see! How am I supposed to fight? I can't get involved! I've got work to do! It's not that I like the Empire, I hate it, but there's nothing I can do about it right now. It's such a long way from here. Look, I ain't in this for your revolution, and I'm not in it for you, Princess. I expect to be well paid. I'm in it for the money. I want to come with you to Alderaan. There's nothing for me here now. I want to learn the ways of the Force and be a Jedi, like my father before me.",
                    "snippet":"You are a part of the Rebel Alliance and a traitor! Take her away! Remember, a Jedi can feel the For",
                    "published":null
                },
                "likes":[

                ],
                "comments":[

                ],
                "user":{
                    "id":140,
                    "username":"patrick",
                    "firstName":"Patrick",
                    "lastName":"Walters",
                    "role":"user",
                    "lastLogin":"2015-07-16T18:39:49.286Z",
                    "active":true,
                    "avatar":"http://www.alan.com/wp-content/uploads/2014/09/Hunters.jpg",
                    "coverPhoto":"http://coolcoverpix.com/wp/wp-content/uploads/2015/03/Landscape%20Nature%20Lovers%20Facebook%20Cover1390414662.jpg",
                    "private":false,
                    "huntsCount":10,
                    "followersCount":7,
                    "followingCount":9
                },
                "type":{
                    "id":1,
                    "name":"bigGame",
                    "label":"Big Game"
                },
                "video":{

                },
                "critters":[

                ],
                "weather":{

                },
                "weapon":{

                }
            };

            tempPost.id = id;
            return tempPost;
        }

    }
    var generator = new FakePostGenerator();

    return { viewModel: HeatMap, template: templateMarkup };

});