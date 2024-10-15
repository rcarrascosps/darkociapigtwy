import ziti from '@openziti/ziti-sdk-nodejs';

// Somehow provide path to identity file, e.g. via env var
const zitiIdentityFile  = process.env.ZITI_IDENTITY_FILE;
// Authenticate ourselves onto the Ziti network
await ziti.init( zitiIdentityFile ).catch(( err ) => { /* probably exit */ });

const on_resp_data = ( obj ) => {
    console.log(`response is: ${obj.body.toString('utf8')}`);
};

// Perform an HTTP GET request to a dark OpenZiti web service
ziti.httpRequest(
  undefined,                     // OpenZiti Service name or HTTP origin part of the URL
  process.env.ZITI_HOST,
  'GET',
  '/api/people/1',                          
  ['Accept: application/json' ], // headers
  undefined,                     // optional on_req cb
  undefined,                     // optional on_req_data cb
  on_resp_data                   // optional on_resp_data cb
);
