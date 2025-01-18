<script lang="ts" module>
    import { goto } from "$app/navigation";

    function search(option: SongSearchOption) {
        const searchParams = new URLSearchParams();

        if (option.query) {
            searchParams.set("query", option.query);
        }
        if (option.difficulty && option.level) {
            searchParams.set("difficulty", option.difficulty);
            searchParams.set("level", option.level.toString());
        }
        if (option.genre) {
            searchParams.set("genre", option.genre);
        }

        if (searchParams.size === 0) {
            goto("/song");
        } else {
            goto(`/song?${searchParams.toString()}`);
        }
    }
</script>

<script lang="ts">
    import type { SongSearchOption } from "$lib/module/common/song/types";
    import { getTheme } from "$lib/module/layout/theme";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";

    interface Props {
        opened: boolean;
        option: SongSearchOption;
    }

    let { opened = $bindable(), option = $bindable() }: Props = $props();

    function open() {
        opened = !opened;
    }

    const [theme] = getTheme();

    const lang = getLang();
    let i18n = $derived(getI18N($lang)["/song"]);
</script>

{#snippet openToggler()}
    <button class="search-detail-toggler" onclick={open} class:opened>
        <img src="/assets/icon/arrow.svg" alt="" />
    </button>
{/snippet}
{#snippet searchInput()}
    <input
        class="search-input"
        type="text"
        bind:value={option.query}
        placeholder={i18n?.placeholder}
        onkeypress={(event) => {
            if (event.key === "Enter") {
                search(option);
            }
        }}
        enterkeyhint="search"
        data-theme={$theme}
    />
{/snippet}
{#snippet searchButton()}
    <button
        class="search-button"
        onclick={() => {
            search(option);
        }}
    >
        <img src="/assets/icon/search.svg" alt="" />
    </button>
{/snippet}

<div class="search-container" data-theme={$theme}>
    {@render openToggler()}
    {@render searchInput()}
    {@render searchButton()}
</div>

<style>
    .search-container {
        width: 100%;
        height: 40px;

        display: flex;

        border-radius: 5px;
        overflow: hidden;
    }
    .search-detail-toggler {
        width: 40px;
        height: 40px;

        font-size: 20px;

        background-color: #cf4844;
        color: white;
        border: 0;

        cursor: pointer;

        display: flex;
        justify-content: center;
        align-items: center;
    }
    .search-detail-toggler > img {
        width: 20px;
        height: 20px;

        filter: invert(100%);

        transform: translate(2px, 1px);

        transition: transform 0.2s;
    }
    .search-detail-toggler.opened > img {
        transform: rotate(180deg) translate(-2px, 0px);
    }
    /*
    .search-detail-toggler > span {
        display: block;
        transform: rotate(90deg) translate(2px, -2px);
        transition: transform 0.2s;
    }
    .search-detail-toggler.opened > span {
        display: block;
        transform: rotate(270deg) translate(1px, 0px);
    }
    */

    .search-input {
        width: calc(100% - 80px);
        height: 100%;

        box-sizing: border-box;

        border: 3px solid #cf4844;

        font-size: 17px;
        padding-inline: 5px;
    }
    .search-input:focus {
        outline: 0;
    }
    .search-input[data-theme="dark"] {
        color: inherit;
        background-color: inherit;
    }

    .search-button {
        width: 40px;
        height: 40px;

        font-size: 20px;

        background-color: #cf4844;
        border: 0;

        cursor: pointer;

        display: flex;
        justify-content: center;
        align-items: center;
    }
    .search-button > img {
        width: 20px;
        height: 20px;

        filter: invert(100%);
    }

    .search-container[data-theme="dark"] > .search-detail-toggler {
        background-color: #1c1c1c;
    }
    .search-container[data-theme="dark"] > .search-input {
        border-color: #1c1c1c;
    }
    .search-container[data-theme="dark"] > .search-input::placeholder {
        color: white;
        opacity: 0.7;
    }
    .search-container[data-theme="dark"] > .search-button {
        background-color: #1c1c1c;
    }
</style>
