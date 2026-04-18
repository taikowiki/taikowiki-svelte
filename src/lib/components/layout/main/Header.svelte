<script lang="ts">
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import { getTheme } from "$lib/module/layout/theme";

    const [theme] = getTheme();
    const isMobile = getIsMobile();
</script>

<header data-theme={$theme}>
    <div class="header-container">
        <div class="left" data-isMobile={$isMobile}>
            <slot name="left" />
        </div>
        <div class="right" data-isMobile={$isMobile}>
            <slot name="right" />
        </div>
    </div>
</header>

<style>
    header {
        width: 100%;

        display: flex;
        justify-content: center;

        height: 50px;

        margin-bottom: 20px;
    }

    header[data-theme="light"]{
        background-color: #cf4844;
    }
    header[data-theme="dark"]{
        background-color: #332e2e;
    }

    .header-container {
        width: 100%;
        max-width: 1400px;

        display: flex;
        justify-content: space-between;
        align-items: center;

        box-sizing: border-box;

        padding-inline: 10px;
    }

    .left,
    .right {
        display: flex;
        column-gap: 10px;
        align-items: center;

        &[data-isMobile="true"]{
            column-gap: 5px;
        }
    }
    .left {
        flex-direction: row;
        justify-content: flex-start;
    }
    .right {
        flex-direction: row-reverse;
        justify-content: flex-end;
    }

    @media only screen and (max-width: 1000px) {
        header{
            margin-bottom: 0;
        }
    }
</style>
