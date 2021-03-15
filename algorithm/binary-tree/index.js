/**
 * 二叉树测试
 * Created by weibin.shao on 2020/01/09.
 */

const readline = require('readline');
const { BinaryTree } = require('./BinaryTree');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * 根据输入的节点数组构建二叉树
 * @param {*} nodes 节点值数组
 */
function buildTree(nodes = []) {
  if (!nodes.length) {
    return null;
  }

  const tree = new BinaryTree();

  nodes.forEach(node => {
    tree.insert(node);
  });

  return tree;
}

/**
 * 查找路径
 * @param {*} root 根节点
 * @param {*} sum 路径总和
 */
function findPath(root, sum) {
  const res = []; // 满足条件的所有路径
  const path = []; // 当前路径

  if (root) dfs(root, sum, res, path);
  return res;
}

/**
 * 深度优先搜索
 * @param {*} root 根节点
 * @param {*} sum 路径总和
 * @param {*} res 满足条件路径 [[]]
 * @param {*} path 当前路径 []
 */
function dfs(root, sum, res, path) {
  path.push(root.data);
  if (root.left === null && root.right === null && sum === root.data) {
    res.push(path.slice());
  } else {
    if (root.left) dfs(root.left, sum - root.data, res, path);
    if (root.right) dfs(root.right, sum - root.data, res, path);
  }

  path.splice(path.length - 1, 1);
}

function main() {
  const lines = [];
  
  rl.on('line', data => {
    lines.push(data.trim());
  }).on('close', () => {
    if (lines.length !== 2) {
      console.log('ERROR');
      return;
    }

    const total = parseInt(lines[0]);
    const nodes = lines[1].split(',').map(d => parseInt(d.trim()));

    // 构建二叉树
    const tree = buildTree(nodes);

    // 搜索路径
    const paths = findPath(tree.root, total);

    if (!paths.length) {
      console.log('ERROR');
      return;
    }

    // 打印结果
    paths.forEach(path => {
      console.log(path.join(','));
    });
  });
}

main();
