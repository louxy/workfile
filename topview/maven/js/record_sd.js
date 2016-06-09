(function($){
	var confList, sd_flag, usage;
	var current_profile, profile1, profile2, profile3, profile4, profile5, profile6;
	var check_thread = null, check = null, stop = 0;
	var day_num = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31";
	var hour_num =	"0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23";
	var minute_num = "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59";
	var week_num = "Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday";
	var num = 3;
	var schedule_month_list = new Array(num);
	var schedule_week_list = new Array(num);
	var schedule_day_list = new Array(num);
	for(var i=0;i<=2;i++){
		schedule_month_list[i] = new Array(num);
		schedule_week_list[i] = new Array(num);
		schedule_day_list[i] = new Array(num);
	}

	var dataQue = [];
	dataQue.push(
		"event.sd_record.schedule.month_1.enable&"+
		"event.sd_record.schedule.month_1.start_time&"+
		"event.sd_record.schedule.month_1.end_time&"+
		"event.sd_record.schedule.month_2.enable&"+
		"event.sd_record.schedule.month_2.start_time&"+
		"event.sd_record.schedule.month_2.end_time&"+
		"event.sd_record.schedule.month_3.enable&"+
		"event.sd_record.schedule.month_3.start_time&"+
		"event.sd_record.schedule.month_3.end_time&"+
		"event.sd_record.schedule.week_1.enable&"+
		"event.sd_record.schedule.week_1.start_time&"+
		"event.sd_record.schedule.week_1.end_time&"+
		"event.sd_record.schedule.week_2.enable&"+
		"event.sd_record.schedule.week_2.start_time&"+
		"event.sd_record.schedule.week_2.end_time&"+
		"event.sd_record.schedule.week_3.enable&"+
		"event.sd_record.schedule.week_3.start_time&"+
		"event.sd_record.schedule.week_3.end_time&"+
		"event.sd_record.schedule.day_1.enable&"+
		"event.sd_record.schedule.day_1.start_time&"+
		"event.sd_record.schedule.day_1.end_time&"+
		"event.sd_record.schedule.day_2.enable&"+
		"event.sd_record.schedule.day_2.start_time&"+
		"event.sd_record.schedule.day_2.end_time&"+
		"event.sd_record.schedule.day_3.enable&"+
		"event.sd_record.schedule.day_3.start_time&"+
		"event.sd_record.schedule.day_3.end_time&"
	);
	
	$.fn._ObjectAssignValue = function(src){
		$.each(src, function(param , val){
			if(param == "event.sd_record.conditions")
			{
				$("input[name=Nrecord_conditions][value='"+val[1]+"']").attr('checked',true);

				if(model_alarm == 0)
				{
					$("input[name=Nrecord_conditions][value='alarm']").hide();
					$("#ISD_Conditions1_Alarm").hide();
				}
			}
			else if(param == "event.sd_record.alarm_recording_time")
			{
				confList = "5,10".split(',');
				$("#Isd_record_time_alarm").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == val[1])
						$("#Isd_record_time_alarm").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
					else
						$("#Isd_record_time_alarm").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});
			}
			else if(param == "event.sd_record.motion_recording_time")
			{
				confList = "5,10".split(',');
				$("#Isd_record_time_motion").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == val[1])
						$("#Isd_record_time_motion").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
					else
						$("#Isd_record_time_motion").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});
			}
			else if(param == "event.sd_record.overwrite")
				$("input[name=Nsd_overwrite][value='"+val[1]+"']").attr('checked',true);
			else if(param == "event.sd_record.record_type")
			{
				confList = "Audio,Video,Both".split(',');
				$("#Isd_record_type").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == val[1])
						$("#Isd_record_type").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
					else
						$("#Isd_record_type").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});
			}
			else if(param == "system.sd.Usage")
			{
				usage = 100-parseInt(val[1]);
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
			else if(param == "event.sd_record.schedule.mode")
			{
				confList = "Forever,Month,Week,Day".split(',');
				$("#Isd_record_schedule_mode").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == val[1])
						$("#Isd_record_schedule_mode").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
					else
						$("#Isd_record_schedule_mode").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});
			}
			else if(param == "event.sd_record.schedule.month_1.enable")
				schedule_month_list[0][0] = val[1];
			else if(param == "event.sd_record.schedule.month_1.start_time")
				schedule_month_list[0][1] = val[1];
			else if(param == "event.sd_record.schedule.month_1.end_time")
				schedule_month_list[0][2] = val[1];
			else if(param == "event.sd_record.schedule.month_2.enable")
				schedule_month_list[1][0] = val[1];
			else if(param == "event.sd_record.schedule.month_2.start_time")
				schedule_month_list[1][1] = val[1];
			else if(param == "event.sd_record.schedule.month_2.end_time")
				schedule_month_list[1][2] = val[1];
			else if(param == "event.sd_record.schedule.month_3.enable")
				schedule_month_list[2][0] = val[1];
			else if(param == "event.sd_record.schedule.month_3.start_time")
				schedule_month_list[2][1] = val[1];
			else if(param == "event.sd_record.schedule.month_3.end_time")
				schedule_month_list[2][2] = val[1];
			else if(param == "event.sd_record.schedule.week_1.enable")
				schedule_week_list[0][0] = val[1];
			else if(param == "event.sd_record.schedule.week_1.start_time")
				schedule_week_list[0][1] = val[1];
			else if(param == "event.sd_record.schedule.week_1.end_time")
				schedule_week_list[0][2] = val[1];
			else if(param == "event.sd_record.schedule.week_2.enable")
				schedule_week_list[1][0] = val[1];
			else if(param == "event.sd_record.schedule.week_2.start_time")
				schedule_week_list[1][1] = val[1];
			else if(param == "event.sd_record.schedule.week_2.end_time")
				schedule_week_list[1][2] = val[1];
			else if(param == "event.sd_record.schedule.week_3.enable")
				schedule_week_list[2][0] = val[1];
			else if(param == "event.sd_record.schedule.week_3.start_time")
				schedule_week_list[2][1] = val[1];
			else if(param == "event.sd_record.schedule.week_3.end_time")
				schedule_week_list[2][2] = val[1];
			else if(param == "event.sd_record.schedule.day_1.enable")
				schedule_day_list[0][0] = val[1];
			else if(param == "event.sd_record.schedule.day_1.start_time")
				schedule_day_list[0][1] = val[1];
			else if(param == "event.sd_record.schedule.day_1.end_time")
				schedule_day_list[0][2] = val[1];
			else if(param == "event.sd_record.schedule.day_2.enable")
				schedule_day_list[1][0] = val[1];
			else if(param == "event.sd_record.schedule.day_2.start_time")
				schedule_day_list[1][1] = val[1];
			else if(param == "event.sd_record.schedule.day_2.end_time")
				schedule_day_list[1][2] = val[1];
			else if(param == "event.sd_record.schedule.day_3.enable")
				schedule_day_list[2][0] = val[1];
			else if(param == "event.sd_record.schedule.day_3.start_time")
				schedule_day_list[2][1] = val[1];
			else if(param == "event.sd_record.schedule.day_3.end_time")
				schedule_day_list[2][2] = val[1];
			else if(param == "event.sd_record.scheduled.monday"){
				$("input[name=Nschedule_monday][value='"+val[1]+"']").attr('checked',true);
			}else if (param == "event.sd_record.scheduled.tuesday"){
				$("input[name=Nschedule_tuesday][value='"+val[1]+"']").attr('checked',true);
			} else if (param == "event.sd_record.scheduled.wednesday"){
				$("input[name=Nschedule_wednesday][value='"+val[1]+"']").attr('checked',true);
			} else if (param == "event.sd_record.scheduled.thursday"){
				$("input[name=Nschedule_thursday][value='"+val[1]+"']").attr('checked',true);
			} else if (param == "event.sd_record.scheduled.friday"){
				$("input[name=Nschedule_friday][value='"+val[1]+"']").attr('checked',true);
			} else if (param == "event.sd_record.scheduled.saturday"){
				$("input[name=Nschedule_saturday][value='"+val[1]+"']").attr('checked',true);
			} else if (param == "event.sd_record.scheduled.sunday"){
				$("input[name=Nschedule_sunday][value='"+val[1]+"']").attr('checked',true);
			}
			else if(param == "event.sd_record.scheduled.shed_1_start"){
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
			else if(param == "event.sd_record.scheduled.shed_1_end")
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
			else if(param == "event.sd_record.scheduled.shed_2_start")
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
			else if(param == "event.sd_record.scheduled.shed_2_end")
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
			else if(param == "event.sd_record.sched_recording_time")
			{
				confList = "5,10,15,20,30,60,120,300".split(',');
				$("#Isch_cycle").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == val[1])
						$("#Isch_cycle").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
					else
						$("#Isch_cycle").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});
			}
			else if(param == "event.schedule_reboot.monday"){
				$("input[name=Rschedule_monday][value='"+val[1]+"']").attr('checked',true);
			}
			else if(param == "event.schedule_reboot.tuesday"){
				$("input[name=Rschedule_tuesday][value='"+val[1]+"']").attr('checked',true);
			}
			else if(param == "event.schedule_reboot.wednesday"){
				$("input[name=Rschedule_wednesday][value='"+val[1]+"']").attr('checked',true);
			}
			else if(param == "event.schedule_reboot.thursday"){
				$("input[name=Rschedule_thursday][value='"+val[1]+"']").attr('checked',true);
			}
			else if(param == "event.schedule_reboot.friday"){
				$("input[name=Rschedule_friday][value='"+val[1]+"']").attr('checked',true);
			}
			else if(param == "event.schedule_reboot.saturday"){
				$("input[name=Rschedule_saturday][value='"+val[1]+"']").attr('checked',true);
			}
			else if(param == "event.schedule_reboot.sunday"){
				$("input[name=Rschedule_sunday][value='"+val[1]+"']").attr('checked',true);
			}
			else if(param == "event.schedule_reboot.hour"){
				confList = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24".split(',');
				$("#Ireboot_time").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == val[1])
						$("#Ireboot_time").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
					else
						$("#Ireboot_time").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});
			}
		});
	};
	$.fn._Go = function(){
		$.fn._InitialPageLang();
		$.fn._CheckCodec();
		$.fn._CheckSDCard();
		//$.fn._InitialScheduleEvent();
		$.fn._InitialCondtionCtrl();
		$.fn._InitialFunc();
		$('#reloading_container').hide();
		$('#container').show();
	};
	$.fn._InitialPageLang = function(){
		$("#Msd_condition_title")[0].innerHTML 			= $.fn._GetLangStr(LT._SD_Record_Conditions);
		$("#Msd_condition")[0].innerHTML 				= $.fn._GetLangStr(LT._Recording_Mode)+":";
		$("#Msd_record_time")[0].innerHTML 				= $.fn._GetLangStr(LT._sd_record_setting);
		$("#Msd_record_time_alarm")[0].innerHTML 		= $.fn._GetLangStr(LT._Alarm_Recording_Time)+":";
		$("#Msd_record_time_motion")[0].innerHTML 		= $.fn._GetLangStr(LT._Motion_Recording_Time)+":";
		$("#Msd_overwrite")[0].innerHTML 				= $.fn._GetLangStr(LT._OverWrite)+":";
		//$("#Msd_record_type")[0].innerHTML 			= $.fn._GetLangStr(LT._record_type)+":";
		$("#Msd_schedule_table")[0].innerHTML 			= $.fn._GetLangStr(LT._Scheduled_Recording_SD_Table);
		$("#Msd_information")[0].innerHTML 				= $.fn._GetLangStr(LT._SD_Card_Information);
		$("#Msd_usage")[0].innerHTML 					= $.fn._GetLangStr(LT._Usage)+":";
		$("#Msd_format")[0].innerHTML 					= $.fn._GetLangStr(LT._SD_Format)+":";
		$("#ISD_Conditions1_Scheduled")[0].innerHTML 	= $.fn._GetLangStr(LT._Scheduled);
		$("#ISD_Conditions1_Alarm")[0].innerHTML 		= $.fn._GetLangStr(LT._Alarm);
		$("#ISD_Conditions1_Motion")[0].innerHTML 		= $.fn._GetLangStr(LT._Motion);
		$("#ISD_Conditions1_NetworkLoss")[0].innerHTML 	= $.fn._GetLangStr(LT._Network_Loss);
		//$("#ISD_Conditions1_Scheduled")[0].innerHTML 	= $.fn._GetLangStr(LT._Scheduled);
		//
		$("#Msd_overwrite_on")[0].innerHTML 			= $.fn._GetLangStr(LT._ON);
		$("#Msd_overwrite_off")[0].innerHTML 			= $.fn._GetLangStr(LT._OFF);
		$("#ISD_Conditions1_Off")[0].innerHTML 			= $.fn._GetLangStr(LT._OFF);
		$("#Msd_edit_month_schedule")[0].innerHTML 		= $.fn._GetLangStr(LT._edit_month_schedule);
		$("#Msd_edit_week_schedule")[0].innerHTML 		= $.fn._GetLangStr(LT._edit_week_schedule);
		$("#Msd_edit_day_schedule")[0].innerHTML 		= $.fn._GetLangStr(LT._edit_day_schedule);
		//$("#Msd_record_schedule_mode")[0].innerHTML 	= $.fn._GetLangStr(LT._Mode)+":";
		// $("#Mmonth_of_group")[0].innerHTML 				= $.fn._GetLangStr(LT._month_group)+":";
		// $("#Mweek_of_group")[0].innerHTML 				= $.fn._GetLangStr(LT._week_group)+":";
		// $("#Mday_of_group")[0].innerHTML 				= $.fn._GetLangStr(LT._day_group)+":";
		$("#ISD_Conditions1_Off")[0].innerHTML 			= $.fn._GetLangStr(LT._OFF);
		$("#ISD_Conditions1_Off")[0].innerHTML 			= $.fn._GetLangStr(LT._OFF);
		$("#Mday")[0].innerHTML 						= $.fn._GetLangStr(LT._Day);
		$("#Mweek")[0].innerHTML 						= $.fn._GetLangStr(LT._week);
		for(var j = 1; j <= 3; j++){
			$("#Mhour_"+j+"")[0].innerHTML 				= $.fn._GetLangStr(LT._hour);
			$("#Mminute_"+j+"")[0].innerHTML 			= $.fn._GetLangStr(LT._minute);
			$("#Mstat_time_"+j+"")[0].innerHTML 		= $.fn._GetLangStr(LT._start_time)+":";
			$("#Mend_time_"+j+"")[0].innerHTML 			= $.fn._GetLangStr(LT._end_time)+":";
			$("#Mto_"+j+"")[0].innerHTML 				= $.fn._GetLangStr(LT._to);
		}
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
		$("#Msch_cycle")[0].innerHTML 					= $.fn._GetLangStr(LT._Recording_Time)+":";
		/*
		$("#Msd_browser_file")[0].innerHTML 			= $.fn._GetLangStr(LT._SD_Card_File_Brpwser);
		$("#Mview_file")[0].innerHTML 					= $.fn._GetLangStr(LT._View_Files);
		*/
		// schedule reboot
		$("#Msd_reboot_table")[0].innerHTML   			= $.fn._GetLangStr(LT._Schedule_Reboot);
		$("#Roff")[0].innerHTML                         = $.fn._GetLangStr(LT._OFF);
		$("#Ron")[0].innerHTML                          = $.fn._GetLangStr(LT._ON);
		$("#Rmonday")[0].innerHTML 						= $.fn._GetLangStr(LT._Monday);
		$("#Rtuesday")[0].innerHTML 					= $.fn._GetLangStr(LT._Tuesday);
		$("#Rwednesday")[0].innerHTML 					= $.fn._GetLangStr(LT._Wednesday);
		$("#Rthursday")[0].innerHTML 					= $.fn._GetLangStr(LT._Thursday);
		$("#Rfirday")[0].innerHTML 						= $.fn._GetLangStr(LT._Friday);
		$("#Rsaturday")[0].innerHTML 					= $.fn._GetLangStr(LT._Saturday);
		$("#Rsunday")[0].innerHTML 						= $.fn._GetLangStr(LT._Sunday);
		$("#Rsch_time")[0].innerHTML                    = $.fn._GetLangStr(LT._Reboot_time)+":";
		// 
		$("#Isd_format").val($.fn._GetLangStr(LT._Format));
		$("#Iview_file").val($.fn._GetLangStr(LT._View));
		$("#Isd_month_schedule_cancel").val($.fn._GetLangStr(LT._close));
		$("#Isd_week_schedule_cancel").val($.fn._GetLangStr(LT._close));
		$("#Isd_day_schedule_cancel").val($.fn._GetLangStr(LT._close));
		$("#Isd_month_schedule_save").val($.fn._GetLangStr(LT._save_event));
		$("#Isd_week_schedule_save").val($.fn._GetLangStr(LT._save_event));
		$("#Isd_day_schedule_save").val($.fn._GetLangStr(LT._save_event));
		//$.fn._InitialOptionLang("Isd_record_type");
		$.fn._InitialOptionLang("Isd_record_schedule_mode");
		$.fn._InitialOptionLang("Iweek_s_day");
		$.fn._InitialOptionLang("Iweek_e_day");
	};

	$.fn._InitialFunc = function()
	{
		if(model_alarm == 0)
			$("#Isd_record_time_alarm").parent().hide();

		// Checking current brosweer has support html5 video or not.
		/*
		if($.fn._identifyBrowser() == "msie")
		{
			var version = parseInt( $.browser.version, 10 );
			if(version >= 9){
				$("#Msd_browser_file").parent().show();
				$("#Mview_file").parent().show();
			}
		}
		else
		{	
			$("#Msd_browser_file").parent().show();
			$("#Mview_file").parent().show();
		}
		*/
		
		var command = "";
		var VW2;
		if(sd_flag == 1)
		{
			$("#progressbar").progressbar({
		    	value: usage
		    }).attr('title',usage+"%");

			$("#Isd_format").attr("disabled",false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
			$("#Iview_file").attr("disabled",false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');

			$("#Isd_format").bind('click', function(){
				if(confirm($.fn._GetLangStr(LT._SD_Card_format))){
					$.fn._SetParamByMask("system.sd.start_format=1", $.fn._GetLangStr(LT._Reloading),300000);
					setTimeout(openCheck,500);
				}
			});
		}
		else 
		{
			$("#progressbar").hide();
			$("#progressbar_note").show();
			$("#progressbar_note")[0].innerHTML 		= $.fn._GetLangStr(LT._no_card);
			$("#Isd_format").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
			$("#Iview_file").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
		}

		$("#Icon_setting_save_pic").bind('click', function(){
			/*
			var record_type;

			if($("#Isd_record_type")[0].selectedIndex == 0)
				record_type = "audio";
			else if($("#Isd_record_type")[0].selectedIndex == 1)
				record_type = "video";
			else if($("#Isd_record_type")[0].selectedIndex == 2)
				record_type = "both";
			*/

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
			
			command =  	"event.sd_record.conditions"		     +"="+	$("input[type=radio][name=Nrecord_conditions]:checked").val()+"&"+
						"event.sd_record.alarm_recording_time"	 +"="+	$("#Isd_record_time_alarm").val()+"&"+
						"event.sd_record.motion_recording_time"	 +"="+	$("#Isd_record_time_motion").val()+"&"+
						"event.sd_record.overwrite"				 +"="+	$("input[type=radio][name=Nsd_overwrite]:checked").val()+"&"+
						"event.sd_record.scheduled.monday"       +"="+  $("input[type=radio][name=Nschedule_monday]:checked").val()+"&"+     
						"event.sd_record.scheduled.tuesday"      +"="+  $("input[type=radio][name=Nschedule_tuesday]:checked").val()+"&"+
						"event.sd_record.scheduled.wednesday"    +"="+  $("input[type=radio][name=Nschedule_wednesday]:checked").val()+"&"+
						"event.sd_record.scheduled.thursday"     +"="+  $("input[type=radio][name=Nschedule_thursday]:checked").val()+"&"+
						"event.sd_record.scheduled.friday"       +"="+  $("input[type=radio][name=Nschedule_friday]:checked").val()+"&"+
						"event.sd_record.scheduled.saturday"     +"="+  $("input[type=radio][name=Nschedule_saturday]:checked").val()+"&"+
						"event.sd_record.scheduled.sunday"       +"="+  $("input[type=radio][name=Nschedule_sunday]:checked").val()+"&"+
						"event.sd_record.scheduled.shed_1_start" +"="+  sch_1_start	+"&"+
						"event.sd_record.scheduled.shed_1_end"   +"="+  sch_1_end   +"&"+
						"event.sd_record.scheduled.shed_2_start" +"="+  sch_2_start +"&"+
						"event.sd_record.scheduled.shed_2_end"   +"="+  sch_2_end   +"&"+
						"event.sd_record.sched_recording_time"   +"="+  $("#Isch_cycle").val() + "&"+
						"event.schedule_reboot.monday"			 +"="+	$("input[type=radio][name=Rschedule_monday]:checked").val()+"&"+
						"event.schedule_reboot.tuesday"		 	 +"="+	$("input[type=radio][name=Rschedule_tuesday]:checked").val()+"&"+
						"event.schedule_reboot.wednesday"		 +"="+	$("input[type=radio][name=Rschedule_wednesday]:checked").val()+"&"+
						"event.schedule_reboot.thursday"		 +"="+	$("input[type=radio][name=Rschedule_thursday]:checked").val()+"&"+
						"event.schedule_reboot.friday"			 +"="+	$("input[type=radio][name=Rschedule_friday]:checked").val()+"&"+
						"event.schedule_reboot.saturday"		 +"="+	$("input[type=radio][name=Rschedule_saturday]:checked").val()+"&"+
						"event.schedule_reboot.sunday"			 +"="+	$("input[type=radio][name=Rschedule_sunday]:checked").val()+"&"+
						"event.schedule_reboot.hour"			 +"="+	$("#Ireboot_time").val()+"&";
						//"event.sd_record.record_type"				+"="+	record_type+"&";

			$.fn._SetParamByMask(command, $.fn._GetLangStr(LT._Reloading), 7000);
		});
		
		$("#Icon_setting_default_pic").bind('click', function(){
			if(confirm($.fn._GetLangStr(LT._Reset_to_default_Warning))){
				$.fn._DefaultParam( $.fn._GetLangStr(LT._Reloading), 5000);
			}
		});

		
		$("#Iview_file").bind('click', function(){
			if(!VW2) 
			{
				VW2 = window.open(""+$.fn._ParserHeader()+"//"+$.fn._ParserIP()+$.fn._ParserPort()+"/www/browser_sdfile.html",'uploadmsg','toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=600,height=450');
			} 
			else if(VW2.closed) 
			{
				VW2 = window.open(""+$.fn._ParserHeader()+"//"+$.fn._ParserIP()+$.fn._ParserPort()+"/www/browser_sdfile.html",'uploadmsg','toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=600,height=450');		
			}
		 	else 
			{
				VW2.focus();
			}
		});

		$("#Imonth_plus").bind('click', function(){
			$.blockUI({ 
				message:$("#edit_month_schedule"),
				css:{
					width:'400px',
					height:'225px',
					cursor:'default',
					top:'25%',
					textAlign:'left'
				},
				overlayCSS:{
					cursor:'default'
				}
			});
		});

		$("#Iweek_plus").bind('click', function(){
			$.blockUI({ 
				message:$("#edit_week_schedule"),
				css:{
					width:'400px',
					height:'225px',
					cursor:'default',
					top:'25%',
					textAlign:'left'
				},
				overlayCSS:{
					cursor:'default'
				}
			});
		});

		$("#Iday_plus").bind('click', function(){
			$.blockUI({ 
				message:$("#edit_day_schedule"),
				css:{
					width:'400px',
					height:'225px',
					cursor:'default',
					top:'25%',
					textAlign:'left'
				},
				overlayCSS:{
					cursor:'default'
				}
			});
		});

		$("#Isd_month_schedule_cancel,#Isd_week_schedule_cancel,#Isd_day_schedule_cancel").bind('click', function(){
			$.unblockUI();
		});

		$("#Isd_month_schedule_save").bind('click', function(){

			//if($.fn._CheckDateTimeValue("month")){
			//	alert("Month's schedule has duplicate, please re-elected other schedule.");
			//	return false;
			//}
			
			var start_time = "", end_time = "";
			start_time = $("#Imonth_s_day").val()+","+$("#Imonth_s_hour").val()+":"+$("#Imonth_s_minute").val();
			end_time = $("#Imonth_e_day").val()+","+$("#Imonth_e_hour").val()+":"+$("#Imonth_e_minute").val();
			var mode = "";
			var num = 1, flag = 0;
			for(i=0;i<=2;i++)
			{
				if(flag == 1)
					break;
				
				for(j=0;j<=2;j++)
				{
					if(schedule_month_list[i][j] == "" && j == 1)
					{
						command = "event.sd_record.schedule.month_"+Number(num+i)+".enable=on&"+
								  "event.sd_record.schedule.month_"+Number(num+i)+".start_time="+start_time+"&"+
								  "event.sd_record.schedule.month_"+Number(num+i)+".end_time="+end_time+"&";
						flag = 1;
						break;
					}
				}
			}

			if($("#Isd_record_schedule_mode")[0].selectedIndex == 1)
				mode = "month";
			else if($("#Isd_record_schedule_mode")[0].selectedIndex == 2)
				mode = "week";
			else if($("#Isd_record_schedule_mode")[0].selectedIndex == 3)
				mode = "day";
			
			command = command + "event.sd_record.schedule.mode" + "=" + mode;
			
			$.fn._SDScheduleSetting(command, $.fn._GetLangStr(LT._Reloading), 4000);
		});

		$("#Isd_week_schedule_save").bind('click', function(){

			//if($.fn._CheckDateTimeValue("week")){
			//	alert("Week's schedule has duplicate, please re-elected other schedule.");
			//	return false;
			//}
			
			var start_time = "", end_time = "", week_s_index = -1, week_e_index = -1;
			week_s_index = $("#Iweek_s_day")[0].selectedIndex+1;
			week_e_index = $("#Iweek_e_day")[0].selectedIndex+1;
			
			start_time = week_s_index+","+$("#Iweek_s_hour").val()+":"+$("#Iweek_s_minute").val();
			end_time = week_e_index+","+$("#Iweek_e_hour").val()+":"+$("#Iweek_e_minute").val();
			var mode = "";
			var num = 1, flag = 0;
			for(i=0;i<=2;i++)
			{
				if(flag == 1)
					break;
				
				for(j=0;j<=2;j++)
				{
					if(schedule_week_list[i][j] == "" && j == 1)
					{
						command = "event.sd_record.schedule.week_"+Number(num+i)+".enable=on&"+
								  "event.sd_record.schedule.week_"+Number(num+i)+".start_time="+start_time+"&"+
								  "event.sd_record.schedule.week_"+Number(num+i)+".end_time="+end_time+"&";
						flag = 1;
						break;
					}
				}
			}

			if($("#Isd_record_schedule_mode")[0].selectedIndex == 1)
				mode = "month";
			else if($("#Isd_record_schedule_mode")[0].selectedIndex == 2)
				mode = "week";
			else if($("#Isd_record_schedule_mode")[0].selectedIndex == 3)
				mode = "day";
			
			command = command + "event.sd_record.schedule.mode" + "=" + mode;
			
			$.fn._SDScheduleSetting(command, $.fn._GetLangStr(LT._Reloading), 4000);
		});

		$("#Isd_day_schedule_save").bind('click', function(){

			//if($.fn._CheckDateTimeValue("day")){
			//	alert("Day's schedule has duplicate, please re-elected other schedule.");
			//	return false;
			//}
			
			var start_time = "", end_time = "";
			start_time = $("#Iday_s_hour").val()+":"+$("#Iday_s_minute").val();
			end_time = $("#Iday_e_hour").val()+":"+$("#Iday_e_minute").val();
			var mode = "";
			var num = 1, flag = 0;
			for(i=0;i<=2;i++)
			{
				if(flag == 1)
					break;
				
				for(j=0;j<=2;j++)
				{
					if(schedule_day_list[i][j] == "" && j == 1)
					{
						command = "event.sd_record.schedule.day_"+Number(num+i)+".enable=on&"+
								  "event.sd_record.schedule.day_"+Number(num+i)+".start_time="+start_time+"&"+
								  "event.sd_record.schedule.day_"+Number(num+i)+".end_time="+end_time+"&";
						flag = 1;
						break;
					}
				}
			}

			if($("#Isd_record_schedule_mode")[0].selectedIndex == 1)
				mode = "month";
			else if($("#Isd_record_schedule_mode")[0].selectedIndex == 2)
				mode = "week";
			else if($("#Isd_record_schedule_mode")[0].selectedIndex == 3)
				mode = "day";
			
			command = command + "event.sd_record.schedule.mode" + "=" + mode;
			
			$.fn._SDScheduleSetting(command, $.fn._GetLangStr(LT._Reloading), 4000);
		});
	};

	$.fn.CloseWindow = function()
	{
		$.ajax({
			url:'/cgi-bin/get?'+dataQue,
			dataType:'json',
			cache:false,
			success:function(data){
				$.each(data, function(param , val){
					if(param == "event.sd_record.schedule.month_1.enable")
						schedule_month_list[0][0] = val[1];
					else if(param == "event.sd_record.schedule.month_1.start_time")
						schedule_month_list[0][1] = val[1];
					else if(param == "event.sd_record.schedule.month_1.end_time")
						schedule_month_list[0][2] = val[1];
					else if(param == "event.sd_record.schedule.month_2.enable")
						schedule_month_list[1][0] = val[1];
					else if(param == "event.sd_record.schedule.month_2.start_time")
						schedule_month_list[1][1] = val[1];
					else if(param == "event.sd_record.schedule.month_2.end_time")
						schedule_month_list[1][2] = val[1];
					else if(param == "event.sd_record.schedule.month_3.enable")
						schedule_month_list[2][0] = val[1];
					else if(param == "event.sd_record.schedule.month_3.start_time")
						schedule_month_list[2][1] = val[1];
					else if(param == "event.sd_record.schedule.month_3.end_time")
						schedule_month_list[2][2] = val[1];
					else if(param == "event.sd_record.schedule.week_1.enable")
						schedule_week_list[0][0] = val[1];
					else if(param == "event.sd_record.schedule.week_1.start_time")
						schedule_week_list[0][1] = val[1];
					else if(param == "event.sd_record.schedule.week_1.end_time")
						schedule_week_list[0][2] = val[1];
					else if(param == "event.sd_record.schedule.week_2.enable")
						schedule_week_list[1][0] = val[1];
					else if(param == "event.sd_record.schedule.week_2.start_time")
						schedule_week_list[1][1] = val[1];
					else if(param == "event.sd_record.schedule.week_2.end_time")
						schedule_week_list[1][2] = val[1];
					else if(param == "event.sd_record.schedule.week_3.enable")
						schedule_week_list[2][0] = val[1];
					else if(param == "event.sd_record.schedule.week_3.start_time")
						schedule_week_list[2][1] = val[1];
					else if(param == "event.sd_record.schedule.week_3.end_time")
						schedule_week_list[2][2] = val[1];
					else if(param == "event.sd_record.schedule.day_1.enable")
						schedule_day_list[0][0] = val[1];
					else if(param == "event.sd_record.schedule.day_1.start_time")
						schedule_day_list[0][1] = val[1];
					else if(param == "event.sd_record.schedule.day_1.end_time")
						schedule_day_list[0][2] = val[1];
					else if(param == "event.sd_record.schedule.day_2.enable")
						schedule_day_list[1][0] = val[1];
					else if(param == "event.sd_record.schedule.day_2.start_time")
						schedule_day_list[1][1] = val[1];
					else if(param == "event.sd_record.schedule.day_2.end_time")
						schedule_day_list[1][2] = val[1];
					else if(param == "event.sd_record.schedule.day_3.enable")
						schedule_day_list[2][0] = val[1];
					else if(param == "event.sd_record.schedule.day_3.start_time")
						schedule_day_list[2][1] = val[1];
					else if(param == "event.sd_record.schedule.day_3.end_time")
						schedule_day_list[2][2] = val[1];
				});
			},
			error:function(xhr, textStatus, errorThrown){
			},
			complete:function(){
				$("input[name=Nrecord_conditions]:checked").change();
				$.unblockUI();
			}
		});
	};

	$.fn._GenerateOption = function()
	{
		confList = day_num.split(',');
		$("#Imonth_s_day").find('option').remove();
		$.each(confList, function(n){
			$("#Imonth_s_day").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
		});

		$("#Imonth_e_day").find('option').remove();
		$.each(confList, function(n){
			$("#Imonth_e_day").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
		});

		confList = week_num.split(',');
		$("#Iweek_s_day").find('option').remove();
		$.each(confList, function(n){
			$("#Iweek_s_day").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
		});

		$("#Iweek_e_day").find('option').remove();
		$.each(confList, function(n){
			$("#Iweek_e_day").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
		});

		confList = hour_num.split(',');
		$("#Imonth_s_hour").find('option').remove();
		$.each(confList, function(n){
			$("#Imonth_s_hour").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
		});

		$("#Imonth_e_hour").find('option').remove();
		$.each(confList, function(n){
			$("#Imonth_e_hour").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
		});

		$("#Iweek_s_hour").find('option').remove();
		$.each(confList, function(n){
			$("#Iweek_s_hour").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
		});

		$("#Iweek_e_hour").find('option').remove();
		$.each(confList, function(n){
			$("#Iweek_e_hour").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
		});

		$("#Iday_s_hour").find('option').remove();
		$.each(confList, function(n){
			$("#Iday_s_hour").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
		});

		$("#Iday_e_hour").find('option').remove();
		$.each(confList, function(n){
			$("#Iday_e_hour").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
		});

		confList = minute_num.split(',');
		$("#Imonth_s_minute").find('option').remove();
		$.each(confList, function(n){
			$("#Imonth_s_minute").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
		});

		$("#Imonth_e_minute").find('option').remove();
		$.each(confList, function(n){
			$("#Imonth_e_minute").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
		});

		$("#Iweek_s_minute").find('option').remove();
		$.each(confList, function(n){
			$("#Iweek_s_minute").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
		});

		$("#Iweek_e_minute").find('option').remove();
		$.each(confList, function(n){
			$("#Iweek_e_minute").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
		});

		$("#Iday_s_minute").find('option').remove();
		$.each(confList, function(n){
			$("#Iday_s_minute").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
		});

		$("#Iday_e_minute").find('option').remove();
		$.each(confList, function(n){
			$("#Iday_e_minute").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
		});
	};

	$.fn._InitialScheduleEvent = function()
	{
		//Initial schedule date time option
		$.fn._GenerateOption();
		
		//Initial table elements
		var $Isd_record_schedule_list_of_month = $("#Isd_record_schedule_list_of_month").children("tbody");
		var $Isd_record_schedule_list_of_week = $("#Isd_record_schedule_list_of_week").children("tbody");
		var $Isd_record_schedule_list_of_day = $("#Isd_record_schedule_list_of_day").children("tbody");
		var $tr_m = $("<tr style=\"background-color:#c3c3c3\"></tr>");
		$("<td><span class=\"spantex\" id=\"Ino_m\"></span></td>").appendTo($tr_m);
		$("<td><span class=\"spantex\" id=\"Istatus_m\"></span></td>").appendTo($tr_m);
		$("<td><span class=\"spantex\" id=\"Itime_m\"></span></td>").appendTo($tr_m);
		$("<td width=\"3%\"><img src=\"/css/images/plus.png\" width=\"20\" height=\"20\" id=\"Imonth_plus\" style=\"cursor:pointer;\"></img></td>").appendTo($tr_m);
		$tr_m.appendTo($Isd_record_schedule_list_of_month);

		var $tr_w = $("<tr style=\"background-color:#c3c3c3\"></tr>");
		$("<td><span class=\"spantex\" id=\"Ino_w\"></span></td>").appendTo($tr_w);
		$("<td><span class=\"spantex\" id=\"Istatus_w\"></span></td>").appendTo($tr_w);
		$("<td><span class=\"spantex\" id=\"Itime_w\"></span></td>").appendTo($tr_w);
		$("<td width=\"3%\"><img src=\"/css/images/plus.png\" width=\"20\" height=\"20\" id=\"Iweek_plus\" style=\"cursor:pointer;\"></img></td>").appendTo($tr_w);
		$tr_w.appendTo($Isd_record_schedule_list_of_week);

		var $tr_d = $("<tr style=\"background-color:#c3c3c3\"></tr>");
		$("<td><span class=\"spantex\" id=\"Ino_d\"></span></td>").appendTo($tr_d);
		$("<td><span class=\"spantex\" id=\"Istatus_d\"></span></td>").appendTo($tr_d);
		$("<td><span class=\"spantex\" id=\"Itime_d\"></span></td>").appendTo($tr_d);
		$("<td width=\"3%\"><img src=\"/css/images/plus.png\" width=\"20\" height=\"20\" id=\"Iday_plus\" style=\"cursor:pointer;\"></img></td>").appendTo($tr_d);
		$tr_d.appendTo($Isd_record_schedule_list_of_day);
		
		//Initial table language
		$("#Ino_m")[0].innerHTML 			= $.fn._GetLangStr(LT._SMTP_No);
		$("#Istatus_m")[0].innerHTML 		= $.fn._GetLangStr(LT._status);
		$("#Itime_m")[0].innerHTML 			= $.fn._GetLangStr(LT._Time);
		$("#Ino_w")[0].innerHTML 			= $.fn._GetLangStr(LT._SMTP_No);
		$("#Istatus_w")[0].innerHTML 		= $.fn._GetLangStr(LT._status);
		$("#Itime_w")[0].innerHTML 			= $.fn._GetLangStr(LT._Time);
		$("#Ino_d")[0].innerHTML 			= $.fn._GetLangStr(LT._SMTP_No);
		$("#Istatus_d")[0].innerHTML 		= $.fn._GetLangStr(LT._status);
		$("#Itime_d")[0].innerHTML 			= $.fn._GetLangStr(LT._Time);
	};

	$.fn._InitialScheduleModeCtrl = function()
	{
		$("#Isd_record_schedule_mode").change(function(){

			if(this.selectedIndex == 0) // forever
			{
				$("#Isd_record_schedule_list_of_month").parent().hide();
				$("#Isd_record_schedule_list_of_week").parent().hide();
				$("#Isd_record_schedule_list_of_day").parent().hide();
			}
			else if(this.selectedIndex == 1) // month
			{
				$("#Isd_record_schedule_list_of_month").parent().show();
				$("#Isd_record_schedule_list_of_week").parent().hide();
				$("#Isd_record_schedule_list_of_day").parent().hide();
			}
			else if(this.selectedIndex == 2) // week
			{
				$("#Isd_record_schedule_list_of_month").parent().hide();
				$("#Isd_record_schedule_list_of_week").parent().show();
				$("#Isd_record_schedule_list_of_day").parent().hide();
			}
			else if(this.selectedIndex == 3) // day
			{
				$("#Isd_record_schedule_list_of_month").parent().hide();
				$("#Isd_record_schedule_list_of_week").parent().hide();
				$("#Isd_record_schedule_list_of_day").parent().show();
			}

			$.fn._InitialScheduleInfor($(this).val());
		});

		$("#Isd_record_schedule_mode").change();
	};

	$.fn._InitialScheduleInfor = function(mode)
	{
		var final_schedule_list = new Array(num);
		var i = 0, j = 0;
		for(i;i<=2;i++){
			final_schedule_list[i] = new Array(num);
		}

		//Remove tr elements
		$("#Isd_record_schedule_list_of_month,#Isd_record_schedule_list_of_week,#Isd_record_schedule_list_of_day").children("tbody").find("tr").each(function(){
				if($(this).is(":first-child")){}
				else
					$(this).remove();
		});

		if(mode == "Month"){
			final_schedule_list = schedule_month_list;
			var $insertSchedules = $("#Isd_record_schedule_list_of_month").children("tbody");
		}
		else if(mode == "Week"){
			final_schedule_list = schedule_week_list;
			var $insertSchedules = $("#Isd_record_schedule_list_of_week").children("tbody");
		}
		else if(mode == "Day"){
			final_schedule_list = schedule_day_list;
			var $insertSchedules = $("#Isd_record_schedule_list_of_day").children("tbody");
		}
		else
			return true;

		var has_els = 0;
		var infor = "";
		var num = 1;
		for(i=0;i<=2;i++)
		{
			for(j=0;j<=2;j++)
			{
				if(final_schedule_list[i][j] != "" && j == 1)
				{
					has_els = 1;
					break;
				}
			}

			if(has_els == 1)
			{
				var $tr = $("<tr></tr>");
				$("<td><span class=\"spantex\">"+num+".</span></td>").appendTo($tr);
				$("<td><input type=\"checkbox\" id=\"Ich_"+i+"\"></td>").appendTo($tr);
				$("<td><span class=\"spantex\">"+$.fn._TransferInfor(mode,final_schedule_list[i][1])+" to "+$.fn._TransferInfor(mode,final_schedule_list[i][2])+"</span></td>").appendTo($tr);
				$("<td width=\"3%\"><img src=\"/css/images/minus.png\" width=\"20\" height=\"20\" id=\"Iminus_"+i+"\" style=\"cursor:pointer;\"></img></td>").appendTo($tr);
				num++;
				has_els = 0;
				$tr.appendTo($insertSchedules);
				$("#Ich_"+i+"").attr("checked",final_schedule_list[i][0] == "on" ? true:false);
			}
		}

		if(num == 4)
		{
			if(mode == "Month"){
				$("#Imonth_plus").hide();
			}
			else if(mode == "Week"){
				$("#Iweek_plus").hide();
			}
			else if(mode == "Day"){
				$("#Iday_plus").hide();
			}
		}
		else
		{
			if(mode == "Month"){
				$("#Imonth_plus").show();
			}
			else if(mode == "Week"){
				$("#Iweek_plus").show();
			}
			else if(mode == "Day"){
				$("#Iday_plus").show();
			}
		}
		
		$.fn._InitialMinusCtrl();
	};

	$.fn._TransferInfor = function(mode, src)
	{
		var s_d, s_h, s_m;
		var date_tmp = "", time_tmp = "";
		var infor = "";
		if(mode == "Month")
		{
			date_tmp = src.split(',');
			$.each(date_tmp, function(n){
				if(n == 0)
					s_d = date_tmp[n];
				else if(n == 1)
				{
					time_tmp = date_tmp[n].split(':');
					$.each(time_tmp, function(n){
						if(n == 0)
							s_h = time_tmp[n];
						else if(n == 1)
							s_m = time_tmp[n];
					});
				}
			});
			
			infor = $.fn._TransferTime(s_h,s_m)+" On "+s_d+"<sup>th</sup>/month";
		}
		else if(mode == "Week")
		{
			date_tmp = src.split(',');
			$.each(date_tmp, function(n){
				if(n == 0)
					s_d = date_tmp[n];
				else if(n == 1)
				{
					time_tmp = date_tmp[n].split(':');
					$.each(time_tmp, function(n){
						if(n == 0)
							s_h = time_tmp[n];
						else if(n == 1)
							s_m = time_tmp[n];
					});
				}
			});

			if(s_d == 1)
				infor = "Monday";
			else if(s_d == 2)
				infor = "Tuesday";
			else if(s_d == 3)
				infor = "Wednesday";
			else if(s_d == 4)
				infor = "Thursday";
			else if(s_d == 5)
				infor = "Friday";
			else if(s_d == 6)
				infor = "Saturday";
			else if(s_d == 7)
				infor = "Sunday";

			infor = $.fn._TransferTime(s_h,s_m)+" On "+infor;
		}
		else
		{
			time_tmp = src.split(':');
			$.each(time_tmp, function(n){
				if(n == 0)
					s_h = time_tmp[n];
				else if(n == 1)
					s_m = time_tmp[n];
			});

			
			infor = $.fn._TransferTime(s_h,s_m);
		}

		s_d = null, s_h = null, s_m = null, date_tmp = null, time_tmp = null;
		
		return infor;
	};

	$.fn._TransferTime = function(h,m)
	{

		var infor;

		if(m < 10)
			m = "0"+m;
		
		if(h >= 1 && h <= 12){

			if(h == 12)
				infor = h+":"+m+" pm";
			else
				infor = h+":"+m+" am";
		}
		else
		{
			if(h == 0)
				infor = "12:"+m+" am";
			else
				infor = Number(h-12)+":"+m+" pm";
		}

		return infor;
	};

	$.fn._InitialMinusCtrl = function()
	{
		var cmd = "", en = "";
		$("#Iminus_0").bind('click', function(){
			if($("#Isd_record_schedule_mode")[0].selectedIndex == 1)
			{
				cmd = "event.sd_record.schedule.month_1.enable=off&"+
					  "event.sd_record.schedule.month_1.start_time=&"+
					  "event.sd_record.schedule.month_1.end_time=&";
					  
			}
			else if($("#Isd_record_schedule_mode")[0].selectedIndex == 2)
			{
				cmd = "event.sd_record.schedule.week_1.enable=off&"+
					  "event.sd_record.schedule.week_1.start_time=&"+
					  "event.sd_record.schedule.week_1.end_time=&";
					  
			}
			else if($("#Isd_record_schedule_mode")[0].selectedIndex == 3)
			{
				cmd = "event.sd_record.schedule.day_1.enable=off&"+
					  "event.sd_record.schedule.day_1.start_time=&"+
					  "event.sd_record.schedule.day_1.end_time=&";
			}
			$.fn._SDScheduleSetting(cmd, $.fn._GetLangStr(LT._Reloading), 4000);
		});


		$("#Iminus_1").bind('click', function(){
			if($("#Isd_record_schedule_mode")[0].selectedIndex == 1)
			{
				cmd = "event.sd_record.schedule.month_2.enable=off&"+
					  "event.sd_record.schedule.month_2.start_time=&"+
					  "event.sd_record.schedule.month_2.end_time=&";
					  
			}
			else if($("#Isd_record_schedule_mode")[0].selectedIndex == 2)
			{
				cmd = "event.sd_record.schedule.week_2.enable=off&"+
					  "event.sd_record.schedule.week_2.start_time=&"+
					  "event.sd_record.schedule.week_2.end_time=&";
					  
			}
			else if($("#Isd_record_schedule_mode")[0].selectedIndex == 3)
			{
				cmd = "event.sd_record.schedule.day_2.enable=off&"+
					  "event.sd_record.schedule.day_2.start_time=&"+
					  "event.sd_record.schedule.day_2.end_time=&";  
			}
			$.fn._SDScheduleSetting(cmd, $.fn._GetLangStr(LT._Reloading), 4000);
		});

		$("#Iminus_2").bind('click', function(){
			if($("#Isd_record_schedule_mode")[0].selectedIndex == 1)
			{
				cmd = "event.sd_record.schedule.month_3.enable=off&"+
					  "event.sd_record.schedule.month_3.start_time=&"+
					  "event.sd_record.schedule.month_3.end_time=&";
					  
			}
			else if($("#Isd_record_schedule_mode")[0].selectedIndex == 2)
			{
				cmd = "event.sd_record.schedule.week_3.enable=off&"+
					  "event.sd_record.schedule.week_3.start_time=&"+
					  "event.sd_record.schedule.week_3.end_time=&";
					  
			}
			else if($("#Isd_record_schedule_mode")[0].selectedIndex == 3)
			{
				cmd = "event.sd_record.schedule.day_3.enable=off&"+
					  "event.sd_record.schedule.day_3.start_time=&"+
					  "event.sd_record.schedule.day_3.end_time=&";
			}
			$.fn._SDScheduleSetting(cmd, $.fn._GetLangStr(LT._Reloading), 4000);
		});

		$("#Ich_0").bind('click', function(){
			en = $(this).is(":checked") == false? "off":"on";
			if($("#Isd_record_schedule_mode")[0].selectedIndex == 1)
			{
				
				cmd = "event.sd_record.schedule.month_1.enable="+en+"&";
					  
			}
			else if($("#Isd_record_schedule_mode")[0].selectedIndex == 2)
			{
				cmd = "event.sd_record.schedule.week_1.enable="+en+"&";
					  
			}
			else if($("#Isd_record_schedule_mode")[0].selectedIndex == 3)
			{
				cmd = "event.sd_record.schedule.day_1.enable="+en+"&";
			}
			$.fn._SetParamByMask(cmd, $.fn._GetLangStr(LT._Reloading), 4000);
		});

		$("#Ich_1").bind('click', function(){
			en = $(this).is(":checked") == false? "off":"on";
			if($("#Isd_record_schedule_mode")[0].selectedIndex == 1)
			{
				
				cmd = "event.sd_record.schedule.month_2.enable="+en+"&";
					  
			}
			else if($("#Isd_record_schedule_mode")[0].selectedIndex == 2)
			{
				cmd = "event.sd_record.schedule.week_2.enable="+en+"&";
					  
			}
			else if($("#Isd_record_schedule_mode")[0].selectedIndex == 3)
			{
				cmd = "event.sd_record.schedule.day_2.enable="+en+"&";
			}
			$.fn._SetParamByMask(cmd, $.fn._GetLangStr(LT._Reloading), 4000);
		});

		$("#Ich_2").bind('click', function(){
			en = $(this).is(":checked") == false? "off":"on";
			if($("#Isd_record_schedule_mode")[0].selectedIndex == 1)
			{
				
				cmd = "event.sd_record.schedule.month_3.enable="+en+"&";
					  
			}
			else if($("#Isd_record_schedule_mode")[0].selectedIndex == 2)
			{
				cmd = "event.sd_record.schedule.week_3.enable="+en+"&";
					  
			}
			else if($("#Isd_record_schedule_mode")[0].selectedIndex == 3)
			{
				cmd = "event.sd_record.schedule.day_3.enable="+en+"&";
			}
			$.fn._SetParamByMask(cmd, $.fn._GetLangStr(LT._Reloading), 4000);
		});
	};

	$.fn._CheckDateTimeValue = function(mode)
	{
		var ret = 0;
		var final_schedule_list = new Array(num);
		var i = 0, j = 0;
		var sd, sh, sm, ed, eh, em;
		var date_tmp = "", time_tmp = "";
		for(i;i<=2;i++){
			final_schedule_list[i] = new Array(num);
		}

		if(mode == "month")
			final_schedule_list = schedule_month_list;
		else if(mode == "week")
			final_schedule_list = schedule_week_list;
		else if(mode == "day")
			final_schedule_list = schedule_day_list;

		var has_els = 0;
		var flag = 0;
		for(i=0;i<=2;i++)
		{
			if(flag) 
				break;
			
			for(j=0;j<=2;j++)
			{
				if(final_schedule_list[i][j] != "" && j == 1)
				{
					has_els = 1;
					break;
				}
			}
			
			if(has_els == 1)
			{
				// Parser date and time value
				if(mode != "day")
				{
					date_tmp = final_schedule_list[i][1].split(',');
					$.each(date_tmp, function(n){
						if(n == 0)
							sd = date_tmp[n];
						else if(n == 1)
						{
							time_tmp = date_tmp[n].split(':');
							$.each(time_tmp, function(n){
								if(n == 0)
									sh = time_tmp[n];
								else if(n == 1)
									sm = time_tmp[n];
							});
						}
					});
				}

				date_tmp = "", time_tmp = "";
				date_tmp = final_schedule_list[i][2].split(',');
				$.each(date_tmp, function(n){
					if(n == 0)
						ed = date_tmp[n];
					else if(n == 1)
					{
						time_tmp = date_tmp[n].split(':');
						$.each(time_tmp, function(n){
							if(n == 0)
								eh = time_tmp[n];
							else if(n == 1)
								em = time_tmp[n];
						});
					}
				});


				//checking date && time has illegal or legal
				if(mode == "month")
				{
					if(parseInt($("#Imonth_s_day").val()) == parseInt($("#Imonth_e_day").val()))
					{
						if(parseInt($("#Imonth_s_hour").val()) >= parseInt($("#Imonth_e_hour").val()))
						{
							if(parseInt($("#Imonth_s_hour").val()) == parseInt($("#Imonth_e_hour").val()))
							{
								if(parseInt($("#Imonth_s_minute").val()) >= parseInt($("#Imonth_e_minute").val()))
									ret = 1;
							}
							else
								ret = 1;
						}
						else
						{
							if(parseInt($("#Imonth_s_hour").val()) <= parseInt(eh))
							{
								if(parseInt($("#Imonth_s_hour").val()) == parseInt(eh))
								{
									if(parseInt($("#Imonth_s_minute").val()) < parseInt(em))
										ret = 1;
								}
								else
									ret = 1;
							}
						}
					}
					else if(parseInt($("#Imonth_s_day").val()) < parseInt($("#Imonth_e_day").val()))
					{
						if(parseInt(sd) > parseInt(ed))
						{
							if((parseInt($("#Imonth_e_day").val())> parseInt(sd))||(parseInt($("#Imonth_s_day").val())< parseInt(ed)))
								ret = 1;
							else if((parseInt($("#Imonth_s_day").val()) == parseInt(ed))||(parseInt($("#Imonth_e_day").val()) == parseInt(sd)))
							{
								if(parseInt($("#Imonth_s_day").val()) == parseInt(ed))
								{
									if(parseInt($("#Imonth_s_hour").val()) >= parseInt(eh))
									{
										if(parseInt($("#Imonth_s_hour").val()) == parseInt(eh))
										{
											if(parseInt($("#Imonth_s_minute").val()) < parseInt(em))
												ret = 1;
										}
									}
									else
										ret = 1;
								}

								if(parseInt($("#Imonth_e_day").val()) == parseInt(sd))
								{
									if(parseInt($("#Imonth_e_hour").val()) <= parseInt(sh))
									{
										if(parseInt($("#Imonth_e_hour").val()) == parseInt(sh))
										{
											if(parseInt($("#Imonth_e_minute").val()) > parseInt(sm))
												ret = 1;
										}
									}
									else
										ret = 1;
								}
							}
						}
						else if(parseInt(sd) < parseInt(ed))
						{
							if(((parseInt($("#Imonth_s_day").val()) >= parseInt(sd))&&(parseInt($("#Imonth_s_day").val()) <= parseInt(ed)))||
								((parseInt($("#Imonth_e_day").val()) >= parseInt(sd))&&(parseInt($("#Imonth_e_day").val()) <= parseInt(ed))))
							{
								if(parseInt($("#Imonth_s_day").val()) == parseInt(ed))
								{
									if(parseInt($("#Imonth_s_hour").val()) <= parseInt(eh))
									{
										if(parseInt($("#Imonth_s_hour").val()) == parseInt(eh))
										{
											if(parseInt($("#Imonth_s_minute").val()) < parseInt(em))
												ret = 1;
										}
										else
											ret = 1;
									}
								}
								else if(parseInt($("#Imonth_e_day").val()) == parseInt(sd))
								{
									if(parseInt($("#Imonth_e_hour").val()) >= parseInt(sh))
									{
										if(parseInt($("#Imonth_e_hour").val()) == parseInt(sh))
										{
											if(parseInt($("#Imonth_e_minute").val()) > parseInt(sm))
												ret = 1;
										}
										else
											ret = 1;
									}
								}
								else
									ret = 1;
							}
							else if((parseInt($("#Imonth_s_day").val()) < parseInt(sd))&&(parseInt($("#Imonth_e_day").val()) > parseInt(ed)))
								ret = 1;
							
						}
					}
					else if(parseInt($("#Imonth_s_day").val()) > parseInt($("#Imonth_e_day").val()))
					{
						if(parseInt(sd) > parseInt(ed))
							ret = 1;
						else if(parseInt(sd) < parseInt(ed))
						{
							if((parseInt($("#Imonth_s_day").val()) <= parseInt(ed))||(parseInt($("#Imonth_e_day").val()) >= parseInt(sd)))
							{
								if(parseInt($("#Imonth_s_day").val()) == parseInt(ed))
								{
									if(parseInt($("#Imonth_s_hour").val()) <= parseInt(eh))
									{
										if(parseInt($("#Imonth_s_hour").val()) == parseInt(eh))
										{
											if(parseInt($("#Imonth_s_minute").val()) < parseInt(em))
												ret = 1;
										}
										else
											ret = 1;
									}
								}
								else if(parseInt($("#Imonth_e_day").val()) == parseInt(sd))
								{
									if(parseInt($("#Imonth_e_hour").val()) >= parseInt(sh))
									{
										if(parseInt($("#Imonth_e_hour").val()) == parseInt(sh))
										{
											if(parseInt($("#Imonth_e_minute").val()) > parseInt(sm))
												ret = 1;
										}
										else
											ret = 1;
									}
								}
								else
									ret = 1;
							}
						}
					}
						
				}
				else if(mode == "week")
				{
					var week_s_day = -1, week_e_day = -1;

					if($("#Iweek_s_day")[0].selectedIndex == 0)
						week_s_day = 0;
					else if($("#Iweek_s_day")[0].selectedIndex == 1)
						week_s_day = 1;
					else if($("#Iweek_s_day")[0].selectedIndex == 2)
						week_s_day = 2;
					else if($("#Iweek_s_day")[0].selectedIndex == 3)
						week_s_day = 3;
					else if($("#Iweek_s_day")[0].selectedIndex == 4)
						week_s_day = 4;
					else if($("#Iweek_s_day")[0].selectedIndex == 5)
						week_s_day = 5;
					else if($("#Iweek_s_day")[0].selectedIndex == 6)
						week_s_day = 6;


					if($("#Iweek_e_day")[0].selectedIndex == 0)
						week_e_day = 0;
					else if($("#Iweek_e_day")[0].selectedIndex == 1)
						week_e_day = 1;
					else if($("#Iweek_e_day")[0].selectedIndex == 2)
						week_e_day = 2;
					else if($("#Iweek_e_day")[0].selectedIndex == 3)
						week_e_day = 3;
					else if($("#Iweek_e_day")[0].selectedIndex == 4)
						week_e_day = 4;
					else if($("#Iweek_e_day")[0].selectedIndex == 5)
						week_e_day = 5;
					else if($("#Iweek_e_day")[0].selectedIndex == 6)
						week_e_day = 6;

					if(parseInt(week_s_day) == parseInt(week_e_day))
					{
						if(parseInt($("#Iweek_s_hour").val()) >= parseInt($("#Iweek_e_hour").val()))
						{
							if(parseInt($("#Iweek_s_hour").val()) == parseInt($("#Iweek_e_hour").val()))
							{
								if(parseInt($("#Iweek_s_minute").val()) >= parseInt($("#Iweek_e_minute").val()))
									ret = 1;
							}
							else
								ret = 1;
						}
						else
						{
							if(parseInt($("#Iweek_s_hour").val()) <= parseInt(eh))
							{
								if(parseInt($("#Iweek_s_hour").val()) == parseInt(eh))
								{
									if(parseInt($("#Iweek_s_minute").val()) < parseInt(em))
										ret = 1;
								}
								else
									ret = 1;
							}
						}
					}
					else if(parseInt(week_s_day) < parseInt(week_e_day))
					{
						if(parseInt(sd) > parseInt(ed))
						{
							if((parseInt(week_e_day)> parseInt(sd))||(parseInt(week_s_day)< parseInt(ed)))
								ret = 1;
							else if((parseInt(week_s_day) == parseInt(ed))||(parseInt(week_e_day) == parseInt(sd)))
							{
								if(parseInt(week_s_day) == parseInt(ed))
								{
									if(parseInt($("#Iweek_s_hour").val()) >= parseInt(eh))
									{
										if(parseInt($("#Iweek_s_hour").val()) == parseInt(eh))
										{
											if(parseInt($("#Iweek_s_minute").val()) < parseInt(em))
												ret = 1;
										}
									}
									else
										ret = 1;
								}

								if(parseInt(week_e_day) == parseInt(sd))
								{
									if(parseInt($("#Iweek_e_hour").val()) <= parseInt(sh))
									{
										if(parseInt($("#Iweek_e_hour").val()) == parseInt(sh))
										{
											if(parseInt($("#Iweek_e_minute").val()) > parseInt(sm))
												ret = 1;
										}
									}
									else
										ret = 1;
								}
							}
						}
						else if(parseInt(sd) < parseInt(ed))
						{
							if(((parseInt(week_s_day) >= parseInt(sd))&&(parseInt(week_s_day) <= parseInt(ed)))||
								((parseInt(week_e_day) >= parseInt(sd))&&(parseInt(week_e_day) <= parseInt(ed))))
							{
								if(parseInt(week_s_day) == parseInt(ed))
								{
									if(parseInt($("#Iweek_s_hour").val()) <= parseInt(eh))
									{
										if(parseInt($("#Iweek_s_hour").val()) == parseInt(eh))
										{
											if(parseInt($("#Iweek_s_minute").val()) < parseInt(em))
												ret = 1;
										}
										else
											ret = 1;
									}
								}
								else if(parseInt(week_e_day) == parseInt(sd))
								{
									if(parseInt($("#Iweek_e_hour").val()) >= parseInt(sh))
									{
										if(parseInt($("#Iweek_e_hour").val()) == parseInt(sh))
										{
											if(parseInt($("#Iweek_e_minute").val()) > parseInt(sm))
												ret = 1;
										}
										else
											ret = 1;
									}
								}
								else
									ret = 1;
							}
							else if((parseInt(week_s_day) < parseInt(sd))&&(parseInt(week_e_day) > parseInt(ed)))
								ret = 1;
							
						}
					}
					else if(parseInt(week_s_day) > parseInt(week_e_day))
					{
						if(parseInt(sd) > parseInt(ed))
							ret = 1;
						else if(parseInt(sd) < parseInt(ed))
						{
							if((parseInt(week_s_day) <= parseInt(ed))||(parseInt(week_e_day) >= parseInt(sd)))
							{
								if(parseInt(week_s_day) == parseInt(ed))
								{
									if(parseInt($("#Iweek_s_hour").val()) <= parseInt(eh))
									{
										if(parseInt($("#Iweek_s_hour").val()) == parseInt(eh))
										{
											if(parseInt($("#Iweek_s_minute").val()) < parseInt(em))
												ret = 1;
										}
										else
											ret = 1;
									}
								}
								else if(parseInt(week_e_day) == parseInt(sd))
								{
									if(parseInt($("#Iweek_e_hour").val()) >= parseInt(sh))
									{
										if(parseInt($("#Iweek_e_hour").val()) == parseInt(sh))
										{
											if(parseInt($("#Iweek_e_minute").val()) > parseInt(sm))
												ret = 1;
										}
										else
											ret = 1;
									}
								}
								else
									ret = 1;
							}
						}
					}
						
				}
				else if(mode == "day")
				{
					if(parseInt($("#Iday_s_hour").val()) == parseInt($("#Iday_e_hour").val()))
					{
						if(parseInt($("#Iday_s_minute").val()) >= parseInt($("#Iday_e_minute").val()))
							ret = 1;
						else
						{
							if(parseInt($("#Iday_s_minute").val()) < parseInt(em))
								ret = 1;
						}
					}
					else if(parseInt($("#Iday_s_hour").val()) < parseInt($("#Iday_e_hour").val()))
					{
						if(parseInt(sh) > parseInt(eh))
						{
							if((parseInt($("#Iday_e_hour").val())> parseInt(sh))||(parseInt($("#Iday_s_hour").val())< parseInt(eh)))
								ret = 1;
							else if((parseInt($("#Iday_s_hour").val()) == parseInt(eh))||(parseInt($("#Iday_e_hour").val()) == parseInt(sh)))
							{
								if(parseInt($("#Iday_s_hour").val()) == parseInt(eh))
								{
									if(parseInt($("#Iday_s_minute").val()) < parseInt(em))
										ret = 1;
								}

								if(parseInt($("#Iday_e_hour").val()) == parseInt(sh))
								{
									if(parseInt($("#Iday_e_minute").val()) > parseInt(sm))
										ret = 1;
								}
							}
						}
						else if(parseInt(sh) < parseInt(eh))
						{
							if(((parseInt($("#Iday_s_hour").val()) >= parseInt(sh))&&(parseInt($("#Iday_s_hour").val()) <= parseInt(eh)))||
								((parseInt($("#Iday_e_hour").val()) >= parseInt(sh))&&(parseInt($("#Iday_e_hour").val()) <= parseInt(eh))))
							{
								if(parseInt($("#Iday_s_hour").val()) == parseInt(eh))
								{
									if(parseInt($("#Iday_s_minute").val()) < parseInt(em))
										ret = 1;
								}
								else if(parseInt($("#Iday_e_hour").val()) == parseInt(sh))
								{
									if(parseInt($("#Iday_e_minute").val()) > parseInt(sm))
										ret = 1;
								}
								else
									ret = 1;
							}
							else if((parseInt($("#Iday_s_hour").val()) < parseInt(sh))&&(parseInt($("#Iday_e_hour").val()) > parseInt(eh)))
								ret = 1;
						}
					}
					else if(parseInt($("#Iday_s_hour").val()) > parseInt($("#Iday_e_hour").val()))
					{
						if(parseInt(sd) > parseInt(ed))
							ret = 1;
						else if(parseInt(sd) < parseInt(ed))
						{
							if((parseInt($("#Iday_s_hour").val()) <= parseInt(eh))||(parseInt($("#Iday_e_hour").val()) >= parseInt(sh)))
							{
								if(parseInt($("#Iday_s_hour").val()) == parseInt(eh))
								{
									if(parseInt($("#Iday_s_minute").val()) < parseInt(em))
										ret = 1;
								}
								else if(parseInt($("#Iday_e_hour").val()) == parseInt(sh))
								{

									if(parseInt($("#Iday_e_minute").val()) > parseInt(sm))
										ret = 1;
								}
								else
									ret = 1;
							}
						}
					}
				}
				has_els = 0;
			}
		}

		date_tmp = null, time_tmp = null;
		return ret;
	};

	$.fn._InitialCondtionCtrl = function()
	{
		$("input[name=Nrecord_conditions]").change(function(){
			if($(this).val() == "scheduled")
			{
				$("#Msd_record_schedule_table").parent().show();
				//$("#Msd_record_schedule_mode").parent().show();
				// $("#Isd_record_schedule_list_of_month").parent().show();
				// $("#Isd_record_schedule_list_of_week").parent().show();
				// $("#Isd_record_schedule_list_of_day").parent().show();
				$.fn._InitialScheduleModeCtrl();
			}
			else
			{
				$("#Msd_record_schedule_table").parent().show();
				//$("#Msd_record_schedule_mode").parent().hide();
				// $("#Isd_record_schedule_list_of_month").parent().hide();
				// $("#Isd_record_schedule_list_of_week").parent().hide();
				// $("#Isd_record_schedule_list_of_day").parent().hide();
			}
		});

		$("input[name=Nrecord_conditions]:checked").change();
	};

	$.fn._CheckSDCard = function()
	{
		var sd_overwrite=$("input[type=radio][name=Nsd_overwrite]:checked").val();

		if(sd_overwrite == "off" && usage == 100)
		{
			$("#ISDCard_warning")[0].innerHTML 		= $.fn._GetLangStr(LT._SD_Card_Warning);
			sd_fadeOut();
		}
	};

	$.fn._CheckCodec = function()
	{
		var profile = "";
		var current = "";
		var pri_res , pri_codec , sec_res , sec_codec, third_res, thrid_codec;
		var len = 0;
		
		if(current_profile == 1)
			current	= profile1;
		else if(current_profile == 2)
			current	= profile2;
		else if(current_profile == 3)
			current	= profile3;
		else if(current_profile == 4)
			current	= profile4;
		else if(current_profile == 5)
			current	= profile5;
		else if(current_profile == 6)
			current	= profile6;

		profile = current.split(',');
		$.each(profile, function(n){
			if(n == 0){
				len = profile[n].indexOf('/');
				pri_res = profile[n].slice(0,len);
				pri_codec = profile[n].slice(len+1,profile[n].length);				
			} else if(n == 1){
				len = profile[n].indexOf('/');
				sec_res = profile[n].slice(0,len);
				sec_codec = profile[n].slice(len+1,profile[n].length);
			} else if(n == 2){
				len = profile[n].indexOf('/');
				third_res = profile[n].slice(0,len);
				thrid_codec = profile[n].slice(len+1,profile[n].length);
			}
		});

		if(pri_codec == "h264" || sec_codec == "h264")
		{
			$("input[name=Nrecord_conditions]").attr("disabled",false);
		}
		else
		{
			$("input[name=Nrecord_conditions]").attr("disabled",true);
			$("#Iwarning_note")[0].innerHTML = (LT._Format_H264_Warning);
			$("#Iwarning_note").parent().parent().attr("style","display:block;height:20px;");
			check_codec_fadeOut();
		}
	};

	function check_codec_fadeOut()
	{
		$("#Iwarning_note").delay(500).fadeOut(500, check_codec_fadeIn);
	};
	
	function check_codec_fadeIn(id)
	{
		$("#Iwarning_note").delay(500).fadeIn(500, check_codec_fadeOut);
	};

	function sd_fadeOut()
	{
		$("#ISDCard_warning").delay(500).fadeOut(500, sd_fadeIn);
	};
	
	function sd_fadeIn(id)
	{
		$("#ISDCard_warning").delay(500).fadeIn(500, sd_fadeOut);
	};


	function CheckStatus()
	{
		check = $.ajax({
			url:'/cgi-bin/get?system.sd.format_status',
			dataType:'json',
			cache:false,
			success:function(data){
				/* try remove memory leak by releasing the circular reference. */				
				if (check!== null) {
					check.onreadystatechange = CheckCallback(check.responseText);
					check.abort();
					check = null;
				}
				
				if(stop)
					clearInterval(check_thread);
				else
					check_thread = setTimeout(openCheck,1000);
			},
			error:function(xhr, textStatus, errorThrown){
			}
		});
	};

	function openCheck()
	{
		/* try remove memory leak by releasing the circular reference. */
		if (check !== null) {
			check.onreadystatechange = CheckCallback(check.responseText);
			check.abort();
			check = null;
		}

		CheckStatus();		
	};

	function CheckCallback(src)
	{
		var obj = $.parseJSON(src);
		$.each(obj, function(parameter, value){
			if(parameter == "system.sd.format_status"){
				if(value[1] == "finish"){
					stop = 1;
					window.location.reload();
				}
			}
		});

		obj = null;
	};
})(jQuery);
