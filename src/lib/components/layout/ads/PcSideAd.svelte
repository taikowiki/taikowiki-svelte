<script lang="ts">
    import { browser } from "$app/environment";
    import { getIsMobile } from "$lib/module/layout/isMobile";

    const isMobile = getIsMobile();
</script>

{#if browser}
    {#key !$isMobile}
        <!--
        <amp-ad
            width="100vw"
            height="320"
            type="adsense"
            data-ad-client="ca-pub-1629193017650416"
            data-ad-slot="5810792540"
            data-auto-format="rspv"
            data-full-width=""
        >
            <div overflow=""></div>
        </amp-ad>
-->
        <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1629193017650416"
            crossorigin="anonymous"
        ></script>
        <!-- taiko.wiki/pc사이드 -->
        <ins
            class="adsbygoogle"
            style="display:block"
            data-ad-client="ca-pub-1629193017650416"
            data-ad-slot="5810792540"
            data-ad-format="auto"
            data-full-width-responsive="true"
        ></ins>
        <script>
            (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
    {/key}
{/if}
