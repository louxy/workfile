(function($){
	var command, in_heater;
	$.fn._ObjectAssignValue = function(src){
		$.each(src, function(param , val){
			if(param == "system.heater_ring_control"){
				$("input[name=Nbubble_defog][value='"+val[1]+"']").attr('checked',true);

			}
		});
	};
	$.fn._Go = function(){
		$.fn._InitialPageLang();
		$.fn._InitialFunc();
		$('#reloading_container').hide();
		$('#container').show();
	};
	$.fn._InitialPageLang = function(){
		$("#Mbubble_defog_title")[0].innerHTML 	= $.fn._GetLangStr(LT._Heater_setting);
		$("#Mbubble_defog")[0].innerHTML 		= $.fn._GetLangStr(LT._Setting)+":";
		$("#heater_on")[0].innerHTML 			= $.fn._GetLangStr(LT._Auto);
		$("#heater_off")[0].innerHTML 			= $.fn._GetLangStr(LT._OFF);
		$("#Inote_warning")[0].innerHTML 		= $.fn._GetLangStr(LT._Heater_note);
		if($.fn._identifyBrowser() == "msie")
			$("#Inote_warning").parent().css("margin", "0px 0px 0px 72px");
	};

	$.fn._InitialFunc = function()
	{
		
		$("#Icon_setting_save_pic").bind('click', function(){
				
			command = 	"system.heater_ring_control"	+"="+	$("input[type=radio][name=Nbubble_defog]:checked").val();
		
			$.fn._SetParamByMask(command, $.fn._GetLangStr(LT._Reloading), 5000);
		});

		$("#Icon_setting_default_pic").bind('click', function(){
			if(confirm($.fn._GetLangStr(LT._Reset_to_default_Warning))){
				$.fn._DefaultParam( $.fn._GetLangStr(LT._Reloading), 5000);
			}
		});
	};

})(jQuery);
