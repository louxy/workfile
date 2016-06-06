(function($){
	var LT;
	$.fn.UpdateLanguage = function(lang)
	{
		LT = lang;
		console.log("start translated language of %s", $.cookie('def_lang'));
		// update navigation
		$.fn.TransLang("Ilogin_user", $.fn.GetLangStr(LT._User)+":"+$.fn.GetLoginUser(), "s");
		$.fn.TransLang("Ilogout", $.fn.GetLangStr(LT._Logout), "s");
		$.fn.TransLang("Ilive", $.fn.GetLangStr(LT._Live), "s");
		$.fn.TransLang("Iconfig", $.fn.GetLangStr(LT._Configuration), "s");
		// update menu
		$.fn.TransLang("Msiderbar", $.fn.GetLangStr(LT._Advance_configurartion), "s");
		$.fn.TransLang("Mmenu_encode", $.fn.GetLangStr(LT._Encode), "s");
		$.fn.TransLang("Mmenu_images", $.fn.GetLangStr(LT._Images), "s");
		if($.fn.GetABF() == 3)
			$.fn.TransLang("Mmenu_lens", $.fn.GetLangStr(LT._Back_focus), "s");
		else
			$.fn.TransLang("Mmenu_lens", $.fn.GetLangStr(LT._Lens_control), "s");
		$.fn.TransLang("Mmenu_video", $.fn.GetLangStr(LT._Video), "s");
		$.fn.TransLang("Mmenu_network", $.fn.GetLangStr(LT._Network), "s");
		$.fn.TransLang("Mmenu_system", $.fn.GetLangStr(LT._System), "s");
		$.fn.TransLang("Mmenu_account", $.fn.GetLangStr(LT._Account), "s");
		$.fn.TransLang("Mmenu_event_source", $.fn.GetLangStr(LT._Event_source), "s");
		$.fn.TransLang("Mmenu_event_handler", $.fn.GetLangStr(LT._Event_setting), "s");
		$.fn.TransLang("Mmenu_sd_playback", $.fn.GetLangStr(LT._SD_playback), "s");
		$.fn.TransLang("Mmenu_ptz_settings", $.fn.GetLangStr(LT._Ptz_setting), "s");
		$.fn.TransLang("Mmenu_video_analysis", $.fn.GetLangStr(LT._Video_analytics), "s");
		// update sub menu
		$.fn.TransLang("Msub_encode", $.fn.GetLangStr(LT._Encode), "s");
		$.fn.TransLang("Msub_privacy", $.fn.GetLangStr(LT._Privacy_zone), "s");
		$.fn.TransLang("Msub_roi", $.fn.GetLangStr(LT._Enhanced_h264), "s");
		$.fn.TransLang("Msub_exposure", $.fn.GetLangStr(LT._Exposure), "s");
		$.fn.TransLang("Msub_whitebalance", $.fn.GetLangStr(LT._Whtiebalance), "s");
		$.fn.TransLang("Msub_img_basic", $.fn.GetLangStr(LT._Basic_setting), "s");
		if($.fn.GetABF() == 3)
			$.fn.TransLang("Msub_lens", $.fn.GetLangStr(LT._Back_focus), "s");
		else
			$.fn.TransLang("Msub_lens", $.fn.GetLangStr(LT._Lens_control), "s");
		$.fn.TransLang("Msub_rs485", $.fn.GetLangStr("RS485"), "s");
		$.fn.TransLang("Msub_general", $.fn.GetLangStr(LT._General), "s");
		$.fn.TransLang("Msub_ftp", $.fn.GetLangStr(LT._Ftp_Server), "s");
		$.fn.TransLang("Msub_sftp", $.fn.GetLangStr(LT._SFTP), "s");
		$.fn.TransLang("Msub_rtsp", $.fn.GetLangStr(LT._Rtsp), "s");
		$.fn.TransLang("Msub_snmp", $.fn.GetLangStr(LT._Snmp), "s");
		$.fn.TransLang("Msub_ieee8021x", $.fn.GetLangStr(LT._8021x), "s");
		$.fn.TransLang("Msub_firewall", $.fn.GetLangStr(LT._Firewall), "s");
		$.fn.TransLang("Msub_ddns", $.fn.GetLangStr(LT._Ddns), "s");
		$.fn.TransLang("Msub_ldap", $.fn.GetLangStr(LT._Ldap), "s");
		$.fn.TransLang("Msub_ssl", $.fn.GetLangStr(LT._Ssl), "s");
		$.fn.TransLang("Msub_gb28181", $.fn.GetLangStr(LT._GB28181), "s");
		$.fn.TransLang("Msub_youtube", $.fn.GetLangStr(LT._Youtube_Live), "s");
		$.fn.TransLang("Msub_hls", $.fn.GetLangStr(LT._Http_live_streaming), "s");
		$.fn.TransLang("Msub_datetime", $.fn.GetLangStr(LT._Date_time), "s");
		$.fn.TransLang("Msub_audio", $.fn.GetLangStr(LT._Audio), "s");
		$.fn.TransLang("Msub_firmware", $.fn.GetLangStr(LT._Firmware), "s");
		$.fn.TransLang("Msub_configure", $.fn.GetLangStr(LT._Initialize), "s");
		$.fn.TransLang("Msub_osd", $.fn.GetLangStr(LT._Osd), "s");
		$.fn.TransLang("Msub_event_search", $.fn.GetLangStr(LT._Event_search), "s");
		$.fn.TransLang("Msub_account", $.fn.GetLangStr(LT._Account_mag), "s");
		$.fn.TransLang("Msub_alarm", $.fn.GetLangStr(LT._Alarm), "s");
		$.fn.TransLang("Msub_audio_detection", $.fn.GetLangStr(LT._Audio), "s");
		$.fn.TransLang("Msub_defocus", $.fn.GetLangStr(LT._Defocus), "s");
		$.fn.TransLang("Msub_face", $.fn.GetLangStr(LT._Face), "s");
		$.fn.TransLang("Msub_motion", $.fn.GetLangStr(LT._Motion), "s");
		$.fn.TransLang("Msub_network_less", $.fn.GetLangStr(LT._Network), "s");
		$.fn.TransLang("Msub_schedule", $.fn.GetLangStr(LT._Schedule), "s");
		$.fn.TransLang("Msub_tamper", $.fn.GetLangStr(LT._Tamper), "s");
		$.fn.TransLang("Msub_alarm_out", $.fn.GetLangStr(LT._Alarm_out), "s");
		$.fn.TransLang("Msub_email", $.fn.GetLangStr(LT._Email), "s");
		$.fn.TransLang("Msub_sink_ftp", $.fn.GetLangStr(LT._Ftp), "s");
		$.fn.TransLang("Msub_nas", $.fn.GetLangStr(LT._NAS), "s");
		$.fn.TransLang("Msub_recording", $.fn.GetLangStr(LT._Record_setting), "s");
		$.fn.TransLang("Msub_sdcard", $.fn.GetLangStr(LT._SD_card), "s");
		$.fn.TransLang("Msub_snapshot", $.fn.GetLangStr(LT._Snapshot), "s");
		$.fn.TransLang("Msub_sound", $.fn.GetLangStr(LT._Sound), "s");
		$.fn.TransLang("Msub_playback", $.fn.GetLangStr(LT._Playback), "s");
		$.fn.TransLang("Mmsi_warning", $.fn.GetLangStr(LT._MSI_dwonload_note), "s");
		$.fn.TransLang("Mmsi_download", $.fn.ParserDownloadMSI($.fn.GetLangStr(LT._Please_click_here), $.fn.GetLangStr(LT._Here)), "s");
		$.fn.TransLang("Ilive_stream1", $.fn.GetLangStr(LT._Stream)+"1", "s");
		$.fn.TransLang("Ilive_stream2", $.fn.GetLangStr(LT._Stream)+"2", "s");
		$.fn.TransLang("Ilive_stream3", $.fn.GetLangStr(LT._Stream)+"3", "s");
		$.fn.TransLang("Msub_ptz_basic", $.fn.GetLangStr(LT._PTZ_Basic), "s");
		$.fn.TransLang("Msub_ptz_position", $.fn.GetLangStr(LT._PTZ_Position), "s");
		$.fn.TransLang("Msub_ptz_patrol", $.fn.GetLangStr(LT._PTZ_Patrol), "s");
		$.fn.TransLang("Msub_ptz_pattern", $.fn.GetLangStr(LT._PTZ_Pattern), "s");
		$.fn.TransLang("Msub_line_counting", $.fn.GetLangStr(LT._Line_counting), "s");
		$.fn.TransLang("Msub_loitering", $.fn.GetLangStr(LT._Loitering), "s");
		$.fn.TransLang("Msub_sd_detection", $.fn.GetLangStr(LT._mSD_healthness), "s");
		$.fn.TransLang("Msub_va_basic", $.fn.GetLangStr(LT._General), "s");
		$.fn.TransLang("Msub_intrusion", $.fn.GetLangStr(LT._Intrusion), "s");
		$.fn.TransLang("Msub_border_line", $.fn.GetLangStr(LT._Borderline), "s");
		$.fn.TransLang("MliveSiderbar", $.fn.GetLangStr(LT._Media_control), "s");
		$.fn.TransLang("Msub_area_counting", $.fn.GetLangStr(LT._Area_counting), "s");
		$.fn.TransLang("Msub_departure", $.fn.GetLangStr(LT._Departure), "s");
		$.fn.TransLang("Msub_withdrawn", $.fn.GetLangStr(LT._Withdrawn), "s");
		$.fn.TransSave();
		$("#Isnapshot").attr("rel","tooltip").attr("title", $.fn.GetLangStr(LT._Snapshot));
		$("#Ifullscreen").attr("rel","tooltip").attr("title", $.fn.GetLangStr(LT._Full_screen));
		$("#Imanual_record").attr("rel","tooltip").attr("title", $.fn.GetLangStr(LT._Manual_recording));
		$("#IalarmOn").attr("rel","tooltip").attr("title", $.fn.GetLangStr(LT._Alarm));
		$("#ImotionOn").attr("rel","tooltip").attr("title", $.fn.GetLangStr(LT._Motion_detection));
		$("#IfaceOn").attr("rel","tooltip").attr("title", $.fn.GetLangStr(LT._Face_detection));
		$("#Izoom").attr("rel","tooltip").attr("title", $.fn.GetLangStr(LT._Zoom_control));
		$("#Irs485_set").attr("rel","tooltip").attr("title", $.fn.GetLangStr(LT._Preset_Set));
		$("#Irs485_zoom_in").attr("rel","tooltip").attr("title", $.fn.GetLangStr(LT._Zoom_in));
		$("#Irs485_zoom_out").attr("rel","tooltip").attr("title", $.fn.GetLangStr(LT._Zoom_out));
		$.fn.TransLang("Mlive_timing_relay", $.fn.GetLangStr(LT._Live_view_jitter), "s");
		$.fn.TransMultiLang("Msec", $.fn.GetLangStr(LT._Sec), "s");
		$.fn.TransMultiLang("Mframe", $.fn.GetLangStr(LT._Frame), "s");
		$.fn.TransEncodeArea();
		$.fn.TransPrivacyZoneArea();
		$.fn.TransROIArea();
		$.fn.TransExposureArea();
		$.fn.TransWhitBalanceArea();
		$.fn.TransColorArea();
		$.fn.TransQulityArea();
		$.fn.TransLensArea();
		$.fn.TransNetworkArea();
		$.fn.TransFtpArea();
		$.fn.TransRtspArea();
		$.fn.TransSnmpArea();	
		$.fn.Trans8021xArea();
		$.fn.TransDDNSArea();
		$.fn.TransFirewallArea();
		$.fn.TransSSLArea();
		$.fn.TransGB28181Area();
		$.fn.TransYoutubeArea();
		$.fn.TransHLSArea();
		$.fn.TransLDAPArea();
		$.fn.TransDateTimeArea();
		$.fn.TransAudioArea();
		$.fn.TransInitialArea();
		$.fn.TransFirmwareArea();
		$.fn.TransOSDArea();
		$.fn.TransEventSearchArea();
		$.fn.TransAccountArea();
		$.fn.TransAlarmArea();
		$.fn.TransEvAudioArea();
		$.fn.TransDefocusArea();
		$.fn.TransFaceArea();
		$.fn.TransMotionArea();
		$.fn.TransNetworkLessArea();
		$.fn.TransScheduleArea();
		$.fn.TransTamperArea();
		$.fn.TransAlarmOutArea();
		$.fn.TransEmailArea();
		$.fn.TransEvFtpArea();
		$.fn.TransNASArea();
		$.fn.TransRecordingArea();
		$.fn.TransSDCardArea();
		$.fn.TransSnapshotArea();
		$.fn.TransSoundArea();
		$.fn.TransPlaybackArea();
		$.fn.TransPtzBasicArea();
		$.fn.TransPtzPositionArea();
		$.fn.TransPtzPatrolArea();
		$.fn.TransPtzPatternArea();
		$.fn.TransObjectCountingArea();
		$.fn.TransLoiteringArea();
		$.fn.TransIntrusionArea();
		$.fn.TransLineCrossingArea();
		$.fn.TransAreaCountingArea();
		$.fn.TransDepartureArea();
		$.fn.TransSdDetectionArea();
		$.fn.TransRS485Area();
		$.fn.TransWithdrawnArea();
		$.fn.RemoveModelAttribute();
		$.fn.initialCommonLT(lang);
		$.fn.TransAllSelectOptions();
		console.log("Tanslated language finsh.");
	};

	$.fn.TransEncodeArea = function()
	{
		$.fn.TransLang("Mencode_profile", $.fn.GetLangStr(LT._Profile), "s");
		$.fn.TransLang("Mencode_current_profile_id", $.fn.GetLangStr(LT._Current_profile), "s");
		$.fn.TransLang("Mencode_profile_corridor", $.fn.GetLangStr(LT._Corridor), "s");
		if($.fn.GetPlatForm() == "xarina_entry")
			$.fn.TransLang("Mencode_profile_corridor_note", $.fn.GetLangStr(LT._Corridor_will_not_mjpeg), "s");
		else if($.fn.GetPlatForm() == "s2")
			$.fn.TransLang("Mencode_profile_corridor_note", $.fn.GetLangStr(LT._Corridor_will_not_5m), "s");
		for(var i = 1; i <= 3 ; i++)
		{
			$.fn.TransLang("Mencode_stream"+i, $.fn.GetLangStr(LT._Stream)+i, "s");
			$.fn.TransLang("Mencode_profile_stream_"+i+"_compression", $.fn.GetLangStr(LT._Compression), "s");
			$.fn.TransLang("Mencode_profile_stream_"+i+"_codec", $.fn.GetLangStr(LT._Codec), "s");
			$.fn.TransLang("Mencode_profile_stream_"+i+"_dscp", $.fn.GetLangStr(LT._DSCP), "s");
			$.fn.TransLang("Mencode_profile_stream_"+i+"_h264_profile", $.fn.GetLangStr(LT._Profile), "s");
			$.fn.TransLang("Mencode_profile_stream_"+i+"_frame_rate", $.fn.GetLangStr(LT._Frame_rate), "s");
			$.fn.TransLang("Mencode_profile_stream_"+i+"_h264_gop", $.fn.GetLangStr(LT._GOP), "s");
			$.fn.TransLang("Mencode_profile_stream_"+i+"_rate_control", $.fn.GetLangStr(LT._Rate_control), "s");
			$.fn.TransLang("Mencode_profile_stream_"+i+"_mjpeg_quality_level", $.fn.GetLangStr(LT._Quality_level), "s");
			$.fn.TransLang("Mencode_profile_stream_"+i+"_h264_cvbr_bitrate_max", $.fn.GetLangStr(LT._Max_bit_rate), "s");
			$.fn.TransLang("Mencode_profile_stream_"+i+"_h264_cbr_bitrate", $.fn.GetLangStr(LT._CBR_bit_rate), "s");
			$.fn.TransLang("Iencode_stream"+i+"_playback_warning", $.fn.GetLangStr(LT._Playback_warning), "s");
		}
	};

	$.fn.TransPrivacyZoneArea = function()
	{
		$.fn.TransLang("Mvideo_privacy_basic", $.fn.GetLangStr(LT._Basic_setting), "s");
		$.fn.TransLang("Mvideo_privacy_zone_color_setting", $.fn.GetLangStr(LT._Privacy_color_setting), "s");
		$.fn.TransLang("Mvideo_privacy_enable", $.fn.GetLangStr(LT._Enable), "s");
		$.fn.TransLang("pri_on", $.fn.GetLangStr(LT._On), "s");
		$.fn.TransLang("pri_off", $.fn.GetLangStr(LT._Off), "s");
		$.fn.TransLang("Mvideo_privacy_zone_setting", $.fn.GetLangStr(LT._Zone_setting), "s");
		$.fn.TransLang("Iprivacy_delete", $.fn.GetLangStr(LT._Clean), "b");
	};

	$.fn.TransROIArea = function()
	{
		$.fn.TransLang("Mvideo_roi_basic", $.fn.GetLangStr(LT._Basic_setting), "s");
		$.fn.TransLang("Mroi_off", $.fn.GetLangStr(LT._Off), "s");
		for(var i = 1; i <= 2; i++){
			$.fn.TransLang("Mvideo_roi_quality_"+i, $.fn.GetLangStr(LT._Zone)+" "+i, "s");
			$.fn.TransLang("Mvideo_roi_zone_level_"+i, $.fn.GetLangStr(LT._Level), "s");
			$.fn.TransLang("Mvideo_roi_zone_zone_"+i, $.fn.GetLangStr(LT._Zone), "s");
			$.fn.TransLang("I_roi_"+i+"_set", $.fn.GetLangStr(LT._Save), "b");
			$.fn.TransLang("I_roi_"+i+"_clean", $.fn.GetLangStr(LT._Clean), "b");
		}
		$.fn.TransLang("Mroi", $.fn.GetLangStr(LT._iZone), "s");
		$.fn.TransLang("Mlightweight_stream", $.fn.GetLangStr(LT._iStream), "s");
		$.fn.TransLang("Mvideo_roi_mode", $.fn.GetLangStr(LT._Mode), "s");
		$.fn.TransLang("Mvideo_roi_zone_lightweight_stream_level", $.fn.GetLangStr(LT._Level), "s");
	};

	$.fn.TransExposureArea = function()
	{
		$.fn.TransLang("Mimage_exposure_basic", $.fn.GetLangStr(LT._Basic_setting), "s");
		$.fn.TransLang("Mimage_exposure_wdr_mode", $.fn.GetLangStr(LT._Exposure_mode), "s");
		$.fn.TransLang("Mimage_exposure_fixed_iris_mode", $.fn.GetLangStr(LT._Fixed_iris_control), "s");
		$.fn.TransLang("Mimage_exposure_dc_iris_mode", $.fn.GetLangStr(LT._DC_iris_control), "s");
		$.fn.TransLang("Mimage_exposure_p_iris_mode", $.fn.GetLangStr(LT._P_iris_control), "s");
		$.fn.TransLang("Mimage_exposure_p_iris_level", $.fn.GetLangStr(LT._P_iris_level), "s");
		$.fn.TransLang("Mimage_exposure_blc", $.fn.GetLangStr(LT._BLC), "s");
		$.fn.TransLang("Mimage_exposure_day_night_setting", $.fn.GetLangStr(LT._Day_night_setting), "s");
		$.fn.TransLang("Mimage_exposure_day_night_mode", $.fn.GetLangStr(LT._Mode), "s");
		$.fn.TransLang("Mimage_exposure_dn_level", $.fn.GetLangStr(LT._Day_to_night), "s");
		$.fn.TransLang("Mimage_exposure_nd_level", $.fn.GetLangStr(LT._Night_to_day), "s");
		$.fn.TransLang("Mimage_exposure_sensitivity", $.fn.GetLangStr(LT._Sensitivity), "s");
		$.fn.TransLang("Mimage_exposure_switch_time", $.fn.GetLangStr(LT._Time), "s");
		$.fn.TransLang("Mimage_exposure_icr_mode", $.fn.GetLangStr(LT._ICR_mode), "s");
		$.fn.TransLang("Mimage_exposure_ir_mode", $.fn.GetLangStr(LT._IR_mode), "s");
		$.fn.TransLang("MIimage_exposure_ir_level_mode", $.fn.GetLangStr(LT._IR_level), "s");
		$.fn.TransLang("Mimage_exposure_adjustable", $.fn.GetLangStr(LT._Adjustable), "s");
		$.fn.TransLang("Mimage_exposure_ir_level_adaptive_broad", $.fn.GetLangStr(LT._Broad), "s");
		$.fn.TransLang("Mimage_exposure_ir_level_adaptive_narrow", $.fn.GetLangStr(LT._Narrow), "s");
		$.fn.TransLang("Mimage_exposure_ir_optimizer", $.fn.GetLangStr(LT._IR_optimizer), "s");
		$.fn.TransLang("Mimage_exposure_digital_wdr", $.fn.GetLangStr(LT._Digital_wdr), "s");
		$.fn.TransLang("Mimage_exposure_ev_comp", $.fn.GetLangStr(LT._EV), "s");
		$.fn.TransLang("Mimage_exposure_gain", $.fn.GetLangStr(LT._Gain), "s");
		$.fn.TransLang("Mimage_exposure_hlc_mode", $.fn.GetLangStr(LT._HLC), "s");
		$.fn.TransLang("Mimage_exposure_max_speed", $.fn.GetLangStr(LT._Max_shutter_time), "s");
		$.fn.TransLang("Mimage_exposure_min_speed", $.fn.GetLangStr(LT._Min_shutter_time), "s");
		$.fn.TransLang("Mimage_exposure_shutter_priority_speed", $.fn.GetLangStr(LT._Shutter_speed), "s");
		$.fn.TransLang("Mimage_exposure_method_manual_gain", $.fn.GetLangStr(LT._Gain), "s");
		$.fn.TransLang("Mimage_exposure_manual_shutter_speed", $.fn.GetLangStr(LT._Shutter_speed), "s");
		$.fn.TransLang("Mimage_exposure_day_night_switch_ctrl", $.fn.GetLangStr(LT._Day_night_switch_ctrl), "s");
		$.fn.TransLang("Mimage_ir_ctrl", $.fn.GetLangStr(LT._IR_control), "s");
		$.fn.TransLang("Mimage_sensitity", $.fn.GetLangStr(LT._Sensitivity), "s");
		// $.fn.TransLang("Mclose", $.fn.GetLangStr(LT._Close), "s");
		$.fn.TransLang("Mfull_open", $.fn.GetLangStr(LT._Full_open), "s");
		$.fn.TransMultiLang("Mlow", $.fn.GetLangStr(LT._Low), "s");
		$.fn.TransMultiLang("Mhight", $.fn.GetLangStr(LT._High), "s");
	};

	$.fn.TransWhitBalanceArea = function()
	{
		$.fn.TransLang("Mimage_white_basic", $.fn.GetLangStr(LT._Basic_setting), "s");
		$.fn.TransLang("Mimage_white_balance_mode", $.fn.GetLangStr(LT._Mode), "s");
		$.fn.TransLang("Mimage_white_balance_manual_r_gain", $.fn.GetLangStr(LT._R_Gain), "s");
		$.fn.TransLang("Mimage_white_balance_manual_b_gain", $.fn.GetLangStr(LT._B_Gain), "s");
		$.fn.TransLang("Iimage_white_balance_manual_one_push", $.fn.GetLangStr(LT._One_push), "b");
	};

	$.fn.TransColorArea = function()
	{
		$.fn.TransLang("Mimage_color_basic", $.fn.GetLangStr(LT._Color), "s");
		$.fn.TransLang("Mimage_color_brightness", $.fn.GetLangStr(LT._Brightness), "s");
		$.fn.TransLang("Mimage_color_contrast", $.fn.GetLangStr(LT._Contrast), "s");
		$.fn.TransLang("Mimage_color_saturation", $.fn.GetLangStr(LT._Saturation), "s");
		$.fn.TransLang("Mimage_color_hue", $.fn.GetLangStr(LT._Hue), "s");
		$.fn.TransLang("Mimage_color_mirror_flip",$.fn.GetLangStr(LT._Mirror_flip_setting), "s");
		$.fn.TransLang("Mimage_orientation", $.fn.GetLangStr(LT._Orientation), "s");
		$.fn.TransLang("Mlens_type", $.fn.GetLangStr(LT._Lens_type), "s");
	};

	$.fn.TransQulityArea = function()
	{
		$.fn.TransLang("Mimage_quality_basic", $.fn.GetLangStr(LT._Quality), "s");
		$.fn.TransLang("Mimage_quality_sharpness", $.fn.GetLangStr(LT._Sharpness), "s");
		$.fn.TransLang("Mimage_quality_temporal_noise_reduction", $.fn.GetLangStr(LT._Noise_reduction), "s");
		$.fn.TransLang("Mimage_quality_defog", $.fn.GetLangStr(LT._Defog), "s");
		$.fn.TransLang("Mimage_quality_gamma_correction", $.fn.GetLangStr(LT._Gamma_correction), "s");
	};

	$.fn.TransLensArea = function()
	{
		$.fn.TransLang("Mlens_zoom", $.fn.GetLangStr(LT._Zoom_control), "s");
		$.fn.TransLang("Mlens_zoom_digital", $.fn.GetLangStr(LT._Digital), "s");
		$.fn.TransLang("Mlens_zoom_manual", $.fn.GetLangStr(LT._Manual), "s");
		$.fn.TransLang("Mmotorized_lens_zoom_move_absolute", $.fn.GetLangStr(LT._Absolute), "s");
		$.fn.TransLang("Mmotorized_lens_zoom_move_relative", $.fn.GetLangStr(LT._Relative), "s");
		$.fn.TransLang("Mlens_zoom_continuous", $.fn.GetLangStr(LT._Continuous), "s");
		$.fn.TransLang("Mmotorized_lens_zoom_move_continuous_in", $.fn.GetLangStr(LT._Zoom_in), "s");
		$.fn.TransLang("Mmotorized_lens_zoom_move_continuous_out", $.fn.GetLangStr(LT._Zoom_out), "s");
		$.fn.TransLang("Mlens_focus", $.fn.GetLangStr(LT._Focus_control), "s");	
		$.fn.TransLang("Mlens_focus_one_push", $.fn.GetLangStr(LT._Auto_focus), "s");
		$.fn.TransLang("Mmotorized_lens_one_push", $.fn.GetLangStr(LT._One_push_af), "s");
		$.fn.TransLang("Mlens_focus_manual", $.fn.GetLangStr(LT._Manual), "s");
		$.fn.TransLang("Mmotorized_lens_focus_move_absolute", $.fn.GetLangStr(LT._Absolute), "s");
		$.fn.TransLang("Mmotorized_lens_focus_move_relative", $.fn.GetLangStr(LT._Relative), "s");
		$.fn.TransLang("Mlens_focus_continuous", $.fn.GetLangStr(LT._Continuous), "s");
		$.fn.TransLang("Mmotorized_lens_focus_move_continuous_far", $.fn.GetLangStr(LT._Far), "s");
		$.fn.TransLang("Mmotorized_lens_focus_move_continuous_near", $.fn.GetLangStr(LT._Near), "s");
		$.fn.TransLang("Mlens_day_night_refocus", $.fn.GetLangStr(LT._Advanced_focus_ctrl), "s");
		$.fn.TransLang("Mmotorized_lens_refocus_day_night_switch", $.fn.GetLangStr(LT._Day_night_switch), "s");
		$.fn.TransLang("Mmotorized_lens_refocus_temperature_change", $.fn.GetLangStr(LT._Tamperature), "s");
		$.fn.TransLang("Mmotorized_lens_refocus_zoom_trigger", $.fn.GetLangStr(LT._Zoom_trigger), "s");
		$.fn.TransLang("Mlens_calibration", $.fn.GetLangStr(LT._Restore_position), "s");
		$.fn.TransLang("Imotorized_lens_zoom_move_continuous_in", $.fn.GetLangStr(LT._Start), "b");
		$.fn.TransLang("Imotorized_lens_zoom_move_continuous_out", $.fn.GetLangStr(LT._Start), "b");
		$.fn.TransLang("Imotorized_lens_zoom_move_continuous_in_stop", $.fn.GetLangStr(LT._Stop), "b");
		$.fn.TransLang("Imotorized_lens_zoom_move_continuous_out_stop", $.fn.GetLangStr(LT._Stop), "b");
		$.fn.TransLang("Imotorized_lens_focus_move_continuous_far", $.fn.GetLangStr(LT._Start), "b");
		$.fn.TransLang("Imotorized_lens_focus_move_continuous_near", $.fn.GetLangStr(LT._Start), "b");
		$.fn.TransLang("Imotorized_lens_focus_move_continuous_far_stop", $.fn.GetLangStr(LT._Stop), "b");
		$.fn.TransLang("Imotorized_lens_focus_move_continuous_near_stop", $.fn.GetLangStr(LT._Stop), "b");
		$.fn.TransLang("Imotorized_lens_calibration", $.fn.GetLangStr(LT._Start), "b");
		$.fn.TransLang("Imotorized_lens_one_push", $.fn.GetLangStr(LT._Start), "b");
		$.fn.TransMultiLang("Mwied", $.fn.GetLangStr(LT._Wide), "s");
		$.fn.TransMultiLang("Mtele", $.fn.GetLangStr(LT._Tele), "s");
		$.fn.TransMultiLang("Mnear", $.fn.GetLangStr(LT._Near), "s");
		$.fn.TransMultiLang("Mfar", $.fn.GetLangStr(LT._Far), "s");
		$.fn.TransLang("Mnetwork_bonjour_enable", $.fn.GetLangStr(LT._Bonjour), "s");
	};

	$.fn.TransNetworkArea = function()
	{
		$.fn.TransLang("Mnetwork_basic", $.fn.GetLangStr(LT._Basic_setting), "s");
		$.fn.TransLang("Mnetwork_device_name", $.fn.GetLangStr(LT._Device_name), "s");
		$.fn.TransLang("Mnetwork_web_enable_ldap", $.fn.GetLangStr(LT._Enable_ldap), "s");
		$.fn.TransLang("Mnetwork_web_http_port", $.fn.GetLangStr(LT._Http_port), "s");
		$.fn.TransLang("Mnetwork_ip_setting", $.fn.GetLangStr(LT._IP_settings), "s");
		$.fn.TransLang("Mnetwork_wire_ipv4_mode", $.fn.GetLangStr(LT._Mode), "s");
		$.fn.TransLang("Mnetwork_ipv4_addr", $.fn.GetLangStr(LT._IPv4_address), "s");
		$.fn.TransLang("Mnetwork_ipv4_subnet_addr", $.fn.GetLangStr(LT._IPv4_subnet_mask), "s");
		$.fn.TransLang("Mnetwork_ipv4_default_addr", $.fn.GetLangStr(LT._IPv4_default_gateway), "s");
		$.fn.TransLang("Mnetwork_ipv4_dhcp_addr", $.fn.GetLangStr(LT._IPv4_address), "s");
		$.fn.TransLang("Mnetwork_ipv4_dhcp_subnet_addr", $.fn.GetLangStr(LT._IPv4_subnet_mask), "s");
		$.fn.TransLang("Mnetwork_ipv4_dhcp_default_addr", $.fn.GetLangStr(LT._IPv4_default_gateway), "s");
		$.fn.TransLang("Mnetwork_wire_setting", $.fn.GetLangStr(LT._Wire_setting), "s");
		$.fn.TransLang("Mnetwork_wire_nic_type", $.fn.GetLangStr(LT._Nic_type), "s");
		$.fn.TransLang("Mnetwork_wire_ipv4_manual_dns_1_address", $.fn.GetLangStr(LT._Primary_dns), "s");
		$.fn.TransLang("Mnetwork_wire_ipv4_manual_dns_2_address", $.fn.GetLangStr(LT._Secondary_dns), "s");
		$.fn.TransLang("Mnetwork_wire_ipv4_pppoe_ip_address", $.fn.GetLangStr(LT._IP_address), "s");
		$.fn.TransLang("Mnetwork_wire_ipv4_pppoe_username", $.fn.GetLangStr(LT._User_name), "s");
		$.fn.TransLang("Mnetwork_wire_ipv4_pppoe_password", $.fn.GetLangStr(LT._Password), "s");
		$.fn.TransLang("Mnetwork_upnp", $.fn.GetLangStr(LT._UPnP), "s");
		$.fn.TransLang("Mnetwork_upnp_enable", $.fn.GetLangStr(LT._Enable_upnp), "s");
		$.fn.TransLang("Mnetwork_upnp_friendly_name", $.fn.GetLangStr(LT._Mode), "s");
		$.fn.TransLang("Mnetwork_upnp_friendly_name_text", $.fn.GetLangStr(LT._Friendly_name), "s");
		$.fn.TransLang("Mnetwork_ssl", $.fn.GetLangStr(LT._Ssl), "s");
		$.fn.TransLang("Mnetwork_web_ssl_enable", $.fn.GetLangStr(LT._Enable_ssl), "s");
		$.fn.TransLang("Mnetwork_web_ssl_port", $.fn.GetLangStr(LT._Https_port), "s");
		$.fn.TransLang("Mhttp_port_range", "(80, 1025~65535)", "s");
		$.fn.TransLang("Mhttps_port_range", "(443, 1025~65535)", "s");
		$.fn.TransLang("Mnetwork_web_ssl_certificate_has_no_installed", $.fn.GetLangStr(LT._SSL_certificate_msg), "s");
		$.fn.TransLang("Mnetwork_view", $.fn.GetLangStr(LT._View_current_network_settings), "s");
		$.fn.TransLang("Inetwork_view", $.fn.GetLangStr(LT._View), "b");
		$.fn.TransLang("Mnetwork_wire_ipv6_enable", $.fn.GetLangStr(LT._IPv6_enable), "s");
		$.fn.TransLang("Mnetwork_wire_ipv6_router_advertisement", $.fn.GetLangStr(LT._IPv6_advert), "s");
		$.fn.TransLang("Mnetwork_wire_ipv6_dhcp", $.fn.GetLangStr(LT._IPv6_dhcp), "s");
		$.fn.TransLang("Mnetwork_wire_ipv6_address", $.fn.GetLangStr(LT._IPv6_addr), "s");
		$.fn.TransLang("Mnetwork_wire_ipv6_default_route", $.fn.GetLangStr(LT._IPv6_default_router), "s");
		$.fn.TransLang("Mnetwork_wire_ipv6_address_prefix_len", $.fn.GetLangStr(LT._Subnet_prefix_length), "s");
		$.fn.TransLang("Mnetwork_wire_ipv6_default_route_prefix_len", $.fn.GetLangStr(LT._Subnet_prefix_length), "s");
		$.fn.TransLang("Mnetwork_wire_ipv6_dns_address", $.fn.GetLangStr(LT._IPv6_dns), "s");
		$.fn.TransLang("Mldap_warning_1", $.fn.GetLangStr(LT._Please_check_the_information), "s");
		$.fn.TransLang("Mldap_warning_2", $.fn.GetLangStr(LT._Please_note_that_you), "s");
	};

	$.fn.TransFtpArea = function()
	{
		$.fn.TransLang("Mnetwork_ftp", $.fn.GetLangStr(LT._Basic_setting), "s");
		$.fn.TransLang("Mnetwork_sftp", $.fn.GetLangStr(LT._Basic_setting), "s");
		$.fn.TransLang("Mnetwork_ftp_server_enable", $.fn.GetLangStr(LT._Enable), "s");	
		$.fn.TransLang("Mnetwork_ftp_server_port", $.fn.GetLangStr(LT._Port), "s");
		$.fn.TransLang("Mnetwork_sftp_server_enable", $.fn.GetLangStr(LT._Enable), "s");	
		$.fn.TransLang("Mnetwork_sftp_server_port", $.fn.GetLangStr(LT._Port), "s");
		$.fn.TransLang("Mftp_port_range", "(21, 1025~65535)", "s");
		$.fn.TransLang("Msftp_port_range", "(1025~65535)", "s");
	};

	$.fn.TransRtspArea = function()
	{
		$.fn.TransLang("Mnetwork_rtsp_authentication", $.fn.GetLangStr(LT._Authentication), "s");
		$.fn.TransLang("Mnetwork_rtsp", $.fn.GetLangStr(LT._Basic_setting), "s");
		$.fn.TransLang("Mnetwork_rtsp_login_id", $.fn.GetLangStr(LT._Login_id), "s");
		$.fn.TransLang("Mnetwork_rtsp_port", $.fn.GetLangStr(LT._Port), "s");
		$.fn.TransLang("Mnetwork_rtsp_password", $.fn.GetLangStr(LT._Password), "s");
		$.fn.TransLang("Mnetwork_rtsp_multicast_auto_connect", $.fn.GetLangStr(LT._Auto_connect), "s");
		$.fn.TransLang("Mnetwork_rtsp_multicast_1", $.fn.GetLangStr(LT._Multicast_address_setting), "s");
		$.fn.TransLang("Mnetwork_rtsp_multicast_2", $.fn.GetLangStr(LT._Multicast_address_setting), "s");
		$.fn.TransLang("Mnetwork_rtsp_multicast_3", $.fn.GetLangStr(LT._Multicast_address_setting), "s");
		
		for(var i = 1; i <= 3 ; i++)
		{
			$.fn.TransLang("Mnetwork_rtsp_stream"+i, $.fn.GetLangStr(LT._Stream)+i, "s");
			$.fn.TransLang("Mnetwork_rtsp_stream_"+i+"_url", $.fn.GetLangStr(LT._URL), "s");
			$.fn.TransLang("Mnetwork_rtsp_stream_"+i+"_metadata", $.fn.GetLangStr(LT._Metadata), "s");
			$.fn.TransLang("Mnetwork_rtsp_stream_"+i+"_multicast_address_type", $.fn.GetLangStr(LT._Address_type), "s");
			$.fn.TransLang("Mnetwork_rtsp_stream_"+i+"_multicast_url", $.fn.GetLangStr(LT._Multicast_url), "s");

			$.fn.TransLang("Mnetwork_rtsp_stream_"+i+"_multicast_video_address", $.fn.GetLangStr(LT._Video_address), "s");
			$.fn.TransLang("Mnetwork_rtsp_stream_"+i+"_multicast_video_port", $.fn.GetLangStr(LT._Video_port), "s");
			$.fn.TransLang("Mnetwork_rtsp_stream_"+i+"_multicast_audio_address", $.fn.GetLangStr(LT._Audio_address), "s");
			$.fn.TransLang("Mnetwork_rtsp_stream_"+i+"_multicast_audio_port", $.fn.GetLangStr(LT._Audio_port), "s");
			$.fn.TransLang("Mnetwork_rtsp_stream_"+i+"_multicast_meta_address", $.fn.GetLangStr(LT._Meta_address), "s");
			$.fn.TransLang("Mnetwork_rtsp_stream_"+i+"_multicast_meta_port", $.fn.GetLangStr(LT._Meta_port), "s");
		}
	};

	$.fn.TransSnmpArea = function()
	{
		$.fn.TransLang("Mnetwork_snmp_v1", $.fn.GetLangStr(LT._SNMP_v)+"1", "s");
		$.fn.TransLang("Mnetwork_snmp_v1v2c_v1_enable", $.fn.GetLangStr(LT._Enable), "s");
		$.fn.TransLang("Mnetwork_snmp_v2c", $.fn.GetLangStr(LT._SNMP_v)+"2c", "s");
		$.fn.TransLang("Mnetwork_snmp_v1v2c_v2c_enable", $.fn.GetLangStr(LT._Enable), "s");
		$.fn.TransLang("Mnetwork_snmp_v1v2c_read_community_string", $.fn.GetLangStr(LT._Read_community_string), "s");
		$.fn.TransLang("Mnetwork_snmp_v1v2c_write_community_string", $.fn.GetLangStr(LT._Write_community_string), "s");
		$.fn.TransLang("Mnetwork_snmp_v1v2c_trap_community_string", $.fn.GetLangStr(LT._Trap_community_string), "s");
		$.fn.TransLang("Mnetwork_snmp_v3", $.fn.GetLangStr(LT._SNMP_v)+"3", "s");
		$.fn.TransLang("Mnetwork_snmp_v3_enable", $.fn.GetLangStr(LT._Enable), "s");
		$.fn.TransLang("Mnetwork_snmp_v3_username", $.fn.GetLangStr(LT._User_name), "s");
		$.fn.TransLang("Mnetwork_snmp_v3_authentication_mode", $.fn.GetLangStr(LT._Authentication_mode), "s");
		$.fn.TransLang("Mnetwork_snmp_v3_authentication_passwd", $.fn.GetLangStr(LT._Authentication_password), "s");
		$.fn.TransLang("Mnetwork_snmp_v3_privacy_mode", $.fn.GetLangStr(LT._Privacy_mode), "s");
		$.fn.TransLang("Mnetwork_snmp_v3_privacy_passwd", $.fn.GetLangStr(LT._Privacy_password), "s");
		$.fn.TransLang("Mnetwork_snmp_trap", $.fn.GetLangStr(LT._SNMP_trap), "s");
		$.fn.TransLang("Mnetwork_snmp_trap_mode", $.fn.GetLangStr(LT._Mode), "s");
		$.fn.TransLang("Mnetwork_snmp_trap_target_ip", $.fn.GetLangStr(LT._Target_ip), "s");
		$.fn.TransLang("Mnetwork_snmp_trap_trap_type_heartbeat", $.fn.GetLangStr(LT._SNMP_heartbeat), "s");
		$.fn.TransLang("Mnetwork_snmp_trap_trap_type_heartbeat_interval", $.fn.GetLangStr(LT._heartbeat_interval), "s");
		$.fn.TransLang("Mnetwork_snmp_trap_trap_type_event", $.fn.GetLangStr(LT._Event), "s");
		$.fn.TransLang("Mnetwork_snmp_download_mib", $.fn.GetLangStr(LT._Download_mib), "s");
		$.fn.TransLang("Inetwork_snmp_mib_file_download", $.fn.GetLangStr(LT._Download), "b");
	};

	$.fn.Trans8021xArea = function()
	{
		$.fn.TransLang("Mnetwork_snmp_8021x", $.fn.GetLangStr(LT._Basic_setting), "s");
		$.fn.TransLang("Mnetwork_ieee8021x_protocol", $.fn.GetLangStr(LT._Protocol), "s");
		$.fn.TransLang("Mnetwork_ieee8021x_eap_md5_user_name", $.fn.GetLangStr(LT._User_name), "s");
		$.fn.TransLang("Mnetwork_ieee8021x_eap_md5_user_passwd", $.fn.GetLangStr(LT._Password), "s");
		$.fn.TransLang("Mnetwork_ieee8021x_eap_md5_status", $.fn.GetLangStr(LT._Status), "s");
		$.fn.TransLang("Mnetwork_ieee8021x_eap_ttls_inner_auth", $.fn.GetLangStr(LT._Inner_authentication), "s");
		$.fn.TransLang("Mnetwork_ieee8021x_eap_ttls_user_name", $.fn.GetLangStr(LT._User_name), "s");
		$.fn.TransLang("Mnetwork_ieee8021x_eap_ttls_user_passwd", $.fn.GetLangStr(LT._Password), "s");
		$.fn.TransLang("Mnetwork_ieee8021x_eap_ttls_anonymous_id", $.fn.GetLangStr(LT._Anonymous_id), "s");
		$.fn.TransLang("Mnetwork_ieee8021x_eap_ttls_ca_file", $.fn.GetLangStr(LT._CA_certificate), "s");
		$.fn.TransLang("Mnetwork_ieee8021x_eap_ttls_status", $.fn.GetLangStr(LT._Status), "s");
		$.fn.TransLang("Mnetwork_ieee8021x_eap_peap_inner_auth", $.fn.GetLangStr(LT._Inner_authentication), "s");
		$.fn.TransLang("Mnetwork_ieee8021x_eap_peap_user_name", $.fn.GetLangStr(LT._User_name), "s");
		$.fn.TransLang("Mnetwork_ieee8021x_eap_peap_user_passwd", $.fn.GetLangStr(LT._Password), "s");
		$.fn.TransLang("Mnetwork_ieee8021x_eap_peap_ca_file", $.fn.GetLangStr(LT._CA_certificate), "s");
		$.fn.TransLang("Mnetwork_ieee8021x_eap_peap_status", $.fn.GetLangStr(LT._Status), "s");
		$.fn.TransLang("Inetwork_ieee8021x_eap_md5_save_and_test", $.fn.GetLangStr(LT._Save_and_test), "b");
		$.fn.TransLang("Inetwork_ieee8021x_eap_ttls_save_and_test", $.fn.GetLangStr(LT._Save_and_test), "b");
		$.fn.TransLang("Inetwork_ieee8021x_eap_peap_save_and_test", $.fn.GetLangStr(LT._Save_and_test), "b");
		$.fn.TransLang("Inetwork_ieee8021x_eap_ttls_ca_file_browser", $.fn.GetLangStr(LT._Browser), "b");
		$.fn.TransLang("Inetwork_ieee8021x_eap_peap_ca_file_browser", $.fn.GetLangStr(LT._Browser), "b");
	};

	$.fn.TransDDNSArea = function()
	{
		$.fn.TransLang("Mnetwork_ddns", $.fn.GetLangStr(LT._Basic_setting), "s");
		$.fn.TransLang("Mnetwork_ddns_enable", $.fn.GetLangStr(LT._Enable), "s");
		$.fn.TransLang("Mnetwork_ddns_ddns_type", $.fn.GetLangStr(LT._Type), "s");
		$.fn.TransLang("Mnetwork_ddns_hostname", $.fn.GetLangStr(LT._Hostname), "s");
		$.fn.TransLang("Mnetwork_ddns_username", $.fn.GetLangStr(LT._User_name), "s");
		$.fn.TransLang("Mnetwork_ddns_password", $.fn.GetLangStr(LT._Password), "s");
		$.fn.TransLang("Mnetwork_ddns_hash", $.fn.GetLangStr(LT._Hash), "s");
	}
	
	$.fn.TransFirewallArea = function()
	{
		$.fn.TransLang("Mnetwork_firewall", $.fn.GetLangStr(LT._Basic_setting), "s");
		$.fn.TransLang("Mnetwork_firewall_mode", $.fn.GetLangStr(LT._Mode), "s");
		$.fn.TransLang("Mnetwork_firewall_filter", $.fn.GetLangStr(LT._Filter), "s");
		$.fn.TransLang("Mnetwork_firewall_filter_enable", $.fn.GetLangStr(LT._Enable), "s");
		$.fn.TransLang("Mnetwork_firewall_filter_address", $.fn.GetLangStr(LT._IP_address), "s");
	};

	$.fn.TransSSLArea = function()
	{
		$.fn.TransLang("Mnetwork_ssl_generate_certificate", $.fn.GetLangStr(LT._Generate_certificate), "s");
		$.fn.TransLang("Mnetwork_ssl_method", $.fn.GetLangStr(LT._Method), "s");
		$.fn.TransLang("Mnetwork_ssl_certificate_area", $.fn.GetLangStr(LT._Certificate_area), "s");
		$.fn.TransLang("Mnetwork_ssl_country", $.fn.GetLangStr(LT._Country_code), "s");
		$.fn.TransLang("Mnetwork_ssl_organization", $.fn.GetLangStr(LT._Organization_name), "s");
		$.fn.TransLang("Mnetwork_ssl_province", $.fn.GetLangStr(LT._Province_name), "s");
		$.fn.TransLang("Mnetwork_ssl_department", $.fn.GetLangStr(LT._Organization_unit_name), "s");
		$.fn.TransLang("Mnetwork_ssl_city", $.fn.GetLangStr(LT._City_name), "s");
		$.fn.TransLang("Mnetwork_ssl_email", $.fn.GetLangStr(LT._Email_address), "s");
		$.fn.TransLang("Mnetwork_ssl_common_name", $.fn.GetLangStr(LT._Common_name), "s");
		$.fn.TransLang("Mnetwork_ssl_certificate_info", $.fn.GetLangStr(LT._Certificate_information), "s");
		$.fn.TransLang("Mnetwork_ssl_info_common_name", $.fn.GetLangStr(LT._Common_name), "s");
		$.fn.TransLang("Mnetwork_ssl_info_organization", $.fn.GetLangStr(LT._Organization), "s");
		$.fn.TransLang("Mnetwork_ssl_info_country", $.fn.GetLangStr(LT._Country), "s");
		$.fn.TransLang("Mnetwork_ssl_info_location", $.fn.GetLangStr(LT._Locality), "s");
		$.fn.TransLang("Mnetwork_ssl_info_issuer", $.fn.GetLangStr(LT._Issuer), "s");
		$.fn.TransLang("Mnetwork_ssl_info_start_date", $.fn.GetLangStr(LT._Valid_from), "s");
		$.fn.TransLang("Mnetwork_ssl_info_end_date", $.fn.GetLangStr(LT._To), "s");
		$.fn.TransLang("Mnetwork_ssl_upload_certificate_file", $.fn.GetLangStr(LT._Upload_certificate), "s");
		$.fn.TransLang("Mnetwork_ssl_upload_ca_file", $.fn.GetLangStr(LT._CA_certificate), "s");
		$.fn.TransLang("Mssl_country_note", $.fn.GetLangStr(LT._Country_code_note), "s");
		$.fn.TransLang("Mssl_organization_note", $.fn.GetLangStr(LT._Organization_note), "s");
		$.fn.TransLang("Mssl_province_note", $.fn.GetLangStr(LT._Province_note), "s");
		$.fn.TransLang("Mssl_department_note", $.fn.GetLangStr(LT._Department_note), "s");
		$.fn.TransLang("Mssl_common_name_note", $.fn.GetLangStr(LT._Common_name_note), "s");
		$.fn.TransLang("Igenerate_certificate", $.fn.GetLangStr(LT._Generate_certificate), "b");
		$.fn.TransLang("Idelete_certificate", $.fn.GetLangStr(LT._Delete_certificate), "b");
		$.fn.TransLang("Iupload_certificate", $.fn.GetLangStr(LT._Upload), "b");
		$.fn.TransLang("Inetwork_ssl_upload_certificate_file_browser", $.fn.GetLangStr(LT._Browser), "b");
		$.fn.TransLang("Inetwork_ssl_upload_ca_file_browser", $.fn.GetLangStr(LT._Browser), "b");
	};

	$.fn.TransGB28181Area = function()
	{
		$.fn.TransLang("Mnetwork_gb28181_basic", $.fn.GetLangStr(LT._Basic_setting), "s");
		$.fn.TransLang("Mnetwork_gb28181_enable", $.fn.GetLangStr(LT._Enable), "s");
		$.fn.TransLang("Mnetwork_gb28181_server_ip", $.fn.GetLangStr(LT._Server_address), "s");
		$.fn.TransLang("Mnetwork_gb28181_server_port", $.fn.GetLangStr(LT._Port), "s");
		$.fn.TransLang("Mnetwork_gb28181_device_id", $.fn.GetLangStr(LT._Device_id), "s");
		$.fn.TransLang("Mnetwork_gb28181_password", $.fn.GetLangStr(LT._Password), "s");
		$.fn.TransLang("Mnetwork_gb28181_alarm_id", $.fn.GetLangStr(LT._Alarm_id), "s");
		$.fn.TransLang("Mnetwork_gb28181_heartbeat_interval", $.fn.GetLangStr(LT._heartbeat_interval), "s");
		$.fn.TransLang("Mnetwork_gb28181_register_interval", $.fn.GetLangStr(LT._Register_interval), "s");
	};

	$.fn.TransYoutubeArea = function()
	{
		$.fn.TransLang("Mnetwork_youtube_basic", $.fn.GetLangStr(LT._Basic_setting), "s");
		$.fn.TransLang("Mnetwork_youtube_enable", $.fn.GetLangStr(LT._Enable), "s");
		$.fn.TransLang("Mnetwork_youtube_input_source", $.fn.GetLangStr(LT._Input_source), "s");
		$.fn.TransLang("Mnetwork_youtube_rtmp_url", $.fn.GetLangStr(LT._Rtmp_url), "s");
		$.fn.TransLang("Mnetwork_youtube_status", $.fn.GetLangStr(LT._Status), "s");
	};

	$.fn.TransHLSArea = function()
	{
		$.fn.TransLang("Mnetwork_hls_basic", $.fn.GetLangStr(LT._Basic_setting), "s");
		$.fn.TransLang("Mnetwork_hls_enable", $.fn.GetLangStr(LT._Enable), "s");
		$.fn.TransLang("Mnetwork_hls_input_source", $.fn.GetLangStr(LT._Input_source), "s");
		$.fn.TransLang("Mnetwork_hls_hls_url", $.fn.GetLangStr(LT._Hls_url), "s");
	};

	$.fn.TransLDAPArea = function()
	{
		$.fn.TransLang("Mnetwork_ldap_server_settings", $.fn.GetLangStr(LT._Basic_setting), "s");
		$.fn.TransLang("Mnetwork_ldap_server", $.fn.GetLangStr(LT._Server), "s");
		$.fn.TransLang("Mnetwork_ldap_port", $.fn.GetLangStr(LT._Port), "s");
		$.fn.TransLang("Mnetwork_ldap_base_dn", $.fn.GetLangStr(LT._Base_dn), "s");
		$.fn.TransLang("Mnetwork_ldap_bind_dn_template", $.fn.GetLangStr(LT._Bind_dn_template), "s");
		$.fn.TransLang("Mnetwork_ldap_search_template", $.fn.GetLangStr(LT._Search_template), "s");
		$.fn.TransLang("Mnetwork_ldap_group_mappings", $.fn.GetLangStr(LT._Group_mappings), "s");
		$.fn.TransLang("Mnetwork_ldap_admin", $.fn.GetLangStr(LT._Admins), "s");
		$.fn.TransLang("Mnetwork_ldap_operator", $.fn.GetLangStr(LT._Operators), "s");
		$.fn.TransLang("Mnetwork_ldap_user", $.fn.GetLangStr(LT._Users), "s");
		$.fn.TransLang("Mnetwork_ldap_authentication", $.fn.GetLangStr(LT._Authentication), "s");
		$.fn.TransLang("Mnetwork_ldap_login_id", $.fn.GetLangStr(LT._User_name), "s");
		$.fn.TransLang("Mnetwork_ldap_login_passwd", $.fn.GetLangStr(LT._Password), "s");
		$.fn.TransLang("Mnetwork_ldap_search_note", $.fn.GetLangStr(LT._Ldap_auth_failed), "s");
	};

	$.fn.TransDateTimeArea = function()
	{
		$.fn.TransLang("Msystem_datetime_basic", $.fn.GetLangStr(LT._Basic_setting), "s");
		$.fn.TransLang("Msystem_current_time", $.fn.GetLangStr(LT._Current_server_time), "s");
		$.fn.TransLang("Msynchronization_mode", $.fn.GetLangStr(LT._Synchronization_mode), "s");
		$.fn.TransLang("Msystem_datetime_manual", $.fn.GetLangStr(LT._Sync_with_manual), "s");
		$.fn.TransLang("Msystem_datetime_sync_with_pc", $.fn.GetLangStr(LT._Synchronize_with_pc), "s");
		$.fn.TransLang("Msystem_datetime_ntp", $.fn.GetLangStr(LT._Synchronize_with_ntp), "s");
		$.fn.TransLang("Msystem_date_by_manual", $.fn.GetLangStr(LT._Date)+":", "s");
		$.fn.TransLang("Msystem_time_by_manual", $.fn.GetLangStr(LT._Time)+":", "s");
		$.fn.TransLang("Msystem_date_by_pc", $.fn.GetLangStr(LT._Date)+":", "s");
		$.fn.TransLang("Msystem_time_by_pc", $.fn.GetLangStr(LT._Time)+":", "s");
		$.fn.TransLang("Msystem_ntp_setting", $.fn.GetLangStr(LT._NTP_setting), "s");
		$.fn.TransLang("Msystem_datetime_ntp_mode", $.fn.GetLangStr(LT._Enable), "s");
		$.fn.TransLang("Msystem_datetime_ntp_manual_server_address", $.fn.GetLangStr(LT._Server_address), "s");
		$.fn.TransLang("Msystem_datetime_ntp_from_dhcp_server_address", $.fn.GetLangStr(LT._NTP_from_dhcp), "s");
		$.fn.TransLang("Msystem_datetime_ntp_sync_period", $.fn.GetLangStr(LT._NTP_period), "s");
		$.fn.TransLang("Msystem_timezone_area", $.fn.GetLangStr(LT._Time_zone_setting), "s");
		$.fn.TransLang("Msystem_datetime_area", $.fn.GetLangStr(LT._Time_zone_area), "s");
		$.fn.TransLang("Isystem_datetime_ntp_ntp_test", $.fn.GetLangStr(LT._NTP_test), "b");
	};

	$.fn.TransAudioArea = function()
	{
		$.fn.TransLang("Msystem_audio_in_setting", $.fn.GetLangStr(LT._Audio_in_setting), "s");
		$.fn.TransLang("Msystem_audio_in_source", $.fn.GetLangStr(LT._Source), "s");
		$.fn.TransLang("Msystem_audio_in_enable", $.fn.GetLangStr(LT._Enable), "s");
		$.fn.TransLang("Msystem_audio_in_codec", $.fn.GetLangStr(LT._Encoding), "s");
		$.fn.TransLang("Msystem_audio_in_level", $.fn.GetLangStr(LT._Level), "s");
		$.fn.TransLang("Msystem_audio_out_setting", $.fn.GetLangStr(LT._Audio_out_setting), "s");
		$.fn.TransLang("Msystem_audio_out_enable", $.fn.GetLangStr(LT._Enable), "s");
		$.fn.TransLang("Msystem_audio_out_level", $.fn.GetLangStr(LT._Level), "s");
	};

	$.fn.TransInitialArea = function()
	{
		$.fn.TransLang("Msystem_camera_type", $.fn.GetLangStr(LT._Camera_Type), "s");
		$.fn.TransLang("Msystem_import", $.fn.GetLangStr(LT._Import_setting), "s");
		$.fn.TransLang("Msystem_export", $.fn.GetLangStr(LT._Export_setting), "s");
		$.fn.TransLang("Msystem_config_setting", $.fn.GetLangStr(LT._Configuration_setting), "s");
		$.fn.TransLang("Isystem_import", $.fn.GetLangStr(LT._Import_file), "b");
		$.fn.TransLang("Isystem_export", $.fn.GetLangStr(LT._Export_file), "b");
		$.fn.TransLang("Isystem_reboot", $.fn.GetLangStr(LT._Reboot), "b");
		$.fn.TransLang("Isystem_sw_reboot", $.fn.GetLangStr(LT._Software_factory_default), "b");
		$.fn.TransLang("Isystem_hw_reboot", $.fn.GetLangStr(LT._Hardware_factory_default), "b");
		$.fn.TransLang("Isystem_import_file_browser", $.fn.GetLangStr(LT._Browser), "b");
	};

	$.fn.TransFirmwareArea = function()
	{
		$.fn.TransLang("Msystem_infor", $.fn.GetLangStr(LT._System_information), "s");
		$.fn.TransLang("Msystem_infor_fw_version", $.fn.GetLangStr(LT._Firmware_version), "s");
		$.fn.TransLang("Msystem_infor_hw_version", $.fn.GetLangStr(LT._Hardware_version), "s");
		$.fn.TransLang("Msystem_infor_product_name", $.fn.GetLangStr(LT._Product_name), "s");
		$.fn.TransLang("Msystem_infor_sn", $.fn.GetLangStr(LT._Serial_number), "s");
		$.fn.TransLang("Msystem_infor_wire_mac_address", $.fn.GetLangStr(LT._MAC_address), "s");
		$.fn.TransLang("Msystem_firmware_upload", $.fn.GetLangStr(LT._Firmware_upload), "s");
		$.fn.TransLang("Msystem_log", $.fn.GetLangStr(LT._System_log), "s");
		$.fn.TransLang("Isystem_infor_firmware", $.fn.GetLangStr(LT._Upgrade), "b");
		$.fn.TransLang("Isystem_infor_firmware_browser", $.fn.GetLangStr(LT._Browser), "b");
		$.fn.TransLang("Isystem_log", $.fn.GetLangStr(LT._Download_log), "b");
	};

	$.fn.TransOSDArea = function()
	{
		$.fn.TransLang("Msystem_osd_basic", $.fn.GetLangStr(LT._Basic_setting), "s");
		for(var i = 1; i <= 2 ; i++){
			$.fn.TransLang("Mosd"+i, $.fn.GetLangStr(LT._Osd)+" "+i, "s");
			$.fn.TransLang("Msystem_osd_"+i+"_mode", $.fn.GetLangStr(LT._Enable), "s");
			$.fn.TransLang("Msystem_osd_"+i+"_background", $.fn.GetLangStr(LT._Background_color), "s");
			$.fn.TransLang("Msystem_osd_"+i+"_text_color", $.fn.GetLangStr(LT._Text_color), "s");
			$.fn.TransLang("Msystem_osd_"+i+"_text", $.fn.GetLangStr(LT._Text_input), "s");
			$.fn.TransLang("Msystem_osd_"+i+"_location_x", $.fn.GetLangStr(LT._Location_x), "s");
			$.fn.TransLang("Msystem_osd_"+i+"_location_y", $.fn.GetLangStr(LT._Location_y), "s");
		}
		$.fn.TransLang("Msystem_event_osd_basic", $.fn.GetLangStr(LT._Event), "s");
		$.fn.TransLang("Msystem_evnet_osd_background", $.fn.GetLangStr(LT._Background_color), "s");
		$.fn.TransLang("Msystem_evnet_osd_text_color", $.fn.GetLangStr(LT._Text_color), "s");
		$.fn.TransLang("Msystem_event_osd_location_x", $.fn.GetLangStr(LT._Location_x), "s");
		$.fn.TransLang("Msystem_event_osd_location_y", $.fn.GetLangStr(LT._Location_y), "s");
	};

	$.fn.TransEventSearchArea = function()
	{
		$.fn.TransLang("Mevent_search_basic", $.fn.GetLangStr(LT._Basic_setting), "s");
		$.fn.TransLang("Mevent_type", $.fn.GetLangStr(LT._Event_type), "s");
		$.fn.TransLang("Mevent_list", $.fn.GetLangStr(LT._Event_List), "s");
		$.fn.TransLang("Mevent_type_alarm", $.fn.GetLangStr(LT._Alarm), "s");
		$.fn.TransLang("Mevent_type_audio", $.fn.GetLangStr(LT._Audio), "s");
		$.fn.TransLang("Mevent_type_face", $.fn.GetLangStr(LT._Face), "s");
		$.fn.TransLang("Mevent_type_motion", $.fn.GetLangStr(LT._Motion), "s");
		$.fn.TransLang("Mevent_type_network_less", $.fn.GetLangStr(LT._Network_Less), "s");
		$.fn.TransLang("Mevent_type_schedule", $.fn.GetLangStr(LT._Schedule), "s");
		$.fn.TransLang("Mevent_type_tamper", $.fn.GetLangStr(LT._Tamper), "s");
		$.fn.TransLang("Mevent_type_defocus", $.fn.GetLangStr(LT._Defocus), "s");
		$.fn.TransLang("Mtime", $.fn.GetLangStr(LT._Time), "s");
		$.fn.TransLang("Mevent_start_time", $.fn.GetLangStr(LT._Start_time), "s");
		$.fn.TransLang("Mevent_end_time", $.fn.GetLangStr(LT._End_time), "s");
		$.fn.TransLang("Ievent_search", $.fn.GetLangStr(LT._Search), "b");
		$.fn.TransLang("Mevent_filter", $.fn.GetLangStr(LT._Filter), "s");
		$.fn.TransLang("Mevent_anaylsis", $.fn.GetLangStr(LT._Anaylsis), "s");
		$.fn.TransLang("Mevent_action", $.fn.GetLangStr(LT._Action), "s");
		$.fn.TransLang("Mall_the_time", $.fn.GetLangStr(LT._All_the_time), "s");
		$.fn.TransLang("Msearch_manual", $.fn.GetLangStr(LT._Manual), "s");
		$.fn.TransLang("Ievent_db_cleanup", $.fn.GetLangStr(LT._Clean_up), "b");
		$.fn.TransLang("Ievent_db_refresh", $.fn.GetLangStr(LT._Refresh), "b");
	};

	$.fn.TransAccountArea = function()
	{
		$.fn.TransLang("Maccount_setting", $.fn.GetLangStr(LT._Account_setting), "s");
		$.fn.TransLang("Maccount_list", $.fn.GetLangStr(LT._User_list), "s");
		$.fn.TransLang("Maccount_access_level", $.fn.GetLangStr(LT._Access_level), "s");
		$.fn.TransLang("Maccount_user_name", $.fn.GetLangStr(LT._User_name), "s");
		$.fn.TransLang("Maccount_user_passwd", $.fn.GetLangStr(LT._Password), "s");
		$.fn.TransLang("Maccount_admin", $.fn.GetLangStr(LT._Admin), "s");
		$.fn.TransLang("Maccount_operator", $.fn.GetLangStr(LT._Operator), "s");
		$.fn.TransLang("Maccount_user", $.fn.GetLangStr(LT._User), "s");
		$.fn.TransLang("Maccount_setting_2", $.fn.GetLangStr(LT._Account_setting), "s");
		$.fn.TransLang("Iadd_user", $.fn.GetLangStr(LT._Add), "b");
		$.fn.TransLang("Imodify_user", $.fn.GetLangStr(LT._Modify), "b");
		$.fn.TransLang("Idelete_user", $.fn.GetLangStr(LT._Delete), "b");
		$.fn.TransLang("Save_Isub_account", $.fn.GetLangStr(LT._Save), "b");
		$.fn.TransLang("Iaccount_cancel", $.fn.GetLangStr(LT._Cancel), "b");
	};

	$.fn.TransAlarmArea = function()
	{
		$.fn.TransLang("Mevent_source_alarm_basic_setting", $.fn.GetLangStr(LT._Basic_setting), "s");
		for(var i = 1; i <= 3; i++){
			$.fn.TransLang("Mevent_am_"+i, $.fn.GetLangStr(LT._Alarm)+" "+i, "s");
			$.fn.TransLang("Mevent_am_"+i+"_enable", $.fn.GetLangStr(LT._Enable), "s");
			$.fn.TransLang("Mevent_am_"+i+"_method", $.fn.GetLangStr(LT._Type), "s");
			$.fn.TransLang("Mam_"+i+"_adio_en", $.fn.GetLangStr(LT._Enable), "s");
			$.fn.TransLang("Mam_"+i+"_adio_sound", $.fn.GetLangStr(LT._Sound), "s");
			$.fn.TransLang("Mam_"+i+"_rd_edge_en", $.fn.GetLangStr(LT._Edge_record), "s");
			$.fn.TransLang("Mam_"+i+"_rd_nas_en", $.fn.GetLangStr(LT._NAS_record), "s");
			$.fn.TransLang("Mam_"+i+"_st_edge_en", $.fn.GetLangStr(LT._Store_to_edge), "s");
			$.fn.TransLang("Mam_"+i+"_st_ftp_en", $.fn.GetLangStr(LT._Store_to_ftp), "s");
			$.fn.TransLang("Mam_"+i+"_st_nas_en", $.fn.GetLangStr(LT._Store_to_nas), "s");
			$.fn.TransLang("Mam_osd_"+i+"_en", $.fn.GetLangStr(LT._Enable), "s");
			$.fn.TransLang("Mam_"+i+"_osd_text", $.fn.GetLangStr(LT._Text), "s");
			$.fn.TransLang("Mam_st_"+i+"_email_en", $.fn.GetLangStr(LT._Enable), "s");
			$.fn.TransLang("Mam_st_"+i+"_email_subj", $.fn.GetLangStr(LT._Subject), "s");
			$.fn.TransLang("Mam_st_"+i+"_email_mesg", $.fn.GetLangStr(LT._Message), "s");
		}
		$.fn.TransMultiLang("Malarm_group", $.fn.GetLangStr(LT._Alarm_out), "s");
		$.fn.TransMultiLang("Maudio_group", $.fn.GetLangStr(LT._Audio), "s");
		$.fn.TransMultiLang("Msnapshot_group", $.fn.GetLangStr(LT._Snapshot), "s");
		$.fn.TransMultiLang("Mrecording_group", $.fn.GetLangStr(LT._Recording), "s");
		$.fn.TransMultiLang("Memail_group", $.fn.GetLangStr(LT._Email), "s");
		$.fn.TransMultiLang("Mosd_group", $.fn.GetLangStr(LT._Osd), "s");
		$.fn.TransMultiLang("Mevent_handlers", $.fn.GetLangStr(LT._Handlers), "s");
		$.fn.TransMultiLang("Mwire_group", $.fn.GetLangStr(LT._Wire), "s");
		$.fn.TransMultiLang("Mwireless_group", $.fn.GetLangStr(LT._Wireless), "s");
		$.fn.TransLang("Mevent_source_alarm_schedule_setting", $.fn.GetLangStr(LT._Arming_schedule_setting), "s");
	};

	$.fn.TransEvAudioArea = function()
	{
		$.fn.TransLang("Mevent_source_audio_basic_setting", $.fn.GetLangStr(LT._Basic_setting), "s");
		$.fn.TransLang("Mevent_ao_enable", $.fn.GetLangStr(LT._Enable), "s");
		$.fn.TransLang("Mevent_ao_threshold", $.fn.GetLangStr(LT._Sound_intensity_threshold), "s");
		$.fn.TransLang("Mao_rd_edge_en", $.fn.GetLangStr(LT._Edge_record), "s");
		$.fn.TransLang("Mao_rd_nas_en", $.fn.GetLangStr(LT._NAS_record), "s");
		$.fn.TransLang("Mao_st_edge_en", $.fn.GetLangStr(LT._Store_to_edge), "s");
		$.fn.TransLang("Mao_st_ftp_en", $.fn.GetLangStr(LT._Store_to_ftp), "s");
		$.fn.TransLang("Mao_st_nas_en", $.fn.GetLangStr(LT._Store_to_nas), "s");
		$.fn.TransLang("Mao_osd_en", $.fn.GetLangStr(LT._Enable), "s");
		$.fn.TransLang("Mao_osd_text", $.fn.GetLangStr(LT._Text), "s");
		$.fn.TransLang("Mao_st_email_en", $.fn.GetLangStr(LT._Enable), "s");
		$.fn.TransLang("Mao_st_email_subj", $.fn.GetLangStr(LT._Subject), "s");
		$.fn.TransLang("Mao_st_email_mesg", $.fn.GetLangStr(LT._Message), "s");
		$.fn.TransLang("Mevent_source_audio_schedule_setting", $.fn.GetLangStr(LT._Arming_schedule_setting), "s");
	};

	$.fn.TransDefocusArea = function()
	{
		$.fn.TransLang("Mevent_source_defocus_basic_setting", $.fn.GetLangStr(LT._Basic_setting), "s");
		$.fn.TransLang("Mevent_ds_enable", $.fn.GetLangStr(LT._Enable), "s");
		$.fn.TransLang("Mds_adio_en", $.fn.GetLangStr(LT._Audio_out), "s");
		$.fn.TransLang("Mds_adio_sound", $.fn.GetLangStr(LT._Audio_sound), "s");
		$.fn.TransLang("Mds_rd_edge_en", $.fn.GetLangStr(LT._Edge_record), "s");
		$.fn.TransLang("Mds_rd_nas_en", $.fn.GetLangStr(LT._NAS_record), "s");
		$.fn.TransLang("Mds_st_edge_en", $.fn.GetLangStr(LT._Store_to_edge), "s");
		$.fn.TransLang("Mds_st_ftp_en", $.fn.GetLangStr(LT._Store_to_ftp), "s");
		$.fn.TransLang("Mds_st_nas_en", $.fn.GetLangStr(LT._Store_to_nas), "s");
		$.fn.TransLang("Mds_osd_en", $.fn.GetLangStr(LT._Enable), "s");
		$.fn.TransLang("Mds_osd_text", $.fn.GetLangStr(LT._Text), "s");
		$.fn.TransLang("Mds_st_email_en", $.fn.GetLangStr(LT._Enable), "s");
		$.fn.TransLang("Mds_st_email_subj", $.fn.GetLangStr(LT._Subject), "s");
		$.fn.TransLang("Mds_st_email_mesg", $.fn.GetLangStr(LT._Message), "s");
		$.fn.TransLang("Mevent_source_defocus_schedule_setting", $.fn.GetLangStr(LT._Arming_schedule_setting), "s");
	};

	$.fn.TransFaceArea = function()
	{
		$.fn.TransLang("Mevent_source_face_basic_setting", $.fn.GetLangStr(LT._Basic_setting), "s");
		$.fn.TransLang("Mevent_fe_enable", $.fn.GetLangStr(LT._Enable), "s");
		$.fn.TransLang("Mfe_adio_en", $.fn.GetLangStr(LT._Audio_out), "s");
		$.fn.TransLang("Mfe_adio_sound", $.fn.GetLangStr(LT._Audio_sound), "s");
		$.fn.TransLang("Mfe_rd_edge_en", $.fn.GetLangStr(LT._Edge_record), "s");
		$.fn.TransLang("Mfe_rd_nas_en", $.fn.GetLangStr(LT._NAS_record), "s");
		$.fn.TransLang("Mfe_st_edge_en", $.fn.GetLangStr(LT._Store_to_edge), "s");
		$.fn.TransLang("Mfe_st_ftp_en", $.fn.GetLangStr(LT._Store_to_ftp), "s");
		$.fn.TransLang("Mfe_st_nas_en", $.fn.GetLangStr(LT._Store_to_nas), "s");
		$.fn.TransLang("Mfe_osd_en", $.fn.GetLangStr(LT._Enable), "s");
		$.fn.TransLang("Mfe_osd_text", $.fn.GetLangStr(LT._Text), "s");
		$.fn.TransLang("Mfe_st_email_en", $.fn.GetLangStr(LT._Enable), "s");
		$.fn.TransLang("Mfe_st_email_subj", $.fn.GetLangStr(LT._Subject), "s");
		$.fn.TransLang("Mfe_st_email_mesg", $.fn.GetLangStr(LT._Message), "s");
		$.fn.TransLang("Mevent_source_face_schedule_setting", $.fn.GetLangStr(LT._Arming_schedule_setting), "s");
	};

	$.fn.TransMotionArea = function()
	{
		$.fn.TransLang("Mevent_source_motion_detection_object_size", $.fn.GetLangStr(LT._Object_size), "s");
		$.fn.TransLang("Mevent_source_motion_detection_sensitivity", $.fn.GetLangStr(LT._Sensitivity), "s");
		$.fn.TransLang("Mevent_source_motion_add_zone_area", $.fn.GetLangStr(LT._Motion_zone_area_setting), "s");

		for(var i = 1; i <= 4; i++){
			$.fn.TransLang("Mevent_motion_zone_"+i, $.fn.GetLangStr(LT._Zone)+i, "s");
			$.fn.TransLang("Mevent_mt_zone_"+i+"_enable", $.fn.GetLangStr(LT._Enable), "s");
			$.fn.TransLang("Mmt_"+i+"_adio_en", $.fn.GetLangStr(LT._Audio_out), "s");
			$.fn.TransLang("Mmt_"+i+"_adio_sound", $.fn.GetLangStr(LT._Audio_sound), "s");
			$.fn.TransLang("Mmt_"+i+"_rd_edge_en", $.fn.GetLangStr(LT._Edge_record), "s");
			$.fn.TransLang("Mmt_"+i+"_rd_nas_en", $.fn.GetLangStr(LT._NAS_record), "s");
			$.fn.TransLang("Mmt_"+i+"_st_edge_en", $.fn.GetLangStr(LT._Store_to_edge), "s");
			$.fn.TransLang("Mmt_"+i+"_st_ftp_en", $.fn.GetLangStr(LT._Store_to_ftp), "s");
			$.fn.TransLang("Mmt_"+i+"_st_nas_en", $.fn.GetLangStr(LT._Store_to_nas), "s");
			$.fn.TransLang("Mevent_osd_"+i+"_en", $.fn.GetLangStr(LT._Enable), "s");
			$.fn.TransLang("Mevent_osd_"+i+"_text", $.fn.GetLangStr(LT._Text), "s");
			$.fn.TransLang("Mevent_st_"+i+"_email_en", $.fn.GetLangStr(LT._Enable), "s");
			$.fn.TransLang("Mevent_st_"+i+"_email_subj", $.fn.GetLangStr(LT._Subject), "s");
			$.fn.TransLang("Mevent_st_"+i+"_email_mesg", $.fn.GetLangStr(LT._Message), "s");
		}

		$.fn.TransLang("Mevent_source_motion_schedule_setting", $.fn.GetLangStr(LT._Arming_schedule_setting), "s");
		$.fn.TransMultiLang("Mmonday", $.fn.GetLangStr(LT._Monday), "s");
		$.fn.TransMultiLang("Mtuesday", $.fn.GetLangStr(LT._Tuesday), "s");
		$.fn.TransMultiLang("Mwednesday", $.fn.GetLangStr(LT._Wednesday), "s");
		$.fn.TransMultiLang("Mthursday", $.fn.GetLangStr(LT._Thursday), "s");
		$.fn.TransMultiLang("Mfriday", $.fn.GetLangStr(LT._Friday), "s");
		$.fn.TransMultiLang("Msaturday", $.fn.GetLangStr(LT._Saturday), "s");
		$.fn.TransMultiLang("Msunday", $.fn.GetLangStr(LT._Sunday), "s");
		$.fn.TransMultiLang("Medit_schedule", $.fn.GetLangStr(LT._Edit), "s");
	};

	$.fn.TransNetworkLessArea = function()
	{
		$.fn.TransLang("Mevent_source_network_basic_setting", $.fn.GetLangStr(LT._Basic_setting), "s");
		$.fn.TransLang("Mevent_nts_enable", $.fn.GetLangStr(LT._Enable), "s");
		$.fn.TransLang("Mevent_network_1", $.fn.GetLangStr(LT._Wire_Network_lost), "s");
		$.fn.TransLang("Mevent_network_2", $.fn.GetLangStr(LT._Wire_Network_conflict), "s");
		// $.fn.TransLang("Mevent_network_3", $.fn.GetLangStr(LT._Wireless_Network_lost), "s");
		// $.fn.TransLang("Mevent_network_4", $.fn.GetLangStr(LT._Wireless_Network_conflict), "s");
		// for(var i = 1; i <= 4; i++){
		for(var i = 1; i <= 2; i++){
			$.fn.TransLang("Mevent_nts_"+i+"_enable", $.fn.GetLangStr(LT._Enable), "s");
			$.fn.TransLang("Mnts_"+i+"_adio_en", $.fn.GetLangStr(LT._Audio_out), "s");
			$.fn.TransLang("Mnts_"+i+"_adio_sound", $.fn.GetLangStr(LT._Audio_sound), "s");
			$.fn.TransLang("Mnts_"+i+"_rd_edge_en", $.fn.GetLangStr(LT._Edge_record), "s");
			$.fn.TransLang("Mnts_"+i+"_rd_cond", $.fn.GetLangStr(LT._Condition), "s");
			$.fn.TransLang("Mnts_"+i+"_osd_en", $.fn.GetLangStr(LT._Enable), "s");
			$.fn.TransLang("Mnts_"+i+"_osd_text", $.fn.GetLangStr(LT._Text), "s");
		}
	};

	$.fn.TransScheduleArea = function()
	{
		$.fn.TransLang("Mevent_source_schedule_basic_setting", $.fn.GetLangStr(LT._Basic_setting), "s");
		$.fn.TransLang("Mevent_se_enable", $.fn.GetLangStr(LT._Enable), "s");
		$.fn.TransLang("Mse_trigger_interval", $.fn.GetLangStr(LT._Trigger_interval), "s");
		$.fn.TransLang("Mse_adio_en", $.fn.GetLangStr(LT._Audio_out), "s");
		$.fn.TransLang("Mse_adio_sound", $.fn.GetLangStr(LT._Audio_sound), "s");
		$.fn.TransLang("Mse_rd_edge_en", $.fn.GetLangStr(LT._Edge_record), "s");
		$.fn.TransLang("Mse_rd_nas_en", $.fn.GetLangStr(LT._NAS_record), "s");
		$.fn.TransLang("Mse_st_edge_en", $.fn.GetLangStr(LT._Store_to_edge), "s");
		$.fn.TransLang("Mse_st_ftp_en", $.fn.GetLangStr(LT._Store_to_ftp), "s");
		$.fn.TransLang("Mse_st_nas_en", $.fn.GetLangStr(LT._Store_to_nas), "s");
		$.fn.TransLang("Mse_st_email_en", $.fn.GetLangStr(LT._Enable), "s");
		$.fn.TransLang("Mse_st_email_subj", $.fn.GetLangStr(LT._Subject), "s");
		$.fn.TransLang("Mse_st_email_mesg", $.fn.GetLangStr(LT._Message), "s");
		$.fn.TransLang("Mevent_source_se_schedule_setting", $.fn.GetLangStr(LT._Arming_schedule_setting), "s");
	};

	$.fn.TransTamperArea = function()
	{
		$.fn.TransLang("Mevent_source_tamper_basic_setting", $.fn.GetLangStr(LT._Basic_setting), "s");
		$.fn.TransLang("Mevent_source_tamper_detection_sensitivity", $.fn.GetLangStr(LT._Sensitivity), "s");
		$.fn.TransLang("Mevent_tr_enable", $.fn.GetLangStr(LT._Enable), "s");
		$.fn.TransLang("Mtr_adio_en", $.fn.GetLangStr(LT._Audio_out), "s");
		$.fn.TransLang("Mtr_adio_sound", $.fn.GetLangStr(LT._Audio_sound), "s");
		$.fn.TransLang("Mtr_rd_edge_en", $.fn.GetLangStr(LT._Edge_record), "s");
		$.fn.TransLang("Mtr_rd_nas_en", $.fn.GetLangStr(LT._NAS_record), "s");
		$.fn.TransLang("Mtr_st_edge_en", $.fn.GetLangStr(LT._Store_to_edge), "s");
		$.fn.TransLang("Mtr_st_ftp_en", $.fn.GetLangStr(LT._Store_to_ftp), "s");
		$.fn.TransLang("Mtr_st_nas_en", $.fn.GetLangStr(LT._Store_to_nas), "s");
		$.fn.TransLang("Mtr_osd_en", $.fn.GetLangStr(LT._Enable), "s");
		$.fn.TransLang("Mtr_osd_text", $.fn.GetLangStr(LT._Text), "s");
		$.fn.TransLang("Mtr_st_email_en", $.fn.GetLangStr(LT._Enable), "s");
		$.fn.TransLang("Mtr_st_email_subj", $.fn.GetLangStr(LT._Subject), "s");
		$.fn.TransLang("Mtr_st_email_mesg", $.fn.GetLangStr(LT._Message), "s");
		$.fn.TransLang("Mevent_source_tamper_schedule_setting", $.fn.GetLangStr(LT._Arming_schedule_setting), "s");
	};

	$.fn.TransAlarmOutArea = function()
	{
		for(var i = 1; i <= 2 ; i++)
		{
			$.fn.TransLang("Mevent_handler_alarm_out_"+i, $.fn.GetLangStr(LT._Alarm_out)+" "+i, "s");
			$.fn.TransLang("Mevent_sink_alarm_out_"+i+"_enable", $.fn.GetLangStr(LT._Enable), "s");
			$.fn.TransLang("Mevent_sink_alarm_out_"+i+"_method", $.fn.GetLangStr(LT._Method), "s");
			$.fn.TransLang("Mevent_sink_alarm_out_"+i+"_normal_post_duration", $.fn.GetLangStr(LT._Post_duration), "s");
			$.fn.TransLang("Mevent_sink_alarm_out_"+i+"_idle_state", $.fn.GetLangStr(LT._Type), "s");
			$.fn.TransLang("Mevent_sink_alarm_out_"+i+"_pulse_ontime", $.fn.GetLangStr(LT._On_time), "s");
			$.fn.TransLang("Mevent_sink_alarm_out_"+i+"_pulse_offtime", $.fn.GetLangStr(LT._Off_time), "s");
			$.fn.TransLang("Mevent_sink_alarm_out_"+i+"_pulse_count", $.fn.GetLangStr(LT._Count), "s");
		}
	};

	$.fn.TransEmailArea = function()
	{
		$.fn.TransLang("Mevent_handler_email_server", $.fn.GetLangStr(LT._Basic_setting), "s");
		$.fn.TransLang("Mevent_sink_email_authentication", $.fn.GetLangStr(LT._Authentication), "s");
		$.fn.TransLang("Mevent_sink_email_server_address", $.fn.GetLangStr(LT._Server_address), "s");
		$.fn.TransLang("Mevent_sink_email_server_port", $.fn.GetLangStr(LT._Port), "s");
		$.fn.TransLang("Mevent_sink_email_username", $.fn.GetLangStr(LT._User_name), "s");
		$.fn.TransLang("Mevent_sink_email_password", $.fn.GetLangStr(LT._Password), "s");
		$.fn.TransLang("Mevent_handler_email_sender_settings", $.fn.GetLangStr(LT._Sender_settings), "s");
		$.fn.TransLang("Mevent_sink_email_sender_email_address", $.fn.GetLangStr(LT._Sender_email_address), "s");
		$.fn.TransLang("Mevent_sink_email_attach_image", $.fn.GetLangStr(LT._Attach_image), "s");
		$.fn.TransLang("Mevent_handler_email_address_list", $.fn.GetLangStr(LT._Email_address_list), "s");
		$.fn.TransLang("Mevent_email_list_no", $.fn.GetLangStr(LT._Num_no), "s");
		$.fn.TransLang("Mevent_email_list_enable", $.fn.GetLangStr(LT._Enable), "s");
		$.fn.TransLang("Mevent_email_list_address", $.fn.GetLangStr(LT._Email_address), "s");
	};

	$.fn.TransEvFtpArea = function()
	{
		$.fn.TransLang("Mevent_handler_ftp_server", $.fn.GetLangStr(LT._Basic_setting), "s");
		$.fn.TransLang("Mevent_sink_ftp_server_address", $.fn.GetLangStr(LT._Server_address), "s");
		$.fn.TransLang("Mevent_sink_ftp_port", $.fn.GetLangStr(LT._Port), "s");
		$.fn.TransLang("Mevent_sink_ftp_username", $.fn.GetLangStr(LT._User_name), "s");
		$.fn.TransLang("Mevent_sink_ftp_password", $.fn.GetLangStr(LT._Password), "s");
		$.fn.TransLang("Mevent_sink_ftp_mode", $.fn.GetLangStr(LT._Mode), "s");
	};

	$.fn.TransNASArea = function()
	{
		$.fn.TransLang("Mevent_sink_nas_basic_setting", $.fn.GetLangStr(LT._Basic_setting), "s");
		$.fn.TransMultiLang("Mnumber", $.fn.GetLangStr(LT._Num_no), "s");
		$.fn.TransLang("Mnas_action", $.fn.GetLangStr(LT._Action), "s");
		$.fn.TransLang("Mnas_server_addr", $.fn.GetLangStr(LT._Server_address), "s");
		$.fn.TransLang("Mnas_mount_method", $.fn.GetLangStr(LT._Mount_method), "s");
		$.fn.TransLang("Mnas_cifs_username", $.fn.GetLangStr(LT._User_name), "s");
		$.fn.TransLang("Mnas_cifs_password", $.fn.GetLangStr(LT._Password), "s");
		$.fn.TransLang("Mnas_store_path", $.fn.GetLangStr(LT._Store_path), "s");
		$.fn.TransLang("Mevent_sink_nas_mount_status", $.fn.GetLangStr(LT._NAS_mount_status), "s");
		$.fn.TransLang("Mnas_capacity", $.fn.GetLangStr(LT._Capacity), "s");
		$.fn.TransLang("Mnas_free_space", $.fn.GetLangStr(LT._Free_space), "s");
		$.fn.TransLang("Mnas_status", $.fn.GetLangStr(LT._Online_offline), "s");
	};

	$.fn.TransRecordingArea = function()
	{
		$.fn.TransLang("Mevent_handler_recording", $.fn.GetLangStr(LT._Basic_setting), "s");
		$.fn.TransLang("Mevent_sink_recording_clip_duration", $.fn.GetLangStr(LT._Clip_duration), "s");
		$.fn.TransLang("Mevent_sink_recording_record_type", $.fn.GetLangStr(LT._Record_type), "s");
		$.fn.TransLang("Mevent_sink_recording_record_status", $.fn.GetLangStr(LT._Record_status), "s");
		$.fn.TransLang("Mevent_sink_recording_clip_size", $.fn.GetLangStr(LT._Clip_size), "s");
		$.fn.TransLang("Mevent_handler_sd_stream", $.fn.GetLangStr(LT._SD_stream_setting), "s");
		$.fn.TransLang("Mevent_sink_recording_stream", $.fn.GetLangStr(LT._Recording_stream), "s");
		$.fn.TransOptions("Ievent_sink_recording_stream");
		//$.fn.TransLang("Mevent_sink_recording_record_prefix_format", $.fn.GetLangStr("Record Prefix Format"), "s");
	};

	$.fn.TransSDCardArea = function()
	{
		for (var i = 1; i <= 1; i++)
		{
			$.fn.TransLang("Mevent_handler_sd_card_"+i, $.fn.GetLangStr(LT._Basic_setting), "s");
			$.fn.TransLang("Mevent_sink_sdcard_"+i+"_overwrite", $.fn.GetLangStr(LT._Overwrite), "s");
			$.fn.TransLang("Mevent_sink_sdcard_"+i+"_mount_status", $.fn.GetLangStr(LT._Mount_status), "s");
			$.fn.TransLang("Mevent_sink_sdcard_"+i+"_capacity", $.fn.GetLangStr(LT._Capacity), "s");
			$.fn.TransLang("Mevent_sink_sdcard_"+i+"_free_space", $.fn.GetLangStr(LT._Free_space), "s");
			$.fn.TransLang("Mevent_sink_sdcard_"+i+"_format", $.fn.GetLangStr(LT._SD_Format), "s");
			$.fn.TransLang("Ievent_sink_sdcard_"+i+"_format", $.fn.GetLangStr(LT._Format), "b");
		}
		$.fn.TransLang("Iquery_sd_card", $.fn.GetLangStr(LT._Query_sd_card_live_time), "b");
	};

	$.fn.TransSnapshotArea = function()
	{
		$.fn.TransLang("Mevent_handler_snapshot", $.fn.GetLangStr(LT._Basic_setting), "s");
		$.fn.TransLang("Mevent_sink_snapshot_pre_event_capture_count", $.fn.GetLangStr(LT._Pre_event_capture_count), "s");
		$.fn.TransLang("Mevent_sink_snapshot_event_capture_interval", $.fn.GetLangStr(LT._Event_capture_interval), "s");
		$.fn.TransLang("Mevent_sink_snapshot_post_event_capture_count", $.fn.GetLangStr(LT._Post_event_capture_count), "s");
	};

	$.fn.TransSoundArea = function()
	{
		$.fn.TransLang("Mevent_handler_sound", $.fn.GetLangStr(LT._Basic_setting), "s");
		$.fn.TransLang("Mstatus", $.fn.GetLangStr(LT._File_status), "s");
		$.fn.TransLang("Mdeletefile", $.fn.GetLangStr(LT._Delete_file), "s");
		$.fn.TransLang("Mselectfile", $.fn.GetLangStr(LT._Select_file), "s");
		for(var i = 1; i <= 10; i++){
			$.fn.TransLang("Ievent_sound_"+i+"_delete", $.fn.GetLangStr(LT._Delete), "b");
			$.fn.TransLang("Ievent_handler_sound_"+i+"_browser", $.fn.GetLangStr(LT._Browser), "b");
		}
	};

	$.fn.TransPlaybackArea = function()
	{
		$.fn.TransLang("Msd_playback_setting", $.fn.GetLangStr(LT._Playback_setting), "s");
		$.fn.TransLang("Msd_date_time", $.fn.GetLangStr(LT._Date_time), "s");
		$.fn.TransLang("Isd_playback_search", $.fn.GetLangStr(LT._Search), "b");
	};

	$.fn.TransPtzBasicArea = function()
	{
		$.fn.TransLang("Mptz_basic_title", $.fn.GetLangStr(LT._Basic_setting), "s");
		$.fn.TransLang("Mpower_on_action", $.fn.GetLangStr(LT._Power_on_action), "s");
		
		$.fn.TransLang("Mpan_tilt_setting", $.fn.GetLangStr(LT._Pantilt_setting), "s");
		$.fn.TransLang("Mptz_pt_tilt_angle", $.fn.GetLangStr(LT._Tilt_Angle), "s");
		$.fn.TransLang("Mptz_pt_manual_auto_flip", $.fn.GetLangStr(LT._Auto_flip), "s");
		$.fn.TransLang("Mptz_pt_manual_auto_flip_on", $.fn.GetLangStr(LT._On), "s");
		$.fn.TransLang("Mptz_pt_manual_auto_flip_off", $.fn.GetLangStr(LT._Off), "s");
		$.fn.TransLang("Mptz_pt_action_preset_speed", $.fn.GetLangStr(LT._Pt_max_speed), "s");
		
		$.fn.TransLang("Mscan_setting", $.fn.GetLangStr(LT._Scan_setting), "s");
		$.fn.TransLang("Mscan_angle", $.fn.GetLangStr(LT._Scan_angle), "s");
		$.fn.TransLang("Mscan_speed", $.fn.GetLangStr(LT._Scan_speed), "s");
		$.fn.TransLang("Mlimit_enable", $.fn.GetLangStr(LT._Limit_enable), "s");
		$.fn.TransLang("Mptz_pt_action_auto_scan_limit_enable_on", $.fn.GetLangStr(LT._On), "s");
		$.fn.TransLang("Mptz_pt_action_auto_scan_limit_enable_off", $.fn.GetLangStr(LT._Off), "s");

		$.fn.TransLang("Mzoom_setting", $.fn.GetLangStr(LT._Zoom_Setting), "s");
		$.fn.TransLang("Mzoom_limit", $.fn.GetLangStr(LT._Zoom_Limit), "s");
		$.fn.TransLang("Mzoom_control", $.fn.GetLangStr(LT._Zoom_control), "s");
		$.fn.TransLang("Iptz_zoom_move_continuous_in", $.fn.GetLangStr(LT._Zoom_in), "b");
		$.fn.TransLang("Iptz_zoom_move_continuous_out", $.fn.GetLangStr(LT._Zoom_out), "b");


		$.fn.TransLang("Mfocus_setting", $.fn.GetLangStr(LT._Focus_Setting), "s");
		$.fn.TransLang("Mfocus_mode", $.fn.GetLangStr(LT._Focus_Mode), "s");
		$.fn.TransLang("Mptz_focus_mode_auto", $.fn.GetLangStr(LT._Auto), "s");
		$.fn.TransLang("Mptz_focus_mode_manual", $.fn.GetLangStr(LT._Manual), "s");
		$.fn.TransLang("Mfocus_sensitivity", $.fn.GetLangStr(LT._Focus_Sensitivity), "s");
		$.fn.TransLang("Mptz_focus_auto_sensitivity_normal", $.fn.GetLangStr(LT._Normal), "s");
		$.fn.TransLang("Mptz_focus_auto_sensitivity_low", $.fn.GetLangStr(LT._Low), "s");
		$.fn.TransLang("Mfocus_control", $.fn.GetLangStr(LT._Focus_control), "s");
		$.fn.TransLang("Iptz_focus_manual_move_continuous_near", $.fn.GetLangStr(LT._Near), "b");
		$.fn.TransLang("Iptz_focus_manual_move_continuous_far", $.fn.GetLangStr(LT._Far), "b");
	};

	$.fn.TransPtzPositionArea = function()
	{
		$.fn.TransLang("Mprest_position", $.fn.GetLangStr(LT._Preset_Position), "s");
		$.fn.TransLang("Iptz_pt_action_preset_goto", $.fn.GetLangStr(LT._View), "b");
		$.fn.TransLang("Iptz_pt_action_preset_set", $.fn.GetLangStr(LT._Preset_Set), "b");
		$.fn.TransLang("Iptz_pt_action_preset_clear", $.fn.GetLangStr(LT._Preset_Clear), "b");
	};

	$.fn.TransPtzPatrolArea = function()
	{
		$.fn.TransLang("Mpatrol_setting", $.fn.GetLangStr(LT._Patrol_Setting), "s");
		$.fn.TransLang("Mpreset_select", $.fn.GetLangStr(LT._Preset_Select), "s");
		$.fn.TransLang("Mstop_duration", $.fn.GetLangStr(LT._Stop_Duration), "s");
		$.fn.TransLang("Mpatrol_1", $.fn.GetLangStr(LT._Patrol_1), "s");
		$.fn.TransLang("Mpatrol_2", $.fn.GetLangStr(LT._Patrol_2), "s");
		$.fn.TransLang("Mpatrol_3", $.fn.GetLangStr(LT._Patrol_3), "s");
		$.fn.TransLang("Mpatrol_4", $.fn.GetLangStr(LT._Patrol_4), "s");
		$.fn.TransLang("Iduration_ok", $.fn.GetLangStr(LT._Ok), "b");
		$.fn.TransLang("Iduration_cancel", $.fn.GetLangStr(LT._Cancel), "b");
	};

	$.fn.TransPtzPatternArea = function()
	{
		$.fn.TransLang("MPattern_setting", $.fn.GetLangStr(LT._Patterm_Setting), "s");
		$.fn.TransLang("Mpattern_1", $.fn.GetLangStr(LT._Pattern_1), "s");
		$.fn.TransLang("Ipattern_1_record", $.fn.GetLangStr(LT._Start), "b");
		$.fn.TransLang("Ipattern_1_play", $.fn.GetLangStr(LT._Pattern_Play), "b");
		$.fn.TransLang("Ipattern_1_clear", $.fn.GetLangStr(LT._Stop), "b");
		$.fn.TransLang("Mpattern_2", $.fn.GetLangStr(LT._Pattern_2), "s");
		$.fn.TransLang("Ipattern_2_record", $.fn.GetLangStr(LT._Start), "b");
		$.fn.TransLang("Ipattern_2_play", $.fn.GetLangStr(LT._Pattern_Play), "b");
		$.fn.TransLang("Ipattern_2_clear", $.fn.GetLangStr(LT._Stop), "b");
		$.fn.TransLang("Mpattern_3", $.fn.GetLangStr(LT._Pattern_3), "s");
		$.fn.TransLang("Ipattern_3_record", $.fn.GetLangStr(LT._Start), "b");
		$.fn.TransLang("Ipattern_3_play", $.fn.GetLangStr(LT._Pattern_Play), "b");
		$.fn.TransLang("Ipattern_3_clear", $.fn.GetLangStr(LT._Stop), "b");
		$.fn.TransLang("Mpattern_4", $.fn.GetLangStr(LT._Pattern_4), "s");
		$.fn.TransLang("Ipattern_4_record", $.fn.GetLangStr(LT._Start), "b");
		$.fn.TransLang("Ipattern_4_play", $.fn.GetLangStr(LT._Pattern_Play), "b");
		$.fn.TransLang("Ipattern_4_clear", $.fn.GetLangStr(LT._Stop), "b");
	};

	$.fn.TransObjectCountingArea = function()
	{
		$.fn.TransLang("Mevent_obj_counting_basic_setting", $.fn.GetLangStr(LT._Basic_setting), "s");
		$.fn.TransLang("Mevent_obj_counting_size_setting", $.fn.GetLangStr(LT._Size_setting), "s");
		$.fn.TransLang("Mevent_obj_counting_sensitivity", $.fn.GetLangStr(LT._Sensitivity), "s");
		$.fn.TransLang("Mva_basic_max", $.fn.GetLangStr(LT._Max_object_size), "s");
		$.fn.TransLang("Mva_basic_min", $.fn.GetLangStr(LT._Min_object_size), "s");
		$.fn.TransLang("Iva_basic_max_set", $.fn.GetLangStr(LT._Save), "b");
		$.fn.TransLang("Iva_basic_min_set", $.fn.GetLangStr(LT._Save), "b");
		$.fn.TransLang("Mevent_obj_counting_line_setting", $.fn.GetLangStr(LT._Line_setting), "s");
		for(var i = 1;i <= 3; i++){
			$.fn.TransLang("Mevent_line_counting_line_zone_"+i, $.fn.GetLangStr(LT._Line)+" "+i, "s");
			$.fn.TransLang("Mevent_obj_counting_line_"+i+"_enable", $.fn.GetLangStr(LT._Enable), "s");
			$.fn.TransLang("Mevent_obj_counting_line_"+i+"_direction", $.fn.GetLangStr(LT._Direction), "s");
		}
	};

	$.fn.TransLoiteringArea = function()
	{
		$.fn.TransLang("Mloitering_basic_setting", $.fn.GetLangStr(LT._Basic_setting), "s");
		$.fn.TransLang("Mloitering_schedule_setting", $.fn.GetLangStr(LT._Arming_schedule_setting), "s");
		$.fn.TransLang("Mloitering_zone_enable", $.fn.GetLangStr(LT._Enable), "s");
		$.fn.TransLang("Mloitering_trigger_time", $.fn.GetLangStr(LT._Trigger_interval), "s");
		$.fn.TransLang("Mloitering_adio_en", $.fn.GetLangStr(LT._Audio_out), "s");
		$.fn.TransLang("Mloitering_adio_sound", $.fn.GetLangStr(LT._Audio_sound), "s");
		$.fn.TransLang("Mloitering_rd_edge_en", $.fn.GetLangStr(LT._Edge_record), "s");
		$.fn.TransLang("Mloitering_rd_nas_en", $.fn.GetLangStr(LT._NAS_record), "s");
		$.fn.TransLang("Mloitering_st_edge_en", $.fn.GetLangStr(LT._Store_to_edge), "s");
		$.fn.TransLang("Mloitering_st_ftp_en", $.fn.GetLangStr(LT._Store_to_ftp), "s");
		$.fn.TransLang("Mloitering_st_nas_en", $.fn.GetLangStr(LT._Store_to_nas), "s");
		$.fn.TransLang("Mloitering_osd_en", $.fn.GetLangStr(LT._Enable), "s");
		$.fn.TransLang("Mloitering_osd_text", $.fn.GetLangStr(LT._Text), "s");
		$.fn.TransLang("Mloitering_st_email_en", $.fn.GetLangStr(LT._Enable), "s");
		$.fn.TransLang("Mloitering_st_email_subj", $.fn.GetLangStr(LT._Subject), "s");
		$.fn.TransLang("Mloitering_st_email_mesg", $.fn.GetLangStr(LT._Message), "s");
	};

	$.fn.TransIntrusionArea = function()
	{
		$.fn.TransLang("Mintrusion_basic_setting", $.fn.GetLangStr(LT._Basic_setting), "s");
		$.fn.TransLang("Mintrusion_schedule_setting", $.fn.GetLangStr(LT._Arming_schedule_setting), "s");
		$.fn.TransLang("Mintrusion_zone_enable", $.fn.GetLangStr(LT._Enable), "s");
		$.fn.TransLang("Mintrusion_trigger_time", $.fn.GetLangStr(LT._Trigger_interval), "s");
		$.fn.TransLang("Mintrusion_adio_en", $.fn.GetLangStr(LT._Audio_out), "s");
		$.fn.TransLang("Mintrusion_adio_sound", $.fn.GetLangStr(LT._Audio_sound), "s");
		$.fn.TransLang("Mintrusion_rd_edge_en", $.fn.GetLangStr(LT._Edge_record), "s");
		$.fn.TransLang("Mintrusion_rd_nas_en", $.fn.GetLangStr(LT._NAS_record), "s");
		$.fn.TransLang("Mintrusion_st_edge_en", $.fn.GetLangStr(LT._Store_to_edge), "s");
		$.fn.TransLang("Mintrusion_st_ftp_en", $.fn.GetLangStr(LT._Store_to_ftp), "s");
		$.fn.TransLang("Mintrusion_st_nas_en", $.fn.GetLangStr(LT._Store_to_nas), "s");
		$.fn.TransLang("Mintrusion_osd_en", $.fn.GetLangStr(LT._Enable), "s");
		$.fn.TransLang("Mintrusion_osd_text", $.fn.GetLangStr(LT._Text), "s");
		$.fn.TransLang("Mintrusion_st_email_en", $.fn.GetLangStr(LT._Enable), "s");
		$.fn.TransLang("Mintrusion_st_email_subj", $.fn.GetLangStr(LT._Subject), "s");
		$.fn.TransLang("Mintrusion_st_email_mesg", $.fn.GetLangStr(LT._Message), "s");
	};

	$.fn.TransAreaCountingArea = function()
	{
		$.fn.TransLang("Mvideo_area_counting_setting", $.fn.GetLangStr(LT._Basic_setting), "s");
		$.fn.TransLang("Mvideo_area_counting_enable", $.fn.GetLangStr(LT._Enable), "s");
		$.fn.TransLang("Mvideo_area_counting_count_location_x", $.fn.GetLangStr(LT._Location_x), "s");
		$.fn.TransLang("Mvideo_area_counting_count_location_y", $.fn.GetLangStr(LT._Location_y), "s");
	};

	$.fn.TransDepartureArea = function()
	{
		$.fn.TransLang("Mdeparture_basic_setting", $.fn.GetLangStr(LT._Basic_setting), "s");
		$.fn.TransLang("Mdeparture_schedule_setting", $.fn.GetLangStr(LT._Arming_schedule_setting), "s");
		$.fn.TransLang("Mdeparture_zone_enable", $.fn.GetLangStr(LT._Enable), "s");
		$.fn.TransLang("Mdeparture_trigger_time", $.fn.GetLangStr(LT._Trigger_interval), "s");
		$.fn.TransLang("Mdeparture_adio_en", $.fn.GetLangStr(LT._Audio_out), "s");
		$.fn.TransLang("Mdeparture_adio_sound", $.fn.GetLangStr(LT._Audio_sound), "s");
		$.fn.TransLang("Mdeparture_rd_edge_en", $.fn.GetLangStr(LT._Edge_record), "s");
		$.fn.TransLang("Mdeparture_rd_nas_en", $.fn.GetLangStr(LT._NAS_record), "s");
		$.fn.TransLang("Mdeparture_st_edge_en", $.fn.GetLangStr(LT._Store_to_edge), "s");
		$.fn.TransLang("Mdeparture_st_ftp_en", $.fn.GetLangStr(LT._Store_to_ftp), "s");
		$.fn.TransLang("Mdeparture_st_nas_en", $.fn.GetLangStr(LT._Store_to_nas), "s");
		$.fn.TransLang("Mdeparture_osd_en", $.fn.GetLangStr(LT._Enable), "s");
		$.fn.TransLang("Mdeparture_osd_text", $.fn.GetLangStr(LT._Text), "s");
		$.fn.TransLang("Mdeparture_st_email_en", $.fn.GetLangStr(LT._Enable), "s");
		$.fn.TransLang("Mdeparture_st_email_subj", $.fn.GetLangStr(LT._Subject), "s");
		$.fn.TransLang("Mdeparture_st_email_mesg", $.fn.GetLangStr(LT._Message), "s");
	};

	$.fn.TransLineCrossingArea = function()
	{
		$.fn.TransLang("Mborder_line_basic_setting", $.fn.GetLangStr(LT._Basic_setting), "s");
		$.fn.TransLang("Mevent_source_border_line_schedule_setting", $.fn.GetLangStr(LT._Arming_schedule_setting), "s");
		for(var i = 1; i <= 3; i++){
			$.fn.TransLang("Mborder_line_"+i, $.fn.GetLangStr(LT._Line)+i, "s");
			$.fn.TransLang("Mborder_line_"+i+"_enable", $.fn.GetLangStr(LT._Enable), "s");
			$.fn.TransLang("Mborder_line_"+i+"_direction", $.fn.GetLangStr(LT._Direction), "s");
			$.fn.TransLang("Mborder_line_"+i+"_adio_en", $.fn.GetLangStr(LT._Audio_out), "s");
			$.fn.TransLang("Mborder_line_"+i+"_adio_sound", $.fn.GetLangStr(LT._Audio_sound), "s");
			$.fn.TransLang("Mborder_line_"+i+"_rd_edge_en", $.fn.GetLangStr(LT._Edge_record), "s");
			$.fn.TransLang("Mborder_line_"+i+"_rd_nas_en", $.fn.GetLangStr(LT._NAS_record), "s");
			$.fn.TransLang("Mborder_line_"+i+"_edge_en", $.fn.GetLangStr(LT._Store_to_edge), "s");
			$.fn.TransLang("Mborder_line_"+i+"_ftp_en", $.fn.GetLangStr(LT._Store_to_ftp), "s");
			$.fn.TransLang("Mborder_line_"+i+"_nas_en", $.fn.GetLangStr(LT._Store_to_nas), "s");
			$.fn.TransLang("Mborder_line_osd_"+i+"_en", $.fn.GetLangStr(LT._Enable), "s");
			$.fn.TransLang("Mborder_line_osd_"+i+"_text", $.fn.GetLangStr(LT._Text), "s");
			$.fn.TransLang("Mborder_line_"+i+"_email_en", $.fn.GetLangStr(LT._Enable), "s");
			$.fn.TransLang("Mborder_line_"+i+"_email_subj", $.fn.GetLangStr(LT._Subject), "s");
			$.fn.TransLang("Mborder_line_"+i+"_email_mesg", $.fn.GetLangStr(LT._Message), "s");
		}
	};

	$.fn.TransSdDetectionArea = function()
	{
		$.fn.TransLang("Mevent_source_sd_detection_basic_setting", $.fn.GetLangStr(LT._Basic_setting), "s");
		$.fn.TransLang("Mevent_sd_detection_enable", $.fn.GetLangStr(LT._Enable), "s");
		$.fn.TransLang("Msd_detection_adio_en", $.fn.GetLangStr(LT._Audio_out), "s");
		$.fn.TransLang("Msd_detection_adio_sound", $.fn.GetLangStr(LT._Audio_sound), "s");
		$.fn.TransLang("Msd_detection_rd_nas_en", $.fn.GetLangStr(LT._NAS_record), "s");
		$.fn.TransLang("Msd_detection_st_ftp_en", $.fn.GetLangStr(LT._Store_to_ftp), "s");
		$.fn.TransLang("Msd_detection_st_nas_en", $.fn.GetLangStr(LT._Store_to_nas), "s");
		$.fn.TransLang("Msd_detection_osd_en", $.fn.GetLangStr(LT._Enable), "s");
		$.fn.TransLang("Msd_detection_osd_text", $.fn.GetLangStr(LT._Text), "s");
		$.fn.TransLang("Msd_detection_st_email_en", $.fn.GetLangStr(LT._Enable), "s");
		$.fn.TransLang("Msd_detection_st_email_subj", $.fn.GetLangStr(LT._Subject), "s");
		$.fn.TransLang("Msd_detection_st_email_mesg", $.fn.GetLangStr(LT._Message), "s");
	};

	$.fn.TransRS485Area = function()
	{
		$.fn.TransLang("Mrs_485_basic", $.fn.GetLangStr(LT._Basic_setting), "s");
		$.fn.TransLang("Msystem_rs485_address", $.fn.GetLangStr(LT._Device_address), "s");
		$.fn.TransLang("Msystem_rs485_baudrate", $.fn.GetLangStr(LT._Baudrate), "s");
		$.fn.TransLang("Mrs485_preset", $.fn.GetLangStr(LT._Preset)+":", "s");
		$("#rs485_ctrl_up").attr("rel","tooltip").attr("title", $.fn.GetLangStr(LT._Up));
		$("#rs485_ctrl_left_up").attr("rel","tooltip").attr("title", $.fn.GetLangStr(LT._Left_up));
		$("#rs485_ctrl_right_up").attr("rel","tooltip").attr("title", $.fn.GetLangStr(LT._Right_up));
		$("#rs485_ctrl_left").attr("rel","tooltip").attr("title", $.fn.GetLangStr(LT._Left));
		$("#rs485_ctrl_home").attr("rel","tooltip").attr("title", $.fn.GetLangStr(LT._HOME));
		$("#rs485_ctrl_right").attr("rel","tooltip").attr("title", $.fn.GetLangStr(LT._Right));
		$("#rs485_ctrl_left_down").attr("rel","tooltip").attr("title", $.fn.GetLangStr(LT._Left_down));
		$("#rs485_ctrl_right_down").attr("rel","tooltip").attr("title", $.fn.GetLangStr(LT._Right_down));
		$("#rs485_ctrl_down").attr("rel","tooltip").attr("title", $.fn.GetLangStr(LT._Down));
	};

	$.fn.TransWithdrawnArea = function()
	{
		$.fn.TransLang("Mwithdrawn_basic_setting", $.fn.GetLangStr(LT._Basic_setting), "s");
		$.fn.TransLang("Mevent_source_withdrawn_schedule_setting", $.fn.GetLangStr(LT._Arming_schedule_setting), "s");
		$.fn.TransLang("Mevent_source_withdrawn_trigger_time", $.fn.GetLangStr(LT._Trigger_interval), "s");
		for(var i = 1; i <= 3; i++){
			$.fn.TransLang("Mwithdrawn_"+i, $.fn.GetLangStr(LT._Zone)+i, "s");
			$.fn.TransLang("Mwithdrawn_"+i+"_enable", $.fn.GetLangStr(LT._Enable), "s");
			$.fn.TransLang("Mwithdrawn_"+i+"_adio_en", $.fn.GetLangStr(LT._Audio_out), "s");
			$.fn.TransLang("Mwithdrawn_"+i+"_adio_sound", $.fn.GetLangStr(LT._Audio_sound), "s");
			$.fn.TransLang("Mwithdrawn_"+i+"_rd_edge_en", $.fn.GetLangStr(LT._Edge_record), "s");
			$.fn.TransLang("Mwithdrawn_"+i+"_rd_nas_en", $.fn.GetLangStr(LT._NAS_record), "s");
			$.fn.TransLang("Mwithdrawn_"+i+"_edge_en", $.fn.GetLangStr(LT._Store_to_edge), "s");
			$.fn.TransLang("Mwithdrawn_"+i+"_ftp_en", $.fn.GetLangStr(LT._Store_to_ftp), "s");
			$.fn.TransLang("Mwithdrawn_"+i+"_nas_en", $.fn.GetLangStr(LT._Store_to_nas), "s");
			$.fn.TransLang("Mwithdrawn_osd_"+i+"_en", $.fn.GetLangStr(LT._Enable), "s");
			$.fn.TransLang("Mwithdrawn_osd_"+i+"_text", $.fn.GetLangStr(LT._Text), "s");
			$.fn.TransLang("Mwithdrawn_"+i+"_email_en", $.fn.GetLangStr(LT._Enable), "s");
			$.fn.TransLang("Mwithdrawn_"+i+"_email_subj", $.fn.GetLangStr(LT._Subject), "s");
			$.fn.TransLang("Mwithdrawn_"+i+"_email_mesg", $.fn.GetLangStr(LT._Message), "s");
		}
	};

	$.fn.TransAllSelectOptions = function()
	{
		if(LT == undefined) return;
		$("select > option[value='high']").each(function(){					$(this).text($.fn.GetLangStr(LT._High))});
		$("select > option[value='medium']").each(function(){				$(this).text($.fn.GetLangStr(LT._Medium))});
		$("select > option[value='mid']").each(function(){					$(this).text($.fn.GetLangStr(LT._Mid))});
		$("select > option[value='low']").each(function(){					$(this).text($.fn.GetLangStr(LT._Low))});
		$("select > option[value='hp']").each(function(){					$(this).text($.fn.GetLangStr(LT._High_profile))});
		$("select > option[value='mp']").each(function(){					$(this).text($.fn.GetLangStr(LT._Main_profile))});
		$("select > option[value='bp']").each(function(){					$(this).text($.fn.GetLangStr(LT._Baseline_profile))});
		$("select > option[value='on']").each(function(){					$(this).text($.fn.GetLangStr(LT._On))});
		$("select > option[value='off']").each(function(){					$(this).text($.fn.GetLangStr(LT._Off))});
		$("select > option[value='auto']").each(function(){					$(this).text($.fn.GetLangStr(LT._Auto))});
		$("select > option[value='advanced']").each(function(){				$(this).text($.fn.GetLangStr(LT._Auto))});
		$("select > option[value='flickerless']").each(function(){			$(this).text($.fn.GetLangStr(LT._Flickerless))});
		$("select > option[value='shutter_priority']").each(function(){		$(this).text($.fn.GetLangStr(LT._Shutter_priority))});
		$("select > option[value='manual']").each(function(){				$(this).text($.fn.GetLangStr(LT._Manual))});
		$("select > option[value='wdr']").each(function(){					$(this).text($.fn.GetLangStr(LT._Wdr))});
		$("select > option[value='full']").each(function(){					$(this).text($.fn.GetLangStr(LT._Full))});
		$("select > option[value='upper_2_3']").each(function(){			$(this).text($.fn.GetLangStr(LT._Upper_2_3rd))});
		$("select > option[value='lower_2_3']").each(function(){			$(this).text($.fn.GetLangStr(LT._Lower_2_3rd))});
		$("select > option[value='center_1_3']").each(function(){			$(this).text($.fn.GetLangStr(LT._Central_1_3rd))});
		$("select > option[value='center_1_6']").each(function(){			$(this).text($.fn.GetLangStr(LT._Central_1_6th))});
		$("select > option[value='left']").each(function(){					$(this).text($.fn.GetLangStr(LT._Left))});
		$("select > option[value='right']").each(function(){				$(this).text($.fn.GetLangStr(LT._Right))});
		$("select > option[value='color']").each(function(){				$(this).text($.fn.GetLangStr(LT._Color))});
		$("select > option[value='b/w']").each(function(){					$(this).text($.fn.GetLangStr(LT._Bw))});
		$("select > option[value='fast']").each(function(){					$(this).text($.fn.GetLangStr(LT._Fast))});
		$("select > option[value='normal']").each(function(){				$(this).text($.fn.GetLangStr(LT._Normal))});
		$("select > option[value='slow']").each(function(){					$(this).text($.fn.GetLangStr(LT._Slow))});
		$("select > option[value='in']").each(function(){					$(this).text($.fn.GetLangStr(LT._In))});
		$("select > option[value='out']").each(function(){					$(this).text($.fn.GetLangStr(LT._Out))});
		$("select > option[value='max']").each(function(){					$(this).text($.fn.GetLangStr(LT._Max))});
		$("select > option[value='mirror']").each(function(){				$(this).text($.fn.GetLangStr(LT._Mirror))});
		$("select > option[value='flip']").each(function(){					$(this).text($.fn.GetLangStr(LT._Flip))});
		$("select > option[value='both']").each(function(){					$(this).text($.fn.GetLangStr(LT._Both))});
		$("select > option[value='g711a']").each(function(){				$(this).text($.fn.GetLangStr(LT._G711a))});
		$("select > option[value='g711u']").each(function(){				$(this).text($.fn.GetLangStr(LT._G711u))});
		$("select > option[value='aac']").each(function(){					$(this).text($.fn.GetLangStr(LT._Aac))});
		$("select > option[value='transparent']").each(function(){			$(this).text($.fn.GetLangStr(LT._Transparent))});
		$("select > option[value='date']").each(function(){					$(this).text($.fn.GetLangStr(LT._Date))});
		$("select > option[value='text']").each(function(){					$(this).text($.fn.GetLangStr(LT._Text))});
		$("select > option[value='black']").each(function(){				$(this).text($.fn.GetLangStr(LT._Black))});
		$("select > option[value='white']").each(function(){				$(this).text($.fn.GetLangStr(LT._White))});
		$("select > option[value='pppoe']").each(function(){				$(this).text($.fn.GetLangStr(LT._Pppoe))});
		$("select > option[value='dhcp']").each(function(){					$(this).text($.fn.GetLangStr(LT._Dhcp))});
		$("select > option[value='ip_and_device_name']").each(function(){	$(this).text($.fn.GetLangStr(LT._IP_and_device_name))});
		$("select > option[value='device_name']").each(function(){			$(this).text($.fn.GetLangStr(LT._Device_name))});
		$("select > option[value='user_input']").each(function(){			$(this).text($.fn.GetLangStr(LT._User_input))});
		$("select > option[value='from_dhcp']").each(function(){			$(this).text($.fn.GetLangStr(LT._From_dhcp_server))});
		$("select > option[value='self-signed']").each(function(){			$(this).text($.fn.GetLangStr(LT._Self_signed))});
		$("select > option[value='csr']").each(function(){					$(this).text($.fn.GetLangStr(LT._Request))});
		$("select > option[value='install_cert']").each(function(){			$(this).text($.fn.GetLangStr(LT._Upload_certificate))});
		$("select > option[value='none']").each(function(){					$(this).text($.fn.GetLangStr(LT._None))});
		$("select > option[value='allow']").each(function(){				$(this).text($.fn.GetLangStr(LT._Allow))});
		$("select > option[value='deny']").each(function(){					$(this).text($.fn.GetLangStr(LT._Deny))});
		$("select > option[value='grey']").each(function(){					$(this).text($.fn.GetLangStr(LT._Grey))});
		$("select > option[value='pulse']").each(function(){				$(this).text($.fn.GetLangStr(LT._Pulse))});
		$("select > option[value='infinite']").each(function(){				$(this).text($.fn.GetLangStr(LT._Infinite))});
		$("select > option[value='no_auth']").each(function(){				$(this).text($.fn.GetLangStr(LT._No_auth))});
		$("select > option[value='smtp_plain']").each(function(){			$(this).text($.fn.GetLangStr(LT._Smtp_plain))});
		$("select > option[value='login']").each(function(){				$(this).text($.fn.GetLangStr(LT._Login))});
		$("select > option[value='tls_ttls']").each(function(){				$(this).text($.fn.GetLangStr(LT._Tls_ttls))});
		$("select > option[value='active']").each(function(){				$(this).text($.fn.GetLangStr(LT._Active))});
		$("select > option[value='passive']").each(function(){				$(this).text($.fn.GetLangStr(LT._Passive))});
		$("select > option[value='audio_and_video']").each(function(){		$(this).text($.fn.GetLangStr(LT._Audio_and_video))});
		$("select > option[value='video']").each(function(){				$(this).text($.fn.GetLangStr(LT._Video))});
		$("select > option[value='one_shot']").each(function(){				$(this).text($.fn.GetLangStr(LT._One_shot))});
		$("select > option[value='continuous']").each(function(){			$(this).text($.fn.GetLangStr(LT._Continuous))});
		$("select > option[value='1G_full-dup']").each(function(){			$(this).text($.fn.GetLangStr(LT._1G_full))});
		$("select > option[value='10M_full-dup']").each(function(){			$(this).text($.fn.GetLangStr(LT._10M_full))});
		$("select > option[value='10M_half-dup']").each(function(){			$(this).text($.fn.GetLangStr(LT._10M_half))});
		$("select > option[value='100M_full-dup']").each(function(){		$(this).text($.fn.GetLangStr(LT._100M_full))});
		$("select > option[value='100M_half-dup']").each(function(){		$(this).text($.fn.GetLangStr(LT._100M_half))});
		$("select > option[value='no']").each(function(){					$(this).text($.fn.GetLangStr(LT._NO))});
		$("select > option[value='nc']").each(function(){					$(this).text($.fn.GetLangStr(LT._NC))});
		$("select > option[value='home']").each(function(){					$(this).text($.fn.GetLangStr(LT._HOME))});
		$("select > option[value='last_action']").each(function(){			$(this).text($.fn.GetLangStr(LT._LAST_ACTION))});
		$("select > option[value='auto_scan']").each(function(){			$(this).text($.fn.GetLangStr(LT._AUTO_SCAN))});
		$("select > option[value='frame_scan']").each(function(){			$(this).text($.fn.GetLangStr(LT._FRAME_SCAN))});
		$("select > option[value='random_scan']").each(function(){			$(this).text($.fn.GetLangStr(LT._RANDOM_SCAN))});
		$("select > option[value='auto_patrol_1']").each(function(){		$(this).text($.fn.GetLangStr(LT._AUTO_PATROL_1))});
		$("select > option[value='auto_patrol_2']").each(function(){		$(this).text($.fn.GetLangStr(LT._AUTO_PATROL_2))});
		$("select > option[value='auto_patrol_3']").each(function(){		$(this).text($.fn.GetLangStr(LT._AUTO_PATROL_3))});
		$("select > option[value='auto_patrol_4']").each(function(){		$(this).text($.fn.GetLangStr(LT._AUTO_PATROL_4))});
		$("select > option[value='pattern_1']").each(function(){			$(this).text($.fn.GetLangStr(LT._Pattern_1))});
		$("select > option[value='pattern_2']").each(function(){			$(this).text($.fn.GetLangStr(LT._Pattern_2))});
		$("select > option[value='pattern_3']").each(function(){			$(this).text($.fn.GetLangStr(LT._Pattern_3))});
		$("select > option[value='pattern_4']").each(function(){			$(this).text($.fn.GetLangStr(LT._Pattern_4))});
		$("select > option[value='indoor']").each(function(){				$(this).text($.fn.GetLangStr(LT._INDOOR))});
		$("select > option[value='outdoor']").each(function(){				$(this).text($.fn.GetLangStr(LT._OUTDOOR))});
		$("select > option[value='upper']").each(function(){				$(this).text($.fn.GetLangStr(LT._Upper))});
		$("select > option[value='lower']").each(function(){				$(this).text($.fn.GetLangStr(LT._Lower))});
		$("select > option[value='micin']").each(function(){				$(this).text($.fn.GetLangStr(LT._Mic_in))});
		$("select > option[value='linein']").each(function(){				$(this).text($.fn.GetLangStr(LT._Line_in))});
		$("select > option[value='stream1']").each(function(){				$(this).text($.fn.GetLangStr(LT._Stream)+"1")});
		$("select > option[value='stream2']").each(function(){				$(this).text($.fn.GetLangStr(LT._Stream)+"2")});
		$("select > option[value='stream3']").each(function(){				$(this).text($.fn.GetLangStr(LT._Stream)+"3")});
		$("select > option[value='medium-high']").each(function(){			$(this).text($.fn.GetLangStr(LT._Medium_high))});
		$("select > option[value='medium-low']").each(function(){			$(this).text($.fn.GetLangStr(LT._Medium_low))});
		$("select > option[value='Object Counting']").each(function(){		$(this).text($.fn.GetLangStr(LT._Line_counting))});
		$("select > option[value='Loitering']").each(function(){			$(this).text($.fn.GetLangStr(LT._Loitering))});
		$("select > option[value='Intrusion]").each(function(){				$(this).text($.fn.GetLangStr(LT._Intrusion))});
		$("select > option[value='Line Crossing']").each(function(){		$(this).text($.fn.GetLangStr(LT._Borderline))});
		$("select > option[value='Area Counting]").each(function(){			$(this).text($.fn.GetLangStr(LT._Area_counting))});
		$("select > option[value='Departure']").each(function(){			$(this).text($.fn.GetLangStr(LT._Departure))});
		$("select > option[value='Withdrawn']").each(function(){			$(this).text($.fn.GetLangStr(LT._Withdrawn))});
		$("select > option[value='Arabic']").each(function(){				$(this).text($.fn.GetLangStr(LT._Lang_arabic))});
		$("select > option[value='Czech']").each(function(){				$(this).text($.fn.GetLangStr(LT._Lang_czech))});
		$("select > option[value='Chinese (Simplified)']").each(function(){	$(this).text($.fn.GetLangStr(LT._Lang_zh_cn))});
		$("select > option[value='Chinese (Traditional)']").each(function(){$(this).text($.fn.GetLangStr(LT._Lang_zh_tw))});
		$("select > option[value='English']").each(function(){				$(this).text($.fn.GetLangStr(LT._Lang_en))});
		$("select > option[value='French']").each(function(){				$(this).text($.fn.GetLangStr(LT._Lang_french))});
		$("select > option[value='German']").each(function(){				$(this).text($.fn.GetLangStr(LT._Lang_german))});
		$("select > option[value='Hungarian']").each(function(){			$(this).text($.fn.GetLangStr(LT._Lang_hugrian))});
		$("select > option[value='Italian']").each(function(){				$(this).text($.fn.GetLangStr(LT._Lang_italian))});
		$("select > option[value='Japanese']").each(function(){				$(this).text($.fn.GetLangStr(LT._Lang_japanese))});
		$("select > option[value='Polish']").each(function(){				$(this).text($.fn.GetLangStr(LT._Lang_polish))});
		$("select > option[value='Portuguese']").each(function(){			$(this).text($.fn.GetLangStr(LT._Lang_portuguese))});
		$("select > option[value='Russian]").each(function(){				$(this).text($.fn.GetLangStr(LT._Lang_russian))});
		$("select > option[value='Spanish']").each(function(){				$(this).text($.fn.GetLangStr(LT._Lang_spaish))});
		$("select > option[value='EcoZone']").each(function(){				$(this).text($.fn.GetLangStr(LT._EcoZone))});
		$("select > option[value='EcoZone+EcoFrame']").each(function(){		$(this).text($.fn.GetLangStr(LT._EcoZone)+"+"+$.fn.GetLangStr(LT._EcoFrame))});
	};

	$.fn.TransOptions = function(id)
	{
		if(LT == undefined) return;
		$("#"+id).children().each(function(){
			if($(this).val() == 'auto')				$(this).text($.fn.GetLangStr(LT._Auto));
			else if($(this).val() == 'color')		$(this).text($.fn.GetLangStr(LT._Color));
			else if($(this).val() == 'b/w')			$(this).text($.fn.GetLangStr(LT._Bw));
			else if($(this).val() == 'full')		$(this).text($.fn.GetLangStr(LT._Full));
			else if($(this).val() == '1')			$(this).text($.fn.GetLangStr(LT._Stream)+"1");
			else if($(this).val() == '2')			$(this).text($.fn.GetLangStr(LT._Stream)+"2");
			else if($(this).val() == '3')			$(this).text($.fn.GetLangStr(LT._Stream)+"3");
		});
	};

	$.fn.TransLang = function(id, string, type)
	{
		try {
			if(type == "s") // string
				$("#"+id)[0].innerHTML = string;
			else if(type == "b") // button
				$("#"+id).val(string);
		} catch(e) {
			// console.log("missing element of:"+id);
		}
	};

	$.fn.TransMultiLang = function(id, string, type)
	{
		try {
			if(type == "s") // string
				$("span[name="+id+"]").each(function(){
					$(this)[0].innerHTML = string;
				});
		} catch(e) {
			// console.log("missing element of:"+id);
		}
	};

	$.fn.TransMultiLangWithAttr = function(id, string, type)
	{
		try {
			$(type+"[name="+id+"]").each(function(){
				$(this)[0].innerHTML = string;
			});
		} catch(e) {
			// console.log("missing element of:"+id);
		}
	};

	$.fn.TransSave = function()
	{
		var record_save = [];
		record_save = $.fn.GetRecord_save();
		$.each(record_save, function(n){
			$("#Save_"+record_save[n])[0].innerHTML = $.fn.GetLangStr(LT._Save);
		});
		record_save = null;
	};

	$.fn.AdjustThWidth = function(id){
		var length = 0;
        $("#I"+id+" tbody > tr > th > span").each(function(){
            length = $(this).text().length > length ? $(this).text().length : length;
        });

        $("#I"+id+" .th_width").each(function(){
            if ($.cookie('def_lang') == "Japanese" && length > 9)
        		  $(this).css("width", length * 12 +"px");
            else if (length > 20)
                  $(this).css("width", length * 8 +"px");
        });
	};
})(jQuery)
