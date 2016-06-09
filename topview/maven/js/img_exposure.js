(function($){
	var confList, camera_type, mode, max_gain_val, manual_gain_val, noise_redution_val, day_night, ir_level, day_night_threshold,
	current_light_bar, d2n_val, n2d_val, switch_time, pre_day_night, shutter_speed;
	var box="";
	var max_gain_val_range = new Array(), manual_gain_val_range = new Array(), noise_redution_val_range = new Array(), ir_level_val_range = new Array();
	var len = 0, split_tmp;
	var th_max = 100;
	$.fn._ObjectAssignValue = function(src){
		$.each(src, function(param , val){
			if(param == "image.exposure.mode")
			{
				if(model_len == 6)
				{
					$("#Iexposure_type").find('option').remove();
					$("#Iexposure_type").append($("<option></option>").attr("value", "AES").text("AES"));

					if(val[1] == "manual"){
						$("input[name=Nexposure_mode][value='manual']").attr('checked',true);
					}
					else
					{
						$("input[name=Nexposure_mode][value='auto']").attr('checked',true);
						if(val[1] == "aes")
							$("#Iexposure_type")[0].selectedIndex = 0;
					}
				}
				else
				{
					confList = "AES,ALC,Flickerless".split(',');
					
					$("#Iexposure_type").find('option').remove();
					$.each(confList, function(n){
						$("#Iexposure_type").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
					});


					if(val[1] == "manual"){
						$("input[name=Nexposure_mode][value='manual']").attr('checked',true);
					}
					else
					{
						$("input[name=Nexposure_mode][value='auto']").attr('checked',true);
						if(val[1] == "aes")
							$("#Iexposure_type")[0].selectedIndex = 0;
						else if(val[1] == "alc")
							$("#Iexposure_type")[0].selectedIndex = 1;
						else if(val[1] == "flickerless")
							$("#Iexposure_type")[0].selectedIndex = 2;
					}
				}

				mode = val[1];
			}
			else if(param == "system.configuration.camera_type")
			{
				camera_type = val[1];
			}
			else if(param == "image.exposure.slow_shutter")
			{
				if(camera_type == "ntsc")
					confList = "OFF,1/30,1/15,1/7.5".split(',');
				else
					confList = "OFF,1/25,1/12.5,1/6.25".split(',');
				
				$("#Iexposure_slow_shutter").find('option').remove();
				$.each(confList, function(n){
					$("#Iexposure_slow_shutter").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				if(val[1] == "off")
					$("#Iexposure_slow_shutter")[0].selectedIndex = 0;
				else if(val[1] == "1/30" || val[1] == "1/25")
					$("#Iexposure_slow_shutter")[0].selectedIndex = 1;
				else if(val[1] == "1/15" || val[1] == "1/12.5")
					$("#Iexposure_slow_shutter")[0].selectedIndex = 2;
				else if(val[1] == "1/7.5" || val[1] == "1/6.25")
					$("#Iexposure_slow_shutter")[0].selectedIndex = 3;
			}
			else if(param == "image.exposure.agc_max")
			{
				$("#Iexposure_max_gain").val(val[1]);
				max_gain_val = val[1];
			}
			else if(param == "image.exposure.shutter_speed")
			{
				shutter_speed = val[1];
			}
			else if(param == "image.exposure.led")
			{	
				// set Illumination
				confList = "Auto,ON,OFF".split(',');
				$("#Iexposure_illumination_control").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == val[1])
						$("#Iexposure_illumination_control").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
					else
						$("#Iexposure_illumination_control").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				// set Day/Night
				var List = "Auto,Color,BW".split(',');
				$("#Iexposure_day_night").find('option').remove();
				$.each(List, function(n){
					$("#Iexposure_day_night").append($("<option></option>").attr("value", List[n]).text(List[n]));
				});

				if(pre_day_night == "auto")
					$("#Iexposure_day_night")[0].selectedIndex = 0;
				else if(pre_day_night == "color")
					$("#Iexposure_day_night")[0].selectedIndex = 1;
				else if(pre_day_night == "bw")
					$("#Iexposure_day_night")[0].selectedIndex = 2;		
			}
			else if(param == "system.information.check_IR_Light")
			{
				ir_control = val[1];

				if(ir_control == "none"){
					$("#Illumination_control").hide();
					$.fn._hide_dayNight_threshold();
					$.fn._set_dayNight();
				}else if(ir_control == "ir"){
					$.fn._hide_dayNight_threshold();
					$.fn._set_dayNight();
				}
			}
			else if(param == "image.exposure.manual_gain")
			{
				$("#Iexposure_manual_gain").val(val[1]);
				manual_gain_val = val[1];
			}
			else if(param == "image.exposure.e_v")
			{
				confList = "2.0,1.5,1.0,0.5,0,-0.5,-1.0,-1.5,-2.0".split(',');
				$("#Iexposure_ev").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == val[1])
						$("#Iexposure_ev").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
					else
						$("#Iexposure_ev").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});
			}
			else if(param == "image.exposure.day_night")
			{
				day_night = val[1];
				pre_day_night = val[1];
			}
			else if(param == "image.exposure.noise_reduction")
			{
				$("#Iexposure_noise_redution").val(val[1]);
				noise_redution_val = val[1];
			}
			else if(param == "image.color.blc")
			{

				confList = "OFF,upper_2_3rd,lower_2_3rd,center_1_3rd,center_1_6th,Left,Right,Full".split(',');
				$("#Iexposure_blc").find('option').remove();
				$.each(confList, function(n){
					$("#Iexposure_blc").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				if(val[1] == "off")
					$("#Iexposure_blc")[0].selectedIndex = 0;
				else if(val[1] == "upper_2_3rd")
					$("#Iexposure_blc")[0].selectedIndex = 1;
				else if(val[1] == "lower_2_3rd")
					$("#Iexposure_blc")[0].selectedIndex = 2;
				else if(val[1] == "center_1_3rd")
					$("#Iexposure_blc")[0].selectedIndex = 3;
				else if(val[1] == "center_1_6th")
					$("#Iexposure_blc")[0].selectedIndex = 4;
				else if(val[1] == "left")
					$("#Iexposure_blc")[0].selectedIndex = 5;
				else if(val[1] == "right")
					$("#Iexposure_blc")[0].selectedIndex = 6;
				else if(val[1] == "full")
					$("#Iexposure_blc")[0].selectedIndex = 7;
			}
			else if(param == "image.color.wdr")
			{
				confList = "OFF,High,Mid,Low".split(',');
				$("#Iexposure_wdr").find('option').remove();
				$.each(confList, function(n){
					$("#Iexposure_wdr").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				if(val[1] == "off")
					$("#Iexposure_wdr")[0].selectedIndex = 0;
				else if(val[1] == "high")
					$("#Iexposure_wdr")[0].selectedIndex = 1;
				else if(val[1] == "mid")
					$("#Iexposure_wdr")[0].selectedIndex = 2;
				else if(val[1] == "low")
					$("#Iexposure_wdr")[0].selectedIndex = 3;
			}
			else if(param == "system.information.model_name")
			{
				var model_name = val[1];
				if(model_name.search("NCB355") != -1 || model_name.search("NCB358") !=-1){
					box = 1;
				}else{
					box = 0;
				}

				var confText;
				if(model_name.search("UFD305") !=-1 || model_name.search("UFD301") !=-1 || model_name.search("NCR375") !=-1 || model_name.search("NID311") !=-1 ){
					if(camera_type == "ntsc"){
						confList = "1/50,1/100,1/60,1/120,1/250,1/500,1/1000,1/2000,1/4000,1/8000,1/10000".split(',');
						confText = "flk 1/50,flk 1/100,1/60,1/120,1/250,1/500,1/1000,1/2000,1/4000,1/8000,1/10000".split(',');
					}
					else{
						confList = "1/50,1/100,1/250,1/500,1/1000,1/2000,1/4000,1/8000,1/10000".split(',');
						confText = confList;
					}
				}
				else{

					if(camera_type == "ntsc"){
						confList = "1/60,1/120,1/250,1/500,1/1000,1/2000,1/4000,1/8000,1/10000".split(',');
						confText = confList;
					}
					else{
						confList = "1/50,1/100,1/250,1/500,1/1000,1/2000,1/4000,1/8000,1/10000".split(',');
						confText = confList;
					}
				}

				$("#Iexposure_shutter_speed").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == shutter_speed)
						$("#Iexposure_shutter_speed").append($("<option></option>").attr("value", confList[n]).text(confText[n]).attr("selected","true"));
					else
						$("#Iexposure_shutter_speed").append($("<option></option>").attr("value", confList[n]).text(confText[n]));
				});
			}
			else if(param == "image.exposure.agc_max.query_range")
			{
				split_tmp = val[1].split('~');
				$.each(split_tmp, function(n){
					if(n == 0){
						max_gain_val_range[n] = split_tmp[n].slice(1,split_tmp[n].length);
					}
					else if(n == 1){
						max_gain_val_range[n] = split_tmp[n].slice(0,split_tmp[n].length-1);
					}
				});

				$("#Iexposure_max_gain_range")[0].innerHTML 	= "("+max_gain_val_range[0]+"~"+max_gain_val_range[1]+")";
			}
			else if(param == "image.exposure.manual_gain.query_range")
			{
				split_tmp = val[1].split('~');
				$.each(split_tmp, function(n){
					if(n == 0){
						manual_gain_val_range[n] = split_tmp[n].slice(1,split_tmp[n].length);
					}
					else if(n == 1){
						manual_gain_val_range[n] = split_tmp[n].slice(0,split_tmp[n].length-1);
					}
				});

				$("#Iexposure_manual_gain_range")[0].innerHTML 	= "("+manual_gain_val_range[0]+"~"+manual_gain_val_range[1]+")";
			}
			else if(param == "image.exposure.noise_reduction.query_range")
			{
				split_tmp = val[1].split('~');
				$.each(split_tmp, function(n){
					if(n == 0){
						noise_redution_val_range[n] = split_tmp[n].slice(1,split_tmp[n].length);
					}
					else if(n == 1){
						noise_redution_val_range[n] = split_tmp[n].slice(0,split_tmp[n].length-1);
					}
				});

				$("#Iexposure_noise_redution_range")[0].innerHTML 	= "("+noise_redution_val_range[0]+"~"+noise_redution_val_range[1]+")";
			}
			else if(param == "image.exposure.ir.level.query_range")
			{
				split_tmp = val[1].split('~');
				$.each(split_tmp, function(n){
					if(n == 0){
						ir_level_val_range[n] = split_tmp[n].slice(1,split_tmp[n].length);
					}
					else if(n == 1){
						ir_level_val_range[n] = split_tmp[n].slice(0,split_tmp[n].length-1);
					}
				});

				$("#Iexposure_noise_redution_range")[0].innerHTML 	= "("+noise_redution_val_range[0]+"~"+noise_redution_val_range[1]+")";
			}
			else if(param == "image.exposure.day_to_night_threshold")
			{
				$("#Iexposure_d2n").val(val[1]);	
				d2n_val = val[1];			
			}
			else if(param == "image.exposure.night_to_day_threshold")
			{
				$("#Iexposure_n2d").val(val[1]);
				n2d_val = val[1];
			}
			else if(param == "image.exposure.light_sensor_adc")
			{
				$("#Iexposure_light_sensor_adc").val(val[1]);
			}
			else if(param == "image.exposure.switch_delay_time")
			{
				$("#Iexposure_delay_time").val(val[1]);
				switch_time = val[1];
			}

			/*
			else if(param == "image.exposure.ir.mode")
			{
				confList = "Auto,ON,OFF".split(',');
				$("#Iexposure_ir_mode").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == val[1])
						$("#Iexposure_ir_mode").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
					else
						$("#Iexposure_ir_mode").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});
			}
			else if(param == "image.exposure.ir.level")
			{
				$("#Iexposure_ir_level").val(val[1]);
				ir_level = val[1];
			}
			*/
		});
	};
	$.fn._Go = function(){
		$.fn._InitialPageLang();
		$.fn._InitialSlider();
		$.fn._light_info();
		$.fn._daynight_lightBar();
		$.fn._InitialExposure();
		$.fn._InitialFunc();
		$.fn._InitialBar();
		$('#reloading_container').hide();
		$('#container').show();
	};
	$.fn._InitialPageLang = function(){
		$("#Mexposure_title")[0].innerHTML 				= $.fn._GetLangStr(LT._Exposure_Mode);
		$("#IAuto_Exposure")[0].innerHTML 				= $.fn._GetLangStr(LT._Auto_Exposure);
		$("#Mexposure_type")[0].innerHTML 				= $.fn._GetLangStr(LT._Type)+":";
		$("#Mexposure_slow_shutter")[0].innerHTML 		= $.fn._GetLangStr(LT._Slow_Shutter)+":";
		$("#Mexposure_max_gain")[0].innerHTML 			= $.fn._GetLangStr(LT._Max_Gain)+":";
		$("#IManual_Exposure")[0].innerHTML 			= $.fn._GetLangStr(LT._Manual_Exposure);
		$("#Mexposure_shutter_speed")[0].innerHTML 		= $.fn._GetLangStr(LT._Shutter_Speed)+":";
		$("#Mexposure_manual_gain")[0].innerHTML 		= $.fn._GetLangStr(LT._Manual_Gain)+":";
		$("#Mexposure_misc_title")[0].innerHTML 		= $.fn._GetLangStr(LT._Exposure_MISC);
		$("#Mexposure_ev")[0].innerHTML 				= $.fn._GetLangStr(LT._EV_adjustment)+":";
		$("#Mexposure_day_night")[0].innerHTML 			= $.fn._GetLangStr(LT._Day_Night)+":";
		$("#Mexposure_noise_redution")[0].innerHTML 	= $.fn._GetLangStr(LT._Noise_Reduction)+":";
		$("#Mexposure_blc")[0].innerHTML 				= $.fn._GetLangStr(LT._BLC)+":";
		$("#Mexposure_wdr")[0].innerHTML 				= $.fn._GetLangStr(LT._WDR)+":";
		$("#Mexposure_Illumination_control")[0].innerHTML   = $.fn._GetLangStr(LT._Illumination_Control)+":";
		$("#day_block")[0].innerHTML                    = "&nbsp;"+$.fn._GetLangStr(LT._Day_to_Night)+"&nbsp;";
		$("#night_block")[0].innerHTML                  = "&nbsp;"+$.fn._GetLangStr(LT._Night_to_Day)+"&nbsp;";
		$("#adc_block")[0].innerHTML                    = "&nbsp;"+$.fn._GetLangStr(LT._Adc_block)+"&nbsp;";
		$("#Mexposure_day_to_night")[0].innerHTML 			= $.fn._GetLangStr(LT._Day_to_Night)+":";
		$("#Iexposure_minus_d2n").val($.fn._GetLangStr(LT._Minus));
		$("#Iexposure_plus_d2n").val($.fn._GetLangStr(LT._Plus));
		$("#Mexposure_night_to_day")[0].innerHTML 			= $.fn._GetLangStr(LT._Night_to_Day)+":";
		$("#Iexposure_minus_n2d").val($.fn._GetLangStr(LT._Minus));
		$("#Iexposure_plus_n2d").val($.fn._GetLangStr(LT._Plus));
		$("#Mexposure_switch_delay_time")[0].innerHTML      = $.fn._GetLangStr(LT._Switch_Delay_Time)+":";
		$("#Iexposure_minus_time").val($.fn._GetLangStr(LT._Minus));
		$("#Iexposure_plus_time").val($.fn._GetLangStr(LT._Plus));
		//$("#Mexposure_ir_mode")[0].innerHTML 			= $.fn._GetLangStr(LT._ir_mode)+":";
		//$("#Mexposure_ir_level")[0].innerHTML 			= $.fn._GetLangStr(LT._ir_level)+":";

		$.fn._InitialOptionLang("Iexposure_type");
		$.fn._InitialOptionLang("Iexposure_slow_shutter");
		$.fn._InitialOptionLang("Iexposure_day_night");
		$.fn._InitialOptionLang("Iexposure_blc");
		$.fn._InitialOptionLang("Iexposure_wdr");
		$.fn._InitialOptionLang("Iexposure_ir_mode");
		$.fn._InitialOptionLang("Iexposure_illumination_control");
	};

	$.fn._InitialSlider = function(){
		var Number_regex = /^(\+|-)?\d+$/;

		// exposure_max_gain - slider
		var Iexposure_max_gain_slider = $( "#Iexposure_max_gain_bar" ).slider({			
			value:$("#Iexposure_max_gain").val(),			
			min: parseInt(max_gain_val_range[0]),		
			max: parseInt(max_gain_val_range[1]),			
			step:1,			
			slide: function( event, ui ) {
				$( "#Iexposure_max_gain" ).val(ui.value);			
			},
			change: function(event, ui){
				$.fn._SetParam("image.exposure.agc_max="+ui.value);
				max_gain_val = ui.value;
			}		
		});
		$("#Iexposure_max_gain" ).change(function(e) {
			e.preventDefault();
	    	e.stopImmediatePropagation();
			if((parseInt(this.value) >= parseInt(max_gain_val_range[0]) && parseInt(this.value) <= parseInt(max_gain_val_range[1])) && !isNaN(this.value) && Number_regex.test(this.value)){
	 			Iexposure_max_gain_slider.slider("value", this.value);
				max_gain_val = this.value;
			}else
				$("#Iexposure_max_gain").val(max_gain_val);
	    }).keyup(function(e){
			code = e.keyCode ? e.keyCode : e.which;
			if(code == 13){
				if((parseInt(this.value) >= parseInt(max_gain_val_range[0]) && parseInt(this.value) <= parseInt(max_gain_val_range[1])) && !isNaN(this.value) && Number_regex.test(this.value)){
		 			Iexposure_max_gain_slider.slider("value", this.value);
					max_gain_val = this.value;
				}else
					$("#Iexposure_max_gain").val(max_gain_val);
			}
		});

		// exposure_manual_gain - slider
		var Iexposure_manual_gain_slider = $( "#Iexposure_manual_gain_bar" ).slider({			
			value:$("#Iexposure_manual_gain").val(),			
			min: parseInt(manual_gain_val_range[0]),		
			max: parseInt(manual_gain_val_range[1]),			
			step:1,			
			slide: function( event, ui ) {				
				$( "#Iexposure_manual_gain" ).val(ui.value);			
			},
			change: function(event, ui){
				$.fn._SetParam("image.exposure.manual_gain="+ui.value);
				manual_gain_val = ui.value;
			}		
		});
		$("#Iexposure_manual_gain" ).change(function(e) {
			e.preventDefault();
	    	e.stopImmediatePropagation();
			if((parseInt(this.value) >= parseInt(manual_gain_val_range[0]) && parseInt(this.value) <= parseInt(manual_gain_val_range[1])) && !isNaN(this.value) && Number_regex.test(this.value)){
	 			Iexposure_manual_gain_slider.slider("value", this.value);
				manual_gain_val = this.value;
			}else
				$("#Iexposure_manual_gain").val(manual_gain_val);
	    }).keyup(function(e){
			code = e.keyCode ? e.keyCode : e.which;
			if(code == 13){
				if((parseInt(this.value) >= parseInt(manual_gain_val_range[0]) && parseInt(this.value) <= parseInt(manual_gain_val_range[1])) && !isNaN(this.value) && Number_regex.test(this.value)){
		 			Iexposure_manual_gain_slider.slider("value", this.value);
					manual_gain_val = this.value;
				}else
					$("#Iexposure_manual_gain").val(manual_gain_val);
			}
		});

		// exposure_noise_redution - slider
		var Iexposure_noise_redution_slider = $( "#Iexposure_noise_redution_bar" ).slider({			
			value:$("#Iexposure_noise_redution").val(),			
			min: parseInt(noise_redution_val_range[0]),		
			max: parseInt(noise_redution_val_range[1]),			
			step:1,			
			slide: function( event, ui ) {				
				$( "#Iexposure_noise_redution" ).val(ui.value);			
			},
			change: function(event, ui){
				$.fn._SetParam("image.exposure.noise_reduction="+ui.value);
				noise_redution_val = ui.value;
			}		
		});

		$("#Iexposure_noise_redution" ).change(function(e) {
			e.preventDefault();
	    	e.stopImmediatePropagation();
			if((parseInt(this.value) >= parseInt(noise_redution_val_range[0]) && parseInt(this.value) <= parseInt(noise_redution_val_range[1])) && !isNaN(this.value) && Number_regex.test(this.value)){
	 			Iexposure_noise_redution_slider.slider("value", this.value);
				noise_redution_val = this.value;
			}else
				$("#Iexposure_noise_redution").val(noise_redution_val);
	    }).keyup(function(e){
			code = e.keyCode ? e.keyCode : e.which;
			if(code == 13){
				if((parseInt(this.value) >= parseInt(noise_redution_val_range[0]) && parseInt(this.value) <= parseInt(noise_redution_val_range[1])) && !isNaN(this.value) && Number_regex.test(this.value)){
		 			Iexposure_noise_redution_slider.slider("value", this.value);
					noise_redution_val = this.value;
				}else
					$("#Iexposure_noise_redution").val(noise_redution_val);
			}
		});

	    // light bar
		var handlers = new Array(); // store init val
		var day_night_threshold = new Array();
		handlers.push(parseInt($("#Iexposure_d2n").val(), 10));
    	day_night_threshold.push("Iexposure_day_to_night");
		handlers.push(parseInt($("#Iexposure_n2d").val(), 10));
    	day_night_threshold.push("Iexposure_night_to_day");
    	handlers.push(parseInt($("#Iexposure_light_sensor_adc").val(), 10));
    	day_night_threshold.push("Iexposure_light_sensor_adc");
    	// execute light info
		var Iexposure_light_bar = $("#Iexposure_light_bar").slider({
			values:handlers,
			min:0,
			max:th_max,
			create: function(event, ui){
				
				$(this).children("a:eq(" + jQuery.inArray("Iexposure_day_to_night", day_night_threshold) + ")")
	            .removeClass("ui-slider-handle").addClass("ui-slider-handle-day")
	            .mouseenter(function(){
	              $(this).removeClass("ui-state-hover");
	            })
	            .mousedown(function(){
	              $(this).removeClass("ui-state-focus");
	            });
	    
	            $(this).children("a:eq(" + jQuery.inArray("Iexposure_night_to_day", day_night_threshold) + ")")
	            .removeClass("ui-slider-handle").addClass("ui-slider-handle-night")
	            .mouseenter(function(){
	              $(this).removeClass("ui-state-hover");
	            })
	            .mousedown(function(){
	              $(this).removeClass("ui-state-focus");
	            });
	      
	            current_light_bar = $(this).children("a:eq(" + jQuery.inArray("Iexposure_light_sensor_adc", day_night_threshold) + ")")
	            .removeClass("ui-slider-handle").addClass("ui-slider-handle-threshold")
	            .mouseenter(function(){
	              $(this).removeClass("ui-state-hover");
	            })
	            .mousedown(function(){
	              $(this).removeClass("ui-state-focus");
	            });

			},
			slide: function(event, ui){
				var index = 0;
    
	            index = $(ui.handle).index();
	            if (index == 2) // Only 2 index (0,1) n2d & d2n
	                return false;
	    
	            if (ui.value > parseInt(th_max))
	                return false;
	            if (ui.values[0] >= ui.values[1])
	                return false;
	    
	            if (index == 0) {
	               $("#Iexposure_d2n").val(ui.values[0]);
	               d2n_val = ui.values[0];
	            }
	            else if (index == 1) {
	               $("#Iexposure_n2d").val(ui.values[1]);
	               n2d_val = ui.values[1];
	            }   
			},
			stop: function(event, ui){
				var index = 3;
    
	            index = $(ui.handle).index(); 
	            if (index == 0) {
	                $.fn._SetParam("image.exposure.day_to_night_threshold" +'='+ $("#Iexposure_d2n").val() +'&');
	            }else if(index == 1){
	                $.fn._SetParam("image.exposure.night_to_day_threshold" +'='+ $("#Iexposure_n2d").val() +'&');
	            }
			}	
		});
		if (current_light_bar){
		   setTimeout(function(){
			 $("#Iexposure_light_sensor_adc").html($("#Iexposure_light_sensor_adc").val()).offset({left: current_light_bar.offset().left -10});
			},100);
		}
		
		$("#Iexposure_minus_d2n").click(function(){
			var d2n = $("#Iexposure_d2n").val();
			if(d2n > 0){
				$("#Iexposure_d2n").val(d2n-1);

				Iexposure_light_bar.slider("option","values", [ $("#Iexposure_d2n").val(), $("#Iexposure_n2d").val(), 
																$("#Iexposure_light_sensor_adc").val()]);
				d2n_val = $("#Iexposure_d2n").val();
				$.fn._SetParam("image.exposure.day_to_night_threshold="+ d2n_val +'&');
			}
		});

		$("#Iexposure_plus_d2n").click(function(){
			var d2n = parseInt($("#Iexposure_d2n").val());
			if(d2n < (parseInt(th_max)-1) && d2n < (parseInt(n2d_val)-1)){
				$("#Iexposure_d2n").val(d2n+1);

				Iexposure_light_bar.slider("option","values", [ $("#Iexposure_d2n").val(), $("#Iexposure_n2d").val(), 
																$("#Iexposure_light_sensor_adc").val()]);
				d2n_val = $("#Iexposure_d2n").val();
				$.fn._SetParam("image.exposure.day_to_night_threshold="+ d2n_val +'&');
			}
		});

		$("#Iexposure_d2n").change(function(e) {
			e.preventDefault();
	    	e.stopImmediatePropagation();
			if((parseInt(this.value) >= 0 && parseInt(this.value) <= (parseInt(th_max)-1) 
				&& parseInt(this.value) < parseInt($("#Iexposure_n2d").val())) && !isNaN(this.value) && Number_regex.test(this.value)){

				d2n_val = this.value;
				$.fn._SetParam("image.exposure.day_to_night_threshold="+ d2n_val +'&');
			}else
				$("#Iexposure_d2n").val(d2n_val);
	    }).keyup(function(e){
			code = e.keyCode ? e.keyCode : e.which;
			if(code == 13){
				if((parseInt(this.value) >= 0 && parseInt(this.value) <= (parseInt(th_max)-1) 
					&& parseInt(this.value) < parseInt($("#Iexposure_n2d").val())) && !isNaN(this.value) && Number_regex.test(this.value)){

					d2n_val = this.value;
					$.fn._SetParam("image.exposure.day_to_night_threshold="+ d2n_val +'&');
				}else
					$("#Iexposure_d2n").val(d2n_val);
			}
		});

	    $("#Iexposure_minus_n2d").click(function(){
			var n2d = $("#Iexposure_n2d").val();
			if(n2d > 1 && n2d > (parseInt(d2n_val)+1)){
				$("#Iexposure_n2d").val(n2d-1);

				Iexposure_light_bar.slider("option","values", [ $("#Iexposure_d2n").val(), $("#Iexposure_n2d").val(), 
																$("#Iexposure_light_sensor_adc").val()]);
				n2d_val = $("#Iexposure_n2d").val();
				$.fn._SetParam("image.exposure.night_to_day_threshold="+ n2d_val +'&');
			}
		});

		$("#Iexposure_plus_n2d").click(function(){
			var n2d = parseInt($("#Iexposure_n2d").val());
			if(n2d < parseInt(th_max)){
				$("#Iexposure_n2d").val(n2d+1);

				$("#Iexposure_light_bar").slider("option","values", [ $("#Iexposure_d2n").val(), $("#Iexposure_n2d").val(), 
																	  $("#Iexposure_light_sensor_adc").val()]);
				n2d_val = $("#Iexposure_n2d").val();
				$.fn._SetParam("image.exposure.night_to_day_threshold="+ n2d_val +'&');
			}
		});

		$("#Iexposure_n2d").change(function(e) {
			e.preventDefault();
	    	e.stopImmediatePropagation();
			if((parseInt(this.value) >= 1 && parseInt(this.value) <= parseInt(th_max) 
				&& parseInt(this.value) > parseInt($("#Iexposure_d2n").val())) && !isNaN(this.value) && Number_regex.test(this.value)){
				
				n2d_val = this.value;
				$.fn._SetParam("image.exposure.night_to_day_threshold="+ n2d_val +'&');
			}else
				$("#Iexposure_n2d").val(n2d_val);
	    }).keyup(function(e){
			code = e.keyCode ? e.keyCode : e.which;
			if(code == 13){
				if((parseInt(this.value) >= 1 && parseInt(this.value) <= parseInt(th_max)  
					&& parseInt(this.value) > parseInt($("#Iexposure_d2n").val())) && !isNaN(this.value) && Number_regex.test(this.value)){

					n2d_val = this.value;
					$.fn._SetParam("image.exposure.night_to_day_threshold="+ n2d_val +'&');
				}else
					$("#Iexposure_n2d").val(n2d_val);
			}
		});

	    $("#Iexposure_minus_time").click(function(){
	    	var swt = parseInt($("#Iexposure_delay_time").val());
	    	if(swt>1)
	    		$("#Iexposure_delay_time").val(swt-1);
	    	switch_time = $("#Iexposure_delay_time").val();
	    	$.fn._SetParam("image.exposure.switch_delay_time="+ switch_time +'&');
	    });

	    $("#Iexposure_plus_time").click(function(){
	    	var swt = parseInt($("#Iexposure_delay_time").val());
	    	if(swt<10)
	    		$("#Iexposure_delay_time").val(swt+1);
	    	switch_time = $("#Iexposure_delay_time").val();
	    	$.fn._SetParam("image.exposure.switch_delay_time="+ switch_time +'&');
	    });

	    $("#Iexposure_delay_time").change(function(e){
	    	e.preventDefault();
	    	e.stopImmediatePropagation();
			if((parseInt(this.value) >= 1 && parseInt(this.value) <= 10) && !isNaN(this.value) && Number_regex.test(this.value)){
				
				switch_time = this.value;
				$.fn._SetParam("image.exposure.switch_delay_time="+ switch_time +'&');
			}else
				$("#Iexposure_delay_time").val(switch_time);
	    }).keyup(function(e){
	    	code = e.keyCode ? e.keyCode : e.which;
			if(code == 13){
				if((parseInt(this.value) >= 1 && parseInt(this.value) <= 10) && !isNaN(this.value) && Number_regex.test(this.value)){

					switch_time = this.value;
					$.fn._SetParam("image.exposure.switch_delay_time="+ switch_time +'&');
				}else
					$("#Iexposure_delay_time").val(switch_time);
			}
	    });
		/*
		// exposure_ir_level - slider
		var Iexposure_ir_level_slider = $( "#Iexposure_ir_level_bar" ).slider({			
			value:$("#Iexposure_ir_level").val(),			
			min: parseInt(ir_level_val_range[0]),		
			max: parseInt(ir_level_val_range[1]),			
			step:1,			
			slide: function( event, ui ) {				
				$( "#Iexposure_ir_level" ).val(ui.value);			
			},
			change: function(event, ui){
				$.fn._SetParam("image.exposure.ir.level="+ui.value);
				ir_level = ui.value;
			}		
		});
		$("#Iexposure_ir_level" ).change(function(e) {
			e.preventDefault();
	    	e.stopImmediatePropagation();
			if((parseInt(this.value) >= parseInt(ir_level_val_range[0]) && parseInt(this.value) <= parseInt(ir_level_val_range[1])) && !isNaN(this.value) && Number_regex.test(this.value)){
	 			Iexposure_ir_level_slider.slider("value", this.value);
				ir_level = this.value;
			}else
				$("#Iexposure_ir_level").val(ir_level);
	    }).keyup(function(e){
			code = e.keyCode ? e.keyCode : e.which;
			if(code == 13){
				if((parseInt(this.value) >= parseInt(ir_level_val_range[0]) && parseInt(this.value) <= parseInt(ir_level_val_range[1])) && !isNaN(this.value) && Number_regex.test(this.value)){
		 			Iexposure_ir_level_slider.slider("value", this.value);
					ir_level = this.value;
				}else
					$("#Iexposure_ir_level").val(ir_level);
			}
		});
		*/
	};

	$.fn._InitialExposure = function()
	{
		if($("input[type=radio][name=Nexposure_mode]:checked").val() == "auto")
		{
			$("#Iexposure_type").attr("disabled",false);
			$("#Iexposure_slow_shutter").attr("disabled",false);
			$("#Iexposure_max_gain_bar").slider('enable');
			$("#Iexposure_max_gain_bar").find(".ui-state-default" ).css("background-image","url(/css/images/slider-images-handle.png)");
			$("#Iexposure_max_gain").attr("disabled",false);
			$("#Iexposure_ev").attr("disabled",false);
			$("#Iexposure_blc").attr("disabled",false);
			$("#Iexposure_shutter_speed").attr("disabled",true);
			$("#Iexposure_manual_gain_bar").slider('disable');
			$("#Iexposure_manual_gain_bar").find(".ui-state-default" ).css("background-image","url(/css/images/slider-images-handle-gray.png)");
			$("#Iexposure_manual_gain").attr("disabled",true);
			$("#Iexposure_illumination_control").attr("disabled",true);

			if($("#Iexposure_type")[0].selectedIndex == 2)
				$("#Iexposure_slow_shutter").attr("disabled",true);
			else
				$("#Iexposure_slow_shutter").attr("disabled",false);
		}
		else if($("input[type=radio][name=Nexposure_mode]:checked").val() == "manual")
		{
			$("#Iexposure_type").attr("disabled",true);
			$("#Iexposure_slow_shutter").attr("disabled",true);
			$("#Iexposure_max_gain_bar").slider('disable');
			$("#Iexposure_max_gain_bar").find(".ui-state-default" ).css("background-image","url(/css/images/slider-images-handle-gray.png)");
			$("#Iexposure_max_gain").attr("disabled",true);
			$("#Iexposure_ev").attr("disabled",true);
			$("#Iexposure_blc").attr("disabled",true);
			$("#Iexposure_shutter_speed").attr("disabled",false);
			$("#Iexposure_manual_gain_bar").slider('enable');
			$("#Iexposure_manual_gain_bar").find(".ui-state-default" ).css("background-image","url(/css/images/slider-images-handle.png)");
			$("#Iexposure_manual_gain").attr("disabled",false);
			$("#Iexposure_illumination_control").attr("disabled",false);
		}
	};

	$.fn._InitialDayCtrl = function(src)
	{
		day_night = $("#Iexposure_day_night").val().toLowerCase();

		if(ir_control == "none"){
			if(src == "auto")
			{
				if(box){
					confList = "Auto,Color,BW,External".split(',');
				}else{
					confList = "Auto,Color,BW".split(',');
				}

				$("#Iexposure_day_night").find('option').remove();
				$.each(confList, function(n){
					$("#Iexposure_day_night").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				if(day_night == "color")
					$("#Iexposure_day_night")[0].selectedIndex = 1;
				else if(day_night == "bw")
					$("#Iexposure_day_night")[0].selectedIndex = 2;
				else if(day_night == "external")
					$("#Iexposure_day_night")[0].selectedIndex = 3;
				else
					$("#Iexposure_day_night")[0].selectedIndex = 0;
				
			}
			else if(src == "manual")
			{
				if(box){
					confList = "Color,BW,External".split(',');
				}else{
					confList = "Color,BW".split(',');
				}

				$("#Iexposure_day_night").find('option').remove();
				$.each(confList, function(n){
					$("#Iexposure_day_night").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				if(day_night == "color")
					$("#Iexposure_day_night")[0].selectedIndex = 0;
				else if(day_night == "bw")
					$("#Iexposure_day_night")[0].selectedIndex = 1;
				else if(day_night == "external")
					$("#Iexposure_day_night")[0].selectedIndex = 2;
				else
					$("#Iexposure_day_night")[0].selectedIndex = 0;
			}
		}
		else if(ir_control == "ir"){
			if(src == "auto")
			{
				confList = "Auto,Color,BW".split(',');
				$("#Iexposure_day_night").find('option').remove();
				$.each(confList, function(n){
					$("#Iexposure_day_night").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				if(day_night == "color")
					$("#Iexposure_day_night")[0].selectedIndex = 1;
				else if(day_night == "bw")
					$("#Iexposure_day_night")[0].selectedIndex = 2;
				else
					$("#Iexposure_day_night")[0].selectedIndex = 0;
				
			}
			else if(src == "manual")
			{
				confList = "Color,BW".split(',');
				$("#Iexposure_day_night").find('option').remove();
				$.each(confList, function(n){
					$("#Iexposure_day_night").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				if(day_night == "color")
					$("#Iexposure_day_night")[0].selectedIndex = 0;
				else if(day_night == "bw")
					$("#Iexposure_day_night")[0].selectedIndex = 1;
				else
					$("#Iexposure_day_night")[0].selectedIndex = 0;
			}
		}
		else if(ir_control == "both")
		{
			confList = "Auto,Color,BW".split(',');
			$("#Iexposure_day_night").find('option').remove();
			$.each(confList, function(n){
				$("#Iexposure_day_night").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
			});

			if(day_night == "color")
				$("#Iexposure_day_night")[0].selectedIndex = 1;
			else if(day_night == "bw")
				$("#Iexposure_day_night")[0].selectedIndex = 2;
			else
				$("#Iexposure_day_night")[0].selectedIndex = 0;
		}

		$.fn._InitialOptionLang("Iexposure_day_night");
	};
	
	$.fn._set_dayNight = function(){

		var model_id;
		$.ajax({
			url:'/cgi-bin/get?system.information.model_name',
			dataType:'json',
			async:false,
			cache:false,
			success:function(data){
				$.each(data, function(param, val){
					if(param == "system.information.model_name"){
						model_id = val[1];
					}
				});
			},
			error:function(xhr, textStatus, errorThrown){
			},
			complete:function(){
				if(model_id.search("NCB355") != -1 || model_id.search("NCB358") !=-1){
					box = 1;
				}else{
					box = 0;
				}
			}
		});

		if(mode == "manual")
		{	
			if(box){
				confList = "Color,BW,External".split(',');
			}else{
				confList = "Color,BW".split(',');
			}

			$("#Iexposure_day_night").find('option').remove();
			$.each(confList, function(n){
				$("#Iexposure_day_night").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
			});

			if(pre_day_night == "auto"){
				$.fn._SetParam("image.exposure.day_night=color");
				$("#Iexposure_day_night")[0].selectedIndex = 0;
			}
			else
			{
				if(pre_day_night == "color")
					$("#Iexposure_day_night")[0].selectedIndex = 0;
				else if(pre_day_night == "bw")
					$("#Iexposure_day_night")[0].selectedIndex = 1;
				else if(pre_day_night == "external")
					$("#Iexposure_day_night")[0].selectedIndex = 2;
			}
		}
		else
		{
			if(box){
				confList = "Auto,Color,BW,External".split(',');
			}else{
				confList = "Auto,Color,BW".split(',');
			}

			$("#Iexposure_day_night").find('option').remove();
			$.each(confList, function(n){
				$("#Iexposure_day_night").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
			});

			if(pre_day_night == "auto")
				$("#Iexposure_day_night")[0].selectedIndex = 0;
			else if(pre_day_night == "color")
				$("#Iexposure_day_night")[0].selectedIndex = 1;
			else if(pre_day_night == "bw")
				$("#Iexposure_day_night")[0].selectedIndex = 2;
			else if(pre_day_night == "external")
				$("#Iexposure_day_night")[0].selectedIndex = 3;
		}
	} 
	/* light bar Start*/
	$.fn._light_info = function(){
		
	  $.fn._getParam("image.exposure.light_sensor_adc"); // Get light_sensor_adc params
	  var adc = parseInt($("#Iexposure_light_sensor_adc").val());
	  $("#Iexposure_light_bar").slider("option","values", [  $("#Iexposure_d2n").val()
	  												       , $("#Iexposure_n2d").val()
													       , adc]);
	  
		if (current_light_bar)
			$("#Iexposure_light_sensor_adc").html(adc).offset({left: current_light_bar.offset().left - 10});
	   setTimeout($.fn._light_info,500);	
	}

	$.fn._getParam = function(checkName){
	    $.ajax({
	      url:'/cgi-bin/get?' + checkName,
	      dataType:'json',
	      asyc:false,
	      cache:false,
	      success:function(data){
	        $.each(data, function(param, val){
	          if(param == "image.exposure.light_sensor_adc"){
	             $("#Iexposure_light_sensor_adc").val(val[1]);
	          }
	        });
	      },
	      error:function(xhr, textStatus, errorThrown){
	      },
	      complete:function(){
	      }
	    });
	  };

	$.fn._daynight_lightBar = function(){
		if($("#Iexposure_day_night").val().toLowerCase() != "auto"){
			$.fn._hide_dayNight_threshold();
		}else{
			$.fn._show_dayNight_threshold;
		}
	}

	$.fn._hide_dayNight_threshold = function(){
		$("#d2n").hide();
		$("#n2d").hide();
		$("#lightBar").hide();
		$("#adcV").hide();
		$("#dt").hide();
		$("#block_color").hide();
	}

	$.fn._show_dayNight_threshold = function(){
		$("#d2n").show();
		$("#n2d").show();
		$("#lightBar").show();
		$("#adcV").show();
		$("#dt").show();
		$("#block_color").show();
	}
    /* End */
	$.fn._InitialFunc = function()
	{
		$.fn._Resize(452, 340);
		
		var command = "";
		$("input[name=Nexposure_mode]").change(function(){
			var mode = "", slow_shutter = "", blc = "", wdr = "", day;

			if($("#Iexposure_type")[0].selectedIndex == 0)
				mode = "aes";
			else if($("#Iexposure_type")[0].selectedIndex == 1)
				mode = "alc";
			else if($("#Iexposure_type")[0].selectedIndex == 2)
				mode = "flickerless";


			if($("#Iexposure_slow_shutter")[0].selectedIndex == 0)
				slow_shutter = "off";
			else
				slow_shutter = $("#Iexposure_slow_shutter").val();

			if($("#Iexposure_blc")[0].selectedIndex == 0)
				blc = "off";
			else if($("#Iexposure_blc")[0].selectedIndex == 1)
				blc = "upper_2_3rd";
			else if($("#Iexposure_blc")[0].selectedIndex == 2)
				blc = "lower_2_3rd";
			else if($("#Iexposure_blc")[0].selectedIndex == 3)
				blc = "center_1_3rd";
			else if($("#Iexposure_blc")[0].selectedIndex == 4)
				blc = "center_1_6th";
			else if($("#Iexposure_blc")[0].selectedIndex == 5)
				blc = "left";
			else if($("#Iexposure_blc")[0].selectedIndex == 6)
				blc = "right";
			else if($("#Iexposure_blc")[0].selectedIndex == 7)
				blc = "full";

			if($("#Iexposure_wdr")[0].selectedIndex == 0)
				wdr = "off";
			else if($("#Iexposure_wdr")[0].selectedIndex == 1)
				wdr = "high";
			else if($("#Iexposure_wdr")[0].selectedIndex == 2)
				wdr = "mid";
			else if($("#Iexposure_wdr")[0].selectedIndex == 3)
				wdr = "low";
				
			if($(this).val() == "auto"){
				$("#Iexposure_type").attr("disabled",false);
				$("#Iexposure_slow_shutter").attr("disabled",false);
				$("#Iexposure_max_gain_bar").slider('enable');
				$("#Iexposure_max_gain_bar").find(".ui-state-default" ).css("background-image","url(/css/images/slider-images-handle.png)");
				$("#Iexposure_max_gain").attr("disabled",false);
				$("#Iexposure_ev").attr("disabled",false);
				$("#Iexposure_blc").attr("disabled",false);
				$("#Iexposure_shutter_speed").attr("disabled",true);
				$("#Iexposure_manual_gain_bar").slider('disable');
				$("#Iexposure_manual_gain_bar").find(".ui-state-default" ).css("background-image","url(/css/images/slider-images-handle-gray.png)");
				$("#Iexposure_manual_gain").attr("disabled",true);
				$("#Iexposure_illumination_control").attr("disabled",true);

				if($("#Iexposure_type")[0].selectedIndex == 2)
					$("#Iexposure_slow_shutter").attr("disabled",true);
				else
					$("#Iexposure_slow_shutter").attr("disabled",false);

				$.fn._InitialDayCtrl("auto");
				
				command = 	"image.exposure.mode"				+"="+	mode 									+"&"+
							"image.exposure.e_v"				+"="+	$("#Iexposure_ev").val()				+"&"+
							"image.exposure.day_night"          +"="+   $("#Iexposure_day_night").val().toLowerCase()	+"&"+ // "auto"
							"image.exposure.slow_shutter"		+"="+	slow_shutter							+"&"+
							"image.exposure.agc_max"			+"="+	$("#Iexposure_max_gain").val()			+"&"+
							"image.exposure.noise_reduction"	+"="+	$("#Iexposure_noise_redution").val()	+"&"+
							"image.color.blc"					+"="+	blc										+"&"+
							"image.color.wdr"					+"="+	wdr										+"&";		
			}else if($(this).val() == "manual"){
				$("#Iexposure_type").attr("disabled",true);
				$("#Iexposure_slow_shutter").attr("disabled",true);
				$("#Iexposure_max_gain_bar").slider('disable');
				$("#Iexposure_max_gain_bar").find(".ui-state-default" ).css("background-image","url(/css/images/slider-images-handle-gray.png)");
				$("#Iexposure_max_gain").attr("disabled",true);
				$("#Iexposure_ev").attr("disabled",true);
				$("#Iexposure_blc").attr("disabled",true);
				$("#Iexposure_shutter_speed").attr("disabled",false);
				$("#Iexposure_manual_gain_bar").slider('enable');
				$("#Iexposure_manual_gain_bar").find(".ui-state-default" ).css("background-image","url(/css/images/slider-images-handle.png)");
				$("#Iexposure_manual_gain").attr("disabled",false);
				$("#Iexposure_illumination_control").attr("disabled",false);

				$.fn._InitialDayCtrl("manual");

				command = 	"image.exposure.mode"				+"="+	"manual" 								+"&"+
							"image.exposure.day_night"			+"="+	$("#Iexposure_day_night").val().toLowerCase()	+"&"+ // "color"
							"image.exposure.shutter_speed"		+"="+	$("#Iexposure_shutter_speed").val()		+"&"+
							"image.exposure.manual_gain"		+"="+	$("#Iexposure_manual_gain").val()		+"&"+		
							"image.exposure.noise_reduction"	+"="+	$("#Iexposure_noise_redution").val()	+"&"+
							"image.color.wdr"					+"="+	wdr										+"&"+
					        "image.exposure.led"                +"="+   $("#Iexposure_illumination_control").val().toLowerCase()	+"&";	
			}

			$.fn._SetParam(command);
		});

		$("#Iexposure_type").change(function(){
			var value;
			if(this.selectedIndex == 0)
				value = "aes";
			else if(this.selectedIndex == 1)
				value = "alc";
			else if(this.selectedIndex == 2)
				value = "flickerless";

			if(value == "flickerless")
				$("#Iexposure_slow_shutter").attr("disabled",true);
			else
				$("#Iexposure_slow_shutter").attr("disabled",false);

			command = "image.exposure.mode" +"="+ value;
			$.fn._SetParam(command);
		});

		$("#Iexposure_slow_shutter").change(function(){
			var value;
			if(this.selectedIndex == 0)
				value = "off";
			else
				value = $(this).val();

			command = "image.exposure.slow_shutter" +"="+ value;
			$.fn._SetParam(command);
		});

		$("#Iexposure_shutter_speed").change(function(){
			command = "image.exposure.shutter_speed" +"="+ $(this).val();
			$.fn._SetParam(command);
		});	

		$("#Iexposure_illumination_control").change(function(){
			command = "image.exposure.led" +"="+ $(this).val().toLowerCase();
			$.fn._SetParam(command);
		});

		$("#Iexposure_ev").change(function(){
			command = "image.exposure.e_v" +"="+ $(this).val();
			$.fn._SetParam(command);
		});	

		$("#Iexposure_day_night").change(function(){
			var value;
			if(ir_control == "none")
			{
				if($("input[type=radio][name=Nexposure_mode]:checked").val() == "auto")
				{
					if(this.selectedIndex == 0)
						value = "auto";
					else if(this.selectedIndex == 1)
						value = "color";
					else if(this.selectedIndex == 2)
						value = "bw";
					else if(this.selectedIndex == 3)
						value = "external";
				}
				else if($("input[type=radio][name=Nexposure_mode]:checked").val() == "manual")
				{
					if(this.selectedIndex == 0)
						value = "color";
					else if(this.selectedIndex == 1)
						value = "bw";
					else if(this.selectedIndex == 2)
						value = "external";
				}
			}else if(ir_control == "ir"){
				if($("input[type=radio][name=Nexposure_mode]:checked").val() == "auto")
				{
					if(this.selectedIndex == 0)
						value = "auto";
					else if(this.selectedIndex == 1)
						value = "color";
					else if(this.selectedIndex == 2)
						value = "bw";
				}
				else if($("input[type=radio][name=Nexposure_mode]:checked").val() == "manual")
				{
					if(this.selectedIndex == 0)
						value = "color";
					else if(this.selectedIndex == 1)
						value = "bw";
				}
			}else if(ir_control == "both"){
				
				value = $("#Iexposure_day_night").val().toLowerCase();

				if($("#Iexposure_day_night").val().toLowerCase() == "auto")
					$.fn._show_dayNight_threshold();
				else
					$.fn._hide_dayNight_threshold();	
			}

			command = "image.exposure.day_night" +"="+ value;
			$.fn._SetParam(command);		

		});

		$("#Iexposure_blc").change(function(){
			var value;
			if(this.selectedIndex == 0)
				value = "off";
			else if(this.selectedIndex == 1)
				value = "upper_2_3rd";
			else if(this.selectedIndex == 2)
				value = "lower_2_3rd";
			else if(this.selectedIndex == 3)
				value = "center_1_3rd";
			else if(this.selectedIndex == 4)
				value = "center_1_6th";
			else if(this.selectedIndex == 5)
				value = "left";
			else if(this.selectedIndex == 6)
				value = "right";
			else if(this.selectedIndex == 7)
				value = "full";

			command = "image.color.blc" +"="+ value;
			$.fn._SetParam(command);
		});

		$("#Iexposure_wdr").change(function(){
			var value;
			if(this.selectedIndex == 0)
				value = "off";
			else if(this.selectedIndex == 1)
				value = "high";
			else if(this.selectedIndex == 2)
				value = "mid";
			else if(this.selectedIndex == 3)
				value = "low";
			
			command = "image.color.wdr" +"="+ value;
			$.fn._SetParam(command);
		});

		$("#Icon_setting_default_pic").bind('click', function(){
			if(confirm($.fn._GetLangStr(LT._Reset_to_default_Warning))){
				$.fn._DefaultParam( $.fn._GetLangStr(LT._Reloading), 5000);
			}
		});

		/*
		$("#Iexposure_ir_mode").change(function(){
			var value;
			if(this.selectedIndex == 0)
				value = "auto";
			else if(this.selectedIndex == 1)
				value = "on";
			else if(this.selectedIndex == 2)
				value = "off";

			/*
			if(value == "on"){
				$("#Iexposure_ir_level_bar").slider('enable');
				$("#Iexposure_ir_level_bar").find(".ui-state-default" ).css("background-image","url(/css/images/slider-images-handle.png)");
				$("#Iexposure_ir_level").attr("disabled",false);
			}else if(value == "off"){
				$("#Iexposure_ir_level_bar").slider('disable');
				$("#Iexposure_ir_level_bar").find(".ui-state-default" ).css("background-image","url(/css/images/slider-images-handle-gray.png)");
				$("#Iexposure_ir_level").attr("disabled",true);
			}
			*/
			/*
			$("#Iexposure_ir_level_bar").slider('disable');
			$("#Iexposure_ir_level_bar").find(".ui-state-default" ).css("background-image","url(/css/images/slider-images-handle-gray.png)");
			$("#Iexposure_ir_level").attr("disabled",true);

			command = "image.exposure.ir.mode" +"="+ value;
			$.fn._SetParam(command);
		});

		if(model_ir == 1){
			$("#Mexposure_ir_mode").parent().show();
			$("#Mexposure_ir_level").parent().parent().show();
			$("#Iexposure_ir_mode").change();
		}else{
			$("#Mexposure_ir_mode").parent().hide();
			$("#Mexposure_ir_level").parent().parent().hide();
		}
		*/
	};

	$.fn._InitialBar = function()
	{
		var getBrowser = $.fn._identifyBrowser();
		jQuery.browser={};(function(){jQuery.browser.msie=false;
		jQuery.browser.version=0;if(navigator.userAgent.match(/MSIE ([0-9]+)\./)){
		jQuery.browser.msie=true;jQuery.browser.version=RegExp.$1;}})();
		
		if(jQuery.browser.version == 9)
			$("#Iexposure_light_bar").css("filter", "progid:DXImageTransform.Microsoft.gradient(startColorStr=#ff000000, endColorStr=#ffffffff, GradientType=1)");
	};

})(jQuery);