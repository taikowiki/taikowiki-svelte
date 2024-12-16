<script lang="ts">
    import { getTheme } from "$lib/module/layout/theme";
    import type { Snippet } from "svelte";

    const [theme] = getTheme();

    interface Props {
        title?: string;
        titleHref?: string;
        align?: "left" | "center" | "right";
        icon?: string;
        children?: Snippet;
    }

    let {
        title = "",
        titleHref = "",
        align = "center",
        icon = "",
        children,
    }: Props = $props();
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
        {@render children?.()}
    </div>
</div>

<style>
    .item {
        width: 100%;
        box-sizing: border-box;
        border-radius: 10px;
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
    .title span {
        display: flex;
        align-items: center;

        column-gap: 5px;
    }
    .title img {
        width: 20px;
        height: 20px;
    }
    .title[data-theme="dark"] img {
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
