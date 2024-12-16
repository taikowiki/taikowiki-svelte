<script lang="ts" module>
    import type { SvelteComponent } from "svelte";

    export interface Option {
        display: string | SvelteComponent;
        value: undefined | null | string | number | boolean;
        default?: boolean;
    }
</script>

<script lang="ts">
    //CSelect means 'Custom Select'
    import COption from "./COption.svelte";

    interface Props{
        options: Option[];
        value: undefined | null | string | number | boolean;
    }

    let {options, value}: Props = $props();

    let selected = $state(options.find((option) => option?.default === true) ?? options[0]);
    $effect.pre(() => {
        value = selected.value
    });

    let opened = $state(false);

    function select(value: Option){
        selected = value;
    }
    function toggle(){
        opened = !opened;
    }
</script>

<div
    class="container"
    onclick={toggle}
    role="presentation"
>
    <div class="display">
        {selected.display}
    </div>
    {#if opened}
        <div class="option-container">
            {#each options as option}
                <COption {select} value={option} />
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
