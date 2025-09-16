<script>
    import AsideItem from "$lib/components/layout/main/AsideItem.svelte";
    import { Ad } from "$lib/module/ad/ad.client";
    import { onMount } from "svelte";
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import AdContainer from "./AdContainer.svelte";

    const isMobile = getIsMobile();
</script>

<!-- PC / -->
{#if !$isMobile}
    <AdContainer>
        <div class="container">
            <ins
                class="adsbygoogle"
                style="display:block;height: 100px;"
                data-ad-client="ca-pub-1629193017650416"
                data-ad-slot="7948632303"
            ></ins>
        </div>
    </AdContainer>
{/if}

<style>
    .container {
        margin-top: 15px;
        margin-left: auto;
        margin-right: auto;
    }
</style>
