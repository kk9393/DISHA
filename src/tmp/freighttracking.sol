pragma solidity ^0.4.21;
pragma experimental ABIEncoderV2;

contract tmp {

    mapping (address => string[10][10]) public freighttrackig;
    string str;

    function compareStrings(string str1, string str2) private returns(bool){
        return keccak256(str1) == keccak256(str2);
    }

    function setdata(address _address, string freightname, string temp)  returns (uint){
        uint tmp_length;
        for (uint i=0;i<100;i++){
            if(bytes(freighttrackig[_address][i][0]).length == 0){
                tmp_length = i;
                break;
            }
        }

        freighttrackig[_address][tmp_length][0] = freightname;
        freighttrackig[_address][tmp_length][1] = temp;
        return tmp_length;
    }
}