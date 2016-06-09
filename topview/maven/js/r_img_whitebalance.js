// Initial config
require.config({
	// Avoid ie cache.
	urlArgs: "v=" +  (new Date()).getTime()
});

// Start Initial...
require(['neutral','img_whitebalance'], function(){
	$.fn._InitialLang();
});
