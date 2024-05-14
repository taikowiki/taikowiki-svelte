<script lang="ts">
    import { genre as genreColor } from "$lib/module/common/color";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";
    import type { Genre } from "$lib/module/common/song/types";

    export let genre:Genre;

    const lang = getLang();
    $: i18n = getI18N('/song/[songNo]', $lang);
</script>

<a class="container" href={`/song?genre=${genre}`}>
    {i18n.genres[genre]}
    <div class="line" style={`background-color:${genreColor[genre]};`}/>
</a>

<style>
    .container{
        width: auto;
        max-width: fit-content;
    }
    a{
        text-decoration: none;
        display:block;
    }
    .line{
        width: 100%;
        height: 2px;
    }
</style>