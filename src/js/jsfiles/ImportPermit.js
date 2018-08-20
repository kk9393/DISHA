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
    $.getJSON("../Permits.json", function(Permits) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Permits = TruffleContract(Permits);
      // Connect provider to interact with contract
      App.contracts.Permits.setProvider(App.web3Provider);
      App.listenForEvents();
      return App.render();
    });
  },

  listenForEvents: function() {
    console.log("UniqueId is generated0", event);
    App.contracts.Permits.deployed().then(function(instance) {
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
  },

  SetImportPermitdata_js: function() {

    console.log("Confirm button is pressed0");
    var uniqueidid = document.getElementById("uniqueidid").value;
    console.log("UID temp", uniqueidid);

    var nameid = document.getElementById("nameid").value;
    var postaladdressid = document.getElementById("postaladdressid").value;
    var countryid = document.getElementById("countryid").value;
    var pannumberid = document.getElementById("pannumberid").value;
    var aadharnumberid = document.getElementById("aadharnumberid").value;


    if(!uniqueidid || !nameid || !postaladdressid || !countryid || !pannumberid || !aadharnumberid){

        document.getElementById("mandatoryid").innerHTML = "* All fields must be filled";
        return false;
    }else{
        document.getElementById("mandatoryid").innerHTML = "";
    }


    App.contracts.Permits.deployed().then(function(instance) {
      console.log("Confirm button is pressed3");

        //!uniqueidid || !nameid || !postaladdressid || !countryid || !pannumberid || !aadharnumberid
         //address _uniqueId, string _name, string _postaladdress,
        //string _PAN_number, string _country, string _Aadhar_number
      return  instance.SetImportPermitdata(uniqueidid, nameid, postaladdressid, pannumberid, countryid, aadharnumberid, { from: App.account });
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

  signImportPermit_official_js: function(){
    console.log("Confirm button is pressed01");
    var uniqueidid2 = document.getElementById("uniqueidid2").value;
    console.log("UID2 temp", uniqueidid2);

    if(!uniqueidid2){
        document.getElementById("mandatoryid2").innerHTML = "* All fields must be filled";
        return false;
    }else{
        document.getElementById("mandatoryid2").innerHTML = "";
    }


    App.contracts.Permits.deployed().then(function(instance) {
      console.log("Confirm button is pressed31");
      return  instance.sign_Import_Permit(uniqueidid2, { from: App.account });
    }).catch(function(err) {
      console.log("Confirm button is pressed51");
      console.error(err);
    });

    web3.eth.filter('latest', function(error, result){
       if (!error) {
          setTimeout(function () {
                document.getElementById("UniqueIdoutput2").innerHTML = "Your form is submitted and digitally signed successfully";

              }, 3000);
       } else {
          document.getElementById("UniqueIdoutput2").innerHTML = "Failed to sign the contract";
          console.error(error)
       }
    });

  },

   getStoredValues_js: function(_uniqueid) {


        App.contracts.Permits.deployed().then(function(instance){ return instance.databoolmapping(_uniqueid,0)
        }).then(function(isgenerated_tmp){
           console.log("isgenerated_tmp7777", isgenerated_tmp);
           if(isgenerated_tmp == true){
               document.getElementById("UniqueIdfield_tmp").innerHTML = "UID Validated";
           }else{
               document.getElementById("UniqueIdfield_tmp").innerHTML = "Invalid UID";
           }
        });


        App.contracts.Permits.deployed().then(function(instance){ return instance.datastringmapping(_uniqueid,0)
        }).then(function(name_tmp){
           console.log("name_tmp", name_tmp);
          if(name_tmp != 0){
              console.log("name_tmp", name_tmp);
              document.getElementById("nameid").value = name_tmp;
              document.getElementById("nameid").disabled = true;
          }else{
              document.getElementById("nameid").value = '';
              document.getElementById("nameid").disabled = false;
          }
        });

        App.contracts.Permits.deployed().then(function(instance){ return instance.datastringmapping(_uniqueid,1)
        }).then(function(postaladdress_tmp){
           console.log("postaladdress_tmp", postaladdress_tmp);
          if(postaladdress_tmp != 0){
              console.log("postaladdress_tmp", postaladdress_tmp);
              document.getElementById("postaladdressid").value = postaladdress_tmp;
              document.getElementById("postaladdressid").disabled = true;
          }else{
              document.getElementById("postaladdressid").value = '';
              document.getElementById("postaladdressid").disabled = false;
          }
        });

        App.contracts.Permits.deployed().then(function(instance){ return instance.datastringmapping(_uniqueid,2)
        }).then(function(PAN_number_tmp){
           console.log("PAN_number_tmp", PAN_number_tmp);
          if(PAN_number_tmp != 0){
              console.log("PAN_number_tmp", PAN_number_tmp);
              document.getElementById("pannumberid").value = PAN_number_tmp;
              document.getElementById("pannumberid").disabled = true;
          }else{
              document.getElementById("pannumberid").value = '';
              document.getElementById("pannumberid").disabled = false;
          }
        });

        App.contracts.Permits.deployed().then(function(instance){ return instance.datastringmapping(_uniqueid,3)
        }).then(function(country_tmp){
           console.log("country_tmp", country_tmp);
          if(country_tmp != 0){
              console.log("country_tmp", country_tmp);
              document.getElementById("countryid").value = country_tmp;
              document.getElementById("countryid").disabled = true;
          }else{
              document.getElementById("countryid").value = '';
              document.getElementById("countryid").disabled = false;
          }
        });

                //!uniqueidid || !nameid || !postaladdressid || !countryid || !pannumberid || !aadharnumberid
                 //address _uniqueId, string _name, string _postaladdress,
                //string _PAN_number, string _country, string _Aadhar_number

        App.contracts.Permits.deployed().then(function(instance){ return instance.datastringmapping(_uniqueid,4)
        }).then(function(aadhar_number_tmp){
           console.log("aadhar_number_tmp", aadhar_number_tmp);
          if(aadhar_number_tmp != 0){
              console.log("aadhar_number_tmp", aadhar_number_tmp);
              document.getElementById("aadharnumberid").value = aadhar_number_tmp;
              document.getElementById("aadharnumberid").disabled = true;
          }else{
              document.getElementById("aadharnumberid").value = '';
              document.getElementById("aadharnumberid").disabled = false;
          }
        });

   },


      getStoredUID_js: function(_uniqueid) {

         App.contracts.Permits.deployed().then(function(instance){ return instance.databoolmapping(_uniqueid,0)
         }).then(function(isgenerated_tmp){
            console.log("isgenerated_tmp", isgenerated_tmp);
            if(isgenerated_tmp == true){
                document.getElementById("UniqueIdfield_tmp2").innerHTML = "UID Validated";
            }else{
                document.getElementById("UniqueIdfield_tmp2").innerHTML = "Invalid UID";
            }
         });

       App.contracts.Permits.deployed().then(function(instance){ return instance.dataofficialaddressmapping(_uniqueid,0);
       }).then(function(Import_Permit_official_address){
            console.log("Import_Permit_official_address", Import_Permit_official_address);



            App.contracts.Permits.deployed().then(function(instance){ return instance.ImportPermit_officials(Import_Permit_official_address)}).then(function(ImportPermit_officials){
              ImportPermit_official_name_tmp = ImportPermit_officials[0];
              console.log("ImportPermit_official_name_tmp", ImportPermit_official_name_tmp);

          if(ImportPermit_official_name_tmp){
              document.getElementById("nameofofficialid").value = ImportPermit_official_name_tmp;
              document.getElementById("contract_status").innerHTML = "The contract is already signed";
              document.getElementById("sign_official_button").value = true;
              document.getElementById("nameofofficialid").disabled = true;
          }else{
              document.getElementById("nameofofficialid").innerHTML = "";
              document.getElementById("contract_status").innerHTML = "";
              document.getElementById("sign_official_button").disabled = false;
          }
        });
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

