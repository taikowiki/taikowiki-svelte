import { css, html, LitElement } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { property } from 'lit/decorators.js';
import { Task } from '@lit/task';
import { get, type Unsubscriber, type Writable } from 'svelte/store';
import { docContext } from '../util.js';
import { defineRequestHandler } from '@yowza/rrequestor';
import type { Doc } from '$lib/module/doc';
import { CSSStyleDeclaration } from 'cssom';

// custom elements
function defineElement(litElement: any, tagName: string, option?: ElementDefinitionOptions) {
    if (typeof (customElements) === 'undefined') return;

    const _constructor = customElements.get(tagName);
    if (_constructor === undefined) {
        customElements.define(tagName, litElement, option);
    }
}

export function defineWikiElements() {
    defineElement(WikiFrameViewElement, 'wiki-frame-view');
    defineElement(WikiAnnotationElement, 'wiki-annot');
    defineElement(WikiRoot, 'wiki-root', { extends: 'div' });
    defineElement(WikiLink, 'wiki-link');
    defineElement(WikiFloat, 'wiki-float', { extends: 'div' });
    defineElement(WikiYoutube, 'wiki-yt');
}

export function isDefined() {
    return customElements.get('wiki-link') ? true : false;
}

/**
 * `<wiki-frame-view>`
 * 
 * 틀을 문서에 보여주는 Element.
 */
export class WikiFrameViewElement extends LitElement {
    @property({ attribute: 'title' }) frameTitle: string = '';

    private load = new Task(this, {
        task: async ([frameTitle]) => {
            if (!frameTitle) return null;

            const frameFromWindowContext = docContext.getContext().get('wikiDocFrames')?.get(frameTitle);
            if (frameFromWindowContext) {
                return frameFromWindowContext;
            }

            const response = await wikiDocRequestor.getFrame(frameTitle);
            if (response.status === "success") {
                if (!response.data) return null;
                return response.data;
            }
            else {
                console.error(response.reason);
                return null;
            }
        },
        args: () => [this.frameTitle]
    })

    render() {
        return this.load.render({
            pending: () => html``,
            complete: (frame: string | Doc.Rest.FrameResponse | null) => {
                if (frame === null) return html``;
                return html`
                <div class="wiki-frame-view-container">
                    ${unsafeHTML(typeof (frame) === "string" ? frame : frame.renderedContentTree.content)}
                </div>`;
            },
            error: () => {
                console.error(this.title);
                return html``;
            }
        })
    }
}

/**
 * `<wiki-annot>`
 * 
 * 주석을 보여주는 Element.
 */
export class WikiAnnotationElement extends LitElement {
    // property
    @property({ attribute: 'key' })
    key?: string;
    @property({ attribute: false })
    display: boolean = false;
    @property({ attribute: false })
    innerWidth: number = 0;
    @property({ attribute: false })
    theme: 'light' | 'dark' = 'light';

    invalidator?: Unsubscriber;

    /**
     * css
     */
    static get styles() {
        return css`
            .container{
                position: relative;
                display: inline-flex;
                text-align: center;
            }
            .flag{
                cursor: pointer;
                transform: translateY(-30%);
                font-size: 13px;
            }
            .flag[data-theme="light"]{
                color: #cf4844;
            }
            .flag[data-theme="dark"]{
                color: #e1a743;
            }
            .content-container{
                display:none;
                flex-direction: row;
                align-items: center;
                position: absolute;
                left: 50%;
                top: 0;
                transform: translateX(-50%) translateY(calc(-100% - 5px));
                box-sizing: border-box;
                padding-inline: 5px;
                padding-block: 2px;
                border: 1px solid black;
                background-color: white;
                word-break: keep-all;
                word-wrap: break-word;
                width: max-content;
                column-gap: 3px;
                z-index: 1;
            }
            /*
            .content[data-display="true"]{
                display:block;
            }
            */
            .content-container[data-theme="dark"]{
                border: 1px solid gray;
                background-color: black;
            }
            .content-flag{
                cursor: pointer;
                font-size: 13px;
            }
            .content-flag[data-theme="light"]{
                color: #cf4844;
            }
            .content-flag[data-theme="dark"]{
                color: #e1a743;
            }
            p{
                margin: 0;
            }

            /*dialog*/
            dialog{
                border: 0;
                padding: 0;
                outline: 0;
            }
            .dialog-container{
                display:flex;
                flex-direction: row;
                align-items: center;
                box-sizing: border-box;
                padding-inline: 5px;
                padding-block: 2px;
                background-color: white;
                word-break: keep-all;
                word-wrap: break-word;
                width: max-content;
                max-width: 100%;
                column-gap: 3px;
            }
            .dialog-container[data-theme="dark"]{
                background-color: black;
                color:white;
            }
            dialog::backdrop {
                background-color: rgba(0, 0, 0, 0.2);
                backdrop-filter: blur(1px);
            }

            /* code */
            code{
                font-family: 'NanumGothicCoding';
            }
            :not(pre) > code{
                background-color: rgb(226, 226, 226);
                border-radius: 5px;
                padding-inline: 2px;
                font-size: 15px;
        
                display:inline-block;
                padding-block: 0px !important;
            }
            pre > code{
                display:block;
                background-color: rgb(226, 226, 226);
                padding: 10px;
                font-size: 14px;
            }
            *[data-theme="dark"] :not(pre) > code{
                background-color: rgb(62, 62, 62);
                border-radius: 5px;
                padding: 2px;
                font-size: 15px;
            }
            *[data-theme="dark"] pre > code{
                display:block;
                background-color: rgb(62, 62, 62);
                padding: 10px;
                font-size: 14px;
            }


            /*link*/
            a{
                color: rgb(207, 72, 68);
                text-decoration: none;
            }
            *[data-theme="dark"] > .content a{
                color: rgb(225, 167, 67);
            }
            a[href]::before{
                content: '';
                width: 15px;
                height: 15px;
                display:inline-block;
                background-image: url('/assets/icon/link.svg');
                background-size: 15px 15px;
                background-position: center;
                transform: translateY(1.5px);
                filter: brightness(0) saturate(100%) invert(41%) sepia(11%) saturate(6392%) hue-rotate(329deg) brightness(87%) contrast(85%);
            }
            a[href]:hover{
                text-decoration: underline;
            }
            *[data-theme="dark"] > .content a[href]::before{
                filter: brightness(0) saturate(100%) invert(81%) sepia(5%) saturate(7020%) hue-rotate(340deg) brightness(100%) contrast(77%);
            }
        `
    }

    /**
     * `__window__context__.wikiDocAnnotations`에 해당 주석의 내용을 저장하는 함수.
     */
    assignAnnotationContent() {
        const windowContext = docContext.getContext();
        if (!windowContext) return;
        if (typeof (this.key) === "undefined") return;

        let annotationsMap = windowContext.get('wikiDocAnnotations');
        if (!annotationsMap) {
            annotationsMap = new Map<string, string>();
            windowContext.set('wikiDocAnnotations', annotationsMap);
        }

        const annotationContent = annotationsMap.get(this.key);
        if (!annotationContent?.trim()) {
            annotationsMap.set(this.key, this.innerHTML);
        }
    }
    /**
     * 생성시 실행되는 함수.
     */
    connectedCallback(): void {
        super.connectedCallback();

        const windowContext = docContext.getContext();
        if (!windowContext) return;

        //`theme` property를 theme 스토어와 동기화.
        const themeStore = windowContext.get('theme') as Writable<'light' | 'dark'> | undefined;
        if (themeStore) {
            this.invalidator = themeStore.subscribe((v) => {
                this.theme = v;
            })
        }

        this.assignAnnotationContent();
    }
    disconnectedCallback(): void {
        this.invalidator?.();
    }

    /**
     * 마우스를 올릴 때 실행되는 함수.
     * 위치와 크기를 고려하여 주석 내용을 띄워 줌.
     */
    show() {
        this.display = true;

        //위치 조정
        const contentDiv = this.renderRoot.querySelector('#contentContainer') as HTMLDivElement | null;
        if (contentDiv) {
            //init
            contentDiv.style.width = 'max-content';
            contentDiv.style.top = '0';
            contentDiv.style.transform = 'translateX(-50%) translateY(calc(-100% - 5px))';
            contentDiv.style.display = 'flex';
            contentDiv.style.maxWidth = `${window.innerWidth - 30}px`;
            const transformArr = ['translateX(-50%)', 'translateY(calc(-100% - 5px))']

            const offset = contentDiv.getBoundingClientRect();
            //위쪽
            const mainTop = document.querySelector('main')?.offsetTop ?? 0
            if ((offset.top - (Math.min(mainTop, 0))) < offset.height) {
                contentDiv.style.top = '100%';
                transformArr[1] = 'translateY(0%)';
            }
            //왼쪽
            //offset.left < (offset.width / 2) && (offset.left + offset.width / 2) <= (window.innerWidth / 2)
            if (offset.left < 0 && (offset.left + offset.width / 2) <= (window.innerWidth / 2)) {
                transformArr[0] = 'translateX(0%)';
                const newOffset = contentDiv.getBoundingClientRect();
                if (newOffset.right + newOffset.width / 2 > (window.innerWidth) - 30) {
                    contentDiv.style.width = `${(offset.width / 2) - offset.left}px`;
                }
            }
            //오른쪽
            //(window.innerWidth - offset.right) < (offset.width / 2) && (offset.left + offset.width / 2) > (window.innerWidth / 2)
            if (offset.right > (window.innerWidth - 30) && (offset.left + offset.width / 2) > (window.innerWidth / 2)) {
                transformArr[0] = 'translateX(-100%)';
                const newOffset = contentDiv.getBoundingClientRect();
                if (newOffset.left - newOffset.width / 2 < 0) {
                    contentDiv.style.width = `${(offset.width / 2) + offset.left - 10}px`;
                }
            }
            contentDiv.style.transform = transformArr.join(' ');
        }
    }
    /**
     * 마우스를 내릴 때 실행되는 함수.
     * 주석 내용을 가림.
     */
    hide() {
        this.display = false;

        const contentDiv = this.renderRoot.querySelector('#contentContainer') as HTMLDivElement | null;
        if (contentDiv) {
            contentDiv.style.display = 'none';
        }
    }
    /**
     * 클릭 시 실행되는 함수.
     * 하단 주석으로 이동.
     * `data-annot-key` 속성이 `key` 프로퍼티와 같은 요소로 스크롤을 이동함.
     */
    gotoAnnot() {
        if (this.key === undefined) return;
        const annot = document.querySelector(`[data\\-annot\\-key="${this.key}"]`) as HTMLElement | null;
        if (!annot) return;

        window.scrollTo({
            top: annot.offsetTop
        })
    }
    /**
     * 모바일용 모달을 띄우는 함수.
     */
    showModal() {
        const dialog = this.renderRoot.querySelector('dialog');
        if (dialog) {
            dialog.showModal();
        }
    }
    /**
     * 클릭시 모바일 여부에 따라 알맞은 함수를 실행함.
     * - 모바일 -> 모달을 보여 줌.
     * - 모바일 아님 -> 하단 주석으로 이동.
     */
    clickHandler() {
        const isMobile = docContext.getContext().get('isMobile');
        if (!isMobile) return;
        const isMobileValue = get(isMobile);
        if (isMobileValue) {
            this.hide();
            this.showModal();
        }
        else {
            this.gotoAnnot();
        }
    }
    /**
     * 모달 외부를 클릭 시 모달을 닫는 함수.
     */
    dialogClickHandler(event: MouseEvent) {
        const target = event.target as HTMLDialogElement;
        if (!target) return;
        const rect = target.getBoundingClientRect();
        if (
            rect.left > event.clientX ||
            rect.right < event.clientX ||
            rect.top > event.clientY ||
            rect.bottom < event.clientY
        ) {
            target.close();
        }
    }
    /**
     * 플래그(문서에 `[1]`과 같이 쓰여있는 것)을 클릭할 시 실행할 함수.
     */
    flagClickHandler() {
        const dialog = this.renderRoot.querySelector('dialog');
        if (dialog) {
            dialog.close();
        }
        this.gotoAnnot();
    }

    render() {
        if (typeof (this.key) === "undefined") {
            return html``;
        }
        if (typeof (window) === "undefined") {
            return html``;
        }

        const annotationContent: string | undefined = docContext.getContext().get('wikiDocAnnotations')?.get(this.key);
        if (!annotationContent) {
            return html``;
        }

        return html`
            <div class="container" id="container" @mouseover="${this.show}" @mouseout="${this.hide}" @click="${this.clickHandler}">
                <div class="flag" data-theme="${this.theme}">
                    [${this.key}]
                </div>
                <div class="content-container" id="contentContainer" data-display="${this.display}" data-theme="${this.theme}">
                    <div class="content-flag" data-theme="${this.theme}" @click="${this.flagClickHandler}">
                        [${this.key}]
                    </div>
                    <div class="content">
                        ${unsafeHTML(annotationContent)}
                    </div>
                </div>
            </div>
            <dialog @click="${this.dialogClickHandler}">
                <div class="dialog-container" data-theme="${this.theme}">
                    <div class="content-flag" data-theme="${this.theme}" @click="${this.flagClickHandler}">
                        [${this.key}]
                    </div>
                    <div class="content">
                        ${unsafeHTML(annotationContent)}
                    </div>
                </div>
            </dialog>
        `
    }
}

export class WikiLink extends LitElement {
    @property({ attribute: 'doctitle', type: String })
    docTitle?: string;

    // 사용 가능/불가능 여부는 미리보기 렌더링과 문서 열람 전처리 때 결정합니다.
    // 문서를 작성/수정할 때는 available을 사용하지 않습니다.
    @property({ attribute: 'available', type: String })
    available: string = "false";

    @property({ attribute: 'test', type: String })
    forTest: string = "false";

    unsubscriber?: Unsubscriber;

    @property({ attribute: false })
    theme?: "light" | "dark";

    static get styles() {
        return css`
            .not-available{
                text-decoration: none !important;
            }
            .not-available[data-theme="light"]{
                color: purple;
            }
            .not-available[data-theme="dark"]{
                color: red;
            }
            .available[data-theme="light"]{
                color: #cf4844;
            }
            .available[data-theme="dark"]{
                color: #e1a743;
            }
            a{
                text-decoration: none;
            }
            a:hover{
                text-decoration: underline;
            }
        `
    }

    connectedCallback(): void {
        super.connectedCallback();

        const windowContext = docContext.getContext();
        if (!windowContext) return;

        //`theme` property를 theme 스토어와 동기화.
        const themeStore = windowContext.get('theme') as Writable<'light' | 'dark'> | undefined;
        if (themeStore) {
            this.theme = get(themeStore);
            this.unsubscriber = themeStore.subscribe((v) => {
                this.theme = v;
            });
        }
    }
    disconnectedCallback(): void {
        this.unsubscriber?.();
    }

    /**
     * 문서 제목에 해당하는 문서의 주소를 반환합니다.
     */
    getDocUrl() {
        if (typeof (this.docTitle) === "undefined") {
            return '';
        }

        // window context의 `urlBase`
        const urlBaseString = docContext.getContext().get('wikiDocURLBase');
        if (!urlBaseString) {
            return `/${encodeURIComponent(this.docTitle)}`;
        }

        const urlBase = new URL(urlBaseString);
        const path = urlBase.pathname + `/${encodeURIComponent(this.docTitle)}`;
        return path;
    }

    render() {
        if (this.available === "true") {
            return html`
                <a href="${this.getDocUrl()}" class="available" data-theme="${this.theme}" target="${this.forTest === "true" ? "_blank" : ""}">
                    ${this.innerHTML?.trim() || this.docTitle}
                </a>
            `
        }
        else {
            return html`
                <a href="${this.getDocUrl()}" class="not-available" data-theme="${this.theme}" target="${this.forTest === "true" ? "_blank" : ""}">
                    ${this.innerHTML?.trim() || this.docTitle}
                </a>
            `
        }
    }
}

export class WikiYoutube extends LitElement {
    @property()
    v?: string;
    @property()
    width?: string;
    @property()
    height?: string;

    static get styles() {
        return css`
        .doc-yt-container{
            display:flex;
            justify-content: center;
            align-items: center;
            width: 560px;
            height: 315px;
            max-width: 100%;
        }
        iframe{
            object-fit: cover;
            width: 100%;
            height: 100%;
        }
        `
    }

    render() {
        const style = new CSSStyleDeclaration();
        this.width && style.setProperty('width', this.width);
        this.height && style.setProperty('height', this.height);

        if (this.v) {
            const src = new URL("https://www.youtube.com");
            src.pathname = `/embed/${encodeURIComponent(this.v)}`;
            return html`
            <div class="doc-yt-container" style=${style.cssText}>
                <iframe 
                    src=${src.href} 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerpolicy="strict-origin-when-cross-origin" 
                    allowfullscreen>
                </iframe>
            </div>
            `
        }
        else {
            return html``;
        }
    }
}

export class WikiRoot extends HTMLDivElement { };
export class WikiFloat extends HTMLDivElement { };

// requestor
const wikiDocRequestor = {
    getFrame,
    upload: defineRequestHandler<Doc.Data.DocData, void>({
        url: '/api/doc/upload',
        method: 'post'
    }),
    uploadFrame: defineRequestHandler<Doc.Data.FrameData, void>({
        url: '/api/doc/frame',
        method: 'post'
    }),
    update: defineRequestHandler<Doc.Data.DocData & { id: number }, void>({
        url: '/api/doc/update',
        method: 'post'
    })
}

async function getFrame(title: string) {
    const searchParams = new URLSearchParams();
    searchParams.set('title', title);

    const handler = defineRequestHandler<null, Doc.Rest.FrameResponse>({
        url: `/api/doc/frame?${searchParams.toString()}`,
        method: 'get'
    })

    return await handler(null);
}