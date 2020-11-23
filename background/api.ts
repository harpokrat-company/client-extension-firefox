
import ApiWorker from "worker-loader!./worker";
// import { add_message_listener } from './messaging';


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

var jwtInterval: any = undefined;

export const login = (email: string, password: string) => {
    if (jwtInterval != undefined) {
        clearInterval(jwtInterval)
    }
    jwtInterval = setInterval(() => {
        worker.postMessage({ message: "login", params: { email, password } });
        function loginEventListener(message: MessageEvent) {
            if (message.data.message == "login-response") {
                console.log("INTERVAL-LOGIN-RESPONSE: " + JSON.stringify(message.data.token));
                worker.removeEventListener("message", loginEventListener)
            }
        }
        worker.addEventListener("message", loginEventListener);
    }, 10 * 60 * 1000)
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

export const getAllUserPasswords = () => {
    return new Promise((resolve, reject) => {
        worker.postMessage({ message: "getAllUserPasswords" });
        function getAllPasswordsEventListener(message: MessageEvent) {
            if (message.data.message == "getAllUserPasswords-response") {
                console.log("GETALLUSERPASSWORDS-RESPONSE: " + JSON.stringify(message.data.passwords));
                worker.removeEventListener("message", getAllPasswordsEventListener)
                resolve(message.data.passwords)
            }
        }
        worker.addEventListener("message", getAllPasswordsEventListener);
    })
}

export const addAccount = (account: any) => {
    return new Promise((resolve, reject) => {
        worker.postMessage({ message: "addPassword", params: account });
        function addPasswordEventListener(message: MessageEvent) {
            if (message.data.message == "addPassword-response") {
                console.log("ADDPASSWORD-RESPONSE: " + JSON.stringify(message.data.success));
                worker.removeEventListener("message", addPasswordEventListener)
                resolve(message.data.passwords)
            }
        }
        worker.addEventListener("message", addPasswordEventListener);
    })
}

// add_message_listener("hpk_login", login_message_handler)