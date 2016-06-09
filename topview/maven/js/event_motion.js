(function($){
	var motion_area;
	var temp_area;
	var jcrop_api;
	var model_res;
	var profile_1;
	var profile_2;
	var profile_3;
	var profile_4;
	var profile_5;
	var profile_6;
	var current_id;
	var coord_pri_res;
	var coord_sec_res;
	var ntsc_frame = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30";
	var limit_frame_ntsc_by_15 = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15";
	var current_frame_rate, stream1_res;
	
	$.fn._ObjectAssignValue = function(src){
		$.each(src, function(param , val){
			if(param == "event.motion_detection.enable")
				$("input[name=Nmotion_enable][value='"+val[1]+"']").attr('checked',true);
			else if(param == "event.motion_detection.sensitivity")
			{
				var confList = "High,Medium,Low".split(',');
				$("#Isensitivity").find('option').remove();
				$.each(confList, function(n){
					$("#Isensitivity").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				if(val[1] == "high")
					$("#Isensitivity")[0].selectedIndex = 0;
				else if(val[1] == "medium")
					$("#Isensitivity")[0].selectedIndex = 1;
				else if(val[1] == "low")
					$("#Isensitivity")[0].selectedIndex = 2;
			}
			else if(param == "event.motion_detection.area")
			{
				initial_area = val[1];
				//console.log("Object get initial_area sx, sy, ex, ey 1" + val[1]);
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
				$("#Iduration").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == val[1]){
						$("#Iduration").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
						st1_fps = 1;
					}
					else
						$("#Iduration").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
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
		});
	};
	$.fn._Go = function(){
		$.fn._InitialPageLang(); // no
		$.fn._InitialCoordinate();
		$.fn._InitialResCtrl();
		$.fn._InitialMNwindow();
		$.fn._InitialPosition();
		$.fn._InitialMTCtrl();
		$.fn._InitialFunc();
		$('#reloading_container').hide();
		$('#container').show();
	};
	$.fn._InitialPageLang = function(){
		$("#Mmotion_title")[0].innerHTML 			= $.fn._GetLangStr(LT._Motion);
		$("#Mmotion_enable")[0].innerHTML 			= $.fn._GetLangStr(LT._Enable)+":";
		$("#Msensitivity")[0].innerHTML 			= $.fn._GetLangStr(LT._Sensitivity)+":";
		$("#Mmotion_enable_on")[0].innerHTML 		= $.fn._GetLangStr(LT._ON);
		$("#Mmotion_enable_off")[0].innerHTML 		= $.fn._GetLangStr(LT._OFF);
		$("#Iclean").val($.fn._GetLangStr(LT._Clean));
		$("#Mmotion_frame_rate")[0].innerHTML       = $.fn._GetLangStr(LT._Higher_Frame_Rate);
		$("#Mframe_rate_enable")[0].innerHTML 			= $.fn._GetLangStr(LT._Enable)+":";
		$("#Mframe_enable_on")[0].innerHTML 		= $.fn._GetLangStr(LT._ON);
		$("#Mframe_enable_off")[0].innerHTML 		= $.fn._GetLangStr(LT._OFF);
		$("#Mframerate")[0].innerHTML               = $.fn._GetLangStr(LT._Frame_Rate)+":";
		$("#Mduration")[0].innerHTML                = $.fn._GetLangStr(LT._Alarm_output_duration)+":";

		$.fn._InitialOptionLang("Isensitivity");
	};

	$.fn._InitialCoordinate = function()
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
	}

	$.fn._InitialResCtrl = function()
	{
		var frameList;

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
	$.fn._InitialMNwindow = function()
	{
		$("<div id=\"draw_area\"></div>").appendTo("#activex_area");

		$("#img_activex_area").attr("style","z-index:100;float:left;");

		var w, h, x, y;
		w = $("#img_activex_area").attr("width");
		h = $("#img_activex_area").attr("height");
		x = $("#img_activex_area").position().left;
		y = $("#img_activex_area").position().top;

		$("#draw_area").attr("style","width:"+w+"px;height:"+h+"px;position:absolute;left:"+x+";top:"+y+";");

		$('#draw_area').Jcrop({        
				onRelease: ""
			},function(){
				jcrop_api = this;
		});
	}

	$.fn._InitialPosition = function()
	{
		var sx = 0, sy = 0, ex = 0, ey = 0;
		var tmp = "";

		temp_area = initial_area;
		//console.log("_InitialPosition tmp_area: " + temp_area);
		$.fn._TransferCoordinatebefore();
		
		if(initial_area == "left,top,right,bottom" || initial_area == "0,0,0,0"){
			jcrop_api.setSelectArea([0,0,0,0],0);
		}else{
			tmp = initial_area.split(',');
			$.each(tmp, function(n){
				if(n == 0)
					sx = tmp[n];
				else if(n == 1)
					sy = tmp[n];
				else if(n == 2)
					ex = tmp[n];
				else if(n == 3)
					ey = tmp[n];
			});
			//console.log("sx, sy, ex, ey" + tmp);
			jcrop_api.setSelectArea([sx,sy,ex,ey],0);
		}

		jcrop_api.endInitial();
		draw_area = initial_area;
		//console.log("_InitialPosition draw_area: " + draw_area);
	}

	$.fn._InitialMTCtrl = function()
	{
		var sx = 0, sy = 0, ex = 0, ey = 0;
		var tmp = "";
		
		$("input[name=Nmotion_enable]").change(function(){
			if($(this).val() == "on")
			{
				jcrop_api.enable();
				$("#Isensitivity").attr("disabled",false);
				$("#Iclean").attr("disabled",false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
				$('.requiresjcrop').show();
				if(draw_area == "left,top,right,bottom" || draw_area == "0,0,0,0")
					jcrop_api.setSelectArea([0,0,0,0],0);
				else
				{
					tmp = draw_area.split(',');
					$.each(tmp, function(n){
						if(n == 0)
							sx = tmp[n];
						else if(n == 1)
							sy = tmp[n];
						else if(n == 2)
							ex = tmp[n];
						else if(n == 3)
							ey = tmp[n];
					});
				
					jcrop_api.setSelectArea([sx,sy,ex,ey],0);
				}
			}
			else if($(this).val() == "off")
			{
				jcrop_api.disable();
				$('.requiresjcrop').hide();
				$("#Isensitivity").attr("disabled",true);
				$("#Iclean").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
			}
		});

		$("input[name=Nmotion_enable]:checked").change();
	}

	$.fn._InitialFunc = function()
	{
		var command = "";
		
		$("#Icon_setting_save_pic").bind('click', function(){

			if(draw_area != initial_area)
				$.fn._TransferCoordinateAfter();
			else
				draw_area = temp_area;

			var sensitivity = ""; 
			if($("#Isensitivity")[0].selectedIndex == 0)
				sensitivity = "high";
			else if($("#Isensitivity")[0].selectedIndex == 1)
				sensitivity = "medium";
			else if($("#Isensitivity")[0].selectedIndex == 2)
				sensitivity = "low";
				
			command = 	"event.motion_detection.enable"			+"="+	$("input[type=radio][name=Nmotion_enable]:checked").val()+"&"+
						"event.motion_detection.sensitivity"	+"="+	sensitivity+"&"+
						"event.event_trigger_fps.mode"   		+"="+   $("input[type=radio][name=Nframe_enable]:checked").val()+"&"+
						"event.event_trigger_fps.fps"    		+"="+   $("#Iframerate").val()+"&"+
						"event.event_trigger_fps.time"   		+"="+   $("#Iduration").val()+"&";

			if($("input[type=radio][name=Nmotion_enable]:checked").val() == "on")
				command = command + "event.motion_detection.area"			+"="+	$.fn._returnCroppingArea()+"&";

			$.fn._SetParamByMask(command, $.fn._GetLangStr(LT._Reloading), 7000);
		});
		
		$("#Icon_setting_default_pic").bind('click', function(){
			if(confirm($.fn._GetLangStr(LT._Reset_to_default_Warning))){
				$.fn._DefaultParam( $.fn._GetLangStr(LT._Reloading), 5000);
			}
		});

		$("#Iclean").bind('click', function(){
			command = "event.motion_detection.area" +"="+ "0,0,0,0";
			$.fn._SetParamByMask(command, $.fn._GetLangStr(LT._Reloading), 3000);
		});
	};

	$.fn._TransferCoordinatebefore = function()
	{
		var tmp_x1, tmp_y1, tmp_x2, tmp_y2, tmp_coord;
		var pri_len = 0,pri_width = 0,pri_height = 0;
		var aspect_ratio;
		
		if(initial_area == "0,0,0,0" || initial_area == "left,top,right,bottom")
		{

		}
		else
		{
			pri_len = coord_pri_res.indexOf('x');
			pri_width = coord_pri_res.slice(0,pri_len);
			pri_height = coord_pri_res.slice(pri_len+1,coord_pri_res.length);	
			aspect_ratio = Math.floor(pri_width*100/pri_height);
			
			tmp_coord = initial_area.split(',');
			$.each(tmp_coord, function(n, val){
				if(n == 0){
					tmp_x1 = tmp_coord[n];
				}
				else if(n == 1){
					tmp_y1 = tmp_coord[n];
				}
				else if(n == 2){
					tmp_x2 = tmp_coord[n];
				}
				else if(n == 3){
					tmp_y2 = tmp_coord[n];
				}
			});

			// transfer coordinates from Main_Source_buffer's to Liveview's
			tmp_x1 = tmp_x1*JPEG_W/pri_width;
			tmp_y1 = tmp_y1*JPEG_H/pri_height;
			tmp_x2 = tmp_x2*JPEG_W/pri_width;
			tmp_y2 = tmp_y2*JPEG_H/pri_height;
			// end of transfer
			
			tmp_x1 = Math.floor(tmp_x1);
			tmp_y1 = Math.floor(tmp_y1);
			tmp_x2 = Math.floor(tmp_x2);
			tmp_y2 = Math.floor(tmp_y2);

			initial_area = tmp_x1+","+tmp_y1+","+tmp_x2+","+tmp_y2;
			//console.log("_TransferCoordinatebefore initial_area: " + initial_area);
		}
	}

	$.fn._TransferCoordinateAfter = function()
	{
		var tmp_x1, tmp_y1, tmp_x2, tmp_y2, tmp_coord;
		var pri_len = 0,pri_width = 0,pri_height = 0;
		var aspect_ratio;
		
		if(draw_area == "0,0,0,0" || draw_area == "left,top,right,bottom")
		{

		}
		else
		{
			pri_len = coord_pri_res.indexOf('x');
			pri_width = coord_pri_res.slice(0,pri_len);
			pri_height = coord_pri_res.slice(pri_len+1,coord_pri_res.length);
			aspect_ratio = Math.floor(pri_width*100/pri_height);

			tmp_coord = draw_area.split(',');
			$.each(tmp_coord, function(n, val){
				if(n == 0){
					tmp_x1 = tmp_coord[n];
				}
				else if(n == 1){
					tmp_y1 = tmp_coord[n];
				}
				else if(n == 2){
					tmp_x2 = tmp_coord[n];
				}
				else if(n == 3){
					tmp_y2 = tmp_coord[n];
				}
			});

			// transfer coordinates from Liveview's to Main_Source_buffer's
			tmp_x1 = tmp_x1*pri_width/JPEG_W;
			tmp_y1 = tmp_y1*pri_height/JPEG_H;
			tmp_x2 = tmp_x2*pri_width/JPEG_W;
			tmp_y2 = tmp_y2*pri_height/JPEG_H;
			// end of transfer
			
			tmp_x1 = Math.floor(tmp_x1);
			tmp_y1 = Math.floor(tmp_y1);
			tmp_x2 = Math.floor(tmp_x2);
			tmp_y2 = Math.floor(tmp_y2);
			
			draw_area = tmp_x1+","+tmp_y1+","+tmp_x2+","+tmp_y2;
		}
	}
})(jQuery);
