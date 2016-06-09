(function($){
	var num = 2;
	var account_list = new Array(num);
	var modify = 1;
	var redirect = 0;
	for(var i=0;i<=5;i++){
		account_list[i] = new Array(num);
	}
	$.fn._ObjectAssignValue = function(src){
		$.each(src, function(param , val){
			if(param == "account.admin.user_id")
				account_list[0][0] = val[1];
			else if(param == "account.admin.password")
				account_list[0][1] = val[1];
			else if(param == "account.guest_1.user_id")
				account_list[1][0] = val[1];
			else if(param == "account.guest_1.password")
				account_list[1][1] = val[1];
			else if(param == "account.guest_1.auth")
				account_list[1][2] = val[1];
			else if(param == "account.guest_2.user_id")
				account_list[2][0] = val[1];
			else if(param == "account.guest_2.password")
				account_list[2][1] = val[1];
			else if(param == "account.guest_2.auth")
				account_list[2][2] = val[1];
			else if(param == "account.guest_3.user_id")
				account_list[3][0] = val[1];
			else if(param == "account.guest_3.password")
				account_list[3][1] = val[1];
			else if(param == "account.guest_3.auth")
				account_list[3][2] = val[1];
			else if(param == "account.guest_4.user_id")
				account_list[4][0] = val[1];
			else if(param == "account.guest_4.password")
				account_list[4][1] = val[1];
			else if(param == "account.guest_4.auth")
				account_list[4][2] = val[1];
			else if(param == "account.guest_5.user_id")
				account_list[5][0] = val[1];
			else if(param == "account.guest_5.password")
				account_list[5][1] = val[1];
			else if(param == "account.guest_5.auth")
				account_list[5][2] = val[1];
		});
	};
	$.fn._Go = function(){
		$.fn._InitialPageLang();
		$.fn._InitialAccount();
		$.fn._InitialFunc();
		$('#reloading_container').hide();
		$('#container').show();
	};
	$.fn._InitialPageLang = function(){

		$("#Muser_list_title")[0].innerHTML 			= $.fn._GetLangStr(LT._User_List);
		$("#Mnew_useer_title")[0].innerHTML 			= $.fn._GetLangStr(LT._Menu_System_account);
		$("#Maccount_access_level")[0].innerHTML 		= $.fn._GetLangStr(LT._Access_Level)+":";
		$("#Madmins")[0].innerHTML 						= $.fn._GetLangStr(LT._Admin);
		$("#Mguest")[0].innerHTML 						= $.fn._GetLangStr(LT._Guest);
		$("#Maccount_username")[0].innerHTML 			= $.fn._GetLangStr(LT._Username)+":";
		$("#Maccount_passwd")[0].innerHTML 				= $.fn._GetLangStr(LT._Password)+":";
		$("#Maccount_confirm_passwd")[0].innerHTML 		= $.fn._GetLangStr(LT._Password_Confirm)+":";
		$("#Iadd_user").val($.fn._GetLangStr(LT._New_User));
		$("#Idelete_user").val($.fn._GetLangStr(LT._Delete_User));
	};

	$.fn._InitialAccount = function()
	{
		var tmp_user = "", tmp_passwd = "", account_total_list = -1;
		// remove user list 
		$("#IuserList").find('option').remove();

		// insert user list
		$.each(account_list, function(n,data){
			$.each(data, function(n, param){
				if(n == 0)
					tmp_user = param;
				else if(n == 1)
					tmp_passwd = param;
			});

			if(tmp_user != "" && tmp_passwd != ""){
				$("#IuserList").prepend($("<option></option>").attr("value", tmp_user).text(tmp_user));
				account_total_list = account_total_list+1;

				if(account_total_list == 5){
					$("#Iadd_user").attr('disabled',true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
				}else{
					$("#Iadd_user").attr('disabled',false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
				}
			}
		});

		$("#IuserList").change(function(){
			for(var i = 0; i <= 5;i++){
				if($(this).val() == account_list[i][0]){
					if(i == 0){
						$("#Iaccount_username")
						.val(account_list[i][0])
						.attr("disabled",true);
						$("#Iaccount_passwd").val(account_list[i][1]);
						$("#Iaccount_confirm_passwd").val(account_list[i][1]);
						$("input[name=Naccount_access_level][value='admin']").prop('checked',true);
						$("input[type=radio][name=Naccount_access_level]").attr('disabled',true);
						$("#Idelete_user").attr('disabled',true).css('cursor','text').css('background-color','#F1F1F1').css('color','#000');
					}
					else
					{
						$("#Iaccount_username")
						.val(account_list[i][0])
						.attr("disabled",true);
						$("#Iaccount_passwd").val(account_list[i][1]);
						$("#Iaccount_confirm_passwd").val(account_list[i][1]);
						$("input[name=Naccount_access_level][value='"+account_list[i][2]+"']").prop('checked',true);
						$("input[type=radio][name=Naccount_access_level]").attr('disabled',true);
						$("#Idelete_user").attr('disabled',false).css('cursor','pointer').css('background-color','#0061A7').css('color','#fff');
					}
					break;
				}
			}
			modify = 0;
		});

		$("input[type=radio][name=Naccount_access_level]").attr('disabled',true);
		$("input[name=Naccount_access_level][value='guest']").prop('checked',true);
	};

	
	$.fn._InitialFunc = function()
	{
		$("#Iadd_user").bind('click', function(){
			$("#Iaccount_username").val("");
			$("#Iaccount_passwd").val("");
			$("#Iaccount_confirm_passwd").val("");
			$("input[name=Naccount_access_level][value='guest']").prop('checked',true);
			$("#Iaccount_username").val("").attr("disabled",false);
			modify = 1;
		});


		$("#Idelete_user").bind('click', function(){
			var command = "";
			var delete_account = $("#IuserList").val();
			var index = -1;

			if(delete_account == null)
				return;
			
			for(var i = 0; i <= 5;i++)
			{
				if(delete_account == account_list[i][0])
				{
					index = i;
					break;
				}
			}
			command = 	"account.guest_"+index+".user_id"		+"="+ ""	+"&"+
						"account.guest_"+index+".password"		+"="+ ""	+"&"+
						"account.guest_"+index+".auth"			+"="+ "guest";
			
			if(confirm($.fn._GetLangStr(LT._Confirm_Delete_User)))
			{
				$.fn._SetParamByMask(command, $.fn._GetLangStr(LT._Reloading), 3000);
				modify = 1;
			}
		});
		
		$("#Icon_setting_save_pic").bind('click', function()
		{
			var index = -1;
			var tmp_user = $("#Iaccount_username").val();
			var tmp_passwd = $("#Iaccount_passwd").val();
			var command = "";

			if(modify == 1) // increase account
			{
				for(var i = 0; i <= 5;i++)
				{
					if(account_list[i][0] == "" && account_list[i][1] == "")
					{
						index = i;
						break;
					}
				}

				if(index == -1)
				{
					alert($.fn._GetLangStr(LT._Delete_User_note));
					return;
				}
				else
				{
					if($.fn._CheckAccount()){
						alert($.fn._GetLangStr(LT._User_field_note));
						return;
					}

					if($.fn._CheckhasExistAccount()){
						alert($.fn._GetLangStr(LT._Exist_account));
						return;
					}

					if($.fn._CheckPassword()){
						alert($.fn._GetLangStr(LT._Passwd_field_note));
						return;
					}
					
					if($.fn._ConfirmPassword()){
						alert($.fn._GetLangStr(LT._Msg_PleaseConfirmPassword));
						return;
					}

					command = "account.guest_"+index+".user_id"			+"="+ tmp_user		+"&"+
							  "account.guest_"+index+".password"		+"="+ tmp_passwd	+"&"+
							  "account.guest_"+index+".auth"			+"="+ $("input[type=radio][name=Naccount_access_level]:checked").val();
				}
			}
			else if(modify == 0) // modify account
			{
				if($.fn._CheckPassword()){
					alert($.fn._GetLangStr(LT._Passwd_field_note));
					return;
				}
				
				if($.fn._ConfirmPassword()){
					alert($.fn._GetLangStr(LT._Msg_PleaseConfirmPassword));
					return;
				}
				
				for(var i = 0; i <= 5;i++)
				{
					if(account_list[i][0] == tmp_user)
					{
						index = i;
						break;
					}
				}

				if(index == 0){
					command = "account.admin.password"					+"="+ tmp_passwd;
					
					if(LoginID == tmp_user)
						redirect = 1;
				}else{
					command = "account.guest_"+index+".auth"			+"="+ $("input[type=radio][name=Naccount_access_level]:checked").val()+"&"+
							  "account.guest_"+index+".password"		+"="+ tmp_passwd;

					if(LoginID == tmp_user)
						redirect = 1;
				}
			}

			if(redirect)
			{
				$.fn._AccountModify(command,$.fn._GetLangStr(LT._Reloading), 6000);
			}
			else
				$.fn._SetParamByMask(command,$.fn._GetLangStr(LT._Reloading), 3000);
		});
		
		$("#Icon_setting_default_pic").bind('click', function(){
			if(confirm($.fn._GetLangStr(LT._Reset_to_default_Warning))){
				$.fn._DefaultParam($.fn._GetLangStr(LT._Reloading), 3000);
			}
		});
	};

	$.fn._CheckAccount = function()
	{
		var User_name_regex = /^\s*[a-zA-Z0-9]+\s*$/;
		var tmp_user = $("#Iaccount_username").val();
		var ret = 0;
		
		if((tmp_user.length < 4 || tmp_user.length > 40)||!User_name_regex.test(tmp_user)){
			ret = 1;
		}

		return ret;
	};

	$.fn._CheckhasExistAccount = function()
	{
		var tmp_user = $("#Iaccount_username").val();
		var ret = 0;
		
		for(var i = 0; i <= 5;i++)
		{
			if(account_list[i][0] == tmp_user)
			{
				ret = 1;
				break;
			}
		}

		return ret;
	};

	$.fn._CheckPassword = function()
	{
		var Invalid_input_regex = /^\s*[^\"]+\s*$/;
		var tmp_passwd = $("#Iaccount_passwd").val();
		var tmp_confirm_passwd = $("#Iaccount_confirm_passwd").val();
		var ret = 0;
		
		if((tmp_passwd.length < 4 || tmp_passwd.length > 40)||!Invalid_input_regex.test(tmp_passwd)){
			ret = 1;
		}

		if((tmp_confirm_passwd.length < 4 || tmp_confirm_passwd.length > 40)||!Invalid_input_regex.test(tmp_confirm_passwd)){
			ret = 1;
		}

		return ret;
	};

	$.fn._ConfirmPassword = function()
	{
		var tmp_passwd = $("#Iaccount_passwd").val();
		var tmp_confirm_passwd = $("#Iaccount_confirm_passwd").val();
		var ret = 0;

		if(tmp_passwd != tmp_confirm_passwd){
			ret = 1;
		}

		return ret;
	};
})(jQuery);