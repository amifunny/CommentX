chrome.runtime.onInstalled.addListener(function(){
	
	// Initial storage
	chrome.storage.sync.set({
		"saved_comment":"",
		"allow_notif":true,
		"notif_cache":"",
		"username":""
	});

	// Send welcome notification
	chrome.notifications.create({

		"type":"basic",
		"iconUrl":chrome.extension.getURL("popup/icons/dark_chrome.png"),
		"title":"CommentX",
		"message":"Thanks for installing CommentX. Share your Comment and View Others' on any url."

	});

});
