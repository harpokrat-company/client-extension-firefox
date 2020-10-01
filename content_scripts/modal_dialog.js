/* content: {
 *   main_text: "",
 *   button1_text: "",
 *   button2_text: ""
 * }
 * actions: {
 *   button1: fn(),
 *   button2: fn()
 * }
 * close_event: ""
 */
async function open_modal_dialog(content, actions, close_event) {
  let link = document.createElement("LINK");
  link.href = "https://fonts.googleapis.com/css?family=Montserrat"
  link.rel = "stylesheet"
  document.head.appendChild(link)

  let rand_id = Math.floor(Math.random() * 100000000)
  let modal = document.createElement("DIV")
  modal.id = "harpokratModal" + rand_id
  modal.style = `
  display: block;
  position: fixed;
  z-index: 999999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  `


  let modal_content = document.createElement("DIV")
  modal_content.style = `
  position: absolute;
  border: 4px solid #38678f;
  top: 4px;
  right: 4px;
  background-color: #fefefe;
  padding: 20px;
  width: 325px;
  -webkit-box-shadow: 0px 0px 1px 1px rgba(110,110,110,0.23);
  -moz-box-shadow: 0px 0px 1px 1px rgba(110,110,110,0.23);
  box-shadow: 0px 0px 1px 1px rgba(110,110,110,0.23);
  `

  let p = document.createElement("P")
  p.style = "font-family: 'Montserrat', sans-serif !important;"
  p.textContent = content.main_text

  let btn1 = document.createElement("BUTTON")
  btn1.style = `
  color: #fff;
  background-color: #38678f;
  border-color: #28a745;
  font-weight: 400;
  border: 1px solid transparent;
  padding: .375rem .75rem;
  font-size: 1rem;
  line-height: 1.5;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  `
  btn1.textContent = content.button1_text

  let btn2 = document.createElement("BUTTON")
  btn2.style = `
  color: #FFF;
  border-color: #dc3545;
  font-weight: 400;
  border: 1px solid transparent;
  padding: .375rem .75rem;
  font-size: 1rem;
  line-height: 1.5;
  margin-left: 2px;
  background-color: #212529;
  `
  btn2.textContent = content.button2_text

  let mark = document.createElement("P")
  mark.style = `
  font-family: 'Montserrat', sans-serif !important;
  display: inline-block;
  margin-left: 5px;
  float:right;
  `
  mark.textContent = "Harpokrat"

  btn1.onclick = async function () {
    modal.style.display = "none";
    await actions.button1()
  }

  btn2.onclick = async function () {
    modal.style.display = "none";
    await actions.button2()
  }

  modal_content.appendChild(p)
  modal_content.appendChild(btn1)
  modal_content.appendChild(btn2)
  modal_content.appendChild(mark)
  modal.appendChild(modal_content)
  document.body.appendChild(modal)

  add_message_listener(close_event, () => {
    modal.style.display = "none";
  })
}
