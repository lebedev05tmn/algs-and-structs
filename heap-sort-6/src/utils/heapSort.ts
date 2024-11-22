const heapifyDown = <T extends number>(
    arr: T[],
    n: number,
    i: number,
    swaps: T[] | T[][]
) => {
    let smallest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    if (left < n && arr[left] < arr[smallest]) {
        smallest = left;
    }
    if (right < n && arr[right] < arr[smallest]) {
        smallest = right;
    }
    if (smallest !== i) {
        swaps.push([i, smallest] as any);
        [arr[i], arr[smallest]] = [arr[smallest], arr[i]];
        heapifyDown(arr, n, smallest, swaps);
    }
};

export const heapify = <T extends number>(arr: T[]): T[][] => {
    const n = arr.length;
    let swaps: T[] = [];
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapifyDown(arr as any, n, i, swaps);
    }
    return swaps as any;
};
