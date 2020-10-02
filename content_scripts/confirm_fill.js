
const look_for_creds_to_fill = async () => {
  let res = await send_webext_message("find_account_for_domain")
  if (res.success) {
    let form = find_form()
    if (form) {
      await open_modal_dialog({
        main_text: "Would you like to fill this form with a recorded account from Harpokrat ?",
        button1_text: "Fill",
        button2_text: "Decline"
      }, {
        button1: async () => {
          if (form.fields.user) {
            form.fields.user.value = res.account.user
          }
          if (form.fields.pass) {
            form.fields.pass.value = res.account.pass
          }
        },
        button2: async () => {
        }
      }, "close_fill_form_modal")
    }
  }
}

look_for_creds_to_fill()
