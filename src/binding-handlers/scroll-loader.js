define(['knockout'],function(ko){
	ko.bindingHandlers.scrollLoader = {
		init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
			var post = bindingContext.$data;
			function loader() {
				post.posts.infinitescroll.scrollY($(window).scrollTop());

				if($(window).scrollTop() + $(window).height() == $(document).height()) {
					var currentViewPortSize = post.posts.infinitescroll.viewportHeight();
					post.posts.infinitescroll.viewportHeight(currentViewPortSize + 1100);
				}

				if(!$(window).scrollTop()) {
					post.posts.infinitescroll.viewportHeight(1100);
				}
			};

			function resizer(e) {}

			function viewport() {
				var win = window, inner = 'inner';
				if (!('innerWidth' in window )) {
					inner = 'client';
					win = document.documentElement || document.body;
				}
				return { width: win[inner+'Width'], height: win[inner+'Height'] };
			}

			$(window).on('scroll', loader);
			$(window).on('resize', resizer);

			ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
				$(window).off('scroll', loader);
				$(window).on('resize', resizer);
			});
		}
	};
});