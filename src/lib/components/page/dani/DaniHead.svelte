<script lang="ts" context="module">
    import { dani as daniColor } from "$lib/module/common/color";

    function getColor(dan: Dan, theme: "dark" | "light"): string {
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

        return (daniColor.color?.[theme] as any)?.[d] ?? "";
    }
</script>

<script lang="ts">
    import type { Dani, Dan } from "$lib/module/common/dani/types";
    import { getLang } from "$lib/module/common/i18n/i18n";
    import { getTheme } from "$lib/module/layout/theme";
    import { getI18N } from "$lib/module/common/i18n/i18n";
    import { getIsMobile } from "$lib/module/layout/isMobile";

    export let opened: boolean;
    export let dani: Dani;

    const [theme] = getTheme();
    const isMobile = getIsMobile();

    const lang = getLang();
    $: i18n = getI18N("component", $lang).DaniDisplay;
</script>

<div
    class="head"
    on:click={() => {
        opened = !opened;
    }}
    role="presentation"
>
    <div class="section">
        <div
            class="item"
            style={`background-color:${getColor(dani.dan, $theme)};`}
        >
            <span>
                {i18n.dan[dani.name || dani.dan] || dani.name || dani.dan}
            </span>
        </div>
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
        <!--
            {#if $theme === "light"}
            <img src="/assets/icon/dani/youtube_256px.svg" alt="" />
        {:else}
            <img src="/assets/icon/dani/youtube_dark_256px.svg" alt="" />
        {/if}
        {#if dani.dan !== "gaiden"}
            {#if $theme === "light"}
                <img src="/assets/icon/dani/qr_256px.svg" alt="" />
            {:else}
                <img src="/assets/icon/dani/qr_dark_256px.svg" alt="" />
            {/if}
        {/if}
        -->
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

        cursor: pointer;
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

    .fold {
        width: 25px;
        height: 25px;

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
