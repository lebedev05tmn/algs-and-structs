// Дженерик стэка

export interface IStack<T> {
    value: T[];
    push: (item: T) => void;
    pop: () => T | undefined;
    max: () => number | undefined;
    min: () => number | undefined;
    remove: (item: T) => void;
}
