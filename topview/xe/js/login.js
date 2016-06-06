(function($){
	var ldap_mode
	, ldap_status
	;
	
	$.fn.initialLoginStyle = function()
	{
		var tmp
		, _t_main_width = 1280
		, _main_width
		, _t_main_height = 720
		, _main_height
		, _t_logo_sty = "font-family:Arial; color:black; font-size:28px;font-weight:bold;"
		, _t_text_sty = "font-family:Arial; color:white; font-size:14px;"
		;

		$("#logo_name")[0].innerHTML = "Network Camera";
		$("#login_main").attr("style","width:"+_t_main_width+"px;height:"+_t_main_height+"px;background-color:#EEF4F7;margin:100px auto;");
		_main_width = (Number(_t_main_width) / 2) - 60;
		_main_height = (Number(_t_main_height) - $("#login_area").height() - 160) / 2;
		$("#login_logo, #logo_parent, #login_form").css("width", _main_width+"px").css("margin", "0px auto");
		$("#login_tmp").css("height", _main_height+"px");

		// setting content text class.
		$("#login_area").children("div").each(function(){
			$(this).attr("style", _t_text_sty);
		});

		// setting logo class.
		$("#logo_name").attr("style", _t_logo_sty);
	};

	$.fn._LoginGo = function(){
		$.fn.startLanguage("login");
		$.fn._InitialFunc();
		$.fn._InitialCallback();
		$("#Ilogin_id").focus();
		$(document).keydown(function(e){
			if(e.which==13){
				$('#Ilogin').click();
			}
		});
		$("#login_main").show();
	};

	$.fn._InitialCallback = function()
	{
		$.ajax({
			beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
			url:"/login/bin/get_param.cgi?",
			dataType:'json',
			cache:false,
			statusCode: {
                200: function(data) {
                	$.each(data, function(param, value){
                		if(param == "network.web.enable_ldap"){
                			ldap_mode = value[1];
                		}
                	});
                }
        	},
        	complete:function(){
        		$.removeCookie('ipcamera', { path: '/' });
        	}
        });
	};

	$.fn._InitialPageLang = function(LT){
		$("#Mlogin_id")[0].innerHTML 		= $.fn.GetLangStr(LT._User_name);
		$("#Mlogin_passwd")[0].innerHTML 	= $.fn.GetLangStr(LT._Password);
		$("#Mlanguage")[0].innerHTML 		= $.fn.GetLangStr(LT._Language);
		$("#Ilogin").val($.fn.GetLangStr(LT._Login));
		if($.fn._identifyBrowser() == "msie" || $.fn._identifyBrowser() == undefined){
			$(".content_label > label").css("margin","0px 0px 0px 7px");
			$(".content_label > select").css("margin","0px 0px 0px 8px");
			$("#Ilogin_button").css("margin","15px 37px 0px 0px");
		}
		else if($.fn._identifyBrowser() == "chrome" || $.fn._identifyBrowser() == "safari"){
			$(".content_label > label").css("margin","0px 0px 0px 5px");
			$(".content_label > select").css("margin","0px 0px 0px 4px");
			$("#Ilogin_button").css("margin","15px 37px 0px 0px");
		}
		else if($.fn._identifyBrowser() == "firefox"){
			$(".content_label > label").css("margin","0px 0px 0px 9px");
			$(".content_label > select").css("margin","0px 0px 0px 8px");
			$("#Ilogin_button").css("margin","15px 30px 0px 0px");
		}
	};

	$.fn._InitialFunc = function(){
		$("#Ilogin").bind('click', function(){
			if(ldap_mode == "off"){
				$.fn._localLogin($("#Ilogin_id").val(), $("#Ilogin_passwd").val());
			} else if(ldap_mode == "on"){
				$.fn._remoteLogin($("#Ilogin_id").val(), $("#Ilogin_passwd").val());
			}
		});
	};

	$.fn._localLogin = function(user, passwd)
	{
		$.ajax({
			beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
			type:"GET",
			url:"/cgi-bin/get?",
			cache:false,
			async:false,
			username:user,
			password:passwd,
			statusCode: {
                200: function(data) {
                	$.fn._redirect();
                	$.cookie("def_stream", 'stream1', { expires: 365, path: '/' });
                	$.cookie("def_config", 'config', { expires: 365, path: '/' });
                	$.removeCookie('ipcamera', { path: '/' });
                },
                401: function(){
                	alert("Invalid User ID or Password.");
                	$.removeCookie('ipcamera', { path: '/' });
                }
        	}
        });
	};

	$.fn._remoteLogin = function(user, passwd)
	{
		var _url = "/login/bin/ldapclient.cgi?uid="+user+"&pwd="+passwd;
		$.ajax({
			url:_url,
			dataType:'json',
			cache:false,
			success:function(data){
				$.each(data, function(param, val){
					if(param == "network.ldap.status"){
						if(val[1] == "failed"){
							alert("Invalid User ID or Password.");
						} else {
							setTimeout(function(){
								$.fn._localLogin(user, passwd);
							}, 4000);
						}
					}
				});
			},
			error:function(xhr, textStatus, errorThrown){
			},
			complete:function(){
			}
		});
	};

	$.fn._identifyBrowser = function()
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
        }
    };

    $.fn._redirect = function()
    {
    	setTimeout(function(){
    		window.location.href = "/www/index.html";
    	}, 50);
    };

})(jQuery);