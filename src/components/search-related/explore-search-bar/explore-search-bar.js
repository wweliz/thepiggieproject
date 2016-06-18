define(['knockout', 'underscore','text!./explore-search-bar.html', 'SearchFieldRequest'], function(ko, _,templateMarkup, SearchFieldRequest) {

	function ExploreSearchBar(params) {

		var srch = this;

		srch.searchInput = ko.observable();
		srch.inputHasFocus = ko.observable(false);
		srch.searchHasFocus = ko.observable(false);
		srch.activePosts = ko.observable(true);
		srch.activeUsers = ko.observable(false);
		srch.activeGroups = ko.observable(false);
		srch.placeholderText = ko.observable("Search...");

		srch.searchGetsFocus = ko.computed(
			function() {
				if (srch.inputHasFocus()) {
					return setSearchFocus(true);
				}
			}
		);

		srch.searchDropsFocus = ko.computed(
			function(){
				if (!srch.inputHasFocus()){
					setTimeout(function(){
						if (!srch.inputHasFocus()){
							return setSearchFocus(false);
						}
					}, 200)
				}
			}
		);

		srch.enablesearch = function() {
			setSearchFocus(true);
		}

		function setSearchFocus(value){
			srch.searchHasFocus(value);
		}

		srch.setQueryPosts = function(){
			srch.activePosts(true);
			srch.activeUsers (false);
			srch.activeGroups(false);
			srch.placeholderText("Search Posts");
			srch.inputHasFocus(true);
			srch.searchBtnAction = srch.submitPostSearch;
		}

		srch.setQueryUsers = function(){
			srch.activePosts(false);
			srch.activeUsers(true);
			srch.activeGroups (false);
			srch.placeholderText("Search Users");
			srch.inputHasFocus(true);
			srch.searchBtnAction = srch.submitUserSearch;
		}

		srch.setQueryGroups = function(){
			srch.activePosts(false);
			srch.activeUsers(false);
			srch.activeGroups(true);
			srch.placeholderText("Search Groups");
			srch.inputHasFocus(true);
			srch.searchBtnAction = srch.submitGroupSearch;
		}

		srch.submitPostSearch = function() {
			if ( hasSearchInput() ) {
				window.location.hash = '/explore/posts/' + srch.searchInput();	
			}
		};

		srch.submitUserSearch = function() {
			if ( hasSearchInput() ) {
				window.location.hash = '/explore/users/' + srch.searchInput();
			} else {
				srch.inputHasFocus(true);
			}
		};

		srch.submitGroupSearch = function() {
			if ( hasSearchInput() ) {
				window.location.hash = '/explore/groups/' + srch.searchInput();
			} else {
				srch.inputHasFocus(true);
			}
		};

		srch.searchBtnAction = srch.submitPostSearch;

		function hasSearchInput(){
			return !_.isEmpty($.trim(srch.searchInput()));
		}

	}

	return { viewModel: ExploreSearchBar, template: templateMarkup };

});
