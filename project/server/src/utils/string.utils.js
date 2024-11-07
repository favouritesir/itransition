"use strict";
// ============================================================================================
// STRING UTILITIES
// ============================================================================================
// AUTHOR       : Ashikur Rahman
// DESCRIPTION  : All utilities related to string will be added here inShaAllah.
// Date         : Wednesday, 30 -October-2024 (11:12:51)
// ============================================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCamelCase = void 0;
/************************************************************************************************* TO CAMEL CASE */
var toCamelCase = function (str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
};
exports.toCamelCase = toCamelCase;
