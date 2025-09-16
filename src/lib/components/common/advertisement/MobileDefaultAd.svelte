<script>
    import AsideItem from "$lib/components/layout/main/AsideItem.svelte";
    import { Ad } from "$lib/module/ad/ad.client";
    import { onMount } from "svelte";
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import AdContainer from "./AdContainer.svelte";
    import { page } from "$app/state";

    const isMobile = getIsMobile();
</script>

<!-- Mobile default -->
{#if $isMobile && page.url.pathname !== "/" && page.url.pathname !== "/gamecenter" && page.url.pathname !== "/donate"}
    <AdContainer>
        <div class="container">
            <ins
                class="adsbygoogle"
                style="display:block;height: 60px;margin-bottom: 15px;"
                data-ad-client="ca-pub-1629193017650416"
                data-ad-slot="4548497241"
            ></ins>
        </div>
    </AdContainer>
{/if}

<style>
    .container {
        width: 100%;
        margin-left: auto;
        margin-right: auto;
    }
</style>
