pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

contract Permits{

///////////////////////////STRUCT, VARIABLES AND MAPPINGS///////////////////////

    address Owner;

    mapping (address => bool[30]) public databoolmapping;
    // isgenerated = 0; isImportPermitcreated = 1; isImportPermitverified = 2;
    mapping (address => uint[20]) public datatimestampmapping;
    // ImportPermitgeneration_timestamp = 0; ImportPermitverefication_timestamp = 1;
    mapping (address => string[20]) public datastringmapping;
    // name = 0; postaladdress = 1; PAN_number = 2; country = 3; Aadhar_number = 4
    mapping (address => uint[40]) public validitymapping;
    //ImportPermitvalidity = 0;
    mapping (address => address[20]) public dataofficialaddressmapping;
    //Import_Permit_official_address = 0;

    struct ImportPermit_officialsStruct {
        string name;
        bool isauthorized;
    }

    mapping (address => ImportPermit_officialsStruct) public ImportPermit_officials;

/////////////////////////STRUCT, VARIABLES AND MAPPINGS END//////////////////////

//////////////////////////////////////EVENTS/////////////////////////////////////

    event GetUniqueIdEvent(address indexed _uniqueId);

    event CheckUniqueIdEvent(bool indexed _isgenerated);

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


    function SetImportPermitdata(address _uniqueId, string _name, string _postaladdress,
    string _PAN_number, string _country, string _Aadhar_number) returns (string){
        if(!databoolmapping[_uniqueId][0]){
            CheckUniqueIdEvent(false);
            throw;
            return "UID is false!";
        }

        if(databoolmapping[_uniqueId][1]){
            throw;
            return "Import Permit already created with this UID";
        }

        if(bytes(datastringmapping[_uniqueId][0]).length == 0){datastringmapping[_uniqueId][0] = _name;}
        if(bytes(datastringmapping[_uniqueId][1]).length == 0){datastringmapping[_uniqueId][1] = _postaladdress;}
        if(bytes(datastringmapping[_uniqueId][2]).length == 0){datastringmapping[_uniqueId][2] = _PAN_number;}
        if(bytes(datastringmapping[_uniqueId][3]).length == 0){datastringmapping[_uniqueId][3] = _country;}
        if(bytes(datastringmapping[_uniqueId][4]).length == 0){datastringmapping[_uniqueId][4] = _Aadhar_number;}

        datatimestampmapping[_uniqueId][0] = now;
        databoolmapping[_uniqueId][1] = true;
        CheckUniqueIdEvent(true);
        return "UID is true!";
    }

    // ImportPermitgeneration_timestamp = 0; ImportPermitverefication_timestamp = 1;
    // isgenerated = 0; isImportPermitcreated = 1; isImportPermitverified = 2;
    // name = 0; address = 1; PAN_number = 2; country = 3; Aadhar_number = 4

    function authorize_ImportPermit(address _address, string _name) onlyOwner returns(string) {
        if(!ImportPermit_officials[_address].isauthorized){
            ImportPermit_officials[_address].isauthorized = true;
            ImportPermit_officials[_address].name = _name;
            return "ImportPermit_officials authorized";
        }else{
            ImportPermit_officials[_address].isauthorized = false;
            return "ImportPermit_officials unauthorized";
        }
    }

    function sign_Import_Permit (address _uniqueId) returns (string){
        if(!ImportPermit_officials[msg.sender].isauthorized){
            throw;
            return "Person is not authorized";
        }
        if(databoolmapping[_uniqueId][2]){
            throw;
            return "Import Permit with this UID is already verified";
        }
        if(!databoolmapping[_uniqueId][0]){
            throw;
            return "UID is false!";
        }

        dataofficialaddressmapping[_uniqueId][0] = msg.sender;
        databoolmapping[_uniqueId][2] = true;
        datatimestampmapping[_uniqueId][1] = now;
        validitymapping[_uniqueId][0] = now + 2*365*86400;
        return "IGM form is signed by official";
    }

///////////////////////////////IGM FUNCTIONS END//////////////////////////////////


}



