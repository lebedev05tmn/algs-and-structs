import { heapify } from "../utils/heapSort";
import { readlineInterface } from "../utils/readline";

class Task {
    private arr: number[];
    private arrLength: number;

    constructor() {
        this.arrLength = 0; // длина массива
        this.arr = []; // массив
        this.read(); // инициализация таски
    }

    // получения ответа на вопрос

    getAnswer() {
        const heap = heapify(this.arr);
        if (heap.length === 0) {
            console.log("0");
        } else {
            for (const [i, j] of heap) {
                console.log(i, j);
            }
        }
    }

    // инициализация таски

    read() {
        readlineInterface.question("", (length: string) => {
            this.arrLength = parseInt(length); // чтение длины массива

            if (isNaN(this.arrLength) || this.arrLength <= 0) {
                console.log(
                    "Пожалуйста, введите корректное положительное число."
                );
                readlineInterface.close();
                return;
            }

            readlineInterface.question("", (arr: string) => {
                this.arr = arr.split(" ").map(Number);

                this.arr.length !== this.arrLength
                    ? console.log("Введен не корректный массив!")
                    : this.getAnswer();

                readlineInterface.close();
            });
        });
    }
}

export default Task;
