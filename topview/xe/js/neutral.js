(function($){
	(function(){if (!window['console']) {console={log:function(){}};}})();

	var hello
        , OCX_VER = "1,0,0,3905"
        , CLSID = "F4CC2E0F-E997-4FBF-BB93-7D16432DF786"
        , PROJECT = ""
	, DEFINE_LANGUAGE_ARABIC = "Arabic"
	, DEFINE_LANGUAGE_CZECH = "Czech"
	, DEFINE_LANGUAGE_SD_CHINESE = "Chinese (Simplified)"
	, DEFINE_LANGUAGE_TL_CHINESE = "Chinese (Traditional)"
	, DEFINE_LANGUAGE_ENGLISH = "English"
	, DEFINE_LANGUAGE_FRENCH = "French"
	, DEFINE_LANGUAGE_GERMAN = "German"
	, DEFINE_LANGUAGE_HUNGARIAN = "Hungarian"
	, DEFINE_LANGUAGE_ITALIAN = "Italian"
	, DFFINE_LANGUAGE_JAPANESE = "Japanese"
	, DFFINE_LANGUAGE_POLISH = "Polish"
	, DEFINE_LANGUAGE_PORTUGUESE = "Portuguese"
	, DEFINE_LANGUAGE_SPANISH = "Spanish"
	, DEFINE_ACTIVEX = "Media Player"
	, DEFINE_QUICKTIME = "Quicktime"
	, Language_Array = [ 
		DEFINE_LANGUAGE_ENGLISH,
		DEFINE_LANGUAGE_SD_CHINESE, 
		DEFINE_LANGUAGE_TL_CHINESE, 
		DFFINE_LANGUAGE_JAPANESE
	]
	, Menu_Array = [
		["menu_encode",	
			// 	content block,	generate save button,	allow meida player display 
			[
				["sub_encode",			"required",		"disabled"]
			]
		],
		["menu_images", 	
			[
				["sub_exposure",		"disabled",		"required"],
				["sub_whitebalance",	"disabled",		"required"],
				["sub_img_basic",		"disabled",		"required"]
			]
		],
		["menu_lens", 	
			[
				["sub_lens",			"disabled",		"required"],
				["sub_rs485",			"required",		"disabled"]
			]
		],
		["menu_video", 	
			[
				["sub_privacy",			"required",		"required"],
				["sub_roi",				"disabled",		"required"]
			]
		],
		["menu_network",	
			[
				["sub_general",			"required",		"disabled"],
				["sub_ftp",				"required",		"disabled"],
				["sub_sftp",			"required",		"disabled"],
				["sub_rtsp",			"required",		"disabled"],
				["sub_snmp",			"required",		"disabled"],
				["sub_ieee8021x",		"required",		"disabled"],
				["sub_firewall",		"required",		"disabled"],
				["sub_ddns",			"required",		"disabled"],
				["sub_ssl",				"disabled",		"disabled"],
				["sub_gb28181",			"required",		"disabled"],
				["sub_youtube",			"required",		"disabled"],
				["sub_hls",				"required",		"disabled"]
			]
		],
		["menu_system",
			[
				["sub_datetime",		"required",		"disabled"],
				["sub_audio",			"required",		"disabled"],
				["sub_firmware",		"disabled",		"disabled"],
				["sub_configure",		"disabled",		"disabled"],
				["sub_osd",				"required",		"required"],
				["sub_event_search",	"disabled",		"disabled"]
			]
		],
		["menu_account",
			[
				["sub_account",			"disabled",		"disabled"],
				["sub_ldap",			"required",		"disabled"]
			]
		],
		["menu_event_source",
			[
				["sub_alarm",			"required",		"disabled"],
				["sub_audio_detection",	"required",		"disabled"],
				["sub_defocus",			"required",		"disabled"],
				["sub_motion",			"required",		"required"],
				["sub_network_less",	"required",		"disabled"],
				["sub_schedule",		"required",		"disabled"],
				["sub_tamper",			"required",		"disabled"],
				["sub_sd_detection",	"required",		"disabled"]
			]
		],
		["menu_video_analysis",
			[
				["sub_va_basic",		"disabled",		"required"],
				["sub_face",			"required",		"disabled"],
				["sub_line_counting",	"required",		"required"],
				["sub_border_line", 	"required",		"required"],
				["sub_loitering",		"required",		"required"],
				["sub_area_counting", 	"required",		"required"],
				["sub_intrusion", 		"required",		"required"],
				["sub_departure", 		"required",		"required"],
				["sub_withdrawn", 		"required",		"required"]
			]
		],
		["menu_event_handler",
			[
				["sub_alarm_out",		"required",		"disabled"],
				["sub_email",			"required",		"disabled"],
				["sub_sink_ftp",		"required",		"disabled"],
				["sub_nas",				"required",		"disabled"],
				["sub_recording",		"required",		"disabled"],
				["sub_sdcard",			"required",		"disabled"],
				["sub_snapshot",		"required",		"disabled"],
				["sub_sound",			"required",		"disabled"]
			]
		],
		["menu_sd_playback",
		    [
				["sub_playback",		"disabled",		"disabled"]
			]
		]
		// ["menu_ptz_settings",
		// 	[
		// 		["sub_ptz_basic",		"required",		"required"],
		// 		["sub_ptz_position",	"disabled",		"required"],
		// 		["sub_ptz_patrol",		"required",		"required"],
		// 		["sub_ptz_pattern",			"disabled",		"required"]
		// 	]
		// ]
	]
	, content_height = ""
	, content_width = ""
	, MediaPlayerWidth = 400
	, MediaPlayerHeight = 198
	, MediaRatio = 0
	, MediaStrWidth = 0
	, MediaStrHeight = 0
	, MediaType = ""
	, SysParam = {
		"LoginID":"",
		"system.access_level":"",
		"system.audio_out.enable":"",
		"system.camera_type":"",
		"WDRType":"",
		"image.info.exposure.iris.data_status":"",
		"image.info.exposure.iris.type":"",
		"AudioType":"",
		"Platform":"",
		"network.web.enable_ldap":"",
		"network.rtsp.stream.1.url":"",
		"network.rtsp.stream.2.url":"",
		"network.rtsp.stream.3.url":"",
		"network.rtsp.port":"",
		"network.rtsp.login_id":"",
		"network.rtsp.password":"",
		"network.rtsp.authentication":"",
		"encode.profile.1.config":"",
		"encode.profile.2.config":"",
		"encode.profile.3.config":"",
		"encode.current_profile_id":"",
		"image.orientation":"",
		"encode.profile.1.corridor":"",
		"encode.profile.2.corridor":"",
		"encode.profile.3.corridor":"",
		"encode.profile.1.stream.1.ntsc.frame_rate":"",
		"encode.profile.1.stream.1.pal.frame_rate":"",
		"encode.profile.1.stream.2.ntsc.frame_rate":"",
		"encode.profile.1.stream.2.pal.frame_rate":"",
		"encode.profile.1.stream.3.ntsc.frame_rate":"",
		"encode.profile.1.stream.3.pal.frame_rate":"",
		"encode.profile.2.stream.1.ntsc.frame_rate":"",
		"encode.profile.2.stream.1.pal.frame_rate":"",
		"encode.profile.2.stream.2.ntsc.frame_rate":"",
		"encode.profile.2.stream.2.pal.frame_rate":"",
		"encode.profile.2.stream.3.ntsc.frame_rate":"",
		"encode.profile.2.stream.3.pal.frame_rate":"",
		"encode.profile.3.stream.1.ntsc.frame_rate":"",
		"encode.profile.3.stream.1.pal.frame_rate":"",
		"encode.profile.3.stream.2.ntsc.frame_rate":"",
		"encode.profile.3.stream.2.pal.frame_rate":"",
		"encode.profile.3.stream.3.ntsc.frame_rate":"",
		"encode.profile.3.stream.3.pal.frame_rate":"",
		"XEvinW":"",
		"XEvinH":"",
		"AlarmInType":"",
		"AlarmOutType":"",
		"SDType":"",
		"LensType":"",
		"ABFType":"",
		"IRType":"",
		"motorized_lens.info.limit_time":"",
		"event.sink.recording.stream":"",
		"image.info.exposure.iris.p_iris":"",
		"Sensor":"",
		"video_analysis.object_counting.line.1.coordinate":"",
		"video_analysis.object_counting.line.2.coordinate":"",
		"video_analysis.object_counting.line.3.coordinate":"",
		"video_analysis.object_counting.line.1.direction":"",
		"video_analysis.object_counting.line.2.direction":"",
		"video_analysis.object_counting.line.3.direction":"",
		"video_analysis.object_counting.line.1.enable":"",
		"video_analysis.object_counting.line.2.enable":"",
		"video_analysis.object_counting.line.3.enable":"",
		"event.source.loitering.area":"",
		"event.source.intrusion.area":"",
		"event.source.line_crossing.line.1.coordinate":"",
		"event.source.line_crossing.line.2.coordinate":"",
		"event.source.line_crossing.line.3.coordinate":"",
		"event.source.line_crossing.line.1.direction":"",
		"event.source.line_crossing.line.2.direction":"",
		"event.source.line_crossing.line.3.direction":"",
		"event.source.line_crossing.line.1.enable":"",
		"event.source.line_crossing.line.2.enable":"",
		"event.source.line_crossing.line.3.enable":"",
		"LensList":"",
		"system.information.wire.ipv4.address":"",
		"event.source.loitering.enable":"",
		"event.source.intrusion.enable":"",
		"MechanismType":"",
		"event.sink.sdcard.1.sd_err_status":"",
		"video_analysis.area_counting.enable":"",
		"video_analysis.area_counting.area":"",
		"event.source.departure.enable":"",
		"event.source.departure.area":"",
		"VAFeature":"",
		"video_analysis.area_counting.count_location.x":"",
		"video_analysis.area_counting.count_location.y":"",
		"event.source.withdrawn.zone.1.coordinate":"",
		"event.source.withdrawn.zone.2.coordinate":"",
		"event.source.withdrawn.zone.3.coordinate":"",
		"event.source.withdrawn.zone.1.enable":"",
		"event.source.withdrawn.zone.2.enable":"",
		"event.source.withdrawn.zone.3.enable":""
	}
	, SysName = [
		"login_user",
		"access_level",
		"audio_out",
		"camera_type",
		"wdr_type",
		"iris_status",
		"iris_type",
		"audio_type",
		"platform",
		"enable_ldap",
		"str_1_url",
		"str_2_url",
		"str_3_url",
		"rtsp_port",
		"rtsp_user_name",
		"rtsp_passwd",
		"rtsp_auth",
		"str_1_config",
		"str_2_config",
		"str_3_config",
		"cur_id",
		"orientation",
		"corridor_1",
		"corridor_2",
		"corridor_3",
		"p_1_s_1_n",
		"p_1_s_1_p",
		"p_1_s_2_n",
		"p_1_s_2_p",
		"p_1_s_3_n",
		"p_1_s_3_p",
		"p_2_s_1_n",
		"p_2_s_1_p",
		"p_2_s_2_n",
		"p_2_s_2_p",
		"p_2_s_3_n",
		"p_2_s_3_p",
		"p_3_s_1_n",
		"p_3_s_1_p",
		"p_3_s_2_n",
		"p_3_s_2_p",
		"p_3_s_3_n",
		"p_3_s_3_p",
		"xe_vin_w",
		"xe_vin_h",
		"alarm_in_type",
		"alarm_out_type",
		"sd_type",
		"lens_type",
		"abf_type",
		"ir_type",
		"keep_alive_time",
		"sd_recording",
		"p_iris_level",
		"sensor",
		"object_counting_1_coord",
		"object_counting_2_coord",
		"object_counting_3_coord",
		"object_counting_1_direct",
		"object_counting_2_direct",
		"object_counting_3_direct",
		"object_counting_1_en",
		"object_counting_2_en",
		"object_counting_3_en",
		"loitering_area",
		"intrusion_area",
		"border_line_1_coord",
		"border_line_2_coord",
		"border_line_3_coord",
		"border_line_1_direct",
		"border_line_2_direct",
		"border_line_3_direct",
		"border_line_1_en",
		"border_line_2_en",
		"border_line_3_en",
		"lenslist",
		"ipv4",
		"loitering_en",
		"intrusion_en",
		"mechanismtype",
		"mSD_card_support",
		"area_counting_en",
		"area_counting_coord",
		"departure_en",
		"departure_coord",
		"va_feature",
		"area_counting_x",
		"area_counting_y",
		"withdrawn_1_coord",
		"withdrawn_2_coord",
		"withdrawn_3_coord",
		"withdrawn_1_en",
		"withdrawn_2_en",
		"withdrawn_3_en",
	]
	, ParamData
	, Picture_type = ""
	, query_obj_thread
	, download_msi = "/plugin/MessoaPlayer.msi"
	, LT
	, Excep_num = 0
	, Modify = 0
	, SiderData = ["#54C3F1","#DCDDDD","#bebebe"]
	, LogoData = ["null", "Network Camera"]
	, RemoveAttri = 0
	, data_type = []
	, xml
	, Record_save = []
	, save_num = 0
	, VA_Options = ["OFF", "Object Counting", "Line Crossing", "Loitering", "Area Counting", "Intrusion", "Departure", "Withdrawn"]
	, IP_regex = "^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})){3}$"
	, VA_Feature = false
	, previousScroll = 0
	, status_thread = ""
	, status_obj = null
	, status_param = {
		"event.source.motion_detection.zone.1.info.status":"",
		"event.source.motion_detection.zone.2.info.status":"",
		"event.source.motion_detection.zone.3.info.status":"",
		"event.source.motion_detection.zone.4.info.status":"",
		"event.source.alarm_detection.alarm_in.1.info.status":"",
		"event.source.alarm_detection.alarm_in.2.info.status":"",
		"event.source.alarm_detection.alarm_in.3.info.status":"",
		"event.source.face_detection.info.status":""
	}
	;

	$.fn._IndexGo = function()
	{
		if(ParamData.access_level == "user" || ParamData.access_level == "operator"){
			$.fn.initialLive();
		} else {
	        if($.cookie("def_config") == undefined){
		        $.fn.initialConfig();
	    	} else {
	    		if($.cookie("def_config") == "live"){
	    			$.fn.initialLive();
	    		} else if($.cookie("def_config") == "config"){
	    			$.fn.initialConfig();
	    		}
	    	}
    	}
    	$.fn._RenderDiv();
	};

	$.fn._RenderDiv = function()
	{
		$.each(Menu_Array, function(n){
			$.each(Menu_Array[n][1], function(m){
				if($.cookie("tab_menu_active") == "M"+Menu_Array[n][1][m][0])
					return true;
				else
					$.fn.genContent(Menu_Array[n][1][m][0], xml);
			});
		});
		xml = null;
	};

	$.fn.startLanguage = function(where)
	{
		if($.cookie('def_lang') == undefined) {
			var lang = window.navigator.userLanguage || window.navigator.language;
			if(lang == "ar")
				$.cookie('def_lang', DEFINE_LANGUAGE_ARABIC, { expires: 365, path: '/' });
			else if(lang == "cs")
				$.cookie('def_lang', DEFINE_LANGUAGE_CZECH, { expires: 365, path: '/' });
			else if(lang == "zh-CN" || lang == "zh-cn")
				$.cookie('def_lang', DEFINE_LANGUAGE_SD_CHINESE, { expires: 365, path: '/' });
			else if(lang == "zh-TW" || lang == "zh-tw")
				$.cookie('def_lang', DEFINE_LANGUAGE_TL_CHINESE, { expires: 365, path: '/' });
			else if(lang == "fr")
				$.cookie('def_lang', DEFINE_LANGUAGE_FRENCH, { expires: 365, path: '/' });
			else if(lang == "de")
				$.cookie('def_lang', DEFINE_LANGUAGE_GERMAN, { expires: 365, path: '/' });
			else if(lang == "hu")
				$.cookie('def_lang', DEFINE_LANGUAGE_HUNGARIAN, { expires: 365, path: '/' });
			else if(lang == "it")
				$.cookie('def_lang', DEFINE_LANGUAGE_ITALIAN, { expires: 365, path: '/' });
			else if(lang == "ja")
				$.cookie('def_lang', DFFINE_LANGUAGE_JAPANESE, { expires: 365, path: '/' });
			else if(lang == "es")
				$.cookie('def_lang', DEFINE_LANGUAGE_SPANISH, { expires: 365, path: '/' });
			else if(lang == "pt")
				$.cookie('def_lang', DEFINE_LANGUAGE_PORTUGUESE, { expires: 365, path: '/' });
			else if(lang == "en")
				$.cookie('def_lang', DEFINE_LANGUAGE_ENGLISH, { expires: 365, path: '/' });
			else
				$.cookie('def_lang', DEFINE_LANGUAGE_ENGLISH, { expires: 365, path: '/' });
		}

		$.each(Language_Array, function(n){
			if(Language_Array[n] == $.cookie('def_lang'))
				$("#lang_select").append($("<option></option>").attr("value", Language_Array[n]).text(Language_Array[n]).attr("selected","true"));
			else
				$("#lang_select").append($("<option></option>").attr("value", Language_Array[n]).text(Language_Array[n]));
		});

		$("#lang_select").change(function(){
			$.cookie('def_lang', $(this).val(), { expires: 365, path: '/' });
			$.fn.loadingLang($(this).val(), where);
			$.fn.adjustAuthInfo($(this).val());
		});

		$("#lang_select").change();
	};

	$.fn._ReadJson = function(where)
	{
		$.fn.initialModelProperty(where);
	};

	$.fn.loadingLang = function(Lang, where)
	{
		if(Lang == DEFINE_LANGUAGE_ENGLISH){
			$.getScript('/js/lang_en.js', function() {
				if(typeof(LT_EN)!='undefined'){
					if(where == "login")
						$.fn._InitialPageLang(LT_EN);
					else if(where == "index")		
						$.fn.UpdateLanguage(LT_EN);
					else if(where == "net_view")
						$.fn.UpdateViewLang(LT_EN);
					LT = LT_EN;
				}
			});
		} else if(Lang == DEFINE_LANGUAGE_SD_CHINESE){
			$.getScript('/js/lang_zh_cn.js', function() {
				if(typeof(LT_ZH_CN)!='undefined'){
					if(where == "login")
						$.fn._InitialPageLang(LT_ZH_CN);
					else if(where == "index")
						$.fn.UpdateLanguage(LT_ZH_CN);
					else if(where == "net_view")
						$.fn.UpdateViewLang(LT_ZH_CN);
					LT = LT_ZH_CN;
				}
			});
		} else if(Lang == DEFINE_LANGUAGE_TL_CHINESE){
			$.getScript('/js/lang_zh_tw.js', function() {
				if(typeof(LT_ZH_TW)!='undefined'){
					if(where == "login")
						$.fn._InitialPageLang(LT_ZH_TW);
					else if(where == "index")
						$.fn.UpdateLanguage(LT_ZH_TW);
					else if(where == "net_view")
						$.fn.UpdateViewLang(LT_ZH_TW);
					LT = LT_ZH_TW;
				}
			});	
		} else if(Lang == DEFINE_LANGUAGE_ARABIC){
			$.getScript('/js/lang_arabic.js', function() {
				if(typeof(LT_ARABIC)!='undefined'){
					if(where == "login")
						$.fn._InitialPageLang(LT_ARABIC);
					else if(where == "index")
						$.fn.UpdateLanguage(LT_ARABIC);
					else if(where == "net_view")
						$.fn.UpdateViewLang(LT_ARABIC);
					LT = LT_ARABIC;
				}
			});
		} else if(Lang == DEFINE_LANGUAGE_CZECH){
			$.getScript('/js/lang_czech.js', function() {
				if(typeof(LT_CZECH)!='undefined'){		
					if(where == "login")
						$.fn._InitialPageLang(LT_CZECH);
					else if(where == "index")
						$.fn.UpdateLanguage(LT_CZECH);
					else if(where == "net_view")
						$.fn.UpdateViewLang(LT_CZECH);
					LT = LT_CZECH;
				}
			});
		} else if(Lang == DEFINE_LANGUAGE_FRENCH){
			$.getScript('/js/lang_french.js', function() {
				if(typeof(LT_FRENCH)!='undefined'){
					if(where == "login")
						$.fn._InitialPageLang(LT_FRENCH);
					else if(where == "index")
						$.fn.UpdateLanguage(LT_FRENCH);
					else if(where == "net_view")
						$.fn.UpdateViewLang(LT_FRENCH);
					LT = LT_FRENCH;
				}
			});
		} else if(Lang == DEFINE_LANGUAGE_GERMAN){
			$.getScript('/js/lang_german.js', function() {
				if(typeof(LT_GERMAN)!='undefined'){
					if(where == "login")
						$.fn._InitialPageLang(LT_GERMAN);
					else if(where == "index")
						$.fn.UpdateLanguage(LT_GERMAN);
					else if(where == "net_view")
						$.fn.UpdateViewLang(LT_GERMAN);
					LT = LT_GERMAN;
				}
			});
		} else if(Lang == DEFINE_LANGUAGE_HUNGARIAN){
			$.getScript('/js/lang_hungarian.js', function() {
				if(typeof(LT_HUNGARIAN)!='undefined'){
					if(where == "login")
						$.fn._InitialPageLang(LT_HUNGARIAN);
					else if(where == "index")
						$.fn.UpdateLanguage(LT_HUNGARIAN);
					else if(where == "net_view")
						$.fn.UpdateViewLang(LT_HUNGARIAN);
					LT = LT_HUNGARIAN;
				}
			});
		} else if(Lang == DEFINE_LANGUAGE_ITALIAN){
			$.getScript('/js/lang_italian.js', function() {
				if(typeof(LT_ITALIAN)!='undefined'){
					if(where == "login")
						$.fn._InitialPageLang(LT_ITALIAN);
					else if(where == "index")
						$.fn.UpdateLanguage(LT_ITALIAN);
					else if(where == "net_view")
						$.fn.UpdateViewLang(LT_ITALIAN);
					LT = LT_ITALIAN;
				}
			});
		} else if(Lang == DFFINE_LANGUAGE_JAPANESE){
			$.getScript('/js/lang_japan.js', function() {
				if(typeof(LT_JAPAN)!='undefined'){
					if(where == "login")
						$.fn._InitialPageLang(LT_JAPAN);
					else if(where == "index")
						$.fn.UpdateLanguage(LT_JAPAN);
					else if(where == "net_view")
						$.fn.UpdateViewLang(LT_JAPAN);
					LT = LT_JAPAN;
				}
			});
		} else if(Lang == DFFINE_LANGUAGE_POLISH){
			$.getScript('/js/lang_polish.js', function() {
				if(typeof(LT_POLISH)!='undefined'){
					if(where == "login")
						$.fn._InitialPageLang(LT_POLISH);
					else if(where == "index")
						$.fn.UpdateLanguage(LT_POLISH);
					else if(where == "net_view")
						$.fn.UpdateViewLang(LT_POLISH);
					LT = LT_POLISH;
				}
			});
		} else if(Lang == DEFINE_LANGUAGE_PORTUGUESE){
			$.getScript('/js/lang_portuguese.js', function() {
				if(typeof(LT_PORTUGUESE)!='undefined'){
					if(where == "login")
						$.fn._InitialPageLang(LT_PORTUGUESE);
					else if(where == "index")
						$.fn.UpdateLanguage(LT_PORTUGUESE);
					else if(where == "net_view")
						$.fn.UpdateViewLang(LT_PORTUGUESE);
					LT = LT_PORTUGUESE;
				}
			});
		} else if(Lang == DEFINE_LANGUAGE_SPANISH){
			$.getScript('/js/lang_spanish.js', function() {
				if(typeof(LT_SPANISH)!='undefined'){
					if(where == "login")
						$.fn._InitialPageLang(LT_SPANISH);
					else if(where == "index")
						$.fn.UpdateLanguage(LT_SPANISH);
					else if(where == "net_view")
						$.fn.UpdateViewLang(LT_SPANISH);
					LT = LT_SPANISH;
				}
			});
		} else{
			$.getScript('/js/lang_en.js', function() {
				if(typeof(LT_EN)!='undefined'){
					if(where == "login")
						$.fn._InitialPageLang(LT_EN);
					else if(where == "index")
						$.fn.UpdateLanguage(LT_EN);
					else if(where == "net_view")
						$.fn.UpdateViewLang(LT_EN);
					LT = LT_EN;
				}
			});	
		}

		if(Lang == DEFINE_LANGUAGE_FRENCH)
			$(".div_li span").css("padding-left", "20px");
		else
			$(".div_li span").css("padding-left", "33px");
	};

	$.fn.adjustAuthInfo = function(Lang)
	{
		if(Lang == DFFINE_LANGUAGE_JAPANESE){
			$("#_g_C").css("width","1050px");
			$("#_g_A").css("width","230px");
			$("#act_navigation").css("margin-left","");
		}else{
			$("#_g_C").css("width","1075px");
			$("#_g_A").css("width","205px");
			$("#act_navigation").css("margin-left","30px");
		}
	};

	$.fn.initialIndexStyle = function()
	{
		var ExtXml = function(){
			return $.ajax({
	            url: "/xml/layout.xml",
	            async: false,
	            dataType:'xml',
	            cache:false,
	            error:function(){
	            	console.log("get layout.xml failed.");
	            },
	            success:function(){
	            	console.log("get layout.xml success.");
	            }
	        }).responseXML;
		};

		xml = ExtXml();
		$.fn.genContent("main", xml);
		$("#main div").each(function(n){
			var tmp = $(this).attr("id")
			, pare_sty = ""
			, object
			;
			if(tmp != undefined)
			{
				if(tmp.search("_g_L") != -1){
					pare_sty = "width:"+$(this).width()+"px;height:"+$(this).height()+"px;";
					object = $.fn.genLogo(pare_sty, LogoData[0], LogoData[1]);
					$(object).appendTo($(this));
				} else if(tmp.search("_g_A") != -1){
					pare_sty = "float:right;margin:6px 10px 0px 0px;";
					object = $.fn.genAcctInfo(pare_sty);
					$(object).appendTo($(this));
				} else if(tmp.search("_g_C") != -1){
					if(Number($(this).height()) < 34)
						pare_sty = "position:relative;bottom:"+Number($(this).height()-34)+"px;margin-left:30px;";
					else
						pare_sty = "position:relative;bottom:-"+Number($(this).height()-30)+"px;margin-left:30px;";
					object = $.fn.genConfigure(pare_sty);
					$(object).appendTo($(this));
					$.fn.setConfigCtrl();
				} else if(tmp.search("_g_M") != -1){
					pare_sty = "width:"+Number($(this).width()-10)+"px;height:"+$(this).height()+"px;";
					object = $.fn.genSideMenu(pare_sty);
					$(object).appendTo($(this));
					$.fn.genLiveOptions();
					$.fn.setSideMenuCtrl(SiderData[0], SiderData[1], SiderData[2]);
					// $.fn.genContent("ctrl_ptz", xml);
					$.fn.genContent("ctrl_r485", xml);
				} else if(tmp.search("_g_T") != -1){
				} else if(tmp.search("_g_P") != -1){
					$.fn.genActiveObject();
					$.fn.genContent("status", xml);
				} else if(tmp.search("_g_F") != -1){
					$("<div class=\"footer_div\"><span>Copyright c 2015.</span></div>").appendTo($(this));
				}
			}
		});
		$.fn.genTabMenu(xml);
	};

	$.fn.initialLive = function()
	{
		$.cookie('def_config', 'live', { expires: 365, path: '/' });
		$.cookie('def_rec', 'off', { expires:365, path:'/'});
		$.cookie('def_zoom', 'off', { expires:365, path:'/'});
		$.cookie('def_va', 'OFF', { expires:365, path:'/'});
		$.fn.ResetActiveStream("required");
		$.fn.DynamicAdjustDivSize("live", "show");
		if(ParamData.access_level == "user" || ParamData.access_level == "operator"){
			$("#Ilive").addClass("active").removeClass("inactive");
		} else {
			$("#Iconfig").addClass("inactive").removeClass("active");
			$("#Ilive").addClass("active").removeClass("inactive");
		}
		$("#Ilive_menu").show();
		if(!VA_Feature){
			$("#va_select").hide();
			$("#va_select_p").hide();	
		} else {
			$("#va_select").show();
			$("#va_select_p").show();
		}
		
		$("#Iconfig_menu").hide();
	};

	$.fn.initialConfig = function()
	{
		$.cookie('def_config', 'config', { expires: 365, path: '/' });
		if($.cookie("menu_active") == undefined)
			$("#Mmenu_encode").click();
		else
			$("#"+$.cookie("menu_active")+"").parent(".div_li").click();
		$("#Ilive_menu").hide();
		$("#Iconfig_menu").show();
		$("#va_select").hide();
		$("#va_select_p").hide();
		$("#Ilive").addClass("inactive").removeClass("active");
		$("#Iconfig").addClass("active").removeClass("inactive");
		$.fn.StopManualRecord();
	};

	$.fn.genLogo = function(pare_sty, href, name)
	{
		var $res;
		if(href != "null" && name == "null")
		{
			$res = $("<div id=\"logo_parent\" style=\""+pare_sty+"\">"+
						"<a href=\"#\" shape=\"\" style=\"vertical-align:middle;\">"+
							"<img id=\"logo_href\" style=\"vertical-align:middle;\" src=\""+herf+"\"></img>"+
						"</a>"+
					"</div>");
		}
		else if(href == "null" && name != "null")
		{
			$res = $("<div id=\"logo_parent\" style=\""+pare_sty+"\">"+
					  "<div style=\"vertical-align:middle\">"+
					 	"<div style=\"width:18%;height:22%;text-align:center;float:left;\">"+
					 		"<img src=\"/css/images/logo_messoa.png\">"+
					 	"</div>"+
					 	"<div style=\"width:20%;height:20%;font-size:26px;text-align:center;font-weight: bold;float:right\">"+
					  		"<span>Network Camera</span>"+
					  	"</div>"+
					  "</div>"+
					"</div>");
		}

		return $res;
	};

	$.fn.genAcctInfo = function(pare_sty)
	{
		var $res;
		var p_sty = pare_sty;
		if($.cookie('def_lang') == DFFINE_LANGUAGE_JAPANESE)
			p_sty = pare_sty.replace(/margin-left:30px/,"");

		$res = $("<div id=\"act_navigation\" style=\""+pare_sty+"\">"+
						"<div><span id=\"Ilogin_user\" class=\"active\"></span></div>"+
						"<div><p>|</p></div>"+
						"<div><span id=\"Ilogout\" class=\"inactive\"></span></div>"+
				"</div>");

		$("body").on("click", "#Ilogout", function(){
			$.fn._runRedirect();
		});

		return $res;
	};

	$.fn.genConfigure = function(pare_sty)
	{
		var $res;
		if(ParamData.access_level == "user")
			$res = $("<div id=\"conf_navigation\" style=\""+pare_sty+"\">"+
							"<div><span id=\"Ilive\" class=\"inactive\"></span></div>"+
							"<div><p>|</p></div>"+
							"<div><span id=\"Iconfig\" class=\"active\"></span></div>"+
							"<div><p>|</p></div>"+
							"<div><select id=\"lang_select\"></select></div>"+
					"</div>");
		else if(ParamData.access_level == "operator")
			$res = $("<div id=\"conf_navigation\" style=\""+pare_sty+"\">"+
							"<div><span id=\"Ilive\" class=\"inactive\"></span></div>"+
							"<div><p>|</p></div>"+
							"<div><span id=\"Iconfig\" class=\"active\"></span></div>"+
							"<div><p>|</p></div>"+
							"<div><select id=\"lang_select\"></select></div>"+
							"<div id=\"va_select_p\"><p>|</p></div>"+
							"<div><select id=\"va_select\"></select></div>"+
					"</div>");
		else
			$res = $("<div id=\"conf_navigation\" style=\""+pare_sty+"\">"+
							"<div><span id=\"Ilive\" class=\"active\"></span></div>"+
							"<div><p>|</p></div>"+
							"<div><span id=\"Iconfig\"></span></div>"+
							"<div><p>|</p></div>"+
							"<div><select id=\"lang_select\"></select></div>"+
							"<div id=\"va_select_p\"><p>|</p></div>"+
							"<div><select id=\"va_select\"></select></div>"+
					"</div>");
		
		$.fn.adjustAuthInfo($.cookie('def_lang'));

		return $res;
	};

	$.fn.genTabMenu = function(xml)
	{
		content_height = $("#_g_T").height();
		content_width = $("#_g_T").width();
		var object, object_div, sub_div, sub_ul, sub_li;
		var found = 0;
		var moveableContainer
		if($.cookie("tab_menu_active") == undefined)
			$.each(Menu_Array, function(n){
				object = $("<div ref_id=\"M"+Menu_Array[n][0]+"\" style=\"display:none;height:"+content_height+"px;border-right:solid 1px #bebebe;\">");
				sub_ul = $("<ul class=\"tabs\">");
				moveableContainer = $("<div class=\"moveableContainer\">");
				$.each(Menu_Array[n][1], function(m){
					query_data = "";
					for(var i = 1; i < Menu_Array[n][1][m].length; i++){
						query_data += Menu_Array[n][1][m][i]+";";
					}
					sub_li = $("<li><a href='#I"+Menu_Array[n][1][m][0]+"' id='M"+Menu_Array[n][1][m][0]+"' save='"+Menu_Array[n][1][m][1]+"' media_show='"+Menu_Array[n][1][m][2]+"'></a></li>");
					$(sub_li).appendTo($(moveableContainer));
				});
				$(moveableContainer).appendTo($(sub_ul));
				$(sub_ul).appendTo($(object));
				$.each(Menu_Array[n][1], function(m){
					if(Menu_Array[n][1][m][0] == "sub_encode")
					{
						$("<div id=\"I"+Menu_Array[n][1][m][0]+"\" conf=\""+Menu_Array[n][1][m][0]+"\" style=\"width:"+content_width+"px;height:"+Number(content_height-40)+"px;border-top:solid 1px #bebebe;\">"+
							""+$.fn.genFirstContent(Menu_Array[n][1][m][0], xml)+""+
							"</div>").appendTo($(object));
					}
					else
						$("<div id=\"I"+Menu_Array[n][1][m][0]+"\" conf=\""+Menu_Array[n][1][m][0]+"\" style=\"width:"+content_width+"px;height:"+Number(content_height-40)+"px;border-top:solid 1px #bebebe;\"></div>").appendTo($(object));
				});
				$(object).appendTo($("#_g_T"));
			});
		else
			$.each(Menu_Array, function(n){
				object = $("<div ref_id=\"M"+Menu_Array[n][0]+"\" style=\"display:none;height:"+content_height+"px;border-right:solid 1px #bebebe;\">");
				sub_ul = $("<ul class=\"tabs\">");
				moveableContainer = $("<div class=\"moveableContainer\">");
				$.each(Menu_Array[n][1], function(m){
					query_data = "";
					for(var i = 1; i < Menu_Array[n][1][m].length; i++){
						query_data += Menu_Array[n][1][m][i]+";";
					}
					sub_li = $("<li><a href='#I"+Menu_Array[n][1][m][0]+"' id='M"+Menu_Array[n][1][m][0]+"' save='"+Menu_Array[n][1][m][1]+"' media_show='"+Menu_Array[n][1][m][2]+"'></a></li>");
					$(sub_li).appendTo($(moveableContainer));
				});
				$(moveableContainer).appendTo($(sub_ul));
				$(sub_ul).appendTo($(object));
				$.each(Menu_Array[n][1], function(m){
					if($.cookie("tab_menu_active") == "M"+Menu_Array[n][1][m][0])
					{
						$("<div id=\"I"+Menu_Array[n][1][m][0]+"\" conf=\""+Menu_Array[n][1][m][0]+"\" style=\"width:"+content_width+"px;height:"+Number(content_height-40)+"px;border-top:solid 1px #bebebe;\">"+
							""+$.fn.genFirstContent(Menu_Array[n][1][m][0], xml)+""+
							"</div>").appendTo($(object));
					}
					else
						$("<div id=\"I"+Menu_Array[n][1][m][0]+"\" conf=\""+Menu_Array[n][1][m][0]+"\" style=\"width:"+content_width+"px;height:"+Number(content_height-40)+"px;border-top:solid 1px #bebebe;\"></div>").appendTo($(object));
				});
				$(object).appendTo($("#_g_T"));
			});
		$.fn.setTabMenuCtrl();
	};

	$.fn.ResetTabClassWid = function()
	{
		var tabClass = $("div[ref_id='"+$.cookie("menu_active")+"'] > ul.tabs");
		var _g_t_wid = $("#_g_T").width();
		$(tabClass).css("width", _g_t_wid+"px");
	};

	$.fn.genTabArrow = function()
	{
		var tag_obj = $("div[ref_id='"+$.cookie("menu_active")+"']");
		var tabClass = $("div[ref_id='"+$.cookie("menu_active")+"'] > ul.tabs");
		var _g_t_wid = $("#_g_T").width();
		$(tabClass).css("width", Number(_g_t_wid-40)+"px");
		if($("div[ref_id='"+$.cookie("menu_active")+"'] > div.arrowTab").attr("class") == undefined)
			$("<div class=\"arrowTab\">"+
				"<div class=\"arrow_left\"></div>"+
				"<div class=\"arrow_right\"></div>"+
			"</div>").appendTo($(tag_obj));

		$("body").on("mousedown", ".arrow_left", function(){
			var moveable = $("div[ref_id='"+$.cookie("menu_active")+"'] > ul > div.moveableContainer");
			var cal_wid = 0, parent_wid = $(moveable).parent().width(), offset_left = $(moveable).css("left").slice(0, $(moveable).css("left").length-2);
			$(moveable).children('li').each(function(){
				cal_wid = cal_wid + $(this).width();
			});
			if(Math.abs(offset_left) % 60 != 0)
				return false;
			if((Number(offset_left)+Number(cal_wid)) > Number(parent_wid))
				$(moveable).stop().animate({ left: (Number(offset_left)-Number(60))+'px' }, 'slow');
        });

        $("body").on("mousedown", ".arrow_right", function(){
            var moveable = $("div[ref_id='"+$.cookie("menu_active")+"'] > ul > div.moveableContainer");
			var cal_wid = 0, parent_wid = $(moveable).parent().width(), offset_left = $(moveable).css("left").slice(0, $(moveable).css("left").length-2);
			$(moveable).children('li').each(function(){
				cal_wid = cal_wid + $(this).width();
			});
			if(Math.abs(offset_left) % 60 != 0)
				return false;
			if(offset_left != 0)
				$(moveable).stop().animate({ left: (Number(offset_left)+Number(60))+'px' }, 'slow');
        });
	};

	$.fn.genSaveBuf = function(id)
	{
		if($("#Save_"+id).attr("class") == undefined){
			Record_save[save_num] = id;
			$("<div class=\"save_div\"><button type=\"button\" class=\"not_modify\" id=\"Save_"+id+"\"></button></div>").appendTo($("#"+id).children());
			try {
				$.fn.TransLang("Save_"+id, $.fn.GetLangStr(LT._Save), "s");
			}catch(e){

			}
			save_num++;
		}
	};

	$.fn.genSideMenu = function(pare_sty)
	{
		var $res
		, collect_object = ""
		;

		$.each(Menu_Array, function(n){
			collect_object += "<div class=\"div_li\"><span id=\"M"+Menu_Array[n][0]+"\"></span></div>";
		});

		$res = $("<div id=\"Isiderbar\" style=\""+pare_sty+"font-weight:bold;color:black;margin:20px 0px 0px 10px;\">"+
					"<div style=\"font-weight:bold;color:black;display:none;\" id=\"Ilive_menu\" conf=\"Ilive_menu\">"+
						"<div style=\"height:35px;\">"+
							"<div style=\"float:left;\"><div class=\"common_sprite common_sprite-setting\"></div></div>"+
							"<div style=\"float:left;margin:5px 0px 8px 5px;\"><span id=\"MliveSiderbar\"></span></div>"+
						"</div>"+
					"</div>"+
					"<div style=\"font-weight:bold;color:black;display:none;\" id=\"Iconfig_menu\">"+
						"<div style=\"height:35px;\">"+
							"<div style=\"float:left;\"><div class=\"common_sprite common_sprite-setting\"></div></div>"+
							"<div style=\"float:left;margin:5px 0px 8px 5px;\"><span id=\"Msiderbar\"></span></div>"+
						"</div>"+
						""+collect_object+""+
					"</div>"+
				"</div>");
		return $res;
	};

	$.fn.genLiveOptions = function()
	{
		// generate element
		var collect_object = "";
		for(var i = 1; i <= 3; i++){
			if(ParamData.access_level == "user")
				collect_object += "<div class=\"div_li\" id=\"Ilive_stream_ct_"+i+"\" style=\"cursor:text;\"><span name=\"Mlive_stream_"+i+"\" id=\"Ilive_stream"+i+"\"></span></div>";
			else
				collect_object += "<div class=\"div_li\" id=\"Ilive_stream_ct_"+i+"\"><span name=\"Mlive_stream_"+i+"\" id=\"Ilive_stream"+i+"\"></span></div>";
		}

		collect_object += 
		"<div id=\"Ilive_control\" style=\"border-bottom:solid 1px #b5bdc8;width:100%;\">"+
			"<div style=\"width:130px;margin:10px auto;\">"+
				"<table width=\"100%\">"+
					"<tbody>"+
						"<tr>"+
							"<td><div id=\"Isnapshot\" class=\"common_sprite common_sprite-snapshot_icon\" style=\"cursor:pointer;\"></div></td>"+
							"<td><div id=\"Ifullscreen\" class=\"common_sprite common_sprite-fullscreen_icon\" style=\"cursor:pointer;\"></div></td>"+
							"<td><div id=\"Imanual_record\" class=\"common_sprite common_sprite-rec_off\" style=\"cursor:pointer;\"></div></td>"+
							"<td></td>"+
						"</tr>"+
						"<tr>"+
							"<td><div id=\"Izoom\" class=\"common_sprite common_sprite-zoom_icon_off\" style=\"cursor:pointer;\"></div></td>"+
							"<td></td>"+
							"<td></td>"+
							"<td></td>"+
						"</tr>"+
					"</tbody>"+
				"</table>"+
			"</div>"+
		"</div>";

		// setting element to target
		$(collect_object).appendTo("#Ilive_menu");
		// add control function
		for(var i = 1; i <= 3; i++){
			$("body").on("click", "#Ilive_stream_ct_"+i, function(){
				if(ParamData.access_level == "user")
					return true;
				var id = $(this).attr("id")
				, _num = id.match(/\d\d/g) == null ? id.match(/\d/g) : id.match(/\d\d/g)
				;
				if($.cookie('def_rec') == "on")
					$("#Imanual_record").click();
				if($.cookie('def_zoom') == "on")
					$("#Izoom").click();
				if($.cookie('def_va') != "OFF")
					$("#va_select").click();
				$.cookie('def_stream', 'stream'+_num, { expires: 365, path: '/' });
				if(VA_Feature){
					if(_num != 1){
						$("#va_select").hide();
						$("#va_select_p").hide();
						$("#va_select > option[value=OFF]").prop("selected",true);
					} else {
						$("#va_select").show();
						$("#va_select_p").show();
					}
				}
				$.fn.ModifyVideoRatio();
				$.fn.PlayStream(_num, "required");
			});
		}

		$("body").on("click", "#Isnapshot", function(){
			if(ParamData.access_level == "user")
				return true;
			var ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0);
			try{
				ActivexPlayerObject.SaveSnapshot();
			}catch(e){
				console.log("[Exception]Snapshot error.");
			}	
		});

		$("body").on("click", "#Ifullscreen", function(){
			if(ParamData.access_level == "user")
				return true;
			var ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0);
			try{
				ActivexPlayerObject.SetFullScreen(1);
				$.cookie('def_fullscreen', 'on', { expires:365, path:'/'});
			}catch(e){
				console.log("[Exception]FullScreen error.");
			}	
		});

		$("body").on("click", "#Imanual_record", function(){
			if(ParamData.access_level == "user")
				return true;
			var ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0);
			try{
				if($.cookie('def_rec') == "on"){
					ActivexPlayerObject.StopRecord();
					$(this).removeClass("common_sprite-rec_on").addClass("common_sprite-rec_off");
					$.cookie('def_rec', 'off', { expires:365, path:'/'});
				} else if($.cookie('def_rec') == "off"){
					var fps = $.fn.GetRecordFPS();
					var flag = ActivexPlayerObject.StartRecord(fps);
					if(flag){
						$(this).removeClass("common_sprite-rec_off").addClass("common_sprite-rec_on");
						$.cookie('def_rec', 'on', { expires:365, path:'/'});
					}
				}
			}catch(e){
				console.log("[Exception]Manual recording error.");
			}
		});

		$("body").on("click", "#Izoom", function(){
			if(ParamData.access_level == "user")
				return true;
			var ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0);
			try{
				if($.cookie('def_zoom') == "on"){
					ActivexPlayerObject.Start_Ezoom(0);
					$(this).removeClass("common_sprite-zoom_icon_on").addClass("common_sprite-zoom_icon_off");
					$.cookie('def_zoom', 'off', { expires:365, path:'/'});
				} else if($.cookie('def_zoom') == "off"){
					ActivexPlayerObject.Start_Ezoom(1);
					$(this).removeClass("common_sprite-zoom_icon_off").addClass("common_sprite-zoom_icon_on");
					$.cookie('def_zoom', 'on', { expires:365, path:'/'});
				}
			}catch(e){
				console.log("[Exception]digital zoom error.");
			}
		});

		$(document).keydown(function(e){
			if(e.which==27){
				if($.cookie('def_fullscreen') == "on"){
					var ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0);
					ActivexPlayerObject.SetFullScreen(0);
					ActivexPlayerObject = null;
					$.cookie('def_fullscreen', 'off', { expires:365, path:'/'});
				}
			}
		});

		window.onbeforeunload=function(){
			$.fn.StopManualRecord();
		};

		if(ParamData.access_level == "user"){
			$("#Ilive_control").remove();
		} else {
			$.each(VA_Options, function(n){
				if(VA_Options[n] == $.cookie('def_va'))
					$("#va_select").append($("<option></option>").attr("value", VA_Options[n]).text(VA_Options[n]).attr("selected","true"));
				else
					$("#va_select").append($("<option></option>").attr("value", VA_Options[n]).text(VA_Options[n]));
			});

			$("#va_select").change(function(){
				var ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0);
				$.cookie('def_va', $(this).val(), { expires: 365, path: '/' });
				if($(this).val() == "OFF"){
					ActivexPlayerObject.Clear_Cropping();
					ActivexPlayerObject.Start_Cropping(0);
					ActivexPlayerObject.SetObjectDisplay(0);
					ActivexPlayerObject.ResetObjectCountingInfo();
					$.fn._runSetWithoutBlockUI("video.video_analysis.object_counting.reset=1");
				} else if($(this).val() == "Object Counting"){
					$.fn.DrawObjectCountingLine();
					ActivexPlayerObject.SetObjectDisplay(1);	
				} else if($(this).val() == "Loitering"){
					$.fn.DrawLoiteringLine();
					ActivexPlayerObject.SetObjectDisplay(1);	
				} else if($(this).val() == "Line Crossing"){
					$.fn.DrawLineCrossing();
					ActivexPlayerObject.SetObjectDisplay(1);	
				} else if($(this).val() == "Intrusion"){
					$.fn.DrawIntrusionLine();
					ActivexPlayerObject.SetObjectDisplay(1);	
				} else if($(this).val() == "Area Counting"){
					$.fn.DrawAreaCounting();
					ActivexPlayerObject.SetObjectDisplay(1);	
				} else if($(this).val() == "Departure"){
					$.fn.DrawDeparture();
					ActivexPlayerObject.SetObjectDisplay(1);	
				} else if($(this).val() == "Withdrawn"){
					$.fn.DrawWithDrawn();
					ActivexPlayerObject.SetObjectDisplay(1);	
				}
				ActivexPlayerObject = null;
			});
		}
	};

	$.fn.genContent = function(targetID, xml)
	{
		var x2s = function (xmlDom){
			return (typeof XMLSerializer!=="undefined") ? (new window.XMLSerializer()).serializeToString(xmlDom) : xmlDom.xml;
		};

		var element
		,layout_object = $(xml).find('nodes').find(targetID)[0]
		;
		if(layout_object != undefined){
			element = x2s(layout_object);
			if(targetID == "main"){
				$(element).appendTo("body");
			} else if(targetID == "ctrl_ptz"){
				element = x2s(layout_object.firstElementChild);
				$(element).appendTo($("#Isiderbar"));
				$("#Iptz").trigger("ctrl_ptz");
			} else if(targetID == "ctrl_r485"){
				element = x2s(layout_object.firstElementChild);
				$(element).appendTo($("#Ilive_menu"));
				if(ParamData.mechanismtype == 3 && ParamData.access_level != "user"){
					$("#Ictrl_r485").trigger("ctrl_r485");
				} else {
					$("#Irelay_time_control").parent().parent().parent().children("div:last-child").siblings("div").remove();
					$("#Irs485_ctrl_area").children("div").css("top", "0px");
				}
		        var sliderCtrl = $("#Srelay_time").slider({           
		            value: Math.floor($("#Irelay_time").val()),
		            min: Math.floor($("#Srelay_time").attr("_min")),
		            max: Math.floor($("#Srelay_time").attr("_max")),
		            step: Math.floor($("#Srelay_time").attr("_step")),         
		            slide: function(event, ui) {             
		                $("#Irelay_time").val(ui.value);
		                $("#Irelay_time").change();
		            },
		            change: function(event, ui){
		            }       
		        });
		        $("body").on("change", "#Irelay_time", function(){
		        	var ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0);
		            ActivexPlayerObject.SetBufferTime($(this).val());
		        });
			} else if(targetID == "status"){
				element = x2s(layout_object.firstElementChild);
				$(element).appendTo($("#Istatus_obj"));
			} else {
				$(element).appendTo("#I"+targetID);
				if($.fn.DetectBrowser() == "msie")
					$("#I"+targetID+" fieldset").css("margin", "10px auto 0px auto");
			}
		}
	};

	$.fn.genFirstContent = function(targetID, xml)
	{
		var x2s = function (xmlDom){
			return (typeof XMLSerializer!=="undefined") ? (new window.XMLSerializer()).serializeToString(xmlDom) : xmlDom.xml;
		};

		var element
		,layout_object = $(xml).find('nodes').find(targetID)[0]
		;
		if(layout_object != undefined){
			element = x2s(layout_object);
		}
		return element;
	};

	$.fn.initialModelProperty = function(where)
	{
		var Mediacmd = function(){
			if(where == "login"){
            	$.fn.initialLoginStyle();
            	$.fn._LoginGo();
            } else if(where == "index"){
				$.ajax({
		            beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
		            url:'/cgi-bin/get?',
		            dataType:'json',
		            type:'POST',
		            data:SysParam,
		            cache:false,
		            success:function(data){
		            	var n = 0
		            	, tmp = "{"
		            	;
		            	$.each(data, function(param, val){
		            		tmp += "\""+SysName[n]+"\""+":\""+val[1]+"\",";
		            		n++;
		            	});
		            	tmp = tmp.slice(0, tmp.length-1);
		            	tmp += "}";
		            	ParamData = $.parseJSON(tmp);
		            	if(ParamData.va_feature != "off")
							VA_Feature = true;
		            },
		            error:function(){
		            	console.log("initialModelProperty failed.");
		            },
		            complete:function(){
		                $.removeCookie('ipcamera', { path: '/' });
		                $.fn.initialFunParam();
                    	$.fn.initialIndexStyle();
                    	$("#main").show();
                    	$.fn.initialLensType();
                    	$.fn._IndexGo();
                    	$.fn.startLanguage(where);
		            }
		        });
			}
	    };

	    Mediacmd();
	};

	$.fn.initialLensType = function()
	{
		if($("#Ilens_type").attr("name") == undefined){
			setTimeout($.fn.initialLensType, 200);
		} else {
			if(ParamData.lenslist == "NULL" || ParamData.mechanismtype != 3){
				$("#Mlens_type").parent().remove();
			} else {
				var lens_options = ParamData.lenslist.split(',');
				$.each(lens_options, function(n){
	            	$("#Ilens_type").append($("<option></option>").attr("value", lens_options[n]).text(lens_options[n]));
	            });
			}
		}
	};

	$.fn.genActiveObject = function()
	{
		if($.fn.DetectBrowser() == "msie")
			$("<OBJECT "+
				"id='VideoPlugin' "+
				"name='VideoPlugin' "+
				"classid='clsid:"+CLSID+"' "+ 
				"scrolling='no' "+ 
				"scroll='no' "+ 
				"style='width:"+MediaPlayerWidth+"px;height:"+MediaPlayerHeight+"px;position:absolute;z-index:1001;display:none;'>"+
			"</OBJECT>").appendTo("#_g_P");
		else
			$("<OBJECT>"+
				"<embed TYPE=\"application/x-mpp-plugin\" name=\"VideoPlugin\" width=\""+MediaPlayerWidth+"px\" height=\""+MediaPlayerHeight+"px\" CLSID=\"{"+CLSID+"}\"></embed>"+
			"</OBJECT>").appendTo("#_g_P");

		setTimeout($.fn.QueryObject, 5);
	};

	$.fn.genMsiDownload = function()
	{
		$("#_g_P").children("OBJECT").hide();
		if($.cookie('def_config') == "live")
		{
			$("<div style=\"width:100%;height:"+MediaPlayerHeight+"px;margin:40px 0px 0px 0px;border-bottom:solid 1px #bebebe;\" conf=\"download_msg\">"+
				"<div style=\"width:"+Number(MediaPlayerWidth-20)+"px;margin:0px auto;\">"+
					"<div style=\"width:100%;text-align:center;color:red;\"><span id=\"Mmsi_warning\"></span></div>"+
					"<div style=\"width:100%;text-align:center;color:black;\"><span id=\"Mmsi_download\"></span></div>"+
				"</div>"+
			"</div>").appendTo("#_g_P");
		}
		else
		{
			if($("#"+$.cookie("tab_menu_active")).attr("media_show") == "disabled")
				$("<div style=\"width:"+MediaPlayerWidth+"px;height:"+MediaPlayerHeight+"px;margin:40px 0px 0px 0px;border-bottom:solid 1px #bebebe;display:none;\" conf=\"download_msg\">"+
					"<div style=\"width:"+Number(MediaPlayerWidth-20)+"px;margin:0px auto;\">"+
						"<div style=\"width:100%;text-align:center;color:red;\"><span id=\"Mmsi_warning\"></span></div>"+
						"<div style=\"width:100%;text-align:center;color:black;\"><span id=\"Mmsi_download\"></span></div>"+
					"</div>"+
				"</div>").appendTo("#_g_P");
			else
				$("<div style=\"width:"+MediaPlayerWidth+"px;height:"+MediaPlayerHeight+"px;margin:40px 0px 0px 0px;border-bottom:solid 1px #bebebe;\" conf=\"download_msg\">"+
					"<div style=\"width:"+Number(MediaPlayerWidth-20)+"px;margin:0px auto;\">"+
						"<div style=\"width:100%;text-align:center;color:red;\"><span id=\"Mmsi_warning\"></span></div>"+
						"<div style=\"width:100%;text-align:center;color:black;\"><span id=\"Mmsi_download\"></span></div>"+
					"</div>"+
				"</div>").appendTo("#_g_P");
		}

		try {
			$.fn.TransLang("Mmsi_warning", $.fn.GetLangStr(LT._MSI_dwonload_note), "s");
			$.fn.TransLang("Mmsi_download", $.fn.ParserDownloadMSI($.fn.GetLangStr(LT._Please_click_here), $.fn.GetLangStr(LT._Here)), "s");
		} catch(e){}
	};

	$.fn.setConfigCtrl = function()
	{
		$("body").on("click", "#Ilive", function(){
			if($(this).attr("class") == "active")
				return false;
			if(Modify)
	       		if(!confirm(""+$.fn.GetLangStr(LT._There_are_unsaved)+" \r\n "+$.fn.GetLangStr(LT._Are_you_sure_to_leave)+""))
					return true;
				else
				{
					var current_menu_id = "I"+$.cookie("tab_menu_active").slice(1, $.cookie("tab_menu_active").length);
					$("#"+current_menu_id+" .modify").each(function(){
						$(this).removeClass("modify");
					});

					$("#"+current_menu_id+" .invalid_modify").each(function(){
						$(this).removeClass("invalid_modify");
					});
					$("#Save_"+current_menu_id).removeClass("can_modify").addClass("not_modify");
					Modify = 0;
				}
			$.cookie('def_config', 'live', { expires: 365, path: '/' });
			$.cookie('def_rec', 'off', { expires:365, path:'/'});
			$.cookie('def_zoom', 'off', { expires:365, path:'/'});
			$.cookie('def_va', 'OFF', { expires:365, path:'/'});
			$.fn.DynamicAdjustDivSize("live", "show");
			$("#Ilive_menu").show();
			$.fn.ResetActiveStream("optional");
			$("#Iconfig_menu").hide();
			if(!VA_Feature){
				$("#va_select").hide();
				$("#va_select_p").hide();
			} else {
				$("#va_select").show();
				$("#va_select_p").show();
			}
			
			$("#Iconfig").addClass("inactive").removeClass("active");
			$(this).addClass("active").removeClass("inactive");
		});

		$("body").on("click", "#Iconfig", function(){
			if($(this).attr("class") == "active")
				return false;
			if(ParamData.access_level == "user" || ParamData.access_level == "operator")
				return false;
			if(Modify)
	       		if(!confirm(""+$.fn.GetLangStr(LT._There_are_unsaved)+" \r\n "+$.fn.GetLangStr(LT._Are_you_sure_to_leave)+""))
					return true;
				else
				{
					var current_menu_id = "I"+$.cookie("tab_menu_active").slice(1, $.cookie("tab_menu_active").length);
					$("#"+current_menu_id+" .modify").each(function(){
						$(this).removeClass("modify");
					});

					$("#"+current_menu_id+" .invalid_modify").each(function(){
						$(this).removeClass("invalid_modify");
					});
					$("#Save_"+current_menu_id).removeClass("can_modify").addClass("not_modify");
					Modify = 0;
				}
			$.cookie('def_config', 'config', { expires: 365, path: '/' });
			// if current stream is stream1 that need to skip of ended stream action.
			if($.cookie('def_stream') == 'stream1'){
				$.fn.ResetActiveStream("optional");
			} else if($.cookie('def_stream') == 'stream2' || $.cookie('def_stream') == 'stream3'){
				$.cookie('def_stream', 'stream1', { expires: 365, path: '/' });
				$.fn.ResetActiveStream("required");
			}
			$("#Ilive_menu").hide();
			$("#"+$.cookie("menu_active")+"").parent(".div_li").click();
			$("#Iconfig_menu").show();
			$("#va_select").hide();
			$("#va_select_p").hide();
			$("#Ilive").addClass("inactive").removeClass("active");
			$(this).addClass("active").removeClass("inactive");
			$.fn.StopManualRecord();
		});
	};

	$.fn.setSideMenuCtrl = function(active_color, border_color, hover_color)
	{
		$("div.div_li").hover(
            function(){
            	if(ParamData.access_level == "user")
       				return true;
            	if($(this).children("span").attr("id") != $.cookie("menu_active")){
            		if($(this).children("span").attr("id").search("Ilive") != -1){
            			if($(this).children("span").attr("id").search($.cookie("def_stream")) == -1)
            				$(this).css("background-color", hover_color);
            		}
            		else
            			$(this).css("background-color", hover_color);
            	}
            },
            function(){
            	if(ParamData.access_level == "user")
       				return true;
            	if($(this).children("span").attr("id") != $.cookie("menu_active")){
            		if($(this).children("span").attr("id").search("Ilive") != -1){
            			if($(this).children("span").attr("id").search($.cookie("def_stream")) == -1)
            				$(this).css("background-color", "");
            		}
            		else
            			$(this).css("background-color", "");
            	}	
        });
 
       	$("body").on("click", ".div_li", function(){
       		var id = $(this).children("span").attr("id")
       		, found = 0
       		, menu_name = ""
       		;
       		if(ParamData.access_level == "user")
       			return true;

       		if(Modify)
	       		if(!confirm(""+$.fn.GetLangStr(LT._There_are_unsaved)+" \r\n "+$.fn.GetLangStr(LT._Are_you_sure_to_leave)+""))
					return true;
				else
				{
					var current_menu_id = "I"+$.cookie("tab_menu_active").slice(1, $.cookie("tab_menu_active").length);
					$("#"+current_menu_id+" .modify").each(function(){
						$(this).removeClass("modify");
					});

					$("#"+current_menu_id+" .invalid_modify").each(function(){
						$(this).removeClass("invalid_modify");
					});
					$("#Save_"+current_menu_id).removeClass("can_modify").addClass("not_modify");
					Modify = 0;
				}
       		// restore active menu position.
       		if(id.search("Ilive") == -1)
				$.cookie("menu_active", id, { expires: 365, path: '/' });

			// clean other div_li active style.
			$(".div_li, .div_li span").css({ "background-color":"", "cursor": "pointer"}).siblings("div[tag='arrow']").remove();
			$("#_g_T > div").hide();
			$("div[ref_id='"+id+"']").show();
			$("div[ref_id='"+id+"'] ul li a").each(function(){
				if($.cookie("tab_menu_active") == $(this).attr("id")){
					menu_name = $(this).attr("id");
					found = 1;
					return true;
				}
			});

			if(found)
				$("a#"+menu_name).click();
			else
			{
				$("div[ref_id='"+id+"'] ul li:first-child a").click();
				var move_obj = $("div[ref_id='"+$.cookie("menu_active")+"'] > ul > div.moveableContainer");
				$(move_obj).stop().animate({ left:'0px' }, 'fast');
			}
			
			$(this).children("span").css({"cursor":"text"});
			$(this).css({"background-color":active_color, "cursor": "text"});
			$("<div class=\"common_sprite common_sprite-Preview_off\" style=\"float:right;margin:2px 0px 0px 0px;\" tag=\"arrow\"></div>").appendTo($(this));
		});

		// modify sidebar css
        $(".div_li").css("border-bottom-color", border_color);
	};

	$.fn.setModify = function(flag)
	{
		Modify = flag;
	};

	$.fn.setTabMenuCtrl = function()
	{
		$('ul.tabs').each(function(){
			// For each set of tabs, we want to keep track of
			// which tab is active and it's associated content
			var $active, $content, $links = $(this).find('a');
			var c_Id = "";
			// If the location.hash matches one of the links, use that as the active tab.
			// If no match is found, use the first link as the initial active tab.
			$active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
			$active.addClass('tab_active');
			$active.parent().css("background", "#1d67aa");
			$content = $($active[0].hash);

			// Hide the remaining content
			$links.not($active).each(function () {
				$(this.hash).hide();
			});
			// Bind the mouseover handler
			$(this).on('mouseover', 'a', function(){
				$(this).parent().css("background", "#1D67AA");
				$(this).css("background", "#1D67AA");
			});

			// Bind the mouseleave handler
			$(this).on('mouseleave', 'a', function(){
				if($(this).attr("id") != c_Id){
					$(this).parent().css("background", "#9FA0A0");
					$(this).css("background", "#9FA0A0");
				}
			});

			// Bind the click event handler
			$(this).on('click', 'a', function(e){
				c_Id = $(this).attr("id");
				if(Modify)
					if(!confirm(""+$.fn.GetLangStr(LT._There_are_unsaved)+" \r\n "+$.fn.GetLangStr(LT._Are_you_sure_to_leave)+""))
						return true;
					else
					{
						var current_menu_id = "I"+$.cookie("tab_menu_active").slice(1, $.cookie("tab_menu_active").length);
						$("#"+current_menu_id+" .modify").each(function(){
							$(this).removeClass("modify");
						});

						$("#"+current_menu_id+" .invalid_modify").each(function(){
							$(this).removeClass("invalid_modify");
						});
						$("#Save_"+current_menu_id).removeClass("can_modify").addClass("not_modify");
						Modify = 0;
					}
				// Make the old tab inactive.
				$active.removeClass('tab_active');
				$active.css("background", "#9FA0A0");
				$active.parent().css("background", "#9FA0A0");
				$content.hide();
				// Update the variables with the new link and content
				$active = $(this);
				$content = $(this.hash);
				$.fn._runModifyActivexStatus(false);
				// killall polling thread that will reduce unnecessary resource.
				$.fn.KillallPollingThread();
				// Make the tab active.
				$active.addClass('tab_active');
				$active.css("background", "#1D67AA");
				$active.parent().css("background", "#1D67AA");
				if($active.attr("id") == "Msub_encode")
					$.fn.UpdateContForEnode($active.attr("id"), $active.attr("save"));
				else if($active.attr("id") == "Msub_exposure")
					$.fn.UpdateContForExposure($active.attr("id"), $active.attr("save"));
				else if($active.attr("id") == "Msub_ssl")
					$.fn.UpdateContForSSL($active.attr("id"), $active.attr("save"));
				else
					$.fn.UpdateCont($active.attr("id"), $active.attr("save"));

				$.fn.DynamicControlMedia($active.attr("id"), $active.attr("media_show"));

				$.cookie("tab_menu_active", $active.attr("id"), { expires: 365, path: '/' });
				// Prevent the anchor's default click action
				e.preventDefault();
			});
		});
	};

	$.fn.setLiveSiderCtrl = function(num)
	{
		var cursor_style = ParamData.access_level == "user" ? "text":"pointer";
		for(var i = 0; i <= 2; i++){
			if(i > num)
				$("#Ilive_stream"+Number(i+1)).parent().hide();
			else
				$("#Ilive_stream"+Number(i+1)).parent().css("cursor", cursor_style).show();
		}
	};

	$.fn.ResetActiveStream = function(type)
	{
		var str_name = $.cookie("def_stream")
		, _num = 1
		;

		try 
		{
			$.fn.ModifyVideoRatio();
			if(str_name != undefined)
				_num = str_name.match(/\d\d/g) == null ? str_name.match(/\d/g) : str_name.match(/\d\d/g);
			$.fn.PlayStream(_num, type);

		} catch(e){
			console.log("[Exception]ResetActiveStream.");
		}
	};

	$.fn.UpdateCont = function(targetID, savebutton)
	{
		var tmp = "";
		var id = "I"+targetID.slice(1, targetID.length);
		var total = 0;
		var upcmd = function(db){
			$.ajax({
	            beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
	            url:'/cgi-bin/get?',
	            dataType:'json',
	            type:'POST',
		        data:db,
	            async: false,
	            cache: false,
	            success:function(data){
	            	$.fn.ImproveParserDate(id, data);
	            },
	            complete:function(){
	                $.removeCookie('ipcamera', { path: '/' });
	                if(savebutton != "disabled")
                		$.fn.genSaveBuf(id);
                	$("#"+id).trigger($("#"+id).attr("conf"));
                	$("#"+id).show();
	            }
	        });
	    };
	    $("#"+id+" select").each(function(){
	    	if($(this).attr("name") != undefined){
	    		tmp += "\""+$(this).attr("name")+"\":\"\",";
	    		data_type[total] = "select";
	    		total++;
	    	}
	    });

	    $("#"+id+" input[type='text']").each(function(){
	    	if($(this).attr("name") != undefined && $(this).attr("name") != "type"){
	    		tmp += "\""+$(this).attr("name")+"\":\"\",";
	    		data_type[total] = "text";
	    		total++;
	    	}
	    });

	    $("#"+id+" input[type='password']").each(function(){
	    	if($(this).attr("name") != undefined){
	    		tmp += "\""+$(this).attr("name")+"\":\"\",";
	    		data_type[total] = "password";
	    		total++;
	    	}
	    });

	    $("#"+id+" input[type='checkbox']").each(function(){
	    	if($(this).attr("name") != undefined){
	    		tmp += "\""+$(this).attr("name")+"\":\"\",";
	    		data_type[total] = "checkbox";
	    		total++;
	    	}
	    });

	    $("#"+id+" textarea").each(function(){
	    	if($(this).attr("name") != undefined){
	    		tmp += "\""+$(this).attr("name")+"\":\"\",";
	    		data_type[total] = "textarea";
	    		total++;
	    	}
	    });
	    tmp = "{"+tmp.slice(0, tmp.length-1)+"}";
		var db = $.parseJSON(tmp);
	    upcmd(db);
	};

	$.fn.UpdateContForEnode = function(targetID, savebutton)
	{
		var tmp = "{"
		, id = "I"+targetID.slice(1, targetID.length)
		, pid = ParamData.cur_id
		;

		var getProfile = function(){
			// replace parameter key word of %s to current profile.

			if($("#"+id+" select").attr("tmp_name") == undefined)
			{
	        	$("#"+id+" select").each(function(){
	        		if($(this).attr("name") != undefined){
	        			var tmp = $(this).attr("name").replace("%s", pid);
	        			$(this).attr("tmp_name", tmp);
	        		}
	        	});

	        	$("#"+id+" input[type='text']").each(function(){
	        		if($(this).attr("name") != undefined){
	        			var tmp = $(this).attr("name").replace("%s", pid);
	        			$(this).attr("tmp_name", tmp);
	        		}
	        	});
        	}

			// send the request to query current profile of paramter.
            $("#"+id+" select").each(function(){
		    	if($(this).attr("tmp_name") != undefined){
		    		tmp += "\""+$(this).attr("tmp_name")+"\":\"\",";
		    	}
		    });

		    $("#"+id+" input[type='text']").each(function(){
		    	if($(this).attr("tmp_name") != undefined)
		    		tmp += "\""+$(this).attr("tmp_name")+"\":\"\",";
		    });

		    tmp = tmp.slice(0, tmp.length-1)+"}";
		    var db = $.parseJSON(tmp);
		    upcmd(db);
		};

		var upcmd = function(db){
			$.ajax({
	            beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
	            url:'/cgi-bin/get?',
	            dataType:'json',
	            type:'POST',
		        data:db,
	            async: false,
	            cache: false,
	            success:function(data){
	            	$.fn.ParserDateForSpecial(id, data);
	            },
	            complete:function(){
	                $.removeCookie('ipcamera', { path: '/' });
	                $("#"+id).each(function(){
	                	$(this).trigger($(this).attr("conf"));
	                	$(this).show();
	                });
					$("#"+id+"").show();
					if(savebutton != "disabled")
                		$.fn.genSaveBuf(id);
	            }
	        });
	    };

	    getProfile();
	};

	$.fn.UpdateContForExposure = function(targetID, savebutton)
	{
		var tmp = "{"
		, id = "I"+targetID.slice(1, targetID.length)
		, wdr_db = $.fn.GetWDRType() == 1 ? $("#Iimage_d_wdr_exposure_mode") : $("#Iimage_t_wdr_exposure_mode")
		, pid = ""
		;
		var getWDRmode = function(db){
			$.ajax({
	            beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
	            url:'/cgi-bin/get?',
	            dataType:'json',
	            type:'POST',
		        data:db,
	            async: false,
	            cache: false,
	            success:function(data){
	            	$.each(data, function(param, val){
						$(wdr_db).attr("de_val", val[1]);
						$(wdr_db).children("option").each(function(){
							if($(this).val() == val[1])
								$(this).prop("selected",true);
						});
	            	});
	            },
	            complete:function(){
	                $.removeCookie('ipcamera', { path: '/' });
	                $("#"+id).each(function(){
	                	$(this).trigger($(this).attr("conf"));
	                	$(this).show();
	                });
					$("#"+id+"").show();
					if(savebutton != "disabled")
                		$.fn.genSaveBuf(id);
	            }
	        });
		};

		tmp += "\""+$(wdr_db).attr("name")+"\":\"\"}";
		var db = $.parseJSON(tmp);
	    getWDRmode(db);
	};

	$.fn.UpdateContForSSL = function(targetID, savebutton)
	{
		var tmp = "{"
		, id = "I"+targetID.slice(1, targetID.length)
		;

		var getSSL = function(){
			// send the request to query current profile of paramter.
            $("#"+id+" select").each(function(){
		    	if($(this).attr("name") != undefined && $(this).attr("name").search("%s") == -1){
		    		tmp += "\""+$(this).attr("name")+"\":\"\",";
		    	}
		    });

		    $("#"+id+" input[type='text']").each(function(){
		    	if($(this).attr("name") != undefined && $(this).attr("name").search("%s") == -1)
		    		tmp += "\""+$(this).attr("name")+"\":\"\",";
		    });

		    tmp = tmp.slice(0, tmp.length-1)+"}";
			var db = $.parseJSON(tmp);
		    upcmd(db);
		};

		var upcmd = function(db){
			$.ajax({
	            beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
	            url:'/cgi-bin/get?',
	            dataType:'json',
	            type:'POST',
		        data:db,
	            cache:false,
	            success:function(data){
	            	$.fn.ParserDate(id, data);
	            },
	            complete:function(){
	                $.removeCookie('ipcamera', { path: '/' });
	                $("#"+id).each(function(){
	                	$(this).trigger($(this).attr("conf"));
	                	$(this).show();
	                });
					$("#"+id+"").show();
					if(savebutton != "disabled")
                		$.fn.genSaveBuf(id);
	            }
	        });
	    };

	    getSSL();
	};

	$.fn.UpdateModelProperty = function()
	{
		$.ajax({
            beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
            url:'/cgi-bin/get?',
            dataType:'json',
            type:'POST',
		    data:SysParam,
            cache:false,
            success:function(data){
            	var n = 0
            	, tmp = "{"
            	;
            	$.each(data, function(param, val){
            		tmp += "\""+SysName[n]+"\""+":\""+val[1]+"\",";
            		n++;
            	});
            	tmp = tmp.slice(0, tmp.length-1);
            	tmp += "}";
            	ParamData = $.parseJSON(tmp);
            },
            error:function(){
            	console.log("UpdateModelProperty failed.");
            },
            complete:function(){
                $.removeCookie('ipcamera', { path: '/' });
            }
        });
	};

	$.fn.ParserDateForSpecial = function(targetID, data)
	{
		if(targetID == "Isub_encode")
		{
			$.each(data, function(param, val){
				var uapivalue = "";
				if (val[0].match("^ok") == "ok") {
					try {
						uapivalue = decodeURIComponent(val[1]);
					} catch(e) {
						uapivalue = val[1];
					}

					try {
						if(param == "encode.current_profile_id"){
							$("#"+targetID+" select[tmp_name='"+param+"'] > option[value='"+uapivalue+"']").prop("selected",true);
							$("#"+targetID+" select[tmp_name='"+param+"']").attr("de_val", uapivalue);
							$("#"+targetID+" select[name='"+param+"']").each(function(){
								$(this).trigger($(this).attr("name"));
							});
						} else {
							$("#"+targetID+" select[tmp_name='"+param+"'] > option[value='"+uapivalue+"']").prop("selected",true);
							$("#"+targetID+" select[tmp_name='"+param+"']").attr("de_val", uapivalue);
						}
					} catch(e) {
						// console.log("Exception error[select]:The param:%s not found", param);
					}

					try {
						$("#"+targetID+" input[tmp_name='"+param+"'][type=text]").val(uapivalue).attr("de_val", uapivalue);
					} catch(e) {
						// console.log("Exception error[input]:The param:%s not found", param);
					}
				}
			});
			$("#Iencode_profile_stream_1_compression > option[value='"+$("#Iencode_profile_stream_1_compression").attr("de_val")+"']").prop("selected",true);
			$("#Iencode_profile_stream_1_compression").change();
		}
		else
		{
			$.each(data, function(param, val){
				var uapivalue = "";
				if (val[0].match("^ok") == "ok") {
					// console.log("[%s: %s] %s", param, val[0], decodeURIComponent(val[1]));
					try {
						uapivalue = decodeURIComponent(val[1]);
					} catch(e) {
						uapivalue = val[1];
					}

					try {
						$("#"+targetID+" select[tmp_name='"+param+"'] > option[value='"+uapivalue+"']").prop("selected",true);
						$("#"+targetID+" select[tmp_name='"+param+"']").attr("de_val", uapivalue).change();
					} catch(e) {
						// console.log("Exception error[select]:The param:%s not found", param);
					}

					try {
						if($("#"+targetID+" input[tmp_name='"+param+"'][type=text]").attr("class") == "slider_input")
							$("#"+targetID+" input[tmp_name='"+param+"'][type=text]").val(uapivalue).attr("de_val", uapivalue).change();
						else
							$("#"+targetID+" input[tmp_name='"+param+"'][type=text]").val(uapivalue).attr("de_val", uapivalue);
					} catch(e) {
						// console.log("Exception error[input]:The param:%s not found", param);
					}
				}
			});
		}
	};

	$.fn.ParserDate = function(targetID, data)
	{
		$.each(data, function(param, val){
			var uapivalue = "";
			if (val[0].match("^ok") == "ok") {
				// console.log("[%s: %s] %s", param, val[0], decodeURIComponent(val[1]));
				try {
					uapivalue = decodeURIComponent(val[1]);
				} catch(e) {
					uapivalue = val[1];
				}

				try {
					$("#"+targetID+" select[name='"+param+"'] > option[value='"+uapivalue+"']").prop("selected",true);
					$("#"+targetID+" select[name='"+param+"']").attr("de_val", uapivalue).change();
				} catch(e) {
					// console.log("Exception error[select]:The param:%s not found", param);
				}

				try {
					if(uapivalue == "volatile_parameter")
						$("#"+targetID+" input[name='"+param+"'][type=text], #"+targetID+" input[name='"+param+"'][type=password]").val("").attr("de_val", uapivalue);
					else
						$("#"+targetID+" input[name='"+param+"'][type=text], #"+targetID+" input[name='"+param+"'][type=password]").val(uapivalue).attr("de_val", uapivalue);
				} catch(e) {
					// console.log("Exception error[input text, passwrod]:The param:%s not found", param);
				}

				try {
					$("#"+targetID+" input[name='"+param+"'][type=checkbox]").prop("checked", uapivalue == "on" ? true : false).attr("de_val", uapivalue).change();
				} catch(e) {
					// console.log("Exception error[input checkbox]:The param:%s not found", param);
				}

				try {
					$("#"+targetID+" textarea[name='"+param+"']").val(uapivalue).attr("de_val", uapivalue);
				} catch(e) {
					// console.log("Exception error[textarea]:The param:%s not found", param);
				}
			}
		});
	};

	$.fn.ImproveParserDate = function(targetID, data)
	{
		var i = 0;
		if(targetID == "Isub_recording")
			$.fn.InitialRecordingStream();
		$.each(data, function(param, val){
			var uapivalue = "";
			if (val[0].match("^ok") == "ok") {
				try {
					uapivalue = decodeURIComponent(val[1]);
				} catch(e) {
					uapivalue = val[1];
				}

				if(data_type[i] == "select"){
					$("#"+targetID+" select[name='"+param+"'] > option[value='"+uapivalue+"']").prop("selected",true);
					$("#"+targetID+" select[name='"+param+"']").attr("de_val", uapivalue).change();
				} else if(data_type[i] == "text"){
					if(uapivalue == "volatile_parameter")
						$("#"+targetID+" input[name='"+param+"'][type=text]").val("").attr("de_val", uapivalue);
					else
					{
						if($("#"+targetID+" input[name='"+param+"'][type=text]").attr("class") == "slider_input")
							$("#"+targetID+" input[name='"+param+"'][type=text]").val(uapivalue).attr("de_val", uapivalue).change();
						else
							$("#"+targetID+" input[name='"+param+"'][type=text]").val(uapivalue).attr("de_val", uapivalue);
					}
				} else if(data_type[i] == "password"){
					if(uapivalue == "volatile_parameter")
						$("#"+targetID+" input[name='"+param+"'][type=password]").val("").attr("de_val", uapivalue);
					else
						$("#"+targetID+" input[name='"+param+"'][type=password]").val(uapivalue).attr("de_val", uapivalue);
				} else if(data_type[i] == "checkbox"){
					if(targetID == "Isub_general" || targetID == "Isub_firewall" || targetID == "Isub_email" )
						$("#"+targetID+" input[name='"+param+"'][type=checkbox]").prop("checked", uapivalue == "on" ? true : false).attr("de_val", uapivalue).change();
					else
						$("#"+targetID+" input[name='"+param+"'][type=checkbox]").prop("checked", uapivalue == "on" ? true : false).attr("de_val", uapivalue);
				} else if(data_type[i] == "textarea"){
					$("#"+targetID+" textarea[name='"+param+"']").val(uapivalue).attr("de_val", uapivalue);
				}
			}
			i++;
		});
		data_type = [], i = null, data = null;
	};

	$.fn.ParserString = function(string, replace_word)
	{
		var ret = string.replace("%s",replace_word);
		return ret;
	};

	$.fn.ParserDownloadMSI = function(string, replace_word)
	{
		var ret = string.replace("%s","<a href=\""+download_msi+"\">"+replace_word+"</a>");
		return ret;
	};

	$.fn.ParserIPAddr = function()
	{
		var URL = new Array(), IP = new Array();
		var parser_ip = null, len = 0;
		URL = document.URL.split('//');
		IP = URL[1].split('/');
		
		//Judgment ip address is ipv4 or ipv6.
		len = IP[0].indexOf(']');
		if(len == -1) // IPv4
		{
			if((IP[0]).match(IP_regex)) // IPv4
			{
				len = IP[0].indexOf(':');
				if(len == -1)
					parser_ip = IP[0];
				else
					parser_ip = IP[0].slice(0,len);
			}
			else // Bonjour
			{
				len = ParamData.ipv4.indexOf('/');
				parser_ip = (ParamData.ipv4).toString().slice(0, len);
			}
		}
		else  // IPv6
		{
			parser_ip = IP[0].slice(0,len+1);
		}

		URL = null, IP = null;
		return parser_ip;
	};

	$.fn.GetLangStr = function(str)
	{
		if(typeof(str) == "undefined")	return "XXXXX";
		return str;
	};

	$.fn.GetCameraType = function()
	{
		return ParamData.camera_type;
	};

	$.fn.GetWDRType = function()
	{
		return ParamData.wdr_type;
	};

	$.fn.GetIrisType = function()
	{
		return ParamData.iris_type
	};

	$.fn.GetLoginUser = function()
	{
		return ParamData.login_user;
	};

	$.fn.GetPlatForm = function()
	{
		return ParamData.platform;
	};

	$.fn.GetOrientation = function()
	{
		return ParamData.orientation;
	};

	$.fn.GetOrientationIndex = function()
	{
		var ret = 0;
		if(ParamData.orientation == "flip")
			ret = 1;
		else if(ParamData.orientation == "mirror")
			ret = 2;
		else if(ParamData.orientation == "both")
			ret = 3;

		return ret;
	};

	$.fn.GetCorridor = function()
	{
		if(ParamData.cur_id == "1")
			return ParamData.corridor_1;
		else if(ParamData.cur_id == "2")
			return ParamData.corridor_2;
		else if(ParamData.cur_id == "3")
			return ParamData.corridor_3;
	};

	$.fn.GetMediaType = function()
	{
		return MediaType;
	};
	
	$.fn.GetMediaRatio = function()
	{
		return MediaRatio;
	};

	$.fn.GetMediaWidth = function()
	{
		return MediaPlayerWidth;
	};

	$.fn.GetMediaHieght = function()
	{
		return MediaPlayerHeight;
	};

	$.fn.GetStreamWidth = function()
	{
		return ParamData.xe_vin_w;
	};

	$.fn.GetRealHeight = function()
	{
		return MediaStrHeight;
	};

	$.fn.GetRealWidth = function()
	{
		return MediaStrWidth;
	};

	$.fn.GetStreamHeight = function()
	{
		return ParamData.xe_vin_h;
	};

	$.fn.GetKeepAliveTime = function()
	{
		return ParamData.keep_alive_time;
	};

	$.fn.GetRecord_save = function()
	{
		return Record_save;
	};

	$.fn.GetABF = function()
	{
		return ParamData.abf_type;
	};

	$.fn.GetPirisLevel = function()
	{
		return ParamData.p_iris_level;
	};

	$.fn.GetSensor = function()
	{
		return ParamData.sensor;
	};

	$.fn.GetLensTypeList = function()
	{
		return ParamData.lenslist;
	};

	$.fn.GetMechanism = function()
	{
		return ParamData.mechanismtype;
	};

	$.fn.SetIrisType = function(type)
	{
		ParamData.iris_type = type;
	};

	$.fn.SetP_Iris_Level = function(type)
	{
		ParamData.p_iris_level = type;
	};

	$.fn.SetOrientation = function(type)
	{
		ParamData.orientation = type;
	};

	$.fn.GetRecordFPS = function()
	{
		var ret = "30";
		if(ParamData.cur_id == "1")
		{
			if(ParamData.camera_type == "ntsc"){
				if($.cookie('def_stream') == undefined || $.cookie('def_stream') == "stream1")
					ret = (ParamData.p_1_s_1_n).toString();
				else if($.cookie('def_stream') == "stream2")
					ret = (ParamData.p_1_s_2_n).toString();
				else if($.cookie('def_stream') == "stream3")
					ret = (ParamData.p_1_s_3_n).toString();
			} else if(ParamData.camera_type == "pal"){
				if($.cookie('def_stream') == undefined || $.cookie('def_stream') == "stream1")
					ret = (ParamData.p_1_s_1_p).toString();
				else if($.cookie('def_stream') == "stream2")
					ret = (ParamData.p_1_s_2_p).toString();
				else if($.cookie('def_stream') == "stream3")
					ret = (ParamData.p_1_s_3_p).toString();
			}
		}
		else if(ParamData.cur_id == "2")
		{
			if(ParamData.camera_type == "ntsc"){
				if($.cookie('def_stream') == undefined || $.cookie('def_stream') == "stream1")
					ret = (ParamData.p_2_s_1_n).toString();
				else if($.cookie('def_stream') == "stream2")
					ret = (ParamData.p_2_s_2_n).toString();
				else if($.cookie('def_stream') == "stream3")
					ret = (ParamData.p_2_s_3_n).toString();
			} else if(ParamData.camera_type == "pal"){
				if($.cookie('def_stream') == undefined || $.cookie('def_stream') == "stream1")
					ret = (ParamData.p_2_s_1_p).toString();
				else if($.cookie('def_stream') == "stream2")
					ret = (ParamData.p_2_s_2_p).toString();
				else if($.cookie('def_stream') == "stream3")
					ret = (ParamData.p_2_s_3_p).toString();
			}
		}
		else if(ParamData.cur_id == "3")
		{
			if(ParamData.camera_type == "ntsc"){
				if($.cookie('def_stream') == undefined || $.cookie('def_stream') == "stream1")
					ret = (ParamData.p_3_s_1_n).toString();
				else if($.cookie('def_stream') == "stream2")
					ret = (ParamData.p_3_s_2_n).toString();
				else if($.cookie('def_stream') == "stream3")
					ret = (ParamData.p_3_s_3_n).toString();
			} else if(ParamData.camera_type == "pal"){
				if($.cookie('def_stream') == undefined || $.cookie('def_stream') == "stream1")
					ret = (ParamData.p_3_s_1_p).toString();
				else if($.cookie('def_stream') == "stream2")
					ret = (ParamData.p_3_s_2_p).toString();
				else if($.cookie('def_stream') == "stream3")
					ret = (ParamData.p_3_s_3_p).toString();
			}
		}

		return ret;
	};

	$.fn.DetectBrowser = function()
	{
		var sBrowser, sUsrAg = navigator.userAgent;
        if(sUsrAg.indexOf("Chrome") > -1) {
            return "chrome";
        } else if (sUsrAg.indexOf("Safari") > -1) {
            return "safari";
        } else if (sUsrAg.indexOf("Opera") > -1) {
            return "opera";
        } else if (sUsrAg.indexOf("Firefox") > -1) {
            return "firefox";
        } else if (sUsrAg.indexOf("MSIE") > -1) {
            return "msie";
        } else
        	return "msie";
	};

	$.fn.DetectOS = function()
	{
		var OSName="Unknown OS";
		if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
		else if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
		else if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
		else if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";

		return OSName;
	};

	$.fn.ModifyVideoRatio = function()
	{
		var _ratio, _t, _res, _num, _final, _total, cur_corridor, tmp_corridor, str_1_res;
		var ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin") : $("embed[name=VideoPlugin]");
		if(ParamData.cur_id == "1"){
			_res = ParamData.str_1_config;
			cur_corridor = ParamData.corridor_1;
		} else if(ParamData.cur_id == "2"){
			_res = ParamData.str_2_config;
			cur_corridor = ParamData.corridor_2;
		} else if(ParamData.cur_id == "3"){
			_res = ParamData.str_3_config;
			cur_corridor = ParamData.corridor_3;
		}

		_num = _res.split(",");
		$.each(_num, function(n){
			if(n == 0){
				_final = _num[0].split("/");
				_t = _final[0].split("x");
				str_1_res = _t[0] * _t[1];
			}
			_total = n;
		});

		if($.cookie('def_stream') == undefined || $.cookie('def_stream') == "stream1")
		{
			_final = _num[0].split("/");
			Picture_type = _final[1];
		}
		else if($.cookie('def_stream') == "stream2")
		{
			if(_num[1] == undefined)
			{
				_final = _num[0].split("/");
				Picture_type = _final[1];
			}
			else
			{
				_final = _num[1].split("/");
				Picture_type = _final[1];
			}
		}
		else if($.cookie('def_stream') == "stream3")
		{
			if(_num[2] == undefined)
			{
				_final = _num[0].split("/");
				Picture_type = _final[1];
			}
			else
			{
				_final = _num[2].split("/");
				Picture_type = _final[1];
			};
		}
		MediaType = Picture_type;
		_t = _final[0].split("x");
		if(ParamData.platform == "xarina_entry")
		{
			if(cur_corridor == "on"){
				// XE platform cannot implement corridor at codec of mjpeg.
				// that's the system limitation.
				if(Picture_type == "mjpeg"){
					// dynamic adjust media width.
					if($.cookie('def_config') == "live")
						MediaPlayerWidth = 800;
					else if($.cookie('def_config') == "config")
						MediaPlayerWidth = 400;
					MediaStrWidth = _t[0], MediaStrHeight = _t[1], tmp_corridor = "off";
				} else if(Picture_type == "h264"){
					// dynamic adjust media width.
					// because some of corridor height will overflow content height.
					if($.cookie('def_config') == "live")
					{
						if(Math.floor(_t[1]*100/_t[0]) >=55 && Math.floor(_t[1]*100/_t[0]) <= 58)
							MediaPlayerWidth = 400;
						else
							MediaPlayerWidth = 500;
					}
					else if($.cookie('def_config') == "config")
						MediaPlayerWidth = 400;
					MediaStrWidth = _t[1], MediaStrHeight = _t[0], tmp_corridor = "on";
				}
			} else if(cur_corridor == "off"){
				// dynamic adjust media width.
				if($.cookie('def_config') == "live")
					MediaPlayerWidth = 800;
				else if($.cookie('def_config') == "config")
					MediaPlayerWidth = 400;
				MediaStrWidth = _t[0], MediaStrHeight = _t[1], tmp_corridor = "off";
			}
		}
		else if(ParamData.platform == "s2" || ParamData.platform == "s2l")
		{
			if(cur_corridor == "on"){
				// S2 platform cannot implement corridor when stream1 resolution over the 5M.
				// that's the system limitation.
				if(str_1_res > 5038848 && ParamData.platform == "s2")
				{
					if($.cookie('def_config') == "live")
						MediaPlayerWidth = 800;
					else if($.cookie('def_config') == "config")
						MediaPlayerWidth = 400;
					MediaStrWidth = _t[0], MediaStrHeight = _t[1], tmp_corridor = "off";
				}
				else
				{
					if($.cookie('def_config') == "live")
					{
						if(Math.floor(_t[1]*100/_t[0]) >=55 && Math.floor(_t[1]*100/_t[0]) <= 58)
							MediaPlayerWidth = 400;
						else
							MediaPlayerWidth = 500;
					}
					else if($.cookie('def_config') == "config")
						MediaPlayerWidth = 400;
					MediaStrWidth = _t[1], MediaStrHeight = _t[0], tmp_corridor = "on";
				}	
			} else if(cur_corridor == "off"){
				// dynamic adjust media width.
				if($.cookie('def_config') == "live")
					MediaPlayerWidth = 800;
				else if($.cookie('def_config') == "config")
					MediaPlayerWidth = 400;
				MediaStrWidth = _t[0], MediaStrHeight = _t[1], tmp_corridor = "off";
			}
		}
		MediaPlayerHeight = $.fn.CalculateHeight(tmp_corridor, MediaStrWidth, MediaStrHeight, MediaPlayerWidth);
		MediaPlayerHeight = Math.floor(MediaPlayerHeight);
		ActivexPlayerObject.css("width", MediaPlayerWidth+"px").css("height", MediaPlayerHeight+"px");
		MediaRatio = _ratio;
		$.fn.setLiveSiderCtrl(_total);
	};

	$.fn.CalculateHeight = function(type, src_width, src_height, media_width)
	{
		var hei = 0
		, ratio = 0
		;
		if(ParamData.platform == "xarina_entry"){
			ratio = src_width/src_height
			hei = Math.floor(media_width / ratio);
		} else {
			ratio = Math.floor(src_width*100/src_height)
			if(type == "on")
			{
				if(ratio >= 56 && ratio <= 58)
					hei = (media_width * 16) / 9;
				else if(ratio >= 74 && ratio <= 76)
					hei = (media_width * 4) / 3;
			}
			else if(type == "off")
			{
				if(ratio >= 170 && ratio <= 181)
					hei = (media_width * 9) / 16;
				else if(ratio >= 130 && ratio <= 134)
					hei = (media_width * 3) / 4;
			}
		}
		return hei;
	};

	$.fn.QueryObject = function()
	{
		var curVersion = ""
		, apiVesion = ""
		;

		var ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0);
		try
		{
			var tmp = OCX_VER.split(",")
			, api_tmp
			;

			$.each(tmp, function(n){
				curVersion += tmp[n];
			});

			api_tmp = ActivexPlayerObject.GetVersion();
			tmp = api_tmp.split(".");
			$.each(tmp, function(n){
				apiVesion += tmp[n];
			});
			console.log("apiVesion:"+apiVesion+" curVersion:"+curVersion);
			if(Number(apiVesion) < Number(curVersion)){
				$.fn.genMsiDownload();
			}
		} catch(e){
			console.log("QueryPlugin:Exception error.");
		}
	};

	$.fn.PlayStream = function(index, check_type)
	{
		var picFor = Picture_type == "mjpeg" ? 1 : 3;
		var playStreamURL = index == 1 ? ParamData.str_1_url : (index == 2 ? ParamData.str_2_url : ParamData.str_3_url);
		var current_ip = $.fn.ParserIPAddr();
		var rtspURL = "rtsp://"+current_ip+":"+ParamData.rtsp_port+"/"+playStreamURL;
		var ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0);
		var status = false;
		var fps = $.fn.GetRecordFPS();
		try{
			var playStatus = ActivexPlayerObject.GetStreamStatus();
		} catch(e){
			console.log("time out:"+Excep_num);
			if(Excep_num >= 10)
			{
				if(Excep_num == 10){
					$.fn.genMsiDownload();
					status = true;
				}
				Excep_num = Excep_num + 1;
			}
			else
			{
				Excep_num = Excep_num + 1;
				status = true;
				setTimeout(function(){
					$.fn.PlayStream(index, check_type);
				}, 1000);	
			}
		}

		if(status)
			return true;
		ActivexPlayerObject.Clear_Cropping();
		ActivexPlayerObject.Start_Cropping(0);
		$.fn.CallStream(index);
		if(check_type == "optional"){
			console.log("playStatus:"+(playStatus == 1 ? "continues" : "pause"));
			if(playStatus == 1){
				$.fn._runModifyActivexStatus(true);
				return true;
			}
		}
		console.log("%s, %s, picFor:%s, %s, %s, %s", ParamData.rtsp_user_name, ParamData.rtsp_passwd, picFor, playStreamURL, rtspURL, ParamData.audio_out);
		ActivexPlayerObject.EndStreamStatic(current_ip);		
		ActivexPlayerObject.SetPictureFormat(picFor);
		ActivexPlayerObject.SetStreamType(ParamData.cur_id); // current profile
		ActivexPlayerObject.Set_Platform(ParamData.platform);
		ActivexPlayerObject.SetVinResolution(ParamData.xe_vin_w, ParamData.xe_vin_h); // vin resoultion width and height.
		
		// Param1: 0/STREM_FROM_HTTP , 1/STREM_FROM_RTSP
		// Param2: 0/rtsp over udp , 1/rtsp over tcp
		ActivexPlayerObject.SetStreamFromType(1,1);
		if(ParamData.rtsp_auth == "on")
			ActivexPlayerObject.SetRtspUserPasswd(ParamData.rtsp_user_name, ParamData.rtsp_passwd); // user, password
		if(ParamData.audio_out == "on")
			ActivexPlayerObject.StartSoundRecord(location.hostname, 59191);
		
		ActivexPlayerObject.SetRtspPortno(ParamData.rtsp_port);
		ActivexPlayerObject.SetRtspURL(playStreamURL);
		ActivexPlayerObject.SetFrameRate(fps);
		ActivexPlayerObject.CreateStream(location.hostname);
		$.fn._runModifyActivexStatus(true);
	};

	$.fn.CallStream = function(index)
	{
		$("#Ilive_stream"+index).siblings("div[tag='arrow']").remove();
		$("<div class=\"common_sprite common_sprite-Preview_off\" style=\"float:right;margin:2px 0px 0px 0px;\" tag=\"arrow\"></div>").appendTo($("#Ilive_stream"+index).parent());
		$("#Ilive_stream"+index).parent().css({"background-color":SiderData[0], "cursor": "text"});
	};

	$.fn.StopStream = function(id, type) // type is: media_display, media_feature_control 
	{
		var ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0);
		if(ActivexPlayerObject != undefined)
		{
			try{
				$("#"+id).queue("stop_stream_process", function(){
					ActivexPlayerObject.EndStreamStatic(location.hostname);
					if(ParamData.audio_out == "on")
						ActivexPlayerObject.EndSoundRecord();
				});

				$("#"+id).queue("hide_process", function(){
					$("#"+id).dequeue("stop_stream_process");
				});

				$("#"+id).dequeue("hide_process");
			} catch(e) {
				console.log("[Exception]StopStream.");
		  	}
	  	}
	};

	$.fn.StopManualRecord = function()
	{
		var ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0);
		if(ActivexPlayerObject != undefined)
		{
			try {
				if($.cookie('def_rec') == "on"){
					ActivexPlayerObject.StopRecord();
					$("#Imanual_record").removeClass("common_sprite-rec_on").addClass("common_sprite-rec_off");
					$.cookie('def_rec', 'off', { expires:365, path:'/'});
				}

				if($.cookie('def_zoom') == "on"){
					ActivexPlayerObject.Start_Ezoom(0);
					$("#Izoom").removeClass("common_sprite-zoom_icon_on").addClass("common_sprite-zoom_icon_off");
					$.cookie('def_zoom', 'off', { expires:365, path:'/'});
				}

				if($.cookie('def_va') != "OFF"){
					ActivexPlayerObject.Clear_Cropping();
					ActivexPlayerObject.Start_Cropping(0);
					ActivexPlayerObject.SetObjectDisplay(0);
					$("#va_select > option[value=OFF]").prop("selected",true);
					$.cookie('def_va', 'OFF', { expires:365, path:'/'});
				}
			} catch(e){
				console.log("[Exception]StopManualRecord.");
			}
		}
	};

	$.fn.RemoveModelAttribute = function()
	{
		if(RemoveAttri)
			return true;
		var tmp = []
		, remove_type = $.fn.GetCameraType() == "ntsc" ? "pal" : "ntsc"
		, remove_wdr = $.fn.GetWDRType() == 1 ? "t_wdr" : "d_wdr"
		, remove_iris = ParamData.iris_type == "fixed" ? "p_iris,dc_iris" : (ParamData.iris_type == "p" ?  "fixed,dc_iris" : "fixed,p_iris")
		, remove_network_auido = ( ParamData.audio_type == 0 || ParamData.audio_type == 2 ) ? "audio" : ""
		, remove_system_auido = ParamData.audio_type == 0 ? function(){ 
			$("#Msub_audio").parent().remove();$("#Isub_audio").remove(); } : (ParamData.audio_type == 1 ? "audio_out": "audio_in")
		, ind = -1
		;

		ind = remove_iris.indexOf(",");
		tmp[0] = remove_iris.slice(0, ind);
		tmp[1] = remove_iris.slice(ind+1, ind.length);
		// remove camera type.
		$("div[conf]").each(function(){
			var id = $(this).attr("id")
			;
			if($(this).attr("id") == "Isub_encode"){
				$("#"+id+" select").each(function(){
					if($(this).attr("name") != undefined && $(this).attr("name").search(remove_type) != -1)
						$(this).remove();
				});
			}
			else if($(this).attr("id") == "Isub_exposure"){
				$("#"+id+" select").each(function(){
					if(ParamData.platform == "xarina_entry"){
						if($(this).attr("name") != undefined && $(this).attr("name").search(remove_type) != -1 ||
							$(this).attr("name") != undefined && $(this).attr("name").search(remove_wdr) != -1)
							$(this).remove();
						else if(
								$(this).attr("name") != undefined && $(this).attr("name").search("icr_mode") != -1 ||
								$(this).attr("name") != undefined && $(this).attr("name").search("gain") != -1
							)
							$(this).parent().parent().remove();
						else if(
								$(this).attr("name") != undefined && $(this).attr("name").search(tmp[0]) != -1 ||
								$(this).attr("name") != undefined && $(this).attr("name").search(tmp[1]) != -1
							)
							$(this).parent().parent().remove();
						else if($(this).attr("name") != undefined && $(this).attr("name").search("ir_level.mode")!= -1)
						{							
							if(ParamData.ir_type == 0){
								$("#Mimage_ir_ctrl").parent().remove();
								$("#Mimage_exposure_ir_mode").parent().parent().remove();
								$("#Mimage_exposure_ir_optimizer").parent().parent().remove();
								$("#MIimage_exposure_ir_level_mode").parent().parent().remove();
								$("#Mimage_exposure_adjustable").parent().parent().remove();
							} else {
								if(ParamData.ir_type != 1)
									$("#Mimage_exposure_ir_level_adjustable").parent().parent().remove();
								if(ParamData.ir_type == 2){
									$("#Mimage_exposure_adjustable").parent().parent().remove();
									$("#MIimage_exposure_ir_level_mode").parent().parent().remove();
								}
								if(ParamData.ir_type != 3){
									$("#Mimage_exposure_ir_level_adaptive_broad").parent().parent().remove();
									$("#Mimage_exposure_ir_level_adaptive_narrow").parent().parent().remove();
								}
							}
						}
					} else if(ParamData.platform == "s2" || ParamData.platform == "s2l"){
						if($(this).attr("name") != undefined && $(this).attr("name").search(remove_type) != -1 ||
							$(this).attr("name") != undefined && $(this).attr("name").search(remove_wdr) != -1)
							$(this).remove();
						else if(
								$(this).attr("name") != undefined && $(this).attr("name").search("hlc") != -1 ||
								$(this).attr("name") != undefined && $(this).attr("name").search("icr_mode") != -1 ||
								$(this).attr("name") != undefined && $(this).attr("name").search("gain") != -1
							)
							$(this).parent().parent().remove();
						else if(
								$(this).attr("name") != undefined && $(this).attr("name").search(tmp[0]) != -1 ||
								$(this).attr("name") != undefined && $(this).attr("name").search(tmp[1]) != -1
							)
							$(this).parent().parent().hide();
						else if($(this).attr("name") != undefined && $(this).attr("name").search("ir_level.mode")!= -1)
						{
							if(ParamData.ir_type == 0){
								$("#Mimage_ir_ctrl").parent().remove();
								$("#Mimage_exposure_ir_mode").parent().parent().remove();
								$("#Mimage_exposure_ir_optimizer").parent().parent().remove();
								$("#MIimage_exposure_ir_level_mode").parent().parent().remove();
								$("#Mimage_exposure_adjustable").parent().parent().remove();
							} else {
								if(ParamData.ir_type != 1)
									$("#Mimage_exposure_ir_level_adjustable").parent().parent().remove();
								if(ParamData.ir_type == 2){
									$("#Mimage_exposure_adjustable").parent().parent().remove();
									$("#MIimage_exposure_ir_level_mode").parent().parent().remove();
								}
								if(ParamData.ir_type != 3){
									$("#Mimage_exposure_ir_level_adaptive_broad").parent().parent().remove();
									$("#Mimage_exposure_ir_level_adaptive_narrow").parent().parent().remove();
								}
							}
						}
					}
				});

				$("#"+id+" input").each(function(){
					if(ParamData.platform == "xarina_entry"){
						 if($(this).attr("name") != undefined && $(this).attr("name").search(tmp[0]) != -1 ||
							$(this).attr("name") != undefined && $(this).attr("name").search(tmp[1]) != -1)
								$(this).parent().parent().parent().parent().remove();
					} else if(ParamData.platform == "s2" || ParamData.platform == "s2l"){
						if($(this).attr("name") != undefined && $(this).attr("name").search(tmp[0]) != -1 ||
							$(this).attr("name") != undefined && $(this).attr("name").search(tmp[1]) != -1)
								$(this).parent().parent().parent().parent().hide();
					}
				});
			}
			else if($(this).attr("id") == "Isub_img_basic"){
				if(ParamData.platform == "s2"){
					$("#Iimage_orientation").children("option").each(function(){
						if($(this).attr("value") == "mirror" || $(this).attr("value") == "both")
							$(this).remove();
					});

					$("#"+id+" select, #"+id+" input").each(function(){
						if($(this).attr("name") != undefined && $(this).attr("name").search("defog") != -1)
						$(this).parent().parent().remove();
					});
				}
			}
			else if($(this).attr("id") == "Isub_rtsp"){
				$("#"+id+" input").each(function(){
					if($(this).attr("name") != undefined && $(this).attr("name").search("audio_") != -1){
						if(ParamData.audio_type == 0 || ParamData.audio_type == 1)
							$(this).parent().parent().remove();
					}
				});
			}
			else if($(this).attr("id") == "Isub_audio"){
				if($.isFunction(remove_system_auido))
					remove_system_auido();
				else
					$("#"+id).children().children().each(function(){
						if($(this).attr("group") != undefined && $(this).attr("group").search(remove_system_auido) != -1)
							$(this).remove();
					});
			}
			else if($(this).attr("id") == "Isub_account"){
				if(ParamData.enable_ldap == "on"){
					$(this).remove();
					$("#Mmenu_account").parent().remove();
					$("div[ref_id=Mmenu_account]").remove();
				}
			}
			else if($(this).attr("id") == "Isub_lens"){
				if(ParamData.abf_type == 3){
					$("#"+id+" input[type='text'], #"+id+" input[type='button'], #"+id+" select").each(function(){
						if(
							$(this).attr("name") != undefined && $(this).attr("name").search("relative") != -1 ||
							$(this).attr("name") != undefined && $(this).attr("name").search("continuous") != -1 ||
							$(this).attr("name") != undefined && $(this).attr("name").search("d_zoom") != -1
						)
							$(this).parent().parent().remove();
					});
					$("#Mlens_zoom").parent().remove();
					$("#Mlens_focus_continuous").parent().remove();
					$("#Mlens_day_night_refocus").parent().remove();
				} else {
					if(ParamData.abf_type == 1 || ParamData.abf_type == 2){
						$("#"+id+" input[type='text'], #"+id+" input[type='button'], #"+id+" select").each(function(){
							if(
								$(this).attr("name") != undefined && $(this).attr("name").search("relative") != -1 ||
								$(this).attr("name") != undefined && $(this).attr("name").search("continuous") != -1 ||
								$(this).attr("name") != undefined && $(this).attr("name").search("d_zoom") != -1 ||
								$(this).attr("name") != undefined && $(this).attr("name").search("day_night_switch") != -1 ||
								$(this).attr("name") != undefined && $(this).attr("name").search("temperature_change") != -1
							)
								$(this).parent().parent().remove();
						});

						$("#Mlens_zoom_digital").parent().remove();
						$("#Mlens_zoom_continuous").parent().remove();
						$("#Mlens_focus_continuous").parent().remove();
					}
				}
			}else if($(this).attr("id") == "Isub_general"){
				if(ParamData.platform == "xarina_entry"){
					$("#Inetwork_wire_nic_type").children("option").each(function(){
						if($(this).attr("value") == "1G_full-dup")
							$(this).remove();
					});
				}

				$("#"+id+" th.th_width").css("width", "300px");
			}
			else if($(this).attr("id") == "Isub_alarm"){
				if(ParamData.alarm_in_type == 0){
					$("#Msub_alarm").parent().remove();
					$("#Isub_alarm").remove();
				} else {
					for(var i = 1; i <= 3; i++){
						if(i <= ParamData.alarm_in_type)
						{
							// checking alarm out
							if(ParamData.alarm_out_type == 0){
								$("span[name='Malarm_group']").parent().remove();
								$("#Mam_1_am1_en").parent().parent().parent().parent().parent().remove();
							} else {
								for(var j = 1; j <= 2; j++){
									if(j <= ParamData.alarm_out_type) continue;
										$("#Mam_"+i+"_am"+j+"_en").parent().parent().remove();
								}	
							}
							
							// checking audio out
							if(ParamData.audio_type == 0 || ParamData.audio_type == 1){
								$("#Mam_"+i+"_adio_en").parent().parent().parent().parent().parent().remove();
								$("span[name='Maudio_group']").parent().remove();
							}
							// checking sd card
							if(ParamData.sd_type == 0){
								$("#Mam_"+i+"_st_edge_en").parent().parent().remove();
								$("#Mam_"+i+"_rd_edge_en").parent().parent().parent().parent().parent().remove();
								$("span[name='Mrecording_group']").parent().remove();
							} else {
								$("#Mam_"+i+"_st_nas_en").parent().parent().remove();
								$("#Mam_"+i+"_rd_nas_en").parent().parent().remove();
							}
						}
						else
						{
							$("#Mevent_am_"+i).parent().remove();
							$("#alarm_"+i+"_block").remove();
						}
					}
				}
			}
			else if($(this).attr("id") == "Isub_audio_detection"){
				if(ParamData.audio_type == 0 || ParamData.audio_type == 1){
					$("#Msub_audio_detection").parent().remove();
					$("#Isub_audio_detection").remove();
				} else {
					// checking alarm out
					if(ParamData.alarm_out_type == 0){
						$("span[name='Malarm_group']").parent().remove();
						$("#Mao_am1_en").parent().parent().parent().parent().parent().remove();
					} else {
						for(var j = 1; j <= 2; j++){
							if(j <= ParamData.alarm_out_type) continue;
								$("#Mao_am"+j+"_en").parent().parent().remove();
						}
					}
					// checking sd card
					if(ParamData.sd_type == 0){
						$("#Mao_st_edge_en").parent().parent().remove();
						$("#Mao_rd_edge_en").parent().parent().parent().parent().parent().remove();
						$("span[name='Mrecording_group']").parent().remove();
					} else {
						$("#Mao_st_nas_en").parent().parent().remove();
						$("#Mao_rd_nas_en").parent().parent().remove();
					}
				}
			}
			else if($(this).attr("id") == "Isub_defocus"){
				if(ParamData.platform == "s2" || ParamData.platform == "s2l"){
					$("#Msub_defocus").parent().remove();
					$("#Isub_defocus").remove();
				} else {
					// checking alarm out
					if(ParamData.alarm_out_type == 0){
						$("span[name='Malarm_group']").parent().remove();
						$("#Mds_am1_en").parent().parent().parent().parent().parent().remove();
					} else {
						for(var j = 1; j <= 2; j++){
							if(j <= ParamData.alarm_out_type) continue;
								$("#Mds_am"+j+"_en").parent().parent().remove();
						}
					}
					// checking audio out
					if(ParamData.audio_type == 0 || ParamData.audio_type == 1){
						$("#Mds_adio_en").parent().parent().parent().parent().parent().remove();
						$("span[name='Maudio_group']").parent().remove();
					}
					// checking sd card
					if(ParamData.sd_type == 0){
						$("#Mds_st_edge_en").parent().parent().remove();
						$("#Mds_rd_edge_en").parent().parent().parent().parent().parent().remove();
						$("span[name='Mrecording_group']").parent().remove();
					} else {
						$("#Mds_st_nas_en").parent().parent().remove();
						$("#Mds_rd_nas_en").parent().parent().remove();
					}
				}
			}
			else if($(this).attr("id") == "Isub_face"){
				if(ParamData.platform == "s2"){
					// checking alarm out
					if(ParamData.alarm_out_type == 0){
						$("span[name='Malarm_group']").parent().remove();
						$("#Mfe_am1_en").parent().parent().parent().parent().parent().remove();
					} else {
						for(var j = 1; j <= 2; j++){
							if(j <= ParamData.alarm_out_type) continue;
								$("#Mfe_am"+j+"_en").parent().parent().remove();
						}
					}
					// checking audio out
					if(ParamData.audio_type == 0 || ParamData.audio_type == 1){
						$("#Mfe_adio_en").parent().parent().parent().parent().parent().remove();
						$("span[name='Maudio_group']").parent().remove();
					}
					// checking sd card
					if(ParamData.sd_type == 0){
						$("#Mfe_st_edge_en").parent().parent().remove();
						$("#Mfe_rd_edge_en").parent().parent().parent().parent().parent().remove();
						$("span[name='Mrecording_group']").parent().remove();
					} else {
						$("#Mfe_st_nas_en").parent().parent().remove();
						$("#Mfe_rd_nas_en").parent().parent().remove();
					}
				} else {
					$("#Msub_face").parent().remove();
					$("#Isub_face").remove();
				}
			}
			else if($(this).attr("id") == "Isub_motion" || $(this).attr("id") == "Isub_network_less"){
				var removeId = "";
				if($(this).attr("id") == "Isub_motion")
					removeID = "mt";
				else if($(this).attr("id") == "Isub_network_less")
					removeID = "nts";
				for(var i = 1; i <= 4; i++){
					// checking alarm out
					if(ParamData.alarm_out_type == 0){
						$("span[name='Malarm_group']").parent().remove();
						$("#M"+removeID+"_"+i+"_am1_en").parent().parent().parent().parent().parent().remove();
					} else {
						for(var j = 1; j <= 2; j++){
							if(j <= ParamData.alarm_out_type) continue;
								$("#M"+removeID+"_"+i+"_am"+j+"_en").parent().parent().remove();
						}
					}
					// checking audio out
					if(ParamData.audio_type == 0 || ParamData.audio_type == 1){
						$("#M"+removeID+"_"+i+"_adio_en").parent().parent().parent().parent().parent().remove();
						$("span[name='Maudio_group']").parent().remove();
					}
					// checking sd card
					if(ParamData.sd_type == 0){
						$("#M"+removeID+"_"+i+"_st_edge_en").parent().parent().remove();
						$("#M"+removeID+"_"+i+"_rd_edge_en").parent().parent().parent().parent().parent().remove();
						$("span[name='Mrecording_group']").parent().remove();
					} else {
						$("#M"+removeID+"_"+i+"_st_nas_en").parent().parent().remove();
						$("#M"+removeID+"_"+i+"_rd_nas_en").parent().parent().remove();
					}
				}
			}
			else if($(this).attr("id") == "Isub_tamper" || $(this).attr("id") == "Isub_loitering" || $(this).attr("id") == "Isub_intrusion" || $(this).attr("id") == "Isub_schedule"
				|| $(this).attr("id") == "Isub_departure"){
				var removeId = "";
				if($(this).attr("id") == "Isub_tamper")
					removeID = "tr";
				else if($(this).attr("id") == "Isub_loitering")
					removeID = "loitering";
				else if($(this).attr("id") == "Isub_intrusion")
					removeID = "intrusion";
				else if($(this).attr("id") == "Isub_schedule")
					removeID = "se";
				else if($(this).attr("id") == "Isub_departure")
					removeID = "departure";

				// checking alarm out
				if(ParamData.alarm_out_type == 0){
					$("span[name='Malarm_group']").parent().remove();
					$("#M"+removeID+"_am1_en").parent().parent().parent().parent().parent().remove();
				} else {
					for(var j = 1; j <= 2; j++){
						if(j <= ParamData.alarm_out_type) continue;
							$("#M"+removeID+"_am"+j+"_en").parent().parent().remove();
					}
				}
				// checking audio out
				if(ParamData.audio_type == 0 || ParamData.audio_type == 1){
					$("#M"+removeID+"_adio_en").parent().parent().parent().parent().parent().remove();
					$("span[name='Maudio_group']").parent().remove();
				}
				// checking sd card
				if(ParamData.sd_type == 0){
					$("#M"+removeID+"_st_edge_en").parent().parent().remove();
					$("#M"+removeID+"_rd_edge_en").parent().parent().parent().parent().parent().remove();
					$("span[name='Mrecording_group']").parent().remove();
				} else {
					$("#M"+removeID+"_st_nas_en").parent().parent().remove();
					$("#M"+removeID+"_rd_nas_en").parent().parent().remove();
				}
			}	
			else if($(this).attr("id") == "Isub_alarm_out"){
				if(ParamData.alarm_out_type == 0){
					$("#Msub_alarm_out").parent().remove();
					$("#Isub_alarm_out").remove();
				} else {
					for(var i = 1; i <= 2; i++){
						if(i <= ParamData.alarm_out_type) continue;
						else
							$("#Mevent_handler_alarm_out_"+i).parent().remove();
					}
				}
			}
			else if($(this).attr("id") == "Isub_sdcard"){
				if(ParamData.sd_type == 0){
					$("#Msub_sdcard").parent().remove();
					$("#Isub_sdcard").remove();
				} 
			}
			else if($(this).attr("id") == "Isub_sound"){
				if(ParamData.audio_type == 0 || ParamData.audio_type == 1){
					$("#Msub_sound").parent().remove();
					$("#Isub_sound").remove();
				} 
			}
			else if($(this).attr("id") == "Isub_nas"){
				$("#Msub_nas").parent().remove();
				$("#Isub_nas").remove();
			}
			else if($(this).attr("id") == "Isub_event_search"){
				if($.fn.DetectBrowser() == "safari"){
					$("#Msub_event_search").parent().remove();
					$("#Isub_event_search").remove();
				} else if($.fn.DetectBrowser() == "msie"){
					var ie9 = /MSIE 9/i.test(navigator.userAgent);
				    var ie10 = /MSIE 10/i.test(navigator.userAgent);
				    var ie11 = /rv:11.0/i.test(navigator.userAgent);
					if(!(ie10 || ie11) || ie9){
						$("#Msub_event_search").parent().remove();
						$("#Isub_event_search").remove();	
					}
				}
			}
			else if($(this).attr("id") == "Isub_sd_detection"){
				if(ParamData.mSD_card_support == "unsupported" || ParamData.mSD_card_support == "umounted" || ParamData.mSD_card_support == "fail"){
					$("#Msub_sd_detection").parent().remove();
					$("#Isub_sd_detection").remove();
					return true;
				}
				// checking alarm out
				if(ParamData.alarm_out_type == 0){
					$("span[name='Malarm_group']").parent().remove();
					$("#Msd_detection_am1_en").parent().parent().parent().parent().parent().remove();
				} else {
					for(var j = 1; j <= 2; j++){
						if(j <= ParamData.alarm_out_type) continue;
							$("#Msd_detection_am"+j+"_en").parent().parent().remove();
					}
				}
				// checking audio out
				if(ParamData.audio_type == 0 || ParamData.audio_type == 1){
					$("#Msd_detection_adio_en").parent().parent().parent().parent().parent().remove();
					$("span[name='Maudio_group']").parent().remove();
				}

				$("#Msd_detection_rd_nas_en").parent().parent().remove();
				$("#Msd_detection_st_nas_en").parent().parent().remove();
			}
			else if($(this).attr("id") == "Isub_border_line"){
				var max = 3;
				for(var i = 1; i <= max; i++){
					// checking alarm out
					if(ParamData.alarm_out_type == 0){
						$("span[name='Malarm_group']").parent().remove();
						$("#Mborder_line_"+i+"_am1_en").parent().parent().parent().parent().parent().remove();
					} else {
						for(var j = 1; j <= 2; j++){
							if(j <= ParamData.alarm_out_type) continue;
								$("#Mborder_line_"+i+"_am"+j+"_en").parent().parent().remove();
						}
					}
					// checking audio out
					if(ParamData.audio_type == 0 || ParamData.audio_type == 1){
						$("#Mborder_line_"+i+"_adio_en").parent().parent().parent().parent().parent().remove();
						$("span[name='Maudio_group']").parent().remove();
					}
					// checking sd card
					if(ParamData.sd_type == 0){
						$("#Mborder_line_"+i+"_st_edge_en").parent().parent().remove();
						$("#Mborder_line_"+i+"_rd_edge_en").parent().parent().parent().parent().parent().remove();
						$("span[name='Mrecording_group']").parent().remove();
					} else {
						$("#Mborder_line_"+i+"_st_nas_en").parent().parent().remove();
						$("#Mborder_line_"+i+"_rd_nas_en").parent().parent().remove();
					}
				}
			}
			else if($(this).attr("id") == "Isub_rs485"){
				if(ParamData.mechanismtype != 3){
					$("#Msub_rs485").parent().remove();
					$("#Isub_rs485").remove();
				}
			}
		});

		if($.fn.DetectBrowser() == "firefox"){
			$("ul.tabs").css("height", "34px");
			$(".tabs li").css("height", "30px");
			$("legend").css("margin", "2px 0px 0px 20px");
		}

		if(ParamData.abf_type == 0){
			$("#Mmenu_lens").parent().remove();
			$("div[ref_id=Mmenu_lens]").remove();
		}

		// hidden all video analytics feature at s2l platform, because s2l sdk is not yet ready.
		if(ParamData.platform == "s2l"){
			$("#Mmenu_video_analysis").parent().remove();
			$("#Msub_line_counting").parent().remove();
			$("#Isub_line_counting").remove();
			$("#Msub_loitering").parent().remove();
			$("#Isub_loitering").remove();
			$("#Msub_border_line").parent().remove();
			$("#Isub_border_line").remove();
			$("#Msub_intrusion").parent().remove();
			$("#Isub_intrusion").remove();
			$("#va_select_p").remove();
			$("#va_select").parent().remove();
		}

		$.fn.DynamicAdjustAccountSize();
		$.fn.FilterVAFunction();
		if($.fn.JudgmentArrowEnable() == 1)
			$.fn.genTabArrow();
		else
			$.fn.ResetTabClassWid();
		RemoveAttri = 1;
	};

	$.fn.JudgmentArrowEnable = function()
	{
		var moveable = $("div[ref_id='"+$.cookie("menu_active")+"'] > ul > div.moveableContainer")
		, cal_wid = 0
		, parent_wid = $(moveable).parent().width()
		, ret = 0
		, num = 0
		;
		$(moveable).children('li').each(function(n){
			cal_wid = cal_wid + $(this).width();
			num = n;
		});

		if(Number(cal_wid) > Number(parent_wid))
			ret = 1;
		return ret;
	};

	$.fn.FilterVAFunction = function()
	{
		if(ParamData.va_feature != "off"){
			var tmp = ParamData.va_feature.split(',')
			, seach_in = -1
			, va_name
			, va_en
			;
			$.each(tmp, function(i){
				search_in = tmp[i].indexOf('/');
				va_name = tmp[i].toString().slice(0, search_in);
				va_en = tmp[i].toString().slice(search_in+1, tmp[i].length);
				if(va_en == 0){
					$("#Msub_"+va_name).parent().remove();
					$("#Isub_"+va_name).remove();
					$.fn.RemoveOption(va_name);
				}	
			});
		} else
			$("#Mmenu_video_analysis").parent().remove();
	};

	$.fn.RemoveOption = function(src)
	{
		var ret = ""
		if(src == "border_line")
			ret = "Line Crossing";
		else if(src == "line_counting")
			ret = "Object Counting";
		else if(src == "intrusion")
			ret = "Intrusion";
		else if(src == "loitering")
			ret = "Loitering";
		else if(src == "abandoned")
			ret = "Abandoned";
		else if(src == "withdrawn")
			ret = "Withdrawn";
		else if(src == "departure")
			ret = "Departure";
		else if(src == "adverseway")
			ret = "Adverseway";
		else if(src == "area_counting")
			ret = "Area Counting";

		try{
			$("#va_select > option[value='"+ret+"']").remove();
		} catch(e) {
			console.log("no match va option of "+ret+" to remove.");
		}
	};

	$.fn.DynamicControlMedia = function(id, type)
	{
		if(type == "required"){
			$.fn.DynamicAdjustDivSize("config", "show");
			$.fn.ResetActiveStream("optional");
		} else if(type == "disabled"){
			$.fn.DynamicAdjustDivSize("config", "hide");
			$.fn.StopStream("I"+id.slice(1, id.length), "media_display");
		}

		if(RemoveAttri){
			if($.fn.JudgmentArrowEnable() == 1)
				$.fn.genTabArrow();
			else
				$.fn.ResetTabClassWid();
		}
	};

	$.fn.DynamicAdjustDivSize = function(pos, type)
	{
		if(type == "show"){
			if(status_thread == "")
				$.fn._runPollingStatusThread();
		}else{
			if(status_thread != ""){
	            clearTimeout(status_thread);
	            status_thread = "";
	        }
		}
		if(pos == "live"){
			if(type == "show"){
				var _g_P_width = $("#_g_P").width()
				_g_T_width = $("#_g_T").width()
				;
				$("#_g_T").css("width", "0px").children().hide();
				$("#_g_P").css("width", Number(_g_P_width+_g_T_width)+"px");
				if($("#_g_P").children("div:last-child").attr("conf") != undefined){
					$("#_g_P").children("OBJECT").hide();
					$("#_g_P").children("div").css("width", Number(_g_P_width+_g_T_width)).show();
					$("#_g_P").children("div").children("div").css("width", Number(_g_P_width+_g_T_width));
				} else {
					$("#_g_P").children().show();
				}
			}
		} else if(pos == "config"){
			if(type == "hide"){
				var _g_P_width = $("#_g_P").width()
				_g_T_width = $("#_g_T").width()
				;
				$("#_g_P").css("width", "0px");
				$("#_g_T").css("width", Number(_g_T_width+_g_P_width)+"px");
				$(".tabs").siblings("div[conf]").css("width", Number(_g_T_width+_g_P_width)+"px");
				$(".tabs").css("width", Number(_g_T_width+_g_P_width-40)+"px");
				$("#_g_P").children().hide();
			} else if(type == "show"){
				var _g_P_width = $("#_g_P").attr("_width")
				_g_T_width = $("#_g_T").attr("_width")
				;
				$("#_g_P").css("width", _g_P_width);
				$("#_g_T").css("width", _g_T_width);
				$(".tabs").siblings("div[conf]").css("width", _g_T_width);
				$(".tabs").css("width", $.fn.Minus(_g_T_width, 40));
				if($("#_g_P").children("div:last-child").attr("conf") != undefined){
					$("#_g_P").children("OBJECT").hide();
					$("#_g_P").children("div").css("width", _g_P_width).show();
					$("#_g_P").children("div").children("div").css("width", _g_P_width);
				} else {
					$("#_g_P").children().show();
				}
			}
		}
	};

	$.fn.Minus = function(main_wid, minus_wid)
	{
		var wid = main_wid.split("px")
		, ret
		;
		if(wid != -1){
			ret = Number(wid[0]) - Number(minus_wid);
		} else
			ret = Number(main_wid) - Number(minus_wid);
		return ret+"px";
	};

	$.fn.DynamicAdjustAccountSize = function()
	{
		var acct_len = (ParamData.login_user).length
		, acct_para_wid = $("#_g_A").parent().width()
		, conf_wid = $("#_g_C").width()
		, acct_wid = $("#_g_A").width()
		, n_conf_wid = (acct_para_wid - acct_len * 18)
		, n_acct_wid = acct_len * 18
		;
		$("#_g_C").css("width", conf_wid < n_conf_wid ? (conf_wid+"px") : (n_conf_wid+"px"));
		$("#_g_A").css("width", acct_wid > n_acct_wid ? (acct_wid+"px") : (n_acct_wid+"px"));
	};

	$.fn.DrawObjectCountingLine = function()
    {
    	var ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0);
    	ActivexPlayerObject.Clear_Cropping();
        for(var i = 1; i <=3; i++)
        {
            var tmp = ""
            , direct = ""
            , en = ""
            ;
            if(i == 1){
            	tmp = ParamData.object_counting_1_coord;
            	direct = ParamData.object_counting_1_direct;
            	en = ParamData.object_counting_1_en;
            } else if(i == 2){
            	tmp = ParamData.object_counting_2_coord;
            	direct = ParamData.object_counting_2_direct;
            	en = ParamData.object_counting_2_en;
            } else if(i == 3){
            	tmp = ParamData.object_counting_3_coord;
            	direct = ParamData.object_counting_3_direct;
            	en = ParamData.object_counting_3_en;
            }
            var data = tmp == undefined ? "0,0,0,0,"+$.fn.GetStreamWidth()+"x"+$.fn.GetStreamHeight() : tmp
            , tmp_detect_size = ActivexPlayerObject.Get_VideoSize()
            , coordinate = en == "off" ? "0,0,0,0" : $.fn._runTransferCoordinate_Sys2uiForVideoAnalysis(data, tmp_detect_size)
            ;
            try {
                ActivexPlayerObject.SetObjectFunction(1, $.fn.GetOrientationIndex());
                ActivexPlayerObject.SetObjectCountingLine(i, ""+coordinate+"", ""+direct+"");
                ActivexPlayerObject.Select_OC_Setting_Line(i, direct);
            } catch(e){
                console.log("///////////////// draw object counting coordinate error. /////////////////");
            }
        }
        // Disable draw line feature.
        ActivexPlayerObject.Select_OC_Setting_Line(0, "left");
    };

    $.fn.UpdateObjectInfor = function(en1, cord1, dir1, en2, cord2, dir2, en3, cord3, dir3)
    {
    	ParamData.object_counting_1_en = en1;
    	ParamData.object_counting_1_coord = cord1;
    	ParamData.object_counting_1_direct = dir1;
    	ParamData.object_counting_2_en = en2;
    	ParamData.object_counting_2_coord = cord2;
    	ParamData.object_counting_2_direct = dir2;
    	ParamData.object_counting_3_en = en3;
    	ParamData.object_counting_3_coord = cord3;
    	ParamData.object_counting_3_direct = dir3;
    };

    $.fn.DrawLoiteringLine = function()
    {
    	var tmp = ParamData.loitering_area
        , data = tmp == undefined ? "0,0,"+$.fn.GetStreamWidth()+"x"+$.fn.GetStreamHeight() : tmp
        , ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0)
        , tmp_detect_size = ActivexPlayerObject.Get_VideoSize()
        , coordinate = ParamData.loitering_en == "off" ? "0,0,0,0" : $.fn._runTransferCoordinate_Sys2uiForVideoAnalysis(data, tmp_detect_size)
        ;
        try {
        	ActivexPlayerObject.DrawLoiteringArea(false);
            ActivexPlayerObject.SetObjectFunction(2, $.fn.GetOrientationIndex());
            ActivexPlayerObject.SetLoiteringArea(""+coordinate+"");
        } catch(e){
            console.log("///////////////// draw loitering coordinate error. /////////////////");
        }
    };

    $.fn.UpdateLoiteringArea = function(cord, en)
    {
    	ParamData.loitering_area = cord;
    	ParamData.loitering_en = en;
    };

    $.fn.DrawIntrusionLine = function()
    {
    	var tmp = ParamData.intrusion_area
        , data = tmp == undefined ? "0,0,"+$.fn.GetStreamWidth()+"x"+$.fn.GetStreamHeight() : tmp
        , ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0)
        , tmp_detect_size = ActivexPlayerObject.Get_VideoSize()
        , coordinate = ParamData.intrusion_en == "off" ? "0,0,0,0" : $.fn._runTransferCoordinate_Sys2uiForVideoAnalysis(data, tmp_detect_size)
        ;

        try {
        	ActivexPlayerObject.DrawIntrusionArea(false);
            ActivexPlayerObject.SetObjectFunction(4, $.fn.GetOrientationIndex());
            ActivexPlayerObject.SetIntrusionArea(""+coordinate+"");
        } catch(e){
            console.log("///////////////// draw intrusion coordinate error. /////////////////");
        }
    };

    $.fn.UpdateIntrusionArea = function(cord, en)
    {
    	ParamData.intrusion_area = cord;
    	ParamData.intrusion_en = en;
    };

    $.fn.DrawLineCrossing = function()
    {
    	var ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0);
    	ActivexPlayerObject.Clear_Cropping();
        for(var i = 1; i <= 3; i++)
        {
            var tmp = ""
            , direct = ""
            , en = ""
            ;
            if(i == 1){
            	tmp = ParamData.border_line_1_coord;
            	direct = ParamData.border_line_1_direct;
            	en = ParamData.border_line_1_en;
            } else if(i == 2){
            	tmp = ParamData.border_line_2_coord;
            	direct = ParamData.border_line_2_direct;
            	en = ParamData.border_line_2_en;
            } else if(i == 3){
            	tmp = ParamData.border_line_3_coord;
            	direct = ParamData.border_line_3_direct;
            	en = ParamData.border_line_3_en;
            }

            var data = tmp == undefined ? "0,0,0,0,"+$.fn.GetStreamWidth()+"x"+$.fn.GetStreamHeight() : tmp
            , tmp_detect_size = ActivexPlayerObject.Get_VideoSize()
            , coordinate = en == "off" ? "0,0,0,0" : $.fn._runTransferCoordinate_Sys2uiForVideoAnalysis(data, tmp_detect_size)
            ;

            try {
                ActivexPlayerObject.SetObjectFunction(3, $.fn.GetOrientationIndex());
                ActivexPlayerObject.SetLineCrossingLine(i, ""+coordinate+"", ""+direct+"");
                ActivexPlayerObject.Select_LC_Setting_Line(i, direct);
            } catch(e){
                console.log("///////////////// draw line crossing coordinate error. /////////////////");
            }
        }
        // Disable draw line feature.
        ActivexPlayerObject.Select_LC_Setting_Line(0, "left");
    };

    $.fn.UpdateLineCrossingArea = function(en1, cord1, dir1, en2, cord2, dir2, en3, cord3, dir3)
    {
    	ParamData.border_line_1_en = en1;
    	ParamData.border_line_1_coord = cord1;
    	ParamData.border_line_1_direct = dir1;
    	ParamData.border_line_2_en = en2;
    	ParamData.border_line_2_coord = cord2;
    	ParamData.border_line_2_direct = dir2;
    	ParamData.border_line_3_en = en3;
    	ParamData.border_line_3_coord = cord3;
    	ParamData.border_line_3_direct = dir3;
    };

    $.fn.DrawAreaCounting = function()
    {
    	var tmp = ParamData.area_counting_coord
        , data = tmp == undefined ? "0,0,"+$.fn.GetStreamWidth()+"x"+$.fn.GetStreamHeight() : tmp
        , ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0)
        , tmp_detect_size = ActivexPlayerObject.Get_VideoSize()
        , coordinate = ParamData.area_counting_en == "off" ? "0,0,0,0" : $.fn._runTransferCoordinate_Sys2uiForVideoAnalysis(data, tmp_detect_size)
        ;
        try {
        	ActivexPlayerObject.DrawAreaCountingArea(false);
            ActivexPlayerObject.SetObjectFunction(7, $.fn.GetOrientationIndex());
            ActivexPlayerObject.SetAreaCountingArea(""+coordinate+"");
            ActivexPlayerObject.SetAreaCounterPosition(ParamData.area_counting_x, ParamData.area_counting_y);
        } catch(e){
            console.log("///////////////// draw intrusion coordinate error. /////////////////");
        }
    };

    $.fn.UpdateAreaCounting = function(cord, en, x, y)
    {
    	ParamData.area_counting_coord = cord;
    	ParamData.area_counting_en = en;
    	ParamData.area_counting_x = x;
    	ParamData.area_counting_y = y;
    };

    $.fn.DrawDeparture = function()
    {
    	var tmp = ParamData.departure_coord
        , data = tmp == undefined ? "0,0,"+$.fn.GetStreamWidth()+"x"+$.fn.GetStreamHeight() : tmp
        , ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0)
        , tmp_detect_size = ActivexPlayerObject.Get_VideoSize()
        , coordinate = ParamData.departure_en == "off" ? "0,0,0,0" : $.fn._runTransferCoordinate_Sys2uiForVideoAnalysis(data, tmp_detect_size)
        ;

        try {
        	ActivexPlayerObject.DrawDepartureArea(false);
            ActivexPlayerObject.SetObjectFunction(6, $.fn.GetOrientationIndex());
            ActivexPlayerObject.SetDepartureArea(""+coordinate+"");
        } catch(e){
            console.log("///////////////// draw intrusion coordinate error. /////////////////");
        }
    };

    $.fn.UpdateDeparture = function(cord, en)
    {
    	ParamData.departure_coord = cord;
    	ParamData.departure_en = en;
    };

    $.fn.DrawWithDrawn = function()
    {

    };
    
    $.fn.UpdateWithDrawnArea = function(en1, cord1, en2, cord2, en3, cord3)
    {
    	ParamData.withdrawn_1_en = en1;
    	ParamData.withdrawn_1_coord = cord1;
    	ParamData.withdrawn_2_en = en2;
    	ParamData.withdrawn_2_coord = cord2;
    	ParamData.withdrawn_3_en = en3;
    	ParamData.withdrawn_3_coord = cord3;
    };

    $.fn._runPollingStatusThread = function()
    {
        var Status = new Manager();
        function Manager(){
            var callback = (function(s){
                return function() { s._callback(); };
            })(this);

            var parser = (function(s){
                return function(d) { s._parser(d); };
            })(this);

            this._parser = function(data){
            	var alarm_en = "off", motion_en = "off";
                $.each(data, function(param, value){
                    if(param == "event.source.motion_detection.zone.1.info.status" ||
                    	param == "event.source.motion_detection.zone.2.info.status" ||
                    	param == "event.source.motion_detection.zone.3.info.status" ||
                    	param == "event.source.motion_detection.zone.4.info.status"){
                        if(value[1] == "on")
                        	motion_en = value[1];
                    } else if(param == "event.source.alarm_detection.alarm_in.1.info.status" ||
                    		param == "event.source.alarm_detection.alarm_in.2.info.status" ||
                    		param == "event.source.alarm_detection.alarm_in.3.info.status"){
                        if(value[1] == "on")
                        	alarm_en = value[1];
                    } else if(param == "event.source.face_detection.info.status"){
                        if(value[1] == "on")
                        	$("#Istatus_face").addClass("common_sprite-face_icon");
                        else if(value[1] == "off")
                        	$("#Istatus_face").removeClass("common_sprite-face_icon");
                    }
                });
                data = null;
                if(motion_en == "on")
                	$("#Istatus_motion").addClass("common_sprite-motion_icon");
                else if(motion_en == "off")
                	$("#Istatus_motion").removeClass("common_sprite-motion_icon");

                if(alarm_en == "on")
                	$("#Istatus_alarm").addClass("common_sprite-alarm_icon");
                else if(alarm_en == "off")
                	$("#Istatus_alarm").removeClass("common_sprite-alarm_icon");
            };

            this._callback = function(){
                status_obj = $.ajax({
                    beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
                    url:'/cgi-bin/get?',
                    type:'POST',
                    data:status_param,
                    cache:false,
                    success:function(data){
                        if (status_obj !== null) {
                            status_obj.onreadystatechange = parser(data);
                            status_obj.abort = null;
                            status_obj = null;
                            data = null;
                        }
                    },
                    complete:function(){
                        $.removeCookie('ipcamera', { path: '/' });
                        if(status_thread != ""){
                            status_thread = null;
                            status_thread = setTimeout(callback, 1000);
                        } else
                            status_thread = setTimeout(callback, 1000);
                    }
                });
            };
        };
        Status._callback();
    };

	$.fn.InitialRecordingStream = function()
	{
		var cur_id = ParamData.cur_id;
        var str_config = cur_id==1 ? ParamData.str_1_config:(cur_id==2?ParamData.str_2_config:ParamData.str_3_config);
        console.log("str_config: " + str_config);
        var str_res = str_config.split(",");
        var d_str = new Array(parseInt(str_res.length));        
        console.log("str_res length:" + str_res.length);
        // extract h264 item
        if(str_config.indexOf("h264")>-1){
        	$("#Ievent_sink_recording_stream").attr("disabled", false).removeClass("grey_out");
            for(var i=0;i<str_res.length;i++){
                var tmp = str_res[i].split("/");
                if(tmp[1] == "h264"){
                    d_str[i] = new Array(2);
                    d_str[i][0] = i+1;
                    d_str[i][1] = tmp[0];
                    console.log("dis_str check:"+d_str[i]);
                }
            }
            $("#Ievent_sink_recording_stream").find('option').remove();
            $.each(d_str, function(i, str){
            	console.log("STR: " + str);
                if(str != undefined){
                    $("#Ievent_sink_recording_stream").append($("<option></option>").attr("value", d_str[i][0]));
                     console.log("check d_str val:" + d_str[i][0]);
                     //$.fn.loadingLang($.cookie('def_lang'), "index");
                     if(LT!=undefined && LT!="")
                     	$.fn.TransOptions("Ievent_sink_recording_stream");
                }
            });

        }else{
            console.log("enter check");
            $("#Ievent_sink_recording_stream").attr("disabled", true).addClass("grey_out");
        }
            
	};

})(jQuery)
