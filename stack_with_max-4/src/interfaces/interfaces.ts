export interface IStack<T, U> {
    value: (T & U)[];
    push: (item: T & U) => void;
    pop: () => (T & U) | undefined;
}
