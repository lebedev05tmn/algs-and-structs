import { readlineInterface } from "../utils/readline";
import Queue from "./Queue";

// Класс Задачи

class Task {
    private res: number[];
    private window: Queue<number>;
    private resLength: number;
    private windowLength: number;
    private questionRes: number[];

    constructor() {
        this.init();
        this.res = []; // входящий массив
        this.resLength = 0; // длина входящего массива
        this.windowLength = 0; // длина окна
        this.window = new Queue([]); // окно (очередь)
        this.questionRes = []; // массив максимумов
    }

    // вычисление максимумов в O(N)

    calculateTask() {
        this.window = new Queue(this.res.slice(0, this.windowLength)); // инициализация окна в первоначальное состояние
        this.questionRes.push(Math.max(...this.window.value)); // добавление в массив максимумов

        for (let i = this.windowLength; i < this.resLength; i++) {
            this.window.push(this.res[i]); // First Input
            this.window.shift(); // First Output

            this.questionRes.push(Math.max(...this.window.value)); // добавление в массив максимумов
        }

        console.log(this.questionRes.join(" ")); // вывод результата
    }

    // чтение данных

    readTask() {
        readlineInterface.question("", (length: string) => {
            this.resLength = parseInt(length); // парсинг длины массивов

            if (isNaN(this.resLength) || this.resLength <= 0) {
                console.log(
                    "Пожалуйста, введите корректное положительное число."
                );
                readlineInterface.close();
                return;
            }

            readlineInterface.question("", input => {
                const res = input.split(" ").map(Number); // парсинг входящего массива данных

                if (res.length !== this.resLength || res.includes(NaN)) {
                    console.log(
                        "Пожалуйста, введите корректное положительное число."
                    );
                    readlineInterface.close();
                    return;
                } else {
                    this.res = res;

                    readlineInterface.question("", windowLength => {
                        this.windowLength = parseInt(windowLength); // парсинг длины окна

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

                        this.calculateTask(); // вычисление по задаче
                        readlineInterface.close();
                    });
                }
            });
        });
    }

    // инициализация задачи

    init() {
        this.readTask();
    }
}

export default Task;
