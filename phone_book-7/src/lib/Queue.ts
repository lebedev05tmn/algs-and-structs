import { IQueue } from "../interfaces/interfaces";

// Класс очереди для работы с массивами дженерного типа

class Queue<T> implements IQueue<T> {
    public value: T[]; // значение очереди

    constructor(arr: T[]) {
        this.value = arr; // создание массива
    }

    // push в очередь

    public push(item: T) {
        this.value.push(item);
    }

    // shift из очереди

    public shift() {
        return this.value.shift();
    }
}

export default Queue;
