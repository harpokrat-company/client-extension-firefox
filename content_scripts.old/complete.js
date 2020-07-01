const setup_complete = () => {
	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			console.log(sender.tab ?
				"from a content script:" + sender.tab.url :
				"from the extension" + JSON.stringify(request));
			if (!sender.tab && request.command == "complete") {
				let fields = find_fields()
				let user_field = fields.user
				let pass_field = fields.pass
				if (user_field && pass_field) {
					user_field.value = request.params.login
					pass_field.value = request.params.pass
				}
				sendResponse({success: true});
			}
		});
}
setup_complete()
