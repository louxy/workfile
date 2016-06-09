(function($){
	var confList, fire_1_addr, fire_2_addr, fire_3_addr, fire_4_addr, fire_5_addr, fire_6_addr, fire_7_addr, fire_8_addr, fire_9_addr, fire_10_addr;
	var protocol_arry = new Array();
	$.fn._ObjectAssignValue = function(src){
		$.each(src, function(param , val){
			if (param == "network.firewall.mode"){

				$("#Ifirewall_mode").find('option').remove();
				confList = "Allow,Deny,Off".split(',');
				$.each(confList, function(n){
					$("#Ifirewall_mode").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});
				if(val[1] == "allow")
					$("#Ifirewall_mode")[0].selectedIndex = 0;
				else if(val[1] == "deny")
					$("#Ifirewall_mode")[0].selectedIndex = 1;
				else if(val[1] == "off")
					$("#Ifirewall_mode")[0].selectedIndex = 2;
			} else if (param == "network.firewall.filter1.ip_address"){
				$("#Iaddr_1").val(val[1]);
				fire_1_addr = val[1];
			} else if (param == "network.firewall.filter1.protocol"){

				$("#Iaddr_1_protocol").find('option').remove();
				confList = "NONE,TCP,UDP,BOTH".split(',');
				$.each(confList, function(n){
					$("#Iaddr_1_protocol").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});
				
				if(val[1] == "none")
					$("#Iaddr_1_protocol")[0].selectedIndex = 0;
				else if(val[1] == "tcp")
					$("#Iaddr_1_protocol")[0].selectedIndex = 1;
				else if(val[1] == "udp")
					$("#Iaddr_1_protocol")[0].selectedIndex = 2;
				else if(val[1] == "both")
					$("#Iaddr_1_protocol")[0].selectedIndex = 3;

			} else if (param == "network.firewall.filter2.ip_address"){
				$("#Iaddr_2").val(val[1]);
				fire_2_addr = val[1];
			} else if (param == "network.firewall.filter2.protocol"){

				$("#Iaddr_2_protocol").find('option').remove();
				confList = "NONE,TCP,UDP,BOTH".split(',');
				$.each(confList, function(n){
					$("#Iaddr_2_protocol").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});
				
				if(val[1] == "none")
					$("#Iaddr_2_protocol")[0].selectedIndex = 0;
				else if(val[1] == "tcp")
					$("#Iaddr_2_protocol")[0].selectedIndex = 1;
				else if(val[1] == "udp")
					$("#Iaddr_2_protocol")[0].selectedIndex = 2;
				else if(val[1] == "both")
					$("#Iaddr_2_protocol")[0].selectedIndex = 3;

			} else if (param == "network.firewall.filter3.ip_address"){
				$("#Iaddr_3").val(val[1]);
				fire_3_addr = val[1];
			} else if (param == "network.firewall.filter3.protocol"){
			
				$("#Iaddr_3_protocol").find('option').remove();
				confList = "NONE,TCP,UDP,BOTH".split(',');
				$.each(confList, function(n){
					$("#Iaddr_3_protocol").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});
				
				if(val[1] == "none")
					$("#Iaddr_3_protocol")[0].selectedIndex = 0;
				else if(val[1] == "tcp")
					$("#Iaddr_3_protocol")[0].selectedIndex = 1;
				else if(val[1] == "udp")
					$("#Iaddr_3_protocol")[0].selectedIndex = 2;
				else if(val[1] == "both")
					$("#Iaddr_3_protocol")[0].selectedIndex = 3;

			} else if (param == "network.firewall.filter4.ip_address"){
				$("#Iaddr_4").val(val[1]);
				fire_4_addr = val[1];
			} else if (param == "network.firewall.filter4.protocol"){

				$("#Iaddr_4_protocol").find('option').remove();
				confList = "NONE,TCP,UDP,BOTH".split(',');
				$.each(confList, function(n){
					$("#Iaddr_4_protocol").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});
				
				if(val[1] == "none")
					$("#Iaddr_4_protocol")[0].selectedIndex = 0;
				else if(val[1] == "tcp")
					$("#Iaddr_4_protocol")[0].selectedIndex = 1;
				else if(val[1] == "udp")
					$("#Iaddr_4_protocol")[0].selectedIndex = 2;
				else if(val[1] == "both")
					$("#Iaddr_4_protocol")[0].selectedIndex = 3;
			} else if (param == "network.firewall.filter5.ip_address"){
				$("#Iaddr_5").val(val[1]);
				fire_5_addr = val[1];
			} else if (param == "network.firewall.filter5.protocol"){

				$("#Iaddr_5_protocol").find('option').remove();
				confList = "NONE,TCP,UDP,BOTH".split(',');
				$.each(confList, function(n){
					$("#Iaddr_5_protocol").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});
				
				if(val[1] == "none")
					$("#Iaddr_5_protocol")[0].selectedIndex = 0;
				else if(val[1] == "tcp")
					$("#Iaddr_5_protocol")[0].selectedIndex = 1;
				else if(val[1] == "udp")
					$("#Iaddr_5_protocol")[0].selectedIndex = 2;
				else if(val[1] == "both")
					$("#Iaddr_5_protocol")[0].selectedIndex = 3;
			} else if (param == "network.firewall.filter6.ip_address"){
				$("#Iaddr_6").val(val[1]);
				fire_6_addr = val[1];
			} else if (param == "network.firewall.filter6.protocol"){

				$("#Iaddr_6_protocol").find('option').remove();
				confList = "NONE,TCP,UDP,BOTH".split(',');
				$.each(confList, function(n){
					$("#Iaddr_6_protocol").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});
				
				if(val[1] == "none")
					$("#Iaddr_6_protocol")[0].selectedIndex = 0;
				else if(val[1] == "tcp")
					$("#Iaddr_6_protocol")[0].selectedIndex = 1;
				else if(val[1] == "udp")
					$("#Iaddr_6_protocol")[0].selectedIndex = 2;
				else if(val[1] == "both")
					$("#Iaddr_6_protocol")[0].selectedIndex = 3;
			} else if (param == "network.firewall.filter7.ip_address"){
				$("#Iaddr_7").val(val[1]);
				fire_7_addr = val[1];
			} else if (param == "network.firewall.filter7.protocol"){

				$("#Iaddr_7_protocol").find('option').remove();
				confList = "NONE,TCP,UDP,BOTH".split(',');
				$.each(confList, function(n){
					$("#Iaddr_7_protocol").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});
				
				if(val[1] == "none")
					$("#Iaddr_7_protocol")[0].selectedIndex = 0;
				else if(val[1] == "tcp")
					$("#Iaddr_7_protocol")[0].selectedIndex = 1;
				else if(val[1] == "udp")
					$("#Iaddr_7_protocol")[0].selectedIndex = 2;
				else if(val[1] == "both")
					$("#Iaddr_7_protocol")[0].selectedIndex = 3;
			} else if (param == "network.firewall.filter8.ip_address"){
				$("#Iaddr_8").val(val[1]);
				fire_8_addr = val[1];
			} else if (param == "network.firewall.filter8.protocol"){

				$("#Iaddr_8_protocol").find('option').remove();
				confList = "NONE,TCP,UDP,BOTH".split(',');
				$.each(confList, function(n){
					$("#Iaddr_8_protocol").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});
				
				if(val[1] == "none")
					$("#Iaddr_8_protocol")[0].selectedIndex = 0;
				else if(val[1] == "tcp")
					$("#Iaddr_8_protocol")[0].selectedIndex = 1;
				else if(val[1] == "udp")
					$("#Iaddr_8_protocol")[0].selectedIndex = 2;
				else if(val[1] == "both")
					$("#Iaddr_8_protocol")[0].selectedIndex = 3;
			} else if (param == "network.firewall.filter9.ip_address"){
				$("#Iaddr_9").val(val[1]);
				fire_9_addr = val[1];
			} else if (param == "network.firewall.filter9.protocol"){

				$("#Iaddr_9_protocol").find('option').remove();
				confList = "NONE,TCP,UDP,BOTH".split(',');
				$.each(confList, function(n){
					$("#Iaddr_9_protocol").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});
				
				if(val[1] == "none")
					$("#Iaddr_9_protocol")[0].selectedIndex = 0;
				else if(val[1] == "tcp")
					$("#Iaddr_9_protocol")[0].selectedIndex = 1;
				else if(val[1] == "udp")
					$("#Iaddr_9_protocol")[0].selectedIndex = 2;
				else if(val[1] == "both")
					$("#Iaddr_9_protocol")[0].selectedIndex = 3;
			} else if (param == "network.firewall.filter10.ip_address"){
				$("#Iaddr_10").val(val[1]);
				fire_10_addr = val[1];
			} else if (param == "network.firewall.filter10.protocol"){

				$("#Iaddr_10_protocol").find('option').remove();
				confList = "NONE,TCP,UDP,BOTH".split(',');
				$.each(confList, function(n){
					$("#Iaddr_10_protocol").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});
				
				if(val[1] == "none")
					$("#Iaddr_10_protocol")[0].selectedIndex = 0;
				else if(val[1] == "tcp")
					$("#Iaddr_10_protocol")[0].selectedIndex = 1;
				else if(val[1] == "udp")
					$("#Iaddr_10_protocol")[0].selectedIndex = 2;
				else if(val[1] == "both")
					$("#Iaddr_10_protocol")[0].selectedIndex = 3;
			}
		});
	};
	$.fn._Go = function(){
		$.fn._InitialPageLang();
		$.fn._InitialFunc();
		$.fn._InitialFireCtrl();
		$('#reloading_container').hide();
		$('#container').show();
	};
	$.fn._InitialPageLang = function(){
		$("#Mfirewall_title")[0].innerHTML				= $.fn._GetLangStr(LT._IP_Filter);
		$("#Mfirewall_mode")[0].innerHTML				= $.fn._GetLangStr(LT._Mode)+":";
		
		$.fn._InitialOptionLang("Ifirewall_mode");
		for(var i=1;i<=10;i++)
		{
			$("#Maddr_"+i)[0].innerHTML					= $.fn._GetLangStr(LT._Address)+" "+i+":";
			$("#Maddr_"+i+"_protocol")[0].innerHTML		= $.fn._GetLangStr(LT._Protocol)+":";
			$.fn._InitialOptionLang("Iaddr_"+i+"_protocol");
		}
	};

	$.fn._InitialFunc = function()
	{
		var IP_regex = "^(22[0-3]|2[0-2][0-3]|1[0-9][0-9]|[0-9][0-9]|[1-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})){3}$";
		var command = "";
		$("#Iaddr_1").change(function(){
			var value = $(this).val();
			if(!value.match(IP_regex)){
				$(this).val(fire_1_addr);
			}

			fire_1_addr = $(this).val();
		});

		$("#Iaddr_2").change(function(){
			var value = $(this).val();
			if(!value.match(IP_regex)){
				$(this).val(fire_2_addr);
			}

			fire_2_addr = $(this).val();
		});

		$("#Iaddr_3").change(function(){
			var value = $(this).val();
			if(!value.match(IP_regex)){
				$(this).val(fire_3_addr);
			}

			fire_3_addr = $(this).val();
		});

		$("#Iaddr_4").change(function(){
			var value = $(this).val();
			if(!value.match(IP_regex)){
				$(this).val(fire_4_addr);
			}

			fire_4_addr = $(this).val();
		});

		$("#Iaddr_5").change(function(){
			var value = $(this).val();
			if(!value.match(IP_regex)){
				$(this).val(fire_5_addr);
			}

			fire_5_addr = $(this).val();
		});

		$("#Iaddr_6").change(function(){
			var value = $(this).val();
			if(!value.match(IP_regex)){
				$(this).val(fire_6_addr);
			}

			fire_6_addr = $(this).val();
		});

		$("#Iaddr_7").change(function(){
			var value = $(this).val();
			if(!value.match(IP_regex)){
				$(this).val(fire_7_addr);
			}

			fire_7_addr = $(this).val();
		});

		$("#Iaddr_8").change(function(){
			var value = $(this).val();
			if(!value.match(IP_regex)){
				$(this).val(fire_8_addr);
			}

			fire_8_addr = $(this).val();
		});

		$("#Iaddr_9").change(function(){
			var value = $(this).val();
			if(!value.match(IP_regex)){
				$(this).val(fire_9_addr);
			}

			fire_9_addr = $(this).val();
		});

		$("#Iaddr_10").change(function(){
			var value = $(this).val();
			if(!value.match(IP_regex)){
				$(this).val(fire_10_addr);
			}

			fire_10_addr = $(this).val();
		});


		$("#Icon_setting_save_pic").bind('click', function(){
			var firewall_mode = "";
			
			if($("#Ifirewall_mode")[0].selectedIndex == 0)
				firewall_mode = "allow";
			else if($("#Ifirewall_mode")[0].selectedIndex == 1)
				firewall_mode = "deny";
			else if($("#Ifirewall_mode")[0].selectedIndex == 2)
				firewall_mode = "off";

			for(var i=1;i<=10;i++){
				if($("#Iaddr_"+i+"_protocol")[0].selectedIndex == 0)
					protocol_arry[i-1] = "none";
				else if($("#Iaddr_"+i+"_protocol")[0].selectedIndex == 1)
					protocol_arry[i-1] = "tcp";
				else if($("#Iaddr_"+i+"_protocol")[0].selectedIndex == 2)
					protocol_arry[i-1] = "udp";
				else if($("#Iaddr_"+i+"_protocol")[0].selectedIndex == 3)
					protocol_arry[i-1] = "both";
			}

			if($.fn._CheckIPaddress())
				return;
			
			command = 	"network.firewall.mode"						+"="+	firewall_mode+"&";
				
			for(var i=1;i<=10;i++){
				command = command + "network.firewall.filter"+i+".protocol"	+"="+	protocol_arry[i-1] +"&";

				if(protocol_arry[i-1] != "none")
					command = command + "network.firewall.filter"+i+".ip_address"	+"="+	$("#Iaddr_"+i).val() +"&";
			}

			$.fn._SetParamByMask(command, $.fn._GetLangStr(LT._Reloading), 3000);
		});

		$("#Icon_setting_default_pic").bind('click', function(){
			if(confirm($.fn._GetLangStr(LT._Reset_to_default_Warning))){
				$.fn._DefaultParam( $.fn._GetLangStr(LT._Reloading), 5000);
			}
		});
	};

	$.fn._CheckIPaddress = function()
	{
		var IP_regex = "^(22[0-3]|2[0-2][0-3]|1[0-9][0-9]|[0-9][0-9]|[1-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})){3}$";
		var ret = 0;
		for(var i=1;i<=10;i++)
		{
			if(protocol_arry[i-1] != "none"){
				if(!($("#Iaddr_"+i).val().match(IP_regex))){
					alert("Please modify the valid IP Address or format at  "+$.fn._GetLangStr(LT._Address)+" "+i);
					$("#Iaddr_"+i).focus();
					ret = 1;
					return ret;
				}
			}
		}

		return ret;
	};

	$.fn._InitialFireCtrl = function()
	{
		for(var i=1;i<=10;i++)
		{
			$("#Iaddr_"+i+"_protocol").change(function(){
				if(this.selectedIndex == 0){
					$(this).siblings("label").attr("disabled",true);
					$(this).siblings("input").attr("disabled",true);
				} else {
					$(this).siblings("label").attr("disabled",false);
					$(this).siblings("input").attr("disabled",false);
				}
			});

			$("#Iaddr_"+i+"_protocol").change();
		}
	};
})(jQuery);