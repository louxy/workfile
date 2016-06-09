(function($){
	var inital_dhcp, ip, subnet, gateway, primary_dns, second_dns, host_name, ipv6_addr, ipv6_default, ipv6_dns, osd_text;
	var in_htp_port, in_htps_port, htp_port, htps_port;
	var split_tmp, confList;
	var default_prefix_len, route_prefix_len;
	var port_list = new Array();
	var default_prefix_len_range = new Array(), route_prefix_len_range = new Array();
	$.fn._ObjectAssignValue = function(src){
		$.each(src, function(param , val){
			if(param == "network.host_name")
			{
				$("#Inet_camera_name").val(val[1]);
				host_name = val[1];
			}
			else if(param == "network.dhcp")
			{
				$("#Idhcp").attr("checked",val[1] == "on" ? true:false);
				inital_dhcp = val[1];
			}
			else if(param == "network.ipv4")
			{
				var par = new Array();
				par = val[1].split('/');
				$("#Inet_ip").val(par[0]); ip = par[0];
				$("#Inet_subnet").val(par[1]); subnet = par[1];
				$("#Inet_gateway").val(par[2]); gateway = par[2];
			}
			else if(param == "network.primary_dns")
			{
				$("#Inet_primary_dns").val(val[1]);
				primary_dns = val[1];
			}
			else if(param == "network.secondary_dns")
			{
				$("#Inet_second_dns").val(val[1]);
				second_dns = val[1];
			}
			else if(param == "network.upnp")
				$("input[name=Nupnp][value='"+val[1]+"']").attr('checked',true);
			else if(param == "system.osd.mode")
			{ 
				confList = "OFF,Hostname,Text".split(',');
				$("#Iosd_name").find('option').remove();
				$.each(confList, function(n){
					if(confList[n].toLowerCase() == val[1])
						$("#Iosd_name").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
					else
						$("#Iosd_name").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});
			}
			else if(param == "system.osd.pos")
			{
				confList = "Up-left,Up-middle,Up-right,Bottom-left,Bottom-middle,Bottom-right".split(',');
				confVal = "0,1,2,3,4,5".split(",");
				$("#Iosd_name_position").find('option').remove();
				$.each(confVal, function(n){
					if(confVal[n] == val[1])
						$("#Iosd_name_position").append($("<option></option>").attr("value", confVal[n]).text(confList[n]).attr("selected","true"));
					else
						$("#Iosd_name_position").append($("<option></option>").attr("value", confVal[n]).text(confList[n]));
				});
			}
			else if(param == "system.datetime.display"){
				$("input[name=Nosd_time][value='"+val[1]+"']").attr('checked',true);
			}			
			else if(param == "system.datetime.pos")
			{
				confList = "Up-left,Up-middle,Up-right,Bottom-left,Bottom-middle,Bottom-right".split(',');
				confVal = "0,1,2,3,4,5".split(",");
				$("#Iosd_time_position").find('option').remove();
				$.each(confVal, function(n){
					if(confVal[n] == val[1])
						$("#Iosd_time_position").append($("<option></option>").attr("value", confVal[n]).text(confList[n]).attr("selected","true"));
					else
						$("#Iosd_time_position").append($("<option></option>").attr("value", confVal[n]).text(confList[n]));
				});
			}
			else if(param == "network.http_port")
			{
				$("#Ihttp_port").val(val[1]);
				htp_port = val[1];
				in_htp_port = val[1];
			}
			else if(param == "network.https_port")
			{
				$("#Ihttps_port").val(val[1]);
				htps_port = val[1];
				in_htps_port = val[1];
			}
			else if(param == "system.port.list")
			{
				var port_list_tmp = val[1].split(',');
				$.each(port_list_tmp, function(n){
					port_list[n] = port_list_tmp[n];
				});
			}
			else if(param == "system.osd.text")
			{
				$("#Iosd_text").val(val[1]);
				osd_text = val[1];
			}
			/* ipv6 */
			else if(param == "network.ipv6.enable")
				$("#Ien_ipv6").attr("checked",val[1] == "on" ? true:false);
			else if(param == "network.ipv6.dhcp_enable")
				$("#Ien_ipv6_dhcp").attr("checked",val[1] == "on" ? true:false);
			else if(param == "network.ipv6.router_advertisement")
				$("#Ien_ipv6_router_advert").attr("checked",val[1] == "on" ? true:false);
			else if(param == "network.ipv6.address")
			{
				$("#Ien_ipv6_addr").val(val[1]);
				ipv6_addr = val[1];
			}
			else if(param == "network.ipv6.default_route")
			{
				$("#Ien_ipv6_default").val(val[1]);
				ipv6_default = val[1];
			}
			else if(param == "network.ipv6.address_prefix_len")
			{
				$("#Ien_ipv6_addr_prefix_length").val(val[1]);
				default_prefix_len = val[1];
			}
			else if(param == "network.ipv6.default_route_prefix_len")
			{
				$("#Ien_ipv6_default_prefix_length").val(val[1]);
				route_prefix_len = val[1];
			}
			else if(param == "network.ipv6.address_prefix_len.query_range")
			{
				split_tmp = val[1].split('~');
				$.each(split_tmp, function(n){
					if(n == 0){
						default_prefix_len_range[n] = split_tmp[n].slice(1,split_tmp[n].length);
					}
					else if(n == 1){
						default_prefix_len_range[n] = split_tmp[n].slice(0,split_tmp[n].length-1);
					}
				});

				$("#Ien_ipv6_addr_prefix_length_range")[0].innerHTML 	= "("+default_prefix_len_range[0]+"~"+default_prefix_len_range[1]+")";
			}
			else if(param == "network.ipv6.default_route_prefix_len.query_range")
			{
				split_tmp = val[1].split('~');
				$.each(split_tmp, function(n){
					if(n == 0){
						route_prefix_len_range[n] = split_tmp[n].slice(1,split_tmp[n].length);
					}
					else if(n == 1){
						route_prefix_len_range[n] = split_tmp[n].slice(0,split_tmp[n].length-1);
					}
				});

				$("#Ien_ipv6_default_prefix_length_range")[0].innerHTML 	= "("+route_prefix_len_range[0]+"~"+route_prefix_len_range[1]+")";
			}
			//else if(param == "network.bonjour_enable")
			//	$("input[name=Nbonjour][value='"+val[1]+"']").attr('checked',true);
			else if(param == "network.ipv6.dns_address")
			{
				$("#Ien_ipv6_dns").val(val[1]);
				ipv6_dns = val[1];
			}
			/**/
		});
	};
	$.fn._Go = function(){
		$.fn._InitialPageLang();
		$.fn._InitialDHCPctrl();
		$.fn._InitialIPv6ctrl(); // ipv6
		$.fn._InitialFunc();
		$('#reloading_container').hide();
		$('#container').show();
	};
	$.fn._InitialPageLang = function(){
		$("#Mnet_title")[0].innerHTML 						= $.fn._GetLangStr(LT._Network_setting);
		$("#Mview_net_infor")[0].innerHTML 					= $.fn._GetLangStr(LT._View_current_network_setting)+":";
		$("#Mnet_ipv4_title")[0].innerHTML 					= $.fn._GetLangStr(LT._IPv4_addr_conf);
		$("#Mhttp_port")[0].innerHTML 						= $.fn._GetLangStr(LT._Http_port)+":";
		$("#Mhttps_port")[0].innerHTML 						= $.fn._GetLangStr(LT._Https_port)+":";
		$("#Mupnp_title")[0].innerHTML 						= $.fn._GetLangStr(LT._UPNP);
		$("#Mosd_title")[0].innerHTML 						= $.fn._GetLangStr(LT._OSD);
		$("#Mnet_camera_name")[0].innerHTML 				= $.fn._GetLangStr(LT._Camera_Name)+":";
		$("#Mdhcp")[0].innerHTML 							= $.fn._GetLangStr(LT._DHCP)+":";
		$("#Mnet_ip")[0].innerHTML 							= $.fn._GetLangStr(LT._IPv4_addr)+":";
		$("#Mnet_subnet")[0].innerHTML 						= $.fn._GetLangStr(LT._Subnet_Mask)+":";
		$("#Mnet_gateway")[0].innerHTML 					= $.fn._GetLangStr(LT._Default_Gateway)+":";
		$("#Mnet_primary_dns")[0].innerHTML 				= $.fn._GetLangStr(LT._Primary_DNS)+":";
		$("#Mnet_second_dns")[0].innerHTML 					= $.fn._GetLangStr(LT._Secondary_DNS)+":";
		/* */
		$("#Mnet_ipv6_title")[0].innerHTML 					= $.fn._GetLangStr(LT._IPv6_addr_conf);
		$("#Men_ipv6")[0].innerHTML 						= $.fn._GetLangStr(LT._Enable)+":";
		$("#Men_ipv6_router_advert")[0].innerHTML 			= $.fn._GetLangStr(LT._Accept_IPv6_router)+":";
		$("#Men_ipv6_dhcp")[0].innerHTML 					= $.fn._GetLangStr(LT._Enable_dhcpv6)+":";
		$("#Men_ipv6_addr")[0].innerHTML 					= $.fn._GetLangStr(LT._IPv6_addr)+":";
		$("#Men_ipv6_default")[0].innerHTML 				= $.fn._GetLangStr(LT._IPv6_default_router_addr)+":";
		/**/
		$("#Mupnp")[0].innerHTML 							= $.fn._GetLangStr(LT._Action)+":";
		$("#upnp_on")[0].innerHTML 							= $.fn._GetLangStr(LT._ON);
		$("#upnp_off")[0].innerHTML 						= $.fn._GetLangStr(LT._OFF);
		$("#Mosd_name")[0].innerHTML 						= $.fn._GetLangStr(LT._Mode)+":";
		$("#Mosd_time")[0].innerHTML 						= $.fn._GetLangStr(LT._Menu_System_date_time)+":";
		$("#osd_time_on")[0].innerHTML 						= $.fn._GetLangStr(LT._ON);
		$("#osd_time_off")[0].innerHTML 					= $.fn._GetLangStr(LT._OFF);
		$("#Mosd_name_position")[0].innerHTML               = $.fn._GetLangStr(LT._Position)+":";
		$("#Mosd_time_position")[0].innerHTML               = $.fn._GetLangStr(LT._Position)+":";
		/* */
		//$("#Mbonjour_title")[0].innerHTML 					= $.fn._GetLangStr(LT._bonjour);
		//$("#Mbonjour")[0].innerHTML 						= $.fn._GetLangStr(LT._Action)+":";
		//$("#bonjour_on")[0].innerHTML 						= $.fn._GetLangStr(LT._ON);
		//$("#bonjour_off")[0].innerHTML 						= $.fn._GetLangStr(LT._OFF);
		$("#Men_ipv6_addr_prefix_length")[0].innerHTML 		= $.fn._GetLangStr(LT._subnet_prefix_length)+":";
		$("#Men_ipv6_default_prefix_length")[0].innerHTML 	= $.fn._GetLangStr(LT._subnet_prefix_length)+":";
		$("#Men_ipv6_dns")[0].innerHTML 					= $.fn._GetLangStr(LT._IPv6_dns)+":";
		/**/
		$("#Iview_net_infor").val($.fn._GetLangStr(LT._View));
		$.fn._InitialOptionLang("Iosd_name");
		$.fn._InitialOptionLang("Iosd_name_position");
		$.fn._InitialOptionLang("Iosd_time_position");
	};

	$.fn._InitialDHCPctrl = function()
	{
		$("input[name=Ndhcp]").change(function(){
			var stats = $(this).is(":checked") == false? "off":"on";
			if(stats == "on")
			{
				$("#Inet_ip").attr("disabled",true);
				$("#Inet_subnet").attr("disabled",true);
				$("#Inet_gateway").attr("disabled",true);
				$("#Inet_primary_dns").attr("disabled",true);
				$("#Inet_second_dns").attr("disabled",true);
			}
			else if(stats == "off")
			{
				$("#Inet_ip").attr("disabled",false);
				$("#Inet_subnet").attr("disabled",false);
				$("#Inet_gateway").attr("disabled",false);
				$("#Inet_primary_dns").attr("disabled",false);
				$("#Inet_second_dns").attr("disabled",false);
			}
		});

		$("input[name=Ndhcp]").change();
	};

	$.fn._InitialIPv6ctrl = function()
	{
		$("input[name=Nen_ipv6]").change(function(){
			var stats = $(this).is(":checked") == false? "off":"on";
			if(stats == "on")
			{
				$("#Ien_ipv6_dhcp").attr("disabled",false);
				$("#Ien_ipv6_router_advert").attr("disabled",false);
				$("#Ien_ipv6_addr").attr("disabled",false);
				$("#Ien_ipv6_default").attr("disabled",false);
				$("#Ien_ipv6_dns").attr("disabled",false);

				if($("#Ien_ipv6_addr").val() == "")
					$("#Ien_ipv6_addr_prefix_length").attr("disabled",true);
				else
					$("#Ien_ipv6_default_prefix_length").attr("disabled",false);

				if($("#Ien_ipv6_default").val() == "")
					$("#Ien_ipv6_default_prefix_length").attr("disabled",true);
				else
					$("#Ien_ipv6_addr_prefix_length").attr("disabled",false);
			}
			else if(stats == "off")
			{
				$("#Ien_ipv6_dhcp").attr("disabled",true);
				$("#Ien_ipv6_router_advert").attr("disabled",true);
				$("#Ien_ipv6_addr").attr("disabled",true);
				$("#Ien_ipv6_default").attr("disabled",true);
				$("#Ien_ipv6_addr_prefix_length").attr("disabled",true);
				$("#Ien_ipv6_default_prefix_length").attr("disabled",true);
				$("#Ien_ipv6_dns").attr("disabled",true);
			}
		});

		$("input[name=Nen_ipv6]").change();
	};

	$.fn._native2ascii = function()
	{
		var hostname =  $("#Iosd_text").val();
		var ascii = "", code = null, tmp = null;
		var char = hostname.split('');
		$.each(char, function(n){
			tmp = char[n];
			for(var i = 0; i < tmp.length; i++)
			{
				code = Number(tmp[i].charCodeAt(0));
				if(code>127){
					var charAscii = code.toString(16);
					charAscii=new String("0000").substring(charAscii.length,4)+charAscii;
					ascii+="%5Cu"+charAscii;
				}else
					ascii+=tmp[i];
			}
		});
		
		return ascii;
	};

	$.fn._InitialFunc = function()
	{
		var IP_regex_Max ="^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})){3}$";
		var port_regex = /^\d{1,5}$/;
		var IPv6_regex = /^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$/i;
		var VW2;

		$("#Iview_net_infor").bind('click', function(){
			if(!VW2) 
			{
				VW2 = window.open(""+$.fn._ParserHeader()+"//"+$.fn._ParserIP()+$.fn._ParserPort()+"/www/net_view.html",'uploadmsg','toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=480,height=270');
			} 
			else if(VW2.closed) 
			{
				VW2 = window.open(""+$.fn._ParserHeader()+"//"+$.fn._ParserIP()+$.fn._ParserPort()+"/www/net_view.html",'uploadmsg','toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=480,height=270');		
			}
		 	else 
			{
				VW2.focus();
			}
		});
		
		$("#Icon_setting_save_pic").bind('click', function(){

			if($.fn._checkPortSetting())
				return;
			
			var dhcp = $("input[name='Ndhcp']").is(":checked") == false? "off":"on";
			var ipv6_en = $("input[name='Nen_ipv6']").is(":checked") == false? "off":"on";
			var ipv6_dhcp = $("input[name='Nen_ipv6_dhcp']").is(":checked") == false? "off":"on";
			var ipv6_router_advert = $("input[name='Nen_ipv6_router_advert']").is(":checked") == false? "off":"on";
			var ip = $("#Inet_ip").val() +"/"+	$("#Inet_subnet").val() +"/"+ $("#Inet_gateway").val();
			var final_port = 0;
			var osd_mode = "";

			if($("#Iosd_name")[0].selectedIndex == 0)
				osd_mode = "off";
			else if($("#Iosd_name")[0].selectedIndex == 1)
				osd_mode = "hostname";
			else if($("#Iosd_name")[0].selectedIndex == 2)
				osd_mode = "text";
				
			command = 	"network.upnp"					+'='+ $("input[type=radio][name=Nupnp]:checked").val()+'&'+
						"system.osd.mode"				+'='+ osd_mode+'&'+
						"system.osd.pos"                +'='+ $("#Iosd_name_position").val()+'&'+
						"system.datetime.display"		+'='+ $("input[type=radio][name=Nosd_time]:checked").val()+'&'+
						"system.datetime.pos"           +'='+ $("#Iosd_time_position").val()+'&'+
						"network.http_port"				+'='+ $("#Ihttp_port").val()+'&'+
						"network.https_port"			+'='+ $("#Ihttps_port").val()+'&';
						//"network.bonjour_enable"		+'='+ $("input[type=radio][name=Nbonjour]:checked").val()+'&';

			if(osd_mode == "text")
				command = command + "system.osd.text"	+'='+ $.fn._native2ascii()+'&';

			/* ipv6 */
			if(ipv6_en == "on")
			{				
				command = command + "network.ipv6.enable" 					+"="+ ipv6_en									+'&'+
									"network.ipv6.router_advertisement"		+"="+ ipv6_router_advert						+'&'+
									"network.ipv6.dhcp_enable"				+"="+ ipv6_dhcp									+'&'+
									"network.ipv6.address"					+"="+ $("#Ien_ipv6_addr").val()					+'&'+
									"network.ipv6.default_route" 			+"="+ $("#Ien_ipv6_default").val()				+'&'+
									"network.ipv6.address_prefix_len" 		+"="+ $("#Ien_ipv6_addr_prefix_length").val()	+'&'+
									"network.ipv6.default_route_prefix_len" +"="+ $("#Ien_ipv6_default_prefix_length").val()+'&'+
									"network.ipv6.dns_address"				+"="+ $("#Ien_ipv6_dns").val()+'&';
			}
			else if(ipv6_en == "off")
			{
				command = command + "network.ipv6.enable" 				+"="+ ipv6_en						+'&';
			}
			/**/
		
			// Define the redirect port number
			if($.fn._ParserHeader() == "http:")
				final_port = $("#Ihttp_port").val();
			else if($.fn._ParserHeader() == "https:")
				final_port = $("#Ihttps_port").val();

			if(dhcp == "on")
			{
				if(inital_dhcp == "on")
				{	
					command = command + "network.host_name"		+"="+	$("#Inet_camera_name").val()				+"&";


					if($.fn._ParserHeader() == "http:")
					{
						if(in_htp_port != final_port)
						{
							$.fn._SetParamByMask(command, $.fn._GetLangStr(LT._Reloading), 70000);
							setTimeout(function(){
								window.location.replace(""+$.fn._ParserHeader()+"//"+$.fn._ParserIP()+":"+final_port+"/www/"+$.fn._GetHtmlName()+".html");
							},13000);
						}
						else
							$.fn._SetParamByMask(command, $.fn._GetLangStr(LT._Reloading), 7000);
					}
					else if($.fn._ParserHeader() == "https:")
					{
						if(in_htps_port != final_port)
						{
							$.fn._SetParamByMask(command, $.fn._GetLangStr(LT._Reloading), 70000);
							setTimeout(function(){
								window.location.replace(""+$.fn._ParserHeader()+"//"+$.fn._ParserIP()+":"+final_port+"/www/"+$.fn._GetHtmlName()+".html");
							},13000);
						}
						else
							$.fn._SetParamByMask(command, $.fn._GetLangStr(LT._Reloading), 7000);
					}
				}
				else if(inital_dhcp == "off")
				{	
					command = command +	"network.host_name"		+"="+	$("#Inet_camera_name").val()						+"&"+
										"network.dhcp"			+"="+	dhcp										+"&";
					
					$.fn._dhcp_param(command);
				}
			}
			else if(dhcp == "off")
			{
				if($.fn._checkBroadCastIPSetting())
					return;

				if(inital_dhcp == "on")
				{	
						command = command + "network.ipv4"			+"="+	ip										+"&"+
											"network.host_name"		+"="+	$("#Inet_camera_name").val()					+"&"+
											"network.primary_dns"	+"="+	$("#Inet_primary_dns").val()			+"&"+
											"network.secondary_dns"	+"="+	$("#Inet_second_dns").val()				+"&";
						
						$.fn._SetParamByMask(command, $.fn._GetLangStr(LT._Reloading), 70000);
						setTimeout(function(){
							window.location.replace(""+$.fn._ParserHeader()+"//"+$("#Inet_ip").val()+":"+final_port+"/www/"+$.fn._GetHtmlName()+".html");
						},25000);
						setTimeout(function(){
							command = "network.dhcp"		+'='+"off"	+'&';
							$.fn._SetParam(command);
						},2500);
				}
				else if(inital_dhcp == "off")
				{	
					command = command + "network.host_name"		+"="+	$("#Inet_camera_name").val()						+"&"+
										"network.ipv4"			+"="+	ip											+"&"+
										"network.primary_dns"	+"="+	$("#Inet_primary_dns").val()				+"&"+
										"network.secondary_dns"	+"="+	$("#Inet_second_dns").val()					+"&";

					if($.fn._ParserIP() != $("#Inet_ip").val())
					{
						$.fn._SetParamByMask(command, $.fn._GetLangStr(LT._Reloading), 70000);
						setTimeout(function(){
							window.location.replace(""+$.fn._ParserHeader()+"//"+$("#Inet_ip").val()+":"+final_port+"/www/"+$.fn._GetHtmlName()+".html");
						},13000);
					}
					else
					{
						if($.fn._ParserHeader() == "http:")
						{
							if(in_htp_port != final_port)
							{
								$.fn._SetParamByMask(command, $.fn._GetLangStr(LT._Reloading), 70000);
								setTimeout(function(){
									window.location.replace(""+$.fn._ParserHeader()+"//"+$.fn._ParserIP()+":"+final_port+"/www/"+$.fn._GetHtmlName()+".html");
								},13000);
							}
							else
								$.fn._SetParamByMask(command, $.fn._GetLangStr(LT._Reloading), 7000);
						}
						else if($.fn._ParserHeader() == "https:")
						{
							if(in_htps_port != final_port)
							{
								$.fn._SetParamByMask(command, $.fn._GetLangStr(LT._Reloading), 70000);
								setTimeout(function(){
									window.location.replace(""+$.fn._ParserHeader()+"//"+$.fn._ParserIP()+":"+final_port+"/www/"+$.fn._GetHtmlName()+".html");
								},13000);
							}
							else
								$.fn._SetParamByMask(command, $.fn._GetLangStr(LT._Reloading), 7000);
						}
					}
				}
			}
		});

		$("#Inet_ip").change(function(){
			var value = $(this).val();
			if(!(value.match(IP_regex_Max))){
				$(this).val(ip);
			}

			ip = $(this).val();
		});

		$("#Inet_subnet").change(function(){
			var value = $(this).val();
			if(!(value.match(IP_regex_Max))){
				$(this).val(subnet);
			}

			subnet = $(this).val();
		});

		
		$("#Inet_gateway").change(function(){
			var value = $(this).val();
			if(!(value.match(IP_regex_Max))){
				$(this).val(gateway);
			}

			gateway = $(this).val();
		});

		$("#Inet_primary_dns").change(function(){
			var value = $(this).val();
			if(!(value.match(IP_regex_Max))){
				$(this).val(primary_dns);
			}

			primary_dns = $(this).val();
		});

		
		$("#Inet_second_dns").change(function(){
			var value = $(this).val();
			if(!(value.match(IP_regex_Max))){
				$(this).val(second_dns);
			}

			second_dns = $(this).val();
		});

		/* ipv6 */
		$("#Ien_ipv6_addr").change(function(){
			var value = $(this).val();
			if(value == ""){}
			else
			{
				if(!IPv6_regex.test(value)){
					$(this).val(ipv6_addr);

					if(ipv6_addr == "")
						$("#Ien_ipv6_addr_prefix_length").attr("disabled",true);
				}
			}
			ipv6_addr = $(this).val();
		});
		
		$("#Ien_ipv6_default").change(function(){
			var value = $(this).val();
			if(value == ""){}
			else
			{
				if(!IPv6_regex.test(value)){
					$(this).val(ipv6_default);

					if(ipv6_default == "")
						$("#Ien_ipv6_default_prefix_length").attr("disabled",true);
				}
			}

			ipv6_default = $(this).val();
		});

		$("#Ien_ipv6_addr").keyup(function(){
			if($(this).val().length > 0) {
				$("#Ien_ipv6_addr_prefix_length").attr("disabled",false);
			} else {
				$("#Ien_ipv6_addr_prefix_length").attr("disabled",true);
			}
		});

		$("#Ien_ipv6_default").keyup(function(){
			if($(this).val().length > 0) {
				$("#Ien_ipv6_default_prefix_length").attr("disabled",false);
			} else {
				$("#Ien_ipv6_default_prefix_length").attr("disabled",true);
			}
		});

		$("#Ien_ipv6_dns").change(function(){
			var value = $(this).val();
			if(value == ""){}
			else
			{
				if(!IPv6_regex.test(value)){
					$(this).val(ipv6_dns);
				}
			}

			ipv6_dns = $(this).val();
		});

		$("#Ihttp_port").change(function(){
			var value = $(this).val();
			if((parseInt(value) < 1)||(parseInt(value) > 65535)||!port_regex.test(value)||(value == $("#Ihttps_port").val())){
				$(this).val(htp_port);
			}

			htp_port = $(this).val();
		});

		$("#Ihttps_port").change(function(){
			var value = $(this).val();
			if((parseInt(value) < 1)||(parseInt(value) > 65535)||!port_regex.test(value)||(value == $("#Ihttp_port").val())){
				$(this).val(htps_port);
			}

			htps_port = $(this).val();
			
		});
	
		var number_regex = /^\s*[0-9]+\s*$/;
		$("#Ien_ipv6_addr_prefix_length").change(function(){
			var value = $(this).val();
			if((Number(value) < parseInt(default_prefix_len_range[0]) || Number(value) > parseInt(default_prefix_len_range[1]))|| !number_regex.test(value)){
				$(this).val(default_prefix_len);
			}

			default_prefix_len = $(this).val();
			
		});

		
		$("#Ien_ipv6_default_prefix_length").change(function(){
			var value = $(this).val();
			if((Number(value) < parseInt(route_prefix_len_range[0]) || Number(value) > parseInt(route_prefix_len_range[1]))|| !number_regex.test(value)){
				$(this).val(route_prefix_len);
			}

			route_prefix_len = $(this).val();
		});
		/**/

		$.fn._checkPortSetting = function()
		{
			var h_port, hs_port;
			var number_regex = /^\s*[0-9]+\s*$/;
			h_port = $("#Ihttp_port").val();
			hs_port = $("#Ihttps_port").val();
			var h_ret = 0, hs_ret = 0;
			
			if(!number_regex.test(h_port))
				$("#Ihttp_port").val(htp_port);

			if(!number_regex.test(hs_port))
				$("#Ihttps_port").val(htps_port);

			if(parseInt(h_port) < parseInt(1025) || parseInt(h_port) > parseInt(65535))
			{
				if(parseInt(80) == parseInt(h_port))
					h_ret = 0;
				else
				{
					// checking exist the port number of current system.
					$.each(port_list, function(n,data){
						if(data == h_port){
							if(!(data == in_htp_port)){
								h_ret = 1;
								$("#Ihttp_port").focus();
								return false;
							}
						}
					});

					if(h_ret)	h_ret = 1;
					else
						$("#Ihttp_port").val(htp_port);
				}
			}
			else
			{
				// checking exist the port number of current system.
				$.each(port_list, function(n,data){
					if(data == h_port){
						if(!(data == in_htp_port)){
							h_ret = 1;
							$("#Ihttp_port").focus();
							return false;
						}
					}
				});
			}

			if(parseInt(hs_port) < parseInt(1025) || parseInt(hs_port) > parseInt(65535))
			{
				if(parseInt(443) == parseInt(hs_port))
					hs_ret = 0;
				else
				{
					// checking exist the port number of current system.
					$.each(port_list, function(n,data){
						if(data == hs_port){
							if(!(data == in_htps_port)){
								hs_ret = 1;
								$("#Ihttps_port").focus();
								return false;
							}
						}
					});

					if(hs_ret)	hs_ret = 1;
					else
						$("#Ihttps_port").val(htps_port);
				}
			} 
			else
			{
				// checking exist the port number of current system.
				$.each(port_list, function(n,data){
					if(data == hs_port){
						if(!(data == in_htps_port)){
							hs_ret = 1;
							$("#Ihttps_port").focus();
							return false;
						}
					}
				});
			} 

			// systen has exist the same port.
			if(h_ret || hs_ret){
				alert($.fn._GetLangStr(LT._port_field_warning));
			}

			return h_ret | hs_ret;
		};

		$.fn._checkBroadCastIPSetting = function()
		{
			var ret = 0;
			var subnet_tmp = $("#Inet_subnet").val();
			var ip_tmp = $("#Inet_ip").val();
			var subnet = subnet_tmp.split('.');
			var ipv4 = ip_tmp.split('.');
			var broadcast_addr = "";
			var tmp;

			for ( var i = 0; i < 4; i++)
			{
				tmp = $.fn._toBits((ipv4[i] | ~subnet[i]));

				if(i == 3)
					broadcast_addr += parseInt(tmp, 2);
				else
					broadcast_addr += parseInt(tmp, 2) + ".";
			}

			// debug message
			// console.log(broadcast_addr);

			if(ip_tmp == broadcast_addr){
				$("#Inet_ip").focus();
				alert("The IP address and subnet combination is abnormal, Please modify correct IP address or subnet that want to applying those setting of this camera.");
				return 1;
			}

			return ret;
		}

		$.fn._ipToInt = function(ip)
		{
			var tmp = null, end = "";
			tmp = ip.split('.');
			$.each(tmp, function(n){
				if(n == 3)
					end += parseInt(tmp[n]).toString(2);
				else
					end += parseInt(tmp[n]).toString(2) + ".";
			});

		    return end;	
		}

		$.fn._toBitsString = function(num)
		{
			var str = '';
			while(num)
			{
				str = (num & 1) + str;
				num = num >>> 1
			}
			return str;
		}

		$.fn._toBits = function(num)
		{
			var str = $.fn._toBitsString(num)
			for(var i = str.length;i < 8;++i)
				str = '0' + str;
			return str.slice(-8);
		}

		var Host_name_regex = /^\s*[a-zA-Z0-9,\s-_.]+\s*$/;
		$("#Inet_camera_name").change(function(){
			var value = $(this).val();
			if((value.length < 1 || value.length > 18)||!Host_name_regex.test(value)){
				$(this).val(host_name);
			}

			host_name = $(this).val();
		});

		$.fn._dhcp_param = function(param)
		{
			$.ajax({
				url:'/cgi-bin/set?'+param,
				dataType:'json',
				cache:false,
				success:function(data){
				},
				error:function(xhr, textStatus, errorThrown){
				},
				complete:function(){
					$("#block_content_description")[0].innerHTML = $.fn._GetLangStr(LT._Ipfinder_Warning);
					$(".blockContent > center > img").attr("src","/css/images/animated_progress.gif");
					$.blockUI({ 
						message:$("#blockUI"),
						css:{
							width:'300px'
						}
					});

					setTimeout($.unblockUI,20000);
					setTimeout(function(){
						/* window close method for IE */
						if($.fn._identifyBrowser() == "msie"){
							
							parent.window.close();

						} else { /* window close method for other browser, except FF */
						
							var href = parent.window.location.href;
							parent.window.open(href,"_self","");
							parent.window.close();
						}
					},21000);
				}
			});
		};

		var osd_text_regex = /^\s*[^\"]+\s*$/;
		$("#Iosd_name").change(function(){
			if(this.selectedIndex == 1){
				$("#Iosd_text").hide();
				$("#Mosd_name_position").show();
				$("#Iosd_name_position").show();
			}
			else if(this.selectedIndex == 2){
				$("#Iosd_text").show();
				$("#Mosd_name_position").show();
				$("#Iosd_name_position").show();
			}				
			else{
				$("#Iosd_text").hide();
				$("#Mosd_name_position").hide();
				$("#Iosd_name_position").hide();
			}
				
		});

		$("#Iosd_text").change(function(){
			var value = $(this).val();
			if((value.length < 1 || value.length > 18)||!osd_text_regex.test(value)){
				$(this).val(osd_text);
			}

			osd_text = $(this).val();
		});

		$("#Iosd_name").change();

		$("input[name=Nosd_time]").change(function(){
			if($("input[type=radio][name=Nosd_time]:checked").val() == "on"){
				$("#Mosd_time_position").show();
				$("#Iosd_time_position").show();
			}else{
				$("#Mosd_time_position").hide();
				$("#Iosd_time_position").hide();
			}
		});

		$("input[name=Nosd_time]").change();
	};
})(jQuery);
