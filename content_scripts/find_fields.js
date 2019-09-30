function find_fields_fb () {
    let ret = {
        form: undefined,
        user: undefined,
        pass: undefined
    }
    ret.form = document.forms[0]
    ret.user = document.querySelectorAll("input[name='username']")[0]
    ret.pass = document.querySelectorAll("input[type='password']")[0]
    if (!(ret.user) && ret.form && ret.form.length > 0) {
        ret.user = ret.form[0]
    }
    if (!(ret.user))
        return ret
    let i = 0
    while (ret.user && ret.user.getAttribute("type") == 'hidden')
        ret.user = ret.form[++i]
    return ret
}

function find_fields_wiki () {
    let ret = {
        form: undefined,
        user: undefined,
        pass: undefined
    }
    ret.form = document.forms[0]
    ret.user = document.querySelectorAll("input[name='username']")[0]
    ret.pass = document.querySelectorAll("input[type='password']")[0]
    if (!(ret.user) && ret.form && ret.form.length > 0) {
        ret.user = ret.form[0]
    }
    if (!(ret.user))
        return ret
    let i = 0
    while (ret.user && ret.user.getAttribute("type") == 'hidden')
        ret.user = ret.form[++i]
    return ret
}

function find_fields_ebay () {
    let ret = {
        form: undefined,
        user: undefined,
        pass: undefined
    }
    ret.form = document.forms[0]
    ret.user = document.querySelectorAll("input[name='username']")[0]
    ret.pass = document.querySelectorAll("input[type='password']")[0]
    if (!(ret.user) && ret.form && ret.form.length > 0) {
        ret.user = ret.form[0]
    }
    if (!(ret.user))
        return ret
    let i = 0
    while (ret.user && ret.user.getAttribute("type") == 'hidden')
        ret.user = ret.form[++i]
    return ret
}

function find_fields_twitter () {
    let ret = {
        form: undefined,
        user: undefined,
        pass: undefined
    }
    ret.form = document.forms[0]
    /* ret.form = document.forms[3] */
    ret.user = document.querySelectorAll("input[name='session[username_or_email]']")[0]
    ret.pass = document.querySelectorAll("input[name='session[password]']")[0]
    if (!(ret.user) && ret.form && ret.form.length > 0) {
	ret.user = ret.form[0]
    }
    if (!(ret.user))
        return ret
    let i = 0
    while (ret.user && ret.user.getAttribute("type") == 'hidden')
        ret.user = ret.form[++i]
    return ret
}

function find_fields_stackoverflow () {
    let ret = {
        form: undefined,
        user: undefined,
        pass: undefined
    }
    ret.form = document.forms[1]
    ret.user = document.querySelectorAll("input[name='email']")[0]
    ret.pass = document.querySelectorAll("input[type='password']")[0]
    // alert(JSON.stringify(ret))
    return ret
}

function find_fields () {
    let finders = new Map([
	["stackoverflow", find_fields_stackoverflow],
	["fb", find_fields_fb],
	["wiki", find_fields_wiki],
	["ebay", find_fields_ebay],
	["twitter", find_fields_twitter]
    ])  // REMEMBER TO PUT COMA AT THE END, THERE IS NO ERROR
    for (let [k, f] of finders) {
	let r = f()
	if (r && r.form && r.user && r.pass) {
	    // alert("FOUND: " + k + " => " + JSON.stringify(r.user))
	    return r
	}
	// alert(JSON.stringify(r))
    }
}
