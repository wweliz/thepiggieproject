define(['knockout'],function(ko){

	function ManufacturerModel(data){
		
		var manufacturer = this;

		manufacturer.id = ko.observable(data.id);
		manufacturer.name = ko.observable(data.name);		

		manufacturer.displayText = ko.computed(function(){
			return manufacturer.name();
		});
	}

	return ManufacturerModel;

});