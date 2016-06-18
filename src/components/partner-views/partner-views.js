define(['knockout', 'text!./partner-views.html'], function(ko, templateMarkup) {

  function Advertisement() {

    var sidebar = this;

    sidebar.adSpot = "/images/test-campaign/ducks-sidebar.jpg";
    
    
  }
  
  return { viewModel: Advertisement, template: templateMarkup };

});