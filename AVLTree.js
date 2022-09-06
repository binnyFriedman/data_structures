"use strict";
exports.__esModule = true;
exports.AvlTree = void 0;
var AVLNode = /** @class */ (function () {
    function AVLNode(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
    return AVLNode;
}());
var AvlTree = /** @class */ (function () {
    function AvlTree(value) {
        this.root = new AVLNode(value);
    }
    AvlTree.prototype.insert = function (value) {
        this.root = this.insertNode(this.root, value);
    };
    AvlTree.prototype.insertNode = function (root, value) {
        if (!root) {
            return new AVLNode(value);
        }
        if (value < root.value) {
            root.left = this.insertNode(root.left, value);
        }
        else if (value > root.value) {
            root.right = this.insertNode(root.right, value);
        }
        else {
            return root;
        }
        this.setHeight(root);
        return this.balance(root, value);
    };
    AvlTree.prototype.balance = function (root, value) {
        var nodeBalance = this.getBalance(root);
        if (nodeBalance > 1) {
            if (value > root.left.value) {
                root.left = this.rotateLeft(root.left);
            }
            return this.rotateRight(root);
        }
        if (nodeBalance < -1) {
            if (value < root.right.value) {
                root.right = this.rotateRight(root.right);
            }
            return this.rotateLeft(root);
        }
        return root;
    };
    AvlTree.prototype.rotateLeft = function (root) {
        var newRoot = root.right;
        root.right = newRoot.left;
        newRoot.left = root;
        this.setHeight(root);
        this.setHeight(newRoot);
        return newRoot;
    };
    AvlTree.prototype.rotateRight = function (root) {
        var newRoot = root.left;
        root.left = newRoot.right;
        newRoot.right = root;
        this.setHeight(root);
        this.setHeight(newRoot);
        return newRoot;
    };
    AvlTree.prototype.isLeftHeavy = function (node) {
        return this.getBalance(node) > 1;
    };
    AvlTree.prototype.isRightHeavy = function (node) {
        return this.getBalance(node) < -1;
    };
    AvlTree.prototype.getBalance = function (node) {
        return node === null
            ? 0
            : this.getHeight(node.left) - this.getHeight(node.right);
    };
    AvlTree.prototype.setHeight = function (node) {
        if (!node) {
            return;
        }
        node.height =
            Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    };
    AvlTree.prototype.getHeight = function (node) {
        if (node === null) {
            return 0;
        }
        return node.height;
    };
    return AvlTree;
}());
exports.AvlTree = AvlTree;
//tests
var tree = new AvlTree(10);
tree.insert(20);
tree.insert(30);
tree.insert(40);
tree.insert(50);
// tree.insert(7);
console.log(tree.root);
//print the tree as a graph
function visualizeTree(tree) {
    // start from the root node and recursively traverse the tree
    // we print as we go...
    var printString = "";
    function traverse(node) {
        if (node === null) {
            return;
        }
        printString += node.value + " ";
    }
}
