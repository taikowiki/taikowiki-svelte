<script lang="ts">
    import type { SongData } from "$lib/module/common/song/types";
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import { getTheme } from "$lib/module/layout/theme";
    import SongDataDisplayTag from "./SongDataDisplayTag.svelte";
    import dayjs from 'dayjs';

    export let bpm: SongData["bpm"];
    export let bpmShiver: SongData["bpmShiver"];
    export let version: string[];
    export let artists: string[];
    export let addedDate: number | null;

    const [theme] = getTheme();
    const isMobile = getIsMobile();

    artists = [...new Set(artists)];
</script>

<div class="container" data-theme={$theme} data-isMobile={$isMobile}>
        <div class="item first">BPM</div>
        <div class="item second">
            <SongDataDisplayTag item= {bpm.min === bpm.max ? `${bpm.min}` :`${bpm.min} - ${bpm.max}`}/>
            {#if bpmShiver}<SongDataDisplayTag item="변동"/>{/if}
        </div>
    {#if version.length}
    <div class="item first">수록 버전</div>
    <div class="item second">
        {#each version as versionItem}
            <SongDataDisplayTag item={versionItem}/>
        {/each}
        </div>
    {/if}
    {#if artists.length}
    <div class="item first">아티스트</div>
    <div class="item second">
        {#each artists as artistItem}
        <SongDataDisplayTag item={artistItem}/>
        {/each}
    </div>
    {/if}
    {#if addedDate}
    <div class="item first">추가일</div>
    <div class="item second">
        <SongDataDisplayTag item={dayjs(addedDate).format("YYYY-MM-DD")}/>
    </div>
    {/if}
    </div>

<style>
    .container{
        display: grid;
        grid-template-columns: repeat(2, minmax(0,1fr));
        grid-template-rows: repeat(2, minmax(0,1fr));
        border-radius: 0.5em;
        box-shadow: 0px 0px 3px #d4d4d4;
        width: 100%;
        gap: 1em;
        padding: 1em;

    }
    .container[data-theme=dark]{
        box-shadow: none;
        background-color: #1c1c1c;
    }
    .item{
        display: flexbox;
    }

</style>
