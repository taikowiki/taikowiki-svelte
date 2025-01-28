<script lang="ts">
    import { browser } from "$app/environment";
    import { getIsMobile } from "$lib/module/layout/isMobile";

    const isMobile = getIsMobile();
</script>

{#if browser}
    {#key $isMobile}
        <div class="ads-container" data-isMobile={$isMobile}>
            <script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1629193017650416"
                crossorigin="anonymous"
            ></script>
            <!-- taiko.wiki/기본 -->
            <ins
                class="adsbygoogle"
                style="display:block"
                data-ad-client="ca-pub-1629193017650416"
                data-ad-slot="3643794205"
                data-ad-format="auto"
                data-full-width-responsive="true"
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
</style>
