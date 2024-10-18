import { IStack } from "../interfaces/interfaces";

// Класс стэка для работы с массивами дженерного типа

class Stack<T> implements IStack<T> {
    public value: T[]; // значение стэка
    private isNumberStackFlag: boolean; // флаг того, является ли стэк числовым

    constructor(arr: T[]) {
        this.value = arr; // создание массива
        this.isNumberStackFlag = true; // флаг того, стэк ли массив числовым
        this.value.forEach(
            item => (this.isNumberStackFlag &&= typeof item === "number") // проверка на числовой стэк
        );
    }

    // push в стэк

    public push(item: T) {
        this.value.push(item);
    }

    // pop из стэка

    public pop() {
        return this.value.pop();
    }

    // максимальное значение стэка

    public max() {
        return this.isNumberStackFlag
            ? Math.max(...(this.value as number[]))
            : undefined;
    }

    // минимальное значение стэка

    public min() {
        return this.isNumberStackFlag
            ? Math.min(...(this.value as number[]))
            : undefined;
    }

    // удаление значения из массива по value

    public remove(item: T) {
        const index = this.value.indexOf(item);
        if (index !== -1) {
            this.value.splice(index, 1);
        }
    }
}

export default Stack;
