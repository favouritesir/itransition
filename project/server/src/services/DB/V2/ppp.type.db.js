"use strict";
// ============================================================================================
// PPP TYPES
// ============================================================================================
// AUTHOR       : Ashikur Rahman
// DESCRIPTION  : All types of prisma++ will be exported from here inShaAllah.
// Date         : Wednesday, 30 -October-2024 (09:54:46)
// ============================================================================================
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var u = "Users";
var client_1 = require("@prisma/client");
var string_utils_1 = require("../../../utils/string.utils");
var prisma = new client_1.default["PrismaClient"]();
var name = "users";
var table = prisma[name];
var Name = "users";
var table2 = prisma[name];
var Ppp = /** @class */ (function () {
    function Ppp(name) {
        var Name = (0, string_utils_1.toCamelCase)(name);
        this.client = prisma[Name];
    }
    Ppp.prototype.get = function (args) {
        return this.client;
    };
    return Ppp;
}());
// new Ppp("Users").get({});
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.data = function (arg) {
        console.log(arg);
    };
    return A;
}());
function createOn(us) {
    var fields = __assign({}, client_1.Prisma["".concat(us, "ScalarFieldEnum")]);
    return new A();
}
createOn("API").data({ apiKey: "kdjskfdjskdjfksjdf" });
// function ppp(nm: string) {}
