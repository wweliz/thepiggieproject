define(['knockout', 'underscore', 'text!./animal-form.html','FormInput', 'Tooltip'], function(ko, _, templateMarkup,FormInput,Tooltip) {

  function AnimalForm(params) {
    








    var form = this;

    form.kill = params.kill;

    form.remove = params.remove;

    form.formInput = ko.observableArray();

    form.speciesList = params.speciesList;

    form.minMaxQty = ko.observableArray();

    form.kill.quantity = params.kill.quantity || null;

    

    form.liveQuantity = form.kill.quantity;

    form.showMeta = ko.observable(true);

    form.kill.selectedSpecie(params.kill.selectedSpecie());

    if(params.kill.selectedSubSpecie()){
      params.kill.selectedSubSpecie().name = params.kill.selectedSubSpecie().singularName;
    }
    form.kill.selectedSubSpecie(params.kill.selectedSubSpecie());

    form.showDetails = ko.computed(function(){

      if ( _.isEmpty(form.speciesList())) {
        return false;
      } else {

          if (form.kill.selectedSpecie()){
            var speciesListRaw = form.speciesList();
            var speciesIdRaw = params.kill.selectedSpecie().id;

            _.each( speciesListRaw, function(species){
              if(species.id === speciesIdRaw){
                var subSpecies = species.subSpecies;
                params.kill.selectedSpecie().subSpecies = subSpecies;
                form.kill.selectedSpecie(params.kill.selectedSpecie());
                return;
              }
            });

          }


        return true;
      }
    })

    form.subSpecies = ko.observableArray();

    if (form.kill.selectedSpecie ){
      createForm(form.kill.selectedSpecie);
    }

    form.tooltip = new Tooltip({id:'animal-form-tooltip',message:'nothing to see here'});

    form.getResult = function(){
      var result = {};

      _.each(form.formInput(), function(input){
        result[input.id] = input.value();
      });

      return result;
    };

    form.actualResult = ko.computed(function(){
      var result = {};
      _.each(form.formInput(), function(input){
        result[input.id] = input.value();
      });

      return result;
    });

    form.actualResult.subscribe(function(){
      form.kill.metaData(form.actualResult());
    });

    function createForm(newSpecie){
      
      if (!_.isUndefined(newSpecie)) {
        var quantityInput = _.find(newSpecie.jsonForm, function(data){
          return data.id == 'quantity';
        }) || {units:[{min:0,max:10}]};
        var min = quantityInput.units[0].min;
        var max = quantityInput.units[0].max;
        var array = [];
        for (var i = min; i < max; i ++){
          array.push(i);
        }
        form.minMaxQty(array);

        

        createMetaInput(newSpecie);
        
      }
    }

    function createMetaInput(newSpecie){
      if(newSpecie.jsonForm && typeof newSpecie.jsonForm != 'object'){
        newSpecie.jsonForm = JSON.parse(newSpecie.jsonForm);
      }
      var jsonForm = _.filter(newSpecie.jsonForm,function(data){
          return data.id != 'quantity';
        });
      console.log(jsonForm);
      form.formInput(ko.utils.arrayMap(jsonForm, function (data) {
        return new FormInput(data);
      }));

      //console.log(form.formInput());
    }

    function updateMetaInput(newSpecie){
      //console.log(newSpecie);
      if (!_.isEmpty(newSpecie)){
        var jsonForm = _.filter(newSpecie.jsonForm,function(data){
          return data.id != 'quantity';
        });

        if(form.liveQuantity() > 0){
          //Only add metaData to critters with more than one.
          //This is a client request to improve post capabilities.
          for (i=0; i < jsonForm.length; i++){
            if (form.liveQuantity() === 1 && jsonForm[i].singleOnly){
              form.formInput.push(new FormInput(jsonForm[i]));
            } else if (form.liveQuantity() > 1 && jsonForm[i].singleOnly){
              var killFormInput = jsonForm[i].id;
              form.formInput(_.without(form.formInput(), _.findWhere(form.formInput(), {id: killFormInput})));
            }
          }
        } else {
          newSpecie.jsonForm = [];
        }
      }
    }

    form.kill.selectedSpecie.subscribe(createForm);

    form.liveQuantity.subscribe( function(){
      if( form.liveQuantity() == 0 ){
        form.showMeta(false);
      } else {
        form.showMeta(true);
      }
        //console.log(form.liveQuantity());
        updateMetaInput(form.kill.selectedSpecie());
    });

  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  AnimalForm.prototype.dispose = function() { };
  
  return { viewModel: AnimalForm, template: templateMarkup };

});
