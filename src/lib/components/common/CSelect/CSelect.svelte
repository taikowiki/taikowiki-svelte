<script lang="ts" context="module">
    import type { SvelteComponent } from "svelte";

    export interface Option {
        display: string | SvelteComponent;
        value: undefined | null | string | number | boolean;
        default?: boolean;
    }
</script>

<script lang="ts">
    import COption from "./COption.svelte";

    export let options: Option[];
    let selected =
        options.find((option) => option?.default === true) ?? options[0];
    export let value: undefined | null | string | number | boolean;
    $: value = selected.value;

    let opened = false;
</script>

<div
    class="container"
    on:click={() => {
        opened = !opened;
    }}
    role="presentation"
>
    <div class="display">
        {selected.display}
    </div>
    {#if opened}
        <div class="option-container">
            {#each options as option}
                <COption bind:selected value={option} />
            {/each}
        </div>
    {/if}
</div>

<style>
    .container {
        position: relative !important;
    }

    .option-container {
        top: 100%;

        position: absolute;
    }
</style>
