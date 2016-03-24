/**
 * Python string parser to extract functions and parameters;
 */
"use strict";

class PythonFunction {
    constructor(functionName, parameters) {
        this.functionName = functionName;
        this.parameters = parameters;
    }
}

export default function (pythonString) {
    const regex = /def\s*(.*)\s*\(\s*(.*)\s*\)\s*:/g;
    const result = [];
    let match = null;
    while (match = regex.exec(pythonString)) {
        result.push(new PythonFunction(match[1], match[2]));
    }
    return result;
};
