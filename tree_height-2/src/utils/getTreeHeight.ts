const getTreeHeight = (length: number, parents: number[]): number => {
    // Массив для хранения высоты каждого узла
    const height = new Array(length).fill(-1);

    // Функция для вычисления высоты узла
    function getHeight(node: number) {
        // Если высота уже вычислена, возвращаем её
        if (height[node] !== -1) {
            return height[node];
        }

        // Если узел - корень (родитель = -1), высота = 1
        if (parents[node] === -1) {
            height[node] = 1;
        } else {
            // Рекурсивно вычисляем высоту родителя и добавляем 1
            height[node] = getHeight(parents[node]) + 1;
        }

        return height[node];
    }

    return Array.from({ length: length }, (_, index) =>
        getHeight(index)
    ).reduce((acc, item) => Math.max(acc, item), 0);
};

export default getTreeHeight;
