(function($)
{
	var check_thread
    , pc_time_thread = ""
    , server_time_thread = ""
    , lens_thread = ""
	, query_param = ""
	, stop = -1
    , IP_regex = "^(22[0-3]|2[0-2][0-3]|1[0-9][0-9]|[0-9][0-9]|[1-9])(\.(25[0-5]|2[0-b4][0-9]|1[0- 9][0-9]|[0-9]{1,2})){3}$"
    , IP_regex_Max = "^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})){3}$"
    , Rtsp_multi_addr_regex ="^(23[0-9]|2[0-3][0-9]|1[0-9][0-9]|[0-9][0-9]|[1-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})){2}(\.(25[0-4]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2}))$"
    , Host_name_regex = /^\s*[a-zA-Z0-9,\s._-]+\s*$/
    , Date_regex = /^(19|20)\d\d[\/]([1-9]|0[1-9]|1[012])[\/]([1-9]|0[1-9]|[12][0-9]|3[01])$/
    , Time_regex = /^(?:2[0-3]|[01]?[0-9]):([0-5][0-9]|[0-9]):([0-5][0-9]|[0-9])$/
    , Time_regex_without_sec = /^(?:2[0-3]|[01]?[0-9]):([0-5][0-9]|[0-9])$/
    , Letter_regex = /([A-Z][A-Z])/
    , Mail_regex = new RegExp('^[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$', 'i')
    , Number_regex = /^\s*[0-9]+\s*$/
    , IPv6_regex = /^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$/i
    , RTMP_regex = /^(rtmp)(\:\/\/)+[^\s]/
    , NTP_server_regex = /^\s*[a-zA-Z0-9,._-]+\s*$/
    , RTSP_data = []
    , Account_data = []
    , All_support_res = []
    , ResTable = []
    , ResOptions = []
    , FpsOptions = []
    , ResList = []
    , PrivacyZone_data = []
    , ROI_data = []
    , MotionSch_data = []
    , AlarmSch_data = []
    , Audio_data = []
    , Defocus_data = []
    , Face_data = []
    , Schedule_data = []
    , Tamper_data = []
    , NAS_data = []
    , LoiteringSch_data = []
    , IntrusionSch_data = []
    , LineCrossingSch_data = []
    , AreaCountingSch_data = []
    , DepartureSch_data = []
    , WithDrawnSch_data = []
    , Submit_list = []
    , LT
    , SetupMT = false
    , SetupNAS = false
    , SetupPZ = false
    , SetupROI = false
    , SetupDate = false
    , SetupLens = false
    , SetupObjectCounting = false
    , SetupLoitering = false
    , SetupLineCrossing = false
    , SetupIntrusion = false
    , SetupAreaCounting = false
    , SetupDeparture = false
    , SetupWithDrawn = false
    , SetupVAbasic = false
    , SetupImgBasic = false
    , PlayActivex = false
    , motorized_lens_status = "idle"
    , replace_status = "idle"
    , VW2
    , server_datetime_obj = null
    , lens_obj = null
    , user_modify = 0
    , lens_count = 0
    , replace_count = 0
    , keep_alive
    , chart_color = ["#94d7d9", "#d99694", "#94b5d9", "#d994d7", "#d9b994", "#d99b45", "#94d996", "#9694d9"]
    , Event_type_arr = ["Motion", "Face", "Tamper", "Audio", "Defocus", "Schedule", "Alarm", "Network"]
    , FunParam ={
        "event.sink.recording.stream":"",
        "encode.profile.1.config":"",
        "encode.profile.2.config":"",
        "encode.profile.3.config":"",
        "encode.current_profile_id":""
    }
    , FunName =[
        "playback_str",
        "str_1_config",
        "str_2_config",
        "str_3_config",
        "cur_id"
    ]
    , FunData
    , record_coordinate = [
            /* privacy_zone */      ["0,0,0,0", "0,0,0,0", "0,0,0,0", "0,0,0,0", "0,0,0,0", "0,0,0,0", "0,0,0,0", "0,0,0,0"], 
            /* roi */               ["0,0,0,0", "0,0,0,0"],
            /* motion */            ["0,0,0,0", "0,0,0,0", "0,0,0,0", "0,0,0,0"],
            /* line_counting */     ["0,0,0,0", "0,0,0,0", "0,0,0,0"],
            /* loitering */         ["0,0"],
            /* intrusion */         ["0,0"],
            /* border_line */       ["0,0,0,0", "0,0,0,0", "0,0,0,0"],
            /* area counting */     ["0,0"],
            /* departure */         ["0,0"],
            /* withdrawn */         ["0,0,0,0", "0,0,0,0", "0,0,0,0"]
        ]
    , set_action = false
    , rs485 = false
	;

    /* common callback function */
	$.fn._runBlockUIwithoutView = function(mainScript, subScript)
	{
		$.blockUI({
			message:'<div style=\"text-align:center;font-size:14pt;color:white;font-family:Arial;\">'+mainScript+'</div>'+
                    '<div style=\"font-size:12pt;color:white;text-align:center;font-family:Arial;\">'+
                        '<span id=\"IblockUI_subscript\">'+subScript+'</span>'+
                        '<img src=\"/css/images/spinner.gif\" />'+
                    '</div>',
            css:{
                width:'600px',
                backgroundColor:"rgba(192,192,192,0.5)"
            },
            forceIframe: true
        });
	};

    $.fn._runBlockUIwithView = function(mainScript, subScript)
    {
        $.blockUI({
            message:'<div style=\"text-align:center;font-size:14pt;color:white;font-family:Arial;\">'+mainScript+'</div>'+
                    '<div style=\"font-size:12pt;color:white;text-align:center;font-family:Arial;\">'+
                        '<span id=\"IblockUI_subscript\">'+subScript+'</span>'+
                        '<img src=\"/css/images/spinner.gif\" />'+
                    '</div>',
            css:{
                width:'400px',
                backgroundColor:"rgba(192,192,192,0.5)"
            }
        });
    };

    $.fn._runUnBlockUI = function()
    {
        setTimeout($.unblockUI, 500);
    };

	$.fn._runListen = function()
	{
		stop = 0;
        check_thread = setInterval($.fn._runPollingThread, 1000);
	};

	$.fn._runPollingThread = function()
	{
        var tmp = "{\""+query_param+"\":\"\"}"
        , db = $.parseJSON(tmp)
        ;
		$.ajax({
            beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
            url:'/cgi-bin/get?',
            dataType:'json',
            type:'POST',
            data:db,
            cache:false,
            success:function(data){
                $.each(data, function(param, value){
                    if(param == query_param && param == "system.upgrade.status"){
                        if(value[1] == "upload")
                        	$("#IblockUI_subscript")[0].innerHTML = $.fn.GetLangStr(LT._FM_uploading);
                        else if(value[1] == "uncompressing")
                        	$("#IblockUI_subscript")[0].innerHTML = $.fn.GetLangStr(LT._FM_uncompress);
                        else if(value[1] == "checking")
                        	$("#IblockUI_subscript")[0].innerHTML = $.fn.GetLangStr(LT._FM_checking);
                        else if(value[1] == "installing")
                        	$("#IblockUI_subscript")[0].innerHTML = $.fn.GetLangStr(LT._FW_installing);
                        else if(value[1] == "ok")
                        {
                            $.fn._runProgressbar($.fn.GetLangStr(LT._FW_success), "");
                        	stop = 1;
                        }
						else if(value[1] == "fail")
						{
                        	$.fn._runProgressbar($.fn.GetLangStr(LT._FW_fail), "");
                        	stop = 1;
                        }
                    } else if(param == query_param && param == "network.ieee8021x.eap-md5.status"){
                        if(value[1] == "ok" || value[1] == "fail"){
                            $("#Span_network_ieee8021x_eap_md5_status")[0].innerHTML = value[1];
                            $.fn._runUnBlockUI();
                            stop = 1;
                        }
                    } else if(param == query_param && param == "network.ieee8021x.eap-peap.status"){
                        if(value[1] == "ok" || value[1] == "fail"){
                            $("#Span_network_ieee8021x_eap_peap_status")[0].innerHTML = value[1];
                            $.fn._runUnBlockUI();
                            query_param = "network.ieee8021x.eap-peap.ca_file_status";
                            $.fn._runGetCaFileStatus();
                            stop = 1;
                        }
                    } else if(param == query_param && param == "network.ieee8021x.eap-ttls.status"){
                        if(value[1] == "ok" || value[1] == "fail"){
                            $("#Span_network_ieee8021x_eap_peap_status")[0].innerHTML = value[1];
                            $.fn._runUnBlockUI();
                            query_param = "network.ieee8021x.eap-ttls.ca_file_status";
                            $.fn._runGetCaFileStatus();
                            stop = 1;
                        }
                    } else if(param == query_param && param == "network.ssl.self-signed.status"){
                        if(value[1] == "ok" || value[1] == "fail"){
                            $.fn._runUpdateSSLCertificate(value[1]);
                            stop = 1;
                        }
                    } else if(param == query_param && param == "network.ssl.csr.status"){
                        if(value[1] == "ok" || value[1] == "fail"){
                            $.fn._runDownloadCertFile();
                            stop = 1;
                        }
                    } else if(param == query_param && param == "network.ssl.install_cert.status"){
                        if(value[1] == "ok" || value[1] == "fail"){
                            $.fn._runUpdateSSLCertificate(value[1]);
                            stop = 1;
                        }
                    } else if(param == query_param && param == "event.sink.sound.1.status"){
                        if(value[1] == "ok" || value[1] == "fail"){
                            $.fn._runUpdateSoundStatus("1", value[1]);
                            stop = 1;
                        }
                    } else if(param == query_param && param == "event.sink.sound.2.status"){
                        if(value[1] == "ok" || value[1] == "fail"){
                            $.fn._runUpdateSoundStatus("2", value[1]);
                            stop = 1;
                        }
                    } else if(param == query_param && param == "event.sink.sound.3.status"){
                        if(value[1] == "ok" || value[1] == "fail"){
                            $.fn._runUpdateSoundStatus("3", value[1]);
                            stop = 1;
                        }
                    } else if(param == query_param && param == "event.sink.sound.4.status"){
                        if(value[1] == "ok" || value[1] == "fail"){
                            $.fn._runUpdateSoundStatus("4", value[1]);
                            stop = 1;
                        }
                    } else if(param == query_param && param == "event.sink.sound.5.status"){
                        if(value[1] == "ok" || value[1] == "fail"){
                            $.fn._runUpdateSoundStatus("5", value[1]);
                            stop = 1;
                        }
                    } else if(param == query_param && param == "event.sink.sound.6.status"){
                        if(value[1] == "ok" || value[1] == "fail"){
                            $.fn._runUpdateSoundStatus("6", value[1]);
                            stop = 1;
                        }
                    } else if(param == query_param && param == "event.sink.sound.7.status"){
                        if(value[1] == "ok" || value[1] == "fail"){
                            $.fn._runUpdateSoundStatus("7", value[1]);
                            stop = 1;
                        }
                    } else if(param == query_param && param == "event.sink.sound.8.status"){
                        if(value[1] == "ok" || value[1] == "fail"){
                            $.fn._runUpdateSoundStatus("8", value[1]);
                            stop = 1;
                        }
                    } else if(param == query_param && param == "event.sink.sound.9.status"){
                        if(value[1] == "ok" || value[1] == "fail"){
                            $.fn._runUpdateSoundStatus("9", value[1]);
                            stop = 1;
                        }
                    } else if(param == query_param && param == "event.sink.sound.10.status"){
                        if(value[1] == "ok" || value[1] == "fail"){
                            $.fn._runUpdateSoundStatus("10", value[1]);
                            stop = 1;
                        }
                    } else if(param == query_param && param == "image.info.white_balance.one_push_status"){
                        if(value[1] == "done"){
                            $.fn._runUpdateWhiteBalance();
                            stop = 1;
                        }
                    } else if(param == query_param && param == "system.configuration.import_status"){
                        if(value[1] == "ok" || value[1] == "fail"){
                            var cmd = "system.reboot" + "="+ Math.random();
                            $.fn._runSetWithoutBlockUI(cmd);
                            if(value[1] == "fail")
                                $.fn._runBlockUIwithoutView($.fn.GetLangStr(LT._Import_fail), $.fn.GetLangStr(LT._Please_search_ip));
                            else if(value[1] == "ok")
                                $.fn._runBlockUIwithoutView($.fn.GetLangStr(LT._Import_successful), $.fn.GetLangStr(LT._Please_search_ip));
                            setTimeout($.fn._runCloseWindow, 10000);
                            stop = 1;
                        }
                    } else if(param == query_param && param == "event.sink.sdcard.1.format_status"){
                        if(value[1] == "done"){
                            $.fn._updateSDCard();
                            stop = 1;
                        }
                    } else if(param == query_param && param == "network.ldap.status"){
                        if(value[1] == "success" || value[1] == "failed"){
                            if(value[1] == "failed")
                                $("#Inetwork_ldap_search_note").show();
                            else if(value[1] == "success")
                                $("#Inetwork_ldap_search_note").hide();
                            $.fn._runSetWithoutBlockUI("network.ldap.status=none");
                            $.fn._runUnBlockUI();
                            stop = 1;
                        }
                    } else if(param == query_param && param == "system.configuration.cleanup_event_db_status"){
                        if(value[1] == "ok" || value[1] == "fail"){
                            $.fn._runSetWithoutBlockUI("system.configuration.cleanup_event_db_status=none");
                            $.fn._updateEventDB();
                            stop = 1;
                        }
                    }
                });
                if(stop)
                    clearInterval(check_thread);
            },
            error:function(xhr, textStatus, errorThrown){
            },
            complete:function(){
                $.removeCookie('ipcamera', { path: '/' });
            }
        });
	};

    $.fn._runPollingLensThread = function()
    {
        var Lens = new Manager();
        function Manager(){
            var callback = (function(s){
                return function() { s._callback(); };
            })(this);

            var parser = (function(s){
                return function(d) { s._parser(d); };
            })(this);

            this._parser = function(data){
                $.each(data, function(param, value){
                    if(param == "motorized_lens.info.ctrl_status"){
                        if(value[1] == "done"){
                            set_action = true;
                            $.fn._runSetWithoutBlockUI("motorized_lens.info.ctrl_status=idle");
                            $.fn._runUpdateLens();
                            lens_count = 0;
                        } else if(value[1] == "moving"){
                            if(lens_count >= keep_alive){
                                clearTimeout(lens_thread);
                                lens_thread = "";
                                lens_count = 0;
                                $.fn._runUnBlockUI();
                                return true;
                            }

                            if(user_modify == 1){
                                user_modify = 0;
                            } else if(user_modify == 0){
                                if((motorized_lens_status != value[1]) && ($(".blockUI").attr("style") == undefined))
                                    $.fn._runBlockUIwithView($.fn.GetLangStr(LT._Please_wait), $.fn.GetLangStr(LT._System_loading));
                            }
                            lens_count++;
                        }

                        // update motorized status
                        motorized_lens_status = value[1];
                    } else if(param == "motorized_lens.cs_mount.replace_status"){
                        if(value[1] == "done" || value[1] == "error"){
                            set_action = true;
                            $.fn._runSetWithoutBlockUI("motorized_lens.cs_mount.replace_status=idle");
                            $.fn._runUpdateLensType();
                            replace_count = 0;
                        } else if(value[1] == "operate"){
                            if(replace_count >= keep_alive){
                                clearTimeout(lens_thread);
                                lens_thread = "";
                                replace_count = 0;
                                $.fn._runUnBlockUI();
                                return true;
                            }

                            if(user_modify == 1){
                                user_modify = 0;
                            } else if(user_modify == 0){
                                if((replace_status != value[1]) && ($(".blockUI").attr("style") == undefined))
                                    $.fn._runBlockUIwithView($.fn.GetLangStr(LT._Please_wait), $.fn.GetLangStr(LT._System_loading));
                            }
                            replace_count++;
                        }
                        // update replace status
                        replace_status = value[1];
                    }
                });
                data = null;
            };

            this._callback = function(){
                lens_obj = $.ajax({
                    beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
                    url:'/cgi-bin/get?',
                    type:'POST',
                    data:{ "motorized_lens.info.ctrl_status":"","motorized_lens.cs_mount.replace_status":"" },
                    cache:false,
                    success:function(data){
                        if (lens_obj !== null) {
                            lens_obj.onreadystatechange = parser(data);
                            lens_obj.abort = null;
                            lens_obj = null;
                            data = null;
                        }
                    },
                    complete:function(){
                        if(!set_action)
                            $.removeCookie('ipcamera', { path: '/' });
                        if(lens_thread != ""){
                            lens_thread = null;
                            lens_thread = setTimeout(callback, 1000);
                        } else
                            lens_thread = setTimeout(callback, 1000);
                    }
                });
            };
        };
        Lens._callback();
    };

	$.fn._runRedirect = function()
	{
		var url = new Array(), ip = new Array();
        url = document.URL.split("//");
        ip = url[1].split("/");
        window.location.href = url[0]+"//"+ip[0]+"/login/login.html";
	};

    $.fn._runProgressbar = function(description, direct_ip)
    {
        $("#IblockUI_subscript").parent().remove();
        var c_ind = 0
        ,pro_w = 0
        ,run_thred
        ,url = new Array()
        ,ip = new Array()
        ,href
        ,platform = $.fn.GetPlatForm()
        ,update_timer = 166
        ;
        url = document.URL.split("//");
        ip = url[1].split("/");
        if(direct_ip == "")
            href = url[0]+"//"+ip[0]+"/login/login.html";
        else
            href = url[0]+"//"+direct_ip+"/login/login.html";

        $("<div style=\"margin:0px auto;width:600px;\">"+
            "<div style=\"padding:0px 0px;margin:5px 0px;height:20px;color:white;width:100%;text-align:center;\">"+
                "<span>"+description+"</span>"+
            "</div>"+
            "<div class=\"progressblock\" style=\"width:600px;\">"+
                "<div class=\"progress\">"+
                    "<div style=\"margin-left:auto;margin-right:auto;height:32px\" id=\"progress_text\">"+
                        "<div style=\"padding-top:7px;\">"+
                            "<font color=\"white\"><span id=\"progress_num\"></span></font>"+
                        "</div>"+
                    "</div>"+
                "</div>"+
                "<div style=\"width:600px;\">"+
                    "<div style=\"float:left;\"><span>0%</span></div>"+
                    "<div style=\"float:right;\"><span>100%</span></div>"+
                "</div>"+
            "</div>"+
        "</div>").appendTo($(".blockPage"));
        if(platform == "s2")
            update_timer = 83;
        run_thred = setInterval(function(){
            if(c_ind >= 601){
                clearInterval(run_thred);
                alert($.fn.GetLangStr(LT._Reboot_complete));
                $.fn._runCloseWindow();
            }
            else
            {
                // The increase step equals 4px at every 200m sec.
                $(".progress").css("width",pro_w+"px");
                $("#progress_text").css("width",pro_w+"px");
                if(c_ind % 6 == 0)
                    $("#progress_num")[0].innerHTML = (c_ind/6)+"%";

                if(platform == "s2")
                    pro_w = pro_w + 2;
                else
                    pro_w = pro_w + 1;
            }

            if(platform == "s2")
                c_ind = c_ind + 2;
            else
                c_ind = c_ind + 1;

        }, update_timer); 
    };

    $.fn._runSetWithoutBlockUI = function(url)
    {
        $.ajax({
            beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
            url:'/cgi-bin/set?'+url,
            dataType:'json',
            cache:false,
            success:function(data){
                $.fn._runUpdateDefaultValue(data);
            },
            complete:function(){
                $.removeCookie('ipcamera', { path: '/' }); 
            }
        });
    };

    $.fn._runSetWithoutBlockUIbyPost = function(db, callback)
    {
        $.ajax({
            beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
            url:'/cgi-bin/set?',
            dataType:'json',
            type:'POST',
            data:db,
            cache:false,
            success:function(data){
                $.fn._runUpdateDefaultValue(data);
            },
            error:function(xhr, textStatus, errorThrown){
            },
            complete:function(){
                $.removeCookie('ipcamera', { path: '/' });
                $.fn.setModify(0);
                callback();
            }
        });
    };

    $.fn._runSetWithBlockUI = function(db, callback)
    {
        $.fn._runBlockUIwithoutView($.fn.GetLangStr(LT._Please_wait), $.fn.GetLangStr(LT._System_loading));
        $.ajax({
            beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
            url:'/cgi-bin/set?',
            dataType:'json',
            type:'POST',
            data:db,
            cache:false,
            success:function(data){
                $.fn._runUpdateDefaultValue(data);
            },
            error:function(xhr, textStatus, errorThrown){
            },
            complete:function(){
                $.removeCookie('ipcamera', { path: '/' });
                $.fn.setModify(0);
                callback();
            }
        });
    };

    $.fn._runSetWithBlockUIWithView = function(db, callback)
    {
        $.fn._runBlockUIwithView($.fn.GetLangStr(LT._Please_wait), $.fn.GetLangStr(LT._System_loading));
        $.ajax({
            beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
            url:'/cgi-bin/set?',
            dataType:'json',
            type:'POST',
            data:db,
            cache:false,
            success:function(data){
                $.fn._runUpdateDefaultValue(data);
            },
            error:function(xhr, textStatus, errorThrown){
            },
            complete:function(){
                $.removeCookie('ipcamera', { path: '/' });
                $.fn.setModify(0);
                callback();
            }
        });
    };

    $.fn._runReboot = function(url, target_ip)
    {
        $.fn._runBlockUIwithoutView($.fn.GetLangStr(LT._Please_wait), $.fn.GetLangStr(LT._System_loading));
        $.ajax({
            beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
            url:'/cgi-bin/set?'+url,
            dataType:'json',
            cache:false,
            success:function(data){
                $.fn._runProgressbar($.fn.GetLangStr(LT._Camera_rebooting), target_ip);
            },
            error:function(xhr, textStatus, errorThrown){
            },
            complete:function(){
                $.removeCookie('ipcamera', { path: '/' });
            }
        });
    };

    $.fn._runGetCaFileStatus = function()
    {
        var tmp = "{\""+query_param+"\":\"\"}"
        , db = $.parseJSON(tmp)
        ;
        $.ajax({
            beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
            url:'/cgi-bin/get?',
            dataType:'json',
            type:'POST',
            data:db,
            cache:false,
            success:function(data){
                $.each(data, function(param, val){
                    if(param == "network.ieee8021x.eap-peap.ca_file_status")
                        $("#Span_network_ieee8021x_eap_peap_status")[0].innerHTML = val[1];
                    else if(param == "network.ieee8021x.eap-ttls.ca_file_status")
                        $("#Span_network_ieee8021x_eap_ttls_status")[0].innerHTML = val[1];
                });
            },
            error:function(xhr, textStatus, errorThrown){
                $.removeCookie('ipcamera', { path: '/' });
            },
            complete:function(){
                $.removeCookie('ipcamera', { path: '/' });
            }
        });
    };

    $.fn._runCheckLength = function(src)
    {
        var len = src.replace(/[^\x00-\xff]/g,"rr").length;
        return len;
    };

    $.fn._runModifyActivexStatus = function(flag)
    {
        PlayActivex = flag;
    };

    $.fn._runRefreshPCTime = function()
    {
        var td = new Date();
        var yyyy = "", md = "", dd ="", hh = "", mm = "", ss = "";
        
        if(eval(td.getFullYear()) <= 1000)
            yyyy = "0"+td.getFullYear();
        else
            yyyy = td.getFullYear();
        
        if(eval(td.getMonth()+1) <= 9)
            md = "0"+eval(td.getMonth()+1);
        else
            md = eval(td.getMonth()+1);
        
        if(eval(td.getDate()) <= 9)
            dd = "0"+td.getDate();
        else
            dd = td.getDate();
        
        if(eval(td.getHours()) <= 9)
            hh = "0"+td.getHours();
        else
            hh = td.getHours();
        
        if(eval(td.getMinutes()) <= 9)
            mm = "0"+td.getMinutes();
        else
            mm = td.getMinutes();
        
        if(eval(td.getSeconds()) <= 9)
            ss = "0"+td.getSeconds();
        else
            ss = td.getSeconds();
        
        $("#Isystem_date_by_pc").val(yyyy+"/"+md+"/"+dd);
        $("#Isystem_time_by_pc").val(hh+":"+mm+":"+ss);
        td = null, yyyy = null, md = null, dd =null, hh = null, mm = null, ss = null;
        pc_time_thread = setTimeout($.fn._runRefreshPCTime, 1000);
    };

    $.fn._runGetPCTime = function()
    {
        var td = new Date();
        var yyyy = "", md = "", dd ="", hh = "", mm = "", ss = "";
        
        if(eval(td.getFullYear()) <= 1000)
            yyyy = "0"+td.getFullYear();
        else
            yyyy = td.getFullYear();
        
        if(eval(td.getMonth()+1) <= 9)
            md = "0"+eval(td.getMonth()+1);
        else
            md = eval(td.getMonth()+1);
        
        if(eval(td.getDate()) <= 9)
            dd = "0"+td.getDate();
        else
            dd = td.getDate();
        
        if(eval(td.getHours()) <= 9)
            hh = "0"+td.getHours();
        else
            hh = td.getHours();
        
        if(eval(td.getMinutes()) <= 9)
            mm = "0"+td.getMinutes();
        else
            mm = td.getMinutes();
        
        if(eval(td.getSeconds()) <= 9)
            ss = "0"+td.getSeconds();
        else
            ss = td.getSeconds();

        return yyyy+"/"+md+"/"+dd+" "+hh+":"+mm+":"+ss;
    };
    
    $.fn._runUpdateServerTime = function()
    {
        var ServerTime = new Manager();
        function Manager(){
            var callback = (function(s){
                return function() { s._callback(); };
            })(this);

            var parser = (function(s){
                return function(d) { s._parser(d); };
            })(this);

            this._parser = function(data){
                $.each(data, function(param, val){
                    if(param == "system.datetime.current_server_time")
                        $("#Isystem_current_time").val(val[1]);
                });
                data = null;
            };

            this._callback = function(){
                server_datetime_obj = $.ajax({
                    beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
                    url:'/cgi-bin/get?',
                    type:'POST',
                    data:{ "system.datetime.current_server_time":"" },
                    cache:false,
                    success:function(data){
                        if (server_datetime_obj !== null) {
                            server_datetime_obj.onreadystatechange = parser(data);
                            server_datetime_obj.abort = null;
                            server_datetime_obj = null;
                            data = null;
                        }
                    },
                    complete:function(){
                        $.removeCookie('ipcamera', { path: '/' });
                        if(server_time_thread != ""){
                            server_time_thread = null;
                            server_time_thread = setTimeout(callback, 1000);
                        } else
                            server_time_thread = setTimeout(callback, 1000);
                    }
                });
            };
        };
        ServerTime._callback();
    };

    $.fn._runParserHeader = function()
    {
        var URL = new Array();
        var parer_header = null;
        URL = document.URL.split('//');
        parer_header = URL[0];

        URL = null;
        return parer_header;
    };

    $.fn._runCloseWindow = function()
    {
        /* window close method for IE */
        if($.fn.DetectBrowser() == "msie"){
            parent.window.close();
        } else { /* window close method for other browser, except FF */
            var href = parent.window.location.href;
            parent.window.open(href,"_self","");
            parent.window.close();
        }
    };

    $.fn._runRes2int = function(res_str)
    {
        if (res_str == "" || res_str == null) {
            return 0;
        }
        var res = res_str.split("x");
        if (res.length != 2) { 
            //console.log("incorrect resolution format: "+res_str);
            return 0;
        }
        var w = parseInt(res[0], 10);
        var h = parseInt(res[1], 10);
        if (isNaN(w) || isNaN(h)) {
            console.log("incorrect resolution format: "+res_str);
            return 0;
        }
        return w*h; 
    };

    $.fn._runInsertionSort = function(array, compare)
    {
        if (!$.isArray(array) || array.length < 2) {
            return array;
        }
        var swap = function (array, first, second) {
        var temp = array[first];
        array[first] = array[second];
        array[second] = temp;
            return array;
        };
        if (typeof compare !== 'function') {
            compare = function (a, b) {
                return a > b ? 1 : -1;
            };
        }
        var i, j;
        for (i = 1; i < array.length; i++) {
            j = i;
            while ((j - 1) >= 0 && compare(array[j], array[j - 1]) < 0) {
                swap(array, j, j-1);
                j--;
            }
        }
        return array;
    };

    $.fn._runChecking = function(check_black)
    {
        var invalid_status = false, modify_status = false;
        $("div[conf="+check_black+"] input[type=text], div[conf="+check_black+"] input[type=password]").each(function(){
            if($(this).attr("class") != undefined){
                if($(this).attr("class").search("invalid_modify") != -1){
                    invalid_status = true;
                    return true;
                }
            }
        });

        $("div[conf="+check_black+"] input[type=text], div[conf="+check_black+"] input[type=password], div[conf="+check_black+"] input[type=checkbox], div[conf="+check_black+"] select, div[conf="+check_black+"] textarea").each(function(){
            if($(this).attr("class") != undefined){
                if($(this).attr("class").search("modify") != -1){
                    modify_status = true;
                    return true;
                }
            }
        });

        // specific checking
        if(check_black == "sub_encode"){
            $("div[conf="+check_black+"] select").each(function(){
                if($(this).attr("class") != undefined){
                if($(this).attr("class").search("invalid_modify") != -1){
                    modify_status = false;
                    return true;
                }
            }
            });
        }

        // console.log(invalid_status+","+modify_status);
        if(invalid_status)
        {
            $.fn.setModify(1);
            $("#Save_I"+check_black).removeClass("can_modify").addClass("not_modify");
        }
        else
        {
            if(modify_status){
                $.fn.setModify(1);
                $("#Save_I"+check_black).removeClass("not_modify").addClass("can_modify");
            } else {
                $.fn.setModify(0);
                $("#Save_I"+check_black).removeClass("can_modify").addClass("not_modify");
            }
        }       
    };

    $.fn._runCheckingWithoutGrayButton = function(check_black)
    {
        var modify_status = false;
        $("div[conf="+check_black+"] input[type=text], div[conf="+check_black+"] input[type=password], div[conf="+check_black+"] input[type=checkbox], div[conf="+check_black+"] select, div[conf="+check_black+"] textarea").each(function(){
            if($(this).attr("class") != undefined){
                if($(this).attr("class").search("modify") != -1){
                    modify_status = true;
                    return true;
                }
            }
        });

        if(modify_status){
            $.fn.setModify(1);
        } else {
            $.fn.setModify(0);
        }       
    };

    $.fn._runCheckingSch = function()
    {
       var invalid_status = false, modify_status = false;
        $("#Isch_table input[type=text]").each(function(){
            if($(this).attr("class") != undefined){
                if($(this).attr("class").search("invalid_modify") != -1){
                    invalid_status = true;
                    return true;
                }
            }
        });

        $("#Isch_table input[type=text], #Isch_table input[type=checkbox]").each(function(){
            if($(this).attr("class") != undefined){
                if($(this).attr("class").search("modify") != -1){
                    modify_status = true;
                    return true;
                }
            }
        });

        if(invalid_status)
        {
            $.fn.setModify(1);
            $("#Isch_setting").removeClass("can_modify").addClass("not_modify");
        }
        else
        {
            if(modify_status){
                $.fn.setModify(1);
                $("#Isch_setting").removeClass("not_modify").addClass("can_modify");
            } else {
                $.fn.setModify(0);
                $("#Isch_setting").removeClass("can_modify").addClass("not_modify");
            }
        }
    };

    $.fn._runModifyUapiName = function(block_id, replace_val, skip_name)
    {
        var tmp = "";
        $("#"+block_id+" select").each(function(){
            if($(this).attr("name") != undefined && $(this).attr("name").search("%s") != -1){
                var tmp = $(this).attr("name").replace("%s", replace_val);
                $(this).attr("tmp_name", tmp);
            }
        });

        $("#"+block_id+" input[type='text']").each(function(){
            if($(this).attr("name") != undefined && $(this).attr("name").search("%s") != -1){
                var tmp = $(this).attr("name").replace("%s", replace_val);
                $(this).attr("tmp_name", tmp);
            }
        });

        // send the request to query current profile of paramter.
        $("#"+block_id+" select").each(function(){
            if($(this).attr("tmp_name") != undefined && $(this).attr("tmp_name") != skip_name)
                tmp += "\""+$(this).attr("tmp_name")+"\":\"\",";
        });

        $("#"+block_id+" input[type='text']").each(function(){
            if($(this).attr("tmp_name") != undefined && $(this).attr("tmp_name") != skip_name)
                tmp += "\""+$(this).attr("tmp_name")+"\":\"\",";
        });

        tmp = tmp.slice(0, tmp.length-1);
        return tmp;
    };

    $.fn._runUpdateDefaultValue = function(data)
    {
        var uapivalue = "";
        $.each(data, function(param, val){
            if (val[0].match("^ok") == "ok") {
                try {
                    uapivalue = decodeURIComponent(val[1]);
                } catch(e) {
                    uapivalue = val[1];
                }

                try {
                    $("[tmp_name='"+param+"'], [name='"+param+"']").attr("de_val", uapivalue);
                } catch (e){
                    console.log("_runUpdateDefaultValue["+param+"] occur exception.");
                }
            }
        });
    };

    $.fn._runUpdateSSLCertificate = function(mode)
    {
        var tmp = ""
        , cmd = ""
        ;
        var upcmd = function(db){
            $.ajax({
                beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
                url:'/cgi-bin/get?',
                dataType:'json',
                type:'POST',
                data:db,
                cache:false,
                success:function(data){
                    $.fn.ParserDate("Isub_ssl", data);
                },
                complete:function(){
                    $.removeCookie('ipcamera', { path: '/' });
                    if(mode == "ok"){
                        if($("#Inetwork_ssl_info_common_name").val() == "")
                            $("#Mnetwork_ssl_certificate_info").parent().hide();
                        else
                        {
                            $("#Mnetwork_ssl_certificate_info").parent().show();
                            $("#Issl_failed_message").hide();
                            $("#Inetwork_ssl_info_common_name,"+
                                "#Inetwork_ssl_info_organization,"+
                                "#Inetwork_ssl_info_country,"+
                                "#Inetwork_ssl_info_location,"+
                                "#Inetwork_ssl_info_start_date,"+
                                "#Inetwork_ssl_info_end_date").change();
                        }
                    } else if(mode == "fail"){
                        $("#Mnetwork_ssl_certificate_info").parent().show();
                        $("#Issl_failed_message").show();
                        $("#Mssl_failed_message")[0].innerHTML = $.fn.GetLangStr(LT._Upload_cert_file_fail);
                        $("#Issl_failed_message").siblings("table").hide();
                    }

                    $.fn._runUnBlockUI();
                }
            });
        };

        $("#Isub_ssl input[type=text]").each(function(){
            if($(this).attr("name") != undefined && $(this).attr("name").search("%s") == -1){
                tmp += "\""+$(this).attr("name")+"\":\"\",";
            }
        });

        cmd = "{"+tmp.slice(0, tmp.length-1)+"}";
        var db = $.parseJSON(cmd);
        upcmd(db);
    };

    $.fn._runUpdateSoundStatus = function(target_id, flag)
    {
        var db = $.parseJSON("{\"event.sink.sound."+target_id+".file_status\":\"\"}");
        var hasfound = -1;
        var upcmd = function(db){
            $.ajax({
                beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
                url:'/cgi-bin/get?',
                dataType:'json',
                type:'POST',
                data:db,
                cache:false,
                success:function(data){
                    $.each(data, function(param, val){
                        if(param == "event.sink.sound."+target_id+".file_status"){
                            $("#Ievent_sound_"+target_id+"_status")[0].innerHTML = val[1];
                            if(val[1] == "installed")
                                $("#Ievent_sound_"+target_id+"_delete").removeClass("not_modify_without_float").addClass("can_modify_without_float");
                        }
                    });
                },
                complete:function(){
                    $.removeCookie('ipcamera', { path: '/' });

                    if(flag == "fail")
                        $("#Fevent_handler_sound_"+target_id).addClass("invalid_modify");
                    else
                        $("#Ievent_handler_sound_"+target_id+"_file_name")[0].innerHTML = "";

                    $.each(Submit_list, function(n){
                        if(Submit_list[n] != ""){
                            hasfound = n;
                        }
                    });

                    if(hasfound != -1){
                        query_param = "event.sink.sound."+Submit_list[hasfound]+".status";
                        $("#Fevent_handler_sound_"+Submit_list[hasfound]).submit();
                        Submit_list[hasfound] = [];
                    } else
                        $.fn._runUnBlockUI();
                }
            });
        };
        upcmd(db);
    };

    $.fn._runUpdateWhiteBalance = function()
    {
        var db = $.parseJSON("{\"image.info.white_balance.b_gain\":\"\",\"image.info.white_balance.r_gain\":\"\"}");
        var upcmd = function(db){
            $.ajax({
                beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
                url:'/cgi-bin/get?',
                dataType:'json',
                type:'POST',
                data:db,
                cache:false,
                success:function(data){
                    $.each(data, function(param, val){
                        if(param == "image.info.white_balance.b_gain"){
                            $("input[name='image.white_balance.manual.b_gain']").val(val[1]).attr("de_val", val[1]);
                            $("input[name='image.white_balance.manual.b_gain']").change();
                        } else if(param == "image.info.white_balance.r_gain"){
                            $("input[name='image.white_balance.manual.r_gain']").val(val[1]).attr("de_val", val[1]);
                            $("input[name='image.white_balance.manual.r_gain']").change();
                        }
                    });
                },
                complete:function(){
                    $.removeCookie('ipcamera', { path: '/' });
                    $.fn._runUnBlockUI();
                }
            });
        };
        upcmd(db);
    };

    $.fn._runUpdateLens = function()
    {
        var db = $.parseJSON("{\"motorized_lens.focus.info.position\":\"\",\"motorized_lens.zoom.info.position\":\"\"}");
        var tmp = "";
        var upcmd = function(db){
            $.ajax({
                beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
                url:'/cgi-bin/get?',
                dataType:'json',
                type:'POST',
                data:db,
                cache:false,
                success:function(data){
                    $.each(data, function(param, val){
                        if(param == "motorized_lens.focus.info.position"){
                            $("input[name='"+param+"']").val(val[1]).attr("de_val", val[1]);
                            $("input[name='"+param+"']").change();
                        } else if(param == "motorized_lens.zoom.info.position"){
                            $("input[name='"+param+"']").val(val[1]).attr("de_val", val[1]);
                            $("input[name='"+param+"']").change();
                        }
                    });
                },
                complete:function(){
                    $.removeCookie('ipcamera', { path: '/' });
                    $.fn._runUnBlockUI();
                    set_action = false;
                }
            });
        };
        upcmd(db);
    };

    $.fn._runUpdateLensType = function()
    {
        var db = $.parseJSON("{\"motorized_lens.cs_mount.replace_action\":\"\",\"image.info.exposure.iris.p_iris\":\"\",\"image.info.exposure.iris.type\":\"\"}");
        var tmp = "";
        var upcmd = function(db){
            $.ajax({
                beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
                url:'/cgi-bin/get?',
                dataType:'json',
                type:'POST',
                data:db,
                cache:false,
                success:function(data){
                    $.each(data, function(param, val){
                        if(param == "motorized_lens.cs_mount.replace_action"){
                            $("#Ilens_type > option[value="+val[1]+"]").prop("selected",true).attr("de_val", val[1]);
                        } else if(param == "image.info.exposure.iris.p_iris"){
                            $.fn.SetP_Iris_Level(val[1]);
                        } else if(param == "image.info.exposure.iris.type"){
                            $.fn.SetIrisType(val[1]);
                        }
                    });
                },
                complete:function(){
                    $.removeCookie('ipcamera', { path: '/' });
                    // reset p iris level.
                    if($.fn.GetPlatForm() == "s2" || $.fn.GetPlatForm() == "s2l"){
                        if($.fn.GetIrisType() == "p")
                            $("#Simage_exposure_p_iris_level").attr("_max", $.fn.GetPirisLevel());
                    }
                    // hidden unnecessary iris type.
                    var remove_iris = $.fn.GetIrisType() == "fixed" ? "p_iris,dc_iris" : ($.fn.GetIrisType() == "p" ?  "fixed,dc_iris" : "fixed,p_iris")
                    , tmp = []
                    , ind = -1
                    , iris_type = $.fn.GetIrisType() == "fixed" ? "fixed" : ($.fn.GetIrisType() == "p" ?  "p_iris" : "dc_iris")
                    ;
                    ind = remove_iris.indexOf(",");
                    tmp[0] = remove_iris.slice(0, ind);
                    tmp[1] = remove_iris.slice(ind+1, ind.length);
                    if($.fn.GetPlatForm() == "s2" || $.fn.GetPlatForm() == "s2l"){
                        $("#Isub_exposure select").each(function(){
                            if(
                                $(this).attr("name") != undefined && $(this).attr("name").search(tmp[0]) != -1 ||
                                $(this).attr("name") != undefined && $(this).attr("name").search(tmp[1]) != -1
                            )
                                $(this).parent().parent().hide();
                            else if($(this).attr("name") != undefined && $(this).attr("name").search(iris_type) != -1){
                                $(this).parent().parent().show();
                            }
                        });

                        $("#Isub_exposure input").each(function(){
                             if($(this).attr("name") != undefined && $(this).attr("name").search(tmp[0]) != -1 ||
                                $(this).attr("name") != undefined && $(this).attr("name").search(tmp[1]) != -1)
                                    $(this).parent().parent().parent().parent().hide();
                            else if($(this).attr("name") != undefined && $(this).attr("name").search(iris_type) != -1)
                                $(this).parent().parent().parent().parent().show();
                        });
                    }
                    
                    $.fn._runUnBlockUI();
                    set_action = false;
                }
            });
        };
        upcmd(db);
    };

    $.fn._updateSDCard = function()
    {
        var db = $.parseJSON("{\"event.sink.sdcard.1.capacity\":\"\",\"event.sink.sdcard.1.free_space\":\"\"}");
        var tmp = "";
        var upcmd = function(db){
            $.ajax({
                beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
                url:'/cgi-bin/get?',
                dataType:'json',
                type:'POST',
                data:db,
                cache:false,
                success:function(data){
                    $.each(data, function(param, val){
                        if(param == "event.sink.sdcard.1.capacity"){
                            $("#Mevent_sink_sdcard_1_capacity_mesg")[0].innerHTML = (val[1] == "" ? 0 : val[1])+"(MB)";
                        } else if(param == "event.sink.sdcard.1.free_space"){
                            $("#Mevent_sink_sdcard_1_free_space_mesg")[0].innerHTML = (val[1] == "" ? 0 : val[1])+"(MB)";
                        }
                    });
                },
                complete:function(){
                    $.removeCookie('ipcamera', { path: '/' });
                    $.fn._runSetWithoutBlockUI("event.sink.sdcard.1.format_status=none");
                    $.fn._runUnBlockUI();
                }
            });
        };
        upcmd(db);
    };

    $.fn._updateEventDB = function()
    {
        var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
        request = indexedDB.open("EventLogDB", 1);
        request.onsuccess = function(evt){
            var webdb = evt.target.result;
            var customerObjectStore = webdb.transaction("EventLog", "readwrite").objectStore("EventLog");
            customerObjectStore.clear();
            $("#Ievent_db_refresh").click();
            $.fn._runUnBlockUI();
        };
    };

    $.fn._runFormatFloat = function(num, pos)
    {
        var size = Math.pow(10, pos);
        return Math.round(num * size) / size;
    };

    $.fn._runDownloadCertFile = function()
    {
        $("#Inetwork_ssl_generate_method > option[value=install_cert]").prop("selected",true);
        $("#Inetwork_ssl_generate_method").change();
        $("#Inetwork_ssl_request_cert_download").click();
        $.fn._runUnBlockUI();
    };

    $.fn._runNative2Ascii = function(src)
    {
        var ascii = "", code = null;
        code = Number(src.charCodeAt(0));
        if(code>127){
            var charAscii = code.toString(16);
            charAscii=new String("0000").substring(charAscii.length,4)+charAscii;
            ascii+="%5Cu"+charAscii;
        }else
            ascii+=src;
        
        return ascii;
    };

    $.fn._runTansChar = function(src)
    {
        var string = "", code = null, tmp = null;
        var char_list = src.split('');
        var special_character = /^\s*[\s~`!@#$%^&*()-_=\+{}\[\]"'|\\<>,.?\/]+\s*$/;
        $.each(char_list, function(n){
            tmp = char_list[n];
            for(var i = 0; i < tmp.length; i++)
            {
                if(special_character.test(tmp[i]))
                {
                    if(tmp[i].indexOf('\\') != -1)
                        string = string + tmp[i].replace(/[\\]/g, "\\\\");
                    else if(tmp[i].indexOf('"') != -1)
                        string = string + tmp[i].replace(/["]/g, '\\"');
                    else
                        string = string + tmp[i];
                }
                else
                    string = string + tmp[i];   
            }
        });

        return string;
    };

    $.fn._runCollectModifUAPI = function(Target_id)
    {
        var db,
        str = ""
        ;
        $("#"+Target_id+" .modify").each(function(){
            var uapi = $(this).attr("tmp_name") == undefined ? $(this).attr("name") : $(this).attr("tmp_name")
            , value = $.fn._runTansChar($(this).val())
            ;
            str += "\""+uapi+"\":\""+value+"\",";
        });

        str = "{"+ str.slice(0, str.length-1) +"}";
        db = $.parseJSON(str);
        return db;
    };

    $.fn._runTransferCoordinate_ui2Sys = function(from_ui, detect_cur_size)
    {
        var ind = detect_cur_size.indexOf(',')
        , cur_wid = detect_cur_size.slice(0, ind)
        , cur_hei = detect_cur_size.slice(ind+1, detect_cur_size.length)
        , pri_wid = $.fn.GetMediaWidth() < Number(cur_wid) ? Number(cur_wid) : $.fn.GetMediaWidth()
        , pri_hei = $.fn.GetMediaHieght() < Number(cur_hei) ? Number(cur_hei) : $.fn.GetMediaHieght()
        , pri_ratio = $.fn.GetMediaRatio()
        , real_wid = $.fn.GetRealWidth(), real_hei = $.fn.GetRealHeight()
        , platform = $.fn.GetPlatForm(), corridor = $.fn.GetCorridor(), media_type = $.fn.GetMediaType()
        , orientation = $.fn.GetOrientation()
        , swap_tmp = []
        , tmp_coord = from_ui.split(",")
        , s_x, s_y, e_x, e_y
        , tmp_w, tmp_h;
        ;

        // transfer coordinate mapping to corridor.
        if(platform == "xarina_entry"){
            if(corridor == "on" && media_type == "h264"){
                s_x = tmp_coord[1];
                s_y = Number(Math.floor(pri_wid)) - Number(tmp_coord[2]);
                e_x = tmp_coord[3];
                e_y = Number(Math.floor(pri_wid)) - Number(tmp_coord[0]);
                tmp_coord[0] = s_x;
                tmp_coord[1] = s_y;
                tmp_coord[2] = e_x;
                tmp_coord[3] = e_y;
                tmp_w = real_hei;
                tmp_h = real_wid;
            } else {
                tmp_w = real_wid;
                tmp_h = real_hei;
            }
        } else if(platform == "s2" || platform == "s2l"){
            if((corridor == "on" && ((real_hei * real_wid) <= 5038848)) || (corridor == "on" && platform == "s2l")){
                s_x = tmp_coord[1];
                s_y = Number(Math.floor(pri_wid)) - Number(tmp_coord[2]);
                e_x = tmp_coord[3];
                e_y = Number(Math.floor(pri_wid)) - Number(tmp_coord[0]);
                tmp_coord[0] = s_x;
                tmp_coord[1] = s_y;
                tmp_coord[2] = e_x;
                tmp_coord[3] = e_y;
                tmp_w = real_hei;
                tmp_h = real_wid;  
            } else {
                tmp_w = real_wid;
                tmp_h = real_hei;     
            }
        }

        if(orientation == "off"){
            $.each(tmp_coord, function(n){
                if(n == 0 || n == 2)
                    tmp_coord[n] = Math.floor(tmp_coord[n] * real_wid / pri_wid);
                else
                    tmp_coord[n] = Math.floor(tmp_coord[n] * real_hei / pri_hei);
            });
        } else if(orientation == "flip"){
            $.each(tmp_coord, function(n){
                if(n == 0 || n == 2)
                {
                    tmp_coord[n] = Math.floor(tmp_coord[n] * real_wid / pri_wid);
                    swap_tmp[n] = tmp_coord[n];
                }
                else
                {
                    if(n == 1){
                        tmp_coord[n] = Math.floor(tmp_coord[n] * real_hei / pri_hei);
                        swap_tmp[3] = Number(tmp_h) - Number(tmp_coord[n]);
                    } else if(n == 3){
                        tmp_coord[n] = Math.floor(tmp_coord[n] * real_hei / pri_hei);
                        swap_tmp[1] = Number(tmp_h) - Number(tmp_coord[n]);
                    }
                }
            });
            tmp_coord = swap_tmp;
        } else if(orientation == "mirror"){
            $.each(tmp_coord, function(n){
                if(n == 0 || n == 2)
                {
                    if(n == 0){
                        tmp_coord[n] = Math.floor(tmp_coord[n] * real_wid / pri_wid);
                        swap_tmp[2] = Number(tmp_w) - Number(tmp_coord[n]);
                    } else if(n == 2){
                        tmp_coord[n] = Math.floor(tmp_coord[n] * real_wid / pri_wid);
                        swap_tmp[0] = Number(tmp_w) - Number(tmp_coord[n]);
                    } 
                }
                else
                {
                    tmp_coord[n] = Math.floor(tmp_coord[n] * real_hei / pri_hei);
                    swap_tmp[n] = tmp_coord[n];
                }
            });
            tmp_coord = swap_tmp;
        } else if(orientation == "both"){
            $.each(tmp_coord, function(n){
                if(n == 0 || n == 2)
                {
                    if(n == 0){
                        tmp_coord[n] = Math.floor(tmp_coord[n] * real_wid / pri_wid);
                        swap_tmp[2] = Number(tmp_w) - Number(tmp_coord[n]);
                    } else if(n == 2){
                        tmp_coord[n] = Math.floor(tmp_coord[n] * real_wid / pri_wid);
                        swap_tmp[0] = Number(tmp_w) - Number(tmp_coord[n]);
                    }
                }
                else
                {
                    if(n == 1){
                        tmp_coord[n] = Math.floor(tmp_coord[n] * real_hei / pri_hei);
                        swap_tmp[3] = Number(tmp_h) - Number(tmp_coord[n]);
                    } else if(n == 3){
                        tmp_coord[n] = Math.floor(tmp_coord[n] * real_hei / pri_hei);
                        swap_tmp[1] = Number(tmp_h) - Number(tmp_coord[n]);
                    }
                }
            });
            tmp_coord = swap_tmp;
        }

        if((tmp_w != real_wid) && (tmp_h != real_hei))
            return tmp_coord+","+tmp_w+"x"+tmp_h;
        else
            return tmp_coord+","+real_wid+"x"+real_hei;
    };

    $.fn._runTransferCoordinate_Sys2ui = function(from_sys, detect_cur_size)
    {
        var index = detect_cur_size.indexOf(',')
        , cur_wid = detect_cur_size.slice(0, index)
        , cur_hei = detect_cur_size.slice(index+1, detect_cur_size.length)
        , ind = from_sys.lastIndexOf(',')
        , src_data = from_sys.slice(ind+1, from_sys.length), tmp = "", platform = $.fn.GetPlatForm()
        , target_wid = $.fn.GetMediaWidth() < Number(cur_wid) ? Number(cur_wid) : $.fn.GetMediaWidth()
        , target_hei = $.fn.GetMediaHieght() < Number(cur_hei) ? Number(cur_hei) : $.fn.GetMediaHieght()
        , target_ratio = Math.floor(target_wid*100/target_hei)
        , vin_wid = $.fn.GetStreamWidth(), vin_hei = $.fn.GetStreamHeight(), vin_ratio = platform == "xarina_entry" ? vin_wid/vin_hei:$.fn.GetMediaRatio()
        , src_wid, src_hei, src_ratio
        , orientation = $.fn.GetOrientation()
        , swap_tmp = []
        , tmp_coord = from_sys.slice(0, ind).split(",")
        , corridor = $.fn.GetCorridor(), media_type = $.fn.GetMediaType()
        , sensor = $.fn.GetSensor()
        ;
        if(ind == -1)
            return "0,0,0,0";
        tmp = src_data.split("x");
        src_wid = tmp[0], src_hei = tmp[1];
        if(platform == "xarina_entry"){
            var src_target_wid = $.fn.GetRealWidth();
            var src_target_hei = $.fn.GetRealHeight();
            var diff_w = 0;
            var diff_h = 0;
            target_ratio = src_target_wid/src_target_hei;
            src_ratio = src_wid/src_hei;
            if(corridor == "on" && media_type == "h264")
            {
                var t_w = src_target_hei;
                var t_h = src_target_wid;
                src_target_wid = t_w;
                src_target_hei = t_h;
                t_w = target_hei;
                t_h = target_wid;
                target_wid = t_w;
                target_hei = t_h;
                target_ratio = src_target_wid/src_target_hei;
            }
            else
            {
                if(sensor != 4)
                    if ((Number(src_wid) > Number(vin_wid)) || (Number(src_hei) > Number(vin_hei)) ||
                          (Number(src_target_wid) > Number(vin_wid)) || (Number(src_target_hei) > Number(vin_hei))){

                        return "0,0,0,0";
                    }
            }

            // 5M resolution
            if(sensor == 4)
            {
                if ((((src_wid > 2048) || (src_hei > 1536)) && (src_target_wid <= 2048) && (src_target_hei <= 1536)) ||
                (((src_wid <= 2048) && (src_hei <= 1536)) && ((src_target_wid > 2048) || (src_target_hei > 1536))))
                {
                    var wid_5M = 2592
                    , hei_5M = 1944
                    , wid_3M = 2048
                    , hei_3M = 1536
                    ;
                    diff_w = (wid_5M - wid_3M) / 2;
                    diff_h = (hei_5M - hei_3M) / 2;
                    if ((src_wid > wid_5M) || (src_hei > hei_5M) ||
                          (src_target_wid > wid_5M) || (src_target_hei > hei_5M)) {
                         return "0,0,0,0";
                    }

                    if ((src_wid > wid_3M) || (src_hei > hei_3M)) {
                        /* convert to 5M */
                        vin_wid = wid_5M;
                        vin_hei = hei_5M;
                        vin_ratio = vin_wid / vin_hei;
                    } else {
                        /* convert to 2M */
                        vin_wid = wid_3M;
                        vin_hei = hei_3M;
                        vin_ratio = vin_wid / vin_hei;
                    }
                    // src to vin
                    if ((src_wid != vin_wid) || (src_hei != vin_hei)){
                        tmp_coord = $.fn._XEofSrcToVin(tmp_coord, src_wid, src_hei, vin_wid, vin_hei, src_ratio, vin_ratio, target_ratio);
                    }

                    if ((src_target_wid > wid_3M) || (src_target_hei > hei_3M)) {
                        /* convert to 5M */
                        vin_wid = wid_5M;
                        vin_hei = hei_5M;
                        vin_ratio = vin_wid / vin_hei;
                        tmp_coord[0] = Number(tmp_coord[0]) + Number(diff_w);
                        tmp_coord[1] = Number(tmp_coord[1]) + Number(diff_h);
                        tmp_coord[2] = Number(tmp_coord[2]) + Number(diff_w);
                        tmp_coord[3] = Number(tmp_coord[3]) + Number(diff_h);
                    } else {
                        /* convert to 2M */
                        vin_wid = wid_3M;
                        vin_hei = hei_3M;
                        vin_ratio = vin_wid / vin_hei;
                        tmp_coord[0] = Number(tmp_coord[0]) - Number(diff_w);
                        tmp_coord[1] = Number(tmp_coord[1]) - Number(diff_h);
                        tmp_coord[2] = Number(tmp_coord[2]) - Number(diff_w);
                        tmp_coord[3] = Number(tmp_coord[3]) - Number(diff_h);
                    }
                    // vin to target
                    if ((src_target_wid != vin_wid) || (src_target_hei != vin_hei))
                        tmp_coord = $.fn._XEofVinToTag(tmp_coord, src_target_wid, src_target_hei, vin_wid, vin_hei, src_ratio, vin_ratio, target_ratio);
                }
                else
                {
                    if ((Number(src_wid) > Number(vin_wid)) || (Number(src_hei) > Number(vin_hei)) ||
                      (Number(src_target_wid) > Number(vin_wid)) || (Number(src_target_hei) > Number(vin_hei))){

                        return "0,0,0,0";
                    }

                    // src to vin
                    if((src_wid != vin_wid)||(src_hei != vin_hei))
                        tmp_coord = $.fn._XEofSrcToVin(tmp_coord, src_wid, src_hei, vin_wid, vin_hei, src_ratio, vin_ratio, target_ratio);

                    // vin to target
                    if((src_target_wid != vin_wid)||(src_target_hei != vin_hei))
                        tmp_coord = $.fn._XEofVinToTag(tmp_coord, src_target_wid, src_target_hei, vin_wid, vin_hei, src_ratio, vin_ratio, target_ratio);
                }
            }
            else
            {
                // src to vin
                if((src_wid != vin_wid)||(src_hei != vin_hei))
                    tmp_coord = $.fn._XEofSrcToVin(tmp_coord, src_wid, src_hei, vin_wid, vin_hei, src_ratio, vin_ratio, target_ratio);

                // vin to target
                if((src_target_wid != vin_wid)||(src_target_hei != vin_hei))
                    tmp_coord = $.fn._XEofVinToTag(tmp_coord, src_target_wid, src_target_hei, vin_wid, vin_hei, src_ratio, vin_ratio, target_ratio);
            }

            // target to small view
            $.each(tmp_coord, function(n){
                if(n == 0 || n == 2)
                    tmp_coord[n] = Math.ceil((tmp_coord[n] * target_wid) / src_target_wid);
                else
                    tmp_coord[n] = Math.ceil((tmp_coord[n] * target_hei) / src_target_hei);      
            });

        } else if(platform == "s2" || platform == "s2l"){
            var src_target_wid = $.fn.GetRealWidth();
            var src_target_hei = $.fn.GetRealHeight();
            src_ratio = Math.floor(src_wid*100/src_hei);
            if((corridor == "on" && ((src_target_wid * src_target_hei) <= 5038848)) || (corridor == "on" && platform == "s2l"))
            {
                var t_w = target_hei;
                var t_h = target_wid;
                target_wid = t_w;
                target_hei = t_h;
                target_ratio = Math.floor(target_wid*100/target_hei);
            }

            // src to target
            if(platform == "s2")
            {
                if((src_ratio > 170) && (target_ratio < 140)){
                    $.each(tmp_coord, function(n){
                        if(n == 0 || n == 2)
                            tmp_coord[n] = Math.floor(tmp_coord[n]*target_wid/src_wid*19/20 + target_wid/40);
                        else
                            tmp_coord[n] = Math.floor(tmp_coord[n]*target_wid/src_wid + src_hei*target_wid/src_wid/6);
                    });
                } else if((src_ratio < 140) && (target_ratio > 170)){
                    $.each(tmp_coord, function(n){
                        if(n == 0 || n == 2)
                            tmp_coord[n] = Math.floor(tmp_coord[n]*target_wid/src_wid*21/20 - target_wid/40);
                        else
                            tmp_coord[n] = Math.floor(tmp_coord[n]*target_wid/src_wid - src_hei*target_wid/src_wid/8);
                    });
                } else {
                    $.each(tmp_coord, function(n){
                        tmp_coord[n] = Math.floor(tmp_coord[n]*target_wid/src_wid);
                    });
                }
            }
            else if(platform == "s2l")
            {
                var scale = target_hei / src_hei;
                if((src_ratio > 170) && (target_ratio < 140)){
                    $.each(tmp_coord, function(n){
                        if(n == 0 || n == 2)
                            tmp_coord[n] = Math.floor((tmp_coord[n] - src_wid/8)*scale);
                        else
                            tmp_coord[n] = Math.floor(tmp_coord[n]*scale);
                    });
                } else if((src_ratio < 140) && (target_ratio > 170)){
                    $.each(tmp_coord, function(n){
                        if(n == 0 || n == 2)
                            tmp_coord[n] = Math.floor((tmp_coord[n] + src_wid/8)*scale);
                        else
                            tmp_coord[n] = Math.floor(tmp_coord[n]*scale);
                    });
                } else {
                    $.each(tmp_coord, function(n){
                        tmp_coord[n] = Math.floor(tmp_coord[n]*scale);
                    });
                }
            }
            
            // checking coordinate
            if(tmp_coord[0] < 0)
                tmp_coord[0] = Number(0);
            else if(tmp_coord[0] > Number(target_wid - 1))
                tmp_coord[0] = Number(target_wid - 1);

            if(tmp_coord[1] < 0)
                tmp_coord[1] = Number(0);
            else if(tmp_coord[1] > Number(target_hei - 1))
                tmp_coord[1] = Number(target_hei - 1);

            if(tmp_coord[2] < tmp_coord[0])
                tmp_coord[2] = tmp_coord[0];
            else if(tmp_coord[2] > Number(target_wid - 1))
                tmp_coord[2] = Number(target_wid - 1);

            if(tmp_coord[3] < tmp_coord[1])
                tmp_coord[3] = tmp_coord[1];
            else if(tmp_coord[3] > Number(target_hei - 1))
                tmp_coord[3] = Number(target_hei - 1);
        }
        
        if(orientation == "off"){
        } else if(orientation == "flip"){
            $.each(tmp_coord, function(n){
                if(n == 0 || n == 2)
                    swap_tmp[n] = tmp_coord[n];
                else
                {
                    if(n == 1){
                        swap_tmp[3] = Number(target_hei) - Number(tmp_coord[n]);
                    } else if(n == 3){
                        swap_tmp[1] = Number(target_hei) - Number(tmp_coord[n]);
                    }
                }
            });
            tmp_coord = swap_tmp;
        } else if(orientation == "mirror"){
            $.each(tmp_coord, function(n){
                if(n == 0 || n == 2)
                {
                    if(n == 0){
                        swap_tmp[2] = Number(target_wid) - Number(tmp_coord[n]);
                    } else if(n == 2){
                        swap_tmp[0] = Number(target_wid) - Number(tmp_coord[n]);
                    }
                }
                else
                    swap_tmp[n] = tmp_coord[n];
            });
            tmp_coord = swap_tmp;
        } else if(orientation == "both"){
            $.each(tmp_coord, function(n){
                if(n == 0 || n == 2)
                {
                    if(n == 0){
                        swap_tmp[2] = Number(target_wid) - Number(tmp_coord[n]);
                    } else if(n == 2){
                        swap_tmp[0] = Number(target_wid) - Number(tmp_coord[n]);
                    }
                }
                else
                {
                    if(n == 1){
                        swap_tmp[3] = Number(target_hei) - Number(tmp_coord[n]);
                    } else if(n == 3){
                        swap_tmp[1] = Number(target_hei) - Number(tmp_coord[n]);
                    }
                }
            });
            tmp_coord = swap_tmp;
        }
        
        if(platform == "xarina_entry")
        {
            if(corridor == "on" && media_type == "h264")
            {
                s_x = target_hei - tmp_coord[3];
                s_y = tmp_coord[0];
                e_x = target_hei - tmp_coord[1];
                e_y = tmp_coord[2];
                tmp_coord[0] = s_x;
                tmp_coord[1] = s_y;
                tmp_coord[2] = e_x;
                tmp_coord[3] = e_y;
            }
        }
        else if(platform == "s2" || platform == "s2l")
        {
            if((corridor == "on" && ((src_target_wid * src_target_hei) <= 5038848)) || (corridor == "on" && platform == "s2l"))
            {
                s_x = target_hei - tmp_coord[3];
                s_y = tmp_coord[0];
                e_x = target_hei - tmp_coord[1];
                e_y = tmp_coord[2];
                tmp_coord[0] = s_x;
                tmp_coord[1] = s_y;
                tmp_coord[2] = e_x; 
                tmp_coord[3] = e_y;
            }
        }
        
        return tmp_coord;
    };

    $.fn._runTransferCoordinate_ui2SysForVideoAnalysis = function(from_ui, detect_cur_size)
    {
        var ind = detect_cur_size.indexOf(',')
        , cur_wid = detect_cur_size.slice(0, ind)
        , cur_hei = detect_cur_size.slice(ind+1, detect_cur_size.length)
        , pri_wid = $.fn.GetMediaWidth() < Number(cur_wid) ? Number(cur_wid) : $.fn.GetMediaWidth()
        , pri_hei = $.fn.GetMediaHieght() < Number(cur_hei) ? Number(cur_hei) : $.fn.GetMediaHieght()
        , pri_ratio = $.fn.GetMediaRatio()
        , real_wid = $.fn.GetRealWidth(), real_hei = $.fn.GetRealHeight()
        , platform = $.fn.GetPlatForm(), corridor = $.fn.GetCorridor(), media_type = $.fn.GetMediaType()
        , orientation = $.fn.GetOrientation()
        , corridor_tmp = [], x_tmp, y_tmp
        , swap_tmp = []
        , tmp_coord = from_ui.split(",")
        , s_x, s_y, e_x, e_y
        , tmp_w, tmp_h; 
        ;

        // transfer coordinate mapping to corridor.
        if(platform == "xarina_entry"){
            if(corridor == "on" && media_type == "h264"){
                corridor_tmp = tmp_coord;
                $.each(corridor_tmp, function(n){
                    if(n % 2 == 0)
                        y_tmp = Number(Math.floor(pri_wid)) - Number(corridor_tmp[n]);
                    else
                    {
                        x_tmp = corridor_tmp[n];
                        corridor_tmp[n-1] = x_tmp;
                        corridor_tmp[n] = y_tmp;
                    }
                });
                tmp_coord = corridor_tmp;
                tmp_w = real_hei;
                tmp_h = real_wid;
            } else {
                tmp_w = real_wid;
                tmp_h = real_hei;
            }
        } else if(platform == "s2" || platform == "s2l"){
            if((corridor == "on" && ((real_hei * real_wid) <= 5038848)) || (corridor == "on" && platform == "s2l")){
                corridor_tmp = tmp_coord;
                $.each(corridor_tmp, function(n){
                    if(n % 2 == 0)
                        y_tmp = Number(Math.floor(pri_wid)) - Number(corridor_tmp[n]);
                    else
                    {
                        x_tmp = corridor_tmp[n];
                        corridor_tmp[n-1] = x_tmp;
                        corridor_tmp[n] = y_tmp;
                    }
                });
                tmp_coord = corridor_tmp;
                tmp_w = real_hei;
                tmp_h = real_wid;
            } else {
                tmp_w = real_wid;
                tmp_h = real_hei;     
            }
        }

        if(orientation == "off"){
            $.each(tmp_coord, function(n){
                if(n % 2 == 0)
                    tmp_coord[n] = Math.floor(tmp_coord[n] * real_wid / pri_wid);
                else
                    tmp_coord[n] = Math.floor(tmp_coord[n] * real_hei / pri_hei);
            });
        } else if(orientation == "flip"){
            $.each(tmp_coord, function(n){
                if(n % 2 == 0)
                {
                    tmp_coord[n] = Math.floor(tmp_coord[n] * real_wid / pri_wid);
                    swap_tmp[n] = tmp_coord[n];
                }
                else
                {
                    tmp_coord[n] = Math.floor(tmp_coord[n] * real_hei / pri_hei);
                    swap_tmp[n] = Number(tmp_h) - Number(tmp_coord[n]);
                }
            });
            tmp_coord = swap_tmp;
        } else if(orientation == "mirror"){
            $.each(tmp_coord, function(n){
                if(n % 2 == 0)
                {
                    tmp_coord[n] = Math.floor(tmp_coord[n] * real_wid / pri_wid);
                    swap_tmp[n] = Number(tmp_w) - Number(tmp_coord[n]);
                }
                else
                {
                    tmp_coord[n] = Math.floor(tmp_coord[n] * real_hei / pri_hei);
                    swap_tmp[n] = tmp_coord[n];
                }
            });
            tmp_coord = swap_tmp;
        } else if(orientation == "both"){
            $.each(tmp_coord, function(n){
                if(n % 2 == 0)
                {
                    tmp_coord[n] = Math.floor(tmp_coord[n] * real_wid / pri_wid);
                    swap_tmp[n] = Number(tmp_w) - Number(tmp_coord[n]);
                }
                else
                {
                    tmp_coord[n] = Math.floor(tmp_coord[n] * real_hei / pri_hei);
                    swap_tmp[n] = Number(tmp_h) - Number(tmp_coord[n]);
                }
            });
            tmp_coord = swap_tmp;
        }
        if((tmp_w != real_wid) && (tmp_h != real_hei))
            return tmp_coord+","+tmp_w+"x"+tmp_h;
        else
            return tmp_coord+","+real_wid+"x"+real_hei;
    };

    $.fn._runTransferCoordinate_Sys2uiForVideoAnalysis = function(from_sys, detect_cur_size)
    {
        var index = detect_cur_size.indexOf(',')
        , cur_wid = detect_cur_size.slice(0, index)
        , cur_hei = detect_cur_size.slice(index+1, detect_cur_size.length)
        , ind = from_sys.lastIndexOf(',')
        , src_data = from_sys.slice(ind+1, from_sys.length), tmp = "", platform = $.fn.GetPlatForm()
        , target_wid = $.fn.GetMediaWidth() < Number(cur_wid) ? Number(cur_wid) : $.fn.GetMediaWidth()
        , target_hei = $.fn.GetMediaHieght() < Number(cur_hei) ? Number(cur_hei) : $.fn.GetMediaHieght()
        , target_ratio = Math.floor(target_wid*100/target_hei)
        , vin_wid = $.fn.GetStreamWidth(), vin_hei = $.fn.GetStreamHeight(), vin_ratio = platform == "xarina_entry" ? vin_wid/vin_hei:$.fn.GetMediaRatio()
        , src_wid, src_hei, src_ratio
        , orientation = $.fn.GetOrientation()
        , corridor_tmp = [], x_tmp, y_tmp
        , swap_tmp = []
        , tmp_coord = from_sys.slice(0, ind).split(",")
        , corridor = $.fn.GetCorridor(), media_type = $.fn.GetMediaType()
        , sensor = $.fn.GetSensor()
        ;
        tmp = src_data.split("x");
        src_wid = tmp[0], src_hei = tmp[1];
        if(from_sys.slice(0, ind) == "0,0,0,0")
            return "0,0,0,0";
        if(platform == "xarina_entry"){
            var src_target_wid = $.fn.GetRealWidth();
            var src_target_hei = $.fn.GetRealHeight();
            var diff_w = 0;
            var diff_h = 0;
            target_ratio = src_target_wid/src_target_hei;
            src_ratio = src_wid/src_hei;
            if(corridor == "on" && media_type == "h264")
            {
                var t_w = src_target_hei;
                var t_h = src_target_wid;
                src_target_wid = t_w;
                src_target_hei = t_h;
                t_w = target_hei;
                t_h = target_wid;
                target_wid = t_w;
                target_hei = t_h;
                target_ratio = src_target_wid/src_target_hei;
            }
            else
            {
                if(sensor != 4)
                    if ((Number(src_wid) > Number(vin_wid)) || (Number(src_hei) > Number(vin_hei)) ||
                          (Number(src_target_wid) > Number(vin_wid)) || (Number(src_target_hei) > Number(vin_hei))){
                        return "0,0,0,0";
                    }
            }

            // 5M resolution
            if(sensor == 4)
            {
                if ((((src_wid > 2048) || (src_hei > 1536)) && (src_target_wid <= 2048) && (src_target_hei <= 1536)) ||
                (((src_wid <= 2048) && (src_hei <= 1536)) && ((src_target_wid > 2048) || (src_target_hei > 1536))))
                {
                    var wid_5M = 2592
                    , hei_5M = 1944
                    , wid_3M = 2048
                    , hei_3M = 1536
                    ;
                    diff_w = (wid_5M - wid_3M) / 2;
                    diff_h = (hei_5M - hei_3M) / 2;

                    if ((src_wid > wid_5M) || (src_hei > hei_5M) ||
                          (src_target_wid > wid_5M) || (src_target_hei > hei_5M)) {
                         return "0,0";
                    }

                    if ((src_wid > wid_3M) || (src_hei > hei_3M)) {
                        /* convert to 5M */
                        vin_wid = wid_5M;
                        vin_hei = hei_5M;
                        vin_ratio = vin_wid / vin_hei;
                    } else {
                        /* convert to 2M */
                        vin_wid = wid_3M;
                        vin_hei = hei_3M;
                        vin_ratio = vin_wid / vin_hei;
                    }
                    // src to vin
                    if ((src_wid != vin_wid) || (src_hei != vin_hei)){
                        tmp_coord = $.fn._XEofSrcToVin(tmp_coord, src_wid, src_hei, vin_wid, vin_hei, src_ratio, vin_ratio, target_ratio);
                    }
                    if ((src_target_wid > wid_3M) || (src_target_hei > hei_3M)) {
                        /* convert to 5M */
                        vin_wid = wid_5M;
                        vin_hei = hei_5M;
                        vin_ratio = vin_wid / vin_hei;
                        $.each(tmp_coord, function(n){
                            if(n % 2 == 0)
                                tmp_coord[n] = Number(tmp_coord[n]) + Number(diff_w);
                            else
                                tmp_coord[n] = Number(tmp_coord[n]) + Number(diff_h);
                        });
                    } else {
                        /* convert to 2M */
                        vin_wid = wid_3M;
                        vin_hei = hei_3M;
                        vin_ratio = vin_wid / vin_hei;
                        $.each(tmp_coord, function(n){
                            if(n % 2 == 0)
                                tmp_coord[n] = Number(tmp_coord[n]) - Number(diff_w);
                            else
                                tmp_coord[n] = Number(tmp_coord[n]) - Number(diff_h);
                        });
                    }

                    // vin to target
                    if ((src_target_wid != vin_wid) || (src_target_hei != vin_hei))
                        tmp_coord = $.fn._XEofVinToTag(tmp_coord, src_target_wid, src_target_hei, vin_wid, vin_hei, src_ratio, vin_ratio, target_ratio);
                }
                else
                {
                    if ((Number(src_wid) > Number(vin_wid)) || (Number(src_hei) > Number(vin_hei)) ||
                      (Number(src_target_wid) > Number(vin_wid)) || (Number(src_target_hei) > Number(vin_hei))){
                        return "0,0";
                    }

                    // src to vin
                    if((src_wid != vin_wid)||(src_hei != vin_hei))
                        tmp_coord = $.fn._XEofSrcToVin(tmp_coord, src_wid, src_hei, vin_wid, vin_hei, src_ratio, vin_ratio, target_ratio);

                    // vin to target
                    if((src_target_wid != vin_wid)||(src_target_hei != vin_hei))
                        tmp_coord = $.fn._XEofVinToTag(tmp_coord, src_target_wid, src_target_hei, vin_wid, vin_hei, src_ratio, vin_ratio, target_ratio);
                }
            }
            else
            {
                // src to vin
                if((src_wid != vin_wid)||(src_hei != vin_hei))
                    tmp_coord = $.fn._XEofSrcToVin(tmp_coord, src_wid, src_hei, vin_wid, vin_hei, src_ratio, vin_ratio, target_ratio);

                // vin to target
                if((src_target_wid != vin_wid)||(src_target_hei != vin_hei))
                    tmp_coord = $.fn._XEofVinToTag(tmp_coord, src_target_wid, src_target_hei, vin_wid, vin_hei, src_ratio, vin_ratio, target_ratio);
            }

            // target to small view
            $.each(tmp_coord, function(n){
                if(n % 2 == 0)
                    tmp_coord[n] = Math.ceil((tmp_coord[n] * target_wid) / src_target_wid);
                else
                    tmp_coord[n] = Math.ceil((tmp_coord[n] * target_hei) / src_target_hei);      
            });            
        } else if(platform == "s2" || platform == "s2l"){
            var src_target_wid = $.fn.GetRealWidth();
            var src_target_hei = $.fn.GetRealHeight();
            src_ratio = Math.floor(src_wid*100/src_hei);
            if((corridor == "on" && ((src_target_wid * src_target_hei) <= 5038848)) || (corridor == "on" && platform == "s2l"))
            {
                var t_w = target_hei;
                var t_h = target_wid;
                target_wid = t_w;
                target_hei = t_h;
                target_ratio = Math.floor(target_wid*100/target_hei);
            }
            // src to target
            if(platform == "s2")
            {
                if((src_ratio > 170) && (target_ratio < 140)){
                    $.each(tmp_coord, function(n){
                        if(n % 2 == 0)
                            tmp_coord[n] = Math.floor(tmp_coord[n]*target_wid/src_wid*19/20 + target_wid/40);
                        else
                            tmp_coord[n] = Math.floor(tmp_coord[n]*target_wid/src_wid + src_hei*target_wid/src_wid/6);
                    });
                } else if((src_ratio < 140) && (target_ratio > 170)){
                    $.each(tmp_coord, function(n){
                        if(n % 2 == 0)
                            tmp_coord[n] = Math.floor(tmp_coord[n]*target_wid/src_wid*21/20 - target_wid/40);
                        else
                            tmp_coord[n] = Math.floor(tmp_coord[n]*target_wid/src_wid - src_hei*target_wid/src_wid/8);
                    });
                } else {
                    $.each(tmp_coord, function(n){
                        tmp_coord[n] = Math.floor(tmp_coord[n]*target_wid/src_wid);
                    });
                }
            }
            else if(platform == "s2l")
            {
                var scale = target_hei / src_hei;
                if((src_ratio > 170) && (target_ratio < 140)){
                    $.each(tmp_coord, function(n){
                        if(n == 0 || n == 2)
                            tmp_coord[n] = Math.floor((tmp_coord[n] - src_wid/8)*scale);
                        else
                            tmp_coord[n] = Math.floor(tmp_coord[n]*scale);
                    });
                } else if((src_ratio < 140) && (target_ratio > 170)){
                    $.each(tmp_coord, function(n){
                        if(n == 0 || n == 2)
                            tmp_coord[n] = Math.floor((tmp_coord[n] + src_wid/8)*scale);
                        else
                            tmp_coord[n] = Math.floor(tmp_coord[n]*scale);
                    });
                } else {
                    $.each(tmp_coord, function(n){
                        tmp_coord[n] = Math.floor(tmp_coord[n]*scale);
                    });
                }
            }
        }

        if(orientation == "off"){
        } else if(orientation == "flip"){
            $.each(tmp_coord, function(n){
                if(n % 2 == 0)
                    swap_tmp[n] = tmp_coord[n];
                else
                    swap_tmp[n] = Number(target_hei) - Number(tmp_coord[n]);

            });
            tmp_coord = swap_tmp;
        } else if(orientation == "mirror"){
            $.each(tmp_coord, function(n){
                if(n % 2 == 0)
                    swap_tmp[n] = Number(target_wid) - Number(tmp_coord[n]);
                else
                    swap_tmp[n] = tmp_coord[n];
            });
            tmp_coord = swap_tmp;
        } else if(orientation == "both"){
            $.each(tmp_coord, function(n){
                if(n % 2 == 0)
                    swap_tmp[n] = Number(target_wid) - Number(tmp_coord[n]);
                else
                    swap_tmp[n] = Number(target_hei) - Number(tmp_coord[n]);
            });
            tmp_coord = swap_tmp;
        }

        if(platform == "xarina_entry")
        {
            if(corridor == "on" && media_type == "h264")
            {
                corridor_tmp = tmp_coord;
                $.each(corridor_tmp, function(n){
                    if(n % 2 == 0)
                        y_tmp = tmp_coord[n];
                    else
                    {
                        x_tmp = target_hei - corridor_tmp[n];
                        corridor_tmp[n-1] = x_tmp;
                        corridor_tmp[n] = y_tmp;
                    }
                });
                tmp_coord = corridor_tmp;
            }
        }
        else if(platform == "s2" || platform == "s2l")
        {
            if((corridor == "on" && ((src_target_wid * src_target_hei) <= 5038848)) || (corridor == "on" && platform == "s2l"))
            {
                corridor_tmp = tmp_coord;
                $.each(corridor_tmp, function(n){
                    if(n % 2 == 0)
                        y_tmp = tmp_coord[n];
                    else
                    {
                        x_tmp = target_hei - corridor_tmp[n];
                        corridor_tmp[n-1] = x_tmp;
                        corridor_tmp[n] = y_tmp;
                    }
                });
                tmp_coord = corridor_tmp;
            }
        }
        if(tmp_coord == "NaN,NaN,NaN,NaN")
            tmp_coord = "0,0,0,0";
        return tmp_coord;
    };

    $.fn._XEofSrcToVin = function(tmp_coord, src_wid, src_hei, vin_wid, vin_hei, src_ratio, vin_ratio, target_ratio)
    {
        var wid = src_wid
        , hei = src_hei
        , s_x = tmp_coord[0]
        , s_y = tmp_coord[1]
        , e_x = tmp_coord[2]
        , e_y = tmp_coord[3]
        , src_chg_wid = 0
        , src_chg_hei = 0
        , chg_wid_size = 0
        , chg_hei_size = 0
        , result = []
        , calculate = []
        ;
        calculate = tmp_coord;
        if(src_ratio != vin_ratio){
            src_chg_wid = src_hei * vin_ratio;
            src_chg_hei = src_wid / vin_ratio;
            chg_wid_size = src_chg_wid * src_hei;
            chg_hei_size = src_chg_hei * src_wid;
            if(chg_wid_size > chg_hei_size)
                wid = src_chg_wid;
            else
                hei = src_chg_hei;

            diff_w = wid > src_wid ? ((wid - src_wid) / 2) : ((src_wid - wid) / 2);
            diff_h = hei > src_hei ? ((hei - src_hei) / 2) : ((src_hei - hei) / 2);

            $.each(calculate, function(i){
                if(i % 2 == 0)
                    tmp_coord[i] = Number(calculate[i]) + Number(diff_w);
                else
                    tmp_coord[i] = Number(calculate[i]) + Number(diff_h);
            });
        }

        $.each(calculate, function(n){
            if(n % 2 == 0)
                result[n] = Math.ceil((Number(calculate[n]) * Number(vin_wid)) / Number(wid));
            else
                result[n] = Math.ceil((Number(calculate[n]) * Number(vin_hei)) / Number(hei));
        });

        return result;
    };

    $.fn._XEofVinToTag = function(tmp_coord, src_wid, src_hei, vin_wid, vin_hei, src_ratio, vin_ratio, target_ratio)
    {
        var hei = vin_hei
        , wid = vin_wid
        , target_chg_wid = 0
        , target_chg_hei = 0
        , chg_wid_size = 0
        , chg_hei_size = 0
        , result = []
        , calculate = []
        , calcu_x = 0
        , calcu_y = 0
        ;
        calculate = tmp_coord;
        if(target_ratio != vin_ratio)
        {
            target_chg_wid = vin_hei * target_ratio;
            target_chg_hei = vin_wid / target_ratio;
            chg_wid_size = target_chg_wid * src_hei;
            chg_hei_size = target_chg_hei * src_wid;
            if(chg_wid_size < chg_hei_size)
                wid = target_chg_wid;
            else
                hei = target_chg_hei;

            diff_w = wid > vin_wid ? ((wid - vin_wid) / 2) : ((vin_wid - wid) / 2);
            diff_h = hei > vin_hei ? ((hei - vin_hei) / 2) : ((vin_hei - hei) / 2);
            $.each(calculate, function(n){
                if(n % 2 == 0){
                    calcu_x = calculate[n] > diff_w ? Number(calculate[n]) - Number(diff_w) : Number(diff_w) - Number(diff_w);
                    tmp_coord[n] = calcu_x < wid ? Number(calcu_x) : Number(wid);
                } else {
                    calcu_y = calculate[n] > diff_h ? Number(calculate[n]) - Number(diff_h) : Number(diff_h) - Number(diff_h);
                    tmp_coord[n] = calcu_y < hei ? Number(calcu_y) : Number(hei); 
                }
            });
        }

        $.each(tmp_coord, function(n){
            if(n % 2 == 0)
                result[n] = Math.ceil((Number(tmp_coord[n]) * Number(src_wid)) / Number(wid));
            else
                result[n] = Math.ceil((Number(tmp_coord[n]) * Number(src_hei)) / Number(hei));
        });

        return result;
    };

    $.fn._runInitialZone = function(cord, type)
    {
        var ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0)
        , data
        , coordinate
        ;

        if(PlayActivex){
            try{
                var playStatus = ActivexPlayerObject.GetStreamStatus()
                , tmp_detect_size = ActivexPlayerObject.Get_VideoSize()
                ;
            } catch(e){
                var playStatus = 0;
            }

            if(playStatus){
                if(type.search("line_counting") != -1){
                    var num = type.slice(type.length-1, type.length);
                    data = cord == undefined ? "0,0,0,0,"+$.fn.GetStreamWidth()+"x"+$.fn.GetStreamHeight() : cord;
                    coordinate = $.fn._runTransferCoordinate_Sys2uiForVideoAnalysis(data, tmp_detect_size);
                    ActivexPlayerObject.SetObjectFunction(1, $.fn.GetOrientationIndex());
                    ActivexPlayerObject.SetObjectCountingLine(""+num+"", ""+coordinate+"", $("#Ievent_obj_counting_line_"+num+"_direction").val());
                    ActivexPlayerObject.Select_OC_Setting_Line(""+num+"", $("#Ievent_obj_counting_line_"+num+"_direction").val());
                } else if(type == "loitering"){
                    data = cord == undefined ? "0,0,0,0,"+$.fn.GetStreamWidth()+"x"+$.fn.GetStreamHeight() : cord;
                    coordinate = $.fn._runTransferCoordinate_Sys2uiForVideoAnalysis(data, tmp_detect_size);
                    ActivexPlayerObject.DrawLoiteringArea(true);
                    ActivexPlayerObject.SetObjectFunction(2, $.fn.GetOrientationIndex());
                    ActivexPlayerObject.SetLoiteringArea(""+coordinate+"");
                } else if(type == "motion" || type == "roi" || type == "privacy_zone" || type == "withdrawn"){
                    data = cord == undefined ? "0,0,0,0,"+$.fn.GetStreamWidth()+"x"+$.fn.GetStreamHeight() : cord;
                    coordinate = $.fn._runTransferCoordinate_Sys2ui(data, tmp_detect_size);
                    ActivexPlayerObject.Start_Cropping(1);
                    ActivexPlayerObject.Set_CropPoint(""+coordinate+"");
                } else if(type.search("border_line") != -1){
                    var num = type.slice(type.length-1, type.length);
                    data = cord == undefined ? "0,0,0,0,"+$.fn.GetStreamWidth()+"x"+$.fn.GetStreamHeight() : cord;
                    coordinate = $.fn._runTransferCoordinate_Sys2uiForVideoAnalysis(data, tmp_detect_size);
                    ActivexPlayerObject.SetObjectFunction(3, $.fn.GetOrientationIndex());
                    ActivexPlayerObject.SetLineCrossingLine(""+num+"", ""+coordinate+"", $("#Iborder_line_"+num+"_direction").val());
                    ActivexPlayerObject.Select_LC_Setting_Line(""+num+"", $("#Iborder_line_"+num+"_direction").val());
                } else if(type == "intrusion"){
                    data = cord == undefined ? "0,0,0,0,"+$.fn.GetStreamWidth()+"x"+$.fn.GetStreamHeight() : cord;
                    coordinate = $.fn._runTransferCoordinate_Sys2uiForVideoAnalysis(data, tmp_detect_size);
                    ActivexPlayerObject.DrawIntrusionArea(true);
                    ActivexPlayerObject.SetObjectFunction(4, $.fn.GetOrientationIndex());
                    ActivexPlayerObject.SetIntrusionArea(""+coordinate+"");
                } else if(type == "departure"){
                    data = cord == undefined ? "0,0,0,0,"+$.fn.GetStreamWidth()+"x"+$.fn.GetStreamHeight() : cord;
                    coordinate = $.fn._runTransferCoordinate_Sys2uiForVideoAnalysis(data, tmp_detect_size);
                    ActivexPlayerObject.DrawDepartureArea(true);
                    ActivexPlayerObject.SetObjectFunction(6, $.fn.GetOrientationIndex());
                    ActivexPlayerObject.SetDepartureArea(""+coordinate+"");
                } else if(type == "area_counting"){
                    data = cord == undefined ? "0,0,0,0,"+$.fn.GetStreamWidth()+"x"+$.fn.GetStreamHeight() : cord;
                    coordinate = $.fn._runTransferCoordinate_Sys2uiForVideoAnalysis(data, tmp_detect_size);
                    ActivexPlayerObject.DrawAreaCountingArea(true);
                    ActivexPlayerObject.SetObjectFunction(7, $.fn.GetOrientationIndex());
                    ActivexPlayerObject.SetAreaCountingArea(""+coordinate+"");
                } else if(type == "object_size_max"){
                    ActivexPlayerObject.SetObjectSize(""+cord+"");
                    ActivexPlayerObject.DrawObjectSize(1);
                } else if(type == "object_size_min"){
                    ActivexPlayerObject.SetObjectSize(""+cord+"");
                    ActivexPlayerObject.DrawObjectSize(2);
                }
            } else
                setTimeout(function(){
                    $.fn._runInitialZone(cord, type);
                }, 100);
        } else {
            setTimeout(function(){
                $.fn._runInitialZone(cord, type);
            }, 100);
        }     
    };

    $.fn._runSwitchSchName = function(event, n)
    {
        var ret = ""
        switch(n){
            case 0:
                ret = "I"+event+"_sunday"
                break;
            case 1:
                ret = "I"+event+"_monday"
                break;
            case 2:
                ret = "I"+event+"_tuesday"
                break;
            case 3:
                ret = "I"+event+"_wednesday"
                break;
            case 4:
                ret = "I"+event+"_thursday"
                break;
            case 5:
                ret = "I"+event+"_friday"
                break;
            case 6:
                ret = "I"+event+"_saturday"
                break;
        }

        return ret;
    };

    $.fn._runGenSchSetting = function(data, event_name)
    {
        var ret = "", swap = "", name = "";
        ret += "<table width=\"100%\" id=\"Isch_table\"><tbody><tr><td></td><td><span>"+$.fn.GetLangStr(LT._Start_time)+"</span></td><td><span>"+$.fn.GetLangStr(LT._End_time)+"</span></td><td><span>"+$.fn.GetLangStr(LT._Action)+"</span></td></tr>";
        $.each(data, function(n){
            if(n == 0){
                swap += "<tr class=\"bebebe\">"+
                            "<td><span>"+$.fn.GetLangStr(LT._Sunday)+"</span></td>"+
                            "<td></td>"+
                            "<td></td>"+
                            "<td></td>"+
                        "</tr>";
                for(var i = 1; i <= 3; i++){
                    var tmp = data[n][i-1].split('-');
                    swap += "<tr>"+
                                "<td></td>"+
                                "<td><input type=\"text\" name=\"event.source."+event_name+".arming_schedule.arming_day."+Number(n+1)+".arming_time."+i+".begin\" id=\"Isch_sunday_s_t_"+i+"\" value=\""+tmp[0]+"\" de_val=\""+tmp[0]+"\"/></td>"+
                                "<td><input type=\"text\" name=\"event.source."+event_name+".arming_schedule.arming_day."+Number(n+1)+".arming_time."+i+".end\" id=\"Isch_sunday_e_t_"+i+"\" value=\""+tmp[1]+"\" de_val=\""+tmp[1]+"\"/></td>"+
                                "<td><input type=\"checkbox\" name=\"event.source."+event_name+".arming_schedule.arming_day."+Number(n+1)+".arming_time."+i+".enable\" id=\"Isch_sunday_en_"+i+"\" "+(tmp[2] == "on" ?  "checked=\"true\"": "" )+" de_val=\""+tmp[2]+"\" /></td>"+
                            "</tr>";
                }
            } else if(n == 1){
                ret += "<tr class=\"bebebe\"><td><span>"+$.fn.GetLangStr(LT._Monday)+"</span></td><td></td><td></td><td></td></tr>";
                name = "monday";
            } else if(n == 2){
                ret += "<tr class=\"bebebe\"><td><span>"+$.fn.GetLangStr(LT._Tuesday)+"</span></td><td></td><td></td><td></td></tr>";
                name = "tuesday";
            } else if(n == 3){
                ret += "<tr class=\"bebebe\"><td><span>"+$.fn.GetLangStr(LT._Wednesday)+"</span></td><td></td><td></td><td></td></tr>";
                name = "wednesday";
            } else if(n == 4){
                ret += "<tr class=\"bebebe\"><td><span>"+$.fn.GetLangStr(LT._Thursday)+"</span></td><td></td><td></td><td></td></tr>";
                name = "thursday";
            } else if(n == 5){
                ret += "<tr class=\"bebebe\"><td><span>"+$.fn.GetLangStr(LT._Friday)+"</span></td><td></td><td></td><td></td></tr>";
                name = "friday";
            } else if(n == 6){
                ret += "<tr class=\"bebebe\"><td><span>"+$.fn.GetLangStr(LT._Saturday)+"</span></td><td></td><td></td><td></td></tr>";
                name = "saturday";
            }

            if(n != 0)
                for(var i = 1; i <= 3; i++){
                    var tmp = data[n][i-1].split('-');
                    ret += "<tr>"+
                                "<td></td>"+
                                "<td><input type=\"text\" name=\"event.source."+event_name+".arming_schedule.arming_day."+Number(n+1)+".arming_time."+i+".begin\" id=\"Isch_"+name+"_s_t_"+i+"\" value=\""+tmp[0]+"\"/></td>"+
                                "<td><input type=\"text\" name=\"event.source."+event_name+".arming_schedule.arming_day."+Number(n+1)+".arming_time."+i+".end\" id=\"Isch_"+name+"_e_t_"+i+"\" value=\""+tmp[1]+"\"/></td>"+
                                "<td><input type=\"checkbox\" name=\"event.source."+event_name+".arming_schedule.arming_day."+Number(n+1)+".arming_time."+i+".enable\" id=\"Isch_"+name+"_en_"+i+"\" "+(tmp[2] == "on" ?  "checked=\"true\"": "" )+"/></td>"+
                            "</tr>";
                }
        });
        ret += swap;
        ret += "</tbody></table><div><input type=\"button\" class=\"can_modify\" value=\""+$.fn.GetLangStr(LT._Cancel)+"\" id=\"Isch_cancel\"><input type=\"button\" class=\"not_modify\" value=\""+$.fn.GetLangStr(LT._Apply)+"\" id=\"Isch_setting\"></div>";
        return ret;
    };

    $.fn._runGetZone = function(type, n)
    {
        var ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0)
        , tmp_coordinate = ActivexPlayerObject.Get_CropPoint()
        , tmp_detect_size = ActivexPlayerObject.Get_VideoSize()
        , coordinate = $.fn._runTransferCoordinate_ui2Sys(tmp_coordinate, tmp_detect_size)
        ;
        if(type == "roi"){
            if(record_coordinate[1][n-1] == "0,0,0,0"){
                record_coordinate[1][n-1] = tmp_coordinate;
            } else {
                if(record_coordinate[1][n-1] != tmp_coordinate){
                    record_coordinate[1][n-1] = tmp_coordinate;
                }
            }
        } else if(type == "motion"){
            if(record_coordinate[2][n-1] == "0,0,0,0"){
                record_coordinate[2][n-1] = tmp_coordinate;
            } else {
                if(record_coordinate[2][n-1] != tmp_coordinate){
                    record_coordinate[2][n-1] = tmp_coordinate;
                }
            }
        } else if(type == "withdrawn"){
            if(record_coordinate[9][n-1] == "0,0,0,0"){
                record_coordinate[9][n-1] = tmp_coordinate;
            } else {
                if(record_coordinate[9][n-1] != tmp_coordinate){
                    record_coordinate[9][n-1] = tmp_coordinate;
                }
            }
        }

        if(tmp_coordinate == "0,0,0,0")
            return "0,0,0,0,"+$.fn.GetStreamWidth()+"x"+$.fn.GetStreamHeight();
        else
            return coordinate;
    };

    $.fn._runGenSch = function(target_id)
    {
        var hour_list_name = "", hour_list = "";
        for(var i = 0; i <= 24; i++){
            hour_list_name += "<div><span>"+i+"</span></div>";
            switch(i){
                case 0:
                    hour_list += "<div class=\"half_block\" style=\"border-left:solid 1px black;\" name=\"0"+i+"30\"><div class=\"line\"></div></div>";
                    hour_list += "<div class=\"hour_block\" name=\"0"+i+"59\"><div class=\"line\"></div></div>";
                    break;
                case 23:
                    hour_list += "<div class=\"half_block\" name=\""+i+"30\"><div class=\"line\"></div></div>";
                    hour_list += "<div class=\"hour_block\" style=\"border-right:solid 1px black;\" name=\""+i+"59\"><div class=\"line\"></div></div>";
                    break;
                case 24:
                    hour_list += "<div></div>";
                    break;
                default:
                    hour_list += "<div class=\"half_block\" name=\""+(i < 10 ? '0'+i+"30":i+"30")+"\"><div class=\"line\"></div></div>";
                    hour_list += "<div class=\"hour_block\" name=\""+(i < 10 ? '0'+i+"59":i+"59")+"\"><div class=\"line\"></div></div>";
                    break;
            }
        }

        $(hour_list_name).appendTo("#I"+target_id+"_hour_list");
        $(hour_list).appendTo("#I"+target_id+"_monday");
        $(hour_list).appendTo("#I"+target_id+"_tuesday");
        $(hour_list).appendTo("#I"+target_id+"_wednesday");
        $(hour_list).appendTo("#I"+target_id+"_thursday");
        $(hour_list).appendTo("#I"+target_id+"_friday");
        $(hour_list).appendTo("#I"+target_id+"_saturday");
        $(hour_list).appendTo("#I"+target_id+"_sunday");
    };

    $.fn._runAssignSch = function(data_in, target_name)
    {
        $.each(data_in, function(n){
            var target_id = $.fn._runSwitchSchName(target_name, n);
            $("#"+target_id).children("div").css("background-color", "");
            if(data_in[n][0] == "00:00-23:59-on" || data_in[n][1] == "00:00-23:59-on" || data_in[n][2] == "00:00-23:59-on"){
                for(i = 0; i <= 23; i++){
                    $("#"+target_id+" > div[name="+(i < 10 ? '0'+i+'30':i+'30')+"]").css("background-color", "#79BD28");
                    $("#"+target_id+" > div[name="+(i < 10 ? '0'+i+'59':i+'59')+"]").css("background-color", "#79BD28");
                }
                return true;
            }
            else
                $.each(data_in[n], function(m){
                    if((data_in[n][m]).search("on") != -1){
                        var tmp = data_in[n][m].split('-')
                        , _s_t = tmp[0].split(':')
                        , _e_t = tmp[1].split(':')
                        ;
                        // begin
                        if(Number(_s_t[1]) < 30)
                        {
                            $("#"+target_id+" > div[name="+(Number(_s_t[0]) < 10 ? '0'+Number(_s_t[0])+'30':_s_t[0]+'30')+"]").css("background-color", "#79BD28");
                            $("#"+target_id+" > div[name="+(Number(_s_t[0]) < 10 ? '0'+Number(_s_t[0])+'59':_s_t[0]+'59')+"]").css("background-color", "#79BD28"); 
                        }
                        else
                            $("#"+target_id+" > div[name="+(Number(_s_t[0]) < 10 ? '0'+Number(_s_t[0])+'59':_s_t[0]+'59')+"]").css("background-color", "#79BD28");

                        if(Number(_s_t[0]) < Number(_e_t[0])){
                            for(var i = Number(_s_t[0])+1; i <= (Number(_e_t[0]) - 1); i++){
                                $("#"+target_id+" > div[name="+(i < 10 ? '0'+i+'30':i+'30')+"]").css("background-color", "#79BD28");
                                $("#"+target_id+" > div[name="+(i < 10 ? '0'+i+'59':i+'59')+"]").css("background-color", "#79BD28"); 
                            } 
                            
                        } else if(Number(_s_t[0]) > Number(_e_t[0])){
                            for(var i = Number(_s_t[0])+1; i <= Number(23); i++){
                                $("#"+target_id+" > div[name="+(i < 10 ? '0'+i+'30':i+'30')+"]").css("background-color", "#79BD28");
                                $("#"+target_id+" > div[name="+(i < 10 ? '0'+i+'59':i+'59')+"]").css("background-color", "#79BD28"); 
                            }

                            for(var i = 0; i <= (Number(_e_t[0]) - 1); i++){
                                $("#"+target_id+" > div[name="+(i < 10 ? '0'+i+'30':i+'30')+"]").css("background-color", "#79BD28");
                                $("#"+target_id+" > div[name="+(i < 10 ? '0'+i+'59':i+'59')+"]").css("background-color", "#79BD28");  
                            }
                        }

                        // end
                        if(Number(_e_t[1]) == 0){}
                        else if(Number(_e_t[1]) > 00 && Number(_e_t[1]) < 30)
                            $("#"+target_id+" > div[name="+(Number(_e_t[0]) < 10 ? '0'+Number(_e_t[0])+'30':_e_t[0]+'30')+"]").css("background-color", "#79BD28");
                        else
                        {
                            $("#"+target_id+" > div[name="+(Number(_e_t[0]) < 10 ? '0'+Number(_e_t[0])+'30':_e_t[0]+'30')+"]").css("background-color", "#79BD28");
                            $("#"+target_id+" > div[name="+(Number(_e_t[0]) < 10 ? '0'+Number(_e_t[0])+'59':_e_t[0]+'59')+"]").css("background-color", "#79BD28");   
                        }
                    }
                });
        });
    };

    /* logical operations callback function */
    $.fn._isFloat = function(n)
    {
        return n != "" && !isNaN(n) && Math.round(n) != n;
    };

    $.fn._isModified = function(that)
    {
        var fire = $(that).val() == null ? $(that).removeClass("modify") : ($(that).val() != $(that).attr("de_val") ?  $(that).addClass("modify") : $(that).removeClass("modify"));
        (function(){
            fire;
        });
        fire = null;
    };

	$.fn._isModifiedForCheckbox = function(that)
	{
		var value = $(that).is(":checked") == false ? "off" : "on";
		var fire = value != $(that).attr("de_val") ?  $(that).addClass("modify") : $(that).removeClass("modify");
        (function(){
            fire;
        });
        fire = null;
	};
	
    /* sliderbar callback function */
    $.fn._initializeSilderCtrl = function(Sid, Iid, _max, _min, _step, type, check_div)
    {
        var revert;
        var Float_regex = /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/;
        var Number_regex = /^(\+|-)?\d+$/;
        var num = new Number(_step);
        if(type == "inactive"){
            var sliderCtrl = $("#"+Sid).slider({           
                value: Math.floor(_min),            
                min: Math.floor(_min),     
                max: Math.floor(_max),         
                step:num,         
                slide: function(event, ui){
                    $("#"+Iid).val(ui.value);
                    $("#"+Iid).change();
                },
                change: function(event, ui){
                    revert = ui.value;
                }       
            });

            $("body").on("change keyup", "#"+Iid, function(){
                if($.fn._isFloat(_step)){
                    if((parseFloat(this.value) >= parseFloat(_min) && parseFloat(this.value) <= parseFloat(_max)) && $.isNumeric(this.value) && Float_regex.test(this.value)){
                        sliderCtrl.slider("value", this.value);
                        revert = this.value;
                        $(this).removeClass("invalid_modify");
                        $.fn._isModified($(this));
                    }else
                        $(this).addClass("invalid_modify").removeClass("modify");
                } else {
                    if((parseInt(this.value) >= parseInt(_min) && parseInt(this.value) <= parseInt(_max)) && $.isNumeric(this.value) && Number_regex.test(this.value)){
                        sliderCtrl.slider("value", this.value);
                        revert = this.value;
                        $(this).removeClass("invalid_modify");
                        $.fn._isModified($(this));
                    }else
                        $(this).addClass("invalid_modify").removeClass("modify");
                }
                $.fn._runChecking(check_div);
            });
        } else if(type == "active"){
            var sliderCtrl = $("#"+Sid).slider({           
                value: Math.floor($("#"+Iid).attr("de_val") || 0),
                min: Math.floor(_min),
                max: Math.floor(_max),
                step: num,         
                slide: function(event, ui) {             
                    $("#"+Iid).val(ui.value);
                    $("#"+Iid).change();
                },
                change: function(event, ui){
                    if($("#"+Iid).attr("class") == "invalid_modify"){}
                    else
                    {
                        var _uapiName = $("#"+Iid).attr("tmp_name") == undefined ? $("#"+Iid).attr("name") : $("#"+Iid).attr("tmp_name"); 
                        $.fn._runSetWithoutBlockUI(_uapiName+"="+ui.value);
                        revert = ui.value;
                        _uapiName = null;
                    }
                }       
            });
            
            $("body").on("change keyup", "#"+Iid, function(){
                if($.fn._isFloat(_step)){
                    if((parseFloat(this.value) >= parseFloat(_min) && parseFloat(this.value) <= parseFloat(_max)) && $.isNumeric(this.value) && Float_regex.test(this.value)){
                        sliderCtrl.slider("value", this.value);
                        revert = this.value;
                        $(this).removeClass("invalid_modify");
                    }else
                        $(this).addClass("invalid_modify");
                } else {
                    if((parseInt(this.value) >= parseInt(_min) && parseInt(this.value) <= parseInt(_max)) && $.isNumeric(this.value) && Number_regex.test(this.value)){
                        sliderCtrl.slider("value", this.value);
                        revert = this.value;
                        $(this).removeClass("invalid_modify");
                    }else
                        $(this).addClass("invalid_modify");
                }
            });
        }
    };

    $.fn._initializeSilderCtrlforlens = function(Sid, Iid, _max, _min, _step, check_div)
    {
        var Float_regex = /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/;
        var Number_regex = /^(\+|-)?\d+$/;
        var num = new Number(_step);
        var sliderCtrl = $("#"+Sid).slider({           
            value: Math.floor($("#"+Iid).attr("de_val") || 0),
            min: Math.floor(_min),
            max: Math.floor(_max),
            step: num,         
            slide: function(event, ui) {             
                $("#"+Iid).val(ui.value);
                $("#"+Iid).change();
            },
            change: function(event, ui){
                if($("#"+Iid).attr("class") == "invalid_modify"){}
                else
                {
                    var _uapiName = $("#"+Iid).attr("tmp_name");
                    var db = $.parseJSON("{\""+_uapiName+"\":\""+ui.value+"\"}");
                    var step_range = $(this).attr("id") == "Smotorized_lens_focus_move_absolute" ? "0.04" : "0.005";
                    if($("#"+Iid).attr("de_val") != ui.value){
                        if($.fn._runFormatFloat(Math.abs($("#"+Iid).attr("de_val") - ui.value), 2) <= parseFloat(step_range)){}
                        else
                        {
                            if($(".blockUI").attr("style") == undefined)
                                $.fn._runSetWithBlockUIWithView(db, function(){});
                            else
                                $.fn._runSetWithoutBlockUIbyPost(db, function(){});
                            user_modify = 1;
                        }
                    }

                    _uapiName = null;
                }
            }       
        });
        
        $("body").on("change keyup", "#"+Iid, function(){
            if($.fn._isFloat(_step)){
                if((parseFloat(this.value) >= parseFloat(_min) && parseFloat(this.value) <= parseFloat(_max)) && $.isNumeric(this.value) && Float_regex.test(this.value)){
                    sliderCtrl.slider("value", this.value);
                    $(this).removeClass("invalid_modify");
                }else
                    $(this).addClass("invalid_modify");
            } else {
                if((parseInt(this.value) >= parseInt(_min) && parseInt(this.value) <= parseInt(_max)) && $.isNumeric(this.value) && Number_regex.test(this.value)){
                    sliderCtrl.slider("value", this.value);
                    $(this).removeClass("invalid_modify");
                }else
                    $(this).addClass("invalid_modify");
            }
        });
    };

    $.fn._initializeSilderCtrlforLimit = function(Sid, Iid, _max, _min, _step, type, Tid, check_div)
    {
        var Number_regex = /^(\+|-)?\d+$/;
        var num = new Number(_step);
        var sliderCtrl = $("#"+Sid).slider({           
            value: Math.floor(_min),            
            min: Math.floor(_min),     
            max: Math.floor(_max),         
            step:num,         
            slide: function(event, ui){
                $("#"+Iid).val(ui.value);
                $("#"+Iid).change();
            },
            change: function(event, ui){
            }       
        });

        $("body").on("change keyup", "#"+Iid, function(){
            if((parseInt(this.value) >= parseInt(_min) && parseInt(this.value) <= parseInt(_max)) && $.isNumeric(this.value) && Number_regex.test(this.value)){
                sliderCtrl.slider("value", this.value);
                $(this).removeClass("invalid_modify");
                $.fn._isModified($(this));
                if(type == "less_than"){
                    if(this.value <= $("#"+Tid).val()){
                        var n_v  = $("#"+Tid).val();
                        $("#"+Tid).val(parseInt(n_v) - 1).change();
                    }

                } else if(type == "greater_than"){
                    if(this.value >= $("#"+Tid).val()){
                        var n_v  = $("#"+Tid).val();
                        $("#"+Tid).val(parseInt(n_v) + 1).change();
                    } 
                }
            }else
                $(this).addClass("invalid_modify").removeClass("modify");
            $.fn._runChecking(check_div);
        });
    };

    $.fn._initializeSilderCtrlforActivex = function(Sid, Iid, _max, _min, _step, check_div)
    {
        var Number_regex = /^(\+|-)?\d+$/;
        var num = new Number(_step);
        var sliderCtrl = $("#"+Sid).slider({           
            value: Math.floor(_min),            
            min: Math.floor(_min),     
            max: Math.floor(_max),         
            step:num,         
            slide: function(event, ui){
                $("#"+Iid).val(ui.value);
                $("#"+Iid).change();
            },
            change: function(event, ui){
            }       
        });

        $("body").on("change keyup", "#"+Iid, function(){
            if((parseInt(this.value) >= parseInt(_min) && parseInt(this.value) <= parseInt(_max)) && $.isNumeric(this.value) && Number_regex.test(this.value)){
                sliderCtrl.slider("value", this.value);
                var ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0);
                $(this).removeClass("invalid_modify");
                $.fn._isModified($(this));
                if(Iid == "Ivideo_area_counting_count_location_x"){
                    var x = this.value
                    , y = $("#Ivideo_area_counting_count_location_y").val()
                    ;
                    ActivexPlayerObject.SetAreaCounterPosition(x, y);
                } else if(Iid == "Ivideo_area_counting_count_location_y"){
                    var x = $("#Ivideo_area_counting_count_location_x").val()
                    , y = this.value
                    ;
                    ActivexPlayerObject.SetAreaCounterPosition(x, y); 
                }
            }else
                $(this).addClass("invalid_modify").removeClass("modify");
            $.fn._runChecking(check_div);
        });
    };

    /* trigger relative event function */
    $.fn._initializeEncode = function()
    {
        var renderProfile = function()
        {
            if(All_support_res[0] == undefined)
            {
                $.get('/cgi-bin/streamTable.cgi?'+(new Date()).getTime(),function(data){
                    $(data).find('resolutions').children().each(function(){
                        All_support_res[$(this).attr('index')] = $.trim($(this).attr('config'));
                    });

                    $(data).find('condition').each(function(n){
                        var stream={};
                        $(this).children().each(function(){
                            stream[$(this).attr('type')]={'resolution':All_support_res[$(this).attr('conf_id')], 'framerate':$(this).attr('fps')};
                        });
                        ResTable[n] = stream;
                    });

                    $(data).find('combination').children().each(function(){
                        var type=$(this).attr('type');
                        ResOptions[type]=[];
                        $(this).find('resolution').each(function(){
                            ResOptions[type].push(All_support_res[$(this).attr('conf_id')]);
                        });
                        ResOptions[type] = $.fn._runInsertionSort(ResOptions[type], function(m, n){
                            return $.fn._runRes2int(m) < $.fn._runRes2int(n)? 1:-1; 
                        });
                    });

                    $(data).find('framerates').each(function(){
                        var type=$(this).attr('type');
                        FpsOptions[type]=[];
                        $(this).find('fps').each(function(){
                            FpsOptions[type].push( $(this).attr('value') );
                        });
                        FpsOptions[type] = $.fn._runInsertionSort(FpsOptions[type], function(x, y){
                            return Math.round(x) < Math.round(y)?1:-1;
                        });
                    });

                    // prevent s2 fps abnormal
                    if($.fn.GetPlatForm() == "xarina_entry"){}
                    else
                    {
                        FpsOptions["ntsc"] = [];
                        FpsOptions["pal"] = [];
                    }

                    parserProfile();
                    genRes();
                });
            }
        };

        var parserProfile = function()
        {
            var cur_profile_param = $("#Iencode_profile_config").val()
            , tmp = cur_profile_param.split(",")
            , ind = -1
            ;
            // callback value
            for(var i = 1; i <= 3; i++){
                if(tmp[i-1] != undefined){
                    ind = tmp[i-1].indexOf("/");
                    $("#Iencode_profile_stream_"+i+"_compression").attr("de_val", tmp[i-1].slice(0, ind));
                    $("#Iencode_profile_stream_"+i+"_codec").attr("de_val", tmp[i-1].slice(ind+1, tmp[i-1].length));
                } else {
                    $("#Iencode_profile_stream_"+i+"_compression").attr("de_val", "off");
                    $("#Iencode_profile_stream_"+i+"_codec").attr("de_val", "h264");
                }
            }
        };

        var genRes = function()
        {
            var codecs = [ "h264", "mjpeg" ]
            , fps_1_max = 1
            , aply_elm = $.fn.GetCameraType() == "ntsc" ? 
                $("#Iencode_profile_stream_1_ntsc_frame_rate") : $("#Iencode_profile_stream_1_pal_frame_rate")
            , tmp_res_1 = $("#Iencode_profile_stream_1_compression").attr("de_val")
            , tmp_fps_1 = $(aply_elm).attr("de_val")
            ;
            // add resolution options and callback value.
            $.each(ResOptions, function(n){
                // first time only insert stream1 options
                if(ResOptions[n] != undefined && n == 1){
                    $.each(ResOptions[n], function(m){
                        if($("#Iencode_profile_stream_"+Number(n)+"_compression").attr("de_val") == ResOptions[n][m])
                            $("#Iencode_profile_stream_"+Number(n)+"_compression").append($("<option></option>").attr("value", ResOptions[n][m]).text(ResOptions[n][m]).attr("selected","true"));
                        else
                            $("#Iencode_profile_stream_"+Number(n)+"_compression").append($("<option></option>").attr("value", ResOptions[n][m]).text(ResOptions[n][m]));
                    });
                }
            });
            
            $.each(ResTable, function(n){
                $.each(ResTable[n], function(m){
                    // search condition
                    if((ResTable[n][1].resolution == tmp_res_1) && (ResTable[n][1].framerate >= tmp_fps_1)){
                        fps_1_max = ResTable[n][1].framerate > fps_1_max ? ResTable[n][1].framerate : fps_1_max;
                        return true;
                    }
                });
            });
            
            for(var i = 1; i <= 3; i++){
                // add codec options and callback value.
                $.each(codecs, function(n){
                    if($("#Iencode_profile_stream_"+i+"_codec").attr("de_val") == codecs[n])
                        $("#Iencode_profile_stream_"+i+"_codec").append($("<option></option>").attr("value", codecs[n]).text(codecs[n].toUpperCase()).attr("selected","true"));
                    else
                        $("#Iencode_profile_stream_"+i+"_codec").append($("<option></option>").attr("value", codecs[n]).text(codecs[n].toUpperCase()));
                });

                var del_elm = $.fn.GetCameraType() == "ntsc" ? 
                    $("#Iencode_profile_stream_"+i+"_pal_frame_rate").remove() : $("#Iencode_profile_stream_"+i+"_ntsc_frame_rate").remove()
                ;
                del_elm;
                if(FpsOptions[$.fn.GetCameraType()].length == 0)
                {
                    if($.fn.GetCameraType() == "pal" && fps_1_max == 60)
                        fps_1_max = 50;
                    else if($.fn.GetCameraType() == "pal" && fps_1_max == 30)
                        fps_1_max = 25;
                    else if($.fn.GetCameraType() == "pal" && fps_1_max == 15)
                        fps_1_max = 12;

                    if(i == 1){
                        var j = fps_1_max;
                        for(j; j > 0; j--){
                            if($(aply_elm).attr("de_val") == j)
                                $(aply_elm).append($("<option></option>").attr("value", j).text(j).attr("selected","true"));
                            else
                                $(aply_elm).append($("<option></option>").attr("value", j).text(j));
                        }
                    }
                }
                else
                {
                    aply_elm = $.fn.GetCameraType() == "ntsc" ? 
                        $("#Iencode_profile_stream_"+i+"_ntsc_frame_rate") : $("#Iencode_profile_stream_"+i+"_pal_frame_rate")
                    ;
                    var type = $.fn.GetCameraType();
                    $.each(FpsOptions[type], function(n){
                        if(Number(FpsOptions[type][n]) > Number(fps_1_max))
                            return true;
                        if($(aply_elm).attr("de_val") == FpsOptions[type][n])
                            $(aply_elm).append($("<option></option>").attr("value", FpsOptions[type][n]).text(FpsOptions[type][n]).attr("selected","true"));
                        else
                            $(aply_elm).append($("<option></option>").attr("value", FpsOptions[type][n]).text(FpsOptions[type][n]));
                    });
                }
            }
            // setup UI control function
            for(var i = 1; i <= 3; i++){
                $("body").on("change", "#Iencode_profile_stream_"+i+"_codec", function(){
                    var id = $(this).attr("id")
                    , _num = id.match(/\d\d/g) == null ? id.match(/\d/g) : id.match(/\d\d/g)
                    , res_tmp = $("#Iencode_profile_stream_"+_num+"_compression").val()
                    ;
                    if(res_tmp == "off")
                        return false;
                    if($(this).val() == "h264")
                    {
                        $("#Mencode_profile_stream_"+_num+"_h264_profile").parent().show();
                        $("#Iencode_profile_stream_"+_num+"_h264_profile").parent().show();
                        $("#Mencode_profile_stream_"+_num+"_h264_gop").parent().show();
                        $("#Iencode_profile_stream_"+_num+"_h264_gop").parent().show();
                        $("#Mencode_profile_stream_"+_num+"_rate_control").parent().show();
                        $("#Iencode_profile_stream_"+_num+"_h264_rate_control").parent().show();
                        $("#Mencode_profile_stream_"+_num+"_mjpeg_quality_level").hide();
                        $("#Iencode_profile_stream_"+_num+"_mjpeg_quality_level").hide();
                        if($.fn.GetPlatForm() == "xarina_entry"){
                            $("#Mencode_profile_stream_"+_num+"_svct").hide();
                            $("#Iencode_profile_stream_"+_num+"_svct").hide();
                        } else {
                            $("#Mencode_profile_stream_"+_num+"_svct").show();
                            $("#Iencode_profile_stream_"+_num+"_svct").show();
                        }
                        $("#Iencode_profile_stream_"+_num+"_h264_rate_control").change();
                    }
                    else if($(this).val() == "mjpeg")
                    {
                        $("#Mencode_profile_stream_"+_num+"_h264_profile").parent().hide();
                        $("#Iencode_profile_stream_"+_num+"_h264_profile").parent().hide();
                        $("#Mencode_profile_stream_"+_num+"_h264_gop").parent().hide();
                        $("#Iencode_profile_stream_"+_num+"_h264_gop").parent().hide();
                        $("#Mencode_profile_stream_"+_num+"_rate_control").parent().hide();
                        $("#Iencode_profile_stream_"+_num+"_h264_rate_control").parent().hide();
                        $("#Mencode_profile_stream_"+_num+"_h264_cvbr_bitrate_max").parent().parent().hide();
                        $("#Mencode_profile_stream_"+_num+"_h264_cbr_bitrate").parent().parent().hide();
                        $("#Mencode_profile_stream_"+_num+"_svct").hide();
                        $("#Iencode_profile_stream_"+_num+"_svct").hide();
                        $("#Mencode_profile_stream_"+_num+"_mjpeg_quality_level").show();
                        $("#Iencode_profile_stream_"+_num+"_mjpeg_quality_level").show();

                    }
                    refreshProfile();
                    $.fn._runChecking("sub_encode");

                    if ( $(this).val() == "mjpeg" && FunData.playback_str == _num) {
                        console.log("check enter "+ _num);
                        $("#Mencode_stream"+_num+"_playback_warning").show();
                        $(this).addClass("invalid_modify").removeClass("modify");
                        $("#Save_Isub_encode").removeClass("can_modify").addClass("not_modify");
                    }else{
                         $("#Mencode_stream"+_num+"_playback_warning").hide();
                         $(this).removeClass("invalid_modify");
                         $.fn._isModified($(this));
                         $.fn._runChecking("sub_encode");
                    }
                });

                $("body").on("change", "#Iencode_profile_stream_"+i+"_h264_rate_control", function(){
                    var id = $(this).attr("id").split("_h264_rate_control")
                    , _num = id[0].match(/\d\d/g) == null ? id[0].match(/\d/g) : id[0].match(/\d\d/g)
                    , res_tmp = $("#Iencode_profile_stream_"+_num+"_compression").val()
                    , res_codec = $("#Iencode_profile_stream_"+_num+"_codec").val()
                    ;
                    if(res_tmp == "off" || res_codec == "mjpeg")
                        return false;
                    if($(this).val() == "cbr")
                    {
                        $("#Mencode_profile_stream_"+_num+"_h264_cvbr_bitrate_max").parent().parent().hide();
                        $("#Mencode_profile_stream_"+_num+"_h264_cbr_bitrate").parent().parent().show();
                        $("#Iencode_profile_stream_"+_num+"_h264_cbr_bitrate").change();
                    }
                    else if($(this).val() == "cvbr")
                    {
                        $("#Mencode_profile_stream_"+_num+"_h264_cvbr_bitrate_max").parent().parent().show();
                        $("#Mencode_profile_stream_"+_num+"_h264_cbr_bitrate").parent().parent().hide();
                        $("#Iencode_profile_stream_"+_num+"_h264_cvbr_bitrate_max").change();
                    }
                    $.fn._isModified($(this));
                    $.fn._runChecking("sub_encode");
                });

                $("body").on("change", "#Iencode_profile_stream_"+i+"_compression", function(){
                    var id = $(this).attr("id")
                    , _num = id.match(/\d\d/g) == null ? id.match(/\d/g) : id.match(/\d\d/g)
                    ;
                    updateTable(id, _num);
                    refreshProfile();
                    $.fn._runChecking("sub_encode");
                });

                $("body").on("change", "#Iencode_profile_stream_"+i+"_h264_profile", function(){
                    $.fn._isModified($(this));
                    $.fn._runChecking("sub_encode");
                });

                $("body").on("change", "#Iencode_profile_stream_"+i+"_ntsc_frame_rate", function(){
                    var id = $(this).attr("id")
                    , _num = id.match(/\d\d/g) == null ? id.match(/\d/g) : id.match(/\d\d/g)
                    , compress_id = "Iencode_profile_stream_"+_num+"_compression"
                    ;
                    updateTable(compress_id, _num);
                    refreshProfile();
                    $.fn._isModified($(this));
                    $.fn._runChecking("sub_encode");
                });

                $("body").on("change", "#Iencode_profile_stream_"+i+"_pal_frame_rate", function(){
                    var id = $(this).attr("id")
                    , _num = id.match(/\d\d/g) == null ? id.match(/\d/g) : id.match(/\d\d/g)
                    , compress_id = "Iencode_profile_stream_"+_num+"_compression"
                    ;
                    updateTable(compress_id, _num);
                    refreshProfile();
                    $.fn._isModified($(this));
                    $.fn._runChecking("sub_encode");
                });

                $("body").on("change", "#Iencode_profile_stream_"+i+"_mjpeg_quality_level", function(){
                    $.fn._isModified($(this));
                    $.fn._runChecking("sub_encode");
                });

                 $("body").on("change", "#Iencode_profile_stream_"+i+"_svct", function(){
                    $.fn._isModified($(this));
                    $.fn._runChecking("sub_encode");
                });

                $("body").on("change, keyup", "#Iencode_profile_stream_"+i+"_dscp", function(){
                    value = $(this).val();
                    if((parseInt(value) >= 0 && parseInt(value) <= 63) && $.isNumeric(value))
                    {
                        $(this).removeClass("invalid_modify");
                        $.fn._isModified($(this));
                    }
                    else
                        $(this).addClass("invalid_modify").removeClass("modify");
                    $.fn._runChecking("sub_encode");
                });

                $("#Iencode_profile_stream_"+i+"_compression").change();
            }
        };

        var updateTable = function(id, str_num)
        {
            var res_index = "", fps_index = 0, i = 0, reset_fps = 0, fps_1_max = 0, fps_2_max = 0, fps_3_max = 0, str_2_list = [], str_3_list = [];
            res_index = $("#"+id).val()
            , fps_obj = $.fn.GetCameraType() == "pal" ? $("#Iencode_profile_stream_"+str_num+"_pal_frame_rate") : $("#Iencode_profile_stream_"+str_num+"_ntsc_frame_rate")
            , fps_index = fps_obj.attr("de_val") == undefined ? 
                ( $.fn.GetCameraType() == "pal" ? $("#Iencode_profile_stream_"+str_num+"_pal_frame_rate").attr("de_val") : $("#Iencode_profile_stream_"+str_num+"_ntsc_frame_rate").attr("de_val") ) :
                ( $.fn.GetCameraType() == "pal" ? $("#Iencode_profile_stream_"+str_num+"_pal_frame_rate").val() : $("#Iencode_profile_stream_"+str_num+"_ntsc_frame_rate").val())
            ;
            // when current change is stream1
            if(str_num == 1){
                // clean array.
                ResList = [];
                // create query resolution table.
                $.each(ResTable, function(n){
                    $.each(ResTable[n], function(m){
                        // search condition
                        if((ResTable[n][1].resolution == res_index) && (Number(ResTable[n][1].framerate) >= Number(fps_index))){
                            fps_1_max = ResTable[n][1].framerate > fps_1_max ? ResTable[n][1].framerate : fps_1_max;
                            fps_2_max = ResTable[n][2].framerate > fps_2_max ? ResTable[n][2].framerate : fps_2_max;
                            ResList[i] = ResTable[n];
                            i++;
                            return true;
                        }
                    });
                });
                // found the condition only reference resolution don't include fps.
                // when search condition of resolution && fps doesn't no one is match.
                if(ResList.length == 0){
                    $.each(ResTable, function(n){
                        $.each(ResTable[n], function(m){
                            // search condition
                            if((ResTable[n][1].resolution == res_index)){
                                fps_1_max = ResTable[n][1].framerate > fps_1_max ? ResTable[n][1].framerate : fps_1_max;
                                return true;
                            }
                        });
                    });

                    reset_fps = fps_1_max;
                    $.each(ResTable, function(n){
                        $.each(ResTable[n], function(m){
                            // search condition
                            if((ResTable[n][1].resolution == res_index) && (Number(ResTable[n][1].framerate) >= Number(reset_fps))){
                                fps_1_max = ResTable[n][1].framerate > fps_1_max ? ResTable[n][1].framerate : fps_1_max;
                                fps_2_max = ResTable[n][2].framerate > fps_2_max ? ResTable[n][2].framerate : fps_2_max;
                                ResList[i] = ResTable[n];
                                i++;
                                return true;
                            }
                        });
                    });
                }

                // insert fps options and callback value
                if(FpsOptions[$.fn.GetCameraType()].length == 0)
                {
                    if($.fn.GetCameraType() == "pal" && fps_1_max == 60)
                        fps_1_max = 50;
                    else if($.fn.GetCameraType() == "pal" && fps_1_max == 30)
                        fps_1_max = 25;
                    else if($.fn.GetCameraType() == "pal" && fps_1_max == 15)
                        fps_1_max = 12;

                    var aply_elm = $.fn.GetCameraType() == "ntsc" ? 
                        $("#Iencode_profile_stream_1_ntsc_frame_rate") : $("#Iencode_profile_stream_1_pal_frame_rate");

                    // if fps option is not equals the max fps, reset stream1 fps options.
                    if($(aply_elm).children("option").val() != fps_1_max)
                    {
                        $(aply_elm).children().remove();
                        i = fps_1_max;
                        for(i; i > 0; i--){
                            if(fps_index == i)
                                $(aply_elm).append($("<option></option>").attr("value", i).text(i).attr("selected","true"));
                            else
                                $(aply_elm).append($("<option></option>").attr("value", i).text(i));
                        }
                        $.fn._isModified(aply_elm);
                    }

                    if($.fn.GetCameraType() == "pal" && fps_2_max == 60)
                        fps_2_max = 50;
                    else if($.fn.GetCameraType() == "pal" && fps_2_max == 30)
                        fps_2_max = 25;
                    else if($.fn.GetCameraType() == "pal" && fps_2_max == 15)
                        fps_2_max = 12;

                    aply_elm = $.fn.GetCameraType() == "ntsc" ? 
                        $("#Iencode_profile_stream_2_ntsc_frame_rate") : $("#Iencode_profile_stream_2_pal_frame_rate");

                    // if fps option is not equals the max fps, reset stream2 fps options.
                    if($(aply_elm).children("option").val() != fps_2_max)
                    {
                        $(aply_elm).children().remove();
                        i = fps_2_max;
                        for(i; i > 0; i--){
                            if($(aply_elm).attr("de_val") == i)
                                $(aply_elm).append($("<option></option>").attr("value", i).text(i).attr("selected","true"));
                            else
                                $(aply_elm).append($("<option></option>").attr("value", i).text(i));
                        }
                        $.fn._isModified(aply_elm);
                    }
                }
                else
                {
                    if($.fn.GetCameraType() == "pal" && fps_1_max == 30)
                        fps_1_max = 25;
                    else if($.fn.GetCameraType() == "pal" && fps_1_max == 15)
                        fps_1_max = 12.5;

                    for(var i = 1; i <= 3; i++)
                    {
                        var aply_elm = $.fn.GetCameraType() == "ntsc" ? 
                        $("#Iencode_profile_stream_"+i+"_ntsc_frame_rate") : $("#Iencode_profile_stream_"+i+"_pal_frame_rate");
                        if($(aply_elm).children("option").val() != fps_1_max)
                        {
                            $(aply_elm).children().remove();
                            var type = $.fn.GetCameraType();
                            $.each(FpsOptions[type], function(n){
                                if(Number(FpsOptions[type][n]) > Number(fps_1_max))
                                    return true;
                                if($(aply_elm).attr("de_val") == FpsOptions[type][n])
                                    $(aply_elm).append($("<option></option>").attr("value", FpsOptions[type][n]).text(FpsOptions[type][n]).attr("selected","true"));
                                else
                                    $(aply_elm).append($("<option></option>").attr("value", FpsOptions[type][n]).text(FpsOptions[type][n]));
                            });
                            $.fn._isModified(aply_elm);
                        }   
                    }
                }

                // create resolution combinarion for stream2.
                $.each(ResList, function(n){
                    $.each(ResList[n], function(m){
                        if(m == 2){
                            var found = 0;
                            $.each(str_2_list, function(t){
                                if(str_2_list[t] == ResList[n][m].resolution){
                                    found = 1;
                                    return true;
                                }
                            });

                            if(!found)
                                str_2_list[str_2_list.length] = ResList[n][m].resolution;
                        }
                    });
                });

                // remove stream compression options
                $("#Iencode_profile_stream_2_compression").children().remove();

                // sorting resolution options
                str_2_list = $.fn._runInsertionSort(str_2_list, function(m, n){
                    return $.fn._runRes2int(m) < $.fn._runRes2int(n)? 1:-1; 
                });

                // console.log("str_2_list:"+str_2_list);
                
                // insert stream2 options
                $.each(str_2_list, function(n){
                    if($("#Iencode_profile_stream_2_compression").attr("de_val") == str_2_list[n])
                        $("#Iencode_profile_stream_2_compression").append($("<option></option>").attr("value", str_2_list[n]).text(str_2_list[n]).attr("selected","true"));
                    else
                        $("#Iencode_profile_stream_2_compression").append($("<option></option>").attr("value", str_2_list[n]).text(str_2_list[n]));
                });

                updateCodec($("#"+id).val(), str_num);
                $("#Iencode_profile_stream_2_compression").change();

            } else if(str_num == 2){ // when current change is stream2
                var str1_fps = $("#Iencode_profile_stream_1_ntsc_frame_rate").val() == undefined ? 
                $("#Iencode_profile_stream_1_pal_frame_rate").val() : $("#Iencode_profile_stream_1_ntsc_frame_rate").val()
                , str1_res = $("#Iencode_profile_stream_1_compression").val()
                , str2_res = $("#Iencode_profile_stream_2_compression").val()
                ;
                // create resolution combinarion for stream3.
                $.each(ResList, function(n){
                    $.each(ResList[n], function(m){
                        if((ResList[n][1].resolution == str1_res && Number(ResList[n][1].framerate) >= Number(str1_fps)) && (ResList[n][2].resolution == str2_res && Number(ResList[n][2].framerate) >= Number(fps_index))){
                            if(m == 3){
                                var found = 0;
                                $.each(str_3_list, function(t){
                                    if(str_3_list[t] == ResList[n][m].resolution){
                                        fps_3_max = ResList[n][3].framerate > fps_3_max ? ResList[n][3].framerate : fps_3_max;
                                        found = 1;
                                        return true;
                                    }
                                });

                                if(!found)
                                    str_3_list[str_3_list.length] = ResList[n][m].resolution;
                            }
                        }
                    });
                });
                // insert fps options and callback value
                if(FpsOptions[$.fn.GetCameraType()].length == 0)
                {
                    if($.fn.GetCameraType() == "pal" && fps_3_max == 60)
                        fps_3_max = 50;
                    else if($.fn.GetCameraType() == "pal" && fps_3_max == 30)
                        fps_3_max = 25;
                    else if($.fn.GetCameraType() == "pal" && fps_3_max == 15)
                        fps_3_max = 12;

                    var aply_elm = $.fn.GetCameraType() == "ntsc" ? 
                        $("#Iencode_profile_stream_3_ntsc_frame_rate") : $("#Iencode_profile_stream_3_pal_frame_rate");

                    // if fps option is not equals the max fps, reset stream3 fps options.
                    if($(aply_elm).children("option").val() != fps_3_max)
                    {
                        $(aply_elm).children().remove();
                        i = fps_3_max;
                        for(i; i > 0; i--){
                            if($(aply_elm).attr("de_val") == i)
                                $(aply_elm).append($("<option></option>").attr("value", i).text(i).attr("selected","true"));
                            else
                                $(aply_elm).append($("<option></option>").attr("value", i).text(i));
                        }
                        $.fn._isModified(aply_elm);
                    }
                }

                // remove stream compression options
                $("#Iencode_profile_stream_3_compression").children().remove();

                // sorting resolution options
                str_3_list = $.fn._runInsertionSort(str_3_list, function(m, n){
                    return $.fn._runRes2int(m) < $.fn._runRes2int(n)? 1:-1; 
                });

                if(str_3_list.length == 0)
                    str_3_list[0] = "off";

                // console.log("str_3_list:"+str_3_list);

                // insert stream3 options
                $.each(str_3_list, function(n){
                    if($("#Iencode_profile_stream_3_compression").attr("de_val") == str_3_list[n])
                        $("#Iencode_profile_stream_3_compression").append($("<option></option>").attr("value", str_3_list[n]).text(str_3_list[n]).attr("selected","true"));
                    else
                        $("#Iencode_profile_stream_3_compression").append($("<option></option>").attr("value", str_3_list[n]).text(str_3_list[n]));
                });

                updateCodec($("#"+id).val(), str_num);
                $("#Iencode_profile_stream_3_compression").change();
            } else if(str_num == 3) {
                updateCodec($("#"+id).val(), str_num);
            }
        };

        var updateCodec = function(src, str_num)
        {
            if(src != "off")
            {
                if(str_num == 1 || str_num == 2){
                    var ind = src.indexOf('x')
                    , wid = src.slice(0, ind)
                    , hei = src.slice(ind+1, src.length)
                    ;
                    if((Number(wid) * Number(hei)) > Number(2073600)){
                        if($("#Iencode_profile_stream_"+str_num+"_codec").children().size() > 1){
                            $("#Iencode_profile_stream_"+str_num+"_codec").children().remove();
                            $("#Iencode_profile_stream_"+str_num+"_codec").append($("<option value=\"h264\">H264</option>"));
                        }
                    } else {
                        if($("#Iencode_profile_stream_"+str_num+"_codec").children().size() <= 1){
                            var opt = $("#Iencode_profile_stream_"+str_num+"_codec").attr("de_val");
                            $("#Iencode_profile_stream_"+str_num+"_codec").children().remove();
                            $("#Iencode_profile_stream_"+str_num+"_codec").append($("<option value=\"h264\">H264</option>"));
                            $("#Iencode_profile_stream_"+str_num+"_codec").append($("<option value=\"mjpeg\">MJPEG</option>"));
                            $("#Iencode_profile_stream_"+str_num+"_codec > option[value="+opt+"]").attr("selected","true");
                        }
                    }
                }  
            }

            if(src == "off"){
                $("#Mencode_profile_stream_"+str_num+"_frame_rate").parent().parent().hide();
                $("#Mencode_profile_stream_"+str_num+"_dscp").parent().parent().hide();
                $("#Mencode_profile_stream_"+str_num+"_rate_control").parent().parent().hide();
                $("#Mencode_profile_stream_"+str_num+"_h264_cvbr_bitrate_max").parent().parent().hide();
                $("#Mencode_profile_stream_"+str_num+"_h264_cbr_bitrate").parent().parent().hide();
            } else {
                $("#Mencode_profile_stream_"+str_num+"_frame_rate").parent().parent().show();
                $("#Mencode_profile_stream_"+str_num+"_dscp").parent().parent().show();
                $("#Mencode_profile_stream_"+str_num+"_rate_control").parent().parent().show();
                $("#Mencode_profile_stream_"+str_num+"_h264_cvbr_bitrate_max").parent().parent().show();
                $("#Mencode_profile_stream_"+str_num+"_h264_cbr_bitrate").parent().parent().show();
                $("#Iencode_profile_stream_"+str_num+"_codec").change();
            }
        };

        var parserData = function(data)
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
                        $("#Isub_encode select[tmp_name='"+param+"'] > option[value='"+uapivalue+"']").prop("selected",true);
                        $("#Isub_encode select[tmp_name='"+param+"']").attr("de_val", uapivalue);
                    } catch(e) {}

                    try {
                        $("#Isub_encode input[tmp_name='"+param+"'][type=text]").val(uapivalue).attr("de_val", uapivalue);
                    } catch(e) {}
                }
            });
        };

        var updateProfile = function(id, db)
        {
            $.ajax({
                beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
                url:'/cgi-bin/get?',
                dataType:'json',
                type:'POST',
                data:db,
                cache:false,
                success:function(data){
                    parserData(data);
                    parserProfile();
                    $("#Iencode_profile_stream_1_compression > option[value="+$("#Iencode_profile_stream_1_compression").attr("de_val")+"]").prop("selected",true);
                    for(var i = 1; i <= 3; i++)
                        $("#Iencode_profile_stream_"+i+"_codec > option[value="+$("#Iencode_profile_stream_"+i+"_codec").attr("de_val")+"]").prop("selected",true);
                },
                error:function(){
                    console.log("update profile failed.");
                },
                complete:function(){
                    $.removeCookie('ipcamera', { path: '/' });
                    $("#Iencode_profile_stream_1_compression").change();
                    // fixed loadback parameter cannot setting correct index.
                    var els = $.fn.GetCameraType() == "pal" ? $("#Iencode_profile_stream_1_pal_frame_rate") : $("#Iencode_profile_stream_1_ntsc_frame_rate");
                    if(els.val() != els.attr("de_val")){
                        els.children("option[value="+els.attr("de_val")+"]").attr("selected","true").change();
                    }
                }
            });
        };

        var refreshCodecback = function()
        {
            $("#Iencode_profile_stream_1_codec > option[value="+$("#Iencode_profile_stream_1_codec").attr("de_val")+"]").prop("selected",true);
            $("#Iencode_profile_stream_2_codec > option[value="+$("#Iencode_profile_stream_2_codec").attr("de_val")+"]").prop("selected",true);
            $("#Iencode_profile_stream_3_codec > option[value="+$("#Iencode_profile_stream_3_codec").attr("de_val")+"]").prop("selected",true);
        };

        var refreshProfile = function()
        {
            var str_1_res = $("#Iencode_profile_stream_1_compression").val()
            , str_1_code = $("#Iencode_profile_stream_1_codec").val()
            , str_2_res = $("#Iencode_profile_stream_2_compression").val()
            , str_2_code = $("#Iencode_profile_stream_2_codec").val()
            , str_3_res = $("#Iencode_profile_stream_3_compression").val()
            , str_3_code = $("#Iencode_profile_stream_3_codec").val()
            , tmp = ""
            ;

            tmp += str_1_res+"/"+str_1_code;
            if(str_2_res != "off")
                tmp += ","+str_2_res+"/"+str_2_code;

            if(str_3_res != "off")
                tmp += ","+str_3_res+"/"+str_3_code;
            
            $("#Iencode_profile_config").val(tmp).change();
        };

        renderProfile();
        $("div[conf='sub_encode'] div.slider").each(function(){
            var Sid = $(this).attr("id")
            , Iid = $(this).siblings("input").attr("id")
            , Max
            , Min
            , tmp = ""
            , span_obj
            ;
            if($(this).attr("_max_cust") == undefined && $(this).attr("_min_cust") == undefined){
                Max = $(this).attr("_max");
                Min = $(this).attr("_min");
            } else {
                if($(this).attr("_max_cust") != undefined){
                    tmp = $(this).attr("_max_cust").split(',');
                    if($.fn.GetPlatForm() == tmp[0]){
                        Max = tmp[1];
                    } else {
                        Max = $(this).attr("_max");
                    }
                } else
                    Max = $(this).attr("_max");

                if($(this).attr("_min_cust") != undefined){
                    tmp = $(this).attr("_min_cust").split(',');
                    if($.fn.GetPlatForm() == tmp[0]){
                        Min = tmp[1];
                    } else {
                        Min = $(this).attr("_min");
                    }
                } else
                    Min = $(this).attr("_min");
            }
            span_obj = $(this).siblings("span");
            $(span_obj)[0].innerHTML = "("+Min+"~"+Max+")";
            $.fn._initializeSilderCtrl(Sid, Iid, Max, Min, $(this).attr("_step"), "inactive", "sub_encode");
            $("#"+Iid).change();
        });

        $("body").on("change", "#Iencode_current_profile_id", function(){
            var pid = $(this).val()
            , tmp = "{"
            ;
            tmp += $.fn._runModifyUapiName("Isub_encode", pid, "encode.current_profile_id")+"}";
            var db = $.parseJSON(tmp);
            updateProfile("Isub_encode", db);
            $.fn._isModified($(this));
            $.fn._runChecking("sub_encode");
        });

        $("body").on("encode.current_profile_id", "select[name]", function(){
            refreshCodecback();
        });

        $("body").on("change", "#Iencode_profile_corridor", function(){
            if($(this).val() == "on")
                $("#Iencode_profile_corridor_note").show();
            else if($(this).val() == "off")
                $("#Iencode_profile_corridor_note").hide();
            $.fn._isModified($(this));
            $.fn._runChecking("sub_encode");
        });

        $("body").on("change", "#Iencode_profile_config", function(){
            $.fn._isModified($(this));
        });

        $("body").on("click", "#Save_Isub_encode", function(){
            if($(this).attr("class") == "can_modify"){
                var cmd = $.fn._runCollectModifUAPI("Isub_encode");
                record_coordinate = [
                    /* privacy_zone */      ["0,0,0,0", "0,0,0,0", "0,0,0,0", "0,0,0,0", "0,0,0,0", "0,0,0,0", "0,0,0,0", "0,0,0,0"], 
                    /* roi */               ["0,0,0,0", "0,0,0,0"],
                    /* motion */            ["0,0,0,0", "0,0,0,0", "0,0,0,0", "0,0,0,0"],
                    /* line_counting */     ["0,0,0,0", "0,0,0,0", "0,0,0,0"],
                    /* loitering */         ["0,0"],
                    /* intrusion */         ["0,0"],
                    /* border_line */       ["0,0,0,0", "0,0,0,0", "0,0,0,0"],
                    /* area counting */     ["0,0"],
                    /* departure */         ["0,0"],
                    /* withdrawn */         ["0,0,0,0", "0,0,0,0", "0,0,0,0"]
                ];
                $.fn._runSetWithBlockUI(cmd, function(){
                    $("#Isub_encode .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    $("#Save_Isub_encode").removeClass("can_modify").addClass("not_modify");
                    setTimeout(parserProfile, 1000);
                    setTimeout($.fn._runUnBlockUI, 3000);
                    setTimeout($.fn.UpdateModelProperty, 1000);
                    setTimeout($.fn.initialFunParam, 1000);
                });
            }
        });

        $("#Iencode_profile_corridor").change();
    };

    $.fn._initializePrivacyZone = function()
    {
        setTimeout(function(){
            $("#Save_Isub_privacy").removeClass("not_modify").addClass("can_modify");
        }, 200);
        $("input[name=Nvideo_privacy_enable][value="+$("#video_py_zone_enable").val()+"]").prop('checked',true);
        if($("#Iprivacy_list").val() != null){
            $.each(PrivacyZone_data, function(n){
                if(n != 0){
                    if($("#Iprivacy_list").val() == PrivacyZone_data[n][0]){
                        $("#Iprivacy_delete").addClass("can_modify_without_float").removeClass("not_modify_without_float");
                        $.fn._runInitialZone(PrivacyZone_data[n][1], "privacy_zone");
                        return true;
                    }
                }
            });
        }
        if(SetupPZ)
            return true;

        var AssignPrivacyZone = function(){
            for(var i = 1; i <= 8; i++){
                PrivacyZone_data[i] = [];
                for(j = 0; j <= 1; j++){
                    if(j == 0)
                        PrivacyZone_data[i][j] = "Zone-"+i;
                    else if(j == 1)
                        PrivacyZone_data[i][j] = $("#video_py_zone_"+i+"_coordinate").val();
                }
            }

            $("input[name=Nvideo_privacy_enable][value="+$("#video_py_zone_enable").val()+"]").prop('checked',true);
            if($("#Iprivacy_list").children().length == 0)
                $.each(PrivacyZone_data, function(n){
                    if(n != 0)
                        $("#Iprivacy_list").append($("<option></option>").attr("value", PrivacyZone_data[n][0]).text(PrivacyZone_data[n][0]));
                });
        };

        var removePrivacyZone = function(num){
            var uapi = "video.privacy_zone.zone."+num+".coordinate"
            , value = "0,0,0,0,"+$.fn.GetStreamWidth()+"x"+$.fn.GetStreamHeight()
            , db = $.parseJSON("{\""+uapi+"\":\""+value+"\"}")
            ;
            record_coordinate[0][num-1] = "0,0,0,0";
            $.fn._runSetWithoutBlockUIbyPost(db, function(){
                setTimeout(function(){
                    updatePrivacy();
                }, 1000);
            });
        };

        var updatePrivacy = function(){
            var tmp = ""
            , uapiname = ""
            ;
            $("#Isub_privacy input[type='text']").each(function(){
                if($(this).attr("name") != undefined)
                    tmp += "\""+$(this).attr("name")+"\":\"\",";
            });

            tmp += "\"video.privacy_zone.color_setting\":\"\"";
            tmp = "{"+tmp+"}";
            var db = $.parseJSON(tmp);
            $.ajax({
                beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
                url:'/cgi-bin/get?',
                dataType:'json',
                type:'POST',
                data:db,
                cache:false,
                success:function(data){
                    $.each(data, function(param, val){
                        uapiname = param.replace(/[.]/g, "\\.");
                        if(param == "video.privacy_zone.color_setting")
                            $("#Ivideo_privacy_zone_color_setting > option[value="+val[1]+"]").prop('checked',true);
                        else
                            $("#Isub_privacy input[name="+uapiname+"][type=text]").val(val[1]);
                    });
                },
                error:function(){
                    console.log("updatePrivacy failed.");
                },
                complete:function(){
                    $.removeCookie('ipcamera', { path: '/' });
                    AssignPrivacyZone();
                    $("#Iprivacy_list").change();
                }
            });
        };

        var updateZone = function(data, n){
            var ind = data.lastIndexOf(',')
            , sys_coord = data.slice(0, ind)
            , ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0)
            , tmp_detect_size = ActivexPlayerObject.Get_VideoSize()
            , coordinate = $.fn._runTransferCoordinate_Sys2ui(data, tmp_detect_size)
            ;
            if(sys_coord != "0,0,0,0"){
                if(record_coordinate[0][n-1] != "0,0,0,0")
                    coordinate = record_coordinate[0][n-1];
                else
                    record_coordinate[0][n-1] = coordinate;
            }

            ActivexPlayerObject.Start_Cropping(1);
            ActivexPlayerObject.Set_CropPoint(""+coordinate+"");
        }

        var collectPrivacyZone = function(){
            var ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0)
            , tmp_coordinate = ActivexPlayerObject.Get_CropPoint()
            , tmp_detect_size = ActivexPlayerObject.Get_VideoSize()
            , coordinate = $.fn._runTransferCoordinate_ui2Sys(tmp_coordinate, tmp_detect_size)
            , pri_name = $("#Iprivacy_list").val()
            ;
            if(tmp_coordinate == "0,0,0,0")
                return true;
            $.each(PrivacyZone_data, function(n){
                if(n != 0){
                    if(pri_name == PrivacyZone_data[n][0]){
                        if(record_coordinate[0][n-1] == "0,0,0,0"){
                            record_coordinate[0][n-1] = tmp_coordinate;
                        } else {
                            if(record_coordinate[0][n-1] != tmp_coordinate){
                                record_coordinate[0][n-1] = tmp_coordinate;
                            } else
                                return false;
                        }
                        $("#video_py_zone_"+n+"_coordinate").val(coordinate).change();
                        return true;
                    }
                }
            });
        };

        $("body").on("change", "#Iprivacy_list", function(){
            var value = $(this).val();
            $.each(PrivacyZone_data, function(n){
                if(n != 0){
                    if(value == PrivacyZone_data[n][0]){
                        if((PrivacyZone_data[n][1]).search("0,0,0,0") == 0 || PrivacyZone_data[n][1] == "")
                        {
                            $("#Iprivacy_delete").addClass("not_modify_without_float").removeClass("can_modify_without_float");
                            updateZone("0,0,0,0,"+$.fn.GetStreamWidth()+"x"+$.fn.GetStreamHeight(), 0);
                        }
                        else
                        {
                            $("#Iprivacy_delete").addClass("can_modify_without_float").removeClass("not_modify_without_float");
                            updateZone(PrivacyZone_data[n][1], n);
                        }
                        return true;
                    }
                }
            });
        });

        $("body").on("click", "#Iprivacy_delete", function(){
            if($(this).attr("class") != "not_modify_without_float"){
                var value = $("#Iprivacy_list").val();
                $.each(PrivacyZone_data, function(n){
                    if(n != 0){
                        if(value == PrivacyZone_data[n][0]){
                            removePrivacyZone(n);
                            return true;
                        }
                    }
                });
            }
        });

        $("body").on("change", "input[name=Nvideo_privacy_enable]", function(){
            var value = $(this).val();
            $("#video_py_zone_enable").val(value).change();
        });

        $("body").on("change", "#Isub_privacy input[type=text]", function(){
            $.fn._isModified($(this));
            $.fn._runCheckingWithoutGrayButton("sub_privacy");
        });

        $("body").on("change", "#Ivideo_privacy_zone_color_setting", function(){
            $.fn._isModified($(this));
            $.fn._runCheckingWithoutGrayButton("sub_privacy");
        });

        $("body").on("click", "#Save_Isub_privacy", function(){
            if($(this).attr("class") == "can_modify"){
                collectPrivacyZone();
                var cmd = $.fn._runCollectModifUAPI("Isub_privacy");
                $.fn._runSetWithoutBlockUIbyPost(cmd, function(){
                    $("#Isub_privacy .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    setTimeout(updatePrivacy, 1000);
                });
            }
        });
        AssignPrivacyZone();
        SetupPZ = true;
    };

    $.fn._initializeROI = function()
    {
        if($("#video_roi_zone_mode").val() == "izone"){
            $("#Isub_roi .sub_content_group > img.block_down").click();
            var tmp_id = $("#Isub_roi .sub_content_group > img.block_down").attr("id");
            if(tmp_id != undefined){
                var Num = tmp_id.match(/\d\d/g) == null ? tmp_id.match(/\d/g) : tmp_id.match(/\d\d/g)
                , data = $("input[name='video.h264_advanced.izone.zone."+Num+".coordinate']").val()
                ;
                $.fn._runInitialZone(data, "roi");
            }
        }

        if($("#Ivideo_roi_zone_lightweight_stream_dyn_roi").val() == "on" && $("#Ivideo_roi_zone_lightweight_stream_dyn_gop").val() == "off")
            $("#Ivideo_roi_mode > option[value=EcoZone]").prop("selected",true);
        else if($("#Ivideo_roi_zone_lightweight_stream_dyn_roi").val() == "on" && $("#Ivideo_roi_zone_lightweight_stream_dyn_gop").val() == "on")
            $("#Ivideo_roi_mode > option[value='EcoZone+EcoFrame']").prop("selected",true);

        if(SetupROI)
            return true;
        if($.fn.GetPlatForm() == "xarina_entry"){
            $("input[type=radio][name='video_roi_zone_mode'][value=istream]").parent().parent().remove();
            $("#lightweight_stream_group").remove();
        }
        
        for(var i = 1; i <= 2; i++){
            $("body").on("click", "#Ivideo_roi_quality_"+i, function(){
                var id = $(this).attr("id")
                , _num = id.match(/\d\d/g) == null ? id.match(/\d/g) : id.match(/\d\d/g)
                , data = $("input[name='video.h264_advanced.izone.zone."+_num+".coordinate']").val()
                , ind = data.lastIndexOf(',')
                , sys_coord = data.slice(0, ind)
                , ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0)
                , tmp_detect_size = ActivexPlayerObject.Get_VideoSize()
                , coordinate = $.fn._runTransferCoordinate_Sys2ui(data, tmp_detect_size)
                ;
                $("div[conf_group='roi']").hide();
                $("#roi_quality_"+_num+"_block").show();
                $("#Isub_roi .sub_content_group > img").addClass("block_up").removeClass("block_down");
                $(this).addClass("block_down").removeClass("block_up");
                if($("input[name=video_roi_zone_mode]:checked").val() != "izone")
                    return false;
                try {
                    ActivexPlayerObject.Start_Cropping(1);
                    if(coordinate == "NaN,NaN,NaN,NaN")
                        coordinate = "0,0,0,0";
                    if(sys_coord != "0,0,0,0"){
                        if(record_coordinate[1][_num-1] != "0,0,0,0")
                            coordinate = record_coordinate[1][_num-1];
                        else
                            record_coordinate[1][_num-1] = coordinate;
                    }
                    ActivexPlayerObject.Set_CropPoint(""+coordinate+"");
                } catch(e){
                    console.log("///////////////// draw coordinate error. /////////////////");
                }
            });
        }

        $("body").on("change", "input[name=video_roi_zone_mode]", function(){
            var value = $(this).val()
            , ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0)
            ;
            if(value == "off"){
                ActivexPlayerObject.Start_Cropping(0);
                $("#Isub_roi select").attr("disabled", true).addClass("grey_out");
                $("#Ivideo_roi_mode").attr("disabled", true).addClass("grey_out");
                $("#Isub_roi input[type=button]").attr("disabled", true).removeClass("can_modify_without_float").addClass("not_modify_without_float");
            } else if(value == "izone") {
                $("#Isub_roi .sub_content_group > img.block_down").click();
                $("#Ivideo_roi_level_1").attr("disabled", false).removeClass("grey_out");
                $("#Ivideo_roi_level_2").attr("disabled", false).removeClass("grey_out");
                $("#Ivideo_roi_zone_lightweight_stream_level").attr("disabled", true).addClass("grey_out");
                $("#Ivideo_roi_mode").attr("disabled", true).addClass("grey_out");
                $("#Isub_roi input[type=button]").attr("disabled", false).removeClass("not_modify_without_float").addClass("can_modify_without_float");
            } else if(value == "istream") {
                ActivexPlayerObject.Start_Cropping(0);
                $("#Ivideo_roi_level_1").attr("disabled", true).addClass("grey_out");
                $("#Ivideo_roi_level_2").attr("disabled", true).addClass("grey_out");
                $("#Ivideo_roi_zone_lightweight_stream_level").attr("disabled", false).removeClass("grey_out");
                $("#Ivideo_roi_mode").attr("disabled", false).removeClass("grey_out");
                $("#Isub_roi input[type=button]").attr("disabled", true).removeClass("can_modify_without_float").addClass("not_modify_without_float");
            }
            $("#video_roi_zone_mode").val(value).change();
        });

        $("body").on("change", "#video_roi_zone_mode", function(){
            $.fn._runSetWithoutBlockUI($(this).attr("name")+"="+$(this).val());
        });

        $("body").on("change", "#Isub_roi select", function(){
            if($(this).attr("id") == "Ivideo_roi_mode"){
                if($(this).val() == "EcoZone"){
                    $("#Ivideo_roi_zone_lightweight_stream_dyn_roi").val("on").change();
                    $("#Ivideo_roi_zone_lightweight_stream_dyn_gop").val("off").change();
                } else if($(this).val() == "EcoZone+EcoFrame"){
                    $("#Ivideo_roi_zone_lightweight_stream_dyn_roi").val("on").change();
                    $("#Ivideo_roi_zone_lightweight_stream_dyn_gop").val("on").change();
                }
            } else
                $.fn._runSetWithoutBlockUI($(this).attr("name")+"="+$(this).val());
        });

        $("body").on("change", "#Ivideo_roi_zone_lightweight_stream_dyn_roi, #Ivideo_roi_zone_lightweight_stream_dyn_gop", function(){
            $.fn._runSetWithoutBlockUI($(this).attr("name")+"="+$(this).val());
        });

        $("body").on("click", "#Isub_roi input[type=button]", function(){
            var id = $(this).attr("id")
            , _num = id.match(/\d\d/g) == null ? id.match(/\d/g) : id.match(/\d\d/g)
            , type = id.slice(id.lastIndexOf('_')+1, id.length)
            , zone
            , ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0)
            , db
            ;
            if(type == "set")
                zone = $.fn._runGetZone("roi", _num);
            else if(type == "clean")
            {
                zone = "0,0,0,0,"+$.fn.GetStreamWidth()+"x"+$.fn.GetStreamHeight();
                record_coordinate[1][_num] = "0,0,0,0";
                ActivexPlayerObject.Set_CropPoint("0,0,0,0");
            }
            $("#video_roi_zone_"+_num+"_coordinate").val(zone);
            db = $.parseJSON("{\"video.h264_advanced.izone.zone."+_num+".coordinate\":\""+zone+"\"}");
            $.fn._runSetWithBlockUIWithView(db, function(){$.fn._runUnBlockUI();});
        });
        
        $("input[name=video_roi_zone_mode][value="+$("#video_roi_zone_mode").val()+"]").prop('checked',true).change();
        $("#Ivideo_roi_quality_1").click();
        var data = $("input[name='video.h264_advanced.izone.zone.1.coordinate']").val();
        if($("#video_roi_zone_mode").val() == "izone")
            $.fn._runInitialZone(data, "roi");
        SetupROI = true;
    };

    $.fn._initializeExposure = function()
    {
        var updateWDRmode = function(id, db, callback)
        {
            $.ajax({
                beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
                url:'/cgi-bin/get?',
                dataType:'json',
                type:'POST',
                data:db,
                cache:false,
                success:function(data){
                    $.fn.ParserDateForSpecial(id, data);
                },
                error:function(){
                    console.log("update exposure wdr failed.");
                },
                complete:function(){
                    $.removeCookie('ipcamera', { path: '/' });
                    callback();
                }
            });
        };

        var updateManual = function()
        {
            if($.fn.GetCameraType() == "ntsc")
                return ",\"image.exposure_method.manual.gain\":\"\",\"image.exposure_method.manual.shutter.ntsc.speed\":\"\"";
            else if($.fn.GetCameraType() == "pal")
                return ",\"image.exposure_method.manual.gain\":\"\",\"image.exposure_method.manual.shutter.pal.speed\":\"\"";
        };

        $("body").on("change", "#Iimage_t_wdr_exposure_mode", function(){
            var pid = $(this).val()
            , tmp = "{"
            ;
            tmp += $.fn._runModifyUapiName("Isub_exposure", pid, "image.t_wdr.exposure_mode");
            if(pid == "manual")
                tmp += updateManual();
            tmp += "}";
            var db = $.parseJSON(tmp);
            updateWDRmode("Isub_exposure", db, function(){
                $("#Iimage_exposure_day_night_mode").change();
                $("div[conf='sub_exposure'] div.slider").each(function(){
                    var Sid = $(this).attr("id")
                    , Iid = $(this).siblings("input").attr("id")
                    ;
                    $("#"+Iid).change();
                });
            });

            if(pid != "advanced"){
                $("#Mimage_exposure_max_speed").parent().parent().hide();
                $("#Mimage_exposure_min_speed").parent().parent().hide();
            } else {
                $("#Mimage_exposure_max_speed").parent().parent().show();
                $("#Mimage_exposure_min_speed").parent().parent().show();
            }

            if(pid == "manual")
            {
                $("#Iimage_exposure_day_night_mode > option[value=auto]").hide();
                $("#Mimage_exposure_method_manual_gain").parent().parent().show();
                $("#Mimage_exposure_manual_shutter_speed").parent().parent().show();
                $("#Mimage_exposure_blc").parent().parent().hide();
                $("#Mimage_exposure_ev_comp").parent().parent().hide();
                $("#Mimage_exposure_hlc_mode").parent().parent().hide();
                if($("#Iimage_exposure_day_night_mode").children().size() == 3)
                {
                    var confList = "color,b/w".split(',');
                    $("#Iimage_exposure_day_night_mode").find('option').remove();
                    $.each(confList, function(n){
                        $("#Iimage_exposure_day_night_mode").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
                    });
                    $.fn.TransOptions("Iimage_exposure_day_night_mode");
                }

                if($("#Iimage_exposure_dc_iris_mode").children().size() == 2)
                {
                    $("#Iimage_exposure_dc_iris_mode").find('option').remove();
                    $("#Iimage_exposure_dc_iris_mode").append($("<option></option>").attr("value", "full").text("full"));
                    $.fn.TransOptions("Iimage_exposure_dc_iris_mode");
                }

                if($("#Iimage_exposure_p_iris_mode").children().size() == 2)
                {
                    $("#Iimage_exposure_p_iris_mode").find('option').remove();
                    $("#Iimage_exposure_p_iris_mode").append($("<option></option>").attr("value", "manual").text("manual"));
                    $.fn.TransOptions("Iimage_exposure_p_iris_mode");
                }
            }
            else
            {
                $("#Iimage_exposure_day_night_mode > option[value=auto]").show();
                $("#Mimage_exposure_method_manual_gain").parent().parent().hide();
                $("#Mimage_exposure_manual_shutter_speed").parent().parent().hide();
                $("#Mimage_exposure_blc").parent().parent().show();
                $("#Mimage_exposure_ev_comp").parent().parent().show();
                $("#Mimage_exposure_hlc_mode").parent().parent().show();
                if($("#Iimage_exposure_day_night_mode").children().size() == 2)
                {
                    var confList = "auto,color,b/w".split(',');
                    $("#Iimage_exposure_day_night_mode").find('option').remove();
                    $.each(confList, function(n){
                        $("#Iimage_exposure_day_night_mode").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
                    });
                    $.fn.TransOptions("Iimage_exposure_day_night_mode");
                }

                if($("#Iimage_exposure_dc_iris_mode").children().size() == 1)
                {
                    var confList = "auto,full".split(',');
                    $("#Iimage_exposure_dc_iris_mode").find('option').remove();
                    $.each(confList, function(n){
                        $("#Iimage_exposure_dc_iris_mode").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
                    });
                    $.fn.TransOptions("Iimage_exposure_dc_iris_mode");
                }

                if($("#Iimage_exposure_p_iris_mode").children().size() == 1)
                {
                    var confList = "auto,manual".split(',');
                    $("#Iimage_exposure_p_iris_mode").find('option').remove();
                    $.each(confList, function(n){
                        $("#Iimage_exposure_p_iris_mode").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
                    });
                    $.fn.TransOptions("Iimage_exposure_p_iris_mode");
                }
            }

            if(pid == "shutter_priority")
                $("#Mimage_exposure_shutter_priority_speed").parent().parent().show();
            else
                $("#Mimage_exposure_shutter_priority_speed").parent().parent().hide();

            if(pid == "auto"){
                $("#Iimage_exposure_sensitivity > option[value=normal]").show();
                $("#Iimage_exposure_sensitivity > option[value=normal]").prop("selected",true);
                $("#Iimage_exposure_sensitivity > option[value=advanced]").hide();
            } else {
                $("#Iimage_exposure_sensitivity > option[value=normal]").hide();
                $("#Iimage_exposure_sensitivity > option[value=advanced]").show();
                $("#Iimage_exposure_sensitivity > option[value=advanced]").prop("selected",true);
            }
        });

        $("body").on("change", "#Iimage_d_wdr_exposure_mode", function(){
            var pid = $(this).val()
            , tmp = "{"
            ;
            tmp += $.fn._runModifyUapiName("Isub_exposure", pid, "image.d_wdr.exposure_mode");
            if(pid == "manual")
                tmp += updateManual();
            tmp += "}";
            var db = $.parseJSON(tmp);
            updateWDRmode("Isub_exposure", db, function(){
                $("#Iimage_exposure_day_night_mode").change();
                $("div[conf='sub_exposure'] div.slider").each(function(){
                    var Sid = $(this).attr("id")
                    , Iid = $(this).siblings("input").attr("id")
                    ;
                    $("#"+Iid).change();
                });
            });
            if(pid != "advanced"){
                $("#Mimage_exposure_max_speed").parent().parent().hide();
                $("#Mimage_exposure_min_speed").parent().parent().hide();
            } else {
                $("#Mimage_exposure_max_speed").parent().parent().show();
                $("#Mimage_exposure_min_speed").parent().parent().show();
            }

            if(pid == "manual")
            {
                $("#Iimage_exposure_day_night_mode > option[value=auto]").hide();
                $("#Mimage_exposure_method_manual_gain").parent().parent().show();
                $("#Mimage_exposure_manual_shutter_speed").parent().parent().show();
                $("#Mimage_exposure_blc").parent().parent().hide();
                $("#Mimage_exposure_ev_comp").parent().parent().hide();
                $("#Mimage_exposure_hlc_mode").parent().parent().hide();
                if($("#Iimage_exposure_day_night_mode").children().size() == 3)
                {   
                    var confList = "color,b/w".split(',');
                    $("#Iimage_exposure_day_night_mode").find('option').remove();
                    $.each(confList, function(n){
                        $("#Iimage_exposure_day_night_mode").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
                    });
                    $.fn.TransOptions("Iimage_exposure_day_night_mode");
                }

                if($("#Iimage_exposure_dc_iris_mode").children().size() == 2)
                {
                    $("#Iimage_exposure_dc_iris_mode").find('option').remove();
                    $("#Iimage_exposure_dc_iris_mode").append($("<option></option>").attr("value", "full").text("full"));
                    $.fn.TransOptions("Iimage_exposure_dc_iris_mode");
                }

                if($("#Iimage_exposure_p_iris_mode").children().size() == 2)
                {
                    $("#Iimage_exposure_p_iris_mode").find('option').remove();
                    $("#Iimage_exposure_p_iris_mode").append($("<option></option>").attr("value", "manual").text("manual"));
                    $.fn.TransOptions("Iimage_exposure_p_iris_mode");
                }
            }
            else
            {
                $("#Iimage_exposure_day_night_mode > option[value=auto]").show();
                $("#Mimage_exposure_method_manual_gain").parent().parent().hide();
                $("#Mimage_exposure_manual_shutter_speed").parent().parent().hide();
                $("#Mimage_exposure_blc").parent().parent().show();
                $("#Mimage_exposure_ev_comp").parent().parent().show();
                $("#Mimage_exposure_hlc_mode").parent().parent().show();
                if($("#Iimage_exposure_day_night_mode").children().size() == 2)
                {
                    var confList = "auto,color,b/w".split(',');
                    $("#Iimage_exposure_day_night_mode").find('option').remove();
                    $.each(confList, function(n){
                        $("#Iimage_exposure_day_night_mode").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
                    });
                    $.fn.TransOptions("Iimage_exposure_day_night_mode");
                }

                if($("#Iimage_exposure_dc_iris_mode").children().size() == 1)
                {
                    var confList = "auto,full".split(',');
                    $("#Iimage_exposure_dc_iris_mode").find('option').remove();
                    $.each(confList, function(n){
                        $("#Iimage_exposure_dc_iris_mode").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
                    });
                    $.fn.TransOptions("Iimage_exposure_dc_iris_mode");
                }

                if($("#Iimage_exposure_p_iris_mode").children().size() == 1)
                {
                    var confList = "auto,manual".split(',');
                    $("#Iimage_exposure_p_iris_mode").find('option').remove();
                    $.each(confList, function(n){
                        $("#Iimage_exposure_p_iris_mode").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
                    });
                    $.fn.TransOptions("Iimage_exposure_p_iris_mode");
                }
            }

            if(pid == "shutter_priority")
                $("#Mimage_exposure_shutter_priority_speed").parent().parent().show();
            else
                $("#Mimage_exposure_shutter_priority_speed").parent().parent().hide();

            if(pid == "auto"){
                $("#Iimage_exposure_sensitivity > option[value=normal]").show();
                $("#Iimage_exposure_sensitivity > option[value=normal]").prop("selected",true);
                $("#Iimage_exposure_sensitivity > option[value=advanced]").hide();
            } else {
                $("#Iimage_exposure_sensitivity > option[value=normal]").hide();
                $("#Iimage_exposure_sensitivity > option[value=advanced]").show();
                $("#Iimage_exposure_sensitivity > option[value=advanced]").prop("selected",true);
            }
        });

        $("body").on("change", "#Iimage_exposure_day_night_mode", function(){
            var wdr_mode = $.fn.GetWDRType() == 1 ? $("#Iimage_d_wdr_exposure_mode") : $("#Iimage_t_wdr_exposure_mode");
            if($(wdr_mode).val() == "manual")
            {
                $("#Mimage_sensitity").parent().parent().hide();
                // $("#Mimage_exposure_sensitivity").parent().parent().hide();
                $("#Mimage_exposure_switch_time").parent().parent().hide(); 
            }
            else
            {
                if($(this).val() != "auto"){
                    $("#Mimage_sensitity").parent().parent().hide();
                    // $("#Mimage_exposure_sensitivity").parent().parent().hide();
                    $("#Mimage_exposure_switch_time").parent().parent().hide();
                } else {
                    $("#Iimage_exposure_sensitivity").change();
                    // $("#Mimage_exposure_sensitivity").parent().parent().show();
                    $("#Mimage_exposure_switch_time").parent().parent().show();
                }
            }
        });

        $("body").on("change", "#Iimage_exposure_sensitivity", function(){
            if($(this).val() == "normal"){
                $("#Mimage_sensitity").parent().parent().hide();
            } else if($(this).val() == "advanced"){
                $("#Mimage_sensitity").parent().parent().show();
            }
        });

        $("body").on("change", "#Iimage_exposure_p_iris_mode", function(){
            if($.fn.GetIrisType() == "p"){
                if($(this).val() == "auto"){
                    $("#Mimage_exposure_p_iris_level").parent().parent().hide();
                } else if($(this).val() == "manual"){
                    $("#Mimage_exposure_p_iris_level").parent().parent().show();
                }
            } else
                $("#Mimage_exposure_p_iris_level").parent().parent().hide();
        });

        if($.fn.GetWDRType() == 1){
            $("#Iimage_d_wdr_exposure_mode").change();
        }else if($.fn.GetWDRType() == 2){
            $("#Iimage_t_wdr_exposure_mode").change();
        }

        $("#Mimage_exposure_sensitivity").parent().parent().hide();

        // 3a will auto dyamic adjusted p_iris level.
        if($.fn.GetPlatForm() == "s2" || $.fn.GetPlatForm() == "s2l"){
            if($.fn.GetIrisType() == "p")
                $("#Simage_exposure_p_iris_level").attr("_max", $.fn.GetPirisLevel());
        }
        $("div[conf='sub_exposure'] div.slider").each(function(){
            var Sid = $(this).attr("id")
            , Iid = $(this).siblings("input").attr("id")
            ;
            $.fn._initializeSilderCtrl(Sid, Iid, $(this).attr("_max"), $(this).attr("_min"), $(this).attr("_step"), "active", "sub_exposure");
            $("#"+Iid).trigger("change keyup");
        });

        $("body").on("change", "div[conf='sub_exposure'] select", function(){
            var value = $(this).val()
            , uapi_name = $(this).attr("tmp_name") == undefined ? $(this).attr("name") : $(this).attr("tmp_name")
            ;
            if($(this).attr("id") == "Iimage_exposure_ir_optimizer"){
                if(value == "on"){
                    $("#Iimage_exposure_blc > option[value=off]").prop("selected",true);
                    $("#Iimage_exposure_blc").attr("disabled", true).addClass("grey_out").change();
                } else if(value == "off"){
                    $("#Iimage_exposure_blc").attr("disabled", false).removeClass("grey_out").change();
                } 
            }
            $.fn._runSetWithoutBlockUI(uapi_name+"="+value);
        });

        $("body").on("change", "#Iimage_exposure_ir_level_mode", function(){
            if($(this).val() == "auto"){
                $("#Mimage_exposure_adjustable").parent().parent().hide();
            } else if($(this).val() == "manual"){
                $("#Mimage_exposure_adjustable").parent().parent().show();
            }
        });
    };

    $.fn._initializeWhiteBalance = function()
    {
        $("div[conf='sub_whitebalance'] div.slider").each(function(){
            var Sid = $(this).attr("id")
            , Iid = $(this).siblings("input").attr("id")
            ;
            $.fn._initializeSilderCtrl(Sid, Iid, $(this).attr("_max"), $(this).attr("_min"), $(this).attr("_step"), "active", "sub_whitebalance");
            $("#"+Iid).change();
        });

        $("body").on("change", "#Iimage_white_balance_mode", function(){
            if($(this).val() == "auto" || $(this).val() == "atw"){
                $("#Mimage_white_balance_manual_r_gain").parent().parent().hide(),
                $("#Mimage_white_balance_manual_b_gain").parent().parent().hide(),
                $("#Iimage_white_balance_manual_one_push").parent().parent().hide()
                ;
            } else if($(this).val() == "manual"){
                $("#Mimage_white_balance_manual_r_gain").parent().parent().show(),
                $("#Mimage_white_balance_manual_b_gain").parent().parent().show(),
                $("#Iimage_white_balance_manual_one_push").parent().parent().show()
                ;
            }
            $.fn._runSetWithoutBlockUI($(this).attr("name")+"="+$(this).val());
        });

        $("#Iimage_white_balance_mode").change();

        $("body").on("click", "#Iimage_white_balance_manual_one_push", function(){
            query_param = "image.info.white_balance.one_push_status";
            var db = $.parseJSON("{\""+$(this).attr("name")+"\":\"1\",\""+query_param+"\":\"begin\"}");
            $.fn._runSetWithBlockUIWithView(db, function(){
                $.fn._runListen();
            });
        });
    };

    $.fn._initializeImgBasic = function()
    {
        keep_alive = $.fn.GetKeepAliveTime();
        $.fn._runPollingLensThread();

        if(SetupImgBasic)
            return true;

        $("div[conf='sub_img_basic'] div.slider").each(function(){
            var Sid = $(this).attr("id")
            , Iid = $(this).siblings("input").attr("id")
            ;
            $.fn._initializeSilderCtrl(Sid, Iid, $(this).attr("_max"), $(this).attr("_min"), $(this).attr("_step"), "active", "sub_img_basic");
            $("#"+Iid).change();
        });

        $("body").on("change", "div[conf='sub_img_basic'] select", function(){
            var value = $(this).val()
            , uapi_name = $(this).attr("tmp_name") == undefined ? $(this).attr("name") : $(this).attr("tmp_name")
            ;
            $.fn._runSetWithoutBlockUI(uapi_name+"="+value);
        });

        $("body").on("change", "#Iimage_orientation", function(){
            var value = $(this).val()
            , uapi_name = $(this).attr("tmp_name") == undefined ? $(this).attr("name") : $(this).attr("tmp_name")
            ;
            $.fn._runSetWithoutBlockUI(uapi_name+"="+value);
            $.fn.SetOrientation(value);
        });

        if($.fn.GetLensTypeList() != "NULL" || $.fn.GetMechanism() == "3"){
            $("body").on("change", "#Ilens_type", function(){
                if($(this).val() == $(this).attr("de_val"))
                    return true;
                var db = $.parseJSON("{\""+$(this).attr("name")+"\":\""+$(this).val()+"\"}");
                $.fn._runSetWithBlockUIWithView(db, function(){});
            });    
        }
        SetupImgBasic = true;
    };

    $.fn._initializeLens = function()
    {
        keep_alive = $.fn.GetKeepAliveTime();
        $.fn._runPollingLensThread();

        if(SetupLens)
            return true;

        $("div[conf='sub_lens'] div.slider").each(function(){
            var Sid = $(this).attr("id")
            , Iid = $(this).siblings("input").attr("id")
            ;
            $.fn._initializeSilderCtrlforlens(Sid, Iid, $(this).attr("_max"), $(this).attr("_min"), $(this).attr("_step"), "sub_lens");
            $("#"+Iid).change();
        });

        $("body").on("change", "div[conf='sub_lens'] select", function(){
            var value = $(this).val()
            , uapi_name = $(this).attr("tmp_name") == undefined ? $(this).attr("name") : $(this).attr("tmp_name")
            ;
            $.fn._runSetWithoutBlockUI(uapi_name+"="+value);
        });

        $("body").on("click", "#Imotorized_lens_one_push, #Imotorized_lens_calibration", function(){
            var db = $.parseJSON("{\""+$(this).attr("name")+"\":\"1\"}");
            $.fn._runSetWithBlockUIWithView(db, function(){});
        });

        SetupLens = true;
    };

    $.fn._initializeNetworkGeneral = function()
    {
        var tmp = $("#Inetwork_wire_ipv4_manual_address").val()
        , dhcp_tmp = $("#Isystem_information_wire_ipv4_address").val()
        , ipv4_info = tmp.split("/")
        , dhcp_info = dhcp_tmp.split("/")
        , callback
        ;
        $("#Inetwork_ipv4_addr").val(ipv4_info[0]);
        $("#Inetwork_ipv4_subnet_addr").val(ipv4_info[1]);
        $("#Inetwork_ipv4_default_addr").val(ipv4_info[2]);

        $("#Inetwork_ipv4_dhcp_addr").val(dhcp_info[0]);
        $("#Inetwork_ipv4_dhcp_subnet_addr").val(dhcp_info[1]);
        $("#Inetwork_ipv4_dhcp_default_addr").val(dhcp_info[2]);

        var updateIPv4 = function(){
            var ipv4 = $("#Inetwork_ipv4_addr").val()+"/"+$("#Inetwork_ipv4_subnet_addr").val()+"/"+$("#Inetwork_ipv4_default_addr").val();
            $("#Inetwork_wire_ipv4_manual_address").val(ipv4).change();
        };

        var modifyWhat = function(){
            var hre = window.location.hostname;
            if(hre.indexOf(']') == -1)
                return true;
            else
                return false;
        };

        var goWhere = function(){
            // when ldap is enable.
            if($("#Inetwork_web_enable_ldap").attr("redirect") == "on"){
                callback = function(){ window.location.replace(""+$.fn._runParserHeader()+"//"+$.fn.ParserIPAddr()+":"+$("#Inetwork_web_http_port").val()+"/login/login.html"); };
                return true;
            }
            if(modifyWhat() == true) // ipv4
            {
                if($("#Inetwork_wire_ipv4_mode").val() == "dhcp" || $("#Inetwork_wire_ipv4_mode").val() == "pppoe")
                {
                    if($("#Inetwork_wire_ipv4_mode").attr("de_val") == "dhcp" || $("#Inetwork_wire_ipv4_mode").attr("de_val") == "pppoe")
                    {
                        if($("#Inetwork_web_http_port").val() != $("#Inetwork_web_http_port").attr("de_val"))
                            callback = function(){ window.location.replace(""+$.fn._runParserHeader()+"//"+$.fn.ParserIPAddr()+":"+$("#Inetwork_web_http_port").val()+"/login/login.html"); };
                        else
                            callback = function(){ $.fn._runUnBlockUI(); };
                    }
                    else if($("#Inetwork_wire_ipv4_mode").attr("de_val") == "manual")
                    {
                        callback = function()
                        {
                            $.fn._runBlockUIwithoutView($.fn.GetLangStr(LT._Please_wait), $.fn.GetLangStr(LT._Please_search_ip));
                            setTimeout($.fn._runCloseWindow, 10000);
                        };
                    }
                }
                else if($("#Inetwork_wire_ipv4_mode").val() == "manual")
                {
                    if($("#Inetwork_wire_ipv4_mode").attr("de_val") == "dhcp" || $("#Inetwork_wire_ipv4_mode").attr("de_val") == "pppoe")
                    {
                        callback = function(){ window.location.replace(""+$.fn._runParserHeader()+"//"+$("#Inetwork_ipv4_addr").val()+":"+$("#Inetwork_web_http_port").val()+"/login/login.html"); };
                    }
                    else if($("#Inetwork_wire_ipv4_mode").attr("de_val") == "manual")
                    {
                        if(location.hostname != $("#Inetwork_ipv4_addr").val())
                            callback = function(){ window.location.replace(""+$.fn._runParserHeader()+"//"+$("#Inetwork_ipv4_addr").val()+":"+$("#Inetwork_web_http_port").val()+"/login/login.html"); };
                        else
                        {
                            if($("#Inetwork_web_http_port").val() != $("#Inetwork_web_http_port").attr("de_val"))
                                callback = function(){ window.location.replace(""+$.fn._runParserHeader()+"//"+$.fn.ParserIPAddr()+":"+$("#Inetwork_web_http_port").val()+"/login/login.html"); };
                            else
                                callback = function(){ $.fn._runUnBlockUI(); };
                        }
                    }
                    else
                        callback = function(){ $.fn._runUnBlockUI(); };
                }
                else
                    callback = function(){ $.fn._runUnBlockUI(); };
            } else { // ipv6
                var ipv6_en = $("#Inetwork_wire_ipv6_enable").is(":checked") == true? "on":"off";
                if(ipv6_en == "on")
                {
                    if($("#Inetwork_wire_ipv6_dhcp").val() == "on")
                    {
                        if($("#Inetwork_wire_ipv6_dhcp").attr("de_val") == "off")
                        {
                            callback = function()
                            {
                                $.fn._runBlockUIwithoutView($.fn.GetLangStr(LT._Please_wait), $.fn.GetLangStr(LT._Please_search_ip));
                                setTimeout($.fn._runCloseWindow, 10000);
                            };
                        }
                        else
                        {
                           if($("#Inetwork_web_http_port").val() != $("#Inetwork_web_http_port").attr("de_val"))
                                callback = function(){ window.location.replace(""+$.fn._runParserHeader()+"//"+$.fn.ParserIPAddr()+":"+$("#Inetwork_web_http_port").val()+"/login/login.html"); };
                            else
                                callback = function(){ $.fn._runUnBlockUI(); }; 
                        }
                    }
                    else if($("#Inetwork_wire_ipv6_dhcp").val() == "off")
                    {
                        if($("#Inetwork_wire_ipv6_dhcp").attr("de_val") == "off")
                        {
                            if(location.hostname != ("["+$("#Inetwork_wire_ipv6_address").val()+"]"))
                                callback = function(){ window.location.replace(""+$.fn._runParserHeader()+"//["+$("#Inetwork_wire_ipv6_address").val()+"]:"+$("#Inetwork_web_http_port").val()+"/login/login.html"); };
                            else
                            {
                                if($("#Inetwork_web_http_port").val() != $("#Inetwork_web_http_port").attr("de_val"))
                                    callback = function(){ window.location.replace(""+$.fn._runParserHeader()+"//"+$.fn.ParserIPAddr()+":"+$("#Inetwork_web_http_port").val()+"/login/login.html"); };
                                else
                                    callback = function(){ $.fn._runUnBlockUI(); };
                            }
                        }
                        else
                            callback = function(){ window.location.replace(""+$.fn._runParserHeader()+"//["+$("#Inetwork_wire_ipv6_address").val()+"]:"+$("#Inetwork_web_http_port").val()+"/login/login.html"); };
                    }
                }
                else if(ipv6_en == "off")
                {
                    if($("#Inetwork_wire_ipv4_mode").val() == "dhcp" || $("#Inetwork_wire_ipv4_mode").val() == "pppoe")
                    {
                        callback = function()
                        {
                            $.fn._runBlockUIwithoutView($.fn.GetLangStr(LT._Please_wait), $.fn.GetLangStr(LT._Please_search_ip));
                            setTimeout($.fn._runCloseWindow, 10000);
                        };
                    }
                    else
                        callback = function(){ window.location.replace(""+$.fn._runParserHeader()+"//"+$("#Inetwork_ipv4_addr").val()+":"+$("#Inetwork_web_http_port").val()+"/login/login.html"); }; 
                }
            }
        };

        $("body").on("change", "#Inetwork_wire_ipv4_manual_address", function(){
            $.fn._isModified($(this));
        });

        $("body").on("change, keyup", "#Inetwork_device_name", function(){
            if(!(($(this).val()).match(Host_name_regex)))
                $(this).addClass("invalid_modify").removeClass("modify");
            else 
            {
                $(this).removeClass("invalid_modify");
                $.fn._isModified($(this));
            }
            $.fn._runChecking("sub_general");
        });

        $("body").on("change, keyup", "#Inetwork_ipv4_addr", function(){
            if(!(($(this).val()).match(IP_regex_Max)))
                $(this).addClass("invalid_modify");
            else
            {
                $(this).removeClass("invalid_modify");
                updateIPv4();
            }
            $.fn._runChecking("sub_general");
        });

        $("body").on("change, keyup", ""+
            "#Inetwork_ipv4_subnet_addr,"+
            "#Inetwork_ipv4_default_addr", 
        function(){
            if(!(($(this).val()).match(IP_regex_Max)))
                $(this).addClass("invalid_modify");
            else 
            {
                $(this).removeClass("invalid_modify");
                updateIPv4();
            }
            $.fn._runChecking("sub_general");
        });

        $("body").on("change, keyup", ""+
            "#Inetwork_wire_ipv4_manual_dns_1_address,"+
            "#Inetwork_wire_ipv4_manual_dns_2_address", 
        function(){
            if(!(($(this).val()).match(IP_regex_Max)))
                $(this).addClass("invalid_modify").removeClass("modify");
            else
            {
                $(this).removeClass("invalid_modify");
                $.fn._isModified($(this));
            }
            $.fn._runChecking("sub_general");
        });

        $("body").on("change, keyup", "#Inetwork_web_http_port", function(){
            if($(this).val() == "80" || parseInt($(this).val()) >= 1025 && parseInt($(this).val()) <= 65535)
            {
                $(this).removeClass("invalid_modify");
                $.fn._isModified($(this));
            }
            else
                $(this).addClass("invalid_modify").removeClass("modify");
            $.fn._runChecking("sub_general");
        });

        $("body").on("change, keyup", "#Inetwork_web_ssl_port", function(){
            if($(this).val() == "443" || parseInt($(this).val()) >= 1025 && parseInt($(this).val()) <= 65535)
            {
                $(this).removeClass("invalid_modify");
                $.fn._isModified($(this));
            }
            else
                $(this).addClass("invalid_modify").removeClass("modify");
            $.fn._runChecking("sub_general");
        });

        $("body").on("change", "#Inetwork_upnp_friendly_name", function(){
            if($(this).val() == "user_input"){
                $("tr[ref_id^='network.upnp.friendly_name_text']").show("slow");
            } else{
                $("tr[ref_id^='network.upnp.friendly_name_text']").hide();
            }
            $.fn._isModified($(this));
        });

        $("body").on("change", "#Inetwork_web_enable_ldap", function(){
            if($(this).val() != $(this).attr("de_val"))
                $(this).attr("redirect", "on");
            if($(this).val() == "on")
                $("#Ildap_warning").show();
            else
                $("#Ildap_warning").hide();
            $.fn._isModified($(this));
            $.fn._runChecking("sub_general");
        });

        $("body").on("change", "#Inetwork_web_ssl_enable", function(){
            if($(this).val() == "on"){
                if($("#Inetwork_ssl_current_cert_method").val() == "none"){
                    $("#Inetwork_web_ssl_certificate_has_no_installed").show();
                } else {
                    $("tr[ref_id^='network.web.ssl.port']").show("slow");
                }
            } else if($(this).val() == "off"){
                $("tr[ref_id^='network.web.ssl.port']").hide();
                $("#Inetwork_web_ssl_certificate_has_no_installed").hide();
            }

            // if certificate has installed that will allow to enable ssl feature.
            if($("#Inetwork_ssl_current_cert_method").val() != "none")
                $.fn._isModified($(this));
            $.fn._runChecking("sub_general");
        });

        $("body").on("change", "#Inetwork_upnp_enable", function(){
            if($(this).val() == "on"){
                $("tr[ref_id^='network.upnp.friendly_name']").show("slow");
                $("#Inetwork_upnp_friendly_name").change();
            } else if($(this).val() == "off"){
                $("tr[ref_id^='network.upnp.friendly_name']").hide();
                $("tr[ref_id^='network.upnp.friendly_name_text']").hide();
            }
            $.fn._isModified($(this));
            $.fn._runChecking("sub_general");
        });

        $("body").on("change", "#Inetwork_upnp_friendly_name_text", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_general");
        });

        $("body").on("change", "#Inetwork_upnp_friendly_name", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_general");
        });

        $("body").on("change", "#Inetwork_wire_ipv4_pppoe_username", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_general");
        });

        $("body").on("change", "#Inetwork_wire_ipv4_pppoe_password", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_general");
        });

        $("body").on("change", "#Inetwork_wire_ipv4_mode", function(){
            if($(this).val() == "manual"){
                $("tr[ref_id^='network.wire.ipv4.manual.addr']").show();
                $("tr[ref_id^='network.wire.ipv4.manual.subnet']").show();
                $("tr[ref_id^='network.wire.ipv4.manual.gateway']").show();
                $("tr[ref_id^='network.wire.ipv4.manual.dns.1.address']").show();
                $("tr[ref_id^='network.wire.ipv4.manual.dns.2.address']").show();
                $("tr[ref_id^='network.wire.ipv4.pppoe.username']").hide();
                $("tr[ref_id^='network.wire.ipv4.pppoe.password']").hide();
                $("tr[ref_id^='network.wire.ipv4.pppoe.ip_address']").hide();
                $("tr[ref_id^='network.wire.ipv4.dhcp.addr']").hide();
                $("tr[ref_id^='network.wire.ipv4.dhcp.subnet']").hide();
                $("tr[ref_id^='network.wire.ipv4.dhcp.gateway']").hide();
            } else if($(this).val() == "pppoe"){
                $("tr[ref_id^='network.wire.ipv4.manual.addr']").hide();
                $("tr[ref_id^='network.wire.ipv4.manual.subnet']").hide();
                $("tr[ref_id^='network.wire.ipv4.manual.gateway']").hide();
                $("tr[ref_id^='network.wire.ipv4.manual.dns.1.address']").hide();
                $("tr[ref_id^='network.wire.ipv4.manual.dns.2.address']").hide();
                $("tr[ref_id^='network.wire.ipv4.pppoe.username']").show();
                $("tr[ref_id^='network.wire.ipv4.pppoe.password']").show();
                $("tr[ref_id^='network.wire.ipv4.pppoe.ip_address']").show();
                $("tr[ref_id^='network.wire.ipv4.dhcp.addr']").hide();
                $("tr[ref_id^='network.wire.ipv4.dhcp.subnet']").hide();
                $("tr[ref_id^='network.wire.ipv4.dhcp.gateway']").hide();
            } else if($(this).val() == "dhcp"){
                $("tr[ref_id^='network.wire.ipv4.manual.addr']").hide();
                $("tr[ref_id^='network.wire.ipv4.manual.subnet']").hide();
                $("tr[ref_id^='network.wire.ipv4.manual.gateway']").hide();
                $("tr[ref_id^='network.wire.ipv4.manual.dns.1.address']").hide();
                $("tr[ref_id^='network.wire.ipv4.manual.dns.2.address']").hide();
                $("tr[ref_id^='network.wire.ipv4.pppoe.username']").hide();
                $("tr[ref_id^='network.wire.ipv4.pppoe.password']").hide();
                $("tr[ref_id^='network.wire.ipv4.pppoe.ip_address']").hide();
                $("tr[ref_id^='network.wire.ipv4.dhcp.addr']").show();
                $("tr[ref_id^='network.wire.ipv4.dhcp.subnet']").show();
                $("tr[ref_id^='network.wire.ipv4.dhcp.gateway']").show();
            }
            $.fn._isModified($(this));
            $.fn._runChecking("sub_general");
        });

        $("body").on("change", "#Inetwork_wire_ipv6_enable", function(){
            var chkbox_status = $(this).is(":checked") == true? "on":"off";
            $(this).val(chkbox_status);
            $.fn._isModified($(this));
            $.fn._runChecking("sub_general");
            if(chkbox_status == "on"){
                $("#Inetwork_wire_ipv6_dhcp").attr("disabled", false).removeClass("grey_out");
                $("#Inetwork_wire_ipv6_router_advertisement").attr("disabled", false).removeClass("grey_out");
                $("#Inetwork_wire_ipv6_dhcp").change();
            } else if(chkbox_status == "off"){
                $("#Inetwork_wire_ipv6_dhcp").attr("disabled", true).addClass("grey_out");
                $("#Inetwork_wire_ipv6_router_advertisement").attr("disabled", true).addClass("grey_out");
                $("#Inetwork_wire_ipv6_address").attr("disabled", true).addClass("grey_out");
                $("#Inetwork_wire_ipv6_address_prefix_len").attr("disabled", true).addClass("grey_out");
                $("#Inetwork_wire_ipv6_default_route").attr("disabled", true).addClass("grey_out");
                $("#Inetwork_wire_ipv6_default_route_prefix_len").attr("disabled", true).addClass("grey_out");
                $("#Inetwork_wire_ipv6_dns_address").attr("disabled", true).addClass("grey_out");
            }
        });

        $("body").on("change", "#Inetwork_wire_ipv6_dhcp", function(){
            if($(this).val() == "off"){
                $("#Inetwork_wire_ipv6_address").attr("disabled", false).removeClass("grey_out");
                $("#Inetwork_wire_ipv6_default_route").attr("disabled", false).removeClass("grey_out");
                $("#Inetwork_wire_ipv6_dns_address").attr("disabled", false).removeClass("grey_out");
                if($("#Inetwork_wire_ipv6_address").val() == "")
                    $("#Inetwork_wire_ipv6_address_prefix_len").attr("disabled", true).addClass("grey_out");
                else
                    $("#Inetwork_wire_ipv6_address_prefix_len").attr("disabled", false).removeClass("grey_out");
                if($("#Inetwork_wire_ipv6_default_route").val() == "")
                    $("#Inetwork_wire_ipv6_default_route_prefix_len").attr("disabled", true).addClass("grey_out");
                else
                    $("#Inetwork_wire_ipv6_default_route_prefix_len").attr("disabled", false).removeClass("grey_out");
            } else if($(this).val() == "on"){
                $("#Inetwork_wire_ipv6_address").attr("disabled", true).addClass("grey_out");
                $("#Inetwork_wire_ipv6_address_prefix_len").attr("disabled", true).addClass("grey_out");
                $("#Inetwork_wire_ipv6_default_route").attr("disabled", true).addClass("grey_out");
                $("#Inetwork_wire_ipv6_default_route_prefix_len").attr("disabled", true).addClass("grey_out");
                $("#Inetwork_wire_ipv6_dns_address").attr("disabled", true).addClass("grey_out");
            } 
            $.fn._isModified($(this));
            $.fn._runChecking("sub_general");
        });

        $("body").on("change, keyup", "#Inetwork_wire_ipv6_address, #Inetwork_wire_ipv6_default_route, #Inetwork_wire_ipv6_dns_address", function(){
            if($(this).val() != ""){
                if(!(($(this).val()).match(IPv6_regex)))
                    $(this).addClass("invalid_modify").removeClass("modify");
                else 
                {
                    $(this).removeClass("invalid_modify");
                    $.fn._isModified($(this));
                }
                $.fn._runChecking("sub_general");

                if($(this).attr("id") == "Inetwork_wire_ipv6_address")
                     $("#Inetwork_wire_ipv6_address_prefix_len").attr("disabled", false).removeClass("grey_out");
                else if($(this).attr("id") == "Inetwork_wire_ipv6_default_route")
                     $("#Inetwork_wire_ipv6_default_route_prefix_len").attr("disabled", false).removeClass("grey_out");
            } else {
                if($(this).attr("id") == "Inetwork_wire_ipv6_address")
                     $("#Inetwork_wire_ipv6_address_prefix_len").attr("disabled", true).addClass("grey_out");
                else if($(this).attr("id") == "Inetwork_wire_ipv6_default_route")
                     $("#Inetwork_wire_ipv6_default_route_prefix_len").attr("disabled", true).addClass("grey_out");
                $(this).removeClass("invalid_modify");
                $.fn._isModified($(this));
                $.fn._runChecking("sub_general");
            }
        });
        
        $("body").on("change", "#Inetwork_wire_ipv6_router_advertisement", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_general");
        });

        $("body").on("change, keyup", "#Inetwork_wire_ipv6_address_prefix_len, #Inetwork_wire_ipv6_default_route_prefix_len", function(){
            if((parseInt($(this).val()) >= 1 && parseInt($(this).val()) <= 128) && $.isNumeric($(this).val())){
                $(this).removeClass("invalid_modify");
                $.fn._isModified($(this));
            } else
                $(this).addClass("invalid_modify").removeClass("modify");

            $.fn._runChecking("sub_general");
        });

        $("body").on("click", "#Inetwork_view", function(){
            var url = new Array(), ip = new Array();
            url = document.URL.split("//");
            ip = url[1].split("/");
            if(!VW2) 
                VW2 = window.open(url[0]+"//"+ip[0]+"/www/net_view.html",'uploadmsg','toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=640,height=360'); 
            else if(VW2.closed) 
                VW2 = window.open(url[0]+"//"+ip[0]+"/www/net_view.html",'uploadmsg','toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=640,height=360');     
            else 
                VW2.focus();
        });

        $("body").on("change", "#Inetwork_wire_nic_type", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_general");
        });

        $("body").on("change", "#Inetwork_bonjour_enable", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_general");
        });
        
        $("body").on("click", "#Save_Isub_general", function(){
            if($(this).attr("class") == "can_modify"){
                var cmd = $.fn._runCollectModifUAPI("Isub_general");
                goWhere();
                $.fn._runSetWithBlockUI(cmd, function(){
                    $("#Isub_general .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    $("#Save_Isub_general").removeClass("can_modify").addClass("not_modify");
                    setTimeout(callback, 3000);
                });
            } 
        });

        $("#Inetwork_wire_ipv4_mode").change();
        $("#Inetwork_web_ssl_enable").change();
        $("#Inetwork_upnp_enable").change();
        $("#Inetwork_wire_ipv6_enable").change();
    };

    $.fn._initializeFTP = function()
    {
        $("body").on("change", "#Inetwork_ftp_server_enable", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_ftp");
        });

        $("body").on("change, keyup", "#Inetwork_ftp_server_port", function(){
            if($(this).val() == "21" || parseInt($(this).val()) >= 1025 && parseInt($(this).val()) <= 65535 && $.isNumeric($(this).val()))
            {
                $(this).removeClass("invalid_modify");
                $.fn._isModified($(this));
            }
            else
                $(this).addClass("invalid_modify").removeClass("modify");
            $.fn._runChecking("sub_ftp");
        });

        $("body").on("click", "#Save_Isub_ftp", function(){
            if($(this).attr("class") == "can_modify"){
                var cmd = $.fn._runCollectModifUAPI("Isub_ftp");
                $.fn._runSetWithBlockUI(cmd, function(){
                    $("#Isub_ftp .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    $("#Save_Isub_ftp").removeClass("can_modify").addClass("not_modify");
                    setTimeout($.fn._runUnBlockUI, 1000);
                });
            }
        });
    };

    $.fn._initializeSFTP = function()
    {
        $("body").on("change", "#Inetwork_sftp_server_enable", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_sftp");
        });

        $("body").on("change, keyup", "#Inetwork_sftp_server_port", function(){
            if(parseInt($(this).val()) >= 1025 && parseInt($(this).val()) <= 65535 && $.isNumeric($(this).val()))
            {
                $(this).removeClass("invalid_modify");
                $.fn._isModified($(this));
            }
            else
                $(this).addClass("invalid_modify").removeClass("modify");
            $.fn._runChecking("sub_sftp");
        });

        $("body").on("click", "#Save_Isub_sftp", function(){
            if($(this).attr("class") == "can_modify"){
                var cmd = $.fn._runCollectModifUAPI("Isub_sftp");
                $.fn._runSetWithBlockUI(cmd, function(){
                    $("#Isub_sftp .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    $("#Save_Isub_sftp").removeClass("can_modify").addClass("not_modify");
                    setTimeout($.fn._runUnBlockUI, 1000);
                });
            }
        });
    };

    $.fn._initialize8021x = function()
    {
        var options = {
            beforeSubmit:function(){
            }
        };

        $("#Fnetwork_ieee8021x_eap_ttls_ca_file").ajaxForm(options);
        $("#Fnetwork_ieee8021x_eap_peap_ca_file").ajaxForm(options);

        var save_and_test_check_for_md5 = function(){
            var found = 0;
            $("#Inetwork_ieee8021x_eap_md5_user_name, #Inetwork_ieee8021x_eap_md5_user_passwd").each(function(){
                if($(this).attr("class") == "invalid_modify")
                    found = 1;
                else
                {
                    if($(this).val().length <= 0)
                        found = 1;
                }   
            });

            if(found == 1)
                $("#Inetwork_ieee8021x_eap_md5_save_and_test").removeClass("can_modify").addClass("not_modify");
            else
                $("#Inetwork_ieee8021x_eap_md5_save_and_test").removeClass("not_modify").addClass("can_modify");
        };

        var save_and_test_check_for_ttls = function(){
            var found = 0;
            $("#Inetwork_ieee8021x_eap_ttls_user_name, #Inetwork_ieee8021x_eap_ttls_user_passwd, #Inetwork_ieee8021x_eap_ttls_anonymous_id, #Inetwork_ieee8021x_eap_ttls_ca_file").each(function(){
                if($(this).attr("class") == "invalid_modify")
                    found = 1;
                else
                {
                    if($(this).val().length <= 0)
                        found = 1;
                }   
            });

            if(found == 1)
                $("#Inetwork_ieee8021x_eap_ttls_save_and_test").removeClass("can_modify").addClass("not_modify");
            else
                $("#Inetwork_ieee8021x_eap_ttls_save_and_test").removeClass("not_modify").addClass("can_modify");
        };

        var save_and_test_check_for_peap = function(){
            var found = 0;
            $("#Inetwork_ieee8021x_eap_peap_user_name, #Inetwork_ieee8021x_eap_peap_user_passwd, #Inetwork_ieee8021x_eap_peap_ca_file").each(function(){
                if($(this).attr("class") == "invalid_modify")
                    found = 1;
                else
                {
                    if($(this).val().length <= 0)
                        found = 1;
                }  
            });

            if(found == 1)
                $("#Inetwork_ieee8021x_eap_peap_save_and_test").removeClass("can_modify").addClass("not_modify");
            else
                $("#Inetwork_ieee8021x_eap_peap_save_and_test").removeClass("not_modify").addClass("can_modify");
        };

        $("body").on("change", "#Inetwork_ieee8021x_eap_ttls_ca_file", function(){
            var file_regex ="(.*\.(pem)$)";
            var file = $(this).val();
            if(!(file.match(file_regex))){
                $(this).addClass("invalid_modify");
            } else {
                $(this).removeClass("invalid_modify");
            }
            save_and_test_check_for_ttls();
            $("#Inetwork_ieee8021x_eap_ttls_ca_file_name").show();
            $("#Inetwork_ieee8021x_eap_ttls_ca_file_name")[0].innerHTML = file;
        });

        $("body").on("change", "#Inetwork_ieee8021x_eap_peap_ca_file", function(){
            var file_regex ="(.*\.(pem)$)";
            var file = $(this).val();
            if(!(file.match(file_regex))){
                $(this).addClass("invalid_modify");
            } else {
                $(this).removeClass("invalid_modify");
            }
            save_and_test_check_for_peap();
            $("#Inetwork_ieee8021x_eap_peap_ca_file_name").show();
            $("#Inetwork_ieee8021x_eap_peap_ca_file_name")[0].innerHTML = file;
        });

        $("body").on("change", "#Inetwork_ieee8021x_protocol", function(){
            if($(this).val() == "eap-md5"){
                $("#Isub_ieee8021x tr[ref_id^='network.ieee8021x.eap-md5.']").show(),
                $("#Isub_ieee8021x tr[ref_id^='network.ieee8021x.eap-peap.']").hide(),
                $("#Isub_ieee8021x tr[ref_id^='network.ieee8021x.eap-ttls.']").hide();
            } else if($(this).val() == "eap-ttls"){
                $("#Isub_ieee8021x tr[ref_id^='network.ieee8021x.eap-md5.']").hide(),
                $("#Isub_ieee8021x tr[ref_id^='network.ieee8021x.eap-peap.']").hide(),
                $("#Isub_ieee8021x tr[ref_id^='network.ieee8021x.eap-ttls.']").show();
            } else if($(this).val() == "eap-peap"){
                $("#Isub_ieee8021x tr[ref_id^='network.ieee8021x.eap-md5.']").hide(),
                $("#Isub_ieee8021x tr[ref_id^='network.ieee8021x.eap-peap.']").show(),
                $("#Isub_ieee8021x tr[ref_id^='network.ieee8021x.eap-ttls.']").hide();
            } else if($(this).val() == "none"){
                $("#Isub_ieee8021x tr[ref_id^='network.ieee8021x.eap-md5.']").hide(),
                $("#Isub_ieee8021x tr[ref_id^='network.ieee8021x.eap-peap.']").hide(),
                $("#Isub_ieee8021x tr[ref_id^='network.ieee8021x.eap-ttls.']").hide();
            }
        });

        $("body").on("click", "#Inetwork_ieee8021x_eap_md5_save_and_test", function(){
            if($(this).attr("class") == "not_modify")
                return false;
            var tmp = ""
            , cmd
            ;
            tmp += "\""+$("#Inetwork_ieee8021x_protocol").attr("name")+"\":\""+$("#Inetwork_ieee8021x_protocol").val()+"\",";
            tmp += "\""+$("#Inetwork_ieee8021x_eap_md5_user_name").attr("name")+"\":\""+$("#Inetwork_ieee8021x_eap_md5_user_name").val()+"\",";
            tmp += "\""+$("#Inetwork_ieee8021x_eap_md5_user_passwd").attr("name")+"\":\""+$("#Inetwork_ieee8021x_eap_md5_user_passwd").val()+"\",";
            tmp += "\"network.ieee8021x.eap-md5.save_and_test\":\"start\"";
            tmp = "{"+tmp+"}";
            cmd = $.parseJSON(tmp);
            query_param = "network.ieee8021x.eap-md5.status";
            $.fn._runSetWithBlockUI(cmd, function(){
                $("#Isub_ieee8021x .modify").each(function(){
                    $(this).removeClass("modify");
                });
                $("#Save_Isub_ieee8021x").removeClass("can_modify").addClass("not_modify");
                $("#Inetwork_ieee8021x_eap_md5_save_and_test").removeClass("can_modify").addClass("not_modify");
            });
            $.fn._runListen();
        });

        $("body").on("click", "#Inetwork_ieee8021x_eap_ttls_save_and_test", function(){
            if($(this).attr("class") == "not_modify")
                return false;
            $("#Inetwork_ieee8021x_eap_ttls_ca_text").val("eap-ttls");
            var tmp = ""
            , cmd
            ;
            tmp += "\""+$("#Inetwork_ieee8021x_protocol").attr("name")+"\":\""+$("#Inetwork_ieee8021x_protocol").val()+"\",";
            tmp += "\""+$("#Inetwork_ieee8021x_eap_ttls_anonymous_id").attr("name")+"\":\""+$("#Inetwork_ieee8021x_eap_ttls_anonymous_id").val()+"\",";
            tmp += "\""+$("#Inetwork_ieee8021x_eap_ttls_inner_auth").attr("name")+"\":\""+$("#Inetwork_ieee8021x_eap_ttls_inner_auth").val()+"\",";
            tmp += "\""+$("#Inetwork_ieee8021x_eap_ttls_user_name").attr("name")+"\":\""+$("#Inetwork_ieee8021x_eap_ttls_user_name").val()+"\",";
            tmp += "\""+$("#Inetwork_ieee8021x_eap_ttls_user_passwd").attr("name")+"\":\""+$("#Inetwork_ieee8021x_eap_ttls_user_passwd").val()+"\",";
            tmp += "\"network.ieee8021x.eap-ttls.save_and_test\":\"start\"";
            tmp = "{"+tmp+"}";
            cmd = $.parseJSON(tmp);
            query_param = "network.ieee8021x.eap-ttls.status";
            $("#Fnetwork_ieee8021x_eap_ttls_ca_file").submit();
            $.fn._runSetWithBlockUI(cmd, function(){
                $("#Isub_ieee8021x .modify").each(function(){
                    $(this).removeClass("modify");
                });
                $("#Save_Isub_ieee8021x").removeClass("can_modify").addClass("not_modify");
                $("#Inetwork_ieee8021x_eap_ttls_save_and_test").removeClass("can_modify").addClass("not_modify");
            });
            $.fn._runListen();   
        });

        $("body").on("click", "#Inetwork_ieee8021x_eap_peap_save_and_test", function(){
            if($(this).attr("class") == "not_modify")
                return false;
            $("#Inetwork_ieee8021x_eap_peap_ca_text").val("eap-peap");
            var tmp = ""
            , cmd
            ;
            tmp += "\""+$("#Inetwork_ieee8021x_protocol").attr("name")+"\":\""+$("#Inetwork_ieee8021x_protocol").val()+"\",";
            tmp += "\""+$("#Inetwork_ieee8021x_eap_peap_inner_auth").attr("name")+"\":\""+$("#Inetwork_ieee8021x_eap_peap_inner_auth").val()+"\",";
            tmp += "\""+$("#Inetwork_ieee8021x_eap_peap_user_name").attr("name")+"\":\""+$("#Inetwork_ieee8021x_eap_peap_user_name").val()+"\",";
            tmp += "\""+$("#Inetwork_ieee8021x_eap_peap_user_passwd").attr("name")+"\":\""+$("#Inetwork_ieee8021x_eap_peap_user_passwd").val()+"\",";
            tmp += "\"network.ieee8021x.eap-peap.save_and_test\":\"start\"";
            tmp = "{"+tmp+"}";
            cmd = $.parseJSON(tmp);
            query_param = "network.ieee8021x.eap-peap.status";
            $("#Fnetwork_ieee8021x_eap_peap_ca_file").submit();
            $.fn._runSetWithBlockUI(cmd, function(){
                $("#Isub_ieee8021x .modify").each(function(){
                    $(this).removeClass("modify");
                });
                $("#Save_Isub_ieee8021x").removeClass("can_modify").addClass("not_modify");
                $("#Inetwork_ieee8021x_eap_peap_save_and_test").removeClass("can_modify").addClass("not_modify");
            });
            $.fn._runListen();  
        });

        $("body").on("change", "#Inetwork_ieee8021x_eap_md5_status", function(){
            if($(this).val() == "")
                $("#Span_network_ieee8021x_eap_md5_status")[0].innerHTML = "Not Installed";
            else
                $("#Span_network_ieee8021x_eap_md5_status")[0].innerHTML = $(this).val();
        });

        $("body").on("change", "#Inetwork_ieee8021x_eap_ttls_status", function(){
            if($(this).val() == "")
                $("#Span_network_ieee8021x_eap_ttls_status")[0].innerHTML = "Not Installed";
            else
                $("#Span_network_ieee8021x_eap_ttls_status")[0].innerHTML = $(this).val();
        });

        $("body").on("change", "#Inetwork_ieee8021x_eap_peap_status", function(){
            if($(this).val() == "")
                $("#Span_network_ieee8021x_eap_peap_status")[0].innerHTML = "Not Installed";
            else
                $("#Span_network_ieee8021x_eap_peap_status")[0].innerHTML = $(this).val();
        });

        $("body").on("change", "#Isub_ieee8021x select", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_ieee8021x");
        });

        $("body").on("change keyup", "#Inetwork_ieee8021x_eap_md5_user_name, #Inetwork_ieee8021x_eap_md5_user_passwd", function(){
            var value = $(this).val();
            if(value.length > 0)
            {
                $(this).removeClass("invalid_modify");
                $.fn._isModified($(this));
            }
            else
                $(this).addClass("invalid_modify").removeClass("modify");

            save_and_test_check_for_md5();
            $.fn._runChecking("sub_ieee8021x");
        });

        $("body").on("change keyup", "#Inetwork_ieee8021x_eap_ttls_user_name, #Inetwork_ieee8021x_eap_ttls_user_passwd, #Inetwork_ieee8021x_eap_ttls_anonymous_id", function(){
            var value = $(this).val();
            if(value.length > 0)
            {
                $(this).removeClass("invalid_modify");
                $.fn._isModified($(this));
            }
            else
                $(this).addClass("invalid_modify").removeClass("modify");

            save_and_test_check_for_ttls();
            $.fn._runChecking("sub_ieee8021x");
        });

        $("body").on("change keyup", "#Inetwork_ieee8021x_eap_peap_user_name, #Inetwork_ieee8021x_eap_peap_user_passwd", function(){
            var value = $(this).val();
            if(value.length > 0)
            {
                $(this).removeClass("invalid_modify");
                $.fn._isModified($(this));
            }
            else
                $(this).addClass("invalid_modify").removeClass("modify");

            save_and_test_check_for_peap();
            $.fn._runChecking("sub_ieee8021x");
        });

        $("body").on("click", "#Inetwork_ieee8021x_eap_ttls_ca_file_browser", function(){
            if($.fn.DetectBrowser() == "msie")
                return true;
            $("#Inetwork_ieee8021x_eap_ttls_ca_file").click();
        });

        $("body").on("click", "#Inetwork_ieee8021x_eap_peap_ca_file_browser", function(){
            if($.fn.DetectBrowser() == "msie")
                return true;
            $("#Inetwork_ieee8021x_eap_peap_ca_file").click();
        });

        if($.fn.DetectBrowser() == "msie"){
            $("#Inetwork_ieee8021x_eap_ttls_ca_file").attr("style", "z-index:999;opacity:0;height:24px;position:relative;top:10px;left:-67px;");
            $("#Inetwork_ieee8021x_eap_peap_ca_file").attr("style", "z-index:999;opacity:0;height:24px;position:relative;top:10px;left:-67px;");
        }

        $("body").on("click", "#Save_Isub_ieee8021x", function(){
            if($(this).attr("class") == "can_modify"){
                var cmd = $.fn._runCollectModifUAPI("Isub_ieee8021x");
                $.fn._runSetWithBlockUI(cmd, function(){
                    $("#Isub_ieee8021x .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    $("#Save_Isub_ieee8021x").removeClass("can_modify").addClass("not_modify");
                    setTimeout($.fn._runUnBlockUI, 3000);
                });
            }
        });

        $("#Inetwork_ieee8021x_protocol").change();
        $("#Inetwork_ieee8021x_eap_md5_status").change();
        $("#Inetwork_ieee8021x_eap_ttls_status").change();
        $("#Inetwork_ieee8021x_eap_peap_status").change();
    };

    $.fn._initializeRtsp = function()
    {
        var _ind = 0, _fir = "", _sec;
        for(var i = 1; i <= 3; i++)
        {
            _fir = "Inetwork_rtsp_stream_"+i+"_multicast_";
            for(var j = 1; j <= 2; j++)
            {
                if(j == 1)
                    _sec = _fir + "auto_";
                else if(j == 2)
                    _sec = _fir + "manual_";

                for(var l = 1; l <=3; l++)
                {
                    if(l == 1)
                        RTSP_data[_ind] = $("#"+_sec+"audio_address").val()+":"+$("#"+_sec+"audio_port").val();
                    else if(l == 2)
                        RTSP_data[_ind] = $("#"+_sec+"video_address").val()+":"+$("#"+_sec+"video_port").val();
                    else if(l == 3)
                        RTSP_data[_ind] = $("#"+_sec+"meta_address").val()+":"+$("#"+_sec+"meta_port").val();
                    _ind = _ind+1;
                }
            }
        }
        _ind = null, _fir = null, _sec = null;

        $("body").on("change keyup", "#Inetwork_rtsp_port", function(){
            if($(this).val() == "554" || parseInt($(this).val()) >= 1025 && parseInt($(this).val()) <= 65535)
            {
                $(this).removeClass("invalid_modify");
                $.fn._isModified($(this));
            }
            else
                $(this).addClass("invalid_modify").removeClass("modify");
            $.fn._runChecking("sub_rtsp");
        });

        $("body").on("change", "#Inetwork_rtsp_multicast_auto_connect", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_rtsp");
        });

        $("body").on("change", "#Inetwork_rtsp_authentication", function(){
            $.fn._isModified($(this));
            if($(this).val() == "on"){
                $("#Inetwork_rtsp_login_id").attr("disabled", false).removeClass("grey_out");
                $("#Inetwork_rtsp_password").attr("disabled", false).removeClass("grey_out");
            } else if($(this).val() == "off"){
                $("#Inetwork_rtsp_login_id").attr("disabled", true).addClass("grey_out");
                $("#Inetwork_rtsp_password").attr("disabled", true).addClass("grey_out");
            }

            if($("#Inetwork_rtsp_login_id").val().length < 4 || $("#Inetwork_rtsp_password").val().length < 4){}
            else
                $.fn._runChecking("sub_rtsp");
        });

        $("body").on("change keyup", "#Inetwork_rtsp_login_id", function(){
            var length = $(this).val().length;
            if(length < 4 ||length > 40)
                $(this).addClass("invalid_modify").removeClass("modify");
            else
            {
                if($("#Inetwork_rtsp_password").val().length < 4)
                    $("#Inetwork_rtsp_password").addClass("invalid_modify");

                $(this).removeClass("invalid_modify");
                $.fn._isModified($(this));
            }
                
            $.fn._runChecking("sub_rtsp");
        });

        $("body").on("change keyup", "#Inetwork_rtsp_password", function(){
            var length = $(this).val().length;
            if(length < 4 ||length > 40)
                $(this).addClass("invalid_modify").removeClass("modify");
            else
            {
                if($("#Inetwork_rtsp_login_id").val().length < 4)
                    $("#Inetwork_rtsp_login_id").addClass("invalid_modify");

                $(this).removeClass("invalid_modify");
                $.fn._isModified($(this));
            }
                
            $.fn._runChecking("sub_rtsp");
        });

        for(var i = 1; i <= 3; i++)
        {
            $("body").on("change", "#Inetwork_rtsp_stream_"+i+"_metadata", function(){
                $.fn._isModified($(this));
                $.fn._runChecking("sub_rtsp");
            });

            $("body").on("change keyup", "#Inetwork_rtsp_stream_"+i+"_url", function(){
                var value = $(this).val()
                , _found = 0
                , id =$(this).attr("id")
                , _num = id.match(/\d\d/g) == null ? id.match(/\d/g) : id.match(/\d\d/g)
                , unicast_url_arr = []
                , multicast_url_arr = []
                ;
                unicast_url_arr[0] = $("#Inetwork_rtsp_stream_1_url").val();
                unicast_url_arr[1] = $("#Inetwork_rtsp_stream_2_url").val();
                unicast_url_arr[2] = $("#Inetwork_rtsp_stream_3_url").val();
                multicast_url_arr[0] = $("#Inetwork_rtsp_stream_1_multicast_url").val();
                multicast_url_arr[1] = $("#Inetwork_rtsp_stream_2_multicast_url").val();
                multicast_url_arr[2] = $("#Inetwork_rtsp_stream_3_multicast_url").val();
                if(value.length <= 0)
                    $(this).addClass("invalid_modify").removeClass("modify");
                else
                {
                    $.each(unicast_url_arr, function(n){
                        if(_num == Number(n+1)){}
                        else
                        {
                            if(unicast_url_arr[n] == value){
                                _found = 1;
                                return true;
                            } 
                        }
                    });

                    if(_found != 1){
                        $.each(multicast_url_arr, function(n){
                            if(multicast_url_arr[n] == value){
                                _found = 1;
                                return true;
                            } 
                        });
                    }
                        
                    if(_found == 1)
                        $(this).addClass("invalid_modify").removeClass("modify");
                    else
                    {
                        $(this).removeClass("invalid_modify");
                        $.fn._isModified($(this));
                    }
                }
                unicast_url_arr = null, multicast_url_arr = null;
                $.fn._runChecking("sub_rtsp");
            });

            $("body").on("change keyup", "#Inetwork_rtsp_stream_"+i+"_multicast_url", function(){
                var value = $(this).val()
                , _found = 0
                , id =$(this).attr("id")
                , _num = id.match(/\d\d/g) == null ? id.match(/\d/g) : id.match(/\d\d/g)
                , unicast_url_arr = []
                , multicast_url_arr = []
                ;
                unicast_url_arr[0] = $("#Inetwork_rtsp_stream_1_url").val();
                unicast_url_arr[1] = $("#Inetwork_rtsp_stream_2_url").val();
                unicast_url_arr[2] = $("#Inetwork_rtsp_stream_3_url").val();
                multicast_url_arr[0] = $("#Inetwork_rtsp_stream_1_multicast_url").val();
                multicast_url_arr[1] = $("#Inetwork_rtsp_stream_2_multicast_url").val();
                multicast_url_arr[2] = $("#Inetwork_rtsp_stream_3_multicast_url").val();
                if(value.length <= 0)
                    $(this).addClass("invalid_modify").removeClass("modify");
                else
                {
                    $.each(multicast_url_arr, function(n){
                        if(_num == Number(n+1)){}
                        else
                        {
                            if(multicast_url_arr[n] == value){
                                _found = 1;
                                return true;
                            } 
                        }
                    });

                    if(_found != 1){
                        $.each(unicast_url_arr, function(n){
                            if(unicast_url_arr[n] == value){
                                _found = 1;
                                return true;
                            } 
                        });
                    }
                        
                    if(_found == 1)
                        $(this).addClass("invalid_modify").removeClass("modify");
                    else
                    {
                        $(this).removeClass("invalid_modify");
                        $.fn._isModified($(this));
                    }
                }
                unicast_url_arr = null, multicast_url_arr = null;
                $.fn._runChecking("sub_rtsp");
            });

            $("body").on("change", "#Inetwork_rtsp_stream_"+i+"_multicast_address_type", function(){
                var id =$(this).attr("id")
                , _num = id.match(/\d\d/g) == null ? id.match(/\d/g) : id.match(/\d\d/g)
                ;
                if($(this).val() == "manual"){
                    $("#Inetwork_rtsp_stream_"+_num+"_multicast_video_address").val($("#Inetwork_rtsp_stream_"+_num+"_multicast_manual_video_address").val()).attr("disabled", false).removeClass("grey_out");
                    $("#Inetwork_rtsp_stream_"+_num+"_multicast_video_port").val($("#Inetwork_rtsp_stream_"+_num+"_multicast_manual_video_port").val()).attr("disabled", false).removeClass("grey_out");
                    $("#Inetwork_rtsp_stream_"+_num+"_multicast_audio_address").val($("#Inetwork_rtsp_stream_"+_num+"_multicast_manual_audio_address").val()).attr("disabled", false).removeClass("grey_out");
                    $("#Inetwork_rtsp_stream_"+_num+"_multicast_audio_port").val($("#Inetwork_rtsp_stream_"+_num+"_multicast_manual_audio_port").val()).attr("disabled", false).removeClass("grey_out");
                    $("#Inetwork_rtsp_stream_"+_num+"_multicast_meta_address").val($("#Inetwork_rtsp_stream_"+_num+"_multicast_manual_meta_address").val()).attr("disabled", false).removeClass("grey_out");
                    $("#Inetwork_rtsp_stream_"+_num+"_multicast_meta_port").val($("#Inetwork_rtsp_stream_"+_num+"_multicast_manual_meta_port").val()).attr("disabled", false).removeClass("grey_out");
                } else if($(this).val() == "auto"){
                    $("#Inetwork_rtsp_stream_"+_num+"_multicast_video_address").val($("#Inetwork_rtsp_stream_"+_num+"_multicast_auto_video_address").val()).attr("disabled", true).addClass("grey_out");
                    $("#Inetwork_rtsp_stream_"+_num+"_multicast_video_port").val($("#Inetwork_rtsp_stream_"+_num+"_multicast_auto_video_port").val()).attr("disabled", true).addClass("grey_out");
                    $("#Inetwork_rtsp_stream_"+_num+"_multicast_audio_address").val($("#Inetwork_rtsp_stream_"+_num+"_multicast_auto_audio_address").val()).attr("disabled", true).addClass("grey_out");
                    $("#Inetwork_rtsp_stream_"+_num+"_multicast_audio_port").val($("#Inetwork_rtsp_stream_"+_num+"_multicast_auto_audio_port").val()).attr("disabled", true).addClass("grey_out");
                    $("#Inetwork_rtsp_stream_"+_num+"_multicast_meta_address").val($("#Inetwork_rtsp_stream_"+_num+"_multicast_auto_meta_address").val()).attr("disabled", true).addClass("grey_out");
                    $("#Inetwork_rtsp_stream_"+_num+"_multicast_meta_port").val($("#Inetwork_rtsp_stream_"+_num+"_multicast_auto_meta_port").val()).attr("disabled", true).addClass("grey_out");
                }
                $.fn._isModified($(this));
                $.fn._runChecking("sub_rtsp");
            });

            $("body").on("change keyup", "#Inetwork_rtsp_stream_"+i+"_multicast_video_address", function(){
                var value = $(this).val()
                , IP = []
                , _found = 0
                , id =$(this).attr("id")
                , _num = id.match(/\d\d/g) == null ? id.match(/\d/g) : id.match(/\d\d/g)
                , addr_type = $("#Inetwork_rtsp_stream_"+_num+"_multicast_address_type").val() == "auto" ? 
                    $("#Inetwork_rtsp_stream_"+_num+"_multicast_auto_video_address") : $("#Inetwork_rtsp_stream_"+_num+"_multicast_manual_video_address")
                ;
                if(!(value.match(Rtsp_multi_addr_regex)))
                    $(this).addClass("invalid_modify").removeClass("modify");
                else
                {
                    IP = value.split(".");
                    if(parseInt(IP[0])>=224)
                    {
                        if(parseInt(IP[0]) == 224 && parseInt(IP[1]) == 0)
                        {
                            if(parseInt(IP[2]) >= 1)
                            {
                                if(parseInt(IP[3]) < 1)
                                    _found = 1;
                            }
                            else
                                _found = 1;
                        }
                    }
                    else
                        _found = 1;

                    if(_found != 1){
                        tmp = value+":"+$("#Inetwork_rtsp_stream_"+_num+"_multicast_video_port").val();
                        $.each(RTSP_data, function(n){
                            if(RTSP_data[n] == tmp){
                                _found = 1;
                                return true;
                            }
                        });
                    }

                    if(_found == 1)
                        $(this).addClass("invalid_modify").removeClass("modify");
                    else
                    {
                        $(this).removeClass("invalid_modify");
                        $(addr_type).val(value).change();
                    }
                }
                value = null, IP = null, _found = null;
                $.fn._runChecking("sub_rtsp");
            });

            $("body").on("change keyup", "#Inetwork_rtsp_stream_"+i+"_multicast_video_port", function(){
                var value = $(this).val()
                , _found = 0
                , tmp
                , id =$(this).attr("id")
                , _num = id.match(/\d\d/g) == null ? id.match(/\d/g) : id.match(/\d\d/g)
                , addr_type = $("#Inetwork_rtsp_stream_"+_num+"_multicast_address_type").val() == "auto" ? 
                    $("#Inetwork_rtsp_stream_"+_num+"_multicast_auto_video_port") : $("#Inetwork_rtsp_stream_"+_num+"_multicast_manual_video_port")
                ;
                if(!($.isNumeric(value)))
                    $(this).addClass("invalid_modify").removeClass("modify");
                else
                {
                    _found = 0;
                    tmp = $("#Inetwork_rtsp_stream_"+_num+"_multicast_video_address").val()+":"+value;
                    $.each(RTSP_data, function(n){
                        if(RTSP_data[n] == tmp){
                            _found = 1;
                            return true;
                        }
                    });

                    if(_found == 1)
                        $(this).addClass("invalid_modify").removeClass("modify");
                    else
                    {
                        $(this).removeClass("invalid_modify");
                        $(addr_type).val(value).change();
                    }
                }
                value = null, tmp = null, _found = null;
                $.fn._runChecking("sub_rtsp");
            });

            $("body").on("change keyup", "#Inetwork_rtsp_stream_"+i+"_multicast_audio_address", function(){
                var value = $(this).val()
                , IP = []
                , _found = 0
                , id =$(this).attr("id")
                , _num = id.match(/\d\d/g) == null ? id.match(/\d/g) : id.match(/\d\d/g)
                , addr_type = $("#Inetwork_rtsp_stream_"+_num+"_multicast_address_type").val() == "auto" ? 
                    $("#Inetwork_rtsp_stream_"+_num+"_multicast_auto_audio_address") : $("#Inetwork_rtsp_stream_"+_num+"_multicast_manual_audio_address")
                ;
                if(!(value.match(Rtsp_multi_addr_regex)))
                    $(this).addClass("invalid_modify").removeClass("modify");
                else
                {
                    IP = value.split(".");
                    if(parseInt(IP[0])>=224)
                    {
                        if(parseInt(IP[0]) == 224 && parseInt(IP[1]) == 0)
                        {
                            if(parseInt(IP[2]) >= 1)
                            {
                                if(parseInt(IP[3]) < 1)
                                    _found = 1;
                            }
                            else
                                _found = 1;
                        }
                    }
                    else
                        _found = 1;

                    if(_found != 1){
                        tmp = value+":"+$("#Inetwork_rtsp_stream_"+_num+"_multicast_audio_port").val();
                        $.each(RTSP_data, function(n){
                            if(RTSP_data[n] == tmp){
                                _found = 1;
                                return true;
                            }
                        });
                    }

                    if(_found == 1)
                        $(this).addClass("invalid_modify").removeClass("modify");
                    else
                    {
                        $(this).removeClass("invalid_modify");
                        $(addr_type).val(value).change();
                    }
                }
                value = null, IP = null, _found = null;
                $.fn._runChecking("sub_rtsp");
            });

            $("body").on("change keyup", "#Inetwork_rtsp_stream_"+i+"_multicast_audio_port", function(){
                var value = $(this).val()
                , _found = 0
                , tmp
                , id =$(this).attr("id")
                , _num = id.match(/\d\d/g) == null ? id.match(/\d/g) : id.match(/\d\d/g)
                , addr_type = $("#Inetwork_rtsp_stream_"+_num+"_multicast_address_type").val() == "auto" ? 
                    $("#Inetwork_rtsp_stream_"+_num+"_multicast_auto_audio_port") : $("#Inetwork_rtsp_stream_"+_num+"_multicast_manual_audio_port")
                ;
                if(!($.isNumeric(value)))
                    $(this).addClass("invalid_modify").removeClass("modify");
                else
                {
                    _found = 0;
                    tmp = $("#Inetwork_rtsp_stream_"+_num+"_multicast_audio_address").val()+":"+value;
                    $.each(RTSP_data, function(n){
                        if(RTSP_data[n] == tmp){
                            _found = 1;
                            return true;
                        }
                    });

                    if(_found == 1)
                       $(this).addClass("invalid_modify").removeClass("modify");
                    else
                    {
                        $(this).removeClass("invalid_modify");
                        $(addr_type).val(value).change();
                    }
                }
                value = null, tmp = null, _found = null;
                $.fn._runChecking("sub_rtsp");
            });

            $("body").on("change keyup", "#Inetwork_rtsp_stream_"+i+"_multicast_meta_address", function(){
                var value = $(this).val()
                , IP = []
                , _found = 0
                , id =$(this).attr("id")
                , _num = id.match(/\d\d/g) == null ? id.match(/\d/g) : id.match(/\d\d/g)
                , addr_type = $("#Inetwork_rtsp_stream_"+_num+"_multicast_address_type").val() == "auto" ? 
                    $("#Inetwork_rtsp_stream_"+_num+"_multicast_auto_meta_address") : $("#Inetwork_rtsp_stream_"+_num+"_multicast_manual_meta_address")
                , siblings = $(this)
                ;
                if(!(value.match(Rtsp_multi_addr_regex)))
                    $(this).addClass("invalid_modify").removeClass("modify");
                else
                {
                    IP = value.split(".");
                    if(parseInt(IP[0])>=224)
                    {
                        if(parseInt(IP[0]) == 224 && parseInt(IP[1]) == 0)
                        {
                            if(parseInt(IP[2]) >= 1)
                            {
                                if(parseInt(IP[3]) < 1)
                                    _found = 1;
                            }
                            else
                                _found = 1;
                        }
                    }
                    else
                        _found = 1;

                    if(_found != 1){
                        tmp = value+":"+$("#Inetwork_rtsp_stream_"+_num+"_multicast_meta_port").val();
                        $.each(RTSP_data, function(n){
                            if(RTSP_data[n] == tmp){
                                if(value != $(addr_type).attr("de_val"))
                                    _found = 1;
                                return true;
                            }
                        });
                    }

                    if(_found == 1)
                        $(this).addClass("invalid_modify").removeClass("modify");
                    else
                    {
                        $(this).removeClass("invalid_modify");
                        $(addr_type).val(value).change();
                    }
                }
                value = null, IP = null, _found = null;
                $.fn._runChecking("sub_rtsp");
            });

            $("body").on("change keyup", "#Inetwork_rtsp_stream_"+i+"_multicast_meta_port", function(){
                var value = $(this).val()
                , _found = 0
                , tmp
                , id =$(this).attr("id")
                , _num = id.match(/\d\d/g) == null ? id.match(/\d/g) : id.match(/\d\d/g)
                , addr_type = $("#Inetwork_rtsp_stream_"+_num+"_multicast_address_type").val() == "auto" ? 
                    $("#Inetwork_rtsp_stream_"+_num+"_multicast_auto_meta_port") : $("#Inetwork_rtsp_stream_"+_num+"_multicast_manual_meta_port")
                ;
                if(!($.isNumeric(value)))
                    $(this).addClass("invalid_modify").removeClass("modify");
                else
                {
                    _found = 0;
                    tmp = $("#Inetwork_rtsp_stream_"+_num+"_multicast_meta_address").val()+":"+value;
                    $.each(RTSP_data, function(n){
                        if(RTSP_data[n] == tmp){
                            _found = 1;
                            return true;
                        }
                    });

                    if(_found == 1)
                       $(this).addClass("invalid_modify").removeClass("modify");
                    else
                    {
                        $(this).removeClass("invalid_modify");
                        $(addr_type).val(value).change();
                    }
                }
                value = null, tmp = null, _found = null;
                $.fn._runChecking("sub_rtsp");
            });

            $("body").on("change", "#Inetwork_rtsp_stream_"+i+"_multicast_manual_video_address, Inetwork_rtsp_stream_"+i+"_multicast_auto_video_address", function(){
                $.fn._isModified($(this));
                $.fn._runChecking("sub_rtsp");
            });

            $("body").on("change", "#Inetwork_rtsp_stream_"+i+"_multicast_manual_video_port, Inetwork_rtsp_stream_"+i+"_multicast_auto_video_port", function(){
                $.fn._isModified($(this));
                $.fn._runChecking("sub_rtsp");
            });

            $("body").on("change", "#Inetwork_rtsp_stream_"+i+"_multicast_manual_audio_address, Inetwork_rtsp_stream_"+i+"_multicast_auto_audio_address", function(){
                $.fn._isModified($(this));
                $.fn._runChecking("sub_rtsp");
            });

            $("body").on("change", "#Inetwork_rtsp_stream_"+i+"_multicast_manual_audio_port, Inetwork_rtsp_stream_"+i+"_multicast_auto_audio_port", function(){
                $.fn._isModified($(this));
                $.fn._runChecking("sub_rtsp");
            });

            $("body").on("change", "#Inetwork_rtsp_stream_"+i+"_multicast_manual_meta_address, Inetwork_rtsp_stream_"+i+"_multicast_auto_meta_address", function(){
                $.fn._isModified($(this));
                $.fn._runChecking("sub_rtsp");
            });

            $("body").on("change", "#Inetwork_rtsp_stream_"+i+"_multicast_manual_meta_port, Inetwork_rtsp_stream_"+i+"_multicast_auto_meta_port", function(){
                $.fn._isModified($(this));
                $.fn._runChecking("sub_rtsp");
            });
            
            $("#Inetwork_rtsp_stream_"+i+"_multicast_address_type").change();
        }

        $("body").on("click", "#Save_Isub_rtsp", function(){
            if($(this).attr("class") == "can_modify"){
                var cmd = $.fn._runCollectModifUAPI("Isub_rtsp");
                $.fn._runSetWithBlockUI(cmd, function(){
                    $("#Isub_rtsp .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    $("#Save_Isub_rtsp").removeClass("can_modify").addClass("not_modify");
                    setTimeout($.fn._runUnBlockUI, 3000);
                    setTimeout($.fn.UpdateModelProperty, 1000);
                });
            }
        });

        $("#Inetwork_rtsp_authentication").change();
    };

    $.fn._initializeSNMP = function()
    {

		$("body").on("change", "#Inetwork_snmp_v1v2c_v1_enable, #Inetwork_snmp_v1v2c_v2c_enable, #Inetwork_snmp_v3_enable," + 
							   "#Inetwork_snmp_trap_trap_type_heartbeat, #Inetwork_snmp_trap_trap_type_event", function(){
            $.fn._isModified($(this));
	        $.fn._runChecking("sub_snmp");
        });

        $("body").on("change , keyup", "#Inetwork_snmp_v1v2c_read_community_string," + 
									   "#Inetwork_snmp_v1v2c_write_community_string," + 
									   "#Inetwork_snmp_v1v2c_trap_community_string", function()
		{
	        if(($(this).val().length < 2)||($(this).val().length > 40))
				$(this).addClass("invalid_modify").removeClass("modify");
            else
            {
				$(this).removeClass("invalid_modify");
                $.fn._isModified($(this));
            }
			$.fn._runChecking("sub_snmp");
		});

        $("body").on("change , keyup", "#Inetwork_snmp_v3_username", function(){
            if(($(this).val().length < 2)||($(this).val().length > 32))
				$(this).addClass("invalid_modify").removeClass("modify");
            else
            {
				$(this).removeClass("invalid_modify");
                $.fn._isModified($(this));
            }
			$.fn._runChecking("sub_snmp");
		});

        $("body").on("change", "#Inetwork_snmp_v3_authentication_mode", function(){
            if($(this).val() == "none")
			{
				$("#Inetwork_snmp_v3_authentication_passwd").attr("disabled", true).addClass("grey_out");
				$("#Inetwork_snmp_v3_privacy_mode")[0].selectedIndex = 2;
                $("#Inetwork_snmp_v3_privacy_mode").attr("disabled", true).addClass("grey_out");
                $("#Inetwork_snmp_v3_privacy_passwd").attr("disabled", true).addClass("grey_out");
                $("#Inetwork_snmp_v3_privacy_mode").change();
            }
			else
			{
                $("#Inetwork_snmp_v3_authentication_passwd").attr("disabled", false).removeClass("grey_out");
                $("#Inetwork_snmp_v3_privacy_mode").attr("disabled", false).removeClass("grey_out");
                $("#Inetwork_snmp_v3_privacy_passwd").attr("disabled", false).removeClass("grey_out");
                $("#Inetwork_snmp_v3_privacy_mode").change();
            }
            $.fn._isModified($(this));
            $.fn._runChecking("sub_snmp");
        });

		$("body").on("change , keyup", "#Inetwork_snmp_v3_authentication_passwd, #Inetwork_snmp_v3_privacy_passwd", function(){
            if(($(this).val().length < 8)||($(this).val().length > 40))
				$(this).addClass("invalid_modify").removeClass("modify");
            else
            {
				$(this).removeClass("invalid_modify");
                $.fn._isModified($(this));
            }
			$.fn._runChecking("sub_snmp");
		});

        $("body").on("change", "#Inetwork_snmp_v3_privacy_mode", function(){
            if($(this).val() == "none") {
                $("#Inetwork_snmp_v3_privacy_passwd").attr("disabled", true).addClass("grey_out");
            }else if ($(this).val() == "des") {
                $("#Inetwork_snmp_v3_privacy_passwd").attr("disabled", false).removeClass("grey_out");
            }else if ($(this).val() == "aes") {
                $("#Inetwork_snmp_v3_privacy_passwd").attr("disabled", false).removeClass("grey_out");
            }
            $.fn._isModified($(this));
            $.fn._runChecking("sub_snmp");
        });

        $("body").on("change, keyup", "#Inetwork_snmp_trap_target_ip", function(){
            if ( (($(this).val()) == "") || (($(this).val()).match(IP_regex_Max)) )
            {
                $(this).removeClass("invalid_modify");
				$.fn._isModified($(this));
            }
            else
				$(this).addClass("invalid_modify").removeClass("modify");

            $.fn._runChecking("sub_snmp");
        });

        $("body").on("change, keyup", "#Inetwork_snmp_trap_trap_type_heartbeat_interval", function(){
            if((parseInt($(this).val()) >= 5 && parseInt($(this).val()) <= 600) && $.isNumeric($(this).val()))
            {
                $(this).removeClass("invalid_modify");
                $.fn._isModified($(this));
            }
            else
                $(this).addClass("invalid_modify").removeClass("modify");

            $.fn._runChecking("sub_snmp");
        });

        $("body").on("change", "#Inetwork_snmp_trap_mode", function(){
            if($(this).val() == "off"){
                $("#Inetwork_snmp_trap_trap_type_heartbeat").attr("disabled", true).addClass("grey_out");
                $("#Inetwork_snmp_trap_trap_type_event").attr("disabled", true).addClass("grey_out");
            } else {
                $("#Inetwork_snmp_trap_trap_type_heartbeat").attr("disabled", false).removeClass("grey_out");
                $("#Inetwork_snmp_trap_trap_type_event").attr("disabled", false).removeClass("grey_out");
            }

            $.fn._isModified($(this));
            $.fn._runChecking("sub_snmp");
        });
        
        $("body").on("click", "#Save_Isub_snmp", function(){
            if($(this).attr("class") == "can_modify"){
                var cmd = $.fn._runCollectModifUAPI("Isub_snmp");
                $.fn._runSetWithBlockUI(cmd, function(){
                    $("#Isub_snmp .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    $("#Save_Isub_snmp").removeClass("can_modify").addClass("not_modify");
                    setTimeout($.fn._runUnBlockUI, 3000);
                });
            }
        });

        $("#Inetwork_snmp_v3_authentication_mode").change();
        $("#Inetwork_snmp_v3_privacy_mode").change();
        $("#Inetwork_snmp_trap_mode").change();
    };

    $.fn._initializeFirewall = function()
    {
        $("body").on("change", "#Inetwork_firewall_mode", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_firewall");
        });

		for (var n = 1; n <= 10; n++)
		{
	        $("body").on("change, keyup", "#Inetwork_firewall_filter_" + n + "_ip_address", function(){
	            if((($(this).val()) == "")||(($(this).val()).match(IP_regex_Max))||(($(this).val()).match(IPv6_regex)))
	            {
	                $(this).removeClass("invalid_modify");
					$.fn._isModified($(this));
	            }
	            else
					$(this).addClass("invalid_modify").removeClass("modify");

	            $.fn._runChecking("sub_firewall");
	        });

	        $("body").on("change", "#Inetwork_firewall_filter_" + n + "_enable", function(){
                var id = $(this).attr("id")
                , _num = id.match(/\d\d/g) == null ? id.match(/\d/g) : id.match(/\d\d/g)
                ;

				var chkbox_status = $(this).is(":checked") == true? "on":"off";

				if (chkbox_status == "on")
					$("#Inetwork_firewall_filter_" + _num + "_ip_address").attr("disabled", false).removeClass("grey_out");
				else
					$("#Inetwork_firewall_filter_" + _num + "_ip_address").attr("disabled", true).addClass("grey_out");

				$(this).val(chkbox_status);

				$.fn._isModifiedForCheckbox($(this));
	            $.fn._runChecking("sub_firewall");
	        });

			$("#Inetwork_firewall_filter_" + n + "_ip_address").change();
			$("#Inetwork_firewall_filter_" + n + "_enable").change();
		}

        $("body").on("click", "#Save_Isub_firewall", function(){
            if($(this).attr("class") == "can_modify"){
                var cmd = $.fn._runCollectModifUAPI("Isub_firewall");
                $.fn._runSetWithBlockUI(cmd, function(){
                    $("#Isub_firewall .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    $("#Save_Isub_firewall").removeClass("can_modify").addClass("not_modify");
                    setTimeout($.fn._runUnBlockUI, 3000);
                });
            }
        });
    };

    $.fn._initializeDDNS = function()
    {
		var _runchecking = function(){
			var length_status = false, invalid_status = false, modify_status = false;
			$("#Inetwork_ddns_hostname, #Inetwork_ddns_username, #Inetwork_ddns_password, #Inetwork_ddns_hash").each(function(){
                if($("#Inetwork_ddns_ddns_type").val() != "freedns" && $(this).attr("id") == "Inetwork_ddns_hash")
                    return false;
				if($(this).val().length <= 0){
                    length_status = true;
                    $(this).addClass("invalid_modify").removeClass("modify");
                } else {
                    $.fn._isModified($(this));
                }
			});

			$("#Isub_ddns input[type=text], #Isub_ddns input[type=password]").each(function(){
				if($(this).attr("class") != undefined){
	                if($(this).attr("class").search("invalid_modify") != -1){
	                    invalid_status = true;
	                    return false;
	                }
	            }
			});

			$("#Isub_ddns input[type=text], #Isub_ddns input[type=password], #Isub_ddns select").each(function(){
	            if($(this).attr("class") != undefined){
	                if($(this).attr("class").search("modify") != -1){
	                    modify_status = true;
	                    return false;
	                }
	            }
	        });
            
			if(length_status)
            {
                $.fn.setModify(1);
				$("#Save_Isub_ddns").removeClass("can_modify").addClass("not_modify");
            }
			else
			{
				if(invalid_status)
                {
                    $.fn.setModify(1);
					$("#Save_Isub_ddns").removeClass("can_modify").addClass("not_modify");
                }
				else
				{
					if(modify_status)
                    {
                        $.fn.setModify(1);
						$("#Save_Isub_ddns").removeClass("not_modify").addClass("can_modify");
                    }
					else
                    {
                        $.fn.setModify(0);
						$("#Save_Isub_ddns").removeClass("can_modify").addClass("not_modify");
                    }
				}
			}	
		};

		$("body").on("change", "#Inetwork_ddns_enable", function(){
            $.fn._isModified($(this));
            if($(this).val() == "on")
                _runchecking();
            else
            {
                $("#Isub_ddns .invalid_modify").removeClass("invalid_modify");
                $.fn._runChecking("sub_ddns");
            }
        });

        $("body").on("change", "#Inetwork_ddns_ddns_type", function(){
            if($(this).val() == "freedns"){
                $("#Mnetwork_ddns_hash").parent().parent().show();
                $("#Inetwork_ddns_hash").change();
            } else {
                $("#Mnetwork_ddns_hash").parent().parent().hide();
                $("#Inetwork_ddns_hash").removeClass("invalid_modify").removeClass("modify");
            }
            $.fn._isModified($(this));
            $.fn._runChecking("sub_ddns");
        });
		
        $("body").on("change, keyup", "#Isub_ddns input[type=text], #Isub_ddns input[type=password]", function(){
            if ($(this).val().length <= 0)
				$(this).addClass("invalid_modify").removeClass("modify");
            else
            {
				$(this).removeClass("invalid_modify");
                $.fn._isModified($(this));
            }
            $.fn._runChecking("sub_ddns");
        });

        $("body").on("change", "#Inetwork_ddns_hash", function(){
            if ($(this).val().length <= 0)
                $(this).addClass("invalid_modify").removeClass("modify");
            else
            {
                $(this).removeClass("invalid_modify");
                $.fn._isModified($(this));
            }
            $.fn._runChecking("sub_ddns");
        });

        $("body").on("click", "#Save_Isub_ddns", function(){
            if($(this).attr("class") == "can_modify"){
                var cmd = $.fn._runCollectModifUAPI("Isub_ddns");
                $.fn._runSetWithBlockUI(cmd, function(){
                    $("#Isub_ddns .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    $("#Save_Isub_ddns").removeClass("can_modify").addClass("not_modify");
                    setTimeout($.fn._runUnBlockUI, 3000);
                });
            }
        });

        $("#Inetwork_ddns_ddns_type").change();
    };

    $.fn._initializeLDAP = function()
    {
		var _runchecking = function(){
			var length_status = false, invalid_status = false, modify_status = false;
			$("#Inetwork_ldap_server, #Inetwork_ldap_login_id, #Inetwork_ldap_login_passwd").each(function(){
				if($(this).val().length <= 0){
					length_status = true;
					$(this).addClass("invalid_modify").removeClass("modify");
				} else {
					if($(this).attr("id") == "Inetwork_ldap_server")
					{
						if (!($(this).val()).match(IP_regex_Max))
							$(this).addClass("invalid_modify").removeClass("modify");
						else
							$.fn._isModified($(this));
					}
					else
						$.fn._isModified($(this));
				}
			});

			$("#Isub_ldap input[type=text], #Isub_ldap input[type=password]").each(function(){
				if($(this).attr("class") != undefined){
	                if($(this).attr("class").search("invalid_modify") != -1){
	                    invalid_status = true;
	                    return true;
	                }
	            }
			});

			$("#Isub_ldap input[type=text], #Isub_ldap input[type=password]").each(function(){
	            if($(this).attr("class") != undefined){
	                if($(this).attr("class").search("modify") != -1){
	                    modify_status = true;
	                    return true;
	                }
	            }
	        });
			
			if (length_status)
            {
                $.fn.setModify(1);
				$("#Save_Isub_ldap").removeClass("can_modify").addClass("not_modify");
            }
			else
			{
				if(invalid_status)
				{
                    $.fn.setModify(1);
					$("#Save_Isub_ldap").removeClass("can_modify").addClass("not_modify"); 
				}
				else
				{
					if(modify_status)
                    {
                        $.fn.setModify(1);
						$("#Save_Isub_ldap").removeClass("not_modify").addClass("can_modify");  
					} 
                    else
                    {
                        $.fn.setModify(0);
						$("#Save_Isub_ldap").removeClass("can_modify").addClass("not_modify");
                    }
				}
			}
		};

        var accessLDAP = function(){
            $.ajax({
                url:'/login/bin/ldapclient.cgi?',
                dataType:'json',
                cache:false,
                success:function(data){
                },
                error:function(xhr, textStatus, errorThrown){
                }
            });
        };

        $("body").on("change , keyup", "#Inetwork_ldap_server", function(){
			if (!($(this).val()).match(IP_regex_Max))
				$(this).addClass("invalid_modify").removeClass("modify");
			else
			{
				$(this).removeClass("invalid_modify").addClass("modify");
                $.fn._isModified($(this));
			}
				
			_runchecking();
		});

        $("body").on("change, keyup", "#Inetwork_ldap_port", function(){
            if ( ($(this).val() == "389" || (parseInt($(this).val()) >= 1025 && parseInt($(this).val()) <= 65535) ) && $.isNumeric($(this).val()) )
            {
                $(this).removeClass("invalid_modify").addClass("modify");
                $.fn._isModified($(this));
            }
            else
                $(this).addClass("invalid_modify").removeClass("modify");
			
			_runchecking();
        });

        $("body").on("change, keyup", "#Inetwork_ldap_base_dn, #Inetwork_ldap_admin, #Inetwork_ldap_operator, #Inetwork_ldap_user", function(){
            if ($(this).val().length > 0)
            {
                $(this).removeClass("invalid_modify").addClass("modify");
                $.fn._isModified($(this));
            }
            else
                $(this).addClass("invalid_modify").removeClass("modify");
			_runchecking();
        });

        $("body").on("change, keyup", "#Inetwork_ldap_bind_dn_template, #Inetwork_ldap_search_template", function(){
            if ($(this).val().length <= 0 || !($(this).val().match("%u")))
                $(this).addClass("invalid_modify").removeClass("modify");
            else
            {
                $(this).removeClass("invalid_modify").addClass("modify");
                $.fn._isModified($(this));
            }
			_runchecking();
        });

        $("body").on("change , keyup", "#Inetwork_ldap_login_id", function(){
			if ($(this).val() == "")
				$(this).addClass("invalid_modify").removeClass("modify");
			else
			{
				$(this).removeClass("invalid_modify").addClass("modify");
                $.fn._isModified($(this));
			}
			_runchecking();
		});

        $("body").on("change , keyup", "#Inetwork_ldap_login_passwd", function(){
       		if ($(this).val() == "")
				$(this).addClass("invalid_modify").removeClass("modify");
            else
            {
				$(this).removeClass("invalid_modify");
                $.fn._isModified($(this));
            }
			_runchecking();
		});

        $("body").on("click", "#Save_Isub_ldap", function(){
            if($(this).attr("class") == "can_modify"){
                var cmd = $.fn._runCollectModifUAPI("Isub_ldap");
                query_param = "network.ldap.status";
                $.fn._runSetWithBlockUI(cmd, function(){
                    $("#Isub_ldap .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    $("#Save_Isub_ldap").removeClass("can_modify").addClass("not_modify");
                    setTimeout(function(){
                        accessLDAP();
                    }, 1000);
                    $.fn._runListen();
                });
            }
        });
    };

    $.fn._initializeSSL = function()
    {
        var updateSSL = function(pid){
            var tmp = ""
            ;
            tmp = $.fn._runModifyUapiName("Isub_ssl", pid, "");
        };

        var _runChecking = function()
        {
            var invalid_status = false, modify_status = true;
            $("#Isub_ssl input[type=text]").each(function(){
                if($(this).attr("tmp_name") != undefined){
                    if($(this).attr("class") != undefined){
                        if($(this).attr("class").search("invalid_modify") != -1){
                            invalid_status = true;
                            return true;
                        }
                    }
                }
            });

            $("#Isub_ssl input[type=text]").each(function(){
                if($(this).attr("tmp_name") != undefined){
                    if($(this).attr("class") == undefined){
                        modify_status = false;
                        return true;
                    }
                }
            });

            if(invalid_status)
            {
                $("#Igenerate_certificate").addClass("not_modify_without_float").removeClass("can_modify_without_float");
            }
            else
            {
                if(modify_status)
                {
                    $.fn.setModify(1);
                    $("#Igenerate_certificate").addClass("can_modify_without_float").removeClass("not_modify_without_float");
                }
                else
                {
                    $.fn.setModify(0);
                    $("#Igenerate_certificate").addClass("not_modify_without_float").removeClass("can_modify_without_float");
                }
            }
        };

        var checkingSSLFile = function(){
            var found = 0;
            $("#Inetwork_ssl_upload_certificate_file, #Inetwork_ssl_upload_ca_file").each(function(){
                if($(this).attr("class") == "invalid_modify")
                    found = 1;
                else{
                    if($(this).val().length <= 0)
                        found = 1;
                }  
            });

            if(found == 1)
                $("#Iupload_certificate").removeClass("can_modify_without_float").addClass("not_modify_without_float");
            else
                $("#Iupload_certificate").removeClass("not_modify_without_float").addClass("can_modify_without_float");
        };

        var options = {
            beforeSubmit:function(){
            }
        };

        $("#Fnetwork_ssl_upload_certificate_file").ajaxForm(options);
        $("#Fnetwork_ssl_upload_ca_file").ajaxForm(options);

        $("body").on("change", "#Inetwork_ssl_upload_certificate_file", function(){
            var file = $(this).val();
            if(file.length <= 0){
                $(this).addClass("invalid_modify");
            } else {
                $(this).removeClass("invalid_modify");
            }
            checkingSSLFile();
            $("#Inetwork_ssl_upload_certificate_file_name").show();
            $("#Inetwork_ssl_upload_certificate_file_name")[0].innerHTML = file;
        });

        $("body").on("change", "#Inetwork_ssl_upload_ca_file", function(){
            var file = $(this).val();
            if(file.length <= 0){
                $(this).addClass("invalid_modify");
            } else {
                $(this).removeClass("invalid_modify");
            }
            checkingSSLFile();
            $("#Inetwork_ssl_upload_ca_file_name").show();
            $("#Inetwork_ssl_upload_ca_file_name")[0].innerHTML = file;
        });

        $("body").on("click", "#Iupload_certificate", function(){
            if($(this).attr("class") != "not_modify_without_float"){
                $("#Inetwork_ssl_upload_certificate_file_text").val("ssl-cert-file");
                $("#Inetwork_ssl_upload_ca_file_text").val("ssl-ca-file");
                var cmd = $.parseJSON("{ \"network.ssl.delete_cert\":\"go\",\"network.ssl.self-signed.status\":\"\",\"network.ssl.csr.status\":\"\",\"network.ssl.install_cert.status\":\"\" }");
                $.fn._runSetWithBlockUI(cmd, function(){
                    setTimeout(function(){
                        $("#Fnetwork_ssl_upload_certificate_file").submit();
                    }, 500);
                    setTimeout(function(){
                        query_param = "network.ssl.install_cert.status";
                        $("#Fnetwork_ssl_upload_ca_file").submit();
                        $.fn._runListen();
                    }, 3000);
                });
            }
        });

        $("body").on("click", "#Inetwork_ssl_upload_certificate_file_browser", function(){
            if($.fn.DetectBrowser() == "msie")
                return true;
            $("#Inetwork_ssl_upload_certificate_file").click();
        });

        $("body").on("click", "#Inetwork_ssl_upload_ca_file_browser", function(){
            if($.fn.DetectBrowser() == "msie")
                return true;
            $("#Inetwork_ssl_upload_ca_file").click();
        });

        if($.fn.DetectBrowser() == "msie"){
            $("#Inetwork_ssl_upload_certificate_file").attr("style", "z-index:999;opacity:0;height:24px;position:relative;top:10px;left:-67px;");
            $("#Inetwork_ssl_upload_ca_file").attr("style", "z-index:999;opacity:0;height:24px;position:relative;top:10px;left:-67px;");
        }
        
        $("body").on("change", "#Inetwork_ssl_generate_method", function(){
            if($(this).val() == "none"){
                $("#Mnetwork_ssl_certificate_area").parent().hide();
            } else if($(this).val() == "self-signed"){
                $("#Mnetwork_ssl_certificate_area").parent().show();
                $("#Isub_ssl tr[ref_id=certificate_signed]").show();
                $("#Isub_ssl tr[ref_id=generate_signed]").show();
                $("#Isub_ssl tr[ref_id=certificate_upload]").hide();
                updateSSL($(this).val());
            } else if($(this).val() == "csr"){
                $("#Mnetwork_ssl_certificate_area").parent().show();
                $("#Isub_ssl tr[ref_id=certificate_signed]").show();
                $("#Isub_ssl tr[ref_id=generate_signed]").show();
                $("#Isub_ssl tr[ref_id=certificate_upload]").hide();
                updateSSL($(this).val());
            } else if($(this).val() == "install_cert"){
                $("#Mnetwork_ssl_certificate_area").parent().show();
                $("#Isub_ssl tr[ref_id=certificate_signed]").hide();
                $("#Isub_ssl tr[ref_id=generate_signed]").hide();
                $("#Isub_ssl tr[ref_id=certificate_upload]").show();
            }
        });
        
        $("body").on("change keyup", "#Inetwork_ssl_country", function(){
            if(!Letter_regex.test($(this).val()))
                $(this).addClass("invalid_modify").removeClass("modify");
            else
            {
                $(this).removeClass("invalid_modify");
                $.fn._isModified($(this));
            }
                
            _runChecking(); 
        });

        $("body").on("change keyup",  "#Inetwork_ssl_organization,"+ 
                                "#Inetwork_ssl_common_name,"+ 
                                "#Inetwork_ssl_department,"+ 
                                "#Inetwork_ssl_city,"+ 
                                "#Inetwork_ssl_province",
        function(){
            if($(this).val().length <= 0)
                $(this).addClass("invalid_modify").removeClass("modify");
            else
            {
                $(this).removeClass("invalid_modify");
                $.fn._isModified($(this));
            }
                
            _runChecking();
        });

        $("body").on("change keyup", "#Inetwork_ssl_email", function(){
            if(!(($(this).val()).match(Mail_regex)))
                $(this).addClass("invalid_modify").removeClass("modify");
            else
            {
                $(this).removeClass("invalid_modify");
                $.fn._isModified($(this));
            }
                
            _runChecking();
        });

        $("body").on("click", "#Igenerate_certificate", function(){
            if($(this).attr("class") != "not_modify_without_float"){
                var tmp = "{\"network.ssl.self-signed.status\":\"\",\"network.ssl.csr.status\":\"\",\"network.ssl.install_cert.status\":\"\","
                , cmd
                ;
                query_param = $("#Inetwork_ssl_generate_method").val() == "self-signed" ? "network.ssl.self-signed.status" : "network.ssl.csr.status";
                $("#Isub_ssl .modify").each(function(){
                    tmp += "\""+$(this).attr("tmp_name") +"\":\""+ $(this).val() +"\",";
                });
                tmp += $("#Inetwork_ssl_generate_method").val() == "self-signed" ? "\"network.ssl.self-signed.generate\":\"start\"}" : "\"network.ssl.csr.generate\":\"start\"}";

                cmd = $.parseJSON(tmp);
                $.fn._runSetWithBlockUI(cmd, function(){
                    $("#Isub_ssl .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    $.fn._runListen();
                });
            }
        });

        $("body").on("click", "#Idelete_certificate", function(){
            if($(this).attr("class") != "not_modify"){
                var tmp = "";
                if($("#Iweb_ssl_enable").val() == "on")
                    tmp = "{\"network.ssl.delete_cert\":\"go\",\"network.ssl.self-signed.status\":\"\",\"network.ssl.csr.status\":\"\",\"network.ssl.install_cert.status\":\"\",\"network.web.ssl.enable\":\"off\"}";
                else
                    tmp = "{\"network.ssl.delete_cert\":\"go\",\"network.ssl.self-signed.status\":\"\",\"network.ssl.csr.status\":\"\",\"network.ssl.install_cert.status\":\"\"}";
                var cmd = $.parseJSON(tmp);
                $.fn._runSetWithBlockUI(cmd, function(){
                    setTimeout(function(){
                        $("#Inetwork_web_ssl_enable > option[value=off]").prop("selected",true);
                        $("#Inetwork_web_ssl_enable").change();
                        $("#Mnetwork_ssl_certificate_info").parent().hide();
                        $.fn._runUnBlockUI();
                    }, 3000);
                });
            }
        });

        $("body").on("change",  "#Inetwork_ssl_info_common_name,"+
                                "#Inetwork_ssl_info_organization,"+
                                "#Inetwork_ssl_info_country,"+
                                "#Inetwork_ssl_info_location,"+
                                "#Inetwork_ssl_info_start_date,"+
                                "#Inetwork_ssl_info_end_date", 
            function(){
                var span_id = "#S"+$(this).attr("id").slice(1, $(this).attr("id").length);
                if($(this).attr("id") == "Inetwork_ssl_info_organization")
                {
                    $("#Snetwork_ssl_info_issuer")[0].innerHTML = $(this).val();
                    $(span_id)[0].innerHTML = $(this).val();
                }
                else    
                    $(span_id)[0].innerHTML = $(this).val();
        });
        
        if($("#Inetwork_ssl_info_common_name").val() == "")
            $("#Mnetwork_ssl_certificate_info").parent().hide();
        else
        {
            $("#Mnetwork_ssl_certificate_info").parent().show();
            $("#Inetwork_ssl_info_common_name,"+
                "#Inetwork_ssl_info_organization,"+
                "#Inetwork_ssl_info_country,"+
                "#Inetwork_ssl_info_location,"+
                "#Inetwork_ssl_info_start_date,"+
                "#Inetwork_ssl_info_end_date").change();
        }

        $("#Inetwork_ssl_generate_method").change();
    };

    $.fn._initializeGB28181 = function()
    {
        var _runchecking = function(){
            var length_status = false, invalid_status = false, modify_status = false;
            $("#Inetwork_gb28181_enable, #Inetwork_gb28181_server_ip, #Inetwork_gb28181_device_id, #Inetwork_gb28181_password, #Inetwork_gb28181_device_id, #Inetwork_gb28181_alarm_id").each(function(){
                if($(this).val().length <= 0){
                    length_status = true;
                    $(this).addClass("invalid_modify").removeClass("modify");
                } else {
                    if($(this).attr("id") == "Inetwork_gb28181_server_ip")
                    {
                        if (!($(this).val()).match(IP_regex_Max))
                            $(this).addClass("invalid_modify").removeClass("modify");
                        else
                            $.fn._isModified($(this));
                    }
                    else
                        $.fn._isModified($(this));
                }
            });

            $("#Isub_gb28181 input[type=text], #Isub_gb28181 input[type=password]").each(function(){
                if($(this).attr("class") != undefined){
                    if($(this).attr("class").search("invalid_modify") != -1){
                        invalid_status = true;
                        return true;
                    }
                }
            });

            $("#Isub_gb28181 input[type=text], #Isub_gb28181 input[type=password], #Isub_gb28181 input[type=checkbox]").each(function(){
                if($(this).attr("class") != undefined){
                    if($(this).attr("class").search("modify") != -1){
                        modify_status = true;
                        return true;
                    }
                }
            });

            if(length_status)
            {
                $.fn.setModify(1);
                $("#Save_Isub_gb28181").removeClass("can_modify").addClass("not_modify");
            }
            else
            {
                if(invalid_status)
                {
                    $.fn.setModify(1);
                    $("#Save_Isub_gb28181").removeClass("can_modify").addClass("not_modify");
                }
                else
                {
                    if(modify_status)
                    {
                        $.fn.setModify(1);
                        $("#Save_Isub_gb28181").removeClass("not_modify").addClass("can_modify");
                    }
                    else
                    {
                        $.fn.setModify(0);
                        $("#Save_Isub_gb28181").removeClass("can_modify").addClass("not_modify");
                    }
                }
            }
        };

        $("body").on("change", "#Inetwork_gb28181_enable", function(){
            var chkbox_status = $(this).is(":checked") == true? "on":"off";
            $(this).val(chkbox_status);
            _runchecking();
        });

        $("body").on("change, keyup", "#Inetwork_gb28181_server_ip", function(){
            if(!(($(this).val()).match(IP_regex_Max)))
                $(this).addClass("invalid_modify");
            else
                $(this).removeClass("invalid_modify");
            _runchecking()
        });

        $("body").on("change, keyup", "#Inetwork_gb28181_server_port", function(){
            if((parseInt($(this).val()) >= 1025 && parseInt($(this).val()) <= 65535) && $.isNumeric($(this).val()))
            {
                $(this).removeClass("invalid_modify").addClass("modify");
                $.fn._isModified($(this));
            }
            else
                $(this).addClass("invalid_modify").removeClass("modify");
            
            _runchecking();
        });

        $("body").on("change, keyup", "#Inetwork_gb28181_heartbeat_interval, #Inetwork_gb28181_register_interval", function(){
            if((parseInt($(this).val()) >= 1 && parseInt($(this).val()) <= 65535) && $.isNumeric($(this).val()))
            {
                $(this).removeClass("invalid_modify").addClass("modify");
                $.fn._isModified($(this));
            }
            else
                $(this).addClass("invalid_modify").removeClass("modify");
            
            _runchecking();
        });

        $("body").on("change, keyup", "#Inetwork_gb28181_password, #Inetwork_gb28181_alarm_id, #Inetwork_gb28181_device_id", function(){
            if($(this).val().length > 0)
            {
                $(this).removeClass("invalid_modify").addClass("modify");
                $.fn._isModified($(this));
            }
            else
                $(this).addClass("invalid_modify").removeClass("modify");
            _runchecking();
        });

        $("body").on("click", "#Save_Isub_gb28181", function(){
            if($(this).attr("class") == "can_modify"){
                var cmd = $.fn._runCollectModifUAPI("Isub_gb28181");
                $.fn._runSetWithBlockUI(cmd, function(){
                    $("#Isub_gb28181 .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    $("#Save_Isub_gb28181").removeClass("can_modify").addClass("not_modify");
                    setTimeout($.fn._runUnBlockUI, 3000);
                });
            }
        });
    };

    $.fn._initializeYoutube = function()
    {
        var _runchecking = function(){
            var length_status = false, invalid_status = false, modify_status = false;
            $("#Inetwork_youtube_enable, #Inetwork_youtube_rtmp_url").each(function(){
                if($(this).val().length <= 0){
                    length_status = true;
                    $(this).addClass("invalid_modify").removeClass("modify");
                } else {
                    if($(this).attr("id") == "Inetwork_youtube_rtmp_url")
                    {
                        if (!($(this).val()).match(RTMP_regex))
                            $(this).addClass("invalid_modify").removeClass("modify");
                        else
                            $.fn._isModified($(this));
                    }
                    else
                        $.fn._isModified($(this));
                }
            });

            $("#Isub_youtube input[type=text], #Isub_youtube select").each(function(){
                if($(this).attr("class") != undefined){
                    if($(this).attr("class").search("invalid_modify") != -1){
                        invalid_status = true;
                        return true;
                    }
                }
            });

            $("#Isub_youtube input[type=text], #Isub_youtube select, #Isub_youtube input[type=checkbox]").each(function(){
                if($(this).attr("class") != undefined){
                    if($(this).attr("class").search("modify") != -1){
                        modify_status = true;
                        return true;
                    }
                }
            });

            if(length_status)
            {
                $.fn.setModify(1);
                $("#Save_Isub_youtube").removeClass("can_modify").addClass("not_modify");
            }
            else
            {
                if(invalid_status)
                {
                    $.fn.setModify(1);
                    $("#Save_Isub_youtube").removeClass("can_modify").addClass("not_modify");
                }
                else
                {
                    if(modify_status)
                    {
                        $.fn.setModify(1);
                        $("#Save_Isub_youtube").removeClass("not_modify").addClass("can_modify");
                    }
                    else
                    {
                        $.fn.setModify(0);
                        $("#Save_Isub_youtube").removeClass("can_modify").addClass("not_modify");
                    }
                }
            }
        };

        var updateRTMP = function(){
            var db = $.parseJSON("{\"network.youtube.status\":\"\"}");
            $.ajax({
                beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
                url:'/cgi-bin/get?',
                dataType:'json',
                type:'POST',
                data:db,
                cache:false,
                success:function(data){
                    $.each(data, function(param, val){
                        if(param == "network.youtube.status")
                            $("#Inetwork_youtube_status").val(val[1]);
                    });
                },
                error:function(xhr, textStatus, errorThrown){
                    $.removeCookie('ipcamera', { path: '/' });
                },
                complete:function(){
                    $.removeCookie('ipcamera', { path: '/' });
                }
            });
        };

        $("body").on("change", "#Inetwork_youtube_enable", function(){
            var chkbox_status = $(this).is(":checked") == true? "on":"off";
            $(this).val(chkbox_status);
            $.fn._isModified($(this));
            _runchecking();
        });

        $("body").on("change", "div[conf='sub_youtube'] select", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_youtube");
        });

        $("body").on("change, keyup", "#Inetwork_youtube_rtmp_url", function(){
            if(!(($(this).val()).match(RTMP_regex)))
                $(this).addClass("invalid_modify");
            else
                $(this).removeClass("invalid_modify");
            _runchecking();
        });

        $("body").on("click", "#Save_Isub_youtube", function(){
            if($(this).attr("class") == "can_modify"){
                var cmd = $.fn._runCollectModifUAPI("Isub_youtube");
                $.fn._runSetWithBlockUI(cmd, function(){
                    $("#Isub_youtube .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    $("#Save_Isub_youtube").removeClass("can_modify").addClass("not_modify");
                    setTimeout(updateRTMP, 2000);
                    setTimeout($.fn._runUnBlockUI, 3000);
                });
            }
        });
    };

    $.fn._initializeHLS = function()
    {
        $("body").on("change", "#Inetwork_hls_enable", function(){
            var chkbox_status = $(this).is(":checked") == true? "on":"off";
            $(this).val(chkbox_status);
            $.fn._isModified($(this));
            $.fn._runChecking("sub_hls");
        });

        $("body").on("change", "div[conf='sub_hls'] select", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_hls");
        });

        var updateHLS = function(){
            var db = $.parseJSON("{\"network.hls.hls_url\":\"\"}");
            $.ajax({
                beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
                url:'/cgi-bin/get?',
                dataType:'json',
                type:'POST',
                data:db,
                cache:false,
                success:function(data){
                    $.each(data, function(param, val){
                        if(param == "network.hls.hls_url")
                            $("#Inetwork_hls_hls_url").val(val[1]);
                    });
                },
                error:function(xhr, textStatus, errorThrown){
                    $.removeCookie('ipcamera', { path: '/' });
                },
                complete:function(){
                    $.removeCookie('ipcamera', { path: '/' });
                }
            });
        };

        $("body").on("click", "#Save_Isub_hls", function(){
            if($(this).attr("class") == "can_modify"){
                var cmd = $.fn._runCollectModifUAPI("Isub_hls");
                $.fn._runSetWithBlockUI(cmd, function(){
                    $("#Isub_hls .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    $("#Save_Isub_hls").removeClass("can_modify").addClass("not_modify");
                    setTimeout(updateHLS, 2000);
                    setTimeout($.fn._runUnBlockUI, 3000);
                });
            }
        });
    };

    $.fn._initializeDateTime = function()
    {
        $("input[name=system_datetime_sync_mode][value="+$("#Isystem_datetime_sync_mode").val()+"]").prop('checked',true).change();
        $.fn._runRefreshPCTime();
        $.fn._runUpdateServerTime();
        if(SetupDate)
            return true;
        
        var time_zone_list = $("#Isystem_datetime_time_zone").val()
        , initial_time_area = $("#Isystem_datetime_area").attr("de_val")
        , tmp = time_zone_list.split(',')
        ;

        var callback_manual = function(){
            var manual_tmp = $("#Isystem_datetime_manual").val() == "" ? $.fn._runGetPCTime() : $("#Isystem_datetime_manual").val()
            , manual_time = manual_tmp.split(" ")
            ;
            $("#Isystem_date_by_manual").val(manual_time[0]);
            $("#Isystem_time_by_manual").val(manual_time[1]);
        };

        var updateManual = function(){
            var date = $("#Isystem_date_by_manual").val()
            , time = $("#Isystem_time_by_manual").val()
            ;
            $("#Isystem_datetime_manual").val(date+" "+time).change();
        };

        var updatePC = function(){
            var date = $("#Isystem_date_by_pc").val()
            , time = $("#Isystem_time_by_pc").val()
            ;
            $("#Isystem_datetime_manual").val(date+" "+time).change();
        };

        var setDelayManual = function(){
            var td = new Date();
            var yyyy = "", md = "", dd ="", hh = "", mm = "", ss = "", ms= "", datetime, sleeptime;
            
            if(eval(td.getFullYear()) <= 1000)
                yyyy = "0"+td.getFullYear();
            else
                yyyy = td.getFullYear();
            
            if(eval(td.getMonth()+1) <= 9)
                md = "0"+eval(td.getMonth()+1);
            else
                md = eval(td.getMonth()+1);
            
            if(eval(td.getDate()) <= 9)
                dd = "0"+td.getDate();
            else
                dd = td.getDate();
            
            if(eval(td.getHours()) <= 9)
                hh = "0"+td.getHours();
            else
                hh = td.getHours();
            
            if(eval(td.getMinutes()) <= 9)
                mm = "0"+td.getMinutes();
            else
                mm = td.getMinutes();
            
            if(eval(td.getSeconds()) <= 9)
                ss = "0"+td.getSeconds();
            else
                ss = td.getSeconds();

            ms = td.getMilliseconds();
            
            if((Number(1000) - Number(ms)) <= 150)
                sleeptime = 0;
            else
                sleeptime = Number(1000) - Number(ms) - 150;

            setTimeout(function(){
                datetime = yyyy+"/"+md+"/"+dd+" "+hh+":"+mm+":"+(Number(ss)+Number(1));
                $.fn._runSetWithoutBlockUI("system.datetime.manual"+"="+datetime);
            }, sleeptime);
        };
        
        $.each(tmp, function(n){
            if(tmp[n] == initial_time_area)
                $("#Isystem_datetime_area").append($("<option></option>").attr("value", tmp[n]).text(tmp[n]).attr("selected","true"));
            else
                $("#Isystem_datetime_area").append($("<option></option>").attr("value", tmp[n]).text(tmp[n]));
        });

        $("body").on("change", "div[conf='sub_datetime'] select", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_datetime");
        });

        $("body").on("change", "input[name='system_datetime_sync_mode']", function(){
            if($(this).val() == "manual"){
                $("#Isystem_date_by_manual").removeClass("grey_out").attr("disabled", false);
                $("#Isystem_time_by_manual").removeClass("grey_out").attr("disabled", false);
                $("#Msystem_ntp_setting").parent().hide();
                if($("#Isystem_datetime_sync_mode").attr("de_val") != "manual")
                    $("#Isystem_datetime_manual").val($("#Isystem_date_by_manual").val()+" "+$("#Isystem_time_by_manual").val()).addClass("modify");
            } else if($(this).val() == "ntp"){
                $("#Isystem_date_by_manual").addClass("grey_out").attr("disabled", true);
                $("#Isystem_time_by_manual").addClass("grey_out").attr("disabled", true);
                $("#Msystem_ntp_setting").parent().show();
                $("#Isystem_datetime_ntp_mode").change();
            } else if($(this).val() == "sync_with_pc"){
                $("#Isystem_date_by_manual").addClass("grey_out").attr("disabled", true);
                $("#Isystem_time_by_manual").addClass("grey_out").attr("disabled", true);
                $("#Msystem_ntp_setting").parent().hide();
                updatePC();
                if($("#Isystem_datetime_sync_mode").attr("de_val") == "sync_with_pc"){
                    setTimeout(function(){
                       $.fn.setModify(0); 
                    }, 100);
                }    
            }
            $("#Isystem_datetime_sync_mode").val($(this).val()).change();
        });

        $("body").on("change", "#Isystem_datetime_sync_mode", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_datetime");
        });

        $("body").on("change", "#Isystem_datetime_ntp_mode", function(){
            if($(this).val() == "manual"){
                $("#Msystem_datetime_ntp_manual_server_address").parent().parent().show();
                $("#Msystem_datetime_ntp_from_dhcp_server_address").parent().parent().hide();
            } else if($(this).val() == "from_dhcp"){
                $("#Msystem_datetime_ntp_manual_server_address").parent().parent().hide();
                $("#Msystem_datetime_ntp_from_dhcp_server_address").parent().parent().show();
            }
        });

        $("body").on("change", "#Isystem_datetime_manual", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_datetime");
        });

        $("body").on("change keyup", "#Isystem_date_by_manual", function(){
            if(!($(this).val()).match(Date_regex))
                $(this).addClass("invalid_modify").removeClass("modify");
            else
            {
                $(this).removeClass("invalid_modify");
                updateManual();
            }
                
            $.fn._runChecking("sub_datetime");
        });

        $("body").on("change keyup", "#Isystem_time_by_manual", function(){
            if(!($(this).val()).match(Time_regex))
                $(this).addClass("invalid_modify").removeClass("modify");
            else
            {
                $(this).removeClass("invalid_modify");
                updateManual();
            }
                
            $.fn._runChecking("sub_datetime");
        });

        $("body").on("change keyup", "#Isystem_datetime_ntp_manual_server_address", function(){
            if(!(($(this).val()).match(NTP_server_regex)))
                $(this).addClass("invalid_modify");
            else
            {
                $(this).removeClass("invalid_modify");
                $.fn._isModified($(this));
            }
            $.fn._runChecking("sub_datetime");
        });

        $("div[conf='sub_datetime'] div.slider").each(function(){
            var Sid = $(this).attr("id")
            , Iid = $(this).siblings("input").attr("id")
            ;

            $.fn._initializeSilderCtrl(Sid, Iid, $(this).attr("_max"), $(this).attr("_min"), $(this).attr("_step"), "inactive", "sub_datetime");
            $("#"+Iid).change();
        });

        $("body").on("click", "#Save_Isub_datetime", function(){
            if($(this).attr("class") == "can_modify"){
                var cmd;
                if($("input[type=radio][name=system_datetime_sync_mode]:checked").val() == "sync_with_pc")
                {
                    var tmp = "";
                    $("#Isub_datetime .modify").each(function(){
                        if($(this).attr("name") != "system.datetime.manual")
                            tmp += "\""+$(this).attr("name")+"\":\""+ $(this).val()+"\",";
                    });
                    tmp = tmp.slice(0, tmp.length-1);
                    tmp = "{"+tmp+"}";
                    cmd = $.parseJSON(tmp);
                    setDelayManual();
                }
                else
                    cmd = $.fn._runCollectModifUAPI("Isub_datetime");
                $.fn._runSetWithBlockUI(cmd, function(){
                    $("#Isub_datetime .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    if($("input[type=radio][name=system_datetime_sync_mode]:checked").val() != "sync_with_pc")
                        $("#Save_Isub_datetime").removeClass("can_modify").addClass("not_modify");
                    callback_manual();
                    $.fn.initialFunParam();
                    setTimeout($.fn._runUnBlockUI, 3500);
                });
            }
        });
        
        callback_manual();
        $("input[name=system_datetime_sync_mode][value="+$("#Isystem_datetime_sync_mode").val()+"]").prop('checked',true).change();
        SetupDate = true;
    };

    $.fn._initializeFirmware = function()
    {
        var options = {
            beforeSubmit:function(){
                if($("#Isystem_infor_firmware").attr("class") != "can_modify"){
                    return false;
                } else {
                    $.fn._runBlockUIwithoutView($.fn.GetLangStr(LT._Please_wait), $.fn.GetLangStr(LT._FM_uploading));
                    query_param = "system.upgrade.status";
                    $.ajax({
                        beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
                        url:'/cgi-bin/set?'+query_param+'=begin',
                        dataType:'json',
                        cache:false,
                        error:function(xhr, textStatus, errorThrown){
                        },
                        success:function(data){
                        },
                        complete:function(){
                            $.fn._runListen();
                            $.removeCookie('ipcamera', { path: '/' });
                        }
                    });
                }
            }
        };

        $("#Fsystem_infor_firmware").ajaxForm(options);

        $("body").on("change", "#Isystem_infor_firmware_file", function(){
            var file_regex ="(.*\.(tar)$)";
            var file = $(this).val();
            if(!(file.match(file_regex))){
                $(this).addClass("invalid_modify");
                $("#Isystem_infor_firmware").addClass("not_modify").removeClass("can_modify");
            } else {
                $(this).removeClass("invalid_modify");
                $("#Isystem_infor_firmware").addClass("can_modify").removeClass("not_modify");
            }
            $("#Isystem_infor_firmware_text").val("firmware");
            $("#Isystem_firmware_file_name").show();
            $("#Isystem_firmware_file_name")[0].innerHTML = file;
        });

        $("body").on("click", "#Isystem_infor_firmware_browser", function(){
            if($.fn.DetectBrowser() == "msie")
                return true;
            $("#Isystem_infor_firmware_file").click();
        });

        if($.fn.DetectBrowser() == "msie"){
            $("#Isystem_infor_firmware_file").attr("style", "z-index:999;opacity:0;height:24px;position:relative;top:10px;left:-67px;");
        }

        $("body").on("click", "#Isystem_log", function(){
            var re_action = "/cgi-bin/download_log_file.cgi?"+Math.random();
            $("#Fsystem_log").attr("action", re_action);
            setTimeout(function(){
                $("#Fsystem_log").submit();
            }, 50);
        });
    };

    $.fn._initializeAudio = function()
    {
        if($.fn.GetPlatForm() == "xarina_entry")
            $("#Msystem_audio_in_source").parent().parent().remove();
        
        $("body").on("change", "div[conf='sub_audio'] select", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_audio");
        });

        $("body").on("click", "#Save_Isub_audio", function(){
            if($(this).attr("class") == "can_modify"){
                var cmd = $.fn._runCollectModifUAPI("Isub_audio");
                $.fn._runSetWithBlockUI(cmd, function(){
                    $("#Isub_audio .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    $("#Save_Isub_audio").removeClass("can_modify").addClass("not_modify");
                    setTimeout($.fn._runUnBlockUI, 3000);
                    setTimeout($.fn.UpdateModelProperty, 1000);
                });
            }
        });
    };

    $.fn._initializeConfigure = function()
    {
        var options = {
            beforeSubmit:function(){
                if($("#Isystem_import").attr("class") != "can_modify"){
                    return false;
                } else {
                    $.fn._runBlockUIwithoutView($.fn.GetLangStr(LT._Please_wait), $.fn.GetLangStr(LT._File_uploading));
                    query_param = "system.configuration.import_status";
                    $.ajax({
                        beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
                        url:'/cgi-bin/set?'+query_param+'=begin',
                        dataType:'json',
                        cache:false,
                        error:function(xhr, textStatus, errorThrown){
                        },
                        success:function(data){
                        },
                        complete:function(){
                            $.fn._runListen();
                            $.removeCookie('ipcamera', { path: '/' });
                        }
                    });
                }
            }
        };

        $("#Fsystem_import").ajaxForm(options);

        $("body").on("change", "#Isystem_import_file", function(){
            var file_regex ="(.*\.(gz)$)";
            var file = $(this).val();
            if(!(file.match(file_regex))){
                $(this).addClass("invalid_modify");
                $("#Isystem_import").addClass("not_modify").removeClass("can_modify");
            } else {
                $(this).removeClass("invalid_modify");
                $("#Isystem_import").addClass("can_modify").removeClass("not_modify");
            }
            $("#Isystem_import_file_text").val("import");
            $("#Isystem_import_file_name").show();
            $("#Isystem_import_file_name")[0].innerHTML = file;
        });

        $("body").on("click", "#Isystem_import_file_browser", function(){
            if($.fn.DetectBrowser() == "msie")
                return true;
            $("#Isystem_import_file").click();
        });

        if($.fn.DetectBrowser() == "msie"){
            $("#Isystem_import_file").attr("style", "z-index:999;opacity:0;height:24px;position:relative;top:10px;left:-67px;");
        }

        $("body").on("click", "#Isystem_reboot, #Isystem_sw_reboot, #Isystem_hw_reboot", function(){
            var cmd = $(this).attr("name") + "="+ Math.random();
            if($(this).attr("name").search("hw_factory") != -1)
                $.fn._runReboot(cmd, "192.168.1.30");
            else
                $.fn._runReboot(cmd, "");
        });

        $("body").on("change", "#Isystem_camera_type", function(){
            if($(this).val() != $(this).attr("de_val")){
                if(confirm(""+$.fn.GetLangStr(LT._This_will_reboot)+"")){
                    var db = $.parseJSON("{"+"\""+$(this).attr("name")+"\":\""+$(this).val()+"\"}");
                    $.fn._runSetWithoutBlockUIbyPost(db, function(){
                        $.fn._runBlockUIwithoutView($.fn.GetLangStr(LT._Please_wait), $.fn.GetLangStr(LT._System_loading));
                        $.fn._runProgressbar($.fn.GetLangStr(LT._Camera_rebooting), "");
                    });
                } else
                    $(this).children("option[value='"+$(this).attr("de_val")+"']").prop("selected",true);
            }
        });

        $("body").on("click", "#Isystem_export", function(){
            var re_action = "/cgi-bin/download_conf_file.cgi?"+Math.random();
            $("#Fsystem_export").attr("action", re_action);
            setTimeout(function(){
                $("#Fsystem_export").submit();
            }, 50);
        });
    };

    $.fn._initializeOSD = function()
    {
        $("div[conf='sub_osd'] div.slider").each(function(){
            var Sid = $(this).attr("id")
            , Iid = $(this).siblings("input").attr("id")
            ;
            $.fn._initializeSilderCtrl(Sid, Iid, $(this).attr("_max"), $(this).attr("_min"), $(this).attr("_step"), "inactive", "sub_osd");
            $("#"+Iid).change();
        });

        for(var i = 1; i <= 2; i++)
        {
            $("body").on("change", "#Isystem_osd_"+i+"_mode", function(){
                var id =$(this).attr("id")
                , _num = id.match(/\d\d/g) == null ? id.match(/\d/g) : id.match(/\d\d/g)
                ;
                if($(this).val() == "text"){
                    $("#Msystem_osd_"+_num+"_text").parent().parent().show("slow");
                } else {
                    $("#Msystem_osd_"+_num+"_text").parent().parent().hide();
                }
                $.fn._isModified($(this));
                $.fn._runChecking("sub_osd");
            });

            $("body").on("change keyup", "#Isystem_osd_"+i+"_text", function(){
                var length = $.fn._runCheckLength($(this).val())
                ;
                if(length > 32)
                    $(this).addClass("invalid_modify").removeClass("modify");
                else{
                    $(this).removeClass("invalid_modify");
                    $.fn._isModified($(this));
                }
                    
                $.fn._runChecking("sub_osd");
            });

            $("body").on("change", "#Isystem_osd_"+i+"_background, #Isystem_osd_"+i+"_text_color", function(){
                $.fn._isModified($(this));
                $.fn._runChecking("sub_osd");
            });

            $("#Isystem_osd_"+i+"_mode").change();
        }

        $("body").on("change", "#Isystem_evnet_osd_background, #Isystem_evnet_osd_text_color", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_osd");
        });

        $("body").on("click", "#Save_Isub_osd", function(){
            if($(this).attr("class") == "can_modify"){
                var cmd = $.fn._runCollectModifUAPI("Isub_osd");
                $.fn._runSetWithBlockUI(cmd, function(){
                    $("#Isub_osd .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    $("#Save_Isub_osd").removeClass("can_modify").addClass("not_modify");
                    setTimeout($.fn._runUnBlockUI, 3000);
                });
            }
        });   
    };

    $.fn._initializeAccount = function()
    {
        var account_modify = 0;

        var transFirstCharUpper = function(str){
            var tmp = str.slice(0, 1).toUpperCase() + str.slice(1, str.length);
            return tmp;
        };

        var collectAccount = function(){
            var i = 0, total = -1;
            $("#Iaccount_list").children("tbody").remove();
            var genAccountEle = "<tbody>"+
                                    "<tr style=\"border-bottom:solid 1px black;background-color:#bebebe;\">"+
                                        "<th style=\"text-align:center\"><span>No.</span></th>"+
                                        "<td style=\"text-align:center\"><span>Access Level</span></td>"+
                                        "<td style=\"text-align:center\"><span>User name</span></td></tr>";
            for(i = 0; i <= 10; i++){
                Account_data[i] = [];
                if(i == 0){
                    genAccountEle += "<tr style=\"border-bottom:solid 1px black;cursor:pointer;\">"+
                                        "<th style=\"text-align:center\"><span>"+i+"</span></th>"+
                                        "<td style=\"text-align:center\"><span>Admin</span></td>"+
                                        "<td style=\"text-align:center\"><span>"+$("#Iaccount_admin_user_id").val()+"</span></td></tr>";
                    Account_data[i][0] = $("#Iaccount_admin_user_id").val();
                    Account_data[i][1] = $("#Iaccount_admin_password").val();
                    Account_data[i][2] = "admin";
                    total = total + 1;
                } else {
                    if($("#Iaccount_guest_"+i+"_user_id").val() != ""){
                        genAccountEle += "<tr style=\"border-bottom:solid 1px black;cursor:pointer;\">"+
                                            "<th style=\"text-align:center\"><span>"+i+"</span></th>"+
                                            "<td style=\"text-align:center\"><span>"+transFirstCharUpper($("#Iaccount_guest_"+i+"_auth").val())+"</span></td>"+
                                            "<td style=\"text-align:center\"><span>"+$("#Iaccount_guest_"+i+"_user_id").val()+"</span></td></tr>";
                        total = total + 1;
                    }

                    for(j = 0; j <= 2; j++){
                        if(j == 0)
                            Account_data[i][j] = $("#Iaccount_guest_"+i+"_user_id").val();
                        else if(j == 1)
                            Account_data[i][j] = $("#Iaccount_guest_"+i+"_password").val();
                        else if(j == 2)
                            Account_data[i][j] = $("#Iaccount_guest_"+i+"_auth").val();
                    }
                }
            }

            if(total >= 10)
                genAccountEle += "</tbody>";
            else
                genAccountEle += "<tr style=\"border-bottom:solid 1px black;cursor:pointer;\" last=\"\">"+
                                            "<th style=\"text-align:center\"><span>-</span></th>"+
                                            "<td style=\"text-align:center\"><span>-</span></td>"+
                                            "<td style=\"text-align:center\"><span>-</span></td></tr></tbody>";
            $(genAccountEle).appendTo($("#Iaccount_list"));
        };

        var removeAccount = function(db, callback){
            $.fn._runSetWithBlockUI(db, function(){
                $("#Iaccount_user_name, #Iaccount_user_passwd, #Iaccount_user_auth").removeAttr("name").attr("de_val", "");
                setTimeout(function(){
                    updateAccount("", "", "");
                    setTimeout(callback ,200);
                    $("#Iaccount_div").hide();
                }, 1000);
                setTimeout($.fn._runUnBlockUI, 2000);
            });
        };

        var genAccountUapi = function(){
            var index = -1;
            $.each(Account_data, function(n){
                if(Account_data[n][0] == "" && Account_data[n][1] == ""){
                    index = n;
                    return false;
                }
            });

            $("#Iaccount_user_name").attr("name", "account.guest."+index+".user_id");
            $("#Iaccount_user_passwd").attr("name", "account.guest."+index+".password");
            $("#Iaccount_user_auth").attr("name", "account.guest."+index+".auth");
        };

        var modifyAccountUapi = function(index){
            if(index == 0){
                $("#Iaccount_user_name").attr("name", "account.admin.user_id");
                $("#Iaccount_user_passwd").attr("name", "account.admin.password");
                $("#Iaccount_user_auth").attr("name", "");
            } else {
                $("#Iaccount_user_name").attr("name", "account.guest."+index+".user_id");
                $("#Iaccount_user_passwd").attr("name", "account.guest."+index+".password");
                $("#Iaccount_user_auth").attr("name", "account.guest."+index+".auth"); 
            }  
        };

        var updateAccount = function(addback_name, addback_passwd, addback_auth){
            var tmp = ""
            , uapiname = ""
            ;
            $("#Isub_account input[type='text']").each(function(){
                if($(this).attr("name") != undefined)
                    tmp += "\""+$(this).attr("name")+"\":\"\",";
            });

            tmp = "{"+tmp.slice(0, tmp.length-1)+"}";
            var db = $.parseJSON(tmp);
            $.ajax({
                beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
                url:'/cgi-bin/get?',
                dataType:'json',
                type:'POST',
                data:db,
                cache:false,
                success:function(data){
                    $.each(data, function(param, val){
                        uapiname = param.replace(/[.]/g, "\\.");
                        $("#Isub_account input[name="+uapiname+"][type=text]").val(val[1]);
                    });
                },
                error:function(){
                    console.log("updateAccount failed.");
                },
                complete:function(){
                    $.removeCookie('ipcamera', { path: '/' });
                    $("#Iaccount_user_name").attr("name", addback_name);
                    $("#Iaccount_user_passwd").attr("name", addback_passwd);
                    $("#Iaccount_user_auth").attr("name", addback_auth);
                    collectAccount();
                }
            });
        };

        var checkingPassword = function(){
            var ret = 0;
            $.each(Account_data, function(n){
                if(Account_data[n][0] == $("#Iaccount_user_name").val() && Account_data[n][0] == $.fn.GetLoginUser()){
                    if(Account_data[n][1] != $("#Iaccount_user_passwd").val() || Account_data[n][2] != $("#Iaccount_user_auth").val()){
                        ret = 1;
                        return false;
                    }
                }
            });

            return ret;
        };

        var runCheckingAccount = function(){
            var modify_status = false, invalid_status = false;
            $("#Iaccount_div input[type=text], #Iaccount_div input[type=password]").each(function(){
                if($(this).attr("class") != undefined){
                    if($(this).attr("class").search("invalid_modify") != -1){
                        invalid_status = true;
                        return true;
                    }
                }
            });

            $("#Iaccount_div input[type=text], #Iaccount_div input[type=password]").each(function(){
                if($(this).attr("class") != undefined){
                    if($(this).attr("class").search("modify") != -1){
                        modify_status = true;
                        return true;
                    }
                }
            });
            if(invalid_status)
            {
                $.fn.setModify(1);
                $("#Save_Isub_account").removeClass("can_modify").addClass("not_modify");
            }
            else
            {
                if(modify_status){
                    $.fn.setModify(1);
                    $("#Save_Isub_account").removeClass("not_modify").addClass("can_modify");
                } else {
                    $.fn.setModify(0);
                    $("#Save_Isub_account").removeClass("can_modify").addClass("not_modify");
                }
            }
        };

        $("body").on("change", "input[name=Naccount_access_level]", function(){
            var value = $(this).val();
            $("#Iaccount_user_auth").val(value).change();
        });

        $("body").on("change", "#Iaccount_user_auth", function(){
            $.fn._isModified($(this));
            if($("#Iaccount_user_name").val().length < 1 || $("#Iaccount_user_passwd").val().length < 1){}
            else
                runCheckingAccount();
        });

        $("body").on("change, keyup", "#Iaccount_user_name", function(){
            var value = $(this).val()
            , length = value.length
            , has_exsit = 0
            ;
            if(account_modify == 0){
                $.each(Account_data, function(n){
                    if(Account_data[n][0] == value){
                        has_exsit = 1;
                        return true;
                    }
                });
            } else if(account_modify == 1){
                $.each(Account_data, function(n){
                    if(Account_data[n][0] == value){
                        if($("#Iaccount_list").val() != value){
                            has_exsit = 1;
                            return true;
                        }
                    }
                }); 
            }

            if(has_exsit || length < 1 ||length > 40)
                $(this).addClass("invalid_modify").removeClass("modify");
            else
            {
                if($("#Iaccount_user_passwd").val().length < 1)
                    $("#Iaccount_user_passwd").addClass("invalid_modify");
                $(this).removeClass("invalid_modify");
                $.fn._isModified($(this));
            }
                
            runCheckingAccount();
        });

        $("body").on("change, keyup", "#Iaccount_user_passwd", function(){
            var length = $(this).val().length;
            if(length < 1 ||length > 40)
                $(this).addClass("invalid_modify").removeClass("modify");
            else
            {
                if($("#Iaccount_user_name").val().length < 1)
                    $("#Iaccount_user_name").addClass("invalid_modify");
                $(this).removeClass("invalid_modify");
                $.fn._isModified($(this));
            }
                
            runCheckingAccount();
        });

        $("body").on("click", "#Iadd_user", function(){
            if($(this).attr("class").search("not_modify") != -1)
                return false;
            account_modify = 0;
            $("#Iaccount_user_name").val("").attr("de_val", "").removeClass("grey_out").attr("disabled", false);
            $("#Iaccount_user_passwd").val("").attr("de_val", "");
            $("input[name=Naccount_access_level][value='user']").prop('checked',true)
            $("input[name=Naccount_access_level]").attr('disabled', false);
            genAccountUapi();
            $.blockUI({
                message:$("#Iaccount_div"),
                css:{
                    width:'600px',
                    backgroundColor:"white"
                },
                forceIframe: true
            });
        });

        $("body").on("click", "#Imodify_user", function(){
            if($(this).attr("class").search("not_modify") != -1)
                return false;
            var select_index = -1;
            account_modify = 1;
            $("#Iaccount_list tr").each(function(n){
                if($(this).attr("selected") != undefined){
                    select_index = $(this).children('th').text();
                    return true;
                }
            });

            $("#Iaccount_user_passwd").val(Account_data[select_index][1]).attr("de_val", Account_data[select_index][1]);
            $("input[name=Naccount_access_level][value='"+Account_data[select_index][2]+"']").prop('checked',true);
            
            if(select_index == 0){
                $("#Iaccount_user_name").val(Account_data[select_index][0]).attr("de_val", Account_data[select_index][0]).addClass("grey_out").attr("disabled", true);
                $("input[name=Naccount_access_level]").attr('disabled', true);
            } else {
                $("#Iaccount_user_name").val(Account_data[select_index][0]).attr("de_val", Account_data[select_index][0]).removeClass("grey_out").attr("disabled", false);
                $("input[name=Naccount_access_level]").attr('disabled', false);
            }
            
            modifyAccountUapi(select_index);
            $.blockUI({
                message:$("#Iaccount_div"),
                css:{
                    width:'600px',
                    backgroundColor:"white"
                },
                forceIframe: true
            });
        });
        
        $("body").on("click", "#Idelete_user", function(){
            var delete_account = ""
            , index = -1
            , redirect = 0
            , cmd = ""
            ;

            $("#Iaccount_list tr").each(function(n){
                if($(this).attr("selected") != undefined){
                    $(this).children("td").each(function(){
                        delete_account = $(this).children("span").text();
                    });
                    return true;
                }
            });

            if(delete_account == null || $(this).attr("class").search("not_modify") != -1)
                return false;

            $.each(Account_data, function(n){
                if(delete_account == Account_data[n][0]){
                    index = n;
                    if(delete_account == $.fn.GetLoginUser())
                        redirect = 1;
                }
            });
            cmd += "\"account.guest."+index+".user_id\":\"\",";
            cmd += "\"account.guest."+index+".password\":\"\",";
            cmd += "\"account.guest."+index+".auth\":\"user\"";
            var db = $.parseJSON("{"+cmd+"}");
            if(redirect){
                if(confirm(""+$.fn.GetLangStr(LT._Change_these_setting_will_logout)+"\r\n "+$.fn.GetLangStr(LT._Do_you_want_change)+"")){
                    removeAccount(db, function(){
                        $.fn._runRedirect();
                    });
                }
            } else {
                removeAccount(db, function(){
                    $("#Iadd_user").addClass("not_modify").removeClass("can_modify");
                    $("#Imodify_user").addClass("not_modify").removeClass("can_modify");
                    $("#Idelete_user").addClass("not_modify").removeClass("can_modify");
                });
            }
        });

        $("body").on("click", "#Iaccount_cancel", function(){
            $.fn._runUnBlockUI();
        });

        $("body").on("click", "#Save_Isub_account", function(){
            if($(this).attr("class") == "can_modify"){
                var tmp = ""
                , cmd = $.fn._runCollectModifUAPI("Iaccount_div")
                , rec_name = ""
                , rec_passwd = ""
                , rec_auth = ""
                ;

                if(checkingPassword()){
                    if(confirm(""+$.fn.GetLangStr($.fn.GetLangStr(LT._Change_these_setting_will_logout))+"\r\n "+$.fn.GetLangStr(LT._Do_you_want_change)+"")){} 
                    else
                        return false; 
                }

                $.fn._runSetWithBlockUI(cmd, function(){
                    if(checkingPassword())
                        $.fn._runRedirect();
                    $("#Iaccount_div .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    $("#Save_Isub_account").removeClass("can_modify").addClass("not_modify");
                    $("#Iadd_user").addClass("not_modify").removeClass("can_modify");
                    $("#Imodify_user").addClass("not_modify").removeClass("can_modify");
                    $("#Idelete_user").addClass("not_modify").removeClass("can_modify");
                    rec_name = $("#Iaccount_user_name").attr("name");
                    rec_passwd = $("#Iaccount_user_passwd").attr("name");
                    rec_auth = $("#Iaccount_user_auth").attr("name");
                    $("#Iaccount_user_name").removeAttr("name");
                    $("#Iaccount_user_passwd").removeAttr("name");
                    $("#Iaccount_user_auth").removeAttr("name").attr("de_val", "");
                    setTimeout(function(){
                        updateAccount(rec_name, rec_passwd, rec_auth);
                        $.fn._runUnBlockUI();
                    }, 3000);
                });
            }
        });

        collectAccount();

        $("body").on("click", "#Iaccount_list tr", function(){
            if($(this).attr("style").match("#bebebe")) return true;
            $(this).siblings("tr").each(function(){
                if($(this).attr("style").match("#bebebe")){}
                else
                    $(this).css("background-color","").css("cursor", "pointer").removeAttr("selected");
            });
            $(this).css("background-color","#0061a7").css("cursor", "text").attr("selected", "on");
            if($(this).attr("last") != undefined){
                $("#Iadd_user").addClass("can_modify").removeClass("not_modify");
                $("#Imodify_user").addClass("not_modify").removeClass("can_modify");
                $("#Idelete_user").addClass("not_modify").removeClass("can_modify");
            } else { 
                $("#Iadd_user").addClass("not_modify").removeClass("can_modify");
                $("#Imodify_user").addClass("can_modify").removeClass("not_modify");
                // We does not allow user can be deleted the administration account.
                if($(this).children("td:last").text() == "admin")
                    $("#Idelete_user").addClass("not_modify").removeClass("can_modify");
                else
                    $("#Idelete_user").addClass("can_modify").removeClass("not_modify");
            }
        });
    };

    $.fn.initialAlarm = function()
    {
        var trigger_alarm_arming_sch = 0;
        var collectAlarmSch = function(){
            for(var i = 0; i <= 6; i++){
                AlarmSch_data[i] = [];
                for(var j = 0; j <= 2; j++){
                    AlarmSch_data[i][j] =  $("#Iam_arm"+Number(i+1)+"_"+Number(j+1)+"_begin").val()+"-"+
                                            $("#Iam_arm"+Number(i+1)+"_"+Number(j+1)+"_end").val()+"-"+
                                            $("#Iam_arm"+Number(i+1)+"_"+Number(j+1)+"_enable").val();
                    }
            }

            $.fn._runAssignSch(AlarmSch_data, "alarm");
        };

        var updateAlarmSch = function(){
            var tmp = "";
            var upcmd = function(id, db){
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
                        collectAlarmSch();
                    }
                });
            };
            $("#Iadd_am_sch input").each(function(){
                if($(this).attr("name") != undefined)
                    tmp += "\""+$(this).attr("name")+"\":\"\",";
            });
            tmp = "{"+tmp.slice(0, tmp.length-1)+"}";
            var db = $.parseJSON(tmp);
            upcmd("Iadd_am_sch", db);
        };

        for(var i = 1; i <= 3; i++){
            $("body").on("click", "#Ievent_am_"+i, function(){
                var id = $(this).attr("id")
                , _num = id.match(/\d\d/g) == null ? id.match(/\d/g) : id.match(/\d\d/g)
                ;
                $("div[conf_group='alarm']").hide();
                $("#alarm_"+_num+"_block").show();
                $("#Isub_alarm .content_group > img").addClass("block_up").removeClass("block_down");
                $(this).addClass("block_down").removeClass("block_up");
            });
        }

        $("body").on("click", "#Imodify_alarm_schedule", function(){
            trigger_alarm_arming_sch = 0;
            $.blockUI({
                message:'<div>'+$.fn._runGenSchSetting(AlarmSch_data, "alarm_detection")+'</div>',
                css:{
                    width:'600px',
                    height:'650px',
                    top:'5%',
                    position:'absolute',
                    backgroundColor:"rgb(255,255,255)",
                    cursor:'text'
                },
                overlayCSS:{
                    opacity:0.95,
                    cursor:'text'
                },
                forceIframe: true
            });

            $("body").on("keyup change", "#Isch_table input[type=text]", function(){
                if(!($(this).val()).match(Time_regex_without_sec))
                    $(this).addClass("invalid_modify").removeClass("modify");
                else
                {
                    $(this).removeClass("invalid_modify");
                    $.fn._isModified($(this));
                }
                
                $.fn._runCheckingSch();
            });

            $("body").on("change", "#Isch_table input[type=checkbox]", function(){
                var chkbox_status = $(this).is(":checked") == true? "on":"off";
                $(this).val(chkbox_status);
                $.fn._isModified($(this));
                $.fn._runCheckingSch();
            });

            $("body").on("click", "#Isch_setting", function(){
                if(trigger_alarm_arming_sch == 0){
                    if($(this).attr("class") == "can_modify"){
                        trigger_alarm_arming_sch = 1;
                        var cmd = $.fn._runCollectModifUAPI("Isch_table");
                        $.fn._runSetWithBlockUI(cmd, function(){
                            $("#Isch_table .modify").each(function(){
                                $(this).removeClass("modify");
                            });
                            $("#Isch_setting").removeClass("can_modify").addClass("not_modify");
                            setTimeout($.fn._runUnBlockUI, 3000);
                            setTimeout(updateAlarmSch, 2000);
                        });
                    }
                }
            });

            $("body").on("click", "#Isch_cancel", function(){
                if($(this).attr("class") == "can_modify"){
                    $.fn._runUnBlockUI();
                }
            });
        });

        $("body").on("change keyup", "#Isub_alarm input[type=text]", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_alarm");
        });

        $("body").on("change keyup", "#Isub_alarm textarea", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_alarm");
        });

        $("body").on("change", "#Isub_alarm input[type=checkbox]", function(){
            var chkbox_status = $(this).is(":checked") == true? "on":"off";
            $(this).val(chkbox_status);
            $.fn._isModified($(this));
            $.fn._runChecking("sub_alarm");
        });

        $("body").on("change", "#Isub_alarm select", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_alarm");
        });

        $("body").on("click", "#Save_Isub_alarm", function(){
            if($(this).attr("class") == "can_modify"){
                var cmd = $.fn._runCollectModifUAPI("Isub_alarm");
                $.fn._runSetWithBlockUI(cmd, function(){
                    $("#Isub_alarm .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    $("#Save_Isub_alarm").removeClass("can_modify").addClass("not_modify");
                    setTimeout($.fn._runUnBlockUI, 3000);
                });
            }
        }); 

        $.fn._runGenSch("alarm");
        collectAlarmSch();
        $("#Ievent_am_1").click();
    };

    $.fn.initialAudioDetection = function()
    {
        var def_audio_level
        , ini_index = 1
        , tmp_audio_array = new Array()
        , swap_audio_array = new Array()
        , trigger_audio_arming_sch = 0
        ;
        var genAudioElement = function(){

            def_audio_level = $("#Ievent_ao_threshold").val();
            // generate horizontal elements
            for( var i = 1; i <= 240; i++ )
            {
                $("<div class=\"h_bar\" id=\"a_h_"+i+"\" style=\"left:"+Number(i*2-1)+"px;width:2px\"></div>").appendTo("#Ievent_ao_data");
            }

            // generate vertical elements
            $("<div id=\"audio_level\"></div>").appendTo("#Ievent_ao_data").parent();

            var w, h, x, y;
            w = $("#Ievent_ao_data").attr("width");
            h = $("#Ievent_ao_data").attr("height");
            x = $("#Ievent_ao_data").position().left;
            y = $("#Ievent_ao_data").position().top;

            $("#audio_level").attr("style","width:"+w+";height:"+h+";position:absolute;left:"+x+";top:"+y+";");

            for( var i = 100; i > 0; i-- )
            {
                $("<div class=\"v_bar\" id=\"a_v_"+i+"\" style=\"height:1px\"></div>").appendTo("#audio_level");
            }

            // initial audio alarm level.
            $("#a_v_" + def_audio_level).animate({
                width: "100%",
                title: def_audio_level
            },0).css("background-color","black");
        };

        var updateAudio = function(o, n){
            $("#a_v_" + o).css("background-color","");
            $("#a_v_" + n).animate({
                width: "100%",
                title: n
            },0).css("background-color","black");
        };

        var runPollingAudio = function(){
            var d;
            var status = $("input[type=checkbox][name='event.source.audio_detection.enable']").attr("de_val");
            if(status == "on")
                $.ajax({
                    beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
                    url:'/cgi-bin/get?',
                    dataType:'json',
                    type:'POST',
                    data:$.parseJSON("{\"event.source.audio_detection.sound_level\":\"\"}"),
                    cache:false,
                    success:function(data){
                        $.each(data, function(param, val){
                            if(param == "event.source.audio_detection.sound_level")
                                d = val[1];
                        });
                    },
                    complete:function(){
                        $.removeCookie('ipcamera', { path: '/' });
                         updateAudioData(d);
                    }
                });
            else
                 updateAudioData(0);
        };

        var updateAudioData = function(d){
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
                    hei = tmp_audio_array[j-1] * 1;

                if(Number(tmp_audio_array[j-1]) > Number(def_audio_level))
                {
                    $("#a_h_" + j).animate({
                        height: hei
                    },0).css("background-color","red");
                }
                else
                {
                    $("#a_h_" + j).animate({
                        height: hei
                    },0).css("background-color","green");
                }
            }

            ini_index++;
            setTimeout(runPollingAudio, 1000);
        };

        var collectAudioSch = function(){
            for(var i = 0; i <= 6; i++){
                Audio_data[i] = [];
                for(var j = 0; j <= 2; j++){
                    Audio_data[i][j] =  $("#Iao_arm"+Number(i+1)+"_"+Number(j+1)+"_begin").val()+"-"+
                                            $("#Iao_arm"+Number(i+1)+"_"+Number(j+1)+"_end").val()+"-"+
                                            $("#Iao_arm"+Number(i+1)+"_"+Number(j+1)+"_enable").val();
                    }
            }

            $.fn._runAssignSch(Audio_data, "audio");
        };

        var updateAudioSch = function(){
            var tmp = "";
            var upcmd = function(id, db){
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
                        collectAudioSch();
                    }
                });
            };
            $("#Iadd_ao_sch input").each(function(){
                if($(this).attr("name") != undefined)
                    tmp += "\""+$(this).attr("name")+"\":\"\",";
            });
            tmp = "{"+tmp.slice(0, tmp.length-1)+"}";
            var db = $.parseJSON(tmp);
            upcmd("Iadd_ao_sch", db);
        };

        $("body").on("click", "#Imodify_audio_schedule", function(){
            trigger_audio_arming_sch = 0;
            $.blockUI({
                message:'<div>'+$.fn._runGenSchSetting(Audio_data, "audio_detection")+'</div>',
                css:{
                    width:'600px',
                    height:'650px',
                    top:'5%',
                    position:'absolute',
                    backgroundColor:"rgb(255,255,255)",
                    cursor:'text'
                },
                overlayCSS:{
                    opacity:0.95,
                    cursor:'text'
                },
                forceIframe: true
            });

            $("body").on("keyup change", "#Isch_table input[type=text]", function(){
                if(!($(this).val()).match(Time_regex_without_sec))
                    $(this).addClass("invalid_modify").removeClass("modify");
                else
                {
                    $(this).removeClass("invalid_modify");
                    $.fn._isModified($(this));
                }
                
                $.fn._runCheckingSch();
            });

            $("body").on("change", "#Isch_table input[type=checkbox]", function(){
                var chkbox_status = $(this).is(":checked") == true? "on":"off";
                $(this).val(chkbox_status);
                $.fn._isModified($(this));
                $.fn._runCheckingSch();
            });

            $("body").on("click", "#Isch_setting", function(){
                if(trigger_audio_arming_sch == 0){
                    if($(this).attr("class") == "can_modify"){
                        trigger_audio_arming_sch = 1;
                        var cmd = $.fn._runCollectModifUAPI("Isch_table");
                        $.fn._runSetWithBlockUI(cmd, function(){
                            $("#Isch_table .modify").each(function(){
                                $(this).removeClass("modify");
                            });
                            $("#Isch_setting").removeClass("can_modify").addClass("not_modify");
                            setTimeout($.fn._runUnBlockUI, 3000);
                            setTimeout(updateAudioSch, 2000);
                        });
                    }
                }
            });

            $("body").on("click", "#Isch_cancel", function(){
                if($(this).attr("class") == "can_modify"){
                    $.fn._runUnBlockUI();
                }
            });
        });

        $("div[conf='sub_audio_detection'] div.slider").each(function(){
            var Sid = $(this).attr("id")
            , Iid = $(this).siblings("input").attr("id")
            ;
            $.fn._initializeSilderCtrl(Sid, Iid, $(this).attr("_max"), $(this).attr("_min"), $(this).attr("_step"), "inactive", "sub_audio_detection");
            $("#"+Iid).change();
        });

        $("body").on("change keyup", "input[type=text][name='event.source.audio_detection.threshhold']", function(){
            updateAudio(def_audio_level, $(this).val());
            def_audio_level = $(this).val();
        });

        $("body").on("change keyup", "#Isub_audio_detection input[type=text]", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_audio_detection");
        });

        $("body").on("change keyup", "#Isub_audio_detection textarea", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_audio_detection");
        });

        $("body").on("change", "#Isub_audio_detection input[type=checkbox]", function(){
            var chkbox_status = $(this).is(":checked") == true? "on":"off";
            $(this).val(chkbox_status);
            $.fn._isModified($(this));
            $.fn._runChecking("sub_audio_detection");
        });

        $("body").on("change", "#Isub_audio_detection select", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_audio_detection");
        });

        $("body").on("click", "#Save_Isub_audio_detection", function(){
            if($(this).attr("class") == "can_modify"){
                var cmd = $.fn._runCollectModifUAPI("Isub_audio_detection");
                $.fn._runSetWithBlockUI(cmd, function(){
                    $("#Isub_audio_detection .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    $("#Save_Isub_audio_detection").removeClass("can_modify").addClass("not_modify");
                    setTimeout(function(){
                        $.fn._runUnBlockUI();
                    }, 3000);
                });
            }
        }); 

        $.fn._runGenSch("audio");
        collectAudioSch();
        genAudioElement();
        updateAudio();
        runPollingAudio();
    };

    $.fn.initialDefocus = function()
    {
        var trigger_defocus_arming_sch = 0;
        var collectDefocusSch = function(){
            for(var i = 0; i <= 6; i++){
                Defocus_data[i] = [];
                for(var j = 0; j <= 2; j++){
                    Defocus_data[i][j] =  $("#Ids_arm"+Number(i+1)+"_"+Number(j+1)+"_begin").val()+"-"+
                                            $("#Ids_arm"+Number(i+1)+"_"+Number(j+1)+"_end").val()+"-"+
                                            $("#Ids_arm"+Number(i+1)+"_"+Number(j+1)+"_enable").val();
                    }
            }

            $.fn._runAssignSch(Defocus_data, "defocus");
        };

        var updateDefocusSch = function(){
            var tmp = "";
            var upcmd = function(id, db){
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
                        collectDefocusSch();
                    }
                });
            };
            $("#Iadd_ds_sch input").each(function(){
                if($(this).attr("name") != undefined)
                    tmp += "\""+$(this).attr("name")+"\":\"\",";
            });
            tmp = "{"+tmp.slice(0, tmp.length-1)+"}";
            var db = $.parseJSON(tmp);
            upcmd("Iadd_ds_sch", db);
        };

        $("body").on("click", "#Imodify_defocus_schedule", function(){
            trigger_defocus_arming_sch = 0;
            $.blockUI({
                message:'<div>'+$.fn._runGenSchSetting(Defocus_data, "defocus_detection")+'</div>',
                css:{
                    width:'600px',
                    height:'650px',
                    top:'5%',
                    position:'absolute',
                    backgroundColor:"rgb(255,255,255)",
                    cursor:'text'
                },
                overlayCSS:{
                    opacity:0.95,
                    cursor:'text'
                },
                forceIframe: true
            });

            $("body").on("keyup change", "#Isch_table input[type=text]", function(){
                if(!($(this).val()).match(Time_regex_without_sec))
                    $(this).addClass("invalid_modify").removeClass("modify");
                else
                {
                    $(this).removeClass("invalid_modify");
                    $.fn._isModified($(this));
                }
                
                $.fn._runCheckingSch();
            });

            $("body").on("change", "#Isch_table input[type=checkbox]", function(){
                var chkbox_status = $(this).is(":checked") == true? "on":"off";
                $(this).val(chkbox_status);
                $.fn._isModified($(this));
                $.fn._runCheckingSch();
            });

            $("body").on("click", "#Isch_setting", function(){
                if(trigger_defocus_arming_sch == 0){
                    if($(this).attr("class") == "can_modify"){
                        trigger_defocus_arming_sch = 1;
                        var cmd = $.fn._runCollectModifUAPI("Isch_table");
                        $.fn._runSetWithBlockUI(cmd, function(){
                            $("#Isch_table .modify").each(function(){
                                $(this).removeClass("modify");
                            });
                            $("#Isch_setting").removeClass("can_modify").addClass("not_modify");
                            setTimeout($.fn._runUnBlockUI, 3000);
                            setTimeout(updateDefocusSch, 2000);
                        });
                    }
                }
            });

            $("body").on("click", "#Isch_cancel", function(){
                if($(this).attr("class") == "can_modify"){
                    $.fn._runUnBlockUI();
                }
            });
        });

        $("div[conf='sub_defocus'] div.slider").each(function(){
            var Sid = $(this).attr("id")
            , Iid = $(this).siblings("input").attr("id")
            ;
            $.fn._initializeSilderCtrl(Sid, Iid, $(this).attr("_max"), $(this).attr("_min"), $(this).attr("_step"), "inactive", "sub_defocus");
            $("#"+Iid).change();
        });

        $("body").on("change keyup", "#Isub_defocus input[type=text]", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_defocus");
        });

        $("body").on("change keyup", "#Isub_defocus textarea", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_defocus");
        });

        $("body").on("change", "#Isub_defocus input[type=checkbox]", function(){
            var chkbox_status = $(this).is(":checked") == true? "on":"off";
            $(this).val(chkbox_status);
            $.fn._isModified($(this));
            $.fn._runChecking("sub_defocus");
        });

        $("body").on("change", "#Isub_defocus select", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_defocus");
        });

        $("body").on("click", "#Save_Isub_defocus", function(){
            if($(this).attr("class") == "can_modify"){
                var cmd = $.fn._runCollectModifUAPI("Isub_defocus");
                $.fn._runSetWithBlockUI(cmd, function(){
                    $("#Isub_defocus .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    $("#Save_Isub_defocus").removeClass("can_modify").addClass("not_modify");
                    setTimeout($.fn._runUnBlockUI, 3000);
                });
            }
        }); 

        $.fn._runGenSch("defocus");
        collectDefocusSch();
    };

    $.fn.initialFace = function()
    {
        var trigger_face_arming_sch = 0;
        var collectFaceSch = function(){
            for(var i = 0; i <= 6; i++){
                Face_data[i] = [];
                for(var j = 0; j <= 2; j++){
                    Face_data[i][j] =  $("#Ife_arm"+Number(i+1)+"_"+Number(j+1)+"_begin").val()+"-"+
                                            $("#Ife_arm"+Number(i+1)+"_"+Number(j+1)+"_end").val()+"-"+
                                            $("#Ife_arm"+Number(i+1)+"_"+Number(j+1)+"_enable").val();
                    }
            }

            $.fn._runAssignSch(Face_data, "face");
        };

        var updateFaceSch = function(){
            var tmp = "";
            var upcmd = function(id, db){
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
                        collectFaceSch();
                    }
                });
            };
            $("#Iadd_fe_sch input").each(function(){
                if($(this).attr("name") != undefined)
                    tmp += "\""+$(this).attr("name")+"\":\"\",";
            });
            tmp = "{"+tmp.slice(0, tmp.length-1)+"}";
            var db = $.parseJSON(tmp);
            upcmd("Iadd_fe_sch", db);
        };

        $("body").on("click", "#Imodify_face_schedule", function(){
            trigger_face_arming_sch = 0;
            $.blockUI({
                message:'<div>'+$.fn._runGenSchSetting(Face_data, "face_detection")+'</div>',
                css:{
                    width:'600px',
                    height:'650px',
                    top:'5%',
                    position:'absolute',
                    backgroundColor:"rgb(255,255,255)",
                    cursor:'text'
                },
                overlayCSS:{
                    opacity:0.95,
                    cursor:'text'
                },
                forceIframe: true
            });

            $("body").on("keyup change", "#Isch_table input[type=text]", function(){
                if(!($(this).val()).match(Time_regex_without_sec))
                    $(this).addClass("invalid_modify").removeClass("modify");
                else
                {
                    $(this).removeClass("invalid_modify");
                    $.fn._isModified($(this));
                }
                
                $.fn._runCheckingSch();
            });

            $("body").on("change", "#Isch_table input[type=checkbox]", function(){
                var chkbox_status = $(this).is(":checked") == true? "on":"off";
                $(this).val(chkbox_status);
                $.fn._isModified($(this));
                $.fn._runCheckingSch();
            });

            $("body").on("click", "#Isch_setting", function(){
                if(trigger_face_arming_sch == 0){
                    if($(this).attr("class") == "can_modify"){
                        trigger_face_arming_sch = 1;
                        var cmd = $.fn._runCollectModifUAPI("Isch_table");
                        $.fn._runSetWithBlockUI(cmd, function(){
                            $("#Isch_table .modify").each(function(){
                                $(this).removeClass("modify");
                            });
                            $("#Isch_setting").removeClass("can_modify").addClass("not_modify");
                            setTimeout($.fn._runUnBlockUI, 3000);
                            setTimeout(updateFaceSch, 2000);
                        });
                    }
                }
            });

            $("body").on("click", "#Isch_cancel", function(){
                if($(this).attr("class") == "can_modify"){
                    $.fn._runUnBlockUI();
                }
            });
        });

        $("div[conf='sub_face'] div.slider").each(function(){
            var Sid = $(this).attr("id")
            , Iid = $(this).siblings("input").attr("id")
            ;
            $.fn._initializeSilderCtrl(Sid, Iid, $(this).attr("_max"), $(this).attr("_min"), $(this).attr("_step"), "inactive", "sub_face");
            $("#"+Iid).change();
        });

        $("body").on("change keyup", "#Isub_face input[type=text]", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_face");
        });

        $("body").on("change keyup", "#Isub_face textarea", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_face");
        });

        $("body").on("change", "#Isub_face input[type=checkbox]", function(){
            var chkbox_status = $(this).is(":checked") == true? "on":"off";
            $(this).val(chkbox_status);
            $.fn._isModified($(this));
            $.fn._runChecking("sub_face");
        });

        $("body").on("change", "#Isub_face select", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_face");
        });

        $("body").on("click", "#Save_Isub_face", function(){
            if($(this).attr("class") == "can_modify"){
                var cmd = $.fn._runCollectModifUAPI("Isub_face");
                $.fn._runSetWithBlockUI(cmd, function(){
                    $("#Isub_face .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    $("#Save_Isub_face").removeClass("can_modify").addClass("not_modify");
                    setTimeout($.fn._runUnBlockUI, 3000);
                });
            }
        }); 

        $.fn._runGenSch("face");
        collectFaceSch();
    };

    $.fn.initialMotion = function()
    {
        var trigger_motion_arming_sch = 0;
        var tmp_id = $("#Isub_motion .content_group > img.block_down").attr("id");
        if(tmp_id != undefined){
            var Num = tmp_id.match(/\d\d/g) == null ? tmp_id.match(/\d/g) : tmp_id.match(/\d\d/g)
            , data = $("input[name='event.source.motion_detection.zone."+Num+".coordinate']").val();
            $.fn._runInitialZone(data, "motion");
        }
        $("#Save_Isub_motion").removeClass("not_modify").addClass("can_modify");
        $("#Isub_motion .content_group > img.block_down").click();
        if(SetupMT)
            return true;
        var collectMotionSch = function(){
            for(var i = 0; i <= 6; i++){
                MotionSch_data[i] = [];
                for(var j = 0; j <= 2; j++){
                    MotionSch_data[i][j] =  $("#Imt_arm"+Number(i+1)+"_"+Number(j+1)+"_begin").val()+"-"+
                                            $("#Imt_arm"+Number(i+1)+"_"+Number(j+1)+"_end").val()+"-"+
                                            $("#Imt_arm"+Number(i+1)+"_"+Number(j+1)+"_enable").val();
                    }
            }

            $.fn._runAssignSch(MotionSch_data, "motion");
        };

        var updateMotionSch = function(){
            var tmp = "";
            var upcmd = function(id, db){
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
                        collectMotionSch();
                    }
                });
            };
            $("#Iadd_mt_sch input").each(function(){
                if($(this).attr("name") != undefined)
                    tmp += "\""+$(this).attr("name")+"\":\"\",";
            });
            tmp = "{"+tmp.slice(0, tmp.length-1)+"}";
            var db = $.parseJSON(tmp);
            upcmd("Iadd_mt_sch", db);
        };

        var checkingMotionArea = function(){
            var id = $("#Isub_motion .content_group > img.block_down").attr("id")
            , _num = id.match(/\d\d/g) == null ? id.match(/\d/g) : id.match(/\d\d/g)
            , Zone = $.fn._runGetZone("motion", _num)
            , ind = Zone.lastIndexOf(',')
            , coordinate = Zone.slice(0, ind)
            ;
            if(coordinate != "0,0,0,0"){
                $("input[type=text][name='event.source.motion_detection.zone."+_num+".coordinate']").val(Zone).addClass("modify");
            }
        };

        $("div[conf='sub_motion'] div.slider").each(function(){
            var Sid = $(this).attr("id")
            , Iid = $(this).siblings("input").attr("id")
            ;
            $.fn._initializeSilderCtrl(Sid, Iid, $(this).attr("_max"), $(this).attr("_min"), $(this).attr("_step"), "inactive", "sub_motion");
            $("#"+Iid).change();
        });

        for(var i = 1; i <= 4; i++){
            $("body").on("click", "#Ievent_motion_zone_"+i, function(){
                var id = $(this).attr("id")
                , _num = id.match(/\d\d/g) == null ? id.match(/\d/g) : id.match(/\d\d/g)
                , data = $("input[name='event.source.motion_detection.zone."+_num+".coordinate']").val()
                , ind = data.lastIndexOf(',')
                , sys_coord = data.slice(0, ind)
                , ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0)
                ;
                $("div[conf_group='motion_zone']").hide();
                $("#motion_zone_"+_num+"_block").show();
                $("#Isub_motion .content_group > img").addClass("block_up").removeClass("block_down");
                $(this).addClass("block_down").removeClass("block_up");
                try {
                    var tmp_detect_size = ActivexPlayerObject.Get_VideoSize()
                    , coordinate = $.fn._runTransferCoordinate_Sys2ui(data, tmp_detect_size)
                    ;
                    if(coordinate == "NaN,NaN,NaN,NaN")
                        return false;
                    if(sys_coord != "0,0,0,0"){
                        if(record_coordinate[2][_num-1] != "0,0,0,0")
                            coordinate = record_coordinate[2][_num-1];
                         else
                            record_coordinate[2][_num-1] = coordinate;
                    }
                    ActivexPlayerObject.Start_Cropping(1);
                    ActivexPlayerObject.Set_CropPoint(""+coordinate+"");
                } catch(e){
                    console.log("///////////////// draw coordinate error. /////////////////");
                }
            });
        }

        $("body").on("click", "#Imodify_motion_schedule", function(){
            trigger_motion_arming_sch = 0;
            $.blockUI({
                message:'<div>'+$.fn._runGenSchSetting(MotionSch_data, "motion_detection")+'</div>',
                css:{
                    width:'600px',
                    height:'650px',
                    top:'5%',
                    position:'absolute',
                    backgroundColor:"rgb(255,255,255)",
                    cursor:'text'
                },
                overlayCSS:{
                    opacity:0.95,
                    cursor:'text'
                },
                forceIframe: true
            });

            $("body").on("keyup change", "#Isch_table input[type=text]", function(){
                if(!($(this).val()).match(Time_regex_without_sec))
                    $(this).addClass("invalid_modify").removeClass("modify");
                else
                {
                    $(this).removeClass("invalid_modify");
                    $.fn._isModified($(this));
                }
                
                $.fn._runCheckingSch();
            });

            $("body").on("change", "#Isch_table input[type=checkbox]", function(){
                var chkbox_status = $(this).is(":checked") == true? "on":"off";
                $(this).val(chkbox_status);
                $.fn._isModified($(this));
                $.fn._runCheckingSch();
            });

            $("body").on("click", "#Isch_setting", function(){
                if(trigger_motion_arming_sch == 0){
                    if($(this).attr("class") == "can_modify"){
                        trigger_motion_arming_sch = 1;
                        var cmd = $.fn._runCollectModifUAPI("Isch_table");
                        $.fn._runSetWithBlockUI(cmd, function(){
                            $("#Isch_table .modify").each(function(){
                                $(this).removeClass("modify");
                            });
                            $("#Isch_setting").removeClass("can_modify").addClass("not_modify");
                            setTimeout($.fn._runUnBlockUI, 3000);
                            setTimeout(updateMotionSch, 2000);
                        });
                    }
                }
            });

            $("body").on("click", "#Isch_cancel", function(){
                if($(this).attr("class") == "can_modify"){
                    $.fn._runUnBlockUI();
                }
            });
        });

        $("body").on("change keyup", "#Isub_motion input[type=text]", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_motion");
        });

        $("body").on("change keyup", "#Isub_motion textarea", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_motion");
        });

        $("body").on("change", "#Isub_motion input[type=checkbox]", function(){
            var chkbox_status = $(this).is(":checked") == true? "on":"off";
            $(this).val(chkbox_status);
            $.fn._isModified($(this));
            $.fn._runChecking("sub_motion");
        });

        $("body").on("change", "#Isub_motion select", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_motion");
        });

        $("body").on("click", "#Save_Isub_motion", function(){
            if($(this).attr("class") == "can_modify"){
                checkingMotionArea();
                var cmd = $.fn._runCollectModifUAPI("Isub_motion");
                $.fn._runSetWithBlockUI(cmd, function(){
                    $("#Isub_motion .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    
                    setTimeout($.fn._runUnBlockUI, 3000);
                });
            }
        }); 
        
        $.fn._runGenSch("motion");
        collectMotionSch();
        $("#Ievent_motion_zone_1").click();
        var data = $("input[name='event.source.motion_detection.zone.1.coordinate']").val();
        $.fn._runInitialZone(data, "motion");
        $("#Save_Isub_motion").removeClass("not_modify").addClass("can_modify");
        SetupMT = true;
    };

    $.fn.initialNetworkLess = function()
    {
        $("body").on("change", "#Isub_network_less input[type=checkbox]", function(){
            var chkbox_status = $(this).is(":checked") == true? "on":"off";
            $(this).val(chkbox_status);
            $.fn._isModified($(this));
            $.fn._runChecking("sub_network_less");
        });

        $("body").on("change", "#Isub_network_less select", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_network_less");
        });

        $("body").on("change", "#Isub_network_less input", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_network_less");
        });

        for(var i = 1; i <= 4; i++){
            $("body").on("click", "#Ievent_network_"+i, function(){
                var id = $(this).attr("id")
                , _num = id.match(/\d\d/g) == null ? id.match(/\d/g) : id.match(/\d\d/g)
                ;
                $("div[conf_group='network']").hide();
                $("#network_"+_num+"_block").show();
                $("#Isub_network_less .content_group > img").addClass("block_up").removeClass("block_down");
                $(this).addClass("block_down").removeClass("block_up");
            });
        }

        $("body").on("click", "#Save_Isub_network_less", function(){
            if($(this).attr("class") == "can_modify"){
                var cmd = $.fn._runCollectModifUAPI("Isub_network_less");
                $.fn._runSetWithBlockUI(cmd, function(){
                    $("#Isub_network_less .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    $("#Save_Isub_network_less").removeClass("can_modify").addClass("not_modify");
                    setTimeout($.fn._runUnBlockUI, 3000);
                });
            }
        });

        $("#Ievent_network_1").click();
    };

    $.fn.initialSchedule = function()
    {
        var trigger_schedule_arming_sch = 0;
        var collectScheduleSch = function(){
            for(var i = 0; i <= 6; i++){
                Schedule_data[i] = [];
                for(var j = 0; j <= 2; j++){
                    Schedule_data[i][j] =  $("#Ise_arm"+Number(i+1)+"_"+Number(j+1)+"_begin").val()+"-"+
                                            $("#Ise_arm"+Number(i+1)+"_"+Number(j+1)+"_end").val()+"-"+
                                            $("#Ise_arm"+Number(i+1)+"_"+Number(j+1)+"_enable").val();
                    }
            }

            $.fn._runAssignSch(Schedule_data, "schedule");
        };

        var updateScheduleSch = function(){
            var tmp = "";
            var upcmd = function(id, db){
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
                        collectScheduleSch();
                    }
                });
            };
            $("#Iadd_se_sch input").each(function(){
                if($(this).attr("name") != undefined)
                    tmp += "\""+$(this).attr("name")+"\":\"\",";
            });
            tmp = "{"+tmp.slice(0, tmp.length-1)+"}";
            var db = $.parseJSON(tmp);
            upcmd("Iadd_se_sch", db);
        };

        $("body").on("click", "#Imodify_schedule_schedule", function(){
            trigger_schedule_arming_sch = 0;
            $.blockUI({
                message:'<div>'+$.fn._runGenSchSetting(Schedule_data, "schedule_detection")+'</div>',
                css:{
                    width:'600px',
                    height:'650px',
                    top:'5%',
                    position:'absolute',
                    backgroundColor:"rgb(255,255,255)",
                    cursor:'text'
                },
                overlayCSS:{
                    opacity:0.95,
                    cursor:'text'
                },
                forceIframe: true
            });

            $("body").on("keyup change", "#Isch_table input[type=text]", function(){
                if(!($(this).val()).match(Time_regex_without_sec))
                    $(this).addClass("invalid_modify").removeClass("modify");
                else
                {
                    $(this).removeClass("invalid_modify");
                    $.fn._isModified($(this));
                }
                
                $.fn._runCheckingSch();
            });

            $("body").on("change", "#Isch_table input[type=checkbox]", function(){
                var chkbox_status = $(this).is(":checked") == true? "on":"off";
                $(this).val(chkbox_status);
                $.fn._isModified($(this));
                $.fn._runCheckingSch();
            });

            $("body").on("click", "#Isch_setting", function(){
                if(trigger_schedule_arming_sch == 0){
                    if($(this).attr("class") == "can_modify"){
                        var cmd = $.fn._runCollectModifUAPI("Isch_table");
                        $.fn._runSetWithBlockUI(cmd, function(){
                            $("#Isch_table .modify").each(function(){
                                $(this).removeClass("modify");
                            });
                            $("#Isch_setting").removeClass("can_modify").addClass("not_modify");
                            setTimeout($.fn._runUnBlockUI, 3000);
                            setTimeout(updateScheduleSch, 2000);
                        });
                    }
                }
            });

            $("body").on("click", "#Isch_cancel", function(){
                if($(this).attr("class") == "can_modify"){
                    $.fn._runUnBlockUI();
                }
            });
        });

        $("div[conf='sub_schedule'] div.slider").each(function(){
            var Sid = $(this).attr("id")
            , Iid = $(this).siblings("input").attr("id")
            ;
            $.fn._initializeSilderCtrl(Sid, Iid, $(this).attr("_max"), $(this).attr("_min"), $(this).attr("_step"), "inactive", "sub_schedule");
            $("#"+Iid).change();
        });

        $("body").on("change keyup", "#Isub_schedule input[type=text]", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_schedule");
        });

        $("body").on("change keyup", "#Isub_schedule textarea", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_schedule");
        });

        $("body").on("change", "#Isub_schedule input[type=checkbox]", function(){
            var chkbox_status = $(this).is(":checked") == true? "on":"off";
            $(this).val(chkbox_status);
            $.fn._isModified($(this));
            $.fn._runChecking("sub_schedule");
        });

        $("body").on("change", "#Isub_schedule select", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_schedule");
        });

        $("body").on("click", "#Save_Isub_schedule", function(){
            if($(this).attr("class") == "can_modify"){
                var cmd = $.fn._runCollectModifUAPI("Isub_schedule");
                $.fn._runSetWithBlockUI(cmd, function(){
                    $("#Isub_schedule .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    $("#Save_Isub_schedule").removeClass("can_modify").addClass("not_modify");
                    setTimeout($.fn._runUnBlockUI, 3000);
                });
            }
        }); 

        $.fn._runGenSch("schedule");
        collectScheduleSch();
    };

    $.fn.initialTamper = function()
    {
        var trigger_tamper_arming_sch = 0;
        var collectTamperSch = function(){
            for(var i = 0; i <= 6; i++){
                Tamper_data[i] = [];
                for(var j = 0; j <= 2; j++){
                    Tamper_data[i][j] =  $("#Itr_arm"+Number(i+1)+"_"+Number(j+1)+"_begin").val()+"-"+
                                            $("#Itr_arm"+Number(i+1)+"_"+Number(j+1)+"_end").val()+"-"+
                                            $("#Itr_arm"+Number(i+1)+"_"+Number(j+1)+"_enable").val();
                    }
            }

            $.fn._runAssignSch(Tamper_data, "tamper");
        };

        var updateTamperSch = function(){
            var tmp = "";
            var upcmd = function(id, db){
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
                        collectTamperSch();
                    }
                });
            };
            $("#Iadd_tr_sch input").each(function(){
                if($(this).attr("name") != undefined)
                    tmp += "\""+$(this).attr("name")+"\":\"\",";
            });
            tmp = "{"+tmp.slice(0, tmp.length-1)+"}";
            var db = $.parseJSON(tmp);
            upcmd("Iadd_tr_sch", db);
        };

        $("body").on("click", "#Imodify_tamper_schedule", function(){
            trigger_tamper_arming_sch = 0;
            $.blockUI({
                message:'<div>'+$.fn._runGenSchSetting(Tamper_data, "tamper_detection")+'</div>',
                css:{
                    width:'600px',
                    height:'650px',
                    top:'5%',
                    position:'absolute',
                    backgroundColor:"rgb(255,255,255)",
                    cursor:'text'
                },
                overlayCSS:{
                    opacity:0.95,
                    cursor:'text'
                },
                forceIframe: true
            });

            $("body").on("keyup change", "#Isch_table input[type=text]", function(){
                if(!($(this).val()).match(Time_regex_without_sec))
                    $(this).addClass("invalid_modify").removeClass("modify");
                else
                {
                    $(this).removeClass("invalid_modify");
                    $.fn._isModified($(this));
                }
                
                $.fn._runCheckingSch();
            });

            $("body").on("change", "#Isch_table input[type=checkbox]", function(){
                var chkbox_status = $(this).is(":checked") == true? "on":"off";
                $(this).val(chkbox_status);
                $.fn._isModified($(this));
                $.fn._runCheckingSch();
            });

            $("body").on("click", "#Isch_setting", function(){
                if(trigger_tamper_arming_sch == 0){
                    if($(this).attr("class") == "can_modify"){
                        trigger_tamper_arming_sch = 1;
                        var cmd = $.fn._runCollectModifUAPI("Isch_table");
                        $.fn._runSetWithBlockUI(cmd, function(){
                            $("#Isch_table .modify").each(function(){
                                $(this).removeClass("modify");
                            });
                            $("#Isch_setting").removeClass("can_modify").addClass("not_modify");
                            setTimeout($.fn._runUnBlockUI, 3000);
                            setTimeout(updateTamperSch, 2000);
                        });
                    }
                }
            });

            $("body").on("click", "#Isch_cancel", function(){
                if($(this).attr("class") == "can_modify"){
                    $.fn._runUnBlockUI();
                }
            });
        });

        $("div[conf='sub_tamper'] div.slider").each(function(){
            var Sid = $(this).attr("id")
            , Iid = $(this).siblings("input").attr("id")
            ;
            $.fn._initializeSilderCtrl(Sid, Iid, $(this).attr("_max"), $(this).attr("_min"), $(this).attr("_step"), "inactive", "sub_tamper");
            $("#"+Iid).change();
        });

        $("body").on("change keyup", "#Isub_tamper input[type=text]", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_tamper");
        });

        $("body").on("change keyup", "#Isub_tamper textarea", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_tamper");
        });

        $("body").on("change", "#Isub_tamper input[type=checkbox]", function(){
            var chkbox_status = $(this).is(":checked") == true? "on":"off";
            $(this).val(chkbox_status);
            $.fn._isModified($(this));
            $.fn._runChecking("sub_tamper");
        });

        $("body").on("change", "#Isub_tamper select", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_tamper");
        });

        $("body").on("click", "#Save_Isub_tamper", function(){
            if($(this).attr("class") == "can_modify"){
                var cmd = $.fn._runCollectModifUAPI("Isub_tamper");
                $.fn._runSetWithBlockUI(cmd, function(){
                    $("#Isub_tamper .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    $("#Save_Isub_tamper").removeClass("can_modify").addClass("not_modify");
                    setTimeout($.fn._runUnBlockUI, 3000);
                });
            }
        }); 

        $.fn._runGenSch("tamper");
        collectTamperSch();
    };

    $.fn.initialAlarmOut = function()
    {
        $("body").on("change", "#Isub_alarm_out select", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_alarm_out");
        });

		for (var i = 1; i <= 2; i++)
		{
	        $("body").on("change", "#Ievent_sink_alarm_out_" + i + "_method", function()
			{
                var id = $(this).attr("id")
                , _num = id.match(/\d\d/g) == null ? id.match(/\d/g) : id.match(/\d\d/g)
                ;
	            if($(this).val() == "pulse")
				{
	                $("select[name^='event.sink.alarm_out." + _num + ".normal.post_duration']").parent().parent().hide();
	                $("input[name^='event.sink.alarm_out." + _num + ".pulse.ontime']").parent().parent().show();
	                $("input[name^='event.sink.alarm_out." + _num + ".pulse.offtime']").parent().parent().show();
	                $("input[name^='event.sink.alarm_out." + _num + ".pulse.count']").parent().parent().show();
	            }
	            else if($(this).val() == "normal")
				{
	                $("select[name^='event.sink.alarm_out." + _num + ".normal.post_duration']").parent().parent().show();
	                $("input[name^='event.sink.alarm_out." + _num + ".pulse.ontime']").parent().parent().hide();
	                $("input[name^='event.sink.alarm_out." + _num + ".pulse.offtime']").parent().parent().hide();
	                $("input[name^='event.sink.alarm_out." + _num + ".pulse.count']").parent().parent().hide();
	            }
				
	            $.fn._isModified($(this));
	            $.fn._runChecking("sub_alarm_out");
	        });

	        $("body").on("change, keyup", "#Ievent_sink_alarm_out_" + i + "_pulse_ontime, #Ievent_sink_alarm_out_" + i + "_pulse_offtime", function()
	       	{
	            if ( ($(this).val() >= 0.1 && $(this).val() <= 200) && $.isNumeric($(this).val()))
	            {
	                $(this).removeClass("invalid_modify");
	                $.fn._isModified($(this));
	            }
	            else
	                $(this).addClass("invalid_modify").removeClass("modify");

	            $.fn._runChecking("sub_alarm_out");
	        });

	        $("body").on("change, keyup", "#Ievent_sink_alarm_out_" + i + "_pulse_count", function()
	       	{
	            if ( (parseInt($(this).val()) >= 1 && parseInt($(this).val()) <= 99999) && $.isNumeric($(this).val()))
	            {
	                $(this).removeClass("invalid_modify");
	                $.fn._isModified($(this));
	            }
	            else
	                $(this).addClass("invalid_modify").removeClass("modify");

	            $.fn._runChecking("sub_alarm_out");
	        });

        	$("#Ievent_sink_alarm_out_" + i + "_method").change();
		}

        $("body").on("click", "#Save_Isub_alarm_out", function(){
            if($(this).attr("class") == "can_modify"){
                var cmd = $.fn._runCollectModifUAPI("Isub_alarm_out");
                $.fn._runSetWithBlockUI(cmd, function(){
                    $("#Isub_alarm_out .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    $("#Save_Isub_alarm_out").removeClass("can_modify").addClass("not_modify");
                    setTimeout($.fn._runUnBlockUI, 3000);
                });
            }
        });
    };

    $.fn.initialEmail = function()
    {
        $("body").on("change", "#Isub_email select", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_email");
        });

        $("body").on("change, keyup", "#Ievent_sink_email_server_address", function(){
            if(($(this).val()).length >= 1)
            {
                $(this).removeClass("invalid_modify");
				$.fn._isModified($(this));
            }
            else
				$(this).addClass("invalid_modify").removeClass("modify");

            $.fn._runChecking("sub_email");
        });

        $("body").on("change, keyup", "#Ievent_sink_email_server_port", function(){
            if($.isNumeric($(this).val()))
            {
                $(this).removeClass("invalid_modify");
                $.fn._isModified($(this));
            }
            else
                $(this).addClass("invalid_modify").removeClass("modify");

            $.fn._runChecking("sub_email");
        });

        $("body").on("change, keyup", "#Ievent_sink_email_username, #Ievent_sink_email_password", function(){
            if(($(this).val().length < 1) || ($(this).val().length > 40))
				$(this).addClass("invalid_modify").removeClass("modify");
            else
            {
				$(this).removeClass("invalid_modify");
                $.fn._isModified($(this));
            }

            $.fn._runChecking("sub_email");
		});

        $("body").on("change, keyup", "#Ievent_sink_email_sender_email_address", function(){
            if(!(($(this).val()).match(Mail_regex)))
                $(this).addClass("invalid_modify").removeClass("modify");
            else
            {
                $(this).removeClass("invalid_modify");
                $.fn._isModified($(this));
            }

            $.fn._runChecking("sub_email");
        });

		for (var n = 1; n <= 10; n++)
		{
	        $("body").on("change, keyup", "#Ievent_sink_email_receipent_" + n + "_address", function()
			{
	            if (!(($(this).val()).match(Mail_regex)))
	                $(this).addClass("invalid_modify").removeClass("modify");
	            else
	            {
	                $(this).removeClass("invalid_modify");
	                $.fn._isModified($(this));
	            }

            	$.fn._runChecking("sub_email");
	        });

	        $("body").on("change", "#Ievent_sink_email_receipent_" + n + "_enable", function()
			{
                var id = $(this).attr("id")
                , _num = id.match(/\d\d/g) == null ? id.match(/\d/g) : id.match(/\d\d/g)
                ;

				var chkbox_status = $(this).is(":checked") == true? "on":"off";

				if (chkbox_status == "on")
					$("#Ievent_sink_email_receipent_" + _num + "_address").attr("disabled", false).removeClass("grey_out");
				else
					$("#Ievent_sink_email_receipent_" + _num + "_address").attr("disabled", true).addClass("grey_out");


				$(this).val(chkbox_status);

				$.fn._isModifiedForCheckbox($(this));
	            $.fn._runChecking("sub_email");
	        });

			$("#Ievent_sink_email_receipent_" + n + "_address").change();
			$("#Ievent_sink_email_receipent_" + n + "_enable").change();

		}

        $("body").on("click", "#Save_Isub_email", function(){
            if($(this).attr("class") == "can_modify"){
                var cmd = $.fn._runCollectModifUAPI("Isub_email");
                $.fn._runSetWithBlockUI(cmd, function(){
                    $("#Isub_email .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    $("#Save_Isub_email").removeClass("can_modify").addClass("not_modify");
                    setTimeout($.fn._runUnBlockUI, 3000);
                });
            }
        });
    };

    $.fn.initialFTP = function()
    {
        $("body").on("change, keyup", "#Ievent_sink_ftp_server_address", function()
		{
            if (($(this).val()).match(IP_regex_Max))
            {
                $(this).removeClass("invalid_modify");
				$.fn._isModified($(this));
            }
            else
				$(this).addClass("invalid_modify").removeClass("modify");

            $.fn._runChecking("sub_sink_ftp");
        });
		
        $("body").on("change, keyup", "#Ievent_sink_ftp_username, #Ievent_sink_ftp_password", function()
		{
            if (($(this).val().length < 1) || ($(this).val().length > 40))
				$(this).addClass("invalid_modify").removeClass("modify");
            else
            {
				$(this).removeClass("invalid_modify");
                $.fn._isModified($(this));
            }

            $.fn._runChecking("sub_sink_ftp");
        });

        $("body").on("change, keyup", "#Ievent_sink_ftp_port", function()
		{
            if(($(this).val() == "21")||((parseInt($(this).val()) >= 1025 && parseInt($(this).val()) <= 65535) && $.isNumeric($(this).val())))
            {
                $(this).removeClass("invalid_modify");
                $.fn._isModified($(this));
            }
            else
                $(this).addClass("invalid_modify").removeClass("modify");

            $.fn._runChecking("sub_sink_ftp");
        });

		$("body").on("change", "#Isub_sink_ftp select", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_sink_ftp");
        });

        $("body").on("click", "#Save_Isub_sink_ftp", function(){
            if($(this).attr("class") == "can_modify"){
                var cmd = $.fn._runCollectModifUAPI("Isub_sink_ftp");
                $.fn._runSetWithBlockUI(cmd, function(){
                    $("#Isub_sink_ftp .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    $("#Save_Isub_sink_ftp").removeClass("can_modify").addClass("not_modify");
                    setTimeout($.fn._runUnBlockUI, 3000);
                });
            }
        });
    };

    $.fn.initialNAS = function()
    {
        var tmp = "", usage = new Number(0);
        var collectNAS = function(){
            for(var i = 1; i <= 2; i++){
                NAS_data[i] = [];
                NAS_data[i][0] = $("input[name='event.sink.nas.server."+i+".info.capacity']").val();
                NAS_data[i][1] = Math.floor((($("input[name='event.sink.nas.server."+i+".info.capacity']").val() - $("input[name='event.sink.nas.server."+i+".info.free_space']").val()) / $("input[name='event.sink.nas.server."+i+".info.capacity']").val())*100);
                NAS_data[i][2] = $("input[name='event.sink.nas.server."+i+".info.status']").val();
            }

            AssignNAS();
        };

        var AssignNAS = function(){
            $.each(NAS_data, function(n){
                if(n != 0){
                    $.each(NAS_data[n], function(m){
                        if(m == 0)
                            $("#Inas_"+n+"_cap")[0].innerHTML = (NAS_data[n][m] == "" ? "0" : NAS_data[n][m])+"(GB)";
                        else if(m == 1)
                        {
                            usage = (isNaN(NAS_data[n][m]) ? 0 : 100 - NAS_data[n][m]);
                            $("#Inas_"+n+"_progress").progressbar({
                                value:Number(usage)
                            });

                            $("#Mnas_"+n+"_progress")[0].innerHTML = (isNaN(NAS_data[n][m]) ? "0" : NAS_data[n][m])+"%";
                            $("#Inas_"+n+"_progress").removeClass("ui-widget").removeClass("ui-widget-content");
                            $("#Inas_"+n+"_progress").children("div").removeClass("ui-widget-header");
                        }
                        else if(m == 2)
                        {
                            if(NAS_data[n][m] == "online")
                                $("#Inas_"+n+"_status").addClass("online").removeClass("offline");
                            else if(NAS_data[n][m] == "offline")
                                $("#Inas_"+n+"_status").addClass("offline").removeClass("online");
                        }
                    });
                }
            });
        };

        collectNAS();
        if(SetupNAS)
            return true;

        for(var i = 1; i <= 2; i++){
            $("body").on("keyup change", "#Inas_"+i+"_cifs_user", function(){
                var length = $(this).val().length;
                if(length < 4 ||length > 40)
                    $(this).addClass("invalid_modify").removeClass("modify");
                else
                {
                    $(this).removeClass("invalid_modify");
                    $.fn._isModified($(this));
                }
                $.fn._runChecking("sub_nas");
            });

            $("body").on("keyup change", "#Inas_"+i+"_cifs_passwd", function(){
                var length = $(this).val().length;
                if(length < 4 || length > 40)
                    $(this).addClass("invalid_modify").removeClass("modify");
                else
                {
                    $(this).removeClass("invalid_modify");
                    $.fn._isModified($(this));
                }
                $.fn._runChecking("sub_nas");
            });

            $("body").on("keyup change", "#Inas_"+i+"_server", function(){
                var id = $(this).attr("id")
                , _num = id.match(/\d\d/g) == null ? id.match(/\d/g) : id.match(/\d\d/g)
                ;
                if(!(($(this).val()).match(IP_regex_Max)))
                    $(this).addClass("invalid_modify").removeClass("modify");
                else
                {
                    if($(this).val() == $("#Inas_"+(_num == 1 ? 2 : 1)+"_server").val())
                        $(this).addClass("invalid_modify").removeClass("modify");
                    else
                    {
                        $(this).removeClass("invalid_modify");
                        $.fn._isModified($(this));
                    }
                }
                $.fn._runChecking("sub_nas");
            });

            $("body").on("keyup change", "#Inas_"+i+"_store_path", function(){
                var length = $(this).val().length;
                if(length <= 0)
                    $(this).addClass("invalid_modify").removeClass("modify");
                else
                {
                    $(this).removeClass("invalid_modify");
                    $.fn._isModified($(this));
                }
                $.fn._runChecking("sub_nas");
            });
        }

        $("body").on("change", "#Isub_nas select", function(){
            var id = $(this).attr("id")
            , _num = id.match(/\d\d/g) == null ? id.match(/\d/g) : id.match(/\d\d/g)
            , action = $("#Inas_"+_num+"_en").is(":checked") == false? "off":"on";
            ;
            if(action == "on"){
                if($(this).val() == "nfs"){
                    $("#Inas_"+_num+"_cifs_user").attr("disabled", true).addClass("grey_out").removeClass("invalid_modify").removeClass("modify");
                    $("#Inas_"+_num+"_cifs_passwd").attr("disabled", true).addClass("grey_out").removeClass("invalid_modify").removeClass("modify");
                    $("#Inas_"+_num+"_server").attr("disabled", false).removeClass("grey_out");
                    $("#Inas_"+_num+"_server").change();
                    $("#Inas_"+_num+"_store_path").attr("disabled", false).removeClass("grey_out");
                    $("#Inas_"+_num+"_store_path").change();

                } else if($(this).val() == "cifs"){
                    $("#Inas_"+_num+"_cifs_user").attr("disabled", false).removeClass("grey_out");
                    $("#Inas_"+_num+"_cifs_user").change();
                    $("#Inas_"+_num+"_cifs_passwd").attr("disabled", false).removeClass("grey_out");
                    $("#Inas_"+_num+"_cifs_passwd").change();
                    $("#Inas_"+_num+"_server").attr("disabled", false).removeClass("grey_out");
                    $("#Inas_"+_num+"_server").change();
                    $("#Inas_"+_num+"_store_path").attr("disabled", true).addClass("grey_out").removeClass("invalid_modify").removeClass("modify");
                }
            } else if(action == "off"){
                if($(this).val() == "nfs"){
                    $("#Inas_"+_num+"_cifs_user").attr("disabled", true).addClass("grey_out").removeClass("invalid_modify").removeClass("modify");
                    $("#Inas_"+_num+"_cifs_passwd").attr("disabled", true).addClass("grey_out").removeClass("invalid_modify").removeClass("modify");
                    $("#Inas_"+_num+"_server").attr("disabled", false).removeClass("grey_out").removeClass("invalid_modify").removeClass("modify");
                    $("#Inas_"+_num+"_store_path").attr("disabled", false).removeClass("grey_out").removeClass("invalid_modify").removeClass("modify");
                } else if($(this).val() == "cifs"){
                    $("#Inas_"+_num+"_cifs_user").attr("disabled", false).removeClass("grey_out").removeClass("invalid_modify").removeClass("modify");
                    $("#Inas_"+_num+"_cifs_passwd").attr("disabled", false).removeClass("grey_out").removeClass("invalid_modify").removeClass("modify");
                    $("#Inas_"+_num+"_server").attr("disabled", false).removeClass("grey_out").removeClass("invalid_modify").removeClass("modify");
                    $("#Inas_"+_num+"_store_path").attr("disabled", true).addClass("grey_out").removeClass("invalid_modify").removeClass("modify");
                }
            }
            $.fn._isModified($(this));
            $.fn._runChecking("sub_nas");
        });

        $("body").on("change", "#Isub_nas input[type=checkbox]", function(){
            var id = $(this).attr("id")
            , _num = id.match(/\d\d/g) == null ? id.match(/\d/g) : id.match(/\d\d/g)
            , chkbox_status = $(this).is(":checked") == true ? "on":"off"
            ;
            $(this).val(chkbox_status);
            $("#Inas_"+_num+"_mount_method").change();
            $.fn._isModified($(this));
            $.fn._runChecking("sub_nas");
        });

        $("body").on("click", "#Save_Isub_nas", function(){
            if($(this).attr("class") == "can_modify"){
                var cmd = $.fn._runCollectModifUAPI("Isub_nas");
                $.fn._runSetWithBlockUI(cmd, function(){
                    $("#Isub_nas .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    $("#Save_Isub_nas").removeClass("can_modify").addClass("not_modify");
                    setTimeout($.fn._runUnBlockUI, 3000);
                });
            }
        });

        $("#Isub_nas select").each(function(){ $(this).change(); });
        $("#Isub_nas input[type=checkbox]").each(function(){ $(this).change(); });
    };

    $.fn.initialRecording = function()
    {
        $("body").on("change, keyup", "#Ievent_sink_recording_clip_duration", function(){
            if((parseInt($(this).val()) >= 5 && parseInt($(this).val()) <= 10) && $.isNumeric($(this).val()))
            {
                $(this).removeClass("invalid_modify");
                $.fn._isModified($(this));
            }
            else
                $(this).addClass("invalid_modify").removeClass("modify");

            $.fn._runChecking("sub_recording");
        });

        $("body").on("change", "#Isub_recording select", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_recording");
        });

        $("body").on("change, keyup", "#Ievent_sink_recording_clip_size", function(){
            if((parseInt($(this).val()) >= 10 && parseInt($(this).val()) <= 20) && $.isNumeric($(this).val()))
            {
                $(this).removeClass("invalid_modify");
                $.fn._isModified($(this));
            }
            else
                $(this).addClass("invalid_modify").removeClass("modify");

            $.fn._runChecking("sub_recording");
        });

        $("body").on("change, keyup", "#Ievent_sink_recording_record_prefix_format", function(){
            if(($(this).val().length < 0) || ($(this).val().length > 14) )
				$(this).addClass("invalid_modify").removeClass("modify");
            else
            {
				$(this).removeClass("invalid_modify");
                $.fn._isModified($(this));
            }

			$.fn._runChecking("sub_recording");
		});

        $("body").on("change", "#Ievent_sink_recording_record_status", function(){
            if($(this).val() == "one_shot")
                $("#Ievent_sink_recording_clip_duration").parent().parent().show();
            else if($(this).val() == "continuous")
                $("#Ievent_sink_recording_clip_duration").parent().parent().hide();
        });

        $("body").on("change", "#Ievent_sink_recording_stream", function(){
            var cur_id = FunData.cur_id;
            var str_config = cur_id==1?FunData.str_1_config:(cur_id==2?FunData.str_2_config:FunData.str_3_config);
            var str_res = str_config.split(",");    

            if($(this).val() == 1){
                var res = str_res[0].split("/");
                $("#Ievent_stream_resolution").text("("+res[0]+")");
            }else if($(this).val() == 2){
                var res = str_res[1].split("/");
                $("#Ievent_stream_resolution").text("("+res[0]+")");
            }else{
                var res = str_res[2].split("/");
                $("#Ievent_stream_resolution").text("("+res[0]+")");
            }
        });

        $("body").on("click", "#Save_Isub_recording", function(){
            if($(this).attr("class") == "can_modify"){
                var cmd = $.fn._runCollectModifUAPI("Isub_recording");
                $.fn._runSetWithBlockUI(cmd, function(){
                    $("#Isub_recording .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    $("#Save_Isub_recording").removeClass("can_modify").addClass("not_modify");
                    setTimeout($.fn._runUnBlockUI, 3000);
                    setTimeout($.fn.initialFunParam, 1000);
                });
            }
        });

        $("#Ievent_sink_recording_record_status").change();
        $("#Ievent_sink_recording_stream").change();
    };

    $.fn.initialSD = function()
    {
        $("body").on("change", "#Isub_sdcard select", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_sdcard");
        });

        if($.fn.GetPlatForm() == "xarina_entry"){
            if($("#Iquery_sd_card").length<=0){
                $("<tr>"+
                        "<th></th>"+
                        "<td>"+
                            "<div>"+
                                "<input type=\"button\" class=\"can_modify_without_float\" style=\"float:left;\" id=\"Iquery_sd_card\">"+
                                "<div id=\"Isd_query_res\" style=\"color:black;float:left;margin:4px 0px 0px 4px;display:none;\">"+
                                    "<span id=\"Msd_query_res\"></span>"+
                                "</div>"+
                            "</div>"+
                        "</td>"+
                "</tr>").appendTo($("sub_sdcard tbody"));
            }

            $("body").on("click", "#Iquery_sd_card", function(){
                if($(this).attr("class") == "can_modify_without_float"){
                    $("#Isd_query_res").hide();
                    $.ajax({
                    beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
                        url:'/cgi-bin/sonysd_test.cgi?',
                        dataType:'text',
                        cache:false,
                        error:function(xhr, textStatus, errorThrown){
                        },
                        success:function(data){
                            $("#Msd_query_res")[0].innerHTML = data;
                        },
                        complete:function(){
                            $("#Isd_query_res").show();
                        }
                    });
                }
            });

            if(typeof(LT) === "undefined")
            {
                setTimeout(function(){
                    $.fn.TransLang("Iquery_sd_card", $.fn.GetLangStr(LT._Query_sd_card_live_time), "b");
                }, 50);
            }
            else
                $.fn.TransLang("Iquery_sd_card", $.fn.GetLangStr(LT._Query_sd_card_live_time), "b");
        }

        $("body").on("click", "#Ievent_sink_sdcard_1_format", function(){
            if($(this).attr("class") == "can_modify_without_float"){
                $.fn._runBlockUIwithoutView($.fn.GetLangStr(LT._Please_wait), $.fn.GetLangStr(LT._SD_card_formatting));
                query_param = "event.sink.sdcard.1.format_status";
                $.ajax({
                    beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
                    url:'/cgi-bin/set?'+query_param+'=start&event.sink.sdcard.1.format=1',
                    dataType:'json',
                    cache:false,
                    error:function(xhr, textStatus, errorThrown){
                    },
                    success:function(data){
                    },
                    complete:function(){
                        $.fn._runListen();
                        $.removeCookie('ipcamera', { path: '/' });
                    }
                });
            }
        });

        $("#Mevent_sink_sdcard_1_mount_stastus_mesg")[0].innerHTML = $("#Ievent_sink_sdcard_1_mount_status").val();
        $("#Mevent_sink_sdcard_1_capacity_mesg")[0].innerHTML = ($("#Ievent_sink_sdcard_1_capacity").val() == "" ? 0 : $("#Ievent_sink_sdcard_1_capacity").val())+"(MB)";
        $("#Mevent_sink_sdcard_1_free_space_mesg")[0].innerHTML = ($("#Ievent_sink_sdcard_1_free_space").val() == "" ? 0 : $("#Ievent_sink_sdcard_1_free_space").val())+"(MB)";
        if($("#Ievent_sink_sdcard_1_mount_status").val() != "ok"){
            $("#Mevent_sink_sdcard_1_capacity").parent().parent().remove();
            $("#Mevent_sink_sdcard_1_free_space").parent().parent().remove();
            $("#Iquery_sd_card").removeClass("can_modify_without_float").addClass("not_modify_without_float");
            // $("#Ievent_sink_sdcard_1_format").removeClass("can_modify_without_float").addClass("not_modify_without_float");
        }

        $("body").on("click", "#Save_Isub_sdcard", function(){
            if($(this).attr("class") == "can_modify"){
                var cmd = $.fn._runCollectModifUAPI("Isub_sdcard");
                $.fn._runSetWithBlockUI(cmd, function(){
                    $("#Isub_sdcard .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    $("#Save_Isub_sdcard").removeClass("can_modify").addClass("not_modify");
                    setTimeout($.fn._runUnBlockUI, 3000);
                });
            }
        });
    };

    $.fn.initialSnapshot = function()
    {
        $("body").on("change, keyup", "#Ievent_sink_snapshot_pre_event_capture_count, #Ievent_sink_snapshot_event_capture_interval", function(){
            if((parseInt($(this).val()) >= 1 && parseInt($(this).val()) <= 10) && $.isNumeric($(this).val())){
                $(this).removeClass("invalid_modify");
                $.fn._isModified($(this));
            }
            else
                $(this).addClass("invalid_modify").removeClass("modify");

            $.fn._runChecking("sub_snapshot");
        });

        $("body").on("change, keyup", "#Ievent_sink_snapshot_post_event_capture_count", function(){
            if($.isNumeric($(this).val())){
                if((parseInt($(this).val()) >= 1)){
                    $(this).removeClass("invalid_modify");
                    $.fn._isModified($(this));
                } else
                    $(this).addClass("invalid_modify").removeClass("modify");
            } else {
                if($(this).val() == "infinite"){
                    $(this).removeClass("invalid_modify");
                    $.fn._isModified($(this));
                } else
                    $(this).addClass("invalid_modify").removeClass("modify");
            }

            $.fn._runChecking("sub_snapshot");
        });

        $("body").on("click", "#Save_Isub_snapshot", function(){
            if($(this).attr("class") == "can_modify"){
                var cmd = $.fn._runCollectModifUAPI("Isub_snapshot");
                $.fn._runSetWithBlockUI(cmd, function(){
                    $("#Isub_snapshot .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    $("#Save_Isub_snapshot").removeClass("can_modify").addClass("not_modify");
                    setTimeout($.fn._runUnBlockUI, 3000);
                });
            }
        });
    };

    $.fn.initialSound = function()
    {
        var _runChecking = function(){
            var invalid_status = false, modify_status = false;
            $("div[conf=sub_sound] input[type=file]").each(function(){
                if($(this).attr("class") != undefined){
                    if($(this).attr("class").search("invalid_modify") != -1){
                        invalid_status = true;
                        return true;
                    }
                }
            });

            $("div[conf=sub_sound] input[type=file]").each(function(){
                if($(this).attr("class") != undefined){
                    if($(this).attr("class").search("modify") != -1){
                        modify_status = true;
                        return true;
                    }
                }
            });

            if(invalid_status)
            {
                $.fn.setModify(1);
                $("#Save_Isub_sound").removeClass("can_modify").addClass("not_modify");
            }
            else
            {
                if(modify_status){
                    $.fn.setModify(1);
                    $("#Save_Isub_sound").removeClass("not_modify").addClass("can_modify");
                } else {
                    $.fn.setModify(0);
                    $("#Save_Isub_sound").removeClass("can_modify").addClass("not_modify");
                }
            } 
        };

        var _runUploadSound = function(){
            var i = 0;
            $("div[conf=sub_sound] input[type=file]").each(function(){
                var id = $(this).attr("id")
                , _num = id.match(/\d\d/g) == null ? id.match(/\d/g) : id.match(/\d\d/g)
                ;

                if($(this).attr("class") == "modify"){
                    Submit_list[i] = _num;
                    i++;
                }
            });
            query_param = "event.sink.sound."+Submit_list[0]+".status";
            $("#Fevent_handler_sound_"+Submit_list[0]).submit();
            Submit_list[0] = [];
        };

        var options = {
            beforeSubmit:function(){
                $.fn._runBlockUIwithoutView($.fn.GetLangStr(LT._Please_wait), $.fn.GetLangStr(LT._FM_uploading));
                $.ajax({
                    beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
                    url:'/cgi-bin/set?'+query_param+'=none',
                    dataType:'json',
                    cache:false,
                    error:function(xhr, textStatus, errorThrown){
                    },
                    success:function(data){
                    },
                    complete:function(){
                        $.fn._runListen();
                        $.removeCookie('ipcamera', { path: '/' });
                    }
                });
            }
        };

        var AssignSound = function(){
            for(var i = 1; i <= 10; i++){
                var tmp = $("input[name='event.sink.sound."+i+".file_status']").val();
                var file = $("Ievent_handler_sound_"+i+"_file").val() == undefined ? "": $("Ievent_handler_sound_"+i+"_file").val();
                $("#Ievent_sound_"+i+"_status")[0].innerHTML = (tmp == "" ? "none" : tmp);

                if(tmp == "installed")
                   $("#Ievent_sound_"+i+"_delete").removeClass("not_modify_without_float").addClass("can_modify_without_float");
                $("#Ievent_handler_sound_"+i+"_file_name")[0].innerHTML = file;
            }
        };

        var UpdateSound = function(){
            var tmp = "";
            $("#Isub_sound input[type='text']").each(function(){
                if($(this).attr("name") != undefined){
                    tmp += "\""+$(this).attr("name")+"\":\"\",";
                }
            });
            var db = $.parseJSON("{"+tmp.slice(0, tmp.length-1)+"}");
            $.ajax({
                beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
                url:'/cgi-bin/get?',
                dataType:'json',
                type:'POST',
                data:db,
                cache:false,
                success:function(data){
                    $.fn.ParserDate("Isub_sound", data);
                },
                complete:function(){
                    $.removeCookie('ipcamera', { path: '/' });
                    AssignSound();
                    $.fn._runUnBlockUI();
                }
            });
        };

        for(var i = 1; i <= 10; i++){
            // initial ajax from 
            $("#Fevent_handler_sound_"+i).ajaxForm(options);
            $("body").on("change", "#Ievent_handler_sound_"+i+"_file", function(){
                var file_regex ="(.*\.(wav)$)";
                var file = $(this).val();
                var id = $(this).attr("id")
                , _num = id.match(/\d\d/g) == null ? id.match(/\d/g) : id.match(/\d\d/g)
                ;
                if(file == ""){
                    $(this).removeClass("invalid_modify").removeClass("modify");
                    $("#Ievent_handler_sound_"+_num+"_file_name")[0].innerHTML = "";
                } else {
                    if(!(file.match(file_regex))){
                        $(this).parent().addClass("invalid_modify");
                        $(this).addClass("invalid_modify").removeClass("modify");
                    } else {
                        $(this).parent().removeClass("invalid_modify");
                        $(this).addClass("modify").removeClass("invalid_modify");
                    }
                    $("#Ievent_handler_sound_"+_num+"_text").val("sound-"+_num);
                    $("#Ievent_handler_sound_"+_num+"_file_name").show();
                    $("#Ievent_handler_sound_"+_num+"_file_name")[0].innerHTML = file;
                }
                _runChecking();
            });

            $("body").on("click", "#Ievent_handler_sound_"+i+"_browser", function(){
                if($.fn.DetectBrowser() == "msie")
                    return true;
                var id = $(this).attr("id")
                , _num = id.match(/\d\d/g) == null ? id.match(/\d/g) : id.match(/\d\d/g)
                ;
                $("#Ievent_handler_sound_"+_num+"_file").click();
            });

            $("body").on("click", "#Ievent_sound_"+i+"_delete", function(e){
                var id = $(this).attr("id")
                , _num = id.match(/\d\d/g) == null ? id.match(/\d/g) : id.match(/\d\d/g)
                , target = $(this)
                ;

                if($(this).attr("class") == "can_modify_without_float"){
                    var db = $.parseJSON("{\"event.sink.sound."+_num+".remove\":\"start\"}");
                    $("#Ievent_handler_sound_"+_num+"_file").wrap('<form>').parent('form').trigger('reset');
                    $("#Ievent_handler_sound_"+_num+"_file").unwrap();
                    $.fn._runSetWithBlockUI(db, function(){
                        $(target).addClass("not_modify_without_float").removeClass("can_modify_without_float");
                        setTimeout($.fn._runUnBlockUI, 3000);
                        setTimeout(UpdateSound, 2500);
                    });
                }
                e.preventDefault();
            }); 
        }

        if($.fn.DetectBrowser() == "msie"){
            for(var k = 1; k <= 10; k++){
                $("#Ievent_handler_sound_"+k+"_file").attr("style", "z-index:999;opacity:0;height:20px;margin-left:-63px;");
            } 
        }

        $("body").on("click", "#Save_Isub_sound", function(){
            if($(this).attr("class") == "can_modify"){
                _runUploadSound();
                $.fn._runSetWithBlockUI("{}", function(){
                    $("#Isub_sound .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    $("#Save_Isub_sound").removeClass("can_modify").addClass("not_modify");
                });
            }
        });
        AssignSound();
    };

    $.fn.initializeEventSearch = function()
    {
        var webdb = null
        , request = null
        , Tabledata = null
        , SQLiteData = null
        , FilterData = []
        , event_db_char = [0, 0, 0, 0, 0, 0, 0, 0]
        , els = "<th style=\"height:443px;color:black;\">"+
                    "<div style=\"display:table;height:443px;width:100%;\">"+
                        "<span style=\"display:table-cell;vertical-align:middle;text-align:center;\" id=\"Mevent_search_description\"></span>"+
                    "</div>"+
                "</th>"
        ;
        // indexeddb does not support safari browser.
        if($.fn.DetectBrowser() == "safari")
            return true;
        var parserEventDB = function(initilfilter){
            var createSQL = function(){
                var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
                var _onupgradeneeded = false;
                request = indexedDB.open("EventLogDB", 1);
                request.onsuccess = function(evt){
                    webdb = evt.target.result;
                    if(!_onupgradeneeded){
                        // Store values in the newly created objectStore.
                        var customerObjectStore = webdb.transaction("EventLog", "readwrite").objectStore("EventLog");
                        customerObjectStore.clear();
                        for (var i in SQLiteData) {
                            SQLiteData[i] = $.parseJSON("{\""+Tabledata[0]+"\":\""+SQLiteData[i][0]+"\",\""+Tabledata[1]+"\":\""+SQLiteData[i][1]+"\",\""+Tabledata[2]+"\":\""+SQLiteData[i][2]+"\",\""+Tabledata[3]+"\":\""+SQLiteData[i][3]+"\"}");
                            customerObjectStore.add(SQLiteData[i]);
                        }
                        console.log("IndexedDB success");
                        var isFunc = $.isFunction(initilfilter);
                        if(isFunc)
                            initilfilter();
                    }
                };

                request.onerror = function(evt){
                    console.log("IndexedDB error:" + evt.target.errorCode);
                };

                request.onupgradeneeded = function(evt){
                    webdb = evt.target.result;
                    try {
                        webdb.deleteObjectStore("EventLog");
                    } catch(e) {
                        console.log("deleteObjectStore exception");
                    }
                    var objectStore = evt.currentTarget.result.createObjectStore("EventLog", { keyPath: "ID", autoIncrement: true });
                    $.each(Tabledata, function(n){
                        objectStore.createIndex(Tabledata[n], Tabledata[n], {unique:false, multientry: false});
                    });

                    objectStore.transaction.oncomplete = function(evt) {
                    var customerObjectStore = webdb.transaction("EventLog", "readwrite").objectStore("EventLog");
                        for (var i in SQLiteData) {
                            SQLiteData[i] = $.parseJSON("{\""+Tabledata[0]+"\":\""+SQLiteData[i][0]+"\",\""+Tabledata[1]+"\":\""+SQLiteData[i][1]+"\",\""+Tabledata[2]+"\":\""+SQLiteData[i][2]+"\",\""+Tabledata[3]+"\":\""+SQLiteData[i][3]+"\"}");
                            customerObjectStore.add(SQLiteData[i]);
                        }
                    };
                    _onupgradeneeded = true;
                    console.log("IndexedDB success");
                    var isFunc = $.isFunction(initilfilter);
                    if(isFunc)
                        initilfilter()
                };
            };

            if($("#Mevent_search_description").attr("style") == undefined)
                $(els).appendTo("#Ievent_search_db");

            var xhr = new XMLHttpRequest();
            xhr.open('GET', '/log.db?'+(new Date()).getTime(), true);
            xhr.responseType = 'arraybuffer';
            xhr.onload = function(e) {
                var uInt8Array = new Uint8Array(this.response);
                var db = new SQL.Database(uInt8Array);
                var contents = db.exec("SELECT * FROM LOG");
                try {
                    Tabledata = contents[0].columns;
                    SQLiteData = contents[0].values;
                } catch(e){
                    console.log("Tabledata exception.");
                    Tabledata = ["ID", "EVENT_TYPE", "START_TIME", "END_TIME", "BACKUP_1", "BACKUP_2"];
                }
                createSQL();
                var isFunc = $.isFunction(initilfilter);
                if(!isFunc)
                    $.fn.TransLang("Mevent_search_description", $.fn.GetLangStr(LT._Initial_DB_success), "s");
            };
            xhr.send();
        };

        var execute_filter_event = function(){
            var filter_condition = ""
            , event_type = []
            , k = 0
            , i = 0
            , j = 0
            , num = 0
            , total = 0
            ;

            if($("#Ievent_type_alarm").is(":checked") == true){event_type[k] = 6;k++;}
            if($("#Ievent_type_audio").is(":checked") == true){event_type[k] = 3;k++;}
            if($("#Ievent_type_face").is(":checked") == true){event_type[k] = 1;k++;}
            if($("#Ievent_type_motion").is(":checked") == true){event_type[k] = 0;k++;}
            if($("#Ievent_type_network_less").is(":checked") == true){event_type[k] = 7;k++;}
            if($("#Ievent_type_schedule").is(":checked") == true){event_type[k] = 5;k++;}
            if($("#Ievent_type_tamper").is(":checked") == true){event_type[k] = 2;k++;}
            if($("#Ievent_type_defocus").is(":checked") == true){event_type[k] = 4;k++;}

            do {
                var range = $.fn.DetectBrowser() == "msie" ? ""+event_type[i]+"": IDBKeyRange.only(""+event_type[i]+"");
                var objectStore = webdb.transaction("EventLog", "readonly").objectStore("EventLog");
                var queryIndex = objectStore.index("EVENT_TYPE");
                var queryObject = queryIndex.openCursor(range);
                if($("input[type=radio][name=Nevent_filter_time]:checked").val() == "all_time")
                {
                    FilterData = [];
                    queryObject.onsuccess = function(evt){
                        var cursor = evt.target.result;
                        if(cursor){
                            FilterData[num] = [];
                            FilterData[num][0] = cursor.value.EVENT_TYPE;
                            FilterData[num][1] = cursor.value.START_TIME;
                            FilterData[num][2] = cursor.value.END_TIME;
                            num++;
                            cursor['continue']();
                        } else {
                            j++;
                            if(i == j){
                                FilterData.sort();
                                console.log("total search result:"+num);
                                gen_event_search_db();
                            }
                        }
                    };
                }
                else if($("input[type=radio][name=Nevent_filter_time]:checked").val() == "manual")
                {
                    var start_filter = $("#Ievent_start_time").val().replace(/[-]/g, '\/')+":00";
                    var end_filter = $("#Ievent_end_time").val().replace(/[-]/g, '\/')+":00";
                    var start_status = false, end_status = false;
                    var start_date, end_date;
                    FilterData = [];
                    queryObject.onsuccess = function(evt){
                        var cursor = evt.target.result;
                        if(cursor){
                            FilterData[num] = [];
                            start_date = cursor.value.START_TIME;
                            end_date = cursor.value.END_TIME;
                            start_status = dates.inRange(start_date, start_filter, end_filter);
                            end_status = dates.inRange(end_date, start_filter, end_filter);
                            if(!start_status && !end_status)
                            {
                                if(dates.inRange(start_filter, start_date, end_date) && dates.inRange(end_filter, start_date, end_date)){
                                    FilterData[num][0] = cursor.value.EVENT_TYPE;
                                    FilterData[num][1] = start_filter;
                                    FilterData[num][2] = end_filter;
                                    num++;
                                }
                            }
                            else
                            {
                                FilterData[num][0] = cursor.value.EVENT_TYPE;
                                if(!start_status)
                                    FilterData[num][1] = start_filter;
                                else
                                    FilterData[num][1] = start_date;

                                if(!end_status)
                                    FilterData[num][2] = end_filter;
                                else
                                    FilterData[num][2] = end_date;
                                num++;
                            }
                            total++;
                            cursor['continue']();
                        } else {
                            j++;
                            if(i == j){
                                FilterData.sort();
                                console.log("total search result:"+num);
                                gen_event_search_db();
                            }
                        }
                    };
                }
                i++;
            } while(event_type[i] != undefined);
        };

        var event_type_replace = function(ind){
            var str = Event_type_arr[ind];
            return str;
        };

        var gen_event_search_db = function(){
            var object = ""
            , tmp = ""
            ;
            setTimeout(function(){
                event_db_char = [0, 0, 0, 0, 0, 0, 0, 0];
                $.each(FilterData, function(n){
                    if(FilterData[n][0] == undefined)
                        return true;
                    tmp += "<tr class=\"tr_border_bottom\">";
                    tmp += "<td class=\"tr_border_right\"><span>"+Number(n+1)+"</span></td>";
                    tmp += "<td class=\"tr_border_right\"><span>"+event_type_replace(FilterData[n][0])+"</span></td>";
                    tmp += "<td class=\"tr_border_right\"><span>"+FilterData[n][1]+"</span></td>";
                    tmp += "<td class=\"tr_border_right\"><span>"+FilterData[n][2]+"</span></td>";
                    tmp += "</tr>";
                    event_db_char = analysis_db(FilterData[n][0], event_db_char);
                });
                console.log("Parse event DB done.");
                object += "<thead>"+
                            "<tr class=\"tr_border_bottom\">"+
                                "<th class=\"tr_border_right\" style=\"cursor:pointer;\"><span>No.</span></th>"+
                                "<th class=\"tr_border_right\" style=\"cursor:pointer;\"><span>"+$.fn.GetLangStr(LT._Event_type)+"</span></th>"+
                                "<th class=\"tr_border_right\" style=\"cursor:pointer;\"><span>"+$.fn.GetLangStr(LT._Start_time)+"</span></th>"+
                                "<th class=\"tr_border_right\" style=\"cursor:pointer;\"><span>"+$.fn.GetLangStr(LT._End_time)+"</span></th>"+
                            "</tr>";
                object += "</thead>";
                object += "<tbody>"+tmp+"</tbody>";
                $("#Ievent_search_db").children().remove();
                $(object).appendTo("#Ievent_search_db");
                console.log("Generate event DB done.");
                gen_event_chat();
                $("#Ievent_search_db").tablesorter();
            }, 1000);
        };

        var gen_event_chat = function(){
            var pieData = [
                {
                    value: event_db_char[0],
                    color: chart_color[0],
                    highlight: chart_color[0]
                },
                {
                    value: event_db_char[1],
                    color: chart_color[1],
                    highlight: chart_color[1]
                },
                {
                    value: event_db_char[2],
                    color: chart_color[2],
                    highlight: chart_color[2]
                },
                {
                    value: event_db_char[3],
                    color: chart_color[3],
                    highlight: chart_color[3]
                },
                {
                    value: event_db_char[4],
                    color: chart_color[4],
                    highlight: chart_color[4]
                },
                {
                    value: event_db_char[5],
                    color: chart_color[5],
                    highlight: chart_color[5]
                },
                {
                    value: event_db_char[6],
                    color: chart_color[6],
                    highlight: chart_color[6]
                },
                {
                    value: event_db_char[7],
                    color: chart_color[7],
                    highlight: chart_color[7]
                }
            ];
            var tmp = "";
            var ctx = document.getElementById("event_db_chart_area").getContext("2d");
            window.myPie = new Chart(ctx).Pie(pieData);
            $("#Ievent_identify_area").children().remove();
            tmp += "<div style=\"width:100%;height:16px;\">"+
                        "<div style=\"float:left;width:10px;height:10px;background-color:"+chart_color[0]+";margin:4px 3px 0px 0px;\"></div>"+
                        "<div style=\"float:left;color:black;font-size:8pt;height:12px;\"><span>"+Event_type_arr[0]+":"+event_db_char[0]+"</span></div>"+
                    "</div>"+
                    "<div style=\"width:100%;height:16px;\">"+
                        "<div style=\"float:left;width:10px;height:10px;background-color:"+chart_color[1]+";margin:4px 3px 0px 0px;\"></div>"+
                        "<div style=\"float:left;color:black;font-size:8pt;height:12px;\"><span>"+Event_type_arr[1]+":"+event_db_char[1]+"</span></div>"+
                    "</div>"+
                    "<div style=\"width:100%;height:16px;\">"+
                        "<div style=\"float:left;width:10px;height:10px;background-color:"+chart_color[2]+";margin:4px 3px 0px 0px;\"></div>"+
                        "<div style=\"float:left;color:black;font-size:8pt;height:12px;\"><span>"+Event_type_arr[2]+":"+event_db_char[2]+"</span></div>"+
                    "</div>"+
                    "<div style=\"width:100%;height:16px;\">"+
                        "<div style=\"float:left;width:10px;height:10px;background-color:"+chart_color[3]+";margin:4px 3px 0px 0px;\"></div>"+
                        "<div style=\"float:left;color:black;font-size:8pt;height:12px;\"><span>"+Event_type_arr[3]+":"+event_db_char[3]+"</span></div>"+
                    "</div>"+
                    "<div style=\"width:100%;height:16px;\">"+
                        "<div style=\"float:left;width:10px;height:10px;background-color:"+chart_color[4]+";margin:4px 3px 0px 0px;\"></div>"+
                        "<div style=\"float:left;color:black;font-size:8pt;height:12px;\"><span>"+Event_type_arr[4]+":"+event_db_char[4]+"</span></div>"+
                    "</div>"+
                    "<div style=\"width:100%;height:16px;\">"+
                        "<div style=\"float:left;width:10px;height:10px;background-color:"+chart_color[5]+";margin:4px 3px 0px 0px;\"></div>"+
                        "<div style=\"float:left;color:black;font-size:8pt;height:12px;\"><span>"+Event_type_arr[5]+":"+event_db_char[5]+"</span></div>"+
                    "</div>"+
                    "<div style=\"width:100%;height:16px;\">"+
                        "<div style=\"float:left;width:10px;height:10px;background-color:"+chart_color[6]+";margin:4px 3px 0px 0px;\"></div>"+
                        "<div style=\"float:left;color:black;font-size:8pt;height:12px;\"><span>"+Event_type_arr[6]+":"+event_db_char[6]+"</span></div>"+
                    "</div>"+
                    "<div style=\"width:100%;height:16px;\">"+
                        "<div style=\"float:left;width:10px;height:10px;background-color:"+chart_color[7]+";margin:4px 3px 0px 0px;\"></div>"+
                        "<div style=\"float:left;color:black;font-size:8pt;height:12px;\"><span>"+Event_type_arr[7]+":"+event_db_char[7]+"</span></div>"+
                    "</div>";
            $(tmp).appendTo("#Ievent_identify_area");
        };

        var analysis_db = function(data, db_array){
            var event_db = []
            , ind = 0
            ;
            event_db = db_array;
            ind = event_db[data];
            ind = ind + 1;
            event_db[data] = ind;
            return event_db;
        };

        var dates = {
            convert:function(d) {
                return (
                    d.constructor === Date ? d :
                    d.constructor === Array ? new Date(d[0],d[1],d[2]) :
                    d.constructor === Number ? new Date(d) :
                    d.constructor === String ? new Date(d) :
                    typeof d === "object" ? new Date(d.year,d.month,d.date) :
                    NaN
                );
            },
            compare:function(a,b) {
                return (
                    isFinite(a=this.convert(a).valueOf()) &&
                    isFinite(b=this.convert(b).valueOf()) ?
                    (a>b)-(a<b) :
                    NaN
                );
            },
            inRange:function(d,start,end) {
               d=this.convert(d).valueOf();
               return (
                    isFinite(d=this.convert(d).valueOf()) &&
                    isFinite(start=this.convert(start).valueOf()) &&
                    isFinite(end=this.convert(end).valueOf()) ?
                    start <= d && d <= end :
                    NaN
                );
            }
        }

        var checkingFilter = function(){
            var s_t = $("#Ievent_start_time").val()
            , e_t = $("#Ievent_end_time").val()
            ;
            if(s_t == "" || e_t == ""){
                $("#Ievent_db_refresh").addClass("not_modify").removeClass("can_modify");
                $("#Ievent_search").addClass("not_modify_without_float").removeClass("can_modify_without_float");
            } else {
                $("#Ievent_db_refresh").addClass("can_modify").removeClass("not_modify");
                $("#Ievent_search").addClass("can_modify_without_float").removeClass("not_modify_without_float");
            }
        };

        $("body").on("click", "#Ievent_db_refresh", function(){
            if($(this).attr("class") == "can_modify"){
                $("#Ievent_search_db").children().remove();
                $(els).appendTo("#Ievent_search_db");
                parserEventDB(function(){
                    execute_filter_event();
                });
            }
        });

        $("body").on("click", "#Ievent_db_cleanup", function(){
            if($(this).attr("class") == "can_modify"){
                $("#Ievent_search_db").children().remove();
                $(els).appendTo("#Ievent_search_db");
                query_param = "system.configuration.cleanup_event_db_status";
                var db = $.parseJSON("{\""+query_param+"\":\"none\",\"system.configuration.cleanup_event_db\":\"trigger\"}");
                $.fn._runSetWithBlockUI(db, function(){
                    $.fn._runListen();
                });
            }
        });

        $("body").on("click", "#Ievent_search", function(){
            if($(this).attr("class") == "can_modify_without_float"){
                $("#Ievent_search_db").children().remove();
                $(els).appendTo("#Ievent_search_db");
                execute_filter_event();
            }
        });

        $("body").on("keyup change", "#Ievent_start_time, #Ievent_end_time", function(){
            checkingFilter();
        });

        $("body").on("change", "input[type=radio][name=Nevent_filter_time]", function(){
            if($(this).val() == "all_time"){
                $("#Ievent_start_time").addClass("grey_out").attr("disabled", true);
                $("#Ievent_end_time").addClass("grey_out").attr("disabled", true);
                $("#Ievent_db_refresh").addClass("can_modify").removeClass("not_modify");
                $("#Ievent_search").addClass("can_modify_without_float").removeClass("not_modify_without_float");
            } else if($(this).val() == "manual"){
                $("#Ievent_start_time").removeClass("grey_out").attr("disabled", false);
                $("#Ievent_end_time").removeClass("grey_out").attr("disabled", false);
                checkingFilter();
            }
        });

        parserEventDB(null);
        $("input[type=radio][name=Nevent_filter_time][value=all_time]").attr('checked',true);
        $("input[type=radio][name=Nevent_filter_time]:checked").change();
        if($.fn.DetectBrowser() == "firefox" || $.fn.DetectBrowser() == "safari")
            $("#Isub_event_search input[type=text]").attr("size", "30");

        $("#dtBox").DateTimePicker({
            dateTimeFormat: "yyyy-MM-dd HH:mm:ss"
        });
    };

    $.fn.initializeSdPlayback = function()
    {
        $("#dtPlay").DateTimePicker({
            dateTimeFormat: "yyyy-MM-dd HH:mm:ss",
            beforeShow:function (oInput){
                var oDTP = this;
                var tmp_date;
                if($(oInput).val() === ""){
                    $.ajax({
                        beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
                        url:'/cgi-bin/get?',
                        type:'POST',
                        data:{ "system.datetime.current_server_time":"" },
                        cache:false,
                        async:false,
                        success:function(data){
                            $.each(data, function(param, val){
                                if(param == "system.datetime.current_server_time"){
                                    tmp_date = new Date(val[1]).getTime() - 10*60*1000;
                                    oDTP.settings.defaultDate = new Date(tmp_date);
                                }             
                            });
                        }
                    });
                }
            }
        });

        $("body").on("click", "#Isd_playback_search", function(){
            var val, tmp, tm_d, tm_t;
            var str;
            var sys_time, get_time;
            // parse time
            $.ajax({
                beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
                url:'/cgi-bin/get?',
                type:'POST',
                data:{ "system.datetime.current_server_time":"" },
                cache:false,
                success:function(data){
                    $.each(data, function(param, val){
                        if(param == "system.datetime.current_server_time"){
                            sys_time = val[1];
                        }             
                    });
                },
                complete:function(){
                    $.removeCookie('ipcamera', { path: '/' });

                    get_time = $("#Iplayback_date_time").val();
                    if(get_time.replace(/^\s+/,"").replace(/\s+$/,"") != "" && get_time != "undefined"){
                        get_time = get_time.replace(/-/g, "/");
                        get_time = get_time + ":00";
                        console.log("sys_time:" + sys_time + " get_time:" + get_time);
                        var sys = new Date(sys_time);
                        var get = new Date(get_time);
                        //console.log("sys:" + sys + " get:" + get);
                        var minus = sys.getTime() - get.getTime();
                        console.log("minus:" + minus);
                        if(minus > 10*60*1000){
                            val = $("#Iplayback_date_time").val().split(" ");
                            tm_d = val[0].split("-");
                            tm_t = val[1].split(":");
                            str = tm_d[0] + tm_d[1]+tm_d[2]+"T"+tm_t[0]+tm_t[1]+"00.000Z";
                            console.log("check val:" + str);
                            window.open("/www/playback_view.html?"+str,"_blank");
                        }else{
                            alert($.fn.GetLangStr(LT._Playback_should_earlier_than_10_minutes));
                        }
                    }
                    else{
                            alert($.fn.GetLangStr(LT._Please_enter_time));
                    }                    
                }
            });   
        });
    };

    $.fn.initialPtzBasic = function()
    {
        $("input[name=Nptz_pt_manual_auto_flip][value="+$("#ptz_pt_manual_auto_flip").val()+"]").prop('checked',true);
        $("input[name=Nptz_pt_action_auto_scan_limit_enable][value="+$("#ptz_pt_action_auto_scan_limit_enable").val()+"]").prop('checked',true);
        $("input[name=Nptz_focus_mode][value="+$("#ptz_focus_mode").val()+"]").prop('checked',true);
        $("input[name=Nptz_focus_auto_sensitivity][value="+$("#ptz_focus_auto_sensitivity").val()+"]").prop('checked',true);
        $("div[conf='sub_ptz_basic'] div.slider").each(function(){
            var Sid = $(this).attr("id")
            , Iid = $(this).siblings("input").attr("id")
            ;
            $.fn._initializeSilderCtrl(Sid, Iid, $(this).attr("_max"), $(this).attr("_min"), $(this).attr("_step"), "inactive", "sub_ptz_basic");
            $("#"+Iid).change();
        });
        $("body").on("change", "div[conf='sub_ptz_basic'] select, div[conf='sub_ptz_basic'] input", function(){
           if($(this).attr("name").indexOf(".") >= 0)
           { 
              $.fn._isModified($(this));
              $.fn._runChecking("sub_ptz_basic");
           }
        });
        $("body").on("change", "div[conf='sub_ptz_basic'] input[name='Nptz_pt_manual_auto_flip']", function(){
            if($(this).val() == "on"){
            	  $("#ptz_pt_manual_auto_flip").val("on");
            	  $("#ptz_pt_manual_auto_flip").change();
            } else if($(this).val() == "off"){
            	  $("#ptz_pt_manual_auto_flip").val("off");
            	  $("#ptz_pt_manual_auto_flip").change();
            } 
        });
        $("body").on("change", "div[conf='sub_ptz_basic'] input[name='Nptz_pt_action_auto_scan_limit_enable']", function(){
            if($(this).val() == "on"){
            	  $("#ptz_pt_action_auto_scan_limit_enable").val("on");
            	  $("#ptz_pt_action_auto_scan_limit_enable").change();
            } else if($(this).val() == "off"){
            	  $("#ptz_pt_action_auto_scan_limit_enable").val("off");
            	  $("#ptz_pt_action_auto_scan_limit_enable").change();
            } 
        });
        $("body").on("change", "div[conf='sub_ptz_basic'] input[name='Nptz_focus_mode']", function(){
            if($(this).val() == "auto"){
            	  $("#ptz_focus_mode").val("auto");
            	  $("#ptz_focus_mode").change();
            } else if($(this).val() == "manual"){
            	  $("#ptz_focus_mode").val("manual");
            	  $("#ptz_focus_mode").change();
            } 
        });
        $("body").on("change", "div[conf='sub_ptz_basic'] input[name='Nptz_focus_auto_sensitivity']", function(){
            if($(this).val() == "normal"){
            	  $("#ptz_focus_auto_sensitivity").val("normal");
            	  $("#ptz_focus_auto_sensitivity").change();
            } else if($(this).val() == "low"){
            	  $("#ptz_focus_auto_sensitivity").val("low");
            	  $("#ptz_focus_auto_sensitivity").change();
            } 
        });

        $("body").on("mousedown", "div[conf='sub_ptz_basic'] .can_modify_without_float", function(){
           // alert($(this).attr("name"));
           $.fn._runSetWithoutBlockUI($(this).attr("name")+"=1");
           $(this).addClass("grey_out");
        });

        $("body").on("mouseup mouseleave", "div[conf='sub_ptz_basic'] .can_modify_without_float", function(){
           if($(this).attr("class").search("grey_out") != -1)
           {
              $.fn._runSetWithoutBlockUI($(this).attr("name")+"=0");
              $(this).removeClass("grey_out");
           }
        });

        $("body").on("click", "#Save_Isub_ptz_basic", function(){
            if($(this).attr("class") == "can_modify"){
                var cmd = $.fn._runCollectModifUAPI("Isub_ptz_basic");
                $.fn._runSetWithBlockUI(cmd, function(){
                    $("#Isub_ptz_basic .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    $("#Save_Isub_ptz_basic").removeClass("can_modify").addClass("not_modify");
                    setTimeout($.fn._runUnBlockUI, 3000);
                });
            }
        });
    };

    $.fn.initialPtzPreset = function()
    {
        $("body").on("change", "div[conf='sub_ptz_position'] input[name='ptz.pt.action.preset.number']", function(){
            	  $("#Ipreset_num_select").val($(this).val());
        });
        $("body").on("click",  "div[conf='sub_ptz_position'] .input_button", function(){
           $.fn._runSetWithoutBlockUI("ptz.pt.action.preset.number."+$("#Ipreset_num_select").val()+"."+$(this).attr("name")+"=1");
        });
    };

    $.fn.initialPtzPatrol = function()
    {
        $("body").on("click", "#Mpatrol_1, #MFpatrol_1", function(){
        //	 alert($("#Mtab_patrol_1").attr("style"));
           $("#Mtab_patrol_1").attr("style","width:100%;");
           $("#Mtab_patrol_2").attr("style","display:none;width:100%;");
           $("#Mtab_patrol_3").attr("style","display:none;width:100%;");
           $("#Mtab_patrol_4").attr("style","display:none;width:100%;");
        });
        $("body").on("click", "#Mpatrol_2, #MFpatrol_2", function(){
        //	 alert($("#Mtab_patrol_2").attr("style"));
           $("#Mtab_patrol_1").attr("style","display:none;width:100%;");
           $("#Mtab_patrol_2").attr("style","width:100%;");
           $("#Mtab_patrol_3").attr("style","display:none;width:100%;");
           $("#Mtab_patrol_4").attr("style","display:none;width:100%;");
        });
        $("body").on("click", "#Mpatrol_3, #MFpatrol_3", function(){
        //	 alert($("#Mtab_patrol_3").attr("style"));
           $("#Mtab_patrol_1").attr("style","display:none;width:100%;");
           $("#Mtab_patrol_2").attr("style","display:none;width:100%;");
           $("#Mtab_patrol_3").attr("style","width:100%;");
           $("#Mtab_patrol_4").attr("style","display:none;width:100%;");
       });
        $("body").on("click", "#Mpatrol_4, #MFpatrol_4", function(){
        //	 alert($("#Mtab_patrol_4").attr("style"));
           $("#Mtab_patrol_1").attr("style","display:none;width:100%;");
           $("#Mtab_patrol_2").attr("style","display:none;width:100%;");
           $("#Mtab_patrol_3").attr("style","display:none;width:100%;");
           $("#Mtab_patrol_4").attr("style","width:100%;");
        });
        $("body").on("change", "#Isub_ptz_patrol input[type=checkbox]", function(){
              var chkbox_status = $(this).is(":checked") == true? "on":"off";
              var id_name=$(this).attr("ref_num_name");
              var id_name_dur=id_name.substring(0,id_name.indexOf("preset_num"))+"duration";
              if($(this).is(":checked") == true)
              {
                 $("#I"+id_name).val($(this).attr("num_value"));
                 $.fn._isModified($("#I"+id_name_dur));
              } else
              {
                 $("#I"+id_name).val('');
              }
              $.fn._isModified($("#I"+id_name));
              $.fn._runChecking("sub_ptz_patrol");
        });
        $("body").on("change", "#Isub_ptz_patrol select", function(){
           if($(this).attr("name").indexOf(".") >= 0)
           { 
              $.fn._isModified($(this));
              $.fn._runChecking("sub_ptz_patrol");
           }
        });
        $("body").on("click", "#Isub_ptz_patrol span[patrol_node=1]", function(event){
             var spanElement = $(this).context;
             var my_intrest = spanElement.parentElement.firstElementChild;
             var ref_num_name = my_intrest.getAttribute("ref_num_name");
             var preset_dur = spanElement.innerHTML;
             var preset_num = preset_dur.substring(0,preset_dur.indexOf('['));
             var dur_num = preset_dur.substring(preset_dur.indexOf('[')+1,preset_dur.indexOf(']'));
             if(dur_num=='0') dur_num='skip';
             $("#Iptz_pt_action_auto_patrol_duration").val(dur_num) ;
             $("#Iptz_pt_action_auto_patrol_preset").val(preset_num)
             //alert(my_intrest.getAttribute("ref_num_name")+spanElement.innerHTML);
             //spanElement.innerHTML = 'Hi';
             $(this).attr("id","Ipatrol_span_for_"+ref_num_name);
             $("#Iduration_editor").attr("style","left: "+event.pageX+"px; top: "+event.pageY+"px;");
             $("#Iduration_ok").attr("target_num_id",ref_num_name);
             $("#Iduration_editor").show();
         });        
         
        $("body").on("click", "#Iduration_ok, #Iduration_cancel", function(){
        	  var id_name = $(this).attr("id");
        	  if(id_name=='Iduration_ok')
        	  {
        	     var ref_num_name=$(this).attr("target_num_id");
        	     var id_name_dur=ref_num_name.substring(0,ref_num_name.indexOf("preset_num"))+"duration";
        	     $("#Isub_ptz_patrol input[ref_num_name="+ref_num_name+"]").attr("num_value",$("#Iptz_pt_action_auto_patrol_preset").val());
        	     $("#I"+id_name_dur).val($("#Iptz_pt_action_auto_patrol_duration").val());
        	     $("#Isub_ptz_patrol input[ref_num_name="+ref_num_name+"]").change();
        	     $("#Ipatrol_span_for_"+ref_num_name).html($("#Iptz_pt_action_auto_patrol_preset").val()+"["+$("#Iptz_pt_action_auto_patrol_duration :selected").text()+"]");
        	  }
             $("#Iduration_editor").hide();
        });
        
        $("body").on("click", "#Save_Isub_ptz_patrol", function(){
            if($(this).attr("class") == "can_modify"){
                var cmd = $.fn._runCollectModifUAPI("Isub_ptz_patrol");
                $.fn._runSetWithBlockUI(cmd, function(){
                    $("#Isub_ptz_patrol .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    $("#Save_Isub_ptz_patrol").removeClass("can_modify").addClass("not_modify");
                    setTimeout($.fn._runUnBlockUI, 3000);
                });
            }
        });
        $("#Isub_ptz_patrol input[type=checkbox]").each(function(){
               var id_name=$(this).attr("ref_num_name");
               if($("#I"+id_name).val()!='')
               {
                  $(this).prop('checked',true);
               }
        });
        $("#Isub_ptz_patrol span[patrol_node=1]").each(function(){
             var spanElement = $(this).context;
             var my_intrest = spanElement.parentElement.firstElementChild;
             var ref_num_name = my_intrest.getAttribute("ref_num_name");
             var patrol_id = ref_num_name.substring(4,5);
             ref_num_name = ref_num_name.substring(6);
             var patrol_id_number = ref_num_name.substring(0,ref_num_name.indexOf('_'));
             if($("#INum_"+patrol_id+"_"+patrol_id_number+"_preset_num").val()=='')
             {
                if($("#INum_"+patrol_id+"_"+patrol_id_number+"_duration").val()=='skip')
                {
                   spanElement.innerHTML =patrol_id_number +"[0]";
                } else
                {
                   spanElement.innerHTML =patrol_id_number +"["+$("#INum_"+patrol_id+"_"+patrol_id_number+"_duration").val()+"]";
                }
             } else
             {
                if($("#INum_"+patrol_id+"_"+patrol_id_number+"_duration").val()=='skip')
                {
                   spanElement.innerHTML =$("#INum_"+patrol_id+"_"+patrol_id_number+"_preset_num").val() +"[0]";
                } else
                {
                   spanElement.innerHTML =$("#INum_"+patrol_id+"_"+patrol_id_number+"_preset_num").val() +"["+$("#INum_"+patrol_id+"_"+patrol_id_number+"_duration").val()+"]";
                }
             }
        });
    };

    $.fn.initialPtzPattern = function()
    {
        $("#Ipattern_1_record").attr("disabled", true).addClass("grey_out");
        $("#Ipattern_2_record").attr("disabled", true).addClass("grey_out");
        $("#Ipattern_3_record").attr("disabled", true).addClass("grey_out");
        $("#Ipattern_4_record").attr("disabled", true).addClass("grey_out");
        $("#Ipattern_1_play").attr("disabled", true).addClass("grey_out");
        $("#Ipattern_2_play").attr("disabled", true).addClass("grey_out");
        $("#Ipattern_3_play").attr("disabled", true).addClass("grey_out");
        $("#Ipattern_4_play").attr("disabled", true).addClass("grey_out");
        $("#Ipattern_1_clear").attr("disabled", true).addClass("grey_out");
        $("#Ipattern_2_clear").attr("disabled", true).addClass("grey_out");
        $("#Ipattern_3_clear").attr("disabled", true).addClass("grey_out");
        $("#Ipattern_4_clear").attr("disabled", true).addClass("grey_out");
        $("body").on("click", "[name=Nptz_pt_action_pattern]", function(){
           $("#Ipattern_1_record").attr("disabled", true).addClass("grey_out");
           $("#Ipattern_2_record").attr("disabled", true).addClass("grey_out");
           $("#Ipattern_3_record").attr("disabled", true).addClass("grey_out");
           $("#Ipattern_4_record").attr("disabled", true).addClass("grey_out");
           $("#Ipattern_1_play").attr("disabled", true).addClass("grey_out");
           $("#Ipattern_2_play").attr("disabled", true).addClass("grey_out");
           $("#Ipattern_3_play").attr("disabled", true).addClass("grey_out");
           $("#Ipattern_4_play").attr("disabled", true).addClass("grey_out");
           $("#Ipattern_1_clear").attr("disabled", true).addClass("grey_out");
           $("#Ipattern_2_clear").attr("disabled", true).addClass("grey_out");
           $("#Ipattern_3_clear").attr("disabled", true).addClass("grey_out");
           $("#Ipattern_4_clear").attr("disabled", true).addClass("grey_out");
 
           $("#Ipattern_"+$(this).val()+"_record").attr("disabled", false).removeClass("grey_out");
           $("#Ipattern_"+$(this).val()+"_play").attr("disabled", false).removeClass("grey_out");
           $("#Ipattern_"+$(this).val()+"_clear").attr("disabled", false).removeClass("grey_out");
        });
        $("body").on("click", "#Isub_ptz_pattern input[type=button]", function(){
        	 var id_name = "#"+$(this).attr("pattern_name");
            if(id_name.indexOf("clear") >= 0)
           {
               var play_id_name = id_name.substring(0,id_name.indexOf("clear"))+"play";
               var record_id_name = id_name.substring(0,id_name.indexOf("clear"))+"record";
               var play_btn_id_name = "#I"+ id_name.substring(16,id_name.indexOf("clear"))+"play";
               var record_btn_id_name ="#I"+ id_name.substring(16,id_name.indexOf("clear"))+"record";
               if($(play_btn_id_name).attr("class").search("red_out") != -1)
               {
                  $(play_id_name).val(0);
                  $.fn._runSetWithoutBlockUI('ptz.pt.action.stop=1');
              //    $.fn._runSetWithoutBlockUI($(play_id_name).attr("name")+"=");
                  $(play_btn_id_name).removeClass("red_out");
               } 
               if($(record_btn_id_name).attr("class").search("red_out") != -1)
               {
                  var recordname = $(record_id_name).attr("name");
                  var filename = recordname.substring(0,recordname.indexOf("record"))+"file";
                  $(record_id_name).val(0);
                  $.fn._runSetWithoutBlockUI('ptz.pt.action.stop=1');
                  $.fn._runSetWithoutBlockUI(filename+"=1");
                  $(record_btn_id_name).removeClass("red_out");
               }
           } else
           {
              $("#Isub_ptz_pattern input[type=button]").each(function(){
                  if($(this).attr("class").search("red_out") != -1){
                  	 var running_id_name="#"+$(this).attr("pattern_name");
                  	 var running_name=$(running_id_name).attr("name");
                     $.fn._runSetWithoutBlockUI('ptz.pt.action.stop=1');
                  	 if(running_name.indexOf("record")>0)
                  	 {
                         var running_id_file_name = running_name.substring(0,running_name.indexOf("record"))+"file";
                         $.fn._runSetWithoutBlockUI(running_id_file_name+"=1");
                     }
                  	 $(running_id_name).val(0);
                  }
                  $(this).removeClass("red_out");
               });
               $.fn._runSetWithoutBlockUI($(id_name).attr("name")+"=1");
               $(id_name).val(1);
               $(this).addClass("red_out");
           }
        });
        
    };

    $.fn.initialCtrlMenu = function()
    {
        var rmRed_out = function(){
             $("#ptz_control_panel input[type=button]").each(function(){
                  if($(this).attr("class").search("ptz_control_patrol_pattern_on") != -1){
          	     	   $.fn._runSetWithoutBlockUI('ptz.pt.action.stop=1');
                     $(this).removeClass("ptz_control_patrol_pattern_on").addClass("ptz_control_patrol_pattern");
                  }
             });
	      };
	      
        $("body").on("click", "#ptz_ctrl_home", function(){
                $.fn._runSetWithoutBlockUI('ptz.pt.action.preset.number.1.goto=1');
        });
        
        $("body").on("click", "#ptz_control_preset_tab input[type=button]", function(){
             var id_name=$(this).attr("id");
             var preset_num = $("#Iptz_preset_nums").val();
             rmRed_out();
             if(preset_num != "")
             {
                if(id_name == 'Ipreset_clean')
                {
                   $.fn._runSetWithoutBlockUI('ptz.pt.action.preset.number.'+preset_num+'.clear=1');
                } else if(id_name == 'Ipreset_set')
                {
                   $.fn._runSetWithoutBlockUI('ptz.pt.action.preset.number.'+preset_num+'.set=1');
                } else if(id_name == 'Ipreset_goto')
                {
                   $.fn._runSetWithoutBlockUI('ptz.pt.action.preset.number.'+preset_num+'.goto=1');
                }
             }             
        });
        
        var sliderCtrl_pt = $("#ptz-pan-tilt-speed-slider").slider({           
                value: 1,            
                min: 1,     
                max: 63,         
                step:1,         
                slide: function(event, ui){
                    $("#Iptz_pan_tilt_speed").val(ui.value);
                    $("#Iptz_pan_tilt_speed").change();
                },
                change: function(event, ui){
                    revert = ui.value;
                }       
            });
         $("body").on("change", "#Iptz_pan_tilt_speed", function(){
                    if((parseInt($(this).val()) >= 1 && parseInt($(this).val()) <= 64) && $.isNumeric($(this).val()) && Number_regex.test($(this).val())){
                        sliderCtrl_pt.slider("value", $(this).val());
                    }else
                    {
                        $(this).val(5);
                         sliderCtrl_pt.slider("value", $(this).val());
                    }
            });
        var sliderCtrl_zoom = $("#ptz-zoom-speed-slider").slider({           
                value: 1,            
                min: 1,     
                max: 3,         
                step:1,         
                slide: function(event, ui){
                    $("#Iptz_zoom_speed").val(ui.value);
                    $("#Iptz_zoom_speed").change();
                },
                change: function(event, ui){
                    revert = ui.value;
                }       
            });
         $("body").on("change", "#Iptz_zoom_speed", function(){
                    if((parseInt(this.value) >= 1 && parseInt(this.value) <= 3) && $.isNumeric(this.value) && Number_regex.test(this.value)){
                        sliderCtrl_zoom.slider("value", this.value);
                    }else
                    {
                        $(this).val(2);
                        sliderCtrl_zoom.slider("value", this.value);
                    }
            });

        $("body").on("click", "#ptz_control_patrol_tab input[type=button],#ptz_control_pattern_tab input[type=button],#ptz_control_scan_tab input[type=button]", function(){
            var id_name=$(this).attr("id");
            if($(this).attr("class").search("ptz_control_patrol_pattern_on") != -1)
            {
        	     rmRed_out();
            } else
            {	
        	     rmRed_out();
        	     if(id_name == 'Iptz_control_pattern_1')
        	     {
        	     	   $.fn._runSetWithoutBlockUI('ptz.pt.action.pattern.1.play=1');
        	     } else if(id_name == 'Iptz_control_pattern_2')
        	     {
        	     	   $.fn._runSetWithoutBlockUI('ptz.pt.action.pattern.2.play=1');
        	     } else if(id_name == 'Iptz_control_pattern_3')
        	     {
        	     	   $.fn._runSetWithoutBlockUI('ptz.pt.action.pattern.3.play=1');
        	     } else if(id_name == 'Iptz_control_pattern_4')
        	     {
        	     	   $.fn._runSetWithoutBlockUI('ptz.pt.action.pattern.4.play=1');
        	     } else if(id_name == 'Iptz_control_patrol_1')
        	     {
        	     	   $.fn._runSetWithoutBlockUI('ptz.pt.action.auto_patrol.1.start=1');
        	     } else if(id_name == 'Iptz_control_patrol_2')
        	     {
        	     	   $.fn._runSetWithoutBlockUI('ptz.pt.action.auto_patrol.2.start=1');
        	     } else if(id_name == 'Iptz_control_patrol_3')
        	     {
        	     	   $.fn._runSetWithoutBlockUI('ptz.pt.action.auto_patrol.3.start=1');
        	     } else if(id_name == 'Iptz_control_patrol_4')
        	     {
        	     	   $.fn._runSetWithoutBlockUI('ptz.pt.action.auto_patrol.4.start=1');
        	     } else if(id_name == 'Iptz_control_scan_auto')
        	     {
        	     	   $.fn._runSetWithoutBlockUI('ptz.pt.action.auto_scan.mode=auto');
          	     	 $.fn._runSetWithoutBlockUI('ptz.pt.action.auto_scan.start=1');
        	     } else if(id_name == 'Iptz_control_scan_frame')
        	     {
        	     	   $.fn._runSetWithoutBlockUI('ptz.pt.action.auto_scan.mode=frame');
          	     	 $.fn._runSetWithoutBlockUI('ptz.pt.action.auto_scan.start=1');
        	     } else if(id_name == 'Iptz_control_scan_random')
        	     {
        	     	   $.fn._runSetWithoutBlockUI('ptz.pt.action.auto_scan.mode=random');
          	     	 $.fn._runSetWithoutBlockUI('ptz.pt.action.auto_scan.start=1');
        	     }
               $(this).removeClass("ptz_control_patrol_pattern").addClass("ptz_control_patrol_pattern_on");
            }
        });
        
        $("body").on("click", "#Iptz_control_one_push", function(){
            var id_name=$(this).attr("id");
        	  rmRed_out();
            $.fn._runSetWithoutBlockUI('ptz.focus.manual.move.one_push=1');
        });
        
        $("body").on("mousedown", "#ptz_control_zf_tab input[type=button],#ptz_control_panel .ptz_control_direction", function(){
            var id_name=$(this).attr("id");
            var pt_speed=$("#Iptz_pan_tilt_speed").val();
            var z_speed=$("#Iptz_zoom_speed").val();
            rmRed_out();
            if(id_name == 'ptz_ctrl_up')
            {
                 $.fn._runSetWithoutBlockUI('ptz.pt.manual.move.continuous=0,'+pt_speed)
                 $(this).addClass("ptz_control_pressed")
            } else if(id_name == 'ptz_ctrl_left_up')
            {
                 $.fn._runSetWithoutBlockUI('ptz.pt.manual.move.continuous='+pt_speed+','+pt_speed);
                 $(this).addClass("ptz_control_pressed")
            } else if(id_name == 'ptz_ctrl_right_up')
            {
                 $.fn._runSetWithoutBlockUI('ptz.pt.manual.move.continuous=-'+pt_speed+','+pt_speed);
                 $(this).addClass("ptz_control_pressed")
            } else if(id_name == 'ptz_ctrl_left')
            {
                 $.fn._runSetWithoutBlockUI('ptz.pt.manual.move.continuous='+pt_speed+',0');
                 $(this).addClass("ptz_control_pressed")
            } else if(id_name == 'ptz_ctrl_right')
            {
                 $.fn._runSetWithoutBlockUI('ptz.pt.manual.move.continuous=-'+pt_speed+',0');
                 $(this).addClass("ptz_control_pressed")
            } else if(id_name == 'ptz_ctrl_left_down')
            {
                 $.fn._runSetWithoutBlockUI('ptz.pt.manual.move.continuous='+pt_speed+',-'+pt_speed);
                 $(this).addClass("ptz_control_pressed")
            } else if(id_name == 'ptz_ctrl_right_down')
            {
                 $.fn._runSetWithoutBlockUI('ptz.pt.manual.move.continuous=-'+pt_speed+',-'+pt_speed);
                 $(this).addClass("ptz_control_pressed")
            } else if(id_name == 'ptz_ctrl_down')
            {
                 $.fn._runSetWithoutBlockUI('ptz.pt.manual.move.continuous=0,'+pt_speed);
                 $(this).addClass("ptz_control_pressed")
            } else if(id_name == 'Iptz_control_zoom_in')
            {
            	   if(z_speed == 1)
            	   {
            	  	 $.fn._runSetWithoutBlockUI('ptz.zoom.move.continuous.speed=low');
            	   } else if(z_speed == 2)
            	   {
            	  	 $.fn._runSetWithoutBlockUI('ptz.zoom.move.continuous.speed=medium');
            	   }else if(z_speed == 3)
            	   {
            	  	 $.fn._runSetWithoutBlockUI('ptz.zoom.move.continuous.speed=high');
            	   }
                 $.fn._runSetWithoutBlockUI('ptz.zoom.move.continuous.in=1');
                 $(this).addClass("ptz_control_pressed")
            } else if(id_name == 'Iptz_control_zoom_out')
            {
            	   if(z_speed == 1)
            	   {
            	  	 $.fn._runSetWithoutBlockUI('ptz.zoom.move.continuous.speed=low');
            	   } else if(z_speed == 2)
            	   {
            	  	 $.fn._runSetWithoutBlockUI('ptz.zoom.move.continuous.speed=medium');
            	   }else if(z_speed == 3)
            	   {
            	  	 $.fn._runSetWithoutBlockUI('ptz.zoom.move.continuous.speed=high');
            	   }
                 $.fn._runSetWithoutBlockUI('ptz.zoom.move.continuous.out=1');
                 $(this).addClass("ptz_control_pressed")
            } else if(id_name == 'Iptz_control_focus_near')
            {
                 $.fn._runSetWithoutBlockUI('ptz.focus.manual.move.continuous.near=1');
                 $(this).addClass("ptz_control_pressed")
            } else if(id_name == 'Iptz_control_focus_far')
            {
                 $.fn._runSetWithoutBlockUI('ptz.focus.manual.move.continuous.far=1');
                 $(this).addClass("ptz_control_pressed")
            } 
        });

        $("body").on("mouseup mouseleave", "#ptz_control_zf_tab input[type=button],#ptz_control_panel .ptz_control_direction", function(){
           if($(this).attr("class").search("ptz_control_pressed") != -1){ 
              var id_name=$(this).attr("id");
              if(id_name == 'ptz_ctrl_up' || id_name == 'ptz_ctrl_left_up' || id_name == 'ptz_ctrl_right_up'
                 || id_name == 'ptz_ctrl_left' || id_name == 'ptz_ctrl_right' || id_name == 'ptz_ctrl_left_down'
                 || id_name == 'ptz_ctrl_right_down' || id_name == 'ptz_ctrl_down')
              {
                  $.fn._runSetWithoutBlockUI('ptz.pt.manual.move.stop=1');
              } else if(id_name == 'Iptz_control_zoom_in' || id_name == 'Iptz_control_zoom_out')
              {
                  $.fn._runSetWithoutBlockUI('ptz.zoom.move.stop=1');
              } else if(id_name == 'Iptz_control_focus_near' || id_name == 'Iptz_control_focus_far')
              {
                  $.fn._runSetWithoutBlockUI('ptz.focus.manual.move.stop=1');
              } 
              $(this).removeClass("ptz_control_pressed");
           }
        });

        $("#Iptz_zoom_speed").val(2);
        $("#Iptz_zoom_speed").change();
        $("#Iptz_pan_tilt_speed").val(5);
        $("#Iptz_pan_tilt_speed").change();
    };

    $.fn.initialVaBaisc = function()
    {
        var tmp_id = $("#Isub_va_basic .content_group > img.block_down").attr("id");
        var data = $("input[name='video_analysis.basic_setting.object_size.max_width']").val()+","
        + $("input[name='video_analysis.basic_setting.object_size.max_height']").val()+","
        + $("input[name='video_analysis.basic_setting.object_size.min_width']").val()+","
        + $("input[name='video_analysis.basic_setting.object_size.min_height']").val();
        if(tmp_id != undefined){
            var search_ind = tmp_id.lastIndexOf('_');
            $.fn._runInitialZone(data, "object_size_"+tmp_id.slice(search_ind+1, tmp_id.length));
        }
        $("#Isub_va_basic .content_group > img.block_down").click();
        $("#Save_Isub_va_basic").removeClass("not_modify").addClass("can_modify");
        if(SetupVAbasic)
            return true;

        var parseVABox = function(src){
            var tmp = src.split(',')
            , ret = ""
            , db
            ;
            $.each(tmp, function(n){
                if(n == 0){
                    ret = ret+"\""+$("input[name='video_analysis.basic_setting.object_size.max_width']").attr("name")+"\":\""+tmp[n]+"\",";
                    $("input[name='video_analysis.basic_setting.object_size.max_width']").val(tmp[n]);
                }
                else if(n == 1){
                    ret = ret+"\""+$("input[name='video_analysis.basic_setting.object_size.max_height']").attr("name")+"\":\""+tmp[n]+"\",";
                    $("input[name='video_analysis.basic_setting.object_size.max_height']").val(tmp[n]);
                }
                else if(n == 2){
                    ret = ret+"\""+$("input[name='video_analysis.basic_setting.object_size.min_width']").attr("name")+"\":\""+tmp[n]+"\",";
                    $("input[name='video_analysis.basic_setting.object_size.min_width']").val(tmp[n]);
                }
                else if(n == 3){
                    ret = ret+"\""+$("input[name='video_analysis.basic_setting.object_size.min_height']").attr("name")+"\":\""+tmp[n]+"\",";
                    $("input[name='video_analysis.basic_setting.object_size.min_height']").val(tmp[n]);
                }
            });
            ret = "{"+ ret.slice(0, ret.length-1) +"}";
            db = $.parseJSON(ret);
            return db;
        };

        $("body").on("change", "#Ievent_obj_counting_sensitivity", function(){
            $.fn._runSetWithoutBlockUI($(this).attr("name")+"="+$(this).val());
        });

        $("body").on("click", "#Iva_basic_max", function(){
            var ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0)
            , max_wid = $("input[name='video_analysis.basic_setting.object_size.max_width']").val()
            , max_hei = $("input[name='video_analysis.basic_setting.object_size.max_height']").val()
            , min_wid = $("input[name='video_analysis.basic_setting.object_size.min_width']").val()
            , min_hei = $("input[name='video_analysis.basic_setting.object_size.min_height']").val()
            ;
            $("div[conf_group='va_basic']").hide();
            $("#va_basic_max").show();
            $("#Isub_va_basic .content_group > img").addClass("block_up").removeClass("block_down");
            $(this).addClass("block_down").removeClass("block_up");
            try {
                ActivexPlayerObject.SetObjectSize(""+max_wid+","+max_hei+","+min_wid+","+min_hei+"");
                ActivexPlayerObject.DrawObjectSize(1);
            } catch(e){
                console.log("///////////////// draw max box error. /////////////////");
            }
        });

        $("body").on("click", "#Iva_basic_min", function(){
            var ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0)
            , max_wid = $("input[name='video_analysis.basic_setting.object_size.max_width']").val()
            , max_hei = $("input[name='video_analysis.basic_setting.object_size.max_height']").val()
            , min_wid = $("input[name='video_analysis.basic_setting.object_size.min_width']").val()
            , min_hei = $("input[name='video_analysis.basic_setting.object_size.min_height']").val()
            ;
            $("div[conf_group='va_basic']").hide();
            $("#va_basic_min").show();
            $("#Isub_va_basic .content_group > img").addClass("block_up").removeClass("block_down");
            $(this).addClass("block_down").removeClass("block_up");
            try {
                ActivexPlayerObject.SetObjectSize(""+max_wid+","+max_hei+","+min_wid+","+min_hei+"");
                ActivexPlayerObject.DrawObjectSize(2);
            } catch(e){
                console.log("///////////////// draw min box error. /////////////////");
            }
        });

        $("body").on("click", "#Iva_basic_max_set, #Iva_basic_min_set", function(){
            var ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0)
            , value = ActivexPlayerObject.GetObjectSize()
            , db = parseVABox(value);
            ;
            $.fn._runSetWithBlockUI(db, function(){
                setTimeout($.fn._runUnBlockUI, 1000);
            });
        });

        $("#Iva_basic_max").click();
        var data = $("input[name='video_analysis.basic_setting.object_size.max_width']").val()+","
        + $("input[name='video_analysis.basic_setting.object_size.max_height']").val()+","
        + $("input[name='video_analysis.basic_setting.object_size.min_width']").val()+","
        + $("input[name='video_analysis.basic_setting.object_size.min_height']").val();
        $.fn._runInitialZone(data, "object_size_max");
        SetupVAbasic = true;
    };

    var resetCounting = function(){
        var line = 3;
        for(var i = 1; i <= line; i++){
            // update object counting line infomation.
            var tmp = $("input[name='video_analysis.object_counting.line."+i+".coordinate']").val() 
            $.fn._runInitialZone(tmp, "line_counting-"+i);
        }
        var tmp_id = $("#Isub_line_counting .content_group > img.block_down").attr("id");
        if(tmp_id != undefined){
            if(line != 1){
                var Num = tmp_id.match(/\d\d/g) == null ? tmp_id.match(/\d/g) : tmp_id.match(/\d\d/g)
                , data = $("input[name='video_analysis.object_counting.line."+Num+".coordinate']").val();
                $.fn._runInitialZone(data, "line_counting-"+Num);
            }
        }
        $("#Isub_line_counting .content_group > img.block_down").click();
    };

    $.fn.initialObjectCounting = function()
    {
        var line = 3;
        resetCounting();
        record_coordinate[3] = ["0,0,0,0", "0,0,0,0", "0,0,0,0"];
        $("#Save_Isub_line_counting").removeClass("not_modify").addClass("can_modify");
        if(SetupObjectCounting)
            return true;
        var line_max = 3
        , platform = $.fn.GetPlatForm()
        ;
        var CollectCountingLineData = function(){
            var ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0)
            , tmp = ActivexPlayerObject.Get_Setting_OC_Line_Info()
            , tmp_detect_size = ActivexPlayerObject.Get_VideoSize()
            , line_info = tmp.split('/')
            , search_ind
            , coordinate
            , cord1 , cord2 , cord3
            , dire1 , dire2 , dire3
            , en1, en2, en3
            ;
            $.each(line_info, function(i){
                search_ind = line_info[i].lastIndexOf(',');
                coordinate = $.fn._runTransferCoordinate_ui2SysForVideoAnalysis(line_info[i].slice(0, search_ind), tmp_detect_size);
                if(record_coordinate[3][i] == "0,0,0,0"){
                    record_coordinate[3][i] = line_info[i].slice(0, search_ind);
                } else {
                    if(record_coordinate[3][i] != line_info[i].slice(0, search_ind)){
                        record_coordinate[3][i] = line_info[i].slice(0, search_ind);
                    }
                }
                if(line_info[i].slice(0, search_ind) == "0,0,0,0")
                    $("input[name='video_analysis.object_counting.line."+Number(i+1)+".coordinate']").val("0,0,0,0,"+$.fn.GetStreamWidth()+"x"+$.fn.GetStreamHeight()).addClass("modify");
                else
                    $("input[name='video_analysis.object_counting.line."+Number(i+1)+".coordinate']").val(coordinate).addClass("modify");
            });
            cord1 = $("input[name='video_analysis.object_counting.line.1.coordinate']").val();
            cord2 = $("input[name='video_analysis.object_counting.line.2.coordinate']").val();
            cord3 = $("input[name='video_analysis.object_counting.line.3.coordinate']").val();
            dire1 = $("#Ievent_obj_counting_line_1_direction").val();
            dire2 = $("#Ievent_obj_counting_line_2_direction").val();
            dire3 = $("#Ievent_obj_counting_line_3_direction").val();
            en1 = $("input[name='video_analysis.object_counting.line.1.enable']").is(":checked") == true ? "on":"off";
            en2 = $("input[name='video_analysis.object_counting.line.2.enable']").is(":checked") == true ? "on":"off";
            en3 = $("input[name='video_analysis.object_counting.line.3.enable']").is(":checked") == true ? "on":"off";
            $.fn.UpdateObjectInfor(en1, cord1, dire1, en2, cord2, dire2, en3, cord3, dire3);
        };

        for(var i = 1; i <= line_max; i++){
            $("body").on("click", "#Ievent_line_counting_line_zone_"+i, function(){
                var id = $(this).attr("id")
                , _num = id.match(/\d\d/g) == null ? id.match(/\d/g) : id.match(/\d\d/g)
                , tmp = $("input[name='video_analysis.object_counting.line."+_num+".coordinate']").val()
                , data = tmp == undefined ? "0,0,0,0,"+$.fn.GetStreamWidth()+"x"+$.fn.GetStreamHeight() : tmp
                , ind = data.lastIndexOf(',')
                , sys_coord = data.slice(0, ind)
                , ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0)
                ;
                $("div[conf_group='line_counting_zone']").hide();
                $("#line_counting_line_zone_"+_num+"_block").show();
                $("#Isub_line_counting .content_group > img").addClass("block_up").removeClass("block_down");
                $(this).addClass("block_down").removeClass("block_up");
                try {
                    var tmp_detect_size = ActivexPlayerObject.Get_VideoSize()
                    , coordinate = $.fn._runTransferCoordinate_Sys2uiForVideoAnalysis(data, tmp_detect_size)
                    ;
                    if(sys_coord != "0,0,0,0"){
                        if(record_coordinate[3][_num-1] != "0,0,0,0")
                            coordinate = record_coordinate[3][_num-1];
                        else
                            record_coordinate[3][_num-1] = coordinate;
                    }
                    ActivexPlayerObject.SetObjectFunction(1, $.fn.GetOrientationIndex());
                    ActivexPlayerObject.SetObjectCountingLine(""+_num+"", ""+coordinate+"", $("#Ievent_obj_counting_line_"+_num+"_direction").val());
                    ActivexPlayerObject.Select_OC_Setting_Line(""+_num+"", $("#Ievent_obj_counting_line_"+_num+"_direction").val());
                } catch(e){
                    console.log("///////////////// draw coordinate error. /////////////////");
                }
            });

            $("body").on("change", "#Ievent_obj_counting_line_"+i+"_direction", function(){
                var id = $(this).attr("id")
                , _num = id.match(/\d\d/g) == null ? id.match(/\d/g) : id.match(/\d\d/g)
                , ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0)
                ;
                try {
                    ActivexPlayerObject.Select_OC_Setting_Line(_num, $(this).val());
                } catch(e){
                    console.log("///////////////// draw coordinate error. /////////////////");
                }
                $.fn._isModified($(this));
                $.fn._runChecking("sub_line_counting");
            });
        }

        $("body").on("change", "#Ievent_obj_counting_sensitivity", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_line_counting");
        });

        $("body").on("change", "#Isub_line_counting input[type=checkbox]", function(){
            var chkbox_status = $(this).is(":checked") == true? "on":"off";
            $(this).val(chkbox_status);
            $.fn._isModified($(this));
        });
        
        $("body").on("click", "#Save_Isub_line_counting", function(){
            if($(this).attr("class") == "can_modify"){
                CollectCountingLineData();
                var cmd = $.fn._runCollectModifUAPI("Isub_line_counting");
                $.fn._runSetWithBlockUI(cmd, function(){
                    $("#Isub_line_counting .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    setTimeout($.fn._runUnBlockUI, 3000);
                    setTimeout(resetCounting, 3000);
                });
            }
        });

        $("#Ievent_line_counting_line_zone_1").click();
        var data = $("input[name='video_analysis.object_counting.line.1.coordinate']").val();
        $.fn._runInitialZone(data, "line_counting-1");
        $("#Save_Isub_line_counting").removeClass("not_modify").addClass("can_modify");
        SetupObjectCounting = true;
    };

    $.fn.initialLoitering = function()
    {
        $.fn._runInitialZone($("input[name='event.source.loitering.area']").val(), "loitering");
        $("#Save_Isub_loitering").removeClass("not_modify").addClass("can_modify");
        if(SetupLoitering)
            return true;
        var trigger_loitering_arming_sch = 0;
        var collectLoiteringSch = function(){
            for(var i = 0; i <= 6; i++){
                LoiteringSch_data[i] = [];
                for(var j = 0; j <= 2; j++){
                    LoiteringSch_data[i][j] =  $("#Iloitering_arm"+Number(i+1)+"_"+Number(j+1)+"_begin").val()+"-"+
                                            $("#Iloitering_arm"+Number(i+1)+"_"+Number(j+1)+"_end").val()+"-"+
                                            $("#Iloitering_arm"+Number(i+1)+"_"+Number(j+1)+"_enable").val();
                    }
            }

            $.fn._runAssignSch(LoiteringSch_data, "loitering");
        };

        var CollectLoiteringData = function(){
            var ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0)
            , tmp_coordinate = ActivexPlayerObject.GetLoiteringArea()
            , tmp_detect_size = ActivexPlayerObject.Get_VideoSize()
            , search_ind
            , coordinate
            ;
            if(tmp_coordinate == "")
                coordinate = "0,0,"+$.fn.GetStreamWidth()+"x"+$.fn.GetStreamHeight();
            else
            {
                coordinate = $.fn._runTransferCoordinate_ui2SysForVideoAnalysis(tmp_coordinate, tmp_detect_size);
                if(record_coordinate[4][0] == "0,0"){
                    record_coordinate[4][0] = tmp_coordinate;
                } else {
                    if(record_coordinate[4][0] != tmp_coordinate)
                        record_coordinate[4][0] = tmp_coordinate;
                }
            }
            $("input[type=text][name='event.source.loitering.area']").val(coordinate).addClass("modify");
            var en = $("input[type=checkbox][name='event.source.loitering.enable']").is(":checked") == true? "on":"off";
            $.fn.UpdateLoiteringArea(coordinate, en);
        };

        var updateLoiteringSch = function(){
            var tmp = "";
            var upcmd = function(id, db){
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
                        collectLoiteringSch();
                    }
                });
            };
            $("#Iadd_loitering_sch input").each(function(){
                if($(this).attr("name") != undefined)
                    tmp += "\""+$(this).attr("name")+"\":\"\",";
            });
            tmp = "{"+tmp.slice(0, tmp.length-1)+"}";
            var db = $.parseJSON(tmp);
            upcmd("Iadd_loitering_sch", db);
        };

        $("body").on("click", "#Imodify_loitering_schedule", function(){
            trigger_loitering_arming_sch = 0;
            $.blockUI({
                message:'<div>'+$.fn._runGenSchSetting(LoiteringSch_data, "loitering")+'</div>',
                css:{
                    width:'600px',
                    height:'650px',
                    top:'5%',
                    position:'absolute',
                    backgroundColor:"rgb(255,255,255)",
                    cursor:'text'
                },
                overlayCSS:{
                    opacity:0.95,
                    cursor:'text'
                },
                forceIframe: true
            });

            $("body").on("keyup change", "#Isch_table input[type=text]", function(){
                if(!($(this).val()).match(Time_regex_without_sec))
                    $(this).addClass("invalid_modify").removeClass("modify");
                else
                {
                    $(this).removeClass("invalid_modify");
                    $.fn._isModified($(this));
                }
                
                $.fn._runCheckingSch();
            });

            $("body").on("change", "#Isch_table input[type=checkbox]", function(){
                var chkbox_status = $(this).is(":checked") == true? "on":"off";
                $(this).val(chkbox_status);
                $.fn._isModified($(this));
                $.fn._runCheckingSch();
            });

            $("body").on("click", "#Isch_setting", function(){
                if(trigger_loitering_arming_sch == 0){
                    if($(this).attr("class") == "can_modify"){
                        trigger_loitering_arming_sch = 1;
                        var cmd = $.fn._runCollectModifUAPI("Isch_table");
                        $.fn._runSetWithBlockUI(cmd, function(){
                            $("#Isch_table .modify").each(function(){
                                $(this).removeClass("modify");
                            });
                            $("#Isch_setting").removeClass("can_modify").addClass("not_modify");
                            setTimeout($.fn._runUnBlockUI, 3000);
                            setTimeout(updateLoiteringSch, 2000);
                        });
                    }
                }
            });

            $("body").on("click", "#Isch_cancel", function(){
                if($(this).attr("class") == "can_modify"){
                    $.fn._runUnBlockUI();
                }
            });
        });

        $("div[conf='sub_loitering'] div.slider").each(function(){
            var Sid = $(this).attr("id")
            , Iid = $(this).siblings("input").attr("id")
            ;
            $.fn._initializeSilderCtrl(Sid, Iid, $(this).attr("_max"), $(this).attr("_min"), $(this).attr("_step"), "inactive", "sub_loitering");
            $("#"+Iid).change();
        });
        
        $("body").on("change keyup", "#Isub_loitering input[type=text]", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_loitering");
        });

        $("body").on("change keyup", "#Isub_loitering textarea", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_loitering");
        });

        $("body").on("change", "#Isub_loitering input[type=checkbox]", function(){
            var chkbox_status = $(this).is(":checked") == true? "on":"off";
            $(this).val(chkbox_status);
            $.fn._isModified($(this));
            $.fn._runChecking("sub_loitering");
        });

        $("body").on("change", "#Isub_loitering select", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_loitering");
        });

        $("body").on("click", "#Save_Isub_loitering", function(){
            if($(this).attr("class") == "can_modify"){
                CollectLoiteringData();
                var cmd = $.fn._runCollectModifUAPI("Isub_loitering");
                $.fn._runSetWithBlockUI(cmd, function(){
                    $("#Isub_loitering .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    setTimeout($.fn._runUnBlockUI, 3000);
                    setTimeout(function(){
                        $.fn._runInitialZone($("input[name='event.source.loitering.area']").val(), "loitering");
                    }, 3000);
                });
            }
        }); 

        $.fn._runGenSch("loitering");
        collectLoiteringSch();
        $("#Save_Isub_loitering").removeClass("not_modify").addClass("can_modify");
        SetupLoitering = true;
    };

    var resetLineCrossing = function(){
        var line = 3;
        for(var i = 1; i <= line; i++)
        {
            // update line crossing line infomation.
            var tmp = $("input[name='event.source.line_crossing.line."+i+".coordinate']").val() 
            $.fn._runInitialZone(tmp, "border_line-"+i);
        }
        record_coordinate[6] = ["0,0,0,0", "0,0,0,0", "0,0,0,0"];
        var tmp_id = $("#Isub_border_line .content_group > img.block_down").attr("id");
        if(tmp_id != undefined){
            if(line != 1){
                var Num = tmp_id.match(/\d\d/g) == null ? tmp_id.match(/\d/g) : tmp_id.match(/\d\d/g)
                , data = $("input[name='event.source.line_crossing.line."+Num+".coordinate']").val();
                $.fn._runInitialZone(data, "border_line-"+Num);
            }
        }
    };

    $.fn.initialLineCrossing = function()
    {
        var trigger_border_line_arming_sch = 0;
        resetLineCrossing();
        record_coordinate[6] = ["0,0,0,0", "0,0,0,0", "0,0,0,0"];
        $("#Isub_border_line .content_group > img.block_down").click();
        $("#Save_Isub_border_line").removeClass("not_modify").addClass("can_modify");
        if(SetupLineCrossing)
            return true;
        var collectLineCrossingSch = function(){
            for(var i = 0; i <= 6; i++){
                LineCrossingSch_data[i] = [];
                for(var j = 0; j <= 2; j++){
                    LineCrossingSch_data[i][j] =  $("#Iborder_line_arm"+Number(i+1)+"_"+Number(j+1)+"_begin").val()+"-"+
                                            $("#Iborder_line_arm"+Number(i+1)+"_"+Number(j+1)+"_end").val()+"-"+
                                            $("#Iborder_line_arm"+Number(i+1)+"_"+Number(j+1)+"_enable").val();
                    }
            }
            $.fn._runAssignSch(LineCrossingSch_data, "border_line");
        };

        var updateLineCrossingSch = function(){
            var tmp = "";
            var upcmd = function(id, db){
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
                        collectLineCrossingSch();
                    }
                });
            };
            $("#Iadd_border_line_sch input").each(function(){
                if($(this).attr("name") != undefined)
                    tmp += "\""+$(this).attr("name")+"\":\"\",";
            });
            tmp = "{"+tmp.slice(0, tmp.length-1)+"}";
            var db = $.parseJSON(tmp);
            upcmd("Iadd_border_line_sch", db);
        };

        var updateLineCrossingZone = function(){
            var tmp = "";
            tmp += "\"event.source.line_crossing.line.1.coordinate\":\"\",";
            tmp += "\"event.source.line_crossing.line.2.coordinate\":\"\",";
            tmp += "\"event.source.line_crossing.line.3.coordinate\":\"\",";
            var db = $.parseJSON("{"+tmp+"}");
            $.ajax({
                beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
                url:'/cgi-bin/get?',
                dataType:'json',
                type:'POST',
                data:db,
                cache:false,
                success:function(data){
                    $.fn.ParserDate("Isub_border_line", data);
                },
                complete:function(){
                    $.removeCookie('ipcamera', { path: '/' });
                }
            });
        };

        var CollectLineCrossingData = function(){
            var ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0)
            , tmp = ActivexPlayerObject.Get_Setting_LC_Line_Info()
            , tmp_detect_size = ActivexPlayerObject.Get_VideoSize()
            , line_info = tmp.split('/')
            , search_ind
            , coordinate
            , cord1 , cord2 , cord3
            , dire1 , dire2 , dire3
            , en1, en2, en3
            , platform = $.fn.GetPlatForm();
            ;

            $.each(line_info, function(i){
                search_ind = line_info[i].lastIndexOf(',');
                coordinate = $.fn._runTransferCoordinate_ui2SysForVideoAnalysis(line_info[i].slice(0, search_ind), tmp_detect_size);
                if(record_coordinate[6][i] == "0,0,0,0"){
                    record_coordinate[6][i] = line_info[i].slice(0, search_ind);
                } else {
                    if(record_coordinate[6][i] != line_info[i].slice(0, search_ind)){
                        record_coordinate[6][i] = line_info[i].slice(0, search_ind);
                    }
                }
                if(line_info[i].slice(0, search_ind) == "0,0,0,0")
                    $("input[name='event.source.line_crossing.line."+Number(i+1)+".coordinate']").val("0,0,0,0,"+$.fn.GetStreamWidth()+"x"+$.fn.GetStreamHeight()).addClass("modify");
                else
                    $("input[name='event.source.line_crossing.line."+Number(i+1)+".coordinate']").val(coordinate).addClass("modify");
            });
            cord1 = $("input[name='event.source.line_crossing.line.1.coordinate']").val();
            cord2 = $("input[name='event.source.line_crossing.line.2.coordinate']").val();
            cord3 = $("input[name='event.source.line_crossing.line.3.coordinate']").val();
            dire1 = $("#Iborder_line_1_direction").val();
            dire2 = $("#Iborder_line_2_direction").val();
            dire3 = $("#Iborder_line_3_direction").val();
            en1 = $("input[name='event.source.line_crossing.line.1.enable']").is(":checked") == true ? "on":"off";
            en2 = $("input[name='event.source.line_crossing.line.2.enable']").is(":checked") == true ? "on":"off";
            en3 = $("input[name='event.source.line_crossing.line.3.enable']").is(":checked") == true ? "on":"off";
            $.fn.UpdateLineCrossingArea(en1, cord1, dire1, en2, cord2, dire2, en3, cord3, dire3);
        };

        for(var i = 1; i <= 3; i++){
            $("body").on("click", "#Iborder_line_"+i, function(){
                var id = $(this).attr("id")
                , _num = id.match(/\d\d/g) == null ? id.match(/\d/g) : id.match(/\d\d/g)
                , tmp = $("input[name='event.source.line_crossing.line."+_num+".coordinate']").val()
                , data = tmp == undefined ? "0,0,0,0,"+$.fn.GetStreamWidth()+"x"+$.fn.GetStreamHeight() : tmp
                , ind = data.lastIndexOf(',')
                , sys_coord = data.slice(0, ind)
                , ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0)
                ;
                $("div[conf_group='border_line']").hide();
                $("#border_line_"+_num+"_block").show();
                $("#Isub_border_line .content_group > img").addClass("block_up").removeClass("block_down");
                $(this).addClass("block_down").removeClass("block_up");
                try {
                    var tmp_detect_size = ActivexPlayerObject.Get_VideoSize()
                    , coordinate = $.fn._runTransferCoordinate_Sys2ui(data, tmp_detect_size)
                    ;
                    if(sys_coord != "0,0,0,0"){
                        if(record_coordinate[6][_num-1] != "0,0,0,0")
                            coordinate = record_coordinate[6][_num-1];
                         else
                            record_coordinate[6][_num-1] = coordinate;
                    }
                    ActivexPlayerObject.SetObjectFunction(3, $.fn.GetOrientationIndex());
                    ActivexPlayerObject.SetLineCrossingLine(""+_num+"", ""+coordinate+"", $("#Iborder_line_"+_num+"_direction").val());
                    ActivexPlayerObject.Select_LC_Setting_Line(""+_num+"", $("#Iborder_line_"+_num+"_direction").val());
                } catch(e){
                    console.log("///////////////// draw coordinate error. /////////////////");
                }
            });

            $("body").on("change", "#Iborder_line_"+i+"_direction", function(){
                var id = $(this).attr("id")
                , _num = id.match(/\d\d/g) == null ? id.match(/\d/g) : id.match(/\d\d/g)
                , ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0)
                ;
                try {
                    ActivexPlayerObject.Select_LC_Setting_Line(_num, $(this).val());
                } catch(e){
                    console.log("///////////////// draw coordinate error. /////////////////");
                }
                $.fn._isModified($(this));
                $.fn._runChecking("sub_border_line");
            });
        }

        $("body").on("click", "#Imodify_border_line_schedule", function(){
            trigger_border_line_arming_sch = 0;
            $.blockUI({
                message:'<div>'+$.fn._runGenSchSetting(LineCrossingSch_data, "border_line")+'</div>',
                css:{
                    width:'600px',
                    height:'650px',
                    top:'5%',
                    position:'absolute',
                    backgroundColor:"rgb(255,255,255)",
                    cursor:'text'
                },
                overlayCSS:{
                    opacity:0.95,
                    cursor:'text'
                },
                forceIframe: true
            });

            $("body").on("keyup change", "#Isch_table input[type=text]", function(){
                if(!($(this).val()).match(Time_regex_without_sec))
                    $(this).addClass("invalid_modify").removeClass("modify");
                else
                {
                    $(this).removeClass("invalid_modify");
                    $.fn._isModified($(this));
                }
                
                $.fn._runCheckingSch();
            });

            $("body").on("change", "#Isch_table input[type=checkbox]", function(){
                var chkbox_status = $(this).is(":checked") == true? "on":"off";
                $(this).val(chkbox_status);
                $.fn._isModified($(this));
                $.fn._runCheckingSch();
            });

            $("body").on("click", "#Isch_setting", function(){
                if(trigger_border_line_arming_sch == 0){
                    if($(this).attr("class") == "can_modify"){
                        trigger_border_line_arming_sch = 1;
                        var cmd = $.fn._runCollectModifUAPI("Isch_table");
                        $.fn._runSetWithBlockUI(cmd, function(){
                            $("#Isch_table .modify").each(function(){
                                $(this).removeClass("modify");
                            });
                            $("#Isch_setting").removeClass("can_modify").addClass("not_modify");
                            setTimeout($.fn._runUnBlockUI, 3000);
                            setTimeout(updateLineCrossingSch, 2000);
                        });
                    }
                }
            });

            $("body").on("click", "#Isch_cancel", function(){
                if($(this).attr("class") == "can_modify"){
                    $.fn._runUnBlockUI();
                }
            });
        });

        $("body").on("change keyup", "#Isub_border_line input[type=text]", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_border_line");
        });

        $("body").on("change keyup", "#Isub_border_line textarea", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_border_line");
        });

        $("body").on("change", "#Isub_border_line input[type=checkbox]", function(){
            var chkbox_status = $(this).is(":checked") == true? "on":"off";
            $(this).val(chkbox_status);
            $.fn._isModified($(this));
            $.fn._runChecking("sub_border_line");
        });

        $("body").on("change", "#Isub_border_line select", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_border_line");
        });

        $("body").on("click", "#Save_Isub_border_line", function(){
            if($(this).attr("class") == "can_modify"){
                CollectLineCrossingData();
                var cmd = $.fn._runCollectModifUAPI("Isub_border_line");
                $.fn._runSetWithBlockUI(cmd, function(){
                    $("#Isub_border_line .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    setTimeout($.fn._runUnBlockUI, 3000);
                    setTimeout(resetLineCrossing, 3000);
                });
            }
        }); 
        
        $.fn._runGenSch("border_line");
        collectLineCrossingSch();
        $("#Iborder_line_1").click();
        var data = $("input[name='event.source.line_crossing.line.1.coordinate']").val();
        $.fn._runInitialZone(data, "border_line-1");
        $("#Save_Isub_border_line").removeClass("not_modify").addClass("can_modify");
        SetupLineCrossing = true;
    };

    $.fn.initialWithDrawn = function()
    {
        var trigger_withdrawn_arming_sch = 0;
        var tmp_id = $("#Isub_withdrawn .content_group > img.block_down").attr("id");
        if(tmp_id != undefined){
            var Num = tmp_id.match(/\d\d/g) == null ? tmp_id.match(/\d/g) : tmp_id.match(/\d\d/g)
            , data = $("input[name='event.source.withdrawn.zone."+Num+".coordinate']").val();
            $.fn._runInitialZone(data, "withdrawn");
        }
        $("#Save_Isub_withdrawn").removeClass("not_modify").addClass("can_modify");
        $("#Isub_withdrawn .content_group > img.block_down").click();
        if(SetupWithDrawn)
            return true;
        var collectWithDrawnSch = function(){
            for(var i = 0; i <= 6; i++){
                WithDrawnSch_data[i] = [];
                for(var j = 0; j <= 2; j++){
                    WithDrawnSch_data[i][j] =  $("#Iwithdrawn_arm"+Number(i+1)+"_"+Number(j+1)+"_begin").val()+"-"+
                                            $("#Iwithdrawn_arm"+Number(i+1)+"_"+Number(j+1)+"_end").val()+"-"+
                                            $("#Iwithdrawn_arm"+Number(i+1)+"_"+Number(j+1)+"_enable").val();
                    }
            }
            $.fn._runAssignSch(WithDrawnSch_data, "withdrawn");
        };

        var updateWithDrawnSch = function(){
            var tmp = "";
            var upcmd = function(id, db){
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
                        collectWithDrawnSch();
                    }
                });
            };
            $("#Iadd_withdrawn_sch input").each(function(){
                if($(this).attr("name") != undefined)
                    tmp += "\""+$(this).attr("name")+"\":\"\",";
            });
            tmp = "{"+tmp.slice(0, tmp.length-1)+"}";
            var db = $.parseJSON(tmp);
            upcmd("Iadd_withdrawn_sch", db);
        };

        var updateWithDrawnZone = function(){
            var tmp = "";
            tmp += "\"event.source.withdrawn.zone.1.coordinate\":\"\",";
            tmp += "\"event.source.withdrawn.zone.2.coordinate\":\"\",";
            tmp += "\"event.source.withdrawn.zone.3.coordinate\":\"\",";
            var db = $.parseJSON("{"+tmp+"}");
            $.ajax({
                beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
                url:'/cgi-bin/get?',
                dataType:'json',
                type:'POST',
                data:db,
                cache:false,
                success:function(data){
                    $.fn.ParserDate("Isub_withdrawn", data);
                },
                complete:function(){
                    $.removeCookie('ipcamera', { path: '/' });
                }
            });
        };

        var checkingWithdrawnArea = function(){
            var id = $("#Isub_withdrawn .content_group > img.block_down").attr("id")
            , _num = id.match(/\d\d/g) == null ? id.match(/\d/g) : id.match(/\d\d/g)
            , Zone = $.fn._runGetZone("withdrawn", _num)
            , ind = Zone.lastIndexOf(',')
            , coordinate = Zone.slice(0, ind)
            , en1, en2, en3
            , cord1 , cord2 , cord3
            ;
            if(coordinate != "0,0,0,0"){
                $("input[type=text][name='event.source.withdrawn.zone."+_num+".coordinate']").val(Zone).addClass("modify");
            }
            cord1 = $("input[name='event.source.withdrawn.zone.1.coordinate']").val();
            cord2 = $("input[name='event.source.withdrawn.zone.2.coordinate']").val();
            cord3 = $("input[name='event.source.withdrawn.zone.3.coordinate']").val();
            en1 = $("input[name='event.source.withdrawn.zone.1.enable']").is(":checked") == true ? "on":"off";
            en2 = $("input[name='event.source.withdrawn.zone.2.enable']").is(":checked") == true ? "on":"off";
            en3 = $("input[name='event.source.withdrawn.zone.3.enable']").is(":checked") == true ? "on":"off";
            $.fn.UpdateWithDrawnArea(en1, cord1, en2, cord2, en3, cord3);
        };

        for(var i = 1; i <= 3; i++){
            $("body").on("click", "#Iwithdrawn_"+i, function(){
                var id = $(this).attr("id")
                , _num = id.match(/\d\d/g) == null ? id.match(/\d/g) : id.match(/\d\d/g)
                , tmp = $("input[name='event.source.withdrawn.zone."+_num+".coordinate']").val()
                , data = tmp == undefined ? "0,0,0,0,"+$.fn.GetStreamWidth()+"x"+$.fn.GetStreamHeight() : tmp
                , ind = data.lastIndexOf(',')
                , sys_coord = data.slice(0, ind)
                , ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0)
                ;
                $("div[conf_group='withdrawn']").hide();
                $("#withdrawn_"+_num+"_block").show();
                $("#Isub_withdrawn .content_group > img").addClass("block_up").removeClass("block_down");
                $(this).addClass("block_down").removeClass("block_up");
                try {
                    var tmp_detect_size = ActivexPlayerObject.Get_VideoSize()
                    , coordinate = $.fn._runTransferCoordinate_Sys2ui(data, tmp_detect_size)
                    ;
                    if(coordinate == "NaN,NaN,NaN,NaN")
                        return false;
                    if(sys_coord != "0,0,0,0"){
                        if(record_coordinate[9][_num-1] != "0,0,0,0")
                            coordinate = record_coordinate[9][_num-1];
                         else
                            record_coordinate[9][_num-1] = coordinate;
                    }
                    ActivexPlayerObject.Start_Cropping(1);
                    ActivexPlayerObject.Set_CropPoint(""+coordinate+"");
                } catch(e){
                    console.log("///////////////// draw coordinate error. /////////////////");
                }
            });

            $("body").on("change", "#Iwithdrawn_"+i+"_direction", function(){
                var id = $(this).attr("id")
                , _num = id.match(/\d\d/g) == null ? id.match(/\d/g) : id.match(/\d\d/g)
                , ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0)
                ;
                try {
                    ActivexPlayerObject.Select_LC_Setting_Line(_num, $(this).val());
                } catch(e){
                    console.log("///////////////// draw coordinate error. /////////////////");
                }
                $.fn._isModified($(this));
                $.fn._runChecking("sub_withdrawn");
            });
        }

        $("body").on("click", "#Imodify_withdrawn_schedule", function(){
            trigger_withdrawn_arming_sch = 0;
            $.blockUI({
                message:'<div>'+$.fn._runGenSchSetting(WithDrawnSch_data, "withdrawn")+'</div>',
                css:{
                    width:'600px',
                    height:'650px',
                    top:'5%',
                    position:'absolute',
                    backgroundColor:"rgb(255,255,255)",
                    cursor:'text'
                },
                overlayCSS:{
                    opacity:0.95,
                    cursor:'text'
                },
                forceIframe: true
            });

            $("body").on("keyup change", "#Isch_table input[type=text]", function(){
                if(!($(this).val()).match(Time_regex_without_sec))
                    $(this).addClass("invalid_modify").removeClass("modify");
                else
                {
                    $(this).removeClass("invalid_modify");
                    $.fn._isModified($(this));
                }
                
                $.fn._runCheckingSch();
            });

            $("body").on("change", "#Isch_table input[type=checkbox]", function(){
                var chkbox_status = $(this).is(":checked") == true? "on":"off";
                $(this).val(chkbox_status);
                $.fn._isModified($(this));
                $.fn._runCheckingSch();
            });

            $("body").on("click", "#Isch_setting", function(){
                if(trigger_withdrawn_arming_sch == 0){
                    if($(this).attr("class") == "can_modify"){
                        trigger_withdrawn_arming_sch = 1;
                        var cmd = $.fn._runCollectModifUAPI("Isch_table");
                        $.fn._runSetWithBlockUI(cmd, function(){
                            $("#Isch_table .modify").each(function(){
                                $(this).removeClass("modify");
                            });
                            $("#Isch_setting").removeClass("can_modify").addClass("not_modify");
                            setTimeout($.fn._runUnBlockUI, 3000);
                            setTimeout(updateWithDrawnSch, 2000);
                        });
                    }
                }
            });

            $("body").on("click", "#Isch_cancel", function(){
                if($(this).attr("class") == "can_modify"){
                    $.fn._runUnBlockUI();
                }
            });
        });

        $("body").on("change keyup", "#Isub_withdrawn input[type=text]", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_withdrawn");
        });

        $("body").on("change keyup", "#Isub_withdrawn textarea", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_withdrawn");
        });

        $("body").on("change", "#Isub_withdrawn input[type=checkbox]", function(){
            var chkbox_status = $(this).is(":checked") == true? "on":"off";
            $(this).val(chkbox_status);
            $.fn._isModified($(this));
            $.fn._runChecking("sub_withdrawn");
        });

        $("body").on("change", "#Isub_withdrawn select", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_withdrawn");
        });

        $("div[conf='sub_withdrawn'] div.slider").each(function(){
            var Sid = $(this).attr("id")
            , Iid = $(this).siblings("input").attr("id")
            ;
            $.fn._initializeSilderCtrlforActivex(Sid, Iid, $(this).attr("_max"), $(this).attr("_min"), $(this).attr("_step"), "sub_withdrawn");
            $("#"+Iid).change();
        });

        $("body").on("click", "#Save_Isub_withdrawn", function(){
            if($(this).attr("class") == "can_modify"){
                checkingWithdrawnArea();
                var cmd = $.fn._runCollectModifUAPI("Isub_withdrawn");
                $.fn._runSetWithBlockUI(cmd, function(){
                    $("#Isub_withdrawn .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    
                    setTimeout($.fn._runUnBlockUI, 3000);
                });
            }
        }); 
        
        $.fn._runGenSch("withdrawn");
        collectWithDrawnSch();
        $("#Iwithdrawn_1").click();
        var data = $("input[name='event.source.withdrawn.zone.1.coordinate']").val();
        $.fn._runInitialZone(data, "withdrawn");
        $("#Save_Isub_withdrawn").removeClass("not_modify").addClass("can_modify");
        SetupWithDrawn = true;
    };

    $.fn.initialIntrusion = function()
    {
        $.fn._runInitialZone($("input[name='event.source.intrusion.area']").val(), "intrusion");
        $("#Save_Isub_intrusion").removeClass("not_modify").addClass("can_modify");
        if(SetupIntrusion)
            return true;
        var trigger_intrusion_arming_sch = 0;
        var collectIntrusionSch = function(){
            for(var i = 0; i <= 6; i++){
                IntrusionSch_data[i] = [];
                for(var j = 0; j <= 2; j++){
                    IntrusionSch_data[i][j] =  $("#Iintrusion_arm"+Number(i+1)+"_"+Number(j+1)+"_begin").val()+"-"+
                                            $("#Iintrusion_arm"+Number(i+1)+"_"+Number(j+1)+"_end").val()+"-"+
                                            $("#Iintrusion_arm"+Number(i+1)+"_"+Number(j+1)+"_enable").val();
                    }
            }

            $.fn._runAssignSch(IntrusionSch_data, "intrusion");
        };

        var CollectIntrusionData = function(){
            var ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0)
            , tmp_coordinate = ActivexPlayerObject.GetIntrusionArea()
            , tmp_detect_size = ActivexPlayerObject.Get_VideoSize()
            , search_ind
            , coordinate
            ;
            if(tmp_coordinate == "")
                coordinate = "0,0,"+$.fn.GetStreamWidth()+"x"+$.fn.GetStreamHeight();
            else
            {
                coordinate = $.fn._runTransferCoordinate_ui2SysForVideoAnalysis(tmp_coordinate, tmp_detect_size);
                if(record_coordinate[5][0] == "0,0"){
                    record_coordinate[5][0] = tmp_coordinate;
                } else {
                    if(record_coordinate[5][0] != tmp_coordinate)
                        record_coordinate[5][0] = tmp_coordinate;
                }
            }
            $("input[type=text][name='event.source.intrusion.area']").val(coordinate).addClass("modify");
            var en = $("input[type=checkbox][name='event.source.intrusion.enable']").is(":checked") == true? "on":"off";
            $.fn.UpdateIntrusionArea(coordinate, en);
        };

        var updateIntrusionSch = function(){
            var tmp = "";
            var upcmd = function(id, db){
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
                        collectIntrusionSch();
                    }
                });
            };
            $("#Iadd_intrusion_sch input").each(function(){
                if($(this).attr("name") != undefined)
                    tmp += "\""+$(this).attr("name")+"\":\"\",";
            });
            tmp = "{"+tmp.slice(0, tmp.length-1)+"}";
            var db = $.parseJSON(tmp);
            upcmd("Iadd_intrusion_sch", db);
        };

        $("body").on("click", "#Imodify_intrusion_schedule", function(){
            trigger_intrusion_arming_sch = 0;
            $.blockUI({
                message:'<div>'+$.fn._runGenSchSetting(IntrusionSch_data, "intrusion")+'</div>',
                css:{
                    width:'600px',
                    height:'650px',
                    top:'5%',
                    position:'absolute',
                    backgroundColor:"rgb(255,255,255)",
                    cursor:'text'
                },
                overlayCSS:{
                    opacity:0.95,
                    cursor:'text'
                },
                forceIframe: true
            });

            $("body").on("keyup change", "#Isch_table input[type=text]", function(){
                if(!($(this).val()).match(Time_regex_without_sec))
                    $(this).addClass("invalid_modify").removeClass("modify");
                else
                {
                    $(this).removeClass("invalid_modify");
                    $.fn._isModified($(this));
                }
                
                $.fn._runCheckingSch();
            });

            $("body").on("change", "#Isch_table input[type=checkbox]", function(){
                var chkbox_status = $(this).is(":checked") == true? "on":"off";
                $(this).val(chkbox_status);
                $.fn._isModified($(this));
                $.fn._runCheckingSch();
            });

            $("body").on("click", "#Isch_setting", function(){
                if(trigger_intrusion_arming_sch == 0){
                    if($(this).attr("class") == "can_modify"){
                        trigger_intrusion_arming_sch = 1;
                        var cmd = $.fn._runCollectModifUAPI("Isch_table");
                        $.fn._runSetWithBlockUI(cmd, function(){
                            $("#Isch_table .modify").each(function(){
                                $(this).removeClass("modify");
                            });
                            $("#Isch_setting").removeClass("can_modify").addClass("not_modify");
                            setTimeout($.fn._runUnBlockUI, 3000);
                            setTimeout(updateIntrusionSch, 2000);
                        });
                    }
                }
            });

            $("body").on("click", "#Isch_cancel", function(){
                if($(this).attr("class") == "can_modify"){
                    $.fn._runUnBlockUI();
                }
            });
        });
        
        $("body").on("change keyup", "#Isub_intrusion input[type=text]", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_intrusion");
        });

        $("body").on("change keyup", "#Isub_intrusion textarea", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_intrusion");
        });

        $("body").on("change", "#Isub_intrusion input[type=checkbox]", function(){
            var chkbox_status = $(this).is(":checked") == true? "on":"off";
            $(this).val(chkbox_status);
            $.fn._isModified($(this));
            $.fn._runChecking("sub_intrusion");
        });

        $("body").on("change", "#Isub_intrusion select", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_intrusion");
        });

        $("body").on("click", "#Save_Isub_intrusion", function(){
            if($(this).attr("class") == "can_modify"){
                CollectIntrusionData();
                var cmd = $.fn._runCollectModifUAPI("Isub_intrusion");
                $.fn._runSetWithBlockUI(cmd, function(){
                    $("#Isub_intrusion .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    setTimeout($.fn._runUnBlockUI, 3000);
                    setTimeout(function(){
                        $.fn._runInitialZone($("input[name='event.source.intrusion.area']").val(), "intrusion");
                    }, 3000);
                });
            }
        }); 

        $.fn._runGenSch("intrusion");
        collectIntrusionSch();
        $("#Save_Isub_intrusion").removeClass("not_modify").addClass("can_modify");
        SetupIntrusion = true;
    };

    $.fn.initialAreaCounting = function()
    {
        $.fn._runInitialZone($("input[name='video_analysis.area_counting.area']").val(), "area_counting");
        $("#Save_Isub_area_counting").removeClass("not_modify").addClass("can_modify");
        if(SetupAreaCounting)
            return true;

        var CollectAreaCountingData = function(){
            var ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0)
            , tmp_coordinate = ActivexPlayerObject.GetAreaCountingArea()
            , tmp_detect_size = ActivexPlayerObject.Get_VideoSize()
            , search_ind
            , coordinate
            , x = $("#Ivideo_area_counting_count_location_x").val()
            , y = $("#Ivideo_area_counting_count_location_y").val()
            ;
            if(tmp_coordinate == "")
                coordinate = "0,0,"+$.fn.GetStreamWidth()+"x"+$.fn.GetStreamHeight();
            else
            {
                coordinate = $.fn._runTransferCoordinate_ui2SysForVideoAnalysis(tmp_coordinate, tmp_detect_size);
                if(record_coordinate[7][0] == "0,0"){
                    record_coordinate[7][0] = tmp_coordinate;
                } else {
                    if(record_coordinate[7][0] != tmp_coordinate)
                        record_coordinate[7][0] = tmp_coordinate;
                }
            }
            $("input[type=text][name='video_analysis.area_counting.area']").val(coordinate).addClass("modify");
            var en = $("input[type=checkbox][name='video_analysis.area_counting.enable']").is(":checked") == true? "on":"off";
            $.fn.UpdateAreaCounting(coordinate, en, x, y);
        };

        $("body").on("change", "#Isub_area_counting input[type=checkbox]", function(){
            var chkbox_status = $(this).is(":checked") == true? "on":"off";
            $(this).val(chkbox_status);
            $.fn._isModified($(this));
            $.fn._runChecking("sub_area_counting");
        });

        $("div[conf='sub_area_counting'] div.slider").each(function(){
            var Sid = $(this).attr("id")
            , Iid = $(this).siblings("input").attr("id")
            ;
            $.fn._initializeSilderCtrlforActivex(Sid, Iid, $(this).attr("_max"), $(this).attr("_min"), $(this).attr("_step"), "sub_area_counting");
            $("#"+Iid).change();
        });

        $("body").on("click", "#Save_Isub_area_counting", function(){
            if($(this).attr("class") == "can_modify"){
                CollectAreaCountingData();
                var cmd = $.fn._runCollectModifUAPI("Isub_area_counting");
                $.fn._runSetWithBlockUI(cmd, function(){
                    $("#Isub_area_counting .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    setTimeout($.fn._runUnBlockUI, 3000);
                    setTimeout(function(){
                        $.fn._runInitialZone($("input[name='video_analysis.area_counting.area']").val(), "area_counting");
                    }, 3000);
                });
            }
        });

        $("#Save_Isub_area_counting").removeClass("not_modify").addClass("can_modify");
        SetupAreaCounting = true;
    };

    $.fn.initialDeparture = function()
    {
        $.fn._runInitialZone($("input[name='event.source.departure.area']").val(), "departure");
        $("ul.tabs").scroll();
        $("#Save_Isub_departure").removeClass("not_modify").addClass("can_modify");
        if(SetupDeparture)
            return true;
        var trigger_departure_arming_sch = 0;
        var collectDepartureSch = function(){
            for(var i = 0; i <= 6; i++){
                DepartureSch_data[i] = [];
                for(var j = 0; j <= 2; j++){
                    DepartureSch_data[i][j] =  $("#Ideparture_arm"+Number(i+1)+"_"+Number(j+1)+"_begin").val()+"-"+
                                            $("#Ideparture_arm"+Number(i+1)+"_"+Number(j+1)+"_end").val()+"-"+
                                            $("#Ideparture_arm"+Number(i+1)+"_"+Number(j+1)+"_enable").val();
                    }
            }

            $.fn._runAssignSch(DepartureSch_data, "departure");
        };

        var CollectDepartureData = function(){
            var ActivexPlayerObject = $.fn.DetectBrowser() == "msie" ? $("#VideoPlugin").get(0) : $("embed[name=VideoPlugin]").get(0)
            , tmp_coordinate = ActivexPlayerObject.GetDepartureArea()
            , tmp_detect_size = ActivexPlayerObject.Get_VideoSize()
            , search_ind
            , coordinate
            ;
            if(tmp_coordinate == "")
                coordinate = "0,0,"+$.fn.GetStreamWidth()+"x"+$.fn.GetStreamHeight();
            else
            {
                coordinate = $.fn._runTransferCoordinate_ui2SysForVideoAnalysis(tmp_coordinate, tmp_detect_size);
                if(record_coordinate[8][0] == "0,0"){
                    record_coordinate[8][0] = tmp_coordinate;
                } else {
                    if(record_coordinate[8][0] != tmp_coordinate)
                        record_coordinate[8][0] = tmp_coordinate;
                }
            }
            $("input[type=text][name='event.source.departure.area']").val(coordinate).addClass("modify");
            var en = $("input[type=checkbox][name='event.source.departure.enable']").is(":checked") == true? "on":"off";
            $.fn.UpdateDeparture(coordinate, en);
        };

        var updateDepartureSch = function(){
            var tmp = "";
            var upcmd = function(id, db){
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
                        collectDepartureSch();
                    }
                });
            };
            $("#Iadd_departure_sch input").each(function(){
                if($(this).attr("name") != undefined)
                    tmp += "\""+$(this).attr("name")+"\":\"\",";
            });
            tmp = "{"+tmp.slice(0, tmp.length-1)+"}";
            var db = $.parseJSON(tmp);
            upcmd("Iadd_departure_sch", db);
        };

        $("body").on("click", "#Imodify_departure_schedule", function(){
            trigger_departure_arming_sch = 0;
            $.blockUI({
                message:'<div>'+$.fn._runGenSchSetting(DepartureSch_data, "departure")+'</div>',
                css:{
                    width:'600px',
                    height:'650px',
                    top:'5%',
                    position:'absolute',
                    backgroundColor:"rgb(255,255,255)",
                    cursor:'text'
                },
                overlayCSS:{
                    opacity:0.95,
                    cursor:'text'
                },
                forceIframe: true
            });

            $("body").on("keyup change", "#Isch_table input[type=text]", function(){
                if(!($(this).val()).match(Time_regex_without_sec))
                    $(this).addClass("invalid_modify").removeClass("modify");
                else
                {
                    $(this).removeClass("invalid_modify");
                    $.fn._isModified($(this));
                }
                
                $.fn._runCheckingSch();
            });

            $("body").on("change", "#Isch_table input[type=checkbox]", function(){
                var chkbox_status = $(this).is(":checked") == true? "on":"off";
                $(this).val(chkbox_status);
                $.fn._isModified($(this));
                $.fn._runCheckingSch();
            });

            $("body").on("click", "#Isch_setting", function(){
                if(trigger_departure_arming_sch == 0){
                    if($(this).attr("class") == "can_modify"){
                        trigger_departure_arming_sch = 1;
                        var cmd = $.fn._runCollectModifUAPI("Isch_table");
                        $.fn._runSetWithBlockUI(cmd, function(){
                            $("#Isch_table .modify").each(function(){
                                $(this).removeClass("modify");
                            });
                            $("#Isch_setting").removeClass("can_modify").addClass("not_modify");
                            setTimeout($.fn._runUnBlockUI, 3000);
                            setTimeout(updateDepartureSch, 2000);
                        });
                    }
                }
            });

            $("body").on("click", "#Isch_cancel", function(){
                if($(this).attr("class") == "can_modify"){
                    $.fn._runUnBlockUI();
                }
            });
        });
        
        $("body").on("change keyup", "#Isub_departure input[type=text]", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_departure");
        });

        $("body").on("change keyup", "#Isub_departure textarea", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_departure");
        });

        $("body").on("change", "#Isub_departure input[type=checkbox]", function(){
            var chkbox_status = $(this).is(":checked") == true? "on":"off";
            $(this).val(chkbox_status);
            $.fn._isModified($(this));
            $.fn._runChecking("sub_departure");
        });

        $("body").on("change", "#Isub_departure select", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_departure");
        });

        $("body").on("click", "#Save_Isub_departure", function(){
            if($(this).attr("class") == "can_modify"){
                CollectDepartureData();
                var cmd = $.fn._runCollectModifUAPI("Isub_departure");
                $.fn._runSetWithBlockUI(cmd, function(){
                    $("#Isub_departure .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    setTimeout($.fn._runUnBlockUI, 3000);
                    setTimeout(function(){
                        $.fn._runInitialZone($("input[name='event.source.departure.area']").val(), "departure");
                    }, 3000);
                });
            }
        }); 

        $.fn._runGenSch("departure");
        collectDepartureSch();
        $("#Save_Isub_departure").removeClass("not_modify").addClass("can_modify");
        SetupDeparture = true;
    };

    $.fn.initialSdDetection = function()
    {
        $("div[conf='sub_sd_detection'] div.slider").each(function(){
            var Sid = $(this).attr("id")
            , Iid = $(this).siblings("input").attr("id")
            ;
            $.fn._initializeSilderCtrl(Sid, Iid, $(this).attr("_max"), $(this).attr("_min"), $(this).attr("_step"), "inactive", "sub_sd_detection");
            $("#"+Iid).change();
        });

        $("body").on("change keyup", "#Isub_sd_detection input[type=text]", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_sd_detection");
        });

        $("body").on("change keyup", "#Isub_sd_detection textarea", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_sd_detection");
        });

        $("body").on("change", "#Isub_sd_detection input[type=checkbox]", function(){
            var chkbox_status = $(this).is(":checked") == true? "on":"off";
            $(this).val(chkbox_status);
            $.fn._isModified($(this));
            $.fn._runChecking("sub_sd_detection");
        });

        $("body").on("change", "#Isub_sd_detection select", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_sd_detection");
        });

        $("body").on("click", "#Save_Isub_sd_detection", function(){
            if($(this).attr("class") == "can_modify"){
                var cmd = $.fn._runCollectModifUAPI("Isub_sd_detection");
                $.fn._runSetWithBlockUI(cmd, function(){
                    $("#Isub_sd_detection .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    $("#Save_Isub_sd_detection").removeClass("can_modify").addClass("not_modify");
                    setTimeout($.fn._runUnBlockUI, 3000);
                });
            }
        }); 
    };

    $.fn.initialRS485 = function()
    {
        $("body").on("change", "#Isub_rs485 select", function(){
            $.fn._isModified($(this));
            $.fn._runChecking("sub_rs485");
        });

        $("div[conf='sub_rs485'] div.slider").each(function(){
            var Sid = $(this).attr("id")
            , Iid = $(this).siblings("input").attr("id")
            ;
            $.fn._initializeSilderCtrl(Sid, Iid, $(this).attr("_max"), $(this).attr("_min"), $(this).attr("_step"), "inactive", "sub_rs485");
            $("#"+Iid).change();
        });

        $("body").on("click", "#Save_Isub_rs485", function(){
            if($(this).attr("class") == "can_modify"){
                var cmd = $.fn._runCollectModifUAPI("Isub_rs485");
                $.fn._runSetWithBlockUI(cmd, function(){
                    $("#Isub_rs485 .modify").each(function(){
                        $(this).removeClass("modify");
                    });
                    $("#Save_Isub_rs485").removeClass("can_modify").addClass("not_modify");
                    setTimeout($.fn._runUnBlockUI, 3000);
                });
            }
        });
    };

    $.fn.initialRS485Menu = function()
    {
        for(var i = 1; i <= 128 ; i++){
            $("#Irs485_preset").append($("<option></option>").attr("value", i).text(i));
        }
        
        $("body").on("change", "#Irs485_preset", function(){
            var select_ind = $(this).val();
            $.fn._runSetWithoutBlockUI("system.rs485.pt.action.goto="+select_ind);
        });

        $("body").on("click", "#Irs485_set", function(){
            var select_ind = $("#Irs485_preset").val();
            $.fn._runSetWithoutBlockUI("system.rs485.pt.action.set="+select_ind);  
        });

        $("body").on("click", "#rs485_ctrl_home", function(){
            $.fn._runSetWithoutBlockUI("system.rs485.pt.action.goto=1");
        });

        $("body").on("mousedown", "#Irs485_ctrl_area > div", function(){
            var value = "";
            if($(this).attr("id") != undefined){
                if($(this).attr("id") == "rs485_ctrl_left_up")
                    value += "-63,63";
                else if($(this).attr("id") == "rs485_ctrl_up")
                    value += "0,63";
                else if($(this).attr("id") == "rs485_ctrl_right_up")
                    value += "63,63";
                else if($(this).attr("id") == "rs485_ctrl_left")
                    value += "-63,0";
                else if($(this).attr("id") == "rs485_ctrl_right")
                    value += "63,0";
                else if($(this).attr("id") == "rs485_ctrl_left_down")
                    value += "-63,-63";
                else if($(this).attr("id") == "rs485_ctrl_down")
                    value += "-63,0";
                else if($(this).attr("id") == "rs485_ctrl_right_down")
                    value += "63,-63";
                var class_name = $(this).attr("class").split("up");
                $(this).attr("class", class_name[0]+"on "+class_name[1]);
                $.fn._runSetWithoutBlockUI("system.rs485.pt.manual.move.continuous="+value);
                rs485 = true;
            }
        });

        $("body").on("mouseup mouseleave", "#Irs485_ctrl_area > div", function(){
            if($(this).attr("id") != undefined && rs485 == true){
                var class_name = $(this).attr("class").split("on");
                $(this).attr("class", class_name[0]+"up "+class_name[1]);
                $.fn._runSetWithoutBlockUI("system.rs485.pt.manual.move.stop=0");
                rs485 = false;
            }
        });

        $("body").on("mousedown", "#Irs485_zoom_in", function(){
            if($(this).attr("id") != undefined){
                $.fn._runSetWithoutBlockUI("system.rs485.zoom.move.continuous.in=1");
                rs485 = true;
            }
        });

        $("body").on("mousedown", "#Irs485_zoom_out", function(){
            if($(this).attr("id") != undefined){
                $.fn._runSetWithoutBlockUI("system.rs485.zoom.move.continuous.out=1");
                rs485 = true;
            }
        });

        $("body").on("mouseup mouseleave", "#Irs485_zoom_in, #Irs485_zoom_out", function(){
            if($(this).attr("id") != undefined && rs485 == true){
                $.fn._runSetWithoutBlockUI("system.rs485.zoom.move.stop=0");
                rs485 = false;
            }
        });

        $("body").on("mousedown", "div[conf='ctrl'] > div", function(){
            if($(this).attr("class") != undefined){
                var class_name = "";
                $("div[conf='ctrl'] > div").each(function(){
                    if($(this).attr("class").search('on') != -1){
                        class_name = $(this).attr("class").split('on');
                        $(this).attr("class", class_name[0]+"up "+class_name[1]);
                    } 
                });
                class_name = $(this).attr("class").split("up");
                $(this).attr("class", class_name[0]+"on "+class_name[1]);  
            }
        });
    };

    $.fn.initialCommonLT = function(lang)
    {
        LT = lang;
    };

    $.fn.KillallPollingThread = function()
    {
        if(pc_time_thread != ""){
            clearTimeout(pc_time_thread);
            pc_time_thread = "";
        }

        if(server_time_thread != ""){
            clearTimeout(server_time_thread);
            server_time_thread = "";
        }

        if(lens_thread != ""){
            clearTimeout(lens_thread);
            lens_thread = "";
        }
    };

    $.fn.initialFunParam = function()
    {   
        console.log("In initialFunParam");
        $.ajax({
                beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
                url:'/cgi-bin/get?',
                dataType:'json',
                type:'POST',
                data:FunParam,
                cache:false,
                async:false,
                success:function(data){
                    var n = 0
                    , tmp = "{"
                    ;
                    $.each(data, function(param, val){
                        tmp += "\""+FunName[n]+"\""+":\""+val[1]+"\",";
                        n++;
                    });
                    tmp = tmp.slice(0, tmp.length-1);
                    tmp += "}";
                    FunData = $.parseJSON(tmp);
                },
                error:function(){
                    console.log("initialFunParam failed. Loux");
                },
                complete:function(){
                    $.removeCookie('ipcamera', { path: '/' });
                    $.fn.initialCallback();
                }
        });
    };

    /* initial all UI - uapi control */
    $.fn.initialCallback = function()
    { 
        console.log("Start initialCallback");
        $('body').on('sub_encode', 'div[conf]', function(){
            $.fn._initializeEncode();
            $('body').off('sub_encode');
        });

        $('body').on('sub_privacy', 'div[conf]', function(){
            $.fn._initializePrivacyZone();
        });

        $('body').on('sub_roi', 'div[conf]', function(){
            $.fn._initializeROI();
        });

        $('body').on('sub_exposure','div[conf]', function(){
            $.fn._initializeExposure();
            $('body').off('sub_exposure');
        });

        $('body').on('sub_whitebalance','div[conf]', function(){
            $.fn._initializeWhiteBalance();
            $('body').off('sub_whitebalance');
        });

        $('body').on('sub_img_basic','div[conf]', function(){
            $.fn._initializeImgBasic();
        });

        $('body').on('sub_lens','div[conf]', function(){
            $.fn._initializeLens();
        });

        $('body').on('sub_general','div[conf]', function(){
            $.fn._initializeNetworkGeneral();
            $('body').off('sub_general');
        });

        $('body').on('sub_ftp','div[conf]', function(){
            $.fn._initializeFTP();
            $('body').off('sub_ftp');
        });

        $('body').on('sub_sftp','div[conf]', function(){
            $.fn._initializeSFTP();
            $('body').off('sub_sftp');
        });

        $('body').on('sub_rtsp','div[conf]', function(){
            $.fn._initializeRtsp();
            $('body').off('sub_rtsp');
        });

        $('body').on('sub_snmp','div[conf]', function(){
            $.fn._initializeSNMP();
            $('body').off('sub_snmp');
        });

        $('body').on('sub_ieee8021x','div[conf]', function(){
            $.fn._initialize8021x();
            $('body').off('sub_ieee8021x');
        });

        $('body').on('sub_firewall','div[conf]', function(){
            $.fn._initializeFirewall();
            $('body').off('sub_firewall');
        });

        $('body').on('sub_ddns','div[conf]', function(){
            $.fn._initializeDDNS();
            $('body').off('sub_ddns');
        });

        $('body').on('sub_ldap','div[conf]', function(){
            $.fn._initializeLDAP();
            $('body').off('sub_ldap');
        });

        $('body').on('sub_ssl','div[conf]', function(){
            $.fn._initializeSSL();
            $('body').off('sub_ssl');
        });

        $('body').on('sub_gb28181','div[conf]', function(){
            $.fn._initializeGB28181();
            $('body').off('sub_gb28181');
        });

        $('body').on('sub_youtube','div[conf]', function(){
            $.fn._initializeYoutube();
            $('body').off('sub_youtube');
        });

        $('body').on('sub_hls','div[conf]', function(){
            $.fn._initializeHLS();
            $('body').off('sub_hls');
        });

        $('body').on('sub_datetime','div[conf]', function(){
            $.fn._initializeDateTime();
        });

        $('body').on('sub_audio','div[conf]', function(){
            $.fn._initializeAudio();
            $('body').off('sub_audio');
        });

        $('body').on('sub_firmware','div[conf]', function(){
            $.fn._initializeFirmware();
            $('body').off('sub_firmware');
        });

        $('body').on('sub_configure','div[conf]', function(){
            $.fn._initializeConfigure();
            $('body').off('sub_configure');
        });

        $('body').on('sub_osd','div[conf]', function(){
            $.fn._initializeOSD();
            $('body').off('sub_osd');
        });

        $('body').on('sub_account','div[conf]', function(){
            $.fn._initializeAccount();
            $('body').off('sub_account');
        });

        $('body').on('sub_alarm','div[conf]', function(){
            $.fn.initialAlarm();
            $('body').off('sub_alarm');
        });

        $('body').on('sub_audio_detection','div[conf]', function(){
            $.fn.initialAudioDetection();
            $('body').off('sub_audio_detection');
        });

        $('body').on('sub_defocus','div[conf]', function(){
            $.fn.initialDefocus();
            $('body').off('sub_defocus');
        });

        $('body').on('sub_face','div[conf]', function(){
            $.fn.initialFace();
            $('body').off('sub_face');
        });

        $('body').on('sub_motion','div[conf]', function(){
            $.fn.initialMotion();
        });

        $('body').on('sub_network_less','div[conf]', function(){
            $.fn.initialNetworkLess();
            $('body').off('sub_network_less');
        });

        $('body').on('sub_schedule','div[conf]', function(){
            $.fn.initialSchedule();
            $('body').off('sub_schedule');
        });

        $('body').on('sub_tamper','div[conf]', function(){
            $.fn.initialTamper();
            $('body').off('sub_tamper');
        });

        $('body').on('sub_alarm_out','div[conf]', function(){
            $.fn.initialAlarmOut();
            $('body').off('sub_alarm_out');
        });

        $('body').on('sub_email','div[conf]', function(){
            $.fn.initialEmail();
            $('body').off('sub_email');
        });

        $('body').on('sub_sink_ftp','div[conf]', function(){
            $.fn.initialFTP();
            $('body').off('sub_sink_ftp');
        });

        $('body').on('sub_nas','div[conf]', function(){
            $.fn.initialNAS();
        });

        $('body').on('sub_recording','div[conf]', function(){
            $.fn.initialRecording();
            $('body').off('sub_recording');
        });

        $('body').on('sub_sdcard','div[conf]', function(){
            $.fn.initialSD();
            $('body').off('sub_sdcard');
        });

        $('body').on('sub_snapshot','div[conf]', function(){
            $.fn.initialSnapshot();
            $('body').off('sub_snapshot');
        });

        $('body').on('sub_sound','div[conf]', function(){
            $.fn.initialSound();
            $('body').off('sub_sound');
        });

        $('body').on('sub_event_search','div[conf]', function(){
            $.fn.initializeEventSearch();
            $('body').off('sub_event_search');
        });

        $('body').on('sub_playback', 'div[conf]', function(){
            $.fn.initializeSdPlayback();
            $('body').off('sub_playback');
        });

        $('body').on('sub_ptz_basic','div[conf]', function(){
            $.fn.initialPtzBasic();
            $('body').off('sub_ptz_basic');
        });

        $('body').on('sub_ptz_position','div[conf]', function(){
            $.fn.initialPtzPreset();
            $('body').off('sub_ptz_position');
        });

        $('body').on('sub_ptz_patrol','div[conf]', function(){
            $.fn.initialPtzPatrol();
            $('body').off('sub_ptz_patrol');
        });

        $('body').on('sub_ptz_pattern','div[conf]', function(){
            $.fn.initialPtzPattern();
            $('body').off('sub_ptz_pattern');
        });
        
        $('body').on('ctrl_ptz','#Iptz', function(){
            $.fn.initialCtrlMenu();
            $('body').off('ctrl_ptz');
        });

        $('body').on('sub_va_basic','div[conf]', function(){
            $.fn.initialVaBaisc();
        });

        $('body').on('sub_line_counting','div[conf]', function(){
            $.fn.initialObjectCounting();
        });

        $('body').on('sub_loitering','div[conf]', function(){
            $.fn.initialLoitering();
        });

        $('body').on('sub_border_line','div[conf]', function(){
            $.fn.initialLineCrossing();
        });

        $('body').on('sub_intrusion','div[conf]', function(){
            $.fn.initialIntrusion();
        });

        $('body').on('sub_area_counting','div[conf]', function(){
            $.fn.initialAreaCounting();
        });

        $('body').on('sub_departure','div[conf]', function(){
            $.fn.initialDeparture();
        });

        $('body').on('sub_withdrawn','div[conf]', function(){
            $.fn.initialWithDrawn();
        });

        $('body').on('sub_sd_detection','div[conf]', function(){
            $.fn.initialSdDetection();
            $('body').off('sub_sd_detection');
        });

        $('body').on('sub_rs485','div[conf]', function(){
            $.fn.initialRS485();
            $('body').off('sub_rs485');
        });

        $('body').on('ctrl_r485','#Ictrl_r485', function(){
            $.fn.initialRS485Menu();
            $('body').off('ctrl_r485');
        });

        console.log("Ending initialCallback");
    };
}
)(jQuery)
