//const HDWalletProvider = require("truffle-hdwallet-provider");

const HDWalletProvider = require("truffle-hdwallet-provider-privkey");
const privKeys = ["63C9452D5ED218CC3A8E43E08026FADEA014E750713A0FA1B1B57BE169A2BFC3"]; // private keys
const privateKey = "63C9452D5ED218CC3A8E43E08026FADEA014E750713A0FA1B1B57BE169A2BFC3";

//require('dotenv').config()  // Store environment-specific variable from '.env' to process.env
const mnemonic = 'Thoughtfully Subliminal Hairless Gambit Serenaded Frumpy Ichabod Towards Edgy Dollars Merrily.'

module.exports = {
    solc: {
        optimizer: {
            enabled: true,
            runs: 2000
        }
    },
    networks: {
        development: {
            host: 'localhost',
            port: 8545,
            network_id: '*' // Match any network id
        },
        rinkeby: {
            provider: () => new HDWalletProvider(privKeys, "https://rinkeby.infura.io/v3/621a72e45c4a4ac4a1047b82e4b29b3c"),
            network_id: 4,
            gas: 6700000           
        }
        // testnets
        // properties
        // network_id: identifier for network based on ethereum blockchain. Find out more at https://github.com/ethereumbook/ethereumbook/issues/110
        // gas: gas limit
        // gasPrice: gas price in gwei
        //ropsten: {
        //    provider: () => new HDWalletProvider('mnemonic', "https://ropsten.infura.io/v3/621a72e45c4a4ac4a1047b82e4b29b3c"),
        //    network_id: 3,
        //    gas: 3000000,
        //    gasPrice: 21
        //},
        //kovan: {
        //    provider: () => new HDWalletProvider(process.env.MNENOMIC, "https://kovan.infura.io/v3/" + process.env.INFURA_API_KEY),
        //    network_id: 42,
        //    gas: 3000000,
        //    gasPrice: 21
        //},        
        // main ethereum network(mainnet)
        //main: {
        //    provider: () => new HDWalletProvider(process.env.MNENOMIC, "https://mainnet.infura.io/v3/" + process.env.INFURA_API_KEY),
        //    network_id: 1,
        //    gas: 3000000,
        //    gasPrice: 21
        //}
    }
}
