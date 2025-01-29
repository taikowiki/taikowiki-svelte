<script lang="ts">
    import { browser } from "$app/environment";
    import { page } from "$app/state";
    import { getIsMobile } from "$lib/module/layout/isMobile";

    interface Props {
        style?: string;
        onlyFor?: "mobile" | "pc";
        useHide?: boolean;
    }

    let { style = "", onlyFor, useHide = true }: Props = $props();

    const isMobile = getIsMobile();

    function checkOnlyFor(onlyFor: "mobile" | "pc" | undefined) {
        if (!onlyFor) return true;
        if (onlyFor === "mobile") {
            return $isMobile === true;
        } else {
            return $isMobile === false;
        }
    }
</script>

{#if browser && checkOnlyFor(onlyFor) && page.url.pathname !== "/gamecenter"}
    {#key $isMobile}
        <div class="ads-container" data-isMobile={$isMobile} {style} data-useHide={useHide}>
            <script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1629193017650416"
                crossorigin="anonymous"
            ></script>
            <!-- taiko.wiki/기본 -->
            <ins
                class="adsbygoogle ads"
                style="display:block"
                data-ad-client="ca-pub-1629193017650416"
                data-ad-slot="3643794205"
                data-isMobile={$isMobile}
            ></ins>
            <script>
                (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
        </div>
    {/key}
{/if}

<style>
    .ads-container {
        width: 100%;
        margin-top: 10px;
        margin-bottom: 10px;

        display: flex;
        justify-content: center;
    }

    .ads-container[data-isMobile="true"] {
        width: min(100%, 700px);
    }

    .ads {
        display: flex;
        justify-content: center;
        width: min(100%, 700px);
    }
    .ads[data-isMobile="false"] {
        height: 90px;
    }
    .ads[data-isMobile="true"] {
        height: 50px;
    }

    .ads-container[data-useHide="true"]:has(:global(.ads[data-ad-status="unfilled"])) {
        display: none;
    }
</style>
