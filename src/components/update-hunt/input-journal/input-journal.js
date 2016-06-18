define(['knockout', 'text!./input-journal.html'], function(ko, templateMarkup) {

	function InputJournal(params) {

		var jou = this;

		jou.journal = params.journal;

		jou.jouLength = ko.computed(function() {
			// journal character limit is 25000
			if ( params.journal() ) {
				return 25000 - params.journal().length;
			} else {
				return 25000;
			}
		});

	}

	return { viewModel: InputJournal, template: templateMarkup };

});
