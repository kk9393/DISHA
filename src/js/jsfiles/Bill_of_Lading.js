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
  },

  SetBillofLadingdata_js: function() {

    console.log("Confirm button is pressed0");
    var uniqueidid = document.getElementById("uniqueidid").value;
    console.log("UID temp", uniqueidid);
/*
    url = 'http://localhost:3000/track/';
    url = url.concat('?uid=');
    url = url.concat(uniqueidid);
    console.log(url);
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', url);
    ourRequest.onload = function(){
        var ourdata = JSON.parse(ourRequest.responseText);
        console.log("GET DATA : ", ourdata);
        var ourdata_latest = ourdata[ourdata.length-1];
        console.log("GET DATA LATEST: ", ourdata_latest);
    }
    ourRequest.send();
*/



    var weightofcargoid = document.getElementById("weightofcargoid").value;
    var nameofimporterid = document.getElementById("nameofimporterid").value;
    var nameofexporterid = document.getElementById("nameofexporterid").value;
    var commoditydescriptionid = document.getElementById("commoditydescriptionid").value;
    var countryid = document.getElementById("countryid").value;
    var nameofoceancarrierid = document.getElementById("nameofoceancarrierid").value;
    var vesselnameid = document.getElementById("vesselnameid").value;
    var portofloadingid = document.getElementById("portofloadingid").value;
    var placeofdeliveryid = document.getElementById("placeofdeliveryid").value;


    if(!weightofcargoid || !nameofimporterid || !nameofexporterid || !commoditydescriptionid || !countryid || !nameofoceancarrierid ||  !vesselnameid || !portofloadingid || !placeofdeliveryid){
        document.getElementById("mandatoryid").innerHTML = "* All fields must be filled";
        return false;
    }else{
        document.getElementById("mandatoryid").innerHTML = "";
    }


    App.contracts.Shipping.deployed().then(function(instance) {
      console.log("Confirm button is pressed3");

      var datauint = [];
      datauint.push(parseInt(weightofcargoid));

      return  instance.SetBillofLadingdata(uniqueidid, datauint, nameofimporterid, nameofexporterid, commoditydescriptionid, countryid, nameofoceancarrierid, vesselnameid, portofloadingid, placeofdeliveryid, { from: App.account });
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

  signBillofLading_official_js: function(){
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
      return  instance.sign_Bill_of_Lading(uniqueidid2, { from: App.account });
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

        App.contracts.Shipping.deployed().then(function(instance){ return instance.datauintmapping(_uniqueid,1)
                }).then(function(weightofcargo_tmp){
                   console.log("weightofcargo_tmp", weightofcargo_tmp);
                  if(weightofcargo_tmp != 0){
                      console.log("weightofcargo_tmp", weightofcargo_tmp);
                      document.getElementById("weightofcargoid").value = weightofcargo_tmp;
                      document.getElementById("weightofcargoid").disabled = true;
                  }else{
                      document.getElementById("weightofcargoid").value = '';
                      document.getElementById("weightofcargoid").disabled = false;
                  }
                });

        App.contracts.Shipping.deployed().then(function(instance){ return instance.datastringmapping(_uniqueid,9)
        }).then(function(nameofimporter_tmp){
           console.log("nameofimporter_tmp", nameofimporter_tmp);
          if(nameofimporter_tmp != 0){
              console.log("nameofimporter_tmp", nameofimporter_tmp);
              document.getElementById("nameofimporterid").value = nameofimporter_tmp;
              document.getElementById("nameofimporterid").disabled = true;
          }else{
              document.getElementById("nameofimporterid").value = '';
              document.getElementById("nameofimporterid").disabled = false;
          }
        });

        App.contracts.Shipping.deployed().then(function(instance){ return instance.datastringmapping(_uniqueid,0)
            }).then(function(nameofexporter_tmp){
               console.log("nameofexporter_tmp", nameofexporter_tmp);
              if(nameofexporter_tmp != 0){
                  console.log("nameofexporter_tmp", nameofexporter_tmp);
                  document.getElementById("nameofexporterid").value = nameofexporter_tmp;
                  document.getElementById("nameofexporterid").disabled = true;
              }else{
                  document.getElementById("nameofexporterid").value = '';
                  document.getElementById("nameofexporterid").disabled = false;
              }
        });

        App.contracts.Shipping.deployed().then(function(instance){ return instance.datastringmapping(_uniqueid,1)
        }).then(function(commoditydescription_tmp){
           console.log("commoditydescription_tmp", commoditydescription_tmp);
          if(commoditydescription_tmp != 0){
              console.log("commoditydescription_tmp", commoditydescription_tmp);
              document.getElementById("commoditydescriptionid").value = commoditydescription_tmp;
              document.getElementById("commoditydescriptionid").disabled = true;
          }else{
              document.getElementById("commoditydescriptionid").value = '';
              document.getElementById("commoditydescriptionid").disabled = false;
          }
        });

        App.contracts.Shipping.deployed().then(function(instance){ return instance.datastringmapping(_uniqueid,2)
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

        App.contracts.Shipping.deployed().then(function(instance){ return instance.datastringmapping(_uniqueid,3)
        }).then(function(nameofoceancarrier_tmp){
           console.log("nameofoceancarrier_tmp", nameofoceancarrier_tmp);
          if(nameofoceancarrier_tmp != 0){
              console.log("nameofoceancarrier_tmp", nameofoceancarrier_tmp);
              document.getElementById("nameofoceancarrierid").value = nameofoceancarrier_tmp;
              document.getElementById("nameofoceancarrierid").disabled = true;
          }else{
              document.getElementById("nameofoceancarrierid").value = '';
              document.getElementById("nameofoceancarrierid").disabled = false;
          }
        });


        App.contracts.Shipping.deployed().then(function(instance){ return instance.datastringmapping(_uniqueid,5)
        }).then(function(vesselname_tmp){
           console.log("vesselname_tmp", vesselname_tmp);
          if(vesselname_tmp != 0){
              console.log("vesselname_tmp", vesselname_tmp);
              document.getElementById("vesselnameid").value = vesselname_tmp;
              document.getElementById("vesselnameid").disabled = true;
          }else{
              document.getElementById("vesselnameid").value = '';
              document.getElementById("vesselnameid").disabled = false;
          }
        });


            //IGM_official_address = 0; BillofEntry_official_address = 1; BillofLading_official_address = 2;

            // IGMgeneration_timestamp = 0; IGMverefication_timestamp = 1;
            //BillofEntrygeneration_timestamp = 2; BillofEntryverification_timestamp = 3
            //BillofLadinggeneration_timestamp = 4; BillofLadingverification_timestamp = 5

            // isgenerated =0; isIGMcreated = 1; isIGMverified = 2; isBillofEntrycreated = 3;
            //isBillofEntryverified = 4; isBillofLadingcreated = 5; isBillofLadingverified = 6;

            // billno = 0; weightofcargo = 1; containernumber = 2; custom_duty = 3; cha_code = 4; GST = 5;

            // nameofexporter = 0; commoditydescription = 1; country = 2; nameofoceancarrier = 3
            // nameofshipper = 4; vesselname = 5; placeofissue = 6; placeofdelivery = 7;
            // portofloading = 8 nameofimporter = 9;
        //////////////////////////////////////
        //address _uniqueId, uint[] datauint, string _nameofimporter,
          //  string _nameofexporter, string _commoditydescription, string _country,
           // string _nameofoceancarrier, string _vesselname, string _portofloading, string _placeofdelivery
             //    weightofcargo

        App.contracts.Shipping.deployed().then(function(instance){ return instance.datastringmapping(_uniqueid,8)
        }).then(function(portofloading_tmp){
           console.log("portofloading_tmp", portofloading_tmp);
          if(portofloading_tmp != 0){
              console.log("portofloading_tmp", portofloading_tmp);
              document.getElementById("portofloadingid").value = portofloading_tmp;
              document.getElementById("portofloadingid").disabled = true;
          }else{
              document.getElementById("portofloadingid").value = '';
              document.getElementById("portofloadingid").disabled = false;
          }
        });

        App.contracts.Shipping.deployed().then(function(instance){ return instance.datastringmapping(_uniqueid,7)
        }).then(function(placeofdelivery_tmp){
           console.log("placeofdelivery_tmp", placeofdelivery_tmp);
          if(placeofdelivery_tmp != 0){
              console.log("placeofdelivery_tmp", placeofdelivery_tmp);
              document.getElementById("placeofdeliveryid").value = placeofdelivery_tmp;
              document.getElementById("placeofdeliveryid").disabled = true;
          }else{
              document.getElementById("placeofdeliveryid").value = '';
              document.getElementById("placeofdeliveryid").disabled = false;
          }
        });

   },



      getStoredUID_js: function(_uniqueid) {

         App.contracts.Shipping.deployed().then(function(instance){ return instance.databoolmapping(_uniqueid,0)
         }).then(function(isgenerated_tmp){
            console.log("isgenerated_tmp", isgenerated_tmp);
            if(isgenerated_tmp == true){
                document.getElementById("UniqueIdfield_tmp2").innerHTML = "UID Validated";
            }else{
                document.getElementById("UniqueIdfield_tmp2").innerHTML = "Invalid UID";
            }
         });

       App.contracts.Shipping.deployed().then(function(instance){ return instance.dataofficialaddressmapping(_uniqueid,2);
       }).then(function(BillofLading_signed_official_address){
            console.log("BillofLading_signed_official_address", BillofLading_signed_official_address);



            App.contracts.Shipping.deployed().then(function(instance){ return instance.BillofLading_officials(BillofLading_signed_official_address)}).then(function(BillofLading_officials){
              BillofLading_officials_tmp = BillofLading_officials[0];
              console.log("BillofLading_officials_tmp", BillofLading_officials_tmp);

          if(IGM_official_name_tmp){
              document.getElementById("nameofofficialid").value = BillofLading_officials_tmp;
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

