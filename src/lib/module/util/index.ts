import type { RequestEvent } from '@sveltejs/kit';
import type { Song } from '../song';
import showdown from 'showdown';
import sqlString_ from 'sqlstring';
import cssColorMap from './data/cssColorMap.json';
const styled = await import('styled-svelte5')
    .then((module) => module.default)
    .catch(() => {
        console.error('Cannot find module \'styled-svelte5\'.');
        return () => { };
    });

type Difficulty = Song.Difficulty;
type Genre = Song.Genre;

export namespace Util {
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
                if (freezed.has(child)) {
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
    export function sqlEscapeLike(val: string) {
        return val.replaceAll('\\', '\\\\').replaceAll('%', '\\%').replaceAll('_', '\\_')
    }
    export const sqlString = sqlString_;

    /**
     * markdown
     */
    const converter = new showdown.Converter({
        requireSpaceBeforeHeadingText: true,
        ghCodeBlocks: true,
        tasklists: true,
        disableForced4SpacesIndentedSublists: true,
        tables: true
    })
    export function mdToHtml(md: string) {
        return converter.makeHtml(md);
    }
    export function htmlToMd(html: string) {
        return converter.makeMarkdown(html);
    }

    export function colorToHex(color: string): string | null {
        color = color.trim()
        if (color.startsWith('#')) return color;
        if (color.startsWith('rgb')) {
            const matched = color.match(/\d+/g);
            if (!matched) return null;
            const [r, g, b] = matched.map((e) => Number(e));
            if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return null;
            return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`
        }
        return cssColorMap[color as keyof typeof cssColorMap] ?? null;
    }

    /*
     * pipe
     */
    export function pipe<T, const U extends readonly ((v: any) => any)[]>(value: T, callbacks: U): ReturnType<Last<U>> {
        let v: any = value;
        for (const callback of callbacks) {
            v = callback(v);
        }
        return v;
    };
    //@ts-expect-error
    export async function asyncPipe<T, const U extends readonly ((v: any) => (any | Promise<any>))[]>(value: T, callbacks: U): MakePromise<ReturnType<Last<U>>> {
        let v: any = value;
        for (const callback of callbacks) {
            const callbackResult = callback(v);
            if (callbackResult instanceof Promise) {
                v = await callbackResult;
            }
            else {
                v = callbackResult;
            }
        }
        return v;
    }

    // color
    export namespace Color {
        export const genre: Record<Genre, string> = {
            pops: "#4fb5bd",
            vocaloid: '#a7abc7',//"#a5d1da",
            anime: "#e28dc8",
            namco: "#EB6B6A",
            game: "#b697d3",
            variety: "#40c977",
            classic: "#ccbd4a",
            kids: "#ebb850"
        } as const;

        export const difficulty: Record<Difficulty | "oniura", string> = {
            "easy": "#ff2703",
            "normal": "#647e2f",
            "hard": "#364938",
            "oni": "#db1885",
            "ura": "#7135db",
            "oniura": "linear-gradient(rgb(219, 24, 133) 0%, rgb(219, 24, 133) 50%, rgb(113, 53, 219) 50%, rgb(113, 53, 219) 100% )"
        } as const;

        export const darkDifficulty: Record<Difficulty, string> = {
            "easy": "#ff2703",
            "normal": "#647e2f",
            "hard": "#364938",
            "oni": "#d64d9a",
            "ura": "#946ade"
        } as const;

        export const dani = {
            backgroundColor: {
                light: {
                    kyu: '#FFF0D3',
                    lowdan: '#E2EBEE',
                    highdan: '#EEE2E2',
                    jin: '#E5F2F5',
                    tatsujin: '#F8EDC8',
                    jiho: '#ffd096',
                    chiuken: '#ba9779',
                    fukusho: '#524c4a',
                    gaiden: "#9dbdad"
                } as const,
                dark: {
                    kyu: '#5D5A40',
                    lowdan: '#40565D',
                    highdan: '#5F4242',
                    jin: '#80959C',
                    tatsujin: '#8E8C51',
                    jiho: '#ffd096',
                    chiuken: '#ba9779',
                    fukusho: '#524c4a',
                    gaiden: "#638072"
                } as const
            } as const,
            color: {
                light: {
                    kyu: '#edc16f',
                    lowdan: '#73C5FF',
                    highdan: '#E65252',
                    jin: '#91a3a8',
                    tatsujin: '#F4BC2B',
                    jiho: '#f6ae54',
                    chiuken: "#bc773f",
                    fukusho: "#2b2827",
                    gaiden: "#558f72"
                } as const,
                dark: {
                    kyu: '#D8B97F',
                    lowdan: '#4F92CF',
                    highdan: '#BC5353',
                    jin: '#91a3a8',
                    tatsujin: '#F4BC2B',
                    jiho: '#f6ae54',
                    chiuken: "#bc773f",
                    fukusho: "#2b2827",
                    gaiden: "#558f72"
                } as const
            } as const
        } as const;

        [genre, difficulty, darkDifficulty, dani].forEach(e => deepFreeze(e));
    }

    export namespace Styled {
        export const Center = styled(
            "div",
            () => `
            display:flex;
            flex-direction:column;
            align-items:center;
            width: 100%;
            max-width: 100%;
            `,
        );

        export const DifficultyColor = styled<{ difficulty: Difficulty }>("div",
            ({ difficulty }) => `
                width: 40px;
                height: 18px;
                color: white;
                font-size: 14px;
                box-sizing: border-box;
                padding-inline: 5px;
                padding-bottom: 1px;
                border-radius: 3px;
                display: flex;
                justify-content: center;
                align-items: center;
                background: ${Color.difficulty[difficulty]};
            `
        )
    }

    export function toCSV(data: Record<string, string | number>[]) {
        if(data.length === 0) return "";
        let csv = "";
        const keys = Object.keys(data[0]);
        csv += keys.map((key) => escapeString(key)).join(', ') + '\n';

        data.forEach((data) => {
            csv += keys.map((key) => typeof (data[key]) === "string" ? escapeString(data[key]) : data[key]).join(', ') + '\n';
        });

        return csv;

        function escapeString(str: string) {
            return `"${str.replaceAll('"', '""')}"`;
        }
    }
}

export namespace Util {
    export declare let Server: import('./util.server').UtilServer;
}

export namespace Util {
    export type TupleSplit<T, N extends number, O extends any[] = []> =
        O['length'] extends N ? [O, T] : T extends [infer F, ...infer R] ?
        TupleSplit<[...R], N, [...O, F]> : [O, T];

    export type Last<T extends readonly any[]> = T extends readonly [...any, infer R] ? R : never;
    export type MakePromise<T> = T extends Promise<any> ? T : Promise<T>;
    export type RequestorResponse<T> = (T extends (void | undefined) ? {
        status: 'success';
    } : {
        status: 'success';
        data: T;
    }) | {
        status: 'error';
        reason?: string;
    }
}