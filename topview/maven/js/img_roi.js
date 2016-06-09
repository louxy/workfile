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
	var output_res;
	var confRes = new Array();
	var original_res = "";
	var idx = 0;
	var enable_val;
	$.fn._ObjectAssignValue = function(src){
		$.each(src, function(param , val){
			if(param == "image.dptz.enable"){
				var confList = "OFF,ON".split(',');
				$("#Iroi_enable").find('option').remove();
				$.each(confList, function(n){
					$("#Iroi_enable").append($("<option></option>").attr("value", confList[n].toLowerCase()).text(confList[n]));
				});
				enable_val = val[1];
				if(val[1] == "off")
					$("#Iroi_enable")[0].selectedIndex = 0;
				else if(val[1] == "on" || val[1] == "lock")
					$("#Iroi_enable")[0].selectedIndex = 1;
			}
			else if(param == "image.dptz.region")
				initial_area = val[1];	
			else if(param == "image.dptz.output_resolution")
				output_res = val[1];
			else if(param == "image.dptz.original_resolution")
				original_res = val[1];
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
		$.fn._InitialMNwindow();
		$.fn._InitialMTCtrl();
		$.fn._InitialMask();
		$.fn._InitialFunc();
		$.fn._SetInitialMode();
		$('#reloading_container').hide();
		$('#container').show();
	};
	$.fn._InitialPageLang = function(){
		$("#Mroi_title")[0].innerHTML 			= $.fn._GetLangStr(LT._Menu_Image_roi);
		$("#Mroi_enable")[0].innerHTML 			= $.fn._GetLangStr(LT._Enable)+":";
		$("#Mroi_resolution")[0].innerHTML 		= $.fn._GetLangStr(LT._Resolution)+":";
		$.fn._InitialOptionLang("Iroi_enable");
		$.fn._InitialOptionLang("Iroi_resolution");
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
			} else if(n == 1){
				len = profile[n].indexOf('/');
				sec_res = profile[n].slice(0,len);
				sec_codec = profile[n].slice(len+1,profile[n].length);
				coord_sec_res = sec_res;
			}
		});

		// show resolution
		// console.log("coord_pri_res is: " +coord_pri_res);
		confRes = "2592x1944,2048x1536,1920x1080,1280x960,1280x720".split(",");
		$("#Iroi_resolution").find('option').remove();
		for(var i=0;i<confRes.length;i++){
			if(coord_pri_res == confRes[i])
				idx = 1;

			if(idx == 1)
				$("#Iroi_resolution").append($("<option></option>").attr("value", confRes[i]).text(confRes[i]));
		}

		// set default resolution
		//$('#Iroi_resolution').val(coord_pri_res);
		$('#Iroi_resolution').val(output_res);
		if($('#Iroi_resolution')[0].selectedIndex == -1)
			$('#Iroi_resolution').val(coord_pri_res);

		if(original_res.trim()  == ""){
			$("#Icon_setting_default_pic").attr("disabled", true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
			$("#Icon_setting_save_pic").attr("disabled", true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
		}

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
		
		if($("#Iroi_enable").val() == "on" && initial_area == "0,0,0,0"){
			jcrop_api.setOptions({
	        			minSize: [120,120],
	        			allowSelect: true
	      			});
			jcrop_api.enable();
			jcrop_api.animateTo([160,120,280,240]);
		}
	}

	$.fn._InitialMTCtrl = function()
	{
		var sx = 0, sy = 0, ex = 0, ey = 0;
		var tmp = "";
		$("#Iroi_enable").change(function(){
			if($(this).val() == "on")
			{	
				jcrop_api.setOptions({
        			minSize: [120,120],
        			allowSelect: true
      			});
				jcrop_api.enable();
				jcrop_api.animateTo([160,120,280,240]);
				$("#Iroi_resolution").attr("disabled",false);
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
				command  =  "image.dptz.enable" + "=" +  "on";
			}
			else if($(this).val() == "off")
			{	
				jcrop_api.setOptions({
        			minSize: [0,0],
        			allowSelect: false
      			});
				//jcrop_api.setSelectArea([sx,sy,ex,ey],0);
				jcrop_api.setSelectArea([0,0,0,0],0);
				jcrop_api.disable();
				$('.requiresjcrop').hide();
				$("#Iroi_resolution").attr("disabled",true);
				command  =  "image.dptz.enable" + "=" + "off";
			}
			$.fn._SetParam(command);
			$.fn._UpdateMask();
		});
	}

	$.fn._InitialFunc = function()
	{
		var command = "";
		
		$("#Icon_setting_save_pic").bind('click', function(){

			$.fn._TransferCoordinateAfter();
			command = 	"image.dptz.output_resolution" + "=" + $("#Iroi_resolution").val() + "&"+
						"image.dptz.region"			+"="+	$.fn._returnCroppingArea() + "&"+
						"image.dptz.enable" + "=" + "lock";

			$.fn._SetParam(command);
			//$.fn._ExecuteClean();
			$("#Icon_setting_save_pic").attr("disabled", true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
			//$("#Icon_setting_default_pic").attr("disabled", false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
			$("#Iroi_enable").attr("disabled", true).css('cursor','pointer').css('background-color','#F1F1F1').css('color','#000');
			$("#Iroi_resolution").attr("disabled", true).css('cursor','pointer').css('background-color','#F1F1F1').css('color','#000');
			setTimeout(function(){
				jcrop_api.setSelectArea([0,0,0,0],0);
				draw_area = "0,0,0,0";
				jcrop_api.destroy();
			},2000);

		});
		
		$("#Icon_setting_default_pic").bind('click', function(){

			command = "image.dptz.enable" + "=" + "off" + "&" +
					  "image.dptz.region" + "=" + "0,0,0,0";

			 $("#Icon_setting_save_pic").attr("disabled", true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
			 
			 $.fn._SetParamByMask(command, $.fn._GetLangStr(LT._Reloading), 3000);

		});
	};

	$.fn._InitialMask = function()
	{
		var i=1;
		var flag=0;
		
		if($("#Iroi_enable")[0].selectedIndex == 0){

			$("#Iroi_resolution").attr("disabled",true);
			$("#Icon_setting_save_pic").attr("disabled",true);

		}else{

			$("#Iroi_resolution").attr("disabled",false);
			$("#Icon_setting_save_pic").attr("disabled",false);
			flag = 1;
		}

		if(flag){
			jcrop_api.setSelectArea([0,0,0,0],0);
		}

		draw_area = "0,0,0,0";
		jcrop_api.endInitial();
	};

	$.fn._UpdateMask = function()
	{
		var i=1;
		var flag=0;
		var sx = 0, sy = 0, ex = 0, ey = 0;
		var tmp = "";
		
		if($("#Iroi_enable")[0].selectedIndex == 0)
		{
				$("#Iroi_resolution").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
				$("#Icon_setting_save_pic").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
				$("#Icon_setting_default_pic").attr("disabled", false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
		}
		else
		{
			 	$("#Iroi_resolution").attr("disabled",false).css('cursor','pointer').css('background-color','#fff').css('color','#000');
				$("#Icon_setting_save_pic").attr("disabled",false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
				flag = 1;
    	}

		if(flag)
		{
			jcrop_api.enable();
			$('.requiresjcrop').show();
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
		else
		{
			jcrop_api.disable();
			$('.requiresjcrop').hide();
		}
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
			//console.log("_TransferCoordinateAfter:" + draw_area);
		}
	}

	$.fn._ExecuteClean = function() //save
	{
		$("#Iroi_enable").val("off");
		$("#Icon_setting_save_pic").attr("disabled", true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
		//$("#Icon_setting_default_pic").attr("disabled", false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
		$("#Iroi_enable").attr("disabled", true).css('cursor','pointer').css('background-color','#F1F1F1').css('color','#000');
		$("#Iroi_resolution").attr("disabled", true).css('cursor','pointer').css('background-color','#F1F1F1').css('color','#000');
		setTimeout(function(){
			jcrop_api.setSelectArea([0,0,0,0],0);
			draw_area = "0,0,0,0";
			jcrop_api.destroy();
		},2000);
	}

	$.fn._SetInitialMode = function()
	{
		if(enable_val == "off"){
			$("#Icon_setting_save_pic").attr("disabled", true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
			$("#Iroi_resolution").attr("disabled",true);
			$("#Iroi_enable").attr("disabled", false);
			$("#Icon_setting_default_pic").attr("disabled", false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
		    //$("#Icon_setting_default_pic").attr("disabled", true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
		}else if(enable_val == "on"){
			$("#Iroi_enable").attr("disabled", false);
			$("#Icon_setting_save_pic").attr("disabled", false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
			$("#Iroi_resolution").attr("disabled",false);
			$("#Icon_setting_default_pic").attr("disabled", false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
		}else if(enable_val == "lock"){
			$("#Icon_setting_save_pic").attr("disabled", true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
			$("#Iroi_resolution").attr("disabled",true);
			$("#Iroi_enable").attr("disabled", true);
			$("#Icon_setting_default_pic").attr("disabled", false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
		}
	}
})(jQuery);
