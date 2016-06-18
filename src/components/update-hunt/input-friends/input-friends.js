define(['knockout', 'text!./input-friends.html', 'FollowersRequest', 'UserModel','underscore'], function(ko, templateMarkup, FollowersRequest, UserModel,_) {

	function InputFriends(params) {

		var fr = this;

		///////////////////////////////////////////////////////////////////////////////////////////////
		// FILTER FRIENDS IN INPUT FIELD //////////////////////////////////////////////////////////////
		///////////////////////////////////////////////////////////////////////////////////////////////

		fr.filter = ko.observable();
		fr.filteredList = ko.observableArray([]); // array of friend User models, sorted by first name
		fr.asscFriends = ko.observableArray([]); // array of friend User models, unfiltered/unordered
		fr.tags = params.tags; // array of tagged friends ids

		function updateFriends(response){

			fr.asscFriends(ko.utils.arrayMap(response.result,function(user){
				return new UserModel(user);
			}));
			sortByFirstName(fr.asscFriends);
			fr.filteredList(fr.asscFriends());
		}

		function filterList(value){
			fr.filteredList(_.filter(fr.asscFriends(),function(friend){
				return _.isEmpty($.trim(value)),
					matchesHandle(friend.handle().toUpperCase(),value.toUpperCase()) ||
					matchesName(friend.name().toUpperCase(),value.toUpperCase()) ||
					isTagged(friend.id());
			}));
		};

		function matchesHandle(handle,value){
			return handle.indexOf(value) != -1;
		}

		function matchesName(name,value){
			return name.indexOf(value) != -1;
		}

		function isTagged(id){
			return _.contains(fr.tags(),id);
		}

		function sortByFirstName(obsArray){
			obsArray(_.sortBy(obsArray(),function(friend){
				return friend.firstName();
			}));
		}

		FollowersRequest.following({onSuccess:updateFriends});

		fr.filter.subscribe(filterList);


	}

	return { viewModel: InputFriends, template: templateMarkup };

});
