define(['knockout','SubSpecie'],function(ko,SubSpecie){

	function Specie(params){

		var specie = this;

		specie.id = params.id;
		specie.name = params.name;
		specie.postTypeId = params.postTypeId;
		specie.jsonForm = JSON.parse(params.jsonForm);
		specie.subSpecies = ko.utils.arrayMap(params.subSpecies,function(sub){
			return new SubSpecie(sub);
		});

	}

	return Specie;

});