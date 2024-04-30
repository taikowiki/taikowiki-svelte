<script lang="ts">
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";

    const theme: Writable<"light" | "dark"> = getContext("theme");
</script>

<header data-theme={$theme}>
    <div class="header-container">
        <div class="left">
            <slot name="left" />
        </div>
        <div class="right">
            <slot name="right" />
        </div>
    </div>
</header>

<style>
    header {
        width: 100%;

        display: flex;
        justify-content: center;

        height: 60px;

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
    }
    .left {
        flex-direction: row;
        justify-content: flex-start;
    }
    .right {
        flex-direction: row-reverse;
        justify-content: flex-end;
    }
</style>
