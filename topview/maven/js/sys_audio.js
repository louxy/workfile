(function($){
	var confList;
	$.fn._ObjectAssignValue = function(src){
		$.each(src, function(param , val){
			if(param == "system.audio_in.enable")
				$("input[name=Naudio_in][value='"+val[1]+"']").attr('checked',true);
			else if(param == "system.audio_in.level")
			{
				confList = "High,Mid,Low".split(',');
				$("#Iaudio_in_level").find('option').remove();
				$.each(confList, function(n){
					$("#Iaudio_in_level").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				if(val[1] == "high")
					$("#Iaudio_in_level")[0].selectedIndex = 0;
				else if(val[1] == "mid")
					$("#Iaudio_in_level")[0].selectedIndex = 1;
				else if(val[1] == "low")
					$("#Iaudio_in_level")[0].selectedIndex = 2;
			}
			else if(param == "system.audio_in.type")
			{
				confList = "G711a,G711u".split(',');
				$("#Iaudio_in_type").find('option').remove();
				$.each(confList, function(n){
					$("#Iaudio_in_type").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				if(val[1] == "g711a")
					$("#Iaudio_in_type")[0].selectedIndex = 0;
				else if(val[1] == "g711u")
					$("#Iaudio_in_type")[0].selectedIndex = 1;
			}
			else if(param == "system.audio_out.enable")
				$("input[name=Naudio_out][value='"+val[1]+"']").attr('checked',true);
			else if(param == "system.audio_out.level")
			{
				confList = "High,Mid,Low".split(',');
				$("#Iaudio_out_level").find('option').remove();
				$.each(confList, function(n){
					$("#Iaudio_out_level").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				if(val[1] == "high")
					$("#Iaudio_out_level")[0].selectedIndex = 0;
				else if(val[1] == "mid")
					$("#Iaudio_out_level")[0].selectedIndex = 1;
				else if(val[1] == "low")
					$("#Iaudio_out_level")[0].selectedIndex = 2;
			}
		});
	};
	$.fn._Go = function(){
		$.fn.InitialModelLimitation();
		$.fn._InitialPageLang();
		$.fn._InitialFunc();
		$('#reloading_container').hide();
		$('#container').show();
	};
	$.fn._InitialPageLang = function(){
		$("#Maudio_in_title")[0].innerHTML 		= $.fn._GetLangStr(LT._Audio_In);
		$("#Maudio_in_type")[0].innerHTML 		= $.fn._GetLangStr(LT._Type)+":";
		$("#Maudio_in")[0].innerHTML 			= $.fn._GetLangStr(LT._Enable)+":";
		$("#Maudio_in_level")[0].innerHTML 		= $.fn._GetLangStr(LT._Level)+":";
		$("#Naudio_in_on")[0].innerHTML 		= $.fn._GetLangStr(LT._ON);
		$("#Naudio_in_off")[0].innerHTML 		= $.fn._GetLangStr(LT._OFF);
		$("#Maudio_out_title")[0].innerHTML 	= $.fn._GetLangStr(LT._Audio_Out);
		$("#Maudio_out")[0].innerHTML 			= $.fn._GetLangStr(LT._Enable)+":";
		$("#Maudio_out_level")[0].innerHTML 	= $.fn._GetLangStr(LT._Level)+":";
		$("#Naudio_out_on")[0].innerHTML 		= $.fn._GetLangStr(LT._ON);
		$("#Naudio_out_off")[0].innerHTML 		= $.fn._GetLangStr(LT._OFF);
		$.fn._InitialOptionLang("Iaudio_in_type");
		$.fn._InitialOptionLang("Iaudio_in_level");
		$.fn._InitialOptionLang("Iaudio_out_level");
	};

	$.fn.InitialModelLimitation = function()
	{
		if(model_audio == 1){
			$("#Maudio_out_title").parent().hide();
			$("#Maudio_out").parent().hide();
			$("#Maudio_out_level").parent().hide();
		}
		else if(model_audio == 2){
			$("#Maudio_in_title").parent().hide();
			$("#Maudio_in_type").parent().hide();
			$("#Maudio_in").parent().hide();
			$("#Maudio_in_level").parent().hide();
		}
	};

	$.fn._InitialFunc = function()
	{
		var command = "";
		$("#Icon_setting_save_pic").bind('click', function(){

			var audio_in_type, audio_in_level, audio_out_level;
			
			if($("#Iaudio_in_type")[0].selectedIndex == 0)
				audio_in_type = "g711a";
			else if($("#Iaudio_in_type")[0].selectedIndex == 1)
				audio_in_type = "g711u";

			if($("#Iaudio_in_level")[0].selectedIndex == 0)
				audio_in_level = "high";
			else if($("#Iaudio_in_level")[0].selectedIndex == 1)
				audio_in_level = "mid";
			else if($("#Iaudio_in_level")[0].selectedIndex == 2)
				audio_in_level = "low";

			if($("#Iaudio_out_level")[0].selectedIndex == 0)
				audio_out_level = "high";
			else if($("#Iaudio_out_level")[0].selectedIndex == 1)
				audio_out_level = "mid";
			else if($("#Iaudio_out_level")[0].selectedIndex == 2)
				audio_out_level = "low";

			if(model_audio == 1 || model_audio == 3)
			{
				command = command + "system.audio_in.enable"	+"="+	$("input[type=radio][name=Naudio_in]:checked").val()+"&"+
									"system.audio_in.level"		+"="+	audio_in_level+"&"+
									"system.audio_in.type"		+"="+	audio_in_type+"&";
			}

			if(model_audio == 2 || model_audio == 3)
			{
				command = command + "system.audio_out.enable"	+"="+	$("input[type=radio][name=Naudio_out]:checked").val()+"&"+
									"system.audio_out.level"	+"="+	audio_out_level+"&";
			}
		
			$.fn._SetParamByMask(command, $.fn._GetLangStr(LT._Reloading), 7000);
		});
		
		$("#Icon_setting_default_pic").bind('click', function(){
			if(confirm($.fn._GetLangStr(LT._Reset_to_default_Warning))){
				$.fn._DefaultParam( $.fn._GetLangStr(LT._Reloading), 5000);
			}
		});
	};
})(jQuery);