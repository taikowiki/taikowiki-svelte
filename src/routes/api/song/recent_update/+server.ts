import { Song } from '$lib/module/song/song.server';

export async function GET() {
    return new Response((await Song.Server.DBController.getUpdateTime() || await Song.Server.DBController.getCreateTime() || 0).toString())
}