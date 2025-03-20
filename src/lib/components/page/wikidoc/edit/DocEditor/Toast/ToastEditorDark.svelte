<script lang="ts">
    import { onMount } from "svelte";
    import annotationIcon from '$lib/module/common/wikidoc/assets/icon/annotation-invert.svg';
    import docLinkIcon from "$lib/module/common/wikidoc/assets/icon/doclink-invert.png"

    let editorContainer: HTMLDivElement;
    export let mdContent: string = "";
    export let editorOption: Record<string, any>;

    onMount(async () => {
        //@ts-expect-error
        const Editor = (await import("@toast-ui/editor")).default;

        let editor = new Editor({
            initialValue: mdContent,
            el: editorContainer,
            theme: "dark",
            ...editorOption,
        });
        editorContainer.querySelector(".toastui-editor-tabs")?.remove();
        editor.addHook("change", () => {
            mdContent = editor.getMarkdown();
        });
    });
</script>

<div class="editor-container" bind:this={editorContainer}></div>

<svelte:element this={"style"}>
    {`
    .toastui-editor-dark .doc-editor-annot{
        background-image: url("${annotationIcon}");
        background-size: 60%;
        background-position: calc(50% + 1px) calc(50% - 1px);
        background-repeat: no-repeat;
    }
    .toastui-editor-dark .doc-editor-wiki-link{
        background-image: url("${docLinkIcon}");
        background-size: 60%;
        background-position: calc(50% + 1px) calc(50% - 1px);
        background-repeat: no-repeat;
    }
    `}
</svelte:element>

<style>
    .editor-container {
        border: 1px solid black;
    }

    :global(.toastui-editor-dark .doc-editor-annot){
        background: url('/assets/icon/pinned-invert.webp');
        background-size: 60%;
        background-position: calc(50% + 0.5px) calc(50% - 1px);
        background-repeat: no-repeat;
    }
</style>
