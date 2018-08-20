pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

contract Shipping{

///////////////////////////STRUCT, VARIABLES AND MAPPINGS///////////////////////

    address Owner;

    mapping (address => bool[30]) public databoolmapping;
    // isgenerated =0; isIGMcreated = 1; isIGMverified = 2; isBillofEntrycreated = 3;
    //isBillofEntryverified = 4; isBillofLadingcreated = 5; isBillofLadingverified = 6;
    mapping (address => uint[20]) public datatimestampmapping;
    // IGMgeneration_timestamp = 0; IGMverefication_timestamp = 1;
    //BillofEntrygeneration_timestamp = 2; BillofEntryverification_timestamp = 3
    //BillofLading_timestamp = 4;
    mapping (address => address[20]) public dataofficialaddressmapping;
    //IGM_official_address = 0; BillofEntry_official_address = 1; BillofLading_official_address = 2;
    mapping (address => string[40]) public datastringmapping;
    // nameofexporter = 0; commoditydescription = 1; country = 2; nameofoceancarrier = 3
    // nameofshipper = 4; vesselname = 5; placeofissue = 6; placeofdelivery = 7;
    // portofloading = 8; nameofimporter = 9;
    mapping (address => uint[40]) public datauintmapping;
    // billno = 0; weightofcargo = 1; containernumber = 2; custom_duty = 3; cha_code = 4; GST = 5;
    mapping (address => address[10]) public permitsstringmapping;
    //Import_Permit_UID = 0;
    mapping (address => bool[10]) public permitboolmapping;
    //isImport_Permit_submitted = 0;

    struct IGM_officialsStruct {
        string name;
        bool isauthorized;
    }

    struct BillofEntry_officialsStruct {
        string name;
        bool isauthorized;
    }

    struct BillofLading_officialsStruct {
        string name;
        bool isauthorized;
    }

    struct customs_officialsStruct {
        string name;
        bool isauthorized;
    }

    struct shed_officialsStruct {
        string name;
        bool isauthorized;
    }

    mapping (address => IGM_officialsStruct) public IGM_officials;
    mapping (address => BillofEntry_officialsStruct) public BillofEntry_officials;
    mapping (address => BillofLading_officialsStruct) public BillofLading_officials;
    mapping (address => customs_officialsStruct) public customs_officials;
    mapping (address => shed_officialsStruct) public shed_officials;

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

//////////////////////////////////////PERMITS////////////////////////////////////

function setImportPermit(address _uniqueId, address _uniqueId_Permit) returns (string){
    if(permitboolmapping[_uniqueId][0]){
        return "Import Permit already submitted";
        throw;
    }
    permitsstringmapping[_uniqueId][0] = _uniqueId_Permit;
    permitboolmapping[_uniqueId][0] = true;
    return "Import Permit submitted";
}

/////////////////////////////////////PERMITS END/////////////////////////////////

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
        if(datauintmapping[_uniqueId][0] == 0){datauintmapping[_uniqueId][0] = datauint[0];}
        if(datauintmapping[_uniqueId][1] == 0){datauintmapping[_uniqueId][1] = datauint[1];}
        if(datauintmapping[_uniqueId][2] == 0){datauintmapping[_uniqueId][2] = datauint[2];}

        if(bytes(datastringmapping[_uniqueId][0]).length == 0){datastringmapping[_uniqueId][0] = _nameofexporter;}
        if(bytes(datastringmapping[_uniqueId][1]).length == 0){datastringmapping[_uniqueId][1] = _commoditydescription;}
        if(bytes(datastringmapping[_uniqueId][2]).length == 0){datastringmapping[_uniqueId][2] = _country;}
        if(bytes(datastringmapping[_uniqueId][3]).length == 0){datastringmapping[_uniqueId][3] = _nameofoceancarrier;}
        if(bytes(datastringmapping[_uniqueId][4]).length == 0){datastringmapping[_uniqueId][4] = _nameofshipper;}
        if(bytes(datastringmapping[_uniqueId][5]).length == 0){datastringmapping[_uniqueId][5] = _vesselname;}
        if(bytes(datastringmapping[_uniqueId][6]).length == 0){datastringmapping[_uniqueId][6] = _placeofissue;}
        if(bytes(datastringmapping[_uniqueId][7]).length == 0){datastringmapping[_uniqueId][7] = _placeofdelivery;}
        if(bytes(datastringmapping[_uniqueId][8]).length == 0){datastringmapping[_uniqueId][8] = _portofloading;}


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
        databoolmapping[_uniqueId][2] = true;
        datatimestampmapping[_uniqueId][1] = now;
        return "IGM form is signed by official";
    }

///////////////////////////////IGM FUNCTIONS END//////////////////////////////////

////////////////////////////BILL OF ENTRY FUNCTIONS///////////////////////////////


    // billno = 0; weightofcargo = 1; containernumber = 2; custom_duty = 3; cha_code = 4; GST = 5;
    // nameofexporter = 0; commoditydescription = 1; country = 2; nameofoceancarrier = 3
    // nameofshipper = 4; vesselname = 5; placeofissue = 6; placeofdelivery = 7;
    // portofloading = 8 nameofimporter = 9;
    function SetBillofEntrydata(address _uniqueId, uint[] datauint, string _nameofimporter,
    string _commoditydescription, string _country, string _nameofoceancarrier,
    string _vesselname) returns (string){
        if(!databoolmapping[_uniqueId][0]){
            CheckUniqueIdEvent(false);
            throw;
            return "UID is false!";
        }

        if(databoolmapping[_uniqueId][3]){
            throw;
            return "Bill of Entry already created with this UID";
        }

        if(datauintmapping[_uniqueId][1] == 0){datauintmapping[_uniqueId][1] = datauint[0];} //weightofcargo
        if(datauintmapping[_uniqueId][3] == 0){datauintmapping[_uniqueId][3] = datauint[1];} //custom_duty
        if(datauintmapping[_uniqueId][4] == 0){datauintmapping[_uniqueId][4] = datauint[2];} //cha_code
        if(datauintmapping[_uniqueId][5] == 0){datauintmapping[_uniqueId][5] = datauint[3];} //GST

        if(bytes(datastringmapping[_uniqueId][9]).length == 0){datastringmapping[_uniqueId][9] = _nameofimporter;}
        if(bytes(datastringmapping[_uniqueId][1]).length == 0){datastringmapping[_uniqueId][1] = _commoditydescription;}
        if(bytes(datastringmapping[_uniqueId][2]).length == 0){datastringmapping[_uniqueId][2] = _country;}
        if(bytes(datastringmapping[_uniqueId][3]).length == 0){datastringmapping[_uniqueId][3] = _nameofoceancarrier;}
        if(bytes(datastringmapping[_uniqueId][5]).length == 0){datastringmapping[_uniqueId][5] = _vesselname;}

        datatimestampmapping[_uniqueId][2] = now;
        databoolmapping[_uniqueId][3] = true;
        CheckUniqueIdEvent(true);
        return "UID is true!";
    }

    function authorize_Bill_of_Entry(address _address, string _name) onlyOwner returns(string) {
        if(!BillofEntry_officials[_address].isauthorized){
            BillofEntry_officials[_address].isauthorized = true;
            BillofEntry_officials[_address].name = _name;
            return "BillofEntry official authorized";
        }else{
            BillofEntry_officials[_address].isauthorized = false;
            return "BillofEntry official unauthorized";
        }
    }

    function sign_Bill_of_Entry(address _uniqueId) returns (string){
        if(!BillofEntry_officials[msg.sender].isauthorized){
            throw;
            return "Person is not authorized";
        }
        if(databoolmapping[_uniqueId][4]){
            throw;
            return "BillofEntry with this UID is already verified";
        }
        if(!databoolmapping[_uniqueId][0]){
            throw;
            return "UID is false!";
        }

        dataofficialaddressmapping[_uniqueId][1] = msg.sender;
        databoolmapping[_uniqueId][4] = true;
        datatimestampmapping[_uniqueId][3] = now;
        return "BillofEntry form is signed by official";
    }

///////////////////////////BILL OF ENTRY FUNCTIONS END///////////////////////////


////////////////////////////BILL OF LADING FUNCTIONS///////////////////////////////

    function SetBillofLadingdata(address _uniqueId, uint[] datauint, string _nameofimporter,
    string _nameofexporter, string _commoditydescription, string _country,
    string _nameofoceancarrier, string _vesselname, string _portofloading, string _placeofdelivery) returns (string){
        if(!databoolmapping[_uniqueId][0]){
            CheckUniqueIdEvent(false);
            throw;
            return "UID is false!";
        }

        if(databoolmapping[_uniqueId][5]){
            throw;
            return "Bill of Lading already created with this UID";
        }

        if(datauintmapping[_uniqueId][1] == 0){datauintmapping[_uniqueId][1] = datauint[0];} //weightofcargo

        if(bytes(datastringmapping[_uniqueId][9]).length == 0){datastringmapping[_uniqueId][9] = _nameofimporter;}
        if(bytes(datastringmapping[_uniqueId][1]).length == 0){datastringmapping[_uniqueId][1] = _commoditydescription;}
        if(bytes(datastringmapping[_uniqueId][2]).length == 0){datastringmapping[_uniqueId][2] = _country;}
        if(bytes(datastringmapping[_uniqueId][3]).length == 0){datastringmapping[_uniqueId][3] = _nameofoceancarrier;}
        if(bytes(datastringmapping[_uniqueId][5]).length == 0){datastringmapping[_uniqueId][5] = _vesselname;}
        if(bytes(datastringmapping[_uniqueId][8]).length == 0){datastringmapping[_uniqueId][8] = _portofloading;}
        if(bytes(datastringmapping[_uniqueId][7]).length == 0){datastringmapping[_uniqueId][7] = _placeofdelivery;}
        if(bytes(datastringmapping[_uniqueId][0]).length == 0){datastringmapping[_uniqueId][0] = _nameofexporter;}

        datatimestampmapping[_uniqueId][4] = now;
        databoolmapping[_uniqueId][5] = true;
        CheckUniqueIdEvent(true);
        return "UID is true!";
    }

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

    function sign_Bill_of_Lading(address _uniqueId) returns (string){
       /* if(!BillofEntry_officials[msg.sender].isauthorized){
            throw;
            return "Person is not authorized";
        }*/
        if(databoolmapping[_uniqueId][6]){
            throw;
            return "BillofEntry with this UID is already verified";
        }
        if(!databoolmapping[_uniqueId][0]){
            throw;
            return "UID is false!";
        }

        dataofficialaddressmapping[_uniqueId][2] = msg.sender;
        databoolmapping[_uniqueId][6] = true;
        datatimestampmapping[_uniqueId][5] = now;
        return "BillofEntry form is signed by official";
    }

///////////////////////////BILL OF LADING FUNCTIONS END///////////////////////////



}



