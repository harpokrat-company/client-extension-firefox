
const look_for_pending_modification_account = async () => {
  console.log("aled")
  let res = await send_webext_message("is_account_pending_modification")
  console.log(JSON.stringify(res))
  if (res.success) {
    await open_modal_dialog({
      main_text: "Would you like to change this account's password in you HPK vault ?",
      button1_text: "Change",
      button2_text: "Decline"
    }, {
      button1: async () => {
        await send_webext_message("modify_account", res.account)
        await send_webext_message("delete_first_pending_modification_account", {})
      },
      button2: async () => {
        await send_webext_message("delete_first_pending_modification_account", {})
      }
    }, "close_pending_modification_account_modal")
  }
}

look_for_pending_modification_account()
