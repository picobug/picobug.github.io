'use strict';
(function($){
	var picobug = {
		general: {
			set: 'julian',
			url: location.href
		},
		name: ['julian'],
		ajax: function(){
			self = this;
			$.get(self.general.url + '/portofolio/' + self.general.set + '.json', function(data) {
				self.render(data);
			});
		},
		render: function(data) {

		},
		init: function() {
			this.ajax();
		}
	}
	picobug.init();
})(window.jQuery);

/* Common Initial */
(function($){
	$(function() {
		$('.level-bar-inner').css('width', '0');
		
		$(window).on('load', function() {

		    $('.level-bar-inner').each(function() {
		    
		        var itemWidth = $(this).data('level');
		        
		        $(this).animate({
		            width: itemWidth
		        }, 800);
		        
		    });

		});
	});
})(jQuery);

