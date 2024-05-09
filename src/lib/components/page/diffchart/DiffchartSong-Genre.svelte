<script lang="ts">
    import type { Genre } from "$lib/module/common/song/types";
    import color from "$lib/module/common/color";

    let genres:Genre[];
    export {genres as genre};
    export let width:string;
    export let height:string;
</script>

<div class="container" style={`width:${width};height:${height};`}>
    {#each genres as genre}
        <div class="genre" style={`background-color:${color.genre[genre]};height: calc( 100% / ${genres.length} );`}/>
    {/each}
</div>

<style>
    .container{
        border-radius: 50vh;

        overflow: hidden;
    }
</style>