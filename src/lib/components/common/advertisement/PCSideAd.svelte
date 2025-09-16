<script>
    import AsideItem from "$lib/components/layout/main/AsideItem.svelte";
    import { Ad } from "$lib/module/ad/ad.client";
    import { onMount } from "svelte";
    import AdContainer from "./AdContainer.svelte";
    import { getIsMobile } from "$lib/module/layout/isMobile";

    const isMobile = getIsMobile();
</script>

<!-- PC 사이드 -->
<AsideItem>
    {#if !$isMobile}
        <AdContainer>
            <ins
                class="adsbygoogle"
                style="display:inline-block;width:220px;height:220px;"
                data-ad-client="ca-pub-1629193017650416"
                data-ad-slot="5138690037"
            ></ins>
        </AdContainer>
    {/if}
</AsideItem>
