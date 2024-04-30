<script lang="ts">
    import { getTheme } from "$lib/module/layout/theme";

    const [theme] = getTheme();

    export let title: string | undefined = undefined;
    export let titleHref: string = '';
    export let align:'left'|'center'|'right' = 'center';
</script>

<div class="item" data-theme={$theme}>
    {#if title}
        <a class="title" href={titleHref}>
            <span>
                {title}
            </span>
            {#if titleHref}
                <span>
                    〉
                </span>
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
        border-radius: 10px;
        padding-inline: 15px;

        display:flex;
        flex-direction: column;

        padding-block: 10px;
    }
    .item[data-theme="light"] {
        background-color: white;
    }
    .item[data-theme="dark"] {
        background-color: rgb(40, 40, 40);
    }

    .title{
        width: 100%;
        height: 40px;
        
        display:flex;
        justify-content: center;
        align-items: center;

        color:inherit;
        text-decoration: none;

        font-size: 20px;
        font-weight: bold;
    }
    .title:has(*:nth-child(2)){
        justify-content: space-between;
    }

    .content{
        display:flex;
        flex-direction: column;
    }
    .content[data-align="left"]{
        align-items: flex-start;
    }
    .content[data-align="right"]{
        align-items: flex-end;
    }
    .content[data-align="center"]{
        align-items: center;
    }
</style>
