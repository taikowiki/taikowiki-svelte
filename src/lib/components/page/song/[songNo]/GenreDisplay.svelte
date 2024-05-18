<script lang="ts">
    import type { Genre } from "$lib/module/common/song/types";
    import color from "$lib/module/common/color";
    import { getI18N, getLang } from "$lib/module/common/i18n/i18n";
    import { getIsMobile } from "$lib/module/layout/isMobile";

    export let genres: Genre[];

    const isMobile = getIsMobile();
    const lang = getLang();
    $: i18n = getI18N("/song/[songNo]", $lang);
</script>

<div class="container">
    {#each genres as genre}
        <a
            class="item"
            style={`background-color:${color.genre[genre]};`}
            data-isMobile={$isMobile}
            href={`/song?genre=${genre}`}
        >
            {#if !$isMobile}
                {i18n.genres[genre]}
            {/if}
        </a>
    {/each}
</div>

<style>
    .container {
        display: flex;
        column-gap: 10px;
    }

    .item {
        padding-inline: 5px;

        border-radius: 5px;

        font-weight: bold;

        display: flex;
        justify-content: center;
        align-items: center;

        color:white;
        text-decoration: none;
    }

    .item[data-isMobile="true"]{
        width: 40px;
        height: 8px;
    }
</style>
