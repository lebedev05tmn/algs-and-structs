export const shellSort = <T extends string>(arr: T[]): T[] => {
    // Создаем копию массива, чтобы не изменять исходный
    const sortedArray = [...arr];
    const n = sortedArray.length;

    // Устанавливаем интервал, начиная с половины длины массива
    for (
        let interval = Math.floor(n / 2);
        interval > 0;
        interval = Math.floor(interval / 2)
    ) {
        // Сортируем элементы с использованием сортировки вставками в каждом цикле
        for (let i = interval; i < n; i++) {
            let temp = sortedArray[i];
            let j;

            // Вставляем элемент в отсортированную часть массива
            for (
                j = i;
                j >= interval &&
                sortedArray[j - interval].localeCompare(temp) > 0;
                j -= interval
            ) {
                sortedArray[j] = sortedArray[j - interval];
            }
            sortedArray[j] = temp;
        }
    }

    // Возвращаем новый отсортированный массив
    return sortedArray;
};
