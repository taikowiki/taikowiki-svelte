<script lang="ts">
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import { getTheme } from "$lib/module/layout/theme";

    interface Props {
        titleKo?: string | null;
        titleEn?: string | null;
        aliasKo?: string | null;
        aliasEn?: string | null;
        romaji?: string | null;
    }

    let {
        titleKo = null,
        titleEn = null,
        aliasKo = null,
        aliasEn = null,
        romaji = null,
    }: Props = $props();

    const [theme] = getTheme();
    const isMobile = getIsMobile();

    const lang = getLang();
    let i18n = $derived(getI18N($lang).page.songNo.multipleTitle);

    let opened = $state(false);
</script>

{#snippet translatedTitleI18n()}
    <div
        class="title"
        class:opened
        onclick={() => {
            opened = !opened;
        }}
        role="presentation"
        data-theme={$theme}
    >
        {i18n.translatedTitle}
    </div>
{/snippet}
{#snippet translatedTitles()}
    {#if titleKo}
        <tr>
            <td> {i18n.ko} </td>
            <td>
                {titleKo}
            </td>
        </tr>
    {/if}
    {#if aliasKo}
        <tr>
            <td> {i18n.aliasKo} </td>
            <td>
                {aliasKo}
            </td>
        </tr>
    {/if}
    {#if titleEn}
        <tr>
            <td> {i18n.en} </td>
            <td>
                {titleEn}
            </td>
        </tr>
    {/if}
    {#if aliasEn}
        <tr>
            <td> {i18n.aliasEn} </td>
            <td>
                {aliasEn}
            </td>
        </tr>
    {/if}
    {#if romaji}
        <tr>
            <td> {i18n.romaji} </td>
            <td>
                {romaji}
            </td>
        </tr>
    {/if}
{/snippet}

{#if titleKo || titleEn || aliasKo || aliasEn}
    <div class="container" data-isMobile={$isMobile}>
        {@render translatedTitleI18n()}
        <div class="table-container" class:opened>
            <table data-theme={$theme}>
                <tbody>
                    {@render translatedTitles()}
                </tbody>
            </table>
        </div>
    </div>
{/if}

<style>
    .container {
        width: max-content;
        display: flex;
        flex-direction: column;
    }
    .container[data-isMobile="true"] {
        width: 100%;
    }

    .title {
        width: 100%;
        height: 30px;

        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 3px;

        border: 1px solid #cf4844;
        background-color: #cf4844;
        color: white;

        padding-inline: 5px;

        cursor: pointer;

        box-sizing: border-box;
    }
    .title[data-theme="dark"] {
        border: 0;
        background-color: #1c1c1c;
    }
    .title:not(.opened)::after {
        content: "▼";
    }
    .title.opened {
        border-bottom: 0px;
    }
    .title.opened::after {
        content: "▲";
    }

    .container[data-isMobile="true"] > .table-container,
    .container[data-isMobile="true"] table {
        width: 100%;
    }
    .table-container:not(.opened) {
        height: 0px;
        overflow: hidden;
    }

    table {
        border-collapse: collapse;
    }
    td {
        border: 1px solid #cf4844;

        padding-inline: 5px;
        text-align: center;
    }
    td:nth-child(1) {
        background-color: #cf4844;
        color: white;
    }
    table[data-theme="dark"] td {
        border: 1px solid #1c1c1c;
    }
    table[data-theme="dark"] td:nth-child(1) {
        background-color: #1c1c1c;
    }
</style>
