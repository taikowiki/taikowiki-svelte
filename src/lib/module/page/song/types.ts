import type { SongData } from "$lib/module/common/song/types";

export type SongDataPickedForSearch = Pick<SongData, "songNo" | "genre" | "title" | "titleKo" | "aliasKo" | "artists" | "courses"> & { order: number }