
// send message to currently viewed tab
const send_current_tab_message = async (message_type, params) => {
  let id = Math.floor(Math.random() * 100000000)
  let request = {id: id, message_type: message_type, params: params}
  console.log(JSON.stringify(request))
  let tabs = await browser.tabs.query({active: true, currentWindow: true})
  return browser.tabs.sendMessage(tabs[0].id, request)
}

// Simple wrapper used to receive (and respond to) messages from the content
// scripts and the Angular popup. handler's resolve value will be the answer
const add_message_listener = (message_type, handler) => {
  browser.runtime.onMessage.addListener((request, sender) => {
    if (request.message_type == message_type) {
      return handler(request.params, sender)
    }
  })
}
