new_pass = () => {
	let fields = find_fields()
	if (fields.form && fields.user && fields.pass) {
		console.log(JSON.stringify(fields))
		fields.form.addEventListener("submit", () => {
			let account = {user: fields.user.value, pass: fields.pass.value}
			send_webext_message("add_pending_account", account, (response) => {
				console.log(response)
			})
		})
	}
}
new_pass()
