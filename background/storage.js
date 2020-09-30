
// Takes a list from the extension's local storage, adds an element to it
const push_storage_list = async (key, elem) => {
  let res = await browser.storage.local.get([key])
  res[key].push(elem)
  return browser.storage.local.set({ [key]: res[key] })
}


const get_from_storage_list = async (key, filter) => {
  let res = await browser.storage.local.get([key])
  return res[key].find((x) => {
    for ([i, j] of Object.entries(filter)) {
      if (x[i] !== j) {
        return false;
      }
    }
    return true;
  })
}

// Takes a list from the extension's local storage, removes an element,
// found using .indexOf(filter)
const splice_storage_list = async (key, filter) => {
  let res = await browser.storage.local.get([key])
  res[key].splice(res[key].indexOf(filter), 1)
  return browser.storage.local.set({ [key]: res[key] })
}

/* =====================================
                TESTS
===================================== */

const storage_tests = async () => {
  let res = await browser.storage.local.get(['aled'])
  console.log(JSON.stringify(res))
  let i = res['aled'].length;
  await push_storage_list('aled', { aled: "oskour" })
  res = await browser.storage.local.get(['aled'])
  console.log(JSON.stringify(res))
  if (res['aled'].length != i + 1) {
    throw new Error("did not add 1 element to storage list")
  }
  await splice_storage_list('aled', { aled: "oskour" })
  res = await browser.storage.local.get(['aled'])
  console.log(JSON.stringify(res))
  if (res['aled'].length != i) {
    throw new Error("did not splice 1 element from storage list")
  }
}
