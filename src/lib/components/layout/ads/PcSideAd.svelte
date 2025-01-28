<script lang="ts">
    import { browser } from "$app/environment";
    import { navigating } from "$app/state";
    import { getIsMobile } from "$lib/module/layout/isMobile";

    const isMobile = getIsMobile();
</script>

{#if browser && !$isMobile}
    {#key !$isMobile && navigating}
        <div class="ads-container">
            <script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1629193017650416"
                crossorigin="anonymous"
            ></script>
            <!-- taiko.wiki/pc사이드 -->
            <ins
                class="adsbygoogle"
                style="display:inline-block;width:250px;height:250px"
                data-ad-client="ca-pub-1629193017650416"
                data-ad-slot="5810792540"
            ></ins>
            <script>
                (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
        </div>
    {/key}
{/if}

<style>
    .ads-container{
        width: 100%;
    }
</style>