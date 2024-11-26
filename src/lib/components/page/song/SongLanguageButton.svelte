<script lang="ts">
    import type { SongLang } from "$lib/module/common/song/types";
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

        font-size: 14px;
        font-weight: bold;

        padding: 3px;

        border-radius: 5px;

        border: 2px solid #cf4844;
        box-sizing: border-box;

        transition: color 0.2s;
    }
    .button[data-theme="dark"]{
        border-color: #1c1c1c;
    }
    .button.selected{
        color:white;

        border:0;

        font-weight: bold;
        
        padding-inline: 5px;
        padding-block: 5px;
    }
</style>
