import { strict as assert } from "assert";
import { MinHeap } from "./Heap.ds";

const minHeap = new MinHeap();

minHeap.insert(5);
minHeap.insert(3);
minHeap.insert(1);
minHeap.insert(4);
assert.equal(minHeap.getMin(), 1);
