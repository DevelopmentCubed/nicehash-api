# nicehash-api
[![NPM](https://img.shields.io/npm/v/@developmentcubed/nicehash-api?style=flat-square)](https://www.npmjs.com/package/@developmentcubed/nicehash-api) 

A wrapper for the NiceHash API.

You can view the documentation [here](https://developmentcubed.github.io/nicehash-api/classes/index.NiceHash.html).

## Installation
```
npm install -S @developmentcubed/nicehash-api
```

## Examples

### Getting the info of an account
```js
const { NiceHash } = require("@developmentcubed/nicehash-api");

const api = new NiceHash({
  apiKey: 'Your API Key',
  apiSecret: 'Your API Secret',
  orgID: 'Your Organization ID'
});

(async () => {
  const account = await api.getAccount('BTC');
  console.log(account.available); // 0.00012363
})();
```
