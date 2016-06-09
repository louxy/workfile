(function($){
	var confList;
	var brightness_val, contrast_val, hue_val, saturation_val, sharpness_val;
	var brightness_val_range = new Array(), contrast_val_range = new Array(), hue_val_range = new Array(), saturation_val_range = new Array(), sharpness_val_range = new Array();
	var len = 0, split_tmp;
	$.fn._ObjectAssignValue = function(src){
		$.each(src, function(param , val){
			if(param == "image.color.brightness"){
				$("#Icolor_brightness").val(val[1]);
				brightness_val = val[1];
			}else if(param == "image.color.contrast"){
				$("#Icolor_contrast").val(val[1]);
				contrast_val = val[1];
			}else if(param == "image.color.hue"){
				$("#Icolor_hue").val(val[1]);
				hue_val = val[1];
			}else if(param == "image.color.saturation"){
				$("#Icolor_saturation").val(val[1]);
				saturation_val = val[1];
			}else if(param == "image.color.sharpness"){
				$("#Icolor_sharpness").val(val[1]);
				sharpness_val = val[1];
			}else if(param == "image.color.gamma_correction")
			{
				confList = "1,0.45".split(',');
				$("#Icolor_gamma_correction").find('option').remove();
				$.each(confList, function(n){
					$("#Icolor_gamma_correction").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				if(val[1] == "1")
					$("#Icolor_gamma_correction")[0].selectedIndex = 0;
				else if(val[1] == "0.45")
					$("#Icolor_gamma_correction")[0].selectedIndex = 1;
			}
			else if(param == "image.flip_mirror")
			{
				confList = "OFF,Flip,Mirror,Both".split(',');
				$("#Icolor_flip").find('option').remove();
				$.each(confList, function(n){
					$("#Icolor_flip").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				if(val[1] == "off")
					$("#Icolor_flip")[0].selectedIndex = 0;
				else if(val[1] == "flip")
					$("#Icolor_flip")[0].selectedIndex = 1;
				else if(val[1] == "mirror")
					$("#Icolor_flip")[0].selectedIndex = 2;
				else if(val[1] == "both")
					$("#Icolor_flip")[0].selectedIndex = 3;
			}
			else if(param == "image.color.brightness.query_range")
			{
				split_tmp = val[1].split('~');
				$.each(split_tmp, function(n){
					if(n == 0){
						brightness_val_range[n] = split_tmp[n].slice(1,split_tmp[n].length);
					}
					else if(n == 1){
						brightness_val_range[n] = split_tmp[n].slice(0,split_tmp[n].length-1);
					}
				});

				$("#Icolor_brightness_range")[0].innerHTML 	= "("+brightness_val_range[0]+"~"+brightness_val_range[1]+")";
			}
			else if(param == "image.color.contrast.query_range")
			{
				split_tmp = val[1].split('~');
				$.each(split_tmp, function(n){
					if(n == 0){
						contrast_val_range[n] = split_tmp[n].slice(1,split_tmp[n].length);
					}
					else if(n == 1){
						contrast_val_range[n] = split_tmp[n].slice(0,split_tmp[n].length-1);
					}
				});

				$("#Icolor_contrast_range")[0].innerHTML 	= "("+contrast_val_range[0]+"~"+contrast_val_range[1]+")";
			}
			else if(param == "image.color.hue.query_range")
			{
				split_tmp = val[1].split('~');
				$.each(split_tmp, function(n){
					if(n == 0){
						hue_val_range[n] = split_tmp[n].slice(1,split_tmp[n].length);
					}
					else if(n == 1){
						hue_val_range[n] = split_tmp[n].slice(0,split_tmp[n].length-1);
					}
				});

				$("#Icolor_hue_range")[0].innerHTML 	= "("+hue_val_range[0]+"~"+hue_val_range[1]+")";
			}
			else if(param == "image.color.saturation.query_range")
			{
				split_tmp = val[1].split('~');
				$.each(split_tmp, function(n){
					if(n == 0){
						saturation_val_range[n] = split_tmp[n].slice(1,split_tmp[n].length);
					}
					else if(n == 1){
						saturation_val_range[n] = split_tmp[n].slice(0,split_tmp[n].length-1);
					}
				});

				$("#Icolor_saturation_range")[0].innerHTML 	= "("+saturation_val_range[0]+"~"+saturation_val_range[1]+")";
			}
			else if(param == "image.color.sharpness.query_range")
			{
				split_tmp = val[1].split('~');
				$.each(split_tmp, function(n){
					if(n == 0){
						sharpness_val_range[n] = split_tmp[n].slice(1,split_tmp[n].length);
					}
					else if(n == 1){
						sharpness_val_range[n] = split_tmp[n].slice(0,split_tmp[n].length-1);
					}
				});

				$("#Icolor_sharpness_range")[0].innerHTML 	= "("+sharpness_val_range[0]+"~"+sharpness_val_range[1]+")";
			}
		});
	};
	$.fn._Go = function(){
		$.fn._InitialPageLang();
		$.fn._InitialSlider();
		$.fn._InitialFunc();
		$('#reloading_container').hide();
		$('#container').show();
	};
	$.fn._InitialPageLang = function(){
		$("#Mcolor_title")[0].innerHTML 			= $.fn._GetLangStr(LT._BasicSetting);
		$("#Mcolor_brightness")[0].innerHTML 		= $.fn._GetLangStr(LT._Brightness)+":";
		$("#Mcolor_contrast")[0].innerHTML 			= $.fn._GetLangStr(LT._Contrast)+":";
		$("#Mcolor_hue")[0].innerHTML 				= $.fn._GetLangStr(LT._Hue)+":";
		$("#Mcolor_saturation")[0].innerHTML 		= $.fn._GetLangStr(LT._Saturation)+":";
		$("#Mcolor_sharpness")[0].innerHTML 		= $.fn._GetLangStr(LT._Sharpness)+":";
		$("#Mcolor_gamma_correction")[0].innerHTML 	= $.fn._GetLangStr(LT._Gamma_Correction)+":";
		$("#Mcolor_flip")[0].innerHTML 				= $.fn._GetLangStr(LT._Flip_Mirror)+":";
		$.fn._InitialOptionLang("Icolor_flip");
	};

	$.fn._InitialSlider = function(){
		var Number_regex = /^(\-)?\d+$/;

		// brightness - slider
		var Icolor_brightness_slider = $( "#Icolor_brightness_bar" ).slider({			
			value:$("#Icolor_brightness").val(),			
			min: parseInt(brightness_val_range[0]),		
			max: parseInt(brightness_val_range[1]),			
			step:1,			
			slide: function( event, ui ) {				
				$( "#Icolor_brightness" ).val(ui.value);			
			},
			change: function(event, ui){
				$.fn._SetParam("image.color.brightness="+ui.value);
				brightness_val = ui.value;
			}		
		});
		$("#Icolor_brightness" ).change(function(e) {
			e.preventDefault();
	    	e.stopImmediatePropagation();
			if((parseInt(this.value) >= parseInt(brightness_val_range[0]) && parseInt(this.value) <= parseInt(brightness_val_range[1])) && !isNaN(this.value) && Number_regex.test(this.value)){
	 			Icolor_brightness_slider.slider("value", this.value);
				brightness_val = this.value;
			}else
				$("#Icolor_brightness").val(brightness_val);
	    }).keyup(function(e){
			code = e.keyCode ? e.keyCode : e.which;
			if(code == 13){
				if((parseInt(this.value) >= parseInt(brightness_val_range[0]) && parseInt(this.value) <= parseInt(brightness_val_range[1])) && !isNaN(this.value) && Number_regex.test(this.value)){
		 			Icolor_brightness_slider.slider("value", this.value);
					brightness_val = this.value;
				}else
					$("#Icolor_brightness").val(brightness_val);
			}
		});

		// contrast - slider
		var Icolor_contrast_slider = $( "#Icolor_contrast_bar" ).slider({			
			value:$("#Icolor_contrast").val(),			
			min: parseInt(contrast_val_range[0]),		
			max: parseInt(contrast_val_range[1]),			
			step:1,			
			slide: function( event, ui ) {				
				$( "#Icolor_contrast" ).val(ui.value);			
			},
			change: function(event, ui){
				$.fn._SetParam("image.color.contrast="+ui.value);
				contrast_val = ui.value;
			}		
		});
		$("#Icolor_contrast" ).change(function(e) {
			e.preventDefault();
	    	e.stopImmediatePropagation();
			if((parseInt(this.value) >= parseInt(contrast_val_range[0]) && parseInt(this.value) <= parseInt(contrast_val_range[1])) && !isNaN(this.value) && Number_regex.test(this.value)){
	 			Icolor_contrast_slider.slider("value", this.value);
				contrast_val = this.value;
			}else
				$("#Icolor_contrast").val(contrast_val);
	    }).keyup(function(e){
			code = e.keyCode ? e.keyCode : e.which;
			if(code == 13){
				if((parseInt(this.value) >= parseInt(contrast_val_range[0]) && parseInt(this.value) <= parseInt(contrast_val_range[1])) && !isNaN(this.value) && Number_regex.test(this.value)){
		 			Icolor_contrast_slider.slider("value", this.value);
					contrast_val = this.value;
				}else
					$("#Icolor_contrast").val(contrast_val);
			}
		});

		// hue - slider
		var Icolor_hue_slider = $( "#Icolor_hue_bar" ).slider({			
			value:$("#Icolor_hue").val(),			
			min: parseInt(hue_val_range[0]),		
			max: parseInt(hue_val_range[1]),			
			step:1,			
			slide: function( event, ui ) {				
				$( "#Icolor_hue" ).val(ui.value);			
			},
			change: function(event, ui){
				$.fn._SetParam("image.color.hue="+ui.value);
				hue_val = ui.value;
			}		
		});
		$("#Icolor_hue" ).change(function(e) {
			e.preventDefault();
	    	e.stopImmediatePropagation();
			if((parseInt(this.value) >= parseInt(hue_val_range[0]) && parseInt(this.value) <= parseInt(hue_val_range[1])) && !isNaN(this.value) && Number_regex.test(this.value)){
	 			Icolor_hue_slider.slider("value", this.value);
				hue_val = this.value;
			}else
				$("#Icolor_hue").val(hue_val);
	    }).keyup(function(e){
			code = e.keyCode ? e.keyCode : e.which;
			if(code == 13){
				if((parseInt(this.value) >= parseInt(hue_val_range[0]) && parseInt(this.value) <= parseInt(hue_val_range[1])) && !isNaN(this.value) && Number_regex.test(this.value)){
		 			Icolor_hue_slider.slider("value", this.value);
					hue_val = this.value;
				}else
					$("#Icolor_hue").val(hue_val);
			}
		});

		// saturation - slider
		var Icolor_saturation_slider = $( "#Icolor_saturation_bar" ).slider({			
			value:$("#Icolor_saturation").val(),			
			min: parseInt(saturation_val_range[0]),		
			max: parseInt(saturation_val_range[1]),			
			step:1,			
			slide: function( event, ui ) {				
				$( "#Icolor_saturation" ).val(ui.value);			
			},
			change: function(event, ui){
				$.fn._SetParam("image.color.saturation="+ui.value);
				saturation_val = ui.value;
			}		
		});
		$("#Icolor_saturation" ).change(function(e) {
			e.preventDefault();
	    	e.stopImmediatePropagation();
			if((parseInt(this.value) >= parseInt(saturation_val_range[0]) && parseInt(this.value) <= parseInt(saturation_val_range[1])) && !isNaN(this.value) && Number_regex.test(this.value)){
	 			Icolor_saturation_slider.slider("value", this.value);
				saturation_val = this.value;
			}else
				$("#Icolor_saturation").val(saturation_val);
	    }).keyup(function(e){
			code = e.keyCode ? e.keyCode : e.which;
			if(code == 13){
				if((parseInt(this.value) >= parseInt(saturation_val_range[0]) && parseInt(this.value) <= parseInt(saturation_val_range[1])) && !isNaN(this.value) && Number_regex.test(this.value)){
		 			Icolor_saturation_slider.slider("value", this.value);
					saturation_val = this.value;
				}else
					$("#Icolor_saturation").val(saturation_val);
			}
		});

		// sharpness - slider
		var Icolor_sharpness_slider = $( "#Icolor_sharpness_bar" ).slider({			
			value:$("#Icolor_sharpness").val(),			
			min: parseInt(sharpness_val_range[0]),		
			max: parseInt(sharpness_val_range[1]),			
			step:1,			
			slide: function( event, ui ) {				
				$( "#Icolor_sharpness" ).val(ui.value);			
			},
			change: function(event, ui){
				$.fn._SetParam("image.color.sharpness="+ui.value);
				sharpness_val = ui.value;
			}		
		});
		$("#Icolor_sharpness" ).change(function(e) {
			e.preventDefault();
	    	e.stopImmediatePropagation();
			if((parseInt(this.value) >= parseInt(sharpness_val_range[0]) && parseInt(this.value) <= parseInt(sharpness_val_range[1])) && !isNaN(this.value) && Number_regex.test(this.value)){
	 			Icolor_sharpness_slider.slider("value", this.value);
				sharpness_val = this.value;
			}else
				$("#Icolor_sharpness").val(sharpness_val);
	    }).keyup(function(e){
			code = e.keyCode ? e.keyCode : e.which;
			if(code == 13){
				if((parseInt(this.value) >= parseInt(sharpness_val_range[0]) && parseInt(this.value) <= parseInt(sharpness_val_range[1])) && !isNaN(this.value) && Number_regex.test(this.value)){
		 			Icolor_sharpness_slider.slider("value", this.value);
					sharpness_val = this.value;
				}else
					$("#Icolor_sharpness").val(sharpness_val);
			}
		});
	};

	$.fn._InitialFunc = function()
	{
		$.fn._Resize(452, 340);
		
		var command = "";
		$("#Icolor_gamma_correction").change(function(){
			if(this.selectedIndex == 0){ // 0
				command = "image.color.gamma_correction"		+"="+ $(this).val();
			}
			else if(this.selectedIndex == 1){ // 1
				command = "image.color.gamma_correction"		+"="+ $(this).val();
			}
			$.fn._SetParam(command);
		});

		$("#Icolor_flip").change(function(){
			if(this.selectedIndex == 0){ // off
				command = "image.flip_mirror"					+"="+ "off";
			}
			else if(this.selectedIndex == 1){ // flip
				command = "image.flip_mirror"					+"="+ "flip";
			}
			else if(this.selectedIndex == 2){ // mirror
				command = "image.flip_mirror"					+"="+ "mirror";
			}
			else if(this.selectedIndex == 3){ // both
				command = "image.flip_mirror"					+"="+ "both";
			}
			$.fn._SetParam(command);
		});

		$("#Icon_setting_default_pic").bind('click', function(){
			if(confirm($.fn._GetLangStr(LT._Reset_to_default_Warning))){
				$.fn._DefaultParam( $.fn._GetLangStr(LT._Reloading), 5000);
			}
		});
	};
})(jQuery);