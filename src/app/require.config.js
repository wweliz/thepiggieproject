// require.js looks for the following global when initializing

var require = {
	baseUrl: ".",

	config: {
		GA: {
			//Development ID
			//id: 'UA-68201609-1'
			//Beta ID
			id: 'UA-68201609-2'
		}
	},

	paths: {
		"bootstrap":            "bower_modules/components-bootstrap/js/bootstrap.min",
		"config":               "app/config",
		"crossroads":           "bower_modules/crossroads/dist/crossroads.min",
		"EventEmitter":         "bower_modules/event-emitter/dist/EventEmitter",
		"facebook":             "//connect.facebook.net/en_US/all",
		"GA":                   "bower_modules/requirejs-google-analytics/dist/GoogleAnalytics",
		"hasher":               "bower_modules/hasher/dist/js/hasher.min",
		"jquery":               "bower_modules/jquery/dist/jquery",
		"jquery-ui":            "lib/jquery-ui/jquery-ui",
		"knockout":             "bower_modules/knockout/dist/knockout",
		"knockout-postbox":		"bower_modules/knockout-postbox/build/knockout-postbox.min",
		"knockout-projections": "bower_modules/knockout-projections/dist/knockout-projections",
		"markerClusterer":      "src/bower_modules/js-marker-clusterer/src/markerclusterer",
		"modernizr":            "bower_modules/modernizr/modernizr",
		"moment":               "bower_modules/moment/moment",
		"signals":              "bower_modules/js-signals/dist/signals.min",
		"text":                 "bower_modules/requirejs-text/text",
		"underscore":           "bower_modules/underscore/underscore-min",

		// LIBRARIES & HELPERS
		"async":                "lib/async//async",
		"bs-datetime":          "lib/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min",
		"CountExtention":       "ko-extenders/Count",
		"CountHelper":          "helpers/CountHelper",
		"DateTimeHelper":       "helpers/DateTimeHelper",
		"dropzone":             "lib/dropzone-file-uploader/dropzone-amd-module",
		"enterkey":             "binding-handlers/enter-key",
		"googlemaps":           "lib/googlemaps/googlemaps",
		"googleMapsHandler":    "binding-handlers/google-maps",
		"googleHeatMapHandler": "binding-handlers/google-heatmap",
		"img-handler":          "binding-handlers/img-handler",
		"JsonToInputHelper":    "helpers/JsonToInputHelper",
		"MediaQueryHelper":     "helpers/MediaQueryHelper",
		"ObjectUtils":          "helpers/ObjectUtils",
		"pageTitle":            "binding-handlers/page-title-handler",
		"PercentageHelper":     "helpers/PercentageHelper",
		"PlaceholderCover": 	"helpers/PlaceholderCover",
		"PostTitleHelper":      "helpers/PostTitleHelper",
		"RequiredExtention":    "ko-extenders/Required",
		"StateNameHelper":      "helpers/StateNameHelper",
		"sticky":               "lib/stickyjs/jquery.sticky",
		"UserGeoHelper":        "helpers/UserGeoHelper",
		"UserWeaponToSimpleWeaponHelper":	"helpers/UserWeaponToSimpleWeaponHelper",
		"WeatherDetailsHelper": "helpers/WeatherDetailsHelper",
		"CanvasToBlob":         "lib/javascript-canvas-to-blob/canvas-to-blob.min",
		"cropper":              "lib/cropper-mod/cropper",
		"infiniteScroll":       "bower_modules/knockout-js-infinite-scroll/knockout-js-infinite-scroll",
		"scroll-loader":        "binding-handlers/scroll-loader",
		"exif":			"bower_modules/exif-js/exif",
		"InputSanitizerHelper": "helpers/InputSanitizerHelper",
		"ExifDataHelper":	"helpers/ExifDataHelper",

		// MODELS
		"ClubModel":                   "models/ClubModel",
		"CommentModel":                "models/CommentModel",
		"Coordinates":                 "models/Coordinates",
		"Detailed-Post":               "models/Detailed-Post",
		"FeaturedClubModel":           "models/FeaturedClubModel",
		"FeaturedPostModel":           "models/FeaturedPostModel",
		"FeaturedUserModel":           "models/FeaturedUserModel",
		"Feed-Post":                   "models/Feed-Post",
		"Feed":                        "models/Feed",
		"FollowerModel":               "models/FollowerModel",
		"FormInput":                   "models/FormInput",
		"HamboneConstants":            "models/HamboneConstants",
		"Kill":                        "models/Kill",
		"ManufacturerModel":           "models/ManufacturerModel",
		"MapMarker":                   "components/heatmap/MapMarker",
		"MemberModel":                 "models/MemberModel",
		"Modal":                       "models/Modal",
		"Notifications":               "models/Notifications",
		"PostType":                    "models/PostType",
		"PreviewPostModel":            "models/Preview-Post",
		"SessionContext":              "models/SessionContext",
		"SimpleManufacturerModel":     "models/SimpleManufacturerModel",
		"SimpleWeaponModel":           "models/SimpleWeaponModel",
		"Specie":                      "models/Specie",
		"SubSpecie":                   "models/SubSpecie",
		"Tooltip":                     "models/Tooltip",
		"TrophyModel":                 "models/TrophyModel",
		"UnitModel":                   "models/UnitModel",
		"User-Profile-Post":           "models/User-Profile-Post",
		"UserModel":                   "models/UserModel",
		"UserWeapon":                  "models/UserWeapon",
		"WeaponModel":                 "models/WeaponModel", 
		"WeaponModelModel":            "models/WeaponModelModel",
		"WeatherDetails":              "models/WeatherDetails",

		// REQUESTS
		"ClubPostRequest":             "requests/ClubPostRequest",
		"ClubRequest":                 "requests/ClubRequest",
		"ExploreRequest":              "requests/ExploreRequest",
		"FeaturedClubRequest":         "requests/FeaturedClubRequest",
		"FeaturedPostRequest":         "requests/FeaturedPostRequest",
		"FeaturedUserRequest":         "requests/FeaturedUserRequest",
		"FeedRequest":                 "requests/FeedRequest",
		"FlagRequest":                 "requests/FlagRequest",
		"FollowersRequest":            "requests/FollowersRequest",
		"ForecastRequest":             "requests/ForecastRequest",
		"ForgotPwRequest":             "requests/ForgotPwRequest",
		"ResetPwRequest":              "requests/ResetPwRequest",
		"UserRequest":                 "requests/UserRequest",
		"HuntsRequest":                "requests/HuntsRequest",
		"GetUsersRequest":             "requests/GetUsersRequest",
		"LikeRequest":                 "requests/LikeRequest",
		"LoginRequest":                "requests/LoginRequest",
		"LoginWithFacebook":           "requests/LoginWithFacebook",
		"ManufacturersRequest":        "requests/ManufacturersRequest",
		"NotificationsRequest":        "requests/NotificationsRequest",
		"PostCommentsRequest":         "requests/PostCommentsRequest",
		"PostTypeRequest":             "requests/PostTypeRequest",
		"PreviewPostRequest":          "requests/PreviewPostRequest",
		"RegisterWithEmail":           "requests/RegisterWithEmail",
		"RegisterWithFacebook":        "requests/RegisterWithFacebook",
		"SearchFieldRequest":          "requests/SearchFieldRequest",
		"TrophyRequest":               "requests/TrophyRequest",
		"TwitterAuthRequest":          "requests/TwitterAuthRequest",
		"UserPostRequest":             "requests/UserPostRequest",
		"UsernameUniqueRequest":       "requests/UsernameUniqueRequest",
		"UserWeaponsRequest":          "requests/UserWeaponsRequest",
		"WeaponsRequest":              "requests/WeaponsRequest",
		"ZipFromCityStateRequest":     "requests/ZipFromCityStateRequest",
		"MeRequest":                   "requests/MeRequest"

		// [Scaffolded component registrations will be inserted here. To retain this feature, don't remove this comment.]
	},

	googlemaps: {
		url: 'https://maps.googleapis.com/maps/api/js',
		params: {
			libraries: 'visualization,places',
			sensor: true                // Defaults to false
		}
	},

	shim: {
		"bootstrap": { deps: ["jquery"] },
		"bs-datetime": {deps:['bootstrap']},
		"facebook" : { exports: "FB" },
		"jquery-ui": { deps: ['jquery'], exports:'$' },
		"sticky"   : { deps: ['jquery'], exports:'$'}
	}
};
