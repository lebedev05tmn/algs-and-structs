import { Operations } from "../config";
import { readlineInterface } from "../utils/readline";
import Book from "./Book";
import Queue from "./Queue";

class Task {
    private res: Book;
    private resCountCommands: number;
    private callbackQueue: Queue<() => void>;
    private countCommands: number;
    private prevRes: Book;

    // перечисление свойств

    constructor() {
        this.init(); // инициализация
        this.res = new Book([]); // создание контактной книги
        this.prevRes = new Book(Array.from(this.res.value)); // предыдущее состояние контактной книги
        this.resCountCommands = 0; // итоговое количество команд
        this.callbackQueue = new Queue([] as (() => void)[]); // очередь запросов
        this.countCommands = 0; // текущее количество команд
    }

    // сохранение предыдущего состояния контактной книги

    private setPrevRes() {
        this.prevRes = this.res;
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
            while (this.callbackQueue.value.length > 0) {
                (this.callbackQueue.shift() as () => void)(); // очистка очереди команд
            }
            readlineInterface.close(); // закрытие интерфейса readline
        }
    }

    // парсинг команды

    parse(command: string) {
        const [operation, phone, name] = command.split(" "); // деструктуризация команды

        switch (operation) {
            // добавление контакта

            case Operations.ADD: {
                if (isNaN(Number(phone)) || !name) {
                    console.warn("Не корректные данные!");
                    readlineInterface.close();
                } else {
                    this.setPrevRes();
                    this.res.add({ phone, name });
                }
                break;
            }

            // поиск контакта

            case Operations.FIND: {
                if (isNaN(Number(phone))) {
                    console.warn("Не корректный телефон!");
                    readlineInterface.close();
                } else {
                    const findValue = this.res.find(phone);

                    this.callbackQueue.push(() =>
                        console.log(findValue ?? "not found")
                    );
                }
                break;
            }

            // удаление контакта

            case Operations.DELETE: {
                if (isNaN(Number(phone))) {
                    console.warn("Не корректный телефон!");
                    readlineInterface.close();
                } else {
                    this.setPrevRes();
                    this.res.del(phone);
                }
                break;
            }

            // откат истории телефонной книги

            case Operations.UNDO: {
                if (this.prevRes.value.entries.length === 0) {
                    console.warn("Контактная книга пуста!");
                    readlineInterface.close();
                } else {
                    this.res = this.prevRes;
                }
                break;
            }

            // обработка остальных случаев

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
