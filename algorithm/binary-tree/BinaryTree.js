/**
 * 二叉树
 * Created by weibin.shao on 2020/01/09.
 */

/**
 * 二叉树节点定义
 */
class BinaryNode {
  constructor(value) {
    this.data = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  static insertNode(root, value) {
    const node = new BinaryNode(value);

    if (value < root.data) {
      if (root.left === null) {
        root.left = node;
      } else {
        BinaryTree.insertNode(root.left, value);
      }
    } else {
      if (root.right === null) {
        root.right = node;
      } else {
        BinaryTree.insertNode(root.right, value);
      }
    }
  }

  /**
   * insert node
   */
  insert = value => {
    if (this.root === null) {
      this.root = new BinaryNode(value);
    } else {
      BinaryTree.insertNode(this.root, value);
    }

    return this;
  };

  /**
   * 前序遍历
   */
  prefixTravel = (root, nodes) => {
    if (root !== null) {
      nodes.push(root.data);
      this.prefixTravel(root.left, nodes);
      this.prefixTravel(root.right, nodes);
    }

    return nodes;
  };
}

module.exports = {
  BinaryTree,
};
