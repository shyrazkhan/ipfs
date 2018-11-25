var greet = artifacts.require("./FileContract.sol");

module.exports = function(deployer){
    deployer.deploy(greet);
}