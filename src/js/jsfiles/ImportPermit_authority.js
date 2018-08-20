var isauthority = true;;
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
    $.getJSON("../Permits.json", function(Permits) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Permits = TruffleContract(Permits);
      // Connect provider to interact with contract
      App.contracts.Permits.setProvider(App.web3Provider);
      return App.render();
    });
  },

  authorizeImportPermit_official_js: function() {

    console.log("Confirm button is pressed0");
    var addressid = document.getElementById("addressid").value;
    console.log("address temp", addressid);

    var nameofofficialid = document.getElementById("nameofofficialid").value;
    console.log("nameofofficialid****** : ", nameofofficialid);
    if(!addressid || !nameofofficialid){
        document.getElementById("mandatoryid").innerHTML = "* All fields must be filled";
        return false;
    }else{
        document.getElementById("mandatoryid").innerHTML = "";
    }

    App.contracts.Permits.deployed().then(function(instance) {
      console.log("Confirm button is pressed3");
      return  instance.authorize_ImportPermit(addressid, nameofofficialid, { from: App.account });
    }).catch(function(err) {
      console.log("Confirm button is pressed5");
      document.getElementById("authorize_return").innerHTML = "Failed Transaction!";
      isauthority = false;
      console.error(err);
    });

    web3.eth.filter('latest', function(error, result){
       if (!error) {
          setTimeout(function () {
                if(isauthority){
                    document.getElementById("authorize_return").innerHTML = "Successful Transaction!";
               }
          }, 3000);
       } else {

          console.error(error)
       }
    });

  },

   getStoredAddress_js: function(_address) {

         App.contracts.Permits.deployed().then(function(instance) {
             console.log("Render instance deployed");
             return  instance.ImportPermit_officials(_address);
         }).then(function(ImportPermit_officialsStruct) {

          var name = ImportPermit_officialsStruct[0];
          console.log("name", name);

          var isauthorized = ImportPermit_officialsStruct[1];
          console.log("isauthorized", isauthorized);

          if(isauthorized){
              console.log("isauthorized", isauthorized);
              document.getElementById("nameofofficialid").value = name;
              document.getElementById("authorize_return").innerHTML = 'Person already authorized';
              document.getElementById("nameofofficialid").disabled = true;
              document.getElementById("authorize_button").value = "Unauthorize";
          }else{
              document.getElementById("nameofofficialid").value = '';
              document.getElementById("authorize_return").innerHTML = '';
              document.getElementById("nameofofficialid").disabled = false;
              document.getElementById("authorize_button").value = "Authorize";
          }
         });

   },

   render: function() {
        web3.eth.getCoinbase(function(err, account) {
            if (err === null) {
                App.account = account;
            }
        });

        jQuery('#addressid').on('input', function() {
            var Addressrealtime=$('#addressid').val();
            console.log("Real time Address update", Addressrealtime);
            App.getStoredAddress_js(Addressrealtime);
        });
    },

}


$(function() {
  $(window).load(function() {
    App.init();
  });
});

