// Initial config
require.config({
	// Avoid ie cache.
	urlArgs: "v=" +  (new Date()).getTime()
});

// Start Initial...
require(['neutral','login'], function(){
	$.fn._ReadJson("login");
});
