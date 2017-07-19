jQuery(document).ready(function(){
	jQuery('.show-hide').hide();
    jQuery('.toggle-text').css({cursor:'pointer'});
	jQuery('.toggle-text').click(function(){
		jQuery(this).toggleClass('toggle-text-expanded');
		jQuery(this).next('.show-hide').slideToggle("medium");
		return true;
	});
});