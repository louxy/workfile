(function($){
	var current_id, edit_id, tmp_profile_1, tmp_profile_2, tmp_profile_3, tmp_profile_4, tmp_profile_5, tmp_profile_6;
	var confList, camera_type, model_res;
	var ntsc_frame = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30";
	var pal_frame = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25";
	var ntsc_gop = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60";
	var pal_gop = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50";
	var limit_frame_ntsc_by_15 = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15";
	var limit_frame_pal_by_12 = "1,2,3,4,5,6,7,8,9,10,11,12";
	var limit_frame_pal_by_12_5 = "1,2,3,4,5,6,7,8,9,10,11,12,12.5";
	var limit_frame_pal_by_10 = "1,2,3,4,5,6,7,8,9,10";
	var limit_gop_ntsc_by_30 = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30";
	var limit_gop_pal_by_24 = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24";
	var limit_gop_pal_by_25 = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25";
	var limit_gop_pal_by_20 = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20";
	var quailty = "High,Mid,Low";
	var rate_ctrl = "CBR,VBR";
	var profile_el = "Main,High"
	var profile_stream1_h264_frame_rate;
	var profile_stream1_h264_gop;
	var profile_stream1_h264_cbr_bitrate;
	var profile_stream1_h264_vbr_bitrate_max;
	var profile_stream1_h264_vbr_bitrate_min;
	var profile_stream1_dscp;
	var profile_stream2_h264_frame_rate;
	var profile_stream2_h264_gop;
	var profile_stream2_h264_cbr_bitrate;
	var profile_stream2_h264_vbr_bitrate_max;
	var profile_stream2_h264_vbr_bitrate_min;
	var profile_stream2_dscp;
	var profile_stream3_h264_frame_rate;
	var profile_stream3_dscp;
	var zone_1;
	var zone_2;
	var zone_3;
	var zone_4;
	var zone_5;
	var zone_6;
	var zone_7;
	var zone_8;
	var event_motion_area;
	var focus_region;
	var bitrate_range = new Array();
	var split_tmp;
	var coord_pri_res;
	
	$.fn._ObjectAssignValue = function(src){
		$.each(src, function(param , val){
			if(param == "image.encode.profile1.encode")
				tmp_profile_1 = val[1];
			else if(param == "image.encode.profile2.encode")
				tmp_profile_2 = val[1];
			else if(param == "image.encode.profile3.encode")
				tmp_profile_3 = val[1];
			else if(param == "image.encode.profile4.encode")
				tmp_profile_4 = val[1];
			else if(param == "image.encode.profile5.encode")
				tmp_profile_5 = val[1];
			else if(param == "image.encode.profile6.encode")
				tmp_profile_6 = val[1];
			else if(param == "image.encode.current_profile_id")
				current_id = val[1];
			else if(param == "image.encode.edit_profile_id")
				edit_id = val[1];
			else if(param == "system.configuration.camera_type")
				camera_type = val[1];
			else if(param == "system.model_resolution")
				model_lens = val[1];
			else if(param == "image.privacy_zone_1.mask_zone")
			{
				if(val[1] == "left,top,right,bottom")
					zone_1 = "0,0,0,0";
				else
					zone_1 = val[1];
			}
			else if(param == "image.privacy_zone_2.mask_zone")
			{
				if(val[1] == "left,top,right,bottom")
					zone_2 = "0,0,0,0";
				else
					zone_2 = val[1];
			}
			else if(param == "image.privacy_zone_3.mask_zone")
			{
				if(val[1] == "left,top,right,bottom")
					zone_3 = "0,0,0,0";
				else
					zone_3 = val[1];
			}
			else if(param == "image.privacy_zone_4.mask_zone")
			{
				if(val[1] == "left,top,right,bottom")
					zone_4= "0,0,0,0";
				else
					zone_4 = val[1];
			}
			else if(param == "image.privacy_zone_5.mask_zone")
			{
				if(val[1] == "left,top,right,bottom")
					zone_5 = "0,0,0,0";
				else
					zone_5 = val[1];
			}
			else if(param == "image.privacy_zone_6.mask_zone")
			{
				if(val[1] == "left,top,right,bottom")
					zone_6 = "0,0,0,0";
				else
					zone_6 = val[1];
			}
			else if(param == "image.privacy_zone_7.mask_zone")
			{
				if(val[1] == "left,top,right,bottom")
					zone_7 = "0,0,0,0";
				else
					zone_7 = val[1];
			}
			else if(param == "image.privacy_zone_8.mask_zone")
			{
				if(val[1] == "left,top,right,bottom")
					zone_8 = "0,0,0,0";
				else
					zone_8 = val[1];
			}
			else if(param == "event.motion_detection.area")
			{
				if(val[1] == "left,top,right,bottom")
					event_motion_area = "0,0,0,0";
				else
					event_motion_area = val[1];
			}
			else if(param == "lens.focus_region")
				focus_region = val[1];
			else if(param == "image.encode.profile1.stream1.h264_cbr_bitrate.query_range")
			{
				split_tmp = val[1].split('~');
				$.each(split_tmp, function(n){
					if(n == 0){
						bitrate_range[n] = split_tmp[n].slice(1,split_tmp[n].length);
					}
					else if(n == 1){
						bitrate_range[n] = split_tmp[n].slice(0,split_tmp[n].length-1);
					}
				});

				$("#Istream1_cbr_range")[0].innerHTML 	= "("+bitrate_range[0]+"~"+bitrate_range[1]+")";
				$("#Istream2_cbr_range")[0].innerHTML 	= "("+bitrate_range[0]+"~"+bitrate_range[1]+")";
			}
			else if(param == "image.encode.profile1.stream1.dscp.query_range")
			{
				var dscp_range = new Array();
				split_tmp = val[1].split('~');
				$.each(split_tmp, function(n){
					if(n == 0){
						dscp_range[n] = split_tmp[n].slice(1,split_tmp[n].length);
					}
					else if(n == 1){
						dscp_range[n] = split_tmp[n].slice(0,split_tmp[n].length-1);
					}
				});

				$("#Istream1_dscp_range")[0].innerHTML 	= "("+dscp_range[0]+"~"+dscp_range[1]+")";
				$("#Istream2_dscp_range")[0].innerHTML 	= "("+dscp_range[0]+"~"+dscp_range[1]+")";
				$("#Istream3_dscp_range")[0].innerHTML 	= "("+dscp_range[0]+"~"+dscp_range[1]+")";
			}
		});
	};

	$.fn._ProfileAssignValue = function(src)
	{
		$.each(src, function(param , val){
			if(param == "image.encode.profile"+edit_id+".stream1.frame_rate")
			{
				if(camera_type == "ntsc")
			 		confList = ntsc_frame.split(',');
				else if(camera_type == "pal")
			 		confList = pal_frame.split(',');
				
				$("#Istream1_frame").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == val[1])
						$("#Istream1_frame").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
					else
						$("#Istream1_frame").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				profile_stream1_h264_frame_rate = val[1];
			}
			else if(param == "image.encode.profile"+edit_id+".stream1.h264_cbr_bitrate")
			{
				$("#Istream1_cbr").val(val[1]);
				profile_stream1_h264_cbr_bitrate = val[1];
			}
			else if(param == "image.encode.profile"+edit_id+".stream1.h264_gop")
			{
				if(camera_type == "ntsc")
			 		confList = ntsc_gop.split(',');
				else if(camera_type == "pal")
			 		confList = pal_gop.split(',');
				
				$("#Istream1_gop").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == val[1])
						$("#Istream1_gop").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
					else
						$("#Istream1_gop").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});
				profile_stream1_h264_gop = val[1];
				
			}
			else if(param == "image.encode.profile"+edit_id+".stream1.h264_rate_control_mode")
			{

			 	confList = rate_ctrl.split(',');
				$("#Istream1_rate_ctrl").find('option').remove();
				$.each(confList, function(n){
					$("#Istream1_rate_ctrl").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				if(val[1] == "cbr")
					$("#Istream1_rate_ctrl")[0].selectedIndex = 0;
				else if(val[1] == "vbr")
					$("#Istream1_rate_ctrl")[0].selectedIndex = 1;
			}
			else if(param == "image.encode.profile"+edit_id+".stream1.h264_vbr_bitrate_max")
			{
				$("#Istream1_vbr_max").val(val[1]);
				profile_stream1_h264_vbr_bitrate_max = val[1];
			}
			else if(param == "image.encode.profile"+edit_id+".stream1.h264_vbr_bitrate_min")
			{
				$("#Istream1_vbr_min").val(val[1]);
				profile_stream1_h264_vbr_bitrate_min = val[1];
			}
			else if(param == "image.encode.profile"+edit_id+".stream1.mjpg_quality_level")
			{

			 	confList = quailty.split(',');
				$("#Istream1_quality").find('option').remove();
				$.each(confList, function(n){
					$("#Istream1_quality").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				if(val[1] == "high")
					$("#Istream1_quality")[0].selectedIndex = 0;
				else if(val[1] == "mid")
					$("#Istream1_quality")[0].selectedIndex = 1;
				else if(val[1] == "low")
					$("#Istream1_quality")[0].selectedIndex = 2;

				$.fn._InitialOptionLang("Istream1_quality");
			}
			else if(param == "image.encode.profile"+edit_id+".stream1.dscp")
			{
				$("#Istream1_dscp").val(val[1]);
				profile_stream1_dscp = val[1];
			}
			else if(param == "image.encode.profile"+edit_id+".stream1.h264_profile")
			{
				confList = profile_el.split(',');
				$("#Istream1_profile").find('option').remove();
				$.each(confList, function(n){
					$("#Istream1_profile").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				if(val[1] == "main")
					$("#Istream1_profile")[0].selectedIndex = 0;
				else if(val[1] == "high")
					$("#Istream1_profile")[0].selectedIndex = 1;

				$.fn._InitialOptionLang("Istream1_profile");
			}
			else if(param == "image.encode.profile"+edit_id+".stream2.frame_rate")
			{
				if(camera_type == "ntsc")
			 		confList = ntsc_frame.split(',');
				else if(camera_type == "pal")
			 		confList = pal_frame.split(',');
				
				$("#Istream2_frame").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == val[1])
						$("#Istream2_frame").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
					else
						$("#Istream2_frame").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				profile_stream2_h264_frame_rate = val[1];
			}
			else if(param == "image.encode.profile"+edit_id+".stream2.h264_cbr_bitrate")
			{
				$("#Istream2_cbr").val(val[1]);
				profile_stream2_h264_cbr_bitrate = val[1];
			}
			else if(param == "image.encode.profile"+edit_id+".stream2.h264_gop")
			{
				if(camera_type == "ntsc")
			 		confList = ntsc_gop.split(',');
				else if(camera_type == "pal")
			 		confList = pal_gop.split(',');
				
				$("#Istream2_gop").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == val[1])
						$("#Istream2_gop").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
					else
						$("#Istream2_gop").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				profile_stream2_h264_gop = val[1];
			}
			else if(param == "image.encode.profile"+edit_id+".stream2.h264_rate_control_mode")
			{

			 	confList = rate_ctrl.split(',');
				$("#Istream2_rate_ctrl").find('option').remove();
				$.each(confList, function(n){
					$("#Istream2_rate_ctrl").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				if(val[1] == "cbr")
					$("#Istream2_rate_ctrl")[0].selectedIndex = 0;
				else if(val[1] == "vbr")
					$("#Istream2_rate_ctrl")[0].selectedIndex = 1;
			}
			else if(param == "image.encode.profile"+edit_id+".stream2.h264_vbr_bitrate_max")
			{
				$("#Istream2_vbr_max").val(val[1]);
				profile_stream2_h264_vbr_bitrate_max = val[1];
			}
			else if(param == "image.encode.profile"+edit_id+".stream2.h264_vbr_bitrate_min")
			{
				$("#Istream2_vbr_min").val(val[1]);
				profile_stream2_h264_vbr_bitrate_min = val[1];
			}
			else if(param == "image.encode.profile"+edit_id+".stream2.mjpg_quality_level")
			{

			 	confList = quailty.split(',');
				$("#Istream2_quality").find('option').remove();
				$.each(confList, function(n){
					$("#Istream2_quality").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				if(val[1] == "high")
					$("#Istream2_quality")[0].selectedIndex = 0;
				else if(val[1] == "mid")
					$("#Istream2_quality")[0].selectedIndex = 1;
				else if(val[1] == "low")
					$("#Istream2_quality")[0].selectedIndex = 2;

				$.fn._InitialOptionLang("Istream2_quality");
			}
			else if(param == "image.encode.profile"+edit_id+".stream2.dscp")
			{
				$("#Istream2_dscp").val(val[1]);
				profile_stream2_dscp = val[1];
			}
			else if(param == "image.encode.profile"+edit_id+".stream2.h264_profile")
			{
				confList = profile_el.split(',');
				$("#Istream2_profile").find('option').remove();
				$.each(confList, function(n){
					$("#Istream2_profile").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				if(val[1] == "main")
					$("#Istream2_profile")[0].selectedIndex = 0;
				else if(val[1] == "high")
					$("#Istream2_profile")[0].selectedIndex = 1;
			}
			else if(param == "image.encode.profile"+edit_id+".stream3.frame_rate")
			{
			 	if(camera_type == "ntsc")
			 		confList = ntsc_frame.split(',');
				else if(camera_type == "pal")
			 		confList = pal_frame.split(',');
				
				$("#Istream3_frame").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == val[1])
						$("#Istream3_frame").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
					else
						$("#Istream3_frame").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				profile_stream3_h264_frame_rate = val[1];
			}
			else if(param == "image.encode.profile"+edit_id+".stream3.mjpg_quality_level")
			{

			 	confList = quailty.split(',');
				$("#Istream3_quality").find('option').remove();
				$.each(confList, function(n){
					$("#Istream3_quality").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				if(val[1] == "high")
					$("#Istream3_quality")[0].selectedIndex = 0;
				else if(val[1] == "mid")
					$("#Istream3_quality")[0].selectedIndex = 1;
				else if(val[1] == "low")
					$("#Istream3_quality")[0].selectedIndex = 2;

				$.fn._InitialOptionLang("Istream3_quality");
			}
			else if(param == "image.encode.profile"+edit_id+".stream3.dscp")
			{
				$("#Istream3_dscp").val(val[1]);
				profile_stream3_dscp = val[1];
			}
		});
	};
	
	$.fn._Go = function(){
		$.fn._InitialPageLang();
		$.fn._InsertProfile();
		$.fn._InitialProfileParam();
		$.fn._InitialProfileCtrl();
		$.fn._InitialResCtrl();
		$.fn._InitialFunc();
		$('#reloading_container').hide();
		$('#container').show();
	};
	$.fn._InitialPageLang = function(){
		$("#Mcurrent_profile_title")[0].innerHTML 		= $.fn._GetLangStr(LT._Current_Compression_Mode);
		$("#Mcurrent_profile")[0].innerHTML 			= $.fn._GetLangStr(LT._Current_Profile)+":";
		$("#Medit_profile_title")[0].innerHTML 			= $.fn._GetLangStr(LT._Compression_Profiles);
		$("#Medit_profile")[0].innerHTML 				= $.fn._GetLangStr(LT._Edit_Profile)+":";
		for(var i = 1; i <=2; i++)
		{
			$("#Mstream"+i+"_title")[0].innerHTML 		= $.fn._GetLangStr(LT._Stream)+i;
			$("#Mstream"+i+"_res")[0].innerHTML 		= $.fn._GetLangStr(LT._Resolution)+":";
			$("#Mstream"+i+"_codec")[0].innerHTML 		= $.fn._GetLangStr(LT._Codec)+":";
			$("#Mstream"+i+"_dscp")[0].innerHTML		= $.fn._GetLangStr(LT._Qos)+":";
			$("#Mstream"+i+"_profile")[0].innerHTML		= $.fn._GetLangStr(LT._Profile)+":";
			$("#Mstream"+i+"_frame")[0].innerHTML 		= $.fn._GetLangStr(LT._Frame_Rate)+":";
			$("#Mstream"+i+"_gop")[0].innerHTML 		= $.fn._GetLangStr(LT._GOP_Length)+":";
			$("#Mstream"+i+"_rate_ctrl")[0].innerHTML 	= $.fn._GetLangStr(LT._Rate_Control)+":";
			$("#Mstream"+i+"_cbr")[0].innerHTML 		= $.fn._GetLangStr(LT._CBR_BitRate)+":";
			$("#Mstream"+i+"_vbr_min")[0].innerHTML 	= $.fn._GetLangStr(LT._VBR_BitRate_Min)+":";
			$("#Mstream"+i+"_vbr_max")[0].innerHTML 	= $.fn._GetLangStr(LT._VBR_BitRate_Max)+":";
			$("#Mstream"+i+"_quality")[0].innerHTML 	= $.fn._GetLangStr(LT._Quality)+":";
		}

		$("#Mstream3_title")[0].innerHTML 				= $.fn._GetLangStr(LT._Stream)+"3";
		$("#Mstream3_res")[0].innerHTML 				= $.fn._GetLangStr(LT._Resolution)+":";
		$("#Mstream3_codec")[0].innerHTML 				= $.fn._GetLangStr(LT._Codec)+":";
		$("#Mstream3_frame")[0].innerHTML 				= $.fn._GetLangStr(LT._Frame_Rate)+":";
		$("#Mstream3_quality")[0].innerHTML 			= $.fn._GetLangStr(LT._Quality)+":";
		$("#Mstream3_dscp")[0].innerHTML 				= $.fn._GetLangStr(LT._Qos)+":";

		$.fn._InitialOptionLang("Icurrent_profile");
		$.fn._InitialOptionLang("Iedit_profile");

		$("#Icurrent_profile_save").val($.fn._GetLangStr(LT._SaveProfile));
	};

	$.fn._InsertProfile = function()
	{
		confList = "Profile1,Profile2,Profile3,Profile4,Profile5,Profile6".split(',');
		$("#Icurrent_profile").find('option').remove();
		$.each(confList, function(n){
			$("#Icurrent_profile").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
		});

		$("#Iedit_profile").find('option').remove();
		$.each(confList, function(n){
			$("#Iedit_profile").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
		});

		if(edit_id == "unknow")
		{
			if(current_id == "1")
				$("#Icurrent_profile")[0].selectedIndex = 0;
			else if(current_id == "2")
				$("#Icurrent_profile")[0].selectedIndex = 1;
			else if(current_id == "3")
				$("#Icurrent_profile")[0].selectedIndex = 2;
			else if(current_id == "4")
				$("#Icurrent_profile")[0].selectedIndex = 3;
			else if(current_id == "5")
				$("#Icurrent_profile")[0].selectedIndex = 4;
			else if(current_id == "6")
				$("#Icurrent_profile")[0].selectedIndex = 5;

			if(current_id == "1")
				$("#Iedit_profile")[0].selectedIndex = 0;
			else if(current_id == "2")
				$("#Iedit_profile")[0].selectedIndex = 1;
			else if(current_id == "3")
				$("#Iedit_profile")[0].selectedIndex = 2;
			else if(current_id == "4")
				$("#Iedit_profile")[0].selectedIndex = 3;
			else if(current_id == "5")
				$("#Iedit_profile")[0].selectedIndex = 4;
			else if(current_id == "6")
				$("#Iedit_profile")[0].selectedIndex = 5;

		}
		else 
		{
			if(current_id == "1")
				$("#Icurrent_profile")[0].selectedIndex = 0;
			else if(current_id == "2")
				$("#Icurrent_profile")[0].selectedIndex = 1;
			else if(current_id == "3")
				$("#Icurrent_profile")[0].selectedIndex = 2;
			else if(current_id == "4")
				$("#Icurrent_profile")[0].selectedIndex = 3;
			else if(current_id == "5")
				$("#Icurrent_profile")[0].selectedIndex = 4;
			else if(current_id == "6")
				$("#Icurrent_profile")[0].selectedIndex = 5;

			if(edit_id == "1")
				$("#Iedit_profile")[0].selectedIndex = 0;
			else if(edit_id == "2")
				$("#Iedit_profile")[0].selectedIndex = 1;
			else if(edit_id == "3")
				$("#Iedit_profile")[0].selectedIndex = 2;
			else if(edit_id == "4")
				$("#Iedit_profile")[0].selectedIndex = 3;
			else if(edit_id == "5")
				$("#Iedit_profile")[0].selectedIndex = 4;
			else if(edit_id == "6")
				$("#Iedit_profile")[0].selectedIndex = 5;

		}
	};

	$.fn._InitialProfileParam = function()
	{
		var request;
		if(edit_id == "unknow")
			edit_id = current_id;
		for(var i = 1; i<=6; i++)
		{
			if(i == edit_id)
			{
				request = 	 "image.encode.profile"+i+".stream1.frame_rate&"+
						  	 "image.encode.profile"+i+".stream1.h264_cbr_bitrate&"+
							 "image.encode.profile"+i+".stream1.h264_gop&"+
							 "image.encode.profile"+i+".stream1.h264_rate_control_mode&"+
							 "image.encode.profile"+i+".stream1.h264_vbr_bitrate_max&"+
							 "image.encode.profile"+i+".stream1.h264_vbr_bitrate_min&"+
							 "image.encode.profile"+i+".stream1.mjpg_quality_level&"+
							 "image.encode.profile"+i+".stream1.dscp&"+
							 "image.encode.profile"+i+".stream1.h264_profile&"+
							 "image.encode.profile"+i+".stream2.frame_rate&"+
							 "image.encode.profile"+i+".stream2.h264_cbr_bitrate&"+
							 "image.encode.profile"+i+".stream2.h264_gop&"+
							 "image.encode.profile"+i+".stream2.h264_rate_control_mode&"+
							 "image.encode.profile"+i+".stream2.h264_vbr_bitrate_max&"+
							 "image.encode.profile"+i+".stream2.h264_vbr_bitrate_min&"+
							 "image.encode.profile"+i+".stream2.mjpg_quality_level&"+
							 "image.encode.profile"+i+".stream2.dscp&"+
							 "image.encode.profile"+i+".stream2.h264_profile&"+
							 "image.encode.profile"+i+".stream3.frame_rate&"+
							 "image.encode.profile"+i+".stream3.mjpg_quality_level&"+
							 "image.encode.profile"+i+".stream3.dscp";
			}
			else continue;
		}

		$.ajax({
			url:'/cgi-bin/get?'+request,
			dataType:'json',
			cache:false,
			success:function(data){
				$.fn._ProfileAssignValue(data);
			},
			error:function(xhr, textStatus, errorThrown){
			},
			complete:function(){
				$.fn._InitialSlider();
				$("#Istream1_vbr_min" ).change();
				$("#Istream2_vbr_min" ).change();
				$.fn._InitialRes();
			}
		});
	};

	$.fn._InitialProfileCtrl = function()
	{
		var request, Index;
		$("#Iedit_profile").change(function(){
			Index = this.selectedIndex+1;

			for(var i = 1; i<=6; i++)
			{
				if(i == Index)
				{
					request = 	 "image.encode.profile"+i+".stream1.frame_rate&"+
							  	 "image.encode.profile"+i+".stream1.h264_cbr_bitrate&"+
								 "image.encode.profile"+i+".stream1.h264_gop&"+
								 "image.encode.profile"+i+".stream1.h264_rate_control_mode&"+
								 "image.encode.profile"+i+".stream1.h264_vbr_bitrate_max&"+
								 "image.encode.profile"+i+".stream1.h264_vbr_bitrate_min&"+
								 "image.encode.profile"+i+".stream1.mjpg_quality_level&"+
								 "image.encode.profile"+i+".stream1.dscp&"+
								 "image.encode.profile"+i+".stream1.h264_profile&"+
								 "image.encode.profile"+i+".stream2.frame_rate&"+
								 "image.encode.profile"+i+".stream2.h264_cbr_bitrate&"+
								 "image.encode.profile"+i+".stream2.h264_gop&"+
								 "image.encode.profile"+i+".stream2.h264_rate_control_mode&"+
								 "image.encode.profile"+i+".stream2.h264_vbr_bitrate_max&"+
								 "image.encode.profile"+i+".stream2.h264_vbr_bitrate_min&"+
								 "image.encode.profile"+i+".stream2.mjpg_quality_level&"+
					 			 "image.encode.profile"+i+".stream2.dscp&"+
					 			 "image.encode.profile"+i+".stream2.h264_profile&"+
					 			 "image.encode.profile"+i+".stream3.frame_rate&"+
							 	 "image.encode.profile"+i+".stream3.mjpg_quality_level&"+
							 	 "image.encode.profile"+i+".stream3.dscp&";
				}
				else continue;
			}
			edit_id = Index;
			$.ajax({
				url:'/cgi-bin/get?'+request,
				dataType:'json',
				cache:false,
				success:function(data){
					$.fn._ProfileAssignValue(data);
				},
				error:function(xhr, textStatus, errorThrown){
				},
				complete:function(){
					$.fn._InitialSlider();
					$("#Istream1_vbr_min" ).change();
					$("#Istream2_vbr_min" ).change();
					$.fn._InitialRes();
				}
			});
		});
	};

	$.fn._InitialSlider = function()
	{
		var Number_regex = /^\d+$/;
		
		// stream1 cbr - slider
		var Istream1_cbr_slider = $( "#Istream1_cbr_bar" ).slider({			
			value:$("#Istream1_cbr").val(),			
			min: parseInt(bitrate_range[0]),		
			max: parseInt(bitrate_range[1]),			
			step:1,			
			slide: function( event, ui ) {				
				$( "#Istream1_cbr" ).val(ui.value);			
			},
			change: function(event, ui){
				profile_stream1_h264_cbr_bitrate = ui.value;
			}		
		});
		$("#Istream1_cbr" ).change(function(e) {
			e.preventDefault();
	    	e.stopImmediatePropagation();
			if((parseInt(this.value) >= parseInt(bitrate_range[0]) && parseInt(this.value) <= parseInt(bitrate_range[1])) && !isNaN(this.value) && Number_regex.test(this.value)){
	 			Istream1_cbr_slider.slider("value", this.value);
				profile_stream1_h264_cbr_bitrate = this.value;
			}else
				$("#Istream1_cbr").val(profile_stream1_h264_cbr_bitrate);
	    }).keyup(function(e){
			code = e.keyCode ? e.keyCode : e.which;
			if(code == 13){
				if((parseInt(this.value) >= parseInt(bitrate_range[0]) && parseInt(this.value) <= parseInt(bitrate_range[1])) && !isNaN(this.value) && Number_regex.test(this.value)){
		 			Istream1_cbr_slider.slider("value", this.value);
					profile_stream1_h264_cbr_bitrate = this.value;
				}else
					$("#Istream1_cbr").val(profile_stream1_h264_cbr_bitrate);
			}
		});

		// stream1 min vbr - slider
		var Istream1_vbr_min_slider = $( "#Istream1_vbr_min_bar" ).slider({			
			value:$("#Istream1_vbr_min").val(),			
			min: parseInt(bitrate_range[0]),		
			max: parseInt($("#Istream1_vbr_max").val())-1,			
			step:1,			
			slide: function( event, ui ) {
				$( "#Istream1_vbr_min" ).val(ui.value);
				Istream1_vbr_min_slider.slider({max:parseInt($("#Istream1_vbr_max").val())-1});
			},
			change: function(event, ui){
				profile_stream1_h264_vbr_bitrate_min = ui.value;
				Istream1_vbr_min_slider.slider({max:parseInt($("#Istream1_vbr_max").val())-1});
				if(ui.value == parseInt(bitrate_range[0])){
					Istream1_vbr_max_slider.slider({min:parseInt(bitrate_range[0])+1});
					$("#Istream1_vbr_min_range")[0].innerHTML 	= "("+bitrate_range[0]+"~"+(parseInt($("#Istream1_vbr_max").val())-1)+")";
					$("#Istream1_vbr_max_range")[0].innerHTML 	= "("+(parseInt(bitrate_range[0])+1)+"~"+bitrate_range[1]+")";
				}
				else{
					Istream1_vbr_max_slider.slider({min:parseInt($("#Istream1_vbr_min").val())+1});
					$("#Istream1_vbr_min_range")[0].innerHTML 	= "("+bitrate_range[0]+"~"+(parseInt($("#Istream1_vbr_max").val())-1)+")";
					$("#Istream1_vbr_max_range")[0].innerHTML 	= "("+(parseInt(ui.value)+1)+"~"+bitrate_range[1]+")";
				}
			}		
		});
		$("#Istream1_vbr_min" ).change(function(e) {
			e.preventDefault();
	    	e.stopImmediatePropagation();
			if((parseInt(this.value) >= parseInt(bitrate_range[0]) && parseInt(this.value) <= $("#Istream1_vbr_max").val()) && !isNaN(this.value) && Number_regex.test(this.value)){
	 			Istream1_vbr_min_slider.slider("value", this.value);
				profile_stream1_h264_vbr_bitrate_min = this.value;
			}else
				$("#Istream1_vbr_min").val(profile_stream1_h264_vbr_bitrate_min);
	    }).keyup(function(e){
			code = e.keyCode ? e.keyCode : e.which;
			if(code == 13){
				if((parseInt(this.value) >= parseInt(bitrate_range[0]) && parseInt(this.value) <= $("#Istream1_vbr_max").val()) && !isNaN(this.value) && Number_regex.test(this.value)){
		 			Istream1_vbr_min_slider.slider("value", this.value);
					profile_stream1_h264_vbr_bitrate_min = this.value;
				}else
					$("#Istream1_vbr_min").val(profile_stream1_h264_vbr_bitrate_min);
			}
		});

		// stream1 max vbr - slider
		var Istream1_vbr_max_slider = $( "#Istream1_vbr_max_bar" ).slider({			
			value:$("#Istream1_vbr_max").val(),			
			min: parseInt($("#Istream1_vbr_min").val())+1,		
			max: parseInt(bitrate_range[1]),			
			step:1,			
			slide: function( event, ui ) {		
				if(($("#Istream1_vbr_min").val() == (parseInt(bitrate_range[1])-1)) && ($("#Istream1_vbr_max").val() == bitrate_range[1])){
					$("#Istream1_vbr_max").val(bitrate_range[1]);
				}else{
					$( "#Istream1_vbr_max" ).val(ui.value);
				}

				Istream1_vbr_max_slider.slider({min:parseInt($("#Istream1_vbr_min").val())+1});
			},
			change: function(event, ui){
				profile_stream1_h264_vbr_bitrate_max = ui.value;
				Istream1_vbr_max_slider.slider({min:parseInt($("#Istream1_vbr_min").val())+1});
				if(ui.value == parseInt(bitrate_range[1])){
					Istream1_vbr_min_slider.slider({max:parseInt(bitrate_range[1])-1});
					$("#Istream1_vbr_min_range")[0].innerHTML 	= "("+bitrate_range[0]+"~"+(parseInt(bitrate_range[1])-1)+")";
					$("#Istream1_vbr_max_range")[0].innerHTML 	= "("+(parseInt($("#Istream1_vbr_min").val())+1)+"~"+bitrate_range[1]+")";
				}else{
					Istream1_vbr_min_slider.slider({max:parseInt($("#Istream1_vbr_max").val())-1});
					$("#Istream1_vbr_min_range")[0].innerHTML 	= "("+bitrate_range[0]+"~"+(parseInt(ui.value)-1)+")";
					$("#Istream1_vbr_max_range")[0].innerHTML 	= "("+(parseInt($("#Istream1_vbr_min").val())+1)+"~"+bitrate_range[1]+")";
				}
					
			}		
		});
		$("#Istream1_vbr_max" ).change(function(e) {
			e.preventDefault();
	    	e.stopImmediatePropagation();
			if((parseInt(this.value) >= $("#Istream1_vbr_min").val() && parseInt(this.value) <= parseInt(bitrate_range[1])) && !isNaN(this.value) && Number_regex.test(this.value)){
	 			Istream1_vbr_max_slider.slider("value", this.value);
				profile_stream1_h264_vbr_bitrate_max = this.value;
			}else
				$("#Istream1_vbr_max").val(profile_stream1_h264_vbr_bitrate_max);
	    }).keyup(function(e){
			code = e.keyCode ? e.keyCode : e.which;
			if(code == 13){
				if((parseInt(this.value) >= $("#Istream1_vbr_min").val() && parseInt(this.value) <= parseInt(bitrate_range[1])) && !isNaN(this.value) && Number_regex.test(this.value)){
		 			Istream1_vbr_max_slider.slider("value", this.value);
					profile_stream1_h264_vbr_bitrate_max = this.value;
				}else
					$("#Istream1_vbr_max").val(profile_stream1_h264_vbr_bitrate_max);
			}
		});

		// stream2 cbr - slider
		var Istream2_cbr_slider = $( "#Istream2_cbr_bar" ).slider({			
			value:$("#Istream2_cbr").val(),			
			min: parseInt(bitrate_range[0]),		
			max: parseInt(bitrate_range[1]),			
			step:1,			
			slide: function( event, ui ) {				
				$( "#Istream2_cbr" ).val(ui.value);			
			},
			change: function(event, ui){
				profile_stream2_h264_cbr_bitrate = ui.value;
			}		
		});
		$("#Istream2_cbr" ).change(function(e) {
			e.preventDefault();
	    	e.stopImmediatePropagation();
			if((parseInt(this.value) >= parseInt(bitrate_range[0]) && parseInt(this.value) <= parseInt(bitrate_range[1])) && !isNaN(this.value) && Number_regex.test(this.value)){
	 			Istream2_cbr_slider.slider("value", this.value);
				profile_stream2_h264_cbr_bitrate = this.value;
			}else
				$("#Istream2_cbr").val(profile_stream2_h264_cbr_bitrate);
	    }).keyup(function(e){
			code = e.keyCode ? e.keyCode : e.which;
			if(code == 13){
				if((parseInt(this.value) >= parseInt(bitrate_range[0]) && parseInt(this.value) <= parseInt(bitrate_range[1])) && !isNaN(this.value) && Number_regex.test(this.value)){
		 			Istream2_cbr_slider.slider("value", this.value);
					profile_stream2_h264_cbr_bitrate = this.value;
				}else
					$("#Istream2_cbr").val(profile_stream2_h264_cbr_bitrate);
			}
		});

		// stream2 min vbr - slider
		var Istream2_vbr_min_slider = $( "#Istream2_vbr_min_bar" ).slider({			
			value:$("#Istream2_vbr_min").val(),			
			min: parseInt(bitrate_range[0]),		
			max: parseInt($("#Istream2_vbr_max").val())-1,			
			step:1,			
			slide: function( event, ui ) {				
				$( "#Istream2_vbr_min" ).val(ui.value);
				Istream2_vbr_min_slider.slider({max:parseInt($("#Istream2_vbr_max").val())-1});
			},
			change: function(event, ui){
				profile_stream2_h264_vbr_bitrate_min = ui.value;
				Istream2_vbr_min_slider.slider({max:parseInt($("#Istream2_vbr_max").val())-1});
				if(ui.value == parseInt(bitrate_range[0])){
					Istream2_vbr_max_slider.slider({min:parseInt(bitrate_range[0])+1});
					$("#Istream2_vbr_min_range")[0].innerHTML 	= "("+bitrate_range[0]+"~"+(parseInt($("#Istream2_vbr_max").val())-1)+")";
					$("#Istream2_vbr_max_range")[0].innerHTML 	= "("+(parseInt(bitrate_range[0])+1)+"~"+bitrate_range[1]+")";
				}
				else{
					Istream2_vbr_max_slider.slider({min:parseInt(bitrate_range[0])+1});
					$("#Istream2_vbr_min_range")[0].innerHTML 	= "("+bitrate_range[0]+"~"+(parseInt($("#Istream2_vbr_max").val())-1)+")";
					$("#Istream2_vbr_max_range")[0].innerHTML 	= "("+(parseInt(ui.value)+1)+"~"+bitrate_range[1]+")";
				}
			}
		});
		$("#Istream2_vbr_min" ).change(function(e) {
			e.preventDefault();
	    	e.stopImmediatePropagation();
			if((parseInt(this.value) >= parseInt(bitrate_range[0]) && parseInt(this.value) <= $("#Istream2_vbr_max").val()) && !isNaN(this.value) && Number_regex.test(this.value)){
	 			Istream2_vbr_min_slider.slider("value", this.value);
				profile_stream2_h264_vbr_bitrate_min = this.value;
			}else
				$("#Istream2_vbr_min").val(profile_stream2_h264_vbr_bitrate_min);
	    }).keyup(function(e){
			code = e.keyCode ? e.keyCode : e.which;
			if(code == 13){
				if((parseInt(this.value) >= parseInt(bitrate_range[0]) && parseInt(this.value) <= $("#Istream2_vbr_max").val()) && !isNaN(this.value) && Number_regex.test(this.value)){
		 			Istream2_vbr_min_slider.slider("value", this.value);
					profile_stream2_h264_vbr_bitrate_min = this.value;
				}else
					$("#Istream2_vbr_min").val(profile_stream2_h264_vbr_bitrate_min);
			}
		});

		// stream2 max vbr - slider
		var Istream2_vbr_max_slider = $( "#Istream2_vbr_max_bar" ).slider({			
			value:$("#Istream2_vbr_max").val(),			
			min: parseInt($("#Istream2_vbr_min").val())+1,		
			max: parseInt(bitrate_range[1]),			
			step:1,			
			slide: function( event, ui ) {		
				if(($("#Istream2_vbr_min").val() == (parseInt(bitrate_range[1])-1)) && ($("#Istream2_vbr_max").val() == bitrate_range[1])){
					$("#Istream2_vbr_max").val(bitrate_range[1]);
				}else{
					$( "#Istream2_vbr_max" ).val(ui.value);
				}
				
				Istream2_vbr_max_slider.slider({min:parseInt($("#Istream2_vbr_min").val())+1});
			},
			change: function(event, ui){
				profile_stream2_h264_vbr_bitrate_max = ui.value;
				Istream2_vbr_max_slider.slider({min:parseInt($("#Istream2_vbr_min").val())+1});
				if(ui.value == parseInt(bitrate_range[1])){
					Istream2_vbr_min_slider.slider({max:parseInt(bitrate_range[1])-1});
					$("#Istream2_vbr_min_range")[0].innerHTML 	= "("+bitrate_range[0]+"~"+(parseInt(bitrate_range[1])-1)+")";
					$("#Istream2_vbr_max_range")[0].innerHTML 	= "("+(parseInt($("#Istream2_vbr_min").val())+1)+"~"+bitrate_range[1]+")";
				}else{
					Istream2_vbr_min_slider.slider({max:parseInt($("#Istream2_vbr_max").val())-1});
					$("#Istream2_vbr_min_range")[0].innerHTML 	= "("+bitrate_range[0]+"~"+(parseInt(ui.value)-1)+")";
					$("#Istream2_vbr_max_range")[0].innerHTML 	= "("+(parseInt($("#Istream2_vbr_min").val())+1)+"~"+bitrate_range[1]+")";
				}
			}		
		});
		$("#Istream2_vbr_max" ).change(function(e) {
			e.preventDefault();
	    	e.stopImmediatePropagation();
			if((parseInt(this.value) >= $("#Istream2_vbr_min").val() && parseInt(this.value) <= parseInt(bitrate_range[1])) && !isNaN(this.value) && Number_regex.test(this.value)){
	 			Istream2_vbr_max_slider.slider("value", this.value);
				profile_stream2_h264_vbr_bitrate_max = this.value;
			}else
				$("#Istream2_vbr_max").val(profile_stream2_h264_vbr_bitrate_max);
	    }).keyup(function(e){
			code = e.keyCode ? e.keyCode : e.which;
			if(code == 13){
				if((parseInt(this.value) >= $("#Istream2_vbr_min").val() && parseInt(this.value) <= parseInt(bitrate_range[1])) && !isNaN(this.value) && Number_regex.test(this.value)){
		 			Istream2_vbr_max_slider.slider("value", this.value);
					profile_stream2_h264_vbr_bitrate_max = this.value;
				}else
					$("#Istream2_vbr_max").val(profile_stream2_h264_vbr_bitrate_max);
			}
		});
	};

	$.fn._InitialResCtrl = function()
	{
		var sec_index = -1;
		var final_sec_res_list = [];
		var final_third_res_list = [];
		
		// stream2 - option
		// 5M sensor -ntsc
		var sec_5M_ntsc_res_list = 
		[
			["OFF","800x600","640x480","640x360","320x240","320x176"],			 // 2592x1944
			["OFF","1280x720","800x600","640x480","640x360","320x240","320x176"],// 2048x1536
			["OFF","640x360","320x240","320x176"],						 		 // 1920x1080
			["OFF","1280x720","800x600","640x480","640x360","320x240","320x176"],// 1280x960
			["OFF","1280x720","800x600","640x480","640x360","320x240","320x176"],// 1280x720
		];
	
		// 3M sensor -ntsc
		var sec_3M_ntsc_res_list = 
		[
			["OFF","1280x720","800x600","640x480","640x360","320x240","320x176"],// 2048x1536
			["OFF","640x360","320x240","320x176"],						 		 // 1920x1080
			["OFF","1280x720","800x600","640x480","640x360","320x240","320x176"],// 1280x960
			["OFF","1280x720","800x600","640x480","640x360","320x240","320x176"],// 1280x720
		];

		// 2M sensor -ntsc
		var sec_2M_ntsc_res_list = 
		[
			["OFF","640x360","320x240","320x176"],						 		 // 1920x1080
			["OFF","1280x720","800x600","640x480","640x360","320x240","320x176"],// 1280x960
			["OFF","1280x720","800x600","640x480","640x360","320x240","320x176"],// 1280x720
		];

		// 1M sensor - ntsc
		var sec_1M_ntsc_res_list = 
		[
			["OFF","1280x720","800x600","640x480","640x360","320x240","320x176"],// 1280x720					
		];

		// 5M sensor -pal
		var sec_5M_pal_res_list = 
		[
			["OFF","800x600","640x480","640x360","320x240","320x176"],			 // 2592x1944
			["OFF","1280x720","800x600","640x480","640x360","320x240","320x176"],// 2048x1536
			["OFF","640x360","320x240","320x176"],						 		 // 1920x1080
			["OFF","1280x720","800x600","640x480","640x360","320x240","320x176"],// 1280x960
			["OFF","1280x720","800x600","640x480","640x360","320x240","320x176"],// 1280x720
		];

		// 3M sensor -pal
		var sec_3M_pal_res_list = 
		[
			["OFF","1280x720","800x600","640x480","640x360","320x240","320x176"],// 2048x1536
			["OFF","640x360","320x240","320x176"],						 		 // 1920x1080
			["OFF","1280x720","800x600","640x480","640x360","320x240","320x176"],// 1280x960
			["OFF","1280x720","800x600","640x480","640x360","320x240","320x176"],// 1280x720
		];

		// 2M sensor -pal
		var sec_2M_pal_res_list = 
		[
			["OFF","640x360","320x240","320x176"],							 	 // 1920x1080
			["OFF","1280x720","800x600","640x480","640x360","320x240","320x176"],// 1280x960
			["OFF","1280x720","800x600","640x480","640x360","320x240","320x176"],// 1280x720
		];

		// 1M sensor - pal
		var sec_1M_pal_res_list = 
		[
			["OFF","1280x720","800x600","640x480","640x360","320x240","320x176"],// 1280x720
		];

		if(model_lens == 5)
		{
			if(camera_type == "ntsc")
				final_sec_res_list = sec_5M_ntsc_res_list;
			else if(camera_type == "pal")
				final_sec_res_list = sec_5M_pal_res_list;
		}
		else if(model_lens == 3)
		{
			if(camera_type == "ntsc")
				final_sec_res_list = sec_3M_ntsc_res_list;
			else if(camera_type == "pal")
				final_sec_res_list = sec_3M_pal_res_list;
		}
		else if(model_lens == 2)
		{
			if(camera_type == "ntsc")
				final_sec_res_list = sec_2M_ntsc_res_list;
			else if(camera_type == "pal")
				final_sec_res_list = sec_2M_pal_res_list;
		}
		else if(model_lens == 1)
		{
			if(camera_type == "ntsc")
				final_sec_res_list = sec_1M_ntsc_res_list;
			else if(camera_type == "pal")
				final_sec_res_list = sec_1M_pal_res_list;

			$("#Istream1_res").attr("disabled",true);
		}

		$("#Istream3_res").attr("disabled",true);
		$("#Istream3_codec").attr("disabled",true);
		
		$("#Istream1_res").change(function(){
			sec_index = this.selectedIndex;
			
			// record insert option num
			var num, st1_fps = 0 , st2_fps = 0, st3_fps = 0, st1_gop = 0, st2_gop = 0;
			var option_list = 0;

			// insert stream2 res array
			$.each(final_sec_res_list, function(n, data){
				if(n == sec_index){
					
					// remove stream2 res
					$("#Istream2_res").find('option').remove();
	
					// insert stream2 res option
					$.each(data, function(n, res){
						$("#Istream2_res").append($("<option></option>").attr("value", res).text(res));
						num = n;
					});
				}
			});

			if(num == 0)
			{
				$("#Istream2_res")[0].selectedIndex = 0;
				$("#Istream2_codec")[0].selectedIndex = 0;
				$("#Istream2_res").attr("disabled",true);
				$("#Istream2_codec").attr("disabled",true);
				$("#Istream2_codec").change();
			}
			else
			{
				if($("#Istream2_codec").val() != "OFF")
					$("#Istream2_res")[0].selectedIndex = 1;
				else
					$("#Istream2_res")[0].selectedIndex = 0;

				$("#Istream2_res").attr("disabled",false);
				$("#Istream2_codec").attr("disabled",false);
			}
			$.fn._InitialOptionLang("Istream2_res");
			$.fn._InitialOptionLang("Istream2_codec");

			// frame limitation by resolution.
			// note:frame drop down to 12,  gop drop down to 24.
			if($(this).val() == "2592x1944")
			{
				$("#Istream1_codec > option").each(function(n){
					option_list = n;
				});

				if(option_list == 1){
					$("#Istream1_codec").find('option').remove();
					confList = "h264".toUpperCase().split(',');
					$.each(confList, function(n){
						$("#Istream1_codec").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
					});
					
					$("#Istream1_codec")[0].selectedIndex = 0;
					$("#Istream1_codec").change();
				}
				
			 	confList = limit_frame_pal_by_12.split(',');
				
				$("#Istream1_frame").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == profile_stream1_h264_frame_rate){
						$("#Istream1_frame").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
						st1_fps = 1;
					}
					else
						$("#Istream1_frame").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				$("#Istream2_frame").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == profile_stream2_h264_frame_rate){
						$("#Istream2_frame").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
						st2_fps = 1;
					}
					else
						$("#Istream2_frame").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				$("#Istream3_frame").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == profile_stream3_h264_frame_rate){
						$("#Istream3_frame").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
						st3_fps = 1;
					}
					else
						$("#Istream3_frame").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

			 	confList = limit_gop_pal_by_24.split(',');

				$("#Istream1_gop").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == profile_stream1_h264_gop){
						$("#Istream1_gop").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
						st1_gop = 1;
					}
					else
						$("#Istream1_gop").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				$("#Istream2_gop").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == profile_stream2_h264_gop){
						$("#Istream2_gop").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
						st2_gop = 1;
					}
					else
						$("#Istream2_gop").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				if(st1_fps == 0)
					$("#Istream1_frame")[0].selectedIndex = 11;
				if(st2_fps == 0)
					$("#Istream2_frame")[0].selectedIndex = 11;
				if(st3_fps == 0)
					$("#Istream3_frame")[0].selectedIndex = 11;
				if(st1_gop == 0)
					$("#Istream1_gop")[0].selectedIndex = 23;
				if(st2_gop == 0)
					$("#Istream2_gop")[0].selectedIndex = 23;

				// insert stream3 res option
				$("#Istream3_res").find('option').remove();
				$("#Istream3_codec").find('option').remove();
				
				$("#Istream3_res").append($("<option></option>").attr("value", "640x480").text("640x480"));
				$("#Istream3_codec").append($("<option></option>").attr("value", "MJPEG").text("MJPEG"));
			}
			// frame limitation by resolution. 
			// note:frame drop down to 15,  gop drop down to 30.
			else if($(this).val() == "2048x1536")
			{
				$("#Istream1_codec > option").each(function(n){
					option_list = n;
				});

				if(option_list == 0){
					$("#Istream1_codec").find('option').remove();
					confList = "h264,mjpeg".toUpperCase().split(',');
					$.each(confList, function(n){
						$("#Istream1_codec").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
					});
					$("#Istream1_codec")[0].selectedIndex = 0;
					$("#Istream1_codec").change();
				}
				
			 	confList = limit_frame_ntsc_by_15.split(',');
				
				$("#Istream1_frame").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == profile_stream1_h264_frame_rate){
						$("#Istream1_frame").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
						st1_fps = 1;
					}
					else
						$("#Istream1_frame").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				$("#Istream2_frame").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == profile_stream2_h264_frame_rate){
						$("#Istream2_frame").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
						st2_fps = 1;
					}
					else
						$("#Istream2_frame").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				$("#Istream3_frame").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == profile_stream3_h264_frame_rate){
						$("#Istream3_frame").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
						st3_fps = 1;
					}
					else
						$("#Istream3_frame").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

			 	confList = limit_gop_ntsc_by_30.split(',');
				
				$("#Istream1_gop").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == profile_stream1_h264_gop){
						$("#Istream1_gop").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
						st1_gop = 1;
					}
					else
						$("#Istream1_gop").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				$("#Istream2_gop").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == profile_stream2_h264_gop){
						$("#Istream2_gop").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
						st2_gop = 1;
					}
					else
						$("#Istream2_gop").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				if(st1_fps == 0)
					$("#Istream1_frame")[0].selectedIndex = 14;
				if(st2_fps == 0)
					$("#Istream2_frame")[0].selectedIndex = 14;
				if(st3_fps == 0)
					$("#Istream3_frame")[0].selectedIndex = 14;
				if(st1_gop == 0)
					$("#Istream1_gop")[0].selectedIndex = 29;
				if(st2_gop == 0)
					$("#Istream2_gop")[0].selectedIndex = 29;

				// insert stream3 res option
				$("#Istream3_res").find('option').remove();
				$("#Istream3_codec").find('option').remove();
				
				$("#Istream3_res").append($("<option></option>").attr("value", "640x480").text("640x480"));
				$("#Istream3_codec").append($("<option></option>").attr("value", "MJPEG").text("MJPEG"));
			}
			else
			// note:frame drop down to 30,  gop drop down to 60(ntsc).
			// note:frame drop down to 25,  gop drop down to 50(pal).
			{
				$("#Istream1_codec > option").each(function(n){
					option_list = n;
				});

				if(option_list == 0){
					$("#Istream1_codec").find('option').remove();
					confList = "h264,mjpeg".toUpperCase().split(',');
					$.each(confList, function(n){
						$("#Istream1_codec").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
					});
					$.fn._InitialOptionLang("Istream1_codec");
					$("#Istream1_codec")[0].selectedIndex = 0;
					$("#Istream1_codec").change();
				}
				
				if(camera_type == "ntsc")
			 		confList = ntsc_frame.split(',');
				else if(camera_type == "pal")
			 		confList = pal_frame.split(',');

				$("#Istream1_frame").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == profile_stream1_h264_frame_rate)
						$("#Istream1_frame").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
					else
						$("#Istream1_frame").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				$("#Istream2_frame").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == profile_stream2_h264_frame_rate)
						$("#Istream2_frame").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
					else
						$("#Istream2_frame").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				if(camera_type == "ntsc")
			 		confList = limit_frame_pal_by_10.split(',');
				else if(camera_type == "pal")
			 		confList = limit_frame_pal_by_12_5.split(',');

				$("#Istream3_frame").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == profile_stream3_h264_frame_rate)
						$("#Istream3_frame").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
					else
						$("#Istream3_frame").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				if(camera_type == "ntsc")
			 		confList = ntsc_gop.split(',');
				else if(camera_type == "pal")
			 		confList = pal_gop.split(',');
				
				$("#Istream1_gop").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == profile_stream1_h264_gop)
						$("#Istream1_gop").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
					else
						$("#Istream1_gop").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				$("#Istream2_gop").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == profile_stream2_h264_gop)
						$("#Istream2_gop").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
					else
						$("#Istream2_gop").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				// insert stream3 res option
				$("#Istream3_res").find('option').remove();
				$("#Istream3_codec").find('option').remove();

				if($(this).val() == "1920x1080" || $(this).val() == "1280x720")
				{
					$("#Istream3_res").append($("<option></option>").attr("value", "640x480").text("640x360"));
					$("#Istream3_codec").append($("<option></option>").attr("value", "MJPEG").text("MJPEG"));
				}
				else if($(this).val() == "1280x960")
				{
					$("#Istream3_res").append($("<option></option>").attr("value", "640x480").text("640x480"));
					$("#Istream3_codec").append($("<option></option>").attr("value", "MJPEG").text("MJPEG"));
				}
			}

			$("#Istream2_res").change();
		});

		$("#Istream2_res").change(function(){
			if($(this).val() == "OFF"){
				$("#Istream2_codec")[0].selectedIndex = 0;
				$("#Mstream2_gop").parent().hide();
				$("#Mstream2_rate_ctrl").parent().hide();
				$("#Mstream2_quality").parent().hide();
				$("#Mstream2_dscp").parent().hide();
				$("#Mstream2_cbr").parent().parent().hide();
				$("#Mstream2_vbr_min").parent().parent().hide();
				$("#Mstream2_vbr_max").parent().parent().hide();
				$("#Mstream2_frame").parent().hide();
				$("#Istream2_frame").parent().hide();
			}
		});

		$("#Istream1_codec").change(function(){
			if($(this).val() == "H264"){
				$("#Mstream1_frame").parent().show();
				$("#Mstream1_gop").parent().show();
				$("#Mstream1_rate_ctrl").parent().show();
				$("#Mstream1_quality").parent().hide();
				$("#Mstream1_dscp").parent().show();
				$("#Mstream1_profile").parent().show();
				$("#Istream1_rate_ctrl").change();
			}
			else if($(this).val() == "MJPEG"){
				$("#Mstream1_frame").parent().show();
				$("#Mstream1_gop").parent().hide();
				$("#Mstream1_rate_ctrl").parent().hide();
				$("#Mstream1_quality").parent().show();
				$("#Mstream1_dscp").parent().show();
				$("#Mstream1_profile").parent().hide();
				$("#Mstream1_cbr").parent().parent().hide();
				$("#Mstream1_vbr_min").parent().parent().hide();
				$("#Mstream1_vbr_max").parent().parent().hide();
			}
		});

		$("#Istream2_codec").change(function(){
			if($(this).val() == "H264"){
				$("#Mstream2_frame").parent().show();
				$("#Mstream2_gop").parent().show();
				$("#Mstream2_rate_ctrl").parent().show();
				$("#Mstream2_quality").parent().hide();
				$("#Mstream2_dscp").parent().show();
				$("#Mstream2_profile").parent().show();
				$("#Istream2_rate_ctrl").change();
			}
			else if($(this).val() == "MJPEG"){
				$("#Mstream2_frame").parent().show();
				$("#Mstream2_gop").parent().hide();
				$("#Mstream2_rate_ctrl").parent().hide();
				$("#Mstream2_quality").parent().show();
				$("#Mstream2_dscp").parent().show();
				$("#Mstream2_profile").parent().hide();
				$("#Mstream2_cbr").parent().parent().hide();
				$("#Mstream2_vbr_min").parent().parent().hide();
				$("#Mstream2_vbr_max").parent().parent().hide();
			}
			else if($(this).val() == "OFF"){
				$("#Istream2_res")[0].selectedIndex = 0;
				$("#Mstream2_gop").parent().hide();
				$("#Mstream2_rate_ctrl").parent().hide();
				$("#Mstream2_quality").parent().hide();
				$("#Mstream2_dscp").parent().hide();
				$("#Mstream2_profile").parent().hide();
				$("#Mstream2_cbr").parent().parent().hide();
				$("#Mstream2_vbr_min").parent().parent().hide();
				$("#Mstream2_vbr_max").parent().parent().hide();
				$("#Mstream2_frame").parent().hide();
				$("#Istream2_frame").parent().hide();
			}
		});
	};

	$.fn._ParserRes = function(index)
	{
		var str1_res = "", str1_codec ="", str2_res ="", str2_codec ="", str3_res ="", str3_codec ="";
		var InitialProfile;
		var profile = "";
		var len = 0;
		
		if(index == 1)
			InitialProfile = tmp_profile_1;
		else if(index == 2)
			InitialProfile = tmp_profile_2;
		else if(index == 3)
			InitialProfile = tmp_profile_3;
		else if(index == 4)
			InitialProfile = tmp_profile_4;
		else if(index == 5)
			InitialProfile = tmp_profile_5;
		else if(index == 6)
			InitialProfile = tmp_profile_6;
		
		profile = InitialProfile.split(',');
		$.each(profile, function(n){
			if(n == 0){
				len = profile[n].indexOf('/');
				str1_res = profile[n].slice(0,len);
				str1_codec = profile[n].slice(len+1,profile[n].length);
			}
		});

		return str1_res;
	}

	$.fn._InitialFunc = function()
	{
		var command = "";
		var dscp_regex = /^\s*[0-9]+\s*$/;
		$("#Istream1_rate_ctrl").change(function(){
			if(this.selectedIndex == 0) // cbr
			{
				$("#Mstream1_cbr").parent().parent().show();
				$("#Mstream1_vbr_min").parent().parent().hide();
				$("#Mstream1_vbr_max").parent().parent().hide();
			}
			else if(this.selectedIndex == 1) // vbr
			{
				$("#Mstream1_cbr").parent().parent().hide();
				$("#Mstream1_vbr_min").parent().parent().show();
				$("#Mstream1_vbr_max").parent().parent().show();
			}
		});

		$("#Istream2_rate_ctrl").change(function(){
			if(this.selectedIndex == 0) // cbr
			{
				$("#Mstream2_cbr").parent().parent().show();
				$("#Mstream2_vbr_min").parent().parent().hide();
				$("#Mstream2_vbr_max").parent().parent().hide();
			}
			else if(this.selectedIndex == 1) // vbr
			{
				$("#Mstream2_cbr").parent().parent().hide();
				$("#Mstream2_vbr_min").parent().parent().show();
				$("#Mstream2_vbr_max").parent().parent().show();
			}
		});

		$("#Istream1_dscp").change(function(){
			var value = $(this).val();
			if((Number(value) < 0 || Number(value) > 63)|| !dscp_regex.test(value)){
				$(this).val(profile_stream1_dscp);
			}

			profile_stream1_dscp = $(this).val();
		});

		$("#Istream2_dscp").change(function(){
			var value = $(this).val();
			if((Number(value) < 0 || Number(value) > 63)|| !dscp_regex.test(value)){
				$(this).val(profile_stream2_dscp);
			}

			profile_stream2_dscp = $(this).val();
		});

		$("#Istream3_dscp").change(function(){
			var value = $(this).val();
			if((Number(value) < 0 || Number(value) > 63)|| !dscp_regex.test(value)){
				$(this).val(profile_stream3_dscp);
			}

			profile_stream3_dscp = $(this).val();
		});


		$("#Icurrent_profile_save").bind('click', function(){

			var current_profile_index = 0, change_res = "";
			if($("#Icurrent_profile")[0].selectedIndex == 0)
				current_profile_index = 1;
			else if($("#Icurrent_profile")[0].selectedIndex == 1)
				current_profile_index = 2;
			else if($("#Icurrent_profile")[0].selectedIndex == 2)
				current_profile_index = 3;
			else if($("#Icurrent_profile")[0].selectedIndex == 3)
				current_profile_index = 4;
			else if($("#Icurrent_profile")[0].selectedIndex == 4)
				current_profile_index = 5;
			else if($("#Icurrent_profile")[0].selectedIndex == 5)
				current_profile_index = 6;

			change_res = $.fn._ParserRes(current_profile_index);
			
			command = 	"image.encode.current_profile_id"	+"="+ current_profile_index +"&"+
						"image.encode.edit_profile_id"		+"="+ current_profile_index +"&";

			$.fn._SetParamByMask(command, $.fn._GetLangStr(LT._Reloading), 8000);

			if(coord_pri_res != change_res)
				$.fn._ResetCoordinates(coord_pri_res, change_res, model_lens, zone_1, zone_2, zone_3, zone_4, zone_5, zone_6, zone_7, zone_8, event_motion_area);
		});

		$("#Icon_setting_save_pic").bind('click', function(){

			var rate_control_1 = "", rate_control_2 = "", pr_1 = "", pr_2 = "";
			var quailty_1 = "", quailty_2 = "", quailty_3 = "";
			var edit_profile_index = -1;
			var encode = "";
			var s_1_res = $("#Istream1_res").val().toLowerCase();
			var s_1_codec = $("#Istream1_codec").val().toLowerCase();
			var s_2_res = $("#Istream2_res").val().toLowerCase();
			var s_2_codec = $("#Istream2_codec").val().toLowerCase();
			
			if($.fn._CheckCodec()){
				return;
			}

			encode = s_1_res+"/"+s_1_codec;

			if(s_2_res != "off" && s_2_codec != "off")
				encode = encode+","+s_2_res+"/"+s_2_codec;
			
			if($("#Istream1_rate_ctrl")[0].selectedIndex == 0)
				rate_control_1 = "cbr";
			else if($("#Istream1_rate_ctrl")[0].selectedIndex == 1)
				rate_control_1 = "vbr";

			if($("#Istream1_quality")[0].selectedIndex == 0)
				quailty_1 = "high";
			else if($("#Istream1_quality")[0].selectedIndex == 1)
				quailty_1 = "mid";
			else if($("#Istream1_quality")[0].selectedIndex == 2)
				quailty_1 = "low";

			if($("#Istream2_rate_ctrl")[0].selectedIndex == 0)
				rate_control_2 = "cbr";
			else if($("#Istream2_rate_ctrl")[0].selectedIndex == 1)
				rate_control_2 = "vbr";

			if($("#Istream2_quality")[0].selectedIndex == 0)
				quailty_2 = "high";
			else if($("#Istream2_quality")[0].selectedIndex == 1)
				quailty_2 = "mid";
			else if($("#Istream2_quality")[0].selectedIndex == 2)
				quailty_2 = "low";

			if($("#Istream3_quality")[0].selectedIndex == 0)
				quailty_3 = "high";
			else if($("#Istream3_quality")[0].selectedIndex == 1)
				quailty_3 = "mid";
			else if($("#Istream3_quality")[0].selectedIndex == 2)
				quailty_3 = "low";

			if($("#Iedit_profile")[0].selectedIndex == 0)
				edit_profile_index = 1;
			else if($("#Iedit_profile")[0].selectedIndex == 1)
				edit_profile_index = 2;
			else if($("#Iedit_profile")[0].selectedIndex == 2)
				edit_profile_index = 3;
			else if($("#Iedit_profile")[0].selectedIndex == 3)
				edit_profile_index = 4;
			else if($("#Iedit_profile")[0].selectedIndex == 4)
				edit_profile_index = 5;
			else if($("#Iedit_profile")[0].selectedIndex == 5)
				edit_profile_index = 6;

			if($("#Istream1_profile")[0].selectedIndex == 0)
				pr_1 = "main";
			else if($("#Istream1_profile")[0].selectedIndex == 1)
				pr_1 = "high";

			if($("#Istream2_profile")[0].selectedIndex == 0)
				pr_2 = "main";
			else if($("#Istream2_profile")[0].selectedIndex == 1)
				pr_2 = "high";

			for(var i = 1; i<=6; i++)
			{
				if(i == edit_profile_index)
				{
					command = 	 "image.encode.profile"+i+".encode"							+"="+	encode+"&"+
								 "image.encode.profile"+i+".stream1.frame_rate"				+"="+	$("#Istream1_frame").val()+"&"+
							  	 "image.encode.profile"+i+".stream1.h264_cbr_bitrate"		+"="+	$("#Istream1_cbr").val()+"&"+
								 "image.encode.profile"+i+".stream1.h264_gop"				+"="+	$("#Istream1_gop").val()+"&"+
								 "image.encode.profile"+i+".stream1.h264_rate_control_mode"	+"="+	rate_control_1+"&"+
								 "image.encode.profile"+i+".stream1.h264_vbr_bitrate_max"	+"="+	$("#Istream1_vbr_max").val()+"&"+
								 "image.encode.profile"+i+".stream1.h264_vbr_bitrate_min"	+"="+	$("#Istream1_vbr_min").val()+"&"+
								 "image.encode.profile"+i+".stream1.mjpg_quality_level"		+"="+	quailty_1+"&"+
								 "image.encode.profile"+i+".stream1.dscp"					+"="+	$("#Istream1_dscp").val()+"&"+
								 "image.encode.profile"+i+".stream1.h264_profile"			+"="+	pr_1+"&"+
								 "image.encode.profile"+i+".stream2.frame_rate"				+"="+	$("#Istream2_frame").val()+"&"+
								 "image.encode.profile"+i+".stream2.h264_cbr_bitrate"		+"="+	$("#Istream2_cbr").val()+"&"+
								 "image.encode.profile"+i+".stream2.h264_gop"				+"="+	$("#Istream2_gop").val()+"&"+
								 "image.encode.profile"+i+".stream2.h264_rate_control_mode"	+"="+	rate_control_2+"&"+
								 "image.encode.profile"+i+".stream2.h264_vbr_bitrate_max"	+"="+	$("#Istream2_vbr_max").val()+"&"+
								 "image.encode.profile"+i+".stream2.h264_vbr_bitrate_min"	+"="+	$("#Istream2_vbr_min").val()+"&"+
								 "image.encode.profile"+i+".stream2.mjpg_quality_level"		+"="+	quailty_2+"&"+	
								 "image.encode.profile"+i+".stream2.dscp"					+"="+	$("#Istream2_dscp").val()+"&"+
								 "image.encode.profile"+i+".stream2.h264_profile"			+"="+	pr_2+"&"+
								 "image.encode.profile"+i+".stream3.frame_rate"				+"="+	$("#Istream3_frame").val()+"&"+
							 	 "image.encode.profile"+i+".stream3.mjpg_quality_level"		+"="+	quailty_3+"&"+
							 	 "image.encode.profile"+i+".stream3.dscp"					+"="+	$("#Istream3_dscp").val()+"&"+	
								 "image.encode.edit_profile_id"								+"="+	edit_profile_index+"&";
				}
				else continue;
			}

			$.fn._SetParamByMask(command, $.fn._GetLangStr(LT._Reloading), 8000);
			if(coord_pri_res != s_1_res)
				$.fn._ResetCoordinates(coord_pri_res, s_1_res, model_lens, zone_1, zone_2, zone_3, zone_4, zone_5, zone_6, zone_7, zone_8, event_motion_area);
		});
	};

	$.fn._InitialRes = function()
	{
		var final_pri_res_list = new Array();
		var str1_res = "", str1_codec ="", str2_res ="", str2_codec ="", str3_res ="", str3_codec ="";
		var InitialProfile;
		var profile = "";
		var len = 0;

		// 5M sensor -ntsc
		var pri_5M_ntsc_res_list = new Array("2592x1944","2048x1536","1920x1080","1280x960","1280x720");
		
		// 3M sensor -ntsc
		var pri_3M_ntsc_res_list = new Array("2048x1536","1920x1080","1280x960","1280x720");

		// 2M sensor -ntsc
		var pri_2M_ntsc_res_list = new Array("1920x1080","1280x960","1280x720");

		// 1M sensor -ntsc
		var pri_1M_ntsc_res_list = new Array("1280x720");

		// 5M sensor -pal
		var pri_5M_pal_res_list = new Array("2592x1944","2048x1536","1920x1080","1280x960","1280x720");

		// 3M sensor -ntsc
		var pri_3M_pal_res_list = new Array("2048x1536","1920x1080","1280x960","1280x720");

		// 2M sensor -ntsc
		var pri_2M_pal_res_list = new Array("1920x1080","1280x960","1280x720");

		// 1M sensor -ntsc
		var pri_1M_pal_res_list = new Array("1280x720");

		if(model_lens == 5)
		{
			if(camera_type == "ntsc")
				final_pri_res_list = pri_5M_ntsc_res_list;
			else if(camera_type == "pal")
				final_pri_res_list = pri_5M_pal_res_list;
		}
		else if(model_lens == 3)
		{
			if(camera_type == "ntsc")
				final_pri_res_list = pri_3M_ntsc_res_list;
			else if(camera_type == "pal")
				final_pri_res_list = pri_3M_pal_res_list;
		}
		else if(model_lens == 2)
		{
			if(camera_type == "ntsc")
				final_pri_res_list = pri_2M_ntsc_res_list;
			else if(camera_type == "pal")
				final_pri_res_list = pri_2M_pal_res_list;
		}
		else if(model_lens == 1)
		{
			if(camera_type == "ntsc")
				final_pri_res_list = pri_1M_ntsc_res_list;
			else if(camera_type == "pal")
				final_pri_res_list = pri_1M_pal_res_list;
		}

		if($("#Iedit_profile")[0].selectedIndex == 0)
			InitialProfile = tmp_profile_1;
		else if($("#Iedit_profile")[0].selectedIndex == 1)
			InitialProfile = tmp_profile_2;
		else if($("#Iedit_profile")[0].selectedIndex == 2)
			InitialProfile = tmp_profile_3;
		else if($("#Iedit_profile")[0].selectedIndex == 3)
			InitialProfile = tmp_profile_4;
		else if($("#Iedit_profile")[0].selectedIndex == 4)
			InitialProfile = tmp_profile_5;
		else if($("#Iedit_profile")[0].selectedIndex == 5)
			InitialProfile = tmp_profile_6;

		profile = InitialProfile.split(',');
		$.each(profile, function(n){
			if(n == 0){
				len = profile[n].indexOf('/');
				str1_res = profile[n].slice(0,len);
				str1_codec = profile[n].slice(len+1,profile[n].length);

				// get coordinate resolution
				coord_pri_res = str1_res;
			} else if(n == 1){
				len = profile[n].indexOf('/');
				str2_res = profile[n].slice(0,len);
				str2_codec = profile[n].slice(len+1,profile[n].length);
			} else if(n == 2){
				len = profile[n].indexOf('/');
				str3_res = profile[n].slice(0,len);
				str3_codec = profile[n].slice(len+1,profile[n].length);
			}
		});

		//insert stream1 codec and callback stream1 codec
		$("#Istream1_codec").find('option').remove();

		//  The codec limitation at 5M resolution, it only support h264.
		if(str1_res == "2592x1944")
			confList = "h264".toUpperCase().split(',');
		else
			confList = "h264,mjpeg".toUpperCase().split(',');
		
		$.each(confList, function(n){
			if(confList[n].toLowerCase() == str1_codec)
				$("#Istream1_codec").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
			else
				$("#Istream1_codec").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
		});
		$.fn._InitialOptionLang("Istream1_codec");

		//insert stream2 codec and callback stream2 codec
		$("#Istream2_codec").find('option').remove();
		confList = "off,h264,mjpeg".toUpperCase().split(',');
		$.each(confList, function(n){
			if(confList[n].toLowerCase() == str2_codec)
				$("#Istream2_codec").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
			else
				$("#Istream2_codec").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
		});
		$.fn._InitialOptionLang("Istream2_codec");

		//insert stream1 res and callback stream1 res
		$("#Istream1_res").find('option').remove();
		$.each(final_pri_res_list, function(n,data){
			if(data == str1_res)
				$("#Istream1_res").append($("<option></option>").attr("value", data).text(data).attr("selected","true"));
			else
				$("#Istream1_res").append($("<option></option>").attr("value", data).text(data));
		});
		$.fn._InitialOptionLang("Istream1_res");
		
		$("#Istream1_res").change();
		$("#Istream1_codec").change();

		// callback stream2 res
		$("#Istream2_res").children().each(function(){
			if ($(this).text() == str2_res){
				$(this).attr("selected","true");
			}
		});
		$("#Istream2_res").change();
		$("#Istream2_codec").change();
		$.fn._InitialOptionLang("Istream2_res");
	};

	$.fn._CheckCodec = function()
	{
		if($("#Istream1_res").val() == "OFF")
		{
			$("#Istream1_res").select();
			alert($.fn._GetLangStr(LT._Stream)+"1 "+$.fn._GetLangStr(LT._Resoluion_emtpy));
			return  1;
		}

		if($("#Istream1_codec").val() == "OFF")
		{
			$("#Istream1_codec").select();
			alert($.fn._GetLangStr(LT._Stream)+"1 "+$.fn._GetLangStr(LT._Codec_emtpy));
			return  1;
		}
	
		if($("#Istream2_res").val() == "OFF" && $("#Istream2_codec").val() == "OFF")
			return  0;
		else if($("#Istream2_res").val() == "OFF" && $("#Istream2_codec").val() == "OFF")
			return  0;
		else
		{
			if($("#Istream2_res").val() == "OFF")
			{
				$("#Istream2_res").select();
				alert($.fn._GetLangStr(LT._Stream)+"2 "+$.fn._GetLangStr(LT._Resoluion_emtpy));
				return  1;
			}

			if($("#Istream2_codec").val() == "OFF")
			{
				$("#Istream2_codec").select();
				alert($.fn._GetLangStr(LT._Stream)+"2 "+$.fn._GetLangStr(LT._Codec_emtpy));
				return  1;
			}
		}
	};
	
})(jQuery);
