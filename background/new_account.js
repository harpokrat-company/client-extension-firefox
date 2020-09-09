
const add_account_part = async (params, sender) => {
  let sender_url = new URL(sender.tab.url)
  if (sender_url.host == "") {
    sender_url = new URL("http://localhost")
  }
  console.log(JSON.stringify(params))
  if (params.fields.user && params.fields.pass) {
    await add_pending_account({user: params.fields.user, pass: params.fields.pass}, sender)
  } else {
    if (params.final) {
      let acc = await get_from_storage_list('account_parts', {domain: sender_url.host})
      let new_acc = {user: acc.user, pass: acc.pass}
      if (params.user != "")
        new_acc.user = params.user
      if (params.pass != "")
        new_acc.pass = params.pass
      await add_pending_account({user: new_acc.user, pass: new_acc.pass}, sender)
    } else {
      await push_storage_list('account_parts', {
        name: sender_url.host + " - " + params.user,
        user: params.user,  
        pass: params.pass,   
        domain: sender_url.host
      })
    }
  }
  return {success: true}
}

// params: {name: "", user: "", pass: "", domain: ""}
const add_account = async (params, sender) => {
  console.log("added account: " + JSON.stringify(params))
  /*
   * =============================
   *    send to API
   * =============================
   */
  return {success: true}
}

function setup_new_account() {
  add_message_listener("add_account", add_account)
  add_message_listener("add_account_part", add_account_part)
}
