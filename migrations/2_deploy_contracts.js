module.exports = function(deployer) {
  deployer.deploy(Splitter,web3.eth.accounts[1],web3.eth.accounts[2],web3.eth.accounts[3]);
  //deployer.deploy(Splitter); //Would like for addresses to be passed in at Web UI

};
