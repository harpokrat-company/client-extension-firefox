function find_form_wikipedia () {
  let form = document.querySelectorAll("form[name='userlogin']")[0]
  return { 
    submit: {
      elem: form,
      event: "submit"
    },
    fields: {
      user: form.querySelectorAll("input[id='wpName1']")[0],
      pass: form.querySelectorAll("input[id='wpPassword1']")[0]
    },
    final: true
  }
}

function find_form_fb () {
  let form = document.querySelectorAll("form[id='login_form']")[0]
  return { 
    submit: {
      elem: form,
      event: "submit"
    },
    fields: {
      user: form.querySelectorAll("input[id='email']")[0],
      pass: form.querySelectorAll("input[id='pass']")[0]
    },
    final: true
  }
}

/*  RIGHT NOW
 * {
 *    submit: {
 *      elem: {},
 *      event: ""
 *    },
 *    fields: {
 *      user: {},
 *      pass: {}
 *    },
 *    final: bool
 * }
 */

/*  WHEN WE WILL WANT TO HAVE MORE FIELDS:
 * {
 *    submit: {
 *      elem: {},
 *      event: ""
 *    },
 *    fields: [
 *      {
 *        name: "",
 *        elem: {}
 *      }
 *    ],
 *    final: bool
 * }
 */

function find_form() {
  let finders = new Map([
    ["wikipedia.org", find_form_wikipedia],
    ["facebook.com", find_form_fb]
  ])

  let curr_url = new URL(location.href)
  let curr_host = curr_url.hostname
  for (let [k, f] of finders) {
    if (curr_host == k || curr_host.search("." + k) != -1) {
      try {
        let r = f()
        return r
      } catch (error) {
        console.log(error)
      }
    }
  }
  return false
}
