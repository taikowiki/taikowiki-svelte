import type { SongData } from "$lib/module/common/song/types"

export type SongDataPickedForDani = Pick<SongData, "songNo"|"genre"|"title"|"courses">