import { IQueue } from "../interfaces/interfaces";

class Queue<T> implements IQueue<T> {
    public value: T[];
    private isNumberArrayFlag: boolean;

    constructor(arr: T[]) {
        this.value = arr;
        this.isNumberArrayFlag = true;
        this.value.forEach(
            item => (this.isNumberArrayFlag &&= typeof item === "number")
        );
    }

    push(item: T) {
        this.value.push(item);
    }

    pop() {
        return this.value.shift();
    }
}

export default Queue;
