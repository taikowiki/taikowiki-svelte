<script lang="ts">
    import { onMount } from "svelte";
    import annotationIcon from '$lib/module/common/wikidoc/assets/icon/annotation.svg';
    import docLinkIcon from "$lib/module/common/wikidoc/assets/icon/doclink.svg"

    let editorContainer: HTMLDivElement;
    export let mdContent: string = "";
    export let editorOption: Record<string, any>;

    onMount(async () => {
        //@ts-expect-error
        const Editor = (await import("@toast-ui/editor")).default;

        let editor = new Editor({
            initialValue: mdContent,
            el: editorContainer,
            theme: "light",
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
    .doc-editor-annot{
        background-image: url("${annotationIcon}");
        background-size: 60%;
        background-position: calc(50% + 1px) calc(50% - 1px);
        background-repeat: no-repeat;
    }
    .doc-editor-wiki-link{
        background-image: url("${docLinkIcon}");
        background-size: 60%;
        background-position: calc(50% + 1px) calc(50% - 1px);
        background-repeat: no-repeat;
    }
    .doc-editor-wiki-yt{
        background-image: url("/assets/icon/youtube.svg");
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
</style>
