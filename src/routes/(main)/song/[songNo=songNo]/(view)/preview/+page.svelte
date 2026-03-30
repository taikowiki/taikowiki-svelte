<script lang="ts">
    import { Song } from "$lib/module/song";
    import { onMount } from "svelte";
    import * as TjaParser from "tja-parser";
    import Modal from "$lib/components/common/Modal.svelte";
    import GenreDisplay from "$lib/components/page/song/[songNo]/GenreDisplay.svelte";
    import { getTheme } from "$lib/module/layout/theme.js";
    import TjaPreview from "$lib/components/page/song/[songNo]/preview/TjaPreview.svelte";
    import TjaRenderer from "$lib/components/page/song/[songNo]/preview/TjaRenderer.svelte";
    import { Util } from "$lib/module/util";
    import { getIsMobile } from "$lib/module/layout/isMobile.js";

    let { data } = $props();

    let difficulty = $state<Song.Difficulty>("oni");
    let courseDiff = $derived(
        difficulty === "ura" ? "edit" : (difficulty as TjaParser.Difficulty),
    );
    let branch = $state<"master" | "advanced" | "normal">("master");
    let isAnnotationMode = $state(false);
    let loading = $state(true);
    let hasError = $state(false);
    let errorMsg = $state("");

    const isMobile = getIsMobile();

    $effect(() => {
        if (difficulty) load();
    });

    let loadPreview = $state<() => Promise<void>>(async () => void 0);
    let loadRenderer = $state<() => Promise<void>>(async () => void 0);

    const [theme] = getTheme();

    onMount(load);

    async function load() {
        loading = true;
        try {
            await loadPreview?.();
        } catch (err) {
            console.error(err);
            loading = false;
            hasError = true;
            errorMsg = "An error occured loading previewer";
            return;
        }
        try {
            await loadRenderer?.();
        } catch (err) {
            console.error(err);
            loading = false;
            hasError = true;
            errorMsg = "An error occured loading renderer";
            return;
        }
        loading = false;
    }
</script>

<GenreDisplay genres={data.song.genre} />
<h1>
    {data.song.title}
</h1>
{@render difficultySelector()}
<TjaPreview
    tja={data.tja}
    difficulty={courseDiff}
    bind:load={loadPreview}
    bind:branch
/>
<div class="gap"></div>
<TjaRenderer
    tja={data.tja}
    difficulty={courseDiff}
    bind:load={loadRenderer}
    {branch}
    songNo={data.song.songNo}
/>
<Modal bind:show={loading}>Loading...</Modal>
<Modal bind:show={hasError}>
    <div>{errorMsg}</div>
    <button
        onclick={() => (hasError = false)}
        class="standard"
        data-theme={$theme}>Close</button
    >
</Modal>

{#snippet difficultySelector()}
    <div class="difficulty-container">
        {#each ["easy", "normal", "hard", "oni", "ura"] as const as diff}
            {#if data.song.courses[diff]}
                <label
                    class="difficulty-label"
                    class:isMobile={$isMobile}
                    style={`background-color:${Util.Color.difficulty[diff]};`}
                    data-theme={$theme}
                >
                    <input type="radio" bind:group={difficulty} value={diff} />
                    ★{data.song.courses[diff].level}
                </label>
            {/if}
        {/each}
    </div>
{/snippet}

<style>
    h1 {
        margin: 0;
        margin-bottom: 20px;
        font-size: 35px;
    }

    .difficulty-container {
        display: flex;
        flex-direction: row;
        column-gap: 5px;
    }

    .difficulty-label {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 60px;
        padding-block: 5px;
        padding-bottom: 7px;
        border-radius: 10px 10px 0px 0px;

        font-size: 18px;
        font-weight: bold;

        cursor: pointer;
        color: white;

        &.isMobile {
            padding: 0 0 2px 0;
            width: 45px;
            padding-block: 5px;
            padding-bottom: 7px;
        }
        &:not(:has(input:checked)) {
            opacity: 0.4;
        }
        & input {
            display: none;
        }
    }

    .gap{
        height: 10px;
    }
</style>
