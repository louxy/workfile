
(function($){
	var confList;
	var grey_out_val;
	var zoom_i =1;
	var temp_area;
	var jcrop_api;
	var profile_1;
	var profile_2;
	var profile_3;
	var profile_4;
	var profile_5;
	var profile_6;
	var current_id;
	var initial_area;
	var coord_pri_res; // primary image size
	var coord_sec_res; // secondary image size
	$.fn._ObjectAssignValue = function(src){
	
		var greyOut =-1, day, night;
		$.each(src, function(param , val){
			if(param == "lens.zoom.level"){
				$("#Mlen_zoom_value").val(parseFloat(val[1]).toFixed(2));	
			}else if(param == "image.color.saturation.grey_out"){
				grey_out_val =val[1];
			}else if(param == "lens.focus.ui_manual.day_position"){
				day =  parseFloat(val[1]);
			}else if(param == "lens.focus.ui_manual.night_position"){
				night = parseFloat(val[1]);
			}else if(param == "lens.focus.refocus.day_night_switch"){
				confList = "Auto,OFF".split(',');
				$("#Ilen_focus_mode").find('option').remove();
				$.each(confList, function(n){
					$("#Ilen_focus_mode").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				if(val[1] == "on")
					$("#Ilen_focus_mode")[0].selectedIndex = 0;
				else if(val[1] == "off")
					$("#Ilen_focus_mode")[0].selectedIndex = 1;

			}else if(param == "lens.focus_roi_mode"){
				confList = "Full,Custom".split(",");
				var confText = "off,on".split(",");
				$("#Ilen_focus_view").find('option').remove();
				$.each(confList, function(n){
					$("#Ilen_focus_view").append($("<option></option>").attr("value", confText[n]).text(confList[n]));
				})

				if(val[1] == "off")
					$("#Ilen_focus_view")[0].selectedIndex = 0;
				else if(val[1] == "on")
					$("#Ilen_focus_view")[0].selectedIndex = 1;

			}else if(param == "lens.focus_region")
			{
				initial_area = val[1];
			}
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
		// Get Focus
		if(grey_out_val==0){
			$("#Mlen_focus_value").val(day.toFixed(2));
		}else if(grey_out_val==1){
			$("#Mlen_focus_value").val(night.toFixed(2));
		}

	};
	$.fn._Go = function(){
		$.fn._InitialPageLang();
		$.fn._InitialCoordinate();
		$.fn._InitialFunc();
		$.fn._InitialMNwindow();
		$.fn._InitialPosition();
		$.fn._InitialMTCtrl();
		$.fn._checkStatus();
		$.fn._InitialSlider();
		$('#reloading_container').hide();
		$('#container').show();
	};
	$.fn._InitialPageLang = function(){
		$("#Mfocus_length_cotrol")[0].innerHTML 	= $.fn._GetLangStr(LT._Focal_Length_Control);
		$("#Mlen_focus_control")[0].innerHTML       = $.fn._GetLangStr(LT._Day_Night_Focus_Control);
		$("#Mlen_focus_view")[0].innerHTML          = $.fn._GetLangStr(LT._Focal_window)+":";
		$("#Mlen_zoom")[0].innerHTML                = $.fn._GetLangStr(LT._Zoom)+":";
		$("#Mlen_focus")[0].innerHTML               = $.fn._GetLangStr(LT._Focus)+":";
		$("#Mlen_focus_mode")[0].innerHTML          = $.fn._GetLangStr(LT._Mode)+":";
		$("#Mlen_zoom_out_slow").val($.fn._GetLangStr(LT._Out_Slow));
		$("#Mlen_zoom_out_high").val($.fn._GetLangStr(LT._Out_High));
		$("#Mlen_zoom_in_slow").val($.fn._GetLangStr(LT._In_Slow));
		$("#Mlen_zoom_in_high").val($.fn._GetLangStr(LT._In_High));
		$("#Mlen_focus_far_slow").val($.fn._GetLangStr(LT._Out_Slow));
		$("#Mlen_focus_far_high").val($.fn._GetLangStr(LT._Out_High));
		$("#Mlen_focus_near_slow").val($.fn._GetLangStr(LT._In_Slow));
		$("#Mlen_focus_near_high").val($.fn._GetLangStr(LT._In_High));

		$("#focus_do").val($.fn._GetLangStr(LT._Do_Focus));
		$("#focus_calibration").val($.fn._GetLangStr(LT._Do_Calibration));
		$.fn._InitialOptionLang("Ilen_focus_view");
		$.fn._InitialOptionLang("Ilen_focus_mode");
		
	};
	/* Loux Add zoom/focus Slider */
	$.fn._InitialSlider = function(){
		// zoom - slider
		$( "#Mlen_zoom_bar" ).slider({			
			value: parseFloat($("#Mlen_zoom_value").val()),			
			min: 1.00,		
			max: 3.00,			
			step:0.05,
			create: function( event, ui){
				$("#Mlen_zoom_bar").css('margin-top','3px');
			},			
			slide: function( event, ui){	
				
				$("#Mlen_zoom_value").val(ui.value);			
				var command ="";		
				command = 	"lens.zoom_bar"			+"="+ 	"1&"+
							"lens.zoom.level"		+"="+	ui.value;
							
				$.fn._SetParam(command);				
			},
			stop: function( event, ui){
				var command ="";
				command = 	"lens.last_zoom_level"  +"="+ zoom_i;
				//command = 	"lens.last_zoom_level"  +"="+ "1";
				$.fn._SetParam(command);
				$.fn._changeStatus("zoom_bar");
				zoom_i++;
				/*
				setTimeout( function(){
					$.fn._SetParam(command);
					console.log("send last");
					//$.fn._SetParam("lens.last_zoom_level=0");
				},3000);
				$.fn._changeStatus("zoom_bar");
				console.log("Tego 2 add!");
				test_i++;
				*/
			}

		});
		// focus - slider
		$( "#Mlen_focus_bar" ).slider({			
			value: parseFloat($("#Mlen_focus_value").val()),			
			min: 0.00,		
			max: 100.00,			
			step:0.5,
			create: function( event, ui){
				$("#Mlen_focus_bar").css('margin-top','3px');
			},				
			slide: function( event, ui ){				
				
				$("#Mlen_focus_value").val(ui.value);	
										
				$.fn._checkZoomFocus("image.color.saturation.grey_out");		
				if(grey_out_val == 0){						
					$.fn._SetParam("lens.focus.manual.day_position=" + ui.value);
				}else if(grey_out_val == 1){						
					$.fn._SetParam("lens.focus.manual.night_position=" + ui.value);
				}	
		
			},
			stop: function( event, ui){
				var command ="";
				command = 	"lens.last_focus_position"  +"="+ "1";
				$.fn._SetParam(command);

			}

		});
	}

	$.fn._changeStatus = function(id){

		if(id == "zoom_bar"){
			$.fn_lockSlider();	
			$.fn_lockComponent();
			$("#focus_do").attr("disabled",true).css('cursor','wait').css('background-color','#F1F1F1').css('color','#000');
			$("#focus_calibration").attr("disabled",true).css('cursor','wait').css('background-color','#F1F1F1').css('color','#000');
			$("#Icon_setting_default_pic").attr("disabled",true).css('cursor','wait').css('background-color','#F1F1F1').css('color','#000');	
		}
		else if(id == "focus_bar"){
		}
	}
	// Loux End
	$.fn._InitialFunc = function(){
		var command = "";

		// initial focus
		$("#focus_do").attr("disabled",false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
		$("#focus_calibration").attr("disabled",false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');

		/* Loux modify zoom & focus*/
		// zoom in
		$("#Mlen_zoom_in_slow").bind('click', function (){

			if(parseFloat($("#Mlen_zoom_value").val()) <=3.00){
				var zoom_in_val = parseFloat($("#Mlen_zoom_value").val()) + 0.01;
				$("#Mlen_zoom_value").val((zoom_in_val>=3.00)?3.00:zoom_in_val.toFixed(2));
				//command = "lens.zoom_in.fine_jog" +"="+ 	"1&";
				command =   "lens.zoom_bar"			+"="+ 	"1&"+
							"lens.zoom.level"		+"="+	$("#Mlen_zoom_value").val();
				
				$.fn._SetParam(command);
			    $( "#Mlen_zoom_bar" ).slider("option", "value", $("#Mlen_zoom_value").val());
			}
		});

		$("#Mlen_zoom_in_high").bind('click', function(){
			if(parseFloat($("#Mlen_zoom_value").val()) <=3.00){
				var zoom_in_val = parseFloat($("#Mlen_zoom_value").val()) + 0.1;
				$("#Mlen_zoom_value").val((zoom_in_val>=3.00)?3.00:zoom_in_val.toFixed(2));
				//command = "lens.zoom_in.coarse_jog" +"="+ 	"1&";
				command =   "lens.zoom_bar"			+"="+ 	"1&"+
							"lens.zoom.level"		+"="+	$("#Mlen_zoom_value").val();
				$.fn._SetParam(command);
                $("#Mlen_zoom_bar").slider("option", "value", $("#Mlen_zoom_value").val());
			}
		});

		// zoom out
		$("#Mlen_zoom_out_high").bind('click', function(){
			if(parseFloat($("#Mlen_zoom_value").val()) >=1.00){
				var zoom_out_val = parseFloat($("#Mlen_zoom_value").val()) - 0.1;
				$("#Mlen_zoom_value").val((zoom_out_val<=1.00)?1.00:zoom_out_val.toFixed(2));
				//command = "lens.zoom_out.coarse_jog" +"="+ 	"1&";
				command =   "lens.zoom_bar"			+"="+ 	"1&"+
							"lens.zoom.level"		+"="+	$("#Mlen_zoom_value").val();
				$.fn._SetParam(command);
                $("#Mlen_zoom_bar").slider("option", "value", $("#Mlen_zoom_value").val());
			}
		});

		$("#Mlen_zoom_out_slow").bind('click', function(){
			if(parseFloat($("#Mlen_zoom_value").val()) >=1.00){
				var zoom_out_val = parseFloat($("#Mlen_zoom_value").val()) - 0.01;
				$("#Mlen_zoom_value").val((zoom_out_val<=1.00)?1.00:zoom_out_val.toFixed(2));
				//command = "lens.zoom_out.fine_jog" +"="+ 	"1&";
				command =   "lens.zoom_bar"			+"="+ 	"1&"+
							"lens.zoom.level"		+"="+	$("#Mlen_zoom_value").val();
				$.fn._SetParam(command);
                $("#Mlen_zoom_bar").slider("option", "value", $("#Mlen_zoom_value").val());
			}
		});		

		$("#Mlen_focus_near_slow").bind('click', function(){	
			var add;
			var focus_val = parseFloat($("#Mlen_focus_value").val());
			if( 80 <=focus_val & focus_val <= 100.00)
				add = focus_val + 0.04;				
			else if( 0 <=focus_val & focus_val < 80)
				add = focus_val + 0.08;

			$("#Mlen_focus_value").val((add>=100.00)?100.00:add.toFixed(2));
			command = "lens.focus_near.fine_jog"+"="+ 	"1&";
			$.fn._SetParam(command);
            $( "#Mlen_focus_bar" ).slider("option", "value", $("#Mlen_focus_value").val());
		});

		$("#Mlen_focus_near_high").bind('click', function(){
			var add;
			var focus_val = parseFloat($("#Mlen_focus_value").val());
			if( 80 <=focus_val & focus_val <= 100.00)
				add = focus_val + 0.48;				
			else if( 0 <=focus_val & focus_val < 80)
				add = focus_val + 0.96;

			$("#Mlen_focus_value").val((add>=100.00)?100.00:add.toFixed(2));
			command = "lens.focus_near.coarse_jog"+"="+ 	"1&";
			$.fn._SetParam(command);
            $( "#Mlen_focus_bar" ).slider("option", "value", $("#Mlen_focus_value").val());
		});

		$("#Mlen_focus_far_slow").bind('click', function(){
			var min;
			var focus_val = parseFloat($("#Mlen_focus_value").val());
			if( 80 <focus_val & focus_val <= 100.00)
				min = focus_val - 0.04;				
			else if( 0 <=focus_val & focus_val <= 80)
				min = focus_val - 0.08;

			$("#Mlen_focus_value").val((min<=0.00)?0.00:min.toFixed(2));
			command = "lens.focus_far.fine_jog"+"="+ 	"1&";
			$.fn._SetParam(command);
			$("#Mlen_focus_bar").slider("option", "value", $("#Mlen_focus_value").val());
		});

		$("#Mlen_focus_far_high").bind('click', function(){		
			var min;
			var focus_val = parseFloat($("#Mlen_focus_value").val());
			if( 80 <focus_val & focus_val <= 100.00)
				min = focus_val - 0.48;				
			else if( 0 <=focus_val & focus_val <= 80)
				min = focus_val - 0.96;

			$("#Mlen_focus_value").val((min<=0.00)?0.00:min.toFixed(2));
			command = "lens.focus_far.coarse_jog"+"="+ 	"1&";
			$.fn._SetParam(command);
			$("#Mlen_focus_bar").slider("option", "value", $("#Mlen_focus_value").val());
		});

		/* Loux End */

		$("#focus_calibration").bind('click', function(){
			command = 	"lens.do_calibration"		+"="+ 	"1&"+
						"system.lens.action_type"	+"="+	"calibration";
			$.fn._SetParam(command);
		});

		$("#Icon_setting_default_pic").bind('click', function(){
			if(confirm($.fn._GetLangStr(LT._Reset_to_default_Warning))){
				$.fn._DefaultParam( $.fn._GetLangStr(LT._Reloading), 5000);
			}
		});

		$("#Ilen_focus_mode").change(function(){

			if(this.selectedIndex == 0){
				command = "lens.focus.refocus.day_night_switch" + "=" + "on&";
			}else if(this.selectedIndex == 1){
				command = "lens.focus.refocus.day_night_switch" + "=" + "off&";
			}
			$.fn._SetParam(command);
		});

		// start focus function Loux
		$("#focus_do").bind('click', function(){

			var focus_window = $("#Ilen_focus_view").val();

			if(draw_area != initial_area)
				$.fn._TransferCoordinateAfter();
			else
				draw_area = temp_area;

			if(focus_window == "on"){

				command = 	"lens.focus_region"	  + "=" + $.fn._returnCroppingArea()	+ "&" +
							"lens.do_roi_focus"	  + "=" + "1"   + "&" +
						    "system.lens.action_type"	+"="+	"user_press_quick_af";

			}else if(focus_window == "off"){
				command =   "lens.focus_region"	  + "=" + "0,0,0,0" + "&" +
							"lens.do_focus"		  + "=" + "1"    + "&" +
						    "system.lens.action_type"	+"="+	"user_press_quick_af";
			}

			$.fn._SetParam(command);
		});
	};
	// Loux Focus window
	// 1. get coordinate range
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

	$.fn._InitialPosition = function()
	{
		var sx = 0, sy = 0, ex = 0, ey = 0;
		var tmp = "";

		temp_area = initial_area;
		// console.log("IniPosition tmp_area& initial_area: " + temp_area);
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

			jcrop_api.setSelectArea([sx,sy,ex,ey],0);
		}

		jcrop_api.endInitial();
		draw_area = initial_area;
	}

	$.fn._InitialMTCtrl = function()
	{
		var sx = 0, sy = 0, ex = 0, ey = 0;
		var tmp = "";
		var command = "";
		$("#Ilen_focus_view").change(function(){
			if($(this).val() == "on")
			{
				command = "lens.focus_roi_mode" + "=" + "on";
				jcrop_api.enable();
				$('.requiresjcrop').show();
				if(draw_area == "left,top,right,bottom" || draw_area == "0,0,0,0"){
					jcrop_api.setSelectArea([0,0,0,0],0);
				}
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
				command = "lens.focus_roi_mode" + "=" + "off";
				jcrop_api.setSelectArea([0,0,0,0],0);
				jcrop_api.disable();
				$('.requiresjcrop').hide();
			}

			$.fn._SetParam(command);
		});

		$("#Ilen_focus_view").change();
	}

	$.fn._updateStatus = function(){
		
		$("#focus_do").attr("disabled",false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
		$("#focus_calibration").attr("disabled",false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
		$("#Icon_setting_default_pic").attr("disabled",false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
	};

	$.fn._checkZoomFocus = function(checkName){
		$.ajax({
			url:'/cgi-bin/get?' + checkName,
			dataType:'json',
			asyc:false,
			cache:false,
			success:function(data){
				$.each(data, function(param, value){
					if(param == "lens.zoom.level"){
						$("#Mlen_zoom_value").val(parseFloat(value[1]).toFixed(2));
						$("#Mlen_zoom_bar").slider("option", "value", value[1]);
					}
					else if(param == "image.color.saturation.grey_out"){
						grey_out_val = value[1];
					}
					else if(param == "lens.focus.ui_manual.day_position" || 
										param == "lens.focus.ui_manual.night_position"){
						$("#Mlen_focus_value").val(value[1]);
						$("#Mlen_focus_bar").slider("option", "value", value[1]);
					}
				});
			},
			error:function(xhr, textStatus, errorThrown){
			},
			complete:function(){

			}
		});
	};

	$.fn._checkStatus = function(){
		$.ajax({
			url:'/cgi-bin/get?system.lens.action_type',
			dataType:'json',
			cache:false,
			success:function(data){
				$.each(data, function(param, val){
					if(param == "system.lens.action_type"){
						//console.log("Get Action Type Is: " + val[1]);
						$.fn._RefreshState(val[1]);
					}
				});
			},
			error:function(xhr, textStatus, errorThrown){
			},
			complete:function(){
			}
		});

		setTimeout($.fn._checkStatus,1000);
	};

	$.fn._RefreshState = function(src)
	{
		if(src == "zoom_in")
		{
			$("#focus_do").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
			$("#focus_calibration").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
			$("#Icon_setting_default_pic").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
		}
		else if(src == "zoom_out")
		{
			$("#focus_do").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
			$("#focus_calibration").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
			$("#Icon_setting_default_pic").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
		}
		else if(src == "focus_near")
		{
			$("#focus_do").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
			$("#focus_calibration").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
			$("#Icon_setting_default_pic").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
		}
		else if(src == "focus_far")
		{
			$("#focus_do").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
			$("#focus_calibration").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
			$("#Icon_setting_default_pic").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
		}
		else if(src == "user_press_quick_af")
		{
			//$("#focus_do").attr("disabled",false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
			$("#focus_do").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
			$("#focus_calibration").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
			$("#Icon_setting_default_pic").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
			$.fn_lockSlider();			
			$.fn_lockComponent();
		}
		else if(src == "calibration"){
			$("#focus_do").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
			//$("#focus_calibration").attr("disabled",false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
			$("#focus_calibration").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
			$("#Icon_setting_default_pic").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
			$.fn_lockSlider();			
			$.fn_lockComponent();
		}
		else if(src == "user_none"){
			$.fn._updateStatus();
		}
		else if(src == "none"){
			// startFocus
			$.fn_updateFocus();
			// startCalibration
			$.fn._checkZoomFocus("lens.zoom.level");
			$.fn._updateStatus();	
			$.fn_releaseSlider();
			$.fn_releaseComponent();	
			$.fn._SetParam("system.lens.action_type=Finish");	
		}
		else if(src =="user_set_zoom_level"){
			$.fn_updateFocus();
		}
		else if(src =="zoom_level_none"){
			$.fn_updateFocus();
			$.fn_releaseSlider();
			$.fn_releaseComponent();
			$.fn._updateStatus();	
			$.fn._SetParam("system.lens.action_type=Finish");
		}
		
	}

	$.fn_updateFocus = function(){

		$.fn._checkZoomFocus("image.color.saturation.grey_out");
		if(grey_out_val == 0){
			$.fn._checkZoomFocus("lens.focus.ui_manual.day_position");	
			
		}else if(grey_out_val == 1){
			$.fn._checkZoomFocus("lens.focus.ui_manual.night_position");
			
		}		
	}
	$.fn_lockSlider = function(){
		$("#Mlen_zoom_bar").slider('disable');
		$("#Mlen_zoom_bar").find(".ui-state-default" ).css("background-image","url(/css/images/slider-images-handle-gray.png)");
		$("#Mlen_focus_bar").slider('disable');
		$("#Mlen_focus_bar").find(".ui-state-default" ).css("background-image","url(/css/images/slider-images-handle-gray.png)");
	}
	$.fn_releaseSlider = function(){
		$("#Mlen_zoom_bar").slider('enable');
		$("#Mlen_zoom_bar").find(".ui-state-default" ).css("background-image","url(/css/images/slider-images-handle.png)");
		$("#Mlen_focus_bar").slider('enable');
		$("#Mlen_focus_bar").find(".ui-state-default" ).css("background-image","url(/css/images/slider-images-handle.png)");
	}
	$.fn_lockComponent = function(){
		$("#Mlen_zoom_out_slow").attr("disabled",true).css('cursor','wait').css('background-color','#F1F1F1').css('color','#000');
		$("#Mlen_zoom_out_high").attr("disabled",true).css('cursor','wait').css('background-color','#F1F1F1').css('color','#000');
		$("#Mlen_zoom_in_slow").attr("disabled",true).css('cursor','wait').css('background-color','#F1F1F1').css('color','#000');
		$("#Mlen_zoom_in_high").attr("disabled",true).css('cursor','wait').css('background-color','#F1F1F1').css('color','#000');
		$("#Mlen_focus_far_slow").attr("disabled",true).css('cursor','wait').css('background-color','#F1F1F1').css('color','#000');
		$("#Mlen_focus_far_high").attr("disabled",true).css('cursor','wait').css('background-color','#F1F1F1').css('color','#000');
		$("#Mlen_focus_near_slow").attr("disabled",true).css('cursor','wait').css('background-color','#F1F1F1').css('color','#000');
		$("#Mlen_focus_near_high").attr("disabled",true).css('cursor','wait').css('background-color','#F1F1F1').css('color','#000');
		$("#Ilen_focus_view").attr("disabled",true).css('cursor','wait').css('background-color','#F1F1F1').css('color','#000');
		$("body").css('cursor','wait');	
	}
	$.fn_releaseComponent = function(){
		$("#Mlen_zoom_out_slow").attr("disabled",false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
		$("#Mlen_zoom_out_high").attr("disabled",false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
		$("#Mlen_zoom_in_slow").attr("disabled",false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
		$("#Mlen_zoom_in_high").attr("disabled",false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
		$("#Mlen_focus_far_slow").attr("disabled",false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
		$("#Mlen_focus_far_high").attr("disabled",false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
		$("#Mlen_focus_near_slow").attr("disabled",false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
		$("#Mlen_focus_near_high").attr("disabled",false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
		$("#Ilen_focus_view").attr("disabled",false).css('cursor','pointer').css('background-color','#fff').css('color','#000');
		$("body").css('cursor','default');	
	}

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
