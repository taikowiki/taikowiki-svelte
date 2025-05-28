<script lang="ts">
    import type { Dani } from "$lib/module/dani/types";
    import DaniCondition from "./DaniCondition.svelte";

    interface Props {
        conditions: Dani.Condition[];
    }

    let { conditions }: Props = $props();
</script>

<div class="container">
    {#each conditions as condition}
        <DaniCondition {condition} />
    {/each}
</div>

<style>
    .container {
        width: 100%;

        display: flex;
        flex-direction: column;

        row-gap: 5px;
    }
</style>
