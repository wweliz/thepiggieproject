define(['jquery', 'knockout', '../models/SessionContext', './router', 'bootstrap', 'knockout-projections', 'MediaQueryHelper','GA', 'knockout-postbox','pageTitle', 'enterkey', 'CountExtention','jquery-ui','img-handler','googlemaps!'], function($, ko, sc, router, bootstrap, koproj, MediaQueryHelper, GA) {

	// Components can be packaged as AMD modules or for template-only components, you can just point to a .html file directly

	// HOME (INDEX) PAGE COMPONENTS
	ko.components.register('home-page', { require: 'pages/home-page/home' });
	ko.components.register('about', { require: 'components/home-page-components/below-the-fold/about/about' });
	ko.components.register('app', { require: 'components/home-page-components/below-the-fold/app/app' });
	ko.components.register('corporateinfo', { require: 'components/home-page-components/below-the-fold/corporateinfo/corporateinfo' });
	ko.components.register('features', { require: 'components/home-page-components/below-the-fold/features/features' });
	ko.components.register('pricing', { require: 'components/home-page-components/below-the-fold/pricing/pricing' });

	ko.components.register('404', { require: 'components/404/404' });

	// REGISTRATION & LOGIN COMPONENTS
	ko.components.register('register', { require: 'components/home-page-components/register/register' });
	ko.components.register('reg-fb', { require: 'components/home-page-components/register/reg-fb/reg-fb' });
	ko.components.register('reg-tw', { require: 'components/home-page-components/register/reg-tw/reg-tw' });
	ko.components.register('reg-em', { require: 'components/home-page-components/register/reg-em/reg-em' });
	ko.components.register('login', { require: 'components/home-page-components/login/login' });
	ko.components.register('update-user', { require: 'pages/update-user/update-user' });
	ko.components.register('forgotpw', { require: 'pages/forgotpw/forgotpw' });
	ko.components.register('resetpw', { require: 'pages/resetpw/resetpw' });

	// CORPORATE INFO PAGES
	ko.components.register('us', { require: 'pages/corporateinfo/us' });
	ko.components.register('corpsidebar', { require: 'pages/corporateinfo/sidebar/corpsidebar' })
	ko.components.register('information', { require: 'pages/corporateinfo/information/information' });
	ko.components.register('media', { require: 'pages/corporateinfo/media/media' });
	ko.components.register('partner', { require: 'pages/corporateinfo/partner/partner' });
	ko.components.register('support', { require: 'pages/corporateinfo/support/support' });
	ko.components.register('terms', { require: 'pages/corporateinfo/terms/terms' });
	ko.components.register('privacy', { require: 'pages/corporateinfo/privacy/privacy' });

	//FORM AND DATA PAGE
	ko.components.register('data-context', { require: 'pages/data-context/data-context' });

	// NAVIGATION BAR COMPONENT
	ko.components.register('nav-bar', { require: 'components/nav-bar/nav-bar' });
	ko.components.register('logo-badge', { require: 'components/nav-bar/logo-badge/logo-badge'});

	// NOTIFICATIONS COMPONENTS
	ko.components.register('notifications', { require: 'components/notifications/notifications' });
	ko.components.register('my-notifications', { require: 'pages/my-notifications/my-notifications' });

	// PROMO CAMPAIGN COMPONENT
	ko.components.register('promo-campaign', { require: 'components/promo-campaign/promo-campaign' });
	ko.components.register('turkey-promo', { require: 'components/promo-campaign/turkey-promo/turkey-promo' });
	ko.components.register('duck-promo', { require: 'components/promo-campaign/duck-promo/duck-promo' });
	ko.components.register('duck-promo-landing', { require: 'components/promo-campaign/duck-promo/duck-promo-landing' });
	ko.components.register('partner-views', { require: 'components/partner-views/partner-views' });

	// BINDING HANDLERS
	ko.components.register('enter-key', { require: 'binding-handlers/enter-key' });
	ko.components.register('google-maps', { require: 'binding-handlers/google-maps' });

	// WEAPON COMPONENTS
	ko.components.register('create-ammo', { require: 'components/weapon-related/create-ammo/create-ammo' });
	ko.components.register('create-new-weapon-form', { require: 'components/weapon-related/create-new-weapon-form/create-new-weapon-form' });
	ko.components.register('create-weapon', { require: 'components/weapon-related/create-weapon/create-weapon' });
	ko.components.register('weapon-data-input', { require: 'components/weapon-related/weapon-data-input/weapon-data-input' });
	ko.components.register('weapon-selection-list', { require: 'components/weapon-related/weapon-selection-list/weapon-selection-list' });
	ko.components.register('weapons-form', { require: 'components/weapon-related/weapons-form/weapons-form' });

	// CREATE POST COMPONENTS
	ko.components.register('prompt-create-post', { require: 'components/prompt-create-post/prompt-create-post' });

	ko.components.register('post-a-hunt', { require: 'pages/post-a-hunt/post-a-hunt' });
	ko.components.register('post-a-hunt-success', { require: 'pages/post-a-hunt-success/post-a-hunt-success' });

	ko.components.register('initialize-hunt-post', { require: 'pages/post-a-hunt/initialize-hunt-post/initialize-hunt-post' });
	ko.components.register('update-hunt-post', { require: 'pages/post-a-hunt/update-hunt-post/update-hunt-post' });
	ko.components.register('post-selector', {require: 'components/post-related/post-selector/post-selector'});

	ko.components.register('input-animal-details', { require: 'components/update-hunt/input-animal-details/input-animal-details' });
	ko.components.register('input-geo-solunar', { require: 'components/update-hunt/input-geo-solunar/input-geo-solunar' });
	ko.components.register('input-weapon', { require: 'components/update-hunt/input-weapon/input-weapon' });
	ko.components.register('input-journal', { require: 'components/update-hunt/input-journal/input-journal' });
	ko.components.register('input-friends', { require: 'components/update-hunt/input-friends/input-friends' });
	ko.components.register('post-geolocation', { require: 'components/update-hunt/input-geo-solunar/post-geolocation/post-geolocation' });
	ko.components.register('need-location', { require: 'components/update-hunt/input-geo-solunar/need-location/need-location' });

	// EDIT EXISTING POST PAGE
	ko.components.register('edit-existing-post', { require: 'pages/edit-existing-post/edit-existing-post' });

	// FEED RELATED COMPONENTS
	ko.components.register('post', { require: 'components/post-related/post/post' });
	ko.components.register('post-feed', { require: 'pages/post-feed/post-feed' });
	ko.components.register('detailed-post', { require: 'pages/detailed-post/detailed-post' });
	ko.components.register('critter-detail', { require: 'components/post-related/critter-detail/critter-detail' })

	// COMMENT-RELATED
	ko.components.register('create-comment', { require: 'components/post-related/comment-related/create-comment/create-comment' });
	ko.components.register('comment', { require: 'components/post-related/comment-related/comment/comment' });
	ko.components.register('comments-feed', { require: 'components/post-related/comment-related/comments-feed/comments-feed' });

	// LIKE-RELATED
	ko.components.register('add-like', { require: 'components/post-related/like-related/add-like/add-like' });
	ko.components.register('like-card', { require: 'components/post-related/like-related/like-card/like-card' });
	ko.components.register('likes-feed', { require: 'components/post-related/like-related/likes-feed/likes-feed' });

	// FOLLOWER-RELATED
	ko.components.register('follower', { require: 'components/follow-related/follower/follower' });
	ko.components.register('followees', { require: 'components/follow-related/followees/followees' });
	ko.components.register('follow-button', { require: 'components/follow-related/follow-button/follow-button' });

	// USER-RELATED COMPONENTS
	ko.components.register('account-settings', { require: 'components/user-related/account-settings/account-settings' });
	ko.components.register('update-user-component', { require: 'components/user-related/update-user-component/update-user-component' });
	ko.components.register('account-privacy', { require: 'components/user-related/account-privacy/account-privacy' });
	ko.components.register('account-billing', { require: 'components/user-related/account-billing/account-billing' });
	ko.components.register('delete-account', { require: 'components/user-related/delete-account/delete-account' });

	// USER PROFILE COMPONENTS
	ko.components.register('user-profile', { require: 'pages/user-profile/user-profile' });
	ko.components.register('user-info', { require: 'components/user-profile/user-info/user-info' });
	ko.components.register('user-trophies', { require: 'components/user-profile/user-trophies/user-trophies' });
	ko.components.register('user-clubs', { require: 'components/user-profile/user-clubs/user-clubs' });
	ko.components.register('user-likes', { require: 'components/user-profile/user-likes/user-likes' });
	ko.components.register('user-followers', { require: 'components/user-profile/user-followers/user-followers' });
	ko.components.register('user-following', { require: 'components/user-profile/user-following/user-following' });

	ko.components.register('user-rank', { require: 'components/user-profile/user-rank/user-rank' });
	ko.components.register('user-weapons', { require: 'components/user-profile/user-weapons/user-weapons' });
	ko.components.register('user-settings', { require: 'pages/user-settings/user-settings' });

	// USER FEED COMPONENTS
	ko.components.register('user-feed', { require: 'components/user-profile/user-feed/user-feed' });
	ko.components.register('featured-users-feed', { require: 'components/featured/featured-users-feed/featured-users-feed' });
	ko.components.register('featured-user-card', { require: 'components/featured/featured-user-card/featured-user-card' });
	ko.components.register('prompt-build-your-feed', { require: 'components/prompt-build-your-feed/prompt-build-your-feed' });
	ko.components.register('featured-posts-feed', { require: 'components/featured/featured-posts-feed/featured-posts-feed' });
	ko.components.register('featured-post', { require: 'components/featured/featured-post/featured-post' });

	// POINTS-RELATED COMPONENTS
	ko.components.register('trophy', { require: 'components/points-related/trophy/trophy' });
	ko.components.register('detailed-trophy', { require: 'components/points-related/detailed-trophy/detailed-trophy' });
	ko.components.register('top-shot', { require: 'components/points-related/top-shot/top-shot' });
	ko.components.register('trophy-case', { require: 'components/points-related/trophy-case/trophy-case' });

	// CLUB-RELATED COMPONENTS
	ko.components.register('club', { require: 'components/club-profile/club/club' });
	ko.components.register('create-club', { require: 'components/club-profile/create-club/create-club' });
	ko.components.register('request-to-join', { require: 'components/club-profile/request-to-join/request-to-join' });
	ko.components.register('member', { require: 'components/club-profile/club-members/member/member' });

	// CLUB PROFILE COMPONENTS
	ko.components.register('club-profile', { require: 'pages/club-profile/club-profile' });
	ko.components.register('club-info', { require: 'components/club-profile/club-info/club-info' });
	ko.components.register('club-details', { require: 'components/club-profile/club-details/club-details' });
	ko.components.register('club-feed', { require: 'components/club-profile/club-feed/club-feed' });
	ko.components.register('club-members', { require: 'components/club-profile/club-members/club-members' });
	ko.components.register('club-followers', { require: 'components/club-profile/club-followers/club-followers' });

	// CLUB SETTINGS TAB COMPONENTS
	ko.components.register('club-settings', { require: 'components/club-profile/club-settings/club-settings' });
	ko.components.register('invite-users', { require: 'components/club-profile/invite-users/invite-users' });
	ko.components.register('approve-users', { require: 'components/club-profile/approve-users/approve-users' });
	ko.components.register('disable-club', { require: 'components/club-profile/disable-club/disable-club' });

	ko.components.register('featured-clubs-feed', { require: 'components/featured/featured-clubs-feed/featured-clubs-feed' });
	ko.components.register('featured-club-card', { require: 'components/featured/featured-club-card/featured-club-card' });

	// EXPLORE & SEARCH COMPONENTS
	ko.components.register('explore-search-bar', { require: 'components/search-related/explore-search-bar/explore-search-bar' });
	ko.components.register('explore', {require: 'pages/explore/explore'});
	ko.components.register('browse-by-posts', { require: 'components/search-related/browse-by-posts/browse-by-posts' });
	ko.components.register('browse-by-users', { require: 'components/search-related/browse-by-users/browse-by-users' });
	ko.components.register('browse-by-groups', { require: 'components/search-related/browse-by-groups/browse-by-groups' });

	ko.components.register('duck-season', {require: 'pages/duck-season/duck-season'});
	ko.components.register('browse', {require: 'pages/browse/browse'});
	// MODAL COMPONENTS
	ko.components.register('post-modal', { require: 'components/modals/modal-window/modal-window' });
	ko.components.register('verify-shell', { require: 'components/modals/verify-shell/verify-shell' });

	// UNIVERSAL COMPONENTS
	ko.components.register('dropdown', { require: 'components/dropdown/dropdown' });
	ko.components.register('checkbox', { require: 'components/form-components/checkbox/checkbox'});
	ko.components.register('radio-button-group-input', { require: 'components/form-components/radio-button-group-input/radio-button-group-input'});
	ko.components.register('photo-carousel', { require: 'components/photo-carousel/photo-carousel' });	
	ko.components.register('dropzone-photo-uploader', { require: 'components/dropzone-photo-uploader/dropzone-photo-uploader' });
    ko.components.register('heatmap', { require: 'components/heatmap/heatmap' });
	ko.components.register('testpage', { require: 'pages/testpage/testpage' });
	ko.components.register('animal-form', { require: 'components/animal-form/animal-form' });
	ko.components.register('numeric-input', {require: 'components/form-components/numeric-input/numeric-input'});
	ko.components.register('tooltip', { require: 'components/tooltip/tooltip' });
	ko.components.register('sidebar-action-items', { require: 'components/sidebar-action-items/sidebar-action-items' });
	ko.components.register('bs-datetime', { require: 'components/bs-datetime/bs-datetime' });
	ko.components.register('weather-details', { require: 'components/weather-details/weather-details' });
	ko.components.register('editable-label', { require: 'components/editable-label/editable-label' });
	ko.components.register('icon', { require: 'components/icon/icon' });
	ko.components.register('icon-selector', { require: 'components/icon-selector/icon-selector' });
	ko.components.register('img-with-callback', { require: 'components/img-with-callback/img-with-callback' });
	ko.components.register('insights-page', { require: 'pages/insights-page/insights-page' });
	ko.components.register('gear-page', { require: 'pages/gear-page/gear-page' });
	ko.components.register('preview-post-unauth', { require: 'pages/preview-post-unauth/preview-post-unauth' });
	ko.components.register('caption-input', { require: 'components/caption-input/caption-input' });
	ko.components.register('text-input', { require: 'components/form-components/text-input/text-input' });

	ko.components.register('tag-user-card', { require: 'components/tag-user-card/tag-user-card' });

	ko.components.register('successful-post', { require: 'components/successful-post/successful-post' });

	ko.components.register('user-weapon-tag', { require: 'components/user-weapon-tag/user-weapon-tag' });

	ko.components.register('resizable-image', { require: 'components/dropzone-photo-uploader/resizable-image/resizable-image' });

	ko.components.register('cropper', { require: 'components/dropzone-photo-uploader/cropper/cropper' });

	ko.components.register('notification-drawer', { require: 'components/notification-drawer/notification-drawer' });

	ko.components.register('update-avatar', { require: 'components/user-related/update-avatar/update-avatar' });

	ko.components.register('selected-weapon', { require: 'components/weapon-related/selected-weapon/selected-weapon' });

	ko.components.register('gear', { require: 'components/user-profile/gear/gear' });

	ko.components.register('error-handler', { require: 'components/error-handler/error-handler' });

	ko.components.register('weapon-user-list', { require: 'components/weapon-related/weapon-user-list/weapon-user-list' });

	// [Scaffolded component registrations will be inserted here. To retain this feature, don't remove this comment.]

	$.router = router;
	$.sc = new sc();

	function handleRoute(route){
		filterRoute(route);
		clearSearchField(route);
		logRoute(route);
	}

	function logRoute(route){
		GA.view(route.request_);
	}

	function filterRoute(route){
		//if we don't have a user (logout should set all the user fields to undefined or null)
		if ( !route.noAuthRequired && !localStorage.getItem("user") ){
			//or whatever route you want to forward them to, i took this out of the current code
			GA.event("redirect","/register",window.location.hash);
			window.location.hash = "/register";
		}
	}

	function clearSearchField(route){
		var routeString = '/#/' + route.request_

		if (routeString.indexOf('/#/explore/') == -1) {
			// the route DOES NOT contain /#/explore/
			// clear the search input field in the navigation bar
			$('#navSearchInput').val('');
		}
	}

	$.router.currentRoute.subscribe(handleRoute);

	// Start the application
	ko.applyBindings({ route: $.router.currentRoute, mq:MediaQueryHelper });

	filterRoute($.router.currentRoute());

});
