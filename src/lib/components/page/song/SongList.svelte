<script lang="ts">
    import type { SongData } from "$lib/module/common/song/types";
    import SongItem from "./SongItem.svelte";
    import type { SongLang } from "./SongLanguageSelector.svelte";

    export let songLang: SongLang;
    export let filteredSongs: (SongData & { order: number })[];

    const resizeObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
            const titleContainer = entry.target as HTMLElement;

            const children0 = titleContainer.children[0] as HTMLElement;
            const children1 = titleContainer.children[1] as HTMLElement;

            let width =
                children0.offsetWidth +
                children1.offsetWidth +
                5;
            if (width > titleContainer.offsetWidth) {
                children1.style.display = "none";
                if (
                    children0.offsetWidth >
                    titleContainer.offsetWidth
                ) {
                    children0.style.overflow = "hidden";
                    children0.style.textOverflow = "ellipsis";
                }
            } else {
                if (
                    children0.style.textOverflow !== "ellipsis"
                ) {
                    // @ts-expect-error
                    children1.style.display = "block";
                }else {
                    children0.style.overflow = "visible";
                    children0.style.textOverflow = "";
                }
            }
        });
    });
</script>

<div class="container">
    {#each filteredSongs as song (song.order)}
        <SongItem {song} {songLang} {resizeObserver} />
    {/each}
</div>

<style>
    .container {
        display: grid;
        margin-top: 5px;

        grid-template-columns: repeat(2, calc((100% - 10px) / 2));
        column-gap: 10px;
        row-gap: 10px;
    }

    @media only screen and (max-width: 1000px) {
        .container {
            display: flex;
            flex-direction: column;
            row-gap: 5px;
        }
    }
</style>
