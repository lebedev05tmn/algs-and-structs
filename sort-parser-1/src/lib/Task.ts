import { readlineInterface } from "../utils/readline";
import path from "path";
import fs from "fs";
import { replaceMarks } from "../utils/replaceMarks";
import { shellSort } from "../utils/shellSort";

const __dirname = path.resolve(".");

class Task {
    private filePath: string;
    private fileString: string;
    private file: string[];
    private result: string;
    private runTime: number;
    private analyseData: string;

    constructor() {
        this.filePath = path.resolve(__dirname); // длина массива родителей
        this.fileString = ""; // файл
        this.file = []; // массив строк файла
        this.result = ""; // результат сортировки
        this.analyseData = ""; // результат анализа
        this.runTime = 0; // время выполнения сортировки
        this.read(); // инициализация таски
    }

    // парсинг файла

    parseFile() {
        this.file = this.fileString
            .split("\n")
            .flatMap(item => item.split(" ").map(replaceMarks).filter(Boolean));
    }

    // получение результата

    getResult() {
        this.runTime = performance.now();
        const sortedFile = shellSort(this.file);
        this.runTime = Number((performance.now() - this.runTime).toFixed(0));

        this.result = sortedFile.reduce((acc, item) => {
            if (acc.length === 0) acc += item;
            else if (acc[acc.length - 1][0] === item[0]) {
                acc += ` ${item}`;
            } else {
                acc += `\n${item}`;
            }

            return acc;
        }, "");
    }

    // создание словаря кириллики

    getCreateCyrillicDictary(value: string) {
        const cyrillicChars = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";

        // Инициализируем объект для хранения символов и их количества
        const charDict: Record<string, number> = {};

        // Заполняем объект символами кириллицы с нулевыми значениями
        for (const char of cyrillicChars) {
            charDict[char.toLowerCase()] = 0;
        }

        // Подсчитываем вхождения символов из входной строки
        for (const char of value) {
            if (charDict.hasOwnProperty(char)) {
                charDict[char.toLowerCase()] += 1;
            }
        }

        return charDict;
    }

    // создание словаря символов

    getLetterDictary() {
        this.analyseData += JSON.stringify(
            this.getCreateCyrillicDictary(
                this.result
                    .split("\n")
                    .flatMap(item => item.split(" "))
                    .join("")
                    .replace(" ", "")
            ),
            null,
            2
        )
            .replace(/^\{/, "")
            .replace(/\}$/, "");
    }

    // анализ

    analyse() {
        this.analyseData += `Исходный текст: \n${this.fileString}\n`;
        this.analyseData +=
            "Параметры задания: кириллица, по алфавиту, по возрастанию, игнорировать числа, сортировка Шелла\n";
        this.analyseData += `Количество слов: ${this.result.length}\n`;
        this.analyseData += `Время выполнения: ${this.runTime} мс\n`;
        this.analyseData += `Статистика: \n`;
        this.getLetterDictary();
        console.log(this.analyseData);
        fs.writeFile(
            path.resolve(__dirname, "analysis.txt"),
            this.analyseData,
            () => console.log("Файл analysis.txt записан")
        );
    }

    // инициализация таски

    read() {
        readlineInterface.question("", (query: string) => {
            this.filePath = path.resolve(__dirname, query);
            fs.readFile(this.filePath, "utf-8", (err, data) => {
                if (err) {
                    console.log("Файл не существует");
                } else {
                    this.fileString = data;
                    this.parseFile();
                    this.getResult();
                    fs.writeFile(
                        path.resolve(__dirname, "result.txt"),
                        this.result,
                        () => console.log("Файл result.txt записан")
                    );
                    this.analyse();
                }
            });
            readlineInterface.close();
        });
    }
}

export default Task;
