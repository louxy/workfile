// Initial config
require.config({
	// Avoid ie cache.
	urlArgs: "v=" +  (new Date()).getTime()
});

// Start Initial...
require(['neutral','playback_view','common_lang'], function(){
	$.fn.initialPlaybackView();
});
