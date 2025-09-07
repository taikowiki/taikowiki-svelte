<script lang="ts">
    import { Song } from "$lib/module/song";
    import { User } from "$lib/module/user";
    import type { getRating } from "@taiko-wiki/taiko-rating";
    import SongRatings from "../me/SongRatings/SongRatings.svelte";

    interface Props {
        songDatas: Pick<Song.SongData, "songNo" | "title">[];
        scoreData: User.ScoreData;
        songRatingDatas: ReturnType<typeof getRating>["songRatingDatas"];
    }

    let { songDatas, scoreData, songRatingDatas }: Props = $props();
</script>

<SongRatings {songDatas} {scoreData} {songRatingDatas} />