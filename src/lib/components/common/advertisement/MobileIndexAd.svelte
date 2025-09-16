<script>
    import AsideItem from "$lib/components/layout/main/AsideItem.svelte";
    import { Ad } from "$lib/module/ad/ad.client";
    import { onMount } from "svelte";
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import AdContainer from "./AdContainer.svelte";

    const isMobile = getIsMobile();
</script>

<!-- Mobile index -->
{#if $isMobile}
    <AdContainer>
        <div class="container">
            <div>
                <ins
                    class="adsbygoogle"
                    style="display:block"
                    data-ad-client="ca-pub-1629193017650416"
                    data-ad-slot="9237717146"
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                ></ins>
            </div>
        </div>
    </AdContainer>
{/if}

<style>
    .container {
        width: 100%;
        margin-top: 15px;
        display: flex;
        justify-items: center;
    }
</style>
