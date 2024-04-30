<script lang="ts">
    import { getTheme } from "$lib/module/layout/theme";

    const [theme] = getTheme();
</script>

<div class="container-container">
    <div class="container" data-theme={$theme}>
        <slot name="aside" />
        <main data-theme={$theme}>
            <slot name="main" />
        </main>
    </div>
</div>

<style>
    .container-container {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .container {
        width: 100%;
        max-width: 1400px;

        display: flex;
        flex-direction: row;
        column-gap: 20px;

        padding-inline: 20px;

        box-sizing: border-box;
    }

    main {
        width: calc(100% - 320px);

        box-sizing: border-box;

        border-radius: 10px;

        padding-inline: 15px;
    }
    main[data-theme="light"] {
        background-color: white;
    }
    main[data-theme="dark"] {
        background-color: rgb(40, 40, 40);
    }

    @media only screen and (max-width: 1000px) {
        .container {
            padding-inline: 0;
        }

        main {
            width: 100%;
        }
    }
</style>
