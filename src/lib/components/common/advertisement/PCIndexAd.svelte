<script>
    import AsideItem from "$lib/components/layout/main/AsideItem.svelte";
    import { Ad } from "$lib/module/ad/ad.client";
    import { onMount } from "svelte";
    import { getIsMobile } from "$lib/module/layout/isMobile";

    const isMobile = getIsMobile();

    onMount(() => {
        (async () => {
            await Ad.adScriptLoaded.promise;
            (adsbygoogle = window.adsbygoogle || []).push({});
        })();
    });
</script>

<!-- PC / -->
<div class="container" class:invisible={$isMobile}>
    <ins
        class="adsbygoogle"
        style="display:block;height: 100px;"
        data-ad-client="ca-pub-1629193017650416"
        data-ad-slot="7948632303"
    ></ins>
</div>

<style>
    .container{
        width: 100%;
        margin-top: 5px;
        &.invisible{
            display: none;
        }
    }
</style>