"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringBuilder = void 0;
var ResizableArray = /** @class */ (function () {
    function ResizableArray(size) {
        if (size === void 0) { size = 0; }
        this.array = new Array(size);
        this.size = size;
    }
    ResizableArray.prototype.get = function (index) {
        return this.array[index];
    };
    ResizableArray.prototype.push = function (value) {
        if (this.size >= this.array.length) {
            this.doubleArray();
        }
        this.array.push(value);
    };
    Object.defineProperty(ResizableArray.prototype, "length", {
        get: function () {
            return this.array.length;
        },
        enumerable: false,
        configurable: true
    });
    ResizableArray.prototype.doubleArray = function () {
        var nArray = new Array(this.size * 2);
        for (var i = 0; i < this.size; i++) {
            nArray[i] = this.array[i];
        }
        this.array = nArray;
        this.size = this.size * 2;
    };
    ResizableArray.prototype.getArray = function () {
        return this.array;
    };
    return ResizableArray;
}());
var StringBuilder = /** @class */ (function () {
    function StringBuilder(value) {
        if (value === void 0) { value = ""; }
        this._resizable_array_impl = new ResizableArray();
        this.append(value);
    }
    StringBuilder.prototype.append = function (value) {
        for (var i = 0; i < value.length; i++) {
            this._resizable_array_impl.push(value.charAt(i));
        }
    };
    StringBuilder.prototype.toString = function () {
        return this._resizable_array_impl.getArray().join("");
    };
    return StringBuilder;
}());
exports.StringBuilder = StringBuilder;
function testStringBuilder() {
    var sb = new StringBuilder("Hello");
    sb.append(" World");
    console.log(sb.toString());
}
testStringBuilder();
