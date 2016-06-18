define(['knockout', 'text!./user-settings.html', 'MeRequest'], function(ko, template, MeRequest) {

	function UserSettings(params) {

		var settings = this;

		var user = params.user;

		settings.isPrivate = ko.observable();
		settings.alertPrivacySuccess = ko.observable(false);
		settings.alertPrivacyFailure = ko.observable(false);

		settings.populateInputFields = function(response) {
			settings.isPrivate(response.result.private);
		};

		settings.meReqError = function(response) {
			console.log(response);
		};

		settings.updateLocalStorage = function(response){
			// localStorage.setItem('user', JSON.stringify(response.result.private));
			settings.alertPrivacySuccess(true);
			settings.alertPrivacyFailure(false);
		};

		settings.updatePrivacyError = function(response){
			settings.alertPrivacySuccess(false);
			settings.alertPrivacyFailure(true);
			console.log(response);
		};

		settings.updatePrivacySettings = function() {
			MeRequest.update({
				data:{ private: settings.isPrivate() },
				onSuccess: settings.updateLocalStorage,
				onError: settings.updatePrivacyError
			});
		};

		settings.resetPrivacyUpdateMsg = function() {
			settings.alertPrivacySuccess(false);
			settings.alertPrivacyFailure(false);
		};		

		settings.deleteAccount = function(){
			$.sc.modal.show({
				cname:'delete-account',
				cparams:{}
			})
		};

		MeRequest.get({
			onSuccess: settings.populateInputFields,
			onError: settings.meReqError
		});

	}

	return { viewModel: UserSettings, template: template };

});
