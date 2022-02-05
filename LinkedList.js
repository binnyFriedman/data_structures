"use strict";
exports.__esModule = true;
exports.LinkedList = exports.LinkedListNode = void 0;
var LinkedListNode = /** @class */ (function () {
    function LinkedListNode(value) {
        this.value = value;
        this.next = null;
    }
    return LinkedListNode;
}());
exports.LinkedListNode = LinkedListNode;
var LinkedList = /** @class */ (function () {
    function LinkedList() {
        this.head = null;
        this.tail = null;
    }
    LinkedList.prototype.append = function (value) {
        var node = new LinkedListNode(value);
        if (this.head === null) {
            this.head = node;
        }
        else {
            this.tail.next = node;
        }
        this.tail = node;
    };
    LinkedList.prototype.toArray = function () {
        var result = [];
        var current = this.head;
        while (current) {
            result.push(current.value);
            current = current.next;
        }
        return result;
    };
    LinkedList.prototype.remove = function (callback) {
        if (this.head === null) {
            return;
        }
        if (this.head.value && callback(this.head.value)) {
            this.head = this.head.next;
            return;
        }
        var current = this.head;
        while (current) {
            if (current.next && callback(current.next.value)) {
                current.next = current.next.next;
                if (current.next === null) {
                    this.tail = current;
                }
                return;
            }
            current = current.next;
        }
    };
    LinkedList.prototype.find = function (callback) {
        var result = this.getNode(callback);
        return result ? result.value : null;
    };
    LinkedList.prototype.getNode = function (callback) {
        var current = this.head;
        while (current) {
            if (callback(current.value)) {
                return current;
            }
            current = current.next;
        }
        return null;
    };
    return LinkedList;
}());
exports.LinkedList = LinkedList;
