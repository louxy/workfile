(function($){
	var confList;
	var SD_File = new Array();
	var file_num = 0;
	var count_min;
	var count_max;
	$.fn._ObjectAssignValue = function(src){
		$.each(src, function(param , val){
			if (param == "system.sd.file_list"){
				confList = val[1].split(',');
				$.each(confList, function(n){
					SD_File[n] = confList[n];
					file_num = n;
				});
			} 
		});
	};
	$.fn._Go = function(){
		$.fn._InitialPageLang();
		$.fn._ReceiveSDfile();

	};
	$.fn._InitialPageLang = function(){
		$("#Ishowing")[0].innerHTML 			= $.fn._GetLangStr(LT._Showing)+":";
		$("#Ipage")[0].innerHTML 				= $.fn._GetLangStr(LT._Page);
	};

	$.fn._InitialFunc = function()
	{	
		$("#Isd_download").bind('click', function(){
			$("#block_content_description")[0].innerHTML = $.fn._GetLangStr(LT._Reloading);
			$(".blockContent > center > img").attr("src","/css/images/animated_progress.gif");

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
			
			if((index+10) >= group){
				$("#Isd_index").val(group);
				$("#Isd_double_right").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
				$("#Isd_right").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
				$("#Isd_double_left").attr("disabled",false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
				$("#Isd_left").attr("disabled",false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
			}
			else
				$("#Isd_index").val((index+10));

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

			if((index+1) >= group){
				$("#Isd_index").val((index+1));
				$("#Isd_double_right").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
				$("#Isd_right").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
				$("#Isd_double_left").attr("disabled",false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
				$("#Isd_left").attr("disabled",false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
			}
			else
				$("#Isd_index").val((index+1));

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
			
			if((index-10) <= group){
				$("#Isd_index").val(group);
				$("#Isd_double_left").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
				$("#Isd_left").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
				$("#Isd_double_right").attr("disabled",false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
				$("#Isd_right").attr("disabled",false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
			}
			else
				$("#Isd_index").val((index-10));

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

			if((index-1) <= group){
				$("#Isd_index").val(group);
				$("#Isd_double_left").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
				$("#Isd_left").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
				$("#Isd_double_right").attr("disabled",false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
				$("#Isd_right").attr("disabled",false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
			}
			else
				$("#Isd_index").val((index-1));

			$.fn._RenderSDInfor();
		});
	};

	$.fn._ReceiveSDfile = function()
	{
		$("#block_content_description")[0].innerHTML = $.fn._GetLangStr(LT._Reloading);
		$(".blockContent > center > img").attr("src","/css/images/animated_progress.gif");
		
		$.blockUI({ 
			message:$("#blockUI"),
			css:{
				width:'300px'
			}
		});
		
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
				$.fn._InitialSDInfor();
			}
		});
	};

	$.fn._InitialSDInfor = function()
	{
		var $sd_file_list = $("#Isd_file_list").children("tbody");
		var list = 1;
		var group = Math.floor(file_num / 100)+1;

		if(file_num >= 99)
		{
			list = 99+1;
			count_min = 1;
			count_max = list;
			$("#Ilist_stats")[0].innerHTML = count_min+"-"+count_max;
			$("#Isd_index").val(1);
		}
		else if(file_num == 0)
		{
			count_min = 0;
			count_max = 0;
			$("#Ilist_stats")[0].innerHTML = count_min+"-"+count_max;
			$("#Isd_index").val(0);
		}
		else
		{
			list = file_num+1;
			count_min = 1;
			count_max = list;
			$("#Ilist_stats")[0].innerHTML = count_min+"-"+count_max;
			$("#Isd_index").val(1);
		}
		
		if(group == 1)
		{
			$("#Isd_double_right").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
			$("#Isd_right").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
			$("#Isd_double_left").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
			$("#Isd_left").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
		}
		else
		{
			$("#Isd_double_right").attr("disabled",false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
			$("#Isd_right").attr("disabled",false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
			$("#Isd_double_left").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
			$("#Isd_left").attr("disabled",true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
		}

		// general sd file list
		if(file_num != 0){
			for(var i = 1; i <= list; i++){
				if(i % 2 == 0){
					var $odd = $("<tr class=\"sd_list_odd\"></tr>");
					$("<td><a href=\"/www/record_video.html?filename="+SD_File[i-1]+"\" target=\"_blank\">"+SD_File[i-1]+"</a></td>").appendTo($odd);
					$("<td width=\"10%\"><a href=\"#\" onclick=\"$.fn._DownloadFile('"+SD_File[i-1]+"')\">download</a></td>").appendTo($odd);
					$("<td width=\"10%\"><a href=\"#\" onclick=\"$.fn._DeleteFile('"+SD_File[i-1]+"')\">delete</a></td>").appendTo($odd);
					$odd.appendTo($sd_file_list);
				}else{
					var $even = $("<tr class=\"sd_list_even\"></tr>");
					$("<td><a href=\"/www/record_video.html?filename="+SD_File[i-1]+"\" target=\"_blank\">"+SD_File[i-1]+"</a></td>").appendTo($even);
					$("<td width=\"10%\"><a href=\"#\" onclick=\"$.fn._DownloadFile('"+SD_File[i-1]+"')\">download</a></td>").appendTo($even);
					$("<td width=\"10%\"><a href=\"#\" onclick=\"$.fn._DeleteFile('"+SD_File[i-1]+"')\">delete</a></td>").appendTo($even);
					$even.appendTo($sd_file_list);
				}
			}
		}
		$.unblockUI();
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
		$("#Ilist_stats")[0].innerHTML = count_min+"-"+list;

		// remoe sd file list
		$("#Isd_file_list").children("tbody").children().find('td').remove();
		
		// general sd file list
		for(count_min; count_min <= list; count_min++){
			if(count_min % 2 == 0){
				var $odd = $("<tr class=\"sd_list_odd\"></tr>");
				$("<td><a href=\"/www/record_video.html?filename="+SD_File[count_min-1]+"\" target=\"_blank\">"+SD_File[count_min-1]+"</a></td>").appendTo($odd);
				$("<td width=\"10%\"><a href=\"#\" onclick=\"$.fn._DownloadFile('"+SD_File[count_min-1]+"')\">download</a></td>").appendTo($odd);
				$("<td width=\"10%\"><a href=\"#\" onclick=\"$.fn._DeleteFile('"+SD_File[count_min-1]+"')\">delete</a></td>").appendTo($odd);
				$odd.appendTo($sd_file_list);
			}else{
				var $even = $("<tr class=\"sd_list_even\"></tr>");
				$("<td><a href=\"/www/record_video.html?filename="+SD_File[count_min-1]+"\" target=\"_blank\">"+SD_File[count_min-1]+"</a></td>").appendTo($even);
				$("<td width=\"10%\"><a href=\"#\" onclick=\"$.fn._DownloadFile('"+SD_File[count_min-1]+"')\">download</a></td>").appendTo($even);
				$("<td width=\"10%\"><a href=\"#\" onclick=\"$.fn._DeleteFile('"+SD_File[count_min-1]+"')\">delete</a></td>").appendTo($even);
				$even.appendTo($sd_file_list);
			}
		}

		$.unblockUI();
	};

	$.fn._DeleteFile = function(src)
	{
		if(confirm("Delete this file?"))
		{
			$.ajax({
				url:'/cgi-bin/set?'+"system.delete.sd_file="+src,
				dataType:'json',
				cache:false,
				success:function(data){
				},
				error:function(xhr, textStatus, errorThrown){
				},
				complete:function(){				
					$.fn._Reload();
				}
			});
		}
	};

	$.fn._DownloadFile = function(src)
	{
		$("#file").val("/mnt/mmc/"+src);
		$("#Idownload").click(function(){
			$("#form_download").submit();
		});

		$("#Idownload").click();
	};

	$.fn._Reload = function()
	{
		window.location.reload();
	};
})(jQuery);
