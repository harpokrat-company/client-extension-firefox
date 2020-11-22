
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


const login = (email: string, password: string) => {
    return new Promise((resolve, reject) => {
        worker.postMessage({ message: "login", params: { email, password } });
        function loginEventListener(message: MessageEvent) {
            if (message.data.message == "login-response") {
                console.log("LOGIN-RESPONSE: " + JSON.stringify(message.data.token));
                worker.removeEventListener("message", loginEventListener)
                resolve(message.data.token)
            }
        }
        worker.addEventListener("message", loginEventListener);
    })
}

const login_message_handler = async (params: any, sender: any) => {
    await login(params.email, params.password);
    return { success: true }
}

const getAllUserPasswords = () => {
    return new Promise((resolve, reject) => {
        worker.postMessage({ message: "getAllUserPasswords" });
        function loginEventListener(message: MessageEvent) {
            if (message.data.message == "getAllUserPasswords-response") {
                console.log("GETALLUSERPASSWORDS-RESPONSE: " + JSON.stringify(message.data.passwords));
                worker.removeEventListener("message", loginEventListener)
                resolve(message.data.passwords)
            }
        }
        worker.addEventListener("message", loginEventListener);
    })
}

login("tanguypd@lol.xd", "tanguypd@lol.xd").then((_) => {
    getAllUserPasswords()
});

add_message_listener("hpk_login", login_message_handler)