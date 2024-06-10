import { type SongData } from "$lib/module/common/song/types"

export type SongDataPickedForDiffchart = Pick<SongData, "songNo" | "genre" | "title" | "titleKo" | "aliasKo">