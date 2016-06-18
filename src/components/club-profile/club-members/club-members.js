define(['knockout', 'underscore', 'text!./club-members.html', 'ClubRequest','MemberModel'], function(ko, _, template, ClubRequest, MemberModel) {

	function ClubMembers(params) {

		var member = this;

		member.acceptedMembers = params.acceptedMemberArray();
		member.memberError = params.memberError();

	}
	
	return { viewModel: ClubMembers, template: template };

});
