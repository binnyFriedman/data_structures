var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var N = /** @class */ (function () {
    function N(n) {
        Object.assign(this, n);
    }
    Object.defineProperty(N.prototype, "uncle", {
        get: function () {
            if (!this.parent) {
                return undefined;
            }
            if (this.parent.left === this) {
                return this.parent.right;
            }
            return this.parent.left;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(N.prototype, "is_red", {
        get: function () {
            return !this.is_black;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(N.prototype, "is_left", {
        get: function () {
            return this.parent && this.parent.left === this;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(N.prototype, "is_right", {
        get: function () {
            return this.parent && this.parent.right === this;
        },
        enumerable: false,
        configurable: true
    });
    return N;
}());
var SelfBalanceTree = /** @class */ (function () {
    function SelfBalanceTree() {
    }
    SelfBalanceTree.prototype.rotateLeft = function (node) {
        var newRoot = node.right;
        if (!newRoot) {
            return;
        }
        node.right = newRoot.left;
        if (newRoot.left) {
            newRoot.left.parent = node;
        }
        newRoot.parent = node.parent;
        if (!node.parent) {
            this.root = newRoot;
        }
        else if (node === node.parent.left) {
            node.parent.left = newRoot;
        }
        else {
            node.parent.right = newRoot;
        }
        newRoot.left = node;
        node.parent = newRoot;
    };
    SelfBalanceTree.prototype.rotateRight = function (node) {
        var newRoot = node.left;
        if (!newRoot) {
            return;
        }
        node.left = newRoot.right;
        if (newRoot.right) {
            newRoot.right.parent = node;
        }
        newRoot.parent = node.parent;
        if (!node.parent) {
            this.root = newRoot;
        }
        else if (node.is_right) {
            node.parent.right = newRoot;
        }
        else {
            node.parent.left = newRoot;
        }
        newRoot.right = node;
        node.parent = newRoot;
    };
    return SelfBalanceTree;
}());
var RedBlackTree = /** @class */ (function (_super) {
    __extends(RedBlackTree, _super);
    function RedBlackTree() {
        var _this = _super.call(this) || this;
        _this.root = null;
        return _this;
    }
    RedBlackTree.prototype.insert = function (value) {
        var _a;
        var node = new N({ value: value, is_black: false });
        if (!this.root) {
            node.is_black = true;
            this.root = node;
        }
        else {
            this.insertNode(this.root, node);
            if ((_a = node.parent) === null || _a === void 0 ? void 0 : _a.parent) {
                this.reColour(node);
            }
        }
    };
    RedBlackTree.prototype.insertNode = function (root, node) {
        if (node.value < root.value) {
            if (!root.left) {
                root.left = node;
                node.parent = root;
            }
            else {
                this.insertNode(root.left, node);
            }
        }
        else {
            if (!root.right) {
                root.right = node;
                node.parent = root;
            }
            else {
                this.insertNode(root.right, node);
            }
        }
    };
    RedBlackTree.prototype.print = function () {
        var stack = [{ node: this.root, str: "" }];
        while (stack.length) {
            // Take last item from stack
            var item = stack.pop();
            // Don't print empty leaf
            if (!item.node) {
                continue;
            }
            // Get position of node - left or right
            var position = "";
            if (item.node.parent) {
                position = item.node === item.node.parent.left ? "L----" : "R----";
            }
            else {
                position = "ROOT-";
            }
            // Print info about node
            console.log("".concat(item.str).concat(position, " ").concat(item.node.value, " (").concat(item.node.is_black ? "black" : "red", ")"));
            // Add node children into stack
            stack.push({ node: item.node.right, str: item.str + "     " });
            stack.push({ node: item.node.left, str: item.str + " |   " });
        }
    };
    RedBlackTree.prototype.reColour = function (node) {
        var _a, _b;
        var red_uncle = function () {
            node.uncle.is_black = true;
            node.parent.is_black = true;
            node.parent.parent.is_black = false;
            node = node.parent.parent;
        };
        while (node.parent.is_red) {
            if (node.parent.is_left) {
                if ((_a = node.uncle) === null || _a === void 0 ? void 0 : _a.is_red) {
                    red_uncle();
                }
                else {
                    //parent is red and uncle is black
                    if (node.is_right) {
                        node = node.parent;
                        this.rotateLeft(node);
                    }
                    node.parent.is_black = true;
                    node.parent.parent.is_black = false;
                    this.rotateRight(node.parent.parent);
                }
            }
            else {
                if ((_b = node.uncle) === null || _b === void 0 ? void 0 : _b.is_red) {
                    red_uncle();
                }
                else {
                    if (node.is_left) {
                        node = node.parent;
                        this.rotateRight(node);
                    }
                    node.parent.is_black = true;
                    node.parent.parent.is_black = false;
                    this.rotateLeft(node.parent.parent);
                }
            }
            if (node == this.root) {
                break;
            }
        }
        this.root.is_black = true;
    };
    RedBlackTree.prototype.leftLeftRotation = function (node) {
        var grandparent = node.parent.parent;
        var parent = node.parent;
        this.rotateRight(grandparent);
        this.swapColors(parent, grandparent);
    };
    RedBlackTree.prototype.rightRightRotation = function (node) {
        var grandparent = node.parent.parent;
        var parent = node.parent;
        this.rotateLeft(grandparent);
        this.swapColors(parent, grandparent);
    };
    RedBlackTree.prototype.swapColors = function (a, b) {
        var a_color = a.is_black;
        var b_color = b.is_black;
        a.is_black = b_color;
        b.is_black = a_color;
    };
    return RedBlackTree;
}(SelfBalanceTree));
var tree = new RedBlackTree();
tree.insert(3);
tree.insert(21);
tree.insert(32);
tree.insert(15);
tree.print();
//# sourceMappingURL=RedBlackTree.js.map