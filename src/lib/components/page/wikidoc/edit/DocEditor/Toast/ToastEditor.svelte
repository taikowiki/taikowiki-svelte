<script lang="ts">
    import "@toast-ui/editor/toastui-editor.css";
    import "@toast-ui/editor/toastui-editor-dark.css";
    import ToastEditorLight from "./ToastEditorLight.svelte";
    import ToastEditorDark from "./ToastEditorDark.svelte";
    import ImagePopup from "./popup/ImagePopup.svelte";
    import { mount, setContext } from "svelte";
    import AnnotationPopup from "./popup/AnnotationPopup.svelte";
    import WikiLinkPopup from "./popup/WikiLinkPopup.svelte";
    import { getTheme } from "$lib/module/layout/theme";
    import WikiYoutubePopup from "./popup/WikiYoutubePopup.svelte";
    import { writable } from "svelte/store";
    import ColorTextPopup from "./popup/ColorTextPopup.svelte";
    import BgColorTextPopup from "./popup/BgColorTextPopup.svelte";
    import { Doc } from "$lib/module/doc/doc.client";

    const {
        insertAnnotation,
        insertBgColoredText,
        insertColoredText,
        insertImage,
        insertWikiLink,
        insertYoutube,
    } = Doc.Client.markdownCommands;

    interface Props {
        mdContent: string;
        show: boolean;
        undoStack?: Doc.UndoStack;
    }

    let { mdContent = $bindable(""), show, undoStack }: Props = $props();

    const [theme] = getTheme();

    const context = new Map();
    context.set("theme", theme);

    let eventEmitter: any = $state();

    //image popup
    const imagePopupContainer = document.createElement("div");
    let imagePopupProps = $state({
        eventEmitter: null,
    });
    mount(ImagePopup, {
        target: imagePopupContainer,
        props: imagePopupProps,
        context,
    });
    const imageToolbarItem = {
        name: "Image",
        tooltip: "Insert image",
        className: "image toastui-editor-toolbar-icons",
        popup: {
            body: imagePopupContainer,
        },
    };

    // annotation popup
    const annotationPopupContainer = document.createElement("div");
    let annotationPopupProps = $state({
        eventEmitter: null,
    });
    mount(AnnotationPopup, {
        target: annotationPopupContainer,
        props: annotationPopupProps,
        context,
    });
    const annotationToolbarItem = $state({
        name: "Annotation",
        tooltip: "Insert annotation",
        className: `toastui-editor-toolbar-icons doc-editor-annot`,
        popup: {
            body: annotationPopupContainer,
        },
    });

    // wiki-link popup
    const wikiLinkPopupContainer = document.createElement("div");
    let wikiLinkPopupProps = $state({
        eventEmitter: null,
    });
    mount(WikiLinkPopup, {
        target: wikiLinkPopupContainer,
        props: wikiLinkPopupProps,
        context,
    });
    const wikiLinkToolbarItem = $state({
        name: "Wiki Link",
        tooltip: "Insert Wiki Link",
        className: `toastui-editor-toolbar-icons doc-editor-wiki-link`,
        popup: {
            body: wikiLinkPopupContainer,
        },
    });

    // wiki-yt popup
    const wikiYoutubePopupContainer = document.createElement("div");
    let wikiYoutubePopupProps = $state({
        eventEmitter: null,
    });
    mount(WikiYoutubePopup, {
        target: wikiYoutubePopupContainer,
        props: wikiYoutubePopupProps,
        context,
    });
    const wikiYoutubeToolbarItem = $state({
        name: "Youtube",
        tooltip: "Insert Youtube",
        className: `toastui-editor-toolbar-icons doc-editor-wiki-yt`,
        popup: {
            body: wikiYoutubePopupContainer,
        },
    });

    // colored text popup
    const wikiColoredTextPopupContainer = document.createElement("div");
    let wikiColoredTextProps = $state({
        eventEmitter: null,
    });
    mount(ColorTextPopup, {
        target: wikiColoredTextPopupContainer,
        props: wikiColoredTextProps,
        context,
    });
    const wikiColoredTextToolbarItem = $state({
        name: "Colored-Text",
        toolbar: "Insert Colored Text",
        className: `toastui-editor-toolbar-icons doc-editor-text-color`,
        popup: {
            body: wikiColoredTextPopupContainer,
        },
    });

    // bg colored text popup
    const wikiBgColoredTextPopupContainer = document.createElement("div");
    let wikiBgColoredTextProps = $state({
        eventEmitter: null,
    });
    mount(BgColorTextPopup, {
        target: wikiBgColoredTextPopupContainer,
        props: wikiBgColoredTextProps,
        context,
    });
    const wikiBgColoredTextToolbarItem = $state({
        name: "Background-Colored-Text",
        toolbar: "Insert Background Colored Text",
        className: `toastui-editor-toolbar-icons doc-editor-bg-color`,
        popup: {
            body: wikiBgColoredTextPopupContainer,
        },
    });

    // 동기화용
    const setEditorMarkdowns = writable<((value: string) => any)[]>([]);
    setContext("setEditorMarkdowns", setEditorMarkdowns);
    $effect(() => {
        if (!show) {
            $setEditorMarkdowns.forEach((fn) => {
                fn(mdContent);
            });
        }
    });
    function setMdContent(value: string) {
        mdContent = value;
    }

    // 에디터 옵션
    const editorOption = {
        height: "500px",
        hideModeSwitch: true,
        language: "ko-KR",
        initialEditType: "markdown",
        initialValue: mdContent,
        toolbarItems: [
            [
                "bold",
                "italic",
                "strike",
                wikiColoredTextToolbarItem,
                wikiBgColoredTextToolbarItem,
            ],
            ["hr", "quote"],
            ["ul", "ol"],
            ["table", imageToolbarItem, "link"],
            ["code", "codeblock"],
            [
                annotationToolbarItem,
                wikiLinkToolbarItem,
                wikiYoutubeToolbarItem,
            ],
        ],
        plugins: [
            (context: any) => {
                eventEmitter = context.eventEmitter;
                imagePopupProps.eventEmitter = eventEmitter;
                annotationPopupProps.eventEmitter = eventEmitter;
                wikiLinkPopupProps.eventEmitter = eventEmitter;
                wikiYoutubePopupProps.eventEmitter = eventEmitter;
                wikiColoredTextProps.eventEmitter = eventEmitter;
                wikiBgColoredTextProps.eventEmitter = eventEmitter;
                function syncronize(v: Record<string, any>) {
                    const p: Record<string, any> = {};
                    Object.entries(v).forEach(([key, value]) => {
                        p[key] = function (...args: any[]) {
                            value(...args);
                            $setEditorMarkdowns.forEach((fn) => {
                                fn(mdContent);
                            });
                        };
                    });
                    return p;
                }
                return {
                    markdownCommands: syncronize({
                        insertImage,
                        insertAnnotation,
                        insertWikiLink,
                        insertYoutube,
                        insertColoredText,
                        insertBgColoredText,
                    }),
                };
            },
        ],
        events: {
            keydown(_: any, event: KeyboardEvent) {
                if (
                    (event.code === "KeyZ" &&
                        event.shiftKey &&
                        event.ctrlKey) ||
                    (event.code === "KeyY" && event.ctrlKey)
                ) {
                    event.preventDefault();
                    if (undoStack) {
                        undoStack?.redo();
                        $setEditorMarkdowns.forEach((fn) => {
                            fn(mdContent);
                        });
                    }
                } else if (event.code === "KeyZ" && event.ctrlKey) {
                    event.preventDefault();
                    if (undoStack) {
                        undoStack?.undo();
                        $setEditorMarkdowns.forEach((fn) => {
                            fn(mdContent);
                        });
                    }
                }
            },
        },
    };

    $effect(() => {
        $theme;
        editorOption.initialValue = mdContent;
    });
</script>

{@html `<style>
    .doc-editor-text-color{
        background-image: url("${textColorIcon}");
        background-size: 50%;
        background-position: 50% 50%;
        background-repeat: no-repeat;
        background-position-y: 50% !important;
    }
    .doc-editor-bg-color{
        background-image: url("${bgColorIcon}");
        background-size: 65%;
        background-position: 50% 50%;
        background-repeat: no-repeat;
        background-position-y: 50% !important;
    }</style>`}

{#if show}
    {#if $theme === "light"}
        <ToastEditorLight {editorOption} {setMdContent} />
    {:else}
        <ToastEditorDark {editorOption} {setMdContent} />
    {/if}
{/if}

<!--
<div class="container" class:show={show && $theme === "light"}>
    <ToastEditorLight {editorOption} {setMdContent} />
</div>
<div class="container" class:show={show && $theme === "dark"}>
    <ToastEditorDark {editorOption} {setMdContent} />
</div>
-->

<style>
    :global(.toastui-editor-md-heading) {
        font-size: inherit;
        color: inherit;
        font-weight: inherit;
    }

    /*
    .container {
        display: none;
        &.show {
            display: block;
        }
    }
    */
</style>
