(function($){
	var confList, split_tmp, rtsp_user, rtsp_passwd, port, nat_port, rtsp_1_url, rtsp_1_addr, rtsp_2_url, rtsp_2_addr, rtsp_3_url, rtsp_3_addr;
	var rtsp_1_audio_addr, rtsp_2_audio_addr, rtsp_3_audio_addr;
	var in_rtp_port;
	var port_range = new Array();
	var port_list = new Array();
	$.fn._ObjectAssignValue = function(src){
		$.each(src, function(param , val){
			if(param == "network.rtsp.login_id")
			{
				$("#Irtsp_user").val(val[1]);
				rtsp_user = val[1];
			}
			else if(param == "network.rtsp.password")
			{
				$("#Irtsp_passwd").val(val[1]);
				rtsp_passwd = val[1];
			}
			else if(param == "network.rtsp.natport")
			{
				if(val[1] == 0){
					$("input[name=Nrtsp_nat][value='off']").attr('checked',true);
					$("#Irtsp_nat_port").attr('disabled',true);
				}else{
					$("input[name=Nrtsp_nat][value='on']").attr('checked',true);
					$("#Irtsp_nat_port").attr('disabled',false);
					$("#Irtsp_nat_port").val(val[1]);
				}
				nat_port = val[1];
			}
			else if(param == "network.rtsp.authentication")
				$("input[name=Nrtsp_auth][value='"+val[1]+"']").attr('checked',true);
			else if(param == "network.rtsp.port")
			{
				$("#Irtsp_port").val(val[1]);
				port = val[1];
				in_rtp_port = val[1];
			}
			else if(param == "network.rtsp.stream_1.url")
			{
				$("#Irtsp_stream1_url").val(val[1]);
				$("#Irtsp_stream1_url_multicast").val(val[1]+"m");
				$("#Irtsp_stream1_url_unicast").val(val[1]);
				rtsp_1_url = val[1];
			}
			else if(param == "network.rtsp.stream_1.multicast_address")
			{
				$("#Irtsp_stream1_addr").val(val[1]);
				rtsp_1_addr = val[1];
			}
			else if(param == "network.rtsp.stream_1.multicast_address_audio")
			{
				$("#Irtsp_stream1_multicast_audio_addr").val(val[1]);
				rtsp_1_audio_addr = val[1];

				if(Number(model_audio)==0)
				{
					$("#Mrtsp_stream1_multicast_audio_addr").hide();
					$("#Irtsp_stream1_multicast_audio_addr").hide();
					$("#Mrtsp_stream1_multicast_audio_addr_range").hide();
				}
				else
				{
					$("#Mrtsp_stream1_multicast_audio_addr").show();
					$("#Irtsp_stream1_multicast_audio_addr").show();
					$("#Mrtsp_stream1_multicast_audio_addr_range").show();				
				}
			}
			else if(param == "network.rtsp.stream_2.url")
			{
				$("#Irtsp_stream2_url").val(val[1]);
				$("#Irtsp_stream2_url_multicast").val(val[1]+"m");
				$("#Irtsp_stream2_url_unicast").val(val[1]);
				rtsp_2_url = val[1];
			}
			else if(param == "network.rtsp.stream_2.multicast_address")
			{
				$("#Irtsp_stream2_addr").val(val[1]);
				rtsp_2_addr = val[1];
			}
			else if(param == "network.rtsp.stream_2.multicast_address_audio")
			{
				$("#Irtsp_stream2_multicast_audio_addr").val(val[1]);
				rtsp_2_audio_addr = val[1];
				if(Number(model_audio)==0)
				{
					$("#Mrtsp_stream2_multicast_audio_addr").hide();
					$("#Irtsp_stream2_multicast_audio_addr").hide();
					$("#Mrtsp_stream2_multicast_audio_addr_range").hide();
				}
				else
				{
					$("#Mrtsp_stream2_multicast_audio_addr").show();
					$("#Irtsp_stream2_multicast_audio_addr").show();
					$("#Mrtsp_stream2_multicast_audio_addr_range").show();				
				}				
			}
			else if(param == "network.rtsp.stream_3.url")
			{
				$("#Irtsp_stream3_url").val(val[1]);
				$("#Irtsp_stream3_url_multicast").val(val[1]+"m");
				$("#Irtsp_stream3_url_unicast").val(val[1]);
				rtsp_3_url = val[1];
			}
			else if(param == "network.rtsp.stream_3.multicast_address")
			{
				$("#Irtsp_stream3_addr").val(val[1]);
				rtsp_3_addr = val[1];
			}
			else if(param == "network.rtsp.stream_3.multicast_address_audio")
			{
				$("#Irtsp_stream3_multicast_audio_addr").val(val[1]);
				rtsp_3_audio_addr = val[1];
				if(Number(model_audio)==0)
				{
					$("#Mrtsp_stream3_multicast_audio_addr").hide();
					$("#Irtsp_stream3_multicast_audio_addr").hide();
					$("#Mrtsp_stream3_multicast_audio_addr_range").hide();
				}
				else
				{
					$("#Mrtsp_stream3_multicast_audio_addr").show();
					$("#Irtsp_stream3_multicast_audio_addr").show();
					$("#Mrtsp_stream3_multicast_audio_addr_range").show();				
				}				
			}
			else if(param == "network.rtsp.port.query_range")
			{
				split_tmp = val[1].split('~');
				$.each(split_tmp, function(n){
					if(n == 0){
						port_range[n] = split_tmp[n].slice(1,split_tmp[n].length);
					}
					else if(n == 1){
						port_range[n] = split_tmp[n].slice(0,split_tmp[n].length-1);
					}
				});

				$("#Irtsp_port_range")[0].innerHTML 	= "("+port_range[0]+"~"+port_range[1]+")";
				$("#Irtsp_nat_port_range")[0].innerHTML 	= "("+port_range[0]+"~"+port_range[1]+")";
			}
			else if(param == "system.port.list")
			{
				var port_list_tmp = val[1].split(',');
				$.each(port_list_tmp, function(n){
					port_list[n] = port_list_tmp[n];
				});
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
		$("#Mrtsp_title")[0].innerHTML 											= $.fn._GetLangStr(LT._BasicSetting);
		$("#Mrtsp_user")[0].innerHTML 											= $.fn._GetLangStr(LT._Login_ID)+":";
		$("#Mrtsp_passwd")[0].innerHTML 										= $.fn._GetLangStr(LT._Password)+":";
		$("#Mrtsp_port")[0].innerHTML 											= $.fn._GetLangStr(LT._Port)+":";
		$("#Mrtsp_nat_setting")[0].innerHTML                                    = $.fn._GetLangStr(LT._NAT_Setting);
		$("#Mrtsp_nat")[0].innerHTML                                            = $.fn._GetLangStr(LT._Enable)+":";
		$("#Nrtsp_nat_on")[0].innerHTML 										= $.fn._GetLangStr(LT._ON);
		$("#Nrtsp_nat_off")[0].innerHTML 										= $.fn._GetLangStr(LT._OFF);
		$("#Mrtsp_nat_port")[0].innerHTML                                       = $.fn._GetLangStr(LT._Rtsp_Port)+":";
		$("#Mrtsp_auth_title")[0].innerHTML 									= $.fn._GetLangStr(LT._Authentication);
		$("#Mrtsp_auth")[0].innerHTML 											= $.fn._GetLangStr(LT._Action)+":";
		$("#Nrtsp_auth_on")[0].innerHTML 										= $.fn._GetLangStr(LT._ON);
		$("#Nrtsp_auth_off")[0].innerHTML 										= $.fn._GetLangStr(LT._OFF);
		

		for(var i = 1; i<=3; i++)
		{
			$("#Mrtsp_stream"+i+"")[0].innerHTML 								= $.fn._GetLangStr(LT._RTSP_Stream)+i;
			$("#Mrtsp_stream"+i+"_url")[0].innerHTML 							= $.fn._GetLangStr(LT._URL)+":";
			$("#Mrtsp_stream"+i+"_url_multicast")[0].innerHTML 					= $.fn._GetLangStr(LT._Multicast)+":";
			$("#Mrtsp_stream"+i+"_url_unicast")[0].innerHTML 					= $.fn._GetLangStr(LT._Unicast)+":";
			$("#Mrtsp_stream"+i+"_addr")[0].innerHTML 							= $.fn._GetLangStr(LT._Multicast_Address)+":";
			$("#Mrtsp_stream"+i+"_multicast_audio_addr")[0].innerHTML 			= $.fn._GetLangStr(LT._Menu_System_audio)+" "+$.fn._GetLangStr(LT._Multicast_Address)+":";
			$("#Mrtsp_stream"+i+"_addr_range")[0].innerHTML 					= "(224.0.1.1~239.255.255.254)";
			$("#Mrtsp_stream"+i+"_multicast_audio_addr_range")[0].innerHTML 	= "(224.0.1.1~239.255.255.254)";
			$("#Irtsp_stream"+i+"_url_multicast").attr("disabled",true);
			$("#Irtsp_stream"+i+"_url_unicast").attr("disabled",true);
		}
	};

	$.fn._checkPortSetting = function()
	{
		var h_port, hs_port;
		rtp_port = $("#Irtsp_port").val();
		var ret = 0;
		$.each(port_list, function(n,data){
			if(data == rtp_port){
				if(!(data == in_rtp_port)){
					ret = 1;
					$("#Irtsp_port").focus();
					return false;
				}
			}
		});

		// systen has exist the same port.
		if(ret){
			alert($.fn._GetLangStr(LT._port_field_warning));
		}

		return ret;
	};

	$.fn._InitialFunc = function()
	{
		var rtsp_addr_max_regex ="^(23[0-9]|2[0-3][0-9]|1[0-9][0-9]|[0-9][0-9]|[1-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})){2}(\.(25[0-4]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2}))$";
		var Invalid_input_regex = /^\s*[^\"]+\s*$/;
		var port_regex = /^\d{1,5}$/;
		var IP = new Array();
		var command = "";

		$("#Irtsp_user").change(function(){
			var value = $(this).val();
			if((value.length < 2 || value.length > 40)||!Invalid_input_regex.test(value)){
				$(this).val(rtsp_user);
			}

			rtsp_user = $(this).val();
		});

		$("#Irtsp_passwd").change(function(){
			var value = $(this).val();
			if((value.length < 2 || value.length > 40)||!Invalid_input_regex.test(value)){
				$(this).val(rtsp_passwd);
			}

			rtsp_passwd = $(this).val();
		});

		$("input[name=Nrtsp_nat]").change(function(){
			if($("input[type=radio][name=Nrtsp_nat]:checked").val() == "on"){
				$("#Irtsp_nat_port").attr('disabled',false);
				$("#Icon_setting_save_pic").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
				$("#Irtsp_nat_port").addClass("conf_input_invalid");
			}else{
				$("#Irtsp_nat_port").attr('disabled',true);
				$("#Irtsp_nat_port").val("");
				$("#Icon_setting_save_pic").attr("disabled", false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
				$("#Irtsp_nat_port").removeClass("conf_input_invalid");
			}
		});

		$("#Irtsp_nat_port").change(function(){
			var value = $(this).val();
			if((parseInt(value) < port_range[0])||(parseInt(value) > port_range[1])||!port_regex.test(value)){
				$("#Icon_setting_save_pic").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
				$("#Irtsp_nat_port").addClass("conf_input_invalid");
			}else{
				$("#Icon_setting_save_pic").attr("disabled", false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
				$("#Irtsp_nat_port").removeClass("conf_input_invalid");
			}
		});

		$("#Irtsp_stream1_url").change(function(){
			var value = $(this).val();
			if((value == $("#Irtsp_stream2_url").val()||value == $("#Irtsp_stream3_url").val())||!Invalid_input_regex.test(value)){
				$(this).val(rtsp_1_url);
			}
			else
			{
				$("#Irtsp_stream1_url_multicast").val(value+"m");
				$("#Irtsp_stream1_url_unicast").val(value);
			}

			rtsp_1_url = $(this).val();
		});

		$("#Irtsp_stream2_url").change(function(){
			var value = $(this).val();
			if((value == $("#Irtsp_stream1_url").val()||value == $("#Irtsp_stream3_url").val())||!Invalid_input_regex.test(value)){
				$(this).val(rtsp_2_url);
			}
			else
			{
				$("#Irtsp_stream2_url_multicast").val(value+"m");
				$("#Irtsp_stream2_url_unicast").val(value);
			}

			rtsp_2_url = $(this).val();
		});

		$("#Irtsp_stream3_url").change(function(){
			var value = $(this).val();
			if((value == $("#Irtsp_stream1_url").val()||value == $("#Irtsp_stream2_url").val())||!Invalid_input_regex.test(value)){
				$(this).val(rtsp_3_url);
			}
			else
			{
				$("#Irtsp_stream3_url_multicast").val(value+"m");
				$("#Irtsp_stream3_url_unicast").val(value);
			}

			rtsp_3_url = $(this).val();
		});

		$("#Irtsp_stream1_addr").change(function(){
			var value = $(this).val();
			if(!(value.match(rtsp_addr_max_regex))){
				$(this).val(rtsp_1_addr);
			}
			else
			{
				IP = value.split(".");
				if(parseInt(IP[0])>=224)
				{
					if(parseInt(IP[0]) == 224 && parseInt(IP[1]) == 0)
					{
						if(parseInt(IP[2]) >= 1)
						{
							if(parseInt(IP[3]) < 1)
								$(this).val(rtsp_1_addr);
						}
						else
							$(this).val(rtsp_1_addr);
					}
				}
				else
					$(this).val(rtsp_1_addr);
			}
				
			rtsp_1_addr = $(this).val();
		});

		$("#Irtsp_stream1_multicast_audio_addr").change(function(){
			var value = $(this).val();
			if(!(value.match(rtsp_addr_max_regex))){
				$(this).val(rtsp_1_audio_addr);
			}
			else
			{
				IP = value.split(".");
				if(parseInt(IP[0])>=224)
				{
					if(parseInt(IP[0]) == 224 && parseInt(IP[1]) == 0)
					{
						if(parseInt(IP[2]) >= 1)
						{
							if(parseInt(IP[3]) < 1)
								$(this).val(rtsp_1_audio_addr);
						}
						else
							$(this).val(rtsp_1_audio_addr);
					}
				}
				else
					$(this).val(rtsp_1_audio_addr);
			}
				
			rtsp_1_audio_addr = $(this).val();
		});

		$("#Irtsp_stream2_addr").change(function(){
			var value = $(this).val();
			if(!(value.match(rtsp_addr_max_regex))){
				$(this).val(rtsp_2_addr);
			}
			else
			{
				IP = value.split(".");
				if(parseInt(IP[0])>=224)
				{
					if(parseInt(IP[0]) == 224 && parseInt(IP[1]) == 0)
					{
						if(parseInt(IP[2]) >= 1)
						{
							if(parseInt(IP[3]) < 1)
								$(this).val(rtsp_2_addr);
						}
						else
							$(this).val(rtsp_2_addr);
					}
				}
				else
					$(this).val(rtsp_2_addr);
			}
				
			rtsp_2_addr = $(this).val();
		});

		$("#Irtsp_stream2_multicast_audio_addr").change(function(){
			var value = $(this).val();
			if(!(value.match(rtsp_addr_max_regex))){
				$(this).val(rtsp_2_audio_addr);
			}
			else
			{
				IP = value.split(".");
				if(parseInt(IP[0])>=224)
				{
					if(parseInt(IP[0]) == 224 && parseInt(IP[1]) == 0)
					{
						if(parseInt(IP[2]) >= 1)
						{
							if(parseInt(IP[3]) < 1)
								$(this).val(rtsp_2_audio_addr);
						}
						else
							$(this).val(rtsp_2_audio_addr);
					}
				}
				else
					$(this).val(rtsp_2_audio_addr);
			}
				
			rtsp_2_audio_addr = $(this).val();
		});

		$("#Irtsp_stream3_addr").change(function(){
			var value = $(this).val();
			if(!(value.match(rtsp_addr_max_regex))){
				$(this).val(rtsp_3_addr);
			}
			else
			{
				IP = value.split(".");
				if(parseInt(IP[0])>=224)
				{
					if(parseInt(IP[0]) == 224 && parseInt(IP[1]) == 0)
					{
						if(parseInt(IP[2]) >= 1)
						{
							if(parseInt(IP[3]) < 1)
								$(this).val(rtsp_3_addr);
						}
						else
							$(this).val(rtsp_3_addr);
					}
				}
				else
					$(this).val(rtsp_3_addr);
			}
				
			rtsp_3_addr = $(this).val();
		});

		$("#Irtsp_stream3_multicast_audio_addr").change(function(){
			var value = $(this).val();
			if(!(value.match(rtsp_addr_max_regex))){
				$(this).val(rtsp_3_audio_addr);
			}
			else
			{
				IP = value.split(".");
				if(parseInt(IP[0])>=224)
				{
					if(parseInt(IP[0]) == 224 && parseInt(IP[1]) == 0)
					{
						if(parseInt(IP[2]) >= 1)
						{
							if(parseInt(IP[3]) < 1)
								$(this).val(rtsp_3_audio_addr);
						}
						else
							$(this).val(rtsp_3_audio_addr);
					}
				}
				else
					$(this).val(rtsp_3_audio_addr);
			}
				
			rtsp_3_audio_addr = $(this).val();
		});

		$("#Irtsp_port").change(function(){
			var value = $(this).val();
			if((parseInt(value) < port_range[0])||(parseInt(value) > port_range[1])||!port_regex.test(value)){
				$(this).val(port);
			}

			port = $(this).val();
		});

		$("#Icon_setting_save_pic").bind('click', function(){

			if($.fn._checkPortSetting())
				return;
				
			command = 	"network.rtsp.authentication"					+"="+	$("input[type=radio][name=Nrtsp_auth]:checked").val()+"&"+
						"network.rtsp.login_id"							+"="+	$("#Irtsp_user").val()+"&"+	
						"network.rtsp.password"							+"="+	$("#Irtsp_passwd").val()+"&"+
						"network.rtsp.port"								+"="+	$("#Irtsp_port").val()+"&"+
						"network.rtsp.stream_1.multicast_address"		+"="+	$("#Irtsp_stream1_addr").val()+"&"+
						"network.rtsp.stream_1.multicast_address_audio"	+"="+	$("#Irtsp_stream1_multicast_audio_addr").val()+"&"+
						"network.rtsp.stream_2.multicast_address"		+"="+	$("#Irtsp_stream2_addr").val()+"&"+
						"network.rtsp.stream_2.multicast_address_audio"	+"="+	$("#Irtsp_stream2_multicast_audio_addr").val()+"&"+
						"network.rtsp.stream_3.multicast_address"		+"="+	$("#Irtsp_stream3_addr").val()+"&"+
						"network.rtsp.stream_3.multicast_address_audio"	+"="+	$("#Irtsp_stream3_multicast_audio_addr").val()+"&"+
						"network.rtsp.stream_1.url"						+"="+	$("#Irtsp_stream1_url").val()+"&"+
						"network.rtsp.stream_2.url"						+"="+	$("#Irtsp_stream2_url").val()+"&"+
						"network.rtsp.stream_3.url"						+"="+	$("#Irtsp_stream3_url").val()+"&";

			if($("input[type=radio][name=Nrtsp_nat]:checked").val() == "off"){
				command += "network.rtsp.natport"         +"="+         "0&";
			}else{
				command += "network.rtsp.natport"         +"="+         $("#Irtsp_nat_port").val()+"&";
			}
			$.fn._SetParamByMask(command, $.fn._GetLangStr(LT._Reloading), 7000);
		});
		
		$("#Icon_setting_default_pic").bind('click', function(){
			if(confirm($.fn._GetLangStr(LT._Reset_to_default_Warning))){
				$.fn._DefaultParam( $.fn._GetLangStr(LT._Reloading), 5000);
			}
		});
	}
})(jQuery);