<script lang="ts">
    import { Song } from "$lib/module/song";
    import { getTheme } from "$lib/module/layout/theme";
    import type { Snippet } from "svelte";

    interface Props {
        songLang: Song.SongLang;
        value: Song.SongLang;
        btn?: HTMLElement;
        children?: Snippet;
    }

    let { songLang = $bindable(), btn = $bindable(), value, children }: Props = $props();

    let b: HTMLElement | undefined = $state();

    $effect.pre(() => {
        if (songLang === value && b) {
            btn = b;
        }
    });

    const [theme] = getTheme();
</script>

<div
    class="button"
    onclick={() => {
        songLang = value;
    }}
    bind:this={b}
    role="presentation"
    class:selected={songLang === value}
    data-theme={$theme}
>
    {@render children?.()}
</div>

<style>
    .button {
        display: flex;
        justify-content: center;
        align-items: center;

        cursor: pointer;

        font-size: 14px;
        font-weight: bold;

        padding: 3px;

        border-radius: 5px;

        border: 2px solid #cf4844;
        box-sizing: border-box;

        transition: color 0.2s;
    }
    .button[data-theme="dark"] {
        border-color: #1c1c1c;
    }
    .button.selected {
        color: white;

        border: 0;

        font-weight: bold;

        padding-inline: 5px;
        padding-block: 5px;
    }
</style>
