import BinaryTree from "./lib/BinaryTree";
import TreeNode from "./lib/TreeNode";
import { readlineInterface } from "./utils/readline";

const nodes: TreeNode[] = [];
let n: number;


readlineInterface.on('line', (line: string) => {
    if (n === undefined) {
        n = parseInt(line); // Читаем количество узлов
    } else {
        if(isNaN(n)) {
            console.log('Ошибка ввода!')
        }
        const [key, left, right] = line.split(' ').map(Number);
        nodes.push(new TreeNode(key, left, right));
        if (nodes.length === n) {
            const tree = new BinaryTree(nodes);
            const inOrderResult: number[] = [];
            const preOrderResult: number[] = [];
            const postOrderResult: number[] = [];

            tree.inOrderTraversal(0, inOrderResult);
            tree.preOrderTraversal(0, preOrderResult);
            tree.postOrderTraversal(0, postOrderResult);

            console.log('In-order:', inOrderResult.join(' '));
            console.log('Pre-order:', preOrderResult.join(' '));
            console.log('Post-order:', postOrderResult.join(' '));

            readlineInterface.close();
        }
    }
});