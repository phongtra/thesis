# Phong Tran's Bachelor Thesis

This is Phong Tran's South Eastern Finland UAS Bachelor thesis project

## Contents

This project consists of:

- Client server
- Backend server
- US Election Vote Smart Contract
- Voter Smart Contract

## To run the project with my smart contract instance

Navigate to the server folder and run

`yarn`

`yarn dev:build`

In `.env`, change the DB_URL to your own PostgreSQL connection URL.

After that, navigate to the client folder and run

`yarn`

`yarn start`

## Deploy your own smart contract

Navigate to [infura](https://infura.io/) to create an account and project

After that, go to the smart contract folder, open `truffle-config.js` and add the following codes

```
rinkeby: {
    provider: () =>
        new HDWalletProvider(
        '{YOUR MNEMONIC}',
        `https://rinkeby.infura.io/v3/{YOUR INFURA KEY}`
        ),
    network_id: 4, // Ropsten's id
    gas: 5500000, // Ropsten has a lower block limit than mainnet
    confirmations: 2, // # of confs to wait between deployments. (default: 0)
    timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
    skipDryRun: true // Skip dry run before migrations? (default: false for public nets )
}
```

You should consolidate Ethereum documentation to get an understanding about how to get private keys, mnemoics and all smart contract related knowledge
