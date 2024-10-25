// Дженерик очереди

export interface IQueue<T> {
    value: T[];
    push: (item: T) => void;
    shift: () => T | undefined;
}

// Тип для сущности контакта

export type TContact = {
    phone: string;
    name: string;
};

// Тип для книги контактов

export interface IBook {
    value: Map<TContact["phone"], TContact["name"]>;
    add: (contact: TContact) => void;
    find: (phone: TContact["phone"]) => TContact["name"] | undefined;
    del: (phone: TContact["phone"]) => void;
}
