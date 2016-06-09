(function($){
	var confList, def_audio_level;
	$.fn._ObjectAssignValue = function(src){
		$.each(src, function(param , val){
			if(param == "system.audio_alarm.level"){
				$("#Iaudio_alarm_level").val(val[1]);
				def_audio_level = val[1];
			}
		});
	};
	$.fn._Go = function(){
		$.fn._InitialPageLang();
		$.fn._GenerateAudioElements();
		$.fn._GetAudioData();
		$.fn._InitialSlider();
		$.fn._InitialFunc();
		$('#reloading_container').hide();
		$('#container').show();
	};
	$.fn._InitialPageLang = function(){
		$("#Maudio_alarm_level_title")[0].innerHTML 				= $.fn._GetLangStr(LT._audio_alaram_level);
		$("#Maudio_alarm_level")[0].innerHTML 						= $.fn._GetLangStr(LT._Level)+":";
		$("#Maudio_activity_title")[0].innerHTML 					= $.fn._GetLangStr(LT._audio_activity);
	};

	$.fn._InitialSlider = function(){
		var Number_regex =  /^\d+$/;

		// audio alarm level- slider
		var Iaudio_alarm_level_slider = $( "#Iaudio_alarm_level_bar" ).slider({			
			value:$("#Iexposure_max_gain").val(),			
			min: 1,		
			max: 100,			
			step:1,			
			slide: function( event, ui ) {
				$( "#Iaudio_alarm_level" ).val(ui.value);			
			},
			change: function(event, ui){
				$.fn._SetParam("system.audio_alarm.level="+ui.value);
				$.fn._UpdateVertical(def_audio_level, ui.value);
				def_audio_level = ui.value;
			}		
		});
		$("#Iaudio_alarm_level" ).change(function(e) {
			e.preventDefault();
	    	e.stopImmediatePropagation();
			if((parseInt(this.value) >= parseInt(1) && parseInt(this.value) <= parseInt(100)) && !isNaN(this.value) && Number_regex.test(this.value)){
	 			Iaudio_alarm_level_slider.slider("value", this.value);
				def_audio_level = this.value;
			}else
				$("#Iaudio_alarm_level").val(def_audio_level);
	    }).keyup(function(e){
			code = e.keyCode ? e.keyCode : e.which;
			if(code == 13){
				if((parseInt(this.value) >= parseInt(1) && parseInt(this.value) <= parseInt(100)) && !isNaN(this.value) && Number_regex.test(this.value)){
		 			Iaudio_alarm_level_slider.slider("value", this.value);
					def_audio_level = this.value;
				}else
					$("#Iaudio_alarm_level").val(def_audio_level);
			}
		});
	};

	var ini_index = 1, tmp_audio_array = new Array(), swap_audio_array = new Array();
	$.fn._GenerateAudioElements = function()
	{
		// generate horizontal elements
		for( var i = 1; i <= 240; i++ )
		{
			$("<div class=\"h_bar\" id=\"a_h_"+i+"\" style=\"left:"+Number(i*2-1)+"px\"></div>").appendTo("#audio_cow_table");
		}

		// generate vertical elements
		$("<div id=\"audio_level\"></div>").appendTo("#audio_cow_table").parent();

		var w, h, x, y;
		w = $("#audio_cow_table").attr("width");
		h = $("#audio_cow_table").attr("height");
		x = $("#audio_cow_table").position().left;
		y = $("#audio_cow_table").position().top;

		$("#audio_level").attr("style","width:"+w+";height:"+h+";position:absolute;left:"+x+";top:"+y+";");

		for( var i = 100; i > 0; i-- )
		{
			$("<div class=\"v_bar\" id=\"a_v_"+i+"\" style=\"height:2.7px\"></div>").appendTo("#audio_level");
		}

		// initial audio alarm level.
		$("#a_v_" + def_audio_level).animate({
			width: "100%",
			title: def_audio_level
		},0).css("border-bottom","solid 1px black");
	};

	$.fn._UpdateVertical = function(o, n)
	{
		$("#a_v_" + o).css("border-bottom","");

		$("#a_v_" + n).animate({
			width: "100%",
			title: n
		},0).css("border-bottom","solid 1px black");
	};
	
	$.fn._GetAudioData = function()
	{
		var d = Math.floor((Math.random()*100)+1);

		// Execute swap data function when tmp_audio_array is fill up.
		if(ini_index = 241)
		{
			// reset ini_index to last elements
			ini_index = 240;
			
			// copy old data into swap_audio_array.
			for(var i = 0; i < 240; i++)
			{
				if(i == 239) break;
				else
					swap_audio_array[i] = tmp_audio_array[i+1];
			}

			// update tmp_audio_array
			for(var i = 0; i < 240; i++)
			{
				if(i == 239) break;
				else
					tmp_audio_array[i] = swap_audio_array[i];
			}
			
			tmp_audio_array[ini_index - 1] = d;
		}
		else
			tmp_audio_array[ini_index - 1] = d;

		// paint audio data table.
		for(var j = 1; j <= 240; j++)
		{
			var hei;
			
			if(tmp_audio_array[j-1] == undefined) continue;
			else
				hei = tmp_audio_array[j-1] * 2.6;

			if(tmp_audio_array[j-1] >= def_audio_level)
			{
				$("#a_h_" + j).animate({
					height: hei
				},0).css("border","solid 1px red");
			}
			else
			{
				$("#a_h_" + j).animate({
					height: hei
				},0).css("border","solid 1px green");
			}
		}

		// release memory
		d = null, hei = null;
		ini_index++;
		setTimeout($.fn._GetAudioData,500);
	};

	$.fn._InitialFunc = function()
	{
		$("#Icon_setting_default_pic").bind('click', function(){
			if(confirm($.fn._GetLangStr(LT._Reset_to_default_Warning))){
				$.fn._DefaultParam($.fn._GetLangStr(LT._Reloading), 5000);
			}
		});
	};
})(jQuery);
