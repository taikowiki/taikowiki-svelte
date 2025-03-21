import { getIsMobile } from "$lib/module/layout/isMobile.js";
import { getTheme } from "$lib/module/layout/theme.js";
import type { Doc } from '$lib/module/common/wikidoc/types';
import { CSSStyleDeclaration } from 'cssom';

/**
 * 올바른 `docData` 인지 검사 
 * @param docData 
 * @returns 
 */
export function validateDocData(docData: Doc.Data.DocData) {
    function validateParagraph(paragraph: Doc.Data.DocParagraph) {
        if (!paragraph.title) return false;

        return paragraph.subParagraphs.every(validateParagraph) && true;
    }

    if (!docData.title) return false;
    if (docData.type === "song" && !docData.songNo) false;
    if (docData.type === "redirect") return true;

    return docData.contentTree.subParagraphs.every(validateParagraph) && true;
}

/**
 * 기본 doc data 생성
 */
export function createDefaultDocData(): Doc.Data.DocData {
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

export const docContext = {
    /**
     * windowContext 반환
     * 
     * ssr이 켜져 있을 때에는 호출 후 `isMobile`과 `theme`을 직접 설정해야함.
     */
    getContext() {
        if (typeof (window) === "undefined") {
            return new Map();
        }

        let windowContext = window.__doc__window__context__;
        if (!windowContext) {
            windowContext = new Map<string & any, any>();
            window.__doc__window__context__ = windowContext;
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
    },
    /**
     * windowContext의 'wikiDocAnnotations' 데이터를 초기화
     */
    resetWikiDocAnnotations() {
        const windowContext = this.getContext();

        let annotationsMap = windowContext.get('wikiDocAnnotations');
        if (annotationsMap) {
            annotationsMap.clear();
        }
        else {
            annotationsMap = new Map<string, string>();
            windowContext.set('wikiDocAnnotations', annotationsMap);
        }
    },
    /**
     * windowContext에 'wikiDocURLBase'를 설정
     */
    defineWikiDocURLBase(base: URL) {
        this.getContext().set('wikiDocURLBase', base);
    },
}

/**
 * WikiError
 */
export class WikiError extends Error {
    code: string;

    constructor(code: string, msg?: string) {
        super(msg);
        this.code = code;
    }
}

import { Marked } from 'marked';
import { HTMLElement, parse as parseHTML_ } from 'node-html-parser';
import { page } from '$app/state';
import markdownEscape from 'markdown-escape';

function parseHTML(src: string){
    return parseHTML_(src, {
        voidTag: {
            tags: ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr', 'style-table', 'style-cell', 'style-row', 'style-col']
        }
    })
}

export const renderer = {
    /**
     * 미리보기 모드에서 HTML을 렌더링
     * @context client
     */
    async renderPreviewHTML(src: string, finishCallback?: (dom: HTMLElement) => Promise<any> | any) {
        src = this.convertAnnotation(src);
        src = this.marked.parse(src, { async: false });
        const dom = parseHTML(src);
        this.purifyHTML(dom);
        this.fillPreviewAnnotationKeys(dom);
        this.makePreviewLinkAvailable(dom);
        this.sanitizeTable(dom);

        if (finishCallback) {
            await finishCallback(dom);
        }
        return dom.innerHTML;
    },
    /**
     * DB에 데이터를 넣기 전 prerender
     * @param contentTree 
     * @returns 
     */
    async prerenderContentTree(contentTree: Doc.Data.ContentTree) {
        const scope: Record<string, any> = {};

        const prerenderContent = async (src: string) => {
            src = this.convertAnnotation(src);
            src = this.marked.parse(src, { async: false });
            const dom = parseHTML(src);
            this.purifyHTML(dom);
            this.fillAnnotationKeys(dom, scope);
            this.sanitizeTable(dom);

            return dom.innerHTML;
        }

        async function prerenderParagraph(paragraph: Doc.Data.DocParagraph): Promise<Doc.Data.DocParagraph> {
            const subParagraphs: Doc.Data.DocParagraph['subParagraphs'] = [];
            for (const subParagraph of paragraph.subParagraphs) {
                subParagraphs.push(await prerenderParagraph(subParagraph));
            }

            const rendered: Doc.Data.DocParagraph = {
                title: paragraph.title,
                content: await prerenderContent(paragraph.content),
                subParagraphs
            };

            return rendered;
        }

        const subParagraphs: Doc.Data.DocParagraph['subParagraphs'] = [];
        for (const subParagraph of contentTree.subParagraphs) {
            subParagraphs.push(await prerenderParagraph(subParagraph));
        };
        const rendered: Doc.Data.ContentTree = {
            content: await prerenderContent(contentTree.content),
            subParagraphs
        };

        return rendered;
    },
    /**
     * +page.server.ts에서 사용됨.
     * @param html 
     * @param finishCallback 
     * @returns 
     */
    async prepareView(html: string, finishCallback?: (dom: HTMLElement) => (Promise<any> | any)) {
        const dom = parseHTML(html);

        if (finishCallback) {
            await finishCallback(dom);
        }
        return dom.innerHTML;

        async function v() {

        }
    },
    sharpConverter: {
        /**
        * #을 \\#으로 변환
        */
        escapeSharp(src: string) {
            let escaped = '';
            let index = 0;
            while (index < src.length) {
                const char = src[index];
                if (char === '#') {
                    escaped += '\\#';
                }
                else {
                    escaped += char;
                }
                index++;
            }
            return escaped;
        },
        /**
         * \\#를 #으로 변환
         */
        unescapeSharp(src: string) {
            let unescaped = '';
            let index = 0;
            while (index < src.length) {
                const char = src[index];
                if (char === '/' && src[index + 1] === '#') {
                    unescaped += '#';
                    index += 2;
                }
                else {
                    unescaped += char;
                    index++;
                }
            }
            return unescaped;
        }
    },
    /**
     * contentTree를 하나의 string으로 변환
     * @param contentTree 
     * @returns 
     */
    normalizeContentTree(contentTree: Doc.Data.ContentTree): string {
        let normalized = '';

        normalized += this.sharpConverter.escapeSharp(contentTree.content);
        contentTree.subParagraphs.forEach((subParagraph) => {
            normalized += '\n';
            normalized += normalizeParagraph(subParagraph, 1);
        })
        return normalized;

        function normalizeParagraph(paragraph: Doc.Data.DocParagraph, depth: number) {
            let normalized = '';

            // 제목 추가
            for (let i = 0; i < depth; i++) {
                normalized += '#';
            }
            normalized += ' ';
            normalized += markdownEscape(paragraph.title);
            normalized += '\n';

            // 본문 추가
            normalized += paragraph.content;

            // 하위 문단 추가
            paragraph.subParagraphs.forEach((subParagraph) => {
                normalized += '\n';
                normalized += normalizeParagraph(subParagraph, depth + 1);
            })
            return normalized;
        }
    },
    /**
     * `[* 주석]` 또는 `[*key 주석]`을 HTML로 변환합니다.
     * `key`에 수를 사용하면 삭제됩니다.
     * @param src 
     * @returns 
     */
    convertAnnotation(src: string) {
        // [*key]를 변환
        const keyAnnotRegexp = /((?<!\\)(?:\\\\)*)\[\*([^ ]+)(?<!\\)(?:\\\\)*\]/;
        let exec = keyAnnotRegexp.exec(src);
        while (exec) {
            const left = src.substring(0, exec.index);
            const right = src.substring(exec.index + exec[0].length);

            const htmlEscapeMap = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            };
            const annotKey = exec[2].trim().replace(/[&<>"']/g, (e) => {
                return htmlEscapeMap[e as keyof typeof htmlEscapeMap]
            });
            if (/^[0-9]*$/.test(annotKey)) {
                var converted = exec[1];
            }
            else {
                var converted = `${exec[1]}<wiki-annot key="${annotKey}"></wiki-annot>`;
            }

            src = left + converted + right;
            exec = keyAnnotRegexp.exec(src);
        }

        // [* 주석내용] 변환
        const annotRegexp = /((?<!\\)(?:\\\\)*)\[\*([^ ]*)\s((?:(?:(?<!\\)(?:\\\\)*\[.*\]\(.*\))|(?:.))*?(?<!\\)(?:\\\\)*)\]/;
        exec = annotRegexp.exec(src);
        while (exec) {
            const left = src.substring(0, exec.index);
            const right = src.substring(exec.index + exec[0].length);

            if (exec[2].length > 0) {
                const htmlEscapeMap = {
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    "'": '&#039;'
                };
                const annotKey = exec[2].trim().replace(/[&<>"']/g, (e) => {
                    return htmlEscapeMap[e as keyof typeof htmlEscapeMap]
                });
                if (/^[0-9]*$/.test(annotKey)) {
                    var converted = exec[1];
                }
                else {
                    var converted = `${exec[1]}<wiki-annot key="${annotKey}">${exec[3].trim()}</wiki-annot>`;
                }
            }
            else {
                var converted = `${exec[1]}<wiki-annot>${exec[3].trim()}</wiki-annot>`;
            }

            src = left + converted + right;
            exec = annotRegexp.exec(src);
        }

        return src;
    },
    /**
     * 미리보기에서 `key` 속성이 없는 `wiki-annot`에 `key` 속성을 추가합니다. 
     */
    fillPreviewAnnotationKeys(dom: HTMLElement) {
        let key = 1;
        dom.querySelectorAll('wiki-annot').forEach((e) => {
            if (typeof (e.getAttribute('key')) !== "undefined") return;

            e.setAttribute('key', key.toString());
            key++;
        })
    },
    /**
     * `key` 속성이 없는 `wiki-annot`에 `key` 속성을 추가합니다. 
     */
    fillAnnotationKeys(dom: HTMLElement, scope: Record<string, any>) {
        if (!("annotKey" in scope)) {
            scope.annotKey = 1;
        }
        dom.querySelectorAll('wiki-annot').forEach((e) => {
            if (typeof (e.getAttribute('key')) !== "undefined") return;

            e.setAttribute('key', scope.annotKey.toString());
            scope.annotKey++;
        })
    },
    /**
     * 불필요한 HTML 태그, 속성 등을 삭제하거나 변경합니다.
     */
    purifyHTML(dom: HTMLElement): void {
        //허용되지 않은 태그 제거
        const allowedTags: string[] = ['p', 'a', 'img', 'strong', 'em', 'del', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'wiki-annot', 'wiki-link', 'wiki-yt', 'wiki-float', 'style-table', 'style-cell', 'style-row', 'style-col'];
        dom.querySelectorAll(`:not(${allowedTags.join(', ')})`).forEach(e => e.remove());

        //허용되지 않은 속성 제거
        const allowedAttributes = {
            'a': ['href'],
            'img': ['src', 'alt'],
            'th': ['align', 'colspan', 'rowspan'],
            'td': ['colspan', 'rowspan'],
            'wiki-annot': ['key'],
            'wiki-link': ['doctitle'],
            'wiki-yt': ['v'],
            'wiki-float': ['float'],
            'style-table': ['bordercolor', 'bgcolor', 'textcolor', 'width', 'minwidth', 'maxwidth', 'height', 'minheight', 'maxheight', 'float'],
            'style-cell': ['bordercolor', 'bgcolor', 'textcolor', 'width', 'minwidth', 'maxwidth', 'height', 'minheight', 'maxheight'],
            'style-row': ['bgcolor', 'textcolor', 'height', 'minheight', 'maxheight'],
            'style-col': ['bordercolor', 'bgcolor', 'textcolor', 'width', 'minwidth', 'maxwidth', 'height', 'minheight', 'maxheight'],
        };
        dom.querySelectorAll('*').forEach((element) => {
            const tag = element.tagName.toLowerCase();
            const allowed = allowedAttributes[tag as keyof typeof allowedAttributes] ?? [];
            Object.keys(element.attributes).forEach((attr) => {
                if (!allowed.includes(attr)) {
                    element.removeAttribute(attr);
                }
            })
        });

        //a 태그의 href 속성 수정
        dom.querySelectorAll('a').forEach((e) => {
            const href = e.getAttribute('href');
            if (!href) return;

            if (href.startsWith('//')) {
                // '//'로 시작하는 링크
                e.setAttribute('target', '_blank');
            }
            else {
                try {
                    //외부 링크
                    var url = new URL(href);
                    if (url.protocol === "javascript:") {
                        //자바스크립트 XSS
                        e.removeAttribute('href');
                    }
                    else {
                        e.setAttribute('target', '_blank');
                    }
                }
                catch {
                    //내부 링크
                    var url = new URL(page.url);
                    url.pathname = href;
                    e.setAttribute('href', url.href);
                }
            }
        })
    },
    /**
     * `<style-table>`과 `<style-cell>` 태그로 테이블의 스타일 적용
     */
    sanitizeTable(dom: HTMLElement) {
        dom.querySelectorAll('table').forEach((table: HTMLElement) => {
            // 자식 요소 중 thead와 tbody가 아닌 것 제와
            let [theadExists, tbodyExists] = [false, false];
            table.childNodes.forEach((child) => {
                const tag = child.rawTagName.toLowerCase();
                if (tag === "thead" && !theadExists) {
                    theadExists = true;
                    return;
                }
                if (tag === "tbody" && !tbodyExists) {
                    tbodyExists = true;
                    return;
                }
                if (tag === "style-table") {
                    return;
                }
                child.remove();
            })

            // style-table 확인
            const styleTableElement = table.querySelector('style-table');
            if (styleTableElement) {
                const borderColor = styleTableElement.getAttribute('bordercolor');
                const bgColor = styleTableElement.getAttribute('bgcolor');
                const textColor = styleTableElement.getAttribute('textcolor');
                const width = styleTableElement.getAttribute('width');
                const minWidth = styleTableElement.getAttribute('minwidth');
                const maxWidth = styleTableElement.getAttribute('maxwidth');
                const height = styleTableElement.getAttribute('height');
                const minHeight = styleTableElement.getAttribute('minheight');
                const maxHeight = styleTableElement.getAttribute('maxheight');
                const float = styleTableElement.getAttribute('float');

                const style = new CSSStyleDeclaration();
                borderColor && style.setProperty('border-color', borderColor);;
                bgColor && style.setProperty('background-color', bgColor);
                textColor && style.setProperty('color', textColor);
                width && style.setProperty('width', width);
                minWidth && style.setProperty('min-width', minWidth);
                maxWidth && style.setProperty('max-width', maxWidth);
                height && style.setProperty('height', height);
                minHeight && style.setProperty('min-height', minHeight);
                maxHeight && style.setProperty('max-height', maxHeight);
                float && style.setProperty('float', float);
                table.setAttribute('style', style.cssText);
            }

            // 열 style 맵
            const columnStyleMap = new Map<number, Record<string, string>>();

            // thead 정상화
            const thead = table.querySelector(':scope > thead');
            if (thead) {
                let trExists = false;
                thead.childNodes.forEach((child) => {
                    // tr, style-table이 아닌 자식요소 제거, tr 하나만 남겨놓기
                    const tag = child.rawTagName.toLowerCase()
                    if (tag !== "tr" && tag !== "style-table") {
                        return child.remove();
                    }
                    if (tag === "tr" && trExists) {
                        return child.remove();
                    }

                    trExists = true;
                });

                // tr 찾기
                const tr = thead.querySelector('tr');
                if (!tr) {
                    return;
                }

                // th나 style-row가 아닌 자식요소 제거
                tr.childNodes.forEach((child) => {
                    const tag = child.rawTagName.toLowerCase();
                    if (tag !== "th" && tag !== "style-row" && tag !== "style-table") {
                        return child.remove();
                    };
                })

                let index = 0;
                // style-cell, styleCol 확인
                tr.querySelectorAll(':scope > th').forEach((th) => {
                    const style = new CSSStyleDeclaration();

                    // columnStyle 확인
                    let columnStyle = columnStyleMap.get(index)
                    if (columnStyle === undefined) {
                        const styleCol = th.querySelector('style-col');
                        columnStyle = {};
                        if (styleCol) {
                            const borderColor = styleCol.getAttribute('bordercolor');
                            const bgColor = styleCol.getAttribute('bgcolor');
                            const textColor = styleCol.getAttribute('textcolor');
                            const width = styleCol.getAttribute('width');
                            const minWidth = styleCol.getAttribute('minwidth');
                            const maxWidth = styleCol.getAttribute('maxwidth');
                            const height = styleCol.getAttribute('height');
                            const minHeight = styleCol.getAttribute('minheight');
                            const maxHeight = styleCol.getAttribute('maxheight');

                            borderColor && (columnStyle['border-color'] = borderColor);;
                            bgColor && (columnStyle['background-color'] = bgColor);
                            textColor && (columnStyle['color'] = textColor);
                            width && (columnStyle['width'] = width);
                            minWidth && (columnStyle['min-width'] = minWidth);
                            maxWidth && (columnStyle['max-width'] = maxWidth);
                            height && (columnStyle['height'] = height);
                            minHeight && (columnStyle['min-height'] = minHeight);
                            maxHeight && (columnStyle['max-height'] = maxHeight);

                            const colSpan = Number(th.getAttribute('colspan')) || 1;
                            for(let i = 0; i < colSpan; i++){
                                columnStyleMap.set(index + i, columnStyle);
                            }
                        }
                    }
                    Object.entries(columnStyle as Record<string, string>).forEach(([key, value]) => {
                        style.setProperty(key, value);
                    })

                    // style-cell 태그확인
                    const styleCell = th.querySelector('style-cell');
                    if (styleCell) {
                        const borderColor = styleCell.getAttribute('bordercolor');
                        const bgColor = styleCell.getAttribute('bgcolor');
                        const textColor = styleCell.getAttribute('textcolor');
                        const width = styleCell.getAttribute('width');
                        const minWidth = styleCell.getAttribute('minwidth');
                        const maxWidth = styleCell.getAttribute('maxwidth');
                        const height = styleCell.getAttribute('height');
                        const minHeight = styleCell.getAttribute('minheight');
                        const maxHeight = styleCell.getAttribute('maxheight');

                        borderColor && style.setProperty('border-color', borderColor);;
                        bgColor && style.setProperty('background-color', bgColor);
                        textColor && style.setProperty('color', textColor);
                        width && style.setProperty('width', width);
                        minWidth && style.setProperty('min-width', minWidth);
                        maxWidth && style.setProperty('max-width', maxWidth);
                        height && style.setProperty('height', height);
                        minHeight && style.setProperty('min-height', minHeight);
                        maxHeight && style.setProperty('max-height', maxHeight);
                    }

                    th.setAttribute('style', style.cssText);

                    const colSpan = Number(th.getAttribute('colspan'));
                    if (!Number.isNaN(colSpan)) {
                        index += colSpan;
                    }
                    else {
                        index++;
                    }
                });

                const styleRow = tr.querySelector('style-row');
                if (styleRow) {
                    const style = new CSSStyleDeclaration();

                    const borderColor = styleRow.getAttribute('bordercolor');
                    const bgColor = styleRow.getAttribute('bgcolor');
                    const textColor = styleRow.getAttribute('textcolor');
                    const height = styleRow.getAttribute('height');
                    const minHeight = styleRow.getAttribute('minheight');
                    const maxHeight = styleRow.getAttribute('maxheight');

                    borderColor && style.setProperty('border-color', borderColor);;
                    bgColor && style.setProperty('background-color', bgColor);
                    textColor && style.setProperty('color', textColor);
                    height && style.setProperty('height', height);
                    minHeight && style.setProperty('min-height', minHeight);
                    maxHeight && style.setProperty('max-height', maxHeight);

                    tr.setAttribute('style', style.cssText);
                }
            }

            // tbody 정상화
            const tbody = table.querySelector(':scope > tbody');
            if (tbody) {
                tbody.childNodes.forEach((e) => {
                    const tag = e.rawTagName.toLowerCase();
                    if (tag !== "tr") {
                        return e.remove();
                    }
                })
                tbody.querySelectorAll(':scope > tr').forEach((tr) => {
                    tr.childNodes.forEach((e) => {
                        const tag = e.rawTagName.toLowerCase();
                        if (tag !== "td" && tag !== "style-row") {
                            return e.remove();
                        }
                    });

                    let index = 0;
                    tr.querySelectorAll(':scope > td').forEach((td) => {
                        const style = new CSSStyleDeclaration();

                        // columnStyle 확인
                        let columnStyle = columnStyleMap.get(index) ?? {};
                        Object.entries(columnStyle as Record<string, string>).forEach(([key, value]) => {
                            style.setProperty(key, value);
                        })

                        // style-cell 태그확인
                        const styleCell = td.querySelector('style-cell');
                        if (styleCell) {
                            const borderColor = styleCell.getAttribute('bordercolor');
                            const bgColor = styleCell.getAttribute('bgcolor');
                            const textColor = styleCell.getAttribute('textcolor');
                            const width = styleCell.getAttribute('width');
                            const minWidth = styleCell.getAttribute('minwidth');
                            const maxWidth = styleCell.getAttribute('maxwidth');
                            const height = styleCell.getAttribute('height');
                            const minHeight = styleCell.getAttribute('minheight');
                            const maxHeight = styleCell.getAttribute('maxheight');

                            borderColor && style.setProperty('border-color', borderColor);;
                            bgColor && style.setProperty('background-color', bgColor);
                            textColor && style.setProperty('color', textColor);
                            width && style.setProperty('width', width);
                            minWidth && style.setProperty('min-width', minWidth);
                            maxWidth && style.setProperty('max-width', maxWidth);
                            height && style.setProperty('height', height);
                            minHeight && style.setProperty('min-height', minHeight);
                            maxHeight && style.setProperty('max-height', maxHeight);
                        }

                        td.setAttribute('style', style.cssText);

                        const colSpan = Number(td.getAttribute('colspan'));
                        if (!Number.isNaN(colSpan)) {
                            index += colSpan;
                        }
                        else {
                            index++;
                        }
                    })

                    // style-row
                    const styleRow = tr.querySelector('style-row');
                    if (styleRow) {
                        const style = new CSSStyleDeclaration();

                        const borderColor = styleRow.getAttribute('bordercolor');
                        const bgColor = styleRow.getAttribute('bgcolor');
                        const textColor = styleRow.getAttribute('textcolor');
                        const height = styleRow.getAttribute('height');
                        const minHeight = styleRow.getAttribute('minheight');
                        const maxHeight = styleRow.getAttribute('maxheight');

                        borderColor && style.setProperty('border-color', borderColor);;
                        bgColor && style.setProperty('background-color', bgColor);
                        textColor && style.setProperty('color', textColor);
                        height && style.setProperty('height', height);
                        minHeight && style.setProperty('min-height', minHeight);
                        maxHeight && style.setProperty('max-height', maxHeight);

                        tr.setAttribute('style', style.cssText);
                    }
                })
            }

            // container에 씌우기
            const container = parseHTML('<div class="table-container"></div>').querySelector('div') as HTMLElement;
            table.querySelectorAll('style-table, style-row, style-col, style-cell').forEach(e => e.remove())
            table.replaceWith(container);
            container.appendChild(table);
        })
    },
    /**
     * 미리보기 모드에서 `wiki-link` 태그에 `available` 속성을 부여함
     * @context client
     * @param dom 
     */
    makePreviewLinkAvailable(dom: HTMLElement) {
        dom.querySelectorAll('wiki-link').forEach((element) => {
            element.setAttribute('available', 'true');
            element.setAttribute('test', 'true');
        })
    },
    /**
     * html escape
     * @param string 
     * @returns 
     */
    escapeHtml(string: string) {
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
    },
    marked: new Marked({
        tokenizer: {
            /**
             * disable heading
             */
            heading() {
                return undefined;
            },
            /**
             * disable lheading
             */
            lheading() {
                return undefined;
            },
            escape(src) {
                if (src.startsWith("\\#")) {
                    return undefined;
                }
                return false;
            }
        },
        async: false,
    })
} as const;