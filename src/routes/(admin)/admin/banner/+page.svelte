<script lang="ts">
    import AdminAsideBannerEditor from "$lib/components/page/admin/banner/AdminAsideBannerEditor.svelte";
    import AdminMainBannerEditor from "$lib/components/page/admin/banner/AdminMainBannerEditor.svelte";

    let {data} = $props();

    let mainBanners = $state(data.mainBanners ?? []);
    let asideBanners = $state(data.asideBanners ?? []);
</script>

{#if data.mainBanners}
    <AdminMainBannerEditor banners={mainBanners} />
{/if}

{#if data.asideBanners}
    <AdminAsideBannerEditor banners={asideBanners} />
{/if}