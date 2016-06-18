define(['knockout', 'text!./member.html'], function(ko, templateMarkup) {

	function Member(params) {

		var member = this;

		member.member = params.member;

	}
	
	return { viewModel: Member, template: templateMarkup };

});
