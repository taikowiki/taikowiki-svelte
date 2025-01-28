<script lang="ts">
    import PageTitle from "$lib/components/common/PageTitle.svelte";
    import MobileMainAd from "$lib/components/layout/ads/MobileMainAd.svelte";
    import MainBanner from "$lib/components/page/(index)/MainBanner.svelte";
    import MainNotice from "$lib/components/page/(index)/MainNotice.svelte";
    import MainSearch from "$lib/components/page/(index)/MainSearch.svelte";
    import MainShortcut from "$lib/components/page/(index)/MainShortcut.svelte";
    import { Center } from "$lib/module/common/styled";

    let {data} = $props();
</script>

<PageTitle />
<Center>
    <MainSearch />
    <MainShortcut />
    <MobileMainAd/>
    <MainBanner banners={data.mainBanners} />
    <MainNotice notices={data.recentNotices} />
</Center>
