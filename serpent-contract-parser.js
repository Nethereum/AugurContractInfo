/**
 * Serpert file parser to extract functions and parameters;
 */

"use strict";

var functionParser = require("./python-functions-parser.js");
var fs = require("fs");
var path = require("path");

module.exports = {
    
   parseFolder: function (folderPath, contractsReturn){
     contractsReturn = typeof contractsReturn !== 'undefined' ? contractsReturn : new Array();
     
     var files = fs.readdirSync(folderPath);
     files.forEach(function(file) {
         if(file[0] !== '.'){
             var filePath = folderPath + '/' + file;
             var stat = fs.statSync(filePath);
             if(stat.isDirectory()){
                 this.parseFolder(filePath, contractsReturn);
             }else{
                 contractsReturn.push(this.parseFile(filePath));
             }   
         }
     }, this);
     return contractsReturn;
    },
    
   parseFile : function (filePath) {
        var text = fs.readFileSync(filePath, 'utf8');
        var contract = {};
        contract.name =  path.basename(filePath, '.se');
        contract.functions = functionParser(text);
        return contract;
    }

};