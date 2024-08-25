import { daniDBController } from "$lib/module/common/dani/dani.server";

export async function load() {
    const versions = await daniDBController.getVersions();
    versions.sort((a, b) => {
        if (a.startsWith('2')) {
            if (b.startsWith('2')) {
                return Number(b) - Number(a);
            }

            return -1;
        }
        else if(b.startsWith('2')){
            return 1;
        }
        else{
            return 0;
        }
    });
    return {
        versions
    }
}