// Initial config
require.config({
	// Avoid ie cache.
	urlArgs: "v=" +  (new Date()).getTime()
});

// Start Initial...
require(['neutral','record_smtp'], function(){
	$.fn._InitialLang();
});
