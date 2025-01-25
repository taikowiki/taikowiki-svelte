<script lang="ts">
    import { getTheme } from "$lib/module/layout/theme";

    const [theme] = getTheme();
</script>

<div class="container">
    {#each new Array(30) as _}
        <div class="item" data-theme={$theme}>
            <div class="glowing" data-theme={$theme}></div>
        </div>
    {/each}
</div>

<style>
    .container {
        display: grid;
        margin-top: 10px;

        grid-template-columns: repeat(2, calc((100% - 10px) / 2));
        column-gap: 10px;
        row-gap: 10px;

        overflow:hidden;
    }

    @media only screen and (max-width: 1000px) {
        .container {
            display: flex;
            flex-direction: column;
            row-gap: 5px;
        }
    }

    .item {
        width: 100%;
        height: 90.5px;

        box-shadow: 0px 0px 3px #d4d4d4;

        border-radius: 5px;

        position:relative;

        display:flex;
        align-items: center;
    }
    .item[data-theme="dark"]{
        box-shadow: none;
        background-color: #1c1c1c;
    }

    .glowing{
        width: 200px;
        height: 100%;

        background: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(159, 159, 159, 0.134) 50%, rgba(0,0,0,0) 100%);

        position:absolute;

        animation: loading 1.1s linear infinite;
    }
    .glowing[data-theme="dark"]{
        background: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(255, 255, 255, 0.134) 50%, rgba(0,0,0,0) 100%);
    }

    @keyframes loading{
        0%{
            left: -200px;
        }
        60%{
            left: 100%;
        }
        100%{
            left: 100%;
        }
    }

    @keyframes wait{
        0%{left: 100%}
        100%{left: 100%}
    }
</style>
