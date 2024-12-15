<script lang="ts" context="module">
    function setTdMinWidth(node: HTMLDivElement, isMobile: boolean) {
        function updateFunc(isMobile: boolean) {
            if (!isMobile && node.clientHeight > 30) {
                let max = 100;
                const tdList = node.querySelectorAll(".div-td:nth-child(1)");
                tdList.forEach((td) => {
                    if (td.clientWidth > max) {
                        max = td.clientWidth;
                    }
                });
                tdList.forEach((td) => {
                    (td as HTMLElement).style.width = `${max}px`;
                });

                node.querySelectorAll(
                    ".div-tr:not(:nth-last-child(1)) .div-td:nth-child(2)",
                ).forEach((td) => {
                    (td as HTMLElement).style.borderBottom = `0`;
                });
            } else {
                node.querySelectorAll(".div-td:nth-child(1)").forEach((e) => {
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

    let table: HTMLDivElement;

    const lang = getLang();
    $: i18n = getI18N($lang).page.songNo.songData;
</script>

<div
    class="div-table"
    data-theme={$theme}
    data-isMobile={$isMobile}
    bind:this={table}
    use:setTdMinWidth={$isMobile}
>
    <div class="div-tr">
        <div class="div-td"> BPM </div>
        <div class="div-td">
            {#if bpm.min === bpm.max}
                {bpm.min}
            {:else}
                {bpm.min} - {bpm.max}
            {/if}
            {#if bpmShiver}
                ※
            {/if}
        </div>
    </div>
    {#if version.length}
        <div class="div-tr">
            <div class="div-td"> {i18n.version} </div>
            <div class="div-td">
                {#each version as v}
                    <SongDataDisplayTag item={v} />
                {/each}
            </div>
        </div>
    {/if}
    {#if artists.length}
        <div class="div-tr">
            <div class="div-td"> {i18n.artists} </div>
            <div class="div-td">
                {#each artists as artist}
                    <SongDataDisplayTag item={artist} />
                {/each}
            </div>
        </div>
    {/if}
    {#if addedDate}
        <div class="div-tr">
            <div class="div-td"> {i18n.addedDate} </div>
            <div class="div-td">
                {DateTime.fromMillis(addedDate, {
                    zone: "Asia/Seoul",
                }).toFormat("yyyy-MM-dd")}
            </div>
        </div>
    {/if}
</div>

<style>
    .div-table {
        border-collapse: collapse;
        width: 100%;
        display: table;
    }
    .div-table[data-isMobile="false"] {
        width: auto;
        display: flex;
        flex-wrap: wrap;
        height: min-content;
    }

    .div-table[data-isMobile="false"] > .div-tr {
        display: flex;
        flex: 1 1 auto;
        min-height: 30px;
    }
    .div-table[data-isMobile="false"] > .div-tr > .div-td {
        display: flex;
        align-items: center;
        justify-content: center;
        height: auto;
        column-gap: 5px;
        row-gap: 2px;
    }

    .div-table[data-isMobile="false"] > .div-tr > .div-td:nth-child(2) {
        flex: 1 1;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .div-td {
        border: 1px solid #cf4844;

        padding-inline: 5px;
        height: 30px;
        text-align: center;
        box-sizing: border-box;
    }
    .div-table[data-theme="dark"] .div-td {
        border: 1px solid #1c1c1c;
    }

    .div-td:nth-child(1) {
        background-color: #cf4844;
        color: white;
        text-wrap: nowrap;
    }

    .div-table[data-theme="dark"] .div-td:nth-child(1) {
        background-color: #1c1c1c;
    }
</style>
