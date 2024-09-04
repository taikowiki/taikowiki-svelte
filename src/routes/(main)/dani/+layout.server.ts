import { daniDBController } from "$lib/module/common/dani/dani.server";
import { DANIVERSION } from "$lib/module/common/song/const";

export async function load() {
    const versions = await daniDBController.getVersions();
    versions.sort((a, b) => {
        const aIndex = DANIVERSION.indexOf(a as any);
        const bIndex = DANIVERSION.indexOf(b as any);

        return bIndex - aIndex;
    });
    return {
        versions
    }
}