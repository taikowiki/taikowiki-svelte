export type TupleSplit<T, N extends number, O extends any[] = []> =
    O['length'] extends N ? [O, T] : T extends [infer F, ...infer R] ?
    TupleSplit<[...R], N, [...O, F]> : [O, T];

export type Last<T extends readonly any[]> = T extends readonly [...any, infer R] ? R : never;
export type MakePromise<T> = T extends Promise<any> ? T : Promise<T>