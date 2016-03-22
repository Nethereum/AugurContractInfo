/**
 * Python string parser to extract functions and parameters;
 */

"use strict";

module.exports = function (pythonString) {

   var regex = /def\s*(.*)\s*\(\s*(.*)\s*\)\s*:/g;
   var result = new Array();
   var match = null;
   while(match = regex.exec(pythonString)){
       var pyFunction = {};
       pyFunction.functionName = match[1];
       pyFunction.parameters = match[2];
       result.push(pyFunction);
   }
   return result;
  
};