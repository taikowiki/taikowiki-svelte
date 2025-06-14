<script lang="ts">
    import type { Doc } from "$lib/module/doc";
    import { getTheme } from "$lib/module/layout/theme";

    interface Props {
        eventEmitter: any;
    }

    let { eventEmitter }: Props = $props();

    let url: string = $state("");
    let description: string = $state("");

    let x: number | null = $state(null);
    let y: number | null = $state(null);

    let warn = $state(false);
    function cancel() {
        if (!eventEmitter) return;
        eventEmitter.emit("closePopup");
    }
    function insert() {
        if (!eventEmitter) return;
        if (!url) {
            warn = true;
            return;
        }
        const option: Doc.Toast.ImagePluginFunctionOption = {
            url,
            description,
            size: {
                x,
                y,
            },
        };
        eventEmitter.emit("command", "insertImage", option);
        eventEmitter.emit("closePopup");
        url = "";
        description = "";
        x = null;
        y = null;
    }
    function removeWarn() {
        warn = false;
    }

    //theme
    const [theme] = getTheme();
</script>

<div class="container" data-theme={$theme}>
    <div class="section">
        <span> URL </span>
        <input type="text" bind:value={url} class:warn onfocus={removeWarn} />
    </div>

    <div class="section">
        <span> Description </span>
        <input type="text" bind:value={description} />
    </div>

    <div class="section">
        <span> Size </span>
        <div class="input-section">
            <input type="number" bind:value={x} min="1" />
            X
            <input type="number" bind:value={y} min="1" />
        </div>
    </div>

    <div class="btn-section">
        <button class="toastui-editor-close-button" onclick={cancel}>
            Cancel
        </button>
        <button class="toastui-editor-ok-button" onclick={insert}> Ok </button>
    </div>
</div>

<style>
    input[type="number"] {
        width: 100px;
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

    .input-section {
        display: flex;
        flex-direction: row;
        column-gap: 3px;
        align-items: center;
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

    input[type="number"] {
        height: 20px;
        padding: 0 12px;
        border-radius: 2px;
        border: 1px solid #e1e3e9;
    }

    .container[data-theme="dark"] input[type="number"] {
        border-color: #303238;
        background-color: transparent;
        color: white;
    }

    input.warn {
        border-color: red;
    }
</style>
