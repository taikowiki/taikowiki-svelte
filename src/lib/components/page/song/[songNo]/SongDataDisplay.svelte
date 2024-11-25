<script lang="ts" context="module">
    function setTdMinWidth(node: HTMLTableElement, isMobile: boolean) {
        function updateFunc(isMobile: boolean) {
            if (!isMobile && node.clientHeight > 30) {
                let max = 100;
                const tdList = node.querySelectorAll("td:nth-child(1)");
                tdList.forEach((td) => {
                    if (td.clientWidth > max) {
                        max = td.clientWidth;
                    }
                });
                tdList.forEach((td) => {
                    (td as HTMLElement).style.width = `${max}px`;
                });

                node.querySelectorAll("tr:not(:nth-last-child(1)) td:nth-child(2)").forEach(td => {
                    (td as HTMLElement).style.borderBottom = `0`;
                })
            } else {
                node.querySelectorAll("td:nth-child(1)").forEach((e) => {
                    (e as HTMLElement).style.width = "";
                });
            }
        }

        updateFunc(isMobile);

        return {
            update(isMobile: boolean) {
                updateFunc(isMobile);
            },
        };
    }
</script>

<script lang="ts">
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";

    import type { SongData } from "$lib/module/common/song/types";
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import { getTheme } from "$lib/module/layout/theme";
    import { DateTime } from "luxon";
    import SongDataDisplayTag from "./SongDataDisplayTag.svelte";

    export let bpm: SongData["bpm"];
    export let bpmShiver: SongData["bpmShiver"];
    export let version: string[];
    export let artists: string[];
    export let addedDate: number | null;

    const [theme] = getTheme();
    const isMobile = getIsMobile();

    artists = [...new Set(artists)];

    let table: HTMLTableElement;

    const lang = getLang();
    $: i18n = getI18N($lang).page.songNo.songData;
</script>

<table
    data-theme={$theme}
    data-isMobile={$isMobile}
    bind:this={table}
    use:setTdMinWidth={$isMobile}
>
    <tr>
        <td> BPM </td>
        <td>
            {#if bpm.min === bpm.max}
                {bpm.min}
            {:else}
                {bpm.min} - {bpm.max}
            {/if}
            {#if bpmShiver}
                ※
            {/if}
        </td>
    </tr>
    {#if version.length}
        <tr>
            <td> {i18n.version} </td>
            <td>
                {#each version as v}
                    <SongDataDisplayTag item={v} />
                {/each}
            </td>
        </tr>
    {/if}
    {#if artists.length}
        <tr>
            <td> {i18n.artists} </td>
            <td>
                {#each artists as artist}
                    <SongDataDisplayTag item={artist} />
                {/each}
            </td>
        </tr>
    {/if}
    {#if addedDate}
        <tr>
            <td> {i18n.addedDate} </td>
            <td>
                {DateTime.fromMillis(addedDate).toFormat("yyyy-MM-dd")}
            </td>
        </tr>
    {/if}
</table>

<style>
    table {
        border-collapse: collapse;
        width: 100%;
        display: table;
    }
    table[data-isMobile="false"] {
        width: auto;
        display: flex;
        flex-wrap: wrap;
        height: min-content;
    }

    table[data-isMobile="false"] > tr {
        display: flex;
        flex: 1 1 auto;
        min-height: 30px;
    }
    table[data-isMobile="false"] > tr > td {
        display: flex;
        align-items: center;
        justify-content: center;
        height: auto;
        column-gap: 5px;
        row-gap: 2px;
    }

    table[data-isMobile="false"] > tr > td:nth-child(2) {
        flex: 1 1;
        flex-direction: row;
        flex-wrap: wrap;
    }

    td {
        border: 1px solid #cf4844;

        padding-inline: 5px;
        height: 30px;
        text-align: center;
        box-sizing: border-box;
    }
    table[data-theme="dark"] td {
        border: 1px solid #1c1c1c;
    }

    td:nth-child(1) {
        background-color: #cf4844;
        color: white;
        text-wrap: nowrap;
    }

    table[data-theme="dark"] td:nth-child(1) {
        background-color: #1c1c1c;
    }
</style>
