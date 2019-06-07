chrome.runtime.onInstalled.addListener(function() {
    // setup placeholder account list
    chrome.storage.local.set({acc_list: [], pending_acc_list: []}, function() {
        console.log('create empty acc_list and pending_acc_list');
    })

    // setup extension icon to be usable on all http(s) pages + local for tests
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {urlMatches: ".*", schemes: ["http", "https", "file"]},
            })
                        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    let sender_url = new URL(sender.tab.url)

    // read placeholder account storage for usernames
    if (request.get_pass) {
        let q = request.get_pass.user;
        chrome.storage.local.get(['acc_list'], function(res) {
            let acc = res.acc_list.filter(i => i.user == q)
            if (acc.length == 0)
                sendResponse({success: false})
            else
                sendResponse({success: true, pass: acc[acc.length-1].pass})
        })
    }

    // read placeholder account storage for usernames
    if (request.accounts) {
        chrome.storage.local.get(['acc_list'], function(res) {
            let accounts = res.acc_list.filter(function (i) {
		return i.host == sender_url.host
	    }).map(i => i.user)
            sendResponse({success: true, accounts})
            return;
        })
    }

    // Wait for a new account to be sent by content script
    if (request.add_account) {
        let pass = request.add_account.pass
        let user = request.add_account.user
        console.log(sender_url.host + " sent account: " + pass)

        // update placeholder account storage
        chrome.storage.local.get(['acc_list'], function(res) {
            res.acc_list.push({host: sender_url.host, user, pass})
            chrome.storage.local.set({acc_list: res.acc_list}, function() {
                console.log('added pass for ' + sender_url.host + ' : ' + pass);
                sendResponse({success: true});
            })
        })
    }

    if (request.add_pending_account) {
	chrome.storage.local.get(['pending_acc_list'], function(res) {
	    res.pending_acc_list.push({
		user: request.add_pending_account.user,
		pass: request.add_pending_account.pass
	    })
	    chrome.storage.local.set({pending_acc_list: res.pending_acc_list}, function() {
    
                sendResponse({success: true});
            })
        })

    }

    if (request.is_account_pending) {
	chrome.storage.local.get(['pending_acc_list'], function(res) {
	    if (res.pending_acc_list.length > 0) {
		let elem = res.pending_acc_list[0]
                sendResponse({success: true, pass: elem.pass, user: elem.user})
	    } else
		sendResponse({success: false})
        })
    }

    if (request.delete_pending_account) {
	chrome.storage.local.get(['pending_acc_list'], function(res) {
	    res.pending_acc_list.splice(res.pending_acc_list.indexOf({
		user: request.delete_pending_account.user,
		pass: request.delete_pending_account.pass
	    }), 1)
	    chrome.storage.local.set({pending_acc_list: res.pending_acc_list}, function() {
                sendResponse({success: true});
            })
        })
    }
    return true;
})
