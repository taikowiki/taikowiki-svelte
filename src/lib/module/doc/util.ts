import type { Doc } from '$lib/module/doc';
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
    initContext({ theme, isMobile }: { theme: Writable<'light' | 'dark'>, isMobile: Writable<boolean> }) {
        const windowContext: Window['__doc__window__context__'] = new Map<string & any, any>();
        windowContext.set('theme', theme);
        windowContext.set('isMobile', isMobile);
        window.__doc__window__context__ = windowContext;
        return windowContext;
    },
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
            annotationsMap = new SvelteMap<string, string>();
            windowContext.set('wikiDocAnnotations', annotationsMap);
        }
    },
    getDocAnnotations(): SvelteMap<string, string> {
        const windowContext = this.getContext();

        let annotationsMap = windowContext.get('wikiDocAnnotations');
        if (!annotationsMap) {
            annotationsMap = new SvelteMap<string, string>();
            windowContext.set('wikiDocAnnotations', annotationsMap);
        }
        return annotationsMap;
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

/**
 * Doc.DB.DocDBData를 Doc.Data.DocData로 변환
 */
export function parseDBData<T extends keyof Doc.DB.DocDBData = keyof Doc.DB.DocDBData>(dataFromDB: any): Pick<Doc.DB.DocDBData, T> {
    const docData: any = {};
    Object.keys(dataFromDB).forEach((key) => {
        if (key === "contentTree" || key === "renderedContentTree") {
            const value = dataFromDB[key];
            if (value === null) {
                docData[key] = null;
            }
            else {
                docData[key] = JSON.parse(value);
            }
            return;
        }
        if (key === "createdTime" || key === "editedTime") {
            docData[key] = new Date(dataFromDB[key]);
            return;
        }
        if (key === "isDeleted") {
            docData[key] = Boolean(dataFromDB[key]);
            return;
        }
        docData[key] = dataFromDB[key];
    })
    return docData;
}

import { lexer, Marked, parser, walkTokens, type Token, type TokenizerExtensionFunction, type TokenizerObject } from 'marked';
import { HTMLElement, parse as parseHTML_ } from 'node-html-parser';
import markdownEscape from 'markdown-escape';
import { SvelteMap } from "svelte/reactivity";
import type { Writable } from "svelte/store";

export function parseHTML(src: string) {
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
        //src = this.convertAnnotation(src);
        src = this.marked.parse(src, { async: false });

        //src = this.parseMarkdown(src);
        const dom = parseHTML(src);
        this.purifyHTML(dom);
        this.fillPreviewAnnotationKeys(dom);
        this.makePreviewLinkAvailable(dom);
        this.sanitizeTable(dom);
        this.sanitizeText(dom);

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
    prerenderContentTree(contentTree: Doc.Data.ContentTree) {
        const scope: Record<string, any> = {};

        const prerenderContent = (src: string) => {
            //src = this.convertAnnotation(src);
            src = this.marked.parse(src, { async: false });
            const dom = parseHTML(src);
            this.purifyHTML(dom);
            this.fillAnnotationKeys(dom, scope);
            this.sanitizeTable(dom);
            this.sanitizeText(dom);

            return dom.innerHTML;
        }

        function prerenderParagraph(paragraph: Doc.Data.DocParagraph): Doc.Data.DocParagraph {
            const subParagraphs: Doc.Data.DocParagraph['subParagraphs'] = [];
            for (const subParagraph of paragraph.subParagraphs) {
                subParagraphs.push(prerenderParagraph(subParagraph));
            }

            const rendered: Doc.Data.DocParagraph = {
                title: paragraph.title,
                content: prerenderContent(paragraph.content),
                subParagraphs
            };

            return rendered;
        }

        const subParagraphs: Doc.Data.DocParagraph['subParagraphs'] = [];
        for (const subParagraph of contentTree.subParagraphs) {
            subParagraphs.push(prerenderParagraph(subParagraph));
        };
        const rendered: Doc.Data.ContentTree = {
            content: prerenderContent(contentTree.content),
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
    flattenContentTree(contentTree: Doc.Data.ContentTree): string {
        let flattened = '';
        contentTree = this.prerenderContentTree(contentTree);
        //const sharpConverter = this.sharpConverter;

        const dom = parseHTML(contentTree.content);
        //console.log(dom.innerText)
        dom.querySelectorAll('pre').forEach((e) => {
            const v = parseHTML('<c-pre></c-pre>').querySelector('c-pre') as HTMLElement;
            v.innerHTML = e.innerHTML;
            Object.entries(e.attributes).forEach(([key, value]) => {
                v.setAttribute(key, value)
            })
            e.replaceWith(v);
        })
        //console.log(dom.innerText);
        flattened += dom.innerText;
        contentTree.subParagraphs.forEach((subParagraph, index) => {
            flattened += '\n';
            flattened += flattenParagraph(subParagraph, 1, (index + 1).toString());
        })
        return flattened;

        function flattenParagraph(paragraph: Doc.Data.DocParagraph, depth: number, index: string) {
            let flattened = '';

            // 제목 추가
            for (let i = 0; i < depth; i++) {
                flattened += `${index}.`;
            }
            flattened += ' ';
            flattened += markdownEscape(paragraph.title);
            flattened += '\n';

            // 본문 추가
            const dom = parseHTML(paragraph.content);
            dom.querySelectorAll('pre').forEach((e) => {
                const v = parseHTML('<c-pre></c-pre>').querySelector('c-pre') as HTMLElement;
                v.innerHTML = e.innerHTML;
                Object.entries(e.attributes).forEach(([key, value]) => {
                    v.setAttribute(key, value)
                })
                e.replaceWith(v);
            })
            flattened += dom.innerText;

            // 하위 문단 추가
            paragraph.subParagraphs.forEach((subParagraph, index_) => {
                flattened += '\n';
                flattened += flattenParagraph(subParagraph, depth + 1, `${index}.${index_ + 1}`);
            })
            return flattened;
        }
    },
    /**
     * `[* 주석]` 또는 `[*key 주석]`을 HTML로 변환합니다.
     * `key`에 수를 사용하면 삭제됩니다.
     * @param src 
     * @returns 
     * @deprecated
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
        const allowedTags: string[] = ['p', 'a', 'img', 'strong', 'em', 'del', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'ul', 'ol', 'li', 'hr', 'blockquote', 'pre', 'code', 'text', 'br', 'wiki-annot', 'wiki-link', 'wiki-yt', 'wiki-float', 'style-table', 'style-cell', 'style-row', 'style-col'];
        dom.querySelectorAll(`:not(${allowedTags.join(', ')})`).forEach(e => e.remove());

        //허용되지 않은 속성 제거
        const allowedAttributes = {
            'a': ['href'],
            'img': ['src', 'alt', 'width', 'height'],
            'th': ['align', 'colspan', 'rowspan'],
            'td': ['colspan', 'rowspan'],
            'text': ['color', 'bgcolor', 'size'],
            'wiki-annot': ['key'],
            'wiki-link': ['doctitle'],
            'wiki-yt': ['v', 'width', 'height'],
            'wiki-float': ['float'],
            'style-table': ['bordercolor', 'bgcolor', 'textcolor', 'width', 'minwidth', 'maxwidth', 'height', 'minheight', 'maxheight', 'float', 'align', 'overflow'],
            'style-cell': ['bordercolor', 'bgcolor', 'textcolor', 'width', 'minwidth', 'maxwidth', 'height', 'minheight', 'maxheight', 'align', 'colspan', 'rowspan', 'disable'],
            'style-row': ['bgcolor', 'textcolor', 'height', 'minheight', 'maxheight', 'align'],
            'style-col': ['bordercolor', 'bgcolor', 'textcolor', 'width', 'minwidth', 'maxwidth', 'height', 'minheight', 'maxheight', 'align'],
            'code': ['class']
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
                    let href_ = href;
                    if (!href_.startsWith('http://') || !href_.startsWith('https://')) {
                        href_ += 'http://'
                    }
                    var url = new URL(href_);
                    if (url.protocol === "javascript:") {
                        //자바스크립트 XSS
                        e.removeAttribute('href');
                    }
                    else {
                        e.setAttribute('target', '_blank');
                    }
                }
                catch {
                    e.removeAttribute('href');
                }
                e.setAttribute('target', '_blank')
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
            let overflow = false;
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
                const align = styleTableElement.getAttribute('align');
                const overflow_ = styleTableElement.getAttribute('overflow');
                if (overflow_ && overflow_ !== "false") {
                    overflow = true;
                }

                const style = new CSSStyleDeclaration();
                borderColor && style.setProperty('border-color', borderColor);
                if (bgColor) {
                    if (bgColor === "rainbow") {
                        style.setProperty('background', 'linear-gradient(90deg,rgba(255, 90, 140, 1) 0%, rgba(251, 255, 0, 1) 20%, rgba(121, 255, 112, 1) 40%, rgba(122, 246, 255, 1) 50%, rgba(166, 100, 255, 1) 70%, rgba(255, 82, 160, 1) 100%)');
                    }
                    else {
                        style.setProperty('background-color', bgColor);
                    }
                }
                textColor && style.setProperty('color', textColor);
                width && style.setProperty('width', width);
                minWidth && style.setProperty('min-width', minWidth);
                maxWidth && style.setProperty('max-width', maxWidth);
                height && style.setProperty('height', height);
                minHeight && style.setProperty('min-height', minHeight);
                maxHeight && style.setProperty('max-height', maxHeight);
                float && style.setProperty('float', float);
                align && style.setProperty('text-align', align);
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

                // th에 대해 disable, rowspan, colspan 지정
                tr.querySelectorAll(':scope > th').forEach((th) => {
                    const styleCell = th.querySelector('style-cell');
                    if (!styleCell) return;

                    const disable = styleCell.getAttribute('disable');
                    if (typeof (disable) !== "undefined") {
                        return th.remove();
                    }

                    const rowspan = styleCell.getAttribute('rowspan');
                    const colspan = styleCell.getAttribute('colspan');

                    rowspan && th.setAttribute('rowspan', rowspan);
                    colspan && th.setAttribute('colspan', colspan);
                })

                // th에 대해 스타일 지정
                let index = 0;
                tr.querySelectorAll(':scope > th').forEach((th) => {
                    const style = new CSSStyleDeclaration();

                    // columnStyle 확인
                    const styleCol = th.querySelector('style-col');
                    const columnStyle: Record<string, string> = {};
                    let align = th.getAttribute('align');
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
                        align = styleCol.getAttribute('align');

                        borderColor && (columnStyle['border-color'] = borderColor);
                        if (bgColor) {
                            if (bgColor === "rainbow") {
                                columnStyle['background'] = "linear-gradient(90deg,rgba(255, 90, 140, 1) 0%, rgba(251, 255, 0, 1) 20%, rgba(121, 255, 112, 1) 40%, rgba(122, 246, 255, 1) 50%, rgba(166, 100, 255, 1) 70%, rgba(255, 82, 160, 1) 100%)";
                            }
                            else {
                                columnStyle['background-color'] = bgColor;
                            }
                        }
                        textColor && (columnStyle['color'] = textColor);
                        width && (columnStyle['width'] = width);
                        minWidth && (columnStyle['min-width'] = minWidth);
                        maxWidth && (columnStyle['max-width'] = maxWidth);
                        height && (columnStyle['height'] = height);
                        minHeight && (columnStyle['min-height'] = minHeight);
                        maxHeight && (columnStyle['max-height'] = maxHeight);
                    }
                    {
                        align && (columnStyle['text-align'] = align);
                        const colSpan = Number(th.getAttribute('colspan')) || 1;
                        for (let i = 0; i < colSpan; i++) {
                            columnStyleMap.set(index + i, columnStyle);
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
                        const align = styleCell.getAttribute('align');

                        borderColor && style.setProperty('border-color', borderColor);
                        if (bgColor) {
                            if (bgColor === "rainbow") {
                                style.setProperty('background', "linear-gradient(90deg,rgba(255, 90, 140, 1) 0%, rgba(251, 255, 0, 1) 20%, rgba(121, 255, 112, 1) 40%, rgba(122, 246, 255, 1) 50%, rgba(166, 100, 255, 1) 70%, rgba(255, 82, 160, 1) 100%)");
                            }
                            else {
                                style.setProperty('background-color', bgColor);
                            }
                        }
                        textColor && style.setProperty('color', textColor);
                        width && style.setProperty('width', width);
                        minWidth && style.setProperty('min-width', minWidth);
                        maxWidth && style.setProperty('max-width', maxWidth);
                        height && style.setProperty('height', height);
                        minHeight && style.setProperty('min-height', minHeight);
                        maxHeight && style.setProperty('max-height', maxHeight);
                        align && style.setProperty('text-align', align);
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
                    const align = styleRow.getAttribute('align');

                    borderColor && style.setProperty('border-color', borderColor);
                    if (bgColor) {
                        if (bgColor === "rainbow") {
                            style.setProperty('background', "linear-gradient(90deg,rgba(255, 90, 140, 1) 0%, rgba(251, 255, 0, 1) 20%, rgba(121, 255, 112, 1) 40%, rgba(122, 246, 255, 1) 50%, rgba(166, 100, 255, 1) 70%, rgba(255, 82, 160, 1) 100%)");
                        }
                        else {
                            style.setProperty('background-color', bgColor);
                        }
                    }
                    textColor && style.setProperty('color', textColor);
                    height && style.setProperty('height', height);
                    minHeight && style.setProperty('min-height', minHeight);
                    maxHeight && style.setProperty('max-height', maxHeight);
                    align && style.setProperty('text-align', align);

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

                    // td에 대해 disable, rowspan, colspan 지정
                    tr.querySelectorAll(':scope > td').forEach((td) => {
                        const styleCell = td.querySelector('style-cell');
                        if (!styleCell) return;

                        const disable = styleCell.getAttribute('disable');
                        if (typeof (disable) !== "undefined") {
                            return td.remove();
                        }

                        const rowspan = styleCell.getAttribute('rowspan');
                        const colspan = styleCell.getAttribute('colspan');

                        rowspan && td.setAttribute('rowspan', rowspan);
                        colspan && td.setAttribute('colspan', colspan);
                    })

                    // td에 대해 스타일 지정
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
                            const align = styleCell.getAttribute('align');

                            borderColor && style.setProperty('border-color', borderColor);
                            if (bgColor) {
                                if (bgColor === "rainbow") {
                                    style.setProperty('background', "linear-gradient(90deg,rgba(255, 90, 140, 1) 0%, rgba(251, 255, 0, 1) 20%, rgba(121, 255, 112, 1) 40%, rgba(122, 246, 255, 1) 50%, rgba(166, 100, 255, 1) 70%, rgba(255, 82, 160, 1) 100%)");
                                }
                                else {
                                    style.setProperty('background-color', bgColor);
                                }
                            }
                            textColor && style.setProperty('color', textColor);
                            width && style.setProperty('width', width);
                            minWidth && style.setProperty('min-width', minWidth);
                            maxWidth && style.setProperty('max-width', maxWidth);
                            height && style.setProperty('height', height);
                            minHeight && style.setProperty('min-height', minHeight);
                            maxHeight && style.setProperty('max-height', maxHeight);
                            align && style.setProperty('text-align', align);
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
                        const align = styleRow.getAttribute('align');

                        borderColor && style.setProperty('border-color', borderColor);
                        if(bgColor){
                            if(bgColor === "rainbow"){
                                style.setProperty('background', "linear-gradient(90deg,rgba(255, 90, 140, 1) 0%, rgba(251, 255, 0, 1) 20%, rgba(121, 255, 112, 1) 40%, rgba(122, 246, 255, 1) 50%, rgba(166, 100, 255, 1) 70%, rgba(255, 82, 160, 1) 100%)");
                            }
                            else{
                                style.setProperty('background-color', bgColor);
                            }
                        }
                        textColor && style.setProperty('color', textColor);
                        height && style.setProperty('height', height);
                        minHeight && style.setProperty('min-height', minHeight);
                        maxHeight && style.setProperty('max-height', maxHeight);
                        align && style.setProperty('text-align', align);

                        tr.setAttribute('style', style.cssText);
                    }
                })
            }

            // container에 씌우기
            const container = parseHTML('<div class="table-container"></div>').querySelector('div') as HTMLElement;
            if (overflow) {
                container.classList.add('overflow');
            }
            table.querySelectorAll('style-table, style-row, style-col, style-cell').forEach(e => e.remove())
            table.replaceWith(container);
            container.appendChild(table);
        })
    },
    sanitizeText(dom: HTMLElement) {
        dom.querySelectorAll('text').forEach((text: HTMLElement) => {
            const color = text.getAttribute('color');
            const bgcolor = text.getAttribute('bgcolor');
            let size = text.getAttribute('size');

            const style = new CSSStyleDeclaration();
            if (color) {
                style.setProperty('color', color);
            }
            if (bgcolor) {
                if (bgcolor === "rainbow") {
                    style.setProperty('background', 'linear-gradient(90deg,rgba(255, 90, 140, 1) 0%, rgba(251, 255, 0, 1) 20%, rgba(121, 255, 112, 1) 40%, rgba(122, 246, 255, 1) 50%, rgba(166, 100, 255, 1) 70%, rgba(255, 82, 160, 1) 100%)');
                }
                else {
                    style.setProperty('background-color', bgcolor);
                }
            }
            if (size) {
                if (size.endsWith('px')) {
                    size = size.slice(0, -2);
                }
                let size_ = Number(size);
                if (!Number.isNaN(size_)) {
                    if (size_ > 5) {
                        size_ = 5;
                    }
                    else if (size_ < -5) {
                        size_ = -5;
                    }
                    size_ += 16;
                    style.setProperty('font-size', `${size_}px`);
                }
            }

            const span = new HTMLElement('span', {});
            span.setAttribute('style', style.cssText);
            span.innerHTML = text.innerHTML;
            text.replaceWith(span);
            text.remove();
            this.sanitizeText(span);
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
        extensions: [
            {
                name: 'annotKey',
                level: 'inline',                                 // Is this a block-level or inline-level tokenizer?
                //start(src) { return src.match(/\[\*/)?.index; },    // Hint to Marked.js to stop and check for a match
                tokenizer(src) {
                    const rule = /^((?<!\\)(?:\\\\)*)(\[\*([^ ]+?)(?<!\\)(?:\\\\)*\])/;  // Regex for the complete token, anchor to string start
                    const exec = rule.exec(src);
                    if (exec) {
                        const htmlEscapeMap = {
                            '&': '&amp;',
                            '<': '&lt;',
                            '>': '&gt;',
                            '"': '&quot;',
                            "'": '&#039;'
                        };
                        const annotKey = exec[3].trim().replace(/[&<>"']/g, (e) => {
                            return htmlEscapeMap[e as keyof typeof htmlEscapeMap]
                        });
                        return {                                         // Token to generate
                            type: 'annotKey',                           // Should match "name" above
                            raw: exec[0],
                            front: exec[1],
                            key: annotKey
                        };
                    }
                },
                renderer(token) {
                    if (/^[0-9]*$/.test(token.key)) {
                        return token.front.replaceAll('\\\\', '\\');
                    }
                    return `${token.front}<wiki-annot key="${token.key}"></wiki-annot>`;
                },
            },
            {
                name: 'annot',
                level: 'inline',
                tokenizer(src): ReturnType<TokenizerExtensionFunction> {
                    const annotRegexp = /^((?<!\\)(?:\\\\)*)(\[\*([^ \]]*)\s((?:(?:(?<!\\)(?:\\\\)*\[.*\]\(.*\))|(?:.))+?(?<!\\)(?:\\\\)*)\])/;
                    const exec = annotRegexp.exec(src);
                    //console.log(exec);
                    if (exec) {
                        if (exec[3].length > 0) {
                            const htmlEscapeMap = {
                                '&': '&amp;',
                                '<': '&lt;',
                                '>': '&gt;',
                                '"': '&quot;',
                                "'": '&#039;'
                            };
                            const annotKey = exec[3].trim().replace(/[&<>"']/g, (e) => {
                                return htmlEscapeMap[e as keyof typeof htmlEscapeMap]
                            });
                            return {
                                type: 'annot',
                                raw: exec[0],
                                front: exec[1],
                                key: annotKey,
                                content: exec[4].trim(),
                                tokens: renderer.marked.lexer(exec[4].trim())
                            }
                        }
                        else {
                            return {
                                type: 'annot',
                                raw: exec[0],
                                front: exec[1],
                                content: exec[4].trim(),
                                tokens: renderer.marked.lexer(exec[4].trim())
                            }
                        }
                    }
                },
                renderer(token) {
                    if (token.key && /^[0-9]*$/.test(token.key)) {
                        return token.front.replaceAll('\\\\', '\\')
                    }
                    if (token.tokens) {
                        const tokensParsed = parseHTML(renderer.marked.parser(token.tokens));
                        var content = tokensParsed.querySelector('p')?.innerHTML ?? '';
                    }
                    else {
                        var content = token.content as string;

                    }
                    if (token.key) {
                        return `${token.front.replaceAll('\\\\', '\\')}<wiki-annot key="${token.key}">${content}</wiki-annot>`;
                    }
                    else {
                        return `${token.front.replaceAll('\\\\', '\\')}<wiki-annot>${content}</wiki-annot>`;
                    }
                },

            }
        ]
    })
} as const;

type UndoStackData = {
    startPos: number | null;
    endPos: number | null;
    value: string;
}
export class UndoStack {
    private element: HTMLInputElement | HTMLTextAreaElement;
    private stack: UndoStackData[] = [];
    private currentPos = -1;
    private lastSave: number | null = null;
    private saveCooldown: number = 500;
    private maxStackSize: number = Infinity;
    private onUndo?: (element: UndoStack['element']) => any;
    private onRedo?: (element: UndoStack['element']) => any;

    constructor(element: UndoStack['element'], option?: { cooldown?: number, maxStackSize?: number, onUndo?: UndoStack['onUndo'], onRedo?: UndoStack['onRedo'] }) {
        this.element = element;
        if (option?.cooldown !== undefined) {
            this.saveCooldown = option.cooldown;
        }
        if (option?.maxStackSize) {
            this.maxStackSize = option.maxStackSize;
        }
        if (option?.onUndo) {
            this.onUndo = option.onUndo;
        }
        if (option?.onRedo) {
            this.onRedo = option.onRedo;
        }
        this.pushCurrent();

        element.addEventListener('keydown', (event) => {
            const ev = event as KeyboardEvent;
            if ((ev.key.toLowerCase() === "y" && ev.ctrlKey) || (ev.key.toLowerCase() === "z" && ev.shiftKey && ev.ctrlKey)) { // 앞으로 가기
                event.preventDefault();
                this.redo();
            }
            else
                if (ev.key.toLowerCase() === "z" && ev.ctrlKey) { // 뒤로 가기
                    event.preventDefault();
                    this.undo();
                }
        })

        element.addEventListener('input', () => {
            const now = Date.now();
            if (this.lastSave === null || now - this.lastSave > this.saveCooldown) {
                this.pushCurrent();
            }
        })
    }

    push(data: UndoStackData) {
        const current = this.stack[this.currentPos];
        if (current && current.value === data.value) return;

        this.stack = this.stack.slice(0, this.currentPos + 1);
        this.stack.push(data);
        this.lastSave = Date.now();
        if (this.currentPos >= this.maxStackSize - 1) {
            this.stack.shift();
        }
        else {
            this.currentPos++;
        }
    }
    pushCurrent() {
        this.push({
            startPos: this.element.selectionStart,
            endPos: this.element.selectionEnd,
            value: this.element.value
        })
    }
    pop() {
        this.currentPos--;
        return this.stack.pop();
    }
    undo() {
        if (this.currentPos <= -1) return;
        if (this.currentPos > 0) {
            this.currentPos--;
        }
        this.element.value = this.stack[this.currentPos].value;
        this.element.selectionStart = this.stack[this.currentPos].startPos;
        this.element.selectionEnd = this.stack[this.currentPos].endPos;
        this.onUndo?.(this.element);
    }
    redo() {
        if (this.currentPos >= this.stack.length - 1) return;
        this.currentPos++;
        this.element.value = this.stack[this.currentPos].value;
        this.element.selectionStart = this.stack[this.currentPos].startPos;
        this.element.selectionEnd = this.stack[this.currentPos].endPos;
        this.onRedo?.(this.element);
    }
}