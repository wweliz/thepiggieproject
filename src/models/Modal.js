define(['knockout'], function(ko){
	
	function Modal(){

		var modal = this;

		modal.data = ko.observable({});
		modal.data().cname = 'verify-shell';
		//modal.data().cname = 'login';
		modal.data().cparams = {};

		modal.show = function(data){
			modal.data(data);
			$('#modal-hb').modal('show');
		};
	}

	return Modal;
});