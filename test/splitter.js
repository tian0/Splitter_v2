contract('Splitter', function(accounts) {
  var owner = web3.eth.accounts[0];
  var Alice = web3.eth.accounts[1];
  var Bob = web3.eth.accounts[2];
  var Carol = web3.eth.accounts[3];
  var amountToSend = 150;

  beforeEach(function() {
    var splitter = Splitter.new(Alice,Bob,Carol, {from: owner, gas: 2000000});
  })

  it("Alice should have valid account", function() {
    var splitter = Splitter.deployed();

    return splitter.Alice.call()
      .then(function(Alice) {
        assert.notStrictEqual(Alice,0,"Alice account not valid");
      })
  })
  it("Bob should have valid account", function() {
    var splitter = Splitter.deployed();

    return splitter.Bob.call()
      .then(function(Bob) {
        assert.notStrictEqual(Bob,0,"Bob account not valid");
      })
  })
  it("Carol should have valid account", function() {
    var splitter = Splitter.deployed();

    return splitter.Carol.call()
      .then(function(Carol) {
        assert.notStrictEqual(Carol,0,"Carol account not valid");
      })
  })
  
//   it("should send coin correctly", function() {
//     var meta = MetaCoin.deployed();

//     // Get initial balances of first and second account.
//     var account_one = accounts[0];
//     var account_two = accounts[1];

//     var account_one_starting_balance;
//     var account_two_starting_balance;
//     var account_one_ending_balance;
//     var account_two_ending_balance;

//     var amount = 10;

//     return meta.getBalance.call(account_one).then(function(balance) {
//       account_one_starting_balance = balance.toNumber();
//       return meta.getBalance.call(account_two);
//     }).then(function(balance) {
//       account_two_starting_balance = balance.toNumber();
//       return meta.sendCoin(account_two, amount, {from: account_one});
//     }).then(function() {
//       return meta.getBalance.call(account_one);
//     }).then(function(balance) {
//       account_one_ending_balance = balance.toNumber();
//       return meta.getBalance.call(account_two);
//     }).then(function(balance) {
//       account_two_ending_balance = balance.toNumber();

//       assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
//       assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
//     });
//   });
});
