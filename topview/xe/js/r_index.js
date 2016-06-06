// Initial config
require.config({
	// Avoid ie cache.
	urlArgs: "v=" +  (new Date()).getTime()
});

// Start Initial...
require(['neutral', 'common_ctrl', 'common_lang'], function(){
	$.fn._ReadJson("index");
});