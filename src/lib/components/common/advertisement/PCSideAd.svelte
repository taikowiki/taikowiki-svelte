<script>
    import AsideItem from "$lib/components/layout/main/AsideItem.svelte";
    import { Ad } from "$lib/module/ad/ad.client";
    import { onMount } from "svelte";

    onMount(() => {
        (async () => {
            await Ad.adScriptLoaded.promise;
            (adsbygoogle = window.adsbygoogle || []).push({});
            console.log(Ad.adScriptLoaded.promise);
        })();
    });
</script>

<!-- PC 사이드 -->
<AsideItem>
    <ins
        class="adsbygoogle"
        style="display:inline-block;width:220px;height:220px"
        data-ad-client="ca-pub-1629193017650416"
        data-ad-slot="5138690037"
    ></ins>
</AsideItem>
