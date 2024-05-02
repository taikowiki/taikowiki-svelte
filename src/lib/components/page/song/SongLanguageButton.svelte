<script lang="ts">
    import { afterUpdate } from "svelte";
    import type { SongLang } from "./SongLanguageSelector.svelte";
    import { browser } from "$app/environment";
    import { getTheme } from "$lib/module/layout/theme";

    export let songLang: SongLang;
    export let value: SongLang;
    export let btn:HTMLElement;

    let b: HTMLElement;

    $: if(songLang === value && b){
        btn = b;
    }

    const [theme] = getTheme();
</script>

<div
    class="button"
    on:click={() => {
        songLang = value;
    }}
    bind:this={b}
    role="presentation"
    class:selected={songLang===value}
    data-theme={$theme}
>
    <slot />
</div>

<style>
    .button {
        display: flex;
        justify-content: center;
        align-items: center;

        cursor: pointer;

        font-size: 15px;
        font-weight: bold;

        padding: 3px;

        border-radius: 5px;

        border: 2px solid #cf4844;
        box-sizing: border-box;

        transition: color 0.2s;
    }
    .button[data-theme="dark"]{
        border-color: black;
    }
    .button.selected{
        color:white;

        border:0;
        
        padding-left: 5px;
        padding-right: 5px;
    }
</style>
