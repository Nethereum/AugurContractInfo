/**
 * Serpert file parser to extract functions and parameters;
 */

"use strict";

import functionParser from "./python-functions-parser.js";
import fs from "fs";
import path from "path";

class Contract {
    constructor(name, functions) {
        this.name = name;
        this.functions = functions;
    }
}


export function parseFolder(folderPath, contractsReturn) {
    const contracts = typeof contractsReturn !== "undefined" ? contractsReturn : [];
    const files = fs.readdirSync(folderPath);
    files.forEach(function (file) {
        if (file[0] !== ".") {
            const filePath = folderPath + "/" + file;
            const stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
                this.parseFolder(filePath, contracts);
            } else {
                contracts.push(this.parseFile(filePath));
            }
        }
    }, this);
    return contracts;
}

export function parseFile(filePath) {
    const text = fs.readFileSync(filePath, "utf8");
    const name = path.basename(filePath, ".se");
    const functions = functionParser(text);
    return new Contract(name, functions);
}

