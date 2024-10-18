import { readlineInterface } from "../utils/readline";
import Stack from "./Queue";

class Task {
    private res: number[];
    private window: Stack<number>;
    private resLength: number;
    private windowLength: number;
    private questionRes: number[];

    constructor() {
        this.init();
        this.res = [];
        this.resLength = 0;
        this.windowLength = 0;
        this.window = new Stack([]);
        this.questionRes = [];
    }

    calculateTask() {
        this.window = new Stack(this.res.slice(0, this.windowLength));
        this.questionRes.push(Math.max(...this.window.value));

        for (let i = this.windowLength; i < this.resLength; i++) {
            this.window.pop();
            this.window.push(this.res[i]);

            this.questionRes.push(Math.max(...this.window.value));
        }

        console.log(this.questionRes);
    }

    readTask() {
        readlineInterface.question("", (length: string) => {
            this.resLength = parseInt(length);

            if (isNaN(this.resLength) || this.resLength <= 0) {
                console.log(
                    "Пожалуйста, введите корректное положительное число."
                );
                readlineInterface.close();
                return;
            }

            readlineInterface.question("", input => {
                const res = input.split(" ").map(Number);

                if (res.length !== this.resLength || res.includes(NaN)) {
                    console.log(
                        "Пожалуйста, введите корректное положительное число."
                    );
                    readlineInterface.close();
                    return;
                } else {
                    this.res = res;

                    readlineInterface.question("", windowLength => {
                        this.windowLength = parseInt(windowLength);

                        if (
                            isNaN(this.windowLength) ||
                            this.windowLength <= 0 ||
                            this.windowLength > this.resLength
                        ) {
                            console.log(
                                "Пожалуйста, введите корректное положительное число."
                            );
                            readlineInterface.close();
                            return;
                        }
                        this.calculateTask();
                        readlineInterface.close();
                    });
                }
            });
        });
    }

    init() {
        this.readTask();
    }
}

export default Task;
