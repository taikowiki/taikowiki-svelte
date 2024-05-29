<script lang="ts">
    import type { SongScore } from "$lib/module/common/diffchart/types";

    export let name: string;
    export let color: string = "white";
    export let backgroundColor: string = "#7f7f7f";
    export let clearedSongScores: Partial<SongScore>[] | null = null;
</script>

<div class="name" style={`color:${color};background-color:${backgroundColor};`}>
    {name}{clearedSongScores !== null ? ` (${clearedSongScores.length})` : ""}
</div>

<style>
    .name {
        width: 100%;
        height: 70px;

        border-radius: 10px;

        display: flex;
        justify-content: center;
        align-items: flex-start;

        font-size: 28px;
        font-weight: bold;
    }
</style>
