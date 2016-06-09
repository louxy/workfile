(function($){
	var r_val, g_val, b_val;
	var r_val_range = new Array(), g_val_range = new Array(), b_val_range = new Array();
	var len = 0, split_tmp;
	$.fn._ObjectAssignValue = function(src){
		$.each(src, function(param , val){
			if(param == "image.color.white_balance.mode")
			{
				var confList = "Auto,Manual".split(',');
				$("#Iwb_mode").find('option').remove();
				$.each(confList, function(n){
					$("#Iwb_mode").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				if(val[1] == "auto")
					$("#Iwb_mode")[0].selectedIndex = 0;
				else if(val[1] == "manual")
					$("#Iwb_mode")[0].selectedIndex = 1;
			}
			else if(param == "image.color.white_balance.r_gain"){
				$("#Iwb_r").val(val[1]);
				r_val = val[1];
			}else if(param == "image.color.white_balance.g_gain"){
				$("#Iwb_g").val(val[1]);
				g_val = val[1];
			}else if(param == "image.color.white_balance.b_gain"){
				$("#Iwb_b").val(val[1]);
				b_val = val[1];

			} 
			else if(param == "image.color.white_balance.r_gain.query_range")
			{
				split_tmp = val[1].split('~');
				$.each(split_tmp, function(n){
					if(n == 0){
						r_val_range[n] = split_tmp[n].slice(1,split_tmp[n].length);
					}
					else if(n == 1){
						r_val_range[n] = split_tmp[n].slice(0,split_tmp[n].length-1);
					}
				});

				$("#Iwb_r_range")[0].innerHTML 	= "("+r_val_range[0]+"~"+r_val_range[1]+")";
			}
			else if(param == "image.color.white_balance.g_gain.query_range")
			{
				split_tmp = val[1].split('~');
				$.each(split_tmp, function(n){
					if(n == 0){
						g_val_range[n] = split_tmp[n].slice(1,split_tmp[n].length);
					}
					else if(n == 1){
						g_val_range[n] = split_tmp[n].slice(0,split_tmp[n].length-1);
					}
				});

				$("#Iwb_g_range")[0].innerHTML 	= "("+g_val_range[0]+"~"+g_val_range[1]+")";
			}
			else if(param == "image.color.white_balance.b_gain.query_range")
			{
				split_tmp = val[1].split('~');
				$.each(split_tmp, function(n){
					if(n == 0){
						b_val_range[n] = split_tmp[n].slice(1,split_tmp[n].length);
					}
					else if(n == 1){
						b_val_range[n] = split_tmp[n].slice(0,split_tmp[n].length-1);
					}
				});

				$("#Iwb_b_range")[0].innerHTML 	= "("+b_val_range[0]+"~"+b_val_range[1]+")";
			}
		});
	};
	$.fn._Go = function(){
		$.fn._InitialPageLang();
		$.fn._InitialSlider();
		$.fn._InitialFunc();
		$.fn._WhitebalanceCtrl();
		$('#reloading_container').hide();
		$('#container').show();
	};
	$.fn._InitialPageLang = function(){
		$("#Mwb_title")[0].innerHTML 		= $.fn._GetLangStr(LT._BasicSetting);
		$("#Mwb_mode")[0].innerHTML 		= $.fn._GetLangStr(LT._White_Balance_Mode)+":";
		$("#Mwb_r")[0].innerHTML 			= $.fn._GetLangStr(LT._R_Gain)+":";
		$("#Mwb_g")[0].innerHTML 			= $.fn._GetLangStr(LT._G_Gain)+":";
		$("#Mwb_b")[0].innerHTML 			= $.fn._GetLangStr(LT._B_Gain)+":";
		$.fn._InitialOptionLang("Iwb_mode");
	};
	$.fn._InitialSlider = function(){
		var Number_regex = /^\d+$/;

		// r - slider
		var Iwb_r_slider = $( "#Iwb_r_bar" ).slider({			
			value:$("#Iwb_r").val(),			
			min: parseInt(r_val_range[0]),		
			max: parseInt(r_val_range[1]),			
			step:1,			
			slide: function( event, ui ) {				
				$( "#Iwb_r" ).val(ui.value);			
			},
			change: function(event, ui){
				$.fn._SetParam("image.color.white_balance.r_gain="+ui.value);
				r_val = ui.value;
			}		
		});
		$("#Iwb_r" ).change(function(e) {
			e.preventDefault();
	    	e.stopImmediatePropagation();
			if((parseInt(this.value) >= parseInt(r_val_range[0]) && parseInt(this.value) <= parseInt(r_val_range[1])) && !isNaN(this.value) && Number_regex.test(this.value)){
	 			Iwb_r_slider.slider("value", this.value);
				r_val = this.value;
			}else
				$("#Iwb_r").val(r_val);
	    }).keyup(function(e){
			code = e.keyCode ? e.keyCode : e.which;
			if(code == 13){
				if((parseInt(this.value) >= parseInt(r_val_range[0]) && parseInt(this.value) <= parseInt(r_val_range[1])) && !isNaN(this.value) && Number_regex.test(this.value)){
		 			Iwb_r_slider.slider("value", this.value);
					r_val = this.value;
				}else
					$("#Iwb_r").val(r_val);
			}
		});

		// g - slider
		var Iwb_g_slider = $( "#Iwb_g_bar" ).slider({			
			value:$("#Iwb_g").val(),			
			min: parseInt(g_val_range[0]),		
			max: parseInt(g_val_range[1]),			
			step:1,			
			slide: function( event, ui ) {				
				$( "#Iwb_g" ).val(ui.value);			
			},
			change: function(event, ui){
				$.fn._SetParam("image.color.white_balance.g_gain="+ui.value);
				g_val = ui.value;
			}		
		});
		$("#Iwb_g" ).change(function(e) {
			e.preventDefault();
	    	e.stopImmediatePropagation();
			if((parseInt(this.value) >= parseInt(g_val_range[0]) && parseInt(this.value) <= parseInt(g_val_range[1])) && !isNaN(this.value) && Number_regex.test(this.value)){
	 			Iwb_g_slider.slider("value", this.value);
				g_val = this.value;
			}else
				$("#Iwb_g").val(g_val);
	    }).keyup(function(e){
			code = e.keyCode ? e.keyCode : e.which;
			if(code == 13){
				if((parseInt(this.value) >= parseInt(g_val_range[0]) && parseInt(this.value) <= parseInt(g_val_range[1])) && !isNaN(this.value) && Number_regex.test(this.value)){
		 			Iwb_g_slider.slider("value", this.value);
					g_val = this.value;
				}else
					$("#Iwb_g").val(g_val);
			}
		});

		// b - slider
		var Iwb_b_slider = $( "#Iwb_b_bar" ).slider({			
			value:$("#Iwb_b").val(),			
			min: parseInt(b_val_range[0]),		
			max: parseInt(b_val_range[1]),			
			step:1,			
			slide: function( event, ui ) {				
				$( "#Iwb_b" ).val(ui.value);			
			},
			change: function(event, ui){
				$.fn._SetParam("image.color.white_balance.b_gain="+ui.value);
				b_val = ui.value;
			}		
		});
		$("#Iwb_b" ).change(function(e) {
			e.preventDefault();
	    	e.stopImmediatePropagation();
			if((parseInt(this.value) >= parseInt(b_val_range[0]) && parseInt(this.value) <= parseInt(b_val_range[1])) && !isNaN(this.value) && Number_regex.test(this.value)){
	 			Iwb_b_slider.slider("value", this.value);
				b_val = this.value;
			}else
				$("#Iwb_b").val(b_val);
	    }).keyup(function(e){
			code = e.keyCode ? e.keyCode : e.which;
			if(code == 13){
				if((parseInt(this.value) >= parseInt(b_val_range[0]) && parseInt(this.value) <= parseInt(b_val_range[1])) && !isNaN(this.value) && Number_regex.test(this.value)){
		 			Iwb_b_slider.slider("value", this.value);
					b_val = this.value;
				}else
					$("#Iwb_b").val(b_val);
			}
		});
	};

	$.fn._WhitebalanceCtrl = function(){
		var command = "";
		$("#Iwb_mode").change(function(){
			if(this.selectedIndex == 0){ // auto
				$("#Iwb_r_bar").slider('disable');
				$("#Iwb_r_bar").find(".ui-state-default" ).css("background-image","url(/css/images/slider-images-handle-gray.png)");
				$("#Iwb_r").attr("disabled",true);
				$("#Iwb_g_bar").slider('disable');
				$("#Iwb_g_bar").find(".ui-state-default" ).css("background-image","url(/css/images/slider-images-handle-gray.png)");
				$("#Iwb_g").attr("disabled",true);
				$("#Iwb_b_bar").slider('disable');
				$("#Iwb_b_bar").find(".ui-state-default" ).css("background-image","url(/css/images/slider-images-handle-gray.png)");
				$("#Iwb_b").attr("disabled",true);
				command = "image.color.white_balance.mode"				+"="+ "auto&";
			}
			else if(this.selectedIndex == 1){ // manual
				$("#Iwb_r_bar").slider('enable');
				$("#Iwb_r_bar").find(".ui-state-default" ).css("background-image","url(/css/images/slider-images-handle.png)");
				$("#Iwb_r").attr("disabled",false);
				$("#Iwb_g_bar").slider('enable');
				$("#Iwb_g_bar").find(".ui-state-default" ).css("background-image","url(/css/images/slider-images-handle.png)");
				$("#Iwb_g").attr("disabled",false);
				$("#Iwb_b_bar").slider('enable');
				$("#Iwb_b_bar").find(".ui-state-default" ).css("background-image","url(/css/images/slider-images-handle.png)");
				$("#Iwb_b").attr("disabled",false);
				command = "image.color.white_balance.mode"				+"="+ "manual&";
			}
			$.fn._SetParam(command);
		});

		$("#Iwb_mode").change();
	};

	$.fn._InitialFunc = function()
	{
		$.fn._Resize(452, 340);
		
		$("#Icon_setting_default_pic").bind('click', function(){
			if(confirm($.fn._GetLangStr(LT._Reset_to_default_Warning))){
				$.fn._DefaultParam( $.fn._GetLangStr(LT._Reloading), 5000);
			}
		});
	};

})(jQuery);