<script lang="ts">
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import { getTheme } from "$lib/module/layout/theme";

    export let titleKo: string | null = null;
    export let titleEn: string | null = null;
    export let aliasKo: string | null = null;
    export let aliasEn: string | null = null;

    const [theme] = getTheme();
    const isMobile = getIsMobile();

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
            번역명
        </div>
        <div class="table-container" class:opened>
            <table data-theme={$theme}>
                {#if titleKo}
                    <tr>
                        <td> 한국어 </td>
                        <td>
                            {titleKo}
                        </td>
                    </tr>
                {/if}
                {#if aliasKo}
                    <tr>
                        <td> 한국어(비공식) </td>
                        <td>
                            {aliasKo}
                        </td>
                    </tr>
                {/if}
                {#if titleEn}
                    <tr>
                        <td> 영어 </td>
                        <td>
                            {titleEn}
                        </td>
                    </tr>
                {/if}
                {#if aliasEn}
                    <tr>
                        <td> 영어(비공식) </td>
                        <td>
                            {aliasEn}
                        </td>
                    </tr>
                {/if}
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
