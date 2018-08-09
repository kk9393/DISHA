pragma solidity ^0.4.8;
contract Shipping{
    
   
    struct Data {
       uint billno;
       string nameofexporter;
    }
    
    event GetUniqueIdEvent(
        address indexed _uniqueId
        );
    
    mapping (address => Data) datamapping;
    
    function GetUniqueId() private returns (address){
        // 'now' == Current timestamp 
        // 'msg.sender' == Ethereum address of contract creator
        address uniqueId = address(sha256(msg.sender, now));
        return (uniqueId);
    }
    
    function SetIGMdata(uint _billno, string _nameofexporter){
        address _uniqueId = GetUniqueId();
        datamapping[_uniqueId].billno = _billno;
        datamapping[_uniqueId].nameofexporter = _nameofexporter;
        GetUniqueIdEvent(_uniqueId);
        
        
    }

        
    
}