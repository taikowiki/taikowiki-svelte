<script lang="ts" module>
    import { Util } from "$lib/module/util";

    function getBackgroundColor(dan: Dani.Dan, theme: "dark" | "light"): string {
        let d = "kyu";
        if (/^[1-5]dan$/.test(dan) || dan === "senpo") {
            d = "lowdan";
        } else if (
            /^[6-9]dan$/.test(dan) ||
            /^10dan$/.test(dan) ||
            dan === "taisho"
        ) {
            d = "highdan";
        } else if (dan === "kuroto" || dan === "meijin" || dan === "chojin") {
            d = "jin";
        } else if (dan === "tatsujin") {
            d = "tatsujin";
        } else if (dan === "jiho") {
            d = "jiho";
        } else if (dan === "chiuken") {
            d = "chiuken";
        } else if (dan === "fukusho") {
            d = "fukusho";
        } else if (dan === "gaiden") {
            d = "gaiden";
        }

        return (Util.Color.dani.backgroundColor?.[theme] as any)?.[d] ?? "";
    }
</script>

<script lang="ts">
    import type { Dani } from "$lib/module/dani";
    import DaniHead from "./DaniHead.svelte";
    import { getTheme } from "$lib/module/layout/theme";
    import DaniSongContainer from "./DaniSongContainer.svelte";
    import DaniConditionContainer from "./DaniConditionContainer.svelte";
    import { getIsMobile } from "$lib/module/layout/isMobile";

    interface Props {
        dani: Dani.Dani;
        songDatas: Dani.SongDataForDisplay[];
    }

    let { dani, songDatas }: Props = $props();

    let opened: boolean = $state(false);

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
