
import ApiWorker from "worker-loader!./worker";

var worker = new ApiWorker();
console.log(worker);


worker.addEventListener("message", (message: MessageEvent) => {
    if (message.data.message == "debug") {
        console.log(message.data);
    } else if (message.data.message == "debug-error") {
        console.log(message.data);
    } else {
        console.log(message);
    }
})

function loginEventListener(message: MessageEvent) {
    if (message.data.message == "login-response") {
        console.log("LOGIN-RESPONSE: " + message.data.token);
        worker.removeEventListener("message", loginEventListener)
    }
}

const login = async (email: string, password: string) => {
    worker.postMessage({ message: "login", params: { email, password } });
    worker.addEventListener("message", loginEventListener);
}

const login_message_handler = async (params: any, sender: any) => {
    login(params.email, params.password);
    return { success: true }
}

login("aled@oskour.fi", "aledoskour");

add_message_listener("hpk_login", login_message_handler)