import { Dani } from "$lib/module/dani";
import "$lib/module/dani/dani.server";
import { Song } from "$lib/module/song";

const { DANIVERSION } = Song.CONST;

export async function load() {
    const versions = await Dani.Server.DBController.getVersions();
    versions.sort((a, b) => {
        const aIndex = DANIVERSION.indexOf(a as any);
        const bIndex = DANIVERSION.indexOf(b as any);

        return bIndex - aIndex;
    });
    return {
        versions
    }
}