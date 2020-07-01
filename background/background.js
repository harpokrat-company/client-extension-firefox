
const background_setup = () => {
  browser.runtime.onInstalled.addListener(async function() {
    // setup storage lists
    // storage['aled'] is used for dev testing purposes
    await browser.storage.local.set({aled: [], pending_accounts: []})

    setup_pending_accounts_messages()

    run_tests()
      .then()
      .catch((err) => {
        console.log(err)
      })
  })
}

background_setup()
