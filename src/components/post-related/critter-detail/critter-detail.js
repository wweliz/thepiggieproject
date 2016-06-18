define(['knockout', 'text!./critter-detail.html'], function(ko, templateMarkup ) {

	function CritterDetail(params) {

		console.log(params.critter);

		var critter = this;

		critter.critter = params.critter;

		critter.quantity = 0;

		if ( params.critter.quantity > 0 ){
			critter.quantity = params.critter.quantity;
		} else if ( params.critter.quantity  === null ){
			critter.quantity = 1;
		}

		critter.metaData = JSON.parse(params.critter.metaData);
		critter.gender = ko.observable(false);
		critter.age = ko.observable(false);
		critter.weight = ko.observable(false);
		critter.leng = ko.observable(false);
		critter.banded = ko.observable(false);
		critter.isLink = ko.observable(false);


		if (params.critter.speciesId){
			critter.isLink(true);
		} else {
			critter.isLink(false);
		} 


		critter.exploreSpecies = function(){

				window.location.hash = '/browse/species/'+params.critter.specie.id+'/'+params.critter.specie.name;
	
		}

		if( critter.metaData ){
			if (critter.metaData.age && critter.metaData.age != '0years' ){
				critter.age(critter.metaData.age);
			}

			if (critter.metaData.gender){
				critter.gender(critter.metaData.gender.name);

			}
			if (critter.metaData.weight){
				critter.weight(critter.metaData.weight);
			}
			if (critter.metaData.length){}


			critter.htLeftHorn = ko.observable(critter.metaData['height-left-horns'] || false);
			critter.htRightHorn = ko.observable(critter.metaData['height-right-horns'] || false);
		}
		
	}


	return { viewModel: CritterDetail, template: templateMarkup };
	

});