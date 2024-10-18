export interface IQueue<T> {
    value: T[];
    push: (item: T) => void;
    pop: () => T | undefined;
}
