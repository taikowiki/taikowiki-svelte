<script lang="ts" context="module">
    import { dani as daniColor } from "$lib/module/common/color";

    function getColor(dan: Dan, theme: "dark" | "light"): string {
        let d = "kyu";
        if (/^[1-5]dan$/.test(dan) || dan === "senpo") {
            d = "lowdan";
        } else if (/^[6-9]dan$/.test(dan) || /^10dan$/.test(dan) || dan === "taisho") {
            d = "highdan";
        } else if (dan === "kuroto" || dan === "meijin" || dan === "chojin") {
            d = "jin";
        } else if (dan === "tatsujin") {
            d = "tatsujin";
        } else if (dan === "jiho"){
            d = "jiho";
        } else if (dan === "chiuken"){
            d = "chiuken";
        } else if (dan === "fukusho"){
            d = "fukusho";
        }

        return (daniColor.color?.[theme] as any)?.[d] ?? "";
    }
</script>

<script lang="ts">
    import type { Dani, Dan } from "$lib/module/common/dani/types";
    import { getLang } from "$lib/module/common/i18n/i18n";
    import { getTheme } from "$lib/module/layout/theme";
    import { getI18N } from "$lib/module/common/i18n/i18n";
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import DaniPlate from "./DaniPlate.svelte";

    export let opened: boolean;
    export let dani: Dani;

    const [theme] = getTheme();
    const isMobile = getIsMobile();

    const jpDaniI18n = getI18N("other", "ja").dani;
    const href = `https://www.youtube.com/results?search_query=${encodeURI(`${jpDaniI18n.version[dani.version]} ${jpDaniI18n.dan[dani.dan]}`)}`;

    const lang = getLang();
    $: i18n = getI18N("other", $lang).dani;
</script>

<div
    class="head"
    on:click={() => {
        if($isMobile) opened = !opened;
    }}
    role="presentation"
>
    <div class="section">
        <DaniPlate dan={dani.dan}/>
        <div
            class="item"
            style={`background-color:${getColor(dani.dan, $theme)};`}
        >
            <span>
                {i18n.version[dani.version]}
            </span>
        </div>
    </div>
    <div class="section">
        {#if $theme === "light"}
            <a class="yt-link" {href} target="_blank">
                <img src="/assets/icon/dani/youtube_256px.svg" alt="" />
            </a>
        {:else}
            <a class="yt-link" {href} target="_blank">
                <img src="/assets/icon/dani/youtube_dark_256px.svg" alt="" />
            </a>
        {/if}
        {#if dani.dan === "gaiden" && dani.qr !== undefined}
            {#if $theme === "light"}
                <img src="/assets/icon/dani/qr_256px.svg" alt="" />
            {:else}
                <img src="/assets/icon/dani/qr_dark_256px.svg" alt="" />
            {/if}
        {/if}
        {#if $isMobile}
            {#if $theme === "light"}
                <img
                    class="fold"
                    src="/assets/icon/dani/unfold.svg"
                    alt=""
                    class:opened
                />
            {:else}
                <img
                    class="fold"
                    src="/assets/icon/dani/unfold_dark.svg"
                    alt=""
                    class:opened
                />
            {/if}
        {/if}
    </div>
</div>

<style>
    .head {
        width: 100%;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .item {
        min-width: 50px;
        height: 30px;

        font-weight: bold;
        font-size: 18px;
        color: white;

        padding-block: 2px;
        padding-inline: 7px;

        border-radius: 5px;

        display: flex;
        justify-content: center;
        align-items: center;

        box-sizing: border-box;
    }

    span {
        transform: translateY(-1px);
    }

    img {
        width: 30px;
        height: 30px;
    }

    .yt-link {
        width: 30px;
        height: 30px;
    }

    .fold {
        width: 30px;
        height: 30px;

        transition: transform 0.1s;
    }
    .fold.opened {
        transform: rotate(180deg);
    }

    .section {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        column-gap: 5px;
    }
</style>
