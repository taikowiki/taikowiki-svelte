<script lang="ts">
    import { getContext, onMount, setContext, type Snippet } from "svelte";
    import { writable, type Writable } from "svelte/store";

    interface Props{
        children?: Snippet;
    }

    let {children}: Props = $props();

    let aside = getContext('asideElement') as Writable<HTMLElement>;
</script>

<aside bind:this={$aside}> 
    {@render children?.()}
</aside>

<style>
    aside{
        width: 250px;

        display:flex;
        flex-direction: column;
        row-gap: 10px;
    }

    @media only screen and (max-width:1000px){
        aside{
            display:none;
        }
    }
</style>