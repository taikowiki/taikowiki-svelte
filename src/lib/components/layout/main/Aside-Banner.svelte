<script lang="ts">
    import type { AsideBanner } from "$lib/module/common/banner/types";
    import AsideItem from "./AsideItem.svelte";

    export let banners: AsideBanner[];
</script>

{#each banners as banner}
    <AsideItem>
        <a class="banner" href={banner.href} target={banner.target}>
            <img src={banner.src} alt="aside banner" />
        </a>
    </AsideItem>
{/each}

<style>
    .banner {
        width: 100%;
    }
    img {
        border-radius: 10px;
    }
</style>
