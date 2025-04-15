<script lang="ts">
    import "@toast-ui/editor/toastui-editor.css";
    import "@toast-ui/editor/toastui-editor-dark.css";
    import ToastEditorLight from "./ToastEditorLight.svelte";
    import ToastEditorDark from "./ToastEditorDark.svelte";
    import ImagePopup from "./popup/ImagePopup.svelte";
    import { mount, setContext } from "svelte";
    import {
        insertAnnotation,
        insertImage,
        insertWikiLink,
        insertYoutube,
    } from "$lib/module/common/wikidoc/client/markdownCommands.client";
    import AnnotationPopup from "./popup/AnnotationPopup.svelte";
    import WikiLinkPopup from "./popup/WikiLinkPopup.svelte";
    import { getTheme } from "$lib/module/layout/theme";
    import WikiYoutubePopup from "./popup/WikiYoutubePopup.svelte";
    import { writable } from "svelte/store";
    import { UndoStack } from "$lib/module/common/wikidoc/util";

    interface Props {
        mdContent: string;
        show: boolean;
        undoStack?: UndoStack;
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
            ["bold", "italic", "strike"],
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
                return {
                    markdownCommands: {
                        insertImage,
                        insertAnnotation,
                        insertWikiLink,
                        insertYoutube,
                    },
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
</script>

<div class="container" class:show={show && $theme === "light"}>
    <ToastEditorLight {editorOption} {setMdContent} />
</div>
<div class="container" class:show={show && $theme === "dark"}>
    <ToastEditorDark {editorOption} {setMdContent} />
</div>

<style>
    :global(.toastui-editor-md-heading) {
        font-size: inherit;
        color: inherit;
        font-weight: inherit;
    }

    .container {
        display: none;
        &.show {
            display: block;
        }
    }
</style>
