export type NullableType<T> = T | null;
export type NullableInterface<T> = {
    [K in keyof T]?: T[K] | null;
};