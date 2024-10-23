import { get } from "node:http";
import { readlineInterface } from "../utils/readline";
import getTreeHeight from "../utils/getTreeHeight";

class Task {
    private parentsLength: number;
    private parents: number[];

    constructor() {
        this.parentsLength = 0;
        this.parents = [];
        this.read();
    }

    getAnswer() {
        return getTreeHeight(this.parentsLength, this.parents);
    }

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
