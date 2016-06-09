(function($){
	var confList, split_tmp, ftp_server, ftp_user, ftp_passwd, ftp_port, sch_file_name, sch_server_path, record_alarm_file_name, record_alarm_server_path, record_motion_file_name, record_motion_server_path;
	var current_profile, profile1, profile2, profile3, profile4, profile5, profile6;
	var port_range = new Array();
	$.fn._ObjectAssignValue = function(src){
		$.each(src, function(param , val){
			if(param == "event.ftp_record.conditions")
			{
				$("input[name=Nftp_condition][value='"+val[1]+"']").attr('checked',true);

				if(model_alarm == 0)
				{
					$("input[name=Nftp_condition][value='alarm_in']").hide();
					$("#IFTP_Condition1_AlarmIn").hide();
				}
			}
			else if(param == "event.ftp_record.server_name")
			{
				$("#Iftp_addr").val(val[1]);
				ftp_server = val[1];
			}
			else if(param == "event.ftp_record.login_id")
			{
				$("#Iftp_user").val(val[1]);
				ftp_user = val[1];
			}
			else if(param == "event.ftp_record.password")
			{
				$("#Iftp_passwd").val(val[1]);
				ftp_passwd = val[1];
			}
			else if(param == "event.ftp_record.port")
			{
				$("#Iftp_port").val(val[1]);
				ftp_port = val[1];
			}
			else if (param == "event.ftp_record.scheduled.monday"){
				$("input[name=Mschedule_monday][value='"+val[1]+"']").attr('checked',true);
			} else if (param == "event.ftp_record.scheduled.tuesday"){
				$("input[name=Mschedule_tuesday][value='"+val[1]+"']").attr('checked',true);
			} else if (param == "event.ftp_record.scheduled.wednesday"){
				$("input[name=Nschedule_wednesday][value='"+val[1]+"']").attr('checked',true);
			} else if (param == "event.ftp_record.scheduled.thursday"){
				$("input[name=Nschedule_thursday][value='"+val[1]+"']").attr('checked',true);
			} else if (param == "event.ftp_record.scheduled.friday"){
				$("input[name=Nschedule_friday][value='"+val[1]+"']").attr('checked',true);
			} else if (param == "event.ftp_record.scheduled.saturday"){
				$("input[name=Nschedule_saturday][value='"+val[1]+"']").attr('checked',true);
			} else if (param == "event.ftp_record.scheduled.sunday"){
				$("input[name=Nschedule_sunday][value='"+val[1]+"']").attr('checked',true);
			}
			else if(param == "event.ftp_record.scheduled.shed_1_start")
			{
				var value;
				confList = "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23".split(',');
				if(val[1] == 24)
					value = "0";
				else
					value = val[1];
				$("#Msch_1_s").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == value)
						$("#Msch_1_s").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
					else
						$("#Msch_1_s").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});
			}
			else if(param == "event.ftp_record.scheduled.shed_1_end")
			{
				var value;
				confList = "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23".split(',');
				if(val[1] == 24)
					value = "0";
				else
					value = val[1];
				$("#Msch_1_e").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == value)
						$("#Msch_1_e").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
					else
						$("#Msch_1_e").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});
			}
			else if(param == "event.ftp_record.scheduled.shed_2_start")
			{
				var value;
				confList = "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23".split(',');
				if(val[1] == 24)
					value = "0";
				else
					value = val[1];
				$("#Msch_2_s").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == value)
						$("#Msch_2_s").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
					else
						$("#Msch_2_s").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});
			}
			else if(param == "event.ftp_record.scheduled.shed_2_end")
			{
				var value;
				confList = "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23".split(',');
				if(val[1] == 24)
					value = "0";
				else
					value = val[1];
				$("#Msch_2_e").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == value)
						$("#Msch_2_e").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
					else
						$("#Msch_2_e").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});
			}
			else if(param == "event.ftp_record.scheduled.cycle")
			{
				confList = "5,10,30,60,90,120".split(',');
				$("#Isch_cycle").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == val[1])
						$("#Isch_cycle").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
					else
						$("#Isch_cycle").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});
			}
			else if(param == "event.ftp_record.scheduled.file_name")
			{
				$("#Isch_file_name").val(val[1]);
				sch_file_name = val[1];
			}
			else if(param == "event.ftp_record.scheduled.server_path")
			{
				$("#Isch_server_path").val(val[1]);
				sch_server_path = val[1];
			}
			else if(param == "event.ftp_record.alarm.pre_recording_frame")
			{
				confList = "0,1,3,5,10".split(',');
				$("#Ipre_recod_frame_alarm").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == val[1])
						$("#Ipre_recod_frame_alarm").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
					else
						$("#Ipre_recod_frame_alarm").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});
			}
			else if(param == "event.ftp_record.alarm.pre_recording_cycle")
			{
				confList = "1,2,5,10,30".split(',');
				$("#Ipre_recod_cycle_alarm").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == val[1])
						$("#Ipre_recod_cycle_alarm").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
					else
						$("#Ipre_recod_cycle_alarm").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});
			}
			else if(param == "event.ftp_record.alarm.recording_frame")
			{
				confList = "1,2,5,10,30,60".split(',');
				$("#Irecod_frame_alarm").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == val[1])
						$("#Irecod_frame_alarm").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
					else
						$("#Irecod_frame_alarm").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});
			}
			else if(param == "event.ftp_record.alarm.recording_cycle")
			{
				confList = "2,5,10,30,60,90,120".split(',');
				$("#Irecod_cycle_alarm").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == val[1])
						$("#Irecod_cycle_alarm").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
					else
						$("#Irecod_cycle_alarm").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});
			}
			else if(param == "event.ftp_record.alarm.file_name")
			{
				$("#Irecord_file_name_alarm").val(val[1]);
				record_alarm_file_name = val[1];
			}
			else if(param == "event.ftp_record.alarm.server_path")
			{
				$("#Irecord_server_path_alarm").val(val[1]);
				record_alarm_server_path = val[1];
			}
			else if(param == "event.ftp_record.motion.pre_recording_frame")
			{
				confList = "0,1,3,5,10".split(',');
				$("#Ipre_recod_frame_motion").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == val[1])
						$("#Ipre_recod_frame_motion").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
					else
						$("#Ipre_recod_frame_motion").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});
			}
			else if(param == "event.ftp_record.motion.pre_recording_cycle")
			{
				confList = "1,2,5,10,30".split(',');
				$("#Ipre_recod_cycle_motion").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == val[1])
						$("#Ipre_recod_cycle_motion").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
					else
						$("#Ipre_recod_cycle_motion").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});
			}
			else if(param == "event.ftp_record.motion.recording_frame")
			{
				confList = "1,2,5,10,30,60".split(',');
				$("#Irecod_frame_motion").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == val[1])
						$("#Irecod_frame_motion").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
					else
						$("#Irecod_frame_motion").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});
			}
			else if(param == "event.ftp_record.motion.recording_cycle")
			{
				confList = "2,5,10,30,60,90,120".split(',');
				$("#Irecod_cycle_motion").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == val[1])
						$("#Irecod_cycle_motion").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
					else
						$("#Irecod_cycle_motion").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});
			}
			else if(param == "event.ftp_record.motion.file_name")
			{
				$("#Irecord_file_name_motion").val(val[1]);
				record_motion_file_name = val[1];
			}
			else if(param == "event.ftp_record.motion.server_path")
			{
				$("#Irecord_server_path_motion").val(val[1]);
				record_motion_server_path = val[1];
			}
			else if(param == "system.sd.mount_status")
				sd_flag = val[1];
			else if(param == "image.encode.current_profile_id")
				current_profile = val[1];
			else if(param == "image.encode.profile1.encode")
				profile1 = val[1];
			else if(param == "image.encode.profile2.encode")
				profile2 = val[1];
			else if(param == "image.encode.profile3.encode")
				profile3 = val[1];
			else if(param == "image.encode.profile4.encode")
				profile4 = val[1];
			else if(param == "image.encode.profile5.encode")
				profile5 = val[1];
			else if(param == "image.encode.profile6.encode")
				profile6 = val[1];
			else if(param == "event.ftp_record.port.query_range")
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

				$("#Iftp_port_range")[0].innerHTML 	= "("+port_range[0]+"~"+port_range[1]+")";
			}
		});
	};
	$.fn._Go = function(){
		$.fn._InitialPageLang();
		$.fn._InitialCondtionCtrl();
		$.fn._InitialFunc();
		$('#reloading_container').hide();
		$('#container').show();
	};
	$.fn._InitialPageLang = function(){
		$("#Mftp_condition_title")[0].innerHTML 		= $.fn._GetLangStr(LT._FTP_Record_Conditions);
		$("#Mftp_condition")[0].innerHTML 				= $.fn._GetLangStr(LT._Recording_Mode)+":";
		$("#IFTP_Condition1_Scheduled")[0].innerHTML 	= $.fn._GetLangStr(LT._Scheduled);
		$("#IFTP_Condition1_AlarmIn")[0].innerHTML 		= $.fn._GetLangStr(LT._Alarm_In);
		$("#IFTP_Condition1_Motion")[0].innerHTML 		= $.fn._GetLangStr(LT._Motion);
		$("#IFTP_Condition1_Off")[0].innerHTML 			= $.fn._GetLangStr(LT._OFF);
		$("#Mftp_schedule_table")[0].innerHTML 			= $.fn._GetLangStr(LT._OFF);
		$("#Mftp_server")[0].innerHTML 					= $.fn._GetLangStr(LT._FTP_Server)+":";
		$("#Mftp_addr")[0].innerHTML 					= $.fn._GetLangStr(LT._FTP_Server)+":";
		$("#Mftp_user")[0].innerHTML 					= $.fn._GetLangStr(LT._Login_ID)+":";
		$("#Mftp_passwd")[0].innerHTML 					= $.fn._GetLangStr(LT._Password)+":";
		$("#Mftp_port")[0].innerHTML 					= $.fn._GetLangStr(LT._Port)+":";
		$("#Mftp_schedule_table")[0].innerHTML 			= $.fn._GetLangStr(LT._Scheduled_Recording_Table);
		$("#Moff")[0].innerHTML 						= $.fn._GetLangStr(LT._OFF);
		$("#Mall_day")[0].innerHTML 					= $.fn._GetLangStr(LT._All_Day);
		$("#Mscheduled_1")[0].innerHTML 				= $.fn._GetLangStr(LT._Scheduled)+"1";
		$("#Mscheduled_2")[0].innerHTML 				= $.fn._GetLangStr(LT._Scheduled)+"2";
		$("#Mmonday")[0].innerHTML 						= $.fn._GetLangStr(LT._Monday);
		$("#Mtuesday")[0].innerHTML 					= $.fn._GetLangStr(LT._Tuesday);
		$("#Mwednesday")[0].innerHTML 					= $.fn._GetLangStr(LT._Wednesday);
		$("#Mthursday")[0].innerHTML 					= $.fn._GetLangStr(LT._Thursday);
		$("#Mfirday")[0].innerHTML 						= $.fn._GetLangStr(LT._Friday);
		$("#Msaturday")[0].innerHTML 					= $.fn._GetLangStr(LT._Saturday);
		$("#Msunday")[0].innerHTML 						= $.fn._GetLangStr(LT._Sunday);
		$("#Msch_1")[0].innerHTML 						= $.fn._GetLangStr(LT._Schedule)+"1:";
		$("#Msch_2")[0].innerHTML 						= $.fn._GetLangStr(LT._Schedule)+"2:";
		$("#Msch_1_start")[0].innerHTML 				= $.fn._GetLangStr(LT._Start);
		$("#Msch_1_end")[0].innerHTML 					= $.fn._GetLangStr(LT._Stop);
		$("#Msch_2_start")[0].innerHTML 				= $.fn._GetLangStr(LT._Start);
		$("#Msch_2_end")[0].innerHTML 					= $.fn._GetLangStr(LT._Stop);
		$("#Msch_cycle")[0].innerHTML 					= $.fn._GetLangStr(LT._Recording_Cycle)+":";
		$("#Msch_file_name")[0].innerHTML 				= $.fn._GetLangStr(LT._Record_File_Name)+":";
		$("#Msch_server_path")[0].innerHTML 			= $.fn._GetLangStr(LT._Server_Path)+":";
		$("#Malarm_setting")[0].innerHTML 				= $.fn._GetLangStr(LT._Alarm_Setting);
		$("#Mpre_recod_frame_alarm")[0].innerHTML 		= $.fn._GetLangStr(LT._Pre_Recording_Frame)+":";
		$("#Mpre_recod_cycle_alarm")[0].innerHTML 		= $.fn._GetLangStr(LT._Pre_Recording_Cycle)+":";
		$("#Mrecod_frame_alarm")[0].innerHTML 			= $.fn._GetLangStr(LT._Recording_Frame)+":";
		$("#Mrecod_cycle_alarm")[0].innerHTML 			= $.fn._GetLangStr(LT._Recording_Cycle)+":";
		$("#Mrecord_file_name_alarm")[0].innerHTML 		= $.fn._GetLangStr(LT._File_Name)+":";
		$("#Mrecord_server_path_alarm")[0].innerHTML 	= $.fn._GetLangStr(LT._Server_Path)+":";
		$("#Mmotion_setting")[0].innerHTML 				= $.fn._GetLangStr(LT._Motion_Setting);
		$("#Mpre_recod_frame_motion")[0].innerHTML 		= $.fn._GetLangStr(LT._Pre_Recording_Frame)+":";
		$("#Mpre_recod_cycle_motion")[0].innerHTML 		= $.fn._GetLangStr(LT._Pre_Recording_Cycle)+":";
		$("#Mrecod_frame_motion")[0].innerHTML 			= $.fn._GetLangStr(LT._Recording_Frame)+":";
		$("#Mrecod_cycle_motion")[0].innerHTML 			= $.fn._GetLangStr(LT._Recording_Cycle)+":";
		$("#Mrecord_file_name_motion")[0].innerHTML 	= $.fn._GetLangStr(LT._File_Name)+":";
		$("#Mrecord_server_path_motion")[0].innerHTML 	= $.fn._GetLangStr(LT._Server_Path)+":";
	};

	$.fn._InitialCondtionCtrl = function()
	{
		$("input[name=Nftp_condition]").change(function(){
			if($(this).val() == "scheduled")
			{
				$("#Mftp_schedule_table").parent().show();
				$("#Moff").parent().parent().parent().parent().parent().show();
				$("#Msch_1_start").parent().show();
				$("#Msch_2_start").parent().show();
				$("#Msch_cycle").parent().show();
				$("#Msch_file_name").parent().show();
				$("#Msch_server_path").parent().show();
				
				//if(model_alarm == 1)
				{
					$("#Malarm_setting").parent().hide();
					$("#Mpre_recod_frame_alarm").parent().hide();
					$("#Mpre_recod_cycle_alarm").parent().hide();
					$("#Mrecod_frame_alarm").parent().hide();
					$("#Mrecod_cycle_alarm").parent().hide();
					$("#Mrecord_file_name_alarm").parent().hide();
					$("#Mrecord_server_path_alarm").parent().hide();
				}
				
				$("#Mmotion_setting").parent().hide();
				$("#Mpre_recod_frame_motion").parent().hide();
				$("#Mpre_recod_cycle_motion").parent().hide();
				$("#Mrecod_frame_motion").parent().hide();
				$("#Mrecod_cycle_motion").parent().hide();
				$("#Mrecord_file_name_motion").parent().hide();
				$("#Mrecord_server_path_motion").parent().hide();
			}
			else if($(this).val() == "alarm_in")
			{
				$("#Mftp_schedule_table").parent().hide();
				$("#Moff").parent().parent().parent().parent().parent().hide();
				$("#Msch_1_start").parent().hide();
				$("#Msch_2_start").parent().hide();
				$("#Msch_cycle").parent().hide();
				$("#Msch_file_name").parent().hide();
				$("#Msch_server_path").parent().hide();
				
				if(model_alarm == 1)
				{
					$("#Malarm_setting").parent().show();
					$("#Mpre_recod_frame_alarm").parent().show();
					$("#Mpre_recod_cycle_alarm").parent().show();
					$("#Mrecod_frame_alarm").parent().show();
					$("#Mrecod_cycle_alarm").parent().show();
					$("#Mrecord_file_name_alarm").parent().show();
					$("#Mrecord_server_path_alarm").parent().show();
				}
				
				$("#Mmotion_setting").parent().hide();
				$("#Mpre_recod_frame_motion").parent().hide();
				$("#Mpre_recod_cycle_motion").parent().hide();
				$("#Mrecod_frame_motion").parent().hide();
				$("#Mrecod_cycle_motion").parent().hide();
				$("#Mrecord_file_name_motion").parent().hide();
				$("#Mrecord_server_path_motion").parent().hide();
			}
			else if($(this).val() == "motion")
			{
				$("#Mftp_schedule_table").parent().hide();
				$("#Moff").parent().parent().parent().parent().parent().hide();
				$("#Msch_1_start").parent().hide();
				$("#Msch_2_start").parent().hide();
				$("#Msch_cycle").parent().hide();
				$("#Msch_file_name").parent().hide();
				$("#Msch_server_path").parent().hide();

				//if(model_alarm == 1)
				{
					$("#Malarm_setting").parent().hide();
					$("#Mpre_recod_frame_alarm").parent().hide();
					$("#Mpre_recod_cycle_alarm").parent().hide();
					$("#Mrecod_frame_alarm").parent().hide();
					$("#Mrecod_cycle_alarm").parent().hide();
					$("#Mrecord_file_name_alarm").parent().hide();
					$("#Mrecord_server_path_alarm").parent().hide();
				}
				
				$("#Mmotion_setting").parent().show();
				$("#Mpre_recod_frame_motion").parent().show();
				$("#Mpre_recod_cycle_motion").parent().show();
				$("#Mrecod_frame_motion").parent().show();
				$("#Mrecod_cycle_motion").parent().show();
				$("#Mrecord_file_name_motion").parent().show();
				$("#Mrecord_server_path_motion").parent().show();
			}
			else if($(this).val() == "off")
			{
				$("#Mftp_schedule_table").parent().hide();
				$("#Moff").parent().parent().parent().parent().parent().hide();
				$("#Msch_1_start").parent().hide();
				$("#Msch_2_start").parent().hide();
				$("#Msch_cycle").parent().hide();
				$("#Msch_file_name").parent().hide();
				$("#Msch_server_path").parent().hide();
				$("#Malarm_setting").parent().hide();
				$("#Mpre_recod_frame_alarm").parent().hide();
				$("#Mpre_recod_cycle_alarm").parent().hide();
				$("#Mrecod_frame_alarm").parent().hide();
				$("#Mrecod_cycle_alarm").parent().hide();
				$("#Mrecord_file_name_alarm").parent().hide();
				$("#Mrecord_server_path_alarm").parent().hide();
				$("#Mmotion_setting").parent().hide();
				$("#Mpre_recod_frame_motion").parent().hide();
				$("#Mpre_recod_cycle_motion").parent().hide();
				$("#Mrecod_frame_motion").parent().hide();
				$("#Mrecod_cycle_motion").parent().hide();
				$("#Mrecord_file_name_motion").parent().hide();
				$("#Mrecord_server_path_motion").parent().hide();
			}
		});

		$("input[name=Nftp_condition]:checked").change();
	};

	$.fn._InitialFunc = function()
	{
		var Invalid_input_regex = /^\s*[^\"]+\s*$/;
		var port_regex = /^\d{1,5}$/;
		var command = "";
		$("#Iftp_addr").change(function(){
			var value = $(this).val();
			if((value.length < 2 || value.length > 128)||!Invalid_input_regex.test(value)){
				$(this).val(ftp_server);
			}

			ftp_server = $(this).val();
		});

		$("#Iftp_user").change(function(){
			var value = $(this).val();
			if((value.length < 2 || value.length > 40)||!Invalid_input_regex.test(value)){
				$(this).val(ftp_user);
			}

			ftp_user = $(this).val();
		});

		$("#Iftp_passwd").change(function(){
			var value = $(this).val();
			if((value.length < 2 || value.length > 40)||!Invalid_input_regex.test(value)){
				$(this).val(ftp_passwd);
			}

			ftp_passwd = $(this).val();
		});

		$("#Iftp_port").change(function(){
			var value = $(this).val();
			if((parseInt(value) < port_range[0])||(parseInt(value) > port_range[1])||!port_regex.test(value)){
				$(this).val(ftp_port);
			}

			ftp_port = $(this).val();
		});

		$("#Isch_file_name").change(function(){
			var value = $(this).val();
			if((value.length < 2 || value.length > 100)||!Invalid_input_regex.test(value)){
				$(this).val(sch_file_name);
			}

			sch_file_name = $(this).val();
		});

		$("#Isch_server_path").change(function(){
			var value = $(this).val();
			if((value.length < 1 || value.length > 100)||!Invalid_input_regex.test(value)){
				$(this).val(sch_server_path);
			}

			sch_server_path = $(this).val();
		});

		$("#Irecord_file_name_alarm").change(function(){
			var value = $(this).val();
			if((value.length < 2 || value.length > 100)||!Invalid_input_regex.test(value)){
				$(this).val(record_alarm_file_name);
			}

			record_alarm_file_name = $(this).val();
		});

		$("#Irecord_server_path_alarm").change(function(){
			var value = $(this).val();
			if((value.length < 1 || value.length > 100)||!Invalid_input_regex.test(value)){
				$(this).val(record_alarm_server_path);
			}

			record_alarm_server_path = $(this).val();
		});


		$("#Irecord_file_name_motion").change(function(){
			var value = $(this).val();
			if((value.length < 2 || value.length > 100)||!Invalid_input_regex.test(value)){
				$(this).val(record_motion_file_name);
			}

			record_motion_file_name = $(this).val();
		});

		$("#Irecord_server_path_motion").change(function(){
			var value = $(this).val();
			if((value.length < 1 || value.length > 100)||!Invalid_input_regex.test(value)){
				$(this).val(record_motion_server_path);
			}

			record_motion_server_path = $(this).val();
		});

		$("#Icon_setting_save_pic").bind('click', function(){

			if($("input[type=radio][name=Nftp_condition]:checked").val() == "scheduled")
			{	
				var sch_1_start, sch_2_start, sch_1_end, sch_2_end;

				if($("#Msch_1_s").val() == 0)
					sch_1_start = 24;
				else
					sch_1_start = $("#Msch_1_s").val();

				if($("#Msch_2_s").val() == 0)
					sch_2_start = 24;
				else
					sch_2_start = $("#Msch_2_s").val();

				if($("#Msch_1_e").val() == 0)
					sch_1_end = 24;
				else
					sch_1_end = $("#Msch_1_e").val();

				if($("#Msch_2_e").val() == 0)
					sch_2_end = 24;
				else
					sch_2_end = $("#Msch_2_e").val();
					
				command = 	"event.ftp_record.conditions"					+"="+	"scheduled"														+"&"+
							"event.ftp_record.scheduled.monday"				+"="+	$("input[type=radio][name=Mschedule_monday]:checked").val()		+"&"+
							"event.ftp_record.scheduled.tuesday"			+"="+	$("input[type=radio][name=Mschedule_tuesday]:checked").val()	+"&"+
							"event.ftp_record.scheduled.wednesday"			+"="+	$("input[type=radio][name=Nschedule_wednesday]:checked").val()	+"&"+
							"event.ftp_record.scheduled.thursday"			+"="+	$("input[type=radio][name=Nschedule_thursday]:checked").val()	+"&"+
							"event.ftp_record.scheduled.friday"				+"="+	$("input[type=radio][name=Nschedule_friday]:checked").val()		+"&"+
							"event.ftp_record.scheduled.saturday"			+"="+	$("input[type=radio][name=Nschedule_saturday]:checked").val()	+"&"+
							"event.ftp_record.scheduled.sunday"				+"="+	$("input[type=radio][name=Nschedule_sunday]:checked").val()		+"&"+
							"event.ftp_record.scheduled.shed_1_start"		+"="+	sch_1_start														+"&"+	
							"event.ftp_record.scheduled.shed_2_start"		+"="+	sch_2_start														+"&"+
							"event.ftp_record.scheduled.shed_1_end"			+"="+	sch_1_end														+"&"+
							"event.ftp_record.scheduled.shed_2_end"			+"="+	sch_2_end														+"&"+
							"event.ftp_record.scheduled.cycle"				+"="+	$("#Isch_cycle").val()											+"&"+
							"event.ftp_record.scheduled.file_name"			+"="+	$("#Isch_file_name").val()										+"&"+
							"event.ftp_record.scheduled.server_path"		+"="+	$("#Isch_server_path").val()									+"&";
			}
			else if($("input[type=radio][name=Nftp_condition]:checked").val() == "alarm_in")
			{
				command = 	"event.ftp_record.conditions"					+"="+	"alarm_in"														+"&"+
							"event.ftp_record.alarm.pre_recording_frame"	+"="+	$("#Ipre_recod_frame_alarm").val()								+"&"+
							"event.ftp_record.alarm.pre_recording_cycle"	+"="+	$("#Ipre_recod_cycle_alarm").val()								+"&"+
							"event.ftp_record.alarm.recording_frame"		+"="+	$("#Irecod_frame_alarm").val()									+"&"+
							"event.ftp_record.alarm.recording_cycle"		+"="+	$("#Irecod_cycle_alarm").val()									+"&"+
							"event.ftp_record.alarm.file_name"				+"="+	$("#Irecord_file_name_alarm").val()								+"&"+
							"event.ftp_record.alarm.server_path"			+"="+	$("#Irecord_server_path_alarm").val()							+"&";
			}
			else if($("input[type=radio][name=Nftp_condition]:checked").val() == "motion")
			{
				command = 	"event.ftp_record.conditions"					+"="+	"motion"														+"&"+
							"event.ftp_record.motion.pre_recording_frame"	+"="+	$("#Ipre_recod_frame_motion").val()								+"&"+
							"event.ftp_record.motion.pre_recording_cycle"	+"="+	$("#Ipre_recod_cycle_motion").val()								+"&"+
							"event.ftp_record.motion.recording_frame"		+"="+	$("#Irecod_frame_motion").val()									+"&"+
							"event.ftp_record.motion.recording_cycle"		+"="+	$("#Irecod_cycle_motion").val()									+"&"+
							"event.ftp_record.motion.file_name"				+"="+	$("#Irecord_file_name_motion").val()							+"&"+
							"event.ftp_record.motion.server_path"			+"="+	$("#Irecord_server_path_motion").val()							+"&";
			}
			else if($("input[type=radio][name=Nftp_condition]:checked").val() == "off")
			{
				command = 	"event.ftp_record.conditions"					+"="+	"off"															+"&";
			}

			command = command +	"event.ftp_record.server_name"				+"="+	$("#Iftp_addr").val()		+"&"+
								"event.ftp_record.login_id"					+"="+	$("#Iftp_user").val()		+"&"+
								"event.ftp_record.password"					+"="+	$("#Iftp_passwd").val()		+"&"+
								"event.ftp_record.port"						+"="+	$("#Iftp_port").val()		+"&";
		
			$.fn._SetParamByMask(command, $.fn._GetLangStr(LT._Reloading), 7000);
		});
		
		$("#Icon_setting_default_pic").bind('click', function(){
			if(confirm($.fn._GetLangStr(LT._Reset_to_default_Warning))){
				$.fn._DefaultParam( $.fn._GetLangStr(LT._Reloading), 5000);
			}
		});
	};
})(jQuery);