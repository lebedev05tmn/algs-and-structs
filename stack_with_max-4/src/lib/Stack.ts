import { IStack } from "../interfaces/interfaces";

class Stack<T, U> implements IStack<T, U> {
    public value: (T & U)[];
    private isNumberArrayFlag: boolean;

    constructor(arr: (T & U)[]) {
        this.value = arr;
        this.isNumberArrayFlag = true;
        this.value.forEach(
            item => (this.isNumberArrayFlag &&= typeof item === "number")
        );
    }

    push(item: T & U) {
        this.value.push(item);
    }

    pop() {
        return this.value.pop();
    }

    max() {
        return this.isNumberArrayFlag
            ? Math.max.apply(null, this.value as number[])
            : undefined;
    }

    min() {
        return this.isNumberArrayFlag
            ? Math.min.apply(null, this.value as number[])
            : undefined;
    }

    remove(item: T & U) {
        const index = this.value.indexOf(item);
        if (index !== -1) {
            this.value.splice(index, 1);
        }
    }
}

export default Stack;
