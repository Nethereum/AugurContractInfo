"use strict";
require("babel-core/register");
const contracts = require("augur-contracts");
const serpentParser = require("./serpent-contract-parser.js");
const fs = require("fs");


class Contract {
    constructor(name, address) {
        this.name = name;
        this.address = address;
        this.functions = [];
    }
    addFunction(func) {
          const matchFunction = this.functions.filter(function(value) {
                    return value.functionName === func.functionName;
                });
               
                if (matchFunction.length <= 0){
                     this.functions.push(func);
                }
       
    }
}

class ABIFunction {
    constructor(name) {
        this.name = name;
        this.type = "function";
        this.serpent = true;
        this.constant = false;
        this.inputs = [];
        this.outputs = [];
    }
}

class Function {   
    constructor(functionName, parameters, signature, returns, send) {
        this.functionName = functionName;
        this.parameters = parameters;
        this.signature = signature;
        this.returns = returns;
        this.send = send;
    }
    
    generateABIFunction() {
        this.abi = new ABIFunction(this.functionName);
        
        if (typeof this.parameters !== "undefined" &&
            this.parameters !== "" && typeof this.signature !== "undefined") {
            this.abi.inputs = this.generateInputParameters(this.signature, this.parameters);
        }
        if (typeof this.returns !== "undefined"){
            this.abi.outputs = this.generateOutputParameters(this.returns);
        }
    }
    
    generateOutputParameters(output) {
        const paramsOutput = [];
        const paramOutput = {};
        paramOutput.name = "";
        paramsOutput.push(paramOutput);
        switch (output) {
        case "hash[]":
            paramOutput.type = "bytes32[]";
            break;
        case "number":
            paramOutput.type = "int";
            break;
        case "unfix":
            paramOutput.type = "int";
            break;
        case "address":
            paramOutput.type = "address";
            break;
        case "address[]":
            paramOutput.type = "address[]";
            break;
        case "hash":
            paramOutput.type = "bytes32";
            break;
        case "number[]":
            paramOutput.type = "int[]";
            break;
        default:
             paramOutput.type = "bytes32";
            break;
        }
        return paramsOutput;
    }
    
    generateInputParameters(signature, joinedParameterNames) {
        const parameterNames = joinedParameterNames.split(",");
        const params = [];
        const signatureArray = signature.split("");
        for (let index = 0; index < parameterNames.length; index++) {
            let parameterName = parameterNames[index].trim();
            if (parameterName.indexOf(":") > -1) {
                parameterName = parameterName.substring(0, parameterName.indexOf(":")).trim();
            }
            let param = {};
            param.name = parameterName;
            param.signature = signatureArray[index];
            switch (param.signature) {
            case "i":
                param.type = "int";
                break;
            case "s":
                param.type = "string";
                break;
            case "a":
                param.type = "bytes32[]";
                break;
            default:
                 param.type = "bytes32";
                break;
            }
            params.push(param);
        }
        return params;
    }
}

const tx = contracts.Tx(2); // passing the network 2 from contracts

const serpentContracts = serpentParser.parseFolder("./augur-core/src");

const returnContracts = [];

Object.keys(tx).forEach(function(key) {
    const txElement = tx[key];
    serpentContracts.forEach(function(serpentContract) {
        let serpentFunctions = serpentContract.functions;
        serpentFunctions.forEach(function(serpentFunction) {
            if (serpentFunction.functionName === txElement.method) {
                const func = new Function(serpentFunction.functionName, serpentFunction.parameters, txElement.signature, txElement.returns, txElement.send);
                func.generateABIFunction();
                const matchContract = returnContracts.filter(function(value) {
                    return value.address === txElement.to;
                });
                let returnContract = null;
                if (matchContract.length > 0){
                    returnContract = matchContract[0];
                } else {
                    returnContract = new Contract(serpentContract.name, txElement.to);
                    returnContracts.push(returnContract);
                }
                returnContract.addFunction(func);
            }
        }, this);
    }, this);
});



fs.writeFileSync("contractsInfo.json", JSON.stringify(returnContracts, null, 4), "utf8");
console.log("check contractsInfo.json");
