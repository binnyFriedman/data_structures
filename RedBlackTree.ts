class N {
  value: number;
  is_black: boolean;
  left?: N;
  right?: N;
  parent?: N;

  constructor(n: Partial<N>) {
    Object.assign(this, n);
  }

  get uncle(): N | undefined {
    if (!this.parent) {
      return undefined;
    }
    if (this.parent.left === this) {
      return this.parent.right;
    }
    return this.parent.left;
  }

  get is_red(): boolean {
    return !this.is_black;
  }

  get is_left(): boolean {
    return this.parent && this.parent.left === this;
  }
  get is_right(): boolean {
    return this.parent && this.parent.right === this;
  }
}

class SelfBalanceTree {
  root: N;
  rotateLeft(node: N) {
    const newRoot = node.right;
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
    } else if (node === node.parent.left) {
      node.parent.left = newRoot;
    } else {
      node.parent.right = newRoot;
    }

    newRoot.left = node;
    node.parent = newRoot;
  }

  rotateRight(node: N) {
    const newRoot = node.left;
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
    } else if (node.is_right) {
      node.parent.right = newRoot;
    } else {
      node.parent.left = newRoot;
    }

    newRoot.right = node;
    node.parent = newRoot;
  }
}

class RedBlackTree extends SelfBalanceTree {
  root: N;

  constructor() {
    super();
    this.root = null;
  }

  insert(value: number) {
    const node = new N({ value, is_black: false });
    if (!this.root) {
      node.is_black = true;
      this.root = node;
    } else {
      this.insertNode(this.root, node);
      if (node.parent?.parent) {
        this.reColour(node);
      }
    }
  }

  private insertNode(root: N, node: N) {
    if (node.value < root.value) {
      if (!root.left) {
        root.left = node;
        node.parent = root;
      } else {
        this.insertNode(root.left, node);
      }
    } else {
      if (!root.right) {
        root.right = node;
        node.parent = root;
      } else {
        this.insertNode(root.right, node);
      }
    }
  }

  print() {
    const stack = [{ node: this.root, str: "" }];

    while (stack.length) {
      // Take last item from stack
      const item = stack.pop();
      // Don't print empty leaf
      if (!item.node) {
        continue;
      }
      // Get position of node - left or right
      let position = "";
      if (item.node.parent) {
        position = item.node === item.node.parent.left ? "L----" : "R----";
      } else {
        position = "ROOT-";
      }
      // Print info about node
      console.log(
        `${item.str}${position} ${item.node.value} (${
          item.node.is_black ? "black" : "red"
        })`
      );

      // Add node children into stack
      stack.push({ node: item.node.right, str: item.str + "     " });
      stack.push({ node: item.node.left, str: item.str + " |   " });
    }
  }

  private reColour(node: N) {
    const red_uncle = () => {
      node.uncle.is_black = true;
      node.parent.is_black = true;
      node.parent.parent.is_black = false;
      node = node.parent.parent;
    };
    while (node.parent.is_red) {
      if (node.parent.is_left) {
        if (node.uncle?.is_red) {
          red_uncle();
        } else {
          //parent is red and uncle is black
          if (node.is_right) {
            node = node.parent;
            this.rotateLeft(node);
          }
          node.parent.is_black = true;
          node.parent.parent.is_black = false;
          this.rotateRight(node.parent.parent);
        }
      } else {
        if (node.uncle?.is_red) {
          red_uncle();
        } else {
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
  }

  leftLeftRotation(node: N) {
    const grandparent = node.parent.parent;
    const parent = node.parent;
    this.rotateRight(grandparent);
    this.swapColors(parent, grandparent);
  }
  rightRightRotation(node: N) {
    const grandparent = node.parent.parent;
    const parent = node.parent;
    this.rotateLeft(grandparent);
    this.swapColors(parent, grandparent);
  }
  swapColors(a: N, b: N) {
    let a_color = a.is_black;
    let b_color = b.is_black;
    a.is_black = b_color;
    b.is_black = a_color;
  }
}

const tree = new RedBlackTree();
tree.insert(3);

tree.insert(21);
tree.insert(32);
tree.insert(15);

tree.print();
