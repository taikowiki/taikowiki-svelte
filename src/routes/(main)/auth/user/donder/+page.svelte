<script lang="ts">
    import DonderData from "$lib/components/page/auth/user/donder/DonderData.svelte";
    import DonderRating from "$lib/components/page/auth/user/donder/DonderRating.svelte";
    import { getIsMobile } from "$lib/module/layout/isMobile.js";
    import { Center } from "$lib/module/common/styled";
    import createSSC from "styled-svelte-component/svelte4";
    import SongRatings from "$lib/components/page/auth/user/donder/SongRatings.svelte";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n.js";
    import PageTitle from "$lib/components/common/PageTitle.svelte";
    import Loading from "$lib/components/common/Loading.svelte";
    import DonderSection from "$lib/components/page/auth/user/donder/DonderSection.svelte";
    import MeasureTable from "$lib/components/page/measures/MeasureTable.svelte";
    import { getTheme } from "$lib/module/layout/theme.js";

    export let data;

    const { donderData, songDatas, loadingPromise } = data;

    const Container = createSSC(
        "div",
        () => `
        display:flex;
        flex-direction:column;
        align-items:center;
        width: 300px;
        max-width: 100%;
        row-gap: 5px;
    `,
    );

    const opened = {
        songRatings: false,
        measureTable: false,
        explanation: false
    };

    const isMobile = getIsMobile();
    const [theme] = getTheme();
    const lang = getLang();
    $: i18n = getI18N("/auth/user/donder", $lang);
    $: titleI18n = getI18N("other", $lang).title["/auth/user"];
    $: newI18n = getI18N($lang).page.donder;
</script>

<PageTitle title={titleI18n} />

{#if donderData && donderData.scoreData && loadingPromise}
    {#await loadingPromise}
        <Loading />
    {:then loadedData}
        {@const { ratings, measures, rankingData, tier } = loadedData}
        <Center>
            <div class="data-container" data-isMobile={$isMobile}>
                <DonderData {donderData} {Container} />
                <DonderRating {Container} {ratings} {tier} {rankingData}/>
            </div>
            <DonderSection
                bind:opened={opened.songRatings}
                sectionName={newI18n.section.song}
            >
                <SongRatings {ratings} {songDatas} {donderData} opened={opened.songRatings}/>
            </DonderSection>
            <DonderSection
                bind:opened={opened.measureTable}
                sectionName={newI18n.section.measure}
            >
                <MeasureTable {measures} {songDatas} />
            </DonderSection>
            <DonderSection
                bind:opened={opened.explanation}
                sectionName={newI18n.section.explanation}
            >
                {@html i18n.explanation}
            </DonderSection>
        </Center>
    {/await}
{:else}
    <div class="guide" data-theme={$theme}>
        {@html i18n.uploadGuide}
    </div>
{/if}

<style>
    .data-container {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }

    .data-container[data-isMobile="true"] {
        flex-direction: column;
        align-items: center;
        row-gap: 10px;
    }

    /*
    .data-ranking{
        margin-top: 20px;
    }
    */

    :global(.guide code) {
        background-color: rgb(219, 219, 219);
        display: inline-block;
        padding-inline: 4px;
        padding-block: 3px;

        border-radius: 4px;
    }

    :global(.guide[data-theme="dark"] code) {
        background-color: rgb(87, 87, 87);
    }

    :global(.guide pre code) {
        width: 100%;
        display: block;
        overflow-x: auto;
        padding-inline: 0px;
        padding-block: 5px;
        border-radius: 0px;
    }
</style>
