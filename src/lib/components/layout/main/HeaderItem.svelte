<script lang="ts">
    import { getTheme } from "$lib/module/layout/theme";

    const [theme] = getTheme();

    export let icon:string = "";
    export let href:string = ""
</script>

<a {href} data-theme={$theme}>
    {#if icon}
        <img src={icon} alt=""/>
    {/if}
    <slot/>
</a>

<style>
    a{
        width: auto;

        color:white;
        text-decoration: none;

        display:flex;
        flex-direction: row;
        align-items: center;
        column-gap: 2px;

        height: 30px;

        font-weight: bold;

        border-radius: 5px;

        padding-inline: 5px;
    }
    a:hover{
        background-color: rgba(255, 255, 255, 0.219);
    }

    a img{
        width:17px;
        height:17px;

        filter: invert(100%);
    }
</style>