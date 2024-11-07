"use strict";
// ============================================================================================
// JSON UTILITY
// ============================================================================================
// AUTHOR       : Ashikur Rahman
// DESCRIPTION  : Utility service related to json like bigInt, function etc pursing problem
// Date         : Wednesday, 30 -October-2024 (09:43:43)
// ============================================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixedJsonBigInt = void 0;
var fixedJsonBigInt = function (obj) {
    return JSON.parse(JSON.stringify(obj, function (key, value) {
        return typeof value === "bigint" ? value.toString() : value;
    }));
};
exports.fixedJsonBigInt = fixedJsonBigInt;
