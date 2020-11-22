
import { HarpokratApi, IPassword, ISecret, IHclSecret, IResourceIdentifier } from '@harpokrat/client';

const ctx: Worker = self as any;

const wasmUrl = 'https://static.harpokrat.com/hcl/hcl2.wasm';
const apiUrl = 'https://api.harpokrat.com/v1/';

var client = new HarpokratApi({
    auth: {
        email: 'aled@oskour.fi',
        password: 'aledoskour'
        // email: 'aled2@osko.ur',
        // password: 'toto1234'
        // email: 'pythonlib@osko.ur',
        // password: 'testtest'
    },
    apiUrl: apiUrl,
    hclWasmUrl: wasmUrl,
    requester: undefined,
});
client.hcl.init();


const login = async (email: string, password: string) => {
    // client.auth = { email, password };
    const token = await client.jsonWebTokens.create();
    client.accessToken = token.attributes.token;
    // console.log(token.attributes.token);
    ctx.postMessage(token.attributes.token);
    var current_user_id = (token.relationships.user.data as IResourceIdentifier).id;

    var secrets = await client.secrets.readMany({
        page: 1, // Page to read
        size: 20, // Page size
        // sort: 'content', // (optional) Property to sort by
        // sortDescending: true, // (optional) Sort in ASC or DESC order
        filters: {
            'owner.id': current_user_id,
        }
    });
    console.log(secrets);
    var hclModule = await client.hcl.getModule();
    secrets.forEach(secret => {
        console.log(hclModule);
        console.log(secret.attributes.content);
        try {
            var aled: IHclSecret = hclModule.Secret.Deserialize(client.auth.password, secret.attributes.content);
            console.log(aled.GetSecretTypeName());
        } catch (e) {
            console.error(e);
        }
    });

}

ctx.onmessage = (ev: MessageEvent) => {
    ctx.postMessage("ALED FROM WEBWORKER")
    if (ev.data.message == "login") {
        login(ev.data.params.email, ev.data.params.password);
    }
}