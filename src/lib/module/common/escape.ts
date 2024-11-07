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

export function escapeString(val: string) {
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