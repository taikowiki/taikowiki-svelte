<script lang="ts">
    import type { Genre } from "$lib/module/common/song/types";
    import { Util } from "$lib/module/util";

    interface Props{
        width: string;
        height: string;
        genre: Genre[];
    }

    let {
        width,
        height,
        genre: genres
    }: Props = $props();

</script>

<div class="container" style={`width:${width};height:${height};`}>
    {#each genres as genre}
        <div class="genre" style={`background-color:${Util.Color.genre[genre]};height: calc( 100% / ${genres.length} );`}></div>
    {/each}
</div>

<style>
    .container{
        border-radius: 50vh;

        overflow: hidden;
    }
</style>