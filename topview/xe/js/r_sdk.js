// Initial config
require.config({
	// Avoid ie cache.
	urlArgs: "v=" +  (new Date()).getTime()
});

// Start Initial...
require(['sdk'], function(){
	$.fn._Go();
});