
const modify_account = async (params, sender) => {
  console.log("modified account: " + JSON.stringify(params))
  /*
   * =============================
   *    send to API
   * =============================
   */
  return {success: true}
}

function setup_modify_account() {
  add_message_listener("modify_account", modify_account)
}
