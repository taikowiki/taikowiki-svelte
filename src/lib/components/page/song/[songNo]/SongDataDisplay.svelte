<script lang="ts">
    import type { SongData } from "$lib/module/common/song/types";
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import { getTheme } from "$lib/module/layout/theme";

    export let bpm: SongData["bpm"];
    export let bpmShiver: SongData["bpmShiver"];
    export let version: string[];
    export let artists: string[];
    export let addedDate: number;

    const [theme] = getTheme();
    const isMobile = getIsMobile();

    artists = [...new Set(artists)];
</script>

<table data-theme={$theme} data-isMobile={$isMobile}>
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
            <td> 수록 버전 </td>
            <td>
                {version.join(", ")}
            </td>
        </tr>
    {/if}
    {#if artists.length}
        <tr>
            <td> 아티스트 </td>
            <td>
                {#if $isMobile}
                    {#each artists as artist}
                        <div>
                            {artist}
                        </div>
                    {/each}
                {:else}
                    {artists.join(", ")}
                {/if}
            </td>
        </tr>
    {/if}
    {#if addedDate}
        <tr>
            <td> 추가된 날짜 </td>
            <td>
                {new Date(addedDate).toDateString()}
            </td>
        </tr>
    {/if}
</table>

<style>
    table {
        border-collapse: collapse;
        display: flex;
        flex-wrap: wrap;
    }
    table[data-isMobile="true"] {
        width: 100%;
        display: table;
    }

    td {
        border: 1px solid #cf4844;

        padding-inline: 5px;

        text-align: center;
        height: 29px;
        box-sizing: border-box;
    }
    table[data-theme="dark"] td {
        border: 1px solid #1c1c1c;
    }
    td:nth-child(1) {
        background-color: #cf4844;
        color: white;
    }
    table[data-theme="dark"] td:nth-child(1) {
        background-color: #1c1c1c;
    }
</style>
