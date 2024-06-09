<script lang="ts" context="module">
    const genres: Genre[] = [
        "pops",
        "anime",
        "kids",
        "vocaloid",
        "game",
        "namco",
        "variety",
        "classic",
    ];
</script>

<script lang="ts">
    import TitledContainer from "$lib/components/common/TitledContainer.svelte";
    import { getI18N } from "$lib/module/common/i18n/i18n";
    import type { Genre } from "$lib/module/common/song/types";
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import { getTheme } from "$lib/module/layout/theme";
    import type { SongSearchOption } from "$lib/module/common/song/types";
    import SearchBoxGenreItem from "./SearchBox-GenreItem.svelte";

    export let option: SongSearchOption;

    const isMobile = getIsMobile();

    const [theme] = getTheme();

    const i18n = getI18N();
</script>

<TitledContainer
    title={$i18n.genre}
    color={$theme === "light" ? "#cf4844" : "#1c1c1c"}
    titleSize="16px"
    type={`${$isMobile ? "vertical" : "horizontal"}`}
>
    <div class="wrapper">
        {#each genres as genre}
            <SearchBoxGenreItem bind:group={option.genre} value={genre}>
                {$i18n.genres[genre]}
            </SearchBoxGenreItem>
        {/each}
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
