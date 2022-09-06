"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashTable = void 0;
var LinkedList_1 = require("./LinkedList");
var HashTable = /** @class */ (function () {
    function HashTable(size) {
        this._table = new Array(size || 1000).fill(null);
    }
    HashTable.prototype.hash = function (key) {
        key = key.toString();
        var seed = key.length;
        var hash = 0;
        for (var i = 0; i < key.length; i++) {
            hash = hash + key.charCodeAt(i) * seed;
        }
        return hash % this._table.length;
    };
    HashTable.prototype.get = function (key) {
        var node = this.getNode(key);
        if (node) {
            return node.value[1];
        }
        return null;
    };
    HashTable.prototype.getNode = function (key) {
        var index = this.hash(key);
        if (this._table[index]) {
            var callback = function (node) {
                return node[0] === key;
            };
            return this._table[index].getNode(callback);
        }
        return undefined;
    };
    HashTable.prototype.set = function (key, value) {
        var existing = this.getNode(key);
        var index = this.hash(key);
        if (existing) {
            existing.value = [key, value];
        }
        else {
            if (!this._table[index]) {
                this._table[index] = new LinkedList_1.LinkedList();
            }
            this._table[index].append([key, value]);
        }
    };
    HashTable.prototype.remove = function (key) {
        var index = this.hash(key);
        if (this._table[index]) {
            this._table[index].remove(function (value) { return value[0] === key; });
        }
    };
    HashTable.prototype.getKeys = function () {
        var keys = [];
        this._table.forEach(function (list) {
            if (list) {
                list.toArray().forEach(function (value) {
                    keys.push(value[0]);
                });
            }
        });
        return keys;
    };
    return HashTable;
}());
exports.HashTable = HashTable;
//# sourceMappingURL=hashTable.js.map