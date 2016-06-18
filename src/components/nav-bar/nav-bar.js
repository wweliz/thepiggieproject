define(['knockout', 'text!./nav-bar.html', 'Notifications', 'NotificationsRequest'], function(ko, template, notifications, notificationReq) {

	function NavBarViewModel(params) {

		var nav = this;

		nav.route = params.route;

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// POPULATE NAV BAR WITH USER INFO FROM LOCAL STORAGE //////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		var user = localStorage.getItem('user');
		var userArray = JSON.parse(user);

		// populate user avatar and name into nav bar
		if (userArray != null) {
			nav.avatar = ko.observable(userArray.avatar);
			nav.name = userArray.firstName;

			if (userArray.firstName != undefined || null) {
				nav.firstName = ko.observable(userArray.firstName);
			}

			if (userArray.lastName != undefined || null) {
				nav.lastName = ko.observable(userArray.lastName);
			}

			if (!userArray.firstName && !userArray.lastName) {
				nav.name = ko.observable(userArray.username);
			}
		}

		nav.userClubsURL = ko.observable('#/profile/'+ userArray.id + '/clubs');
		nav.userGearURL = ko.observable('#/profile/'+ userArray.id + '/gear');
		nav.userHeatmapURL = ko.observable('#/profile/'+ userArray.id + '/heatmap');

		nav.logout = function() {
			localStorage.removeItem('token');
			localStorage.removeItem('user');
			return true;
		};

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// MANAGE NOTIFICATIONS ////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		nav.notificationArray = ko.observableArray([]);
		nav.firstFive = ko.observableArray([]);
		nav.noticeCount = ko.observable();
		nav.unreadCount = ko.observable();
		nav.toggleRefreshSVG = ko.observable(false);

		// called on page load and when the refresh button is clicked
		nav.getNotifications = function(){
			nav.toggleRefreshSVG(true);
			notificationReq.get({
				onSuccess: nav.setArray
			});
		};

		

		nav.setArray = function(response){
			var filteredUnread = filterViewedFromArray(response.result);

			if( !nav.unreadCount() || nav.unreadCount() < filteredUnread.length){
				nav.unreadCount(filteredUnread.length);
				nav.noticeCount(response.result.length);
				

				nav.notificationArray(ko.utils.arrayMap(response.result,function(note){
					return new notifications(note);
				}));

				nav.firstFive( nav.notificationArray().slice(0,5) );
			}
			nav.toggleRefreshSVG(false);
		};

		function filterViewedFromArray(array) {
			return array.filter(function(v) {
					return v.viewed != true;
			});
		}

		//fires when the notifications tab in the dropdown menu is clicked
		nav.markReadOnServer = function() {
			notificationReq.viewed({
				data: _.pluck(filterViewedFromArray(nav.notificationArray()), 'id'),
				onSuccess: nav.resetFrontEndReadCount
			});
		}

		nav.resetFrontEndReadCount = function(response){
			nav.unreadCount(0);
		}

		nav.getNotifications();

		setInterval(nav.getNotifications, 15000);

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// HANDLE DROPDOWN CLICK EVENTS AND EVENT PROPAGATION //////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			$('li.dropNav').on('click', function (e) {
			// stop event propagation so that the navigation dropdown doesn't close when user clicks inside it
			// functions below reset click functionality stopped by event propagation
			if ( $('li.dropNav').hasClass('open') ) {
				e.stopPropagation();
			}

			// when the dropClose button is clicked, close the naviagation dropdown menu
			$('button.close.dropClose').on('click', function () {
				$('li.dropNav').removeClass('open');
			});

			$('a#navProfileLink').on('click', function () {
				$('li.dropNav').removeClass('open');
			});

			$('a#allNotifications').on('click', function () {
				$('li.dropNav').removeClass('open');
			});

			$('a.nameLink').on('click', function () {
				$('li.dropNav').removeClass('open');
			});

			$('a.notificationLink').on('click', function () {
				$('li.dropNav').removeClass('open');
			});
			
			$('.noteWrapper').on('click', function () {
				$('li.dropNav').removeClass('open');
			});

			// when the navigate tab is clicked, prevents the hash from changing
			// displays clicked (navigate) tab in front
			$('#navigateTab').on('click', 'a', function (e) {
				e.preventDefault();
				$(this).tab('show');
			})

			// when the notifications tab is clicked, prevents the hash from changing
			// displays clicked (notifications) tab in front
			$('#alertsTab').on('click', 'a', function (e) {
				e.preventDefault();
				$(this).tab('show');
			})

			// when a button inside the navigation menu is clicked, close the navigation dropdown
			$('a.nav-link').on('click', function () {
				$('li.dropNav').removeClass('open');
			});
		});

		nav.openProfile = function(){
			window.location.hash = '#/profile';
		}

	}

	return { viewModel: NavBarViewModel, template: template };
});
