import sqlString from 'sqlstring';

/**
 * deep freeze object
 */
export function deepFreeze<T extends object>(target: T): T {
    const freezed = new WeakSet<any>();
    Object.values(target).forEach(child => {
        if (typeof (child) === "object") {
            if (child === null) {
                return;
            }
            if (child === undefined) {
                return;
            }
            if(freezed.has(child)){
                return;
            }
            deepFreeze(child);
            freezed.add(child);
        }
    })
    Object.freeze(target);
    return target;
}

/**
 * It is used to change the order of elements within an array. It is used in the Difficulty Chart Editor.
 */
export function intercept<T extends any>(arr: T[], from: number, to: number): T[] {
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

/**
 * sql escape
 */
export function sqlEscapeString(val: string) {
    let CHARS_GLOBAL_REGEXP = /[\0\b\t\n\r\x1a\"\'\\]/g;
    let CHARS_ESCAPE_MAP = {
        '\0': '\\0',
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\r': '\\r',
        '\x1a': '\\Z',
        '"': '\\"',
        '\'': '\\\'',
        '\\': '\\\\'
    };

    let chunkIndex = CHARS_GLOBAL_REGEXP.lastIndex = 0;
    let escapedVal = '';
    let match;

    while ((match = CHARS_GLOBAL_REGEXP.exec(val))) {
        //@ts-expect-error
        escapedVal += val.slice(chunkIndex, match.index) + CHARS_ESCAPE_MAP[match[0]];
        chunkIndex = CHARS_GLOBAL_REGEXP.lastIndex;
    }

    if (chunkIndex === 0) {
        // Nothing was escaped
        return val;
    }

    if (chunkIndex < val.length) {
        return escapedVal + val.slice(chunkIndex);
    }

    return escapedVal;
}
export {sqlString};

/**
 * markdown
 */
import showdown from 'showdown';
const converter = new showdown.Converter({
    requireSpaceBeforeHeadingText: true,
    ghCodeBlocks: true,
    tasklists: true,
    disableForced4SpacesIndentedSublists: true,
    tables: true
})
export function mdToHtml(md: string){
    return converter.makeHtml(md);
}
export function htmlToMd(html: string){
    return converter.makeMarkdown(html);
}

/*
 * pipe
 */
import type { Last, MakePromise } from './util.types';
export function pipe<T, const U extends readonly ((v: any) => any)[]>(value: T, callbacks: U) : ReturnType<Last<U>> {
    let v: any = value;
    for(const callback of callbacks){
        v = callback(v);
    }
    return v;
};
//@ts-expect-error
export async function asyncPipe<T, const U extends readonly ((v: any) => (any | Promise<any>))[]>(value: T, callbacks: U) : MakePromise<ReturnType<Last<U>>> {
    let v: any = value;
    for(const callback of callbacks){
        const callbackResult = callback(v);
        if(callbackResult instanceof Promise){
            v = await callbackResult;
        }
        else{
            v = callbackResult;
        }
    }
    return v;
}