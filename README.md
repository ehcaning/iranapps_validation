# Iranapps Validation
A simple npm module for validate https://iranapps.ir/ payments

## Installation
This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).
Before installing, [download and install Node.js](https://nodejs.org/en/download/).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install iranapps_validation
```


## Instantiate module
```js
const iranapps = require('iranapps_validation')(client_id, client_secret, refresh_token, package_name);
```

Example:
```js
const iranapps = require('iranapps_validation')(
    'client_id',
    'client_secret',
    'refresh_token',
    'package_name'
);
```

## Validate Payment
```js
let res = await iranapps.validate(sku, token);
```


Success Example:

```json
{
  "status": 200,
  "data": {
    "kind": "androidpublisher#inappPurchase",
    "purchaseTime": "1586592832",
    "purchaseState": 0,
    "consumptionState": 1,
    "developerPayload": ""
  }
}
```

Error Example:
```json
{
  "status": 200,
  "data": {
    "error_code": 404,
    "error_description": "The requested purchase was not found!"
  }
}
```