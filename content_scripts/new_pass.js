const create_new_pass_modal = (username, password) => {
    let link = document.createElement("LINK");
    link.href = "https://fonts.googleapis.com/css?family=Montserrat"
    link.rel = "stylesheet"
    document.head.appendChild(link)
    
    let modal = document.createElement("DIV")
    modal.id = "harpokratModal"
    modal.style = "display: block;position: fixed;z-index: 9999;left: 0;top: 0;width: 100%;height: 100%;overflow: auto;";

    let modal_content = document.createElement("DIV")
    modal_content.style = "position: absolute;top: 4px;right: 4px;background-color: #fefefe;padding: 20px;width: 325px;-webkit-box-shadow: 0px 0px 1px 1px rgba(110,110,110,0.23);-moz-box-shadow: 0px 0px 1px 1px rgba(110,110,110,0.23);box-shadow: 0px 0px 1px 1px rgba(110,110,110,0.23);"

    let p = document.createElement("P")
    p.style = "font-family: 'Montserrat', sans-serif !important;"
    p.textContent = "Would you like to record this password ?"

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
	let mo = document.getElementById('harpokratModal');
	mo.style.display = "none";
	chrome.runtime.sendMessage({add_account: {user: username, pass: password}}, (response) => {
            console.log(response)
        })
	chrome.runtime.sendMessage({delete_pending_account: {user: username, pass: password}}, (response) => {
            console.log(response)
        })
    }

    btnRefuse.onclick = function() {
	let mo = document.getElementById('harpokratModal');
	mo.style.display = "none";
	chrome.runtime.sendMessage({delete_pending_account: {user: username, pass: password}}, (response) => {
            console.log(response)
        })
    }

    modal_content.appendChild(p)
    modal_content.appendChild(btnConfirm)
    modal_content.appendChild(btnRefuse)
    modal_content.appendChild(mark)
    modal.appendChild(modal_content)
    document.body.appendChild(modal)
}

const new_pass = () => {
    let fields = find_fields()

    chrome.runtime.sendMessage({is_account_pending: true}, (response) => {
        if (response.success == true)
	    create_new_pass_modal(response.user, response.pass)
    })
    if (fields.form && fields.user && fields.pass) {
        console.log(JSON.stringify(fields))
        fields.form.addEventListener("submit", () => {
            let account = {user: fields.user.value, pass: fields.pass.value}
            chrome.runtime.sendMessage({add_pending_account: account}, (response) => {
                console.log(response)
            })
        })
    }
}
new_pass()
