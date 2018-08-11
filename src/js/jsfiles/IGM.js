var checkuiqueIdvar;
var checkuiqueIdvar2;

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
      instance.CheckUniqueIdEvent({}, {
        fromBlock: 'latest',
        toBlock: 'latest'
      }).watch(function(error, event) {
        console.log("UniqueId is generated2", event);
        checkuiqueIdvar = event.args._isgenerated;
        console.log("checkuiqueIdvar :", checkuiqueIdvar);
      });
    });

    App.contracts.Shipping.deployed().then(function(instance) {
      console.log("UniqueId is generated1", event);
      instance.CheckIGMofficialverificationEvent({}, {
        fromBlock: 'latest',
        toBlock: 'latest'
      }).watch(function(error, event) {
        console.log("UniqueId is generated2", event);
        checkuiqueIdvar2 = event.args._isIGMofficialverified;
        console.log("checkuiqueIdvar2 :", checkuiqueIdvar2);
      });
    });
  },   

  SetIGMdata_js: function() {

    console.log("Confirm button is pressed0");
    var uniqueidid = document.getElementById("uniqueidid").value;
    console.log("UID temp", uniqueidid);

    var billnoid = document.getElementById("billnoid").value;
    console.log("Confirm button is pressed1");
    var nameofexporterid = document.getElementById("nameofexporterid").value;
    console.log("Confirm button is pressed2");

    if(!uniqueidid || !billnoid || !nameofexporterid){
        document.getElementById("mandatoryid").innerHTML = "* All fields must be filled";
        return false;
    }else{
        document.getElementById("mandatoryid").innerHTML = "";
    }


    App.contracts.Shipping.deployed().then(function(instance) {
      console.log("Confirm button is pressed3");
      return  instance.SetIGMdata(uniqueidid, billnoid, nameofexporterid, { from: App.account });
    }).catch(function(err) {
      console.log("Confirm button is pressed5");
      console.error(err);
    });

    web3.eth.filter('latest', function(error, result){
       if (!error) {
          setTimeout(function () {
                 if(checkuiqueIdvar ==true){
                    console.log("checkuiqueIdvar check", checkuiqueIdvar);
                    document.getElementById("UniqueIdoutput").innerHTML = "Your form is submitted and digitally signed successfully";
                 }else{
                    console.log("checkuiqueIdvar check", checkuiqueIdvar);
                    document.getElementById("UniqueIdoutput").innerHTML = "Unique ID submitted is wrong. Please check once again";
                }
              }, 3000);
       } else {
          console.error(error)
       }
    });

  },

  signIMG_official_js: function(){
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
      return  instance.sign_IGM(uniqueidid2, { from: App.account });
    }).catch(function(err) {
      console.log("Confirm button is pressed51");
      console.error(err);
    });

    web3.eth.filter('latest', function(error, result){
       if (!error) {
          setTimeout(function () {
                 if(checkuiqueIdvar2 ==true){
                    console.log("checkuiqueIdvar check", checkuiqueIdvar2);
                    document.getElementById("UniqueIdoutput2").innerHTML = "Your form is submitted and digitally signed successfully";
                 }else{
                    console.log("checkuiqueIdvar check", checkuiqueIdvar2);
                    document.getElementById("UniqueIdoutput2").innerHTML = "Failed to sign";
                }
              }, 3000);
       } else {
          document.getElementById("UniqueIdoutput2").innerHTML = "Failed to sign the contract";
          console.error(error)
       }
    });


  },

   getStoredValues_js: function(_uniqueid) {

      App.contracts.Shipping.deployed().then(function(instance) {
          console.log("Render instance deployed");
          return  instance.datamapping(_uniqueid);
      }).then(function(data) {

          var isgenerated_tmp = data[0];
          console.log("isgenerated_tmp", isgenerated_tmp);
          if(isgenerated_tmp){
              document.getElementById("UniqueIdfield_tmp").innerHTML = "UID Validated";
          }else{
              document.getElementById("UniqueIdfield_tmp").innerHTML = "Invalid UID";
          }

          var billno_tmp = data[1].c[0];
          console.log("billno_tmp", billno_tmp);
          if(billno_tmp){
              console.log("billno_tmp", billno_tmp);
              document.getElementById("billnoid").value = billno_tmp;
              document.getElementById("billnoid").disabled = true;
          }else{
              document.getElementById("billnoid").value = '';
              document.getElementById("billnoid").disabled = false;
          }


          var nameofexporter_tmp = data[2];
          console.log("nameofexporter", nameofexporter_tmp);

          if(nameofexporter_tmp){
              console.log("nameofexporter_tmp", nameofexporter_tmp);
              document.getElementById("nameofexporterid").value = nameofexporter_tmp;
              document.getElementById("nameofexporterid").disabled = true;
          }else{
              document.getElementById("nameofexporterid").value = '';
              document.getElementById("nameofexporterid").disabled = false;
          }

          //****************var nameofexporter_tmp = data[2]; *********// FOR COMMODIT DESCRIPTION

          var IGM_timestamp = data[4].c[0];
          console.log("IGM_timestamp", IGM_timestamp);
          console.log("DATA *****", data);

                if(IGM_timestamp){
                    console.log("IGM_timestamp", IGM_timestamp);
                    document.getElementById("sign_button").disabled = true;
                    document.getElementById("UniqueIdoutput").innerHTML = "The form has been submitted before";

                }else{
                    document.getElementById("sign_button").disabled = false;
                }
      });

   },


      getStoredUID_js: function(_uniqueid) {
         var election_instance;
         App.contracts.Shipping.deployed().then(function(instance) {
             console.log("Render instance deployed");
             election_instance = instance
             return election_instance}).then(function(instance){
             return instance.datamapping(_uniqueid);
         }).then(function(data) {

             var isgenerated_tmp = data[0];
             console.log("isgenerated_tmp", isgenerated_tmp);
             if(isgenerated_tmp){
                 document.getElementById("UniqueIdfield_tmp2").innerHTML = "UID Validated";
             }else{
                 document.getElementById("UniqueIdfield_tmp2").innerHTML = "Invalid UID";
             }

             var IGM_signed_official_address = data[5];
             console.log("IGM_signed_official_address", IGM_signed_official_address);
             if(IGM_signed_official_address){
                 election_instance.IGM_officials(IGM_signed_official_address).then(function(IGM_officials){
                 IGM_official_name_tmp = IGM_officials[0];
                 console.log("IGM_official_name_tmp", IGM_official_name_tmp);
                 document.getElementById("nameofofficialid").value = IGM_official_name_tmp;
                 document.getElementById("contract_status").innerHTML = "The contract is already signed";
                 document.getElementById("sign_official_button").disabled = true;
                 });
                 document.getElementById("nameofofficialid").disabled = true;
             }else{
                 document.getElementById("nameofofficialid").innerHTML = "";
                 document.getElementById("nameofofficialid").disabled = false;
                 document.getElementById("contract_status").innerHTML = "";
                 document.getElementById("sign_official_button").disabled = false;
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

