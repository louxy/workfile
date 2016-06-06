(function($){
	$.fn.initialNetView = function()
	{
		$.fn.GetNetViewInfor();
		$.fn.loadingLang($.cookie('def_lang'),"net_view");
		if($.fn.DetectBrowser() == "chrome")
			$("textarea[name='network.infor']").attr("cols", "75");
	};

	$.fn.GetNetViewInfor = function()
	{
		var tmp = "";
		var upcmd = function(db){
			$.ajax({
	            beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
	            url:'/cgi-bin/get?',
	            dataType:'json',
	            type:'POST',
	            data:db,
	            cache:false,
	            success:function(data){
	            	$.each(data, function(param, val){
	            		if(param == "network.infor")
	            			$("textarea[name='"+param+"']").val(val[1]);
	            		else
	            			$("#Inet_view_block input[name='"+param+"']").val(val[1]);
	            	});
	            },
	            error:function(xhr, textStatus, errorThrown){
	            },
	            complete:function(){
	                $.removeCookie('ipcamera', { path: '/' });
	            }
	        });
		};

		$("#Inet_view_block textarea, #Inet_view_block input").each(function(){
			tmp += "\""+ $(this).attr("name") +"\":\"\",";
		});

		var db = $.parseJSON("{"+tmp.slice(0, tmp.length-1)+"}");
		upcmd(db);
	};

	$.fn.UpdateViewLang = function(LT)
	{
		$("#Mnet_view_basic")[0].innerHTML 							= $.fn.GetLangStr(LT._Basic_setting);
		$("#Mnet_view_infor")[0].innerHTML 							= $.fn.GetLangStr(LT._Network_Interface_Information);
		$("#Msystem_information_wire_ipv6_address")[0].innerHTML 	= $.fn.GetLangStr(LT._IPv6_addr);
		$("#Msystem_information_wire_ipv6_dns")[0].innerHTML 		= $.fn.GetLangStr(LT._IPv6_dns);
	};

})(jQuery);