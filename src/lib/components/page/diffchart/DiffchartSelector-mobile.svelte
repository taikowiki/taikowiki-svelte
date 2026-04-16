<script lang="ts">
    import { page } from "$app/stores";
    import { getI18N, getLang } from "$lib/module/i18n";
    import { getTheme } from "$lib/module/layout/theme";
    import { goto, preloadData } from "$app/navigation";

    let type = $page.url.pathname.split("/")[2] || "custom";
    let level = $page.params.level || "10";

    const lang = getLang();
    $: i18n = getI18N("/diffchart", $lang);

    const [theme] = getTheme();
    const handleDiffChart = () => {
        if (type === "custom") {
            goto("/diffchart/custom");
        } else {
            const url = `/diffchart/${type}/${level}`;
            goto(url);
        }
    };
</script>

<div class="container">
    <select bind:value={type} data-theme={$theme} on:change={handleDiffChart}>
        <option value="custom">
            {i18n.custom}
        </option>
        <option value="clear">
            {i18n.type.clear}
        </option>
        <option value="fc">
            {i18n.type.fc}
        </option>
        <option value="dfc">
            {i18n.type.dfc}
        </option>
    </select>
    {#if type === "clear"}
        <select
            bind:value={level}
            data-theme={$theme}
            on:change={handleDiffChart}
        >
            {#each [6, 7, 8, 9, 10] as lev}
                <option value={lev.toString()}>★{lev}</option>
            {/each}
        </select>
    {:else if type === "fc" || type === "dfc"}
        <select
            bind:value={level}
            data-theme={$theme}
            on:change={handleDiffChart}
        >
            {#each [10] as lev}
                <option value={lev.toString()}>★{lev}</option>
            {/each}
        </select>
    {/if}
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

    /*
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
    }*/
</style>
