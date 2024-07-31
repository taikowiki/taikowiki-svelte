import { daniDBController } from "$lib/module/common/dani/dani.server";

export async function load() {
    return {
        versions: await daniDBController.getVersions()
    }
}