<script lang="ts" context="module">
    import type { Dan } from "$lib/module/common/dani/types";
    import { dani as daniColor } from "$lib/module/common/color";

    function getBackgroundColor(dan: Dan, theme: "dark" | "light"): string {
        let d = "kyu";
        if (/^[1-5]dan$/.test(dan)) {
            d = "lowdan";
        } else if (/^[6-9]dan$/.test(dan) || /^10dan$/.test(dan)) {
            d = "highdan";
        } else if (dan === "kuroto" || dan === "meijin" || dan === "chojin") {
            d = "jin";
        } else if (dan === "tatsujin") {
            d = "tatsujin";
        }

        return (daniColor.backgroundColor?.[theme] as any)?.[d] ?? "";
    }
</script>

<script lang="ts">
    import type { Dani } from "$lib/module/common/dani/types";
    import DaniHead from "./DaniHead.svelte";
    import { getTheme } from "$lib/module/layout/theme";
    import DaniSongContainer from "./DaniSongContainer.svelte";
    import DaniConditionContainer from "./DaniConditionContainer.svelte";
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import type { SongDataPickedForDani } from "$lib/module/common/dani/types";

    export let dani: Dani;
    export let songDatas: SongDataPickedForDani[];

    let opened: boolean = false;

    const [theme] = getTheme();
    const isMobile = getIsMobile();
</script>

<div
    class="container"
    data-isMobile={$isMobile}
    style={`background-color:${getBackgroundColor(dani.dan, $theme)};`}
>
    <DaniHead bind:opened {dani} />
    {#if opened || !$isMobile}
        <DaniSongContainer songs={dani.songs} {songDatas} />
        <DaniConditionContainer conditions={dani.conditions} />
    {/if}
</div>

<style>
    .container {
        width: 400px;

        border-radius: 5px;

        padding: 5px;

        display: flex;
        flex-direction: column;
        row-gap: 5px;

        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -ms-user-select: none; /* 인터넷익스플로러 */
        user-select: none;

        box-sizing: border-box;
    }

    [data-isMobile="true"] {
        width: 100%;
    }
</style>
