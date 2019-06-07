const create_fill_pass_modal = (username, password, fields) => {
    let link = document.createElement("LINK");
    link.href = "https://fonts.googleapis.com/css?family=Montserrat"
    link.rel = "stylesheet"
    document.head.appendChild(link)

    let modal = document.createElement("DIV")
    modal.id = "harpokratFillModal"
    modal.style = "display: block;position: fixed;z-index: 9999;left: 0;top: 0;width: 100%;height: 100%;overflow: auto;";

    let modal_content = document.createElement("DIV")
    modal_content.style = "position: absolute;top: 4px;right: 4px;background-color: #fefefe;padding: 20px;width: 350px;-webkit-box-shadow: 0px 0px 1px 1px rgba(110,110,110,0.23);-moz-box-shadow: 0px 0px 1px 1px rgba(110,110,110,0.23);box-shadow: 0px 0px 1px 1px rgba(110,110,110,0.23);"

    let p = document.createElement("P")
    p.style = "font-family: 'Montserrat', sans-serif !important;"
    p.textContent = "Would you like to auto-fill account \"" + username + "\" ?"

    let btnConfirm = document.createElement("BUTTON")
    btnConfirm.style = "color: #fff;background-color: #1E90FF;border-color: #28a745;font-weight: 400;border: 1px solid transparent;padding: .375rem .75rem;font-size: 1rem;line-height: 1.5;border-radius: .25rem;transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;"
    btnConfirm.textContent = "Accept"

    let btnRefuse = document.createElement("BUTTON")
    btnRefuse.style = "color: #1E90FF;text-decoration: underline #1E90FF;border-color: #dc3545;font-weight: 400;border: 1px solid transparent;padding: .375rem .75rem;font-size: 1rem;line-height: 1.5;border-radius: .25rem;margin-left: 2px;background: transparent !important;"
    btnRefuse.textContent = "Decline"

    let mark = document.createElement("P")
    mark.style = "font-family: 'Montserrat', sans-serif !important;display: inline-block; margin-left: 5px; float:right;"
    mark.textContent = "Harpokrat"

    btnConfirm.onclick = function() {
	let mo = document.getElementById('harpokratFillModal');
	mo.style.display = "none";
        fields.user.value = username
        fields.pass.value = password
    }

    btnRefuse.onclick = function() {
	let mo = document.getElementById('harpokratFillModal');
	mo.style.display = "none";
    }

    modal_content.appendChild(p)
    modal_content.appendChild(btnConfirm)
    modal_content.appendChild(btnRefuse)
    modal_content.appendChild(mark)
    modal.appendChild(modal_content)
    document.body.appendChild(modal)
}

const find_pass = () => {
    let fields = find_fields()
    let user_field = fields.user
    let pass_field = fields.pass
    if (user_field && pass_field) {
        // create datalist of user accounts
        let user_datalist = document.createElement('datalist')
        user_datalist.setAttribute("id", "accounts")
        chrome.runtime.sendMessage({accounts: true}, function (res) {
            let accounts = res.accounts
            for (let i of accounts) {
                let op = document.createElement('option')
                op.value = i
                user_datalist.appendChild(op)
            }
            user_field.parentNode.appendChild(user_datalist)

            // set list in place of username input
            user_field.setAttribute("list", "accounts")
            user_field.oninput = function() {
                chrome.runtime.sendMessage({get_pass: {user: user_field.value}}, function (res) {
                    console.log(JSON.stringify(res))
                    if (res.success)
                        pass_field.value = res.pass
                })
            }

            // add modal for completion
            if (accounts.length > 0) {
                chrome.runtime.sendMessage({get_pass: {user: accounts[0]}}, function (res) {
                    if (res.success) {
                        create_fill_pass_modal(accounts[0], res.pass, fields)
                    }
                })
            }
        })
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.fill_account) {
                user_field.value = request.fill_account.user
                pass_field.value = request.fill_account.pass
                sendResponse({success: true})
            }
        })
    }
}
find_pass()
