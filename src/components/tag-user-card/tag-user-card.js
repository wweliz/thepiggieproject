define(['knockout', 'text!./tag-user-card.html', 'underscore'], function(ko, templateMarkup, _) {

	function TagUserCard(params) {

		var tag = this;

		tag.user = params.user;
		tag.tags = params.tags;
		tag.css = ko.observable();
		tag.cardCss = ko.observable();

		tag.doAdd = function(){
			if (_.contains(tag.tags(),tag.user.id())){
				 tag.tags(_.filter(tag.tags(),function(tagId){
					 return tagId != tag.user.id();
				 }));
			}else{
				tag.tags.push(tag.user.id());
			}

			setCss();
		};

		function setCss(){
			if (_.contains(tag.tags(),tag.user.id())){
				tag.css("fa-check-circle");
				tag.cardCss("selected");
			}else{
				tag.css("fa-circle-o");
				tag.cardCss("");
			}
		};

		setCss();
	}
	
	return { viewModel: TagUserCard, template: templateMarkup };

});
