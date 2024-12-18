<script lang="ts">
    import type { MainBanner } from "$lib/module/common/banner/types";

    interface Props {
        banners: MainBanner[];
    }

    let { banners }: Props = $props();
</script>

{#if banners.length > 0}
    <div class="banner-container">
        {#each banners as banner}
            <a
                class="banner"
                class:wide={banner.size === "wide"}
                class:narrow={banner.size === "narrow"}
                href={banner.href}
                target={banner.target}
            >
                <img src={banner.src} alt="main banner" />
            </a>
        {/each}
    </div>
{/if}

<style>
    .banner-container {
        width: min(700px, 100%);

        display: flex;
        flex-wrap: wrap;
        row-gap: 10px;
        column-gap: 10px;
        justify-content: center;

        margin-top: 15px;
    }

    .banner.wide {
        width: 100%;
    }

    .banner.narrow {
        width: min(345px, 100%);
    }

    .banner > img {
        width: 100%;
        border-radius: 5px;
    }
</style>
