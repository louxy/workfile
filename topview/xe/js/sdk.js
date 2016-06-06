(function($){

	$.fn._Go = function()
	{
		var $cmd_body = $("table#Icmd_body")
		, $cmd_tbody = $("<tbody />")
		, $res_tbody = $("<tbody />")
		;

		$("<tr><td><span>Command List:</span></td><td>&nbsp;</td></tr>").appendTo($cmd_tbody);
		$("<tr>"+
			"<td><span>Get Command:</span></td>"+
			"<td>"+
				"<div><textarea id=\"Iget_cmd_area\" rows=\"4\"></textarea></div>"+
				"<div><input type=\"button\" id=\"Iget_go\" value=\"go\" style=\"width:100px;height:30px;\"></div>"+
			"</td>"+
		"</tr>").appendTo($cmd_tbody);
		$("<tr>"+
			"<td><span>Set Command:</span></td>"+
			"<td>"+
				"<div><textarea id=\"Iset_cmd_area\" rows=\"4\"></textarea></div>"+
				"<div><input type=\"button\" id=\"Iset_go\" value=\"go\" style=\"width:100px;height:30px;\"></div>"+
			"</td>"+
		"</tr>").appendTo($cmd_tbody);
		$("<tr>"+
			"<td><span>Response result:</span></td>"+
			"<td><textarea id=\"Ires_result_area\" rows=\"20\" cols=\"100\"></textarea></td>"+
		"</tr>").appendTo($res_tbody);
		$($cmd_tbody).appendTo($cmd_body);
		$($res_tbody).appendTo($cmd_body);

		$("#Iget_go").bind('click', function(){
			$.fn._GetGo();
		});

		$("#Iset_go").bind('click', function(){
			$.fn._SetGo();
		});
	};
		
	$.fn._GetGo = function()
	{
		$("#Ires_result_area").val("");
		var db = $.fn._ParserQuestCmdFormat($("#Iget_cmd_area").val());
		$.ajax({
            beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
            url:"/cgi-bin/get?",
            dataType:'json',
            type:'POST',
            data:db,
            cache:false,
            success:function(data){
            	$.fn._ParserResMessage("get", data);
            },
            complete:function(data){
                $.removeCookie('ipcamera', { path: '/' });
            }
        });
	};
	
	$.fn._SetGo = function()
	{
		$("#Ires_result_area").val("");
		var db = $.fn._ParserSendCmdFormat($("#Iset_cmd_area").val());
		$.ajax({
            beforeSend:function(){$.cookie('ipcamera', 'test', { expires: 1, path: '/' });},
            url:"/cgi-bin/set?",
            dataType:'json',
            type:'POST',
            data:db,
            cache:false,
            success:function(data){
            	$.fn._ParserResMessage("set", data);
            },
            complete:function(data){
                $.removeCookie('ipcamera', { path: '/' });
            }
        });
	};

	$.fn._ParserResMessage = function(type ,data)
	{
		var ret = "";
		$.each(data, function(param, val){
			if(param == "_")
				return true;
			else
				ret += "["+type+"]:"+param+",[value]:"+val[1]+",[status]:"+val[0]+"<br>";
		});

		$("#Ires_result_area").val(ret);
	};

	$.fn._ParserQuestCmdFormat = function(src)
	{
		var tmp = src.split("&");
		var cmd = "";
		var db;
		$.each(tmp, function(n){
			cmd += "\""+tmp[n]+"\":\"\",";
		});
		cmd = "{" + cmd.slice(0, cmd.length - 1) + "}";
		db = $.parseJSON(cmd);
		return db;
	};

	$.fn._ParserSendCmdFormat = function(src)
	{
		var tmp = src.split("&");
		var cmd = "";
		var db;
		$.each(tmp, function(n){
			var ind = tmp[n].indexOf('=');
			cmd += "\""+tmp[n].slice(0, ind)+"\":\""+tmp[n].slice(ind + 1, tmp[n].length)+"\",";
		});
		cmd = "{" + cmd.slice(0, cmd.length - 1) + "}";
		db = $.parseJSON(cmd);
		return db;
	};
})(jQuery);