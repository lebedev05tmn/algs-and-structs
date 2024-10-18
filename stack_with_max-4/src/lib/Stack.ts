import { IStack } from "../interfaces/interfaces";

class Stack<T> implements IStack<T> {
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

    remove(item: T) {
        const index = this.value.indexOf(item);
        if (index !== -1) {
            this.value.splice(index, 1);
        }
    }
}

export default Stack;
