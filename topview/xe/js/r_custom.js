// Initial config
require.config({
	// Avoid ie cache.
	urlArgs: "v=" +  (new Date()).getTime()
});

// Start Initial...
require(['custom'], function(){
	$.fn._Go();
});
