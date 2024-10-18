// Дженерик очереди

export interface IQueue<T> {
    value: T[];
    push: (item: T) => void;
    shift: () => T | undefined;
}
