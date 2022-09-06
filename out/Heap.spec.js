"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = require("assert");
var Heap_ds_1 = require("./Heap.ds");
var minHeap = new Heap_ds_1.MinHeap();
minHeap.insert(5);
minHeap.insert(3);
minHeap.insert(1);
minHeap.insert(4);
assert_1.strict.equal(minHeap.getMin(), 1);
//# sourceMappingURL=Heap.spec.js.map