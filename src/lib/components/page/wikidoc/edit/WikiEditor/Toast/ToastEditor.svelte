<script lang="ts">
    import "@toast-ui/editor/toastui-editor.css";
    import "@toast-ui/editor/toastui-editor-dark.css";
    import ToastEditorLight from "./ToastEditorLight.svelte";
    import ToastEditorDark from "./ToastEditorDark.svelte";
    import ImagePopup from "./popup/ImagePopup.svelte";
    import { mount } from "svelte";
    import {
        insertAnnotation,
        insertImage,
        insertWikiLink,
    } from "$lib/module/common/wikidoc/toast/markdownCommands";
    import AnnotationPopup from "./popup/AnnotationPopup.svelte";
    import WikiLinkPopup from "./popup/WikiLinkPopup.svelte";
    import { getTheme } from "$lib/module/layout/theme";

    interface Props {
        mdContent: string;
    }

    let { mdContent = $bindable("") }: Props = $props();

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
        eventEmitter: null
    });
    mount(WikiLinkPopup, {
        target: wikiLinkPopupContainer,
        props: wikiLinkPopupProps,
        context
    });
    const wikiLinkToolbarItem = $state({
        name: "Wiki Link",
        tooltip: "Insert Wiki Link",
        className: `toastui-editor-toolbar-icons doc-editor-wiki-link`,
        popup: {
            body: wikiLinkPopupContainer,
        },
    });

    const editorOption = {
        height: "500px",
        hideModeSwitch: true,
        language: "ko-KR",
        initialEditType: "markdown",
        toolbarItems: [
            ["bold", "italic", "strike"],
            ["hr", "quote"],
            ["ul", "ol"],
            ["table", imageToolbarItem, "link"],
            ["code", "codeblock"],
            [annotationToolbarItem, wikiLinkToolbarItem],
        ],
        plugins: [
            (context: any) => {
                eventEmitter = context.eventEmitter;
                imagePopupProps.eventEmitter = eventEmitter;
                annotationPopupProps.eventEmitter = eventEmitter;
                wikiLinkPopupProps.eventEmitter = eventEmitter;
                return {
                    markdownCommands: {
                        insertImage,
                        insertAnnotation,
                        insertWikiLink
                    },
                };
            },
        ],
    };
</script>

{#if $theme === "light"}
    <ToastEditorLight bind:mdContent {editorOption} />
{:else}
    <ToastEditorDark bind:mdContent {editorOption} />
{/if}

<style>
    :global(.toastui-editor-md-heading) {
        font-size: inherit;
        color: inherit;
        font-weight: inherit;
    }
</style>
