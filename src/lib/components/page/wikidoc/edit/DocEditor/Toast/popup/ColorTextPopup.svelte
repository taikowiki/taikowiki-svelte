<script lang="ts">
    import { getTheme } from "$lib/module/layout/theme";

    interface Props {
        eventEmitter: any;
    }

    let { eventEmitter }: Props = $props();

    let color: string | null = $state(null);

    function cancel() {
        if (!eventEmitter) return;
        eventEmitter.emit("closePopup");
    }
    function insert() {
        if (!eventEmitter) return;
        if (!color) {
            return eventEmitter.emit("closePopup");
        }

        const option = { color };

        eventEmitter.emit("command", "insertColoredText", option);
        eventEmitter.emit("closePopup");
        color = null;
    }

    //theme
    const [theme] = getTheme();
</script>

<div class="container" data-theme={$theme}>
    <div class="section">
        <span> Color </span>
        <input type="color" bind:value={color} />
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
        width: 70px;
        height: 30px;

        padding: 0 12px;
        border-radius: 2px;
        border: 1px solid #e1e3e9;

        cursor: pointer;
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

    .container[data-theme="dark"] input {
        border-color: #303238;
        background-color: transparent;
        color: white;
    }
</style>
