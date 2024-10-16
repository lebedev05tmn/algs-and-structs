import { Operations } from "../config";
import { readlineInterface } from "../utils/readline";
import Stack from "./Stack";

class Task {
    private res: Stack<number, number>;
    private resCountCommands: number;
    private sum: number;
    private callbackQueue: (() => void)[];
    private countCommands: number;

    constructor() {
        this.init();
        this.res = new Stack([]);
        this.resCountCommands = 0;
        this.sum = 0;
        this.callbackQueue = [];
        this.countCommands = 0;
    }

    readElement() {
        if (this.countCommands < this.resCountCommands) {
            readlineInterface.question("", element => {
                this.parse(element);
                this.countCommands++;
                this.readElement();
            });
        } else {
            this.callbackQueue.forEach(cb => cb());
            readlineInterface.close();
        }
    }

    parse(command: string) {
        const [operation, value] = command.split(" ");
        
        switch (operation) {
            case Operations.PUSH:
                this.res.push(Number(value));
                this.sum += Number(value);
                break;
            case Operations.POP:
                this.sum -= Number(this.res.pop());
                break;
            case Operations.MIN:
                this.callbackQueue.push(() => console.log(this.res.min()));
                break;
            case Operations.MAX:
                this.callbackQueue.push(() => console.log(this.res.max()));
                break;
            case Operations.AVG:
                this.callbackQueue.push(() =>
                    console.log(this.sum / this.res.value.length)
                );
                break;
            case Operations.REMOVE:
                this.res.remove(Number(value));
                break;
            default:
                break;
        }
    }

    init() {
        readlineInterface.question("", (length: string) => {
            this.resCountCommands = parseInt(length);

            if (isNaN(this.resCountCommands) || this.resCountCommands <= 0) {
                console.log(
                    "Пожалуйста, введите корректное положительное число."
                );
                readlineInterface.close();
                return;
            }

            this.readElement();
        });
    }
}

export default Task;
