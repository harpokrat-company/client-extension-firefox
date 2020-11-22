
import { HarpokratApi, IResource, IToken, IPassword, ISecret, IHclSecret, IResourceIdentifier } from '@harpokrat/client';

const ctx: Worker = self as any;

const wasmUrl = 'https://static.harpokrat.com/hcl/hcl4.wasm';
const apiUrl = 'https://api.dev.harpokrat.com/v1/';

var client = new HarpokratApi({
    auth: {
        email: '',
        password: ''
    },
    apiUrl: apiUrl,
    hclWasmUrl: wasmUrl,
    requester: undefined,
});
client.hcl.init();

var current_token: IResource<IToken>;


const login = async (email: string, password: string) => {
    client.auth = { email, password };
    current_token = await client.jsonWebTokens.create();
    client.accessToken = current_token.attributes.token;
    ctx.postMessage({ message: "debug", token: current_token.attributes.token });
    ctx.postMessage({ message: "login-response", token: current_token })


}

const getAllUserPasswords = async () => {
    var current_user_id = (current_token.relationships.user.data as IResourceIdentifier).id;

    var passwords = [];

    var hclModule = await client.hcl.getModule();
    var vaults = await client.users.resource(current_user_id, 'vaults').readMany({
        page: 1,
        size: 20,
    })
    ctx.postMessage({ message: "debug", vaults });
    for (const vault of vaults) {
        var secrets = await client.vaults.resource(vault.id, 'secrets').readMany({
            page: 1,
            size: 200,
        })
        ctx.postMessage({ message: "debug", secrets });
        for (const secret of secrets) {
            try {
                var aled: IHclSecret = hclModule.Secret.Deserialize("", secret.attributes.content);
                var password = hclModule.CastSecretToPassword(aled);
                ctx.postMessage({
                    message: "debug",
                    secrettypename: password.GetSecretTypeName(),
                    name: password.GetName(),
                    domain: password.GetDomain(),
                    username: password.GetLogin(),
                    password: password.GetPassword(),
                });
                passwords.push({
                    name: password.GetName(),
                    domain: password.GetDomain(),
                    username: password.GetLogin(),
                    password: password.GetPassword(),
                })
            } catch (e) {
                ctx.postMessage({ message: "debug-error", err: e.message, stack: e.stack });
            }
        }
    }
    ctx.postMessage({ message: "getAllUserPasswords-response", passwords });
}

ctx.onmessage = (ev: MessageEvent) => {
    ctx.postMessage({ message: "debug", aled: "HELLO FROM WEBWORKER" });
    if (ev.data.message == "login") {
        login(ev.data.params.email, ev.data.params.password);
    }
    if (ev.data.message == "getAllUserPasswords") {
        getAllUserPasswords();
    }
}