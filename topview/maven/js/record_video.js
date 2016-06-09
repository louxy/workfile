(function($){
	$.fn._ObjectAssignValue = function(src){
		$.each(src, function(param , val){
		});
	};
	$.fn._Go = function(){
		$.fn._InitialVideo();
	};

	$.fn._InitialVideo = function(){
		$("#block_content_description")[0].innerHTML = $.fn._GetLangStr(LT._Reloading);
		$(".blockContent > center > img").attr("src","/css/images/animated_progress.gif");
		$.blockUI({ 
			message:$("#blockUI"),
			css:{
				width:'300px'
			}
		});
		
		var URL = new Array();
		var url = document.URL.split('?');
		var len = 0;
		var action = "", file = "";
		
		len = url[1].indexOf('=');

		action = url[1].slice(0,len);
		file = url[1].slice(len+1,url[1].length);

		if(action == "filename")
		{
			$.ajax({
				url:'/cgi-bin/set?'+"system.create.sd_file_link="+file,
				dataType:'json',
				cache:false,
				success:function(data){
				},
				error:function(xhr, textStatus, errorThrown){
				},
				complete:function(){
					file = "plugin/"+url[1].slice(len+1,url[1].length);

					$("<video  width=\"640\" height=\"360\" controls preload=\"none\" id=\"sd_file_video\">"+
						"<source src=\""+file+"\" type=\"video/mp4\"></source></video>").appendTo("#sd_file_area");
					setTimeout(function(){
						var html5 = $("#sd_file_video").get(0);
						html5.play();
						$.unblockUI();
						html5 = null;
					}, 1000);
				}
			});
		}
	};	
})(jQuery);
