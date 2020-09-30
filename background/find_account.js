
const find_account_for_domain = async (params, sender) => {
  let sender_url = new URL(sender.tab.url)
  if (sender_url.host == "") {
    sender_url = new URL("http://localhost")
  }
  // TEST PLACEHOLDER
  if (sender_url.host == "en.wikipedia.org") {
    return { success: true, account: { "name": "en.wikipedia.org - Aledoskour", "user": "Aledoskour", "pass": "adldjfhawd", "domain": "en.wikipedia.org" } }
  }
  if (sender_url.host == "www.amazon.fr") {
    return { success: true, account: { "name": "en.wikipedia.org - Aledoskour", "user": "tanguy.gerome@gmail.com", "pass": "adldjfhawd", "domain": "amazon.fr" } }
  }
  /*
   * =============================
   *    search for account through API
   * =============================
   */
  return { success: false }
}

function setup_find_account() {
  add_message_listener("find_account_for_domain", find_account_for_domain)
}
