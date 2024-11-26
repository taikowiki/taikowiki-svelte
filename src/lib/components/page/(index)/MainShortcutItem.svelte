<script lang="ts">
    import { getTheme } from "$lib/module/layout/theme";

    export let src: string;
    export let name: string;
    export let href: string;

    const [theme] = getTheme();

    /**
     * @todo 문서기능 개발 후 제거
     */
    function noWiki() {
        if (href === "/w") {
            return 'javascript:alert("WIP")';
        }
        return href;
    }
</script>

<a class="item" href={noWiki()} data-theme={$theme}>
    <div class="item-icon" data-theme={$theme}>
        <img {src} alt={name} />
    </div>
    <span>
        {name}
    </span>
</a>

<style>
    .item {
        width: 65px;
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 3px;

        cursor: pointer;

        font-size: 13px;

        color: black;
        &:hover {
            color: #cf4844;
        }
    }
    .item[data-theme="dark"] {
        color: white;
        &:hover {
            color: #e1a743;
        }
    }

    .item-icon {
        width: 45px;
        height: 45px;

        display: flex;
        justify-content: center;
        align-items: center;

        border-radius: 10px;

        background-color: #cf4844;
    }
    .item-icon[data-theme="dark"] {
        background-color: #1c1c1c;
    }

    img {
        width: 25px;
        height: 25px;
        filter: invert(100%);
    }

    span{
        text-align: center;
    }
</style>
