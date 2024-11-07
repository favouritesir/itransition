"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prismaClient_1 = require("./prismaClient");
var table_1 = require("./table");
// Database table manager
var DataBase = /** @class */ (function () {
    function DataBase() {
    }
    DataBase.prototype.getUsers = function () {
        return new table_1.DBTable({ table: prismaClient_1.default.users });
    };
    DataBase.prototype.getResponses = function () {
        return new table_1.DBTable({ table: prismaClient_1.default.responses });
    };
    DataBase.prototype.getDocuments = function () {
        return new table_1.DBTable({ table: prismaClient_1.default.documents });
    };
    DataBase.prototype.getComments = function () {
        return new table_1.DBTable({ table: prismaClient_1.default.comments });
    };
    DataBase.prototype.getThemes = function () {
        return new table_1.DBTable({ table: prismaClient_1.default.themes });
    };
    return DataBase;
}());
var DB = new DataBase();
exports.default = DB;
