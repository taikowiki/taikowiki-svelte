<script lang="ts" module>
    function modifyLevelByDifficulty(
        difficulty: SongSearchOption["difficulty"],
        option: SongSearchOption,
    ) {
        switch (difficulty) {
            case undefined: {
                option.level = undefined;
                break;
            }
            case "easy": {
                !option.level
                    ? (option.level = 1)
                    : (option.level as number) > 5
                      ? (option.level = 5)
                      : {};
                break;
            }
            case "normal": {
                !option.level
                    ? (option.level = 1)
                    : (option.level as number) > 7
                      ? (option.level = 7)
                      : {};
                break;
            }
            case "hard": {
                !option.level
                    ? (option.level = 1)
                    : (option.level as number) > 8
                      ? (option.level = 8)
                      : {};
                break;
            }
            default: {
                !option.level ? (option.level = 1) : {};
                break;
            }
        }
    }
</script>

<script lang="ts">
    import TitledContainer from "$lib/components/common/TitledContainer.svelte";
    import color from "$lib/module/common/color";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";
    import { getIsMobile } from "$lib/module/layout/isMobile";
    import { getTheme } from "$lib/module/layout/theme";
    import type { SongSearchOption } from "$lib/module/common/song/types";
    import SearchBoxDifficultyItem from "./SearchBox-DifficultyItem.svelte";

    interface Props {
        option: SongSearchOption;
    }

    let { option = $bindable() }: Props = $props();

    $effect.pre(() => {
        modifyLevelByDifficulty(option.difficulty, option);
    });

    const isMobile = getIsMobile();

    const [theme] = getTheme();

    const lang = getLang();
    let i18n = $derived(getI18N($lang)["/song"]);
</script>

{#snippet difficultyItems()}
    {#each ["easy", "normal", "hard", "oni", "ura", "oniura"] as const as diff}
        <SearchBoxDifficultyItem value={diff} bind:group={option.difficulty}>
            {i18n[diff]}
        </SearchBoxDifficultyItem>
    {/each}
{/snippet}
{#snippet levelSelector()}
    <div class="level-container">
        <img
            src="/assets/icon/star-full.svg"
            alt="level"
            class="star"
            style={option.difficulty === undefined ? "opacity:0.4" : ""}
            data-theme={$theme}
        />
        <div class="level-indicator">
            {option.level || ""}
        </div>
        <input
            type="range"
            min="1"
            max="10"
            step="1"
            bind:value={option.level}
            disabled={option.difficulty === undefined ? true : false}
            style={`accent-color:${color.difficulty[option.difficulty || "oni"]};`}
        />
    </div>
{/snippet}

<TitledContainer
    title={i18n.difficulty}
    color={$theme === "light" ? "#cf4844" : "#1c1c1c"}
    titleSize="16px"
    type={`${$isMobile ? "vertical" : "horizontal"}`}
>
    <div class="wrapper">
        {@render difficultyItems()}
        {@render levelSelector()}
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
