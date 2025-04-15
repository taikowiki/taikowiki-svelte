<script lang="ts">
    import { getContext, onMount } from "svelte";
    import annotationIcon from "$lib/module/common/wikidoc/assets/icon/annotation-invert.svg";
    import docLinkIcon from "$lib/module/common/wikidoc/assets/icon/doclink-invert.png";
    import { keymap } from "prosemirror-keymap";
    import type { Writable } from "svelte/store";

    interface Props {
        editorOption: Record<string, any>;
        setMdContent: (value: string) => any;
    }

    let { editorOption, setMdContent }: Props = $props();

    let editorContainer = $state<HTMLDivElement>();
    let editor = $state<any>();
    const setEditorMarkdowns = getContext("setEditorMarkdowns") as Writable<
        ((value: string) => any)[]
    >;
    setEditorMarkdowns.update((v) => [
        ...v,
        (value: string) => {
            editor?.setMarkdown?.(value);
        },
    ]);

    onMount(async () => {
        //@ts-expect-error
        const Editor = (await import("@toast-ui/editor")).default;

        editor = new Editor({
            el: editorContainer,
            theme: "dark",
            ...editorOption,
        });

        if (editorContainer) {
            editorContainer.querySelector(".toastui-editor-tabs")?.remove();
        }
        editor.addHook("change", () => {
            setMdContent(editor.getMarkdown());
        });

        // history 제거
        editor.mdEditor.view.state.plugins.unshift(
            keymap({
                "Mod-z": () => true, // undo 무시
                "Mod-y": () => true, // redo 무시 (Ctrl+Y)
                "Mod-Shift-z": () => true, // redo 무시 (Cmd+Shift+Z)
            }),
        );
    });
</script>

<!-- svelte-ignore ownership_invalid_mutation -->
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
    .toastui-editor-dark .doc-editor-wiki-yt{
        background-image: url("/assets/icon/youtube-invert.svg");
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

    :global(.toastui-editor-dark .doc-editor-annot) {
        background: url("/assets/icon/pinned-invert.webp");
        background-size: 60%;
        background-position: calc(50% + 0.5px) calc(50% - 1px);
        background-repeat: no-repeat;
    }
</style>
