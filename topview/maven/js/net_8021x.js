(function($){
	var confList, md5_user, tls_user, ttls_user, peap_user, md5_passwd, ttls_passwd, peap_passwd, tmp_protocol, ca_file_stat, client_key_file_stat, pri_key_file_stat, anonymous_id, pri_key;
	$.fn._ObjectAssignValue = function(src){
		$.each(src, function(param , val){
			if (param == "network.8021x.enable"){
				$("input[name=N8021x_action][value='"+val[1]+"']").attr('checked',true);
			} else if (param == "network.8021x.protocol"){
				confList = "NONE,EAP-MD5,EAP-TLS,EAP-TTLS,EAP-PEAP".split(',');
				$("#I802_protocol").find('option').remove();
				$.each(confList, function(n){
					$("#I802_protocol").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});	

				$("#I802_protocol").children().each(function(){
				    if ($(this).text().toLowerCase() == val[1]){
				        $(this).attr("selected","true");
				    }
				});
				
			} else if (param == "network.8021x.md5.user_name"){
				md5_user = val[1];
			} else if (param == "network.8021x.md5.user_passwd"){
				md5_passwd = val[1];
			} else if (param == "network.8021x.tls.user_name"){
				tls_user = val[1];
			} else if (param == "network.8021x.tls.private_key_password"){
				$("#I802_pri_key").val(val[1]);
				pri_key = val[1];
			} else if (param == "network.8021x.ttls.inner_auth"){
				confList = "chap,eap-mschapv2,md5,mschap,mschapv2,pap".toUpperCase().split(',');
				$("#I802_inner_auth").find('option').remove();
				$.each(confList, function(n){
					$("#I802_inner_auth").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});
	
				$("#I802_inner_auth").children().each(function(){
				    if ($(this).text().toLowerCase() == val[1]){
				        $(this).attr("selected","true");
				    }
				});
			} else if (param == "network.8021x.ttls.user_name"){
				ttls_user = val[1]; 
			} else if (param == "network.8021x.ttls.user_passwd"){
				ttls_passwd = val[1];
			} else if (param == "network.8021x.ttls.anonymous_id"){
				$("#I802_anonymous_id").val(val[1]);
				anonymous_id = val[1];
			} else if (param == "network.8021x.peap.user_name"){
				peap_user = val[1];
			} else if (param == "network.8021x.peap.user_passwd"){
				peap_passwd = val[1]; 
			} else if (param == "network.8021x.ca_info"){
				ca_file_stat = val[1]; 
			} else if (param == "network.8021x.client_cert_info"){
				client_key_file_stat = val[1]; 
			} else if (param == "network.8021x.private_key_info"){
				pri_key_file_stat = val[1]; 
			} 
		});
	};
	$.fn._Go = function(){
		$.fn._InitialPageLang();
		$.fn._InitialFunc();
		$.fn._Initial802Ctrl();
		$.fn._AdjustFormLayout();
		$('#reloading_container').hide();
		$('#container').show();
	};
	$.fn._InitialPageLang = function(){
		$("#M802_title")[0].innerHTML				= $.fn._GetLangStr(LT._BasicSetting);
		$("#M802_1x")[0].innerHTML					= $.fn._GetLangStr(LT._Menu_8021x)+":";
		$("#Mon")[0].innerHTML						= $.fn._GetLangStr(LT._ON);
		$("#Moff")[0].innerHTML						= $.fn._GetLangStr(LT._OFF);
		$("#M802_protocol")[0].innerHTML			= $.fn._GetLangStr(LT._Protocol)+":";
		$("#M802_inner_auth")[0].innerHTML			= $.fn._GetLangStr(LT._Inner_Auth)+":";
		$("#M802_user")[0].innerHTML				= $.fn._GetLangStr(LT._Username)+":";
		$("#M802_passwd")[0].innerHTML				= $.fn._GetLangStr(LT._Password)+":";
		$("#M802_anonymous_id")[0].innerHTML		= $.fn._GetLangStr(LT._Anonymous_ID)+":";
		$("#M802_cert_ca")[0].innerHTML				= $.fn._GetLangStr(LT._CA_Certificate)+":";
		$("#M802_cert_client")[0].innerHTML			= $.fn._GetLangStr(LT._Client_Certificate)+":";
		$("#M802_cert_pri_key")[0].innerHTML		= $.fn._GetLangStr(LT._Private_Key)+":";
		$("#Mdes_file_1")[0].innerHTML				= $.fn._GetLangStr(LT._PEM_encoded_file);
		$("#Mdes_file_2")[0].innerHTML				= $.fn._GetLangStr(LT._PEM_encoded_file);
		$("#Mdes_file_3")[0].innerHTML				= $.fn._GetLangStr(LT._PEM_encoded_file);
		$("#Mdelete_ca")[0].innerHTML				= $.fn._GetLangStr(LT._Delete);
		$("#Mdelete_client_key")[0].innerHTML		= $.fn._GetLangStr(LT._Delete);
		$("#Mdelete_pri_key")[0].innerHTML			= $.fn._GetLangStr(LT._Delete);
		$("#M802_pri_key")[0].innerHTML				= $.fn._GetLangStr(LT._Private_Key_Password)+":";
		$.fn._InitialOptionLang("I802_protocol");
	};
	
	$.fn._AdjustFormLayout = function(){
		var def_width = 0;
		$("#main").each(function(){
			$(this).children("div").each(function(){
				if($(this).attr("class") == "content_label" || $(this).attr("class") == "content_slider"){
						
				} else {	
					var len = $(this).children("label").text().length;
					def_width = len > def_width ? def_width = len: def_width = def_width;
				}
			});
		});

		//console.log(def_width);
		$("#main").each(function(){
			$(this).children("form").each(function(){
				$(this).children("div").each(function(){
					
					if($.cookie('def_lang') == DEFINE_LANGUAGE_JAPANESE || $.cookie('def_lang') == DEFINE_LANGUAGE_KOREAN)
					{
						if(def_width <= 30)
							def_width = 30;
					}
					else
					{
						if(def_width <= 16)
							def_width = 16;
					}
					
					$(this).children("label")
					.css("width",def_width*7.5)
					.css("height",30)
					.css("text-align","right");
				});
			});
		});
	};

	$.fn._Initial802Ctrl = function(){
		var command = "";
		// Initl 802 mode control
		$("input[name=N8021x_action]").change(function(){
			if($(this).val() == "on"){
				$("#I802_protocol").attr("disabled",false);
			}else if($(this).val() == "off"){
				$("#I802_protocol")[0].selectedIndex = 0;
				$("#I802_protocol").attr("disabled",true);
				$("#I802_inner_auth").parent("div").hide();
				$("#I802_user").parent("div").hide();
				$("#I802_passwd").parent("div").hide();
				$("#I802_anonymous_id").parent("div").hide();
				$("#I802_cert_ca").parent("div").hide();
				$("#I802_cert_client").parent("div").hide();
				$("#I802_cert_pri_key").parent("div").hide();
				$("#I802_pri_key").parent("div").hide();
			}
		});

		// Initl 802 protocol control
		$("#I802_protocol").change(function(){
			if($(this).val() == "NONE"){
				$("#I802_inner_auth").parent("div").hide();
				$("#I802_user").parent("div").hide();
				$("#I802_passwd").parent("div").hide();
				$("#I802_anonymous_id").parent("div").hide();
				$("#I802_cert_ca").parent("div").hide();
				$("#I802_cert_client").parent("div").hide();
				$("#I802_cert_pri_key").parent("div").hide();
				$("#I802_pri_key").parent("div").hide();
			} else if($(this).val() == "EAP-MD5") {
				$("#I802_inner_auth").parent("div").hide();
				$("#I802_user").parent("div").show();
				$("#I802_passwd").parent("div").show();
				$("#I802_anonymous_id").parent("div").hide();
				$("#I802_cert_ca").parent("div").hide();
				$("#I802_cert_client").parent("div").hide();
				$("#I802_cert_pri_key").parent("div").hide();
				$("#I802_pri_key").parent("div").hide();

				//callback param
				$("#I802_user").val(md5_user);
				$("#I802_passwd").val(md5_passwd);
			} else if($(this).val() == "EAP-TLS") {
				$("#I802_inner_auth").parent("div").hide();
				$("#I802_user").parent("div").show();
				$("#I802_passwd").parent("div").hide();
				$("#I802_anonymous_id").parent("div").hide();

				$("#I802_cert_ca").parent("div").show();
				$("#I802_cert_client").parent("div").show();
				$("#I802_cert_pri_key").parent("div").show();
				
				$("#I802_pri_key").parent("div").show();
				
				//callback param
				$("#I802_user").val(tls_user);

				// callback file stat
				if(ca_file_stat == "none"){
					$("#Idelete_ca").hide();
					$("#Mdelete_ca").hide();
					$("#Ica_file_stat")[0].innerHTML = $.fn._GetLangStr(LT._No_Installed_Ca);
				}else{
					$("#Idelete_ca").show();
					$("#Mdelete_ca").show();
					$("#Ica_file_stat")[0].innerHTML = ca_file_stat;
				}

				if(client_key_file_stat == "none"){
					$("#Idelete_client_key").hide();
					$("#Mdelete_client_key").hide();
					$("#Iclient_key_file_stat")[0].innerHTML = $.fn._GetLangStr(LT._No_Installed);
				}else{
					$("#Idelete_client_key").show();
					$("#Mdelete_client_key").show();
					$("#Iclient_key_file_stat")[0].innerHTML = client_key_file_stat;
				}

				if(pri_key_file_stat == "none"){
					$("#Idelete_pri_key").hide();
					$("#Mdelete_pri_key").hide();
					$("#Ipri_key_file_stat")[0].innerHTML = $.fn._GetLangStr(LT._No_Installed);
				}else{
					$("#Idelete_pri_key").show();
					$("#Mdelete_pri_key").show();
					$("#Ipri_key_file_stat")[0].innerHTML = $.fn._GetLangStr(LT._Installed);
				}
				
			} else if($(this).val() == "EAP-TTLS") {
				$("#I802_inner_auth").parent("div").show();
				$("#I802_inner_auth").show();
				$("#I802_inner_auth_span").hide();
				$("#I802_user").parent("div").show();
				$("#I802_passwd").parent("div").show();
				$("#I802_anonymous_id").parent("div").show();
				$("#I802_cert_ca").parent("div").show();
				$("#I802_cert_client").parent("div").hide();
				$("#I802_cert_pri_key").parent("div").hide();
				$("#I802_pri_key").parent("div").hide();

				//callback param
				$("#I802_user").val(ttls_user);
				$("#I802_passwd").val(ttls_passwd);
				
				// callback file stat
				if(ca_file_stat == "none"){
					$("#Idelete_ca").hide();
					$("#Mdelete_ca").hide();
					$("#Ica_file_stat")[0].innerHTML = $.fn._GetLangStr(LT._No_Installed_Ca);
				}else{
					$("#Idelete_ca").show();
					$("#Mdelete_ca").show();
					$("#Ica_file_stat")[0].innerHTML = ca_file_stat;
				}
				
				$("#Idelete_client_key").hide();
				
			} else if($(this).val() == "EAP-PEAP") {
				$("#I802_inner_auth").parent("div").show();
				$("#I802_inner_auth").hide();
				$("#I802_inner_auth_span").show();
				$("#I802_user").parent("div").show();
				$("#I802_passwd").parent("div").show();
				$("#I802_anonymous_id").parent("div").hide();
				$("#I802_cert_ca").parent("div").show();
				$("#I802_cert_client").parent("div").hide();
				$("#I802_cert_pri_key").parent("div").hide();
				$("#I802_pri_key").parent("div").hide();

				//callback param
				$("#I802_user").val(peap_user);
				$("#I802_passwd").val(peap_passwd);

				// callback file stat
				if(ca_file_stat == "none"){
					$("#Idelete_ca").hide();
					$("#Mdelete_ca").hide();
					$("#Ica_file_stat")[0].innerHTML = $.fn._GetLangStr(LT._No_Installed_Ca);
				}else{
					$("#Idelete_ca").show();
					$("#Mdelete_ca").show();
					$("#Ica_file_stat")[0].innerHTML = ca_file_stat;
				}
			}
		});

		$("input[type=radio][name=N8021x_action]:checked").change();
		$("#I802_protocol").change();
	};

	$.fn._InitialFunc = function()
	{
		var command = "";
		var Invalid_input_regex = /^\s*[^\"]+\s*$/;

		$('#form_update').ajaxForm();
			
		$("#I802_user").change(function(){
			var value = $(this).val();
			if((value.length < 2 || value.length > 40)||!Invalid_input_regex.test(value)){

				if($("#I802_protocol").val() == "EAP-MD5")
					$(this).val(md5_user);
				else if($("#I802_protocol").val() == "EAP-TLS")
					$(this).val(tls_user);
				else if($("#I802_protocol").val() == "EAP-TTLS")
					$(this).val(ttls_user);
				else if($("#I802_protocol").val() == "EAP-PEAP")
					$(this).val(peap_user);
				
			}
			
			if($("#I802_protocol").val() == "EAP-MD5")
				md5_user = $(this).val();
			else if($("#I802_protocol").val() == "EAP-TLS")
				tls_user = $(this).val();
			else if($("#I802_protocol").val() == "EAP-TTLS")
				ttls_user = $(this).val();
			else if($("#I802_protocol").val() == "EAP-PEAP")
				peap_user = $(this).val();
		});

		$("#I802_passwd").change(function(){
			var value = $(this).val();
			if((value.length < 2 || value.length > 40)||!Invalid_input_regex.test(value)){
				if($("#I802_protocol").val() == "EAP-MD5")
					$(this).val(md5_passwd);
				else if($("#I802_protocol").val() == "EAP-TTLS")
					$(this).val(ttls_passwd);
				else if($("#I802_protocol").val() == "EAP-PEAP")
					$(this).val(peap_passwd);
			}

			if($("#I802_protocol").val() == "EAP-MD5")
				md5_passwd = $(this).val();
			else if($("#I802_protocol").val() == "EAP-TTLS")
				ttls_passwd = $(this).val();
			else if($("#I802_protocol").val() == "EAP-PEAP")
				peap_passwd = $(this).val();
		});

		$("#I802_anonymous_id").change(function(){
			var value = $(this).val();
			if((value.length < 2 || value.length > 40)||!Invalid_input_regex.test(value)){
				$(this).val(anonymous_id);
			}

			anonymous_id = $(this).val();
		});

		$("#I802_pri_key").change(function(){
			var value = $(this).val();
			if((value.length < 2 || value.length > 40)||!Invalid_input_regex.test(value)){
				$(this).val(pri_key);
			}

			pri_key = $(this).val();
		});

		
		$("#Icon_setting_save_pic").bind('click', function(){
			var I802_en = $("input[type=radio][name=N8021x_action]:checked").val();
			var ca_del = $("#Idelete_ca").is(":checked") == false? "off":"on";
			var client_del = $("#Idelete_client_key").is(":checked") == false? "off":"on";
			var pri_del = $("#Idelete_pri_key").is(":checked") == false? "off":"on";
			var protocol = "",inner_auth = "";

			if(I802_en == "on"){
				if($("#I802_protocol")[0].selectedIndex == 0){
					$("input[name=N8021x_action][value='off']").prop('checked',true);
					$("input[type=radio][name=N8021x_action]:checked").change();
					command = "network.8021x.enable" +"="+ "off" +"&";
				}
				else
					command = "network.8021x.enable" +"="+ I802_en +"&";
			}
			else if(I802_en == "off"){
				command = "network.8021x.enable" +"="+ I802_en +"&";
			}

			if($("#I802_protocol")[0].selectedIndex == 0)
				protocol = "none";
			else if($("#I802_protocol")[0].selectedIndex == 1)
				protocol = "eap-md5";
			else if($("#I802_protocol")[0].selectedIndex == 2)
				protocol = "eap-tls";
			else if($("#I802_protocol")[0].selectedIndex == 3)
				protocol = "eap-ttls";
			else if($("#I802_protocol")[0].selectedIndex == 4)
				protocol = "eap-peap";

			if(protocol == "none" || protocol == "eap-md5"){}
			else
			{
				$("#protocol").val(protocol);
				$("#form_update").submit();
			}

			if($("#I802_inner_auth")[0].selectedIndex == 0)
				inner_auth = "chap";
			else if($("#I802_inner_auth")[0].selectedIndex == 1)
				inner_auth = "eap-mschapv2";
			else if($("#I802_inner_auth")[0].selectedIndex == 2)
				inner_auth = "md5";
			else if($("#I802_inner_auth")[0].selectedIndex == 3)
				inner_auth = "mschap";
			else if($("#I802_inner_auth")[0].selectedIndex == 4)
				inner_auth = "mschapv2";
			else if($("#I802_inner_auth")[0].selectedIndex == 5)
				inner_auth = "pap";
			
			command = command + "network.8021x.protocol" +"="+ protocol +"&";

				if(protocol == "eap-md5"){
					command = command + "network.8021x.md5.user_name" 				+"="+ $("#I802_user").val() 					+"&"+
										"network.8021x.md5.user_passwd"				+"="+ $("#I802_passwd").val() 					+"&";
				} else if(protocol == "eap-tls"){
					command = command + "network.8021x.tls.user_name"				+"="+ $("#I802_user").val() 					+"&"+
										"network.8021x.tls.private_key_password"	+"="+ $("#I802_pri_key").val()		 			+"&";
				} else if(protocol == "eap-ttls"){
					command = command + "network.8021x.ttls.inner_auth"				+"="+ inner_auth								+"&"+
										"network.8021x.ttls.user_name"				+"="+ $("#I802_user").val() 					+"&"+
										"network.8021x.ttls.user_passwd"			+"="+ $("#I802_passwd").val() 					+"&"+
										"network.8021x.ttls.anonymous_id"			+"="+ $("#I802_anonymous_id").val() 			+"&";
				} else if(protocol == "eap-peap"){
					command = command + "network.8021x.peap.user_name"				+"="+ $("#I802_user").val() 					+"&"+
										"network.8021x.peap.user_passwd"			+"="+ $("#I802_passwd").val() 					+"&";
				}
			

			if(ca_del == "on")
					command = command + "network.ieee8021x.delete_certs"			+"="+ "ca.pem"									+"&";

			if(client_del == "on")
					command = command + "network.ieee8021x.delete_certs"			+"="+ "client.pem"								+"&";

			if(pri_del == "on")
					command = command + "network.ieee8021x.delete_certs"			+"="+ "client.key"								+"&";
		
			$.fn._SetParamByMask(command, $.fn._GetLangStr(LT._Reloading), 7000);
		});
		
		$("#Icon_setting_default_pic").bind('click', function(){
			if(confirm($.fn._GetLangStr(LT._Reset_to_default_Warning))){
				$.fn._DefaultParam( $.fn._GetLangStr(LT._Reloading), 5000);
			}
		});
	};

})(jQuery);
