import readline from "node:readline";

// readline интерфейс

export const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
