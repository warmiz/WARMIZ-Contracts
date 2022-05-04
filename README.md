# WARMIZ smart contract

## Installation

`npm install`

## Compile contract

`npm run build`
## Deploy the WARMIZ to Ethereum
  - Create the file `.secret` containing the private key
  - Check/edit the input params in file `migrations/1_deployWARMIZ.js`
    Parameters should be like
```sh
    "0x....",                       // owner    
    "0x....",                       // token holder
```
  - Run this cmd: `npx truffle migrate --reset --network ethmainnet -f 1 --to 1`
  
  