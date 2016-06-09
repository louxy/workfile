(function($){
	var confList;
	var model_res;
	var profile_1;
	var profile_2;
	var profile_3;
	var profile_4;
	var profile_5;
	var profile_6;
	var current_id;
	var model_name;
	var ntsc_frame = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30";
	var limit_frame_ntsc_by_15 = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15";
	var current_frame_rate, stream1_res;
	$.fn._ObjectAssignValue = function(src){
		$.each(src, function(param , val){
			if(param == "event.alarm.input1.enable")
				$("input[name=Nalarm_input][value='"+val[1]+"']").attr('checked',true);
			else if(param == "event.alarm.input1.type")
			{
				confList = "NO,NC".split(',');
				$("#Ialarm_input_type").find('option').remove();
				$.each(confList, function(n){
					$("#Ialarm_input_type").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				if(val[1] == "no")
					$("#Ialarm_input_type")[0].selectedIndex = 0;
				else if(val[1] == "nc")
					$("#Ialarm_input_type")[0].selectedIndex = 1;
			}
			else if(param == "event.alarm.output.mode")
				$("input[name=Nalarm_output][value='"+val[1]+"']").attr('checked',true);
			else if(param == "event.alarm.output.duration_time")
			{
				confList = "Infinite,5,10".split(',');
				$("#Ialarm_output_duration").find('option').remove();
				$.each(confList, function(n){
					$("#Ialarm_output_duration").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				if(val[1] == "0")
					$("#Ialarm_output_duration")[0].selectedIndex = 0;
				else if(val[1] == "5")
					$("#Ialarm_output_duration")[0].selectedIndex = 1;
				else if(val[1] == "10")
					$("#Ialarm_output_duration")[0].selectedIndex = 2;
			}
			else if(param == "event.event_trigger_fps.mode")
			{
				$("input[name=Nframe_enable][value='"+val[1]+"']").attr('checked',true);
			}
			else if(param == "event.event_trigger_fps.fps")
			{
				current_frame_rate = val[1];
			}
			else if(param == "event.event_trigger_fps.time")
			{
				var confList = "5,10,15,20,30,60,120,300".split(',');
				$("#Iframerate_duration").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == val[1]){
						$("#Iframerate_duration").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
						st1_fps = 1;
					}
					else
						$("#Iframerate_duration").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});
			}
			else if(param == "system.model_resolution")
				model_res = val[1];
			else if(param == "image.encode.current_profile_id")
				current_id = val[1];
			else if(param == "image.encode.profile1.encode")
				profile_1 = val[1];
			else if(param == "image.encode.profile2.encode")
				profile_2 = val[1];
			else if(param == "image.encode.profile3.encode")
				profile_3 = val[1];
			else if(param == "image.encode.profile4.encode")
				profile_4 = val[1];
			else if(param == "image.encode.profile5.encode")
				profile_5 = val[1];
			else if(param == "image.encode.profile6.encode")
				profile_6 = val[1];
			else if(param == "system.information.model_name")
				model_name = val[1];
		});
	};
	$.fn._Go = function(){
		$.fn._InitialPageLang();
		$.fn._InitialResCtrl();
		$.fn._InitialFunc();
		$.fn._AlarmCheck();
		$('#reloading_container').hide();
		$('#container').show();
	};
	$.fn._InitialPageLang = function(){
		$("#Malarm_in_title")[0].innerHTML 				= $.fn._GetLangStr(LT._Alarm_Input);
		$("#Malarm_input")[0].innerHTML 				= $.fn._GetLangStr(LT._Enable)+":";
		$("#Nalarm_input_type")[0].innerHTML 			= $.fn._GetLangStr(LT._Type)+":";
		$("#Malarm_out_title")[0].innerHTML 			= $.fn._GetLangStr(LT._Alarm_Output);
		$("#Malarm_output")[0].innerHTML 				= $.fn._GetLangStr(LT._Enable)+":";
		$("#Nalarm_output_duration")[0].innerHTML 		= $.fn._GetLangStr(LT._Alarm_output_duration)+":";
		$("#Malarm_input_on")[0].innerHTML 				= $.fn._GetLangStr(LT._ON);
		$("#Malarm_input_off")[0].innerHTML 			= $.fn._GetLangStr(LT._OFF);
		$("#Malarm_output_alarm_in")[0].innerHTML 		= $.fn._GetLangStr(LT._alarm_in);
		$("#Malarm_output_motion")[0].innerHTML 		= $.fn._GetLangStr(LT._Motion);
		$("#Malarm_output_off")[0].innerHTML 			= $.fn._GetLangStr(LT._OFF);
		$("#Malarm_frame_rate")[0].innerHTML       		= $.fn._GetLangStr(LT._Higher_Frame_Rate);
		$("#Mframe_rate_enable")[0].innerHTML 			= $.fn._GetLangStr(LT._Enable)+":";
		$("#Mframe_enable_on")[0].innerHTML 			= $.fn._GetLangStr(LT._ON);
		$("#Mframe_enable_off")[0].innerHTML 			= $.fn._GetLangStr(LT._OFF);
		$("#Mframerate")[0].innerHTML               	= $.fn._GetLangStr(LT._Frame_Rate)+":";
		$("#Malarm_framerate_duration")[0].innerHTML    = $.fn._GetLangStr(LT._Alarm_output_duration)+":";
		$.fn._InitialOptionLang("Ialarm_input_type");
		$.fn._InitialOptionLang("Ialarm_output_duration");
	};

	$.fn._InitialResCtrl = function()
	{
		var profile = "", tmp = "";
		var len = 0;
		var pri_res , pri_codec , sec_res , sec_codec;
		if(current_id == 1)
			tmp = profile_1;
		else if(current_id == 2)
			tmp = profile_2;
		else if(current_id == 3)
			tmp = profile_3;
		else if(current_id == 4)
			tmp = profile_4;
		else if(current_id == 5)
			tmp = profile_5;
		else if(current_id == 6)
			tmp = profile_6;

		profile = tmp.split(',');
		$.each(profile, function(n){
			if(n == 0){
				len = profile[n].indexOf('/');
				pri_res = profile[n].slice(0,len);
				pri_codec = profile[n].slice(len+1,profile[n].length);
				coord_pri_res = pri_res;
				stream1_res = pri_res;
			} else if(n == 1){
				len = profile[n].indexOf('/');
				sec_res = profile[n].slice(0,len);
				sec_codec = profile[n].slice(len+1,profile[n].length);
				coord_sec_res = sec_res;
			}
		});

		if(stream1_res == "2048x1536")
			frameList = limit_frame_ntsc_by_15;
		else
			frameList = ntsc_frame;

		var confList = frameList.split(',');
		$("#Iframerate").find('option').remove();
		$.each(confList, function(n){
			if(confList[n].toLowerCase() == current_frame_rate){
				$("#Iframerate").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
				st1_fps = 1;
			}
			else
				$("#Iframerate").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
		});
	}

	$.fn._InitialFunc = function()
	{
		$("#Icon_setting_save_pic").bind('click', function(){

			var type = "", duration_time = "";
			
			if($("#Ialarm_input_type")[0].selectedIndex == 0)
				type = "no";
			else if($("#Ialarm_input_type")[0].selectedIndex == 1)
				type = "nc";

			if($("#Ialarm_output_duration")[0].selectedIndex == 0)
				duration_time = "0";
			else if($("#Ialarm_output_duration")[0].selectedIndex == 1)
				duration_time = "5";
			else if($("#Ialarm_output_duration")[0].selectedIndex == 2)
				duration_time = "10";
				
			command = 	"event.alarm.input1.enable"			+"="+	$("input[type=radio][name=Nalarm_input]:checked").val()+"&"+
						"event.alarm.input1.type"			+"="+	type+"&"+
						"event.alarm.output.mode"			+"="+	$("input[type=radio][name=Nalarm_output]:checked").val()+"&"+
						"event.alarm.output.duration_time"	+"="+	duration_time+"&"+
						"event.event_trigger_fps.mode"   	+"="+   $("input[type=radio][name=Nframe_enable]:checked").val()+"&"+
						"event.event_trigger_fps.fps"    	+"="+   $("#Iframerate").val()+"&"+
						"event.event_trigger_fps.time"   	+"="+   $("#Iframerate_duration").val()+"&";
		
			$.fn._SetParamByMask(command, $.fn._GetLangStr(LT._Reloading), 7000);
		});
		
		$("#Icon_setting_default_pic").bind('click', function(){
			if(confirm($.fn._GetLangStr(LT._Reset_to_default_Warning))){
				$.fn._DefaultParam($.fn._GetLangStr(LT._Reloading), 5000);
			}
		});
	};

	$.fn._AlarmCheck = function(){
		if(model_name.indexOf("NCR375") != -1){
			$("#Malarm_out_title").parent().hide();
			$("#Malarm_output").parent().hide();
			$("#Nalarm_output_duration").parent().hide();
		}
	}
})(jQuery);
