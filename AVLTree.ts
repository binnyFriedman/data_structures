class AVLNode {
  value: number;
  left: AVLNode | null;
  right: AVLNode | null;
  height: number;
  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

export class AvlTree {
  root: AVLNode;

  constructor(value: number) {
    this.root = new AVLNode(value);
  }

  insert(value: number) {
    this.root = this.insertNode(this.root, value);
  }

  private insertNode(root: AVLNode, value: number) {
    if (!root) {
      return new AVLNode(value);
    }
    if (value < root.value) {
      root.left = this.insertNode(root.left, value);
    } else if (value > root.value) {
      root.right = this.insertNode(root.right, value);
    } else {
      return root;
    }

    this.setHeight(root);

    return this.balance(root, value);
  }

  private balance(root: AVLNode, value: number): AVLNode {
    let nodeBalance = this.getBalance(root);

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
  }

  private rotateLeft(root: AVLNode): AVLNode {
    let newRoot = root.right;
    root.right = newRoot.left;
    newRoot.left = root;
    this.setHeight(root);
    this.setHeight(newRoot);
    return newRoot;
  }

  private rotateRight(root: AVLNode): AVLNode {
    let newRoot = root.left;
    root.left = newRoot.right;
    newRoot.right = root;
    this.setHeight(root);
    this.setHeight(newRoot);
    return newRoot;
  }

  private isLeftHeavy(node: AVLNode) {
    return this.getBalance(node) > 1;
  }

  private isRightHeavy(node: AVLNode) {
    return this.getBalance(node) < -1;
  }

  private getBalance(node: AVLNode) {
    return node === null
      ? 0
      : this.getHeight(node.left) - this.getHeight(node.right);
  }

  private setHeight(node: AVLNode) {
    if (!node) {
      return;
    }
    node.height =
      Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
  }

  private getHeight(node: AVLNode) {
    if (node === null) {
      return 0;
    }
    return node.height;
  }
}

//tests
let tree = new AvlTree(10);
tree.insert(20);
tree.insert(30);
tree.insert(40);
tree.insert(50);
// tree.insert(7);

console.log(tree.root);

//print the tree as a graph

function visualizeTree(tree: AvlTree) {
  // start from the root node and recursively traverse the tree
  // we print as we go...
  const stack = [];

  const traverse = (node: AVLNode) => {
    if (!node) {
      return;
    }
    stack.push(node);
    traverse(node.left);
    traverse(node.right);
  };
  console.log(stack);
}

visualizeTree(tree);
