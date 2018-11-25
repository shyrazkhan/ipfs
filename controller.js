var formidable = require('formidable');
var Web3 = require('web3');
var contract = require('truffle-contract');
var path = require('path');
var contractJson = require(path.join(__dirname, 'contract/FileContract.json'))
const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
var url_infura = "https://rinkeby.infura.io/v3/621a72e45c4a4ac4a1047b82e4b29b3c";
var provider = new Web3.providers.HttpProvider(url_infura);

var HDWalletProvider = require("truffle-hdwallet-provider-privkey");
const privKeys = ["63C9452D5ED218CC3A8E43E08026FADEA014E750713A0FA1B1B57BE169A2BFC3"]; // private keys
var hdProvider = new HDWalletProvider(privKeys, "https://rinkeby.infura.io/v3/621a72e45c4a4ac4a1047b82e4b29b3c")


var self = {
    uploadFile: function (req, res) {
        if (req.method === 'POST') {
            var form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
                if (err) {
                    console.log(err);
                    res.send(err);
                }
                else {
                    const buffer = Buffer.from(fields.content);
                    console.log(buffer);
                    let files = [
                        {
                            path: fields.name,
                            content: buffer
                        }
                    ]
                    ipfs.files.add(files, (err, data) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(data)
                            self.addToSmartContract(fields.name, data[0].hash, fields.address, function (result) {
                                res.send(result);
                            }, function (err) {
                                res.send(err);
                            });
                        }
                    });
                }
            });
        }
    },

    addToSmartContract: function (fileName, fileHash, address, success, failed) {
        //todo: load smartContract ABI and call addFile function...
        var fileContract = contract(contractJson);
        fileContract.setProvider(hdProvider);
        if (typeof fileContract.currentProvider.sendAsync !== "function") {
            fileContract.currentProvider.sendAsync = function () {
                return fileContract.currentProvider.send.apply(fileContract.currentProvider, arguments);
            };
        };
        fileContract.deployed().then(function (instance) { 
            console.log('address:', address);           
            console.log('fileName:', fileName);
            console.log('fileHash:', fileHash);            
            var fileNameBytes = Web3.utils.padRight(Web3.utils.fromAscii(fileName));                        
            console.log(fileNameBytes);
            var fileHashBytes = Web3.utils.padRight(Web3.utils.fromAscii(fileHash));              
            console.log(fileHashBytes);
            return instance.addFile(fileHashBytes, fileNameBytes, {
                from: address
            });
        }).then(function(result){
            console.log(result);
            success(result);
        }).catch(function (err) {
            console.log(err)
            failed(err);
        });
    }
};

module.exports = self;

// module.exports = (function () {
//     return {
//     }
// })();