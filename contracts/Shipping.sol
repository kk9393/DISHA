pragma solidity ^0.4.8;

contract Shipping{

///////////////////////////STRUCT, VARIABLES AND MAPPINGS///////////////////////

    address Owner;

    struct Data {
        //Used to verify whether the ID is generated from this platform
       bool isgenerated;   //Index 0
       //////////IGM//////////////
       uint billno; //Index 1
       string nameofexporter; //Index 2
       string commoditydescription; //Index 3
       uint IGM_timestamp; //Index 4
       address IGM_signed_official; //Index 5
       //////////IGM END//////////////
    }

    mapping (address => Data) public datamapping;

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
        datamapping[uniqueId].isgenerated = true;
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

    function SetIGMdata(address _uniqueId, uint _billno, string _nameofexporter) returns (string){
        if(!datamapping[_uniqueId].isgenerated){
            CheckUniqueIdEvent(false);
            return "UID is false!";
        }
        datamapping[_uniqueId].billno = _billno;
        datamapping[_uniqueId].nameofexporter = _nameofexporter;
        datamapping[_uniqueId].IGM_timestamp = now;
        CheckUniqueIdEvent(true);
        return "UID is true!";
    }

    function authorize_IGM(address _address, string _name) onlyOwner {
        IGM_officials[_address].name = _name;
        IGM_officials[_address].isauthorized = true;
    }

    function sign_IGM (address _uniqueId) returns (string){
        if(!IGM_officials[msg.sender].isauthorized){
            CheckIGMofficialverificationEvent(false);
            return "Person is not authorized";
        }
        datamapping[_uniqueId].IGM_signed_official = msg.sender;
        CheckIGMofficialverificationEvent(true);
        return "IGM form is signed by official";
    }

///////////////////////////////IGM FUNCTIONS END//////////////////////////////////

}



