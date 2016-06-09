(function($){	
	var current_id, tmp_profile_1, tmp_profile_2, tmp_profile_3, tmp_profile_4, tmp_profile_5, tmp_profile_6;
	$.fn._ObjectAssignValue = function(src){
		$.each(src, function(param , val){
			if(param == "image.encode.profile1.encode")
				tmp_profile_1 = val[1];
			else if(param == "image.encode.profile2.encode")
				tmp_profile_2 = val[1];
			else if(param == "image.encode.profile3.encode")
				tmp_profile_3 = val[1];
			else if(param == "image.encode.profile4.encode")
				tmp_profile_4 = val[1];
			else if(param == "image.encode.profile5.encode")
				tmp_profile_5 = val[1];
			else if(param == "image.encode.profile6.encode")
				tmp_profile_6 = val[1];
			else if(param == "image.encode.current_profile_id")
				current_id = val[1];
		});
	};
	$.fn._Go = function(){
		$.fn._GenerateView();
	};
	$.fn._GenerateView = function(){
		var tmp;
		var profile = "";
		var str1_wid = "", str1_hei ="", str2_wid = "", str2_hei ="";
		if(current_id == 1)
			tmp = tmp_profile_1;
		else if(current_id == 2)
			tmp = tmp_profile_2;
		else if(current_id == 3)
			tmp = tmp_profile_3;
		else if(current_id == 4)
			tmp = tmp_profile_4;
		else if(current_id == 5)
			tmp = tmp_profile_5;
		else if(current_id == 6)
			tmp = tmp_profile_6;

		profile = tmp.split(',');
		$.each(profile, function(n){
			if(n == 0){
				len = profile[n].indexOf('/');
				res = profile[n].slice(0,len);
				In = res.indexOf('x');
				str_1_wid = res.slice(0,In);
				str_1_hei = res.slice(In+1,res.length);
			} else if(n == 1){
				len = profile[n].indexOf('/');
				res = profile[n].slice(0,len);
				In = res.indexOf('x');
				str_2_wid = res.slice(0,In);
				str_2_hei = res.slice(In+1,res.length);
			} 
		});

		// if video player is activex
		if($.cookie('def_video_player') == DEFINE_ACTIVEX)
		{
			$.getScript('/js/activex.js', function() {	
				$.fn._ActiexAppendLive("liveView_Activex");
				$.fn._StartActivex();
			});
		}
		// if video player is quicktime
		else if($.cookie('def_video_player') == DEFINE_QUICKTIME)
		{
			var wid, hei;
			var hasQT = detectQuickTime();
			//alert("tmp:" + hasQT);
			if(str_1_hei== 1536 || str_1_hei == 960){
				wid = 480;
				hei = 355;
				$("#liveView_Activex").css("margin","13px 80px auto");
			}
			else{
				wid = 640;
				hei = 360;
				$("#liveView_Activex").css("margin","12x auto");
			}
			
			if(hasQT)
				$.fn._AppendQuickTime('liveView_Activex',wid,hei);
			else
			{	
				$("<p style=\"color:white;text-align:center;margin:30% auto 0px auto;width:85%;height:100%;\">"+$.fn._GetLangStr(LT._quicktime_install_note)+" "+$.fn._GetLangStr(LT._quicktime_download_note)+" <a href=\"http://apple.com/quicktime\" target=\"_blank\" >apple.com</a></p>").appendTo("#liveView_Activex");
			}
		}
	}
})(jQuery);