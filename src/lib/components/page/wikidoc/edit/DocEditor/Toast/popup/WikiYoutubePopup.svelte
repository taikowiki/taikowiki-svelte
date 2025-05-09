<script lang="ts">
    import { getTheme } from "$lib/module/layout/theme";
    import type { Doc } from "$lib/module/common/wikidoc/types";
    import Error from "../../../../../../../../routes/(main)/+error.svelte";

    interface Props {
        eventEmitter: any;
    }

    let { eventEmitter }: Props = $props();

    let link: string | null = $state(null);
    let width: string | null = $state(null);
    let height: string | null = $state(null);

    let warn = $state(false);
    function cancel() {
        if (!eventEmitter) return;
        eventEmitter.emit("closePopup");
    }
    function insert() {
        if (!eventEmitter) return;
        if (!link) {
            warn = true;
            return;
        }

        try {
            let link_ = link.trim();
            if (link_.startsWith("youtube.com") || link_.startsWith("www.youtube.com")) {
                link_ = "https://" + link_;
            }

            const url = new URL(link_);
            let v: string | undefined | null = null;

            if(url.host !== "youtube.com" && url.host !== "www.youtube.com" && url.host !== "m.youtube.com"){
                warn = true;
                return;
            }

            if (url.pathname.startsWith("/embed")) {
                v = url.pathname.split("/")[2];
            } else if (url.pathname === "/watch") {
                v = url.searchParams.get("v");
            }

            if (!v) {
                warn = true;
                return;
            }

            const option: Doc.Toast.WikiYoutubePluginFunctionOption = {
                v,
                width,
                height,
            };
            eventEmitter.emit("command", "insertYoutube", option);
            eventEmitter.emit("closePopup");

            link = null;
            width = null;
            height = null;
        } catch {
            warn = true;
        }
    }
    function removeWarn() {
        warn = false;
    }

    //theme
    const [theme] = getTheme();
</script>

<div class="container" data-theme={$theme}>
    <div class="section">
        <span> Link </span>
        <input type="text" bind:value={link} class:warn onfocus={removeWarn} />
    </div>
    <div class="section">
        <span> Width </span>
        <input type="text" bind:value={width} onfocus={removeWarn} />
    </div>
    <div class="section">
        <span> Height </span>
        <input type="text" bind:value={height} onfocus={removeWarn} />
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

    input.warn {
        border-color: red !important;
    }
</style>
