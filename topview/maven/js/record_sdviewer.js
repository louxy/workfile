
$.extend({
	store_param:function(url,width,height,file){
		$.ajax({
			url:'/cgi-bin/set?'+url,
			dataType:'json',
			cache:false,
			success:function(data){
			},
			error:function(xhr, textStatus, errorThrown){
			},
			complete:function(){
				$.unblockUI();
				PlayFile(width,height,file);
			}
		});
	}
});

function PlayFile(width,height,file)
{
	$('.media').media({ 
		width:     width, 
		height:    height, 
		autoplay:  true, 
		src:       file,
		caption:   false
	});
}

function InitialPageLanguage()
{
	// Lang = LT;

	// $("#block_header_description")[0].innerHTML = $.GetLangStr(Lang._Loading_data);
	// $("#block_content_description")[0].innerHTML = $.GetLangStr(Lang._MWwait_data);
	
	// $.blockUI({ 
	// 	message:$("#blockUI"),
	// 	css:{
	// 		width:'300px'
	// 	}
	// });
	
	var browser_height = $(window).height();
	var borwser_width = $(window).width();
	var URL = new Array();
	var url = document.URL.split('?');
	var len = 0;
	var action = "", file = "";
	
	len = url[1].indexOf('=');

	action = url[1].slice(0,len);
	file = url[1].slice(len+1,url[1].length);
	console.log("file: " + file + " browser_height:"+browser_height +" borwser_width: " + borwser_width);

	if(action == "filename")
	{
		$.store_param("system.create.sd_file_link="+file,borwser_width,browser_height,"plugin/"+file);
	}
}