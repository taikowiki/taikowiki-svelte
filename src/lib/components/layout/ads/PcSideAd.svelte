<script lang="ts">
    import { browser } from "$app/environment";
    import { getIsMobile } from "$lib/module/layout/isMobile";

    const isMobile = getIsMobile();
</script>

{#if browser}
    {#key !$isMobile}
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
    {/key}
{/if}
