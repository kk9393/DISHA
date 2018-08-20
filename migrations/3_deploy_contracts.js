var Permits = artifacts.require("./Permits.sol");

module.exports = function(deployer) {
  deployer.deploy(Permits);
};
