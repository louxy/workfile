(function($){
	var confList;
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
	
	$.fn._ObjectAssignValue = function(src){
		$.each(src, function(param , val){
			if(param == "image.privacy_zone_1.color_setting")
			{
				confList = "Black,Grey,White".split(',');
				$("#Ipri_color").find('option').remove();
				$.each(confList, function(n){
					$("#Ipri_color").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				if(val[1] == "black")
					$("#Ipri_color")[0].selectedIndex = 0;
				else if(val[1] == "grey")
					$("#Ipri_color")[0].selectedIndex = 1;
				else if(val[1] == "white")
					$("#Ipri_color")[0].selectedIndex = 2;
			}
			else if(param == "image.privacy_zone_1.enable")
			{
				confList = "ON,OFF".split(',');
				for(var i = 1; i<=8; i++){
					$("#Ipri_"+i+"").find('option').remove();
					$.each(confList, function(n){
						$("#Ipri_"+i+"").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
					});
				}

				if(val[1] == "on")
					$("#Ipri_1")[0].selectedIndex = 0;
				else if(val[1] == "off")
					$("#Ipri_1")[0].selectedIndex = 1;
			}
			else if(param == "image.privacy_zone_2.enable")
			{
				if(val[1] == "on")
					$("#Ipri_2")[0].selectedIndex = 0;
				else if(val[1] == "off")
					$("#Ipri_2")[0].selectedIndex = 1;
			}
			else if(param == "image.privacy_zone_3.enable")
			{
				if(val[1] == "on")
					$("#Ipri_3")[0].selectedIndex = 0;
				else if(val[1] == "off")
					$("#Ipri_3")[0].selectedIndex = 1;
			}
			else if(param == "image.privacy_zone_4.enable")
			{
				if(val[1] == "on")
					$("#Ipri_4")[0].selectedIndex = 0;
				else if(val[1] == "off")
					$("#Ipri_4")[0].selectedIndex = 1;
			}
			else if(param == "image.privacy_zone_5.enable")
			{
				if(val[1] == "on")
					$("#Ipri_5")[0].selectedIndex = 0;
				else if(val[1] == "off")
					$("#Ipri_5")[0].selectedIndex = 1;
			}
			else if(param == "image.privacy_zone_6.enable")
			{
				if(val[1] == "on")
					$("#Ipri_6")[0].selectedIndex = 0;
				else if(val[1] == "off")
					$("#Ipri_6")[0].selectedIndex = 1;
			}
			else if(param == "image.privacy_zone_7.enable")
			{
				if(val[1] == "on")
					$("#Ipri_7")[0].selectedIndex = 0;
				else if(val[1] == "off")
					$("#Ipri_7")[0].selectedIndex = 1;
			}
			else if(param == "image.privacy_zone_8.enable")
			{
				if(val[1] == "on")
					$("#Ipri_8")[0].selectedIndex = 0;
				else if(val[1] == "off")
					$("#Ipri_8")[0].selectedIndex = 1;
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
		$.fn._InitialPageLang();
		$.fn._InitialCoordinate();
		$.fn._InitialFunc();
		$.fn._InitialMNwindow();
		$.fn._InitialMask();
		$('#reloading_container').hide();
		$('#container').show();
	};
	$.fn._InitialPageLang = function(){
		$("#Mprivacy_title")[0].innerHTML 		= $.fn._GetLangStr(LT._Privacy_Color_Setting);
		$("#Mpri_color")[0].innerHTML 			= $.fn._GetLangStr(LT._Color)+":";
		
		for(var i=1;i<=8;i++)
		{
			$("#Mpri_"+i+"")[0].innerHTML 		= $.fn._GetLangStr(LT._Menu_Image_privacy)+i;
			$("#Mpri_"+i+"_action")[0].innerHTML 			= $.fn._GetLangStr(LT._Action)+":";
			$("#Ipri_"+i+"_save").val($.fn._GetLangStr(LT._Save_Mask_Zone));
			$("#Ipri_"+i+"_clean").val($.fn._GetLangStr(LT._Clean_Mask_Zone));
		}
		
		$.fn._InitialOptionLang("Ipri_color");
		$.fn._InitialOptionLang("Ipri_1");
		$.fn._InitialOptionLang("Ipri_2");
		$.fn._InitialOptionLang("Ipri_3");
		$.fn._InitialOptionLang("Ipri_4");
		$.fn._InitialOptionLang("Ipri_5");
		$.fn._InitialOptionLang("Ipri_6");
		$.fn._InitialOptionLang("Ipri_7");
		$.fn._InitialOptionLang("Ipri_8");
	};

	$.fn._InitialFunc = function()
	{
		var command = "";
		$("#Ipri_color").change(function(){
			if(this.selectedIndex == 0){ // black
				command = "image.privacy_zone_1.color_setting"				+"="+ "black&";
			}
			else if(this.selectedIndex == 1){ // grey
				command = "image.privacy_zone_1.color_setting"				+"="+ "grey&";
			}
			else if(this.selectedIndex == 2){ // white
				command = "image.privacy_zone_1.color_setting"				+"="+ "white&";
			}
			$.fn._SetParam(command);
		});

		$("#Ipri_1").change(function(){
			if(this.selectedIndex == 0){ // on
				$("#Ipri_1_save").attr("disabled",false);
				$("#Ipri_1_clean").attr("disabled",false);
				command = "image.privacy_zone_1.enable"				+"="+ "on&";
			}
			else if(this.selectedIndex == 1){ // off
				$("#Ipri_1_save").attr("disabled",true);
				$("#Ipri_1_clean").attr("disabled",true);
				command = "image.privacy_zone_1.enable"				+"="+ "off&";
			}
			$.fn._SetParam(command);
			$.fn._UpdateMask();
		});

		$("#Ipri_2").change(function(){
			if(this.selectedIndex == 0){ // on
				$("#Ipri_2_save").attr("disabled",false);
				$("#Ipri_2_clean").attr("disabled",false);
				command = "image.privacy_zone_2.enable"				+"="+ "on&";
			}
			else if(this.selectedIndex == 1){ // off
				$("#Ipri_2_save").attr("disabled",true);
				$("#Ipri_2_clean").attr("disabled",true);
				command = "image.privacy_zone_2.enable"				+"="+ "off&";
			}
			$.fn._SetParam(command);
			$.fn._UpdateMask();
		});

		$("#Ipri_3").change(function(){
			if(this.selectedIndex == 0){ // on
				$("#Ipri_3_save").attr("disabled",false);
				$("#Ipri_3_clean").attr("disabled",false);
				command = "image.privacy_zone_3.enable"				+"="+ "on&";
			}
			else if(this.selectedIndex == 1){ // off
				$("#Ipri_3_save").attr("disabled",true);
				$("#Ipri_3_clean").attr("disabled",true);
				command = "image.privacy_zone_3.enable"				+"="+ "off&";
			}
			$.fn._SetParam(command);
			$.fn._UpdateMask();
		});

		$("#Ipri_4").change(function(){
			if(this.selectedIndex == 0){ // on
				$("#Ipri_4_save").attr("disabled",false);
				$("#Ipri_4_clean").attr("disabled",false);
				command = "image.privacy_zone_4.enable"				+"="+ "on&";
			}
			else if(this.selectedIndex == 1){ // off
				$("#Ipri_4_save").attr("disabled",true);
				$("#Ipri_4_clean").attr("disabled",true);
				command = "image.privacy_zone_4.enable"				+"="+ "off&";
			}
			$.fn._SetParam(command);
			$.fn._UpdateMask();
		});

		$("#Ipri_5").change(function(){
			if(this.selectedIndex == 0){ // on
				$("#Ipri_5_save").attr("disabled",false);
				$("#Ipri_5_clean").attr("disabled",false);
				command = "image.privacy_zone_5.enable"				+"="+ "on&";
			}
			else if(this.selectedIndex == 1){ // off
				$("#Ipri_5_save").attr("disabled",true);
				$("#Ipri_5_clean").attr("disabled",true);
				command = "image.privacy_zone_5.enable"				+"="+ "off&";
			}
			$.fn._SetParam(command);
			$.fn._UpdateMask();
		});

		$("#Ipri_6").change(function(){
			if(this.selectedIndex == 0){ // on
				$("#Ipri_6_save").attr("disabled",false);
				$("#Ipri_6_clean").attr("disabled",false);
				command = "image.privacy_zone_6.enable"				+"="+ "on&";
			}
			else if(this.selectedIndex == 1){ // off
				$("#Ipri_6_save").attr("disabled",true);
				$("#Ipri_6_clean").attr("disabled",true);
				command = "image.privacy_zone_6.enable"				+"="+ "off&";
			}
			$.fn._SetParam(command);
			$.fn._UpdateMask();
		});

		$("#Ipri_7").change(function(){
			if(this.selectedIndex == 0){ // on
				$("#Ipri_7_save").attr("disabled",false);
				$("#Ipri_7_clean").attr("disabled",false);
				command = "image.privacy_zone_7.enable"				+"="+ "on&";
			}
			else if(this.selectedIndex == 1){ // off
				$("#Ipri_7_save").attr("disabled",true);
				$("#Ipri_7_clean").attr("disabled",true);
				command = "image.privacy_zone_7.enable"				+"="+ "off&";
			}
			$.fn._SetParam(command);
			$.fn._UpdateMask();
		});

		$("#Ipri_8").change(function(){
			if(this.selectedIndex == 0){ // on
				$("#Ipri_8_save").attr("disabled",false);
				$("#Ipri_8_clean").attr("disabled",false);
				command = "image.privacy_zone_8.enable"				+"="+ "on&";
			}
			else if(this.selectedIndex == 1){ // off
				$("#Ipri_8_save").attr("disabled",true);
				$("#Ipri_8_clean").attr("disabled",true);
				command = "image.privacy_zone_8.enable"				+"="+ "off&";
			}
			$.fn._SetParam(command);
			$.fn._UpdateMask();
		});

		$("#Ipri_1_save").bind('click', function(){
			$.fn._TransferCoordinateAfter();
			command = "image.privacy_zone_1.mask_zone" +"="+ $.fn._returnCroppingArea();
			$.fn._SetParam(command);
			$.fn._ExecuteClean();
		});

		$("#Ipri_2_save").bind('click', function(){
			$.fn._TransferCoordinateAfter();
			command = "image.privacy_zone_2.mask_zone" +"="+ $.fn._returnCroppingArea();
			$.fn._SetParam(command);
			$.fn._ExecuteClean();
		});

		$("#Ipri_3_save").bind('click', function(){
			$.fn._TransferCoordinateAfter();
			command = "image.privacy_zone_3.mask_zone" +"="+ $.fn._returnCroppingArea();
			$.fn._SetParam(command);
			$.fn._ExecuteClean();
		});

		$("#Ipri_4_save").bind('click', function(){
			$.fn._TransferCoordinateAfter();
			command = "image.privacy_zone_4.mask_zone" +"="+ $.fn._returnCroppingArea();
			$.fn._SetParam(command);
			$.fn._ExecuteClean();
		});

		$("#Ipri_5_save").bind('click', function(){
			$.fn._TransferCoordinateAfter();
			command = "image.privacy_zone_5.mask_zone" +"="+ $.fn._returnCroppingArea();
			$.fn._SetParam(command);
			$.fn._ExecuteClean();
		});

		$("#Ipri_6_save").bind('click', function(){
			$.fn._TransferCoordinateAfter();
			command = "image.privacy_zone_6.mask_zone" +"="+ $.fn._returnCroppingArea();
			$.fn._SetParam(command);
			$.fn._ExecuteClean();
		});

		$("#Ipri_7_save").bind('click', function(){
			$.fn._TransferCoordinateAfter();
			command = "image.privacy_zone_7.mask_zone" +"="+ $.fn._returnCroppingArea();
			$.fn._SetParam(command);
			$.fn._ExecuteClean();
		});

		$("#Ipri_8_save").bind('click', function(){
			$.fn._TransferCoordinateAfter();
			command = "image.privacy_zone_8.mask_zone" +"="+ $.fn._returnCroppingArea();
			$.fn._SetParam(command);
			$.fn._ExecuteClean();
		});

		$("#Ipri_1_clean").bind('click', function(){
			command = "image.privacy_zone_1.mask_zone" +"="+ "0,0,0,0";
			$.fn._SetParam(command);
		});

		$("#Ipri_2_clean").bind('click', function(){
			command = "image.privacy_zone_2.mask_zone" +"="+ "0,0,0,0";
			$.fn._SetParam(command);
		});

		$("#Ipri_3_clean").bind('click', function(){
			command = "image.privacy_zone_3.mask_zone" +"="+ "0,0,0,0";
			$.fn._SetParam(command);
		});

		$("#Ipri_4_clean").bind('click', function(){
			command = "image.privacy_zone_4.mask_zone" +"="+ "0,0,0,0";
			$.fn._SetParam(command);
		});

		$("#Ipri_5_clean").bind('click', function(){
			command = "image.privacy_zone_5.mask_zone" +"="+ "0,0,0,0";
			$.fn._SetParam(command);
		});

		$("#Ipri_6_clean").bind('click', function(){
			command = "image.privacy_zone_6.mask_zone" +"="+ "0,0,0,0";
			$.fn._SetParam(command);
		});

		$("#Ipri_7_clean").bind('click', function(){
			command = "image.privacy_zone_7.mask_zone" +"="+ "0,0,0,0";
			$.fn._SetParam(command);
		});

		$("#Ipri_8_clean").bind('click', function(){
			command = "image.privacy_zone_8.mask_zone" +"="+ "0,0,0,0";
			$.fn._SetParam(command);
		});

		$("#Icon_setting_default_pic").bind('click', function(){
			if(confirm($.fn._GetLangStr(LT._Reset_to_default_Warning))){
				$.fn._DefaultParam( $.fn._GetLangStr(LT._Reloading), 5000);
			}
		});
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

	$.fn._InitialMask = function()
	{
		var i=1;
		var flag=0;
		
		for(i;i<=8;i++)
		{
			 if($("#Ipri_"+i+"")[0].selectedIndex == 0)
			 {
				$("#Ipri_"+i+"_save").attr("disabled",false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
				$("#Ipri_"+i+"_clean").attr("disabled",false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
				flag = 1;
			 }
			 else
			 {
			 	$("#Ipri_"+i+"_save").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
				$("#Ipri_"+i+"_clean").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
			 }
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
		
		for(i;i<=8;i++)
		{
			 if($("#Ipri_"+i+"")[0].selectedIndex == 0)
			 {
				$("#Ipri_"+i+"_save").attr("disabled",false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
				$("#Ipri_"+i+"_clean").attr("disabled",false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
				flag = 1;
			 }
			 else
			 {
			 	$("#Ipri_"+i+"_save").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
				$("#Ipri_"+i+"_clean").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
			 }
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

	$.fn._TransferCoordinateAfter = function()
	{
		var tmp_x1, tmp_y1, tmp_x2, tmp_y2, tmp_coord;
		var pri_len, pri_width, pri_height;
		var aspect_ratio;

		if(draw_area == "0,0,0,0" || draw_area == "left,top,right,bottom")
		{
			draw_area = "0,0,0,0";
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

			// transfer coordinates from Liveview's to Sensor-VIN's
			if(model_res == 5 || model_res == 3 || model_res == 2)
			{
				if(pri_width >= 1920)
				{
					tmp_x1 = tmp_x1*pri_width/JPEG_W;
					tmp_y1 = tmp_y1*pri_height/JPEG_H;
					tmp_x2 = tmp_x2*pri_width/JPEG_W;
					tmp_y2 = tmp_y2*pri_height/JPEG_H;
				}
				else
				{
					tmp_x1 = tmp_x1*1920/JPEG_W;
					tmp_y1 = tmp_y1*1080/JPEG_H;
					tmp_x2 = tmp_x2*1920/JPEG_W;
					tmp_y2 = tmp_y2*1080/JPEG_H;
				}
			}
			else if (model_res == 1 || model_res == 0)
			{
					tmp_x1 = tmp_x1*1280/JPEG_W;
					tmp_y1 = tmp_y1*720/JPEG_H;
					tmp_x2 = tmp_x2*1280/JPEG_W;
					tmp_y2 = tmp_y2*720/JPEG_H;
			}
			// end of transfer
			
			tmp_x1 = Math.floor(tmp_x1);
			tmp_y1 = Math.floor(tmp_y1);
			tmp_x2 = Math.floor(tmp_x2);
			tmp_y2 = Math.floor(tmp_y2);
			
			draw_area = tmp_x1+","+tmp_y1+","+tmp_x2+","+tmp_y2;
		}
	}

	$.fn._ExecuteClean = function()
	{
		setTimeout(function(){
			jcrop_api.setSelectArea([0,0,0,0],0);
			draw_area = "0,0,0,0";
		},2000);
	}
})(jQuery);