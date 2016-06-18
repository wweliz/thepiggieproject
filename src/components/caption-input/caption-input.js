define(['knockout', 'text!./caption-input.html'], function(ko, templateMarkup) {

	function CaptionInput(params) {

		var input = this;

		input.caption = params.caption;

		input.captionLength = ko.computed(function() {
			// caption character limit is 255
			if ( params.caption() ) {
				return 255 - params.caption().length;
			} else {
				return 255;
			}
		});

	}

	return { viewModel: CaptionInput, template: templateMarkup };

});
