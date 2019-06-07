function find_fields_fb () {
    let ret = {
        form: undefined,
        user: undefined,
        pass: undefined
    }
    ret.form = document.forms[0]
    ret.user = document.querySelectorAll("input[name='username']")[0]
    ret.pass = document.querySelectorAll("input[type='password']")[0]
    let t = /twitter/
    if (t.test(location.href)) {
        /* ret.form = document.forms[3] */
        ret.user = document.querySelectorAll("input[name='session[username_or_email]']")[0]
        ret.pass = document.querySelectorAll("input[name='session[password]']")[0]
    }
    if (!(ret.user) && ret.form && ret.form.length > 0) {
        ret.user = ret.form[0]
    }
    if (!(ret.user))
        return ret
    let i = 0
    while (ret.user.getAttribute("type") == 'hidden')
        ret.user = ret.form[++i]
    console.log(i)
    return ret
}

function find_fields () {
    let finders = new Map([
	["fb", find_fields_fb]
    ])
    for (let [k, f] of finders) {
	let r = f()
	if (r && r.form && r.user && r.pass) {
	    return r
	}
    }
}
