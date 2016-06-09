(function($){	
	var frameMode, downUp, leftRight, keepRatio, CenterX, CenterY, CenterRadius;
	var node= new Array('downup_mirror', 'leftright_mirror', 'keep_ratio', 'frame_mode');
	$.fn._ObjectAssignValue = function(src){
		$.each(src, function(param , val){
			if(param == "lens.dewarp.center_x"){
				CenterX = val[1];
			}else if(param == "lens.dewarp.center_y"){
				CenterY = val[1];
			}else if(param == "lens.dewarp.center_radius"){
				CenterRadius = val[1];
			}
		});
	};
	$.fn._Go = function(){
		$.fn._InitialVal();
		$.fn._GenerateView();
	};

	$.fn._InitialVal = function(){

		//if($.cookie('downup_mirror') == undefined)
		for(var key in node){
			var param = node[key];
			var tmp ="";
			if(param == "downup_mirror"){

				if($.cookie('downup_mirror') == undefined){
					$.cookie('downup_mirror', 'off', { expires: 365, path: '/' });
					downUp = false;
				}else{
					if($.cookie('downup_mirror') == 'off'){
						downUp = false;
					}else if($.cookie('downup_mirror') == 'on'){
						downUp = true;
					}
				}

			}else if(param == "leftright_mirror"){

				if($.cookie('leftright_mirror') == undefined){
					$.cookie('leftright_mirror', 'off', { expires: 365, path: '/' });
					leftRight = 'off';
				}else{
					if($.cookie('leftright_mirror') == 'off'){
						leftRight = false;
					}else if($.cookie('leftright_mirror') == "on"){
						leftRight = true;
					}
				}

			}else if(param == "keep_ratio"){

				if($.cookie('keep_ratio') == undefined){
					$.cookie('keep_ratio', 'on', { expires: 365, path: '/' });
					keepRatio = true;
				}else{
					if($.cookie('keep_ratio') == 'off'){
						keepRatio = false;
					}else if($.cookie('keep_ratio') == 'on'){
						keepRatio = true;
					}
				}

			}else if(param == "frame_mode"){
				//console.log("Mode is:" + $.cookie('fish_mode'));
				if($.cookie('fish_mode') == undefined){
					//alert("undefined");
					$.cookie('fish_mode', '3', { expires: 365, path: '/' });
					frameMode = 3;
				}else{
					frameMode = $.cookie('fish_mode');
				}				
			}
		}
	};

	$.fn._GenerateView = function(){
		
		// if video player is activex
		if($.cookie('def_video_player') == DEFINE_ACTIVEX)
		{
			$.getScript('/js/activex.js', function() {	
				$.fn._ActiexAppendFishLive("FliveView_Activex");
				$.fn._StartActivexF(frameMode, downUp, leftRight, keepRatio, CenterX, CenterY, CenterRadius);
			});
		}
	}
})(jQuery);