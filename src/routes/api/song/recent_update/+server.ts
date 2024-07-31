import { songDBController } from "$lib/module/common/song/song.server";

export async function GET() {
    return new Response((await songDBController.getUpdateTime() || await songDBController.getCreateTime() || 0).toString())
}