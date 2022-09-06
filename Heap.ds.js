"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinHeap = void 0;
var MinHeap = /** @class */ (function () {
    function MinHeap() {
        this._heap = [];
    }
    MinHeap.prototype.getMin = function () {
        return this._heap[0];
    };
    MinHeap.prototype.insert = function (value) {
        this._heap.push(value);
        if (this._heap.length > 1) {
            var current = this._heap.length - 1;
            while (current > 1 &&
                this._heap[Math.floor(current / 2)] < this._heap[current]) {
                this.swap(current, Math.floor(current / 2));
                current = Math.floor(current / 2);
            }
        }
    };
    MinHeap.prototype.swap = function (index_a, index_b) {
        if (index_a > this._heap.length - 1 || index_b > this._heap.length - 1) {
            throw new Error("Index out of bounds");
        }
        var temp = this._heap[index_a];
        this._heap[index_a] = this._heap[index_b];
        this._heap[index_b] = temp;
    };
    return MinHeap;
}());
exports.MinHeap = MinHeap;
