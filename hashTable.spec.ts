import { strict as assert } from "assert";
import { HashTable } from "./hashTable";

(function testHashTable() {
  const hashTable = new HashTable<string, string>();
  hashTable.set("name", "John");
  hashTable.set("age", "30");
  assert.equal(hashTable.get("name"), "John");
  assert.equal(hashTable.get("age"), "30");
  console.log("HashTable test passed successfully!");
})();
