<script lang="ts">
    import HeaderItem from "./HeaderItem.svelte";
    import { getTheme } from "$lib/module/layout/theme";
    import LanguageItem from "./LanguageItem.svelte";

    let opened = false;
    function toggle() {
        opened = !opened;
    }

    const [theme] = getTheme();

    let focused = false;
</script>

<div
    class="container"
    tabindex="0"
    role="button"
    on:focusout={() => {
        opened = false;
    }}
>
    <div on:click={toggle} role="presentation">
        <HeaderItem icon="/assets/icon/globe.svg" />
    </div>
    {#if opened}
        <div class="selector" data-theme={$theme}>
            <LanguageItem text="한국어" value="ko" {toggle} />
            <LanguageItem text="日本語" value="jp" {toggle} />
            <LanguageItem text="English" value="en" {toggle} />
        </div>
    {/if}
</div>

<style>
    .container {
        position: relative;
    }

    .selector {
        min-width: 50px;
        position: absolute;

        top: calc(100% + 10px);
        left: 50%;

        transform: translateX(-50%);

        font-size: 13px;

        display: flex;
        flex-direction: column;
        align-items: center;

        box-sizing: border-box;
        border: 1px solid white;

        background-color: #cf4844;

        color: white;

        cursor: pointer;

        z-index: 10000;
    }
    .selector[data-theme="dark"] {
        border-color: #7a6f6f;

        background-color: #332e2e;
    }
</style>
