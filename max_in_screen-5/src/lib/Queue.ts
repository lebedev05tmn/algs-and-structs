import { IQueue } from "../interfaces/interfaces";

// Класс очереди

class Queue<T> implements IQueue<T> {
    public value: T[]; // значение очереди

    constructor(arr: T[]) {
        this.value = arr; // создаем массив
    }

    // добавление элемента в очередь

    push(item: T) {
        this.value.push(item);
    }

    // удаление элемента из очереди
    
    shift() {
        return this.value.shift();
    }
}

export default Queue;
