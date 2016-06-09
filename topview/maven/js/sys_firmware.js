(function($){
	var check_thread;
	var fm_param = "system.upgrade.status";
	var count = 0;
	
	$.fn._ObjectAssignValue = function(src){
		$.each(src, function(param , val){
			
		});
	};
	$.fn._Go = function(){
		$.fn._InitialPageLang();
		$.fn._InitialFunc();
		$('#reloading_container').hide();
		$('#container').show();
	};
	$.fn._InitialPageLang = function(){
		$("#Mfirmware_title")[0].innerHTML 			= $.fn._GetLangStr(LT._Firmware_Update_and_Package_Install);
		$("#Ifirmware").val($.fn._GetLangStr(LT._Upload));
	};

	$.fn._InitialFunc = function()
	{
		var options = {
			beforeSubmit:$.fn._UploadProcess
		};
		
		$('#form_update').ajaxForm(options);

	};

	$.fn._UploadProcess = function()
	{
		var ret = 0;
		var file = $("input[type=file]").val();
		
		if(file.length <= 0){
			alert($.fn._GetLangStr(LT._Msg_PleaseSpecifyFW));
			return false;
		}

		if(confirm($.fn._GetLangStr(LT._Firmware_upgrade_Warning)))
		{   
		    $("#block_content_description")[0].innerHTML = $.fn._GetLangStr(LT._Upload_Warning);
		    $(".blockContent > center > img").attr("src","/css/images/animated_progress.gif");
            $.blockUI({ 
	            message:$("#blockUI"),
	            css:{
		            width:'300px'
	            }
            });
            
            $.ajax({
			    url:'/cgi-bin/set?system.upgrade.status=begin',
			    dataType:'json',
			    cache:false,
			    success:function(data){ 
			    },
			    complete:function(){
			        $.fn._StartListen();
		            
			    },
			    error:function(xhr, textStatus, errorThrown){
			    }
		    });
		}
		else
			return false;
	};

	$.fn._StartListen = function()
	{
		check_thread = setInterval($.fn._RunThread,1000);
	};

	$.fn._RunThread = function()
	{
		var stop = 0;
		$.ajax({
			url:'/cgi-bin/get?'+fm_param,
			dataType:'json',
			cache:false,
			success:function(data){
				$.each(data, function(param, value){
					if(param == "system.upgrade.status"){
						if(value[1] == "success"){
							stop = 1;
							$.fn._EndThread("success");
						}
						else if(value[1] == "verifying"){
							$("#block_content_description")[0].innerHTML = $.fn._GetLangStr(LT._Firmware_Verify_Warning);
							$(".blockContent > center > img").attr("src","/css/images/animated_progress.gif");
						}
						else if(value[1] == "upgrading"){
							$("#block_content_description")[0].innerHTML = $.fn._GetLangStr(LT._Firmware_Install_Warning);
							$(".blockContent > center > img").attr("src","/css/images/animated_progress.gif");
						}
						else if(value[1] == "failed"){
							stop = 1;
							$.fn._EndThread("failed");
						}
						else if(value[1] == "unknown"){
							stop = 1;
							$.fn._EndThread("failed");
						}
						else if(value[1] == "begin"){
							count = count+1;
							if(count == 800){
								$("#block_content_description")[0].innerHTML = $.fn._GetLangStr(LT._Firmware_Fail_Warning);
								$(".blockContent > center > img").attr("src","/css/images/animated_progress.gif");
								setTimeout($.fn._Reload,10000);
								stop = 1;
							}
						}
					}
				});
				if(stop)
					clearInterval(check_thread);
			},
			error:function(xhr, textStatus, errorThrown){
			}
		});
	};

	$.fn._EndThread = function(src)
	{
		if(src == "success")
		{	
			var description = $.fn._GetLangStr(LT._Firmware_Success_Warning);
			var run_thred 
			,pro_w = 0
			, c_ind = 0
			, update_timer = 180
			;
			// set reboot
			$.fn._SetParam("system.configuration.reboot=1");
			setTimeout($.fn._GirlAwakeIP,110000);

			// show progress bar
			$.blockUI({ 
	            message:'<div style=\"margin:0px auto;width:350px;\">'+
		            		'<div style=\"padding:0px 0px;margin:5px 0px;height:20px;color:black;width:100%;text-align:center;\">'+
		            			"<span>"+description+"</span>"+
		            		'</div>'+
		            		'<div class=\"progressblock\" style=\"width:300px;margin:8px 0px 0px 23px;\">'+
		            			'<div class=\"progress\">'+
		            				'<div style=\"margin-left:auto;margin-right:auto;height:15px\" id=\"progress_text\">'+
		            					'<div style=\"padding-top:7px;\">'+
		            						'<font color=\"white\"><span id=\"progress_num\"></span></font>'+
		            					'</div>'+
		            				'</div>'+
		            				'<div style=\"width:310px;margin:17px auto;\">'+
		            				 	'<div style=\"float:left;\"><span>0%</span></div>'+
		            				 	'<div style=\"float:right;\"><span>100%</span></div>'+
		            				'</div>'+
		            			'</div>'+	
		            		'</div>'+
	            		'</div>'
	            ,
	            css:{
		            width:'400px',
	            }
            });

			run_thred = setInterval(function(){
	            if(c_ind >= 601){
	                clearInterval(run_thred);
	                //alert($.fn.GetLangStr(LT._Reboot_complete));
	                //$.fn._runCloseWindow();     
	            }
	            else
	            {
	                // The increase step equals 4px at every 200m sec.
	                $(".progress").css("width",Math.ceil(pro_w/2)+"px");
	                $("#progress_text").css("width",Math.ceil(pro_w/2)+"px");
	                if(c_ind % 6 == 0)
	                    $("#progress_num")[0].innerHTML = (c_ind/6)+"%";

	                pro_w = pro_w + 1;
	            }
	             
	            c_ind = c_ind + 1;

	        }, update_timer);

 			
			//$(".blockContent > center > img").attr("src","/css/images/animated_progress.gif");
			//$.fn._SetParam("system.configuration.reboot=1");
			//setTimeout($.fn._GirlAwakeIP,100000);
		}
		else if(src == "failed")
		{
			$("#block_content_description")[0].innerHTML = $.fn._GetLangStr(LT._Firmware_Fail_Warning);
			$(".blockContent > center > img").attr("src","/css/images/animated_progress.gif");
			$.fn._SetParam("system.configuration.reboot=1");
			setTimeout($.fn._GirlAwakeIP,100000);
		}
	};

	$.fn._GirlAwakeIP = function()
	{
		window.location.replace(""+$.fn._ParserHeader()+"//"+$.fn._ParserIP()+$.fn._ParserPort());
	};

	$.fn._Reload = function()
	{
		window.location.reload();
	};
})(jQuery);