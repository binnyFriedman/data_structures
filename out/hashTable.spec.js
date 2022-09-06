"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = require("assert");
var hashTable_1 = require("./hashTable");
(function testHashTable() {
    var hashTable = new hashTable_1.HashTable();
    hashTable.set("name", "John");
    hashTable.set("age", "30");
    assert_1.strict.equal(hashTable.get("name"), "John");
    assert_1.strict.equal(hashTable.get("age"), "30");
    console.log("HashTable test passed successfully!");
})();
//# sourceMappingURL=hashTable.spec.js.map