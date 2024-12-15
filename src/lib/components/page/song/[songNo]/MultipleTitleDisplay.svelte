<script lang="ts">
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import { getTheme } from "$lib/module/layout/theme";

    export let titleKo: string | null = null;
    export let titleEn: string | null = null;
    export let aliasKo: string | null = null;
    export let aliasEn: string | null = null;

    const [theme] = getTheme();
    const isMobile = getIsMobile();

    const lang = getLang();
    $: i18n = getI18N($lang).page.songNo.multipleTitle;

    let opened = false;
</script>

{#if titleKo || titleEn || aliasKo || aliasEn}
    <div class="container" data-isMobile={$isMobile}>
        <div
            class="title"
            class:opened
            on:click={() => {
                opened = !opened;
            }}
            role="presentation"
            data-theme={$theme}
        >
            {i18n.translatedTitle}
        </div>
        <div class="table-container" class:opened>
            <table data-theme={$theme}>
                <tbody>
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
