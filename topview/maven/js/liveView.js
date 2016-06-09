(function($){
	var current_id, tmp_profile_1, tmp_profile_2, tmp_profile_3, tmp_profile_4, tmp_profile_5, tmp_profile_6;
	var tmp_rtsp_auth, tmp_rtsp_user, tmp_rtsp_passwd, tmp_rtsp_url_1, tmp_rtsp_url_2, tmp_rtsp_url_3, tmp_audio_out, tmp_audio_in, tmp_rtsp_port;
	var str_1_hei, str_1_wid, str_2_hei, str_2_wid;
	var dec_str =1;
	var query_mic = null, query_speak = null;
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
			else if(param == "network.rtsp.authentication")
				tmp_rtsp_auth = val[1];
			else if(param == "network.rtsp.login_id")
				tmp_rtsp_user = val[1];
			else if(param == "network.rtsp.password")
				tmp_rtsp_passwd = val[1];
			else if(param == "network.rtsp.stream_1.url")
				tmp_rtsp_url_1 = val[1];
			else if(param == "network.rtsp.stream_2.url")
				tmp_rtsp_url_2 = val[1];
			else if(param == "network.rtsp.stream_3.url")
				tmp_rtsp_url_3 = val[1];
			else if(param == "system.audio_in.enable")
			{
				if(model_audio == 2 || model_audio == 0)
					$("#IMic").parent().hide();
				else
				{
					tmp_audio_in = val[1];
					if(val[1] == "on")
						$("#IMic").attr("src","/css/images/mic_active.png");
				}
			}
			else if(param == "system.audio_out.enable")
			{
				if(model_audio == 1 || model_audio == 0)
					$("#ISpeaker").parent().hide();
				else
				{
					tmp_audio_out = val[1];
					if(val[1] == "on")
						$("#ISpeaker").attr("src","/css/images/speaker_active.png");
				}
			}
			else if(param == "network.rtsp.port")
				tmp_rtsp_port = val[1];	
		});
	};
	$.fn._Go = function(){
		$.fn._InitialPageLang();
		$.fn._GeneratePlay();
		$.fn._InitialFunc();
		$('#reloading_container').hide();
		$('#container').show();
	};
	
	$.fn._InitialPageLang = function(){
		$.fn._InitialOptionLang("player_select");
	};

	$.fn._GeneratePlay = function()
	{
		var tmp;
		var str1_res = "", str1_codec ="", str2_res ="", str2_codec ="", str3_res ="", str3_codec ="";
		var $play_menu = $("#play_menu");
		var profile = "";
		var res = "";
		var len = 0;
		var In = 0;
		
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
				var $player_1 = $("<ul class=\"accordion\"></ul>");
				$("<div id=\"player1\"><label id=\"Mplayer1\"></label></div>").appendTo($player_1);
				$player_1.appendTo($play_menu);
				$("#Mplayer1")[0].innerHTML 		= $.fn._GetLangStr(LT._Stream)+"1";
			} else if(n == 1){
				len = profile[n].indexOf('/');
				res = profile[n].slice(0,len);
				In = res.indexOf('x');
				str_2_wid = res.slice(0,In);
				str_2_hei = res.slice(In+1,res.length);
				var $player_2 = $("<ul class=\"accordion\"></ul>");
				$("<div id=\"player2\"><label id=\"Mplayer2\"></label></div>").appendTo($player_2);
				$player_2.appendTo($play_menu);
				$("#Mplayer2")[0].innerHTML 		= $.fn._GetLangStr(LT._Stream)+"2";
			} 
		});

		// reset def_stream && def_focus_tag
		if($.cookie('def_stream') == undefined)
		{
			$.cookie('def_stream', 'stream1', { expires: 365, path: '/' });
			$.cookie('def_focus_tag', 'fixed', { expires: 365, path: '/' });
			$.cookie('def_rec', 'off', { expires: 365, path: '/' });
		}
		else
		{
			$.cookie('def_stream', 'stream1', { expires: 365, path: '/' });
			$.cookie('def_focus_tag', 'fixed', { expires: 365, path: '/' });
			$.cookie('def_rec', 'off', { expires: 365, path: '/' });
		}
		
		$("#Mplayer1").css("color","red");
	};

	$.fn._InitialFunc = function()
	{
		var cmd = "";

		$("#player1").bind('click', function(){
			$("#Mplayer1").css("color","red");
			$("#Mplayer2").css("color","black");
			dec_str = 1;
			
			if($.cookie('def_focus_tag') == "fixed" && $.cookie('def_video_player') == DEFINE_ACTIVEX)
				window.tmp_frame_tage._Resize("640","360",str_1_hei);
			else if($.cookie('def_focus_tag') == "fixed" && $.cookie('def_video_player') == DEFINE_QUICKTIME)
				window.tmp_frame_tage._Resize("635","355",str_1_hei);
			else if($.cookie('def_focus_tag') == "real")
				window.tmp_frame_tage._Resize(str_1_wid,str_1_hei,str_1_hei);

			window.tmp_frame_tage._SetupActivex(tmp_rtsp_auth, tmp_rtsp_user, tmp_rtsp_passwd, tmp_rtsp_url_1, tmp_audio_out, tmp_rtsp_port);

			$.cookie('def_stream', 'stream1', { expires: 365, path: '/' });
		});

		$("#player2").bind('click', function(){
			$("#Mplayer1").css("color","black");
			$("#Mplayer2").css("color","red");
			dec_str = 2;

			if($.cookie('def_focus_tag') == "fixed" && $.cookie('def_video_player') == DEFINE_ACTIVEX)
				window.tmp_frame_tage._Resize("640","360",str_2_hei);
			else if($.cookie('def_focus_tag') == "fixed" && $.cookie('def_video_player') == DEFINE_QUICKTIME)
				window.tmp_frame_tage._Resize("635","355",str_2_hei);
			else if($.cookie('def_focus_tag') == "real")
				window.tmp_frame_tage._Resize(str_2_wid,str_2_hei,str_2_hei);

			window.tmp_frame_tage._SetupActivex(tmp_rtsp_auth, tmp_rtsp_user, tmp_rtsp_passwd, tmp_rtsp_url_2, tmp_audio_out, tmp_rtsp_port);

			$.cookie('def_stream', 'stream2', { expires: 365, path: '/' });
		});	

		$("#actviex_snapshot").bind('click', function(e){
			if($.cookie('def_video_player') == DEFINE_ACTIVEX){
				window.tmp_frame_tage._Snapshot();
			}
			else if($.cookie('def_video_player') == DEFINE_QUICKTIME){
				e.preventDefault();
				e.stopImmediatePropagation();
				$("form").submit();
			}
		});

		// Hidden fixed and real button to prevent the embed in safari overflows outside scroll area.
		if($.fn._identifyBrowser() == "safari"){}
		else
		{
			$("#actviex_fixed").bind('click', function(){
				$("#tmp_frame").css("width","660px");
				$("#tmp_frame").css("height","380px");
				$("#actviex_fixed").attr("src","/css/images/fixed_icon_on.png");
				$("#actviex_real").attr("src","/css/images/real_icon.png");
				$("#liveView_conf").attr("style","width:640px;margin-right:auto;margin-left:auto;");
				
				//window.tmp_frame_tage._Resize("640","360");
				if(dec_str ==1 && $.cookie('def_video_player') == DEFINE_ACTIVEX)
					window.tmp_frame_tage._Resize("640","360",str_1_hei);
				else if(dec_str ==1 && $.cookie('def_video_player') == DEFINE_QUICKTIME)
					window.tmp_frame_tage._Resize("635","355",str_1_hei);
				else if(dec_str ==2 && $.cookie('def_video_player') == DEFINE_QUICKTIME)
					window.tmp_frame_tage._Resize("640","360",str_2_hei);
				else if(dec_str ==2 && $.cookie('def_video_player') == DEFINE_QUICKTIME)
					window.tmp_frame_tage._Resize("635","355",str_2_hei);

				$.cookie('def_focus_tag', 'fixed', { expires: 365, path: '/' });
			});

			$("#actviex_real").bind('click', function(){
				var browser_hei = $(window).height();
				var logo_area_hei = $("#logo_area").height();
				var conf_header_hei = $("#infor_area").height();
				var main_width = $("#liveView_content").width();
				var main_hei = (browser_hei-logo_area_hei-conf_header_hei-140);
				$("#tmp_frame").css("width",main_width+"px");
				$("#tmp_frame").css("height",main_hei+"px");
				
				$("#actviex_fixed").attr("src","/css/images/fixed_icon.png");
				$("#actviex_real").attr("src","/css/images/real_icon_on.png");
				$("#liveView_conf").attr("style","width:100%;height:100%;");

				if($.cookie('def_stream') == "stream1")
				{
					window.tmp_frame_tage._Resize(str_1_wid,str_1_hei);
				}
				else if($.cookie('def_stream') == "stream2")
				{
					window.tmp_frame_tage._Resize(str_2_wid,str_2_hei);
				}

				$.cookie('def_focus_tag', 'real', { expires: 365, path: '/' });
			});
		}

		if($.fn._identifyOS() == "MacOS")
		{
			// quicktime player
			if($.cookie('def_video_player') == DEFINE_QUICKTIME)
			{
				$("#liveView_conf_pic").css("width","170px");
				$("#actviex_fullscreen").parent().hide();
				$("#ISpeaker").parent().hide();
				$("#Irec").parent().hide();
			}
		}
		else
		{
			// activex
			if($.cookie('def_video_player') == DEFINE_ACTIVEX)
			{
				
			}
			// quicktime player
			else if($.cookie('def_video_player') == DEFINE_QUICKTIME)
			{
				$("#liveView_conf_pic").css("width","170px");
				$("#actviex_fullscreen").parent().hide();
				$("#ISpeaker").parent().hide();
				$("#Irec").parent().hide();
			}
		}

		$("#actviex_fullscreen").bind('click', function(){
			window.tmp_frame_tage._FullScreen();
		});

		$("#IMic").bind('click',function(){
			if(tmp_audio_in == "on"){
				cmd = "system.audio_in.enable=off";
				$("#IMic").attr("src","/css/images/mic_normal.png");
				tmp_audio_in = "off";
			}else if(tmp_audio_in == "off"){
				cmd = "system.audio_in.enable=on";
				$("#IMic").attr("src","/css/images/mic_active.png");
				tmp_audio_in = "on";
			}

			$.fn._SetParam(cmd);
			query_mic = setInterval($.fn._RunThreadMic,1000);
		});

		$("#ISpeaker").bind('click',function(){
			if(tmp_audio_out == "on"){
				cmd = "system.audio_out.enable=off";
				$("#ISpeaker").attr("src","/css/images/speaker_normal.png");
				tmp_audio_out = "off";
			}else if(tmp_audio_out == "off"){
				cmd = "system.audio_out.enable=on";
				$("#ISpeaker").attr("src","/css/images/speaker_active.png");
				tmp_audio_out = "on";
			}

			$.fn._SetParam(cmd);
			query_speak = setInterval($.fn._RunThreadSpeaker,1000);
		});

		$("#Irec").bind('click', function(){
			if($.cookie('def_rec') == "off"){
				
				var getStatus = window.tmp_frame_tage._StartRec();
				if(getStatus){
					$("#Irec").attr("src","/css/images/rec_on.png");
					$.cookie('def_rec', 'on', { expires: 365, path: '/' });
				}
			}else if($.cookie('def_rec') == "on"){
				$("#Irec").attr("src","/css/images/rec.png");
				$.cookie('def_rec', 'off', { expires: 365, path: '/' });
				window.tmp_frame_tage._StopRec();
			}
		});
	};

	$.fn._RunThreadMic = function()
	{
		var stop = 0;
		$.ajax({
			url:'/cgi-bin/get?'+"system.engineering.wis_status",
			dataType:'json',
			cache:false,
			success:function(data){
				$.each(data, function(param, value){
					if(param == "system.engineering.wis_status"){
						if(value[1] == "yes"){
							stop = 1;
							$.fn._SetupAudio();
						}
						else if(value[1] == "no"){
						}
					}
				});
				if(stop)
					clearInterval(query_mic);
			},
			error:function(xhr, textStatus, errorThrown){
			}
		});
	};

	$.fn._RunThreadSpeaker = function()
	{
		var stop = 0;
		$.ajax({
			url:'/cgi-bin/get?'+"system.engineering.wis_status",
			dataType:'json',
			cache:false,
			success:function(data){
				$.each(data, function(param, value){
					if(param == "system.engineering.wis_status"){
						if(value[1] == "yes"){
							stop = 1;
							$.fn._SetupAudio();
						}
						else if(value[1] == "no"){
						}
					}
				});
				if(stop)
					clearInterval(query_speak);
			},
			error:function(xhr, textStatus, errorThrown){
			}
		});
	};

	$.fn._SetupAudio = function()
	{
		if($.cookie('def_stream') == "stream1")
			window.tmp_frame_tage._SetupActivex(tmp_rtsp_auth, tmp_rtsp_user, tmp_rtsp_passwd, tmp_rtsp_url_1, tmp_audio_out, tmp_rtsp_port);
		else if($.cookie('def_stream') == "stream2")
			window.tmp_frame_tage._SetupActivex(tmp_rtsp_auth, tmp_rtsp_user, tmp_rtsp_passwd, tmp_rtsp_url_2, tmp_audio_out, tmp_rtsp_port);
	};
	
})(jQuery);
