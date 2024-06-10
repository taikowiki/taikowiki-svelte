import DaniDB from "$lib/module/common/dani/daniDB.server";

export async function load(){
    return {
        versions: await DaniDB.getVersions()
    }
}