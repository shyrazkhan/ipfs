pragma solidity ^0.4.25;

contract FileContract {
    address private owner;
    mapping(address => mapping(bytes32 => bytes32)) private Files;   
    mapping(address => File[]) private fileList;   

    struct File {
        bytes32 name;
        bytes32 hash;
    }

    function FileContract() {
        owner = msg.sender;
    }

    function addFile(bytes32 fileHash, bytes32 fileName) public {
        Files[msg.sender][fileName] = fileHash;
        fileList[msg.sender].push(File(fileName, fileHash));
    }

    function getFile(bytes32 fileName) public returns(bytes32) {
        return Files[msg.sender][fileName];
    }
    
    function getAllFiles() public view returns(bytes32[]) {
        uint count = fileList[msg.sender].length;
        bytes32[] memory names = new bytes32[](count);
        for (uint i = 0; i < count; i++) {
            File file = fileList[msg.sender][i];
            names[i] = file.name;
        }
        return names;
    }
}