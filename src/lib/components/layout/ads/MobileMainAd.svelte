<script lang="ts">
    import { browser } from "$app/environment";
    import { getIsMobile } from "$lib/module/layout/isMobile";

    const isMobile = getIsMobile();
</script>

{#if browser && $isMobile}
    {#key $isMobile}
        <div class="ads-container">
            <script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1629193017650416"
                crossorigin="anonymous"
            ></script>
            <!-- taiko.wiki/모바일 메인 -->
            <ins
                class="adsbygoogle"
                style="display:inline-block;width:300px;height:300px"
                data-ad-client="ca-pub-1629193017650416"
                data-ad-slot="9128318506"
            ></ins>
            <script>
                (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
        </div>
    {/key}
{/if}

<style>
    .ads-container {
        max-width: min(100%, 700px);
    }
</style>
