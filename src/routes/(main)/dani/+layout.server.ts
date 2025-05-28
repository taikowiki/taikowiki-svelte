import { DaniServer } from "$lib/module/dani/dani.server";
import { DANIVERSION } from "$lib/module/common/song/const";

export async function load() {
    const versions = await DaniServer.DBController.getVersions();
    versions.sort((a, b) => {
        const aIndex = DANIVERSION.indexOf(a as any);
        const bIndex = DANIVERSION.indexOf(b as any);

        return bIndex - aIndex;
    });
    return {
        versions
    }
}