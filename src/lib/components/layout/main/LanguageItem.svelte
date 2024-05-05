<script lang="ts">
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";

    export let text:string;
    export let value:string;
    export let toggle:() => void;

    const lang = getContext('lang') as Writable<string>;
</script>

<div class="item" role="presentation" on:click={() => {lang?.set(value); window.localStorage.lang = value; toggle()}}>
    {text}
</div>

<style>
    

    .item{
        display:flex;
        justify-content: center;
        align-items: center;
    }
    .item:hover{
        width: 100%;
        background-color: white;
        color:black;
    }
</style>