import TreeNode from "./TreeNode";

class BinaryTree {
    nodes: TreeNode[];

    constructor(nodes: TreeNode[]) {
        this.nodes = nodes;
    }

    inOrderTraversal(nodeIndex: number, result: number[]): void {
        if (nodeIndex === -1) return;
        this.inOrderTraversal(this.nodes[nodeIndex].left, result);
        result.push(this.nodes[nodeIndex].key);
        this.inOrderTraversal(this.nodes[nodeIndex].right, result);
    }

    preOrderTraversal(nodeIndex: number, result: number[]): void {
        if (nodeIndex === -1) return;
        result.push(this.nodes[nodeIndex].key);
        this.preOrderTraversal(this.nodes[nodeIndex].left, result);
        this.preOrderTraversal(this.nodes[nodeIndex].right, result);
    }

    postOrderTraversal(nodeIndex: number, result: number[]): void {
        if (nodeIndex === -1) return;
        this.postOrderTraversal(this.nodes[nodeIndex].left, result);
        this.postOrderTraversal(this.nodes[nodeIndex].right, result);
        result.push(this.nodes[nodeIndex].key);
    }
}

export default BinaryTree;