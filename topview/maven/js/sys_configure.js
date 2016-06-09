(function($){
	var import_param = "system.import.status", check_thread;
	$.fn._ObjectAssignValue = function(src){
		$.each(src, function(param , val){
			if(param == "system.configuration.camera_type")
			{
				var confList = "NTSC,PAL".split(',');
				$("#Icamera_type").find('option').remove();
				$.each(confList, function(n){
					$("#Icamera_type").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});

				if(val[1] == "ntsc")
					$("#Icamera_type")[0].selectedIndex = 0;
				else if(val[1] == "pal")
					$("#Icamera_type")[0].selectedIndex = 1;
			}
		});
	};
	
	$.fn._Go = function(){
		$.fn._InitialPageLang();
		$.fn._InitialFunc();
		$('#reloading_container').hide();
		$('#container').show();
	};
	
	$.fn._InitialPageLang = function(){
		$("#Mcamera_type_title")[0].innerHTML 	= $.fn._GetLangStr(LT._Video_Type);
		$("#Mcamera_type")[0].innerHTML 		= $.fn._GetLangStr(LT._Camera_Type)+":";
		$("#Mimport_title")[0].innerHTML 		= $.fn._GetLangStr(LT._Import_Configuration_Settings);
		$("#Mexposrt_title")[0].innerHTML 		= $.fn._GetLangStr(LT._Export_Configuration_Settings);
		$("#Mconfigure_title")[0].innerHTML 	= $.fn._GetLangStr(LT._Configuration);
		$("#Iimport").val($.fn._GetLangStr(LT._Import_File));
		$("#Iexport").val($.fn._GetLangStr(LT._Export_File));
		$("#Ireboot").val($.fn._GetLangStr(LT._Restart_Camera));
		$("#Isw_reboot").val($.fn._GetLangStr(LT._Software_Factory_Default));
		$("#Ihw_reboot").val($.fn._GetLangStr(LT._Hardware_Factory_Default));
		$.fn._InitialOptionLang("Icamera_type");
	};

	$.fn._InitialFunc = function()
	{
		var command = "";
		$("#Icamera_type").change(function(){
			if(this.selectedIndex == 0){ //ntsc
				command = "system.configuration.camera_type" +"="+	"ntsc";
			} else if(this.selectedIndex == 1){ //pal
				command = "system.configuration.camera_type" +"="+	"pal";
			}

			$.fn._SetParam(command);
			$("#block_content_description")[0].innerHTML = $.fn._GetLangStr(LT._Waiting_Warning);
			$(".blockContent > center > img").attr("src","/css/images/animated_progress.gif");

			setTimeout(function(){
				command = "system.configuration.reboot" +"="+	"1";
				$.fn._SetParam(command);
			},7000);

			$.blockUI({ 
				message:$("#blockUI"),
				css:{
					width:'300px'
				}
			});
			setTimeout($.fn._GirlAwakeIP,100000);
		});

		var options = {
			beforeSubmit:$.fn._UploadPorcess
		};
		
		$('#form_update').ajaxForm(options);

		$("#Ireboot").bind('click', function(){
			if(confirm($.fn._GetLangStr(LT._Reboot_Warning)))
			{
				$("#block_content_description")[0].innerHTML = $.fn._GetLangStr(LT._Waiting_Warning);
				command = "system.configuration.reboot" +"="+	"1";
				$.fn._SetParam(command);
				$.blockUI({ 
					message:$("#blockUI"),
					css:{
						width:'300px'
					}
				});
				setTimeout($.fn._GirlAwakeIP,90000);
			}
		});

		$("#Isw_reboot").bind('click', function(){
			if(confirm($.fn._GetLangStr(LT._SW_Reboot_Warning)))
			{
				$("#block_content_description")[0].innerHTML = $.fn._GetLangStr(LT._Waiting_Warning);
				command = "system.configuration.sw_factory_default" +"="+	"1";
				$.fn._SetParam(command);
				$.blockUI({ 
					message:$("#blockUI"),
					css:{
						width:'300px'
					}
				});
				setTimeout($.fn._SWGirlAwakeIP,90000);
			}
		});

		$("#Ihw_reboot").bind('click', function(){
			if(confirm($.fn._GetLangStr(LT._HW_Reboot_Warning)))
			{
				$("#block_content_description")[0].innerHTML = $.fn._GetLangStr(LT._Waiting_Warning);
				command = "system.configuration.hw_factory_default" +"="+	"1";
				$.fn._SetParam(command);
				$.blockUI({ 
					message:$("#blockUI"),
					css:{
						width:'300px'
					}
				});
				setTimeout($.fn._GirlAwakeDefaultIP,90000);
			}
		});
	};

	$.fn._GirlAwakeIP = function()
	{
		window.location.replace(""+$.fn._ParserHeader()+"//"+$.fn._ParserIP()+$.fn._ParserPort());
	};

	$.fn._SWGirlAwakeIP = function()
	{
		window.location.replace(""+$.fn._ParserHeader()+"//"+$.fn._ParserIP());
	};

	$.fn._GirlAwakeDefaultIP = function()
	{
		window.location.replace(""+$.fn._ParserHeader()+"//192.168.1.30");
	};

	$.fn._UploadPorcess = function()
	{
		var ret = 0;
		var file = $("input[type=file]").val();

		if(file.length <= 0){
			alert($.fn._GetLangStr(LT._Msg_PleaseSpecifyIm));
			return;
		}

		if(confirm($.fn._GetLangStr(LT._Import_Warning)))
		{
			$("#block_content_description")[0].innerHTML = $.fn._GetLangStr(LT._Upload_Warning);

			$.blockUI({ 
				message:$("#blockUI"),
				css:{
					width:'300px'
				}
			});

			$.fn._RunThread();
		}
		else
			return false;	
	};

	$.fn._RunThread = function()
	{
		var stop = 0;
		$.ajax({
			url:'/cgi-bin/get?'+import_param,
			dataType:'json',
			cache:false,
			success:function(data){
				$.each(data, function(param, value){
					if(param.match("system.import.status")){
						if(value[1] == "success"){
							stop = 1;
							$.fn._EndThread("success");
						} else if(value[1] == "failed"){
							stop = 1;
							$.fn._EndThread("failed");
						}
					}
				});
				if(stop)
					clearInterval(check_thread);
				else
					check_thread = setTimeout($.fn._RunThread,1000);
			},
			error:function(xhr, textStatus, errorThrown){
			}
		});
	};

	$.fn._EndThread = function(src)
	{
		if(src == "success")
		{	
			$("#block_content_description")[0].innerHTML = $.fn._GetLangStr(LT._Impport_Success_Warning);
			setTimeout($.fn._GirlAwakeIP,100000);
		}
		else if(src == "failed")
		{
			$("#block_content_description")[0].innerHTML = $.fn._GetLangStr(LT._Impport_Fail_Warning);
			setTimeout($.fn._GirlAwakeIP,100000);
		}
	};
})(jQuery);
