export default function intercept<T extends any>(arr: T[], from: number, to: number): T[] {
    if (to >= arr.length || to < 0 || from >= arr.length || from < 0) {
        return arr;
    }
    if (from === to) {
        return arr;
    }
    if (from < to) {
        return [
            ...arr.slice(0, from),
            ...arr.slice(from + 1, to + 1),
            arr[from],
            ...arr.slice(to + 1, arr.length),
        ];
    }
    if (to < from) {
        return [
            ...arr.slice(0, to),
            arr[from],
            ...arr.slice(to, from),
            ...arr.slice(from + 1, arr.length),
        ];
    }
    return arr;
}