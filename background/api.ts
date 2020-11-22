
import ApiWorker from "worker-loader!./worker";

var worker = new ApiWorker();
console.log(worker);


worker.onmessage = (message) => {
    console.log(message);
}

const login = async (email: string, password: string) => {
    worker.postMessage({ message: "login", params: { email, password } });
}

const login_message_handler = async (params: any, sender: any) => {
    login(params.email, params.password);
    return { success: true }
}

login("aled@oskour.fi", "aledoskour");

add_message_listener("hpk_login", login_message_handler)