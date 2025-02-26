import type { WikiDocData, WikiDocParagraph } from "./types/wikidoc.types.js";

/**
 * 올바른 `docData` 인지 검사 
 * @param docData 
 * @returns 
 */
export function validateDocData(docData: WikiDocData) {
    function validateParagraph(paragraph: WikiDocParagraph) {
        if (!paragraph.title) return false;

        return paragraph.subParagraphs.every(validateParagraph) && true;
    }

    if (!docData.title) return false;

    if (docData.type === "redirect") return true;

    return docData.contentTree.subParagraphs.every(validateParagraph) && true;
}

/**
 * html escape
 * @param string 
 * @returns 
 */
export function escapeHtml(string: string) {
    const matchHtmlRegExp = /["'&<>]/;
    let match = matchHtmlRegExp.exec(string);

    if (!match) {
        return string;
    }

    let escape;
    let html = '';
    let index = 0;
    let lastIndex = 0;

    for (index = match.index; index < string.length; index++) {
        switch (string.charCodeAt(index)) {
            case 34: // "
                escape = '&quot;';
                break;
            case 38: // &
                escape = '&amp;';
                break;
            case 39: // '
                escape = '&#39;';
                break;
            case 60: // <
                escape = '&lt;';
                break;
            case 62: // >
                escape = '&gt;';
                break;
            default:
                continue;
        }

        if (lastIndex !== index) {
            html += string.substring(lastIndex, index);
        }

        lastIndex = index + 1;
        html += escape;
    }

    return lastIndex !== index
        ? html + string.substring(lastIndex, index)
        : html;
}

/**
 * 기본 doc data 생성
 */
export function createDefaultDocData(): WikiDocData {
    return {
        title: "",
        type: "normal",
        contentTree: {
            content: "",
            subParagraphs: [],
        },
    }
}