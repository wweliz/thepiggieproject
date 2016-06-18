define(['knockout', 'text!./dropdown.html','ObjectUtils'], function(ko, templateMarkup,ObjectUtils) {

	function Dropdown(params) {

		var dropdown = this;

		//all must be observable or functions
		
		dropdown.data = params.data || {};

		dropdown.selected = dropdown.data.value || params.selected;

		console.log('dropdown selected:');
		console.log(dropdown.selected());

		dropdown.options = params.options || ko.observableArray();
		dropdown.callback = params.callback || logSelection;
		dropdown.label = params.label || dropdown.data.label;
		dropdown.clearable = params.clearable;


		if (ObjectUtils.exists(dropdown.data.units)){
			if(dropdown.data.units.length == 1) {
				var range = dropdown.data.units[0];
				var min = range.min || 0;
				var max = range.max || 100;
				var increment = range.increment || 1;
				var tmpArray = new Array(max);
				for (var i = min; i < max; i += increment) {
					tmpArray[i] = i;
				}
				dropdown.options(tmpArray);
			}else{
				dropdown.options(dropdown.data.units);
			}
		}

		dropdown.onClick = function(data){
			if (typeof dropdown.callback != 'undefined'){
				dropdown.callback(data);
			}

			dropdown.selected(data);
		};

		dropdown.hasDisplayText = ko.computed(function(){
			var result = false;
			if (dropdown.options().length > 0 && _.isObject(dropdown.options()[0])){
				result = ObjectUtils.exists(dropdown.options()[0].displayText) || ObjectUtils.exists(dropdown.options()[0].name);
			}
			return result;
		});

		dropdown.hasOptions = ko.computed(function(){
			return dropdown.options().length > 0;
		});

		dropdown.selectedDisplayText = ko.computed(function(){
			var result = "Choose One...";
			if(dropdown.selected()) {
				if (ObjectUtils.exists(dropdown.selected().displayText)) {
					result = dropdown.selected().displayText;
				} else if (ObjectUtils.exists(dropdown.selected().name)) {
					result = dropdown.selected().name;
				}

				if (ko.isObservable(result)) {
					result = result();
				}
			}

			return result;
		});

		dropdown.clearSelection = function(){
			dropdown.selected(undefined);
		};

		function logSelection(result){
			console.log(result);
		}

	}
	
	return { viewModel: Dropdown, template: templateMarkup };

});
