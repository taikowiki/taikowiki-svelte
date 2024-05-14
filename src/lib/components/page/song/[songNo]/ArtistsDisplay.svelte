<script lang="ts">
    import DisplayContainer from "./DisplayContainer.svelte";

    export let artists:string[]
</script>
<DisplayContainer>
    <svelte:fragment slot="title">
        아티스트
    </svelte:fragment>
    <svelte:fragment slot="content">
        {artists.join(', ')}
    </svelte:fragment>
</DisplayContainer>