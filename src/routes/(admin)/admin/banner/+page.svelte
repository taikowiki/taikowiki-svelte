<script lang="ts">
    import AdminAsideBannerEditor from "$lib/components/page/admin/banner/AdminAsideBannerEditor.svelte";
    import AdminMainBannerEditor from "$lib/components/page/admin/banner/AdminMainBannerEditor.svelte";

    export let data;

    if(!data.mainBanners){
        data.mainBanners = [];
    }
    if(!data.asideBanners){
        data.asideBanners = [];
    }
</script>

{#if data.mainBanners}
    <AdminMainBannerEditor banners={data.mainBanners} />
{/if}

{#if data.asideBanners}
    <AdminAsideBannerEditor banners={data.asideBanners} />
{/if}