import { Marked } from 'marked';
import * as MARKED from 'marked';
import { HTMLElement, parse as parseHTML } from 'node-html-parser';
import type { WikiContentTree, WikiDocParagraph, WikiDocPrerenderedParagraph, WikiPrerenderedContentTree } from './types/wikidoc.types'
import { page } from '$app/state';
import markdownEscape from 'markdown-escape';

const marked = new Marked({
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

export const sharpConverter = {
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
}

/**
 * contentTree를 하나의 string으로 변환
 * @param contentTree 
 * @returns 
 */
export function normalizeContentTree(contentTree: WikiContentTree) {
    let normalized = '';

    normalized += sharpConverter.escapeSharp(contentTree.content);
    contentTree.subParagraphs.forEach((subParagraph) => {
        normalized += '\n';
        normalized += normalizeParagraph(subParagraph, 1);
    })
    return normalized;

    function normalizeParagraph(paragraph: WikiDocParagraph, depth: number) {
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
}

/**
 * `[* 주석]` 또는 `[*key 주석]`을 HTML로 변환합니다.
 * `key`에 수를 사용하면 삭제됩니다.
 * @param src 
 * @returns 
 */
function convertAnnotation(src: string) {
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
}

/**
 * 미리보기에서 `key` 속성이 없는 `wiki-annot`에 `key` 속성을 추가합니다. 
 */
function fillPreviewAnnotationKeys(dom: HTMLElement) {
    let key = 1;
    dom.querySelectorAll('wiki-annot').forEach((e) => {
        if (typeof (e.getAttribute('key')) !== "undefined") return;

        e.setAttribute('key', key.toString());
        key++;
    })
}
/**
 * `key` 속성이 없는 `wiki-annot`에 `key` 속성을 추가합니다. 
 */
function fillAnnotationKeys(dom: HTMLElement, scope: Record<string, any>) {
    if (!("annotKey" in scope)) {
        scope.annotKey = 1;
    }
    dom.querySelectorAll('wiki-annot').forEach((e) => {
        if (typeof (e.getAttribute('key')) !== "undefined") return;

        e.setAttribute('key', scope.annotKey.toString());
        scope.annotKey++;
    })
}

/**
 * 불필요한 HTML 태그, 속성 등을 삭제하거나 변경합니다.
 */
function purifyHTML(dom: HTMLElement): void {
    //허용되지 않은 태그 제거
    const allowedTags: string[] = ['p', 'a', 'img', 'wiki-annot', 'strong', 'em', 'del', 'wiki-link'];
    dom.querySelectorAll(`:not(${allowedTags.join(', ')})`).forEach(e => e.remove());

    //허용되지 않은 속성 제거
    const allowedAttributes = {
        'a': ['href'],
        'img': ['src', 'alt'],
        'wiki-annot': ['key'],
        'wiki-link': ['doctitle']
    };
    (Object.keys(allowedAttributes) as (keyof typeof allowedAttributes)[]).forEach((tag) => {
        dom.querySelectorAll(tag).forEach((e) => {
            const attributeKeys = Object.keys(e.attributes);
            attributeKeys.forEach((key) => {
                if (!allowedAttributes[tag].includes(key)) {
                    e.removeAttribute(key);
                }
            })
        })
    })

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
}

/**
 * 미리보기 모드에서 `wiki-link` 태그에 `available` 속성을 부여함
 * @context client
 * @param dom 
 */
function makePreviewLinkAvailable(dom: HTMLElement) {
    dom.querySelectorAll('wiki-link').forEach((element) => {
        element.setAttribute('available', 'true');
        element.setAttribute('test', 'true');
    })
}

export const renderer = {
    /**
     * 미리보기 모드에서 HTML을 렌더링
     * @context client
     */
    async renderPreviewHTML(src: string, finishCallback?: (dom: HTMLElement) => Promise<any> | any) {
        src = convertAnnotation(src);
        src = marked.parse(src, { async: false });
        const dom = parseHTML(src);
        purifyHTML(dom);
        fillPreviewAnnotationKeys(dom);
        makePreviewLinkAvailable(dom);

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
    async prerenderContentTree(contentTree: WikiContentTree) {
        const scope: Record<string, any> = {};

        async function prerenderContent(src: string) {
            src = convertAnnotation(src);
            src = marked.parse(src, { async: false });
            const dom = parseHTML(src);
            purifyHTML(dom);
            fillAnnotationKeys(dom, scope);

            return dom.innerHTML;
        }

        async function prerenderParagraph(paragraph: WikiDocParagraph): Promise<WikiDocPrerenderedParagraph> {
            const subParagraphs: WikiDocPrerenderedParagraph['subParagraphs'] = [];
            for (const subParagraph of paragraph.subParagraphs) {
                subParagraphs.push(await prerenderParagraph(subParagraph));
            }

            const rendered: WikiDocPrerenderedParagraph = {
                title: paragraph.title,
                content: await prerenderContent(paragraph.content),
                subParagraphs
            };

            return rendered;
        }

        const subParagraphs: WikiDocPrerenderedParagraph['subParagraphs'] = [];
        for (const subParagraph of contentTree.subParagraphs) {
            subParagraphs.push(await prerenderParagraph(subParagraph));
        };
        const rendered: WikiPrerenderedContentTree = {
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
    }
} as const;