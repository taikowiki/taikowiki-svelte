<script>
    import AsideItem from "$lib/components/layout/main/AsideItem.svelte";
    import { Ad } from "$lib/module/ad/ad.client";
    import { onMount } from "svelte";

    onMount(() => {
        (async () => {
            await Ad.adScriptLoaded.promise;
            (adsbygoogle = window.adsbygoogle || []).push({});
        })();
    });

    let {children} = $props();
</script>

<!-- PC 사이드 -->
{@render children?.()}
