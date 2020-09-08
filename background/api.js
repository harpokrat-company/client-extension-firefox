
// import * as aled from '../node_modules/@harpokrat/client/bundles/harpokrat-client.js'
// import * as aled from './api-lib.js'
import {HarpokratApi} from '@harpokrat/client';


const client = new HarpokratApi({
    auth: {
        email: 'test@gmail.com', // User email
        password: 'test' // User password in plaintext
    }, // (optional) auth details
    apiUrl: 'https://api.harpokrat.com/v1/', // (optional) URL of the API (make sure to include the trailing "/")
    requester: undefined, // (optional) custom requester implementation (default is fetch),
} /* (optional) constructor options */);
