define(['knockout', 'text!./modal-window.html'], function(ko, template) {

	function PostModal(params) {

		var pm = this;

		pm.modal = params.modal;

	}
	
	return { viewModel: PostModal, template: template };

});