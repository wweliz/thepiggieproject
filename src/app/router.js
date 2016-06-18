define(["knockout", "crossroads", "hasher", "underscore"], function(ko, crossroads, hasher, _) {

	return new Router({
		routes: [
			// home (index) page
			{ url: '/update-user',   params: { page: 'update-user', navVis: false } },
			{ url: '/login',         params: { page: 'home-page', component: 'login', navVis: false, noAuthRequired: true } },
			{ url: '/forgotpw',      params: { page: 'forgotpw', navVis: false, noAuthRequired: true } },
			{ url: '/resetpw/{id}',       params: { page: 'resetpw', navVis: false, noAuthRequired: true } },
			{ url: '/register',      params: { page: 'home-page', component: 'register', navVis: false, noAuthRequired:true, pageTitle: 'Register' } },
			{ url: '',               params: { page: 'post-feed', navVis: true, promo: true, /*promo:false*/ } },
			{ url: '/404',           params: { page: '404', navVis: false, promo: false, noAuthRequired: true} },

			// corporate info pages

			//{ url: '/us',               params: { page: 'us', component: 'information', navVis: false, noAuthRequired: true } },
			//{ url: '/us/partner',       params: { page: 'us', component: 'partner', navVis: false, noAuthRequired: true } },
			//{ url: '/us/media',         params: { page: 'us', component: 'media', navVis: false, noAuthRequired: true } },
			//{ url: '/us/support',       params: { page: 'us', component: 'support', navVis: false, noAuthRequired: true } },
			{ url: '/us/terms',         params: { page: 'us', component: 'terms', navVis: false, noAuthRequired: true } },
			{ url: '/us/privacy',       params: { page: 'us', component: 'privacy', navVis: false, noAuthRequired: true } },

			// post a hunt workflow pages
			{ url: '/post-a-hunt/{state}',          params: { page: 'post-a-hunt', navVis: true } },
			{ url: '/post-a-hunt/success/{id}',     params: { page: 'post-a-hunt-success', navVis: true } },

			// edit existing post/hunt page
			{ url: '/edit-hunt/{id}',    params: { page: 'edit-existing-post', navVis: true, promo: true } },

			// post feed pages

			{ url: '/feed',                params: { page: 'post-feed', navVis: true, promo: true, landing: false  } },
			{ url: '/detailed-post/{id}',  params: { page: 'detailed-post', navVis: true, promo: true } },


			// user profile pages
			{ url: '/profile',                        params: { page: 'user-profile', component: 'user-feed', navVis: true } },
			{ url: '/profile/{id}',                   params: { page: 'user-profile', component: 'user-feed', navVis: true } },
            { url: '/profile/{id}/map',               params: { page: 'user-profile', component: 'user-feed', navVis: true, mapVis: true } },
            { url: '/profile/{id}/trophy-case',       params: { page: 'user-profile', component: 'user-trophies', navVis: true } },
			{ url: '/profile/{id}/likes',             params: { page: 'user-profile', component: 'user-likes', navVis: true } },
			{ url: '/profile/{id}/weapons',           params: { page: 'user-profile', component: 'user-weapons', navVis: true } },
			{ url: '/profile/{id}/rank',              params: { page: 'user-profile', component: 'user-rank', navVis: true } },
			{ url: '/profile/{id}/clubs',             params: { page: 'user-profile', component: 'user-clubs', navVis: true } },
			{ url: '/profile/{id}/followers',         params: { page: 'user-profile', component: 'user-followers', navVis: true } },
			{ url: '/profile/{id}/following',         params: { page: 'user-profile', component: 'user-following', navVis: true } },

			{ url: '/profile/{id}/heatmap',           params: { page: 'insights-page', navVis: true } },
			{ url: '/profile/{id}/gear',              params: { page: 'user-profile', component: 'gear', navVis: true } },

			// user account pages
			{ url: '/settings',            params: { page: 'user-settings', navVis: true } },
			//{ url: '/settings/billing',    params: { page: 'data-context', component: 'account-billing', navVis: true } },
			{ url: '/settings/privacy',    params: { page: 'data-context', component: 'account-privacy', navVis: true } },

			// club pages
			{ url: '/club/{id}',                params: { page: 'club-profile', component: 'club-feed', navVis: true } },
			{ url: '/club/{id}/about',          params: { page: 'club-profile', component: 'club-details', navVis: true } },
			{ url: '/club/{id}/members',        params: { page: 'club-profile', component: 'club-members', navVis: true } },
			{ url: '/club/{id}/followers',      params: { page: 'club-profile', component: 'club-followers', navVis: true } },
			{ url: '/club/{id}/invite',         params: { page: 'club-profile', component: 'invite-users', navVis: true } },
			{ url: '/club/{id}/settings',       params: { page: 'club-profile', component: 'club-settings', navVis: true } },

			//SEARCH & BROWSE PAGES
			{ url: '/explore/groups/{searchTerm}',   params: { page: 'explore', component: 'browse-by-groups', navVis: true, /*promo: true,*/ promo:false  } },
			{ url: '/explore/posts/{searchTerm}',    params: { page: 'explore', component: 'browse-by-posts', navVis: true, /*promo: true,*/ promo:false  } },
			{ url: '/explore/users/{searchTerm}',    params: { page: 'explore', component: 'browse-by-users', navVis: true, /*promo: true,*/ promo:false  } },

			{ url: '/duck-season',    				 		 params: { page: 'duck-season', navVis: true, promo: true, landing: true  } },
			{ url: '/browse/{type}/{speciesId}', 	 		 params: { page: 'browse', navVis: true, promo: true  } },
			{ url: '/browse/{type}/{speciesId}/{speciesName}', 	 		 params: { page: 'browse', navVis: true, promo: true  } },

			//{ url: '/browse/subSpecies/{subSpeciesId}', 	 params: { page: 'duck-season', navVis: true, promo: true  } },
			// NOTIFICATIONS
			{ url: '/notifications',            params: { page: 'my-notifications', navVis: true } },

			// other pages
			{ url: '/heatmap',            params: { page: 'heatmap', navVis: true } },
			{ url: 'testpage',            params: { page: 'testpage', navVis: true } },
			{ url: 'preview-post/{id}',   params: { page: 'preview-post-unauth' } }
		]
	});

	function Router(config) {
		var currentRoute = this.currentRoute = ko.observable({});
		ko.utils.arrayForEach(config.routes, function(route) {
			crossroads.addRoute(route.url, function(requestParams) {
					currentRoute(ko.utils.extend(requestParams, route.params));
			});
		});

        this.config = config;
        this.hasher = hasher;
		activateCrossroads();

	}

	function activateCrossroads(routes) {
		function parseHash(newHash, oldHash) {
			crossroads.parse(newHash)
		}
		crossroads.normalizeFn = crossroads.NORM_AS_OBJECT;
		hasher.initialized.add(parseHash);
		hasher.changed.add(parseHash);
		hasher.init();
	}

});