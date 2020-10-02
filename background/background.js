
const background_setup = () => {
  browser.runtime.onInstalled.addListener(async function ({ reason, temporary }) {
    // setup storage lists
    // storage['aled'] is used for dev testing purposes
    await browser.storage.local.set({ aled: [], account_parts: [], pending_accounts: [], pending_modification_accounts: [] })

    setup_new_account()
    setup_find_account()
    setup_modify_account()
    setup_pending_accounts_messages()
    setup_pending_modification_accounts_messages()

    if (temporary) {
      run_tests()
        .then()
        .catch((err) => {
          console.log(err)
        })
    }
    switch (reason) {
      case "install":
        {
          if (temporary) {
            // break;
          }
          const url = browser.runtime.getURL("./installed.html");
          await browser.tabs.create({ url });
        }
        break;
    }
  })
}

background_setup()
