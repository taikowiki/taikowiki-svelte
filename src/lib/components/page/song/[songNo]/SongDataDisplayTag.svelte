<script lang="ts">
    import { getTheme } from "$lib/module/layout/theme";
    export let item: string;

    const [theme] = getTheme();
</script>

<div class="item" data-theme={$theme}>
    <span>
        {item}
    </span>
</div>

<style>
    .item {
        box-shadow: 0px 0px 3px rgb(149, 149, 149);
        display: inline-flex;
        margin: 0.2em 0.2em;
        padding: 0px 5px;
        border-radius: 5px;
    }
    .item[data-theme="dark"] {
        box-shadow: none;
        border-color: #4e4e4e;
        border-style: solid;
        border-width: 0.1em;
    }

    span{
        transform: translateY(-1px);
    }
</style>
