<script lang="ts">
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import { getTheme } from "$lib/module/layout/theme";

    const isMobile = getIsMobile();
    const [theme] = getTheme();

    export let icon: string = "";
    export let href: string = "";
    export let useHover: boolean = true;
    export let mobileHideSlot: boolean = false;
</script>

{#if href}
    <a {href} data-theme={$theme} class="btn" class:hover={useHover}>
        {#if icon}
            <img src={icon} alt="" />
        {/if}
        {#if !mobileHideSlot || !$isMobile}
            <slot />
        {/if}
    </a>
{:else}
    <div data-theme={$theme} class="btn" class:hover={useHover}>
        {#if icon}
            <img src={icon} alt="" />
        {/if}
        {#if !mobileHideSlot || !$isMobile}
            <slot />
        {/if}
    </div>
{/if}

<style>
    .btn {
        width: auto;

        cursor: pointer;

        color: white !important;
        text-decoration: none;

        display: flex;
        flex-direction: row;
        align-items: center;
        column-gap: 4px;

        height: 30px;

        font-weight: bold;

        border-radius: 5px;

        padding-inline: 5px;
    }
    .hover:hover {
        background-color: rgba(255, 255, 255, 0.219);
    }

    .btn img {
        width: 17px;
        height: 17px;

        filter: invert(100%);
    }
</style>
