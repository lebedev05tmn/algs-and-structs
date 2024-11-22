import { IBook, TContact } from "../interfaces/interfaces";

// Класс телефонной книги

class Book implements IBook {
    public value: Map<string, string>;

    constructor(arr: [string, string][]) {
        this.value = new Map<string, string>(arr); // итерируемая коллекция
    }

    // матчер дубликата по имени

    public duplicateNameMatcher(findName: string): boolean {
        const flag = Array.from(this.value)
            .map(([key]) => key)
            .includes(findName);

        return flag;
    }

    // добавить контакт

    public add(contact: TContact): void {
        if (!this.duplicateNameMatcher(contact.name)) {
            this.value.set(contact.phone, contact.name);
        }
    }

    // удалить контакт

    public del(phone: string): void {
        this.value.delete(phone);
    }

    // найти контакт

    public find(phone: string): TContact["name"] | undefined {
        return this.value.get(phone);
    }
}

export default Book;
