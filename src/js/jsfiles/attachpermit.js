
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

      return App.render();
    });

    $.getJSON("../Permits.json", function(Permits) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Permits = TruffleContract(Permits);
      // Connect provider to interact with contract
      App.contracts.Permits.setProvider(App.web3Provider);

      return App.render();
    });
  },

  attachImportPermit: function(){
    console.log("Confirm button is pressed01");
    var uniqueidid = document.getElementById("uniqueidid").value;
    var importpersonaluniqueidid = document.getElementById("importpersonaluniqueidid").value;
    console.log("uniqueidid", uniqueidid);
    console.log("importpersonaluniqueidid", importpersonaluniqueidid);

    if(!uniqueidid || !importpersonaluniqueidid){
        document.getElementById("mandatoryid").innerHTML = "* All fields must be filled";
        return false;
    }else{
        document.getElementById("mandatoryid").innerHTML = "";
    }

     App.contracts.Permits.deployed().then(function(instance){ return instance.databoolmapping(importpersonaluniqueidid,2)
     }).then(function(isImportPermitverified_tmp){
        console.log("isImportPermitverified_tmp", isImportPermitverified_tmp);
        if(isImportPermitverified_tmp == true){
            App.contracts.Shipping.deployed().then(function(instance) {
              console.log("Confirm button is pressed31");
              return  instance.setImportPermit(uniqueidid, importpersonaluniqueidid, { from: App.account });
            }).catch(function(err) {
              console.log("Confirm button is pressed51");
              console.error(err);
            });
        }else{
            document.getElementById("mandatoryid").innerHTML = "Your Import Permit is not valid!"
        }
     });

    web3.eth.filter('latest', function(error, result){
       if (!error) {
          setTimeout(function () {
                document.getElementById("UniqueIdoutput").innerHTML = "Your form is submitted and digitally signed successfully";
              }, 3000);
       } else {
          document.getElementById("UniqueIdoutput").innerHTML = "Failed to sign the contract";
          console.error(error)
       }
    });

  },


   getStoredUID_js: function(_uniqueid) {

         App.contracts.Shipping.deployed().then(function(instance){ return instance.databoolmapping(_uniqueid,0)
         }).then(function(isgenerated_tmp){
            console.log("isgenerated_tmp", isgenerated_tmp);
            if(isgenerated_tmp == true){
                document.getElementById("UniqueIdfield_tmp").innerHTML = "UID Validated";
            }else{
                document.getElementById("UniqueIdfield_tmp").innerHTML = "Invalid UID";
            }
         });
   },

   getStoredPUID_js: function(_uniqueid) {
         App.contracts.Permits.deployed().then(function(instance){ return instance.databoolmapping(_uniqueid,0)
         }).then(function(isgenerated_tmp){
            console.log("isgenerated_tmp", isgenerated_tmp);
            if(isgenerated_tmp == true){
                document.getElementById("UniquePIdfield_tmp").innerHTML = "UPID Validated";
            }else{
                document.getElementById("UniquePIdfield_tmp").innerHTML = "Invalid UPID";
            }
         });
   },

   render: function() {
        web3.eth.getCoinbase(function(err, account) {
            if (err === null) {
                App.account = account;
            }
        });

        jQuery('#uniqueidid').on('input', function() {
            var UIDrealtime=$('#uniqueidid').val();
            console.log("Real time UID update", UIDrealtime);
            App.getStoredUID_js(UIDrealtime);
        });

        jQuery('#importpersonaluniqueidid').on('input', function() {
            var PUIDrealtime=$('#importpersonaluniqueidid').val();
            console.log("Real time UID update", PUIDrealtime);
            App.getStoredPUID_js(PUIDrealtime);
        });


    },

}


$(function() {
  $(window).load(function() {
    App.init();
  });
});

