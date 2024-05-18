<script lang="ts">
    import { getTheme } from "$lib/module/layout/theme";

    const [theme] = getTheme();

    export let icon: string = "";
    export let href: string = "";
</script>

{#if href}
    <a {href} data-theme={$theme} class="btn">
        {#if icon}
            <img src={icon} alt="" />
        {/if}
        <slot />
    </a>
{:else}
    <div data-theme={$theme} class="btn">
        {#if icon}
            <img src={icon} alt="" />
        {/if}
        <slot />
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
    .btn:hover {
        background-color: rgba(255, 255, 255, 0.219);
    }

    .btn img {
        width: 17px;
        height: 17px;

        filter: invert(100%);
    }
</style>
