
import { HarpokratApi } from '@harpokrat/client';

const wasmUrl = 'https://static.harpokrat.com/hcl/hcl2.wasm';

var client = new HarpokratApi({
    auth: {
        email: '',
        password: ''
    },
    apiUrl: 'https://api.harpokrat.com/v1/',
    hclWasmUrl: wasmUrl,
    requester: undefined,
});
client.hcl.init();

const login = async (email, password) => {
    client.auth = { email, password };
    const token = await client.jsonWebTokens.create();
    client.accessToken = token;
    console.log(token);
}

const login_message_handler = async (params, sender) => {
    login(params.email, params.password);
    return { success: false }
}

add_message_listener("hpk_login", login_message_handler)
