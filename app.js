var contracts = require("augur-contracts");
var serpentParser = require("./serpent-contract-parser.js");
var tx = contracts.Tx(2); //passing the network 2 from contracts
var serpentContracts = serpentParser.parseFolder("./augur-core/src");
var fs = require("fs");

var returnContracts  = new Array();

Object.keys(tx).forEach(function(key){
    var txElement = tx[key];
    serpentContracts.forEach(function(contract) {
       var functions = contract.functions;
       functions.forEach(function(func) {
           if(func.functionName === txElement.method){
               func.signature = txElement.signature;
               func.returns = txElement.returns;
               contract.to = txElement.to;
               func.send = txElement.send;
               if(returnContracts.indexOf(contract) === -1){
                   returnContracts.push(contract);
               }
           }
       }, this);
    }, this);
});

fs.writeFileSync("contractsInfo.json", JSON.stringify(returnContracts, null, 4), 'utf8');
 
console.log("check contractsInfo.json");



