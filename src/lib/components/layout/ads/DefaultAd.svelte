<script lang="ts">
    import { browser } from "$app/environment";
    import { page } from "$app/state";
    import { getIsMobile } from "$lib/module/layout/isMobile";

    interface Props {
        style?: string;
        onlyFor?: "mobile" | "pc";
    }

    let { style = "", onlyFor }: Props = $props();

    let ins = $state<HTMLElement>();
    let rendered = $state(true);
    $effect(() => {
        if($isMobile){
            rendered = true;
        }
    })
    $effect(() => {
        if(!ins) return;
        const adStatus = ins.getAttribute('data-ad-status');
        if(adStatus === "unfilled"){
            rendered = false;
        }
    })
    $effect(() => {
        if(page.url){
            if(!rendered){
                rerender();
            }
        }
    })

    let forRerender = $state(false);
    function rerender(){
        forRerender = !forRerender;
    }


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
    {#key $isMobile && forRerender}
        <div class="ads-container" data-isMobile={$isMobile} {style}>
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
                bind:this={ins}
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
        max-width: min(100%, 700px);
    }
    .ads[data-isMobile="false"] {
        height: 90px;
    }
    .ads[data-isMobile="true"] {
        height: 50px;
    }

    .ads-container:has(:global(.ads[data-ad-status="unfilled"])) {
        display: none;
    }
</style>
