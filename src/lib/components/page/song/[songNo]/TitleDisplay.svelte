<script lang="ts">
    import { getTheme } from "$lib/module/layout/theme";

    export let title: string;
    export let songNo: string;

    const [theme] = getTheme();
</script>

<h1 class="container">
    <div class="title">
        {title}
    </div>
    <a class="icon-container" href={`/song/${songNo}/edit`} data-theme={$theme}>
        <img class="icon" src="/assets/icon/pen.svg" alt="edit" />
    </a>
</h1>

<style>
    .container {
        display: flex;
        flex-direction: row;
        align-items: flex-start;

        row-gap: 15px;

        margin-bottom: 15px;
    }
    .title {
        flex: 1 0 auto;
        max-width: calc(100% - 30px);

        font-weight: bold;
        font-size: 35px;
    }

    .icon {
        width: 20px;
        height: 20px;

        filter: invert(100%);
    }
    .icon-container {
        width: 30px;
        height: 30px;

        display: flex;
        justify-content: center;
        align-items: center;

        background-color: #cf4844;

        border-radius: 5px;
        margin-top: 10px;
    }
    .icon-container[data-theme="dark"]{
        background-color: #1c1c1c;
    }
</style>
