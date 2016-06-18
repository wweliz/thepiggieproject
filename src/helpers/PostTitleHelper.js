define(['knockout', 'underscore'],function(ko,_){
	
	function PostTitleHelper(){

		var helper = this;

		helper.createPostTitle = function(critters){

			//	SETS CRITTERS TO SAMPLE DATA ABOVE
			//var critters = sample;

			var title = "Check this out...";

			

			if (critters.length > 1){
				var qty = null;

				var subSpecieZero = critters[0].subSpecie;
				var subSpecieZeroName = subSpecieZero.pluralName || null;

				var specieZero = critters[0].specie;
				var specieZeroName = specieZero.name || null;

				if (!_.isEmpty(subSpecieZero) && allSameSubspecies( critters, subSpecieZeroName )) {
					qty = getQty(critters, qty);
					return title = setTitle(subSpecieZeroName, qty);

				} else if ( allSameSpecies( critters, specieZeroName )) {
					qty = getQty(critters, qty);
					return title = setTitle(specieZeroName, qty);
				} else {
					qty = getQty(critters, qty);
					return title = setTitle(critters[0].type.label, qty);
				}

			} else if (critters.length === 1) {
				var critter = critters[0];
				title = singleCritter(critter);
			}

			function allSameSubspecies(critters, name){

				for (i=0; critters.length > i; i++){
					var critter = critters[i];

					if (critter.subSpecie.pluralName != name){
						return false;
					}	
				}
				return true;
			}

			function allSameSpecies(critters, name){
				var sameSpecies = true

				for (i=0; critters.length > i; i++){
					var critter = critters[i];

					if (critter.specie.name != name){
						sameSpecies = false;
					}	
				}
				return sameSpecies;
			}

			function getQty(critters, qty){
				
				for (i=0; critters.length > i; i++){
					var critter = critters[i];

					if (critter.quantity){
						qty = qty+critter.quantity;
					}
				}

				return qty;
			}


			function singleCritter(critter){
				var qty = critter.quantity || null;
				var specie = critter.specie;
				var specieName = specie.name || null;
				var subSpecie = critter.subSpecie.singularName || null;
				var subSpecieMulti = critter.subSpecie.pluralName || null;

				if (subSpecie){
					if (qty > 1){
						return title = setTitle(subSpecieMulti, qty);
					} else {
						return title = setTitle(subSpecie, qty);
					}

				} else if (specieName) {
					return title = setTitle(specieName, qty);
				}
			}

			function setTitle(a, qty){

				t = a;
				if (qty){ t = qty + ' ' + t; }
				return t;
			}

			return title;
		};
	
	}

	return new PostTitleHelper();

});