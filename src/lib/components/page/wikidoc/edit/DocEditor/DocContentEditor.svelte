<script lang="ts">
    import ToastEditor from "./Toast/ToastEditor.svelte";
    import WikiDocPreview from "../Preview/DocPreview.svelte";
    import { getTheme } from "$lib/module/layout/theme";
    import { onMount } from "svelte";
    import { UndoStack } from "$lib/module/common/wikidoc/util";

    interface Props {
        content: string;
    }

    let { content = $bindable() }: Props = $props();

    let editorType: "raw" | "toast" | "preview" = $state("raw");

    let undoStack = $state<UndoStack>();
    let textarea = $state<HTMLTextAreaElement>();
    onMount(() => {
        if(!textarea) return;
        undoStack = new UndoStack(textarea, {
            cooldown: 10,
            maxStackSize: 500,
            onUndo: (element) => {
                content = element.value
            },
            onRedo: (element) => {
                content = element.value
            },
        });
    })
    $effect(() => {
        if(editorType !== "raw" && undoStack){
            content;
            undoStack.pushCurrent();
        }
    })

    const [theme] = getTheme();

    function textAreaTabEvent(this:HTMLTextAreaElement, event: KeyboardEvent){
        if(event.key !== "Tab") return;
        event.preventDefault();
        const start = this.selectionStart;
        const end = this.selectionEnd;
        const tab = '    ';

        const before = this.value.substring(0, start);
        const after = this.value.substring(end);

        this.value = before + tab + after;
        this.selectionStart = start + tab.length;
        this.focus();
        content = this.value;
        if(undoStack){
            undoStack.pushCurrent();
        }
    }
</script>

<!-- svelte-ignore ownership_invalid_mutation -->
{#snippet editorTypeSelector()}
    <div class="row-left">
        <label class:selected={editorType === "raw"} data-theme={$theme}>
            Raw
            <input type="radio" value="raw" bind:group={editorType} />
        </label>
        <label class:selected={editorType === "toast"} data-theme={$theme}>
            Toast 에디터
            <input type="radio" value="toast" bind:group={editorType} />
        </label>
        <label class:selected={editorType === "preview"} data-theme={$theme}>
            미리보기
            <input type="radio" value="preview" bind:group={editorType} />
        </label>
    </div>
{/snippet}

<div class="container">
    {@render editorTypeSelector()}
    <div class="editor-container">
        <textarea
            class="raw"
            class:show={editorType === "raw"}
            bind:value={content}
            bind:this={textarea}
            spellcheck="false"
            data-theme={$theme}
            placeholder="마크다운 문법으로 작성하세요."
            onkeydown={textAreaTabEvent}
        ></textarea>
        <ToastEditor bind:mdContent={content} show={editorType === "toast"} />
        {#if editorType === "preview"}
            <WikiDocPreview {content} />
        {/if}
    </div>
</div>

<style>
    input[type="radio"] {
        display: none;
    }

    label {
        height: 30px;

        padding-inline: 10px;

        border-radius: 5px 5px 0 0;

        background-color: rgb(212, 212, 212);

        display: flex;
        justify-content: center;
        align-items: center;

        cursor: pointer;
    }

    label.selected {
        background-color: rgb(176, 176, 176);
    }
    label[data-theme="dark"] {
        background-color: rgb(67, 67, 67);
        color: white;
    }
    label.selected[data-theme="dark"] {
        background-color: rgb(99, 99, 99);
    }

    textarea {
        display: none;
    }
    textarea.show {
        display: block;
    }
    textarea.raw {
        width: 100%;
        height: 500px;

        resize: vertical;

        font-family: "Sans Serif";
        font-size: 16px;

        box-sizing: border-box;
        border: 2px solid black;
    }
    textarea.raw[data-theme="dark"] {
        background-color: black;
        color: white;
    }

    .row-left {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
    }
</style>
