export default function deepFreeze<T extends object>(target: T): T {
    Object.values(target).forEach(child => {
        if (typeof (child) === "object") {
            if (child === null) {
                return;
            }
            if (child === undefined) {
                return;
            }
            deepFreeze(child)
        }
    })
    Object.freeze(target);
    return target;
}