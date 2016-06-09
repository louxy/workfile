(function($){	
	$.fn._ObjectAssignValue = function(src){
		$.each(src, function(param , val){
			if(param == "system.information.model_name"){
				$("#ISys_model_name")[0].innerHTML = val[1];
			}else if(param == "system.information.fw_version")
				$("#ISys_Firmware_Version")[0].innerHTML = val[1];
			else if(param == "system.information.mac_address")
				$("#ISys_mac_address")[0].innerHTML = val[1];
		});
	};
	$.fn._Go = function(){
		$.fn._InitialPageLang();
		$('#reloading_container').hide();
		$('#container').show();
	};
	$.fn._InitialPageLang = function(){
		$("#MSystem_Information")[0].innerHTML 		= $.fn._GetLangStr(LT._System_Information);
		$("#MSys_Firmware_Version")[0].innerHTML 	= $.fn._GetLangStr(LT._Firmware_Version)+":";
		$("#MSys_mac_address")[0].innerHTML 		= $.fn._GetLangStr(LT._MAC_Address)+":";
		$("#NSys_model_name")[0].innerHTML 			= $.fn._GetLangStr(LT._Model_Name)+":";
	};

	var isAlt = false;
	$(document).keydown(function (e) {
		if (e.keyCode == 18) {
			isAlt = true;
		}
		if (e.keyCode == 190 && isAlt) {
			window.location.replace(""+$.fn._ParserHeader()+"//"+$.fn._ParserIP()+$.fn._ParserPort()+"/www/sdk.html");
		}
	 });

	$(document).keyup(function (e) {
	 	isAlt = false;
	})
})(jQuery);