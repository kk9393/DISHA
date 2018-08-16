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

  copyUID_js: function() {
          /*var copyText = document.getElementById("UID_input");
          console.log("copyText", copyText);
          copyText.select();
          document.execCommand("copy");
          console.log("Text Copied!!");*/
            var copyText = document.getElementById("myInput");
            copyText.disabled = false;
            copyText.select();
            document.execCommand("copy");
            copyText.disabled = true;
            //alert("Copied the text: " + copyText.value);

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
//<input type="text" value="Hello World" id="myInput">
          setTimeout(function () {
          //var uidstr1 = 'Your Unique ID is :<br><form style="margin-left: 250px; margin-right: 250px;"> <b><input disabled type="text" value="';
          //var uidstr2 = uidstr1.concat(Unique_ID_var, '" id="UID_input"/>  </b> </form> <button style="background-color:gray;border-radius: 4px;" onclick="App.copyUID_js()"><i style="color:white" class="far fa-copy"></i></button><br>Please keep it safe for future reference');
//<input type="text" value="Hello World" id="myInput">
          var uidstr1 = '<input disabled style="width:40%;margin-right:20px;" type="text" value="';
          var abcd = 'Hello world';
          var uidstr2 = uidstr1.concat(Unique_ID_var,'" id="myInput"><button style="background-color:gray; border-radius: 4px;" onclick="App.copyUID_js()"><i style="color:white" class="far fa-copy"></i></button> </br> <a>UID is generated! Please keep it safe for future reference</a>');
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


