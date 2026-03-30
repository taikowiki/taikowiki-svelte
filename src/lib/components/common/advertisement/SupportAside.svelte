<script>
    import AsideItem from "$lib/components/layout/main/AsideItem.svelte";
    import light from "$lib/assets/img/support/support_light.jpg";
    import dark from "$lib/assets/img/support/support_dark.png";
    import { getTheme } from "$lib/module/layout/theme";

    const [theme] = getTheme();
</script>

<AsideItem>
    <a href="/donate">
        {#if $theme === "light"}
            <img src={light} alt="support" />
        {:else}
            <img src={dark} alt="support" />
        {/if}
    </a>
</AsideItem>

<style>
    img {
        width: 100%;
        height: auto;
    }
</style>
