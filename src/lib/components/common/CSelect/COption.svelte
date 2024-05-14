<script lang="ts">
    import { type Option } from "./CSelect.svelte";

    export let selected: Option;
    export let value: Option;

</script>

<div class="container" role="presentation" on:click={() => {selected = value}}>
    {value.display}
</div>