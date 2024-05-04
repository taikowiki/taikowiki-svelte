<script lang="ts" context="module">
    function modifyLevelByDifficulty(
        difficulty: SongSearchOption["difficulty"],
        tempOption: SongSearchOption,
    ) {
        switch (difficulty) {
            case undefined: {
                tempOption.level = undefined;
                break;
            }
            case "easy": {
                !tempOption.level
                    ? (tempOption.level = 1)
                    : (tempOption.level as number) > 5
                      ? (tempOption.level = 5)
                      : {};
                break;
            }
            case "normal": {
                !tempOption.level
                    ? (tempOption.level = 1)
                    : (tempOption.level as number) > 7
                      ? (tempOption.level = 7)
                      : {};
                break;
            }
            case "hard": {
                !tempOption.level
                    ? (tempOption.level = 1)
                    : (tempOption.level as number) > 8
                      ? (tempOption.level = 8)
                      : {};
                break;
            }
            default: {
                !tempOption.level ? (tempOption.level = 1) : {};
                break;
            }
        }
    }
</script>

<script lang="ts">
    import TitledContainer from "$lib/components/common/TitledContainer.svelte";
    import color from "$lib/module/common/color";
    import { getI18N } from "$lib/module/common/i18n/i18n";
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import { getTheme } from "$lib/module/layout/theme";
    import type { SongSearchOption } from "$lib/module/page/song/types";
    import SearchBoxDifficultyItem from "./SearchBox-DifficultyItem.svelte";

    export let tempOption: SongSearchOption;

    $: modifyLevelByDifficulty(tempOption.difficulty, tempOption);

    const isMobile = getIsMobile();

    const [theme] = getTheme();

    const i18n = getI18N();
</script>

<TitledContainer
    title={$i18n.difficulty}
    color={$theme === "light" ? "#cf4844" : "#1c1c1c"}
    titleSize="16px"
    type={`${$isMobile ? "vertical" : "horizontal"}`}
>
    <div class="wrapper">
        <SearchBoxDifficultyItem
            value="easy"
            bind:group={tempOption.difficulty}
        >
            {$i18n.easy}
        </SearchBoxDifficultyItem>
        <SearchBoxDifficultyItem
            value="normal"
            bind:group={tempOption.difficulty}
        >
            {$i18n.normal}
        </SearchBoxDifficultyItem>
        <SearchBoxDifficultyItem
            value="hard"
            bind:group={tempOption.difficulty}
        >
            {$i18n.hard}
        </SearchBoxDifficultyItem>
        <SearchBoxDifficultyItem value="oni" bind:group={tempOption.difficulty}>
            {$i18n.omote}
        </SearchBoxDifficultyItem>
        <SearchBoxDifficultyItem value="ura" bind:group={tempOption.difficulty}>
            {$i18n.ura}
        </SearchBoxDifficultyItem>
        <SearchBoxDifficultyItem
            value="oniura"
            bind:group={tempOption.difficulty}
        >
            {$i18n.oni}
        </SearchBoxDifficultyItem>
        <div class="level-container">
            <img
                src="/assets/icon/star-full.svg"
                alt="level"
                class="star"
                style={tempOption.difficulty === undefined ? "opacity:0.4" : ""}
                data-theme={$theme}
            />
            <div class="level-indicator">
                {tempOption.level || ""}
            </div>
            <input
                type="range"
                min="1"
                max="10"
                step="1"
                bind:value={tempOption.level}
                disabled={tempOption.difficulty === undefined ? true : false}
                style={`accent-color:${color.difficulty[tempOption.difficulty || "oni"]};`}
            />
        </div>
    </div>
</TitledContainer>

<style>
    .wrapper {
        width: 100%;

        display: flex;
        flex-direction: row;
        align-items: center;

        flex-wrap: wrap;

        column-gap: 5px;
        row-gap: 5px;
        padding-inline: 5px;
        padding-top: 2px;
        padding-bottom: 2px;
    }

    .level-container {
        width: calc(100% - 375px);
        display: flex;
        flex-direction: row;
        align-items: center;
        column-gap: 5px;
    }

    .star {
        width: 20px;
        height: 20px;
    }
    .star[data-theme="dark"] {
        filter: invert(100%);
    }

    .level-indicator {
        width: 15px;
    }

    input {
        width: calc(100% - 35px);
        max-width: 300px;
    }
    input:disabled {
        opacity: 0.4;
    }

    @media only screen and (max-width: 1000px) {
        .level-container {
            width: 100%;
        }
        input {
            width: calc(100% - 55px);
            max-width: none;
        }
    }
</style>
