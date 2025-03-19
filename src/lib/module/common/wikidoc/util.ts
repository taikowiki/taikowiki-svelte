import { getIsMobile } from "$lib/module/layout/isMobile.js";
import { getTheme } from "$lib/module/layout/theme.js";
import type {Doc} from '$lib/module/common/wikidoc/types';

/**
 * 올바른 `docData` 인지 검사 
 * @param docData 
 * @returns 
 */
export function validateDocData(docData: Doc.Data.WikiDocData) {
    function validateParagraph(paragraph: Doc.Data.WikiDocParagraph) {
        if (!paragraph.title) return false;

        return paragraph.subParagraphs.every(validateParagraph) && true;
    }

    if (!docData.title) return false;
    if (docData.type === "song" && !docData.songNo) false;
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
export function createDefaultDocData(): Doc.Data.WikiDocData {
    return {
        title: "",
        type: "normal",
        contentTree: {
            content: "",
            subParagraphs: [],
        },
        comment: '',
        songNo: null,
        redirectTo: null
    }
}

/**
 * windowContext 반환
 * 
 * ssr이 켜져 있을 때에는 호출 후 `isMobile`과 `theme`을 직접 설정해야함.
 */
export function getWikiWindowContext() {
    if(typeof(window) === "undefined"){
        return new Map();
    }
    
    let windowContext = window.__wiki__window__context__;
    if (!windowContext) {
        windowContext = new Map<string & any, any>();
        window.__wiki__window__context__ = windowContext;
    }

    try {
        if (!windowContext.has('isMobile')) {
            windowContext.set('isMobile', getIsMobile());
        }
        if (!windowContext.has('theme')) {
            windowContext.set('theme', getTheme()[0]);
        }
    }
    catch { }

    return windowContext;
}

/**
 * windowContext의 'wikiDocAnnotations' 데이터를 초기화
 */
export function resetWikiDocAnnotations() {
    const windowContext = getWikiWindowContext();

    let annotationsMap = windowContext.get('wikiDocAnnotations');
    if (annotationsMap) {
        annotationsMap.clear();
    }
    else {
        annotationsMap = new Map<string, string>();
        windowContext.set('wikiDocAnnotations', annotationsMap);
    }
}

/**
 * windowContext에 'wikiDocURLBase'를 설정
 */
export function defineWikiDocURLBase(base: URL) {
    getWikiWindowContext().set('wikiDocURLBase', base);
}