<script lang="ts">
    import { getTheme } from "$lib/module/layout/theme";

    const [theme] = getTheme();
</script>

<div class="container">
    <div class="title" data-theme={$theme}>
        <slot name="title" />
    </div>
    <div class="content">
        <slot name="content" />
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;

        max-width: 100%;
        flex: 1 0 auto;
    }

    .title {
        border-bottom: 1px solid #e5a8a7;
        margin-bottom: -1px;

        color: #5d5d64;
        font-weight: bold;

        padding-right: 10px;
    }
    .title[data-theme="dark"]{
        color: #C8CCDA;
    }

    .content {
        padding-right: 10px;

        word-break: break-all;
    }
</style>
