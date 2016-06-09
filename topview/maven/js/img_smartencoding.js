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
			//console.log("param:"+param + ", " + val[1]);
			if(param == "image.roi.enable1")
			{
				confList = "ON,OFF".split(',');
				for(var i = 1; i<=3; i++){
					$("#Ismt_"+i+"").find('option').remove();
					$.each(confList, function(n){
						$("#Ismt_"+i+"").append($("<option></option>").attr("value", confList[n].toLowerCase()).text(confList[n]));
					});
				}

				if(val[1] == "on")
					$("#Ismt_1")[0].selectedIndex = 0;
				else if(val[1] == "off")
					$("#Ismt_1")[0].selectedIndex = 1;
			}
			else if(param == "image.roi.enable2")
			{
				if(val[1] == "on")
					$("#Ismt_2")[0].selectedIndex = 0;
				else if(val[1] == "off")
					$("#Ismt_2")[0].selectedIndex = 1;
			}
			else if(param == "image.roi.enable3")
			{
				if(val[1] == "on")
					$("#Ismt_3")[0].selectedIndex = 0;
				else if(val[1] == "off")
					$("#Ismt_3")[0].selectedIndex = 1;
			}
			else if(param == "image.roi.level1")
			{
				confList = "High,Low".split(',');
				for(var i = 1; i<=3; i++){
					$("#Ismt_"+i+"_level").find('option').remove();
					$.each(confList, function(n){
						$("#Ismt_"+i+"_level").append($("<option></option>").attr("value", confList[n].toLowerCase()).text(confList[n]));
					});
				}	
				if(val[1] == "high")
					$("#Ismt_1_level")[0].selectedIndex = 0;
				else if(val[1] == "low")
					$("#Ismt_1_level")[0].selectedIndex = 1;
			}
			else if(param == "image.roi.level2")
			{
				if(val[1] == "high")
					$("#Ismt_2_level")[0].selectedIndex = 0;
				else if(val[1] == "low")
					$("#Ismt_2_level")[0].selectedIndex = 1;
			}
			else if(param == "image.roi.level3")
			{
				if(val[1] == "high")
					$("#Ismt_3_level")[0].selectedIndex = 0;
				else if(val[1] == "low")
					$("#Ismt_3_level")[0].selectedIndex = 1;
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
		
		for(var i=1;i<=3;i++)
		{
			$("#Msmt_"+i+"")[0].innerHTML 		= $.fn._GetLangStr(LT._Smart_Encoding_Region)+i;
			$("#Msmt_"+i+"_enable")[0].innerHTML 			= $.fn._GetLangStr(LT._Enable)+":";
			$("#Msmt_"+i+"_level")[0].innerHTML    = $.fn._GetLangStr(LT._Level)+":";
			$("#Ismt_"+i+"_save").val($.fn._GetLangStr(LT._Save_Window));
			$("#Ismt_"+i+"_clean").val($.fn._GetLangStr(LT._Clean_Window));
		}
		
		$.fn._InitialOptionLang("Ismt_1");
		$.fn._InitialOptionLang("Ismt_2");
		$.fn._InitialOptionLang("Ismt_3");
		$.fn._InitialOptionLang("Ismt_1_level");
		$.fn._InitialOptionLang("Ismt_2_level");
		$.fn._InitialOptionLang("Ismt_3_level");
	};

	$.fn._InitialFunc = function()
	{
		var command = "";
		
		$("#Ismt_1").change(function(){
			if(this.selectedIndex == 0){ // on
				command = "image.roi.enable1"				+"="+ "on";
			}
			else if(this.selectedIndex == 1){ // off
				command = "image.roi.enable1"				+"="+ "off";
			}
			$.fn._SetParam(command);
			$.fn._UpdateMask();
		});

		$("#Ismt_2").change(function(){
			if(this.selectedIndex == 0){ // on
				command = "image.roi.enable2"				+"="+ "on";
			}
			else if(this.selectedIndex == 1){ // off
				command = "image.roi.enable2"				+"="+ "off";
			}
			$.fn._SetParam(command);
			$.fn._UpdateMask();
		});

		$("#Ismt_3").change(function(){
			if(this.selectedIndex == 0){ // on
				command = "image.roi.enable3"				+"="+ "on";
			}
			else if(this.selectedIndex == 1){ // off
				command = "image.roi.enable3"				+"="+ "off";
			}
			$.fn._SetParam(command);
			$.fn._UpdateMask();
		});

		$("#Ismt_1_level").change(function(){
			if(this.selectedIndex == 0){ // high
				command = "image.roi.level1"                +"="+ "high";
			}
			else if(this.selectedIndex == 1){ // low
				command = "image.roi.level1"                +"="+ "low";	
			} 
			$.fn._SetParam(command);
		});

		$("#Ismt_2_level").change(function(){
			if(this.selectedIndex == 0){ // high
				command = "image.roi.level2"                +"="+ "high";
			}
			else if(this.selectedIndex == 1){ // low
				command = "image.roi.level2"                +"="+ "low";	
			} 
			$.fn._SetParam(command);
		});

		$("#Ismt_3_level").change(function(){
			if(this.selectedIndex == 0){ // high
				command = "image.roi.level3"                +"="+ "high";
			}
			else if(this.selectedIndex == 1){ // low
				command = "image.roi.level3"                +"="+ "low";	
			} 
			$.fn._SetParam(command);
		});

		$("#Ismt_1_save").bind('click', function(){
			$.fn._TransferCoordinateAfter();
			command = "image.roi.region1" +"="+ $.fn._returnCroppingArea();
			$.fn._SetParam(command);
			$.fn._ExecuteClean();
		});

		$("#Ismt_2_save").bind('click', function(){
			$.fn._TransferCoordinateAfter();
			command = "image.roi.region2" +"="+ $.fn._returnCroppingArea();
			$.fn._SetParam(command);
			$.fn._ExecuteClean();
		});

		$("#Ismt_3_save").bind('click', function(){
			$.fn._TransferCoordinateAfter();
			command = "image.roi.region3" +"="+ $.fn._returnCroppingArea();
			$.fn._SetParam(command);
			$.fn._ExecuteClean();
		});

		$("#Ismt_1_clean").bind('click', function(){
			command = "image.roi.region1" +"="+ "0,0,0,0";
			$.fn._SetParam(command);
		});

		$("#Ismt_2_clean").bind('click', function(){
			command = "image.roi.region2" +"="+ "0,0,0,0";
			$.fn._SetParam(command);
		});

		$("#Ismt_3_clean").bind('click', function(){
			command = "image.roi.region3" +"="+ "0,0,0,0";
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
		
		for(i;i<=3;i++)
		{
			 if($("#Ismt_"+i+"")[0].selectedIndex == 0)
			 {
				$("#Ismt_"+i+"_save").attr("disabled",false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
				$("#Ismt_"+i+"_clean").attr("disabled",false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
				$("#Ismt_"+i+"_level").attr("disabled",false).css('cursor','pointer').css('background-color','#fff').css('color','#000');
				flag = 1;
			 }
			 else
			 {
			 	$("#Ismt_"+i+"_save").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
				$("#Ismt_"+i+"_clean").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
				$("#Ismt_"+i+"_level").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
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
		
		for(i;i<=3;i++)
		{
			 if($("#Ismt_"+i+"")[0].selectedIndex == 0)
			 {
				$("#Ismt_"+i+"_save").attr("disabled",false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
				$("#Ismt_"+i+"_clean").attr("disabled",false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
				$("#Ismt_"+i+"_level").attr("disabled",false).css('cursor','pointer').css('background-color','#fff').css('color','#000');
				flag = 1;
			 }
			 else
			 {
			 	$("#Ismt_"+i+"_save").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
				$("#Ismt_"+i+"_clean").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
				$("#Ismt_"+i+"_level").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
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