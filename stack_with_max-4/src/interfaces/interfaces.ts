export interface IStack<T> {
    value: T[];
    push: (item: T) => void;
    pop: () => T | undefined;
}
