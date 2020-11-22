
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
    var current_user_id = (current_token.relationships.user.data as IResourceIdentifier).id;
    ctx.postMessage({ message: "login-response", token: current_token })

    var secrets = await client.secrets.readMany({
        page: 1,
        size: 20,
        filters: {
            'owner.id': current_user_id,
        }
    });
    ctx.postMessage({ message: "debug", secrets: secrets });
    var hclModule = await client.hcl.getModule();
    secrets.forEach(secret => {
        ctx.postMessage({ message: "debug", content: secret.attributes.content });
        try {
            var aled: IHclSecret = hclModule.Secret.Deserialize(client.auth.password, secret.attributes.content);
            ctx.postMessage({ message: "debug", secrettypename: aled.GetSecretTypeName() });
        } catch (e) {
            ctx.postMessage({ message: "debug-error", err: e.message, stack: e.stack });
        }
    });

}

ctx.onmessage = (ev: MessageEvent) => {
    ctx.postMessage({ message: "debug", aled: "HELLO FROM WEBWORKER" });
    if (ev.data.message == "login") {
        login(ev.data.params.email, ev.data.params.password);
    }
}