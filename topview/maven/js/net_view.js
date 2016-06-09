(function($){
	$.fn._ObjectAssignValue = function(src){
		$.each(src, function(param , val){
			if(param == "system.engineering.ipv4")
			{
				var par = new Array();
				par = val[1].split('/');
				$("#Inet_ipv4")[0].innerHTML = par[0];
				$("#Inet_ipv4_submask")[0].innerHTML = par[1];
				$("#Inet_ipv4_default")[0].innerHTML = par[2];
			}
			else if(param == "system.engineering.primary_dns")
			{
				$("#Inet_ipv4_pridns")[0].innerHTML = val[1];
			}
			else if(param == "system.engineering.secondary_dns")
			{
				$("#Inet_ipv4_secdns")[0].innerHTML = val[1];
			}
			/* */
			else if(param == "system.engineering.ipv6address1")
			{
				if(val[1] == "")
					$("#Inet_ipv6_addr_1").parent().hide();
				else
				{
					$("#Inet_ipv6_addr_1").parent().show();
					$("#Inet_ipv6_addr_1")[0].innerHTML = val[1];
				}
			}
			else if(param == "system.engineering.ipv6address2")
			{
				if(val[1] == "")
					$("#Inet_ipv6_addr_2").parent().hide();
				else
				{
					$("#Inet_ipv6_addr_2").parent().show();
					$("#Inet_ipv6_addr_2")[0].innerHTML = val[1];
				}
			}
			else if(param == "system.engineering.ipv6address3")
			{
				if(val[1] == "")
					$("#Inet_ipv6_addr_3").parent().hide();
				else
				{
					$("#Inet_ipv6_addr_3").parent().show();
					$("#Inet_ipv6_addr_3")[0].innerHTML = val[1];
				}
			}
			else if(param == "system.engineering.ipv6address4")
			{
				if(val[1] == "")
					$("#Inet_ipv6_addr_4").parent().hide();
				else
				{
					$("#Inet_ipv6_addr_4").parent().show();
					$("#Inet_ipv6_addr_4")[0].innerHTML = val[1];
				}
			}
			/**/
		});
	};
	$.fn._Go = function(){
		$.fn._InitialPageLang();
		$.fn._InitialFunc();
		$('#reloading_container').hide();
		$('#container').show();
	};
	$.fn._InitialPageLang = function(){
		$("#Mnet_ipconf_title")[0].innerHTML 			= $.fn._GetLangStr(LT._Current_network_setting);
		$("#Mnet_ipv4")[0].innerHTML 					= $.fn._GetLangStr(LT._IPv4_addr)+":";
		$("#Mnet_ipv4_submask")[0].innerHTML 			= $.fn._GetLangStr(LT._Subnet_Mask)+":";
		$("#Mnet_ipv4_default")[0].innerHTML			= $.fn._GetLangStr(LT._Default_Gateway)+":";
		$("#Mnet_ipv4_pridns")[0].innerHTML 			= $.fn._GetLangStr(LT._Primary_DNS)+":";
		$("#Mnet_ipv4_secdns")[0].innerHTML 			= $.fn._GetLangStr(LT._Secondary_DNS)+":";
		/**/
		$("#Mnet_ipv6_addr_1")[0].innerHTML 			= $.fn._GetLangStr(LT._IPv6_addr+" ")+"1:";
		$("#Mnet_ipv6_addr_2")[0].innerHTML 			= $.fn._GetLangStr(LT._IPv6_addr+" ")+"2:";
		$("#Mnet_ipv6_addr_3")[0].innerHTML 			= $.fn._GetLangStr(LT._IPv6_addr+" ")+"3:";
		$("#Mnet_ipv6_addr_4")[0].innerHTML 			= $.fn._GetLangStr(LT._IPv6_addr+" ")+"4:";
	};

	$.fn._InitialFunc = function()
	{
		if($.fn._identifyBrowser() == "msie")
			$("#Ibody").height("258px");
		else if($.fn._identifyBrowser() == "chrome")
			$("#Ibody").height("251px");
		else if($.fn._identifyBrowser() == "firefox")
			$("#Ibody").height("253px");
		else if($.fn._identifyBrowser() == "opera")
			$("#Ibody").height("260px");
		else if($.fn._identifyBrowser() == "safari")
			$("#Ibody").height("310px");
		
		//Dynamic adjust fildset label width
		$("body").each(function(){
			var def_width = 0;
			$(this).children("div").each(function(){

				if($(this).attr("class") == "content_title"){
				
				} else if($(this).attr("class") == "content_slider"){
					var len = $(this).children(".content_slider_div").children("label").text().length;
					def_width = len > def_width ? def_width = len: def_width = def_width;
					
				} else {	
					var len = $(this).children("label").text().length;
					def_width = len > def_width ? def_width = len: def_width = def_width;
				}
			});

			//console.log("before:"+def_width);
			if($.cookie('def_lang') == DFFINE_LANGUAGE_JAPANESE || $.cookie('def_lang') == DEFINE_LANGUAGE_KOREAN)
			{
				if(def_width <= 30)
					def_width = 30;
			}
			else
			{
				if(def_width <= 16)
					def_width = 16;
			}
			
			//console.log("after:"+def_width);
			$(this).children("div").each(function(){

				if($(this).attr("class") == "content_title"){
				
				} else {
					if($(this).attr("class") == "content_slider")
						$(this).children(".content_slider_div").css("width",def_width*7.5).css("text-align","right");
					else
						$(this).children("label").css("width",def_width*7.5).css("text-align","right");
				}
			});
		});
	};
})(jQuery);