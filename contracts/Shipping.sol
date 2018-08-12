pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;
contract Shipping{

///////////////////////////STRUCT, VARIABLES AND MAPPINGS///////////////////////

    address Owner;

    mapping (address => bool[30]) public databoolmapping;
    // isgenerated =0; isIGMcreated = 1; isIGMverified = 2;
    mapping (address => uint[20]) public datatimestampmapping;
    // IGM_timestamp = 0;
    mapping (address => address[20]) public dataofficialaddressmapping;
    //IGM_official_address = 0;
    mapping (address => string[40]) public datastringmapping;
    // nameofexporter = 0; commoditydescription = 1; country = 2; nameofoceancarrier = 3
    // nameofshipper = 4; vesselname = 5; placeofissue = 6; placeofdelivery = 7;
    // portofloading = 8
    mapping (address => uint[40]) public datauintmapping;
    // billno = 0; weightofcargo = 1; containernumber = 2;

    struct IGM_officialsStruct {
        string name;
        bool isauthorized;
    }

    mapping (address => IGM_officialsStruct) public IGM_officials;


/////////////////////////STRUCT, VARIABLES AND MAPPINGS END//////////////////////

//////////////////////////////////////EVENTS/////////////////////////////////////

    event GetUniqueIdEvent(address indexed _uniqueId);

    event CheckUniqueIdEvent(bool indexed _isgenerated);

    event CheckIGMofficialverificationEvent(bool indexed _isIGMofficialverified);

///////////////////////////////////EVENTS END////////////////////////////////////

///////////////////////CONSTRUCTOR & DEFAULT FUNCTIONS///////////////////////////

    constructor(){
        Owner = msg.sender;
    }

    function GetUniqueId() {
        // 'now' == Current timestamp
        // 'msg.sender' == Ethereum address of contract creator
        address uniqueId = address(sha256(msg.sender, now));
        databoolmapping[uniqueId][0] = true;
        GetUniqueIdEvent(uniqueId);
    }

////////////////////CONSTRUCTOR & DEFAULT FUNCTIONS END//////////////////////////


///////////////////////////////////MODIFIERS/////////////////////////////////////

    modifier onlyOwner(){
        require(Owner == msg.sender);
        _;
    }

/////////////////////////////////MODIFIERS END///////////////////////////////////

////////////////////////////////IGM FUNCTIONS////////////////////////////////////



   // address _uniqueId, uint _billno, string[] _nameofexporter,
  //  string _commoditydescription, string _country, string _nameofcarrier,
   // string _nameofshipper, string _vesselname, uint _weightofcargo, uint _containernumner,
   // string _placeofissue, string _placeofdelivery, string _portofloading

        // nameofexporter = 0; commoditydescription = 1; country = 2; nameofoceancarrier = 3
    // nameofshipper = 4; vesselname = 5; placeofissue = 6; placeofdelivery = 7;
    // portofloading = 8
    // billno = 0; weightofcargo = 1; containernumber = 2;
    function SetIGMdata(address _uniqueId, uint[] datauint, string _nameofexporter,
    string _commoditydescription, string _country, string _nameofoceancarrier,
    string _nameofshipper, string _vesselname, string _placeofissue, string _placeofdelivery,
    string _portofloading) returns (string){
        if(!databoolmapping[_uniqueId][0]){
            CheckUniqueIdEvent(false);
            throw;
            return "UID is false!";
        }

        if(databoolmapping[_uniqueId][1]){
            throw;
            return "IGM already created with this UID";
        }
        datauintmapping[_uniqueId][0] = datauint[0];
        datauintmapping[_uniqueId][1] = datauint[1];
        datauintmapping[_uniqueId][2] = datauint[2];

        datastringmapping[_uniqueId][0] = _nameofexporter;
        datastringmapping[_uniqueId][1] = _commoditydescription;
        datastringmapping[_uniqueId][2] = _country;
        datastringmapping[_uniqueId][3] = _nameofoceancarrier;
        datastringmapping[_uniqueId][4] = _nameofshipper;
        datastringmapping[_uniqueId][5] = _vesselname;
        datastringmapping[_uniqueId][6] = _placeofissue;
        datastringmapping[_uniqueId][7] = _placeofdelivery;
        datastringmapping[_uniqueId][8] = _portofloading;

        datatimestampmapping[_uniqueId][0] = now;
        databoolmapping[_uniqueId][1] = true;
        CheckUniqueIdEvent(true);
        return "UID is true!";
    }

    function authorize_IGM(address _address, string _name) onlyOwner returns(string) {
        if(!IGM_officials[_address].isauthorized){
            IGM_officials[_address].isauthorized = true;
            IGM_officials[_address].name = _name;
            return "IGM official authorized";
        }else{
            IGM_officials[_address].isauthorized = false;
            return "IGM official unauthorized";
        }
    }

    function sign_IGM (address _uniqueId) returns (string){
        if(!IGM_officials[msg.sender].isauthorized){
            CheckIGMofficialverificationEvent(false);
            throw;
            return "Person is not authorized";
        }
        if(databoolmapping[_uniqueId][2]){
            throw;
            return "IGM with this UID is already verified";
        }
        if(!databoolmapping[_uniqueId][0]){
            throw;
            return "UID is false!";
        }

        dataofficialaddressmapping[_uniqueId][0] = msg.sender;
        CheckIGMofficialverificationEvent(true);
        databoolmapping[_uniqueId][2] = true;
        return "IGM form is signed by official";
    }

///////////////////////////////IGM FUNCTIONS END//////////////////////////////////

}



