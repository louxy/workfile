
// Define config param area //
var config_param =
[
	["liveView",
		"image.encode.profile1.encode&"+
		"image.encode.profile2.encode&"+
		"image.encode.profile3.encode&"+
		"image.encode.profile4.encode&"+
		"image.encode.profile5.encode&"+
		"image.encode.profile6.encode&"+
		"image.encode.current_profile_id&"+
		"network.rtsp.authentication&"+
		"network.rtsp.stream_1.url&"+
		"network.rtsp.stream_2.url&"+
		"network.rtsp.stream_3.url&"+
		"network.rtsp.login_id&"+
		"network.rtsp.password&"+
		"network.rtsp.port&"+
		"network.rtsp.natport&"+
		"system.audio_in.enable&"+
		"system.audio_out.enable"
	],
	["liveView_fish",
		"LoginID"
	],
	["tmp",
		"image.encode.profile1.encode&"+
		"image.encode.profile2.encode&"+
		"image.encode.profile3.encode&"+
		"image.encode.profile4.encode&"+
		"image.encode.profile5.encode&"+
		"image.encode.profile6.encode&"+
		"image.encode.current_profile_id&"
	],
	["fish",
		"lens.dewarp.center_x&"+
		"lens.dewarp.center_y&"+
		"lens.dewarp.center_radius&"
	],
	["infor_sys",
		"system.information.camera_function&"+
		"system.information.fw_version&"+
		"system.information.mac_address&"+
		"system.information.mcu_version&"+
		"system.information.model_name"
	],
	["img_codec",
		"system.model_resolution&"+				 
		"image.encode.profile1.encode&"+				 
		"image.encode.profile2.encode&"+				 
		"image.encode.profile3.encode&"+				 
		"image.encode.profile4.encode&"+				 
		"image.encode.profile5.encode&"+				 
		"image.encode.profile6.encode&"+				 
		"image.encode.current_profile_id&"+				 
		"image.encode.edit_profile_id&"+				 
		"system.configuration.camera_type&"+				 
		"image.privacy_zone_1.mask_zone&"+				 
		"image.privacy_zone_2.mask_zone&"+				 
		"image.privacy_zone_3.mask_zone&"+				 
		"image.privacy_zone_4.mask_zone&"+				 
		"image.privacy_zone_5.mask_zone&"+				 
		"image.privacy_zone_6.mask_zone&"+				 
		"image.privacy_zone_7.mask_zone&"+				 
		"image.privacy_zone_8.mask_zone&"+				 
		"event.motion_detection.area&"+				 			 
		"lens.focus_region&"+				 
		"image.encode.profile1.stream1.h264_cbr_bitrate.query_range&"+
		"image.encode.profile1.stream1.dscp.query_range"
	],
	["img_exposure",
		"system.configuration.camera_type&"+
		"image.exposure.mode&"+
		"image.exposure.e_v&"+
		"image.exposure.day_night&"+
		"image.exposure.shutter_speed&"+
		"image.exposure.slow_shutter&"+
		"image.exposure.manual_gain&"+
		"image.exposure.agc_max&"+
		"image.exposure.noise_reduction&"+
		"image.color.blc&"+
		"image.color.wdr&"+
		"image.exposure.led&"+
		"image.exposure.day_to_night_threshold&"+
		"image.exposure.night_to_day_threshold&"+
		"image.exposure.switch_delay_time&"+
		"image.exposure.light_sensor_adc&"
		//"image.exposure.ir.mode&"+
		//"image.exposure.ir.level&"
		,
		"system.lens.type&"+
		"system.information.check_IR_Light&"+
		"system.information.model_name&"+
		"image.exposure.manual_gain.query_range&"+
		"image.exposure.agc_max.query_range&"+
		"image.exposure.noise_reduction.query_range&"+
		"image.exposure.ir.level.query_range"
	],
	["img_whitebalance",
		"image.color.white_balance.mode&"+
		"image.color.white_balance.r_gain&"+
		"image.color.white_balance.g_gain&"+
		"image.color.white_balance.b_gain&"
		,
		"image.color.white_balance.r_gain.query_range&"+
		"image.color.white_balance.g_gain.query_range&"+
		"image.color.white_balance.b_gain.query_range"
	],
	["img_color",
		"image.color.brightness&"+
		"image.color.contrast&"+
		"image.color.hue&"+
		"image.color.saturation&"+
		"image.color.sharpness&"+
		"image.color.gamma_correction&"+
		"image.flip_mirror&"
		,
		"image.color.brightness.query_range&"+
		"image.color.contrast.query_range&"+
		"image.color.hue.query_range&"+
		"image.color.saturation.query_range&"+
		"image.color.sharpness.query_range"
	],
	["img_focus",
		"lens.focus_mode&"+
		"lens.zoom_speed&"+
		"lens.zoom_limit&"+
		"lens.zoom.level&"+
		"image.color.saturation.grey_out&"+
		"lens.focus.ui_manual.day_position&"+
		"lens.focus.ui_manual.night_position&"+
		"lens.focus.refocus.day_night_switch&"+
		"lens.focus_roi_mode&"+
		"lens.focus_region&"
		,
		"lens.focus_region&"+
		"image.encode.current_profile_id&"+
		"image.encode.profile1.encode&"+
		"image.encode.profile2.encode&"+
		"image.encode.profile3.encode&"+
		"image.encode.profile4.encode&"+
		"image.encode.profile5.encode&"+
		"image.encode.profile6.encode"
	],
	["img_smartencoding",
		"image.roi.enable1&"+
		"image.roi.region1&"+
		"image.roi.level1&"+
		"image.roi.enable2&"+
		"image.roi.region2&"+
		"image.roi.level2&"+
		"image.roi.enable3&"+
		"image.roi.region3&"+
		"image.roi.level3&"
		,
		"system.model_resolution&"+
		"image.encode.current_profile_id&"+
		"image.encode.profile1.encode&"+
		"image.encode.profile2.encode&"+
		"image.encode.profile3.encode&"+
		"image.encode.profile4.encode&"+
		"image.encode.profile5.encode&"+
		"image.encode.profile6.encode"
	],
	["img_privacy",
		"image.privacy_zone_1.enable&"+
		"image.privacy_zone_1.mask_zone&"+
		"image.privacy_zone_2.enable&"+
		"image.privacy_zone_2.mask_zone&"+
		"image.privacy_zone_3.enable&"+
		"image.privacy_zone_3.mask_zone&"+
		"image.privacy_zone_4.enable&"+
		"image.privacy_zone_4.mask_zone&"+
		"image.privacy_zone_5.enable&"+
		"image.privacy_zone_5.mask_zone&"+
		"image.privacy_zone_6.enable&"+
		"image.privacy_zone_6.mask_zone&"+
		"image.privacy_zone_7.enable&"+
		"image.privacy_zone_7.mask_zone&"+
		"image.privacy_zone_8.enable&"+
		"image.privacy_zone_8.mask_zone&"+
		"image.privacy_zone_1.color_setting&"
		,
		"system.model_resolution&"+
		"image.encode.current_profile_id&"+
		"image.encode.profile1.encode&"+
		"image.encode.profile2.encode&"+
		"image.encode.profile3.encode&"+
		"image.encode.profile4.encode&"+
		"image.encode.profile5.encode&"+
		"image.encode.profile6.encode"
	],
	["img_roi",
		"image.dptz.enable&"+
		"image.dptz.region&"+
		"image.dptz.output_resolution&"+
		"image.dptz.original_resolution&"
		,
		"system.model_resolution&"+
		"image.encode.current_profile_id&"+
		"image.encode.profile1.encode&"+
		"image.encode.profile2.encode&"+
		"image.encode.profile3.encode&"+
		"image.encode.profile4.encode&"+
		"image.encode.profile5.encode&"+
		"image.encode.profile6.encode"
	],
	["net_general",
		"network.dhcp&"+
		"network.host_name&"+
		"system.osd.mode&"+
		"network.http_port&"+
		"network.ipv4&"+
		"network.primary_dns&"+
		"network.secondary_dns&"+
		"network.upnp&"+
		"system.datetime.display&"+
		"network.http_port&"+
		"network.https_port&"+
		"system.osd.text&"+
		"system.osd.pos&"+
		"system.datetime.pos&"+
		/* ipv6 */
		"network.ipv6.enable&"+
		"network.ipv6.router_advertisement&"+
		"network.ipv6.dhcp_enable&"+
		"network.ipv6.address&"+
		"network.ipv6.address_prefix_len&"+
		"network.ipv6.default_route&"+
		"network.ipv6.default_route_prefix_len&"+
		"network.ipv6.dns_address&"
		//"network.bonjour_enable&"
		/**/
		,
		"network.http_port.query_range&"+
		"network.https_port.query_range&"+
		"network.ipv6.address_prefix_len.query_range&"+
		"network.ipv6.default_route_prefix_len.query_range&"+
		"system.port.list"
	],
	["net_ftp",
		"network.ftp.function&"+
		"network.ftp.login_id&"+
		"network.ftp.max_simultaneous_connection&"+
		"network.ftp.password&"

		,
		"network.ftp.max_simultaneous_connection.query_range"
	],
	["net_rtsp",
		"network.rtsp.authentication&"+
		"network.rtsp.login_id&"+
		"network.rtsp.port&"+
		"network.rtsp.natport&"+
		"network.rtsp.password&"+
		"network.rtsp.stream_1.multicast_address&"+
		"network.rtsp.stream_1.multicast_address_audio&"+
		"network.rtsp.stream_2.multicast_address&"+
		"network.rtsp.stream_2.multicast_address_audio&"+
		"network.rtsp.stream_3.multicast_address&"+
		"network.rtsp.stream_3.multicast_address_audio&"+
		"network.rtsp.stream_1.url&"+
		"network.rtsp.stream_2.url&"+
		"network.rtsp.stream_3.url&"
		,
		"network.rtsp.port.query_range&"+
		"system.port.list"
	],
	["net_snmp",
		"network.snmp.snmp_v1_enable&"+
		"network.snmp.snmp_v2_enable&"+
		"network.snmp.snmp_v3_enable&"+
		"network.snmp.v3.user_name&"+
		"network.snmp.v3.authentication_mode&"+
		"network.snmp.v3.authentication_password&"+
		"network.snmp.v3.privacy_mode&"+
		"network.snmp.v3.privacy_password&"+
		"network.snmp.read_community_string&"+
		"network.snmp.write_community_string&"+
		"network.snmp.trap_host&"+
		"network.snmp.trap_enable&"+
		"network.snmp.heartbeat_host&"+
		"network.snmp.heartbeat_interval&"+
		"network.snmp.heartbeat_enable&"
		,
		""
	],
	["net_8021x",
		"network.8021x.enable&"+
		"network.8021x.protocol&"+
		"network.8021x.md5.user_name&"+
		"network.8021x.md5.user_passwd&"+
		"network.8021x.tls.user_name&"+
		"network.8021x.tls.private_key_password&"+
		"network.8021x.ttls.inner_auth&"+
		"network.8021x.ttls.user_name&"+
		"network.8021x.ttls.user_passwd&"+
		"network.8021x.ttls.anonymous_id&"+
		"network.8021x.peap.user_name&"+
		"network.8021x.peap.user_passwd&"+
		"network.8021x.ca_info&"+
		"network.8021x.client_cert_info&"+
		"network.8021x.private_key_info&"
		,
		""
	],
	["net_view",
		"system.engineering.ipv4&"+
		"system.engineering.primary_dns&"+
		"system.engineering.secondary_dns&"+
		/* ipv6 */
		"system.engineering.ipv6address1&"+
		"system.engineering.ipv6address2&"+
		"system.engineering.ipv6address3&"+
		"system.engineering.ipv6address4&"
		
		,
		""
	],
	["net_firewall",
		"network.firewall.mode&"+
		"network.firewall.filter1.ip_address&"+
		"network.firewall.filter1.protocol&"+
		"network.firewall.filter2.ip_address&"+
		"network.firewall.filter2.protocol&"+
		"network.firewall.filter3.ip_address&"+
		"network.firewall.filter3.protocol&"+
		"network.firewall.filter4.ip_address&"+
		"network.firewall.filter4.protocol&"+
		"network.firewall.filter5.ip_address&"+
		"network.firewall.filter5.protocol&"+
		"network.firewall.filter6.ip_address&"+
		"network.firewall.filter6.protocol&"+
		"network.firewall.filter7.ip_address&"+
		"network.firewall.filter7.protocol&"+
		"network.firewall.filter8.ip_address&"+
		"network.firewall.filter8.protocol&"+
		"network.firewall.filter9.ip_address&"+
		"network.firewall.filter9.protocol&"+
		"network.firewall.filter10.ip_address&"+
		"network.firewall.filter10.protocol&"
		,
		""
	],
	["account",
		"account.admin.password&"+
		"account.admin.user_id&"+
		"account.guest_1.password&"+
		"account.guest_1.user_id&"+
		"account.guest_1.auth&"+
		"account.guest_2.password&"+
		"account.guest_2.user_id&"+
		"account.guest_2.auth&"+
		"account.guest_3.password&"+
		"account.guest_3.user_id&"+
		"account.guest_3.auth&"+
		"account.guest_4.password&"+
		"account.guest_4.user_id&"+
		"account.guest_4.auth&"+
		"account.guest_5.password&"+
		"account.guest_5.user_id&"+
		"account.guest_5.auth&"
		,
		""
	],
	["sys_datetime",
		"system.datetime.ntp_server&"+
		"system.datetime.ntp_sync_period&"+
		"system.datetime.sync_mode&"
		,
		"system.datetime&"+
		"system.datetime.set_manual&"+
		"system.datetime.ntp_adjustment_test&"+
		"system.datetime.list&"+
		"system.datetime.area"
	],
	["sys_audio",
		"system.audio_in.enable&"+
		"system.audio_in.level&"+
		"system.audio_in.type&"+
		"system.audio_out.enable&"+
		"system.audio_out.level&"
		,
		""
	],
	["sys_firmware",
		""
	],
	["sys_configure",
		"system.configuration.camera_type"
	],
	["sys_heater",
		"system.heater_ring_control&"+
		"system.power_source"
	],
	["event_motion",
		"event.motion_detection.area&"+
		"event.motion_detection.enable&"+
		"event.motion_detection.sensitivity&"+
		"event.event_trigger_fps.mode&"+
		"event.event_trigger_fps.fps&"+
		"event.event_trigger_fps.time&"
		,
		"system.model_resolution&"+
		"image.encode.current_profile_id&"+
		"image.encode.profile1.encode&"+
		"image.encode.profile2.encode&"+
		"image.encode.profile3.encode&"+
		"image.encode.profile4.encode&"+
		"image.encode.profile5.encode&"+
		"image.encode.profile6.encode"
	],
	["event_alarm",
		"event.alarm.input1.enable&"+
   		"event.alarm.input1.type&"+
   		"event.alarm.output.mode&"+
   		"event.alarm.output.duration_time&"+
   		"event.event_trigger_fps.mode&"+
		"event.event_trigger_fps.fps&"+
		"event.event_trigger_fps.time&"+
		"system.information.model_name&"
   		,
   		"system.model_resolution&"+
		"image.encode.current_profile_id&"+
		"image.encode.profile1.encode&"+
		"image.encode.profile2.encode&"+
		"image.encode.profile3.encode&"+
		"image.encode.profile4.encode&"+
		"image.encode.profile5.encode&"+
		"image.encode.profile6.encode"
	],
	["event_audio",
		"system.audio_alarm.level&"
   		,
   		""
	],
	["record_ftp",
		"event.ftp_record.alarm.file_name&"+
		"event.ftp_record.alarm.pre_recording_cycle&"+
		"event.ftp_record.alarm.pre_recording_frame&"+
		"event.ftp_record.alarm.recording_cycle&"+
		"event.ftp_record.alarm.recording_frame&"+
		"event.ftp_record.alarm.server_path&"+
		"event.ftp_record.conditions&"+
		"event.ftp_record.login_id&"+
		"event.ftp_record.motion.file_name&"+
		"event.ftp_record.motion.pre_recording_cycle&"+
		"event.ftp_record.motion.pre_recording_frame&"+
		"event.ftp_record.motion.recording_cycle&"+
		"event.ftp_record.motion.recording_frame&"+
		"event.ftp_record.motion.server_path&"+
		"event.ftp_record.password&"+
		"event.ftp_record.port&"+
		"event.ftp_record.scheduled.cycle&"+
		"event.ftp_record.scheduled.file_name&"+
		"event.ftp_record.scheduled.friday&"+
		"event.ftp_record.scheduled.monday&"+
		"event.ftp_record.scheduled.saturday&"+
		"event.ftp_record.scheduled.server_path&"+
		"event.ftp_record.scheduled.shed_1_end&"+
		"event.ftp_record.scheduled.shed_1_start&"+
		"event.ftp_record.scheduled.shed_2_end&"+
		"event.ftp_record.scheduled.shed_2_start&"+
		"event.ftp_record.scheduled.sunday&"+
		"event.ftp_record.scheduled.thursday&"+
		"event.ftp_record.scheduled.tuesday&"+
		"event.ftp_record.scheduled.wednesday&"+
		"event.ftp_record.server_name&"
		,
		"event.ftp_record.port.query_range"
	],
	["record_smtp",
		"event.email_record.authentication&"+
		"event.email_record.conditions&"+
		"event.email_record.mail_to_1.address&"+
		"event.email_record.mail_to_1.alarm&"+
		"event.email_record.mail_to_1.motion&"+
		"event.email_record.mail_to_1.sender&"+
		"event.email_record.mail_to_2.address&"+
		"event.email_record.mail_to_2.alarm&"+
		"event.email_record.mail_to_2.motion&"+
		"event.email_record.mail_to_2.sender&"+
		"event.email_record.mail_to_3.address&"+
		"event.email_record.mail_to_3.alarm&"+
		"event.email_record.mail_to_3.motion&"+
		"event.email_record.mail_to_3.sender&"+
		"event.email_record.mail_to_4.address&"+
		"event.email_record.mail_to_4.alarm&"+
		"event.email_record.mail_to_4.motion&"+
		"event.email_record.mail_to_4.sender&"+
		"event.email_record.mail_to_5.address&"+
		"event.email_record.mail_to_5.alarm&"+
		"event.email_record.mail_to_5.motion&"+
		"event.email_record.mail_to_5.sender&"+
		"event.email_record.mail_to_6.address&"+
		"event.email_record.mail_to_6.alarm&"+
		"event.email_record.mail_to_6.motion&"+
		"event.email_record.mail_to_6.sender&"+
		"event.email_record.mail_to_7.address&"+
		"event.email_record.mail_to_7.alarm&"+
		"event.email_record.mail_to_7.motion&"+
		"event.email_record.mail_to_7.sender&"+
		"event.email_record.mail_to_8.address&"+
		"event.email_record.mail_to_8.alarm&"+
		"event.email_record.mail_to_8.motion&"+
		"event.email_record.mail_to_8.sender&"+
		"event.email_record.mail_to_9.address&"+
		"event.email_record.mail_to_9.alarm&"+
		"event.email_record.mail_to_9.motion&"+
		"event.email_record.mail_to_9.sender&"+
		"event.email_record.mail_to_10.address&"+
		"event.email_record.mail_to_10.alarm&"+
		"event.email_record.mail_to_10.motion&"+
		"event.email_record.mail_to_10.sender&"+
		"event.email_record.motion.attach_image&"+
		"event.email_record.motion.message&"+
		"event.email_record.motion.subject&"+
		"event.email_record.alarm.attach_image&"+
		"event.email_record.alarm.message&"+
		"event.email_record.alarm.subject&"+
		"event.email_record.password&"+
		"event.email_record.sender_mail_address&"+
		"event.email_record.server&"+
		"event.email_record.user_id&"+
		"event.email_record.port&"
		,
		"event.email_record.port.query_range"
	],
	["record_sd",
		"event.sd_record.alarm_recording_time&"+
		"event.sd_record.conditions&"+
		"event.sd_record.motion_recording_time&"+
		"event.sd_record.overwrite&"+
		//"event.sd_record.record_type&"+
		"event.sd_record.schedule.mode&"+
		"event.sd_record.schedule.month_1.enable&"+
		"event.sd_record.schedule.month_1.start_time&"+
		"event.sd_record.schedule.month_1.end_time&"+
		"event.sd_record.schedule.month_2.enable&"+
		"event.sd_record.schedule.month_2.start_time&"+
		"event.sd_record.schedule.month_2.end_time&"+
		"event.sd_record.schedule.month_3.enable&"+
		"event.sd_record.schedule.month_3.start_time&"+
		"event.sd_record.schedule.month_3.end_time&"+
		"event.sd_record.schedule.week_1.enable&"+
		"event.sd_record.schedule.week_1.start_time&"+
		"event.sd_record.schedule.week_1.end_time&"+
		"event.sd_record.schedule.week_2.enable&"+
		"event.sd_record.schedule.week_2.start_time&"+
		"event.sd_record.schedule.week_2.end_time&"+
		"event.sd_record.schedule.week_3.enable&"+
		"event.sd_record.schedule.week_3.start_time&"+
		"event.sd_record.schedule.week_3.end_time&"+
		"event.sd_record.schedule.day_1.enable&"+
		"event.sd_record.schedule.day_1.start_time&"+
		"event.sd_record.schedule.day_1.end_time&"+
		"event.sd_record.schedule.day_2.enable&"+
		"event.sd_record.schedule.day_2.start_time&"+
		"event.sd_record.schedule.day_2.end_time&"+
		"event.sd_record.schedule.day_3.enable&"+
		"event.sd_record.schedule.day_3.start_time&"+
		"event.sd_record.schedule.day_3.end_time&"+
		"event.sd_record.conditions&"+
		"event.sd_record.scheduled.monday&"+
		"event.sd_record.scheduled.tuesday&"+
		"event.sd_record.scheduled.wednesday&"+
		"event.sd_record.scheduled.thursday&"+
		"event.sd_record.scheduled.friday&"+
		"event.sd_record.scheduled.saturday&"+
		"event.sd_record.scheduled.sunday&"+
		"event.sd_record.scheduled.shed_1_start&"+
		"event.sd_record.scheduled.shed_1_end&"+
		"event.sd_record.scheduled.shed_2_start&"+
		"event.sd_record.scheduled.shed_2_end&"+
		"event.sd_record.sched_recording_time&"+
		"event.sd_record.overwrite&"+
		"event.schedule_reboot.monday&"+
		"event.schedule_reboot.tuesday&"+
		"event.schedule_reboot.wednesday&"+
		"event.schedule_reboot.thursday&"+
		"event.schedule_reboot.friday&"+
		"event.schedule_reboot.saturday&"+
		"event.schedule_reboot.sunday&"+
		"event.schedule_reboot.hour&"
		,
		"system.sd.Usage&"+
		"system.sd.mount_status&"+
		"image.encode.profile1.encode&"+
		"image.encode.profile2.encode&"+
		"image.encode.profile3.encode&"+
		"image.encode.profile4.encode&"+
		"image.encode.profile5.encode&"+
		"image.encode.profile6.encode&"+
		"image.encode.current_profile_id"
	],
	["record_snapshot",
		""
		,
		""
	],
	["record_video",
		""
		,
		""
	],
	["browser_sdfile",
		"system.sd.file_list"
		,
		""
	]
]

// Define which page need show activex //
var ActivexDisplay = [
	"tmp",
	"img_exposure",
	"img_color",
	"img_whitebalance",
	"img_focus",
	"img_smartencoding",
	"img_privacy",
	"img_roi",
	"event_motion"
]

// Define auth param area //
var auth_param = [
	"LoginID&"+
	"system.access_level&"+
	"system.model_lens&"+
	"system.model_sd&"+
	"system.model_alarmInOut&"+
	"system.model_audio&"+
	"system.model_mechanism&"+
	"system.model_ir&"+
	"network.https_port&"+
	"network.http_port&"+
	"system.engineering.ipv4&"+
	"lens.dewarp.enable&"+
	"account.admin.password&"+
	"account.admin.user_id&"+
	"account.guest_1.password&"+
	"account.guest_1.user_id&"+
	"account.guest_2.password&"+
	"account.guest_2.user_id&"+
	"account.guest_3.password&"+
	"account.guest_3.user_id&"+
	"account.guest_4.password&"+
	"account.guest_4.user_id&"+
	"account.guest_5.password&"+
	"account.guest_5.user_id"
]

// Define activex param area //
var activex_param = [
	"network.rtsp.stream_1.url&"+
	"network.rtsp.stream_2.url&"+
	"network.rtsp.stream_3.url&"+
	"system.audio_out.enable&"+
	"network.rtsp.port&"+
	"network.rtsp.natport&"+
	"network.rtsp.login_id&"+
	"network.rtsp.password&"+
	"network.rtsp.authentication"
]

// Define event handler param //
var event_handler = [
	"system.motion_alarm.status&"+
	"system.external_alarm_input1.status"
]

var jpeg_param = [
	"image.encode.profile1.encode&"+
	"image.encode.profile2.encode&"+
	"image.encode.profile3.encode&"+
	"image.encode.profile4.encode&"+
	"image.encode.profile5.encode&"+
	"image.encode.profile6.encode&"+
	"image.encode.current_profile_id"
]

// Define show save or default image button //
var ConfButtonState = [
	["infor_sys","save=no&default=no"],
	["img_codec","save=yes&default=no"],
	["img_exposure","save=no&default=yes"],
	["img_whitebalance","save=no&default=yes"],
	["img_color","save=no&default=yes"],
	["img_focus","save=no&default=yes"],
	["img_smartencoding","save=no&default=yes"],
	["img_roi","save=yes&default=yes"],
	["img_privacy","save=no&default=no"],
	["net_general","save=yes&default=no"],
	["net_ftp","save=yes&default=yes"],
	["net_rtsp","save=yes&default=yes"],
	["net_snmp","save=yes&default=yes"],
	["net_8021x","save=yes&default=no"],
	["net_firewall","save=yes&default=yes"],
	["account","save=yes&default=yes"],
	["event_motion","save=yes&default=yes"],
	["record_smtp","save=yes&default=yes"],
	["event_alarm","save=yes&default=yes"],
	["record_ftp","save=yes&default=yes"],
	["record_sd","save=yes&default=yes"],
	["sys_datetime","save=yes&default=yes"],
	["sys_audio","save=yes&default=yes"],
	["sys_firmware","save=no&default=no"],
	["sys_configure","save=no&default=no"],
	["sys_heater","save=yes&default=no"],
	["event_log","save=no&default=no"],
	["event_audio","save=no&default=yes"],
	["browser_sdfile","save=no&default=no"],
	["record_video","save=no&default=no"]
]

// Define variable area //
var LT;
var DEFINE_LANGUAGE_ENGLISH = "English";
var DEFINE_LANGUAGE_SD_CHINESE = "Chinese (Simplified)";
var DEFINE_LANGUAGE_TL_CHINESE = "Chinese (Traditional)";
var DEFINE_LANGUAGE_JAPANESE = "Japanese";
var DEFINE_LANGUAGE_FRENCH = "French";
var DEFINE_LANGUAGE_GERMAN = "German";
var DEFINE_LANGUAGE_ITALIAN = "Italian";
var DEFINE_LANGUAGE_PORTUGUESE = "Portuguese";
var DEFINE_LANGUAGE_SPANISH = "Spanish";
var DEFINE_LANGUAGE_RUSSIAN = "Russian";
var DEFINE_LANGUAGE_ARABIC = "Arabic";
var DEFINE_LANGUAGE_CZECH = "Czech";
var DEFINE_LANGUAGE_DUTCH = "Dutch";
var DEFINE_LANGUAGE_KOREAN = "Korean";
var DEFINE_LANGUAGE_POLISH = "Polish";
var DEFINE_LANGUAGE_DANISH = "Danish";
var DEFINE_LANGUAGE_FINNISH = "Finnish";
var DEFINE_LANGUAGE_NORWEGIAN = "Norwegian";
var DEFINE_LANGUAGE_SWEDISH = "Swedish";
var DEFINE_LANGUAGE_TURKISH = "Turkish";

var Language_Array =[
	DEFINE_LANGUAGE_ENGLISH,
	DEFINE_LANGUAGE_SD_CHINESE,
	DEFINE_LANGUAGE_TL_CHINESE,
	DEFINE_LANGUAGE_JAPANESE,
	DEFINE_LANGUAGE_FRENCH,
	DEFINE_LANGUAGE_GERMAN,
	DEFINE_LANGUAGE_ITALIAN,
	DEFINE_LANGUAGE_PORTUGUESE,
	DEFINE_LANGUAGE_SPANISH,
	DEFINE_LANGUAGE_RUSSIAN
];
var DEFINE_ACTIVEX = "Media Player";
var DEFINE_QUICKTIME = "Quicktime";
var Activex;
var ActivexF;
var ActivexFUseTCP=false;
var stream1;
var stream2;
var stream3;
var audio_en;
var rtsp_port;
var rtsp_natport;
var http_port;
var https_port;
var rtsp_account;
var rtsp_password;
var rtsp_authent;
var model_len;
var model_sd;
var model_alarm;
var model_audio;
var model_mechanism;
var model_ir;
var system_ipv4;
var LoginID;
var dewarp;
var event_motion_flag = "";
var event_alarm_flag = "";
var fix_content_hei;
var dropopacity = 0.5;
var draw_area = "";
var ir_control ="";
var user_account = new Array(6);
var user_passwd = new Array(6);

/* 
	ResizeArea[0] : privacy_zone_1,
	ResizeArea[1] : privacy_zone_2,
	ResizeArea[2] : privacy_zone_3,
	ResizeArea[3] : privacy_zone_4,
	ResizeArea[4] : privacy_zone_5,
	ResizeArea[5] : privacy_zone_6,
	ResizeArea[6] : privacy_zone_7,
	ResizeArea[7] : privacy_zone_8,
	ResizeArea[8] : motion_area
*/
var ResizeArea = new Array(8);
var query_thread = null;
var query_install_thread = null;
var install_status = false;
var download_msi = "/MPPlugin.msi";
var Quicktime = null;
var JPEG_W = 448;
var JPEG_H = 252;
if (typeof console === "undefined") {
	console = {
		log : function () {},
		info : function () {},
		error : function () {},
		warn : function () {}
	}
}

(function($){
	$.fn._GetHtmlName = function()
	{
		var pagePathName= window.location.pathname, len = 0, callback;
		var tmp = "";
		tmp = pagePathName.substring(pagePathName.lastIndexOf("/") + 1);
		len = tmp.indexOf('.');
		callback = tmp.slice(0,len);

		if(callback == "")
			callback = pagePathName;

		return callback;
	};
	
	$.fn._InitialLang = function()
	{
		$("#reloading_container").css("height",$(window).height());
		
		// Remove language option
		$("#lang_select").find('option').remove();

		if($.cookie('def_lang') == undefined){
			var lang = window.navigator.userLanguage || window.navigator.language;
			if(lang == "zh-CN" || lang == "zh-cn")
				$.cookie('def_lang', DEFINE_LANGUAGE_SD_CHINESE, { expires: 365, path: '/' });
			else if(lang == "zh-TW" || lang == "zh-tw")
				$.cookie('def_lang', DEFINE_LANGUAGE_TL_CHINESE, { expires: 365, path: '/' });
			else if(lang == "fr")
				$.cookie('def_lang', DEFINE_LANGUAGE_FRENCH, { expires: 365, path: '/' });
			else if(lang == "de")
				$.cookie('def_lang', DEFINE_LANGUAGE_GERMAN, { expires: 365, path: '/' });
			else if(lang == "it")
				$.cookie('def_lang', DEFINE_LANGUAGE_ITALIAN, { expires: 365, path: '/' });
			else if(lang == "es")
				$.cookie('def_lang', DEFINE_LANGUAGE_SPANISH, { expires: 365, path: '/' });
			else if(lang == "pt")
				$.cookie('def_lang', DEFINE_LANGUAGE_PORTUGUESE, { expires: 365, path: '/' });
			else if(lang == "en")
				$.cookie('def_lang', DEFINE_LANGUAGE_ENGLISH, { expires: 365, path: '/' });
			else
				$.cookie('def_lang', DEFINE_LANGUAGE_ENGLISH, { expires: 365, path: '/' });
		}

		// Insert language option
		$.each(Language_Array, function(n){
			if(Language_Array[n] == $.cookie('def_lang'))
				$("#lang_select").append($("<option></option>").attr("value", Language_Array[n]).text(Language_Array[n]).attr("selected","true"));
			else
				$("#lang_select").append($("<option></option>").attr("value", Language_Array[n]).text(Language_Array[n]));
		});

		$.fn._LoadingLang($.cookie('def_lang'));

		// When the user press submit button, some web page will be empty. Because the cgi cannot generate response content.
		if($.fn._GetHtmlName() == "event_log" || $.fn._GetHtmlName() == "sys_configure" || $.fn._GetHtmlName() == "net_snmp" || $.fn._GetHtmlName() == "liveView" || $.fn._GetHtmlName() == "liveView_fish"){}
		else
		{
			// Setup hide siderbar menu and main content when leave current page
			window.onbeforeunload=function(){ 
				$("#reloading_container").show();
				$("#container").hide();
			}
		}

		// Combination language option		
		var video_player_option = "";
		
		// Remove video player option
		$("#player_select").find('option').remove();

		// Insert media player option

		if($.fn._identifyOS() == "MacOS")
		{
			video_player_option = DEFINE_QUICKTIME;

			if($.cookie('def_video_player') == undefined)
				$.cookie('def_video_player', DEFINE_QUICKTIME, { expires: 365, path: '/' });
		}
		else
		{
			video_player_option = DEFINE_ACTIVEX+","+DEFINE_QUICKTIME;
			
			if($.cookie('def_video_player') == undefined)
				$.cookie('def_video_player', DEFINE_ACTIVEX, { expires: 365, path: '/' });
		}
		
		// Insert language option
		var confList = video_player_option.split(',');
		$.each(confList, function(n){
			if(confList[n] == $.cookie('def_video_player'))
				$("#player_select").append($("<option></option>").attr("value", confList[n]).text(confList[n]).attr("selected","true"));
			else
				$("#player_select").append($("<option></option>").attr("value", confList[n]).text(confList[n]));
		});

		$("#lang_select").change(function(){
			$.cookie('def_lang', $(this).val(), { expires: 365, path: '/' });
			
			window.location.reload();
		});

		$("#player_select").change(function(){

			
			if($.fn._identifyOS() == "MacOS")
			{
				if(this.selectedIndex == 0)
					$.cookie('def_video_player', DEFINE_QUICKTIME, { expires: 365, path: '/' });
			}
			else
			{
				if(this.selectedIndex == 0)
					$.cookie('def_video_player', DEFINE_ACTIVEX, { expires: 365, path: '/' });
				else if(this.selectedIndex == 1)
					$.cookie('def_video_player', DEFINE_QUICKTIME, { expires: 365, path: '/' });
			}
			
			window.location.reload();
		});
	};
	
	$.fn._LoadingLang = function(Lang)
	{
		if(Lang == DEFINE_LANGUAGE_ENGLISH){
			$.getScript('/js/lang_en.js', function() { $.fn._StartLang(Lang);	});				//english
		} else if(Lang == DEFINE_LANGUAGE_SD_CHINESE){
			$.getScript('/js/lang_zh_cn.js', function() { $.fn._StartLang(Lang);	});			//sd chinese
		} else if(Lang == DEFINE_LANGUAGE_TL_CHINESE){
			$.getScript('/js/lang_zh_tw.js', function() { $.fn._StartLang(Lang);	});			//tl chinese
		} else if(Lang == DEFINE_LANGUAGE_JAPANESE){
			$.getScript('/js/lang_japan.js', function() { $.fn._StartLang(Lang);	});			//japanese
		} else if(Lang == DEFINE_LANGUAGE_FRENCH){
			$.getScript('/js/lang_french.js', function() { $.fn._StartLang(Lang);	});			//french 
		} else if(Lang == DEFINE_LANGUAGE_GERMAN){
			$.getScript('/js/lang_german.js', function() { $.fn._StartLang(Lang);	});			//german
		} else if(Lang == DEFINE_LANGUAGE_ITALIAN){
			$.getScript('/js/lang_italian.js', function() { $.fn._StartLang(Lang);	});			//italian
		} else if(Lang == DEFINE_LANGUAGE_PORTUGUESE){
			$.getScript('/js/lang_portuguese.js', function() { $.fn._StartLang(Lang);	});		//portuguese
		} else if(Lang == DEFINE_LANGUAGE_SPANISH){
			$.getScript('/js/lang_spanish.js', function() { $.fn._StartLang(Lang);	});			//spanish
		} else if(Lang == DEFINE_LANGUAGE_RUSSIAN){
			$.getScript('/js/lang_russian.js', function() { $.fn._StartLang(Lang);	});			//russian
		} else
			$.getScript('/js/lang_en.js', function() { $.fn._StartLang(Lang);	});				//default english
	};
	
	$.fn._StartLang = function(Lang)
	{
		if(Lang == DEFINE_LANGUAGE_ENGLISH){
			if(typeof(lang_en)!='undefined')			LT=lang_en;				//english
		} else if(Lang == DEFINE_LANGUAGE_SD_CHINESE){
			if(typeof(lang_zh_cn)!='undefined')			LT=lang_zh_cn;			//sd chinese
		} else if(Lang == DEFINE_LANGUAGE_TL_CHINESE){
			if(typeof(lang_zh_tw)!='undefined')			LT=lang_zh_tw;			//tl chinese
		} else if(Lang == DEFINE_LANGUAGE_JAPANESE){
			if(typeof(lang_japan)!='undefined')	LT=lang_japan;					//japanese
		}  else if(Lang == DEFINE_LANGUAGE_FRENCH){
			if(typeof(lang_french)!='undefined')		LT=lang_french;			//french
		} else if(Lang == DEFINE_LANGUAGE_GERMAN){
			if(typeof(lang_german)!='undefined')		LT=lang_german;			//german
		} else if(Lang == DEFINE_LANGUAGE_ITALIAN){
			if(typeof(lang_italian)!='undefined')		LT=lang_italian;		//italian
		} else if(Lang == DEFINE_LANGUAGE_PORTUGUESE){
			if(typeof(lang_portuguese)!='undefined')	LT=lang_portuguese;		//portuguese
		} else if(Lang == DEFINE_LANGUAGE_SPANISH){
			if(typeof(lang_spanish)!='undefined')		LT=lang_spanish;		//spanish
		} else if(Lang == DEFINE_LANGUAGE_RUSSIAN){
			if(typeof(lang_russian)!='undefined')		LT=lang_russian;		//russian
		} else
			LT=lang_en;															//default english


		$("#lang_select").children().each(function(){
			if($(this).text() == DEFINE_LANGUAGE_ENGLISH)
					$(this).text($.fn._GetLangStr(LT._Lang_en));
			else if($(this).text() == DEFINE_LANGUAGE_SD_CHINESE)
					$(this).text($.fn._GetLangStr(LT._Lang_zh_cn));
			else if($(this).text() == DEFINE_LANGUAGE_TL_CHINESE)
					$(this).text($.fn._GetLangStr(LT._Lang_zh_tw));
			else if($(this).text() == DEFINE_LANGUAGE_JAPANESE)
					$(this).text($.fn._GetLangStr(LT._Lang_japanese));
			else if($(this).text() == DEFINE_LANGUAGE_FRENCH)
					$(this).text($.fn._GetLangStr(LT._Lang_french));
			else if($(this).text() == DEFINE_LANGUAGE_GERMAN)
					$(this).text($.fn._GetLangStr(LT._Lang_german));
			else if($(this).text() == DEFINE_LANGUAGE_ITALIAN)
					$(this).text($.fn._GetLangStr(LT._Lang_italian));
			else if($(this).text() == DEFINE_LANGUAGE_PORTUGUESE)
					$(this).text($.fn._GetLangStr(LT._Lang_portuguese));
			else if($(this).text() == DEFINE_LANGUAGE_SPANISH)
					$(this).text($.fn._GetLangStr(LT._Lang_spanish));
			else if($(this).text() == DEFINE_LANGUAGE_RUSSIAN)
					$(this).text($.fn._GetLangStr(LT._Lang_russian));
		});
		
		$.fn._CheckAuth();
		
		// Insert title information
		if($.fn._identifyBrowser() == "msie")
		{
			jQuery.browser={};(function(){jQuery.browser.msie=false;
			jQuery.browser.version=0;if(navigator.userAgent.match(/MSIE ([0-9]+)\./)){
			jQuery.browser.msie=true;jQuery.browser.version=RegExp.$1;}})();
			
			if(jQuery.browser.version < 9)
			{
				document.title = $.fn._GetLangStr(LT._Network_Camera);
			}
			else
			{
				$("title").each(function(){
					$(this)[0].innerHTML = $.fn._GetLangStr(LT._Network_Camera);
				});
			}
		}
		else
		{
			$("title").each(function(){
				$(this)[0].innerHTML = $.fn._GetLangStr(LT._Network_Camera);
			});
		}
		
	};
	
	$.fn._GetParam = function()
	{
		var QueryCfg;
		QueryCfg = $.fn._GetHtmlName();
		$.ajax({
			url:'/cgi-bin/get?'+$.fn._GetConf(QueryCfg, "common"),
			dataType:'json',
			cache:false,
			success:function(data){
				$.fn._ObjectAssignValue(data);
			},
			error:function(xhr, textStatus, errorThrown){
			},
			complete:function(){
				$.fn._InitialSettingElement();
				$.fn._Go();
				$.fn._AutoAdjust();
			}
		});
	};
	
	$.fn._SetParam = function(param)
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
			}
		});
	};

	$.fn._SetParamByMask = function(param, des, sec)
	{
		$("#block_content_description")[0].innerHTML = des;
		$(".blockContent > center > img").attr("src","/css/images/animated_progress.gif");
		$.blockUI({ 
			message:$("#blockUI"),
			css:{
				width:'300px'
			}
		});
		
		$.ajax({
			url:'/cgi-bin/set?'+param,
			dataType:'json',
			cache:false,
			success:function(data){
			},
			error:function(xhr, textStatus, errorThrown){
			},
			complete:function(){
				setTimeout(function(){
					window.location.reload();
				},sec);
			}
		});
	};

	$.fn._AccountModify = function(param, des, sec)
	{
		$("#block_content_description")[0].innerHTML = des;
		$(".blockContent > center > img").attr("src","/css/images/animated_progress.gif");
		$.blockUI({ 
			message:$("#blockUI"),
			css:{
				width:'300px'
			}
		});
		
		$.ajax({
			url:'/cgi-bin/set?'+param,
			dataType:'json',
			cache:false,
			success:function(data){
			},
			error:function(xhr, textStatus, errorThrown){
			},
			complete:function(){
				setTimeout(function(){
					$.fn._ReLogin();
				},sec);
			}
		});
	};

	$.fn._SDScheduleSetting = function(param, des, sec)
	{
		$("#block_content_description")[0].innerHTML = des;
		$(".blockContent > center > img").attr("src","/css/images/animated_progress.gif");
		$.blockUI({ 
			message:$("#blockUI"),
			css:{
				width:'300px'
			}
		});
		
		$.ajax({
			url:'/cgi-bin/set?'+param,
			dataType:'json',
			cache:false,
			success:function(data){
			},
			error:function(xhr, textStatus, errorThrown){
			},
			complete:function(){
				setTimeout(function(){
					$.fn.CloseWindow();
				},sec);
			}
		});
	};

	$.fn._DefaultParam = function(des, sec)
	{
		$("#block_content_description")[0].innerHTML = des;
		$(".blockContent > center > img").attr("src","/css/images/animated_progress.gif");
		$.blockUI({ 
			message:$("#blockUI"),
			css:{
				width:'300px'
			}
		});
		
		var QueryCfg = $.fn._GetHtmlName();
		var request = "system.default_setting="+$.fn._TransCharacter($.fn._GetConf(QueryCfg, "default"));
		$.ajax({
			url:'/cgi-bin/set?'+request,
			dataType:'json',
			cache:false,
			success:function(data){
			},
			error:function(xhr, textStatus, errorThrown){
			},
			complete:function(){
				setTimeout(function(){
					window.location.reload();
				},sec);
			}
		});
	};
	
	$.fn._GetConf = function(query, cmd)
	{
		var param = "", final = 0;
		$.each(config_param, function(list, data){
			$.each(data, function(n, name){
				if(n == 0 && name == query){
					final = list;
					return false;
				}
			});
			
		});

		if(cmd == "common")
		{
			$.each(config_param, function(list,data){
				if(list == final){
					$.each(data, function(n, name){
						if(n == 0)
							return true;
						else
						{
							param = param + name;
						}
					});
				}
			});
		}
		else if(cmd == "default")
		{
			$.each(config_param, function(list,data){
				if(list == final){
					$.each(data, function(n, name){
						if(n==1){
							param = param + name;
						}
					});
				}
			});
		}
		return param;
	};

	$.fn._GetDefaultConf = function(query)
	{
		var param, final = 0;
		$.each(default_param, function(list, data){
			$.each(data, function(n, name){
				if(n == 0 && name == query){
					final = list;
					return false;
				}
			});
			
		});

		$.each(default_param, function(list,data){
			if(list == final){
				$.each(data, function(n, name){
					if(n == 0)
						return true;
					else
						param = name;
				});
			}
		});

		return param;
	};
	
	$.fn._CheckAuth = function()
	{		
		var access_level;
		$.ajax({
			url:'/cgi-bin/get?'+auth_param[0],
			dataType:'json',
			cache:false,
			success:function(data){
				$.each(data, function(param , val){
					if(param == "LoginID")
						LoginID = val[1];
					else if(param == "system.access_level")
						access_level = val[1];
					else if(param == "system.model_lens")
						model_len = val[1];
					else if(param == "system.model_sd")
						model_sd = val[1];
					else if(param == "system.model_alarmInOut")
						model_alarm = val[1];
					else if(param == "system.model_audio")
						model_audio = val[1];
					else if(param == "system.model_mechanism")
						model_mechanism = val[1];
					else if (param == "network.http_port")
						http_port = val[1];
					else if (param == "network.https_port")
						https_port = val[1];
					else if(param == "system.engineering.ipv4")
						system_ipv4 = val[1];
					else if(param == "system.model_ir")
						model_ir = val[1];
					else if(param == "lens.dewarp.enable")
						dewarp = val[1];
					else if(param == "account.admin.user_id")
						user_account[0] = val[1];
					else if(param == "account.admin.password")
						user_passwd[0] = val[1];
					else if(param == "account.guest_1.user_id")
						user_account[1] = val[1];
					else if(param == "account.guest_1.password")
						user_passwd[1] = val[1];
					else if(param == "account.guest_2.user_id")
						user_account[2] = val[1];
					else if(param == "account.guest_2.password")
						user_passwd[2] = val[1];
					else if(param == "account.guest_3.user_id")
						user_account[3] = val[1];
					else if(param == "account.guest_3.password")
						user_passwd[3] = val[1];
					else if(param == "account.guest_4.user_id")
						user_account[4] = val[1];
					else if(param == "account.guest_4.password")
						user_passwd[4] = val[1];
					else if(param == "account.guest_5.user_id")
						user_account[5] = val[1];
					else if(param == "account.guest_5.password")
						user_passwd[5] = val[1];					
				});
			},
			error:function(xhr, textStatus, errorThrown){
			},
			complete:function(){
				if(access_level == "admin")
				{
					if($.fn._GetHtmlName() == "tmp")
					{
						$.fn._GetParam();
						/*
						$.each(ActivexDisplay, function(n, data){
							if(data == $.fn._GetHtmlName())
							{
								// if video player is activex
								if($.cookie('def_video_player') == DEFINE_ACTIVEX)
								{
									$.getScript('/js/activex.js', function() {	
										$.fn._ActiexAppendLive("liveView_Activex");
										$.fn._StartActivex();
									});
								}
								// if video player is quicktime
								else if($.cookie('def_video_player') == DEFINE_QUICKTIME)
								{
									var hasQT = detectQuickTime();
									//alert("tmp:" + hasQT);
									if(hasQT)
										$.fn._AppendQuickTime('liveView_Activex',"640","360");
									else
										$("<p style=\"color:white;text-align:center;margin:30% auto 0px auto;width:85%;height:100%;\">"+$.fn._GetLangStr(LT._quicktime_install_note)+" "+$.fn._GetLangStr(LT._quicktime_download_note)+" <a href=\"http://apple.com/quicktime\" target=\"_blank\" >apple.com</a></p>").appendTo("#liveView_Activex");
								}
								return true;
							}
						});
						*/
					}
					else if($.fn._GetHtmlName() == "fish")
					{
						$.fn._GetParam();
					}
					else if($.fn._GetHtmlName() == "liveView")
					{
						// Hidden fixed and real button to prevent the embed in safari overflows outside scroll area.
						if($.fn._identifyBrowser() == "safari"){
							$("#actviex_fixed").parent().hide();
							$("#actviex_real").parent().hide();
						}
						
						$.fn._GetParam();
						$.fn._GenerateNavigation("admin");
						setInterval($.fn._RunEventThread,1000);
					}
					else if($.fn._GetHtmlName() == "liveView_fish")
					{				
						$.fn._GetParam();
						$.fn._GenerateNavigation("admin");
					}
					else if($.fn._GetHtmlName() == "net_view" || $.fn._GetHtmlName() == "record_video" || $.fn._GetHtmlName() == "browser_sdfile")
					{
						$.fn._GetParam();
					}
					else if($.fn._GetHtmlName() == "img_whitebalance" || $.fn._GetHtmlName() == "img_exposure" || $.fn._GetHtmlName() == "img_color") //////
					{
						if($.fn._identifyOS() == "MacOS")
						{
							$("#smallView_Activex").hide();
							var hasParam = 0;
							$.each(ActivexDisplay, function(n, data){
								if(data == $.fn._GetHtmlName())
								{
									$.fn._ResetJPEG();
									hasParam = 1;
									return true;
								}	
							});
							
							if(hasParam == 0){
								$("#smallview_conf").hide();
								$("#main").css("width","1000px");
							}
							
							$.fn._GetParam();
							$.fn._GenerateNavigation("admin");
							$.fn._GenerateMenu();

							if(($.fn._GetHtmlName() == "img_focus")&&!(Number(model_len) == 2 || Number(model_len) == 4 || Number(model_len) == 10))
								window.location.href = "/www/infor_sys.html";

							if(($.fn._GetHtmlName() == "net_ftp")&&!(Number(model_sd) == 1))
								window.location.href = "/www/infor_sys.html";

							if(($.fn._GetHtmlName() == "record_sd")&&!(Number(model_sd) == 1))
								window.location.href = "/www/infor_sys.html";

							if(($.fn._GetHtmlName() == "event_alarm")&&!(Number(model_alarm) == 1))
								window.location.href = "/www/infor_sys.html";
								

							if(($.fn._GetHtmlName() == "sys_audio")&& (Number(model_audio) == 0))
								window.location.href = "/www/infor_sys.html";

							if(($.fn._GetHtmlName() == "sys_heater")&& (Number(model_mechanism) != 2))
							window.location.href = "/www/infor_sys.html";
						}else{

							$("#smallview_conf_pic").hide();
							$("#activex_area").hide();
							//("#smallview_conf").css("width","452px").css("height","260px");
							$.each(ActivexDisplay, function(n, data){
								if(data == $.fn._GetHtmlName())
								{
									// if video player is activex
									if($.cookie('def_video_player')== DEFINE_ACTIVEX)
									{
										$.getScript('/js/activex.js', function() {	
											$.fn._ActiexAppendSmall("smallView_Activex");
											$.fn._StartActivex();
										});
									}
									// if video player is quicktime
									else if($.cookie('def_video_player') == DEFINE_QUICKTIME)
									{
										var $$ = PluginDetect;
										var hasQT = $$.isMinVersion('QuickTime', '0') >= 0 ? true : false;

										if(hasQT)
											$.fn._AppendQuickTime('smallView_Activex',"452","340");
										else
											$("<p style=\"color:white;text-align:center;margin:30% auto 0px auto;width:85%;height:100%;\">"+$.fn._GetLangStr(LT._quicktime_install_note)+" "+$.fn._GetLangStr(LT._quicktime_download_note)+" <a href=\"http://apple.com/quicktime\" target=\"_blank\" >apple.com</a></p>").appendTo("#smallView_Activex");
									}
									return true;
								}
							});
						
							$.fn._GetParam();
							$.fn._GenerateNavigation("admin");
							$.fn._GenerateMenu();
						}
					}
					else
					{
						var hasParam = 0;
						$.each(ActivexDisplay, function(n, data){
							if(data == $.fn._GetHtmlName())
							{
								$.fn._ResetJPEG();
								hasParam = 1;
								return true;
							}	
						});
						
						if(hasParam == 0){
							$("#smallview_conf").hide();
							$("#main").css("width","1000px");
						}
						
						$.fn._GetParam();
						$.fn._GenerateNavigation("admin");
						$.fn._GenerateMenu();

						if(($.fn._GetHtmlName() == "img_focus")&&!(Number(model_len) == 2 || Number(model_len) == 4 || Number(model_len) == 10))
							window.location.href = "/www/infor_sys.html";

						if(($.fn._GetHtmlName() == "net_ftp")&&!(Number(model_sd) == 1))
							window.location.href = "/www/infor_sys.html";

						if(($.fn._GetHtmlName() == "record_sd")&&!(Number(model_sd) == 1))
							window.location.href = "/www/infor_sys.html";

						if(($.fn._GetHtmlName() == "event_alarm")&&!(Number(model_alarm) == 1))
							window.location.href = "/www/infor_sys.html";
							

						if(($.fn._GetHtmlName() == "sys_audio")&& (Number(model_audio) == 0))
							window.location.href = "/www/infor_sys.html";

						if(($.fn._GetHtmlName() == "sys_heater")&& (Number(model_mechanism) != 2))
							window.location.href = "/www/infor_sys.html";
					}
				}
				else
				{
					if($.fn._GetHtmlName() == "tmp")
					{
						// if video player is activex
						if($.cookie('def_video_player') == DEFINE_ACTIVEX)
						{
							$.getScript('/js/activex.js', function() {	
								$.fn._ActiexAppendLive("liveView_Activex");
								$.fn._StartActivex();
							});
						}
						// if video player is quicktime
						else if($.cookie('def_video_player') == DEFINE_QUICKTIME)
						{
							var hasQT = detectQuickTime();

							if(hasQT)
								$.fn._AppendQuickTime('liveView_Activex',"640","360");
							else
								$("<p style=\"color:red;text-align:center;margin:30% auto 0px auto;width:85%;height:100%;\">"+$.fn._GetLangStr(LT._quicktime_install_note)+" "+$.fn._GetLangStr(LT._quicktime_download_note)+" <a href=\"http://apple.com/quicktime\" target=\"_blank\" >apple.com</a></p>").appendTo("#"+id+"");
						}
					}
					else if($.fn._GetHtmlName() == "fish")
					{
						$.fn._GetParam();
					}
					else if($.fn._GetHtmlName() == "liveView_fish")
					{
						$.fn._GetParam();
						$.fn._GenerateNavigation("guest");
					}
					else
					{
						$.fn._GetParam();
						$.fn._GenerateNavigation("guest");
					
						if($.fn._GetHtmlName() != "liveView")
							window.location.href = "/www/liveView.html";

						setInterval($.fn._RunEventThread,1000);
					}
				}
			}
		});
	};
	
	$.fn._GetLangStr = function(str)
	{
		if(typeof(str) == "undefined")	return "XXXXX";
		return str;
	};

	$.fn._GenerateWarningIcon = function()
	{
		var $smallview_conf_pic = $("#smallview_conf_pic");
		$("<div><img id=\"ImotionImage\" src=\"/css/images/motion_icon.png\" width=\"30\" height=\"30\" style=\"display:none;\"></img></div>").appendTo($smallview_conf_pic);
		$("<div><img id=\"IAlarmImage\" src=\"/css/images/alarm_icon.png\" width=\"30\" height=\"30\" style=\"display:none;\"></img></div>").appendTo($smallview_conf_pic);
	}
	
	$.fn._GenerateNavigation = function(auth)
	{
		var $conf_area = $("#conf_area");
		var $user_area = $("#user_area");
		var live_class, conf_class, logout_class;
		
		//Insert element to target ID
		if(auth == "admin")
		{
			live_class = "conf_inactive";
			conf_class = "conf_inactive";
			logout_class = "conf_inactive";

			if($.fn._GetHtmlName() == "liveView" || $.fn._GetHtmlName() == "liveView_fish")
				live_class = "conf_active";
			else
				conf_class = "conf_active";
		
			if($.fn._GetHtmlName() == "liveView")
			{
				$("<div id=\"Ilive\" class=\""+live_class +"\"><span id=\"Mlive\"></span></div>").appendTo($conf_area);
				$("<div class=\"separation\"><span>|</span></div>").appendTo($conf_area);
				if(dewarp == "on"){
					$("<div id=\"Ifish\" conf=\"/www/liveView_fish\" class=\""+conf_class +"\"><span id=\"Mfish\"></span></div>").appendTo($conf_area);
					$("<div class=\"separation\"><span>|</span></div>").appendTo($conf_area);
				}
				$("<div id=\"Isetup\" conf=\"/www/infor_sys\" class=\""+conf_class +"\"><span id=\"Msetup\"></span></div>").appendTo($conf_area);
				$("<div style=\"cursor:text;\"><span id=\"Muser_level\"></span></div>").appendTo($user_area);
				$("<div class=\"separation\"><span>|</span></div>").appendTo($user_area);
				$("<div id=\"Ilogout\" class=\""+logout_class +"\"><span id=\"Mlogout\"></span></div>").appendTo($user_area);
			}
			else if($.fn._GetHtmlName() == "liveView_fish")
			{
				$("<div id=\"Ilive\" conf=\"/www/liveView\" class=\""+conf_class +"\"><span id=\"Mlive\"></span></div>").appendTo($conf_area);
				$("<div class=\"separation\"><span>|</span></div>").appendTo($conf_area);
				$("<div id=\"Ifish\" class=\""+live_class +"\"><span id=\"Mfish\"></span></div>").appendTo($conf_area);
				$("<div class=\"separation\"><span>|</span></div>").appendTo($conf_area);
				$("<div id=\"Isetup\" conf=\"/www/infor_sys\" class=\""+conf_class +"\"><span id=\"Msetup\"></span></div>").appendTo($conf_area);
				$("<div style=\"cursor:text;\"><span id=\"Muser_level\"></span></div>").appendTo($user_area);
				$("<div class=\"separation\"><span>|</span></div>").appendTo($user_area);
				$("<div id=\"Ilogout\" class=\""+logout_class +"\"><span id=\"Mlogout\"></span></div>").appendTo($user_area);
			}
			else
			{
				$("<div id=\"Ilive\" conf=\"/www/liveView\" class=\""+live_class +"\"><span id=\"Mlive\"></span></div>").appendTo($conf_area);
				$("<div class=\"separation\"><span>|</span></div>").appendTo($conf_area);
				if(dewarp == "on"){
					$("<div id=\"Ifish\" conf=\"/www/liveView_fish\" class=\""+live_class +"\"><span id=\"Mfish\"></span></div>").appendTo($conf_area);
					$("<div class=\"separation\"><span>|</span></div>").appendTo($conf_area);
				}
				$("<div id=\"Isetup\" class=\""+conf_class +"\"><span id=\"Msetup\"></span></div>").appendTo($conf_area);
				$("<div style=\"cursor:text;\"><span id=\"Muser_level\"></span></div>").appendTo($user_area);
				$("<div class=\"separation\"><span>|</span></div>").appendTo($user_area);
				$("<div id=\"Ilogout\" class=\""+logout_class +"\"><span id=\"Mlogout\"></span></div>").appendTo($user_area);
			}

			$("#Muser_level")[0].innerHTML = $.fn._TransLetter($.fn._GetLangStr(LT._User))+":"+LoginID;
			$("#Mlogout")[0].innerHTML = $.fn._TransLetter($.fn._GetLangStr(LT._Logout));
		}
		else
		{
			live_class = "guest_inactive";
			conf_class = "guest_inactive";
			logout_class = "conf_inactive";

			if($.fn._GetHtmlName() == "liveView" || $.fn._GetHtmlName() == "liveView_fish")
				live_class = "conf_active";
			else
				conf_class = "conf_active";
			
			if(dewarp == "on"){
				if($.fn._GetHtmlName() == "liveView"){
					$("<div id=\"Ilive\" class=\""+live_class +"\"><span id=\"Mlive\"></span></div>").appendTo($conf_area);
					$("<div class=\"separation\"><span>|</span></div>").appendTo($conf_area);
					$("<div id=\"Ifish\" conf=\"/www/liveView_fish\" class=\""+logout_class +"\"><span id=\"Mfish\"></span></div>").appendTo($conf_area);
					$("<div class=\"separation\"><span>|</span></div>").appendTo($conf_area);
					$("<div id=\"Isetup\" class=\""+conf_class +"\"><span id=\"Msetup\"></span></div>").appendTo($conf_area);
					$("<div style=\"cursor:text;\"><span id=\"Muser_level\"></span></div>").appendTo($user_area);
					$("<div class=\"separation\"><span>|</span></div>").appendTo($user_area);
					$("<div id=\"Ilogout\" class=\""+logout_class +"\"><span id=\"Mlogout\"></span></div>").appendTo($user_area);
				}
				else
				{
					$("<div id=\"Ilive\" conf=\"/www/liveView\" class=\""+logout_class +"\"><span id=\"Mlive\"></span></div>").appendTo($conf_area);
					$("<div class=\"separation\"><span>|</span></div>").appendTo($conf_area);
					$("<div id=\"Ifish\" class=\""+live_class +"\"><span id=\"Mfish\"></span></div>").appendTo($conf_area);
					$("<div class=\"separation\"><span>|</span></div>").appendTo($conf_area);
					$("<div id=\"Isetup\" class=\""+conf_class +"\"><span id=\"Msetup\"></span></div>").appendTo($conf_area);
					$("<div style=\"cursor:text;\"><span id=\"Muser_level\"></span></div>").appendTo($user_area);
					$("<div class=\"separation\"><span>|</span></div>").appendTo($user_area);
					$("<div id=\"Ilogout\" class=\""+logout_class +"\"><span id=\"Mlogout\"></span></div>").appendTo($user_area);
				}
			}
			else
			{
				$("<div id=\"Ilive\" class=\""+live_class +"\"><span id=\"Mlive\"></span></div>").appendTo($conf_area);
				$("<div class=\"separation\"><span>|</span></div>").appendTo($conf_area);
				$("<div id=\"Isetup\" class=\""+conf_class +"\"><span id=\"Msetup\"></span></div>").appendTo($conf_area);
				$("<div style=\"cursor:text;\"><span id=\"Muser_level\"></span></div>").appendTo($user_area);
				$("<div class=\"separation\"><span>|</span></div>").appendTo($user_area);
				$("<div id=\"Ilogout\" class=\""+logout_class +"\"><span id=\"Mlogout\"></span></div>").appendTo($user_area);
			}	

			$("#Muser_level")[0].innerHTML = $.fn._TransLetter($.fn._GetLangStr(LT._User))+":"+LoginID;
			$("#Mlogout")[0].innerHTML = $.fn._TransLetter($.fn._GetLangStr(LT._Logout));
		}

		//Setup trigger function
		$("#conf_area > div:nth-child(2n+1)").each(function(){
			var target = $(this).attr("conf");
			
			if(target == undefined)
			{
				if($(this).attr("id") == "Ilogout")
				{

				}
			}
			else
			{
				$(this).bind('click',function(){
					window.location.href = target+".html";
				});
			}
		});

		$("#user_area > div:nth-child(2n+1)").each(function(){
			var target = $(this).attr("conf");
			
			if(target == undefined)
			{
				if($(this).attr("id") == "Ilogout")
				{
					$("#Ilogout").bind('click', function(){
						$.ajax({
							type:"GET",
							url:"/cgi-bin/get?",
							cache:false,
							async:false,
							username:LoginID,
				    		password:$.fn._GeneratePD(),
							statusCode: {
				                200: function(data) {
				                },
				                401: function(){
									window.location.reload();
								}
				            }
						});
					});
				}
			}
		});
		
		//Initial Navigation language
		$("#conf_area > div:nth-child(2n+1)").each(function(){
			var target = $(this).children().attr("id");
			
			if(target == "Mlive")					$("#"+target)[0].innerHTML = $.fn._GetLangStr(LT._Live);
			else if(target == "Msetup")				$("#"+target)[0].innerHTML = $.fn._GetLangStr(LT._Configuration);
			else if(target == "Mfish")				$("#"+target)[0].innerHTML = $.fn._GetLangStr(LT._Live_fish);
		});
	};

	$.fn._ReLogin = function()
	{
		$.ajax({
			type:"GET",
			url:"/cgi-bin/get?",
			cache:false,
			async:false,
			username:LoginID,
    		password:$.fn._GeneratePD(),
			statusCode: {
                200: function(data) {
                },
                401: function(){
					window.location.reload();
				}
            }
		});
	};
	
	$.fn._GenerateMenu = function()
	{
		var $Siderbar_menu = $("#siderbar_menu");

		// Generate menu element.
		var $infor_li = $("<li></li>");
			$("<div id=\"infor_sys\" conf=\"infor_sys\" class=\"left-30\"><label id=\"Minfor_sys\"></label></div>").appendTo($infor_li);
		var $infor_ul = $("<ul class=\"accordion\"></ul>");
		$("<div id=\"infor\" class=\"left-30\"><label id=\"Minf\"></label></div>").appendTo($infor_ul);
		$infor_li.appendTo($infor_ul);
		var $img_li = $("<li></li>");
			$("<div id=\"img_codec\" conf=\"img_codec\" class=\"left-30\"><label id=\"Mimg_codec\"></label></div>").appendTo($img_li);
			$("<div id=\"img_exposure\" conf=\"img_exposure\" class=\"left-30\"><label id=\"Mimg_exposure\"></label></div>").appendTo($img_li);
			$("<div id=\"img_whitebalance\" conf=\"img_whitebalance\" class=\"left-30\"><label id=\"Mimg_whitebalance\"></label></div>").appendTo($img_li);
			$("<div id=\"img_color\" conf=\"img_color\" class=\"left-30\"><label id=\"Mimg_color\"></label></div>").appendTo($img_li);

			if(Number(model_len) == 2 || Number(model_len) == 4 || Number(model_len) == 10)
				$("<div id=\"img_focus\" conf=\"img_focus\" class=\"left-30\"><label id=\"Mimg_focus\"></label></div>").appendTo($img_li);
			$("<div id=\"img_smartencoding\" conf=\"img_smartencoding\" class=\"left-30\"><label id=\"Mimg_smartencoding\"></label></div>").appendTo($img_li);
			$("<div id=\"img_privacy\" conf=\"img_privacy\" class=\"left-30\"><label id=\"Mimg_privacy\"></label></div>").appendTo($img_li);
			$("<div id=\"img_roi\" conf=\"img_roi\" class=\"left-30\"><label id=\"Mimg_roi\"></label></div>").appendTo($img_li);
		var $img_ul = $("<ul class=\"accordion\"></ul>");
		$("<div id=\"img\" class=\"left-30\"><label id=\"Mimg\"></label></div>").appendTo($img_ul);
		$img_li.appendTo($img_ul);
		var $net_li = $("<li></li>");
			$("<div id=\"net_general\" conf=\"net_general\" class=\"left-30\"><label id=\"Mnet_general\"></label></div>").appendTo($net_li);
			if(Number(model_sd) == 1)
				$("<div id=\"net_ftp\" conf=\"net_ftp\" class=\"left-30\"><label id=\"Mnet_ftp\"></label></div>").appendTo($net_li);
			$("<div id=\"net_rtsp\" conf=\"net_rtsp\" class=\"left-30\"><label id=\"Mnet_rtsp\"></label></div>").appendTo($net_li);
			$("<div id=\"net_snmp\" conf=\"net_snmp\" class=\"left-30\"><label id=\"Mnet_snmp\"></label></div>").appendTo($net_li);
			$("<div id=\"net_8021x\" conf=\"net_8021x\" class=\"left-30\"><label id=\"Mnet_8021x\"></label></div>").appendTo($net_li);
			$("<div id=\"net_firewall\" conf=\"net_firewall\" class=\"left-30\"><label id=\"Mnet_firewall\"></label></div>").appendTo($net_li);
		var $net_ul = $("<ul class=\"accordion\"></ul>");
		$("<div id=\"net\" class=\"left-30\"><label id=\"Mnet\"></label></div>").appendTo($net_ul);
		$net_li.appendTo($net_ul);
		var $account_li = $("<li></li>");
			$("<div id=\"account\" conf=\"account\" class=\"left-30\"><label id=\"Maccount\"></label></div>").appendTo($account_li);
		var $account_ul = $("<ul class=\"accordion\"></ul>");
		$("<div id=\"acc\" class=\"left-30\"><label id=\"Macc\"></label></div>").appendTo($account_ul);
		$account_li.appendTo($account_ul);
		var $alarm_li = $("<li></li>");
			$("<div id=\"event_motion\" conf=\"event_motion\" class=\"left-30\"><label id=\"Mevent_motion\"></label></div>").appendTo($alarm_li);
			if(Number(model_alarm) == 1)
				$("<div id=\"event_alarm\" conf=\"event_alarm\" class=\"left-30\"><label id=\"Mevent_alarm\"></label></div>").appendTo($alarm_li);
			//$("<div id=\"event_audio\" conf=\"event_audio\" class=\"left-30\"><label id=\"Mevent_audio\"></label></div>").appendTo($alarm_li);
			$("<div id=\"record_smtp\" conf=\"record_smtp\" class=\"left-30\"><label id=\"Mrecord_smtp\"></label></div>").appendTo($alarm_li);
		var $alarm_ul = $("<ul class=\"accordion\"></ul>");
		$("<div id=\"alarm\" class=\"left-30\"><label id=\"Malarm\"></label></div>").appendTo($alarm_ul);
		$alarm_li.appendTo($alarm_ul);
		var $record_li = $("<li></li>");
			$("<div id=\"record_ftp\" conf=\"record_ftp\" class=\"left-30\"><label id=\"Mrecord_ftp\"></label></div>").appendTo($record_li);
			if(Number(model_sd) == 1)
				$("<div id=\"record_sd\" conf=\"record_sd\" class=\"left-30\"><label id=\"Mrecord_sd\"></label></div>").appendTo($record_li);
			$("<div id=\"record_snapshot\" conf=\"record_snapshot\" class=\"left-30\"><label id=\"Mrecord_snapshot\"></label></div>").appendTo($record_li);
		var $record_ul = $("<ul class=\"accordion\"></ul>");
		$("<div id=\"record\" class=\"left-30\"><label id=\"Mrecord\"></label></div>").appendTo($record_ul);
		$record_li.appendTo($record_ul);
		var $sys_li = $("<li></li>");
			$("<div id=\"sys_datetime\" conf=\"sys_datetime\" class=\"left-30\"><label id=\"Msys_datetime\"></label></div>").appendTo($sys_li);
			if(Number(model_audio) != 0)
				$("<div id=\"sys_audio\" conf=\"sys_audio\" class=\"left-30\"><label id=\"Msys_audio\"></label></div>").appendTo($sys_li);
			if(Number(model_mechanism) == 2)
				$("<div id=\"sys_heater\" conf=\"sys_heater\" class=\"left-30\"><label id=\"Msys_heater\"></label></div>").appendTo($sys_li);
			$("<div id=\"sys_firmware\" conf=\"sys_firmware\" class=\"left-30\"><label id=\"Msys_firmware\"></label></div>").appendTo($sys_li);
			$("<div id=\"sys_configure\" conf=\"sys_configure\" class=\"left-30\"><label id=\"Msys_configure\"></label></div>").appendTo($sys_li);
		var $sys_ul = $("<ul class=\"accordion\"></ul>");
		$("<div id=\"sys\" class=\"left-30\"><label id=\"Msys\"></label></div>").appendTo($sys_ul);
		$sys_li.appendTo($sys_ul);
		var $event_li = $("<li></li>");
			$("<div id=\"event_log\" conf=\"event_log\" class=\"left-30\"><label id=\"Mevent_log\"></label></div>").appendTo($event_li);
		var $event_ul = $("<ul class=\"accordion\"></ul>");
		$("<div id=\"event\" class=\"left-30\"><label id=\"Mevent\"></label></div>").appendTo($event_ul);
		$event_li.appendTo($event_ul);

		$infor_ul.appendTo($Siderbar_menu);
		$img_ul.appendTo($Siderbar_menu);
		$net_ul.appendTo($Siderbar_menu);
		$account_ul.appendTo($Siderbar_menu);
		$alarm_ul.appendTo($Siderbar_menu);
		$record_ul.appendTo($Siderbar_menu);
		$sys_ul.appendTo($Siderbar_menu);
		$event_ul.appendTo($Siderbar_menu);

		//Setup trigger function
		$("#siderbar_menu ul div:first-child").click(function(){
			$("#siderbar_menu ul div:first-child").each(function(){
				$(this).removeAttr("show");
				$(this).parent().attr("class","accordion");
			});
			$(this).attr("show","true");
			$(this).parent().attr("class","active_accordion");

			$("#siderbar_menu ul div:first-child").each(function(){
				if(!$(this).attr("show")){
					$(this).siblings().children('div').each(function(){
						$(this).slideUp();
					});
				}else{
					$(this).siblings().children('div').each(function(){
						$(this).slideDown();
					});

					$(this).siblings().attr("class","active_accordion");

					$(this).siblings().children('div').each(function(){
						if($(this).attr('id') == $.fn._GetHtmlName()){
							$(this)
							//.attr("style","color:#79BD28;font-weight:bold;");
							.attr("style","color:rgb(71,84,91);font-weight:bold;");
						}
					});
				}
			});
		});

		$("#siderbar_menu ul li div").each(function(){
			if($.fn._GetHtmlName() == $(this).attr('id'))
			{
				$(this).parent().attr("class","accordion");
				$(this).parent().siblings().attr("show","true");
				$(this).parent().parent().attr("class","active_accordion");

				var target = $(this).parent().siblings().attr('id');
				$("#siderbar_menu ul div#"+target).click();
			}
		});


		$("#siderbar_menu ul li div").click(function(){
			window.location.href = "/www/"+$(this).attr('conf')+".html";
		});


		//Initial menu language
		$("#siderbar_menu ul div label").each(function(){
			var targetID = $(this).attr("id");
			
			if(targetID == "Minf") 							$("#"+targetID)[0].innerHTML = $.fn._GetLangStr(LT._Information);
			else if(targetID == "Mimg") 					$("#"+targetID)[0].innerHTML = $.fn._GetLangStr(LT._Menu_Image);
			else if(targetID == "Mnet") 					$("#"+targetID)[0].innerHTML = $.fn._GetLangStr(LT._Menu_Network);
			else if(targetID == "Macc") 					$("#"+targetID)[0].innerHTML = $.fn._GetLangStr(LT._Account_Management);
			else if(targetID == "Msys") 					$("#"+targetID)[0].innerHTML = $.fn._GetLangStr(LT._Menu_System);
			else if(targetID == "Malarm") 					$("#"+targetID)[0].innerHTML = $.fn._GetLangStr(LT._Menu_Event);
			else if(targetID == "Mrecord") 					$("#"+targetID)[0].innerHTML = $.fn._GetLangStr(LT._Menu_Record);
			else if(targetID == "Mevent") 					$("#"+targetID)[0].innerHTML = $.fn._GetLangStr(LT._Event_log);
		});
		
		$("#siderbar_menu ul li div label").each(function(){
			var targetID = $(this).attr("id");
			
			if(targetID == "Minfor_sys") 					$("#"+targetID)[0].innerHTML = $.fn._GetLangStr(LT._System_Information);
			else if(targetID == "Mimg_codec") 				$("#"+targetID)[0].innerHTML = $.fn._GetLangStr(LT._Codec);
			else if(targetID == "Mimg_exposure") 			$("#"+targetID)[0].innerHTML = $.fn._GetLangStr(LT._Menu_Image_exposure);
			else if(targetID == "Mimg_whitebalance") 		$("#"+targetID)[0].innerHTML = $.fn._GetLangStr(LT._Menu_Image_white_balance);
			else if(targetID == "Mimg_color")				$("#"+targetID)[0].innerHTML = $.fn._GetLangStr(LT._Menu_Image_basic_color);
			else if(targetID == "Mimg_focus") 				$("#"+targetID)[0].innerHTML = $.fn._GetLangStr(LT._Menu_Image_focus);
			else if(targetID == "Mimg_smartencoding") 		$("#"+targetID)[0].innerHTML = $.fn._GetLangStr(LT._Menu_Image_smart_encoding);
			else if(targetID == "Mimg_roi") 				$("#"+targetID)[0].innerHTML = $.fn._GetLangStr(LT._Menu_Image_roi);
			else if(targetID == "Mimg_privacy") 			$("#"+targetID)[0].innerHTML = $.fn._GetLangStr(LT._Menu_Image_privacy);
			else if(targetID == "Mnet_general") 			$("#"+targetID)[0].innerHTML = $.fn._GetLangStr(LT._Menu_Network_ip);
			else if(targetID == "Mnet_ftp") 				$("#"+targetID)[0].innerHTML = $.fn._GetLangStr(LT._FTP);
			else if(targetID == "Mnet_rtsp") 				$("#"+targetID)[0].innerHTML = $.fn._GetLangStr(LT._RTSP);
			else if(targetID == "Mnet_snmp") 				$("#"+targetID)[0].innerHTML = $.fn._GetLangStr(LT._Menu_Network_snmp);
			else if(targetID == "Mnet_8021x") 				$("#"+targetID)[0].innerHTML = $.fn._GetLangStr(LT._Menu_8021x);
			else if(targetID == "Mnet_firewall") 			$("#"+targetID)[0].innerHTML = $.fn._GetLangStr(LT._IP_Filter);
			else if(targetID == "Maccount") 				$("#"+targetID)[0].innerHTML = $.fn._GetLangStr(LT._Account_setting);
			else if(targetID == "Msys_datetime") 			$("#"+targetID)[0].innerHTML = $.fn._GetLangStr(LT._Menu_System_date_time);
			else if(targetID == "Msys_account") 			$("#"+targetID)[0].innerHTML = $.fn._GetLangStr(LT._Menu_System_account);
			else if(targetID == "Msys_audio") 				$("#"+targetID)[0].innerHTML = $.fn._GetLangStr(LT._Menu_System_audio);
			else if(targetID == "Msys_heater") 				$("#"+targetID)[0].innerHTML = $.fn._GetLangStr(LT._Heater);
			else if(targetID == "Msys_firmware") 			$("#"+targetID)[0].innerHTML = $.fn._GetLangStr(LT._Menu_System_firmware);
			else if(targetID == "Msys_configure") 			$("#"+targetID)[0].innerHTML = $.fn._GetLangStr(LT._Initialize);
			else if(targetID == "Mevent_motion") 			$("#"+targetID)[0].innerHTML = $.fn._GetLangStr(LT._Menu_Event_motion_detection);
			else if(targetID == "Mevent_alarm") 			$("#"+targetID)[0].innerHTML = $.fn._GetLangStr(LT._Alarm_in_out);
			else if(targetID == "Mrecord_ftp") 				$("#"+targetID)[0].innerHTML = $.fn._GetLangStr(LT._Menu_Record_ftp);
			else if(targetID == "Mrecord_smtp") 			$("#"+targetID)[0].innerHTML = $.fn._GetLangStr(LT._Email_Notification);
			else if(targetID == "Mrecord_sd") 				$("#"+targetID)[0].innerHTML = $.fn._GetLangStr(LT._Menu_Record_sd);
			else if(targetID == "Mrecord_snapshot")         $("#"+targetID)[0].innerHTML = $.fn._GetLangStr(LT._Menu_SD_playback);
			else if(targetID == "Mevent_log") 				$("#"+targetID)[0].innerHTML = $.fn._GetLangStr(LT._Menu_System_systemlog);
			else if(targetID == "Mevent_audio") 			$("#"+targetID)[0].innerHTML = $.fn._GetLangStr(LT._audio_detection);
		});
	};
	
	$.fn._AutoAdjust = function()
	{
		var browser_hei = $(window).height();
		var logo_area_hei = $("#logo_area").height();
		var conf_header_hei = $("#infor_area").height();
		var main_hei = (browser_hei-logo_area_hei-conf_header_hei-25);
		
		if($.fn._GetHtmlName()!= "liveView")
		{
			fix_content_hei = $("#fix_content").height();

			if(fix_content_hei >= main_hei)
			{
				if(fix_content_hei <= 500)
					$("#fix_content").css("height",500);
				else
					$("#fix_content").css("height",fix_content_hei);
			}
			else
			{
				if(main_hei <= 500)
					$("#fix_content").css("height",500);
				else
					$("#fix_content").css("height",main_hei);
			}

			if(fix_content_hei >= 780)
				fix_content_hei = 720;
		}
		else
		{
			fix_content_hei = $("#tmp_frame").height()+300;
			$("#fix_content").css("height",main_hei);
		}
		
		$(window).resize(function(){
			var browser_hei = $(window).height();
			var logo_area_hei = $("#logo_area").height();
			var conf_header_hei = $("#conf_header").height();
			var main_hei = (browser_hei-logo_area_hei-conf_header_hei-25);

			if(fix_content_hei >= main_hei)
			{
				if(fix_content_hei <= 500)
					$("#fix_content").css("height",500);
				else
					$("#fix_content").css("height",fix_content_hei);
			}
			else
			{
				if(main_hei <= 500)
					$("#fix_content").css("height",500);
				else
					$("#fix_content").css("height",main_hei);
			}
		});
		
		// add tooltip message
		$("#ImotionImage")
		.attr("rel","tooltip")
		.attr("title",$.fn._GetLangStr(LT._Motion));
		
		$("#IAlarmImage")
		.attr("rel","tooltip")
		.attr("title",$.fn._GetLangStr(LT._Alarm));
		
		$("#lang_icon")
		.attr("style","white-space: nowrap;cursor:text;")
		.attr("rel","tooltip")
		.attr("title",$.fn._GetLangStr(LT._Language));

		$("#actviex_snapshot")
		.attr("style","white-space: nowrap;")
		.attr("rel","tooltip")
		.attr("title",$.fn._GetLangStr(LT._Snapshot));

		$("#actviex_fixed")
		.attr("style","white-space: nowrap;")
		.attr("rel","tooltip")
		.attr("title",$.fn._GetLangStr(LT._Fixed));

		$("#actviex_real")
		.attr("style","white-space: nowrap;")
		.attr("rel","tooltip")
		.attr("title",$.fn._GetLangStr(LT._Real));

		$("#actviex_fullscreen")
		.attr("style","white-space: nowrap;")
		.attr("rel","tooltip")
		.attr("title",$.fn._GetLangStr(LT._Full_Screen));

		$("#IMic")
		.attr("style","white-space: nowrap;")
		.attr("rel","tooltip")
		.attr("title",$.fn._GetLangStr(LT._Audio_In));

		$("#ISpeaker")
		.attr("style","white-space: nowrap;")
		.attr("rel","tooltip")
		.attr("title",$.fn._GetLangStr(LT._Audio_Out));

		$("#video_player_icon")
		.attr("style","white-space: nowrap;cursor:text;")
		.attr("rel","tooltip")
		.attr("title",$.fn._GetLangStr(LT._player));

		$("#Irec")
		.attr("style","white-space: nowrap;")
		.attr("rel","tooltip")
		.attr("title",$.fn._GetLangStr(LT._Manual_Recording));

		$("#activex_fisheye")
		.attr("style","white-space: nowrap;")
		.attr("rel","tooltip")
		.attr("title",$.fn._GetLangStr(LT._Fisheye));

		$("#activex_panaroma")
		.attr("style","white-space: nowrap;")
		.attr("rel","tooltip")
		.attr("title",$.fn._GetLangStr(LT._Panaroma));

		$("#activex_quad")
		.attr("style","white-space: nowrap;")
		.attr("rel","tooltip")
		.attr("title",$.fn._GetLangStr(LT._Quad));

		$("#activex_fview1")
		.attr("style","white-space: nowrap;")
		.attr("rel","tooltip")
		.attr("title",$.fn._GetLangStr(LT._Fish_view1));

		$("#activex_fview2")
		.attr("style","white-space: nowrap;")
		.attr("rel","tooltip")
		.attr("title",$.fn._GetLangStr(LT._Fish_view2));

		$("#activex_fview3")
		.attr("style","white-space: nowrap;")
		.attr("rel","tooltip")
		.attr("title",$.fn._GetLangStr(LT._Fish_view3));

		$("#activex_fview4")
		.attr("style","white-space: nowrap;")
		.attr("rel","tooltip")
		.attr("title",$.fn._GetLangStr(LT._Fish_view4));

		$("#activex_fulscren")
		.attr("style","white-space: nowrap;")
		.attr("rel","tooltip")
		.attr("title",$.fn._GetLangStr(LT._Full_Screen));

		$("#activex_correction")
		.attr("style","white-space: nowrap;")
		.attr("rel","tooltip")
		.attr("title",$.fn._GetLangStr(LT._Setting));
		
		$("#product_name").each(function(){
			$(this)[0].innerHTML = "Megapixel Network Camera";
		});

		$("#Mlive").attr("style","margin:0px 0px 0px 20px");
		$("#Mlogout").attr("style","margin:0px 20px 0px 0px");

		//Dynamic adjust fildset label width
		$("#main").each(function(){
			var def_width = 0;
			$(this).children("div").each(function(){

				if($(this).attr("class") == "content_title"){
				
				} else if($(this).attr("class") == "content_slider"){
					var len = $(this).children(".content_slider_div").children("label").text().length;
					def_width = len > def_width ? def_width = len: def_width = def_width;
					
				} else {	
					var len = $(this).children("label").text().length;
					def_width = len > def_width ? def_width = len: def_width = def_width;
				}
			});

			//console.log("before:"+def_width);
			if(def_width <= 16)
				def_width = 16;
	
			//console.log("after:"+def_width);
			$(this).children("div").each(function(){

				if($(this).attr("class") == "content_title"){
				
				} else {
					if($(this).attr("class") == "content_slider")
						$(this).children(".content_slider_div").css("width",def_width*7.5).css("text-align","right");
					else
						$(this).children("label").css("width",def_width*7.5).css("text-align","right");

					if($.cookie('def_lang') == DEFINE_LANGUAGE_JAPANESE){
						if($(this).attr("class") == "content_slider")
							$(this).children(".content_slider_div").css("width",def_width*11.0).css("text-align","right");
						else{
							if($.fn._GetHtmlName() == "net_snmp" || $.fn._GetHtmlName() == "net_rtsp"){
								$(this).children("label").css("width",def_width*13.0).css("text-align","right");
							}else
								$(this).children("label").css("width",def_width*11.0).css("text-align","right");
						}					
					}
					else if($.cookie('def_lang') == DEFINE_LANGUAGE_SD_CHINESE || $.cookie('def_lang') == DEFINE_LANGUAGE_TL_CHINESE){
						if($(this).attr("class") == "content_slider")
							$(this).children(".content_slider_div").css("width",def_width*10.0).css("text-align","right");
						else
							$(this).children("label").css("width",def_width*10.0).css("text-align","right");
					}
				}
			});
		});
	};

	$.fn._InitialSettingElement = function()
	{
		var stat, final = 0, len = 0, tmp;
		$.each(ConfButtonState, function(list, data){
			$.each(data, function(n, name){
				if(n == 0 && name == $.fn._GetHtmlName()){
					final = list;
					return false;
				}
			});
			
		});

		$.each(ConfButtonState, function(list,data){
			if(list == final){
				$.each(data, function(n, name){
					if(n == 0)
						return true;
					else
						stat = name;
				});
			}
		});

		//console.log(stat);
		tmp = stat.split("&");
		$.each(tmp, function(n){
			if(n == 0){
				len = tmp[n].indexOf('=');
				if(tmp[n].slice(len+1,tmp[n].length) == "yes"){
					$("<div style=\"float:left;\"><input type=\"button\" id=\"Icon_setting_save_pic\"></div>").appendTo(".content_setting");
					$("#Icon_setting_save_pic").val($.fn._GetLangStr(LT._Save));
				}
					
			} else if(n == 1){
				len = tmp[n].indexOf('=');
				if(tmp[n].slice(len+1,tmp[n].length) == "yes"){
					$("<div><input type=\"button\" id=\"Icon_setting_default_pic\"></div>").appendTo(".content_setting");
					$("#Icon_setting_default_pic").val($.fn._GetLangStr(LT._Reset_to_Default));
				}
			} 
		});
	};
	
	$.fn._ActiexAppendLive = function(id)
	{
		console.log("Ver: " + $.fn._identifyIeVersion());
		if($.fn._identifyIeVersion() == "el"){
			console.log("check IE11");
			$("<OBJECT "+"id='VideoPlugin' "+"name='VideoPlugin' "+"classid='clsid:"+CLSID+"' "+ "scrolling='no' "+ "scroll='no' "+
				"style='width:640px;height:360px;position:absolute;z-index:1;'>"+"</OBJECT>").appendTo("#"+id+"");
		}else{
			console.log("check other IE version");
			$("<object classid=\"clsid:"+CLSID+"\" id=\"VideoPlugin\" codebase=\"/MessoaPlayer.cab#version="+OCX_VER+"\" scrolling=\"no\" scroll=\"no\" name=\"view\" style=\"position:absolute;z-index:1;width:640px; height:360px;\" type=\"application/x-mpp-plugin\">"+
					  "<embed TYPE=\"application/x-mpp-plugin\" name=\"VideoPlugin\" width=\"640px\" height=\"360px\" CLSID=\"{"+CLSID+"}\"></embed></object>").appendTo("#"+id+"");
		}
	};

	$.fn._ActiexAppendFishLive = function(id)
	{
		if($.fn._identifyBrowser() == "msie"){
			$("<OBJECT "+"id='VideoPluginF' "+"name='VideoPluginF' "+"classid='clsid:"+CLSIDF+"' "+ "scrolling='no' "+ "scroll='no' "+
				"style='width:640px;height:480px;position:absolute;z-index:1001:display:none;'>"+"</OBJECT>").appendTo("#"+id+"");
		}else{
			$("<OBJECT>"+"<embed TYPE=\"application/x-mpp-plugin\" id=\"VideoPluginF\" name=\"VideoPluginF\" width=\"640px\" height=\"480px\" CLSID=\"{"+CLSIDF+"}\"></embed>"+"</OBJECT>").appendTo("#"+id+"");
		}
	
	};

	$.fn._ActiexAppendSmall = function(id)
	{

	    // IE11
		if($.fn._identifyIeVersion() == "el"){
			$("<OBJECT "+"id='VideoPlugin' "+"name='view' "+"classid='clsid:"+CLSID+"' "+ "scrolling='no' "+ "scroll='no' "+
				"style='width:452px;height:340px;position:absolute;z-index:1;'>"+"</OBJECT>").appendTo("#"+id+"");
		}else
		{
			$("<object classid=\"clsid:"+CLSID+"\" id=\"VideoPlugin\" codebase=\"/MessoaPlayer.cab#version="+OCX_VER+"\" scrolling=\"no\" scroll=\"no\" name=\"view\" style=\"position:absolute;z-index:1;width:452px; height:340px;\" type=\"application/x-mpp-plugin\">"+
				  "<embed TYPE=\"application/x-mpp-plugin\" name=\"VideoPlugin\" width=\"640px\" height=\"360px\" CLSID=\"{"+CLSID+"}\"></embed></object>").appendTo("#"+id+"");
		}
		
	};

	$.fn._AppendJPEG = function(id,width,height){
		$("<img id=\"img_"+id+"\" width=\""+width+"\" height=\""+height+"\" src=\""+$.fn._ParserHeader()+"//"+$.fn._ParserIP()+$.fn._ParserPort()+"/"+$.fn._AddStamp('fastjpeg')+"\"></img>").appendTo("#"+id+"");

		setInterval(function(){
			$("#img_"+id+"").attr('src',""+$.fn._ParserHeader()+"//"+$.fn._ParserIP()+$.fn._ParserPort()+"/"+$.fn._AddStamp('fastjpeg')+"");
		},450);
				
	};

	$.fn._AppendQuickTime = function(id,width,height){
		 Quicktime = $.ajax({
			url:'/cgi-bin/get?'+activex_param[0],
			dataType:'json',
			cache:false,
			success:function(data){
				/* try remove memory leak by releasing the circular reference. */				
				if (Quicktime!== null) {
					Quicktime.onreadystatechange = $.fn._ParserActiexParam(data);
					Quicktime.abort();
					Quicktime = null;
				}
			},
			error:function(xhr, textStatus, errorThrown){
			},
			complete:function(){
				$(""+QT_GenerateOBJECTText('/default.mp4', width, height, '', 'id',	'Iquicktime', 'autoplay', 'true', 'type', 'video/quicktime', 'controller', 'false', 'cache', 'false', 'scale', 'tofit', 'qtsrc', "rtsp://"+$.fn._ParserSystemAddr()+":"+$.fn._ParserRtspPort()+"/"+stream1)+"").appendTo("#"+id+"");
			}
		});	
	};

	$.fn._AddStamp = function(url)
	{
		var surl = url;
		if (surl.search(/\?/) < 0) {
			surl = surl + "?";
		} else {
			surl = surl + "&";
		}
		surl = surl + "stamp=" + Math.random();

		return surl;
	};

	$.fn._ResetJPEG = function()
	{
		var cu_id, p1, p2, p3, p4, tmp;
		var profile, pri_res , pri_codec , sec_res , sec_codec, len = 0;
		var pri_len = 0,pri_width = 0,pri_height = 0,sec_len = 0,sec_width = 0,sec_height = 0;
		
		$.ajax({
			url:'/cgi-bin/get?'+jpeg_param[0],
			dataType:'json',
			cache:false,
			success:function(data){
				$.each(data, function(param,value){
					if(param == "image.encode.current_profile_id")
						cu_id = value[1];
					else if(param == "image.encode.profile1.encode")
						p1 = value[1];
					else if(param == "image.encode.profile2.encode")
						p2 = value[1];
					else if(param == "image.encode.profile3.encode")
						p3 = value[1];
					else if(param == "image.encode.profile4.encode")
						p4 = value[1];
						
				});
			},
			error:function(xhr, textStatus, errorThrown){
			},
			complete:function(){
				if(cu_id == 1)
					tmp = p1;
				else if(cu_id == 2)
					tmp = p2;
				else if(cu_id == 3)
					tmp = p3;
				else if(cu_id == 4)
					tmp = p4;

				profile = tmp.split(',');
				$.each(profile, function(n){
					if(n == 0){
						len = profile[n].indexOf('/');
						pri_res = profile[n].slice(0,len);
						pri_codec = profile[n].slice(len+1,profile[n].length);		
					} else if(n == 1){
						len = profile[n].indexOf('/');
						sec_res = profile[n].slice(0,len);
						sec_codec = profile[n].slice(len+1,profile[n].length);
					}
				});

				pri_len = pri_res.indexOf('x');
				pri_width = pri_res.slice(0,pri_len);
				pri_height = pri_res.slice(pri_len+1,pri_res.length);

				if(Math.floor(Number(pri_width)*100 / pri_height) == 133){
					JPEG_H = 336;
				}

				cu_id = null, p1 = null, p2 = null, p3 = null, p4 = null, tmp = null;
				profile = null, pri_res = null, pri_codec = null, sec_res = null, sec_codec = null, len = null;
				pri_len = null, pri_width = null, pri_height = null, sec_len = null, sec_width = null,sec_height = null;
				$.fn._AppendJPEG("activex_area", JPEG_W, JPEG_H);
			}
		});
	}

	$.fn._StartActivexF = function(frameMode, downUp, leftRight, keepRatio, centerX, centerY, centerRadius)
	{

		ActivexF = $.ajax({
			url:'/cgi-bin/get?'+activex_param[0],
			dataType:'json',
			cache:false,
			success:function(data){
				/* try remove memory leak by releasing the circular reference. */				
				if (ActivexF!== null) {
					ActivexF.onreadystatechange = $.fn._ParserActiexParam(data);
					ActivexF.abort();
					ActivexF = null;
				}
			},
			error:function(xhr, textStatus, errorThrown){
			},
			
			complete:function(){
				if($.fn._QueryPluginF()==false)
				{	
					var userPasswd;
					$.each(user_account, function(n){
						if(user_account[n] == LoginID){
							userPasswd = user_passwd[n];
						}
					});
					console.log("check user_account:" + LoginID + " & userPasswd:" + userPasswd);
					
					if($.fn._identifyBrowser() == "msie")
						var ActivexFPlayerObject = $("#VideoPluginF").get(0);
					else if($.fn._identifyBrowser() == "chrome" || $.fn._identifyBrowser() == "firefox" || $.fn._identifyBrowser() == "opera" || $.fn._identifyBrowser() == "safari")
						var ActivexFPlayerObject = $("embed[name=VideoPluginF]").get(0);
					ActivexFPlayerObject.Close();
					//console.log("rtsp://"+$.fn._ParserSystemAddr()+":"+$.fn._ParserRtspPort()+"/stream1");

					ActivexFPlayerObject.FramesetMode=frameMode;
					ActivexFPlayerObject.LensAngle=160;
					ActivexFPlayerObject.ShowToolbar(false);
					ActivexFPlayerObject.DownUpMirror=downUp;
					ActivexFPlayerObject.LeftRightMirror=leftRight;
					ActivexFPlayerObject.KeepRatio=keepRatio;
					ActivexFPlayerObject.CenterX=centerX;
					ActivexFPlayerObject.CenterY=centerY;
					ActivexFPlayerObject.CenterRadius=centerRadius;
                    ActivexFPlayerObject.HTTPUsername=LoginID;
                    ActivexFPlayerObject.HTTPPassword=userPasswd;
                    ActivexFPlayerObject.HTTPPort=http_port;
					ActivexFPlayerObject.Open();
					ActivexFPlayerObject.OpenByRTSP("rtsp://"+$.fn._ParserSystemAddr()+":"+$.fn._ParserRtspPort()+"/stream1",rtsp_account,rtsp_password,ActivexFUseTCP,false,false,'');					
				}
			}
		});
	};

	$.fn._QueryPluginF = function()
	{
		var updateF = false;
		var api_tmp, cur_tmp;
		var api_array = new Array();
		var cur_array = new Array();
		if($.fn._identifyBrowser() == "msie")
			var ActivexFPlayerObject = $("#VideoPluginF").get(0);
		else if($.fn._identifyBrowser() == "chrome" || $.fn._identifyBrowser() == "firefox" || $.fn._identifyBrowser() == "opera" || $.fn._identifyBrowser() == "safari")
			var ActivexFPlayerObject = $("embed[name=VideoPluginF]").get(0);

		if($.fn._identifyBrowser() == "msie" || $.fn._identifyBrowser() == "chrome" || $.fn._identifyBrowser() == "firefox" || $.fn._identifyBrowser() == "opera" || $.fn._identifyBrowser() == "safari")
		{
			try{
				var apiVersion = "";
				var curVersion = OCX_VERF.replace(/\,/g, '.');
				apiVersion = ActivexFPlayerObject.OcxVersion;
				if(apiVersion === undefined)
				{
					if(!window.confirm(LT._msi_warning_confirm))
					{
						return true;
					}						
				}

                apiVersion = apiVersion.replace(/\,/g, '.');
                console.log("Dewarp:"+apiVersion);
                console.log("Cur:"+curVersion);

				api_tmp = apiVersion.split('.');
				$.each(api_tmp, function(n){
					api_array[n] = api_tmp[n];
				});

				cur_tmp = curVersion.split('.');
				$.each(api_tmp, function(n){
					cur_array[n] = cur_tmp[n];
				});
				
                for (i=0; i<4; i=i+1)
                {
                    if(parseInt(api_array[i]) > parseInt(cur_array[i]))
                        break;
                    if(parseInt(api_array[i]) < parseInt(cur_array[i]))
                    {
                        updateF = true;
                        location.href = download_msi;
                        setTimeout($.fn._PopWindow,1000);
                        break;
                    }
                }

			} catch(ex){ // catch the exception
				updateF = true;
				location.href = download_msi;
				setTimeout($.fn._PopWindow,1000);
			}
		}
		api_array = null, cur_array = null;
		return updateF;
	};

	$.fn._StartActivex = function()
	{
		Activex = $.ajax({
			url:'/cgi-bin/get?'+activex_param[0],
			dataType:'json',
			cache:false,
			success:function(data){
				/* try remove memory leak by releasing the circular reference. */				
				if (Activex!== null) {
					Activex.onreadystatechange = $.fn._ParserActiexParam(data);
					Activex.abort();
					Activex = null;
				}
			},
			error:function(xhr, textStatus, errorThrown){
			},
			
			complete:function(){
					$.fn._QueryPlugin();			
			}
		});
	};
	/* 
	* Excuted plugin.
	*
	*/
	$.fn._QueryPlugin = function()
	{
		var api_tmp, cur_tmp;
		var api_array = new Array();
		var cur_array = new Array();
		if($.fn._identifyBrowser() == "msie")
			var ActivexPlayerObject = $("#VideoPlugin").get(0);
		else if($.fn._identifyBrowser() == "chrome" || $.fn._identifyBrowser() == "firefox" || $.fn._identifyBrowser() == "opera" || $.fn._identifyBrowser() == "safari")
			var ActivexPlayerObject = $("embed[name=VideoPlugin]").get(0);

		if($.fn._identifyBrowser() == "chrome" || $.fn._identifyBrowser() == "firefox" || $.fn._identifyBrowser() == "opera" || $.fn._identifyBrowser() == "safari" || $.fn._identifyIeVersion() == "el")
		{
			//console.log("Get curVersion");
			var apiVersion = "";

			try{
				apiVersion = ActivexPlayerObject.GetVersion();
			} catch(ex){ // catch the exception
				if(!window.confirm(LT._msi_warning_confirm)){
					return true;
				}else{
					location.href = download_msi;
					setTimeout($.fn._PopWindow,1000);
					return false;
				}			
			}
		
			try{
				
				var curVersion = OCX_VER.replace(/\,/g, '.');

				api_tmp = apiVersion.split('.');
				$.each(api_tmp, function(n){
					api_array[n] = api_tmp[n];
				});

				cur_tmp = curVersion.split('.');
				$.each(api_tmp, function(n){
					cur_array[n] = cur_tmp[n];
				});

				if(parseInt(api_array[0]) <= parseInt(cur_array[0]))
				{
					if(parseInt(api_array[1]) <= parseInt(cur_array[1]))
					{
						if(parseInt(api_array[2]) <= parseInt(cur_array[2]))
						{
							if(parseInt(api_array[3]) < parseInt(cur_array[3]))
							{
								location.href = download_msi;
								setTimeout($.fn._PopWindow,1000);
								api_array = null, cur_array = null;
							}
							else
							{
								query_thread = setInterval($.fn._QueryObject,1000);
								api_array = null, cur_array = null;
							}
						}
						else
						{
							query_thread = setInterval($.fn._QueryObject,1000);
							api_array = null, cur_array = null;
						}
					}
					else
					{
						query_thread = setInterval($.fn._QueryObject,1000);
						api_array = null, cur_array = null;
					}
				}
				else
				{
					query_thread = setInterval($.fn._QueryObject,1000);
					api_array = null, cur_array = null;
				}

			} catch(ex){ // catch the exception
				location.href = download_msi;
				setTimeout($.fn._PopWindow,1000);
				
			}
		}
		else
			query_thread = setInterval($.fn._QueryObject,1000);
	};
	/* 
	* Query the activex object has download done or not, if not continue query until object complete download.
	*
	*/
	$.fn._QueryObject = function()
	{
		var status = false;
		try{
			if($.fn._identifyBrowser() == "msie")
				var ActivexPlayerObject = $("#VideoPlugin").get(0);
			else if($.fn._identifyBrowser() == "chrome" || $.fn._identifyBrowser() == "firefox" || $.fn._identifyBrowser() == "opera" || $.fn._identifyBrowser() == "safari")
				var ActivexPlayerObject = $("embed[name=VideoPlugin]").get(0);

			if(rtsp_authent == "on")
			{
				status = ActivexPlayerObject.Open("rtsp://"+rtsp_account+":"+rtsp_password+"@"+$.fn._ParserSystemAddr()+":"+$.fn._ParserRtspPort()+"/"+stream1, PROJECT);
			}
			else if(rtsp_authent == "off")
			{
				status = ActivexPlayerObject.Open("rtsp://"+$.fn._ParserSystemAddr()+":"+$.fn._ParserRtspPort()+"/"+stream1, PROJECT);
			}
			
		}catch(e){ // catch the exception

	  	}
		
		if(status)
		{
			clearInterval(query_thread);
			$.fn._PlayActivex();
		}
	};
	/* 
	*Pop up the warning message to mention users need to re-open web browser window.
	* 
	*/
	$.fn._PopWindow = function()
	{
		alert($.fn._GetLangStr(LT._msi_warning));
	};

	$.fn._PlayActivex = function()
	{
		if($.fn._identifyBrowser() == "msie")
			var ActivexPlayerObject = $("#VideoPlugin").get(0);
		else if($.fn._identifyBrowser() == "chrome" || $.fn._identifyBrowser() == "firefox" || $.fn._identifyBrowser() == "opera" || $.fn._identifyBrowser() == "safari")
			var ActivexPlayerObject = $("embed[name=VideoPlugin]").get(0);

		ActivexPlayerObject.StopStream(); 
		ActivexPlayerObject.Init();

		if(rtsp_authent == "on")
		{
			ActivexPlayerObject.Open("rtsp://"+rtsp_account+":"+rtsp_password+"@"+$.fn._ParserSystemAddr()+":"+$.fn._ParserRtspPort()+"/"+stream1, PROJECT);
		}
		else if(rtsp_authent == "off")
		{
			ActivexPlayerObject.Open("rtsp://"+$.fn._ParserSystemAddr()+":"+$.fn._ParserRtspPort()+"/"+stream1, PROJECT);
		}
		

		ActivexPlayerObject.SetStreamUsingUDP(false);
		ActivexPlayerObject.PlayStream();				

		if(model_audio == 2 || model_audio == 3){
			if(audio_en == "on")
				ActivexPlayerObject.AudioOutEnable($.fn._ParserIP());
		}
	};
	
	$.fn._ParserActiexParam = function(src)
	{
		$.each(src, function(parameter, value){
			if (parameter == "network.rtsp.stream_1.url"){
				stream1 = value[1];
			} else if (parameter == "network.rtsp.stream_2.url"){
				stream2 = value[1];
			} else if (parameter == "network.rtsp.stream_3.url"){
				stream3 = value[1];
			} else if (parameter == "system.audio_out.enable"){
				audio_en = value[1];
			} else if (parameter == "network.rtsp.login_id"){
				rtsp_account = value[1];
			} else if (parameter == "network.rtsp.port"){
				rtsp_port = value[1];
			} else if (parameter == "network.rtsp.natport"){
				rtsp_natport = value[1];
			} else if (parameter == "network.rtsp.password"){
				rtsp_password = value[1];
			} else if (parameter == "network.rtsp.authentication"){
				rtsp_authent = value[1];
			} 
		});
	};
	
	$.fn._ParserIP = function()
	{
		var URL = new Array(), IP = new Array();
		var parser_ip = null, len = 0;
		URL = document.URL.split('//');
		IP = URL[1].split('/');
		
		//Judgment ip address is ipv4 or ipv6.
		len = IP[0].indexOf(']');
		if(len == -1) // IPv4
		{
			len = IP[0].indexOf(':');
			
			if(len == -1)
				parser_ip = IP[0];
			else
				parser_ip = IP[0].slice(0,len);
		}
		else  // IPv6
		{
			parser_ip = IP[0].slice(0,len+1);
		}

		URL = null, IP = null;
		return parser_ip;
	};

	$.fn._ParserHeader = function()
	{
		var URL = new Array();
		var parer_header = null;
		URL = document.URL.split('//');
		parer_header = URL[0];

		URL = null;
		return parer_header;
	};

	$.fn._ParserPort = function()
	{
		var parser_port = null;
		var URL = new Array(), IP = new Array();
		var len = 0;
		URL = document.URL.split('//');
		IP = URL[1].split('/');
		
		//Judgment ip address is ipv4 or ipv6.
		len = IP[0].indexOf(']');
		if(len == -1) // IPv4
		{
			len = IP[0].indexOf(':');
			
			if(len != -1)
				parser_port = IP[0].slice(len+1);
		}
		else  // IPv6
		{
			parser_port = IP[0].slice(len+1);
		}

		URL = null, IP = null;	
		
		if (parser_port == null)
		{ // use system http/https port number
		if($.fn._ParserHeader() == "http:")
			parser_port = http_port;
		else if($.fn._ParserHeader() == "https:")
			parser_port = https_port;
		}
		return ":"+parser_port;
	};

	$.fn._ParserRtspPort = function()
	{
		var parser_rtsp_port = null;
		var URL = new Array(), url_ip = new Array();
		var parser_ip = null, len = 0;
		URL = document.URL.split('//');
		url_ip = URL[1].split('/');

		// Get the system config ipv4
		var sys_ip = new Array();
		sys_ip = system_ipv4.split('/');

		//Judgment ip address of URL is ipv4 or ipv6.
		len = url_ip[0].indexOf(']');
		if(len == -1) // IPv4
		{
			len = url_ip[0].indexOf(':');
			
			if(len == -1)
				parser_ip = url_ip[0];
			else
				parser_ip = url_ip[0].slice(0,len);
		}
		else  // IPv6
		{
		  	parser_ip = sys_ip[0];			
			//parser_ip = IP[0].slice(0,len+1); // cause rtsp don't support ipv6 address, replace with system ipv4
		}

		//Judgment RTSP port
		if(parser_ip == sys_ip[0]) // use original RTSP port
		{
			parser_rtsp_port = rtsp_port;
			ActivexFUseTCP = false;
		}
		else  // use NAT RTSP port
		{
			parser_rtsp_port = rtsp_natport;
			ActivexFUseTCP = true;
		}

		//console.log("rtsp_port="+rtsp_port+", rtsp_natport="+ rtsp_natport);
		//console.log("IPCAM="+sys_ip[0]+", URL="+ parser_ip+", port="+parser_rtsp_port);

		return parser_rtsp_port;
	}
	
	// Add workaround to support rtsp play ipv6 address.
	$.fn._ParserSystemAddr = function()
	{
		var URL = new Array(), IP = new Array();
		var parser_ip = null, len = 0;
		URL = document.URL.split('//');
		IP = URL[1].split('/');
		
		// Get the system config ipv4
		var par = new Array();
		par = system_ipv4.split('/');
		
		//Judgment ip address is ipv4 or ipv6.
		len = IP[0].indexOf(']');
		if(len == -1) // IPv4
		{
			len = IP[0].indexOf(':');
			
			if(len == -1)
				parser_ip = IP[0];
			else
				parser_ip = IP[0].slice(0,len);
		}
		else  // IPv6
		{
		  parser_ip = par[0];			
			//parser_ip = IP[0].slice(0,len+1); // cause rtsp don't support ipv6 address, replace with system ipv4
		}

		par = null;
		URL = null, IP = null;
		return parser_ip;		
	};

	$.fn._InitialOptionLang = function(oId)
	{
		$("#"+oId).children().each(function(){
			if($(this).text() == 'NTSC')					$(this).text($.fn._GetLangStr(LT._NTSC));
			else if($(this).text() == 'PAL')				$(this).text($.fn._GetLangStr(LT._PAL));
			else if($(this).text() == 'ON')					$(this).text($.fn._GetLangStr(LT._ON));
			else if($(this).text() == 'OFF')				$(this).text($.fn._GetLangStr(LT._OFF));
			else if($(this).text() == 'Custom')				$(this).text($.fn._GetLangStr(LT._Custom));
			else if($(this).text() == 'High')				$(this).text($.fn._GetLangStr(LT._High));
			else if($(this).text() == 'Mid')				$(this).text($.fn._GetLangStr(LT._Mid));
			else if($(this).text() == 'Low')				$(this).text($.fn._GetLangStr(LT._Low));
			else if($(this).text() == 'Medium')				$(this).text($.fn._GetLangStr(LT._Medium));
			else if($(this).text() == 'Profile1')			$(this).text($.fn._GetLangStr(LT._Profile)+"1");
			else if($(this).text() == 'Profile2')			$(this).text($.fn._GetLangStr(LT._Profile)+"2");
			else if($(this).text() == 'Profile3')			$(this).text($.fn._GetLangStr(LT._Profile)+"3");
			else if($(this).text() == 'Profile4')			$(this).text($.fn._GetLangStr(LT._Profile)+"4");
			else if($(this).text() == 'Profile5')			$(this).text($.fn._GetLangStr(LT._Profile)+"5");
			else if($(this).text() == 'Profile6')			$(this).text($.fn._GetLangStr(LT._Profile)+"6");
			else if($(this).text() == 'CBR')				$(this).text($.fn._GetLangStr(LT._CBR));
			else if($(this).text() == 'VBR')				$(this).text($.fn._GetLangStr(LT._VBR));
			else if($(this).text() == 'AES')				$(this).text($.fn._GetLangStr(LT._AES));
			else if($(this).text() == 'ALC')				$(this).text($.fn._GetLangStr(LT._ALC));
			else if($(this).text() == 'Flickerless')		$(this).text($.fn._GetLangStr(LT._Flickerless));
			else if($(this).text() == 'Auto')				$(this).text($.fn._GetLangStr(LT._Auto));
			else if($(this).text() == 'Color')				$(this).text($.fn._GetLangStr(LT._Color));
			else if($(this).text() == 'BW')					$(this).text($.fn._GetLangStr(LT._BW));
			else if($(this).text() == 'External')			$(this).text($.fn._GetLangStr(LT._External));
			else if($(this).text() == 'upper_2_3rd')		$(this).text($.fn._GetLangStr(LT._upper_2_3rd));
			else if($(this).text() == 'lower_2_3rd')		$(this).text($.fn._GetLangStr(LT._lower_2_3rd));
			else if($(this).text() == 'center_1_3rd')		$(this).text($.fn._GetLangStr(LT._center_1_3rd));
			else if($(this).text() == 'center_1_6th')		$(this).text($.fn._GetLangStr(LT._center_1_6th));
			else if($(this).text() == 'Left')				$(this).text($.fn._GetLangStr(LT._Left));
			else if($(this).text() == 'Right')				$(this).text($.fn._GetLangStr(LT._Right));
			else if($(this).text() == 'Full')				$(this).text($.fn._GetLangStr(LT._Full));
			else if($(this).text() == 'Flip')				$(this).text($.fn._GetLangStr(LT._Flip));
			else if($(this).text() == 'Mirror')				$(this).text($.fn._GetLangStr(LT._Mirror));
			else if($(this).text() == 'Both')				$(this).text($.fn._GetLangStr(LT._Both));
			else if($(this).text() == 'BOTH')				$(this).text($.fn._GetLangStr(LT._Both));
			else if($(this).text() == 'Manual')				$(this).text($.fn._GetLangStr(LT._Manual));
			else if($(this).text() == 'Black')				$(this).text($.fn._GetLangStr(LT._Black));
			else if($(this).text() == 'Grey')				$(this).text($.fn._GetLangStr(LT._Grey));
			else if($(this).text() == 'White')				$(this).text($.fn._GetLangStr(LT._White));
			else if($(this).text() == 'G711a')				$(this).text($.fn._GetLangStr(LT._G711a));
			else if($(this).text() == 'G711u')				$(this).text($.fn._GetLangStr(LT._G711u));
			else if($(this).text() == 'NO')					$(this).text($.fn._GetLangStr(LT._NO));
			else if($(this).text() == 'NC')					$(this).text($.fn._GetLangStr(LT._NC));
			else if($(this).text() == 'No_Auth')			$(this).text($.fn._GetLangStr(LT._No_Auth));
			else if($(this).text() == 'SMTP_Plain')			$(this).text($.fn._GetLangStr(LT._SMTP_Plain));
			else if($(this).text() == 'Login')				$(this).text($.fn._GetLangStr(LT._Login));
			else if($(this).text() == 'TLS_TTLS')			$(this).text($.fn._GetLangStr(LT._TLS_TTLS));
			else if($(this).text() == 'Infinite')			$(this).text($.fn._GetLangStr(LT._Infinite));
			else if($(this).text() == 'Audio')				$(this).text($.fn._GetLangStr(LT._Menu_System_audio));
			else if($(this).text() == 'Both')				$(this).text($.fn._GetLangStr(LT._Both));
			else if($(this).text() == 'Video')				$(this).text($.fn._GetLangStr(LT._video));
			else if($(this).text() == 'Monday')				$(this).text($.fn._GetLangStr(LT._Monday));
			else if($(this).text() == 'Tuesday')			$(this).text($.fn._GetLangStr(LT._Tuesday));
			else if($(this).text() == 'Wednesday')			$(this).text($.fn._GetLangStr(LT._Wednesday));
			else if($(this).text() == 'Thursday')			$(this).text($.fn._GetLangStr(LT._Thursday));
			else if($(this).text() == 'Friday')				$(this).text($.fn._GetLangStr(LT._Friday));
			else if($(this).text() == 'Saturday')			$(this).text($.fn._GetLangStr(LT._Saturday));
			else if($(this).text() == 'Sunday')				$(this).text($.fn._GetLangStr(LT._Sunday));
			else if($(this).text() == 'Forever')			$(this).text($.fn._GetLangStr(LT._forever));
			else if($(this).text() == 'Month')				$(this).text($.fn._GetLangStr(LT._month));
			else if($(this).text() == 'Week')				$(this).text($.fn._GetLangStr(LT._week));
			else if($(this).text() == 'Day')				$(this).text($.fn._GetLangStr(LT._Day));
			else if($(this).text() == 'NONE')				$(this).text($.fn._GetLangStr(LT._none));
			else if($(this).text() == 'Hostname') 			$(this).text($.fn._GetLangStr(LT._hostname));
			else if($(this).text() == 'Text') 				$(this).text($.fn._GetLangStr(LT._text));
			else if($(this).text() == 'Infinite') 			$(this).text($.fn._GetLangStr(LT._Infinite));
			else if($(this).text() == 'Media Player')       $(this).text($.fn._GetLangStr(LT._Media_Player));
			else if($(this).text() == 'Off')				$(this).text($.fn._GetLangStr(LT._OFF));
			else if($(this).text() == 'Allow') 				$(this).text($.fn._GetLangStr(LT._Allow));
			else if($(this).text() == 'Deny')				$(this).text($.fn._GetLangStr(LT._Deny));
			else if($(this).text() == 'Up-left')			$(this).text($.fn._GetLangStr(LT._Up_left));
			else if($(this).text() == 'Up-middle')			$(this).text($.fn._GetLangStr(LT._Up_middle));
			else if($(this).text() == 'Up-right')			$(this).text($.fn._GetLangStr(LT._Up_right));
			else if($(this).text() == 'Bottom-left')		$(this).text($.fn._GetLangStr(LT._Bottom_left));
			else if($(this).text() == 'Bottom-middle')		$(this).text($.fn._GetLangStr(LT._Bottom_middle));
			else if($(this).text() == 'Bottom-right')		$(this).text($.fn._GetLangStr(LT._Bottom_right));

		});
	};
	
	$.fn._returnCroppingArea = function()
	{		
		return draw_area;
	};
	
	$.fn._GeneratePD = function()
	{
		var passwd = Math.random();
		return passwd;
	};

	$.fn._RunEventThread = function()
	{
		$.ajax({
			url:'/cgi-bin/get?'+event_handler,
			dataType:'json',
			cache:false,
			success:function(data){
				$.each(data, function(param, val){
					if(param == "system.motion_alarm.status")
					{
						if(val[1] == "on")
						{
							if(event_motion_flag != val[1])
								$("#ImotionImage").show();
						}
						else if(val[1] == "off")
						{
							if(event_motion_flag != val[1])
								$("#ImotionImage").hide();
						}

						event_motion_flag = val[1];
					}
					else if(param == "system.external_alarm_input1.status")
					{
						if(val[1] == "on")
						{
							if(event_alarm_flag != val[1])
								$("#IAlarmImage").show();
						}
						else if(val[1] == "off")
						{
							if(event_alarm_flag != val[1])
								$("#IAlarmImage").hide();
						}

						event_alarm_flag = val[1];
					}
				});
			},
			error:function(xhr, textStatus, errorThrown){
			}
		});
	};

	$.fn._TransLetter = function(src)
	{
		return src.substr(0,1).toUpperCase() + src.substr(1);
	};

	$.fn._TransCharacter = function(src)
	{
		var callback;
		callback = src.replace(/\&/g, '|');
		return callback;
	};

	$.fn._ResetCoordinates = function(current_res,new_res,mode,zone_1,zone_2,zone_3,zone_4,zone_5,zone_6,zone_7,zone_8,motion)
	{
		var command = "", tmp = "";
		var c_w, c_h, n_w, n_h;
		tmp = current_res.split('x');
		$.each(tmp, function(n){
			if(n == 0)
				c_w = tmp[n];
			else if(n == 1)
				c_h = tmp[n];
		});

		tmp = new_res.split('x');
		$.each(tmp, function(n){
			if(n == 0)
				n_w = tmp[n];
			else if(n == 1)
				n_h = tmp[n];
		});
		
		$.fn._TransferCoordinates_init(mode, c_w, c_h, n_w, n_h, zone_1, zone_2, zone_3, zone_4, zone_5, zone_6, zone_7, zone_8, motion);

		command = "image.privacy_zone_1.mask_zone"	+"="+	ResizeArea[0]+"&"+
				  "image.privacy_zone_2.mask_zone"	+"="+	ResizeArea[1]+"&"+
				  "image.privacy_zone_3.mask_zone"	+"="+	ResizeArea[2]+"&"+
				  "image.privacy_zone_4.mask_zone"	+"="+	ResizeArea[3]+"&"+
				  "image.privacy_zone_5.mask_zone"	+"="+	ResizeArea[4]+"&"+
				  "image.privacy_zone_6.mask_zone"	+"="+	ResizeArea[5]+"&"+
				  "image.privacy_zone_7.mask_zone"	+"="+	ResizeArea[6]+"&"+
				  "image.privacy_zone_8.mask_zone"	+"="+	ResizeArea[7]+"&"+
				  "event.motion_detection.area"		+"="+	ResizeArea[8]+"&";
		$.ajax({
			url:"/cgi-bin/set?"+command,
			cache:false,
			dataType:"json",
			error:function(xhr, textStatus, errorThrown){
			},
			success:function(data){
			}
		});
	};

	$.fn._TransferCoordinates_init = function(src, c_w, c_h, n_w, n_h, zone_1, zone_2, zone_3, zone_4, zone_5, zone_6, zone_7, zone_8, motion)
	{
		//console.log(c_w+" "+c_h+" "+n_w+" "+n_h);
		
		ResizeArea[0] = zone_1;
		ResizeArea[1] = zone_2;
		ResizeArea[2] = zone_3;
		ResizeArea[3] = zone_4;
		ResizeArea[4] = zone_5;
		ResizeArea[5] = zone_6;
		ResizeArea[6] = zone_7;
		ResizeArea[7] = zone_8;
		ResizeArea[8] = motion;
		
		if(src == 5)
			$.fn._TransferCoordinates_5M(c_w, c_h, n_w, n_h);
		else if(src == 3 || src == 2)
			$.fn._TransferCoordinates_3M_2M(c_w, c_h, n_w, n_h);
		else if(src == 1 || src == 0)
			$.fn._TransferCoordinates_1M_SD(c_w, c_h, n_w, n_h);
	};

	$.fn._TransferCoordinates_5M = function(c_w, c_h, n_w, n_h)
	{
		var offset_x = 0, offset_y = 0;
		
		/*5M to 3M, 3M to 5M, 5M to 2M, 2M to 5M*/
		if(Number(c_w) == 2592 || Number(n_w) == 2592)
		{
			// 5M to 3M
			if(Number(c_w) == 2592 && Number(n_w) == 2048)
			{
				// [PM&MD]convert to 3M coordinates of VIN
				offset_x = (n_w - c_w) / 2;
				offset_y = (n_h - c_h) / 2;
				$.fn._ExecuteCoordinatesConvert(1, offset_x, offset_y, c_w, c_h, n_w, n_h);
			}
			// 3M to 5M
			else if(Number(c_w) == 2048 && Number(n_w) == 2592)
			{
				// [PM&MD]convert to 2592x1944 coordinates of VIN
				offset_x = (n_w - c_w) / 2;
				offset_y = (n_h - c_h) / 2;
				$.fn._ExecuteCoordinatesConvert(1, offset_x, offset_y, c_w, c_h, n_w, n_h);
			}
			// 5M to 2M
			else if(Number(c_w) == 2592 && Number(n_w) <= 1920)
			{
				// [PM&MD]convert to 1920x1080 coordinates of VIN
				offset_x = (1920 - c_w) / 2;
				offset_y = (1080 - c_h) / 2;
				$.fn._ExecuteCoordinatesConvert(1, offset_x, offset_y, c_w, c_h, 1920, 1080);

				// [MD]convert to scaled coordinates of Main Source Buffer
				if(Number(n_w) != 1920){ 
					$.fn._ExecuteCoordinatesConvert(2, offset_x, offset_y, 1920, 1080, n_w, n_h);
				}
			}
			// 2M to 5M
			else if(Number(c_w) <= 1920 && Number(n_w) == 2592)
			{
				// [MD]convert coordinates from scaled Main Source Buffer to VIN
				if(Number(c_w) != 1920){ 
					$.fn._ExecuteCoordinatesConvert(2, offset_x, offset_y, c_w, c_h, 1920, 1080);
				}

				// [PM&MD]convert to 2592x1944 coordinates of VIN
				offset_x = (n_w - 1920) / 2;
				offset_y = (n_h - 1080) / 2;
				$.fn._ExecuteCoordinatesConvert(1, offset_x, offset_y, 1920, 1080, n_w, n_h);
			}
		}
		/*3M to 3M, 3M to 2M, 2M to 3M*/	
		else if(Number(c_w) == 2048 || Number(c_w) == 2304 || Number(n_w) == 2048 || Number(n_w) == 2304)
		{
			// 2048x1536 to 2304x1296
			if(Number(c_w) == 2048 && Number(n_w) == 2304)
			{
				// [PM&MD]convert to 2304x1296 coordinates of VIN
				offset_x = (n_w - c_w) / 2;
				offset_y = (n_h - c_h) / 2;
				$.fn._ExecuteCoordinatesConvert(1, offset_x, offset_y, c_w, c_h, n_w, n_h);
			}
			// 2304x1296 to 2048x1536
			else if(Number(c_w) == 2304 && Number(n_w) == 2048)
			{
				// [PM&MD]convert to 2048x1536 coordinates of VIN
				offset_x = (n_w - c_w) / 2;
				offset_y = (n_h - c_h) / 2;
				$.fn._ExecuteCoordinatesConvert(1, offset_x, offset_y, c_w, c_h, n_w, n_h);
			}
			// 3M to 2M
			else if((Number(c_w) == 2048 || Number(c_w) == 2304) && Number(n_w) <= 1920)
			{
				// [PM&MD]convert to 1920x1080 coordinates of VIN
				offset_x = (1920 - c_w) / 2;
				offset_y = (1080 - c_h) / 2;
				$.fn._ExecuteCoordinatesConvert(1, offset_x, offset_y, c_w, c_h, 1920, 1080);

				// [MD]convert to scaled coordinates of Main Source Buffer
				if(Number(n_w) != 1920){
					$.fn._ExecuteCoordinatesConvert(2, offset_x, offset_y, 1920, 1080, n_w, n_h);
				}
			}
			// 2M to 3M
			else if(Number(c_w) <= 1920 && (Number(n_w) == 2048 || Number(n_w) == 2304))
			{
				// [MD]convert coordinates from scaled Main Source Buffer to VIN
				if(Number(c_w) != 1920){
					$.fn._ExecuteCoordinatesConvert(2, offset_x, offset_y, c_w, c_h, 1920, 1080);
				}

				// [PM&MD]convert to 3M coordinates of VIN
				offset_x = (n_w - 1920) / 2;
				offset_y = (n_h - 1080) / 2;
				$.fn._ExecuteCoordinatesConvert(1, offset_x, offset_y, 1920, 1080, n_w, n_h);
			}
		}	
		/*2M to 2M*/		
		else if((Number(c_w) <= 1920)&&(Number(n_w) <= 1920))
		{
			var offset_x = 0, offset_y = 0;

			// [MD]convert coordinates from scaled Main Source Buffer to VIN
			if(Number(c_w) != 1920){ 
				$.fn._ExecuteCoordinatesConvert(2, offset_x, offset_y, c_w, c_h, 1920, 1080);
			}

			// [MD]convert to scaled coordinates of Main Source Buffer
			if(Number(n_w) != 1920){
				$.fn._ExecuteCoordinatesConvert(2, offset_x, offset_y, 1920, 1080, n_w, n_h);
			}
		}
	};

	$.fn._TransferCoordinates_3M_2M = function(c_w, c_h, n_w, n_h)
	{
		var offset_x = 0, offset_y = 0;

		/*3M to 3M, 3M to 2M, 2M to 3M*/	
		if(Number(c_w) == 2048 || Number(c_w) == 2304 || Number(n_w) == 2048 || Number(n_w) == 2304)
		{
			// 2048x1536 to 2304x1296
			if(Number(c_w) == 2048 && Number(n_w) == 2304)
			{
				// [PM&MD]convert to 2304x1296 coordinates of VIN
				offset_x = (n_w - c_w) / 2;
				offset_y = (n_h - c_h) / 2;
				$.fn._ExecuteCoordinatesConvert(1, offset_x, offset_y, c_w, c_h, n_w, n_h);
			}
			// 2304x1296 to 2048x1536
			else if(Number(c_w) == 2304 && Number(n_w) == 2048)
			{
				// [PM&MD]convert to 2048x1536 coordinates of VIN
				offset_x = (n_w - c_w) / 2;
				offset_y = (n_h - c_h) / 2;
				$.fn._ExecuteCoordinatesConvert(1, offset_x, offset_y, c_w, c_h, n_w, n_h);
			}
			// 3M to 2M
			else if((Number(c_w) == 2048 || Number(c_w) == 2304) && Number(n_w) <= 1920)
			{
				// [PM&MD]convert to 1920x1080 coordinates of VIN
				offset_x = (1920 - c_w) / 2;
				offset_y = (1080 - c_h) / 2;
				$.fn._ExecuteCoordinatesConvert(1, offset_x, offset_y, c_w, c_h, 1920, 1080);

				// [MD]convert to scaled coordinates of Main Source Buffer
				if(Number(n_w) != 1920){ 
					$.fn._ExecuteCoordinatesConvert(2, offset_x, offset_y, 1920, 1080, n_w, n_h);
				}
			}
			// 2M to 3M
			else if(Number(c_w) <= 1920 && (Number(n_w) == 2048 || Number(n_w) == 2304))
			{
				// [MD]convert coordinates from scaled Main Source Buffer to VIN
				if(Number(c_w) != 1920){ 
					$.fn._ExecuteCoordinatesConvert(2, offset_x, offset_y, c_w, c_h, 1920, 1080);
				}

				// [PM&MD]convert to 3M coordinates of VIN
				offset_x = (n_w - 1920) / 2;
				offset_y = (n_h - 1080) / 2;
				$.fn._ExecuteCoordinatesConvert(1, offset_x, offset_y, 1920, 1080, n_w, n_h);
			}
		}	
		/*2M to 2M*/		
		else if((Number(c_w) <= 1920)&&(Number(n_w) <= 1920))
		{
			var offset_x = 0, offset_y = 0;

			// [MD]convert coordinates from scaled Main Source Buffer to VIN
			if(Number(c_w) != 1920){ 
				$.fn._ExecuteCoordinatesConvert(2, offset_x, offset_y, c_w, c_h, 1920, 1080);
			}

			// [MD]convert to scaled coordinates of Main Source Buffer
			if(Number(n_w) != 1920){ 
				$.fn._ExecuteCoordinatesConvert(2, offset_x, offset_y, 1920, 1080, n_w, n_h);
			}
		}
	};

	$.fn._TransferCoordinates_1M_SD = function(c_w, c_h, n_w, n_h)
	{
		var offset_x = 0, offset_y = 0;

		// [MD]convert coordinates from scaled Main Source Buffer to VIN
		if(Number(c_w) != 1280){ 
			$.fn._ExecuteCoordinatesConvert(2, offset_x, offset_y, c_w, c_h, 1280, 720);
		}

		// [MD]convert to scaled coordinates of Main Source Buffer
		if(Number(n_w) != 1280){ 
			$.fn._ExecuteCoordinatesConvert(2, offset_x, offset_y, 1280, 720, n_w, n_h);
		}
	};

	$.fn._ExecuteCoordinatesConvert = function(flag, offset_x, offset_y, c_res_w, c_res_h, n_res_w, n_res_h)
	{
		var t_x1, t_y1, t_x2, t_y2, tmp;
		
		if(flag == 1)
		{
			for(var i = 0; i < 9; i++)
			{
				if(ResizeArea[i]== "0,0,0,0")
					continue;
				else
					tmp = ResizeArea[i].split(",");
				
				$.each(tmp, function(n){
					if(n == 0)
						t_x1 = Number(tmp[n])+Number(offset_x);
					else if(n == 1)
						t_y1 = Number(tmp[n])+Number(offset_y);
					else if(n == 2)
						t_x2 = Number(tmp[n])+Number(offset_x);
					else if(n == 3)
						t_y2 = Number(tmp[n])+Number(offset_y);
				});

				ResizeArea[i] = t_x1+","+t_y1+","+t_x2+","+t_y2;
			}
		}
		else if(flag == 2)
		{
			if(ResizeArea[8] == "0,0,0,0"){
				return;
			}
			
			tmp = ResizeArea[8].split(",");
			$.each(tmp, function(n){
				if(n == 0)
					t_x1 = Math.floor((tmp[n]*n_res_w)/c_res_w);
				else if(n == 1)
					t_y1 = Math.floor((tmp[n]*n_res_h)/c_res_h);
				else if(n == 2)
					t_x2 = Math.floor((tmp[n]*n_res_w)/c_res_w);
				else if(n == 3)
					t_y2 = Math.floor((tmp[n]*n_res_h)/n_res_h);
			});

			ResizeArea[8] = t_x1+","+t_y1+","+t_x2+","+t_y2;
		}
	};

	$.fn._identifyBrowser = function()
	{
	    var sBrowser, sUsrAg = navigator.userAgent;
	    if(sUsrAg.indexOf("Chrome") > -1) {
	        return "chrome";
	    } else if (sUsrAg.indexOf("Safari") > -1) {
	        return "safari";
	    } else if (sUsrAg.indexOf("Opera") > -1) {
	        return "opera";
	    } else if (sUsrAg.indexOf("Firefox") > -1) {
	       	return "firefox";
	    } else if (sUsrAg.indexOf("MSIE") > -1) {
	        return "msie";
	    } else if (sUsrAg.indexOf("Trident") > -1){
	    	return "msie";
	    }
	};

	$.fn._identifyIeVersion = function()
	{
	    var sUsrAg = navigator.userAgent;
	    console.log("check browser:" + sUsrAg);

	    if (sUsrAg.indexOf("MSIE") > -1) {
	        return "msie";
	    }else if (sUsrAg.indexOf("Trident") > -1){
	    	return "el";
	    }
	};

	$.fn._identifyOS = function()
	{
		var OSName="Unknown OS";
		if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
		else if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
		else if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
		else if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";

		return OSName;
	};

	$.fn._Resize = function(wid, hei)
	{
		if($.cookie('def_video_player') == DEFINE_ACTIVEX)
		{
			if($.fn._identifyBrowser() == "msie")
			{
				$("#VideoPlugin").css("width",""+wid+"px");
				$("#VideoPlugin").css("height",""+hei+"px");
			}
			else if($.fn._identifyBrowser() == "chrome" || $.fn._identifyBrowser() == "firefox" || $.fn._identifyBrowser() == "opera" || $.fn._identifyBrowser() == "safari")
			{
				$("embed[name=VideoPlugin]").css("width",""+wid+"px");
				$("embed[name=VideoPlugin]").css("height",""+hei+"px");
			}
		}
		else if($.cookie('def_video_player') == DEFINE_QUICKTIME)
		{
			if($.fn._identifyBrowser() == "msie")
			{
				$("#Iquicktime").css("width",""+wid+"px");
				$("#Iquicktime").css("height",""+hei+"px");
			}
			else if($.fn._identifyBrowser() == "chrome" || $.fn._identifyBrowser() == "firefox" || $.fn._identifyBrowser() == "opera" || $.fn._identifyBrowser() == "safari")
			{
				$("#Iquicktime").css("width",""+wid+"px");
				$("#Iquicktime").css("height",""+hei+"px");
			}
		}
	}
	
})(jQuery);
