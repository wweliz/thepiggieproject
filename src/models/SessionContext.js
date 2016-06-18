define(['knockout', 'underscore', 'UserModel', 'Modal', 'HamboneConstants','MeRequest'],function(ko, _, UserModel, Modal, HB, MeRequest){

	function SessionContext(data){

		var sc = this;

		$.sc = sc;

		sc.user = new UserModel();
		sc.modal = new Modal();
		sc.HB_CONSTANTS = HB;

		sc.currentUser = localStorage.getItem('user');
		sc.currentUserId = ko.observable();

		sc.updateUser = function(response){
			sc.user.update(response.result);
		};

		if (sc.currentUser){
			sc.user.update(JSON.parse(sc.currentUser));
			sc.currentUserId(JSON.parse(sc.currentUser).id);
			MeRequest.get({onSuccess:sc.updateUser});
		}

        sc.mapPostFocus = ko.observable();
        sc.bindPost = function(id) {
            console.log('post id is:' + id);
            sc.mapPostFocus(id);
        }
	}

	return SessionContext;

});
