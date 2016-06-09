(function($){

var device_name = "";
var usage = 0;
var SD_File = new Array();
var file_num = 0;
var count_min;
var count_max;
var checkT;
var file_st;
var dataQue = [];
dataQue.push(
	"system.sd.Usage&"+
	"system.device_name&"+
	"system.sd.mount_status"
);	
	$.extend({
		callback_param:function(url){
			$.ajax({
				url:'/cgi-bin/get?'+url,
				dataType:'json',
				cache:false,
				success:function(data){
					$.fn._ObjectAssignValue(data);
				},
				error:function(xhr, textStatus, errorThrown){
				},
				complete:function(){
					$.fn._InitialFunc();
				}
			});
		},
		delete_param:function(url){
			$.ajax({
				url:'/cgi-bin/set?'+url,
				dataType:'json',
				cache:false,
				success:function(data){
				},
				error:function(xhr, textStatus, errorThrown){
				},
				complete:function(){				
					$.fn._reload();
				}
			});
		},
		format_param:function(url){
			$.ajax({
				url:'/cgi-bin/set?'+url,
				dataType:'json',
				cache:false,
				success:function(data){
				},
				error:function(xhr, textStatus, errorThrown){
				},
				complete:function(){				
					$.blockUI({ 
						message:$("#blockUI"),
						css:{
							width:'300px'
						}
					});

					setTimeout($.fn._reload(),7000);
				}
			});
		},
		tar_param:function(url){
			$.ajax({
				url:'/cgi-bin/set?'+url,
				dataType:'json',
				cache:false,
				success:function(data){
					$.fn._DownloadTar();
				},
				error:function(xhr, textStatus, errorThrown){
				},
				complete:function(){
					$.fn._DownloadTar();
				}
			});
		},
		mount_check:function(callback){
			csEvent = new CustomEvent(callback);
			$.ajax({
				url:"/cgi-bin/get?system.sd.mount_status",
				cache:false,
				dataType:"json",
				error:function(xhr, textStatus, errorThrown){
				},
				success:function(data){
					$.each(data, function(parameter, value){
						if(parameter == "system.sd.mount_status"){
							if(value[1] == 1){
								csEvent.fire();
							}else if(value[1] == 0){
								$("#Isd_usage")[0].innerHTML = "0%";
								$("#Ilist_num")[0].innerHTML = "0-0";
								$("#Isd_file_list").children("tbody").children().remove();
								$("#Isd_index").val(0);
								$("#Isd_double_right").attr("disabled",true);
								$("#Isd_right").attr("disabled",true);
								$("#Isd_double_left").attr("disabled",true);
								$("#Isd_left").attr("disabled",true);
								//$("#Isd_download").attr("disabled",true);
								$("#Isd_delete").attr("disabled",true);
								$("#Isd_index").attr("disabled",true);
								var $sd_file_list = $("#Isd_file_list").children("tbody");
								$("<tr><td style=\"text-align:center;\">"+$.GetLangStr(Lang._Mno_snapshot_show)+"<br>("+$.GetLangStr(Lang._Mno_snapshot_note)+" <a href=\"/www/record_sd.html\">"+$.GetLangStr(Lang._Menu_event)+$.GetLangStr(Lang._Menu_event_sd)+".</a>)</td></tr>").appendTo($sd_file_list);
								$.unblockUI();
							}
						} 
					});
				}
			});
		},
	});

	$.fn._ObjectAssignValue = function(src){
		$.each(src, function(param , val){
			if (param == "system.sd.Usage"){
			$("#Isd_usage")[0].innerHTML = val[1]+"%";
			
			} else if (param == "system.device_name"){
				device_name = val[1];
			} else if (param == "system.sd.mount_status"){
				if(val[1] == 1)
				{
					//$("#Isd_download").attr("disabled",false);
					$("#Isd_delete").attr("disabled",false).css('background-color','#0061A7').css('color','#fff');
					$.fn._ReceiveSDfile();
				}
				else
				{
					//$("#Isd_download").val("Download:0-0");
					$("#Ilist_num")[0].innerHTML = "0-0";
					$("#Isd_index").val(0);
					$("#Isd_double_right").attr("disabled",true).css('background-color','#F1F1F1').css('color','#000');
					$("#Isd_right").attr("disabled",true).css('background-color','#F1F1F1').css('color','#000');
					$("#Isd_double_left").attr("disabled",true).css('background-color','#F1F1F1').css('color','#000');
					$("#Isd_left").attr("disabled",true).css('background-color','#F1F1F1').css('color','#000');
					//$("#Isd_download").attr("disabled",true);
					$("#Isd_delete").attr("disabled",true).css('background-color','#F1F1F1').css('color','#000');
					var $sd_file_list = $("#Isd_file_list").children("tbody");
					$("<tr><td style=\"text-align:center;\">No SD files available for display.<br>(An SD card must be inserted and configured under <a href=\"/www/record_sd.html\">Event SD Recording.</a>)</td></tr>").appendTo($sd_file_list);
				}
			} else if(param == "system.sd.file_list"){
				var confList = val[1].split(',');
				$.each(confList, function(n){
					SD_File[n] = confList[n];
					file_num = n;
				});
			}
		});
	};
	$.fn._Go = function(){
		$.fn._InitialPageLang();	
		$.fn._InitialInfo();
		$('#reloading_container').hide();
		$('#container').show();
	};
	$.fn._InitialPageLang = function(){
		$("#Msnapshot_title")[0].innerHTML 			 = $.fn._GetLangStr(LT._Menu_SD_playback);
		$("#Msnapshot_note")[0].innerHTML            = $.fn._GetLangStr(LT._Msnapshot_note);
		$("#Msnapshot_remain")[0].innerHTML          = $.fn._GetLangStr(LT._Msnapshot_remain);
		$("#Isd_delete").val($.fn._GetLangStr(LT._Delete_all));
		$("#Msnapshot_showing")[0].innerHTML         = $.fn._GetLangStr(LT._Showing)+":";
		$("#Isd_page")[0].innerHTML                  = $.fn._GetLangStr(LT._Page)+":";
	};

	$.fn._InitialInfo = function()
	{
		$.callback_param(dataQue);
	}

	$.fn._InitialFunc = function()
	{
		$("#Isd_download").bind('click', function(){
			$("#block_header_description")[0].innerHTML = $.fn._GetLangStr(LT._Reloading);
			$("#block_content_description")[0].innerHTML = $.fn._GetLangStr(LT._Reloading_note);

			$.blockUI({ 
				message:$("#blockUI"),
				css:{
					width:'300px'
				}
			});
			
			var min, max;
			var command = "";
			var range = $("#Ilist_stats").text().split('-');
			$.each(range, function(n){
				if(n == 0)
					min = range[n];
				else if(n == 1)
					max = range[n];	
			});
			for(min; min <= max; min++){

				if(min == max)
					command = command + SD_File[min-1];
				else
					command = command + SD_File[min-1]+",";
			}

			$.tar_param("system.download.sd_file="+command);
		});

		$("#Isd_delete").bind('click', function(){
			if(confirm($.fn._GetLangStr(LT._SD_delete_all_confirm)))
			{
				$("#block_header_description")[0].innerHTML = $.fn._GetLangStr(LT._Reloading_data);
				$("#block_content_description")[0].innerHTML = $.fn._GetLangStr(LT._Deleting);
				$.format_param("system.sd.start_format=1");
			}
		});
        
        $("#Isd_double_right").bind('click', function(){

			$.blockUI({ 
				message:$("#blockUI"),
				css:{
					width:'300px'
				}
			});
			
			var index =  Number($("#Isd_index").val());
			var group;

			if(file_num <= 99)
				group = 1;
			else
				group = Math.floor(file_num / 100)+1;
			
			//console.log("index: " + index + " & group: " + group);
			if((index+10) >= group){
				$("#Isd_index").val(group);
				$("#Isd_double_right").attr("disabled",true).css('background-color','#F1F1F1').css('color','#000');
				$("#Isd_right").attr("disabled",true).css('background-color','#F1F1F1').css('color','#000');
				$("#Isd_double_left").attr("disabled",false).css('background-color','#0061A7').css('color','#fff');
				$("#Isd_left").attr("disabled",false).css('background-color','#0061A7').css('color','#fff');
			}
			else{
				$("#Isd_index").val((index+10));
			}
			//
			var page = Number($("#Isd_index").val());
			var min_group = 2;
			if(page >= min_group){
				$("#Isd_left").attr("disabled",false).css('background-color','#0061A7').css('color','#fff');
				$("#Isd_double_left").attr("disabled",false).css('background-color','#0061A7').css('color','#fff');
			}else{
				$("#Isd_double_left").attr("disabled",true).css('background-color','#F1F1F1').css('color','#000');
				$("#Isd_left").attr("disabled",true).css('background-color','#F1F1F1').css('color','#000');
			}
			$.fn._RenderSDInfor();
		});

        $("#Isd_right").bind('click', function(){

			$.blockUI({ 
				message:$("#blockUI"),
				css:{
					width:'300px'
				}
			});
			
			var index = Number($("#Isd_index").val());
			var group;

			if(file_num <= 99)
				group = 1;
			else
				group = Math.floor(file_num / 100)+1;
			//console.log("index: " + index + " & group: " + group);
			if((index+1) >= group){
				$("#Isd_index").val((index+1));
				$("#Isd_double_right").attr("disabled",true).css('background-color','#F1F1F1').css('color','#000');
				$("#Isd_right").attr("disabled",true).css('background-color','#F1F1F1').css('color','#000');
				$("#Isd_double_left").attr("disabled",false).css('background-color','#0061A7').css('color','#fff');
				$("#Isd_left").attr("disabled",false).css('background-color','#0061A7').css('color','#fff');
			}
			else
				$("#Isd_index").val((index+1));
			//
			var page = Number($("#Isd_index").val());
			var min_group = 2;
			if(page >= min_group){
				$("#Isd_left").attr("disabled",false).css('background-color','#0061A7').css('color','#fff');
				$("#Isd_double_left").attr("disabled",false).css('background-color','#0061A7').css('color','#fff');
			}else{
				$("#Isd_double_left").attr("disabled",true).css('background-color','#F1F1F1').css('color','#000');
				$("#Isd_left").attr("disabled",true).css('background-color','#F1F1F1').css('color','#000');
			}

			$.fn._RenderSDInfor();
		});

        $("#Isd_double_left").bind('click', function(){

			$.blockUI({ 
				message:$("#blockUI"),
				css:{
					width:'300px'
				}
			});
			
			var index = $("#Isd_index").val();
			var group = 1;
			//console.log("index: " + index + " & group: " + group);
			if((index-10) <= group){
				$("#Isd_index").val(group);
				$("#Isd_double_left").attr("disabled",true).css('background-color','#F1F1F1').css('color','#000');
				$("#Isd_left").attr("disabled",true).css('background-color','#F1F1F1').css('color','#000');
				$("#Isd_double_right").attr("disabled",false).css('background-color','#0061A7').css('color','#fff');
				$("#Isd_right").attr("disabled",false).css('background-color','#0061A7').css('color','#fff');
			}
			else
				$("#Isd_index").val((index-10));
			//
			var max_group;
			if(file_num <= 99)
				max_group = 1;
			else
				max_group = Math.floor(file_num / 100)+1;

			var page = Number($("#Isd_index").val());
			if(page <= max_group){
				$("#Isd_double_right").attr("disabled",false).css('background-color','#0061A7').css('color','#fff');
				$("#Isd_right").attr("disabled",false).css('background-color','#0061A7').css('color','#fff');
			}else{
				$("#Isd_double_right").attr("disabled",true).css('background-color','#F1F1F1').css('color','#000');
				$("#Isd_right").attr("disabled",true).css('background-color','#F1F1F1').css('color','#000');
			}
			$.fn._RenderSDInfor();
		});

		$("#Isd_left").bind('click', function(){

			$.blockUI({ 
				message:$("#blockUI"),
				css:{
					width:'300px'
				}
			});
			
			var index = $("#Isd_index").val();
			var group = 1;
			//console.log("index: " + index + " & group: " + group);
			if((index-1) <= group){
				$("#Isd_index").val(group);
				$("#Isd_double_left").attr("disabled",true).css('background-color','#F1F1F1').css('color','#000');
				$("#Isd_left").attr("disabled",true).css('background-color','#F1F1F1').css('color','#000');
				$("#Isd_double_right").attr("disabled",false).css('background-color','#0061A7').css('color','#fff');
				$("#Isd_right").attr("disabled",false).css('background-color','#0061A7').css('color','#fff');
			}
			else
				$("#Isd_index").val((index-1));
			//
			var max_group;
			if(file_num <= 99)
				max_group = 1;
			else
				max_group = Math.floor(file_num / 100)+1;

			var page = Number($("#Isd_index").val());
			if(page <= max_group){
				$("#Isd_double_right").attr("disabled",false).css('background-color','#0061A7').css('color','#fff');
				$("#Isd_right").attr("disabled",false).css('background-color','#0061A7').css('color','#fff');
			}else{
				$("#Isd_double_right").attr("disabled",true).css('background-color','#F1F1F1').css('color','#000');
				$("#Isd_right").attr("disabled",true).css('background-color','#F1F1F1').css('color','#000');
			}
			$.fn._RenderSDInfor();
		});

	};

	$.fn._ReceiveSDfile = function() 
	{
		$("#block_header_description")[0].innerHTML  = $.fn._GetLangStr(LT._Loading_data);
		$("#block_content_description")[0].innerHTML = $.fn._GetLangStr(LT._Loading_note);
		$(".blockContent > center > img").attr("src","/css/images/animated_progress.gif");
        
        $.blockUI({ 
            message:$("#blockUI"),
            css:{
	            width:'300px'
            }
        });

        $.fn._CheckFileList();
	};
	
	$.fn._CheckFileList = function()
	{
		$.ajax({
				url:'/cgi-bin/get?system.sd.mount_status',
				dataType:'json',
				cache:false,
				success:function(data){
					$.each(data, function(param, val){
			          if(param == "system.sd.mount_status"){
			             mount_st = val[1];
			             //console.log("mount_st:"+ val[1]);
			          }
			        });
				},
				error:function(xhr, textStatus, errorThrown){
				},
				complete:function(){
				}
			});

		$.ajax({
				url:'/cgi-bin/get?system.sd.file_list_status',
				dataType:'json',
				cache:false,
				success:function(data){
					$.each(data, function(param, val){
			          if(param == "system.sd.file_list_status"){
			             file_st = val[1];
			             console.log("file_st:"+ val[1]);
			          }
			        });
				},
				error:function(xhr, textStatus, errorThrown){
				},
				complete:function(){
				}
			});
		
		if(file_st == "Finished"){
			$.ajax({
				url:'/cgi-bin/get?system.sd.file_list',
				dataType:'json',
				cache:false,
				success:function(data){
					$.fn._ObjectAssignValue(data);
				},
				error:function(xhr, textStatus, errorThrown){
				},
				complete:function(){
					$.fn._InitialSDInfo();
				}
			});
		}else{
			checkT = setTimeout($.fn._CheckFileList, 2000);
		}
		
	}

	$.fn._InitialSDInfo = function()
	{	
		var $sd_file_list = $("#Isd_file_list").children("tbody");
		var list = 1;
		var group = Math.floor(file_num / 100)+1;

		if(file_num >= 99)
		{
			list = 99+1;
			count_min = 1;
			count_max = list;
			//$("#Isd_download").val("Download:"+count_min+"-"+count_max);
			$("#Ilist_num")[0].innerHTML = count_min+"-"+count_max;
			$("#Isd_index").val(1);
		}
		else if(file_num == 0)
		{
			count_min = 0;
			count_max = 0;
			//$("#Isd_download").val("Download:"+count_min+"-"+count_max);
			$("#Ilist_num")[0].innerHTML = count_min+"-"+count_max;
			$("#Isd_index").val(0);
		}
		else
		{
			list = file_num+1;
			count_min = 1;
			count_max = list;
			//$("#Isd_download").val("Download:"+count_min+"-"+count_max);
			$("#Ilist_num")[0].innerHTML = count_min+"-"+count_max;
			$("#Isd_index").val(1);
		}

		if(group == 1)
		{
			$("#Isd_double_right").attr("disabled",true).css('background-color','#F1F1F1').css('color','#000');
			$("#Isd_right").attr("disabled",true).css('background-color','#F1F1F1').css('color','#000');
			$("#Isd_double_left").attr("disabled",true).css('background-color','#F1F1F1').css('color','#000');
			$("#Isd_left").attr("disabled",true).css('background-color','#F1F1F1').css('color','#000');
		}
		else
		{
			$("#Isd_double_right").attr("disabled",false).css('background-color','#0061A7').css('color','#fff');
			$("#Isd_right").attr("disabled",false).css('background-color','#0061A7').css('color','#fff');
			$("#Isd_double_left").attr("disabled",true).css('background-color','#F1F1F1').css('color','#000');
			$("#Isd_left").attr("disabled",true).css('background-color','#F1F1F1').css('color','#000');
		}
		
		// general sd file list
		if(file_num != 0){
			for(var i = 1; i <= list; i++){
				if(i % 2 == 0){
					var $odd = $("<tr class=\"sd_list_odd\"></tr>");
					$("<td><a href=\"#\" onclick=\"$.fn._OpenFile('"+SD_File[i-1]+"')\">"+SD_File[i-1]+"</a></td>").appendTo($odd);
					$("<td width=\"10%\"><a href=\"#\" onclick=\"$.fn._DownloadFile('"+SD_File[i-1]+"')\">download</a></td>").appendTo($odd);
					$("<td width=\"10%\"><a href=\"#\" onclick=\"$.fn._DeleteFile('"+SD_File[i-1]+"')\">delete</a></td>").appendTo($odd);
					$odd.appendTo($sd_file_list);
				}else{
					var $even = $("<tr class=\"sd_list_even\"></tr>");
					$("<td><a href=\"#\" onclick=\"$.fn._OpenFile('"+SD_File[i-1]+"')\">"+SD_File[i-1]+"</a></td>").appendTo($even);
					$("<td width=\"10%\"><a href=\"#\" onclick=\"$.fn._DownloadFile('"+SD_File[i-1]+"')\">download</a></td>").appendTo($even);
					$("<td width=\"10%\"><a href=\"#\" onclick=\"$.fn._DeleteFile('"+SD_File[i-1]+"')\">delete</a></td>").appendTo($even);
					$even.appendTo($sd_file_list);
				}
			}
		}
		$.unblockUI();
		clearTimeout(checkT);
	};

	$.fn._RenderSDInfor = function()
	{
		var $sd_file_list = $("#Isd_file_list").children("tbody");
		var index = $("#Isd_index").val();
		var list = 1;
		count_max = index * 100;
		count_min = count_max - 99;

		if(count_max >= file_num)
			list = file_num;
		else
			list = count_max;

		//$("#Isd_download").val("Download:"+count_min+"-"+list);
		$("#Ilist_num")[0].innerHTML = count_min+"-"+list;

		// remoe sd file list
		$("#Isd_file_list").children("tbody").children().remove();
		//$("#Isd_file_list").children("tbody").children().find('td').remove();
		
		// general sd file list
		for(count_min; count_min <= list; count_min++){
			if(count_min % 2 == 0){
				var $odd = $("<tr class=\"sd_list_odd\"></tr>");
				$("<td><a href=\"#\" onclick=\"$.fn._OpenFile('"+SD_File[count_min-1]+"')\">"+SD_File[count_min-1]+"</a></td>").appendTo($odd);
				$("<td width=\"10%\"><a href='#' onclick=\"$.fn._DownloadFile('"+SD_File[count_min-1]+"')\">download</a></td>").appendTo($odd);
				$("<td width=\"10%\"><a href=\"#\" onclick=\"$.fn._DeleteFile('"+SD_File[count_min-1]+"')\">delete</a></td>").appendTo($odd);
				$odd.appendTo($sd_file_list);
			}else{
				var $even = $("<tr class=\"sd_list_even\"></tr>");
				$("<td><a href=\"#\" onclick=\"$.fn._OpenFile('"+SD_File[count_min-1]+"')\">"+SD_File[count_min-1]+"</a></td>").appendTo($even);
				$("<td width=\"10%\"><a href='#' onclick=\"$.fn._DownloadFile('"+SD_File[count_min-1]+"')\">download</a></td>").appendTo($even);
				$("<td width=\"10%\"><a href=\"#\" onclick=\"$.fn._DeleteFile('"+SD_File[count_min-1]+"')\">delete</a></td>").appendTo($even);
				$even.appendTo($sd_file_list);
			}
		}

		$.unblockUI();
	};

	$.fn._OpenFile = function(src)
	{
		window.open("/www/record_sdviewer.html?filename="+src,"_blank");
	}
	$.fn._DeleteFile = function(src)
	{
		if(confirm($.fn._GetLangStr(LT._SD_delete_file)))
		{
			$.delete_param("system.delete.sd_file="+src);
		}
	}


	$.fn._DownloadFile = function(src)
	{
		$("#file").val("/mnt/mmc/"+src);
		$("#Idownload").click(function(){
			$("#form_download").submit();
		});

		$("#Idownload").click();
		$('#reloading_container').hide();
		$('#container').show();
	}

	$.fn._DownloadTar = function()
	{
		$("#file").val("/web/web-data/www/plugin/SDFile.tar");

		$("#Idownload").click(function(){
			$.unblockUI();
			$("#form_download").submit();
		});

		$("#Idownload").click();
		$('#reloading_container').hide();
		$('#container').show();
	}

	$.fn._reload = function()
	{
		window.location.reload();
	}

	function CustomEvent()  //custom event class
	{
		var mAction = arguments[0];
		this.fire = function()
		{
			mAction();
		}
	}
})(jQuery);