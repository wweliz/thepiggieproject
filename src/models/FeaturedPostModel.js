define(['knockout'],function(ko){

	function Post(data){

		var post = this;

		post.id = ko.observable(data.id);
		post.caption = ko.observable(data.caption);
		post.featurePhoto = ko.observable(data.photos[0].url);

	}

	return Post;

});
