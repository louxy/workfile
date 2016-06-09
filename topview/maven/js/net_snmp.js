(function($){
	var confList, username, auth_passwd, privacy_passwd, read_string, write_string, trap_host, heartbeat_host, heartbeat_interval;
	$.fn._ObjectAssignValue = function(src){
		$.each(src, function(param , val){
			if(param == "network.snmp.snmp_v1_enable")
				$("input[name=Nsnmp_1][value='"+val[1]+"']").attr('checked',true);
			else if(param == "network.snmp.snmp_v2_enable")
				$("input[name=Nsnmp_2][value='"+val[1]+"']").attr('checked',true);
			else if(param == "network.snmp.snmp_v3_enable")
				$("input[name=Nsnmp_3][value='"+val[1]+"']").attr('checked',true);
			else if(param == "network.snmp.v3.user_name")
			{
				$("#Isnmp_3_user").val(val[1]);
				username = val[1];
			}
			else if(param == "network.snmp.v3.authentication_mode")
			{
				confList = "NONE,MD5,SHA".split(',');
					
				$("#Isnmp_3_auth_mode").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == val[1])
						$("#Isnmp_3_auth_mode").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
					else
						$("#Isnmp_3_auth_mode").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});
			}
			else if(param == "network.snmp.v3.authentication_password")
			{	
				$("#Isnmp_3_auth_passwd").val(val[1]);
				auth_passwd = val[1];
			}
			else if(param == "network.snmp.v3.privacy_mode")
			{
				confList = "NONE,DES,AES".split(',');
					
				$("#Isnmp_3_privacy_mode").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == val[1])
						$("#Isnmp_3_privacy_mode").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
					else
						$("#Isnmp_3_privacy_mode").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

			}
			else if(param == "network.snmp.v3.privacy_password")
			{
				$("#Isnmp_3_privacy_passwd").val(val[1]);
				privacy_passwd = val[1];
			}
			else if(param == "network.snmp.read_community_string")
			{
				$("#Isnmp_read_string").val(val[1]);
				read_string = val[1];
			}
			else if(param == "network.snmp.write_community_string")
			{
				$("#Isnmp_write_string").val(val[1]);
				write_string = val[1];
			}
			else if(param == "network.snmp.trap_enable")
				$("input[name=Ntrap_enable][value='"+val[1]+"']").attr('checked',true);
			else if(param == "network.snmp.trap_host")
			{
				$("#Itrap_host").val(val[1]);
				trap_host = val[1];
			}
			else if(param == "network.snmp.heartbeat_enable")
				$("input[name=Nheartbeat_enable][value='"+val[1]+"']").attr('checked',true);
			else if(param == "network.snmp.heartbeat_host")
			{
				$("#Iheartbeat_host").val(val[1]);
				heartbeat_host = val[1];
			}
			else if(param == "network.snmp.heartbeat_interval")
			{
				$("#Iheartbeat_interval").val(val[1]);
				heartbeat_interval = val[1];
			}
		});
	};
	$.fn._Go = function(){
		$.fn._InitialPageLang();
		$.fn._InitialV3Ctrl();
		$.fn._InitialFunc();
		$('#reloading_container').hide();
		$('#container').show();
	};
	$.fn._InitialPageLang = function(){
		for(var i = 1; i<=3; i++)
		{
			$("#Msnmp_"+i+"_title")[0].innerHTML 		= $.fn._GetLangStr(LT._SNMP_V)+i;
			$("#Msnmp_"+i+"")[0].innerHTML 				= $.fn._GetLangStr(LT._Enable)+":";
			$("#Msnmp_"+i+"_on")[0].innerHTML 			= $.fn._GetLangStr(LT._ON);
			$("#Msnmp_"+i+"_off")[0].innerHTML 			= $.fn._GetLangStr(LT._OFF);
		}
		$("#Msnmp_3_user")[0].innerHTML 				= $.fn._GetLangStr(LT._User_Name)+":";
		$("#Msnmp_3_auth_mode")[0].innerHTML 			= $.fn._GetLangStr(LT._Authentication)+":";
		$("#Msnmp_3_privacy_mode")[0].innerHTML 		= $.fn._GetLangStr(LT._privacy)+":";
		$("#Mread_write_string")[0].innerHTML 			= $.fn._GetLangStr(LT._Read_Write_Community_String);
		$("#Msnmp_read_string")[0].innerHTML 			= $.fn._GetLangStr(LT._Read_Community_String)+":";
		$("#Msnmp_write_string")[0].innerHTML 			= $.fn._GetLangStr(LT._Write_Community_String)+":";
		$("#Mtrap")[0].innerHTML 						= $.fn._GetLangStr(LT._SNMP_Trap);
		$("#Mtrap_enable")[0].innerHTML 				= $.fn._GetLangStr(LT._Enable)+":";
		$("#Mtrap_host")[0].innerHTML 					= $.fn._GetLangStr(LT._SNMP_Trap_Host)+":";
		$("#Mheartbeat")[0].innerHTML 					= $.fn._GetLangStr(LT._SNMP_Heartbeat);
		$("#Mheartbeat_enable")[0].innerHTML 			= $.fn._GetLangStr(LT._Enable)+":";
		$("#Mheartbeat_host")[0].innerHTML 				= $.fn._GetLangStr(LT._SNMP_Heartbeat_Host)+":";
		$("#Mheartbeat_interval")[0].innerHTML 			= $.fn._GetLangStr(LT._SNMP_Heartbeat_Interval)+":";
		$("#MdownloadMIB")[0].innerHTML 				= $.fn._GetLangStr(LT._Download_MIB);
		$("#Mtrap_enable_on")[0].innerHTML 				= $.fn._GetLangStr(LT._ON);
		$("#Mtrap_enable_off")[0].innerHTML 			= $.fn._GetLangStr(LT._OFF);
		$("#Mheartbeat_enable_on")[0].innerHTML 		= $.fn._GetLangStr(LT._ON);
		$("#Mheartbeat_enable_off")[0].innerHTML 		= $.fn._GetLangStr(LT._OFF);
		$("#privacy_note")[0].innerHTML 				= $.fn._GetLangStr(LT._v3_privacy_note);
		$("#auth_note")[0].innerHTML 					= $.fn._GetLangStr(LT._v3_auth_note);
		$("#Mheartbeat_interval_note")[0].innerHTML 	= $.fn._GetLangStr(LT._interval_note);
		
		$("#IDownload_Button").val($.fn._GetLangStr(LT._Download_MIB));
		$.fn._InitialOptionLang("Isnmp_3_auth_mode");
		$.fn._InitialOptionLang("Isnmp_3_privacy_mode");
	};

	$.fn._InitialV3Ctrl = function()
	{
		$("input[name=Nsnmp_3]").change(function(){
			if($(this).val() == "on"){
				$("#Isnmp_3_user").attr("disabled",false);
				$("#Isnmp_3_auth_mode").attr("disabled",false);
				$("#auth_note").parent().show();
				$("#privacy_note").parent().show();
				$("#Isnmp_3_auth_mode").change();
			}
			else if($(this).val() == "off"){
				$("#Isnmp_3_user").attr("disabled",true);
				$("#Isnmp_3_auth_mode").attr("disabled",true);
				$("#Isnmp_3_auth_passwd").attr("disabled",true);
				$("#Isnmp_3_privacy_mode").attr("disabled",true);
				$("#Isnmp_3_privacy_passwd").attr("disabled",true);
				$("#auth_note").parent().hide();
				$("#privacy_note").parent().hide();
			}
		});
		
		$("#Isnmp_3_auth_mode").change(function(){
			if(this.selectedIndex == 0){
				$("#Isnmp_3_privacy_mode")[0].selectedIndex = 0;
				$("#Isnmp_3_auth_passwd").attr("disabled",true);
				$("#Isnmp_3_privacy_mode").attr("disabled",true);
				$("#Isnmp_3_privacy_passwd").attr("disabled",true);
			}else{
				$("#Isnmp_3_auth_passwd").attr("disabled",false);
				$("#Isnmp_3_privacy_mode").attr("disabled",false);
				$("#Isnmp_3_privacy_mode").change();
			}
		});

		$("#Isnmp_3_privacy_mode").change(function(){
			if(this.selectedIndex == 0)
				$("#Isnmp_3_privacy_passwd").attr("disabled",true);
			else
				$("#Isnmp_3_privacy_passwd").attr("disabled",false);
		});

		$("input[name=Nsnmp_3]:checked").change();
	};

	$.fn._InitialFunc = function()
	{
		var Invalid_input_regex = /^\s*[^\"]+\s*$/;

		$("#Isnmp_3_user").change(function(){
			var value = $(this).val();
			if((value.length < 2 || value.length > 40)||!Invalid_input_regex.test(value)){
				$(this).val(username);
			}

			username = $(this).val();
		});

		$("#Isnmp_3_auth_passwd").change(function(){
			var value = $(this).val();
			if((value.length < 8 || value.length > 64)||!Invalid_input_regex.test(value)){
				$(this).val(auth_passwd);
			}

			auth_passwd = $(this).val();
		});

		$("#Isnmp_3_privacy_passwd").change(function(){
			var value = $(this).val();
			if((value.length < 8 || value.length > 64)||!Invalid_input_regex.test(value)){
				$(this).val(privacy_passwd);
			}

			privacy_passwd = $(this).val();
		});

		$("#Isnmp_read_string").change(function(){
			var value = $(this).val();
			if((value.length < 2 || value.length > 40)||!Invalid_input_regex.test(value)){
				$(this).val(read_string);
			}

			read_string = $(this).val();
		});

		$("#Isnmp_write_string").change(function(){
			var value = $(this).val();
			if((value.length < 2 || value.length > 40)||!Invalid_input_regex.test(value)){
				$(this).val(write_string);
			}

			write_string = $(this).val();
		});

		$("#Itrap_host").change(function(){
			var value = $(this).val();
			if((value.length < 2 || value.length > 40)||!Invalid_input_regex.test(value)){
				$(this).val(trap_host);
			}

			trap_host = $(this).val();
		});

		$("#Iheartbeat_host").change(function(){
			var value = $(this).val();
			if((value.length < 2 || value.length > 40)||!Invalid_input_regex.test(value)){
				$(this).val(heartbeat_host);
			}

			heartbeat_host = $(this).val();
		});

		var mum_regex = /^\s*[0-9]+\s*$/;
		$("#Iheartbeat_interval").change(function(){
			var value = $(this).val();
			if((value < 30)||!mum_regex.test(value)){
				$(this).val(heartbeat_interval);
			}

			heartbeat_interval = $(this).val();
		});
		
		$("#Icon_setting_save_pic").bind('click', function(){

			var v3_mode = $("input[type=radio][name=Nsnmp_3]:checked").val();
			var v3_auth_mode = "";
			var v3_privacy_mode = "";
						
			command = 	"network.snmp.snmp_v1_enable"				+"="+	$("input[type=radio][name=Nsnmp_1]:checked").val()+"&"+
						"network.snmp.snmp_v2_enable"				+"="+	$("input[type=radio][name=Nsnmp_2]:checked").val()+"&"+
						"network.snmp.snmp_v3_enable"				+"="+	$("input[type=radio][name=Nsnmp_3]:checked").val()+"&"+
						"network.snmp.read_community_string"		+"="+	$("#Isnmp_read_string").val()+"&"+
						"network.snmp.write_community_string"		+"="+	$("#Isnmp_write_string").val()+"&"+
						"network.snmp.trap_host"					+"="+	$("#Itrap_host").val()+"&"+
						"network.snmp.trap_enable"					+"="+	$("input[type=radio][name=Ntrap_enable]:checked").val()+"&"+
						"network.snmp.heartbeat_host"				+"="+	$("#Iheartbeat_host").val()+"&"+
						"network.snmp.heartbeat_interval"			+"="+	$("#Iheartbeat_interval").val()+"&"+
						"network.snmp.heartbeat_enable"				+"="+	$("input[type=radio][name=Nheartbeat_enable]:checked").val()+"&";

			if(v3_mode == "on"){

				if($("#Isnmp_3_auth_mode")[0].selectedIndex == 0)
					v3_auth_mode = "none";
				else if($("#Isnmp_3_auth_mode")[0].selectedIndex == 1)
					v3_auth_mode = "md5";
				else if($("#Isnmp_3_auth_mode")[0].selectedIndex == 2)
					v3_auth_mode = "sha";

				if($("#Isnmp_3_privacy_mode")[0].selectedIndex == 0)
					v3_privacy_mode = "none";
				else if($("#Isnmp_3_privacy_mode")[0].selectedIndex == 1)
					v3_privacy_mode = "des";
				else if($("#Isnmp_3_privacy_mode")[0].selectedIndex == 2)
					v3_privacy_mode = "aes";
		
				command = command +
						"network.snmp.v3.user_name"					+"="+	$("#Isnmp_3_user").val()+"&"+
						"network.snmp.v3.authentication_mode"		+"="+	v3_auth_mode+"&"+
						"network.snmp.v3.authentication_password"	+"="+	$("#Isnmp_3_auth_passwd").val()+"&"+
						"network.snmp.v3.privacy_mode"				+"="+	v3_privacy_mode+"&"+
						"network.snmp.v3.privacy_password"			+"="+	$("#Isnmp_3_privacy_passwd").val()+"&";
			}
		
			$.fn._SetParamByMask(command, $.fn._GetLangStr(LT._Reloading), 7000);
		});
		
		$("#Icon_setting_default_pic").bind('click', function(){
			if(confirm($.fn._GetLangStr(LT._Reset_to_default_Warning))){
				$.fn._DefaultParam( $.fn._GetLangStr(LT._Reloading), 5000);
			}
		});
	};
})(jQuery);
