// Initial config
require.config({
	// Avoid ie cache.
	urlArgs: "v=" +  (new Date()).getTime()
});

// Start Initial...
require(['neutral','net_view','common_lang'], function(){
	$.fn.initialNetView();
});
