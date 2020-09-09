
function new_account() {
  let form = find_form()
  if (form) {
    form.submit.elem.addEventListener(form.submit.event, async () => {
      let user_value = ""
      if (form.fields.user)
        user_value = form.fields.user.value
      let pass_value = ""
      if (form.fields.pass)
        pass_value = form.fields.pass.value
      let params = {
        fields: {
          user: user_value,
          pass: pass_value
        },
        final: form.final
      }
      await send_webext_message("add_account_part", params, (response) => { })
    })
  }
}

new_account()
