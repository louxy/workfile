// Initial config
require.config({
	// Avoid ie cache.
	urlArgs: "v=" +  (new Date()).getTime()
});

// Start Initial...
require(['neutral','net_general'], function(){
	$.fn._InitialLang();
});
