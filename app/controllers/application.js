export default Ember.Controller.extend({
	actions: {
		toggleSideBar : function(){
			if(jQuery('body').hasClass('cbp-spmenu-push-toright'))
			{
				jQuery('body').removeClass('cbp-spmenu-push-toright');
				jQuery('.cbp-spmenu-left').removeClass('cbp-spmenu-open');
			}
			else
			{
				jQuery('body').addClass('cbp-spmenu-push-toright');
				jQuery('.cbp-spmenu-left').addClass('cbp-spmenu-open');
			}
			return false;
		},
		hideSideBar : function(){
			jQuery('body').removeClass('cbp-spmenu-push-toright');
			jQuery('.cbp-spmenu-left').removeClass('cbp-spmenu-open');
		}
	}
});