<script lang="ts">
    import { DAN, DANIVERSION } from "$lib/module/common/song/const";
    import type { Dani } from "$lib/module/common/song/types";

    export let dani: Dani;
</script>

<div class="container">
    <select bind:value={dani.version}>
        {#each DANIVERSION as daniVersion}
            <option value={daniVersion}>
                {daniVersion}
            </option>
        {/each}
    </select>
    <select bind:value={dani.dan}>
        {#each DAN as dan}
            <option value={dan}>
                {dan}
            </option>
        {/each}
    </select>
    <select bind:value={dani.order}>
        <option value={1}>
            첫 번째
        </option>
        <option value={2}>
            두 번째
        </option>
        <option value={3}>
            세 번째
        </option>
    </select>
</div>

<style>
    .container{
        display:flex;
    }
</style>