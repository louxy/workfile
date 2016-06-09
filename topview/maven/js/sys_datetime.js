(function($){
	var confList, ntp_server, time_zone_area, time_zone;
	var utc_time = 
	[ "(UTC)" ,"(UTC)","(UTC +03:00)","(UTC +01:00)","(UTC +03:00)","(UTC)","(UTC +01:00)","(UTC)","(UTC)","(UTC +02:00)","(UTC +01:00)","(UTC +02:00)","(UTC +02:00)","(UTC)","(UTC +01:00)","(UTC)","(UTC)"
	 ,"(UTC +03:00)","(UTC +03:00)","(UTC +01:00)","(UTC)","(UTC)","(UTC +02:00)","(UTC +02:00)","(UTC +02:00)","(UTC +03:00)","(UTC +02:00)","(UTC +02:00)","(UTC +01:00)","(UTC +01:00)","(UTC +01:00)","(UTC)"
	 ,"(UTC +01:00)","(UTC +02:00)","(UTC +02:00)","(UTC +01:00)","(UTC +02:00)","(UTC +02:00)","(UTC +02:00)","(UTC +03:00)","(UTC)","(UTC +03:00)","(UTC +01:00)","(UTC +01:00)","(UTC)","(UTC)","(UTC +01:00)"
	 ,"(UTC)","(UTC +02:00)","(UTC +01:00)","(UTC +01:00)","(UTC -09:00)","(UTC -09:00)","(UTC -04:00)","(UTC -04:00)","(UTC -03:00)","(UTC -03:00)","(UTC -03:00)","(UTC -03:00)","(UTC -03:00)","(UTC -03:00)"
	 ,"(UTC -03:00)","(UTC -03:00)","(UTC -03:00)","(UTC -03:00)","(UTC -03:00)","(UTC -03:00)","(UTC -03:00)","(UTC -04:00)","(UTC -04:00)","(UTC -10:00)","(UTC -03:00)","(UTC -07:00)","(UTC -04:00)"
	 ,"(UTC -03:00)","(UTC -06:00)","(UTC -04:00)","(UTC -04:00)","(UTC -05:00)","(UTC -06:00)","(UTC -07:00)","(UTC -04:00)","(UTC -05:00)","(UTC -04:30)","(UTC -03:00)","(UTC -05:00)","(UTC -05:00)"
	 ,"(UTC -06:00)","(UTC -06:00)","(UTC -04:00)","(UTC -04:00)","(UTC)","(UTC -05:00)","(UTC -07:00)","(UTC -07:00)","(UTC -04:00)","(UTC -04:00)","(UTC -06:00)","(UTC -04:00)","(UTC -06:00)","(UTC -03:00)"
	 ,"(UTC -03:00)","(UTC -02:00)","(UTC -03:00)","(UTC -04:00)","(UTC -04:00)","(UTC -04:00)","(UTC -06:00)","(UTC -05:00)","(UTC -04:00)","(UTC -03:00)","(UTC -05:00)","(UTC -07:00)","(UTC -04:00)"
	 ,"(UTC -05:00)","(UTC -04:00)","(UTC -04:00)","(UTC -05:00)","(UTC -04:00)","(UTC -04:00)","(UTC -04:00)","(UTC -06:00)","(UTC -04:00)","(UTC -05:00)","(UTC -08:00)","(UTC -04:00)","(UTC -04:00)"
	 ,"(UTC -04:00)","(UTC -05:00)","(UTC -07:00)","(UTC -03:00)","(UTC -06:00)","(UTC -04:00)","(UTC -04:00)","(UTC -04:00)","(UTC -05:00)","(UTC -06:00)","(UTC -05:00)","(UTC -05:00)","(UTC -08:00)"
	 ,"(UTC -05:00)","(UTC -03:00)","(UTC -03:00)","(UTC -05:00)","(UTC -03:00)","(UTC -04:00)","(UTC -04:00)","(UTC -04:00)","(UTC -04:00)","(UTC -04:00)","(UTC -08:00)","(UTC -02:00)","(UTC -05:00)"
	 ,"(UTC -05:00)","(UTC -05:00)","(UTC -06:00)","(UTC -05:00)","(UTC -04:00)","(UTC -03:00)","(UTC -07:00)","(UTC -04:00)","(UTC -04:00)","(UTC -04:00)","(UTC -04:00)","(UTC -05:00)","(UTC -05:00)"
	 ,"(UTC -03:00)","(UTC -06:00)","(UTC -05:00)","(UTC -05:00)","(UTC -03:00)","(UTC -03:00)","(UTC -03:00)","(UTC -04:00)","(UTC -03:00)","(UTC -01:00)","(UTC -06:00)","(UTC -08:00)","(UTC -04:00)"
	 ,"(UTC -03:30)","(UTC -04:00)","(UTC -04:00)","(UTC -04:00)","(UTC -04:00)","(UTC -06:00)","(UTC -06:00)","(UTC -03:00)","(UTC -04:00)","(UTC -07:00)","(UTC -04:00)","(UTC -04:00)","(UTC -07:00)"
	 ,"(UTC -08:00)","(UTC -05:00)","(UTC -08:00)","(UTC -06:00)","(UTC +08:00)","(UTC +07:00)","(UTC +10:00)","(UTC +10:00)","(UTC +05:00)","(UTC +13:00)","(UTC -03:00)","(UTC -03:00)","(UTC +13:00)"
	 ,"(UTC +03:00)","(UTC +06:00)","(UTC +02:00)","(UTC +03:00)","(UTC +06:00)","(UTC +03:00)","(UTC +12:00)","(UTC +05:00)","(UTC +05:00)","(UTC +03:00)","(UTC +03:00)","(UTC +05:00)","(UTC +07:00)"
	 ,"(UTC +03:00)","(UTC +06:00)","(UTC +08:00)","(UTC +08:00)","(UTC +08:00)","(UTC +05:30)","(UTC +03:00)","(UTC +06:00)","(UTC +09:00)","(UTC +04:00)","(UTC +05:00)","(UTC +03:00)","(UTC +08:00)"
	 ,"(UTC +07:00)","(UTC +08:00)","(UTC +07:00)","(UTC +08:00)","(UTC +07:00)","(UTC +09:00)","(UTC +03:00)","(UTC +04:30)","(UTC +12:00)","(UTC +05:00)","(UTC +08:00)","(UTC +05:45)","(UTC +05:30)"
	 ,"(UTC +07:00)","(UTC +08:00)","(UTC +08:00)","(UTC +03:00)","(UTC +08:00)","(UTC +10:00)","(UTC +08:00)","(UTC +08:00)","(UTC +04:00)","(UTC +03:00)","(UTC +07:00)","(UTC +06:00)","(UTC +06:00)"
	 ,"(UTC +05:00)","(UTC +07:00)","(UTC +07:00)","(UTC +08:30)","(UTC +03:00)","(UTC +06:00)","(UTC +06:30)","(UTC +03:00)","(UTC +10:00)","(UTC +05:00)","(UTC +09:00)","(UTC +08:00)","(UTC +08:00)"
	 ,"(UTC +08:00)","(UTC +0d5:00)","(UTC +04:00)","(UTC +03:30)","(UTC +06:00)","(UTC +09:00)","(UTC +08:00)","(UTC +08:00)","(UTC +07:00)","(UTC +10:00)","(UTC +09:00)","(UTC +05:00)","(UTC +04:00)","(UTC)"
	 ,"(UTC -04:00)","(UTC +01:00)","(UTC -01:00)","(UTC +01:00)","(UTC +01:00)","(UTC)","(UTC -02:00)","(UTC)","(UTC -03:00)","(UTC +09:30)","(UTC +10:00)","(UTC +09:30)","(UTC +10:00)","(UTC +09:30)"
	 ,"(UTC +08:45)","(UTC +10:00)","(UTC +10:00)","(UTC +10:30)","(UTC +10:00)","(UTC +08:00)","(UTC +10:00)","(UTC +02:00)","(UTC +02:00)","(UTC +03:00)","(UTC +02:00)","(UTC +02:00)","(UTC +02:00)"
	 ,"(UTC +02:00)","(UTC +03:00)","(UTC +02:00)","(UTC +03:00)","(UTC +02:00)","(UTC +01:00)","(UTC +02:00)","(UTC +01:00)","(UTC +03:00)","(UTC +01:00)","(UTC +03:00)","(UTC +01:00)","(UTC +02:00)"
	 ,"(UTC +03:00)","(UTC +01:00)","(UTC +02:00)","(UTC +01:00)","(UTC +02:00)","(UTC +02:00)","(UTC +02:00)","(UTC +03:00)","(UTC +03:00)","(UTC +02:00)","(UTC +03:00)","(UTC +02:00)","(UTC +02:00)"
	 ,"(UTC +02:00)","(UTC +02:00)","(UTC +03:00)","(UTC +02:00)","(UTC +04:00)","(UTC +02:00)","(UTC +02:00)","(UTC +03:00)","(UTC +02:00)","(UTC +03:00)","(UTC +02:00)","(UTC +03:00)","(UTC +02:00)"
	 ,"(UTC +03:00)","(UTC +02:00)","(UTC +02:00)","(UTC +02:00)","(UTC +03:00)","(UTC +03:00)","(UTC +02:00)","(UTC +02:00)","(UTC +03:00)","(UTC +02:00)","(UTC +03:00)","(UTC +06:00)","(UTC +07:00)"
	 ,"(UTC +06:30)","(UTC +03:00)","(UTC +05:00)","(UTC +04:00)","(UTC +05:00)","(UTC +04:00)","(UTC +03:00)","(UTC +04:00)","(UTC +13:00)","(UTC +12:00)","(UTC +12:45)","(UTC +10:00)","(UTC -06:00)"
	 ,"(UTC +11:00)","(UTC +13:00)","(UTC +14:00)","(UTC +12:00)","(UTC +12:00)","(UTC -06:00)","(UTC -09:00)","(UTC +11:00)","(UTC +10:00)","(UTC -10:00)","(UTC -10:00)","(UTC +14:00)","(UTC +11:00)"
	 ,"(UTC +12:00)","(UTC +12:00)","(UTC -09:30)","(UTC -11:00)","(UTC +12:00)","(UTC -11:00)","(UTC +11:30)","(UTC +11:00)","(UTC -11:00)","(UTC +09:00)","(UTC -08:00)","(UTC +11:00)","(UTC +10:00)"
	 ,"(UTC -10:00)","(UTC +10:00)","(UTC -10:00)","(UTC +12:00)","(UTC +13:00)","(UTC +12:00)","(UTC +12:00)"

	 ]

	$.fn._ObjectAssignValue = function(src){
		$.each(src, function(param , val){
			if(param == "system.datetime")
			{
				$("#Imanual_datetime").val($.fn_TransferDatetimeFormat(val[1]));
			}
			else if(param == "system.datetime.sync_mode")
				$("input[name=Ndate_time_mode][value='"+val[1]+"']").attr('checked',true);
			else if(param == "system.datetime.ntp_server")
			{
				$("#Intp_server").val(val[1]);
				ntp_server = val[1];
			}
			else if(param == "system.datetime.ntp_sync_period")
			{
				confList = "24,12,6,1".split(',');
				$("#Intp_period").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == val[1])
						$("#Intp_period").append($("<option></option>").attr("value", confList[n]).text(confList[n]+"hr").attr("selected","true"));
					else
						$("#Intp_period").append($("<option></option>").attr("value", confList[n]).text(confList[n]+"hr"));
				});
			}
			else if(param == "system.datetime.list")
			{
				time_zone_area = val[1];
			}
			else if(param == "system.datetime.area")
			{
				time_zone = val[1];
			}
		});
	};
	$.fn._Go = function(){
		$.fn._InitialPageLang();
		$.fn._InitialTimeZone();
		$.fn._SyncModeCtrl();
		$.fn._InitialFunc();
		$.fn._RefreshPCTime();
		$.fn._RefreshCameraDateTime();
		$('#reloading_container').hide();
		$('#container').show();
	};
	$.fn._InitialPageLang = function(){
		$("#Msys_datetime_title")[0].innerHTML 		= $.fn._GetLangStr(LT._Current_Server_Time);
		$("#Mdate")[0].innerHTML 					= $.fn._GetLangStr(LT._Date);
		$("#Mtime")[0].innerHTML 					= $.fn._GetLangStr(LT._Time);
		$("#Msetting_mode")[0].innerHTML 			= $.fn._GetLangStr(LT._Synchronization_Mode);
		$("#Mset_manual")[0].innerHTML 				= $.fn._GetLangStr(LT._Manual);
		$("#Mmanual_datetime")[0].innerHTML 		= $.fn._GetLangStr(LT._Menu_System_date_time);
		$("#Msync_from_pc")[0].innerHTML 			= $.fn._GetLangStr(LT._Synchronize_with_Computer_Clock);
		$("#Mpc_date")[0].innerHTML 				= $.fn._GetLangStr(LT._Date);
		$("#Mpc_time")[0].innerHTML 				= $.fn._GetLangStr(LT._Time);
		$("#Mntp")[0].innerHTML 					= $.fn._GetLangStr(LT._Synchronize_with_NTP_Server);
		$("#Mntp_setting")[0].innerHTML 			= $.fn._GetLangStr(LT._NTP);
		$("#Mntp_server")[0].innerHTML 				= $.fn._GetLangStr(LT._NTP_Server)+":";
		$("#Mntp_period")[0].innerHTML 				= $.fn._GetLangStr(LT._NTP_Synchronize_Period)+":";
		$("#Mtime_zone_title")[0].innerHTML 		= $.fn._GetLangStr(LT._Time_Zone);
		$("#Mtime_zone")[0].innerHTML 				= $.fn._GetLangStr(LT._Time_Zone)+":";
		$("#Intp_server_test").val($.fn._GetLangStr(LT._NTP_Time_Adjustment_Test));
	};

	$.fn._RefreshCameraDateTime = function()
	{
		var t;
		$.ajax({
			url:'/cgi-bin/get?system.datetime',
			dataType:'json',
			cache:false,
			success:function(data){
				$.each(data, function(param , val){
					if(param == "system.datetime")
						t = $.fn_TransferDatetimeFormat(val[1]);
				});
			},
			error:function(xhr, textStatus, errorThrown){
			},
			complete:function(){
				t = null;
				setTimeout($.fn._RefreshCameraDateTime, 1000);
			}
		});
	};

	$.fn._InitialTimeZone = function()
	{
		var tmp;
		tmp = time_zone_area.split(',');
		$("#Itime_zone").find('option').remove();
		$.each(tmp, function(n){
			if(tmp[n] == time_zone)
				$("#Itime_zone").append($("<option></option>").attr("value", tmp[n]).text(utc_time[n]+" "+tmp[n]).attr("selected","true"));
			else
				$("#Itime_zone").append($("<option></option>").attr("value", tmp[n]).text(utc_time[n]+" "+tmp[n]));
		});	
	};

	$.fn._SyncModeCtrl = function()
	{
		$("input[name=Ndate_time_mode]").change(function(){
			if($(this).val() == "manual")
			{
				$("#Imanual_datetime").attr("disabled",false);
				$("#Intp_server").attr("disabled",true);
				$("#Intp_period").attr("disabled",true);
				$("#Intp_server_test").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
			}
			else if($(this).val() == "sync_from_pc")
			{
				$("#Imanual_datetime").attr("disabled",true);
				$("#Intp_server").attr("disabled",true);
				$("#Intp_period").attr("disabled",true);
				$("#Intp_server_test").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
			}
			else if($(this).val() == "ntp")
			{
				$("#Imanual_datetime").attr("disabled",true);
				$("#Intp_server").attr("disabled",false);
				$("#Intp_period").attr("disabled",false);
				$("#Intp_server_test").attr("disabled",false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
			}
		});

		$("input[name=Ndate_time_mode]:checked").change();
	};

	$.fn._InitialFunc = function()
	{
		var Invalid_input_regex = /^\s*[^\"]+\s*$/;
			
		$("#Imanual_datetime").change(function(){
			$(this).validator('validate');
		});
		$('#Imanual_datetime').validator({
			format: 'datetime',
			invalidEmpty: true,
			correct: function() {
				$('#manual_note').text('');
			},
			error: function() {
				$('#manual_note').text($.fn._GetLangStr(LT._Datetime_manual_note));
			}
		});

		$("#Intp_server").change(function(){
			var value = $(this).val();
			if((value.length < 2 || value.length > 128)||!Invalid_input_regex.test(value)){
				$(this).val(ntp_server);
			}

			ntp_server = $(this).val();
		});

		$("#Intp_server_test").bind('click', function(){
			command = 	"system.datetime.ntp_server"			+"="+	$("#Intp_server").val()+"&"+
						"system.datetime.ntp_sync_period"		+"="+	$("#Intp_period").val()+"&"+
						"system.datetime.ntp_adjustment_test"	+"="+	"1"+"&";

			$.fn._SetParamByMask(command, $.fn._GetLangStr(LT._Reloading), 7000);
		});

		$("#Icon_setting_save_pic").bind('click', function(){

			if($("input[type=radio][name=Ndate_time_mode]:checked").val() == "manual")
			{
				command = 	"system.datetime.sync_mode" 		+"="+	$("input[type=radio][name=Ndate_time_mode]:checked").val()+"&"+
							"system.datetime.set_manual"		+"="+	$("#Imanual_datetime").val()+"&";
			}
			else if($("input[type=radio][name=Ndate_time_mode]:checked").val() == "sync_from_pc")
			{
				var pc_time = "";

				pc_time = $("#Ipc_date").val()+" "+$("#Ipc_time").val();
				command = 	"system.datetime.sync_mode" 		+"="+	$("input[type=radio][name=Ndate_time_mode]:checked").val()+"&"+
							"system.datetime.set_manual"		+"="+	pc_time+"&";
			}
			else if($("input[type=radio][name=Ndate_time_mode]:checked").val() == "ntp")
			{
				command = 	"system.datetime.sync_mode" 		+"="+	$("input[type=radio][name=Ndate_time_mode]:checked").val()+"&"+
							"system.datetime.ntp_server"		+"="+	$("#Intp_server").val()+"&"+
							"system.datetime.ntp_sync_period"	+"="+	$("#Intp_period").val()+"&";
			}

			command = command + "system.datetime.area"			+"="+	$("#Itime_zone").val()+"&";
			$.fn._SetParamByMask(command, $.fn._GetLangStr(LT._Reloading), 7000);
		});
		
		$("#Icon_setting_default_pic").bind('click', function(){
			if(confirm($.fn._GetLangStr(LT._Reset_to_default_Warning))){
				$.fn._DefaultParam( $.fn._GetLangStr(LT._Reloading), 5000);
			}
		});
	};

	$.fn_TransferDatetimeFormat = function(src)
	{
		var data = new Array(), date = new Array(), time = new Array();
		var yyyy = "", md = "", dd ="", hh = "", mm = "", ss = "", datetime;
		
		data = src.split(' ');
		date = data[0].split('/');
		time = data[1].split(':');
		
		if(eval(date[0]) <= 1000)
			yyyy = "0"+date[0];
		else
			yyyy = date[0];
		
		if(eval(date[1]) <= 9)
			md = "0"+date[1];
		else
			md = date[1];
		
		if(eval(date[2]) <= 9)
			dd = "0"+date[2];
		else
			dd = date[2];
		
		if(eval(time[0]) <= 9)
			hh = "0"+time[0];
		else
			hh = time[0];
		
		if(eval(time[1]) <= 9)
			mm = "0"+time[1];
		else
			mm = time[1];
		
		if(eval(time[2]) <= 9)
			ss = "0"+time[2];
		else
			ss = time[2];

		datetime = yyyy+"/"+md+"/"+dd+" "+hh+":"+mm+":"+ss;

		// Initial current system datetime
		$("#ICurrentDate").val(yyyy+"/"+md+"/"+dd);
		$("#ICurrentTime").val(hh+":"+mm+":"+ss);
		
		return datetime;
	};

	$.fn._RefreshPCTime = function()
	{
		var td = new Date();
		var yyyy = "", md = "", dd ="", hh = "", mm = "", ss = "", datetime;
		
		if(eval(td.getFullYear()) <= 1000)
			yyyy = "0"+td.getFullYear();
		else
			yyyy = td.getFullYear();
		
		if(eval(td.getMonth()+1) <= 9)
			md = "0"+eval(td.getMonth()+1);
		else
			md = eval(td.getMonth()+1);
		
		if(eval(td.getDate()) <= 9)
			dd = "0"+td.getDate();
		else
			dd = td.getDate();
		
		if(eval(td.getHours()) <= 9)
			hh = "0"+td.getHours();
		else
			hh = td.getHours();
		
		if(eval(td.getMinutes()) <= 9)
			mm = "0"+td.getMinutes();
		else
			mm = td.getMinutes();
		
		if(eval(td.getSeconds()) <= 9)
			ss = "0"+td.getSeconds();
		else
			ss = td.getSeconds();
		
		$("#Ipc_date").val(yyyy+"/"+md+"/"+dd);
		$("#Ipc_time").val(hh+":"+mm+":"+ss);

		setTimeout($.fn._RefreshPCTime, 1000);
	}
})(jQuery);