var Unique_ID_var;
App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("../Shipping.json", function(Shipping) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Shipping = TruffleContract(Shipping);
      // Connect provider to interact with contract
      App.contracts.Shipping.setProvider(App.web3Provider);
      App.listenForEvents();
      return App.render();
    });
  },

  listenForEvents: function() {
    console.log("UniqueId is generated0", event);
    App.contracts.Shipping.deployed().then(function(instance) {
      console.log("UniqueId is generated1", event);
      instance.GetUniqueIdEvent({}, {
        fromBlock: 'latest',
        toBlock: 'latest'
      }).watch(function(error, event) {
        console.log("UniqueId is generated2", event);
        console.log("UniqueId is ", Unique_ID_var);
        Unique_ID_var = event.args._uniqueId.toString();
        console.log("UniqueId is ", Unique_ID_var);
      });
    });
  },

  generateUID_js: function() {

        console.log("Generate UID pressed");

    App.contracts.Shipping.deployed().then(function(instance) {
      console.log("Confirm button is pressed3");
      return  instance.GetUniqueId( { from: App.account });
    }).catch(function(err) {
      console.log("Confirm button is pressed5");
      console.error(err);
    });

    web3.eth.filter('latest', function(error, result){
       if (!error) {
          console.log("********Transaction is confirmed!!!");

          setTimeout(function () {
          var uidstr1 = "Your Unique ID is :<br> <b>";
          var uidstr2 = uidstr1.concat(Unique_ID_var, "</b><br>Please keep it safe for future reference");
          document.getElementById("showUID").innerHTML = uidstr2;
              }, 3000);

       } else {
          console.error(error)
       }
    });
  },

   render: function() {
     web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
      }
    });
 },

}
$(function() {
  $(window).load(function() {
    App.init();
  });
});


