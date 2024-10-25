import { readlineInterface } from "../utils/readline";
import getTreeHeight from "../utils/getTreeHeight";

class Task {
    private parentsLength: number;
    private parents: number[];

    constructor() {
        this.parentsLength = 0; // длина массива родителей
        this.parents = []; // массив родителей
        this.read(); // инициализация таски
    }

    // получения ответа на вопрос (Высота дерева)

    getAnswer() {
        return getTreeHeight(this.parentsLength, this.parents);
    }

    // инициализация таски

    read() {
        readlineInterface.question("", (length: string) => {
            this.parentsLength = parseInt(length); // чтение количества команд

            if (isNaN(this.parentsLength) || this.parentsLength <= 0) {
                console.log(
                    "Пожалуйста, введите корректное положительное число."
                );
                readlineInterface.close();
                return;
            }

            readlineInterface.question("", (arr: string) => {
                this.parents = arr.split(" ").map(Number);

                this.parents.length !== this.parentsLength
                    ? console.log("Введен не корректный массив!")
                    : console.log(this.getAnswer());

                readlineInterface.close();
            });
        });
    }
}

export default Task;
