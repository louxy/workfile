(function($){
	
	var downUp, leftRight, ratio, mode, tmp_LoginID;
	var pic_view=['fisheye','panaroma','quad','fview1','fview2','fview3','fview4'];
	var node= new Array('downup_mirror', 'leftright_mirror', 'keep_ratio', 'frame_mode');
	$.fn._ObjectAssignValue = function(src){
		$.each(src, function(param , val){
			if(param == "LoginID"){
				tmp_LoginID = val[1];
				console.log("tmp_LoginID="+tmp_LoginID);
				if(tmp_LoginID != "admin"){
					$("#at_correction").css('display', 'none');
					$("#at_area").css("width", "8%");
				}
			}
		});
	};
	$.fn._Go = function(){
		$.fn._InitialValue();
		$.fn._InitialPageLang();
		$.fn._InitialVideo();
		$.fn._InitialFunc();
		$('#reloading_container').hide();
		$('#container').show();
	};
	
	$.fn._InitialValue = function(){

		for(var key in node){
			var param = node[key];
			if(param == "downup_mirror"){

				if($.cookie('downup_mirror') == undefined){
					$.cookie('downup_mirror', 'off', { expires: 365, path: '/' });
					downUp = 'off';
				}else{
					downUp = $.cookie('downup_mirror');
				}

			}else if(param == "leftright_mirror"){

				if($.cookie('leftright_mirror') == undefined){
					$.cookie('leftright_mirror', 'off', { expires: 365, path: '/' });
					leftRight = 'off';
				}else{
					leftRight = $.cookie('leftright_mirror');
				}

			}else if(param == "keep_ratio"){

				if($.cookie('keep_ratio') == undefined){
					$.cookie('keep_ratio', 'on', { expires: 365, path: '/' });
					ratio = 'on';
				}else{
					ratio = $.cookie('keep_ratio');
				}

				var confList = "ON,OFF".split(',');
				$("#ratio_enable").find('option').remove();
				$.each(confList, function(n){
					$("#ratio_enable").append($("<option></option>").attr("value",confList[n]).text(confList[n]));
				});
				
				if (ratio == "on"){
					$("#ratio_enable")[0].selectedIndex = 0;
				} else if (ratio == "off"){
					$("#ratio_enable")[0].selectedIndex = 1;
				}

			}else if(param == "frame_mode"){
				
				if($.cookie('fish_mode') == undefined){
					$.cookie('fish_mode', '3', { expires: 365, path: '/' });
					mode = 3;
				}else{
					mode = $.cookie('fish_mode');
				}
				
				$.fn._PicStatus();
				switch(parseInt(mode)){
					case 0:
						$.cookie('fview1_status', 'on', { expires: 365, path: '/' });
						$("#activex_fview1").attr("src","/css/images/fview1_icon.png");
						break;
					case 1:
						$.cookie('quad_status', 'on', { expires: 365, path: '/' });
						$("#activex_quad").attr("src","/css/images/quad_icon.png");
						break;
					case 2:
						$.cookie('fview3_status', 'on', { expires: 365, path: '/' });
						$("#activex_fview3").attr("src","/css/images/fview3_icon.png");
						break;
					case 3:
						$.cookie('fisheye_status', 'on', { expires: 365, path: '/' });
						$("#activex_fisheye").attr("src","/css/images/fisheye_icon.png");
						break;
					case 4:
						$.cookie('fview2_status', 'on', { expires: 365, path: '/' });
						$("#activex_fview2").attr("src","/css/images/fview2_icon.png");
						break;
					case 5:
						$.cookie('panaroma_status', 'on', { expires: 365, path: '/' });
						$("#activex_panaroma").attr("src","/css/images/panaroma_icon.png");
						break;
					case 6:
						$.cookie('fview4_status', 'on', { expires: 365, path: '/' });
						$("#activex_fview4").attr("src","/css/images/fview4_icon.png");
						break;
				}
				
			}
		}
	};

	$.fn._InitialPageLang = function(){
		$.fn._InitialOptionLang("player_select");
	};

	$.fn._InitialFunc = function()
	{
		$("#video_display").bind('change', function(){

			var ds = $("#video_display").val();
			
			if( ds == 'OFF'){
				window.fish_frame_tage._DownUpMirror(false);
				window.fish_frame_tage._LeftRightMirror(false);
				$.cookie('downup_mirror', 'off', { expires: 365, path: '/' });
				$.cookie('leftright_mirror', 'off', { expires: 365, path: '/' });
			}
			else if ( ds == 'Flip') {
				window.fish_frame_tage._DownUpMirror(true);
				window.fish_frame_tage._LeftRightMirror(false);				
				$.cookie('downup_mirror', 'on', { expires: 365, path: '/' });
				$.cookie('leftright_mirror', 'off', { expires: 365, path: '/' });
			}
			else if ( ds == 'Mirror'){
				window.fish_frame_tage._DownUpMirror(false);
				window.fish_frame_tage._LeftRightMirror(true);
				$.cookie('downup_mirror', 'off', { expires: 365, path: '/' });
				$.cookie('leftright_mirror', 'on', { expires: 365, path: '/' });
			}
			else if ( ds == 'Both'){
				window.fish_frame_tage._DownUpMirror(true);
				window.fish_frame_tage._LeftRightMirror(true);				
				$.cookie('downup_mirror', 'on', { expires: 365, path: '/' });
				$.cookie('leftright_mirror', 'on', { expires: 365, path: '/' });
			}

		});

		$("#ratio_enable").bind('change', function(){

			var ds = $("#ratio_enable").val();

			if( ds == 'ON'){
				window.fish_frame_tage._KeepRatio(true);
				$.cookie('keep_ratio', 'on', { expires: 365, path: '/' });
			}
			else if ( ds == 'OFF') {
				window.fish_frame_tage._KeepRatio(false);
				$.cookie('keep_ratio', 'off', { expires: 365, path: '/' });
			}

		});

		$("#activex_fisheye").bind('click', function(){

			if($.cookie('fisheye_status') == "off"){
				$.cookie('fisheye_status', 'on', { expires: 365, path: '/' });
				$("#activex_fisheye").attr("src","/css/images/fisheye_icon.png");
			}

			$.fn._modi_status('fisheye_status');

			$.cookie('fish_mode', '3', { expires: 365, path: '/' });
			window.fish_frame_tage._SetFrameMode(3);

		});
		
		$("#activex_panaroma").bind('click', function(){

			if($.cookie('panaroma_status') == "off"){
				$.cookie('panaroma_status', 'on', { expires: 365, path: '/' });
				$("#activex_panaroma").attr("src","/css/images/panaroma_icon.png");
			}	
			
			$.fn._modi_status('panaroma_status');
			
			$.cookie('fish_mode', '5', { expires: 365, path: '/' });
			window.fish_frame_tage._SetFrameMode(5);
		});

		$("#activex_quad").bind('click', function(){

			if($.cookie('quad_status') == "off"){
				$.cookie('quad_status', 'on', { expires: 365, path: '/' });
				$("#activex_quad").attr("src","/css/images/quad_icon.png");
			}	
		
			$.fn._modi_status('quad_status');
			
			$.cookie('fish_mode', '1', { expires: 365, path: '/' });
			window.fish_frame_tage._SetFrameMode(1);
		});

		$("#activex_fview1").bind('click', function(){

			if($.cookie('fview1_status') == "off"){
				$.cookie('fview1_status', 'on', { expires: 365, path: '/' });
				$("#activex_fview1").attr("src","/css/images/fview1_icon.png");
			}	
			
			$.fn._modi_status('fview1_status');
			$.cookie('fish_mode', '0', { expires: 365, path: '/' });
			window.fish_frame_tage._SetFrameMode(0);
		});

		$("#activex_fview2").bind('click', function(){

			if($.cookie('fview2_status') == "off"){
				$.cookie('fview2_status', 'on', { expires: 365, path: '/' });
				$("#activex_fview2").attr("src","/css/images/fview2_icon.png");
			}			
		
			$.fn._modi_status('fview2_status');
			
			$.cookie('fish_mode', '4', { expires: 365, path: '/' });
			window.fish_frame_tage._SetFrameMode(4);
		});

		$("#activex_fview3").bind('click', function(){
			if($.cookie('fview3_status') == "off"){
				$.cookie('fview3_status', 'on', { expires: 365, path: '/' });
				$("#activex_fview3").attr("src","/css/images/fview3_icon.png");
			}	
			
			$.fn._modi_status('fview3_status');

			$.cookie('fish_mode', '2', { expires: 365, path: '/' });
			window.fish_frame_tage._SetFrameMode(2);
		});

		$("#activex_fview4").bind('click', function(){
			if($.cookie('fview4_status') == "off"){
				$.cookie('fview4_status', 'on', { expires: 365, path: '/' });
				$("#activex_fview4").attr("src","/css/images/fview4_icon.png");
			}		
			
			$.fn._modi_status('fview4_status');

			$.cookie('fish_mode', '6', { expires: 365, path: '/' });
			window.fish_frame_tage._SetFrameMode(6);
		});
        
		$("#activex_fulscren").bind('click', function(){
            window.fish_frame_tage._FullScreen(true);
		});

		$("#activex_correction").bind('click', function(){
            window.fish_frame_tage._Correction();
		}); 		
	};

	$.fn._InitialVideo = function(){
		
		var confList = "OFF,Flip,Mirror,Both".split(',');
		$("#video_display").find('option').remove();		
		$.each(confList, function(n){
			$("#video_display").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
		});

		if(downUp == 'off' && leftRight == 'off')
			$("#video_display")[0].selectedIndex = 0;
		else if (downUp == 'on' && leftRight == 'off')
			$("#video_display")[0].selectedIndex = 1;
		else if (downUp == 'off' && leftRight == 'on')
			$("#video_display")[0].selectedIndex = 2;
		else if (downUp == 'on' && leftRight == 'on')
			$("#video_display")[0].selectedIndex = 3;

        $("#video_orientation")[0].style.display="none";
        $("#video_display")[0].style.display="none";
	};
		
	$.fn._PicStatus = function(){
		
		$.each(pic_view, function(n){
			$.cookie(pic_view[n]+'_status', 'off',{expires:365, path: '/'});
		});
	};

	$.fn._modi_status = function(src){

		$.each(pic_view, function(n){
			if(pic_view[n]+'_status' != src){
				$.cookie(pic_view[n]+'_status', 'off',{expires:365, path: '/'});
				$("#activex_"+pic_view[n]).attr("src","/css/images/"+pic_view[n]+"_dis.png");
			}
		});
	}

})(jQuery);
