import { Operations } from "../config";
import { readlineInterface } from "../utils/readline";
import Stack from "./Stack";

class Task {
    private res: Stack<number>;
    private resCountCommands: number;
    private sum: number;
    private callbackQueue: (() => void)[];
    private countCommands: number;

    // перечисление свойств

    constructor() {
        this.init(); // инициализация
        this.res = new Stack<number>([]); // создание стэка
        this.resCountCommands = 0; // итоговое количество команд
        this.sum = 0; // сумма
        this.callbackQueue = []; // очередь запросов
        this.countCommands = 0; // текущее количество команд
    }


    // метод прочтения команды

    readElement() {
        if (this.countCommands < this.resCountCommands) {
            readlineInterface.question("", element => {
                this.parse(element); // парсинг команды
                this.countCommands++; // увеличение количества команд
                this.readElement(); // рекурсия
            });
        } else {
            while (this.callbackQueue.length > 0) {
                (this.callbackQueue.shift() as () => void)(); // очистка очереди команд
            }
            readlineInterface.close(); // закрытие интерфейса readline
        }
    }

    // парсинг команды

    parse(command: string) {
        const [operation, value] = command.split(" "); // деструктуризация команды

        switch (operation) {
            case Operations.PUSH: // push в стэк с учетом суммы
                this.res.push(Number(value));
                this.sum += Number(value);
                break;
            case Operations.POP: // pop из стэка с учетом суммы
                this.sum -= Number(this.res.pop());
                break;
            case Operations.MIN: // минимальное число в стэке с записью в очередь запросов
                const min = this.res.min();
                this.callbackQueue.push(() => console.log(min));
                break;
            case Operations.MAX: // максимальное число в стэке с записью в очередь запросов
                const max = this.res.max();
                this.callbackQueue.push(() => console.log(max));
                break;
            case Operations.AVG:  // среднее число в стэке с записью в очередь запросов, сложность O(N)
                this.callbackQueue.push(() =>
                    console.log(this.sum / this.res.value.length)
                );
                break;
            case Operations.REMOVE: // удаления числа из стэка
                this.res.remove(Number(value));
                break;
            default:
                break;
        }
    }

    // инициализация задачи

    init() {
        readlineInterface.question("", (length: string) => {
            this.resCountCommands = parseInt(length); // чтение количества команд

            if (isNaN(this.resCountCommands) || this.resCountCommands <= 0) {
                console.log(
                    "Пожалуйста, введите корректное положительное число."
                );
                readlineInterface.close();
                return;
            }

            this.readElement(); // вызов рекурсии
        });
    }
}

export default Task;
