<script lang="ts">
    import { getTheme } from "$lib/module/layout/theme";

    const [theme] = getTheme();

    export let title: string = "";
    export let titleHref: string = "";
    export let align: "left" | "center" | "right" = "center";
    export let icon: string = "";
</script>

<div class="item" data-theme={$theme}>
    {#if title}
        <a class="title" href={titleHref} data-theme={$theme}>
            <span>
                {#if icon}
                    <img src={icon} alt="icon" />
                {/if}
                {title}
            </span>
            {#if titleHref}
                <span>〉</span>
            {/if}
        </a>
    {/if}
    <div class="content" data-align={align}>
        <slot />
    </div>
</div>

<style>
    .item {
        width: 100%;
        box-sizing: border-box;
        border-radius: 20px;
        padding-inline: 15px;

        display: flex;
        flex-direction: column;

        padding-block: 10px;
    }
    .item[data-theme="light"] {
        background-color: white;
    }
    .item[data-theme="dark"] {
        background-color: rgb(40, 40, 40);
    }

    .title {
        width: 100%;
        height: 40px;

        display: flex;
        justify-content: center;
        align-items: center;

        color: inherit;
        text-decoration: none;

        font-size: 20px;
        font-weight: bold;
    }
    .title:has(*:nth-child(2)) {
        justify-content: space-between;
    }
    .title span{
        display:flex;
        align-items: center;

        column-gap: 5px;
    }
    .title img {
        width: 20px;
        height: 20px;
    }
    .title[data-theme="dark"] img{
        filter: invert(100%);
    }

    .content {
        display: flex;
        flex-direction: column;
    }
    .content[data-align="left"] {
        align-items: flex-start;
    }
    .content[data-align="right"] {
        align-items: flex-end;
    }
    .content[data-align="center"] {
        align-items: center;
    }
</style>
