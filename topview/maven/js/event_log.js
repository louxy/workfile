(function($){
	$.fn._ObjectAssignValue = function(src){
		$.each(src, function(param , val){
			
		});
	};
	
	$.fn._Go = function(){
		$.fn._InitialPageLang();
		$('#reloading_container').hide();
		$('#container').show();
	};
	
	$.fn._InitialPageLang = function(){
		$("#MSystem_log")[0].innerHTML 			= $.fn._GetLangStr(LT._Menu_System_systemlog);
		$("#IDownload_Log").val($.fn._GetLangStr(LT._Download_Log));
	};

})(jQuery);