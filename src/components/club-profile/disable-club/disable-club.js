define(['knockout', 'text!./disable-club.html'], function(ko, templateMarkup) {

	function DisableClub(params) {
		
		var dc = this;

		dc.clubId = params.club;

		dc.alertMsg = ko.observable();

		dc.onDeleteSuccess = function() {
			// redirect to user's clubs page
			window.location.hash = '/profile/' + JSON.parse(localStorage.getItem('user')).id + '/clubs';
		};
		
		dc.onError = function(response) {
			dc.alertMsg('Oh no! There was an error deleting your club.');
			console.log(response);
		};

		dc.deleteClub = function() {
			dc.alertMsg('');

			// need server endpoint to delete club
			console.log('delete this club');

			// ClubRequest.post({
			// 	data: {
			// 		id: dc.clubId,
			// 	},
			// 	onSuccess: dc.onDeleteSuccess,
			// 	onError: dc.onError
			// });
		};

	}
	
	return { viewModel: DisableClub, template: templateMarkup };

});
