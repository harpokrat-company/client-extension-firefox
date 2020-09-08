
const add_pending_account = async (params, sender) => {
  console.log(JSON.stringify(params))
  let sender_url = new URL(sender.tab.url)
  if (sender_url.host == "") {
    sender_url = new URL("http://localhost")
  }
  let res = await find_account_for_domain({}, sender)
  console.log(JSON.stringify(res))
  if (res.success && res.account.user == params.user) {
    console.log("aled_pending_modif")
    await add_pending_modification_account(params, sender)
  } else {
    await push_storage_list('pending_accounts', {
      name: sender_url.host + " - " + params.user,
      user: params.user,  
      pass: params.pass,   
      domain: sender_url.host
    })
    console.log("added pending account: " + sender_url.host + " ; " + params.user + " ; " + params.pass)
  }
  return {success: true}
}

const is_account_pending = async (params, sender) => {
  let res = await browser.storage.local.get(['pending_accounts'])
  if (res.pending_accounts.length > 0) {
    let elem = res.pending_accounts[0]
    return {success: true, account: elem}
  } else {
    return {success: false}
  }
}

const delete_first_pending_account = async (params, sender) => {
  await splice_storage_list('pending_accounts', {})
  await send_all_tabs_message("close_pending_account_modal", {})
  console.log("removed first pending account")
  return {success: true}
}

const setup_pending_accounts_messages = () => {
  add_message_listener("add_pending_account", add_pending_account)
  add_message_listener("is_account_pending", is_account_pending)
  add_message_listener("delete_first_pending_account", delete_first_pending_account)
}

/* =====================================
                TESTS
===================================== */
const pending_accounts_tests = async () => {
  let res = await browser.storage.local.get(['pending_accounts'])
  console.log(JSON.stringify(res))
  let i = res['pending_accounts'].length;
  await add_pending_account({user: "aled", pass: "oskour"}, {tab: {url: "http://aled.oskour.fi"}})
  res = await browser.storage.local.get(['pending_accounts'])
  console.log(JSON.stringify(res))
  if (res['pending_accounts'].length != i + 1) {
    throw new Error("did not add 1 pending account")
  }
  res = await is_account_pending()
  if (!res.success) {
    throw new Error("did not add 1 pending account")
  }
  await delete_first_pending_account({}, {})
  res = await browser.storage.local.get(['pending_accounts'])
  console.log(JSON.stringify(res))
  if (res['pending_accounts'].length != i) {
    throw new Error("did not splice 1 pending account")
  }
}
