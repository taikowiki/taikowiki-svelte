<script lang="ts">
    import { page } from "$app/stores";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";
    import { getTheme } from "$lib/module/layout/theme";
    import { goto, preloadData } from "$app/navigation";

    let type = $page.url.pathname.split("/")[2];
    let level = $page.params.level;

    const lang = getLang();
    $: i18n = getI18N("layout", $lang)["dedicated diffchart"];

    const [theme] = getTheme();
    const handleDiffChard = () => {
        const url = `/diffchart/${type}/${level}`
        preloadData(url).then(() => goto(url))
    }
</script>

<div class="container">
    <select bind:value={type} data-theme={$theme} on:change={handleDiffChard}>
        <option value="clear">
            {i18n.type.clear}
        </option>
    </select>
    <select bind:value={level} data-theme={$theme} on:change={handleDiffChard}>
        {#each [6, 7, 8, 9, 10] as lev}
            <option value={lev.toString()}>★{lev}</option>
        {/each}
    </select>
</div>

<style>
    select {
        height: 25px;
        border-radius: 3px;
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

        box-sizing: border-box;
        border: 1px solid #767676;
        border-radius: 3px;

        color: black;

        text-decoration: none;
    }
    a[data-theme="dark"] {
        background-color: #1c1c1c;
        color:white;
    }
</style>
