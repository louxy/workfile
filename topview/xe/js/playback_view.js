(function($){
	var OCX_VER = "1,0,0,3905"
    , CLSID = "F4CC2E0F-E997-4FBF-BB93-7D16432DF786";
    var browser_height = 600;
	var browser_width = 800;
	var Excep_num = 0;
	var Time;
	var LT;
	var plr=1; // 1: normal 2: play forward -2: play back
	var vState =1;// 1:change to play 0:change to pause
	
	$.fn.initialPlaybackView = function()
	{	
		var url = document.URL.split('?');
		Time = decodeURIComponent(url[1]);
		console.log("get search time is: " + Time);
		$.fn.loadingLang($.cookie('def_lang'),"net_view");		
		$.fn.newActiveObject();
		$.fn.playActiveStream();
		$.fn.initialCtrl();
	};

	$.fn.initialCtrl = function()
	{	
		var ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0);

		$("#stop_pic").bind("click", function(){
			var r = confirm($.fn.GetLangStr(LT._Window_close_confirm));
			if(r) window.close();
		});

		$("#backward_pic").bind("click", function(){
			//console.log("plr: " + plr);
			if(plr == 1){
				$("#backward_pic").attr("src", "/css/images/Backward_normal.png");
				ActivexPlayerObject.SetRtspScale(-2);
				plr = -2;
			}else if(plr == 2){
				$("#forward_pic").attr("src", "/css/images/Forward_over.png");
				ActivexPlayerObject.SetRtspScale(1);
				plr = 1;
			}
			if(vState == 0){
				$("#play_pause").attr("src", "/css/images/Pause_over.png");
				vState = 1;				
			}
		});

		$("#forward_pic").bind("click", function(){
			//console.log("plr: " + plr);
			if(plr == 1){
				$("#forward_pic").attr("src", "/css/images/Forward_normal.png");
				ActivexPlayerObject.SetRtspScale(2);
				plr = 2;
			}else if(plr == -2){
				$("#backward_pic").attr("src", "/css/images/Backward_over.png");
				ActivexPlayerObject.SetRtspScale(1);
				plr = 1;
			}
			if(vState == 0){
				$("#play_pause").attr("src", "/css/images/Pause_over.png");
				vState = 1;				
			}			
		});
		
		$("#play_pause").bind("click", function(){
					
			if(vState){
				$("#play_pause").attr("src", "/css/images/Play_over.png");
				vState = 0;			
				ActivexPlayerObject.SetCMDPause();
			}else{
				$("#play_pause").attr("src", "/css/images/Pause_over.png");
				vState = 1;
				ActivexPlayerObject.SetCMDPlay();
			}
		});
	}
	
	$.fn.newActiveObject = function()
	{
		if($.fn.DetectBrowser() == "msie")
			$("<OBJECT "+
				"id='VideoPlugin' "+
				"name='VideoPlugin' "+
				"classid='clsid:"+CLSID+"' "+ 
				"scrolling='no' "+ 
				"scroll='no' "+ 
				"style='width:"+browser_width+"px;height:"+browser_height+"px;position:absolute;z-index:1001:display:none;'>"+
			"</OBJECT>").appendTo("#show_view");
		else
			$("<OBJECT>"+
				"<embed TYPE=\"application/x-mpp-plugin\" name=\"VideoPlugin\" width=\""+browser_width+"px\" height=\""+browser_height+"px\" CLSID=\"{"+CLSID+"}\"></embed>"+
			"</OBJECT>").appendTo("#show_view");

		setTimeout($.fn.desObject, 5);
	};

	// check plugin version
	$.fn.desObject = function()
	{
		var curVersion = ""
		, apiVersion = ""
		;

		var ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0);
		try
		{
			var tmp = OCX_VER.split(",")
			, api_tmp;
			$.each(tmp, function(n){
				curVersion += tmp[n];
			});

			api_tmp = ActivexPlayerObject.GetVersion();
			tmp = api_tmp.split(".");
			$.each(tmp, function(n){
				apiVersion += tmp[n];
			});
			console.log("apiVesion:"+apiVersion+" curVersion:"+curVersion);
			if(Number(apiVersion) < Number(curVersion)){
				$.fn.MsiDownload();
			}

		} catch(e){
			console.log("QueryPlugin:Exception error.");
		}
	};

	// set activex download
	$.fn.MsiDownload = function()
	{
		$("#show_view").children("OBJECT").hide();

		$("<div style=\"width:"+browser_width+"px;height:"+browser_height+"px;margin:auto;border-bottom:solid 1px #bebebe; background-color: white;\">"+
			"<div style=\"width:"+Number(browser_width-20)+"px;padding:10px;\">"+
				"<div style=\"width:100%;text-align:center;color:red;\"><span id=\"Msi_warning\"></span></div>"+
				"<div style=\"width:100%;text-align:center;color:black;\"><span id=\"Msi_download\"></span></div>"+
			"</div>"+
		"</div>").appendTo("#show_view");
		

		try {
			$.fn.TransLang("Msi_warning", $.fn.GetLangStr(LT._MSI_dwonload_note), "s");
			$.fn.TransLang("Msi_download", $.fn.ParserDownloadMSI($.fn.GetLangStr(LT._Please_click_here), $.fn.GetLangStr(LT._Here)), "s");
		} catch(e){
			console.log("error TransLang:" + e);
		}
	};

	$.fn.playActiveStream = function()
	{
		var status = false;
		var current_ip = $.fn.ParserIPAddr();
		var ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0);
		
		try{
			var playStatus = ActivexPlayerObject.GetStreamStatus();
		} catch(e){
			console.log("time out:"+Excep_num);
			if(Excep_num >= 5)
			{
				if(Excep_num == 5){
					$.fn.MsiDownload();
					status = true;
				}
				Excep_num = Excep_num + 1;
			}
			else
			{
				Excep_num = Excep_num + 1;
				status = true;
				setTimeout(function(){
					$.fn.playActiveStream();
				}, 1000);	
			}
		}

		if(status)
			return true;
		ActivexPlayerObject.EndStreamStatic(current_ip);		
		
		// Param1: 0/STREM_FROM_HTTP , 1/STREM_FROM_RTSP
		// Param2: 0/rtsp over udp , 1/rtsp over tcp
		ActivexPlayerObject.SetPictureFormat(3);
		ActivexPlayerObject.SetStreamType(1);
		ActivexPlayerObject.SetStreamFromType(1,1);
		ActivexPlayerObject.SetRtspPortno(7554);
		ActivexPlayerObject.SetPlaybackRange(Time);
		ActivexPlayerObject.SetRtspURL('sdfilestream');
		ActivexPlayerObject.CreateStream(current_ip);
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
			len = IP[0].indexOf(':');
			
			if(len == -1)
				parser_ip = IP[0];
			else
				parser_ip = IP[0].slice(0,len);
		}
		else  // IPv6
		{
			parser_ip = IP[0].slice(0,len+1);
		}

		URL = null, IP = null;
		return parser_ip;
	};

	$.fn.UpdateViewLang = function(lang)
    {
        LT = lang;
    };

})(jQuery);