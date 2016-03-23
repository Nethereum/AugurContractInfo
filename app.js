var contracts = require("augur-contracts");
var serpentParser = require("./serpent-contract-parser.js");
var tx = contracts.Tx(2); //passing the network 2 from contracts
var serpentContracts = serpentParser.parseFolder("./augur-core/src");
var fs = require("fs");

var returnContracts  = new Array();

var generateInputParameters = function(signature, joinedParameterNames){
    var parameterNames = joinedParameterNames.split(',');
    var params = new Array();
    var signatureArray = signature.split('');
    for (var index = 0; index < parameterNames.length; index++) {
        var parameterName = parameterNames[index].trim();
        
        if(parameterName.indexOf(':') > -1){
            parameterName = parameterName.substring(0, parameterName.indexOf(':')).trim();
        }
        
        var param = {};
        param.name = parameterName;
        param.signature = signatureArray[index];
        switch (param.signature) {
            case 'i':
                 param.type = 'int';
            break;
            case 's':
                param.type = 'string';
            break;
            case 'a':
                param.type = 'bytes32[]'
            break; 
            default:
                
            break;
        }
        params.push(param);
    }
    return params;
}

var generateABIFunction = function(serpentFuction){
    var func = {};
    func.name = serpentFuction.functionName;
    func.type = "function";
    func.serpent = true;
    func.constant = false;
    if(typeof serpentFuction.parameters !== 'undefined' && serpentFuction.parameters != '' && typeof serpentFuction.signature !== 'undefined') {
        func.input = generateInputParameters(serpentFuction.signature, serpentFuction.parameters);
    }
    return func;
}

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
               
                func.abi = generateABIFunction(func);
               
               
               if(returnContracts.indexOf(contract) === -1){
                   returnContracts.push(contract);
               }
           }
       }, this);
    }, this);
});



fs.writeFileSync("contractsInfo.json", JSON.stringify(returnContracts, null, 4), 'utf8');
 
console.log("check contractsInfo.json");



