<script lang="ts">
    import type { Doc } from "$lib/module/common/wikidoc/types";
    import { getTheme } from "$lib/module/layout/theme";
    import WikiDocEditBtn from "../../wikidoc/view/WikiView/WikiDocEditBtn.svelte";
    import WikiDocLogBtn from "../../wikidoc/view/WikiView/WikiDocLogBtn.svelte";

    interface Props {
        title: string;
        songNo: string;
        docData: {
            id: number;
            title: string;
            canEditable: boolean;
        } | null;
    }

    let { title, songNo, docData }: Props = $props();

    const [theme] = getTheme();
</script>

{#snippet docEdit()}
    {#if docData}
        {#if docData.canEditable}
            <WikiDocEditBtn id={docData.id} title={docData.title} />
        {/if}
        <WikiDocLogBtn id={docData.id} />
    {/if}
{/snippet}
{#snippet youtube()}
    <a
        class="icon-anchor"
        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`太鼓の達人 ${title}`)}`}
        data-theme={$theme}
        target="_blank"
    >
        <img class="icon" src="/assets/icon/youtube.svg" alt="edit" />
    </a>
{/snippet}
{#snippet edit()}
    <a class="icon-anchor" href={`/song/${songNo}/edit`} data-theme={$theme}>
        <img class="icon" src="/assets/icon/pen.svg" alt="edit" />
    </a>
{/snippet}

<h1 class="container">
    <div class="title">
        {title}
    </div>
    <div class="icon-container">
        {@render youtube()}
        {@render edit()}
        {@render docEdit()}
    </div>
</h1>

<style>
    h1 {
        margin: 0;
    }

    .container {
        display: flex;
        flex-direction: row;
        align-items: flex-start;

        row-gap: 15px;

        margin-bottom: 15px;
    }
    .title {
        flex: 1 1 auto;
        max-width: calc(100% - 30px);

        font-weight: bold;
        font-size: 35px;

        word-break: break-all;
    }

    .icon-container {
        display: flex;
        flex-direction: row;
        margin-top: 13px;

        column-gap: 4px;
    }

    .icon {
        width: 20px;
        height: 20px;

        filter: invert(100%);
    }
    .icon-anchor {
        width: 30px;
        height: 30px;

        display: flex;
        justify-content: center;
        align-items: center;

        background-color: #cf4844;

        border-radius: 5px;
    }
    .icon-anchor[data-theme="dark"] {
        background-color: #1c1c1c;
    }
</style>
