define(['knockout','underscore','Specie'],function(ko,_,Specie){

	function PostType(params){
		var post = this;
		post.id = params.id;
		post.name = params.name;
		post.label = params.label;

		post.species = ko.utils.arrayMap(params.species,function(specie){
			return new Specie(specie);
		});

		var filename = params.name.replace(/\s+/g, '').toLowerCase();

		post.imagePath = 'images/ico-'+filename+'.svg';


	}

	return PostType;
});
