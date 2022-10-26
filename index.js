const express = require("express");
const app = express();
var cors = require('cors')
Web3 = require('web3')
var path = require('path');

app.use(cors())
app.options('*', cors()) 

app.listen(3000, () => {
  console.log("Application started and Listening on port 3000");
});

app.get("/mint-eth", async (req, res) => {
  let web3 = await new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
  var abi = [
      {
          "inputs": [
              {
                  "internalType": "string",
                  "name": "_uri",
                  "type": "string"
              },
              {
                  "internalType": "uint256[]",
                  "name": "_ids",
                  "type": "uint256[]"
              },
              {
                  "internalType": "string[]",
                  "name": "_names",
                  "type": "string[]"
              },
              {
                  "internalType": "string[]",
                  "name": "_metas",
                  "type": "string[]"
              }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
              },
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "operator",
                  "type": "address"
              },
              {
                  "indexed": false,
                  "internalType": "bool",
                  "name": "approved",
                  "type": "bool"
              }
          ],
          "name": "ApprovalForAll",
          "type": "event"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "previousOwner",
                  "type": "address"
              },
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
              }
          ],
          "name": "OwnershipTransferred",
          "type": "event"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "operator",
                  "type": "address"
              },
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "from",
                  "type": "address"
              },
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
              },
              {
                  "indexed": false,
                  "internalType": "uint256[]",
                  "name": "ids",
                  "type": "uint256[]"
              },
              {
                  "indexed": false,
                  "internalType": "uint256[]",
                  "name": "values",
                  "type": "uint256[]"
              }
          ],
          "name": "TransferBatch",
          "type": "event"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "operator",
                  "type": "address"
              },
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "from",
                  "type": "address"
              },
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
              },
              {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "id",
                  "type": "uint256"
              },
              {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
              }
          ],
          "name": "TransferSingle",
          "type": "event"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": false,
                  "internalType": "string",
                  "name": "value",
                  "type": "string"
              },
              {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "id",
                  "type": "uint256"
              }
          ],
          "name": "URI",
          "type": "event"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
              },
              {
                  "internalType": "uint256",
                  "name": "id",
                  "type": "uint256"
              }
          ],
          "name": "balanceOf",
          "outputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address[]",
                  "name": "accounts",
                  "type": "address[]"
              },
              {
                  "internalType": "uint256[]",
                  "name": "ids",
                  "type": "uint256[]"
              }
          ],
          "name": "balanceOfBatch",
          "outputs": [
              {
                  "internalType": "uint256[]",
                  "name": "",
                  "type": "uint256[]"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "baseMetadataURI",
          "outputs": [
              {
                  "internalType": "string",
                  "name": "",
                  "type": "string"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "getNames",
          "outputs": [
              {
                  "internalType": "string[]",
                  "name": "",
                  "type": "string[]"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "name": "idToMeta",
          "outputs": [
              {
                  "internalType": "string",
                  "name": "",
                  "type": "string"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "name": "idToName",
          "outputs": [
              {
                  "internalType": "string",
                  "name": "",
                  "type": "string"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "name": "ids",
          "outputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
              },
              {
                  "internalType": "address",
                  "name": "operator",
                  "type": "address"
              }
          ],
          "name": "isApprovedForAll",
          "outputs": [
              {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "_id",
                  "type": "uint256"
              },
              {
                  "internalType": "uint256",
                  "name": "_amount",
                  "type": "uint256"
              }
          ],
          "name": "mint",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "_id",
                  "type": "uint256"
              },
              {
                  "internalType": "uint256",
                  "name": "_amount",
                  "type": "uint256"
              }
          ],
          "name": "mintError",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "string",
                  "name": "",
                  "type": "string"
              }
          ],
          "name": "nameToId",
          "outputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "name": "names",
          "outputs": [
              {
                  "internalType": "string",
                  "name": "",
                  "type": "string"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "owner",
          "outputs": [
              {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "renounceOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "from",
                  "type": "address"
              },
              {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
              },
              {
                  "internalType": "uint256[]",
                  "name": "ids",
                  "type": "uint256[]"
              },
              {
                  "internalType": "uint256[]",
                  "name": "amounts",
                  "type": "uint256[]"
              },
              {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
              }
          ],
          "name": "safeBatchTransferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "from",
                  "type": "address"
              },
              {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
              },
              {
                  "internalType": "uint256",
                  "name": "id",
                  "type": "uint256"
              },
              {
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
              },
              {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
              }
          ],
          "name": "safeTransferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "operator",
                  "type": "address"
              },
              {
                  "internalType": "bool",
                  "name": "approved",
                  "type": "bool"
              }
          ],
          "name": "setApprovalForAll",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "string",
                  "name": "newuri",
                  "type": "string"
              }
          ],
          "name": "setURI",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "bytes4",
                  "name": "interfaceId",
                  "type": "bytes4"
              }
          ],
          "name": "supportsInterface",
          "outputs": [
              {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
              }
          ],
          "name": "transferOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "_tokenid",
                  "type": "uint256"
              }
          ],
          "name": "uri",
          "outputs": [
              {
                  "internalType": "string",
                  "name": "",
                  "type": "string"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      }
  ]
  var contractAddress = "0xEC7A69b18906e1EB6a3F6873e16fdE1C569Db1e6"      //REPLACE CONTRACT ADDRESS HERE 
  web3.eth.defaultAccount = web3.eth.accounts[0];
  var TestNFTContract = await web3.eth.contract(abi);
  var meth = TestNFTContract.at(contractAddress)
  console.log('Logging mint-eth-transaction-hash: ', meth.mint(contractAddress, "3"))
  let txhash = meth.mint(contractAddress, "3")
  res.end(JSON.stringify({ 'mint-eth-transaction-hash':  txhash}, null, 3));
});

app.get("/mint-err", async (req, res) => {
  let web3 = await new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
  var abi = [
      {
          "inputs": [
              {
                  "internalType": "string",
                  "name": "_uri",
                  "type": "string"
              },
              {
                  "internalType": "uint256[]",
                  "name": "_ids",
                  "type": "uint256[]"
              },
              {
                  "internalType": "string[]",
                  "name": "_names",
                  "type": "string[]"
              },
              {
                  "internalType": "string[]",
                  "name": "_metas",
                  "type": "string[]"
              }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
              },
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "operator",
                  "type": "address"
              },
              {
                  "indexed": false,
                  "internalType": "bool",
                  "name": "approved",
                  "type": "bool"
              }
          ],
          "name": "ApprovalForAll",
          "type": "event"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "previousOwner",
                  "type": "address"
              },
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
              }
          ],
          "name": "OwnershipTransferred",
          "type": "event"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "operator",
                  "type": "address"
              },
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "from",
                  "type": "address"
              },
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
              },
              {
                  "indexed": false,
                  "internalType": "uint256[]",
                  "name": "ids",
                  "type": "uint256[]"
              },
              {
                  "indexed": false,
                  "internalType": "uint256[]",
                  "name": "values",
                  "type": "uint256[]"
              }
          ],
          "name": "TransferBatch",
          "type": "event"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "operator",
                  "type": "address"
              },
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "from",
                  "type": "address"
              },
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
              },
              {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "id",
                  "type": "uint256"
              },
              {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
              }
          ],
          "name": "TransferSingle",
          "type": "event"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": false,
                  "internalType": "string",
                  "name": "value",
                  "type": "string"
              },
              {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "id",
                  "type": "uint256"
              }
          ],
          "name": "URI",
          "type": "event"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
              },
              {
                  "internalType": "uint256",
                  "name": "id",
                  "type": "uint256"
              }
          ],
          "name": "balanceOf",
          "outputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address[]",
                  "name": "accounts",
                  "type": "address[]"
              },
              {
                  "internalType": "uint256[]",
                  "name": "ids",
                  "type": "uint256[]"
              }
          ],
          "name": "balanceOfBatch",
          "outputs": [
              {
                  "internalType": "uint256[]",
                  "name": "",
                  "type": "uint256[]"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "baseMetadataURI",
          "outputs": [
              {
                  "internalType": "string",
                  "name": "",
                  "type": "string"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "getNames",
          "outputs": [
              {
                  "internalType": "string[]",
                  "name": "",
                  "type": "string[]"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "name": "idToMeta",
          "outputs": [
              {
                  "internalType": "string",
                  "name": "",
                  "type": "string"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "name": "idToName",
          "outputs": [
              {
                  "internalType": "string",
                  "name": "",
                  "type": "string"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "name": "ids",
          "outputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
              },
              {
                  "internalType": "address",
                  "name": "operator",
                  "type": "address"
              }
          ],
          "name": "isApprovedForAll",
          "outputs": [
              {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "_id",
                  "type": "uint256"
              },
              {
                  "internalType": "uint256",
                  "name": "_amount",
                  "type": "uint256"
              }
          ],
          "name": "mint",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "_id",
                  "type": "uint256"
              },
              {
                  "internalType": "uint256",
                  "name": "_amount",
                  "type": "uint256"
              }
          ],
          "name": "mintError",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "string",
                  "name": "",
                  "type": "string"
              }
          ],
          "name": "nameToId",
          "outputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "name": "names",
          "outputs": [
              {
                  "internalType": "string",
                  "name": "",
                  "type": "string"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "owner",
          "outputs": [
              {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "renounceOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "from",
                  "type": "address"
              },
              {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
              },
              {
                  "internalType": "uint256[]",
                  "name": "ids",
                  "type": "uint256[]"
              },
              {
                  "internalType": "uint256[]",
                  "name": "amounts",
                  "type": "uint256[]"
              },
              {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
              }
          ],
          "name": "safeBatchTransferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "from",
                  "type": "address"
              },
              {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
              },
              {
                  "internalType": "uint256",
                  "name": "id",
                  "type": "uint256"
              },
              {
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
              },
              {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
              }
          ],
          "name": "safeTransferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "operator",
                  "type": "address"
              },
              {
                  "internalType": "bool",
                  "name": "approved",
                  "type": "bool"
              }
          ],
          "name": "setApprovalForAll",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "string",
                  "name": "newuri",
                  "type": "string"
              }
          ],
          "name": "setURI",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "bytes4",
                  "name": "interfaceId",
                  "type": "bytes4"
              }
          ],
          "name": "supportsInterface",
          "outputs": [
              {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
              }
          ],
          "name": "transferOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "_tokenid",
                  "type": "uint256"
              }
          ],
          "name": "uri",
          "outputs": [
              {
                  "internalType": "string",
                  "name": "",
                  "type": "string"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      }
  ]
  var contractAddress = "0xEC7A69b18906e1EB6a3F6873e16fdE1C569Db1e6"      //REPLACE CONTRACT ADDRESS HERE
  web3.eth.defaultAccount = web3.eth.accounts[0];
  var TestNFTContract = await web3.eth.contract(abi);
  var meth = TestNFTContract.at(contractAddress)
  console.log('Logging mint-err-transaction-hash: ', meth.mintError(contractAddress, "3"))
  let txhash = meth.mintError(contractAddress, "3")
  res.end(JSON.stringify({ 'mint-err-transaction-hash':  txhash}, null, 3));
});
