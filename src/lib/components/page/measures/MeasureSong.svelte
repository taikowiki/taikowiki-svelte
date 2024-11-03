<script lang="ts">
    import type {
        Course,
        SongData,
    } from "$lib/module/common/song/types";
    import { getTheme } from "$lib/module/layout/theme";
    import type { Action } from "svelte/action";
    import { getContext } from "svelte";

    export let songData: (Pick<SongData, "title" | "songNo" | "genre"> & {
        courses: { oni: Course; ura: Course | null };
    }) & { diff?: "oni" | "ura" };

    const [theme] = getTheme();

    const Genre = getContext('Genre') as ConstructorOfATypedSvelteComponent;
    const Level = getContext('Level') as ConstructorOfATypedSvelteComponent;

    /*
    const visibilityAction: Action<HTMLElement> = (node) => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    node.style.visibility = "inherit";
                } else {
                    node.style.visibility = "hidden";
                }
            },
            {
                threshold: 0,
            },
        );

        observer.observe(node);

        return {
            destroy() {
                observer.disconnect();
            }
        };
    };
    */
</script>

<a class="song-container" href={`/song/${songData.songNo}`} data-theme={$theme}>
    <Genre genre={songData.genre} />
    <Level diff={songData.diff ?? "oni"}>
        <span>
            ★{songData.courses[songData.diff ?? "oni"]?.level ?? "??"}
        </span>
    </Level>
    <div class="title" data-theme={$theme}>
        {songData.title}
    </div>
</a>

<style>
    .song-container {
        width: calc(100% - 10px);
        min-height: 30px;
        height: auto;
        display: flex;
        align-items: center;
        column-gap: 4px;

        margin-left: 10px;
        background-color: #ededed;

        border-radius: 5px;
    }
    .song-container[data-theme="dark"] {
        background-color: #1c1c1c;
    }

    .title {
        width: calc(100% - 86px);
        font-weight: bold;
        transform: translateY(-1px);
    }
</style>
