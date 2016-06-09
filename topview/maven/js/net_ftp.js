(function($){
	var ftp_user, ftp_passwd, ftp_max, split_tmp;
	var connect_range = new Array();
	$.fn._ObjectAssignValue = function(src){
		$.each(src, function(param , val){
			if(param == "network.ftp.login_id")
			{
				$("#Iftp_user").val(val[1]);
				ftp_user = val[1];
			}
			else if(param == "network.ftp.password")
			{
				$("#Iftp_passwd").val(val[1]);
				ftp_passwd = val[1];
			}
			else if(param == "network.ftp.max_simultaneous_connection")
			{
				$("#Iftp_max_simultaneous_connection").val(val[1]);
				ftp_max = val[1];
			}
			else if(param == "network.ftp.function")
				$("input[name=Nftp_function][value='"+val[1]+"']").attr('checked',true);
			else if(param == "network.ftp.max_simultaneous_connection.query_range")
			{
				split_tmp = val[1].split('~');
				$.each(split_tmp, function(n){
					if(n == 0){
						connect_range[n] = split_tmp[n].slice(1,split_tmp[n].length);
					}
					else if(n == 1){
						connect_range[n] = split_tmp[n].slice(0,split_tmp[n].length-1);
					}
				});

				$("#Iftp_max_simultaneous_connection_range")[0].innerHTML 	= "("+connect_range[0]+"~"+connect_range[1]+")";
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
		$("#Mnet_ftp_title")[0].innerHTML 					= $.fn._GetLangStr(LT._BasicSetting);
		$("#Mftp_user")[0].innerHTML 						= $.fn._GetLangStr(LT._Login_ID)+":";
		$("#Mftp_passwd")[0].innerHTML 						= $.fn._GetLangStr(LT._Password)+":";
		$("#Mftp_max_simultaneous_connection")[0].innerHTML = $.fn._GetLangStr(LT._Max_Simultaneous_Connection)+":";
		$("#Mnet_ftp_function_title")[0].innerHTML 			= $.fn._GetLangStr(LT._FTP_Function);
		$("#Mftp_function")[0].innerHTML 					= $.fn._GetLangStr(LT._Action)+":";
		$("#Mftp_function_on")[0].innerHTML 				= $.fn._GetLangStr(LT._ON);
		$("#Mftp_function_off")[0].innerHTML 				= $.fn._GetLangStr(LT._OFF);
	};

	$.fn._InitialFunc = function()
	{
		var Invalid_input_regex = /^\s*[^\"]+\s*$/;
		var max_simultaneous_regex = /^\s*[0-9]+\s*$/;
		var command = "";
		$("#Iftp_user").change(function(){
			var value = $(this).val();
			if((value.length < 2 || value.length > 40)||!Invalid_input_regex.test(value)){
				$(this).val(ftp_user);
			}

			ftp_user = $(this).val();
		});

		$("#password").change(function(){
			var value = $(this).val();
			if((value.length < 2 || value.length > 40)||!Invalid_input_regex.test(value)){
				$(this).val(ftp_passwd);
			}

			ftp_passwd = $(this).val();
		});

		$("#Iftp_max_simultaneous_connection").change(function(){
			var value = $(this).val();
			if((Number(value) < parseInt(connect_range[0]) || Number(value) > parseInt(connect_range[1]))|| !max_simultaneous_regex.test(value)){
				$(this).val(ftp_max);
			}

			ftp_max = $(this).val();
		});

		$("#Icon_setting_save_pic").bind('click', function(){
			command = 	"network.ftp.function"						+"="+	$("input[type=radio][name=Nftp_function]:checked").val()+"&"+
						"network.ftp.login_id"						+"="+	$("#Iftp_user").val()+"&"+
						"network.ftp.max_simultaneous_connection"	+"="+	$("#Iftp_max_simultaneous_connection").val()+"&"+
						"network.ftp.password"						+"="+	$("#Iftp_passwd").val()+"&";

			$.fn._SetParamByMask(command, $.fn._GetLangStr(LT._Reloading), 3000);
		});

		$("#Icon_setting_default_pic").bind('click', function(){
			if(confirm($.fn._GetLangStr(LT._Reset_to_default_Warning))){
				$.fn._DefaultParam( $.fn._GetLangStr(LT._Reloading), 5000);
			}
		});
	};
})(jQuery);