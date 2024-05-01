<script lang="ts">
    import TitledContainer from "$lib/components/common/TitledContainer.svelte";
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import type { SongSearchOption } from "$lib/module/page/song/types";
    import SearchBoxGenreItem from "./SearchBox-GenreItem.svelte";

    export let tempOption: SongSearchOption;

    const isMobile = getIsMobile();
</script>

<TitledContainer
    title="장르"
    color="#cf4844"
    titleSize="16px"
    type={`${$isMobile ? 'vertical' : 'horizontal'}`}
>
    <div class="wrapper">
        <SearchBoxGenreItem bind:group={tempOption.genre} value="pops">
            POPS
        </SearchBoxGenreItem>
        <SearchBoxGenreItem bind:group={tempOption.genre} value="anime">
            애니메이션
        </SearchBoxGenreItem>
        <SearchBoxGenreItem bind:group={tempOption.genre} value="kids">
            키즈
        </SearchBoxGenreItem>
        <SearchBoxGenreItem bind:group={tempOption.genre} value="vocaloid">
            보컬로이드
        </SearchBoxGenreItem>
        <SearchBoxGenreItem bind:group={tempOption.genre} value="game">
            게임 뮤직
        </SearchBoxGenreItem>
        <SearchBoxGenreItem bind:group={tempOption.genre} value="namco">
            남코 오리지널
        </SearchBoxGenreItem>
        <SearchBoxGenreItem bind:group={tempOption.genre} value="variety">
            버라이어티
        </SearchBoxGenreItem>
        <SearchBoxGenreItem bind:group={tempOption.genre} value="classic">
            클래식
        </SearchBoxGenreItem>
    </div>
</TitledContainer>

<style>
    .wrapper {
        display: flex;
        align-items: center;
        flex-wrap: wrap;

        column-gap: 5px;
        row-gap: 5px;
        padding-inline: 5px;
        padding-top: 2px;
        padding-bottom: 2px;
    }
</style>
