function find_fields_ebay () {
    let ret = {
	form: undefined,
	user: undefined,
	pass: undefined
    }
    ret.form = document.querySelectorAll("form[id='SignInForm']")[0]
    ret.user = ret.form.querySelectorAll("input[id='userid']")[0]
    ret.pass = ret.form.querySelectorAll("input[id='pass']")[0]
    return ret
}

function find_fields_wiki () {
    let ret = {
	form: undefined,
	user: undefined,
	pass: undefined
    }
    ret.form = document.querySelectorAll("form[name='userlogin']")[0]
    ret.user = ret.form.querySelectorAll("input[id='wpName1']")[0]
    ret.pass = ret.form.querySelectorAll("input[id='wpPassword1']")[0]
    return ret
}

function find_fields_twitter () {
    let ret = {
	form: undefined,
	user: undefined,
	pass: undefined
    }
    ret.form = document.forms[2]
    ret.user = ret.form.querySelectorAll("input[name='session[username_or_email]']")[0]
    ret.pass = ret.form.querySelectorAll("input[name='session[password]']")[0]
    return ret
}

function find_fields_fb () {
    let ret = {
	form: undefined,
	user: undefined,
	pass: undefined
    }
    ret.form = document.querySelectorAll("form[id='login_form']")[0]
    ret.user = ret.form.querySelectorAll("input[id='email']")[0]
    ret.pass = ret.form.querySelectorAll("input[id='pass']")[0]
    return ret
}

function find_fields_trello () {
    let ret = {
	form: undefined,
	user: undefined,
	pass: undefined
    }
    ret.form = document.querySelectorAll("form[id='login-form']")[0]
    ret.user = ret.form.querySelectorAll("input[id='user']")[0]
    ret.pass = ret.form.querySelectorAll("input[id='password']")[0]
    // alert("aled")
    return ret
}

function find_fields_gitlab () {
    let ret = {
	form: undefined,
	user: undefined,
	pass: undefined
    }
    ret.form = document.querySelectorAll("form[id='new_user']")[0]
    ret.user = ret.form.querySelectorAll("input[id='user_login']")[0]
    ret.pass = ret.form.querySelectorAll("input[id='user_password']")[0]
    return ret
}

function find_fields_github () {
    let ret = {
	form: undefined,
	user: undefined,
	pass: undefined
    }
    ret.form = document.forms[0]
    ret.user = ret.form.querySelectorAll("input[id='login_field']")[0]
    ret.pass = ret.form.querySelectorAll("input[id='password']")[0]
    return ret
}

function find_fields_ratp () {
    let ret = {
	form: undefined,
	user: undefined,
	pass: undefined
    }
    ret.form = document.querySelectorAll("form[id='user-login']")[0]
    ret.user = ret.form.querySelectorAll("input[name='name']")[0]
    ret.pass = ret.form.querySelectorAll("input[name='pass']")[0]
    return ret
}

function find_fields_slack () {
    let ret = {
	form: undefined,
	user: undefined,
	pass: undefined
    }
    ret.form = document.querySelectorAll("form[id='signin_form']")[0]
    ret.user = ret.form.querySelectorAll("input[id='email']")[0]
    ret.pass = ret.form.querySelectorAll("input[id='password']")[0]
    return ret
}

function find_fields_bamboohr () {
    let ret = {
	form: undefined,
	user: undefined,
	pass: undefined
    }
    ret.form = document.querySelectorAll("form[name='loginform']")[0]
    ret.user = ret.form.querySelectorAll("input[name='username']")[0]
    ret.pass = ret.form.querySelectorAll("input[name='password']")[0]
    return ret
}

function find_fields_instagram () {
    let ret = {
	form: undefined,
	user: undefined,
	pass: undefined
    }
    ret.form = document.forms[0]
    ret.user = ret.form.querySelectorAll("input[name='username']")[0]
    ret.pass = ret.form.querySelectorAll("input[name='password']")[0]
    return ret
}

function find_fields_paypal () {
    let ret = {
	form: undefined,
	user: undefined,
	pass: undefined
    }
    ret.form = document.querySelectorAll("form[name='login']")[0]
    ret.user = ret.form.querySelectorAll("input[id='email']")[0]
    ret.pass = ret.form.querySelectorAll("input[id='password']")[0]
    return ret
}

// ------ ASYNC

    // let base_onsubmit = ret.form.getAttribute("onsubmit")
function find_fields_amazon () {
    let ret = {
	async: true,
	form: undefined,
	user: undefined,
	pass: undefined
    }
    ret.form = document.querySelectorAll("form[name='signIn']")[0]
    ret.user = document.querySelectorAll("input[name='email']")[0]
    ret.pass = document.querySelectorAll("input[name='password']")[0]
    send_webext_message("is_account_username_pending", {}, function (res) {
	if (res.success) {
	    ret.form.addEventListener("submit", function () {
		send_webext_message("add_account_password_pending", {pass: ret.pass.value}, function (res) {
		    console.log(res)
		})
	    }, {once: true})
	} else {
	    ret.form.addEventListener("submit", function () {
		send_webext_message("add_account_username_pending", {user: ret.user.value}, function (res) {
		    console.log(res)
		})
		ret.form.addEventListener("submit", function () {
		    send_webext_message("add_account_password_pending", {pass: ret.pass.value}, function (res) {
			console.log(res)
		    })
		}, {once: true})
	    }, {once: true})
	}
    })
}

function find_fields_deliveroo () {
    let ret = {
	async: true,
	form: undefined,
	user: undefined,
	pass: undefined
    }
    let button0 = document.querySelectorAll("button[class='ccl-d0484b0360a2b432 ccl-233931c277401e86 ccl-ed9aadeaa18a9f19 ccl-a97a150ddadaa172']")[0]

    button0.addEventListener("click", function () {
	alert("aled")
	ret.form = document.querySelectorAll("form[name='signIn']")[0]
	ret.user = document.querySelectorAll("input[id='email-address']")[0]
	let button1 = document.querySelectorAll("button[type='submit']")[0]

	button1.addEventListener("onclick", function () {
	    ret.pass = document.querySelectorAll("input[name='password']")[0]
	    let button2 = document.querySelectorAll("div[id='passwordNext']")[0]
	    send_webext_message("add_account_username_pending", {user: ret.user.value}, function (res) {
		console.log(res)
	    })
	    button2.addEventListener("onclick", function () {
		send_webext_message("add_account_password_pending", {pass: ret.pass.value}, function (res) {
		    console.log(res)
		})
	    }, {once: true})
	}, {once: true})
    }, {once: true})
}

function find_fields_sncf () {
    let ret = {
	async: true,
	form: undefined,
	user: undefined,
	pass: undefined
    }
    ret.form = document.querySelectorAll("form[id='vsc-menu-ccl-login-form']")[0]
    ret.user = document.querySelectorAll("input[id='ccl-email']")[0]
    let button1 = document.querySelectorAll("button[id='edit-connect']")[0]

    ret.form.addEventListener("onsubmit", function () {
    alert("aled")
	ret.pass = document.querySelectorAll("input[name='password']")[0]
	let button2 = document.querySelectorAll("div[id='passwordNext']")[0]
	send_webext_message("add_account_username_pending", {user: ret.user.value}, function (res) {
	    console.log(res)
	})
	button2.addEventListener("onclick", function () {
	    send_webext_message("add_account_password_pending", {pass: ret.pass.value}, function (res) {
		console.log(res)
	    })
	}, {once: true})
    }, {once: true})
}

// ------ MATCHING

function find_fields () {
    let finders = new Map([
	["ebay.com", find_fields_ebay],
	["wikipedia.org", find_fields_wiki],
	["twitter.com", find_fields_twitter],
	["facebook.com", find_fields_fb],
	["trello.com", find_fields_trello],
	["gitlab.com", find_fields_gitlab],
	["github.com", find_fields_github],
	["maratp.ratp.fr", find_fields_ratp],
	["slack.com", find_fields_slack],
	["bamboohr.com", find_fields_bamboohr],
	["paypal.com", find_fields_paypal]
    ])

    let curr_url = new URL(location.href)
    let curr_host = curr_url.hostname
    for (let [k, f] of finders) {
	if (curr_host == k || curr_host.search("." + k) != -1) {
	    let r = f()
	    if (r && r.form && r.user && r.pass) {
		return r
	    }
	}
    }
    // if no "normal" finder matched, go for the async ones
    let async_finders = new Map([
	["amazon.com", find_fields_amazon],
	["oui.sncf", find_fields_sncf]
    ])
    for (let [k, f] of async_finders) {
	if (curr_host == k || curr_host.search("." + k) != -1) {
	    f()
	    return {}
	}
    }
}
