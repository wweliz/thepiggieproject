define(['knockout', 'text!./add-like.html'], function(ko, template) {

  function AddLike(params) {

  	var like = this;

  	like.addLike = function(){
  		console.log('add like');
  	}  	
  }
  
  return { viewModel: AddLike, template: template };

});