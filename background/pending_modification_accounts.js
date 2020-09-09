
const add_pending_modification_account = async (params, sender) => {
  console.log(JSON.stringify(params))
  let sender_url = new URL(sender.tab.url)
  if (sender_url.host == "") {
    sender_url = new URL("http://localhost")
  }
  let res = await find_account_for_domain({}, sender)
    await push_storage_list('pending_modification_accounts', {
      name: sender_url.host + " - " + params.user,
      user: params.user,  
      pass: params.pass,   
      domain: sender_url.host
    })
    console.log("added pending_modification account: " + sender_url.host + " ; " + params.user + " ; " + params.pass)
  return {success: true}
}

const is_account_pending_modification = async (params, sender) => {
  let res = await browser.storage.local.get(['pending_modification_accounts'])
  if (res.pending_modification_accounts.length > 0) {
    let elem = res.pending_modification_accounts[0]
    return {success: true, account: elem}
  } else {
    return {success: false}
  }
}

const delete_first_pending_modification_account = async (params, sender) => {
  await splice_storage_list('pending_modification_accounts', {})
  await send_all_tabs_message("close_pending_modification_account_modal", {})
  await send_all_tabs_message("close_fill_form_modal", {})
  console.log("removed first pending_modification account")
  return {success: true}
}

const setup_pending_modification_accounts_messages = () => {
  add_message_listener("add_pending_modification_account", add_pending_modification_account)
  add_message_listener("is_account_pending_modification", is_account_pending_modification)
  add_message_listener("delete_first_pending_modification_account", delete_first_pending_modification_account)
}

