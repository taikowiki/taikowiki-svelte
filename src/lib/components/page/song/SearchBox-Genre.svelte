<script lang="ts" module>
    const genres: Song.Genre[] = [
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
    import { getI18N, getLang } from "$lib/module/i18n";
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import { getTheme } from "$lib/module/layout/theme";
    import { Song } from "$lib/module/song";
    import SearchBoxGenreItem from "./SearchBox-GenreItem.svelte";

    interface Props {
        option: Song.SongSearchOption;
    }

    let { option = $bindable() }: Props = $props();

    const isMobile = getIsMobile();

    const [theme] = getTheme();

    const lang = getLang();
    let i18n = $derived(getI18N($lang)["/song"]);
</script>

{#snippet genreItems()}
    {#each genres as genre}
        <SearchBoxGenreItem bind:genre={option.genre} value={genre}>
            {i18n.genres[genre]}
        </SearchBoxGenreItem>
    {/each}
{/snippet}

<TitledContainer
    title={i18n.genre}
    color={$theme === "light" ? "#cf4844" : "#1c1c1c"}
    titleSize="16px"
    type={`${$isMobile ? "vertical" : "horizontal"}`}
>
    <div class="wrapper">
        {@render genreItems()}
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
