<script lang="ts">
    import DonderData from "$lib/components/page/auth/user/donder/DonderData.svelte";
    import DonderRating from "$lib/components/page/auth/user/donder/DonderRating.svelte";
    import { getRating } from "@taiko-wiki/taiko-rating";
    import { getIsMobile } from "$lib/module/layout/isMobile.js";
    import { Center } from "$lib/module/common/styled";
    import createSSC from "styled-svelte-component/svelte4";
    import SongRatings from "$lib/components/page/auth/user/donder/SongRatings.svelte";

    export let data;

    let ratingResult: ReturnType<typeof getRating>;

    const { donderData, songDatas } = data;

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

    const isMobile = getIsMobile();
</script>

{#if donderData === null}
    동더히로바 데이터가 없습니다. 동더히로바 데이터를 업로드해주세요.
{:else}
    <Center>
        <div class="data-container" data-isMobile={$isMobile}>
            {#if ratingResult}
                <DonderData {donderData} {Container} />
            {/if}
            <DonderRating {donderData} {Container} bind:ratingResult />
        </div>
        <SongRatings
            songRatingDatas={ratingResult?.songRatingDatas}
            {songDatas}
            {donderData}
        />
    </Center>
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
</style>
