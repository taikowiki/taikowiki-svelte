<script lang="ts">
    import { getTheme } from "$lib/module/layout/theme";

    const [theme, toggle] = getTheme();
</script>

<div
    class={`container ${$theme === "light" ? "container-light" : "container-dark"}`}
    role="presentation"
    on:click={toggle}
>
    <div
        class={`marker ${$theme === "light" ? "marker-light" : "marker-dark"}`}
    >
        {#if $theme === "light"}
            <img src="/assets/icon/light.svg" alt="theme logo"/>
        {:else}
            <img src="/assets/icon/dark.svg" style="filter:invert(100%);" alt="theme logo"/>
        {/if}
    </div>
</div>

<style>
    .container {
        width: 50px;
        height: 25px;

        border-radius: 50vh;
        box-sizing: border-box;

        cursor: pointer;
        user-select: none;
    }

    .container-dark {
        border: 1px solid white;
    }

    .container-light {
        border: 1px solid black;
    }

    .marker {
        width: 23px;
        height: 23px;

        border-radius: 50vh;

        transition: transform 0.2s;

        display:flex;
        justify-content: center;
        align-items: center;
    }

    .marker-light {
        background-color: #e7645f;
    }

    .marker-dark {
        background-color: black;

        transform: translateX(25px);
    }

    .marker img{
        width:80%;
        height:80%;
    }
</style>