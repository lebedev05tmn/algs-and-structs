const getTreeHeight = (length: number, parents: number[]): number => {
    // Массив высот каждого узла
    const height = new Array(length).fill(-1);

    // Функция для вычисления высоты узла
    function getHeight(node: number) {
        // высота уже вычислена
        if (height[node] !== -1) {
            return height[node];
        }

        // Узел - корень (родитель = -1), высота = 1
        if (parents[node] === -1) {
            height[node] = 1;
        } else {
            // Идем в глубину
            height[node] = getHeight(parents[node]) + 1;
        }

        return height[node];
    }

    // Максимальная высота дерева

    return Array.from({ length: length }, (_, index) =>
        getHeight(index)
    ).reduce((acc, item) => Math.max(acc, item), 0);
};

export default getTreeHeight;
