<script lang="ts">
    import DisplayContainer from "./DisplayContainer.svelte";
    import GenreItem from "./GenreItem.svelte";

    export let genres: import("$lib/module/common/song/types").Genre[];
</script>

<DisplayContainer>
    <svelte:fragment slot="title">장르</svelte:fragment>
    <svelte:fragment slot="content">
        <div class="wrapper">
            {#each genres as genre}
                <GenreItem {genre} />
            {/each}
        </div>
    </svelte:fragment>
</DisplayContainer>

<style>
    .wrapper{
        display:flex;
        flex-direction: column;
    }

    @media only screen and (max-width: 1000px){
        .wrapper{
            flex-direction: row;
            column-gap: 5px;
        }
    }
</style>
