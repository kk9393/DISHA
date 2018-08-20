var checkuiqueIdvar;

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
  },

  signBillofEntry_official_js: function(){
    console.log("Confirm button is pressed01");
    var uniqueidid2 = document.getElementById("uniqueidid2").value;
    console.log("UID2 temp", uniqueidid2);

    if(!uniqueidid2){
        document.getElementById("mandatoryid2").innerHTML = "* All fields must be filled";
        return false;
    }else{
        document.getElementById("mandatoryid2").innerHTML = "";
    }


    App.contracts.Shipping.deployed().then(function(instance) {
      console.log("Confirm button is pressed31");
      return  instance.sign_Bill_of_Entry(uniqueidid2, { from: App.account });
    }).catch(function(err) {
      console.log("Confirm button is pressed51");
      console.error(err);
    });

    web3.eth.filter('latest', function(error, result){
       if (!error) {
          setTimeout(function () {
                console.log("checkuiqueIdvar check", checkuiqueIdvar2);
                document.getElementById("UniqueIdoutput2").innerHTML = "Your form is submitted and digitally signed successfully";
              }, 3000);
       } else {
          document.getElementById("UniqueIdoutput2").innerHTML = "Failed to sign the contract";
          console.error(error)
       }
    });

  },

   getStoredValues_js: function(_uniqueid) {


        App.contracts.Shipping.deployed().then(function(instance){ return instance.databoolmapping(_uniqueid,0)
        }).then(function(isgenerated_tmp){
           console.log("isgenerated_tmp7777", isgenerated_tmp);
           if(isgenerated_tmp == true){
               console.log("yoyoyo");
               document.getElementById("UniqueIdfield_tmp").innerHTML = "UID Validated";
           }else{
               document.getElementById("UniqueIdfield_tmp").innerHTML = "Invalid UID";
           }
        });

        App.contracts.Shipping.deployed().then(function(instance){ return instance.databoolmapping(_uniqueid,1)
        }).then(function(isimgcreated_tmp){
           console.log("isgenerated_tmp7777", isimgcreated_tmp);
           if(isimgcreated_tmp == true){
               console.log("yoyoyo");
               document.getElementById("imgcreatedid").innerHTML = "Submitted";
           }else{
               document.getElementById("imgcreatedid").innerHTML = "N/A";
           }
        });

        App.contracts.Shipping.deployed().then(function(instance){ return instance.databoolmapping(_uniqueid,2)
        }).then(function(isimgverified_tmp){
           console.log("isimgverified_tmp", isimgverified_tmp);
           if(isimgverified_tmp == true){
               console.log("yoyoyo");
               document.getElementById("imgverifiedid").innerHTML = "Submitted";
           }else{
               document.getElementById("imgverifiedid").innerHTML = "N/A";
           }
        });

        App.contracts.Shipping.deployed().then(function(instance){ return instance.databoolmapping(_uniqueid,3)
        }).then(function(isbillofentrycreated_tmp){
           console.log("isbillofentrycreated_tmp", isbillofentrycreated_tmp);
           if(isbillofentrycreated_tmp == true){
               console.log("yoyoyo");
               document.getElementById("billofentrycreatedid").innerHTML = "Submitted";
           }else{
               document.getElementById("billofentrycreatedid").innerHTML = "N/A";
           }
        });

        App.contracts.Shipping.deployed().then(function(instance){ return instance.databoolmapping(_uniqueid,3)
        }).then(function(isbillofentrycreated_tmp){
           console.log("isbillofentrycreated_tmp", isbillofentrycreated_tmp);
           if(isbillofentrycreated_tmp == true){
               console.log("yoyoyo");
               document.getElementById("billofentrycreatedid").innerHTML = "Submitted";
           }else{
               document.getElementById("billofentrycreatedid").innerHTML = "N/A";
           }
        });

        App.contracts.Shipping.deployed().then(function(instance){ return instance.databoolmapping(_uniqueid,4)
        }).then(function(isbillofentryverified_tmp){
           console.log("isbillofentryverified_tmp", isbillofentryverified_tmp);
           if(isbillofentryverified_tmp == true){
               console.log("yoyoyo");
               document.getElementById("billofentryverifiedid").innerHTML = "Submitted";
           }else{
               document.getElementById("billofentryverifiedid").innerHTML = "N/A";
           }
        });

        //////////////////////////////////PERMITS////////////////////////////////////

        App.contracts.Shipping.deployed().then(function(instance){ return instance.permitboolmapping(_uniqueid,0)
        }).then(function(isimportpermitsubmitted_tmp){
           console.log("isimportpermitsubmitted_tmp", isimportpermitsubmitted_tmp);
           if(isimportpermitsubmitted_tmp == true){
               console.log("yoyoyo");

                   App.contracts.Shipping.deployed().then(function(instance){ return instance.permitsstringmapping(_uniqueid,0)
                   }).then(function(puid_tmp){
                      console.log("puid_tmp", puid_tmp);
                      document.getElementById("importpermitid").innerHTML = String(puid_tmp);
                   });

           }else{
               document.getElementById("importpermitid").innerHTML = "N/A";
           }
        });

        ////////////////////////////////PERMITS END//////////////////////////////////

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
            App.getStoredValues_js(UIDrealtime);
        });

        jQuery('#uniqueidid2').on('input', function() {
            var UIDrealtime=$('#uniqueidid2').val();
            console.log("Real time UID update", UIDrealtime);
            App.getStoredUID_js(UIDrealtime);
        });


    },

}


$(function() {
  $(window).load(function() {
    App.init();
  });
});

