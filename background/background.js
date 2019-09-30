chrome.runtime.onInstalled.addListener(function() {
    // setup placeholder account list
    chrome.storage.local.set({acc_list: [], pending_acc_list: []}, function() {
        console.log('create empty acc_list and pending_acc_list');
    })

    // // setup extension icon to be usable on all http(s) pages + local for tests
    // chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    //     chrome.declarativeContent.onPageChanged.addRules([{
    //         conditions: [new chrome.declarativeContent.PageStateMatcher({
    //             pageUrl: {urlMatches: ".*", schemes: ["http", "https", "file"]},
    //         })
    //                     ],
    //         actions: [new chrome.declarativeContent.ShowPageAction()]
    //     }]);
    // });
});

/***********************************
*               WIP                *
***********************************/

const add_message_type = (message_type, handler) => {
    // console.log(message_type)
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.message_type == message_type) {
	    // console.log(message_type + " => " + JSON.stringify(request))
	    return handler(request.params, sender, sendResponse)
	}
    })
}

// read placeholder account storage and get needed password
add_message_type("get_pass", (params, sender, sendResponse) => {
    console.log(params);
    let q = params.user;
    chrome.storage.local.get(['acc_list'], function(res) {
	let acc = res.acc_list.filter(i => i.user == q)
	if (acc.length == 0)
	    sendResponse({success: false})
	else
	    sendResponse({success: true, pass: acc[acc.length-1].pass})
    })
    return true;
})

// read placeholder account storage for usernames
add_message_type("popup_current_url_accounts", (params, sender, sendResponse) => {
    // console.log(JSON.stringify(sender))
    // let sender_url = new URL(sender.tab.url)
    chrome.storage.local.get(['acc_list'], function(res) {
	let accounts = res.acc_list.filter(function (i) {
	    // return i.host == sender_url.host
	    return true
	}).map(i => {
	    return {
		"url": i.host,
		"username": i.user,
		"password": i.pass
	    }
	})
	sendResponse({success: true, accounts})
	return;
    })
    return true;
})

// read placeholder account storage for usernames
add_message_type("accounts", (params, sender, sendResponse) => {
    let sender_url = new URL(sender.tab.url)
    chrome.storage.local.get(['acc_list'], function(res) {
	let accounts = res.acc_list.filter(function (i) {
	    return i.host == sender_url.host
	}).map(i => i.user)
	sendResponse({success: true, accounts})
	return;
    })
    return true;
})

// add a new account, after receiving confirmation from a modal
add_message_type("add_account", (params, sender, sendResponse) => {
    let sender_url = new URL(sender.tab.url)
    if (sender_url.host == "") {
	sender_url = new URL("http://localhost")
    }
    let pass = params.pass
    let user = params.user
    console.log(sender_url.host + " sent account: " + pass)

    // update placeholder account storage
    chrome.storage.local.get(['acc_list'], function(res) {
	res.acc_list.push({host: sender_url.host, user, pass})
	chrome.storage.local.set({acc_list: res.acc_list}, function() {
	    console.log('added pass for ' + sender_url.host + ' : ' + pass);
	    sendResponse({success: true});
	})
    })
    return true;
})

// add a new account to the pending list
// (for which we are waiting on a yes/no modal)
add_message_type("add_pending_account", (params, sender, sendResponse) => {
    chrome.storage.local.get(['pending_acc_list'], function(res) {
	res.pending_acc_list.push({
	    user: params.user,
	    pass: params.pass
	})
	chrome.storage.local.set({pending_acc_list: res.pending_acc_list}, function() {
	    sendResponse({success: true});
	})
    })
    return true;
})

// list pending accounts, so we can show modals for them
add_message_type("is_account_pending", (params, sender, sendResponse) => {
    chrome.storage.local.get(['pending_acc_list'], function(res) {
	if (res.pending_acc_list.length > 0) {
	    let elem = res.pending_acc_list[0]
	    sendResponse({success: true, pass: elem.pass, user: elem.user})
	} else
	    sendResponse({success: false})
    })
    return true;
})

// remove an account from pendong, after receiving confirmation from a modal
add_message_type("delete_pending_account", (params, sender, sendResponse) => {
    chrome.storage.local.get(['pending_acc_list'], function(res) {
	res.pending_acc_list.splice(res.pending_acc_list.indexOf({
	    user: params.user,
	    pass: params.pass
	}), 1)
	chrome.storage.local.set({pending_acc_list: res.pending_acc_list}, function() {
	    sendResponse({success: true});
	})
    })
    return true;
})

// angular testing purposes
add_message_type("aled", (params, sender, sendResponse) => {
    sendResponse({success: true})
})
