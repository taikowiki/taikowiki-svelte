<script lang="ts">
    import { getTheme } from "$lib/module/layout/theme";
    import type { Doc } from "$lib/module/doc";

    interface Props {
        eventEmitter: any;
    }

    let { eventEmitter }: Props = $props();

    let docTitle: string | null = $state(null);
    let content: string = $state("");

    let warn = $state(false);
    function cancel() {
        if (!eventEmitter) return;
        eventEmitter.emit("closePopup");
    }
    function insert() {
        if (!eventEmitter) return;
        if(!docTitle){
            warn = true;
            return;
        }
        const option: Doc.Toast.WikiLinkPluginFunctionOption = {
            docTitle,
            content
        }
        eventEmitter.emit("command", "insertWikiLink", option);
        eventEmitter.emit("closePopup");
        docTitle = null;
        content = "";
    }
    function removeWarn() {
        warn = false;
    }

    //theme
    const [theme] = getTheme();
</script>

<div class="container" data-theme={$theme}>
    <div class="section">
        <span> Doc Title </span>
        <input
            type="text"
            bind:value={docTitle}
            class:warn
            onfocus={removeWarn}
        />
    </div>
    <div class="section">
        <span> Content </span>
        <textarea
            bind:value={content}
            class:warn
            onfocus={removeWarn}
        ></textarea>
    </div>

    <div class="btn-section">
        <button class="toastui-editor-close-button" onclick={cancel}>
            Cancel
        </button>
        <button class="toastui-editor-ok-button" onclick={insert}> Ok </button>
    </div>
</div>

<style>
    input {
        width: 200px;
    }

    .container {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
    }

    .section > span {
        font-weight: bold;
    }

    .section {
        display: flex;
        flex-direction: column;
        row-gap: 2px;
    }

    .btn-section {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        column-gap: 8px;
    }

    button {
        width: 70px;
    }

    input {
        height: 20px;
        padding: 0 12px;
        border-radius: 2px;
        border: 1px solid #e1e3e9;
    }

    .container[data-theme="dark"] input {
        border-color: #303238;
        background-color: transparent;
        color: white;
    }

    textarea{
        padding: 3px 12px;
        resize: vertical;
    }
    .container[data-theme="dark"] textarea {
        border-color: #303238;
        background-color: transparent;
        color: white;
    }

    input.warn {
        border-color: red !important;
    }
</style>
