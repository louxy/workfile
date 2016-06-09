(function($){
	var confList, split_tmp, smtp_server, smtp_user, smtp_passwd, smtp_port, smtp_send_addr, alarm_subject, alarm_message, motion_subject, motion_message;
	var current_profile, profile1, profile2, profile3, profile4, profile5, profile6;
	var mot = true;
	var alm = true;
	var num = 3;
	var email_list = new Array(num);
	var port_range = new Array();
	for(var i=0;i<=9;i++){
		email_list[i] = new Array(num);
	}
	$.fn._ObjectAssignValue = function(src){
		$.each(src, function(param , val){
			if(param == "event.email_record.conditions")
			{
				$("input[name=Nsmtp_condition][value='"+val[1]+"']").attr('checked',true);

				if(model_alarm == 0)
				{
					$("input[name=Nsmtp_condition][value='alarm']").hide();
					$("#ISMTP_Condition1_Alarm").hide();
				}
			}
			else if(param == "event.email_record.server")
			{
				$("#Ismtp_addr").val(val[1]);
				smtp_server = val[1];
			}
			else if(param == "event.email_record.user_id")
			{
				$("#Ismtp_user").val(val[1]);
				smtp_user = val[1];
			}
			else if(param == "event.email_record.password")
			{
				$("#Ismtp_passwd").val(val[1]);
				smtp_passwd = val[1];
			}
			else if(param == "event.email_record.port")
			{
				$("#Ismtp_port").val(val[1]);
				smtp_port = val[1];
			}
			else if(param == "event.email_record.sender_mail_address")
			{
				$("#Ismtp_send_addr").val(val[1]);
				smtp_send_addr = val[1];
			}
			else if(param == "event.email_record.authentication")
			{
				confList = "No_Auth,SMTP_Plain,Login,TLS_TTLS".split(',');
				$("#Ismtp_auth").find('option').remove();
				$.each(confList, function(n){
					$("#Ismtp_auth").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
				});
	
				if(val[1] == "no_auth")
					$("#Ismtp_auth")[0].selectedIndex = 0;
				else if(val[1] == "smtp_plain")
					$("#Ismtp_auth")[0].selectedIndex = 1;
				else if(val[1] == "login")
					$("#Ismtp_auth")[0].selectedIndex = 2;
				else if(val[1] == "tls_ttls")
					$("#Ismtp_auth")[0].selectedIndex = 3;
			}
			else if(param == "event.email_record.alarm.subject")
			{
				$("#Ismtp_condition_alarm_subject").val(val[1]);
				alarm_subject = val[1];
			}
			else if(param == "event.email_record.alarm.message")
			{
				$("#Ismtp_condition_alarm_message").val(val[1]);
				alarm_message = val[1];
			}
			else if(param == "event.email_record.alarm.attach_image")
				$("input[name=Nsmtp_condition_alarm_attach_image][value='"+val[1]+"']").attr('checked',true);
			else if(param == "event.email_record.motion.subject")
			{
				$("#Ismtp_condition_motion_subject").val(val[1]);
				motion_subject = val[1];
			}
			else if(param == "event.email_record.motion.message")
			{
				$("#Ismtp_condition_motion_message").val(val[1]);
				motion_message = val[1];
			}
			else if(param == "event.email_record.motion.attach_image")
				$("input[name=Nsmtp_condition_motion_attach_image][value='"+val[1]+"']").attr('checked',true);
			else if(param == "event.email_record.mail_to_1.sender")
				email_list[0][0] = val[1];
			else if(param == "event.email_record.mail_to_1.address")
				email_list[0][1] = val[1];
			else if(param == "event.email_record.mail_to_1.alarm")
				email_list[0][2] = val[1];
			else if(param == "event.email_record.mail_to_1.motion")
				email_list[0][3] = val[1];
			else if(param == "event.email_record.mail_to_2.sender")
				email_list[1][0] = val[1];
			else if(param == "event.email_record.mail_to_2.address")
				email_list[1][1] = val[1];
			else if(param == "event.email_record.mail_to_2.alarm")
				email_list[1][2] = val[1];
			else if(param == "event.email_record.mail_to_2.motion")
				email_list[1][3] = val[1];
			else if(param == "event.email_record.mail_to_3.sender")
				email_list[2][0] = val[1];
			else if(param == "event.email_record.mail_to_3.address")
				email_list[2][1] = val[1];
			else if(param == "event.email_record.mail_to_3.alarm")
				email_list[2][2] = val[1];
			else if(param == "event.email_record.mail_to_3.motion")
				email_list[2][3] = val[1];
			else if(param == "event.email_record.mail_to_4.sender")
				email_list[3][0] = val[1];
			else if(param == "event.email_record.mail_to_4.address")
				email_list[3][1] = val[1];
			else if(param == "event.email_record.mail_to_4.alarm")
				email_list[3][2] = val[1];
			else if(param == "event.email_record.mail_to_4.motion")
				email_list[3][3] = val[1];
			else if(param == "event.email_record.mail_to_5.sender")
				email_list[4][0] = val[1];
			else if(param == "event.email_record.mail_to_5.address")
				email_list[4][1] = val[1];
			else if(param == "event.email_record.mail_to_5.alarm")
				email_list[4][2] = val[1];
			else if(param == "event.email_record.mail_to_5.motion")
				email_list[4][3] = val[1];
			else if(param == "event.email_record.mail_to_6.sender")
				email_list[5][0] = val[1];
			else if(param == "event.email_record.mail_to_6.address")
				email_list[5][1] = val[1];
			else if(param == "event.email_record.mail_to_6.alarm")
				email_list[5][2] = val[1];
			else if(param == "event.email_record.mail_to_6.motion")
				email_list[5][3] = val[1];
			else if(param == "event.email_record.mail_to_7.sender")
				email_list[6][0] = val[1];
			else if(param == "event.email_record.mail_to_7.address")
				email_list[6][1] = val[1];
			else if(param == "event.email_record.mail_to_7.alarm")
				email_list[6][2] = val[1];
			else if(param == "event.email_record.mail_to_7.motion")
				email_list[6][3] = val[1];
			else if(param == "event.email_record.mail_to_8.sender")
				email_list[7][0] = val[1];
			else if(param == "event.email_record.mail_to_8.address")
				email_list[7][1] = val[1];
			else if(param == "event.email_record.mail_to_8.alarm")
				email_list[7][2] = val[1];
			else if(param == "event.email_record.mail_to_8.motion")
				email_list[7][3] = val[1];
			else if(param == "event.email_record.mail_to_9.sender")
				email_list[8][0] = val[1];
			else if(param == "event.email_record.mail_to_9.address")
				email_list[8][1] = val[1];
			else if(param == "event.email_record.mail_to_9.alarm")
				email_list[8][2] = val[1];
			else if(param == "event.email_record.mail_to_9.motion")
				email_list[8][3] = val[1];
			else if(param == "event.email_record.mail_to_10.sender")
				email_list[9][0] = val[1];
			else if(param == "event.email_record.mail_to_10.address")
				email_list[9][1] = val[1];
			else if(param == "event.email_record.mail_to_10.alarm")
				email_list[9][2] = val[1];
			else if(param == "event.email_record.mail_to_10.motion")
				email_list[9][3] = val[1];
			else if(param == "system.sd.mount_status")
				sd_flag = val[1];
			else if(param == "image.encode.current_profile_id")
				current_profile = val[1];
			else if(param == "image.encode.profile1.encode")
				profile1 = val[1];
			else if(param == "image.encode.profile2.encode")
				profile2 = val[1];
			else if(param == "image.encode.profile3.encode")
				profile3 = val[1];
			else if(param == "image.encode.profile4.encode")
				profile4 = val[1];
			else if(param == "image.encode.profile5.encode")
				profile5 = val[1];
			else if(param == "image.encode.profile6.encode")
				profile6 = val[1];
			else if(param == "event.email_record.port.query_range")
			{
				split_tmp = val[1].split('~');
				$.each(split_tmp, function(n){
					if(n == 0){
						port_range[n] = split_tmp[n].slice(1,split_tmp[n].length);
					}
					else if(n == 1){
						port_range[n] = split_tmp[n].slice(0,split_tmp[n].length-1);
					}
				});

				$("#Ismtp_port_range")[0].innerHTML 	= "("+port_range[0]+"~"+port_range[1]+")";
			}
		});
	};
	$.fn._Go = function(){
		$.fn._InitialPageLang();
		$.fn._InitialEmailList();
		$.fn._InitialCondtionCtrl();
		$.fn._InitialFunc();
		$('#reloading_container').hide();
		$('#container').show();
	};
	$.fn._InitialPageLang = function(){
		$("#Msmtp_condition_title")[0].innerHTML 					= $.fn._GetLangStr(LT._SMTP_Record_Conditions);
		$("#Msmtp_condition")[0].innerHTML 							= $.fn._GetLangStr(LT._Recording_Mode)+":";
		$("#ISMTP_Condition1_Alarm")[0].innerHTML 					= $.fn._GetLangStr(LT._Alarm);
		$("#ISMTP_Condition1_Motion")[0].innerHTML 					= $.fn._GetLangStr(LT._Motion);
		$("#ISMTP_Condition1_OFF")[0].innerHTML 					= $.fn._GetLangStr(LT._OFF);
		$("#Msmtp_server")[0].innerHTML 							= $.fn._GetLangStr(LT._SMTP_Server);
		$("#Msmtp_addr")[0].innerHTML 								= $.fn._GetLangStr(LT._SMTP_Server)+":";
		$("#Msmtp_user")[0].innerHTML 								= $.fn._GetLangStr(LT._Login_ID)+":";
		$("#Msmtp_passwd")[0].innerHTML 							= $.fn._GetLangStr(LT._Password)+":";
		$("#Msmtp_port")[0].innerHTML 								= $.fn._GetLangStr(LT._Port)+":";
		$("#Msmtp_send_addr")[0].innerHTML 							= $.fn._GetLangStr(LT._Sender_Mail_Address)+":";
		$("#Msmtp_auth")[0].innerHTML 								= $.fn._GetLangStr(LT._Authentication)+":";
		$("#Msmtp_condition_alarm")[0].innerHTML 					= $.fn._GetLangStr(LT._Condition_Settings_Alarm);
		$("#Msmtp_condition_alarm_subject")[0].innerHTML 			= $.fn._GetLangStr(LT._Subject)+":";
		$("#Msmtp_condition_alarm_message")[0].innerHTML 			= $.fn._GetLangStr(LT._Message)+":";
		$("#Msmtp_alarm_length")[0].innerHTML                     	= $.fn._GetLangStr(LT._Alarm_Message);
		$("#Msmtp_condition_alarm_attach_image")[0].innerHTML 		= $.fn._GetLangStr(LT._Attach_Image)+":";
		$("#Msmtp_condition_motion")[0].innerHTML 					= $.fn._GetLangStr(LT._Condition_Settings_Motion);
		$("#Msmtp_condition_motion_subject")[0].innerHTML 			= $.fn._GetLangStr(LT._Subject)+":";
		$("#Msmtp_condition_motion_message")[0].innerHTML 			= $.fn._GetLangStr(LT._Message)+":";
		$("#Msmtp_motion_length")[0].innerHTML                     	= $.fn._GetLangStr(LT._Alarm_Message);
		$("#Msmtp_condition_motion_attach_image")[0].innerHTML 		= $.fn._GetLangStr(LT._Attach_Image)+":";
		$("#Msmtp_condition_alarm_attach_image_on")[0].innerHTML 	= $.fn._GetLangStr(LT._ON);
		$("#Msmtp_condition_alarm_attach_image_off")[0].innerHTML 	= $.fn._GetLangStr(LT._OFF);
		$("#Msmtp_condition_motion_attach_image_on")[0].innerHTML 	= $.fn._GetLangStr(LT._ON);
		$("#Msmtp_condition_motion_attach_image_off")[0].innerHTML 	= $.fn._GetLangStr(LT._OFF);
		$("#Msmtp_email_list")[0].innerHTML 						= $.fn._GetLangStr(LT._Email_Address_List);
		$("#Menable")[0].innerHTML									= $.fn._GetLangStr(LT._Enable);
		$("#Mno")[0].innerHTML										= $.fn._GetLangStr(LT._SMTP_No);
		$("#Maddr")[0].innerHTML									= $.fn._GetLangStr(LT._Address);
		$("#Malarm_1")[0].innerHTML									= $.fn._GetLangStr(LT._Alarm);
		$("#Mmotion_1")[0].innerHTML								= $.fn._GetLangStr(LT._Motion);
		$.fn._InitialOptionLang("Ismtp_auth");
	};

	$.fn._InitialEmailList = function()
	{
		// callback param
		for(var i = 1; i <= 10; i++)
		{
			$("#Imail_"+i+"_en").attr("checked",email_list[i-1][0] == "on" ? true:false);
			$("#Imail_"+i+"_address").val(email_list[i-1][1]);
			$("#Imail_"+i+"_alarm").attr("checked",email_list[i-1][2] == "on" ? true:false);
			$("#Imail_"+i+"_motion").attr("checked",email_list[i-1][3] == "on" ? true:false);

			if(model_alarm == 0)
				$("#Imail_"+i+"_alarm").parent().hide();
				
		}

		if(model_alarm == 0)
			$("#Malarm_1").parent().hide();

		// control code
		$("#Imail_1_en, #Imail_2_en, #Imail_3_en, #Imail_4_en, #Imail_5_en, #Imail_6_en, #Imail_7_en, #Imail_8_en, #Imail_9_en, #Imail_10_en").change(function(){
			if($(this).is(":checked") == false? false:true){
				$(this).parent().siblings().each(function(){
					$(this).filter('td').children().attr("disabled",false);
					$(this).filter('th').children().attr("disabled",false);
				});
			} else {
				$(this).parent().siblings().each(function(){
					$(this).filter('td').children().attr("disabled",true);
					$(this).filter('th').children().attr("disabled",true);
				});
			}
		});

		$("#Imail_1_en, #Imail_2_en, #Imail_3_en, #Imail_4_en, #Imail_5_en, #Imail_6_en, #Imail_7_en, #Imail_8_en, #Imail_9_en, #Imail_10_en").change();
	};

	$.fn._InitialCondtionCtrl = function()
	{
		$("input[name=Nsmtp_condition]").change(function(){
			if($(this).val() == "alarm")
			{
				if(model_alarm == 1)
				{
					$("#Msmtp_condition_alarm").parent().show();
					$("#Msmtp_condition_alarm_subject").parent().show();
					$("#Msmtp_condition_alarm_message").parent().show();
					$("#Msmtp_condition_alarm_attach_image").parent().show();
					if(alm)
						$("#Icon_setting_save_pic").attr("disabled", false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
					else
						$("#Icon_setting_save_pic").attr("disabled", true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
				}
				
				$("#Msmtp_condition_motion").parent().hide();
				$("#Msmtp_condition_motion_subject").parent().hide();
				$("#Msmtp_condition_motion_message").parent().hide();
				$("#Msmtp_condition_motion_attach_image").parent().hide();
			}
			else if($(this).val() == "motion")
			{
				if(model_alarm == 1)
				{
					$("#Msmtp_condition_alarm").parent().hide();
					$("#Msmtp_condition_alarm_subject").parent().hide();
					$("#Msmtp_condition_alarm_message").parent().hide();
					$("#Msmtp_condition_alarm_attach_image").parent().hide();
				}
				
				$("#Msmtp_condition_motion").parent().show();
				$("#Msmtp_condition_motion_subject").parent().show();
				$("#Msmtp_condition_motion_message").parent().show();
				$("#Msmtp_condition_motion_attach_image").parent().show();
				if(mot)
					$("#Icon_setting_save_pic").attr("disabled", false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
				else
					$("#Icon_setting_save_pic").attr("disabled", true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
			}
			else if($(this).val() == "off")
			{
				$("#Msmtp_condition_alarm").parent().hide();
				$("#Msmtp_condition_alarm_subject").parent().hide();
				$("#Msmtp_condition_alarm_message").parent().hide();
				$("#Msmtp_condition_alarm_attach_image").parent().hide();
				$("#Msmtp_condition_motion").parent().hide();
				$("#Msmtp_condition_motion_subject").parent().hide();
				$("#Msmtp_condition_motion_message").parent().hide();
				$("#Msmtp_condition_motion_attach_image").parent().hide();
				$("#Icon_setting_save_pic").attr("disabled", false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
			}
			$.fn._ReAdjustContent();
		});

		if($("input[type=radio][name=Nsmtp_condition]:checked").val() == "alarm")
		{
			$("#Msmtp_condition_alarm").parent().show();
			$("#Msmtp_condition_alarm_subject").parent().show();
			$("#Msmtp_condition_alarm_message").parent().show();
			$("#Msmtp_condition_alarm_attach_image").parent().show();
			$("#Msmtp_condition_motion").parent().hide();
			$("#Msmtp_condition_motion_subject").parent().hide();
			$("#Msmtp_condition_motion_message").parent().hide();
			$("#Msmtp_condition_motion_attach_image").parent().hide();
		}
		else if($("input[type=radio][name=Nsmtp_condition]:checked").val() == "motion")
		{
			$("#Msmtp_condition_alarm").parent().hide();
			$("#Msmtp_condition_alarm_subject").parent().hide();
			$("#Msmtp_condition_alarm_message").parent().hide();
			$("#Msmtp_condition_alarm_attach_image").parent().hide();
			$("#Msmtp_condition_motion").parent().show();
			$("#Msmtp_condition_motion_subject").parent().show();
			$("#Msmtp_condition_motion_message").parent().show();
			$("#Msmtp_condition_motion_attach_image").parent().show();
		}
		else if($("input[type=radio][name=Nsmtp_condition]:checked").val() == "off")
		{
			$("#Msmtp_condition_alarm").parent().hide();
			$("#Msmtp_condition_alarm_subject").parent().hide();
			$("#Msmtp_condition_alarm_message").parent().hide();
			$("#Msmtp_condition_alarm_attach_image").parent().hide();
			$("#Msmtp_condition_motion").parent().hide();
			$("#Msmtp_condition_motion_subject").parent().hide();
			$("#Msmtp_condition_motion_message").parent().hide();
			$("#Msmtp_condition_motion_attach_image").parent().hide();
		}
	};

	$.fn._ReAdjustContent = function()
	{
		var hei = 100;
		$("#main").children('div').each(function(){

			if($(this).attr('style') == "display: none;"){}
			else
				hei = hei + $(this).height();
		});

		$("#fix_content").css("height",hei);
		fix_content_hei = hei;
	};

	$.fn._transASCII = function(msg)
	{
		var ascii = "", code = null, tmp = null;
		var char = msg.split('');
		$.each(char, function(n){
			tmp = char[n];
			for(var i=0; i<tmp.length; i++){
				code = Number(tmp[i].charCodeAt(0));
				if(code>127){
					var charAscii = code.toString(16);
					charAscii = new String("0000").substring(charAscii.length,4)+charAscii;
					ascii += "%5Cu" + charAscii;
				}else{
					ascii += tmp[i];
				}
			}
		});
		return ascii;
	}

	$.fn._InitialFunc = function()
	{
		var Invalid_input_regex = /^\s*[^\"]+\s*$/;
		var Mail_regex = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
		var port_regec = /^\d{1,5}$/
		var command = "";
		
		$("#Ismtp_addr").change(function(){
			var value = $(this).val();
			if((value.length < 2 || value.length > 128)||!Invalid_input_regex.test(value)){
				$(this).val(smtp_server);
			}

			smtp_server = $(this).val();
		});

		$("#Ismtp_user").change(function(){
			var value = $(this).val();
			if((value.length < 2 || value.length > 40)||!Invalid_input_regex.test(value)){
				$(this).val(smtp_user);
			}

			smtp_user = $(this).val();
		});

		$("#Ismtp_passwd").change(function(){
			var value = $(this).val();
			if((value.length < 2 || value.length > 40)||!Invalid_input_regex.test(value)){
				$(this).val(smtp_passwd);
			}

			smtp_passwd = $(this).val();
		});

		$("#Ismtp_send_addr").change(function(){
			var value = $(this).val();
			if((value.length < 2 || value.length > 100)||!Invalid_input_regex.test(value)){
				$(this).val(smtp_send_addr);
			}

			smtp_send_addr = $(this).val();
		});

		$("#Ismtp_port").change(function(){
			var value = $(this).val();
			if((parseInt(value) < port_range[0])||(parseInt(value) > port_range[1])||!port_regec.test(value)){
				$(this).val(smtp_port);
			}

			smtp_port = $(this).val();
		});

		$("#Ismtp_condition_alarm_subject").change(function(){
			var value = $(this).val();
			if((value.length < 2)||!Invalid_input_regex.test(value)){
				$(this).val(alarm_subject);
			}

			alarm_subject = $(this).val();
		});

		$("#Ismtp_condition_alarm_message").change(function(){
			var value = $(this).val();
			var ascii = "", code = null, tmp = null, len = 0;
			var char = value.split('');
			$.each(char, function(n){
				tmp = char[n];
				for(var i=0; i<tmp.length; i++){
					code = Number(tmp[i].charCodeAt(0));
					if(code>127){
						len += 6;
						var charAscii = code.toString(16);
						charAscii = new String("0000").substring(charAscii.length,4)+charAscii;
						ascii += "%5Cu"+charAscii;
					}else{
						len++;
						ascii+=tmp[i];
					}
				}
			});
			if((value.length < 2)||!Invalid_input_regex.test(value)||(len > 200)){
				$("#Ismtp_condition_alarm_message").addClass("conf_input_invalid");
				$("#Msmtp_alarm_length").show();
				$("#Icon_setting_save_pic").attr("disabled", true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
				alm = false;
			}else{
				$("#Msmtp_alarm_length").hide();
				$("#Ismtp_condition_alarm_message").removeClass("conf_input_invalid");
				$("#Icon_setting_save_pic").attr("disabled", false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
				alm = true;
			}

			alarm_message = $(this).val();
		});

		$("#Ismtp_condition_motion_subject").change(function(){
			var value = $(this).val();
			if((value.length < 2)||!Invalid_input_regex.test(value)){
				$(this).val(motion_subject);
			}

			motion_subject = $(this).val();
		});

		$("#Ismtp_condition_motion_message").change(function(){
			var value = $(this).val();
			var ascii = "", code = null, tmp = null, len = 0;
			var char = value.split('');
			$.each(char, function(n){
				tmp = char[n];
				for(var i=0; i<tmp.length; i++){
					code = Number(tmp[i].charCodeAt(0));
					if(code>127){
						len += 6;
						var charAscii = code.toString(16);
						charAscii = new String("0000").substring(charAscii.length,4)+charAscii;
						ascii += "%5Cu"+charAscii;
					}else{
						len++;
						ascii+=tmp[i];
					}
				}
			});
			if((value.length < 2)||!Invalid_input_regex.test(value)||(len > 200)){
				$("#Ismtp_condition_motion_message").addClass("conf_input_invalid");
				$("#Msmtp_motion_length").show();
				$("#Icon_setting_save_pic").attr("disabled", true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
				mot = false;
			}else{
				$("#Msmtp_motion_length").hide();
				$("#Ismtp_condition_motion_message").removeClass("conf_input_invalid");
				$("#Icon_setting_save_pic").attr("disabled", false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
				mot = true;
			}

			motion_message = $(this).val();
		});

		$("#Imail_1_address").change(function(){
			var value = $(this).val();
			if(!Mail_regex.test(value)){
				$(this).val(email_list[0][1]);
			}

			email_list[0][1] = $(this).val();
		});

		$("#Imail_2_address").change(function(){
			var value = $(this).val();
			if(!Mail_regex.test(value)){
				$(this).val(email_list[1][1]);
			}

			email_list[1][1] = $(this).val();
		});

		$("#Imail_3_address").change(function(){
			var value = $(this).val();
			if(!Mail_regex.test(value)){
				$(this).val(email_list[2][1]);
			}

			email_list[2][1] = $(this).val();
		});

		$("#Imail_4_address").change(function(){
			var value = $(this).val();
			if(!Mail_regex.test(value)){
				$(this).val(email_list[3][1]);
			}

			email_list[3][1] = $(this).val();
		});

		$("#Imail_5_address").change(function(){
			var value = $(this).val();
			if(!Mail_regex.test(value)){
				$(this).val(email_list[4][1]);
			}

			email_list[4][1] = $(this).val();
		});

		$("#Imail_5_address").change(function(){
			var value = $(this).val();
			if(!Mail_regex.test(value)){
				$(this).val(email_list[5][1]);
			}

			email_list[5][1] = $(this).val();
		});

		$("#Imail_6_address").change(function(){
			var value = $(this).val();
			if(!Mail_regex.test(value)){
				$(this).val(email_list[5][1]);
			}

			email_list[5][1] = $(this).val();
		});

		$("#Imail_7_address").change(function(){
			var value = $(this).val();
			if(!Mail_regex.test(value)){
				$(this).val(email_list[6][1]);
			}

			email_list[6][1] = $(this).val();
		});

		$("#Imail_8_address").change(function(){
			var value = $(this).val();
			if(!Mail_regex.test(value)){
				$(this).val(email_list[7][1]);
			}

			email_list[7][1] = $(this).val();
		});

		$("#Imail_9_address").change(function(){
			var value = $(this).val();
			if(!Mail_regex.test(value)){
				$(this).val(email_list[8][1]);
			}

			email_list[8][1] = $(this).val();
		});

		$("#Imail_10_address").change(function(){
			var value = $(this).val();
			if(!Mail_regex.test(value)){
				$(this).val(email_list[9][1]);
			}

			email_list[9][1] = $(this).val();
		});

		$("#Icon_setting_save_pic").bind('click', function(){

			var alarm_attach_image_check = $("input[type=radio][name=Nsmtp_condition_alarm_attach_image]:checked").val();
			var motion_attach_image_check = $("input[type=radio][name=Nsmtp_condition_motion_attach_image]:checked").val();
			var auth = "";

			if($("#Ismtp_auth")[0].selectedIndex == 0)
				auth = "no_auth";
			else if($("#Ismtp_auth")[0].selectedIndex == 1)
				auth = "smtp_plain";
			else if($("#Ismtp_auth")[0].selectedIndex == 2)
				auth = "login";
			else if($("#Ismtp_auth")[0].selectedIndex == 3)
				auth = "tls_ttls";
		
			if($("input[type=radio][name=Nsmtp_condition]:checked").val() == "alarm")
			{
				command = 	"event.email_record.conditions"				+"="+	"alarm"										+"&"+
							"event.email_record.alarm.subject"			+"="+	$.fn._transASCII($("#Ismtp_condition_alarm_subject").val())	+"&"+
							"event.email_record.alarm.message"			+"="+	$.fn._transASCII($("#Ismtp_condition_alarm_message").val())	+"&"+
							"event.email_record.alarm.attach_image"		+"="+	alarm_attach_image_check					+"&";
			}
			else if($("input[type=radio][name=Nsmtp_condition]:checked").val() == "motion")
			{
				command = 	"event.email_record.conditions"				+"="+	"motion"									+"&"+
							"event.email_record.motion.subject"			+"="+	$.fn._transASCII($("#Ismtp_condition_motion_subject").val())	+"&"+
							"event.email_record.motion.message"			+"="+	$.fn._transASCII($("#Ismtp_condition_motion_message").val())	+"&"+
							"event.email_record.motion.attach_image"	+"="+	motion_attach_image_check					+"&";
			}
			else if($("input[type=radio][name=Nsmtp_condition]:checked").val() == "off")
			{
				command = 	"event.email_record.conditions"				+"="+	"off"										+"&";
			}

			command = command + 
							"event.email_record.authentication"			+"="+	auth										+"&"+
							"event.email_record.server"					+"="+	$("#Ismtp_addr").val()						+"&"+
							"event.email_record.port"					+"="+	$("#Ismtp_port").val()						+"&"+
							"event.email_record.user_id"				+"="+	$("#Ismtp_user").val()						+"&"+
							"event.email_record.password"				+"="+	$("#Ismtp_passwd").val()					+"&"+
							"event.email_record.sender_mail_address"	+"="+	$("#Ismtp_send_addr").val()					+"&";

			for(var i = 1; i<=10;i++)
			{
				mail_en = $("#Imail_"+i+"_en").is(":checked") == false? "off":"on";
				mail_address = $("#Imail_"+i+"_address").val();
				mail_alarm = $("#Imail_"+i+"_alarm").is(":checked") == false? "off":"on";
				mail_motion = $("#Imail_"+i+"_motion").is(":checked") == false? "off":"on";
				mail_tamper = $("#Imail_"+i+"_tamper").is(":checked") == false? "off":"on";

				command = command + "event.email_record.mail_to_"+i+".sender"	+"="+	mail_en								+"&"+
									"event.email_record.mail_to_"+i+".address"	+"="+	mail_address						+"&"+
									"event.email_record.mail_to_"+i+".alarm"	+"="+	mail_alarm							+"&"+
									"event.email_record.mail_to_"+i+".motion"	+"="+	mail_motion							+"&"+
									"event.email_record.mail_to_"+i+".tamper"	+"="+	mail_tamper							+"&";
			}
		
			$.fn._SetParamByMask(command, $.fn._GetLangStr(LT._Reloading), 10000);
		});
		
		$("#Icon_setting_default_pic").bind('click', function(){
			if(confirm($.fn._GetLangStr(LT._Reset_to_default_Warning))){
				$.fn._DefaultParam( $.fn._GetLangStr(LT._Reloading), 7000);
			}
		});
	};	
})(jQuery);