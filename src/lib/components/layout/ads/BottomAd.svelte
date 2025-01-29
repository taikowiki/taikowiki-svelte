<script lang="ts">
    import { navigating } from "$app/state";
    import DefaultAd from "./DefaultAd.svelte";
</script>

{#key navigating}
    {#if !navigating.to}
        <DefaultAd />
    {/if}
{/key}
