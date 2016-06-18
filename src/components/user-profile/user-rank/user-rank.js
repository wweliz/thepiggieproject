define(['knockout', 'text!./user-rank.html'], function(ko, template) {

  function UserRank(params) {

  	var rank = this;

  	// DEER RANK
    rank.deerRankPhotoURL = ko.observable('http://placehold.it/350x150');
    rank.deerrank = ko.observable('deer rank #1');

  	// DUCK RANK
    rank.duckRankPhotoURL = ko.observable('http://placehold.it/350x150');
    rank.duckrank = ko.observable('duck rank #1');

  }
  
  return { viewModel: UserRank, template: template };

});
