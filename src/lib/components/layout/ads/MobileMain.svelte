<script lang="ts">
    import { browser } from "$app/environment";
    import { getIsMobile } from "$lib/module/layout/isMobile";

    const isMobile = getIsMobile();
</script>

{#if browser && $isMobile}
    <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1629193017650416"
        crossorigin="anonymous"
    ></script>
    <!-- 모바일 메인 -->
    <ins
        class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-1629193017650416"
        data-ad-slot="9128318506"
        data-ad-format="auto"
        data-full-width-responsive="true"
    ></ins>
    <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
{/if}
