let Web3 = require('web3');
var path = require('path');
var contractJson = require(path.join(__dirname,'contract/FileContract.json')); 
var contract = require('truffle-contract');
var HDWalletProvider = require("truffle-hdwallet-provider-privkey");
const privKeys = ["63C9452D5ED218CC3A8E43E08026FADEA014E750713A0FA1B1B57BE169A2BFC3"]; // private keys
var hdProvider = new HDWalletProvider(privKeys, "https://rinkeby.infura.io/v3/621a72e45c4a4ac4a1047b82e4b29b3c")

//ganache url path
// let url_ganache = "http://127.0.0.1:7545";
// // let provider = new Web3.providers.HttpProvider(url_ganache);
// // let web3 = new Web3(provider);
// // let localAddress = '0x6744BCDB3d1527d0Dd6e89dBd88a85e4439C54B1';
// // web3.eth.getBalance(localAddress, (err, balance) => {
// //      balanceEther = web3.eth.fromWei(balance, 'ether');
// //     console.log(balanceEther);
// // });

// Mainnet setting
// let url_infura = "https://mainnet.infura.io/v3/621a72e45c4a4ac4a1047b82e4b29b3c";
// let provider = new Web3.providers.HttpProvider(url_infura);
// let web3 = new Web3(provider);

// Rinkeby setting
let url_infura = "https://rinkeby.infura.io/v3/621a72e45c4a4ac4a1047b82e4b29b3c";
let provider = new Web3.providers.HttpProvider(url_infura);
let web3 = new Web3(provider);

var version = web3.version;
console.log(version); // "0.2.0"
// var defaultaccount = web3.eth.defaultaccount;
// console.log(defaultaccount);


//let wallet = web3.eth.accounts.wallet.create(2, "mywallet");
// let wallet = web3.eth.accounts.wallet;
// let account = web3.eth.accounts.create();
// wallet.add(account.privateKey);
// console.log(wallet);

// web3.eth.getBlockNumber().then((result) => {
//     console.log(result);
// });

// web3.eth.getBlock("latest").then((block) => {
//     console.log(block); 
// })

// web3.eth.getTransactionFromBlock(6684616, 2).then((result) => {
//     console.log(result);
// })


var fileName = web3.utils.padRight(web3.utils.fromAscii('dapp'));
console.log(fileName);

var fileHash = web3.utils.padRight(web3.utils.fromAscii('QmU3Hmy6GcYEQCcHvydwbhVHMbdP6pUDtHjUqRcgf4BxNa'));
console.log(fileHash);
web3.eth.net.getNetworkType(function(err,res){console.log(res)})

//(async () => {

    var fileContract = contract(contractJson);
    fileContract.setProvider(provider);
    //var instance = await fileContract.deployed();
    if (typeof fileContract.currentProvider.sendAsync !== "function") {
        fileContract.currentProvider.sendAsync = function() {
          return fileContract.currentProvider.send.apply(fileContract.currentProvider, arguments);
        };
    };

    fileContract.deployed().then(function(instance){
        console.log(instance.address);
    });    

    // var cc = new web3.eth.Contract(contractJson, '0xE349A6A40322a28163C7eBC04F50B32EBBD29Cb4');
    // console.log(cc);

    



    //console.log(instance.address);
//})();







