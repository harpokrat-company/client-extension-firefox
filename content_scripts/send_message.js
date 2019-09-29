
/*
** params is an object that will contain the parameters
** needed on the background script side
** callback's only parameter is the response object
*/
let send_webext_message = (message_type, params, callback) => {
    let id = Math.floor(Math.random() * 100000000)
    let request = {id: id, message_type: message_type, params: params}
    console.log(JSON.stringify(request))
    chrome.runtime.sendMessage(request, callback)
}
