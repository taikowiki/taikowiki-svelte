<script lang="ts" context="module">
    function getUrl(type: string, level: string) {
        const origin = get(page).url.origin;
        const uri = new URL(origin);
        uri.pathname = `/diffchart/${type}/${level}`;
        return uri.href;
    }
</script>

<script lang="ts">
    import { page } from "$app/stores";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";
    import { getTheme } from "$lib/module/layout/theme";
    import { get } from "svelte/store";

    let type = $page.url.pathname.split("/")[2];
    let level = $page.params.level;

    const lang = getLang();
    $: i18n = getI18N("layout", $lang)["dedicated diffchart"];

    const [theme] = getTheme();
</script>

<div class="container">
    <select bind:value={type} data-theme={$theme}>
        <option value="clear">
            {i18n.type.clear}
        </option>
        <!--
        <option value="fc">
            {i18n.type.fc}
        </option>
        <option value="dfc">
            {i18n.type.dfc}
        </option>
        -->
    </select>
    <select bind:value={level} data-theme={$theme}>
        {#each [6, 7, 8, 9, 10] as lev}
            <option value={lev.toString()}>★{lev}</option>
        {/each}
    </select>

    <a href={getUrl(type, level)} data-theme={$theme}>이동</a>
</div>

<style>
    .container {
        width: 100%;

        display: flex;
        justify-content: center;
        align-items: center;

        column-gap: 3px;

        margin-bottom: 5px;

        flex-wrap: wrap;
    }

    select {
        height: 25px;
        border-radius: 3px;
        border-color: white;
        background-color: #f5f1f1;
        color: #3d3d3d;
        font-weight: 600;
        font-family: "Noto Sans KR";
    }
    select[data-theme="dark"] {
        background-color: #1c1c1c;
        color: white;
    }

    a {
        width: 40px;

        display: flex;
        justify-content: center;
        align-items: center;

        height: 25px;

        font-size: 14px;
        font-weight: bold;

        box-sizing: border-box;
        border: 2px solid #ff6c6c;
        border-radius: 3px;

        color: #494949;

        text-decoration: none;
    }
    a[data-theme="dark"] {
        background-color: #1c1c1c;
        color: white;

        border-color: white;
    }
</style>
